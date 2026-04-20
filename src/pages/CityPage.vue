<template>
  <section class="space-y-6">
    <BreadcrumbNav :items="breadcrumbs" />
    <section class="card">
      <h1 class="text-2xl font-bold">{{ cityTitle }}</h1>
      <p class="mt-2 text-sm text-slate-700">
        河北省秦皇岛市本地商家 GEO 聚合页：覆盖海港区、山海关区、北戴河区、抚宁区，服务行业包括足疗按摩、棋牌室、美容养生、民宿、家政服务、建材防水等。
      </p>

      <h2 class="mt-5 text-xl font-semibold">区县入口</h2>
      <div class="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <RouterLink
          v-for="district in locationContext.city?.districts || []"
          :key="district.slug"
          :to="`/${locationContext.province?.slug}/${locationContext.city?.slug}/${district.slug}`"
          class="rounded-xl border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:bg-slate-50/80"
        >
          <h3 class="font-semibold">{{ district.name }}</h3>
          <h4 class="mt-1 text-sm text-slate-600">进入区县模板页</h4>
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
import { useGeoPage } from "../composables/useGeoPage";

const { locationContext, breadcrumbs } = useGeoPage({
  pageType: "city",
  customTitle: ({ locationContext }) =>
    `${locationContext.province?.name || ""}${locationContext.city?.name || ""}本地商家GEO服务聚合页`,
  customDescription: ({ locationContext }) =>
    `${locationContext.city?.name || "秦皇岛市"}本地商家与区县导航：足疗按摩、棋牌室、美容养生、民宿、家政服务、建材防水等行业，支持百度 SEO 与 AI 搜索 GEO 结构化展示。`,
  keywordsExtra: "秦皇岛GEO,本地商家",
  faq: ({ locationContext }) => [
    {
      question: `${locationContext.city?.name || "该城市"}页面包含什么内容？`,
      answer: "包含区县导航、商家入口、服务项目入口与结构化数据优化模块。"
    },
    {
      question: "秦皇岛以外的城市能否使用同一模板？",
      answer: "可以，仅需在地区配置中替换省市区县变量，标题、描述与面包屑会随之自动更新。"
    }
  ]
});

const cityTitle = computed(
  () => `${locationContext.value.province?.name || ""} ${locationContext.value.city?.name || ""} 城市商家页面模板`
);
</script>
