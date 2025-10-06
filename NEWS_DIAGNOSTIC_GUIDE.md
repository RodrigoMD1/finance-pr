# 🔧 Guía de Diagnóstico: Endpoint de Noticias

## 📋 Resumen de Cambios Implementados

### ✅ Mejoras en `News.tsx`:
1. **Activada la conexión real a la API** (código descomentado y mejorado)
2. **Sistema de fallback inteligente**: muestra noticias de ejemplo si la API falla
3. **Banner de advertencia**: muestra claramente si está usando la API o el fallback
4. **Logging exhaustivo**: toda la información se muestra en la consola del navegador
5. **Manejo de errores robusto**: identifica el tipo de error y muestra mensajes útiles

---

## 🧪 Cómo Diagnosticar el Problema

### Paso 1: Verificar en el Navegador

1. Abre la aplicación en el navegador
2. Ve a la sección de "Noticias"
3. Abre la consola del navegador (F12)
4. Busca los mensajes que empiezan con 📰, 📡, 🔑, 📊, ✅ o ❌

### Mensajes que verás:

#### ✅ Si funciona correctamente:
```
📰 Intentando obtener noticias de la API...
📡 URL de la API: https://proyecto-inversiones.onrender.com/api/news
🔑 Token presente: true
📊 Estado de respuesta: 200
✅ Datos recibidos: {...}
✅ Noticias de la API cargadas exitosamente: 10
```

#### ❌ Si hay un problema:
```
📰 Intentando obtener noticias de la API...
📡 URL de la API: https://proyecto-inversiones.onrender.com/api/news
🔑 Token presente: true
📊 Estado de respuesta: 404
❌ Error al obtener noticias: Error HTTP: 404 - Not Found
📰 Usando noticias de fallback
```

---

## 🔍 Escenarios Posibles y Soluciones

### Escenario 1: Error 404 (Endpoint no encontrado)
**Síntoma**: `Estado de respuesta: 404`

**Causa**: El endpoint `/api/news` no existe en el backend

**Solución Backend**:
```typescript
// Crear el endpoint en NestJS
@Controller('news')
export class NewsController {
  @Get()
  @UseGuards(JwtAuthGuard)
  async getNews(@Request() req) {
    // Aquí integrar con API de noticias (ej: NewsAPI, Alpha Vantage)
    return {
      articles: [
        {
          title: "Título de la noticia",
          url: "https://example.com",
          publishedAt: new Date().toISOString(),
          source: { name: "Fuente" },
          description: "Descripción..."
        }
      ]
    };
  }
}
```

### Escenario 2: Error 401 (No autorizado)
**Síntoma**: `Estado de respuesta: 401`

**Causa**: Token JWT inválido o expirado

**Solución**:
1. Cierra sesión y vuelve a iniciar sesión
2. Verifica que el token se esté guardando correctamente en localStorage
3. Revisa que el backend acepte el token

### Escenario 3: Error de CORS
**Síntoma**: `Error de red` + mensaje de CORS en consola

**Causa**: Backend no permite peticiones desde el frontend

**Solución Backend**:
```typescript
// En main.ts
app.enableCors({
  origin: ['http://localhost:5173', 'https://financepr.netlify.app'],
  credentials: true
});
```

### Escenario 4: Backend no responde
**Síntoma**: `Error de red: Failed to fetch`

**Causa**: El backend está apagado o la URL es incorrecta

**Solución**:
1. Verifica que el backend esté corriendo
2. Revisa la variable de entorno `VITE_API_URL` en `.env`
3. Si usas Render, verifica que el servicio esté activo

### Escenario 5: Formato de respuesta incorrecto
**Síntoma**: `La API no devolvió noticias`

**Causa**: El backend devuelve un formato diferente al esperado

**Solución**: El frontend espera:
```json
{
  "articles": [
    {
      "title": "string",
      "url": "string",
      "publishedAt": "ISO date",
      "source": { "name": "string" },
      "description": "string"
    }
  ]
}
```

O directamente un array:
```json
[
  {
    "title": "string",
    "url": "string",
    "publishedAt": "ISO date",
    "source": { "name": "string" },
    "description": "string"
  }
]
```

---

## 🧪 Probar el Endpoint Manualmente

### Opción 1: Usando el script de Node.js

1. Obtén tu token JWT (desde localStorage en la consola del navegador):
```javascript
console.log(localStorage.getItem('token'))
```

2. Ejecuta el script:
```bash
node test-news-api.js YOUR_JWT_TOKEN_HERE
```

### Opción 2: Usando curl

```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
     -H "Content-Type: application/json" \
     https://proyecto-inversiones.onrender.com/api/news
```

### Opción 3: Usando Postman/Thunder Client

1. Método: GET
2. URL: `https://proyecto-inversiones.onrender.com/api/news`
3. Headers:
   - `Authorization: Bearer YOUR_TOKEN`
   - `Content-Type: application/json`

---

## 🎯 Recomendaciones para el Backend

### Opción 1: Integrar NewsAPI.org (Gratis hasta 100 requests/día)

```typescript
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class NewsService {
  constructor(private httpService: HttpService) {}

  async getFinancialNews() {
    const API_KEY = process.env.NEWS_API_KEY;
    const url = `https://newsapi.org/v2/top-headlines?category=business&country=ar&apiKey=${API_KEY}`;
    
    const response = await this.httpService.get(url).toPromise();
    return response.data;
  }
}
```

### Opción 2: Web Scraping de fuentes argentinas

```typescript
import * as cheerio from 'cheerio';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class NewsScraperService {
  async scrapeAmbitoFinanciero() {
    // Scrapear noticias de Ámbito, Cronista, etc.
    const response = await this.httpService.get('https://www.ambito.com/finanzas').toPromise();
    const $ = cheerio.load(response.data);
    
    const articles = [];
    $('.article-item').each((i, elem) => {
      articles.push({
        title: $(elem).find('.title').text(),
        url: $(elem).find('a').attr('href'),
        publishedAt: new Date().toISOString(),
        source: { name: 'Ámbito Financiero' },
        description: $(elem).find('.description').text()
      });
    });
    
    return { articles };
  }
}
```

### Opción 3: RSS Feeds

```typescript
import * as Parser from 'rss-parser';

@Injectable()
export class RSSNewsService {
  private parser = new Parser();

  async getNewsFromRSS() {
    const feeds = [
      'https://www.ambito.com/rss/finanzas.xml',
      'https://www.cronista.com/rss/finanzas/',
      'https://www.infobae.com/feeds/rss/'
    ];

    const allArticles = [];
    
    for (const feed of feeds) {
      try {
        const parsed = await this.parser.parseURL(feed);
        parsed.items.forEach(item => {
          allArticles.push({
            title: item.title,
            url: item.link,
            publishedAt: item.pubDate || item.isoDate,
            source: { name: parsed.title },
            description: item.contentSnippet || item.content
          });
        });
      } catch (error) {
        console.error(`Error parsing feed ${feed}:`, error);
      }
    }

    return { articles: allArticles };
  }
}
```

---

## 📊 Estado Actual

### Frontend: ✅ LISTO
- Código actualizado y funcionando
- Sistema de fallback implementado
- Logging completo para diagnóstico
- Manejo de errores robusto

### Backend: ⚠️ REVISAR
Según la documentación, el endpoint existe pero no sabemos:
1. ¿Está implementado realmente?
2. ¿De dónde obtiene las noticias?
3. ¿Funciona correctamente?

---

## 🚀 Próximos Pasos

1. **Verificar en el navegador**: Abre la sección de noticias y revisa la consola
2. **Identificar el error**: Usa los mensajes de diagnóstico para saber qué falla
3. **Decidir**: 
   - Si es problema del frontend → Ya está arreglado
   - Si es problema del backend → Hay que implementar/arreglar el endpoint

---

## 💡 Notas Importantes

- Las noticias de fallback se muestran **siempre** si hay un error
- Los usuarios no verán una pantalla en blanco
- El banner amarillo indica claramente cuando no hay conexión a la API
- Toda la información de diagnóstico está en la consola del navegador (F12)

---

## 📞 Contacto para Ayuda

Si necesitas ayuda adicional, proporciona:
1. Captura de pantalla de la consola del navegador
2. El mensaje de error completo
3. URL del backend que estás usando
4. Si el backend está en desarrollo o producción
