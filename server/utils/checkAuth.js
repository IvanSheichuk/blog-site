import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_CODE);

      res.userId = decoded._id;

      next();
    } catch (e) {
      return res.status(403).json({ message: "Відсутній доступ" });
    }
  } else {
    return res.status(403).json({ message: "Відсутній доступ" });
  }
};