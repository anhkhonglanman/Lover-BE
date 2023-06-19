const hasPermissionsUser = (req, res, next) => {
    const role = req.user?.role?.id
    console.log(role)
    if (role !== 1) {
        return res.status(201).json({
            message: "Ban khong co quyen truy cap"
        })
    }
};


module.exports = hasPermissionsUser