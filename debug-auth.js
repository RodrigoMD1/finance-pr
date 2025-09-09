// Script para debuggear la autenticación
// Ejecuta esto en la consola del navegador

console.log('=== DEBUG DE AUTENTICACIÓN ===');
console.log('Token:', localStorage.getItem('token'));
console.log('User ID:', localStorage.getItem('userId'));
console.log('User Name:', localStorage.getItem('userName'));
console.log('User Email:', localStorage.getItem('userEmail'));
console.log('User Role:', localStorage.getItem('userRole'));

// Intentar decodificar el token JWT si existe
const token = localStorage.getItem('token');
if (token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log('Token Payload:', payload);
    console.log('Token Role from payload:', payload.role || payload.roles);
  } catch (error) {
    console.error('Error decoding token:', error);
  }
}

console.log('===============================');
