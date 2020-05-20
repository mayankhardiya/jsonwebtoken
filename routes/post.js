const router = require('express').Router();
const verify = require('./varifyToken');
router.get('/', verify, (req, res) => {
    console.log('hi');
    res.json({
        posts: {
            title: 'my first post',
            description: 'Random data you shouldnt access'
        }
    });
});

module.exports = router;