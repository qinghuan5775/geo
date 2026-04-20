<template>
  <section class="border-b border-slate-200 bg-white">
    <div class="container-main flex flex-col gap-2 py-3 sm:flex-row sm:items-center">
      <label class="text-sm font-medium text-slate-700">快速切换城市</label>
      <div class="flex flex-1 gap-2">
        <select v-model="selected" class="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
          <option value="" disabled>请选择省份和城市</option>
          <option v-for="item in options" :key="item.label" :value="item.label">
            {{ item.label }}
          </option>
        </select>
        <button class="btn-primary whitespace-nowrap" @click="goToCity">切换</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getAllCityOptions } from "../config/geoConfig";

const router = useRouter();
const options = getAllCityOptions();
const selected = ref(options[0]?.label || "");

function goToCity() {
  const target = options.find((item) => item.label === selected.value);
  if (!target) return;
  if (target.districtSlug) {
    router.push(`/${target.provinceSlug}/${target.citySlug}/${target.districtSlug}`);
    return;
  }
  router.push(`/${target.provinceSlug}/${target.citySlug}`);
}
</script>
