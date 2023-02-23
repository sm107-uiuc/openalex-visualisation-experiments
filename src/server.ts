import App from '@/app';
import IndexRoute from '@routes/index.route';
import validateEnv from '@utils/validateEnv';
import { SnowflakeConnector } from './utils/snowflake';

validateEnv();
global.snowflakeConnection = new SnowflakeConnector();
const app = new App([new IndexRoute()]);
app.listen();

