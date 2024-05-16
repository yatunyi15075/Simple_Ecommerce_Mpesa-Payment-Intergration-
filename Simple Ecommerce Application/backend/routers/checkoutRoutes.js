import express from 'express';
import { initiateCheckout } from '../controllers/checkoutController.js';
import { initiateSTKPush, stkPushCallback, confirmPayment } from '../controllers/payment.js'; 

const router = express.Router();


router.post('/checkout', initiateCheckout);


router.post('/stkPush', initiateSTKPush);


router.post('/stkPushCallback/:Order_ID', stkPushCallback);


router.post('/confirmPayment/:CheckoutRequestID', confirmPayment);

export default router;
