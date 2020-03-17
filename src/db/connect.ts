import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'medplus',
    password: 'root',
    // port: 52043,
})
var client: any = null;
export = {
    query: (text: string, params?: [string, string, number] | [number]) => {
        return pool.query(text, params)
    },
    queryClient: async (text: string,
        params?: Array<any> ) => {
        try {
            client = await pool.connect()
            let results = await client.query(text, params)
            return results
        }
        catch (e) {
            throw e
        }
        finally {
            client.release()
        }
    }
}
