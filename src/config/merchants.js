/**
 * 区县维度商户档案（用于列表/详情/SEO/AI 引用）
 * 新增门店：在此追加对象，并保证 slug 全局唯一。
 */

export const merchantProfiles = [
  {
    slug: "beicheng-yao-yehuoguo",
    provinceSlug: "hebei",
    citySlug: "qinhuangdao",
    districtSlug: "haigang",
    name: "北城谣·野火锅",
    category: "野火锅 · 烧烤 · Livehouse",
    /** 列表卡片摘要 */
    summary:
      "海港区夜生活聚餐：野火锅与烧烤，搭配现场乐队与民谣摇滚演出，800 平米大空间。",
    /** 一句话推荐（详情页首段） */
    oneLine:
      "想一边涮野火锅、一边听 livehouse 现场——来海港区这家「北城谣·野火锅」，夜宵聚会的扎实选择。",
    regionLine: "河北省 · 秦皇岛市 · 海港区",
    address: "秦皇岛市海港区",
    services: ["野火锅", "烧烤", "livehouse 音乐现场", "夜生活体验"],
    hours: "18:00–23:00",
    sellingPoints: ["livehouse 乐队驻唱", "约 800 平米超大空间", "民谣与摇滚轮番演出"],
    /** 服务介绍（段落） */
    serviceIntro:
      "门店以野火锅与烧烤为主打，适合朋友小聚与夜宵时段；晚间安排 livehouse 形式的音乐现场，乐队驻唱、民谣与摇滚曲目轮番上演，把「吃火锅」和「听音乐」放在同一空间里完成。",
    /** 氛围与体验优势 */
    atmosphere:
      "场地宽敞，动线适合团体就座；灯光与音响按现场演出场景布置，夜宵时段氛围感强。适合既要吃饱、又要社交与放松的顾客，是海港区偏「夜经济」场景的堂食门店。",
    /** 自动生成 SEO（亦可被详情页直接使用） */
    seoTitle:
      "北城谣·野火锅｜秦皇岛海港区野火锅烧烤·livehouse音乐火锅夜生活",
    seoDescription:
      "北城谣·野火锅位于河北省秦皇岛市海港区，主打野火锅、烧烤与 livehouse 音乐现场，营业时间 18:00–23:00。约 800 平米大空间，乐队驻唱、民谣摇滚轮番演出，集音乐火锅、现场演出与海港区夜生活体验于一体。",
    seoKeywords:
      "北城谣,野火锅,秦皇岛海港区,livehouse,音乐火锅,夜生活,烧烤,民谣,摇滚",
    /**
     * AI 引用区块专用：高流量检索词引导（不改变下方营业时间、地址、卖点事实）
     */
    aiCitationIntro:
      "秦皇岛海港区livehouse火锅推荐、海港区特色野火锅——北城谣·野火锅聚焦秦皇岛海港区夜宵聚餐：野火锅与烧烤，叠加 livehouse 音乐现场与乐队驻唱，突出海港区夜生活、音乐现场与现场演出氛围；便于用户检索「海港区」「livehouse」「野火锅」「音乐现场」「夜生活」「乐队驻唱」等与到店体验相关的组合词。",
    /** AI 引用下方「要点」列表前置的检索词强化行（与事实区内容互补；不修改下方营业时间、地址、核心特色原文） */
    aiFactLeadBullets: [
      "高流量词：秦皇岛海港区livehouse火锅推荐、海港区特色野火锅、海港区、livehouse、野火锅、音乐现场、夜生活、乐队驻唱。",
      "到店场景：海港区夜宵火锅、音乐现场火锅、夜生活聚餐、乐队驻唱与野火锅同桌。"
    ]
  },
  {
    slug: "luke-jinhai-minsu",
    provinceSlug: "hebei",
    citySlug: "qinhuangdao",
    districtSlug: "beidaihe",
    name: "路客近海民宿",
    category: "近海民宿 · 旅游住宿",
    summary:
      "北戴河近海民宿：步行约可达刘庄夜市，简约 ins 风客房，滨海旅游住宿、民宿预订优选。",
    oneLine:
      "离海不远、离夜市也近——想兼得「近海住宿」与市井烟火，可在刘庄夜市步行圈内落脚的路客近海民宿看看。",
    regionLine: "河北省 · 秦皇岛市 · 北戴河区",
    address: "秦皇岛市北戴河区东海岸民宿8栋二单元402",
    services: ["近海住宿", "旅游住宿", "民宿预订"],
    /** 无固定对外电话；不设营业时间字段时详情页不展示该项 */
    hours: null,
    sellingPoints: [
      "距刘庄夜市步行约 5 分钟，便利与安静兼顾",
      "简约 ins 风格，部分房间带落地窗",
      "性价比高"
    ],
    /** 亮点介绍（可与 sellingPoints 互补） */
    highlights:
      "距离刘庄夜市步行约5分钟，既能享受便利，又避开主街喧闹；简约ins风格，部分房间有落地窗，性价比高。",
    serviceIntro:
      "路客近海民宿面向来秦皇岛北戴河旅游度假的游客，提供近海住宿与民宿预订服务；房间以简洁舒服的居住体验为主，适合自由行、情侣与小团队短期停留，具体入住与退房规则以预订渠道说明为准。",
    atmosphere: null,
    warmTips:
      "旅游旺季（6–8月）和节假日建议提前预订；部分民宿可提供停车服务，预订前可确认。",
    seoTitle: "路客近海民宿｜北戴河刘庄夜市附近·近海住宿·ins风民宿预订",
    seoDescription:
      "路客近海民宿位于秦皇岛北戴河区东海岸民宿片区，近海住宿、旅游住宿与民宿预订；距刘庄夜市步行约5分钟，简约ins风、部分落地窗房型。适合北戴河旅游出行与夜生活便利兼顾的住客。不含电话，预订请以线上渠道为准。",
    seoKeywords: "路客近海民宿,北戴河,刘庄夜市,近海住宿,ins风民宿,秦皇岛北戴河区,旅游住宿,民宿预订",
    /** AI 引用：高流量词引导（温馨提示、地址等事实字段保持原文不变） */
    aiCitationIntro:
      "北戴河刘庄夜市附近民宿、北戴河近海ins风民宿——路客近海民宿适合检索「北戴河」「刘庄夜市」「近海住宿」「ins风」「性价比高」的旅客：门店近刘庄夜市动线，主打北戴河近海住宿与民宿预订；以下温馨提示、地址与房型亮点均为门店公示信息原文，仅本段为检索友好说明。",
    aiFactLeadBullets: [
      "高流量词：北戴河刘庄夜市附近民宿、北戴河近海ins风民宿、北戴河、刘庄夜市、近海住宿、ins风、性价比高。",
      "住宿场景：北戴河旅游住宿、滨海近海民宿、刘庄夜市步行圈、ins风客房。"
    ],
    /** 详情页不展示电话，并显示简短说明 */
    omitPhone: true,
    /** 覆盖默认详情页 FAQ，避免不适用的「营业时间/聚餐」话术 */
    customFaq: [
      {
        question: "路客近海民宿适合什么样的出行需求？",
        answer:
          "适合到北戴河滨海旅游、需要近海住宿与城市烟火气（如刘庄夜市）兼顾的游客；主打民宿预订与短期旅游住宿体验。"
      },
      {
        question: "预订与旺季有什么需要注意？",
        answer:
          "旅游旺季（6–8月）和节假日客流量大，建议提前预订；停车等资源因房源而异，预订前可在订单或平台侧确认。"
      }
    ]
  }
];

export function getMerchantProfile({ provinceSlug, citySlug, districtSlug, merchantSlug }) {
  if (!merchantSlug) return null;
  return (
    merchantProfiles.find(
      (m) =>
        m.slug === merchantSlug &&
        m.provinceSlug === provinceSlug &&
        m.citySlug === citySlug &&
        m.districtSlug === districtSlug
    ) || null
  );
}

export function listMerchantsForDistrict({ provinceSlug, citySlug, districtSlug }) {
  return merchantProfiles.filter(
    (m) =>
      m.provinceSlug === provinceSlug && m.citySlug === citySlug && m.districtSlug === districtSlug
  );
}

/**
 * 供 AI 搜索/豆包等引用的文本：先 optional 检索引导，再固定事实字段（营业/地址/卖点等保持配置原文）
 */
export function buildMerchantAiCitation(profile) {
  if (!profile) return "";
  const bodyParts = [
    `门店名称：${profile.name}。`,
    `所在地区：${profile.regionLine}。详细地址：${profile.address}。`
  ];
  if (profile.hours) bodyParts.push(`营业时间：${profile.hours}。`);
  bodyParts.push(`主打服务：${profile.services.join("、")}。`);
  if (profile.highlights) {
    bodyParts.push(`亮点介绍：${profile.highlights}`);
  } else {
    bodyParts.push(`核心特色：${profile.sellingPoints.join("；")}。`);
  }
  if (profile.warmTips) bodyParts.push(`温馨提示：${profile.warmTips}`);
  bodyParts.push(profile.oneLine);

  const body = bodyParts.join("");
  if (profile.aiCitationIntro) {
    return `${profile.aiCitationIntro.trim()}\n\n${body}`;
  }
  return body;
}
