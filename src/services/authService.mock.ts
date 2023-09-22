import { injectable } from 'inversify';
import AuthModel from '../models/authModel';
import AuthResponseModel from '../models/authResponseModel';
import AuthService from './authService.interface';
import webSettings from '../websettings.json';

@injectable()
export default class AuthServiceMock implements AuthService {
    private _isLoggedIn: boolean = false; //Set this to false to test Auth

    logIn = (authModel: AuthModel): AuthResponseModel => {
        let authed =
            authModel.username === webSettings.demo.username && authModel.password === webSettings.demo.password;
        this._isLoggedIn = authed;
        return { success: authed };
    };

    logOut = () => {
        this._isLoggedIn = false;
    };

    public get isLoggedIn() {
        return this._isLoggedIn;
    }
}
