import { Router } from "express";
import { UserModel } from "../models/user";
import { signinSchema, signupSchema, updateUserSchema } from "../types";
import { signJwt } from "../config/jwt";
import { authMiddleware } from "../middleware";
import { AccountModel } from "../models/account";
import { comparePassword, hashPassword } from "../config/password";

const router = Router();

router.post("/signup", async (req, res) => {
  const { success, data } = signupSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({
      success: false,
      error: "Invalid inputs",
    });
  }

  try {
    const user = await UserModel.findOne({
      username: data.username,
    });
    if (user) {
      return res.status(400).json({
        success: false,
        error: "username already exists",
      });
    }

    //TODO: hash password
    const hashedPassword = await hashPassword(data.password)

    const userDb = await UserModel.create({
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      password: hashedPassword,
    });

    await AccountModel.create({
      userId: userDb._id,
      balance: Math.floor(Math.random() * 10000) + 1,
    });

    const token = signJwt({
      userId: userDb._id.toString(),
    });

    res.status(200).json({
      success: true,
      token,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      error: "Error creating user",
    });
  }
});

router.post("/signin", async (req, res) => {
  const { success, data } = signinSchema.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      success: false,
      error: "Invalid schema request",
    });
  }
  try {
    const user = await UserModel.findOne({
      username: data.username,
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const isValid = comparePassword(data.password, user?.password)

    if (!isValid) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const token = signJwt({ userId: user._id.toString() });

    res.status(200).json({
      success: true,
      token,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      error: "Error signing in",
    });
  }
});

router.put("/", authMiddleware, async (req, res) => {
  const parsed = updateUserSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid input" });
  }

  try {
    await UserModel.updateOne({ _id: req.userId }, parsed.data);

    res.json({
      success: true,
      message: "Updated successfully",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      error: "Error updating user",
    });
  }
});

router.get("/bulk", async (req, res) => {
  const filter = (req.query.filter as string) || "";
  try {
    const users = await UserModel.find({
      $or: [
        { firstName: { $regex: filter, $options: "i" } },
        { lastName: { $regex: filter, $options: "i" } },
        { username: { $regex: filter, $options: "i" } },
      ],
    }).select("_id username firstName lastName");

    return res.json({
      success: true,
      users,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      error: "Error fetching user",
    });
  }
});

export default router;