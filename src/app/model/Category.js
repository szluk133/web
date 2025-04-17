import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    alias: [{ type: String }], // Các từ đồng nghĩa, biệt danh
    description: { type: String },
    parent: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Category',
      default: null
    },
    image: { type: String }
  },
  { timestamps: true }
);

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);