import { Sequelize } from 'sequelize';

const sequilize = new Sequelize(
    process.env.POSTGRES_DB || 'postgres',
    process.env.POSTGRES_USER || 'postgres',
    process.env.POSTGRES_PASSWORD || '',
    {
        host: process.env.DB_HOST || 'localhost',
        port:
            process.env.DB_PORT !== undefined
                ? parseInt(process.env.DB_PORT, 10)
                : 5432,
        dialect: 'postgres',
    }
);

sequilize
    .authenticate()
    .then(() => {
        console.log('Connection to database has been established succesfully.');
        sequilize.sync();
    })
    .catch((error) =>
        console.error('Unable to connect to the database:', error)
    );

export default sequilize;
