import db from "../models/Association.js";
import argon2 from "argon2";

export const Login = async (req, res) => {
  const user = await db.models.Users.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  if (req.body.password != user.password)
    return res.status(400).json({ msg: "Wrong Password" });
  // const match = await argon2.verify(user.password, req.body.password);
  // if (!match) return res.status(400).json({ msg: "Wrong Password" });
  req.session.userId = user.uuid;
  const user_id = user.user_id; 
  const uuid = user.uuid;
  const name = user.name;
  const email = user.email;
  const role = user.role;
  const image_url = user.image_url;
  console.log("ini berhasil: " + req.session.userId);
  res.status(200).json({ uuid, user_id, name, email, role, image_url});
};

export const Me = async (req, res) => {
  console.log("coba: " + req.session.userId);
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
  }
  const user = await db.models.Users.findOne({
    attributes: ["uuid", "user_id", "name", "email", "role", "image_url"],
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  res.status(200).json(user);
};

export const logOut = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "Tidak dapat logout" });
    res.status(200).json({ msg: "Anda telah logout" });
  });
};
