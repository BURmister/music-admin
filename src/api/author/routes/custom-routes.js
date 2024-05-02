module.exports = {
  routes: [
    {
      method: "GET",
      path: "/author/:slug",
      handler: "author.findOne",
    },
  ],
};
