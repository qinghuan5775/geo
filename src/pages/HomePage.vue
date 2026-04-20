<template>
  <section class="space-y-6">
    <BreadcrumbNav :items="breadcrumbs" />

    <section class="pro-card">
      <p class="text-xs text-slate-500">{{ siteConfig.siteTagline }}</p>
      <h1 class="mt-2 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
        {{ siteConfig.siteName }}
      </h1>
      <p class="mt-4 text-sm leading-relaxed text-slate-600">
        覆盖<strong class="font-medium text-slate-800">海港区、北戴河区、山海关区、抚宁区</strong>
        实体门店；足疗棋牌、美业民宿、家政、建材防水等行业。把店名、服务、电话写清楚，方便顾客在搜索和 AI 问答里找到您。
      </p>

      <div class="mt-8 grid gap-6 md:grid-cols-2">
        <div>
          <h2 class="text-sm font-semibold text-slate-900">区县入口</h2>
          <p class="mt-2 text-sm text-slate-600">与顶部导航一致，可进入对应区县专题页。</p>
          <ul class="mt-3 space-y-2">
            <li v-for="province in geoConfig.provinces" :key="province.slug">
              <p class="text-xs font-medium uppercase tracking-wide text-slate-400">{{ province.name }}</p>
              <div class="mt-2 flex flex-wrap gap-2">
                <RouterLink
                  v-for="city in province.cities"
                  :key="city.slug"
                  class="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                  :to="`/${province.slug}/${city.slug}`"
                >
                  {{ city.name }} · 总览
                </RouterLink>
              </div>
            </li>
          </ul>
        </div>
        <div class="rounded-xl border border-slate-100 bg-slate-50/90 p-5">
          <h2 class="text-sm font-semibold text-slate-900">对您店的直接价值</h2>
          <ul class="mt-3 space-y-2.5 text-sm leading-relaxed text-slate-600">
            <li class="flex gap-2"><span class="shrink-0 text-slate-400">—</span>减少「搜店名却搜不到」的机会成本</li>
            <li class="flex gap-2"><span class="shrink-0 text-slate-400">—</span>突出营业时间、项目、预约方式，咨询更精准</li>
            <li class="flex gap-2"><span class="shrink-0 text-slate-400">—</span>页面结构规范，利于百度收录与 AI 引用展示</li>
          </ul>
        </div>
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
import { siteConfig } from "../config/siteConfig";
import { createJsonLdPayloads, useSeo } from "../composables/useSeo";

const primaryProvince = geoConfig.provinces[0];
const primaryCity = primaryProvince?.cities[0];

const breadcrumbs = computed(() => {
  if (!primaryProvince || !primaryCity) {
    return [{ name: "首页", path: "/" }];
  }
  return [
    { name: "首页", path: "/" },
    { name: primaryProvince.name, path: `/${primaryProvince.slug}` },
    { name: primaryCity.name, path: `/${primaryProvince.slug}/${primaryCity.slug}` }
  ];
});

useSeo(() => {
  const title = siteConfig.siteName;
  const description = `${siteConfig.siteTagline}。${siteConfig.cityName}（${siteConfig.provinceName}）实体店：海港区、北戴河区、山海关区、抚宁区；行业含${siteConfig.serviceKeywords.replace(/,/g, "、")}；百度与 AI 搜索友好落地页。`;
  const keywords = `清欢GEO,秦皇岛,河北,海港区,北戴河区,山海关区,抚宁区,${siteConfig.serviceKeywords},实体店,本地获客,百度SEO,AI搜索`;
  const jsonLd = createJsonLdPayloads({
    pageUrl: siteConfig.baseUrl,
    title,
    description,
    breadcrumbs: breadcrumbs.value,
    locationName: `${siteConfig.provinceName}${siteConfig.cityName}`,
    faq: [
      {
        question: "本站覆盖秦皇岛哪些区县？",
        answer: "当前配置包含海港区、山海关区、北戴河区、抚宁区，可在配置中扩展。"
      },
      {
        question: "支持哪些本地服务行业？",
        answer:
          "足疗按摩、棋牌室、美容养生、民宿、家政服务、建材防水等行业均可使用同一套模板生成落地页。"
      }
    ]
  });

  return {
    title,
    description,
    keywords,
    jsonLd
  };
});
</script>
