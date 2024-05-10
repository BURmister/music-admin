"use strict";

/**
 * product controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::product.product", ({ strapi }) => ({
  async find(ctx) {
    const { query } = ctx;
    // console.log("query: ", query);
    query.populate = ["previewImage", "author"];

    const entity = await strapi.service("api::product.product").find(query);

    const results = await this.sanitizeOutput(entity, ctx);
    return results;
  },
  async findOne(ctx) {
    const { slug } = ctx.params;
    const { query } = ctx;
    if (!query.filters) query.filters = {};
    query.filters.slug = { $eq: slug };

    query.populate = ["previewImage", "author"];

    const entity = await strapi.service("api::product.product").find(query);
    const { results } = await this.sanitizeOutput(entity, ctx);
    const response = this.transformResponse(results[0]);

    return response;
  },
}));
