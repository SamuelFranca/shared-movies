import { AppService } from './app.service';
import { Neo4jService } from './neo4j/neo4j.service';
import { ConfigService } from '@nestjs/config';
export declare class AppController {
    private readonly appService;
    private neo4jService;
    private configService;
    constructor(appService: AppService, neo4jService: Neo4jService, configService: ConfigService);
    getHello(): Promise<string>;
    getConfig(): Promise<{
        scheme: any;
        host: any;
        port: any;
        username: any;
    }>;
    get(): Promise<import("neo4j-driver-core/types/result").QueryResult>;
}
