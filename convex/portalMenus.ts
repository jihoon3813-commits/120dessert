import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// List all portal menus, sorted by order
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("portalMenus").collect();
  },
});

// Seed default portal menus if none exist
export const seedDefault = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("portalMenus").collect();
    if (existing.length > 0) {
      return { success: false, message: "Already seeded" };
    }

    const defaults = [
      { label: "주문하기", action: "바로 주문하기", iconName: "Package", link: "/order", order: 1, isVisible: true },
      { label: "주문내역", action: "내역 조회", iconName: "ClipboardList", link: "/orders", order: 2, isVisible: true },
      { label: "1:1 문의", action: "문의 남기기", iconName: "MessageSquare", link: "/inquiries", order: 3, isVisible: true },
      { label: "건의하기", action: "의견 접수", iconName: "Megaphone", link: "/suggestions", order: 4, isVisible: true },
      { label: "교육자료", action: "자료 보기", iconName: "FileText", link: "/education", order: 5, isVisible: true },
      { label: "홍보물", action: "다운로드", iconName: "FolderDown", link: "/promotions", order: 6, isVisible: true },
    ];

    for (const item of defaults) {
      await ctx.db.insert("portalMenus", item);
    }

    return { success: true, message: "Successfully seeded" };
  },
});

// Create a new portal menu item
export const create = mutation({
  args: {
    label: v.string(),
    action: v.string(),
    iconName: v.string(),
    link: v.string(),
    order: v.number(),
    isVisible: v.boolean(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("portalMenus", {
      label: args.label,
      action: args.action,
      iconName: args.iconName,
      link: args.link,
      order: args.order,
      isVisible: args.isVisible,
    });
    return id;
  },
});

// Update an existing portal menu item
export const update = mutation({
  args: {
    id: v.id("portalMenus"),
    label: v.string(),
    action: v.string(),
    iconName: v.string(),
    link: v.string(),
    order: v.number(),
    isVisible: v.boolean(),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    await ctx.db.patch(id, fields);
    return id;
  },
});

// Remove a portal menu item
export const remove = mutation({
  args: {
    id: v.id("portalMenus"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return { success: true };
  },
});

// Update reorder for bulk sorting updates
export const reorder = mutation({
  args: {
    items: v.array(
      v.object({
        id: v.id("portalMenus"),
        order: v.number(),
      })
    ),
  },
  handler: async (ctx, args) => {
    for (const item of args.items) {
      await ctx.db.patch(item.id, { order: item.order });
    }
    return { success: true };
  },
});
