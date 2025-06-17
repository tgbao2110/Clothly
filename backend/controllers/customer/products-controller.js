import {Product} from '../../models/Product.js'

const getFilteredProducts = async(req, res) => {
    try {
        const filter = {};
        const sort = {};
        // Expected:
        // - filter = { category: { $in: ['men', 'women'] },
        //              brand: { $in: ['nike', 'adidas'] },}
        // - sort = { salePrice: 1 }

        // Parse categories from req.query
        if (req.query.categories) {
            const categories = req.query.categories.split(',');
            filter.category = { $in: categories };
        }

        // Parse brands from req.query
        if (req.query.brands) {
            const brands = req.query.brands.split(',');
            filter.brand = { $in: brands };
        }

        //Parse sort from req.query
        if (req.query.sort) {
            let [field, direction] = req.query.sort.split('-');
            if (field === 'price') field ='salePrice';
            sort[field] = direction === 'asc' ? 1 : -1;
        }

        // Find products by query
        const products = await Product.find(filter).sort(sort);

        res.status(200).json({
            success: true,
            data: products
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error fetching products'
        })
    }
}

const getProductById = async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        if (!product) {
            res.status(404).json({
                success: false,
                message: "Product not found"
            })
            return
        }
        res.status(200).json({
            success: true,
            message: "Product fetched successfully",
            data: product
        })
        res
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error fetching product'
        })
    }
}

export {getFilteredProducts, getProductById}