"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controllers/userController"));
const auth_1 = require("../middleware/auth");
const userRouter = (0, express_1.Router)();
userRouter.post('/register', userController_1.default.signup);
userRouter.get('/', userController_1.default.allUser);
userRouter.post('/login', userController_1.default.login);
userRouter.put('/role/:id', userController_1.default.updateToProvider);
userRouter.get('/:id', auth_1.auth, userController_1.default.showUser);
userRouter.put('/:id', auth_1.auth, userController_1.default.editUser);
userRouter.delete('/:id', auth_1.auth, userController_1.default.delete);
userRouter.get('/:name', auth_1.auth, userController_1.default.searchUsername);
exports.default = userRouter;
//# sourceMappingURL=userRouter.js.map