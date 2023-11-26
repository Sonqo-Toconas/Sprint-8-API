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
    }
}

module.exports = api