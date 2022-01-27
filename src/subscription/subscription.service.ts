import { Injectable } from '@nestjs/common';
import { Node } from 'neo4j-driver';
import { Neo4jService } from 'src/neo4j/neo4j.service';
import { User } from '../user/user.service';

export type Subscription = Node
@Injectable()
export class SubscriptionService {

    constructor(private readonly neo4jService: Neo4jService) {}

    async createSubscription(user: User, packageId: number, days: number = null):Promise<Subscription> {
        const userId: string = (<Record<string, any>> user.properties).id
        const res = await this.neo4jService.write(`
            MATCH (u:User {id: $userId})
            MATCH (p:Package {id: $packageId})

            CREATE (u)-[:PURCHASED]->(s:Subscription {
                id: randomUUID(),
                expiresAt: datetime() + CASE WHEN $days IS NOT NULL
                    THEN duration('P' + $days + 'D')
                    ELSE P.duration
            })-[:FOR_PACKAGE]->(p)
            RETURN s
        `,{userId,packageId: this.neo4jService.int(packageId) , days})

        return res.records[0].get('s')
    }
}
