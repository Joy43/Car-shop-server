// models/Contract.ts or Contract.model.ts
import { Schema, model, models } from "mongoose";
import { IContract } from "./contract.interface";


const contractSchema = new Schema<IContract>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  description: { type: String, required: true },
 
}, { timestamps: true });

const Contract = models.Contract || model<IContract>("Contract", contractSchema);
export default Contract;
