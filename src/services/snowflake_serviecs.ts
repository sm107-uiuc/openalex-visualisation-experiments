import { SnowflakeConnector } from '@/utils/snowflake';
import * as snowflake from 'snowflake-sdk'

class SnowFlakeService{
    
    public getSingleAuthorDetails =  async () => {
        const results = await global.snowflakeConnection.executeQuery({query: 'SELECT * FROM AUTHORS LIMIT 5'});
        return results;
    }
}

export default SnowFlakeService;