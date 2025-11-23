import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session'
import userRouter from "./routes/userRoutes.js"
import adminRouter from "./routes/adminRoutes.js"


import "./config/databaseConnect.js";

const app = express();
const port = 3000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    next();
});

app.use(
    session({
        secret: "kedsgbdkekeke",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60,
            httpOnly: true,         
            secure: false           
        }
    })
);


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(userRouter)
app.use('/admin',adminRouter)

// --- Start the Server ---
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});