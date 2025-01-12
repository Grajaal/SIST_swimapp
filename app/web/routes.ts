/**
 * Un array con rutas que son públicas.
 * Estas rutas no requieren autenticación.
 * @type {string[]}
 */
export const publicRoutes = [
  "/", 
];

/**
 * Un array con las rutas de autenticación.
 * Estas rutas redireccionarán a los usuarios autenticados a /dashboard.
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/login", 
  "/auth/register"
];

/**
 * Prefijo para rutas de autentición API.
 * Rutas que empiezan por este prefijo son usados para propósitos de autenticación.
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth"; 

/**
 * Ruta predeterminada a la que se redirijen los usarios tras el inicio de sesión.
 * Rutas que empiezan por este prefijo son usados para propósitos de autenticación.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/dashboard'
// export const DEFAULT_COACH_LOGIN_REDIRECT = '/coach/dashboard'
// export const DEFAULT_SWIMMER_LOGIN_REDIRECT = '/swimmer/dashboard'