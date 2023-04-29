import mongoose from 'mongoose'

const characterSchema = mongoose.Schema({
    name: String,
    title:String,
    slug: String,
    description: String,
    gender:String,
    birthday: String,
    rarity: Number,
    vision: String,
    weapon: String,
    obtain: String,
    imageUrl: String
})

const CharacterData = mongoose.model('CharacterData',characterSchema)

export default CharacterData;