require('dotenv').config()

//NODE_ENV = production
//NODE_ENV = development

type nodeEnvType = 'development' | 'production';

//General
export const NODE_ENV = (process.env.NODE_ENV as nodeEnvType) || 'development';
export const __prod__ = NODE_ENV === 'production';

//API
export const API_BASE_URL = process.env.API_BASE_URL || '/api/v1/';

//Database credentials
export const DB_DIALECT = process.env.DB_DIALECT || 'mysql';
export const DATABASE_URL = process.env.DATABASE_URL || 'tourterelles';
export const DB_USERNAME = process.env.DB_USERNAME || 'root';
export const DB_PASSWORD = process.env.DB_PASSWORD || '';
export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_PORT = parseInt(process.env.DB_PORT as string) || 3306;

//JWT
export const JWT_PASSPHRASE = process.env.JWT_PASSPHRASE || 'default shit passphrase'