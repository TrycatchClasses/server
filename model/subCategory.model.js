import mongoose from "mongoose";
import CategorySchema from "./category.model";

const {Schema} = mongoose;

const subCateSchema = new Schema({
    subName:{
        type: String,
        required: true,
    },
    category:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: CategorySchema,
    },
    description:{
        type: String,
    }
})

const SubCategorySchema = mongoose.model("SubCategorySchema", subCateSchema);
export default  SubCategorySchema ;

