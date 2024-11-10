
//?--------------------------------
//! @desc Check if user is logged in
//! @route GET /api/users/me
//! @access Private
//?--------------------------------

const isLoggedIn = (req, res, next) => {
    //? Check if user is logged in by token

    const token = req.cookies.jwt;

    if (token) {
        next();
    } else {
        res.status(401);
        throw new Error("Not authorized");
    }
}