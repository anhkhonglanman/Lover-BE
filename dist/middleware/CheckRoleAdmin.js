"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckRoleAdmin = void 0;
const CheckRoleAdmin = (req, res, next) => {
    if (req.decode.role === 2) {
        return next();
    }
    else {
        res.status(401).json({
            message: "ban khong co quyen admin",
            success: false
        });
    }
};
exports.CheckRoleAdmin = CheckRoleAdmin;
//# sourceMappingURL=CheckRoleAdmin.js.map