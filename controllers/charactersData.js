import mongoose from "mongoose";
import CharacterData from "../models/characterData.js";

export const getCharacters = async (req, res) => {
  try {
    const characterData = await CharacterData.find();
    res.status(200).json(characterData);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createCharacter = async (req, res) => {
  // const character = req.body

  const character = req.body;
  const newCharacter = new CharacterData(character);
  try {
    await newCharacter.save();
    res.status(201).json(newCharacter);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateCharacter = async (req, res) => {
  // const character = req.body

  const { id: _id } = req.params; // We can rename the id while array desctructuring
  const character = req.body;

  try {
    // Checking if character with that id exists
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).json({ message: `No character with id ${_id} ` });
    const updatedCharacter = await CharacterData.findByIdAndUpdate(
      _id,
      character,
      { new: true }
    ); // To receive the updated version of the character
    res.status(201).json(updatedCharacter);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
