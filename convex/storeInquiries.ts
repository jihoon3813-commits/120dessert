import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Create a new store inquiry
export const create = mutation({
  args: {
    storeName: v.string(),
    type: v.string(),
    title: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("storeInquiries", {
      ...args,
      status: "대기중",
      createdAt: Date.now(),
    });
  },
});

// List all store inquiries
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("storeInquiries").order("desc").collect();
  },
});

// Reply to an inquiry
export const reply = mutation({
  args: {
    id: v.id("storeInquiries"),
    reply: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      reply: args.reply,
      status: "답변완료",
    });
  },
});

// Remove an inquiry
export const remove = mutation({
  args: { id: v.id("storeInquiries") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
