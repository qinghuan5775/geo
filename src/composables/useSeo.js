import { computed, onBeforeUnmount, watchEffect } from "vue";
import { createJsonLdPayloads } from "../seo/createJsonLdPayloads.js";

const META_NAMES = ["description", "keywords"];

function setMeta(name, content) {
  let node = document.head.querySelector(`meta[name="${name}"]`);
  if (!node) {
    node = document.createElement("meta");
    node.setAttribute("name", name);
    document.head.appendChild(node);
  }
  node.setAttribute("content", content || "");
}

function clearJsonLdNodes(pageId) {
  const nodes = document.head.querySelectorAll(`script[data-geo-seo="${pageId}"]`);
  nodes.forEach((node) => node.remove());
}

function mountJsonLd(pageId, payloadList) {
  clearJsonLdNodes(pageId);
  payloadList.forEach((payload) => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.geoSeo = pageId;
    script.text = JSON.stringify(payload);
    document.head.appendChild(script);
  });
}

export { createJsonLdPayloads };

export function useSeo(input) {
  const pageId = `seo-${Math.random().toString(36).slice(2)}`;
  const data = computed(() => (typeof input === "function" ? input() : input));

  watchEffect(() => {
    const current = data.value;
    if (!current) return;

    document.title = current.title;
    META_NAMES.forEach((name) => setMeta(name, current[name]));
    mountJsonLd(pageId, current.jsonLd || []);
  });

  onBeforeUnmount(() => {
    clearJsonLdNodes(pageId);
  });
}
