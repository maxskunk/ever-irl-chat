export class Settings {
    constructor(newEndpoint: string) {
        this.endpointUrl = newEndpoint;
    }
    public endpointUrl: string;
    public serverPass: string;
    public keepAwake: boolean = true;
}