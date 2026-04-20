<template>
  <section class="space-y-6">
    <BreadcrumbNav :items="breadcrumbs" />
    <section class="card">
      <h1 class="text-2xl font-bold">{{ serviceTitle }}</h1>
      <p class="mt-2 text-sm text-slate-700">
        秦皇岛市各区县服务行业落地页（足疗按摩、棋牌室、美容养生、民宿、家政服务、建材防水等），标题与描述随区县与服务类型自动变化。
      </p>

      <div class="mt-5 grid gap-4 md:grid-cols-2">
        <section class="card bg-slate-50">
          <h2 class="text-xl font-semibold">服务说明</h2>
          <h3 class="mt-2 text-sm text-slate-600">支持服务流程、价格区间、预约方式等字段化配置。</h3>
          <h4 class="mt-2 text-sm font-medium">推荐内容结构</h4>
          <ul class="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
            <li>服务适用人群</li>
            <li>服务步骤与交付标准</li>
            <li>常见问题和案例说明</li>
          </ul>
        </section>
        <MapPlaceholder />
      </div>
    </section>
    <AiContentBlock />
  </section>
</template>

<script setup>
import { computed } from "vue";
import AiContentBlock from "../components/AiContentBlock.vue";
import BreadcrumbNav from "../components/BreadcrumbNav.vue";
import MapPlaceholder from "../components/MapPlaceholder.vue";
import { useGeoPage } from "../composables/useGeoPage";

const { serviceName, breadcrumbs, locationContext } = useGeoPage({
  pageType: "service",
  customTitle: ({ serviceName, locationContext }) =>
    `秦皇岛市${locationContext.district?.name || ""}${serviceName}-本地服务GEO落地页`,
  customDescription: ({ serviceName, locationContext }) =>
    `河北省秦皇岛市${locationContext.district?.name || "区县"}${serviceName}：面向百度与 AI 搜索的本地化服务介绍、预约与 FAQ 区块，含 Breadcrumb 与结构化数据。`,
  keywordsExtra: "秦皇岛本地服务,行业落地页",
  faq: ({ serviceName }) => [
    {
      question: `${serviceName}服务如何预约？`,
      answer: "可接入在线表单、电话与IM客服等多种预约方式。"
    },
    {
      question: "服务项目页面支持哪些SEO元素？",
      answer: "支持完整meta标签、JSON-LD、面包屑与AI引用优化区块。"
    }
  ]
});

const serviceTitle = computed(
  () => `${locationContext.value.city?.name || ""} ${locationContext.value.district?.name || ""} ${serviceName.value} 服务模板`
);
</script>
