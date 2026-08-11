// Catches any request that didn't match a route and forwards a 404
// to the centralised error handler.
export function notFound(req, res, next) {
  const error = new Error(`Route not found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}
