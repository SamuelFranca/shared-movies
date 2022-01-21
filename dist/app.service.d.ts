import { Neo4jService } from './neo4j/neo4j.service';
export declare class AppService {
    private readonly neo4jService;
    constructor(neo4jService: Neo4jService);
    getHello(): Promise<string>;
}
