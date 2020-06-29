import { Pool, Client } from 'pg';

export const ConnectionPg = new Pool({
    user: 'Application',
    host: 'localhost',
    database: 'ApplicationAuthentication',
    password: 'Qu@dr@d0',
    port: 5432,
  });

