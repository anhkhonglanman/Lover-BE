
const hasPermissions = (req, res, next) => {
    const role = req.user.role.id
    switch (role) {
        case "user":
            if (role === 1) {
                return next();
            }
            res.status(401).json({
                message: "Bạn không có quyền user",
                success: false,
            });
            break;
        case "provider":
            if (role === 3) {
                return next();
            }
            res.status(401).json({
                message: "Bạn không có quyền provider",
                success: false,
            });
            break;
        case "admin":
            if (role === 2) {
                return next();
            }
            res.status(401).json({
                message: "Bạn không có quyền admin",
                success: false,
            });
            break;
        default:
            res.status(401).json({
                message: "Bạn không có quyền truy cập",
                success: false,
            });
            break;
    }
};


module.exports = hasPermissions

