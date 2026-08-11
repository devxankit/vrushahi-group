import { isProduction } from '../config/env.js'

// Centralised error handler - keep this as the LAST middleware
// registered in app.js. Throw errors (or use express-async-errors,
// already wired up) from anywhere and they land here.
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    stack: isProduction ? undefined : err.stack,
  })
}
