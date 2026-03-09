import type { Core } from '@strapi/strapi';

const PUBLIC_PERMISSIONS = [
  // Produtos
  { action: 'api::product.product.find' },
  { action: 'api::product.product.findOne' },
  // Landing Pages
  { action: 'api::landing-page.landing-page.find' },
  { action: 'api::landing-page.landing-page.findOne' },
  // SEO Pages
  { action: 'api::seo-page.seo-page.find' },
  { action: 'api::seo-page.seo-page.findOne' },
  // Global SEO
  { action: 'api::global-seo.global-seo.find' },
];

async function setPublicPermissions(strapi: Core.Strapi) {
  const publicRole = await strapi
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });

  if (!publicRole) {
    strapi.log.warn('Public role not found, skipping permission setup');
    return;
  }

  for (const permission of PUBLIC_PERMISSIONS) {
    const existing = await strapi
      .query('plugin::users-permissions.permission')
      .findOne({ where: { action: permission.action, role: publicRole.id } });

    if (!existing) {
      await strapi.query('plugin::users-permissions.permission').create({
        data: { action: permission.action, role: publicRole.id, enabled: true },
      });
      strapi.log.info(`Permission enabled: ${permission.action}`);
    }
  }
}

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) { },

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await setPublicPermissions(strapi);
  },
};
