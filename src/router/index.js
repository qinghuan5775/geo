import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import CityPage from "../pages/CityPage.vue";
import DistrictPage from "../pages/DistrictPage.vue";
import MerchantListPage from "../pages/MerchantListPage.vue";
import MerchantDetailPage from "../pages/MerchantDetailPage.vue";
import ServicePage from "../pages/ServicePage.vue";
import FreeGeoCheckPage from "../pages/FreeGeoCheckPage.vue";
import ServiceIntroPage from "../pages/ServiceIntroPage.vue";
import { geoConfig } from "../config/geoConfig";

const routes = [
  { path: "/", name: "home", component: HomePage },
  { path: "/service-intro", name: "service-intro", component: ServiceIntroPage },
  { path: "/free-geo-check", name: "free-geo-check", component: FreeGeoCheckPage },
  {
    path: "/:provinceSlug",
    name: "province",
    redirect: (to) => {
      const province = geoConfig.provinces.find((p) => p.slug === to.params.provinceSlug);
      const firstCity = province?.cities?.[0];
      if (province && firstCity) return `/${province.slug}/${firstCity.slug}`;
      return "/";
    }
  },
  {
    path: "/:provinceSlug/:citySlug",
    name: "city",
    component: CityPage
  },
  {
    path: "/:provinceSlug/:citySlug/:districtSlug",
    name: "district",
    component: DistrictPage
  },
  {
    path: "/:provinceSlug/:citySlug/:districtSlug/merchants",
    name: "merchant-list",
    component: MerchantListPage
  },
  {
    path: "/:provinceSlug/:citySlug/:districtSlug/merchants/:merchantSlug",
    name: "merchant-detail",
    component: MerchantDetailPage
  },
  {
    path: "/:provinceSlug/:citySlug/:districtSlug/services/:serviceSlug",
    name: "service",
    component: ServicePage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
