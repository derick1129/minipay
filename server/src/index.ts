import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDb } from "./connect";
import userRoutes from "./routes/user";
import accountRoutes from "./routes/account";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use("/user", userRoutes);
app.use("/account", accountRoutes);

const startDb = async () => {
  await connectDb();

  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
};

startDb();
