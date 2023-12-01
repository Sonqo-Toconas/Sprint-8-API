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
    productForId: async(req,res) => {
        let product = await db.Product.findByPk(req.params.id)
                        .catch(err => console.log(err));
            res.json(product)
    },
    createProduct: async (req, res) => {
        db.Product.create({
            name: req.body.name,
            description: req.body.description,
            price: parseFloat(req.body.price),
            image: req.body.image,
            category_id: req.body.category,
            color_id: req.body.color
        })
        .then(confirm => {
            let respuesta;
            if (confirm) {
                respuesta = {
                    meta: {
                        status: 200,
                        total: confirm,
                        url: '/api/admin/createProduct/:id'
                    },
                    data: confirm
                }
            } else {
                respuesta = {
                    meta: {
                        status: 204,
                        total: confirm.length,
                        url: '/api/admin/createProduct/:id'
                    },
                    data: confirm
                }
            }
            res.json(respuesta);
        })
        .catch(error => res.send(error))
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
                image: req.body.image,
                category_id: req.body.category,
                color_id: req.body.color
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
    },
    products: async (req, res) => {
        let product = await db.Product.findAll()

        res.status(200).json({
            count: product.length,
            products: product.map(product => ({
                id: product.id_product,
                name: product.name,
                description: product.description,
            })),
            status: 200
        });
    },

    getProduct: async (req, res) => {
        let idProduct = req.params.id;
        let product = await db.Product.findByPk(idProduct, {
            include: [
                {
                    model: db.Category,
                    as: 'category'
                },
                {
                    model: db.Color,
                    as: 'color'
                }
            ]
        });

        if (!product) {
            return res.status(404).send({
                meta: {
                    status: 404,
                    message: 'Producto no encontrado'
                }
            });
        }

        let productResponse = {
            id_product: product.id_product,
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.image,
            category: product.category,
            color: product.color
        };

        res.status(200).send({
            meta: {
                status: 200,
                url: '/api/admin/product/:id'
            },
            data: productResponse
        });
    }
}

module.exports = api