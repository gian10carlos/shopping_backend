const connection = require('../../db/connection.js')
const queries = require('../../db/queries.js')

exports.getShoppingHistory = (req, res) => {
    const user = req.user ? req.user.tokenData : null;
    const query = queries.getQuery.getHistoryShopping;

    connection.query(query, [user.dni], (err, history) => {
        if (err) {
            res.status(500).send('Error 404 not found history' + err);
            return;
        } else {


            function formatDateOrder(history) {
                if (!Array.isArray(history)) {
                    throw new TypeError('Expected an array of orders');
                }

                return history.map(order => {
                    const date = new Date(order.dateOrder);

                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const year = date.getFullYear();
                    const hours = String(date.getHours()).padStart(2, '0');
                    const minutes = String(date.getMinutes()).padStart(2, '0');
                    const seconds = String(date.getSeconds()).padStart(2, '0');
                    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

                    const formattedTotal = Number(order.TOTAL.toFixed(2));
                    const formattedSubtotal = Number(order.SUBTOTAL.toFixed(2));

                    return {
                        ...order,
                        dateOrder: formattedDate,
                        TOTAL: formattedTotal,
                        SUBTOTAL: formattedSubtotal
                    };
                });
            }

            const formattedOrders = formatDateOrder(history);

            const uniqueOrders = formattedOrders.reduce((acc, curr) => {
                if (!acc[curr.id]) {

                    acc[curr.id] = {
                        id: curr.id,
                        username: curr.username,
                        dateOrder: curr.dateOrder,
                        nameproduct: curr.nameproduct,
                        decription: curr.description,
                        price: curr.price,
                        discount: curr.discount,
                        quantity: curr.quantity,
                        subtotal: curr.SUBTOTAL,
                        total: curr.TOTAL
                    };
                }
                return acc;
            }, {});

            const data = Object.values(uniqueOrders);

            res.json({ user, data });
        }
    })
}
