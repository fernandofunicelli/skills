const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgres://sites_p2p_tv_user:d3016adeb8f65154f075@72.60.69.153:5433/sites_p2p_tv_db',
    ssl: false,
});

async function main() {
    try {
        console.log("=== Produtos ===");
        const res = await pool.query("SELECT * FROM products");
        console.log(res.rows);

        console.log("\n=== Seo Pages ===");
        const res2 = await pool.query("SELECT * FROM seo_pages");
        console.log(res2.rows.map(r => ({id: r.id, slug: r.slug, h1: r.h1})));

        console.log("\n=== Landing Pages ===");
        const res3 = await pool.query("SELECT * FROM landing_pages");
        console.log(res3.rows.map(r => ({id: r.id, slug: r.slug})));

    } catch (e) {
        console.error('ERRO:', e.message);
    } finally {
        await pool.end();
    }
}

main();
