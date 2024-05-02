module.exports = {
  routes: [
    {
      method: "GET",
      path: "/magazine-section/:slug",
      handler: "magazine-section.findOne",
    },
  ],
};
