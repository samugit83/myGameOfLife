
const router = require('express').Router();

router.get('/mygame', (req, res, next) => {
    res.sendFile('/home/ec2-user/mygame/mygame_front/index.html');

});

module.exports = router;



