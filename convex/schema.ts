import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  inquiries: defineTable({
    type: v.string(), // 신규 도입, 공동간판, 단독 전환, 추가 도입
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
    status: v.string(), // pending, contacted, completed
    createdAt: v.number(),
  }),
  portalMenus: defineTable({
    label: v.string(),
    action: v.string(),
    iconName: v.string(),
    link: v.string(),
    order: v.number(),
    isVisible: v.boolean(),
  }),
  categories: defineTable({
    name: v.string(),
    order: v.number(),
  }),
  products: defineTable({
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
  }),
  orders: defineTable({
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
    status: v.string(), // pending, shipping, completed
    createdAt: v.number(),
  }),
  stores: defineTable({
    storeId: v.string(), // 아이디
    password: v.string(), // 비밀번호
    storeName: v.string(), // 가맹점명
    ownerName: v.string(), // 점주명
    contact: v.string(), // 연락처
    address: v.string(), // 도로명 주소
    detailAddress: v.optional(v.string()), // 상세 주소
    menus: v.array(v.string()), // 도입 메뉴 목록
    status: v.string(), // 승인 / 보류 / 중지 / 폐업
    createdAt: v.number(),
  }),
  storeInquiries: defineTable({
    storeName: v.string(),
    type: v.string(), // 1:1문의, 건의하기, 추가 메뉴 등
    title: v.string(),
    content: v.string(),
    status: v.string(), // 대기중, 답변완료
    reply: v.optional(v.string()),
    createdAt: v.number(),
  }),
  materials: defineTable({
    title: v.string(),
    type: v.string(), // 교육자료, 홍보물
    format: v.string(),
    fileUrl: v.optional(v.string()),
    isVisible: v.boolean(),
    createdAt: v.number(),
  }),
  notices: defineTable({
    title: v.string(),
    content: v.string(),
    isVisible: v.boolean(),
    createdAt: v.number(),
  }),
});
