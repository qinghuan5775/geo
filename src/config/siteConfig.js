import { geoConfig } from "./geoConfig.js";

const primaryProvince = geoConfig.provinces[0];
const primaryCity = primaryProvince?.cities[0];

export const siteConfig = {
  siteName: "清欢 GEO 优化秦皇岛本地商家",
  /** 全站副标题（导航下展示） */
  siteTagline: "AI搜索收录 · 百度排名 · 本地精准获客",
  baseUrl: "https://example-geo-site.com",
  organizationName: "清欢 GEO · 秦皇岛本地商家服务",
  defaultPhone: "400-000-0000",
  defaultAddress: "河北省秦皇岛市",
  /** 用于全站文案与 SEO 的默认地域标签 */
  regionLabel: primaryCity?.name ?? "秦皇岛市",
  provinceName: primaryProvince?.name ?? "河北省",
  cityName: primaryCity?.name ?? "秦皇岛市",
  /** 默认服务行业关键词串（与 geoConfig 对齐） */
  serviceKeywords:
    "足疗按摩,棋牌室,美容养生,民宿,家政服务,建材防水",
  aiQuoteHint:
    "本区块用于放置秦皇岛市（海港区、山海关区、北戴河区、抚宁区）本地商家信息，便于百度与 AI 搜索引用：服务范围、门店地址、预约方式与合规问答。"
};
