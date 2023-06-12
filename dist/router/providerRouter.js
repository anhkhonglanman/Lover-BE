"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const providerController_1 = __importDefault(require("../controllers/providerController"));
const providerRouter = (0, express_1.Router)();
providerRouter.post('/', providerController_1.default.save);
providerRouter.get('/', providerController_1.default.all);
providerRouter.get('/:id', providerController_1.default.searchByTypeProvider);
exports.default = providerRouter;
//# sourceMappingURL=providerRouter.js.map