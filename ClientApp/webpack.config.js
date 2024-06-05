module.exports = {
  // ... other configurations ...
  devServer: {
    // Replace `onBeforeSetupMiddleware` and `onAfterSetupMiddleware` with `setupMiddlewares`
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }

      // Middleware to run before the Webpack Dev Server setup
      // Replace the functionality of `onBeforeSetupMiddleware` here
      // devServer.app.use(yourBeforeMiddlewareFunction);

      // Middleware to run after the Webpack Dev Server setup
      // Replace the functionality of `onAfterSetupMiddleware` here
      // devServer.app.use(yourAfterMiddlewareFunction);

      return middlewares;
    },
  },
};
