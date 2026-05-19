import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: {
    type: v.string(),
    name: v.string(),
    phone: v.string(),
    region: v.string(),
    consultingTime: v.optional(v.string()),
    hasStore: v.boolean(),
    industry: v.optional(v.string()),
    storeName: v.optional(v.string()),
    coreMenu: v.optional(v.string()),
    storeSize: v.optional(v.string()),
    interestMenus: v.array(v.string()),
    interestTypes: v.array(v.string()),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const inquiryId = await ctx.db.insert("inquiries", {
      ...args,
      status: "pending",
      createdAt: Date.now(),
    });
    return inquiryId;
  },
});

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("inquiries").order("desc").collect();
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("inquiries"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: args.status });
  },
});

export const remove = mutation({
  args: {
    id: v.id("inquiries"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

