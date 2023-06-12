"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRouter_1 = __importDefault(require("./userRouter"));
const providerRouter_1 = __importDefault(require("./providerRouter"));
const router = (0, express_1.Router)();
router.use('/users', userRouter_1.default);
router.use('/providers', providerRouter_1.default);
exports.default = router;
//# sourceMappingURL=router.js.map