import { Router } from "express";
import { authMiddleware } from "../middleware";
import { AccountModel } from "../models/account";
import { transferSchema } from "../types";
import mongoose from "mongoose";

const router = Router();

router.get("/balance", authMiddleware, async (req, res) => {
  try {
    const account = await AccountModel.findOne({
      userId: req.userId,
    });

    if (!account) {
      return res.status(404).json({
        success: false,
        error: "Account not found",
      });
    }
    return res.json({
      success: true,
      balance: account.balance,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      error: "Error fetching balance",
    });
  }
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const parsed = transferSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      error: "Invalid input",
    });
  }

  const { to, amount } = parsed.data;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    if (to === req.userId) {
        throw new Error("Cannot transfer to yourself");
    }
    const fromAccount = await AccountModel.findOne({
      userId: req.userId,
    }).session(session);

    if (!fromAccount) {
      throw new Error("Sender account not found");
    }

    if (fromAccount.balance < amount) {
        throw new Error("Insufficient balance")
    }

    const toAccount = await AccountModel.findOne({
      userId: to,
    }).session(session);

    if (!toAccount) {
      throw new Error("Receiver account not found");
    }

    await AccountModel.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } },
    ).session(session);

    await AccountModel.updateOne(
      { userId: to },
      { $inc: { balance: amount } },
    ).session(session);

    await session.commitTransaction();

    return res.json({
      success: true,
      message: "Transfer successful",
    });
  } catch (err) {
    await session.abortTransaction();

    return res.status(400).json({
      success: false,
      error: (err as Error).message,
    });
  } finally {
    await session.endSession();
  }
});

export default router;