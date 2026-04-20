<template>
  <div class="min-h-screen bg-[#fafafa]">
    <header class="sticky top-0 z-20 border-b border-slate-200/90 bg-white">
      <div class="container-main py-4">
        <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <RouterLink to="/" class="block max-w-xl shrink-0 no-underline">
            <span class="text-[15px] font-semibold leading-snug tracking-tight text-slate-900 sm:text-base">
              {{ siteConfig.siteName }}
            </span>
            <span class="mt-1 block text-[11px] text-slate-500 sm:text-xs">
              {{ siteConfig.siteTagline }}
            </span>
          </RouterLink>

          <nav
            class="flex flex-wrap items-center gap-x-0.5 gap-y-2 border-t border-slate-100 pt-3 text-[13px] sm:border-0 sm:pt-0 lg:justify-end"
            aria-label="主导航"
          >
            <RouterLink
              to="/"
              class="nav-pill"
              :class="isHome ? 'nav-pill-active' : ''"
            >
              首页
            </RouterLink>
            <RouterLink
              v-for="d in districtNav"
              :key="d.slug"
              :to="districtTo(d.slug)"
              class="nav-pill"
              :class="districtActive(d.slug) ? 'nav-pill-active' : ''"
            >
              {{ d.name }}
            </RouterLink>
            <RouterLink
              to="/service-intro"
              class="nav-pill"
              :class="isServiceIntro ? 'nav-pill-active' : ''"
            >
              服务介绍
            </RouterLink>
          </nav>
        </div>
      </div>
    </header>

    <main class="container-main py-8 sm:py-10">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";
import { geoConfig } from "./config/geoConfig";
import { siteConfig } from "./config/siteConfig";

const route = useRoute();

const primaryCity = computed(() => geoConfig.provinces[0]?.cities[0]);

/** 导航区县顺序：海港区、北戴河区、山海关区、抚宁区 */
const districtOrder = ["haigang", "beidaihe", "shanhaiguan", "funing"];

const districtNav = computed(() => {
  const city = primaryCity.value;
  if (!city?.districts) return [];
  return districtOrder
    .map((slug) => city.districts.find((d) => d.slug === slug))
    .filter(Boolean)
    .map((d) => ({ name: d.name, slug: d.slug }));
});

const provinceSlug = computed(() => geoConfig.provinces[0]?.slug ?? "hebei");
const citySlug = computed(() => primaryCity.value?.slug ?? "qinhuangdao");

function districtTo(slug) {
  return `/${provinceSlug.value}/${citySlug.value}/${slug}`;
}

function districtActive(slug) {
  const prefix = districtTo(slug);
  return route.path === prefix || route.path.startsWith(`${prefix}/`);
}

const isHome = computed(() => route.path === "/");
const isServiceIntro = computed(() => route.path === "/service-intro");
</script>
