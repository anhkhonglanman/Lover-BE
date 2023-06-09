export const CheckRoleProvider = (req, res, next) => {
    if (req.decode.role === 3){
        return  next()
    } else {
        res.status(401).json({
            message: "ban khong co quyen provider",
            success: false
        })
    }
}