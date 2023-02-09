import bcrypt from "bcrypt";
import UserModel from "../models/User.js";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: "Логін або пароль невірні",
      });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_CODE, {
      expiresIn: "30d",
    });

    if (!isValidPass) {
      return res.status(404).json({
        message: "Логін або пароль невірні",
      });
    }

    res.json({ token });
  } catch (e) {
    console.warn(e);
    return res.status(500).json({ message: "Відсутній доступ" });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await UserModel.findOne(req.userId);

    if (!user) {
      return res.status(404).json({ message: "Відсутній доступ" });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData });
  } catch (e) {
    console.warn(e);
    return res.status(500).json({ message: "Відсутній доступ" });
  }
};

export {
  login,
  getMe
}