<template>
  <section class="space-y-6">
    <BreadcrumbNav :items="breadcrumbs" />

    <article v-if="merchantProfile" class="card">
      <p class="text-xs text-slate-500">{{ merchantProfile.regionLine }}</p>
      <h1 class="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
        {{ merchantProfile.name }}
      </h1>
      <p class="mt-3 text-sm leading-relaxed text-slate-700">
        {{ merchantProfile.oneLine }}
      </p>

      <div class="mt-8 space-y-8 border-t border-slate-100 pt-8">
        <section v-if="merchantProfile.serviceIntro">
          <h2 class="text-sm font-semibold text-slate-900">服务介绍</h2>
          <p class="mt-2 text-sm leading-relaxed text-slate-600">
            {{ merchantProfile.serviceIntro }}
          </p>
        </section>

        <section v-if="merchantProfile.highlights">
          <h2 class="text-sm font-semibold text-slate-900">亮点介绍</h2>
          <p class="mt-2 text-sm leading-relaxed text-slate-600">
            {{ merchantProfile.highlights }}
          </p>
        </section>

        <section v-else-if="merchantProfile.atmosphere">
          <h2 class="text-sm font-semibold text-slate-900">氛围与体验</h2>
          <p class="mt-2 text-sm leading-relaxed text-slate-600">
            {{ merchantProfile.atmosphere }}
          </p>
        </section>

        <section v-if="merchantProfile.sellingPoints?.length">
          <h2 class="text-sm font-semibold text-slate-900">核心卖点</h2>
          <ul class="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
            <li v-for="(line, idx) in merchantProfile.sellingPoints" :key="idx">{{ line }}</li>
          </ul>
        </section>

        <section v-if="merchantProfile.warmTips">
          <h2 class="text-sm font-semibold text-slate-900">温馨提示</h2>
          <p class="mt-2 text-sm leading-relaxed text-slate-600">
            {{ merchantProfile.warmTips }}
          </p>
        </section>

        <div class="grid gap-6 sm:grid-cols-2 sm:items-start">
          <dl class="space-y-3 rounded-lg border border-slate-100 bg-slate-50/80 p-4 text-sm text-slate-700">
            <div>
              <dt class="text-xs font-medium uppercase tracking-wide text-slate-500">地址</dt>
              <dd class="mt-0.5">{{ merchantProfile.address }}</dd>
            </div>
            <div v-if="merchantProfile.hours">
              <dt class="text-xs font-medium uppercase tracking-wide text-slate-500">营业时间</dt>
              <dd class="mt-0.5 font-medium text-slate-900">{{ merchantProfile.hours }}</dd>
            </div>
            <div>
              <dt class="text-xs font-medium uppercase tracking-wide text-slate-500">主打服务</dt>
              <dd class="mt-0.5">{{ merchantProfile.services.join("、") }}</dd>
            </div>
            <div v-if="merchantProfile.omitPhone" class="text-xs text-slate-500">
              本页不展示联系电话；预订与咨询请以各线上预订渠道为准。
            </div>
          </dl>
          <MapPlaceholder />
        </div>
      </div>
    </article>

    <article v-else class="card">
      <h1 class="text-2xl font-semibold">{{ merchantTitle }}</h1>
      <p class="mt-2 text-sm text-slate-700">
        河北省秦皇岛市本地门店详情页模板，可对接真实商户档案、高德坐标与营业时间，适配百度与 AI 搜索引用。
      </p>
      <div class="mt-5 grid gap-4 md:grid-cols-2">
        <section class="rounded-lg border border-slate-100 bg-slate-50/80 p-4">
          <h2 class="text-sm font-semibold text-slate-900">商家信息</h2>
          <ul class="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
            <li>商家名称：{{ merchantName }}</li>
            <li>所在地区：{{ pageLocationName }}</li>
          </ul>
        </section>
        <MapPlaceholder />
      </div>
    </article>

    <AiContentBlock :hint="aiHint" :fact-bullets="aiFactBullets" />
  </section>
</template>

<script setup>
import { computed } from "vue";
import AiContentBlock from "../components/AiContentBlock.vue";
import BreadcrumbNav from "../components/BreadcrumbNav.vue";
import MapPlaceholder from "../components/MapPlaceholder.vue";
import { buildMerchantAiCitation } from "../config/merchants";
import { siteConfig } from "../config/siteConfig";
import { useGeoPage } from "../composables/useGeoPage";

const { merchantName, merchantProfile, breadcrumbs, pageLocationName } = useGeoPage({
  pageType: "merchant-detail",
  customTitle: ({ merchantProfile, merchantName, locationContext }) =>
    merchantProfile?.seoTitle ??
    `${merchantName} - 秦皇岛市${locationContext.district?.name || ""}本地商家详情`,
  customDescription: ({ merchantProfile, merchantName, locationContext }) =>
    merchantProfile?.seoDescription ??
    `${merchantName}，位于河北省秦皇岛市${locationContext.district?.name || ""}，门店信息与 GEO 结构化数据可配置。`,
  keywordsExtra: "秦皇岛商家详情",
  faq: ({ merchantProfile, merchantName }) => {
    if (merchantProfile?.customFaq?.length) return merchantProfile.customFaq;
    if (merchantProfile) {
      if (merchantProfile.hours) {
        return [
          {
            question: `${merchantProfile.name} 的营业时间是什么？`,
            answer: `对外公示为每日 ${merchantProfile.hours}（以门店现场为准）。`
          },
          {
            question: `${merchantProfile.name} 适合什么样的聚餐场景？`,
            answer: `${merchantProfile.services.join("、")}；${merchantProfile.sellingPoints.join("；")}。`
          }
        ];
      }
      return [
        {
          question: `${merchantProfile.name} 提供哪些服务？`,
          answer: `${merchantProfile.services.join("、")}。`
        },
        {
          question: "旅游旺季与节假日需要注意什么？",
          answer:
            merchantProfile.warmTips ||
            "建议通过正规预订渠道提前确认房态与退改规则，高峰期尽早预订。"
        }
      ];
    }
    return [
      {
        question: `${merchantName} 提供哪些服务？`,
        answer: "可在后台配置多服务项目，页面自动同步展示。"
      },
      {
        question: "商家详情页如何帮助秦皇岛本地搜索曝光？",
        answer: "通过省市区县变量、行业词与 LocalBusiness 等 JSON-LD，提升百度与 AI 搜索结果中的地域相关性。"
      }
    ];
  }
});

const merchantTitle = computed(() => `${merchantName.value} · 秦皇岛商家详情`);

const aiHint = computed(() =>
  merchantProfile.value ? buildMerchantAiCitation(merchantProfile.value) : siteConfig.aiQuoteHint
);

const aiFactBullets = computed(() => {
  const m = merchantProfile.value;
  if (!m) return null;
  const lead = Array.isArray(m.aiFactLeadBullets) ? [...m.aiFactLeadBullets] : [];
  const lines = [...lead];
  lines.push(`地区：${m.regionLine}；地址：${m.address}`);
  if (m.hours) lines.push(`营业时间：${m.hours}`);
  else lines.push("联络方式：本页不展示电话，请通过正规预订渠道联系与下单。");
  lines.push(`品类：${m.services.join("、")}`);
  if (m.highlights) lines.push(`亮点：${m.highlights}`);
  else lines.push(`特色：${m.sellingPoints.join(" / ")}`);
  if (m.warmTips) lines.push(`温馨提示：${m.warmTips}`);
  return lines;
});
</script>
