import { computed } from "vue";
import { useRoute } from "vue-router";
import { getLocationContext, getServiceIndustryName } from "../config/geoConfig";
import { getMerchantProfile } from "../config/merchants";
import { siteConfig } from "../config/siteConfig";
import { createJsonLdPayloads, useSeo } from "./useSeo";
import { humanizeSlug } from "../utils/slug";

export function useGeoPage({ pageType, customTitle, customDescription, keywordsExtra, faq }) {
  const route = useRoute();

  const locationContext = computed(() =>
    getLocationContext({
      provinceSlug: route.params.provinceSlug,
      citySlug: route.params.citySlug,
      districtSlug: route.params.districtSlug
    })
  );

  const merchantProfile = computed(() =>
    route.params.merchantSlug
      ? getMerchantProfile({
          provinceSlug: route.params.provinceSlug,
          citySlug: route.params.citySlug,
          districtSlug: route.params.districtSlug,
          merchantSlug: route.params.merchantSlug
        })
      : null
  );

  const merchantName = computed(() => {
    if (merchantProfile.value) return merchantProfile.value.name;
    const slug = route.params.merchantSlug;
    return slug ? humanizeSlug(slug) : "";
  });

  const serviceName = computed(() => {
    const slug = route.params.serviceSlug;
    return slug ? getServiceIndustryName(slug) : "";
  });

  const pageLocationName = computed(() => {
    const { province, city, district } = locationContext.value;
    return [province?.name, city?.name, district?.name].filter(Boolean).join(" ");
  });

  const breadcrumbs = computed(() => {
    const { province, city, district } = locationContext.value;
    const items = [{ name: "首页", path: "/" }];

    if (province && city) {
      items.push({ name: province.name, path: `/${province.slug}` });
      items.push({ name: city.name, path: `/${province.slug}/${city.slug}` });
    }

    if (district) {
      items.push({
        name: district.name,
        path: `/${province.slug}/${city.slug}/${district.slug}`
      });
    }

    if (pageType === "merchant-list" && district) {
      items.push({
        name: "商家列表",
        path: `/${province.slug}/${city.slug}/${district.slug}/merchants`
      });
    }

    if (pageType === "merchant-detail" && district && route.params.merchantSlug) {
      items.push({
        name: merchantName.value,
        path: `/${province.slug}/${city.slug}/${district.slug}/merchants/${route.params.merchantSlug}`
      });
    }

    if (pageType === "service" && district && route.params.serviceSlug) {
      items.push({
        name: serviceName.value,
        path: `/${province.slug}/${city.slug}/${district.slug}/services/${route.params.serviceSlug}`
      });
    }

    return items;
  });

  const seoModel = computed(() => {
    const title = customTitle({
      route,
      locationContext: locationContext.value,
      merchantName: merchantName.value,
      serviceName: serviceName.value,
      merchantProfile: merchantProfile.value
    });
    const description = customDescription({
      route,
      locationContext: locationContext.value,
      merchantName: merchantName.value,
      serviceName: serviceName.value,
      merchantProfile: merchantProfile.value
    });
    const keywordsExtraResolved =
      typeof keywordsExtra === "function"
        ? keywordsExtra({
            route,
            locationContext: locationContext.value,
            merchantName: merchantName.value,
            serviceName: serviceName.value,
            merchantProfile: merchantProfile.value
          })
        : keywordsExtra;

    const keywords = [
      pageLocationName.value,
      "秦皇岛",
      pageType,
      "本地商家",
      "GEO优化",
      "百度SEO",
      "AI搜索优化",
      merchantProfile.value?.seoKeywords,
      keywordsExtraResolved
    ]
      .filter(Boolean)
      .join(",");
    const pageUrl = `${siteConfig.baseUrl}${route.fullPath}`;
    const faqItems = faq({
      route,
      locationContext: locationContext.value,
      merchantName: merchantName.value,
      serviceName: serviceName.value,
      merchantProfile: merchantProfile.value
    });

    const jsonLd = createJsonLdPayloads({
      pageUrl,
      title,
      description,
      breadcrumbs: breadcrumbs.value,
      faq: faqItems,
      locationName: pageLocationName.value || "全国"
    });

    return { title, description, keywords, jsonLd };
  });

  useSeo(() => seoModel.value);

  return {
    route,
    locationContext,
    breadcrumbs,
    merchantName,
    merchantProfile,
    serviceName,
    pageLocationName
  };
}
