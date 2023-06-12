"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckRoleProvider = void 0;
const CheckRoleProvider = (req, res, next) => {
    if (req.decode.role === 3) {
        return next();
    }
    else {
        res.status(401).json({
            message: "ban khong co quyen provider",
            success: false
        });
    }
};
exports.CheckRoleProvider = CheckRoleProvider;
//# sourceMappingURL=CheckRoleProvider.js.map