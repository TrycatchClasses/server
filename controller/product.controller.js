import Products from "../model/product.model";
import upload from "../multerConfig";
import fs from "fs-extra";

export const addProduct = async (req, res) => {
  upload.array("proImage", 10)(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const {
      proName,
      proSku,
      proDesc,
      shortDesc,
      proQuantity,
      category,
      subCategory,
      manufacturerName,
      manufacturerBrand,
      proPrice,
      proStatus,
      visible
    } = req.body;

    var imageArr = [];
    req?.files?.map((element) => {
      imageArr.push(element.filename);
    });

    const productTag = req?.body?.proTag?.split(",").map((tag) => tag.trim()) || [];

    try {
      const product = new Products({
        proName,
        proSku,
        proDesc,
        shortDesc,
        proQuantity,
        category,
        subCategory,
        proPrice,
        proStatus,
        visible,
        manufacturerName,
        manufacturerBrand,
        proImage: imageArr,
        proTag: productTag
      });
      const saveData = await product.save();

      res.status(201).json({
        message: "Product Saved Successfully",
        data: saveData,
        status: true,
      });
    } catch (err) {
      res.status(500).json({
        error: err.message,
        status: false,
      });
    }
  });
};

export const singleProduct = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    res.status(200).json({ message: "Product Found", data: product });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// export const getallProducts = async (req, res) => {
//   const { proName, category, proStatus, proPrice, proQuantity } = req.query;

//   let filters = {};

//   if (proName) filters.proName = { $regex: new RegExp(proName, "i") };
//   if (category) filters.category = category;
//   if (proStatus) filters.proStatus = { $regex: new RegExp(proStatus, "i") };
//   if (proPrice) filters.proPrice = Number(proPrice);
//   if (proQuantity) filters.proQuantity = Number(proQuantity);

//   try {
//     const filteredProducts = await Products.find(filters);

//     res.status(200).json({
//       data: filteredProducts,
//       message: "Success",
//       path: "http://localhost:4000/uploads/",
//     });
//   } catch (err) {
//     res.status(500).json({
//       error: err,
//       status: false,
//     });
//   }
// };

export const getallProducts = async (req, res) => {
  const { proName, category, proStatus, proPrice, proQuantity } = req.query;

  let filters = {};

  if (proName) filters.proName = { $regex: new RegExp(proName, "i") };
  if (category) filters.category = category;
  if (proStatus) filters.proStatus = { $regex: new RegExp(proStatus, "i") };
  if (proPrice) filters.proPrice = Number(proPrice);
  if (proQuantity) filters.proQuantity = Number(proQuantity);

  try {
    const filteredProducts = await Products.aggregate([
      {
        $lookup: {
          from: "categoryschemas",
          localField: "category",
          foreignField: "_id",
          as: "categoryschemas",
        },
      },
      { $unwind: "$categoryschemas" },
      { $match: filters }, 
    ]);

    res.status(200).json({
      data: filteredProducts,
      message: "Success",
      path: "http://localhost:4000/uploads/",
    });
  } catch (err) {
    res.status(500).json({
      error: err,
      status: false,
    });
  }
};

export const updateProduct = async (req, res) => {
  upload.array("proImage", 10)(req, res, async (err) => {
    if (err) {
      return res.status(500).res.json({
        error: err.message,
      });
    }

    const {
      proName,
      proSku,
      proDesc,
      proQuantity,
      category,
      proPrice,
      proStatus,
      visible
    } = req.body;

    var imageArr = [];
    req?.files?.map((element) => {
      imageArr.push(element.filename);
    });

    const ProductId = req.params.id;

    try {
      const product = await Products.findById(ProductId);
      if (!product) {
        return res.status(404).json({ message: "product not found" });
      }

      const oldImageArr = product.proImage;

      oldImageArr.forEach((oldImage) => {
        if (!imageArr.includes(oldImage)) {
          fs.unlink(`./uploads/${oldImage}`, (err) => {
            if (err) {
              console.error(`Error unlinking ${oldImage}:`, err);
            } else {
              console.log(`${oldImage} unlinked successfully`);
            }
          });
        }
      });

      product.proName = proName;
      product.proSku = proSku;
      product.proDesc = proDesc;
      product.proQuantity = proQuantity;
      product.category = category;
      product.proPrice = proPrice;
      product.proStatus = proStatus;
      product.visible = visible;
      product.proImage = imageArr;

      const updateProduct = await product.save();
      res.status(200).json({
        message: "Product updated successfully",
        data: updateProduct,
      });
    } catch (err) {
      res.status(500).json({
        error: err.message,
        status: false,
      });
    }
  });
};

export const deleteProduct = async (req, res) => {
  try {
    const _id = req.params.id;
    const productDelete = await Products.findByIdAndDelete(_id, req.body);

    // Check if proImage is an array of multiple images
    if (Array.isArray(productDelete.proImage)) {
      productDelete.proImage.forEach((image) => {
        const imagePath = "uploads/" + image;
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      });
    } else {
      const imagePath = "uploads/" + productDelete.proImage;
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.status(200).json({
      message: "Deleted successfully",
      data: productDelete,
    });
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
};

export const getProByCategory = async (req, res) => {
  const categoryId = req.params.category;
  try {
    const products = await Products.find({ category: categoryId });
    res.status(200).json({
      message: "Product List",
      data: products,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
      status: false,
    });
  }
};


// export const getProByCategory = async (req, res) => {
//   const categoryId = req.params.category;
//   try {
//     const products = await Products.aggregate([
//       {
//         $match: { category: categoryId }
//       },
//       {
//         $lookup: {
//           from: "categoryschemas",
//           localField: "category",
//           foreignField: "_id",
//           as: "categoryschemas",
//         },
//       },
//       { $unwind: "$categoryschemas" },
//     ]);

//     res.status(200).json({
//       message: "Product List",
//       data: products,
//     });
//   } catch (err) {
//     res.status(500).json({
//       error: err.message,
//       status: false,
//     });
//   }
// };

