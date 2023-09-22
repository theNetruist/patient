import { injectable } from "inversify";
import DemoService from "./demoService.interface";

@injectable()
export default class DemoServiceImplementation implements DemoService {
    isDemo = false;
}
