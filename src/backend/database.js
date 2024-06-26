import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
    user: 'postgres',
    password: '123456',
    database: 'postgres',
    host: 'localhost',
    port: 5432,
  });

// const pool = new Pool({
//     user: 'postgres',
//    password: '1230',
//     database: 'postgres',
//     host: 'localhost',
//     port: 5432,
//  });

 async function setupProductsTable() {
    const client = await pool.connect();
    try {
        // Check if the products table exists
        const tableExists = await client.query(`
            SELECT EXISTS (
                SELECT 1 FROM pg_tables
                WHERE schemaname = 'public' AND tablename  = 'products'
            );
        `);

        if (!tableExists.rows[0].exists) {
            // Table does not exist, so create it and insert data
            await client.query(`
                CREATE TABLE products (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(255),
                    imageurl TEXT,
                    description TEXT
                );
            `);
            console.log('Table products created successfully.');

            const insertRes = await client.query(`
                INSERT INTO products (name, imageurl, description)
                VALUES 
                ('ChatGPT', 'chatgpt.jpg', 'ChatGPT is an advanced language model developed by OpenAI, designed to understand and generate human-like text. This conversational AI is based on the GPT (Generative Pretrained Transformer) architecture, which enables it to participate in discussions, answer questions, and create content that ranges from writing essays to composing poetry. '),
                ('Gemini', 'gemini.jpg', 'Gemini is a cryptocurrency exchange and custodian that allows customers to buy, sell, and store digital assets. Founded by the Winklevoss twins in 2014, Gemini is known for its user-friendly interface and a strong commitment to compliance and security. '),
                ('WenXinYiYan', 'wenxinyiyan.jpg', 'WenXin YiYan, often translated as "Warm Heart and Articulate Speech," is a technology platform that specializes in natural language processing and understanding. It harnesses artificial intelligence to interpret, generate, and translate human language with high accuracy and cultural sensitivity. ')
            `);
            console.log(`Inserted ${insertRes.rowCount} rows.`);
        } else {
            // Table exists, proceed with other operations (e.g., fetch data)
            console.log('Table already exists. Ready to perform other operations.');
        }
    } catch (error) {
        console.error('Error executing query:', error.stack);
    } finally {
        client.release();
    }
}


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
  export { pool, createUserTable, setupProductsTable };