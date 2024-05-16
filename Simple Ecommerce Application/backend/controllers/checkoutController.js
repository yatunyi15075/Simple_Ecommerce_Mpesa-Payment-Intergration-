import Transaction from '../models/Transaction.js';
import request from 'request';
import ngrok from 'ngrok';
import dotenv from 'dotenv';

dotenv.config();

export const initiateCheckout = async (req, res) => {
  const { amount, phoneNumber, Order_ID } = req.body;

  try {

    const transaction = new Transaction({
      amount,
      phoneNumber,
      Order_ID
    });

    
    await transaction.save();

   
    const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
    const auth = "Bearer " + req.safaricom_access_token;

    
    const password = Buffer.from(process.env.BUSINESS_SHORT_CODE + process.env.PASS_KEY).toString('base64');

  
    const callback_url = await ngrok.connect(process.env.PORT);
    const api = ngrok.getApi();
    await api.listTunnels();

    console.log("Callback URL: ", callback_url);

    request({
      url: url,
      method: "POST",
      headers: {
        "Authorization": auth
      },
      json: {
        "BusinessShortCode": process.env.BUSINESS_SHORT_CODE,
        "Password": password,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": phoneNumber,
        "PartyB": process.env.BUSINESS_SHORT_CODE,
        "PhoneNumber": phoneNumber,
        "CallBackURL": `${callback_url}/api/stkPushCallback/${Order_ID}`,
        "AccountReference": "Perez Grocery Shop",
        "TransactionDesc": "Online Payment"
      }
    }, function (error, response, body) {
      if (error) {
        console.error(error);
        res.status(503).send({
          message: "Error with the stk push",
          error: error
        });
      } else {
        console.log(body);
        
        const paymentUrl = body.paymentUrl;
        
        res.json({ paymentUrl });
      }
    });

  } catch (error) {
    console.error('Error initiating M-pesa checkout:', error);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
};
