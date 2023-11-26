const db = require('../database/models');

const api = {
    users: async (req, res) => {
        let users = await db.User.findAll()

        res.status(200).json({
            count: users.length,
            users: users.map(user => ({
                id: user.id_user,
                name: user.name,
                email: user.email,
                detail: "/api/users/" + user.id_user
            })),
            status: 200
        });
    },

    categories: async (req, res) => {
        let categories = await db.Category.findAll()

        res.status(200).json({
            count: categories.length,
            categories: categories.map(category => ({
                id: category.id_category,
                name: category.name
            })),
            status: 200
        });
    },

    editProduct: async (req, res) => {

        const Product = await db.Product;

        let idProduct = req.params.id;
        const oldProduct = await db.Product.findByPk(idProduct);
        Product.update(
            {
                name: req.body.name,
                description: req.body.description,
                price: parseFloat(req.body.price),
                image: req.file ? req.file.filename : oldProduct.image,
                category_id: req.body.category,
                color_id: req.body.colors
            },
            {
                where: { id_product: idProduct }
            })
            .then(confirm => {
                let respuesta;
                if (confirm) {
                    respuesta = {
                        meta: {
                            status: 200,
                            total: confirm,
                            url: '/api/admin/editProduct/:id'
                        },
                        data: confirm
                    }
                } else {
                    respuesta = {
                        meta: {
                            status: 204,
                            total: confirm.length,
                            url: '/api/admin/editProduct/:id'
                        },
                        data: confirm
                    }
                }
                res.json(respuesta);
            })
            .catch(error => res.send(error))
    },
    deleteProduct: async (req, res) => {

        let idProduct = req.params.id;
        db.Product
            .destroy({ where: { id_product: idProduct }, force: true })
            .then(confirm => {
                let respuesta;
                if (confirm) {
                    respuesta = {
                        meta: {
                            status: 200,
                            total: confirm.length,
                            url: 'api/movies/deleteProduct/:id'
                        },
                        data: confirm
                    }
                } else {
                    respuesta = {
                        meta: {
                            status: 204,
                            total: confirm.length,
                            url: 'api/movies/deleteProduct/:id'
                        },
                        data: confirm
                    }
                }
                res.json(respuesta);
            })
            .catch(error => res.send(error))
    }
}

module.exports = api