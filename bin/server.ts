import * as connections from '../src/utils/get-connections';
import { SystemConfig } from '../src/config/system-config'
import { pool, Client } from 'pg';
import { Connector } from "../src/data-base/conector";
import { CheckVersion } from '../src/version/config-version';

;(async () => {
await CheckVersion();
})().catch(err => console.log(err.stack))