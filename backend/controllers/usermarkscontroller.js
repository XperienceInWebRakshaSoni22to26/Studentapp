import Marks from "../models/usermarksschema.js";

// Add Marks
export const addMarks = async(req, res) => {
    try {
        const userId = req.body.userId; // admin sends target student id
        const { subjects } = req.body;

        if (!subjects || subjects.length === 0) {
            return res.status(400).json({ message: "subjects required" });
        }

        const newSubject = subjects[0];

        let existingMarks = await Marks.findOne({ userId });

        if (existingMarks) {
            existingMarks.subjects.push(newSubject);
            await existingMarks.save();
            return res.status(200).json({
                message: "Subject added successfully",
                data: existingMarks
            });
        }

        const newMarks = await Marks.create({
            userId,
            subjects: [newSubject]
        });

        return res.status(200).json({
            message: "Marks created successfully",
            data: newMarks
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};




// Get Marks by User ID
export const getUserMarks = async(req, res) => {
    try {
        const userId = req.user.id;

        const marks = await Marks.findOne({ userId }).populate("userId");

        if (!marks) {
            return res.status(404).json({ message: "No marks found for this user" });
        }

        return res.status(200).json({
            message: "Marks fetched successfully",
            data: marks
        });

    } catch (error) {
        console.log("Error in getUserMarks controller:", error);
        return res.status(500).json({ message: error.message });
    }
};
// Update Marks
export const updateMarks = async(req, res) => {
    try {
        const userId = req.body.userId; // student ID from admin
        const { subjects } = req.body;

        if (!subjects) {
            return res.status(400).json({ message: "subjects required" });
        }

        const updatedMarks = await Marks.findOneAndUpdate({ userId }, { subjects }, { new: true });

        if (!updatedMarks) {
            return res.status(404).json({ message: "No marks found for this user" });
        }

        return res.status(200).json({
            message: "Marks updated successfully",
            data: updatedMarks
        });

    } catch (error) {
        console.log("Error in updateMarks controller:", error);
        return res.status(500).json({ message: error.message });
    }
};

// Delete Marks
export const deleteMarks = async(req, res) => {
    try {
        const userId = req.params.id;

        const deleted = await Marks.findOneAndDelete({ userId });

        if (!deleted) {
            return res.status(404).json({ message: "No marks found to delete" });
        }

        return res.status(200).json({
            message: "Marks deleted successfully"
        });

    } catch (error) {
        console.log("Error in deleteMarks controller:", error);
        return res.status(500).json({ message: error.message });
    }
};
export const getMarksByUserId = async(req, res) => {
    try {
        const userId = req.params.id;

        const marks = await MarksModel.findOne({ userId });

        if (!marks) {
            return res.status(404).json({ message: "Marks not found" });
        }

        res.json({ success: true, marks });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};