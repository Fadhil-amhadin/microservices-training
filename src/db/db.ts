import { env } from "process";

const Pool = require('pg').Pool;

const pool = new Pool({
    user: env.DB_USER || 'postgres',
    password: env.DB_PASSWORD || 'postgre',
    database: env.DB_NAME || 'shopping_mall_xyz_users',
    host: env.DB_HOST || 'localhost',
    port: env.DB_PORT || '5433',
    main_pool_size: 5,
    reverse_pool_size: 5,
    server_idle_timeout: 1000,
    idle_transaction_timeout: 2000,
    max_client_conn: 10
})
async function query(queryText:String) {
    const client = await pool.connect()
    try {
      await client.query('BEGIN')
      const res = await client.query(queryText);
      await client.query('COMMIT')
      return res
    } catch (err) {
      await client.query('ROLLBACK')
      throw err
    } finally {
      client.release()
    }
}

export default query;