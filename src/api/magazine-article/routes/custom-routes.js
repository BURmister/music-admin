module.exports = {
  routes: [
    {
      method: "GET",
      path: "/magazine-article/:slug",
      handler: "magazine-article.findOne",
    },
  ],
};
