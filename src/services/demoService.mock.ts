import { injectable } from "inversify";
import DemoService from "./demoService.interface";

@injectable()
export default class DemoServiceMock implements DemoService {
    isDemo = true;
}
