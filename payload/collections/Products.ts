import { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
    slug: 'products',
    admin: {
        useAsTitle: 'name',
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            admin: {
                description: 'Usado para gerar as URLs dos produtos.',
            },
        },
        {
            name: 'description',
            type: 'richText',
        },
        {
            name: 'short_description',
            type: 'text',
            maxLength: 200,
            admin: {
                description: 'Para cards. Máximo de 200 caracteres.',
            },
        },
        {
            name: 'checkout_base_url',
            type: 'text',
            required: true,
            admin: {
                description: 'Exemplo: https://pay.hotmart.com/ABC',
            },
        },
        {
            name: 'price',
            type: 'number',
            required: true,
        },
        {
            name: 'price_original',
            type: 'number',
            admin: { description: 'Preço riscado antigo' },
        },
        {
            name: 'currency',
            type: 'text',
            defaultValue: 'BRL',
        },
        {
            name: 'is_active',
            type: 'checkbox',
            defaultValue: true,
        },
        {
            name: 'safe_page_slug',
            type: 'text',
            admin: {
                description: 'Slug da página SEO para redirect quando filtro bloquear (ex: curso-marketing-digital)',
            },
        },
        {
            name: 'guarantee_text',
            type: 'text',
        },
        {
            name: 'guarantee_days',
            type: 'number',
        },
    ],
}
