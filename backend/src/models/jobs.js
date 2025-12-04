import mongoose  from "mongoose";


const Jobs_Schema  = new mongoose.Schema({
    queueId : { 
        type: mongoose.Schema.Types.ObjectId, 
        ref:'Queue', 
        required: true 
    },

    name: { 
        type: String, 
        required: true 
    },

    payload: { 
        type: Object, 
        default: {} 
    },

    status: {
        type: String,
        enum: ["waiting", "delayed", "in-progress", "completed", "failed"],
        default: "waiting"
    },

    // Priority (1 = highest)
    priority: { 
        type: Number, 
        default: 5 
    },

    // Delay in milliseconds
    delay: { 
        type: Number, 
        default: 0 
    },

    // Retry logic
    attempts: { 
        type: Number, 
        default: 0 
    },

    attemptsLimit: { 
        type: Number, 
        default: 3 
    },

    // In case of failure
    failedReason: { 
        type: String 
    },

    // Worker progress tracking (0-100)
    progress: { 
        type: Number, 
        default: 0 
    }
}, { timestamps: true });



const Jobs_model = mongoose.model("Jobs" , Jobs_Schema);


export default Jobs_model;