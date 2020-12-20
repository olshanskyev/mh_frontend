interface Device {
    name: string;
    type: string;
    firmware: string;
    ip: string;
    parameters: Parameter[];
    commands: Command[];
}
