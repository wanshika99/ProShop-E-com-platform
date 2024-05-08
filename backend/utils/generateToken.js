import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => { 
    const token = jwt.sign({ userId: userId },
        process.env.JWT_SECRET, { expiresIn: '60d' }
    );

   // set the token as a HTTP cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 60 * 24 * 60 * 60 * 1000 
    });
};

export default generateToken;
