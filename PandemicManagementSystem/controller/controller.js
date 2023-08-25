var {User} = require('../model/model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    try {
        const username = req.body.username;
        const password = req.body.password;

        User.findOne({ username: username })
            .then(async (data) => {
                const compare = await bcrypt.compareSync(password, data.password);
                if (!data || !compare) {
                    res.status(404).send({ message: "Not found username : " + username + " with password : " + password + " as register." });
                    return;
                }
                else {
                    const token = jwt.sign({ username: username, role: data.role }, process.env.TOKEN_SECRET);
                    res.status(200).json({ token: token });
                }
            })

    }
    catch (err) {
        res.status(500).send(err);
    }
};

exports.addUser = (req, res) => {

    if (!req.body) {
        res.status(400).json({ message: "Content can not be empty!" });
        return;
    }

    try {

        const user = new User({
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 10),
        })

        user
            .save(user)
            .then(data => {
                const token = jwt.sign({ username: req.body.username, role: "user" }, process.env.TOKEN_SECRET);
                res.status(200).json({ token: token });
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occured while creating a create operation"
                });
            });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);

    }
};

exports.hostpitalAllocation = async (req, res) => {

}