const connection = require('../../db/connection.js')
const queries = require('../../db/queries.js')
let cart = [];

exports.getCart = (req, res) => {
    const cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];
    res.status(200).json(cart);
};

exports.addProduct = (req, res) => {
    const { idProduct, quantity } = req.body;
    let cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];

    const productIndex = cart.findIndex(item => item.idProduct == idProduct);

    if (productIndex !== -1) {
        cart[productIndex].quantity = quantity;
    } else {
        cart.push({ idProduct, quantity });
    }

    res.cookie('cart', JSON.stringify(cart), { maxAge: 900000, httpOnly: true });
    res.status(200).json({ message: 'Producto agregado/actualizado en el carrito' });
};

exports.deleteProduct = (req, res) => {
    const { idProduct } = req.body;
    let cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];

    cart = cart.filter(item => item.idProduct != idProduct);

    res.cookie('cart', JSON.stringify(cart), { maxAge: 900000, httpOnly: true });
    res.status(200).json({ message: 'Producto eliminado del carrito' });
};

exports.postShopping = (req, res) => {
    const { amount, cart } = req.body;
    const user = req.user ? req.user.tokenData : null;
    const userQuery = queries.getQuery.getValidateUser;
    const historyQuery = queries.postQuery.postHistoryOrder;
    const descriptionQuery = queries.postQuery.postDescriptionOrder;

    connection.beginTransaction((err) => {
        if (err) {
            return res.status(500).send('Transaction Error: ' + err);
        }

        connection.query(userQuery, [user.dni], (err, user_id) => {
            if (err) {
                return connection.rollback(() => {
                    res.status(500).send('Error getting user: ' + err);
                });
            }
            const datetime = new Date();

            connection.query(historyQuery, [user_id[0].id, datetime, amount], (err, historyResult) => {
                if (err) {
                    return connection.rollback(() => {
                        res.status(500).send('Error posting history: ' + err);
                    });
                }

                const historyOrderId = historyResult.insertId;
                const descriptionValues = cart.map(item => [historyOrderId, item.id, parseInt(item.selected), item.price, item.discount]);

                connection.query(descriptionQuery, [descriptionValues], (err) => {
                    if (err) {
                        return connection.rollback(() => {
                            res.status(500).send('Error posting description: ' + err);
                        });
                    }

                    connection.commit((err) => {
                        if (err) {
                            return connection.rollback(() => {
                                res.status(500).send('Commit Error: ' + err);
                            });
                        }

                        res.cookie('cart', '', { maxAge: 0, httpOnly: true });
                        res.status(200).send('Order registered successfully');
                    });
                });
            });
        });
    });
}