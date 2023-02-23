import * as snowflake from 'snowflake-sdk';
import { snowflakeConfig } from '@/config';
import { Pool } from 'generic-pool';
export class SnowflakeConnector {
    public connectionPool:Pool<snowflake.Connection>;
    constructor() { 
      snowflake.configure({ ocspFailOpen: false, logLevel:"DEBUG", insecureConnect:true });
      const initializeEnvironment = snowflakeConfig;
      const poolOptions = {
        max: 10, // specifies the maximum number of connections in the pool
        min: 0   // specifies the minimum number of connections in the pool
      }
      snowflake.configure({ ocspFailOpen: false, logLevel:"DEBUG", insecureConnect:true });
      this.connectionPool =  snowflake.createPool(initializeEnvironment, poolOptions);
    }

    
    private cancelStatementSnowflake = async (statement: snowflake.Statement) => new Promise((resolve: any, reject: any) => {
      try{
        statement.cancel((err:any, _stmt:any) => {
          if (err) {
              console.error('Error while cancel statement ' + err.message);
              reject(err);
          } else {
              console.log('Successfully aborted statement'); 
              resolve();
          }
        });
      } catch (err) {
        reject(err);
      }
    }).catch(() => {});

    public executeQuery = async(req: any) => new Promise(async(resolve: any, reject: any) => {
      try {
        this.connectionPool.use(async(connection)=>{
          const startindex: number = req.startindex ? (+req.startindex) : 0;
          const endindex: number = req.count ? startindex + Math.min((+req.count), 999) : startindex + 999;
          connection.execute({
              sqlText: req.query,
              binds: req.binds ? req.binds : [],
              streamResult: true,
              complete: (err:any, statement:any, _rows:any) => {
                if (err) {
                  console.error(err);
                  reject(err);
                }
      
                let rowsArr:any[] = [];
      
                console.log('Query id: ', statement.getStatementId());
                let stream = statement.streamRows({
                  start: startindex,
                  end: endindex
                });
                
                stream.on('error', async (err:any) => {
                  console.error('Unable to consume all rows');
                  await this.cancelStatementSnowflake(statement);
                  reject(err);
                });
                
                stream.on('data', (row:any) => {
                  rowsArr.push(row);
                });
                
                stream.on('end', async () => {
                  console.log('All rows consumed');
                  resolve({
                    total: statement.getNumRows(),
                    results: rowsArr              
                  });
                    
                });
              }
          });
        })
      } catch (err) {
          reject(err);
      }
    }).catch(() => {});
}

module.exports = new SnowflakeConnector();