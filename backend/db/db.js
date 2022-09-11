import mongoose from "mongoose";

const url =
  "mongodb+srv://Cluster74625:fVNSZ1lEbEdW@cluster74625.f2vnm3n.mongodb.net/myFirstDataBase?retryWrites=true&w=majority";

const init = async () => {
  try {
    await mongoose.connect(url);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

export default init;
