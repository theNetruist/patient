import { Container } from 'inversify';
import AuthServiceMock from './services/authService.mock';
import AuthService from './services/authService.interface';
import DemoService from './services/demoService.interface';
import DemoServiceMock from './services/demoService.mock';
import DemoServiceImplementation from './services/demoService.implementation';
import webSettings from './websettings.json';
import ZipDataService from './services/zipDataService';
import UserDataService from './services/userDataService.interface';
import UserDataServiceMock from './services/userDataService.mock';

enum Types {
    AuthService = 'AuthService',
    DemoService = 'DemoService',
    UserDataService = 'UserDataService',
}

export default class DIContainer {
    private _container: Container;

    constructor() {
        this._container = new Container();
        this.registerServices();

        //Use mock services for Demos
        if (webSettings.demo.isDemo) {
            this.registerMockServices();
        }
    }

    public get container() {
        return this._container;
    }

    public static get types() {
        return Types;
    }

    private registerServices = () => {
        this._container.bind<DemoService>(Types.DemoService).to(DemoServiceImplementation).inTransientScope();

        //Demo Only:
        this._container.bind<AuthService>(Types.AuthService).to(AuthServiceMock).inSingletonScope();
        this._container.bind<UserDataService>(Types.UserDataService).to(UserDataServiceMock).inSingletonScope();
        this._container.bind(ZipDataService).toSelf().inSingletonScope();
        this._container.get(ZipDataService);
    };

    private registerMockServices = () => {
        this._container.rebind<DemoService>(Types.DemoService).to(DemoServiceMock).inTransientScope();
    };
}
