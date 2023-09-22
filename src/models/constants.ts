class Regex {
    public get zip() {
        return /(^\d{5}$)|(^\d{9}$)|(^\d{5}-\d{4}$)/g;
    }
}

export default class Constants {
    static regex = new Regex();
}
