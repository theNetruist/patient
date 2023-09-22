export interface RouteModel {
    path: string;
    label: string;
    component: JSX.Element;
    icon: JSX.Element;
}

export default class Route implements RouteModel {
    constructor(public path: string, public label: string, public component: JSX.Element, public icon: JSX.Element) {}
}
