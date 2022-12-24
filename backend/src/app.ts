import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import { connect, set } from 'mongoose';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Routes } from './interfaces/routes.interface';


class App {

    public app: express.Application;
    public hostName: string;
    public port: number;
    private url: string;

    constructor(routes: Routes[]) {
        this.app = express();
        this.port = 8500;
        this.hostName = '127.0.0.1';
        this.url = "mongodb+srv://hirusha:hirusha@e-commerce-system.zfvw1fj.mongodb.net/?retryWrites=true&w=majority";

        

        this.connectToDatabase();
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        this.initializeSwagger();
    
    }

    public listen() {
        this.app.listen(this.port, this.hostName, () => {
            console.log(`-----------------------------------------------`);
            console.log(`-----------------------------------------------`);
            console.log(`🚀 Server is started at http://${this.hostName}:${this.port}`);
            console.log(`-----------------------------------------------`);
        });
    }

    public getServer() {
        return this.app;
    }

    private connectToDatabase() {
        set('strictQuery', true);
        connect(this.url,()=>{
            console.log(`-----------------------------------------------`);
            console.log(`🚀 Mongo_db connection success!`);
            console.log(`-----------------------------------------------`);
            console.log(`-----------------------------------------------`);
        });

    }

    private initializeMiddlewares() {
        this.app.use(cors());
        this.app.use(hpp());
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
    }

    private initializeRoutes(routes: Routes[]) {
        routes.forEach(route => {
            this.app.use('/', route.router);
        });
    }

    private initializeSwagger() {
        const options = {
            swaggerDefinition: {
                info: {
                    title: 'REST API',
                    version: '1.0.0',
                    description: 'Example docs',
                },
            },
            apis: ['swagger.yaml'],
        };

        const specs = swaggerJSDoc(options);
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
    }

}

export default App;