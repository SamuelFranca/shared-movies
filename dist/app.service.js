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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const neo4j_service_1 = require("./neo4j/neo4j.service");
let AppService = class AppService {
    constructor(neo4jService) {
        this.neo4jService = neo4jService;
    }
    async getHello() {
        const result = await this.neo4jService.read('MATCH (n) RETURN count(n) as count', {});
        const count = result.records[0].get('count');
        return `Hello neo4j User! There are ${count} nodes in the database`;
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [neo4j_service_1.Neo4jService])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map