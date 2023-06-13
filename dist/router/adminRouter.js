"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controllers/userController"));
const auth_1 = require("../middleware/auth");
const adminRouter = (0, express_1.Router)();
adminRouter.put('/lock-user/:id', userController_1.default.lockUser);
adminRouter.put('/open-user/:id', userController_1.default.openUser);
adminRouter.put('/:id', auth_1.auth, userController_1.default.editUser);
adminRouter.delete('/:id', auth_1.auth, userController_1.default.delete);
exports.default = adminRouter;
//# sourceMappingURL=adminRouter.js.map