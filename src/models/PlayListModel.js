import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    videos:[{type: mongoose.Schema.Types.ObjectId, 
        ref:"Video"}]
},{ timestamps: true })

export default mongoose.model("playlist",playlistSchema)