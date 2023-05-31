require("dotenv").config();
const request = require("supertest");
// const db = require("../models");
// const baseURL = "http://localhost:8000/api/v1/";
const { app } = require("../app");

process.env.PG_USER = "postgres";
process.env.PG_PASSWORD = "temidayo";
process.env.PG_DB_TEST = "user_management_db_test";
process.env.PG_HOST_TEST = "localhost";
process.env.PG_DIALECT = "postgres";

describe("user sign up", () => {
    it("Should respond with confirmation email sent", async () => {
        const res = await request(app).post("/api/v1/auth/create-user").send({
            firstName: "seun3",
            lastName: "awonugba3",
            email: "seunawonugba+3@gmail.com",
            password: "Chemistry500*",
            repeat_password: "Chemistry500*",
        });

        expect(res.statusCode).toBe(201);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toBe(
            "Confirmation email sent to seunawonugba+3@gmail.com, please proceed to your mail box to confirm your email address"
        );
    });
});
