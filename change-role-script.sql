// Script temporal para cambiar rol de usuario a admin
// EJECUTAR EN EL BACKEND - NO EN EL FRONTEND

// Si tienes acceso directo a la base de datos:
// UPDATE users SET role = 'admin' WHERE email = 'rodrigo.martinez224@gmail.com';

// Si usas Supabase:
/*
UPDATE auth.users 
SET raw_user_meta_data = jsonb_set(
  COALESCE(raw_user_meta_data, '{}'), 
  '{role}', 
  '"admin"'
) 
WHERE email = 'rodrigo.martinez224@gmail.com';
*/

// Si tienes una tabla users separada:
/*
UPDATE public.users 
SET role = 'admin' 
WHERE email = 'rodrigo.martinez224@gmail.com';
*/

console.log('INSTRUCCIONES:');
console.log('1. Ejecuta la query SQL apropiada en tu base de datos');
console.log('2. Luego limpia el localStorage en el navegador');
console.log('3. Vuelve a iniciar sesión');
console.log('4. Tu rol debería cambiar de "user" a "admin"');
