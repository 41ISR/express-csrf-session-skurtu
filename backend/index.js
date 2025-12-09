const cookieParser = require("cookie-parser")
const db = require("./db")
const express = require("express")
const cors = require("cors")
const bcrypt = require("bcrypt")
const session = require("express-session")

const app = express()

app.set("trust proxy", 1) // Только для codespace

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: true, // Только для codespace
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["set-cookie"]
}))

app.use(session({
    secret: "dpskdosk",
    name: "sessionId",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        //sameSite: "strict",
        sameSite: "none", // Только для codespace
        secure: true, // fals if localhost\
        domain: undefined //Только для codespace
    }
}))

app.get("/auth/me", (req, res) => {
    console.log(req.session)
    if (req.session.userId) {
        return res.json({ loggedIn: true, user: {
            userId: req.session.userId,
            email: req.session.email
    }})
    }

    return res.status(401).json({logged: true})

})
app.post("/auth/signup", (req, res) => {
    try {
        const hashed = bcrypt.hashSync(req.body.password, 10)
        const newUser = db.prepare(`INSERT INTO users (email, password) VALUES (?,?)`).run(req.body.email, hashed);
       
        const createdUser = db.prepare(`SELECT * FROM users WHERE ID = ? `).get(newUser.lastInsertRowid);

        req.session.userId = createdUser.id
        req.session.email = createdUser.email
        res.status(201).json(createdUser)
    } catch (error) {
        console.error(error)
        res.json(error)
    }
}
)


app.post("/auth/signin", (req, res) => {
    const {email, password} = req.body

    const user = db
    .prepare (`SELECT * FROM users WHERE email = ?`)
    .get(email)

    if (!user) res
    .status(401)
    .json({error: "Неправильные данные1"})

    const validPassword = bcrypt.compareSync(password, user.password)

    if (!validPassword) {
        res
        .status(401)
        .json({error:"Неправильные данные2"})
    }
    req.session.email = user.email
    req.session.userId = user.id
    res.status(200).json(user)
}
)
app.listen("3000", () => {
    console.log("Порт3000")
})

