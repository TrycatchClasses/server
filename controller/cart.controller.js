import mongoose from "mongoose";
import Cart from "../model/cart.model";
import Products from "../model/product.model";

export const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        const product = await Products.findOne({ _id: productId });

        const existingCartItem = await Cart.findOne({ userId: userId, productId: productId });
        if (existingCartItem) {
            if (existingCartItem.quantity < 10 && existingCartItem.quantity >= 1) {
                existingCartItem.quantity += 1;
                await existingCartItem.save();

                return res.status(200).json({
                    message: "Quantity updated"
                });
            } else {
                return res.status(200).json({
                    message: "Limit exceeded"
                });
            }
        }

        const newCartItem = new Cart({
            userId: userId,
            productId: productId,
            name: product.name,
            price: product.price,
            image: product.productImage,
            quantity: quantity || 1
        });
        await newCartItem.save();

        return res.status(201).json({
            data: newCartItem,
            message: "Added to cart"
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};

export const getCart = async (req, res) => {
    try {
        const { userId } = req.body;

        const cartItems = await Cart.aggregate([
            { $match: { userId: userId } },
            { 
                $lookup: {
                    from: "products", 
                    localField: "productId",
                    foreignField: "_id",
                    as: "products"
                }
            },
            { $unwind: "$products" },
            { 
                $project: {
                    _id: "$_id",
                    userId: "$userId",
                    productId: "$productId",
                    name: "$product.name",
                    price: "$product.price",
                    image: "$product.productImage",
                    quantity: "$quantity"
                }
            }
        ]);

        return res.status(200).json({
            cartItems: cartItems
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};


export const updateCart = async (req, res) => {
    try {
        const cartItemId = req.params.id;
        const { quantity } = req.body;
        const cartItem = await Cart.findById(cartItemId);

        if (!cartItem) {
            return res.status(404).json({
                message: "Cart item not found"
            });
        }

        if (quantity === 0) {
            await Cart.deleteOne({ _id: cartItemId }); 
            return res.status(200).json({
                message: "Cart item removed"
            });
        }

        cartItem.quantity = quantity;
        await cartItem.save();

        return res.status(200).json({
            message: "Cart item updated",
            data: cartItem
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};


export const removeCart = async (req, res) => {
    try {
        const cartItemId = req.params.id;
        const cartItem = await Cart.findById(cartItemId);

        if (!cartItem) {
            return res.status(404).json({
                message: "Cart item not found"
            });
        }

        await Cart.deleteOne({ _id: cartItemId }); // Use deleteOne to remove the cart item

        return res.status(200).json({
            message: "Cart item removed"
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};



