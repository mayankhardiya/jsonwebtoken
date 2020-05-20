const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validation')
const TOKEN_SECRET = 'sklfjsflsjflsdf';

router.post('/register', async (req, res) => {

    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const emailExist = await User.findOne({ email: req.body.email });

    if (emailExist) return res.status(400).send('Email Already Exists');

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try {

        const saveUsed = await user.save();

        res.send({ user: user._id });

    } catch (err) {

        res.status(400).send(err);

    }

});

router.post('/login', async (req, res) => {

    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email Wroung');

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("Invalid Password");

    const token = jwt.sign({ _id: user._id }, TOKEN_SECRET);
    res.header('auth-token', token).send(token);

    res.send('logged in');

})

module.exports = router;