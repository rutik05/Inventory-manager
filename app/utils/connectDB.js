import 'dotenv/config'
import mongoose from 'mongoose';

const dbConnect = async ()=>{ 
  try {
    mongoose.connect(process.env.mongouri);
    console.log('connection established to Mongodb ');
  } catch (error) {
    console.error('Error' + error);
  }
}
export default dbConnect;

