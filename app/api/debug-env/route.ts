import { NextResponse } from 'next/server'

// Rota temporária de diagnóstico para verificar se as variáveis de ambiente
// estão realmente chegando ao container do Easypanel em runtime.
// REMOVER APÓS RESOLVER O PROBLEMA!
export async function GET() {
    const allKeys = Object.keys(process.env).sort()

    // Lista apenas as chaves relevantes (sem expor valores/senhas)
    const dbRelated = allKeys.filter(
        (k) =>
            k.startsWith('DATABASE') ||
            k.startsWith('PG') ||
            k.startsWith('POSTGRES') ||
            k.startsWith('PAYLOAD') ||
            k.startsWith('NEXT_PUBLIC') ||
            k === 'NODE_ENV'
    )

    // Para DATABASE_URI, mostra apenas os primeiros 30 caracteres (host visível, senha oculta)
    const databaseUri = process.env.DATABASE_URI || process.env.DATABASE_URL || ''
    const preview = databaseUri ? databaseUri.substring(0, 30) + '...[CORTADO]' : 'VAZIO/INEXISTENTE'

    return NextResponse.json({
        message: 'Diagnóstico de variáveis de ambiente em RUNTIME',
        timestamp: new Date().toISOString(),
        node_env: process.env.NODE_ENV,
        total_env_keys: allKeys.length,
        relevant_keys: dbRelated,
        database_uri_preview: preview,
        database_uri_exists: !!process.env.DATABASE_URI,
        database_url_exists: !!process.env.DATABASE_URL,
        payload_secret_exists: !!process.env.PAYLOAD_SECRET,
    })
}
