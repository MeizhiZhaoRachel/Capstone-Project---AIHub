import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
    user: 'postgres',
    password: '123456',
    database: 'postgres',
    host: 'localhost',
    port: 5432,
  });

  async function createUserTable(){
    const client = await pool.connect();
    try {
        await client.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                first_name VARCHAR(50) NOT NULL,
                last_name VARCHAR(50) NOT NULL,
                email VARCHAR(100) NOT NULL,
                password VARCHAR(100) NOT NULL,
                gender VARCHAR(10) NOT NULL,
                vocation VARCHAR(50) NOT NULL,
                other_vocation VARCHAR(50)
            )
        `);
        console.log('Table users created successfully');
    } catch (error) {
        console.error('Error executing query:', error.stack);
    } finally {
        client.release();
    }
    
  }
  export { pool, createUserTable };