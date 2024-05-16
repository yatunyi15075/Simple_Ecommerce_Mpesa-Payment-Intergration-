// models/Transaction.js

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const transactionSchema = new Schema({
  phoneNumber: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: 'Pending'
  },

});

export default model('Transaction', transactionSchema);
