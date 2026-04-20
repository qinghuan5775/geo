import { siteConfig } from "../config/siteConfig.js";

/**
 * 生成 Organization / Breadcrumb / LocalBusiness / FAQ JSON-LD（供 Vue 与批量静态页共用）
 */
export function createJsonLdPayloads({ pageUrl, title, description, breadcrumbs, faq, locationName }) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.organizationName,
    url: siteConfig.baseUrl,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.defaultPhone,
      contactType: "customer service"
    }
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.baseUrl}${item.path}`
    }))
  };

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: title,
    description,
    url: pageUrl,
    areaServed: locationName,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.defaultAddress,
      addressCountry: "CN"
    },
    telephone: siteConfig.defaultPhone
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };

  return [organization, breadcrumb, localBusiness, faqPage];
}
