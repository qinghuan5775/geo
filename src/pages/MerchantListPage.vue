<template>
  <section class="space-y-6">
    <BreadcrumbNav :items="breadcrumbs" />
    <section class="card">
      <h1 class="text-xl font-semibold tracking-tight text-slate-900">{{ listTitle }}</h1>
      <p class="mt-2 text-sm leading-relaxed text-slate-600">
        {{ listIntro }}
      </p>

      <div class="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="merchant in merchants"
          :key="merchant.slug"
          class="rounded-xl border border-slate-200 bg-white p-4 transition hover:border-slate-300"
          :class="merchant.isProfile ? 'border-slate-300 bg-slate-50/50' : ''"
        >
          <p v-if="merchant.isProfile" class="mb-1 text-[11px] font-medium uppercase tracking-wide text-slate-500">
            本区门店
          </p>
          <h2 class="text-base font-semibold text-slate-900">{{ merchant.name }}</h2>
          <h3 class="mt-1 text-xs text-slate-500">{{ merchant.category }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-slate-600">{{ merchant.summary }}</p>
          <RouterLink
            class="mt-4 inline-block text-sm font-medium text-slate-900 underline-offset-2 hover:underline"
            :to="merchant.path"
          >
            查看详情
          </RouterLink>
        </article>
      </div>
    </section>
    <AiContentBlock />
  </section>
</template>

<script setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";
import AiContentBlock from "../components/AiContentBlock.vue";
import BreadcrumbNav from "../components/BreadcrumbNav.vue";
import { geoConfig } from "../config/geoConfig";
import { listMerchantsForDistrict } from "../config/merchants";
import { useGeoPage } from "../composables/useGeoPage";

const { locationContext, breadcrumbs } = useGeoPage({
  pageType: "merchant-list",
  customTitle: ({ locationContext }) =>
    `秦皇岛市${locationContext.district?.name || ""}本地商家列表 - ${locationContext.city?.name || ""}GEO`,
  customDescription: ({ locationContext }) => {
    const d = locationContext.district?.name || "区县";
    const base = `河北省秦皇岛市${d}商家列表：足疗按摩、棋牌室、美容养生、民宿、家政服务、建材防水等行业，含门店详情与 GEO 结构化数据。`;
    if (locationContext.district?.slug === "haigang") {
      return `${base} 已收录：北城谣·野火锅（野火锅、烧烤、livehouse 现场）。`;
    }
    if (locationContext.district?.slug === "beidaihe") {
      return `${base} 已收录：路客近海民宿（北戴河近海住宿、刘庄夜市周边、ins 风民宿预订）。`;
    }
    return base;
  },
  keywordsExtra: ({ locationContext }) => {
    const slug = locationContext?.district?.slug;
    if (slug === "haigang") {
      return "北城谣,野火锅,秦皇岛海港区,livehouse,音乐火锅,夜生活,秦皇岛商家列表";
    }
    if (slug === "beidaihe") {
      return "路客近海民宿,北戴河,刘庄夜市,近海住宿,ins风民宿,秦皇岛商家列表";
    }
    return "秦皇岛商家列表";
  },
  faq: ({ locationContext }) => [
    {
      question: `${locationContext.district?.name || "本区"}有哪些常见本地服务行业？`,
      answer:
        "当前模板覆盖足疗按摩、棋牌室、美容养生、民宿、家政服务、建材防水等，可在后台对接真实门店数据。"
    },
    {
      question: "商家列表页的 SEO 会自动带上秦皇岛吗？",
      answer: "会，标题、描述、关键词与面包屑均包含省、市、区县等变量。"
    }
  ]
});

const merchants = computed(() => {
  const p = locationContext.value.province;
  const c = locationContext.value.city;
  const d = locationContext.value.district;
  if (!p || !c || !d) return [];

  const reals = listMerchantsForDistrict({
    provinceSlug: p.slug,
    citySlug: c.slug,
    districtSlug: d.slug
  }).map((m) => ({
    slug: m.slug,
    name: m.name,
    category: m.category,
    summary: m.summary,
    path: `/${p.slug}/${c.slug}/${d.slug}/merchants/${m.slug}`,
    isProfile: true
  }));

  const usedSlugs = new Set(reals.map((m) => m.slug));
  const types = geoConfig.merchantTypes;
  const placeholders = [];
  for (let index = 0; index < 6 && placeholders.length < 5; index++) {
    const slug = `merchant-${index + 1}`;
    if (usedSlugs.has(slug)) continue;
    placeholders.push({
      slug,
      name: `${d.name}示例商户${placeholders.length + 1}`,
      category: types[(index + placeholders.length) % types.length],
      summary: "模板占位条目，可替换为真实门店数据。",
      path: `/${p.slug}/${c.slug}/${d.slug}/merchants/${slug}`,
      isProfile: false
    });
  }

  return [...reals, ...placeholders];
});

const listTitle = computed(
  () => `${locationContext.value.city?.name || ""} ${locationContext.value.district?.name || ""} · 商家列表`
);

const listIntro = computed(() => {
  const d = locationContext.value.district;
  if (!d) {
    return "本页展示当前区县下的本地商户入口（含配置门店与占位示例）。";
  }
  const more =
    d.slug === "haigang"
      ? "已配置真实门店「北城谣·野火锅」详情，其余为占位示例。"
      : d.slug === "beidaihe"
        ? "已配置真实门店「路客近海民宿」详情，其余为占位示例。"
        : "以下为配置门店与占位示例。";
  return `秦皇岛市「${d.name}」${more}`;
});
</script>
