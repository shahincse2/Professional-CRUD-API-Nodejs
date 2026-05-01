const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const filePath = path.join(__dirname, '../products.json');

// Helper function for reading data
const readData = () => {
    try {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (e) { return []; }
};

// Helper function to save data
const writeData = (data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

// 1. View all products
exports.readProduct = (req, res) => {
    res.json({ status: "success", data: readData() });
};

// 2. View a product by ID
exports.readProductByID = (req, res) => {
    const id = parseInt(req.params.id);
    const products = readData();
    const product = products.find(p => p.id === id);
    if (product) {
        res.json({ status: "success", data: product });
    } else {
        res.status(404).json({ status: "fail", message: "Product not found" });
    }
};

// 3. Search for products (by name or code)
exports.searchProduct = (req, res) => {
    const { keyword } = req.query;
    if (!keyword) return res.status(400).json({ status: "fail", message: "Keyword is required" });

    const products = readData();
    const result = products.filter(p => 
        p.ProductName.toLowerCase().includes(keyword.toLowerCase()) || 
        p.ProductCode.toLowerCase().includes(keyword.toLowerCase())
    );
    res.json({ status: "success", count: result.length, data: result });
};

// 4. Create New Product (Validation & Auto-Calculation)
exports.createProduct = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ status: "fail", errors: errors.array() });

    const products = readData();
    const { ProductCode, Qty, UnitPrice, ProductName, Img } = req.body;

    if (products.find(p => p.ProductCode === ProductCode)) {
        return res.status(400).json({ status: "fail", message: "Product Code already exists" });
    }

    const newProduct = {
        id: Date.now(),
        ProductName, ProductCode, Img,
        Qty: Number(Qty),
        UnitPrice: Number(UnitPrice),
        TotalPrice: Number(Qty) * Number(UnitPrice)
    };

    products.push(newProduct);
    writeData(products);
    res.status(201).json({ status: "success", data: newProduct });
};

// 5. Updating the product
exports.updateProduct = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ status: "fail", errors: errors.array() });

    const id = parseInt(req.params.id);
    let products = readData();
    let index = products.findIndex(p => p.id === id);

    if (index !== -1) {
        const { Qty, UnitPrice } = req.body;
        products[index] = { 
            ...products[index], 
            ...req.body,
            TotalPrice: Number(Qty) * Number(UnitPrice)
        };
        writeData(products);
        res.json({ status: "success", message: "Updated successfully" });
    } else {
        res.status(404).json({ status: "fail", message: "Product not found" });
    }
};

// 6. Delete product
exports.deleteProduct = (req, res) => {
    const id = parseInt(req.params.id);
    let products = readData();
    const updatedProducts = products.filter(p => p.id !== id);
    
    if (products.length > updatedProducts.length) {
        writeData(updatedProducts);
        res.json({ status: "success", message: "Deleted successfully" });
    } else {
        res.status(404).json({ status: "fail", message: "Product not found" });
    }
};