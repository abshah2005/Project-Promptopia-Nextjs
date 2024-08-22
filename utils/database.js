import mongoose from "mongoose";

let isConnected=false;

export const connectToDb=async ()=>{
    mongoose.set('strictQuery', true);

  if(isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    await mongoose.connect("mongodb+srv://abdullah03350904415:abdullahlovesurmom1@cluster0.j07ab.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    isConnected = true;

    console.log('MongoDB connected')
  }
    
    catch (error) {
        console.log(error);
    }
}