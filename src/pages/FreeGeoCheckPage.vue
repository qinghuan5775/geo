<template>
  <section class="space-y-4">
    <BreadcrumbNav :items="breadcrumbItems" />
    <header class="card">
      <h1 class="text-2xl font-bold sm:text-3xl">免费GEO检测</h1>
      <p class="mt-2 text-sm text-slate-600">
        面向秦皇岛市本地商家的 AI 搜索与 GEO 可见性检测，适用于海港区、山海关区、北戴河区、抚宁区等区域门店。
      </p>
    </header>

    <section class="card p-0 overflow-hidden">
      <iframe
        title="免费GEO检测"
        src="https://www.sheepgeo.com/dashboard/ai-detection"
        width="100%"
        :height="iframeHeight"
        frameborder="0"
        class="block w-full border-0"
      />
    </section>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import BreadcrumbNav from "../components/BreadcrumbNav.vue";
import { createJsonLdPayloads, useSeo } from "../composables/useSeo";
import { geoConfig } from "../config/geoConfig";
import { siteConfig } from "../config/siteConfig";

const iframeHeight = ref("800");

const breadcrumbItems = computed(() => {
  const province = geoConfig.provinces[0];
  const city = province?.cities[0];
  if (!province || !city) {
    return [
      { name: "首页", path: "/" },
      { name: "免费GEO检测", path: "/free-geo-check" }
    ];
  }
  return [
    { name: "首页", path: "/" },
    { name: province.name, path: `/${province.slug}` },
    { name: city.name, path: `/${province.slug}/${city.slug}` },
    { name: "免费GEO检测", path: "/free-geo-check" }
  ];
});

function updateIframeHeight() {
  const isMobile = window.matchMedia("(max-width: 640px)").matches;
  if (!isMobile) {
    iframeHeight.value = "800";
    return;
  }

  const dynamicHeight = Math.max(560, window.innerHeight - 180);
  iframeHeight.value = String(dynamicHeight);
}

onMounted(() => {
  updateIframeHeight();
  window.addEventListener("resize", updateIframeHeight, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateIframeHeight);
});

useSeo(() => {
  const title = `免费GEO检测 - ${siteConfig.siteName}`;
  const description = `${siteConfig.cityName}（${siteConfig.provinceName}）本地商家免费 GEO / AI 搜索可见性检测入口，面向海港区、山海关区、北戴河区、抚宁区商户。`;
  const keywords = `免费GEO检测,秦皇岛,百度SEO,AI搜索,本地商家,${siteConfig.serviceKeywords}`;
  const jsonLd = createJsonLdPayloads({
    pageUrl: `${siteConfig.baseUrl}/free-geo-check`,
    title,
    description,
    locationName: `${siteConfig.provinceName}${siteConfig.cityName}`,
    breadcrumbs: breadcrumbItems.value,
    faq: [
      {
        question: "秦皇岛本地商家为什么要做 GEO / AI 可见性检测？",
        answer:
          "便于了解门店在百度与各类 AI 问答、摘要中的露出情况，并结合海港区、山海关区、北戴河区、抚宁区等地域词优化落地页。"
      },
      {
        question: "检测结果页面在手机上好用吗？",
        answer: "支持，本页内嵌区域在手机端会自动调整高度，便于移动设备完成检测与查看。"
      }
    ]
  });

  return { title, description, keywords, jsonLd };
});
</script>
