const router = require('express').Router();
const { BlogPost, User } = require('../../models');

router.get('/', async (req,res) => {
    try {
        userData = await User.findAll({
            include: [
                {
                    model: BlogPost,
                    attributes: ['id', 'topic', 'content']
                },
            ],
        },
        res.status(200).json(userData));
    } catch (err) {
        res.status(500).json(err);
    }
})

router.post('/', async (req, res) => {
    console.log('this is the signup route')
    console.log(req.body);
    try {
        const userData = await User.create(req.body);
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json({message: "Cannot add user, may be a duplicate entry", err});
    }
});

router.post('/login', async (req, res) => {
    console.log(req.body)
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res.status(400).json({ message: "Invalid email"});
            return;
        }
        const correctPassword = await userData.checkPassword(req.body.password);

        if (!correctPassword) {
            res.status(400).json({ message: "Invalid password"});
            return;
        }
        console.log('successfully logged in after if statement')
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: "Successfully Logged in"});
        });
    } catch (err) {
        res.status(400).json({ message: "error logging in", err })
    }
})

module.exports = router;