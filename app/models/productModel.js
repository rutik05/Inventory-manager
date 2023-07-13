import { Schema, model, models } from "mongoose";
  
const prdSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  created: {
    type: Date,
    default: Date.now()
  }
});

const Product = models.Product || model('Product', prdSchema);

export default Product;
