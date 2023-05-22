import registerController from "./userRegister";
import loginController from "./userLogin";
import logoutController from "./userLogout";
import verifyEmailController from "./verifyEmail";
import resendVerifyEmailController from "./resendVerifyEmail";
import forgotPasswordEmailController from "./forgotPasswordEmail";
import resetPasswordController from "./resetPassword";
import refreshTokenController from "./refreshToken";

export {
  registerController as register,
  verifyEmailController as verifyEmail,
  loginController as login,
  logoutController as logout,
  resendVerifyEmailController as resendVerifyEmail,
  forgotPasswordEmailController as forgotPasswordEmail,
  resetPasswordController as resetPassword,
  refreshTokenController as refreshToken,
};
