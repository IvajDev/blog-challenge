import "dotenv/config";
import mongoose from "mongoose";

//Entrance model
const postSchema = {
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    }
};

const Entrance = mongoose.model("Entrance", postSchema);

export default Entrance;