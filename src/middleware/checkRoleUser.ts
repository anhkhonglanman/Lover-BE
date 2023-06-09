export const CheckRoleUser = (req, res, next) => {
    if (req.decode.role === 1){
        return  next()
    } else {
        res.status(401).json({
            message: "ban khong co quyen user",
            success: false
        })
    }
}