<template>
  <section class="space-y-6">
    <BreadcrumbNav :items="breadcrumbs" />
    <section class="card">
      <h1 class="text-2xl font-bold">{{ districtTitle }}</h1>
      <p class="mt-2 text-sm text-slate-700">
        秦皇岛市各区县本地商家聚合入口：覆盖足疗棋牌、美容民宿、家政建材防水等服务行业，支持地图与结构化数据扩展。
      </p>

      <p v-if="primaryDistrictMerchant" class="mt-4 text-sm text-slate-600">
        <span class="text-slate-500">本区门店：</span>
        <RouterLink
          :to="primaryDistrictMerchant.path"
          class="font-medium text-slate-900 underline-offset-2 hover:underline"
        >
          {{ primaryDistrictMerchant.name }}
        </RouterLink>
        <span class="text-slate-500">（可在商家列表查看全部）</span>
      </p>

      <div class="mt-5 grid gap-4 md:grid-cols-2">
        <RouterLink :to="merchantListPath" class="card transition hover:border-slate-300 hover:bg-slate-50/80">
          <h2 class="text-xl font-semibold">商家列表</h2>
          <h3 class="mt-1 text-sm text-slate-600">查看该区县全部商家入口</h3>
        </RouterLink>
        <RouterLink :to="servicePath" class="card transition hover:border-slate-300 hover:bg-slate-50/80">
          <h2 class="text-xl font-semibold">服务项目模板</h2>
          <h3 class="mt-1 text-sm text-slate-600">查看统一服务项目详情模板</h3>
        </RouterLink>
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
import { getDefaultServiceSlug } from "../config/geoConfig";
import { listMerchantsForDistrict } from "../config/merchants";
import { useGeoPage } from "../composables/useGeoPage";

const { locationContext, breadcrumbs } = useGeoPage({
  pageType: "district",
  customTitle: ({ locationContext }) =>
    `${locationContext.province?.name || ""}${locationContext.city?.name || ""}${locationContext.district?.name || ""}区县商家服务模板`,
  customDescription: ({ locationContext }) =>
    `秦皇岛市${locationContext.district?.name || "区县"}本地商家与服务导航，含足疗按摩、棋牌、美容养生、民宿、家政、建材防水等行业，适配百度与 AI 搜索 GEO。`,
  keywordsExtra: "秦皇岛区县,本地商家",
  faq: ({ locationContext }) => [
    {
      question: `${locationContext.district?.name || "该区县"}页面的作用是什么？`,
      answer: "用于承接区县级流量，并统一分发到商家列表与服务详情模板。"
    },
    {
      question: "秦皇岛区县页面是否支持行业扩展？",
      answer: "支持，可在配置中增减服务行业与门店数据，模板自动同步标题、描述与面包屑。"
    }
  ]
});

const districtTitle = computed(
  () =>
    `${locationContext.value.province?.name || ""} ${locationContext.value.city?.name || ""} ${locationContext.value.district?.name || ""} 区县模板页`
);

const merchantListPath = computed(
  () =>
    `/${locationContext.value.province?.slug}/${locationContext.value.city?.slug}/${locationContext.value.district?.slug}/merchants`
);
const servicePath = computed(
  () =>
    `/${locationContext.value.province?.slug}/${locationContext.value.city?.slug}/${locationContext.value.district?.slug}/services/${getDefaultServiceSlug()}`
);

/** 海港区等：展示配置中的首个真实门店入口 */
const primaryDistrictMerchant = computed(() => {
  const p = locationContext.value.province;
  const c = locationContext.value.city;
  const d = locationContext.value.district;
  if (!p || !c || !d) return null;
  const first = listMerchantsForDistrict({
    provinceSlug: p.slug,
    citySlug: c.slug,
    districtSlug: d.slug
  })[0];
  if (!first) return null;
  return {
    name: first.name,
    path: `/${p.slug}/${c.slug}/${d.slug}/merchants/${first.slug}`
  };
});
</script>
