import express from "express";
const app = express()
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();
import { ConnectToMongoDB } from "./utils/database.js";
import userRoutes from "./routes/userRoutes.js";
import receipeRoutes from './routes/receipeRoutes.js'

// Configure CORS to allow requests from your frontend
app.use(
  cors({
    origin: process.env.FRONTEND_URL, 
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

// middlewares //
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(cookieParser());

// mongo connect //
ConnectToMongoDB(process.env.MONGO_URI);

// routes
app.use("/", userRoutes);
app.use("/receipe", receipeRoutes);
;

app.get('/',(req,res)=>{
    res.send("Express Server is Working")
})


// app start
const port = process.env.PORT || 5000; 

try {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
} catch (error : any) {
  console.error("Error starting the server:", error.message);
}