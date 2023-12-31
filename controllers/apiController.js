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

    usersId: async (req, res) => {
        let usersId = await db.User.findAll()

        res.status(200).json({
            count: usersId.length,
            users: usersId.map(usersId => ({
                id: usersId.id_user,
                name: usersId.name,
                email: usersId.email,
                phone: usersId.phone,
                image: "http://localhost:3030/image/" + usersId.image
            })),
            status: 200
        })
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
    productForId: async (req, res) => {
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
        try {
            let product = await db.Product.findAll({
                include: [
                    { model: db.Category, as: 'category' },
                    { model: db.Color, as: 'color' }
                ]
            });

            let countByCategory = {};
            product.forEach(p => {
                if (!countByCategory[p.category.name]) {
                    countByCategory[p.category.name] = 0;
                }
                countByCategory[p.category.name]++;
            });

            res.status(200).json({
                count: product.length,
                countByCategory: countByCategory,
                products: product.map(product => ({
                    id: product.id_product,
                    name: product.name,
                    description: product.description,
                    category: product.category.name,
                    color: product.color.name,
                    detail: 'URL para obtener el detalle del producto',
                })),
                status: 200
            });
        } catch (error) {
            res.status(500).json({
                error: 'Ha ocurrido un error',
                status: 500
            });
        }
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
                url: '/api/products/:id'
            },
            data: productResponse
        });
    },
    getSolds: async (req, res) => {
        try {
            let solds = await db.Sold.findAll({
                include: [
                    { model: db.Product, as: 'product' },
                    { model: db.User, as: 'user' }
                ]
            });
            res.status(200).send({
                meta: {
                    status: 200,
                    url: '/api/solds'
                },
                data: solds
            });

        } catch (error) {
            res.status(500).json({ error: "Error al buscar datos" });
        }
    },
}

module.exports = api