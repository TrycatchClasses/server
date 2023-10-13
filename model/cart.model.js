import mongoose from "mongoose";
import UserSchema from "./user.model";
import Products from "./product.model";

const { Schema } = mongoose;

const cartModel = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: UserSchema,
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Products,
    required: true,
  },
  name: {
    type: String,
    // required: true
  },
  image: {
    type: Array,
    // required: true
  },
  quantity: {
    type: Number,
    default: 1,
    required: true,
  },
  price: {
    type: Number,
    // required: true
  },
});


const Cart = mongoose.model("Cart", cartModel);
export default Cart;
