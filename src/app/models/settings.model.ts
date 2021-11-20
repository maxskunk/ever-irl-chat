export class Settings {
    constructor(newEndpoint: string) {
        this.endpointUrl = newEndpoint;
    }
    public endpointUrl: string;
    public allowSleep: boolean = true;
}