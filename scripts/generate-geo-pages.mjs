/**
 * 批量生成静态 GEO 页面（与 src/config/geoConfig.js 同步）
 * 产出：各市首页、各区县页、各区县 × 各行业服务页
 * 每页含 title、description、keywords、Organization / Breadcrumb / LocalBusiness / FAQ JSON-LD
 *
 * 用法：npm run generate:geo
 * 输出：generated/geo-static/...
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { geoConfig } from "../src/config/geoConfig.js";
import { siteConfig } from "../src/config/siteConfig.js";
import { createJsonLdPayloads } from "../src/seo/createJsonLdPayloads.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_ROOT = join(__dirname, "..", "generated", "geo-static");

function escAttr(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function ensureDir(p) {
  mkdirSync(p, { recursive: true });
}

function writePage(relDir, filename, html) {
  const dir = join(OUT_ROOT, relDir);
  ensureDir(dir);
  writeFileSync(join(dir, filename), html, "utf8");
}

function buildHtml({ title, description, keywords, routePath, jsonLd, h1, lead }) {
  const canonical = `${siteConfig.baseUrl}${routePath}`;
  const ldScripts = jsonLd
    .map((payload) => `<script type="application/ld+json">${JSON.stringify(payload)}</script>`)
    .join("\n    ");

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escAttr(title)}</title>
  <meta name="description" content="${escAttr(description)}" />
  <meta name="keywords" content="${escAttr(keywords)}" />
  <link rel="canonical" href="${escAttr(canonical)}" />
  ${ldScripts}
</head>
<body>
  <main style="font-family: system-ui, sans-serif; max-width: 42rem; margin: 2rem auto; padding: 0 1rem;">
    <h1>${escAttr(h1)}</h1>
    <p style="line-height: 1.6; color: #334155;">${escAttr(lead)}</p>
    <p style="margin-top: 1.5rem;">
      <a href="${escAttr(routePath)}" style="color: #2563eb;">打开 SPA 在线版</a>
      <span style="color: #94a3b8;">（与站内路由一致）</span>
    </p>
  </main>
</body>
</html>
`;
}

function keywordsBase({ province, city, district }) {
  const loc = [province?.name, city?.name, district?.name].filter(Boolean).join(",");
  return [
    loc,
    city?.name,
    "本地商家",
    "GEO优化",
    "百度SEO",
    "AI搜索优化",
    siteConfig.serviceKeywords
  ]
    .filter(Boolean)
    .join(",");
}

const manifest = [];

geoConfig.provinces.forEach((province) => {
  province.cities.forEach((city) => {
    const cityPath = `/${province.slug}/${city.slug}`;

    // —— 市首页 ——
    const cityTitle = `${province.name}${city.name}本地商家GEO服务聚合页`;
    const cityDesc = `${city.name}本地商家与区县导航：足疗按摩、棋牌室、美容养生、民宿、家政服务、建材防水等行业，支持百度 SEO 与 AI 搜索 GEO 结构化展示。`;
    const cityBreadcrumbs = [
      { name: "首页", path: "/" },
      { name: province.name, path: `/${province.slug}` },
      { name: city.name, path: cityPath }
    ];
    const cityLocation = [province.name, city.name].filter(Boolean).join(" ");
    const cityKeywords = `${province.name},${city.name},本地商家,GEO,百度SEO,AI搜索,${siteConfig.serviceKeywords}`;
    const cityJsonLd = createJsonLdPayloads({
      pageUrl: `${siteConfig.baseUrl}${cityPath}`,
      title: cityTitle,
      description: cityDesc,
      breadcrumbs: cityBreadcrumbs,
      locationName: cityLocation,
      faq: [
        {
          question: `${city.name}页面包含什么内容？`,
          answer: "包含区县导航、商家入口、服务项目入口与结构化数据优化模块。"
        },
        {
          question: `${city.name}以外的城市能否使用同一模板？`,
          answer: "可以，仅需在地区配置中替换省市区县变量，标题、描述与面包屑会随之自动更新。"
        }
      ]
    });
    const cityHtml = buildHtml({
      title: cityTitle,
      description: cityDesc,
      keywords: cityKeywords,
      routePath: cityPath,
      jsonLd: cityJsonLd,
      h1: `${province.name} ${city.name} · 本地商家 GEO 首页（静态版）`,
      lead: cityDesc
    });
    writePage(join(province.slug, city.slug), "index.html", cityHtml);
    manifest.push({ type: "city", path: cityPath, title: cityTitle });

    city.districts.forEach((district) => {
      const districtPath = `${cityPath}/${district.slug}`;

      // —— 区县页 ——
      const dTitle = `${province.name}${city.name}${district.name}区县商家服务模板`;
      const dDesc = `${city.name}${district.name}本地商家与服务导航，含足疗按摩、棋牌、美容养生、民宿、家政、建材防水等行业，适配百度与 AI 搜索 GEO。`;
      const dBreadcrumbs = [
        { name: "首页", path: "/" },
        { name: province.name, path: `/${province.slug}` },
        { name: city.name, path: cityPath },
        { name: district.name, path: districtPath }
      ];
      const dLocation = [province.name, city.name, district.name].filter(Boolean).join(" ");
      const dJsonLd = createJsonLdPayloads({
        pageUrl: `${siteConfig.baseUrl}${districtPath}`,
        title: dTitle,
        description: dDesc,
        breadcrumbs: dBreadcrumbs,
        locationName: dLocation,
        faq: [
          {
            question: `${district.name}页面的作用是什么？`,
            answer: "用于承接区县级流量，并统一分发到商家列表与服务详情模板。"
          },
          {
            question: `${city.name}区县页面是否支持行业扩展？`,
            answer: "支持，可在配置中增减服务行业与门店数据，模板自动同步标题、描述与面包屑。"
          }
        ]
      });
      const dHtml = buildHtml({
        title: dTitle,
        description: dDesc,
        keywords: keywordsBase({ province, city, district }),
        routePath: districtPath,
        jsonLd: dJsonLd,
        h1: `${city.name} ${district.name} · 区县 GEO 页面（静态版）`,
        lead: dDesc
      });
      writePage(join(province.slug, city.slug, district.slug), "index.html", dHtml);
      manifest.push({ type: "district", path: districtPath, title: dTitle });

      // —— 区县 × 服务行业 ——
      geoConfig.serviceIndustries.forEach((svc) => {
        const servicePath = `${districtPath}/services/${svc.slug}`;
        const sTitle = `${city.name}${district.name}${svc.name}-本地服务GEO落地页`;
        const sDesc = `${province.name}${city.name}${district.name}${svc.name}：面向百度与 AI 搜索的本地化服务介绍、预约与 FAQ 区块，含 Breadcrumb 与结构化数据。`;
        const sBreadcrumbs = [
          { name: "首页", path: "/" },
          { name: province.name, path: `/${province.slug}` },
          { name: city.name, path: cityPath },
          { name: district.name, path: districtPath },
          { name: svc.name, path: servicePath }
        ];
        const sJsonLd = createJsonLdPayloads({
          pageUrl: `${siteConfig.baseUrl}${servicePath}`,
          title: sTitle,
          description: sDesc,
          breadcrumbs: sBreadcrumbs,
          locationName: dLocation,
          faq: [
            {
              question: `${svc.name}服务如何预约？`,
              answer: "可接入在线表单、电话与 IM 客服等多种预约方式。"
            },
            {
              question: "服务项目页面支持哪些 SEO 元素？",
              answer: "支持完整 meta 标签、JSON-LD、面包屑与 AI 引用优化区块。"
            }
          ]
        });
        const sHtml = buildHtml({
          title: sTitle,
          description: sDesc,
          keywords: `${keywordsBase({ province, city, district })},${svc.name},本地服务`,
          routePath: servicePath,
          jsonLd: sJsonLd,
          h1: `${city.name} ${district.name} · ${svc.name}（静态版）`,
          lead: sDesc
        });
        writePage(
          join(province.slug, city.slug, district.slug, "services", svc.slug),
          "index.html",
          sHtml
        );
        manifest.push({ type: "service", path: servicePath, title: sTitle });
      });
    });
  });
});

writeFileSync(join(OUT_ROOT, "manifest.json"), JSON.stringify(manifest, null, 2), "utf8");

const cityCount = manifest.filter((m) => m.type === "city").length;
const districtCount = manifest.filter((m) => m.type === "district").length;
const serviceCount = manifest.filter((m) => m.type === "service").length;

console.log("GEO 静态页生成完成");
console.log(`输出目录: ${OUT_ROOT}`);
console.log(`市首页: ${cityCount} ｜ 区县页: ${districtCount} ｜ 服务页: ${serviceCount} ｜ 合计: ${manifest.length}`);
console.log(`清单: ${join(OUT_ROOT, "manifest.json")}`);
