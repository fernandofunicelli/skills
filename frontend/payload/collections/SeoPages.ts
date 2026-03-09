import { CollectionConfig } from 'payload'

export const SeoPages: CollectionConfig = {
    slug: 'seo-pages',
    admin: {
        useAsTitle: 'h1',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'h1',
            type: 'text',
            required: true,
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
        },
        {
            name: 'product',
            type: 'relationship',
            relationTo: 'products',
            required: true,
        },
        {
            name: 'meta_title',
            type: 'text',
            required: true,
        },
        {
            name: 'meta_description',
            type: 'text',
            required: true,
        },
        {
            name: 'schema_markup',
            type: 'json',
            admin: { description: 'Override do Schema JSON-LD automático' },
        },
        {
            name: 'content',
            type: 'richText',
        },
    ],
}
