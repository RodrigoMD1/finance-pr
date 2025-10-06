# 🔧 SOLUCIÓN: Endpoint de Noticias del Backend

## 📊 DIAGNÓSTICO FINAL

✅ **Frontend**: Funcionando correctamente  
✅ **Backend**: Endpoint `/api/news` existe y responde  
❌ **Problema**: El backend devuelve `{ "articles": [] }` (array vacío)

### Respuesta Actual del Backend:
```json
{
  "articles": []
}
```

**Conclusión**: El endpoint está implementado pero **no está obteniendo noticias de ninguna fuente externa**.

---

## 🎯 SOLUCIONES PARA EL BACKEND

Necesitas implementar una de estas 3 opciones en el backend para que el endpoint `/api/news` devuelva noticias reales:

---

### **OPCIÓN 1: NewsAPI.org (Recomendado para Argentina)** ⭐

**Ventajas:**
- ✅ Gratis hasta 100 requests/día
- ✅ Noticias de múltiples países incluido Argentina
- ✅ Fácil de implementar
- ✅ Actualización en tiempo real

#### Paso 1: Obtener API Key
1. Ir a https://newsapi.org/register
2. Crear cuenta gratis
3. Copiar tu API Key

#### Paso 2: Instalar dependencia
```bash
npm install @nestjs/axios axios
```

#### Paso 3: Implementar en el Backend

**Archivo: `src/news/news.service.ts`**
```typescript
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class NewsService {
  constructor(private httpService: HttpService) {}

  async getFinancialNews() {
    try {
      const API_KEY = process.env.NEWS_API_KEY; // Tu API key
      
      // Opción A: Noticias de Argentina
      const url = `https://newsapi.org/v2/top-headlines?country=ar&category=business&apiKey=${API_KEY}`;
      
      // Opción B: Noticias financieras en español
      // const url = `https://newsapi.org/v2/everything?q=finanzas+OR+inversiones+OR+bolsa&language=es&sortBy=publishedAt&apiKey=${API_KEY}`;
      
      const response = await firstValueFrom(
        this.httpService.get(url)
      );
      
      // Formatear la respuesta
      const articles = response.data.articles.map(article => ({
        title: article.title,
        description: article.description || article.content,
        url: article.url,
        publishedAt: article.publishedAt,
        source: {
          name: article.source.name
        }
      }));
      
      return {
        articles,
        total: articles.length
      };
      
    } catch (error) {
      console.error('Error fetching news from NewsAPI:', error);
      throw new HttpException(
        'Error al obtener noticias',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
```

**Archivo: `src/news/news.controller.ts`**
```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { NewsService } from './news.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getNews() {
    return this.newsService.getFinancialNews();
  }
}
```

**Archivo: `.env`**
```
NEWS_API_KEY=tu_api_key_aqui
```

---

### **OPCIÓN 2: RSS Feeds (Gratis e ilimitado)** 🆓

**Ventajas:**
- ✅ Completamente gratis
- ✅ Sin límites de requests
- ✅ Noticias de fuentes argentinas confiables
- ✅ Actualización constante

#### Paso 1: Instalar dependencia
```bash
npm install rss-parser
```

#### Paso 2: Implementar en el Backend

**Archivo: `src/news/news.service.ts`**
```typescript
import { Injectable } from '@nestjs/common';
import * as Parser from 'rss-parser';

@Injectable()
export class NewsService {
  private parser = new Parser();

  async getFinancialNews() {
    const feeds = [
      { url: 'https://www.ambito.com/rss/finanzas.xml', name: 'Ámbito Financiero' },
      { url: 'https://www.cronista.com/rss/finanzas/', name: 'El Cronista' },
      { url: 'https://www.infobae.com/economia/feed/', name: 'Infobae Economía' },
      { url: 'https://www.lanacion.com.ar/economia/rss/', name: 'La Nación Economía' },
    ];

    const allArticles = [];

    for (const feed of feeds) {
      try {
        const parsed = await this.parser.parseURL(feed.url);
        
        parsed.items.forEach(item => {
          allArticles.push({
            title: item.title,
            description: item.contentSnippet || item.content || item.summary,
            url: item.link,
            publishedAt: item.pubDate || item.isoDate || new Date().toISOString(),
            source: {
              name: feed.name
            }
          });
        });
      } catch (error) {
        console.error(`Error parsing feed ${feed.url}:`, error);
        // Continuar con los otros feeds si uno falla
      }
    }

    // Ordenar por fecha más reciente
    allArticles.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    // Retornar solo las últimas 20 noticias
    return {
      articles: allArticles.slice(0, 20),
      total: allArticles.length
    };
  }
}
```

---

### **OPCIÓN 3: Web Scraping (Más control)** 🕷️

**Ventajas:**
- ✅ Control total sobre el contenido
- ✅ Gratis
- ✅ Personalizable

**Desventajas:**
- ⚠️ Puede romper si los sitios cambian su HTML
- ⚠️ Algunos sitios pueden bloquear scraping

#### Paso 1: Instalar dependencias
```bash
npm install cheerio axios
```

#### Paso 2: Implementar en el Backend

**Archivo: `src/news/news.service.ts`**
```typescript
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as cheerio from 'cheerio';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class NewsService {
  constructor(private httpService: HttpService) {}

  async getFinancialNews() {
    const articles = [];

    try {
      // Scraper para Ámbito Financiero
      const ambitoResponse = await firstValueFrom(
        this.httpService.get('https://www.ambito.com/finanzas')
      );
      
      const $ = cheerio.load(ambitoResponse.data);
      
      $('.article-item').each((i, elem) => {
        if (i < 10) { // Limitar a 10 noticias por fuente
          articles.push({
            title: $(elem).find('.article-title').text().trim(),
            description: $(elem).find('.article-description').text().trim(),
            url: 'https://www.ambito.com' + $(elem).find('a').attr('href'),
            publishedAt: new Date().toISOString(),
            source: { name: 'Ámbito Financiero' }
          });
        }
      });

      // Puedes agregar más scrapers aquí para otros sitios

    } catch (error) {
      console.error('Error scraping news:', error);
    }

    return {
      articles: articles.filter(a => a.title && a.url),
      total: articles.length
    };
  }
}
```

---

## 🚀 IMPLEMENTACIÓN RÁPIDA (RECOMENDADA)

### Opción más fácil: RSS Feeds

1. **Instalar dependencia:**
```bash
cd backend  # o donde esté tu código de NestJS
npm install rss-parser
```

2. **Actualizar el servicio de noticias:**
Copia el código de la **OPCIÓN 2** arriba

3. **Reiniciar el backend:**
```bash
npm run start:dev
```

4. **Probar:**
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
     https://proyecto-inversiones.onrender.com/api/news
```

**Deberías ver un JSON con noticias reales de Ámbito, Cronista, Infobae, etc.**

---

## 📝 CHECKLIST

- [ ] Elegir una de las 3 opciones
- [ ] Instalar las dependencias necesarias
- [ ] Implementar el código en `news.service.ts`
- [ ] Si usas NewsAPI, agregar `NEWS_API_KEY` al `.env`
- [ ] Reiniciar el backend
- [ ] Probar el endpoint con curl o Postman
- [ ] Verificar en el frontend que las noticias se muestran

---

## 🎯 RESULTADO ESPERADO

Después de implementar cualquiera de estas opciones, el endpoint `/api/news` debería devolver:

```json
{
  "articles": [
    {
      "title": "Dólar blue hoy: a cuánto cotiza este...",
      "description": "El dólar blue cerró la jornada...",
      "url": "https://www.ambito.com/...",
      "publishedAt": "2025-10-06T15:30:00Z",
      "source": {
        "name": "Ámbito Financiero"
      }
    },
    {
      "title": "El Merval subió 2,5% y alcanzó...",
      "description": "La bolsa porteña cerró con ganancias...",
      "url": "https://www.cronista.com/...",
      "publishedAt": "2025-10-06T14:20:00Z",
      "source": {
        "name": "El Cronista"
      }
    }
    // ... más noticias
  ],
  "total": 20
}
```

Y en el frontend verás las noticias reales sin el banner de advertencia amarillo.

---

## 💡 MI RECOMENDACIÓN

**Usa la OPCIÓN 2 (RSS Feeds)** porque:
- ✅ Es gratis e ilimitado
- ✅ Fácil de implementar (solo 30 líneas de código)
- ✅ Fuentes argentinas confiables
- ✅ Sin API keys ni configuración extra
- ✅ Funciona de inmediato

---

## 📞 ¿NECESITAS AYUDA?

Si tienes problemas implementando cualquiera de estas opciones, puedo ayudarte con:
- Configuración del módulo de noticias en NestJS
- Debugging de errores
- Optimización del código
- Agregar más fuentes de noticias

