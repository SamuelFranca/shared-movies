"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const neo4j_service_1 = require("./neo4j/neo4j.service");
const config_1 = require("@nestjs/config");
let AppController = class AppController {
    constructor(appService, neo4jService, configService) {
        this.appService = appService;
        this.neo4jService = neo4jService;
        this.configService = configService;
    }
    async getHello() {
        const greeting = await this.appService.getHello();
        return greeting;
    }
    async getConfig() {
        return {
            scheme: this.configService.get('NEO4J_SCHEME'),
            host: this.configService.get('NEO4J_HOST'),
            port: this.configService.get('NEO4J_PORT'),
            username: this.configService.get('NEO4J_USERNAME'),
        };
    }
    async get() {
        return await this.neo4jService.read(`
      UNWIND range(1, 10) AS row
      RETURN
        row,
        1 as int,
        1.2 as float,
        'string' as string,
        date() as date,
        datetime() as datetime,
        localdatetime() as localdatetime,
        time() as time,
        point({latitude: 1.2, longitude: 3.4}) as latlng,
        point({latitude: 1.2, longitude: 3.4, height: 2}) as latlngheight,
        point({x:1, y:2}) as xy,
        point({x:1, y:2, z:3}) as xyz
    `);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)('/config'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getConfig", null);
__decorate([
    (0, common_1.Get)('/test'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "get", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService,
        neo4j_service_1.Neo4jService,
        config_1.ConfigService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map