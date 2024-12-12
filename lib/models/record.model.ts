import mongoose from "mongoose";
import IRecord from "@/lib/types/IRecord";

const recordSchema = new mongoose.Schema<IRecord>({
    title: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: Date, required: true },
    page: { type: Number, required: true },
    time: { type: Number, required: true },
});

const Record = mongoose.models.Record || mongoose.model("Record", recordSchema);

export default Record;