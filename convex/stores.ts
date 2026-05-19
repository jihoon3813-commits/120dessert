import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("stores").order("desc").collect();
  },
});

export const create = mutation({
  args: {
    storeId: v.string(),
    password: v.string(),
    storeName: v.string(),
    ownerName: v.string(),
    contact: v.string(),
    address: v.string(),
    detailAddress: v.optional(v.string()),
    menus: v.array(v.string()),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if storeId already exists
    const existing = await ctx.db
      .query("stores")
      .filter((q) => q.eq(q.field("storeId"), args.storeId))
      .first();

    if (existing) {
      throw new Error("이미 존재하는 아이디입니다.");
    }

    const id = await ctx.db.insert("stores", {
      ...args,
      createdAt: Date.now(),
    });
    return id;
  },
});

export const update = mutation({
  args: {
    id: v.id("stores"),
    storeId: v.string(),
    password: v.string(),
    storeName: v.string(),
    ownerName: v.string(),
    contact: v.string(),
    address: v.string(),
    detailAddress: v.optional(v.string()),
    menus: v.array(v.string()),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const { id, ...data } = args;
    
    // Check if storeId already exists for a different store
    const existing = await ctx.db
      .query("stores")
      .filter((q) => q.eq(q.field("storeId"), args.storeId))
      .first();

    if (existing && existing._id !== id) {
      throw new Error("이미 존재하는 아이디입니다.");
    }

    await ctx.db.patch(id, data);
  },
});

export const remove = mutation({
  args: {
    id: v.id("stores"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const checkLogin = query({
  args: {
    storeId: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const store = await ctx.db
      .query("stores")
      .filter((q) => q.eq(q.field("storeId"), args.storeId))
      .first();

    if (!store || store.password !== args.password) {
      return null;
    }
    
    // Check status is allowed to log in (승인)
    if (store.status !== "승인") {
      return { error: `로그인이 불가능한 상태입니다. (현재 상태: ${store.status})` };
    }

    return { store };
  },
});

export const login = mutation({
  args: {
    storeId: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const store = await ctx.db
      .query("stores")
      .filter((q) => q.eq(q.field("storeId"), args.storeId))
      .first();

    if (!store || store.password !== args.password) {
      throw new Error("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
    
    if (store.status !== "승인") {
      throw new Error(`로그인이 불가능한 상태입니다. (현재 상태: ${store.status})`);
    }

    return store;
  },
});

export const getByStoreId = query({
  args: {
    storeId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("stores")
      .filter((q) => q.eq(q.field("storeId"), args.storeId))
      .first();
  },
});

export const seedDefault = mutation({
  handler: async (ctx) => {
    const existing = await ctx.db.query("stores").first();
    if (!existing) {
      await ctx.db.insert("stores", {
        storeId: "owner",
        password: "owner",
        storeName: "강남역점",
        ownerName: "김점주",
        contact: "010-1234-5678",
        address: "서울 강남구 강남대로 396",
        detailAddress: "1층",
        menus: ["120겹파이", "에그120", "크루아상", "에그타르트", "기타메뉴"],
        status: "승인",
        createdAt: Date.now(),
      });
    }
  },
});
