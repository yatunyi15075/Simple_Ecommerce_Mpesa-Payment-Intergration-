import express from 'express';
import mongoose from 'mongoose';
import checkoutRoutes from './routers/checkoutRoutes.js';
import { mongoURI } from './config.env'; 
import  config  from './config.env'; 

const app = express();

config();

app.use(cors({
  origin: [process.env.FRONTEND],
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/mpesa', checkoutRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
