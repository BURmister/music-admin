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

    let FIELDS_CAN_FILTERED = [
      {
        name: "new",
        title: "Новое",
        type: "boolean",
        data: null,
      },
      {
        name: "rare",
        title: "Редкое",
        type: "boolean",
        data: null,
      },
      {
        name: "bestseller",
        title: "Бестселлер",
        type: "boolean",
        data: null,
      },
      {
        name: "author",
        title: "Исполнитель",
        data: null,
      },
      {
        name: "conditionEnvelope",
        title: "Состояние упаковки",
        data: null,
      },
      {
        name: "conditionVinyl",
        title: "Состояние пластинки",
        data: null,
      },
      {
        name: "vinylSize",
        title: "Размер пластинки",
        data: null,
      },
      {
        name: "vinylType",
        title: "Тип",
        data: null,
      },
    ];

    query.pagination = { pageSize: 999 };
    const entityMeta = await strapi.service("api::product.product").find(query);
    const resultsMeta = await this.sanitizeOutput(entityMeta, ctx);

    if (resultsMeta.results && resultsMeta.results?.length > 0) {
      resultsMeta.results.forEach((product) => {
        FIELDS_CAN_FILTERED.forEach((filterItem, index) => {
          if (!product[filterItem.name]) return;

          if (filterItem.name === "author") {
            if (!FIELDS_CAN_FILTERED[index].data)
              FIELDS_CAN_FILTERED[index].data = [product[filterItem.name].name];
            else if (
              !FIELDS_CAN_FILTERED[index].data?.find(
                (object) => object === product[filterItem.name].name
              )
            )
              FIELDS_CAN_FILTERED[index].data.push(
                product[filterItem.name].name
              );

            return console.log({
              product: product.name,
              filterName: filterItem.name,
              filterValue: product[filterItem.name].name,
            });
          }

          if (!FIELDS_CAN_FILTERED[index].data)
            FIELDS_CAN_FILTERED[index].data = [product[filterItem.name]];
          else if (
            !FIELDS_CAN_FILTERED[index].data?.find(
              (object) => object === product[filterItem.name]
            )
          )
            FIELDS_CAN_FILTERED[index].data.push(product[filterItem.name]);

          return console.log({
            product: product.name,
            filterName: filterItem.name,
            filterValue: product[filterItem.name],
          });
        });
      });
    } else return console.log("non data");

    FIELDS_CAN_FILTERED = FIELDS_CAN_FILTERED.filter(
      (item) => item?.data !== null
    );

    results.filterFields = FIELDS_CAN_FILTERED;
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
