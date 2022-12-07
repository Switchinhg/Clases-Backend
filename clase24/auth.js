const users = [
    {
        username: "swicho",
        password: "contra",
        role: "user"
    },
    {
        username: "admin",
        password: "123456",
        role: "admin"
    }
]

const Authentication = (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const user = users.find((obj) => obj.username === username && obj.password === password)
    if (user) {
        req.session.user = user.username
        req.session.admin = user.role === "admin"
        res.redirect('/')
    } else {
        const response = {
            error: -1,
            description: `${req.path} no autorizado.`
        }
        res.status(401).json(response)
    }
}

module.exports = {
    Authentication: Authentication
}