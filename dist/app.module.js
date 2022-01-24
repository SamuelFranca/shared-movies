"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const neo4j_module_1 = require("./neo4j/neo4j.module");
const config_1 = require("@nestjs/config");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            neo4j_module_1.Neo4jModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService,],
                useFactory: (configService) => ({
                    scheme: configService.get('NEO4J_SCHEME'),
                    host: configService.get('NEO4J_HOST'),
                    port: configService.get('NEO4J_PORT'),
                    username: configService.get('NEO4J_USERNAME'),
                    password: configService.get('NEO4J_PASSWORD'),
                    database: configService.get('NEO4J_DATABASE'),
                })
            }),
            AuthModule,
            UserModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map