"use strict";

/**
 * author controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::author.author", ({ strapi }) => ({
  async find(ctx) {
    const { query } = ctx;
    query.populate = ["image"];

    const entity = await strapi.service("api::author.author").find(query);

    const results = await this.sanitizeOutput(entity, ctx);
    return results;
  },
  async findOne(ctx) {
    const { slug } = ctx.params;
    const { query } = ctx;
    if (!query.filters) query.filters = {};
    query.filters.slug = { $eq: slug };

    query.populate = ["image"];

    const entity = await strapi.service("api::author.author").find(query);

    const { results } = await this.sanitizeOutput(entity, ctx);
    const response = this.transformResponse(results[0]);

    return response;
  },
}));
