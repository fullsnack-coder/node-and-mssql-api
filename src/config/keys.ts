import dotenv from 'dotenv';
dotenv.config();

const configKeys = {
  server: {
    port: process.env.SERVER_PORT,
  },
  db: {
    user: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASSWORD}`,
    server: `${process.env.DB_ADDRESS}`,
    database: `${process.env.DB_NAME}`,
  },
};

export default configKeys;
