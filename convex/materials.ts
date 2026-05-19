import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("materials").order("desc").collect();
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    type: v.string(),
    format: v.string(),
    fileUrl: v.optional(v.string()),
    isVisible: v.boolean(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("materials", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("materials"),
    title: v.string(),
    type: v.string(),
    format: v.string(),
    fileUrl: v.optional(v.string()),
    isVisible: v.boolean(),
  },
  handler: async (ctx, args) => {
    const { id, ...rest } = args;
    await ctx.db.patch(id, rest);
  },
});

export const remove = mutation({
  args: { id: v.id("materials") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
