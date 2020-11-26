
let express = require('express'),
router = express.Router();

const paymentController= require('../controllers/paymentcontroller');

router.get('/getOrderid',paymentController.getOrderConfirm);


module.exports = router;