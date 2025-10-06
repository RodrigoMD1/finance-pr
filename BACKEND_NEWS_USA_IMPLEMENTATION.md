# 🇺🇸 AGREGAR NOTICIAS DE USA AL BACKEND

## 📋 RESUMEN
Vamos a agregar feeds RSS de medios estadounidenses (CNN, Bloomberg, Reuters, CNBC) y etiquetar cada noticia con su país de origen.

---

## 🔧 CÓDIGO PARA EL BACKEND

### 📄 Archivo: `src/news/news.service.ts`

Reemplaza todo el contenido del archivo con esto:

```typescript
import { Injectable } from '@nestjs/common';
import * as Parser from 'rss-parser';

interface FeedSource {
  url: string;
  name: string;
  country: 'AR' | 'US';  // ← NUEVO: País de origen
}

@Injectable()
export class NewsService {
  private parser = new Parser();

  // Lista de feeds RSS
  private feeds: FeedSource[] = [
    // ========== ARGENTINA ==========
    { 
      url: 'https://www.ambito.com/rss/finanzas.xml', 
      name: 'Ámbito Financiero',
      country: 'AR'
    },
    { 
      url: 'https://www.cronista.com/rss/finanzas/', 
      name: 'El Cronista',
      country: 'AR'
    },
    { 
      url: 'https://www.infobae.com/economia/feed/', 
      name: 'Infobae Economía',
      country: 'AR'
    },
    { 
      url: 'https://www.lanacion.com.ar/economia/rss/', 
      name: 'La Nación Economía',
      country: 'AR'
    },

    // ========== USA ==========
    { 
      url: 'https://feeds.bloomberg.com/markets/news.rss', 
      name: 'Bloomberg Markets',
      country: 'US'
    },
    { 
      url: 'https://www.cnbc.com/id/100003114/device/rss/rss.html', 
      name: 'CNBC Finance',
      country: 'US'
    },
    { 
      url: 'http://feeds.reuters.com/reuters/businessNews', 
      name: 'Reuters Business',
      country: 'US'
    },
    { 
      url: 'https://rss.cnn.com/rss/money_latest.rss', 
      name: 'CNN Money',
      country: 'US'
    },
    { 
      url: 'https://www.marketwatch.com/rss/marketpulse', 
      name: 'MarketWatch',
      country: 'US'
    },
  ];

  async getFinancialNews(country?: 'AR' | 'US') {
    const allArticles = [];

    // Filtrar feeds por país si se especifica
    const feedsToFetch = country 
      ? this.feeds.filter(feed => feed.country === country)
      : this.feeds;

    for (const feed of feedsToFetch) {
      try {
        const parsed = await this.parser.parseURL(feed.url);
        
        parsed.items.forEach(item => {
          allArticles.push({
            title: item.title,
            description: item.contentSnippet || item.content || item.summary || '',
            url: item.link,
            publishedAt: item.pubDate || item.isoDate || new Date().toISOString(),
            source: {
              name: feed.name
            },
            country: feed.country,  // ← NUEVO: País de origen
            image: item.enclosure?.url || item['media:thumbnail']?.$?.url || null  // Imagen si existe
          });
        });
      } catch (error) {
        console.error(`Error parsing feed ${feed.name} (${feed.url}):`, error.message);
        // Continuar con los otros feeds si uno falla
      }
    }

    // Ordenar por fecha más reciente
    allArticles.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    return {
      articles: allArticles,
      total: allArticles.length,
      byCountry: {
        argentina: allArticles.filter(a => a.country === 'AR').length,
        usa: allArticles.filter(a => a.country === 'US').length
      }
    };
  }

  // Método específico para noticias de Argentina
  async getArgentinaNews() {
    return this.getFinancialNews('AR');
  }

  // Método específico para noticias de USA
  async getUSANews() {
    return this.getFinancialNews('US');
  }
}
```

---

## 📄 Archivo: `src/news/news.controller.ts`

Reemplaza con esto para agregar los nuevos endpoints:

```typescript
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { NewsService } from './news.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  // Endpoint principal: todas las noticias o filtradas por país
  @Get()
  @UseGuards(JwtAuthGuard)
  async getNews(@Query('country') country?: 'AR' | 'US') {
    return this.newsService.getFinancialNews(country);
  }

  // Endpoint específico para Argentina
  @Get('argentina')
  @UseGuards(JwtAuthGuard)
  async getArgentinaNews() {
    return this.newsService.getArgentinaNews();
  }

  // Endpoint específico para USA
  @Get('usa')
  @UseGuards(JwtAuthGuard)
  async getUSANews() {
    return this.newsService.getUSANews();
  }
}
```

---

## 📦 DEPENDENCIAS

Asegúrate de que `rss-parser` esté instalado:

```bash
npm install rss-parser
```

Si usas TypeScript, también instala los tipos:

```bash
npm install --save-dev @types/rss-parser
```

---

## 🧪 CÓMO PROBAR

### 1. Reiniciar el backend:
```bash
npm run start:dev
```

### 2. Probar endpoints:

#### Todas las noticias:
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
     http://localhost:3000/api/news
```

#### Solo Argentina:
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
     http://localhost:3000/api/news?country=AR

# O usando el endpoint específico:
curl -H "Authorization: Bearer YOUR_TOKEN" \
     http://localhost:3000/api/news/argentina
```

#### Solo USA:
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
     http://localhost:3000/api/news?country=US

# O usando el endpoint específico:
curl -H "Authorization: Bearer YOUR_TOKEN" \
     http://localhost:3000/api/news/usa
```

---

## 📊 RESPUESTA ESPERADA

```json
{
  "articles": [
    {
      "title": "Bitcoin hits new all-time high",
      "description": "Bitcoin price surges past...",
      "url": "https://www.cnbc.com/...",
      "publishedAt": "2025-10-06T15:30:00Z",
      "source": {
        "name": "CNBC Finance"
      },
      "country": "US",  // ← NUEVO CAMPO
      "image": "https://..."  // ← OPCIONAL
    },
    {
      "title": "Dólar blue alcanza nuevo récord",
      "description": "El tipo de cambio...",
      "url": "https://www.ambito.com/...",
      "publishedAt": "2025-10-06T14:20:00Z",
      "source": {
        "name": "Ámbito Financiero"
      },
      "country": "AR",  // ← NUEVO CAMPO
      "image": null
    }
    // ... más noticias
  ],
  "total": 543,
  "byCountry": {
    "argentina": 234,
    "usa": 309
  }
}
```

---

## 🔧 CONFIGURACIÓN ADICIONAL (OPCIONAL)

### Caché para mejorar performance

Si quieres agregar caché para no hacer requests RSS en cada llamada:

```typescript
import { Injectable } from '@nestjs/common';
import * as Parser from 'rss-parser';

@Injectable()
export class NewsService {
  private parser = new Parser();
  private cache: { articles: any[]; timestamp: number } = null;
  private CACHE_DURATION = 10 * 60 * 1000; // 10 minutos

  async getFinancialNews(country?: 'AR' | 'US') {
    // Verificar si hay cache válido
    if (this.cache && Date.now() - this.cache.timestamp < this.CACHE_DURATION) {
      console.log('✅ Usando cache de noticias');
      
      if (country) {
        const filtered = this.cache.articles.filter(a => a.country === country);
        return {
          articles: filtered,
          total: filtered.length,
          cached: true
        };
      }
      
      return {
        articles: this.cache.articles,
        total: this.cache.articles.length,
        cached: true
      };
    }

    console.log('🔄 Obteniendo noticias frescas de RSS...');
    
    // ... resto del código para obtener noticias
    
    // Guardar en cache
    this.cache = {
      articles: allArticles,
      timestamp: Date.now()
    };

    // ... resto del código
  }
}
```

---

## 📝 FUENTES RSS INCLUIDAS

### 🇦🇷 Argentina (4 fuentes):
1. **Ámbito Financiero** - Finanzas y economía
2. **El Cronista** - Bolsa e inversiones
3. **Infobae Economía** - Noticias económicas
4. **La Nación Economía** - Política económica

### 🇺🇸 USA (5 fuentes):
1. **Bloomberg Markets** - Mercados internacionales
2. **CNBC Finance** - Finanzas y negocios
3. **Reuters Business** - Noticias de negocios
4. **CNN Money** - Economía y finanzas
5. **MarketWatch** - Análisis de mercados

---

## 🚀 PRÓXIMOS PASOS

1. ✅ Copiar el código del `news.service.ts`
2. ✅ Copiar el código del `news.controller.ts`
3. ✅ Verificar que `rss-parser` esté instalado
4. ✅ Reiniciar el backend
5. ✅ Probar endpoints con curl o Postman
6. ✅ Verificar que devuelva noticias de ambos países
7. ✅ Hacer commit y push a Render
8. ✅ Volver al frontend para implementar los tabs

---

## ⚠️ TROUBLESHOOTING

### Error: "Cannot find module 'rss-parser'"
```bash
npm install rss-parser
```

### Error: CORS al obtener RSS
Algunos feeds RSS pueden bloquear requests desde servidores. Esto es normal, el código ya maneja estos errores y continúa con los otros feeds.

### Pocas noticias de USA
Algunos feeds RSS de USA pueden tener restricciones geográficas. Los que incluí deberían funcionar, pero si alguno falla, el servicio continúa con los otros.

---

## 💡 MEJORAS OPCIONALES

### Agregar más fuentes USA:
```typescript
// Wall Street Journal (requiere suscripción para algunos feeds)
{ url: 'https://feeds.a.dj.com/rss/RSSMarketsMain.xml', name: 'WSJ Markets', country: 'US' },

// Financial Times
{ url: 'https://www.ft.com/?format=rss', name: 'Financial Times', country: 'US' },

// Yahoo Finance
{ url: 'https://finance.yahoo.com/news/rssindex', name: 'Yahoo Finance', country: 'US' },
```

---

## ✅ CHECKLIST

- [ ] Copiar código de `news.service.ts`
- [ ] Copiar código de `news.controller.ts`
- [ ] Instalar `rss-parser` si no está
- [ ] Reiniciar backend con `npm run start:dev`
- [ ] Probar endpoint: `GET /api/news`
- [ ] Probar endpoint: `GET /api/news?country=AR`
- [ ] Probar endpoint: `GET /api/news?country=US`
- [ ] Verificar que cada noticia tenga el campo `country`
- [ ] Commit y push
- [ ] Deploy en Render
- [ ] ¡Listo para implementar tabs en el frontend!

---

**Cuando termines, avísame y implementamos los tabs en el frontend! 🚀**
