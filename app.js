require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const { sequelize } = require("./models/index");
const { authRouter } = require("./router/auth");

const app = express();
const port = process.env.PORT || 8000;
const host = process.env.HOST;
const { errorMiddleware } = require("./middleware/errorMiddleware");
const { profileRouter } = require("./router/profile");
const { authMiddleware } = require("./middleware/authMiddleware");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
const { otpRouter } = require("./router/otp");
const { userRouter } = require("./router/user");
const { verifyMeRouter } = require("./router/verifyMe");

app.set("trust proxy", 1);
app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(express.static("uploads"));
app.get("/", (req, res) => {
    return res.status(StatusCodes.OK).json({
        success: true,
        data: ReasonPhrases.OK,
    });
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/profile", authMiddleware, profileRouter);
app.use("/api/v1/otp", authMiddleware, otpRouter);
app.use("/api/v1/user", authMiddleware, userRouter);
app.use("/api/v1/verify", authMiddleware, verifyMeRouter);

app.use(errorMiddleware);

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log(
            "⚡️[database]: Database connection has been established successfully."
        );

        app.listen(port, host, () => {
            console.log(
                `⚡️[server]: Server is listening on http://${host}:${port}`
            );
        });
    } catch (error) {
        console.error(
            "😥 [database]: Unable to connect to the database:",
            error
        );
    }
};

startServer();
