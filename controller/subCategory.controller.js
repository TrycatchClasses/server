import SubCategorySchema from "../model/subCategory.model";
// import CategorySchema from "../model/category.model";
const categoryschemas = require('../model/category.model');

export const addSubCategory = async (req, res) => {
  try {
    const { subName, category, description } = req.body;

    const subCategory = new SubCategorySchema({
      subName,
      category,
      description,
    });
    const savedData = await subCategory.save();
    res.status(201).json({
      message: "Subcategory saved successfully",
      data: savedData,
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      status: false,
    });
  }
};


export const getSubcategory = async (req, res)=>{
    try {
        const subCatData = await SubCategorySchema.aggregate([
            {
                $lookup:{
                    from:"categoryschemas",
                    localField: "category",
                    foreignField: "_id",
                    as: "categoryschemas",
                },
            },
            // {$unwind:"$CategorySchema"},
        ]);
        
        if(subCatData){
            return res.status(200).json({
                data: subCatData,
                message: "Success",
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
};

export const getSingleSubCat = async (req, res)=>{
    try {
        const subCatId = req.params.subcategory_id;

        const subCatData = await SubCategorySchema.findOne({_id: subCatId});
        if(subCatData){
            return res.status(200).json({
                data: subCatData,
                message: "Success",
            });
        }

    } catch (error) {
        return res.status(500).json({
            message: err.message,
        });
    }
};
export const updateSubCategory = async (req, res) => {
    try {
      const { subName, category, description } = req.body;
      const subCategoryId = req.params.id;
  
      const subCategory = await SubCategorySchema.findById(subCategoryId);
  
      if (!subCategory) {
        return res.status(404).json({
          message: "Subcategory not found",
          status: false,
        });
      }
  
      subCategory.subName = subName;
      subCategory.category = category;
      subCategory.description = description;
  
      const updatedData = await subCategory.save();
  
      res.status(200).json({
        message: "Subcategory updated successfully",
        data: updatedData,
        status: true,
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
        status: false,
      });
    }
  };
  


  export const deleteSubCategory = async (req, res) => {
    try {
      const subCategoryId = req.params.id;
      await SubCategorySchema.findByIdAndDelete(subCategoryId);
  
      res.status(200).json({
        message: "Subcategory deleted successfully",
        status: true,
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
        status: false,
      });
    }
  };


  export const subCategoryByCate = async (req, res)=>{
    const categoryId = req.params.category;
    // console.log(categoryId);
    try {
        const subData = await SubCategorySchema.find({ category: categoryId });
        res.status(200).json({
          message: "SubCategory List",
          data: subData,
        });
      } catch (err) {
        res.status(500).json({
          error: err.message,
          status: false,
        });
      }
  }