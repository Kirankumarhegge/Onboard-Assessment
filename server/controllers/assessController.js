require('dotenv').config();
const AssessModel = require('../model/onboard');
const jwt = require("jsonwebtoken");

exports.getQuestions = async (req, res) => {
    try {
        const token = req.cookies.accessToken
        if (!token) {
            return res.status(401).json({ error: 'Access denied, token missing!' });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ error: 'Invalid token' });
            }
            req.user = user;
        });

        const userAssessAnsData = await AssessModel.find({ entryType: "ANSWERED", nickname: req.headers.nickname });
        const assessData = await AssessModel.find({ entryType: "QUESTION" });

        if (assessData.length > 0) {
            for (let i = 0; i < assessData.length; i++)
                for (let j = 0; j < userAssessAnsData.length; j++)
                    if (assessData[i].QuesId == userAssessAnsData[j].QuesId)
                        assessData[i] = userAssessAnsData[j];

            return res.status(200).json(assessData);
        } else {
            return res.status(404).json({ msg: "No questions found!" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Error fetching assessment", error: err.message });
    }
};


exports.submitAnswer = async (req, res) => {
    try {
        const token = req.cookies.accessToken
        if (!token) {
            return res.status(401).json({ error: 'Access denied, token missing!' });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ error: 'Invalid token' });
            }
            req.user = user;
        });

        const { nickname, question, answer } = req.body;
        let itemToBeSaved = {
            ...question,
            nickname,
            ansValues: answer,
            entryType: "ANSWERED"
        };
        delete itemToBeSaved._id;

        const assessData = await AssessModel.create(itemToBeSaved);
        return res.status(200).json(assessData);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Error submitting answer", error: err });
    }
};
