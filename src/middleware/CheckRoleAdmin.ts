export const CheckRoleAdmin = (req, res, next) => {
    if (req.decode.role === 2){
        return  next()
    } else {
        res.status(401).json({
            message: "ban khong co quyen admin",
            success: false
        })
    }
}