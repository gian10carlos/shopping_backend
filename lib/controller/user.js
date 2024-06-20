const connection = require('../../db/connection.js')
const queries = require('../../db/queries.js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

var user = [];

exports.getUser = (req, res) => {
    const { dni, password } = req.body;
    const query = queries.getQuery.getValidateUser;
    connection.query(query, [dni], async (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            return res.status(200).json({ message: 'Usuario no encontrado' });
            // RENDER: return res.render('login', { message: 'Usuario no encontrado' });
        }

        user = result[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(200).json({ message: 'Contraseña incorrecta' });
            // return res.render('login', { message: 'Contraseña incorrecta' });
        }

        const tokenData = {
            dni: user.dni,
            username: user.username,
            email: user.email,
            phone: user.phone,
        }

        const token = jwt.sign({ tokenData }, 'your_jwt_secret_key', { expiresIn: '1h' });
        res.cookie('authToken', token, { httpOnly: true, maxAge: 3600000 });
        return res.redirect('/home');
    })
}

exports.postUser = (req, res) => {
    try {
        const { dni, fullname, email, phone, password, passwordConfirm } = req.body;
        const query = queries.getQuery.getValidateNewUser;
        connection.query(query, [dni, phone, email], async (err, result) => {
            if (err) {
                res.status(500).send('Error register new user' + err)
            }
            if (result.length > 0) {
                return res.status(200).json({ message: 'DNI, telefono o correo registrado', newuser: null })
                // RENDER: return res.render('signup', { message: 'DNI, telefono o correo registrado', newuser: null })
            } else if (password !== passwordConfirm) {
                return res.status(200).json({ message: 'Contraseña no coincide', newuser: null })
                // RENDER: return res.render('signup', { message: 'Contraseña no coincide', newuser: null })
            }

            let hashedPassword = await bcrypt.hash(password, 10);

            const queryP = queries.postQuery.postNewUser;
            connection.query(queryP, [dni, fullname, hashedPassword, email, phone], async (error, resultp) => {
                if (error) {
                    res.status(500).send('Error register new user' + error)
                }
                else {
                    const token = jwt.sign({ dni }, 'your_jwt_secret_key', { expiresIn: '1h' });
                    res.cookie('authToken', token, { httpOnly: true, maxAge: 3600000 });
                    return res.redirect('/home')
                }
            })
        });

    } catch (error) {
        res.status(500).send('Error register' + error)
    }
}

exports.logoutUser = (req, res) => {
    res.clearCookie('authToken');
    res.redirect('/home');
};