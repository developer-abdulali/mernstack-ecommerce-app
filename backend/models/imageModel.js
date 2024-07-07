// // models/ImageModel.js

// import mongoose from "mongoose";

// const imageSchema = new mongoose.Schema({
//   data: { type: Buffer, required: true }, // store image binary data
//   contentType: { type: String, required: true }, // store MIME type
// });

// const ImageModel = mongoose.model("Image", imageSchema);

// export default ImageModel;

// models/ImageModel.js

import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  data: { type: Buffer, required: true }, // store image binary data
  contentType: { type: String, required: true }, // store MIME type
});

const ImageModel = mongoose.model("Image", imageSchema);

export default ImageModel;
