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
exports.Provider = void 0;
const typeorm_1 = require("typeorm");
const Image_1 = require("./Image");
const Booking_1 = require("./Booking");
let Provider = class Provider {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Provider.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255 }),
    __metadata("design:type", String)
], Provider.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date" }),
    __metadata("design:type", Date)
], Provider.prototype, "dob", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: false }),
    __metadata("design:type", String)
], Provider.prototype, "sex", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: false }),
    __metadata("design:type", String)
], Provider.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 20, nullable: false }),
    __metadata("design:type", String)
], Provider.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: false }),
    __metadata("design:type", String)
], Provider.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", String)
], Provider.prototype, "height", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", String)
], Provider.prototype, "weight", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", String)
], Provider.prototype, "hobby", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", String)
], Provider.prototype, "desc", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", String)
], Provider.prototype, "request", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", String)
], Provider.prototype, "linkFB", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date" }),
    __metadata("design:type", Date)
], Provider.prototype, "joinDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, default: "70000" }),
    __metadata("design:type", String)
], Provider.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", String)
], Provider.prototype, "count", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", default: "on" }),
    __metadata("design:type", String)
], Provider.prototype, "ready", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Booking_1.Booking, (booking) => booking.providers),
    __metadata("design:type", Array)
], Provider.prototype, "booking", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Image_1.Image, (image) => image.provider),
    __metadata("design:type", Array)
], Provider.prototype, "images", void 0);
Provider = __decorate([
    (0, typeorm_1.Entity)()
], Provider);
exports.Provider = Provider;
//# sourceMappingURL=Provider.js.map