const createProxyMiddleware = require("http-proxy-middleware");
require("dotenv").config();

module.exports = function (app) {
  console.log(`frontend: ${process.env.SAME_ORIGIN}`)
  if (process.env.SAME_ORIGIN && process.env.SAME_ORIGIN.toLowerCase() == "true") return
  app.use(
    createProxyMiddleware(["/login", "/callback", "/logout", "/checkAuth", "graphql"], {
      target: `http://localhost:${process.env.BACKEND_PORT}`,
      changeOrigin: true,
      logLevel: "debug",
    })
  );
};
