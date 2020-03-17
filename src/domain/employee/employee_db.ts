import {Pool} from 'pg';
class EmployeeDb{
    pool:Pool;
    constructor(){
        this.pool = new Pool({
            user : 'postgres',
            host : 'localhost',
            database : 'medplus',
            password : 'root',
            port : 5432            
        });
    }
    async runQuery(queryString: string, params: (string|number)[]){
        try{
            let client = await this.pool.connect();
            var result: object = await client.query(queryString,params);
            //console.log()
            client.release();
            return result;
        }
        catch(error){
            //handle error
            throw error;
        }
    }
}

export = new EmployeeDb();