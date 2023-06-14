"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const providerController_1 = __importDefault(require("../controllers/providerController"));
const auth_1 = require("../middleware/auth");
const providerRouter = (0, express_1.Router)();
providerRouter.post('/', auth_1.auth, providerController_1.default.save);
providerRouter.get('/', providerController_1.default.all);
providerRouter.get('/:id', providerController_1.default.showOne);
providerRouter.put('/:id', providerController_1.default.editProvider);
providerRouter.get('/service/:id', providerController_1.default.searchByTypeProvider);
exports.default = providerRouter;
//# sourceMappingURL=providerRouter.js.map