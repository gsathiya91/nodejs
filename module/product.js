const ProductModel = require("../model/product");

exports.postProduct = async (req, res, next) => {
    const product = new ProductModel({ ...req.body.product });
    try {
        var response = await product.save();
        res.send(response)
    } catch (err) {
        res.send(err);
    }
}

exports.getProducts = async (req, res, next) => {
    try {
        const products = await ProductModel.find();
        res.send(products);
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}

exports.updateProduct = async (req, res, next) => {
    try {
        var response = await ProductModel.findByIdAndUpdate(req.params.id,
            { ...req.body.product }, { new: true })
        res.send(response)
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}

exports.deleteProduct = async (req, res, next) => {
    try {
        var response = await ProductModel.findByIdAndRemove(req.params.id)
        res.send(response)
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}

