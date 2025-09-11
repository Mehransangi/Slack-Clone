import mongoose from 'mongoose';
import { ENV } from './env.js';

export const connectDB = async () => {
  await mongoose.connect(ENV.MONOGO_URI).then(()=>{
    console.log("Database Connected");
}).catch((err)=>{
    console.log("Database Connection Failed : ", err);
});
}

