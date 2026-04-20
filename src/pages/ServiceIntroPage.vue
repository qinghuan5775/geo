<template>
  <section class="space-y-8">
    <BreadcrumbNav :items="breadcrumbs" />

    <header class="pro-card">
      <p class="text-xs font-medium uppercase tracking-wider text-slate-500">服务介绍</p>
      <h1 class="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
        为秦皇岛实体门店做的「可被找到」的线上优化
      </h1>
      <p class="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
        面向有到店客流、预约客流的老板：把门店服务写清楚、写具体，让常用搜索和 AI
        问答更容易引用到您——减少「搜不到店名」的损失。
      </p>
    </header>

    <div class="grid gap-6 md:grid-cols-3">
      <section class="pro-card">
        <h2 class="text-sm font-semibold text-slate-900">AI 搜索收录</h2>
        <p class="mt-2 text-sm leading-relaxed text-slate-600">
          规范页面标题、摘要与结构化数据，提升在对话式搜索、摘要展示中的露出机会。
        </p>
      </section>
      <section class="pro-card">
        <h2 class="text-sm font-semibold text-slate-900">百度排名与地域词</h2>
        <p class="mt-2 text-sm leading-relaxed text-slate-600">
          围绕区县、行业词组织内容，便于用户在搜索「区名 + 服务」时看到您的门店信息。
        </p>
      </section>
      <section class="pro-card">
        <h2 class="text-sm font-semibold text-slate-900">本地精准获客</h2>
        <p class="mt-2 text-sm leading-relaxed text-slate-600">
          突出营业时间、服务范围、预约方式等与到店决策相关的信息，减少无效咨询。
        </p>
      </section>
    </div>

    <section class="pro-card bg-slate-50/80">
      <h2 class="text-lg font-semibold text-slate-900">适合哪些老板</h2>
      <ul class="mt-4 space-y-2 text-sm text-slate-600">
        <li class="flex gap-2"><span class="text-slate-400">·</span>同城到店消费：足疗、棋牌、美业、民宿、建材等实体门店</li>
        <li class="flex gap-2"><span class="text-slate-400">·</span>希望顾客能搜到店名、找到电话与地址</li>
        <li class="flex gap-2"><span class="text-slate-400">·</span>愿意配合补充真实经营信息与合规表述</li>
      </ul>
    </section>
  </section>
</template>

<script setup>
import { computed } from "vue";
import BreadcrumbNav from "../components/BreadcrumbNav.vue";
import { siteConfig } from "../config/siteConfig";
import { createJsonLdPayloads, useSeo } from "../composables/useSeo";

const breadcrumbs = computed(() => [
  { name: "首页", path: "/" },
  { name: "服务介绍", path: "/service-intro" }
]);

useSeo(() => {
  const title = `服务介绍 - ${siteConfig.siteName}`;
  const description = `清欢 GEO：${siteConfig.siteTagline}。面向秦皇岛海港区、北戴河区、山海关区、抚宁区实体店，说明 AI 搜索、百度地域词与到店转化要点。`;
  const keywords = `清欢GEO,秦皇岛,服务介绍,AI搜索,百度SEO,本地获客,${siteConfig.serviceKeywords}`;
  const jsonLd = createJsonLdPayloads({
    pageUrl: `${siteConfig.baseUrl}/service-intro`,
    title,
    description,
    breadcrumbs: breadcrumbs.value,
    locationName: `${siteConfig.provinceName}${siteConfig.cityName}`,
    faq: [
      {
        question: "服务主要解决什么问题？",
        answer: "帮助实体店在常见搜索与 AI 引用场景下更清晰展示店名、服务与联系方式，减少漏接顾客。"
      },
      {
        question: "是否保证排名前几？",
        answer: "不承诺固定排名；以合规内容与技术结构提升可被检索与引用的机会。"
      }
    ]
  });

  return { title, description, keywords, jsonLd };
});
</script>
