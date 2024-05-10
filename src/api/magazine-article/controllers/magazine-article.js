"use strict";

/**
 * magazine-article controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::magazine-article.magazine-article",
  ({ strapi }) => ({
    async find(ctx) {
      const { query } = ctx;
      // console.log("query: ", query);
      query.populate = ["previewImage"];

      const entity = await strapi
        .service("api::magazine-article.magazine-article")
        .find(query);

      const results = await this.sanitizeOutput(entity, ctx);
      return results;
    },
    async findOne(ctx) {
      const { slug } = ctx.params;
      const { query } = ctx;
      if (!query.filters) query.filters = {};
      query.filters.slug = { $eq: slug };

      query.populate = ["article", "previewImage"];

      const entity = await strapi
        .service("api::magazine-article.magazine-article")
        .find(query);

      const { results } = await this.sanitizeOutput(entity, ctx);
      const response = this.transformResponse(results[0]);

      return response;
    },
  })
);
