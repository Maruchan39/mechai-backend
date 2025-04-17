import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import connectDatabase from "../config/mongodb.config";
import User from "../models/UserModel";

const client = new OAuth2Client();
connectDatabase();

export const auth = async (
  req: Request<{}, {}, { credential: string; clientId: string }>,
  res: Response
) => {
  // Double check regarding body
  const { credential, clientId } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: clientId,
    });
    const payload = ticket.getPayload();

    if (!payload) {
      console.error("Could not get payload");
      return;
    }

    const { email, given_name, family_name } = payload;

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        email,
        name: `${given_name} ${family_name}`,
        authSource: "google",
      });
    }

    res.status(200).json(payload);
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing authentication." });
  }
};
