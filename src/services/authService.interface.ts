import AuthModel from "../models/authModel";
import AuthResponseModel from "../models/authResponseModel";

export default interface AuthService {
    logIn(authModel: AuthModel): AuthResponseModel;
    logOut(): void;
    isLoggedIn: boolean;
}
