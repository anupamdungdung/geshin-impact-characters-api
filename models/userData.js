import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
  adminUserName: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
});

const AdminData = mongoose.model("AdminData", adminSchema);

export default AdminData;
