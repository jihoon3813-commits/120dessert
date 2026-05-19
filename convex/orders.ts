import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// List all orders (sorted by newest)
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("orders")
      .order("desc")
      .collect();
  },
});

// Create a new order
export const create = mutation({
  args: {
    storeName: v.string(),
    items: v.array(
      v.object({
        productId: v.id("products"),
        name: v.string(),
        quantity: v.number(),
        supplyPrice: v.number(),
        totalPrice: v.number(),
      })
    ),
    totalAmount: v.number(),
    paymentMethod: v.optional(v.string()),
    paymentStatus: v.optional(v.string()),
    approveNo: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // 1. Create order
    const orderId = await ctx.db.insert("orders", {
      storeName: args.storeName,
      items: args.items,
      totalAmount: args.totalAmount,
      status: "pending",
      createdAt: Date.now(),
      paymentMethod: args.paymentMethod,
      paymentStatus: args.paymentStatus,
      approveNo: args.approveNo,
    });

    // 2. Deduct product inventory quantities
    for (const item of args.items) {
      const product = await ctx.db.get(item.productId);
      if (product) {
        const newQty = Math.max(0, product.quantity - item.quantity);
        await ctx.db.patch(item.productId, { quantity: newQty });
      }
    }

    return orderId;
  },
});

// Update order status
export const updateStatus = mutation({
  args: {
    id: v.id("orders"),
    status: v.string(), // pending, shipping, completed
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: args.status,
    });
    return args.id;
  },
});

// Remove/Cancel order
export const remove = mutation({
  args: {
    id: v.id("orders"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return { success: true };
  },
});
