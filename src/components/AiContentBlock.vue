<template>
  <section class="card border-dashed border-slate-200 bg-slate-50/60">
    <h3 class="mb-2 text-sm font-semibold text-slate-800">AI 引用优化（豆包 / AI 搜索可抓取）</h3>
    <p class="text-sm leading-relaxed text-slate-700">
      {{ hint }}
    </p>
    <ul v-if="factBullets?.length" class="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-slate-700">
      <li v-for="(line, idx) in factBullets" :key="idx">{{ line }}</li>
    </ul>
    <ul v-else class="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700">
      <li>可放置标准问答、业务定义、服务流程与价格范围。</li>
      <li>每段建议使用可验证事实，便于 AI 搜索抓取与引用。</li>
      <li>支持按省份/城市/区县自动注入变量化内容。</li>
    </ul>
  </section>
</template>

<script setup>
import { siteConfig } from "../config/siteConfig";

defineProps({
  hint: {
    type: String,
    default: siteConfig.aiQuoteHint
  },
  /** 传入时优先展示结构化要点，便于大模型摘录 */
  factBullets: {
    type: Array,
    default: null
  }
});
</script>
