import express from "express";
import {signIn} from "../controllers/auth.js";

const router = express.Router();

// We are using POST request as we would be sending the details of the user
router.post("/signin", signIn);

export default router;
