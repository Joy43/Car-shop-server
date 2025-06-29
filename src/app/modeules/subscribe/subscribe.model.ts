import { models, Schema } from "mongoose";
import { ISubscribe } from "./subscribe.interface";
import { model } from "mongoose";

const subscribeSchema = new Schema<ISubscribe>({
 
  email: { type: String, required: true },
 
}, { timestamps: true });

const Subscribe = models.Subscribe || model<ISubscribe>("Subscribe", subscribeSchema);
export default Subscribe;