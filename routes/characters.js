import express from "express";
import {
  getCharacters,
  createCharacter,
  updateCharacter,
} from "../controllers/charactersData.js";
import auth from "../middleware/auth.js"; // Will use the auth middleware for create and update operations

const router = express.Router();

// get characters data
router.get("/", getCharacters);

// post new characters data
router.post("/create", auth, createCharacter);

// update character data
router.patch("/update/:id", auth, updateCharacter); // For updating we need to know the id of the existing character

export default router;
