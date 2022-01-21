import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class Neo4jTypeInterceptor implements NestInterceptor {
    private readonly showLabelsOrType;
    private readonly showIdentity;
    constructor(showLabelsOrType?: boolean, showIdentity?: boolean);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
