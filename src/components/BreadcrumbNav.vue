<template>
  <nav aria-label="Breadcrumb" class="mb-4 text-sm text-slate-600">
    <ol class="flex flex-wrap items-center gap-2">
      <li v-for="(item, index) in items" :key="item.path" class="flex items-center gap-2">
        <RouterLink
          v-if="index < items.length - 1"
          :to="item.path"
          class="rounded px-1 py-0.5 hover:bg-slate-100 hover:text-slate-900"
        >
          {{ item.name }}
        </RouterLink>
        <span v-else class="font-medium text-slate-900">{{ item.name }}</span>
        <span v-if="index < items.length - 1">></span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { RouterLink } from "vue-router";

defineProps({
  items: {
    type: Array,
    default: () => []
  }
});
</script>
