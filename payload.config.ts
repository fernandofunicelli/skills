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

// Tenta todas as variantes possíveis de nome para a URL do banco
function getDatabaseUrl(): string {
    const candidates = [
        'DATABASE_URI',
        'DATABASE_URL',
        'POSTGRES_URL',
        'POSTGRES_URI',
        'PG_CONNECTION_STRING',
    ]
    for (const key of candidates) {
        const val = process.env[key]
        if (val && val.length > 0) {
            console.log(`[Payload] Usando variavel de banco: ${key} (${val.length} chars)`)
            return val
        }
    }
    console.warn('[Payload] NENHUMA variavel de banco encontrada! Tentando localhost como fallback.')
    console.warn('[Payload] Variaveis disponiveis:', Object.keys(process.env).filter(k =>
        k.includes('DATA') || k.includes('PG') || k.includes('POST') || k.includes('PAYLOAD')
    ).join(', '))
    return ''
}

const dbUrl = getDatabaseUrl()

export default buildConfig({
    editor: lexicalEditor(),
    collections: [Users, Products, LandingPages, SeoPages, Media],
    globals: [GlobalSeo],
    secret: process.env.PAYLOAD_SECRET || process.env.PAYLOAD_SECRET_KEY || 'sua-super-chave-secreta',
    db: postgresAdapter({
        push: true,
        pool: {
            connectionString: dbUrl,
        },
        prodMigrations: [],
    }),
})
