import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { Users } from './payload/collections/Users'
import { Products } from './payload/collections/Products'
import { LandingPages } from './payload/collections/LandingPages'
import { SeoPages } from './payload/collections/SeoPages'
import { Media } from './payload/collections/Media'
import { GlobalSeo } from './payload/globals/GlobalSeo'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const runtimeDbUri = process.env['DATABASE_URI'] || process.env.DATABASE_URI || '';
console.log('--- SYSTEM BOOT ---');
console.log('DATABASE_URI value length:', runtimeDbUri ? runtimeDbUri.length : 'EMPTY/UNDEFINED');
console.log('-------------------');

export default buildConfig({
    editor: lexicalEditor(),
    collections: [Users, Products, LandingPages, SeoPages, Media],
    globals: [GlobalSeo],
    secret: process.env['PAYLOAD_SECRET'] || 'sua-super-chave-secreta',
    db: postgresAdapter({
        pool: {
            connectionString: runtimeDbUri,
        },
    }),
})
