"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
const Pool = require('pg').Pool;
const pool = new Pool({
    user: process_1.env.DB_USER || 'postgres',
    password: process_1.env.DB_PASSWORD || 'postgre',
    database: process_1.env.DB_NAME || 'shopping_mall_xyz_users',
    host: process_1.env.DB_HOST || 'localhost',
    port: process_1.env.DB_PORT || '5433',
    main_pool_size: 5,
    reverse_pool_size: 5,
    server_idle_timeout: 1000,
    idle_transaction_timeout: 2000,
    max_client_conn: 10
});
function query(queryText) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield pool.connect();
        try {
            yield client.query('BEGIN');
            const res = yield client.query(queryText);
            yield client.query('COMMIT');
            return res;
        }
        catch (err) {
            yield client.query('ROLLBACK');
            throw err;
        }
        finally {
            client.release();
        }
    });
}
// try {
//     pool.query(`CREATE TABLE IF NOT EXISTS "Users" (id SERIAL PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), "phoneNo" VARCHAR(255), password VARCHAR(255), "userId" VARCHAR(255), image VARCHAR(255));`)
//     console.log("table created")
// } catch (error) {
//     console.log(error)
// }
exports.default = query;
