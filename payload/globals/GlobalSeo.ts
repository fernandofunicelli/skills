import { GlobalConfig } from 'payload'

export const GlobalSeo: GlobalConfig = {
    slug: 'global-seo',
    label: 'Global SEO / Tracking',
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'gtm_id',
            type: 'text',
            admin: { description: 'ID do Google Tag Manager (Ex: GTM-XXXXXXX)' },
        },
        {
            name: 'ga4_measurement_id',
            type: 'text',
            admin: { description: 'ID da Métrica do GA4 (Ex: G-XXXXXXX)' },
        },
        {
            name: 'google_ads_id',
            type: 'text',
            admin: { description: 'ID do Google Ads (Ex: AW-XXXXXXX)' },
        },
        {
            name: 'meta_pixel_id',
            type: 'text',
            admin: { description: 'ID Global do Meta/Facebook Pixel' },
        },
        {
            name: 'taboola_account_id',
            type: 'text',
            admin: { description: 'ID da Conta Taboola' },
        },
    ],
}
