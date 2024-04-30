module.exports = {
  routes: [
    {
      method: "GET",
      path: "/product/:slug",
      handler: "product.findOne",
    },
  ],
};
