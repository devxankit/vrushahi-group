// Centralised access to Vite env vars.
// Add new VITE_* variables here so the rest of the app never touches
// import.meta.env directly.
export const env = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  appName: import.meta.env.VITE_APP_NAME || 'App',
  mode: import.meta.env.MODE,
}
