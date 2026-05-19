import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const items = await ctx.db.query("products").collect();
    return items.sort((a, b) => a.order - b.order);
  },
});

export const create = mutation({
  args: {
    categoryId: v.optional(v.id("categories")),
    name: v.string(),
    modelName: v.optional(v.string()),
    unit: v.optional(v.string()),
    quantity: v.number(),
    supplyPrice: v.number(),
    salePrice: v.number(),
    discountAmount: v.optional(v.number()),
    thumbnailUrl: v.optional(v.string()),
    detailImageUrl: v.optional(v.string()),
    order: v.number(),
    isActive: v.boolean(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("products", args);
  },
});

export const update = mutation({
  args: {
    id: v.id("products"),
    categoryId: v.optional(v.id("categories")),
    name: v.string(),
    modelName: v.optional(v.string()),
    unit: v.optional(v.string()),
    quantity: v.number(),
    supplyPrice: v.number(),
    salePrice: v.number(),
    discountAmount: v.optional(v.number()),
    thumbnailUrl: v.optional(v.string()),
    detailImageUrl: v.optional(v.string()),
    order: v.number(),
    isActive: v.boolean(),
  },
  handler: async (ctx, { id, ...fields }) => {
    await ctx.db.patch(id, fields);
  },
});

export const remove = mutation({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const reorder = mutation({
  args: { items: v.array(v.object({ id: v.id("products"), order: v.number() })) },
  handler: async (ctx, args) => {
    for (const item of args.items) {
      await ctx.db.patch(item.id, { order: item.order });
    }
  },
});
