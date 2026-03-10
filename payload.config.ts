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

// Truque anti-Webpack/Turbopack:
// O bundler do Next.js substitui process.env.X por o valor literal durante o build.
// Para forçar a leitura REAL em runtime, usamos acesso dinâmico via variável.
const envKey = 'DATABASE_URI'
const secretKey = 'PAYLOAD_SECRET'
const getEnv = (key: string) => process.env[key]

export default buildConfig({
    editor: lexicalEditor(),
    collections: [Users, Products, LandingPages, SeoPages, Media],
    globals: [GlobalSeo],
    secret: getEnv(secretKey) || 'sua-super-chave-secreta',
    db: postgresAdapter({
        pool: {
            connectionString: getEnv(envKey) || '',
        },
        prodMigrations: [],
    }),
})
