import {Product} from '../../models/Product.js'

const getFilteredProducts = async(req, res) => {
    try {
        const query = {};
        // Expected:
        // query = { category: { $in: ['men', 'women'] },
        //           brand: { $in: ['nike', 'adidas'] }, }


        // Parse categories from req.query
        if (req.query.categories) {
            const categories = req.query.categories.split(',');
            query.category = { $in: categories };
        }

        // Parse brands from req.query
        if (req.query.brands) {
            const brands = req.query.brands.split(',');
            query.brand = { $in: brands };
        }

        // Find products by query
        const products = await Product.find(query);

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

export {getFilteredProducts}