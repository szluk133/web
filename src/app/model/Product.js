import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    images: [{ type: String }],
    categoryId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Category',
      required: true 
    },
    brand: { type: String },
    inStock: { type: Boolean, default: true },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    features: [{ type: String }],
    specifications: { type: Map, of: String }
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);