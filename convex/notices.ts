import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("notices").order("desc").collect();
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    isVisible: v.boolean(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("notices", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("notices"),
    title: v.string(),
    content: v.string(),
    isVisible: v.boolean(),
  },
  handler: async (ctx, args) => {
    const { id, ...rest } = args;
    await ctx.db.patch(id, rest);
  },
});

export const remove = mutation({
  args: { id: v.id("notices") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const seedDefault = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("notices").first();
    if (existing) return;

    const defaults = [
      { title: "동절기 배송 일정 단축 안내", content: "안녕하세요 본사입니다. 동절기 한파로 인한 배송 지연을 미연에 방지하고자 배송 일정을 일시 단축합니다. 자세한 배송 노선별 시간표는 배송조회 메뉴를 참고 부탁드립니다.", isVisible: true, createdAt: Date.now() - 3600000 * 24 * 3 },
      { title: "에그120 신규 홍보물 업로드 안내", content: "에그120 신메뉴 전용 테이블 텐트 및 POP 시안이 홍보물 자료실에 업로드 되었습니다. 가맹점주님들께서는 자유롭게 다운로드 받아 사용하시기 바랍니다.", isVisible: true, createdAt: Date.now() - 3600000 * 24 * 10 },
      { title: "10월 시스템 점검 안내 (완료)", content: "서버 안정화를 위한 정기 점검이 완료되었습니다. 이용에 불편을 드려 죄송합니다. 더 안정적인 서비스를 제공하겠습니다.", isVisible: true, createdAt: Date.now() - 3600000 * 24 * 15 }
    ];

    for (const d of defaults) {
      await ctx.db.insert("notices", d);
    }
  }
});
