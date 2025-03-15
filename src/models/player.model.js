
import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
    name: String,
    club: String,
    age: Number,
});

export const Player = mongoose.model('Player', playerSchema);
