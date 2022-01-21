"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const neo4j_type_interceptor_1 = require("./neo4j/neo4j-type.interceptor");
const neo4j_error_filter_1 = require("./neo4j/neo4j-error.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalInterceptors(new neo4j_type_interceptor_1.Neo4jTypeInterceptor());
    app.useGlobalFilters(new neo4j_error_filter_1.Neo4jErrorFilter());
    app.enableCors();
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map