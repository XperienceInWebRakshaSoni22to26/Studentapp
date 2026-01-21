import mongoose from "mongoose";

const marksSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    subjects: [{
        name: {
            type: String,
            required: true
        },
        marks: {
            type: Number,
            required: true
        }
    }]
});

const Marks = mongoose.model("marks", marksSchema);
export default Marks;