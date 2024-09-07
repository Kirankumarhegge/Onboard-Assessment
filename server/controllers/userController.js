require('dotenv').config();
const UserModel = require('../model/user');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.signup = async (req, res) => {
    try {

        if (req.body.nickname && req.body.password) {
            const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
            const user = {
                nickname: req.body.nickname,
                password: hashedPassword,
                createdAt: Date.now(),
                updatedAt: Date.now(),
            };
            
            const accessToken = jwt.sign({ nickname: user.nickname }, process.env.JWT_SECRET, { expiresIn: '1h' });
            const newUser = await UserModel.create(user);

            res.cookie('accessToken', accessToken, {maxAge : 3600000, httpOnly: true, sercure: true, sameSite: 'strict' });
            
            return res.status(200).json(newUser);

        } else {
            res.status(400).json({
                error: 'Missing required fields',
            });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error creating user' });
    }
};


exports.checkNickname = async (req, res) => {
    try {
        const { nickname } = req.body;
        const user = await UserModel.findOne({ nickname });
        return res.status(200).json({ exists: !!user });
    } catch (err) {
        res.status(500).json({ error: 'Error checking nickname' });
    }
};
