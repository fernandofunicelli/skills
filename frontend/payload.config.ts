import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { Users } from './payload/collections/Users'
import { Products } from './payload/collections/Products'
import { LandingPages } from './payload/collections/LandingPages'
import { GlobalSeo } from './payload/globals/GlobalSeo'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
    editor: lexicalEditor(),
    collections: [Users, Products, LandingPages],
    globals: [GlobalSeo],
    secret: process.env.PAYLOAD_SECRET || 'sua-super-chave-secreta',
    db: postgresAdapter({
        pool: {
            connectionString: process.env.DATABASE_URI || 'postgresql://postgres:postgres@localhost:5432/brazapp',
        },
    }),
})
