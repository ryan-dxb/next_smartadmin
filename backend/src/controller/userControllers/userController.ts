import registerController from "./userRegister";
import loginController from "./userLogin";
import logoutController from "./userLogout";
import verifyEmailController from "./verifyEmail";
import resendVerifyEmailController from "./resendVerifyEmail";

export {
  registerController as register,
  verifyEmailController as verifyEmail,
  loginController as login,
  logoutController as logout,
  resendVerifyEmailController as resendVerifyEmail,
};
