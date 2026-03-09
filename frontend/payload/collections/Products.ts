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
            name: 'price',
            type: 'number',
            required: true,
        },
        {
            name: 'currency',
            type: 'text',
            defaultValue: 'BRL',
        },
        {
            name: 'checkout_base_url',
            type: 'text',
            required: true,
            admin: {
                description: 'Exemplo: https://pay.hotmart.com/ABC',
            },
        },
    ],
}
