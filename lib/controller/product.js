const connection = require('../../db/connection.js')
const queries = require('../../db/queries.js')

exports.getProduct = (req, res) => {
    const id = req.params.id
    const query = queries.getQuery.getProductDescription;
    connection.query(query, [id], (err, data) => {
        if (err) {
            res.status(500).send('Error interno del servidor' + err);
            return;
        }
        res.json({ data });
    })
}