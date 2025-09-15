// Back/src/middlewares/ejemplo.middleware.js
export const ejemploMiddleware = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] Ruta accedida: ${req.method} ${req.url}`);
  next();
};
