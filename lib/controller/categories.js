const connection = require('../../db/connection.js')
const queries = require('../../db/queries.js')

exports.getHome = (req, res) => {
    const query = queries.getQuery.getProductsOnHome
    connection.query(query, (err, data) => {
        if (err) {
            res.status(500).send('Error interno del servidor');
            return;
        }
        res.json({ data });
    })
}

exports.getTshirt = (req, res) => {
    const query = queries.getQuery.getProductsOnTshirt
    connection.query(query, (err, data) => {
        if (err) {
            res.status(500).send('Error interno del servidor');
            return;
        }

        res.json({ data });
    })
}

exports.getPants = (req, res) => {
    const query = queries.getQuery.getProductsOnPants
    connection.query(query, (err, data) => {
        if (err) {
            res.status(500).send('Error interno del servidor');
            return;
        }

        res.json({ data });
    })
}

exports.getJumperAndShoes = (req, res) => {
    const query = queries.getQuery.getProductsOnJumperAndShoes
    connection.query(query, (err, data) => {
        if (err) {
            res.status(500).send('Error interno del servidor');
            return;
        }

        res.json({ data });
    })
}

exports.viewCartCurrent = (req, res) => {
    const cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];
    let total = 0;

    const productIds = cart.map(item => item.idProduct);

    if (productIds.length === 0) {
        res.status(200).json({ cartCurrent: [], total });
        return;
    }
    const placeholders = productIds.map(() => '?').join(',');
    const query = `
    SELECT id, nameproduct, description, price, discount, image_path 
    FROM products WHERE id IN (${placeholders})`;

    connection.query(query, productIds, (err, result) => {
        if (err) {
            res.status(500).send('Error retrieving cart')
            return;
        }

        const cartCurrent = result.map(product => {
            const cartItem = cart.find(item => item.idProduct == product.id);
            return {
                ...product,
                selected: cartItem.quantity
            }
        });

        if (cartCurrent.length === 0) {
            total = 0;
            return;
        } else {
            total = cartCurrent.reduce((acumulador, item) => {
                let selected = parseInt(item.selected, 10);
                let value = (item.price - item.discount) * selected;

                return acumulador + value;
            }, 0)
        }
        res.status(200).json({ cartCurrent, total: total ? total.toFixed(2) : 0 });
    })

}

exports.viewAbout = (req, res) => {
    res.json({});
}

exports.viewLogIn = (req, res) => { res.status(200).json({}) }

exports.viewSignUp = (req, res) => { res.status(200).json({ message: null, newuser: null }) }
