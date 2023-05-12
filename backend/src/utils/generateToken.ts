import crypto from "crypto";

const generateToken = async () => {
  const token = await crypto.randomBytes(30).toString("hex");
  console.log(token);
  return token;
};

export default generateToken;
