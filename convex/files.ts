import { mutation } from "./_generated/server";
import { v } from "convex/values";

/** 클라이언트가 파일을 직접 업로드할 수 있는 서명된 URL 발급 */
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

/** 업로드 후 storageId → 공개 URL 변환 */
export const getStorageUrl = mutation({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});
