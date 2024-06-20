
exports.getQuery = {
    getAllProducts:
        `SELECT * FROM products`,
    getValidateUser:
        `SELECT * FROM user WHERE dni = ? `,
    getValidateNewUser:
        `SELECT * FROM user WHERE dni = ? OR phone = ? OR email = ?`,
    getProductsOnHome:
        `SELECT id, nameproduct, discount, price, quantity, image_path 
        FROM products WHERE discount > 0 
        ORDER BY discount DESC LIMIT 5`,
    getProductsOnTshirt:
        `SELECT id, nameproduct, discount, price, quantity, image_path 
        FROM products WHERE products.categorie_id = 1`,
    getProductsOnPants:
        `SELECT id, nameproduct, discount, price, quantity, image_path 
        FROM products WHERE products.categorie_id = 2`,
    getProductsOnJumperAndShoes:
        `SELECT id, nameproduct, discount, price, quantity, image_path 
        FROM products WHERE products.categorie_id = 3 OR products.categorie_id = 4`,
    getProductDescription:
        `SELECT * FROM products WHERE id = ?`,
    getProductCart:
        `SELECT id, nameproduct, description,price, discount, quantity, image_path 
        FROM products WHERE id = ?`,
    getHistoryShopping:
        `SELECT h.id, u.username, h.dateOrder, p.nameproduct, p.description, d.price, d.discount, d.quantity, (d.price - d.discount) * d.quantity AS SUBTOTAL, 
        (SELECT SUM((d2.price - d2.discount)*d2.quantity)
        FROM descriptionorder AS d2 WHERE d2.id_history_order = h.id ) AS TOTAL 
        FROM USER AS u 
        INNER JOIN historyorder AS h ON h.user_id = u.id
        INNER JOIN descriptionorder AS d ON h.id = d.id_history_order
        INNER JOIN products AS p ON d.id_product = p.id
        WHERE u.dni = ?`,
}

exports.postQuery = {
    postNewUser:
        `INSERT INTO user(dni, username, password, email, phone) 
        VALUES (?, ?, ?, ?, ? )`,
    postOrder:
        `INSERT INTO historyOrder (user_id, amount) 
        VALUES (?, ?)`,
    postHistoryOrder:
        `INSERT INTO historyorder (user_id, dateOrder, amount) 
        VALUES (? , ?, ?)`,
    postDescriptionOrder:
        `INSERT INTO descriptionOrder (id_history_order, id_product, quantity, price, discount) 
        VALUES ?`,
}

exports.putQuery = {
    putProductById:
        `UPDATE products SET quantity = ? WHERE id = ?`,
}


