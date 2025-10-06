// Script de diagnóstico para probar el endpoint de noticias
// Ejecutar con: node test-news-api.js

const API_URL = process.env.API_URL || 'https://proyecto-inversiones.onrender.com/api';
const TOKEN = process.argv[2]; // Token JWT como argumento

if (!TOKEN) {
  console.log('❌ Por favor proporciona un token JWT como argumento');
  console.log('Uso: node test-news-api.js YOUR_JWT_TOKEN');
  process.exit(1);
}

console.log('🔍 Probando endpoint de noticias...');
console.log('📡 URL:', `${API_URL}/news`);
console.log('🔑 Token:', TOKEN.substring(0, 20) + '...');
console.log('');

fetch(`${API_URL}/news`, {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${TOKEN}`,
    'Content-Type': 'application/json'
  }
})
  .then(async response => {
    console.log('📊 Estado HTTP:', response.status, response.statusText);
    console.log('📋 Headers recibidos:');
    response.headers.forEach((value, key) => {
      console.log(`   ${key}: ${value}`);
    });
    console.log('');
    
    const text = await response.text();
    console.log('📄 Respuesta cruda (primeros 500 caracteres):');
    console.log(text.substring(0, 500));
    console.log('');
    
    try {
      const data = JSON.parse(text);
      console.log('✅ JSON válido recibido:');
      console.log(JSON.stringify(data, null, 2));
      
      if (data.articles) {
        console.log('');
        console.log(`📰 Total de noticias: ${data.articles.length}`);
      } else if (Array.isArray(data)) {
        console.log('');
        console.log(`📰 Total de noticias: ${data.length}`);
      }
    } catch (e) {
      console.log('❌ Error al parsear JSON:', e.message);
    }
  })
  .catch(error => {
    console.error('❌ Error de red:', error.message);
    console.error('');
    console.error('Posibles causas:');
    console.error('  1. El backend no está corriendo');
    console.error('  2. La URL del backend es incorrecta');
    console.error('  3. El endpoint /news no está implementado');
    console.error('  4. Problema de CORS');
    console.error('  5. El token JWT es inválido');
  });
