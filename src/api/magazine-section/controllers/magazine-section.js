"use strict";

/**
 * magazine-section controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::magazine-section.magazine-section",
  ({ strapi }) => ({
    async find(ctx) {
      const { query } = ctx;
      query.populate = ["image"];

      console.log(query);

      const entity = await strapi
        .service("api::magazine-section.magazine-section")
        .find(query);

      const { results } = await this.sanitizeOutput(entity, ctx);
      return results;
    },
    async findOne(ctx) {
      const { slug } = ctx.params;
      const { query } = ctx;
      if (!query.filters) query.filters = {};
      query.filters.slug = { $eq: slug };

      query.populate = [
        "image",
        // "magazineArticles",
        // "magazineArticles.previewImage",
      ];

      const entity = await strapi
        .service("api::magazine-section.magazine-section")
        .find(query);

      const { results } = await this.sanitizeOutput(entity, ctx);
      const response = this.transformResponse(results[0]);

      // let itemsArray = [];
      // if (response?.data) {
      //   response.data.attributes?.products?.data?.map((product) => {
      //     itemsArray.push(product);
      //   });

      //   response.data.attributes.catalog_items = {
      //     data: itemsArray,
      //   };
      // }

      // response.path = [
      //   {
      //     name: response.data.attributes.Name,
      //     to: "/catalog/" + response.data.attributes.slug,
      //   },
      // ];

      return response;
    },
  })
);
