"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckRoleUser = void 0;
const CheckRoleUser = (req, res, next) => {
    if (req.decode.role === 1) {
        return next();
    }
    else {
        res.status(401).json({
            message: "ban khong co quyen user",
            success: false
        });
    }
};
exports.CheckRoleUser = CheckRoleUser;
//# sourceMappingURL=checkRoleUser.js.map