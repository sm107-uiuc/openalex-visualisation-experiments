import { SnowflakeConnector } from '@/utils/snowflake';
import * as snowflake from 'snowflake-sdk'

class SnowFlakeService{
    public connection = require('../utils/snowflake');
    public getSingleAuthorDetails =  async () => {
        const results = await this.connection.executeQuery({query: 'SELECT * FROM AUTHORS LIMIT 5'});
        return results;
    }
}

export default SnowFlakeService;