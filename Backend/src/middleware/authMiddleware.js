export const protectRoute = (req,res,next) => {
    if(!req.auth().isAuthenticated){
        return res.status(401).json({ message: "Unathorized - You must be logged in"})
    }
    next()
}