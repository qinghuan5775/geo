/** 秦皇岛市地区与服务行业配置（标题、面包屑、关键词均由此处驱动） */

export const geoConfig = {
  provinces: [
    {
      slug: "hebei",
      name: "河北省",
      cities: [
        {
          slug: "qinhuangdao",
          name: "秦皇岛市",
          districts: [
            { slug: "haigang", name: "海港区" },
            { slug: "shanhaiguan", name: "山海关区" },
            { slug: "beidaihe", name: "北戴河区" },
            { slug: "funing", name: "抚宁区" }
          ]
        }
      ]
    }
  ],
  /** 本地商家 / 列表分类 */
  merchantTypes: ["足疗按摩", "棋牌室", "美容养生", "民宿", "家政服务", "建材防水"],
  /** 与 merchantTypes 一致，服务项目路由展示用 */
  serviceTypes: ["足疗按摩", "棋牌室", "美容养生", "民宿", "家政服务", "建材防水"],
  /** 服务项目落地页 slug ↔ 名称（用于 URL 与面包屑、SEO 标题） */
  serviceIndustries: [
    { slug: "zuliao-anmo", name: "足疗按摩" },
    { slug: "qipaishi", name: "棋牌室" },
    { slug: "meirong-yangsheng", name: "美容养生" },
    { slug: "minsu", name: "民宿" },
    { slug: "jiazheng-fuwu", name: "家政服务" },
    { slug: "jiancai-fangshui", name: "建材防水" }
  ]
};

export function getLocationContext({ provinceSlug, citySlug, districtSlug }) {
  const province = geoConfig.provinces.find((item) => item.slug === provinceSlug);
  const city = province?.cities.find((item) => item.slug === citySlug);
  const district = city?.districts.find((item) => item.slug === districtSlug);

  return {
    province,
    city,
    district
  };
}

/** 根据路由中的 serviceSlug 解析中文服务行业名称 */
export function getServiceIndustryName(slug) {
  if (!slug) return "";
  const item = geoConfig.serviceIndustries.find((s) => s.slug === slug);
  return item?.name ?? slug;
}

export function getDefaultServiceSlug() {
  return geoConfig.serviceIndustries[0]?.slug ?? "zuliao-anmo";
}

export function getAllCityOptions() {
  return geoConfig.provinces.flatMap((province) =>
    province.cities.map((city) => ({
      label: `${province.name} · ${city.name}`,
      provinceSlug: province.slug,
      citySlug: city.slug,
      districtSlug: city.districts[0]?.slug || ""
    }))
  );
}
