import JwtDecode from "jwt-decode";
import AuthToken from "./authToken";

export const getLoggedUserInfo = () => {
  const token = AuthToken.getToken();
  if (!token) {
    return window.location.assign("/login");
  }
  const user = JwtDecode(token);
  return user;
};
