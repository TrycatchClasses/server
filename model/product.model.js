import mongoose from "mongoose";
import CategorySchema from "./category.model";
import SubCategorySchema from "./subCategory.model";

const { Schema } = mongoose;
  
const productSchema = new Schema({
    proName:{
        type:String,
        // required:true,
        maxlength:256,
    },
    proSku:{
        type:String,
        maxlength:256,
    },
    proDesc:{
        type:String,
    },
    shortDesc:{
        type:String,
    },
    proQuantity:{
       type:Number,
    //    required:true,
    },
    proPrice:{
        type:Number,
        maxlength:15,
        // required:true,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:CategorySchema,
        // required:true
    },
    subCategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:SubCategorySchema,
    },
    stock:{
        type:Boolean,
        default: true,
    },
    proStatus:{
        type:String,
        // required:true,
    }, 
    proImage:{
       type:Array, 
    //    required:true
    },
    discount:{
        type:Number,
    },
    // color:{
    //     type:[String],
    // },
    // size:{
    //     type:[String],
    // },
    proTag:{
        type:[String],
    },
    manufacturerName:{
        type:String,
    },
    manufacturerBrand:{
        type:String,
    },
    visible:{
        type:Boolean,
        default:false,
    }
},
{timestamps:true})

const Products = mongoose.model('Products',productSchema);
export default Products;