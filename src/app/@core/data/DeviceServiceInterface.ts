import { Observable } from 'rxjs';

export abstract class DeviceServiceInterface {
  abstract executeCommand(deviceName: string, command: Command): Observable<CommandReply>;
  abstract getOnlineDevices(): Observable<Device[]>;
  abstract saveOnOffCard(card: OnOffCard): Observable<OnOffCard>;
  abstract getOnOffCardsByRoom(roomId: number): Observable<OnOffCard[]>;
  abstract getOnOffCards(): Observable<OnOffCard[]>;
  abstract getParameterValue(device: string, parameter: string): Observable<string>;
  abstract saveAsUsedDevice(device: Device): Observable<Device>;
  abstract getUsedDevices(): Observable<Device[]>;
  abstract deleteDevice(deviceName: string): Observable<void>;
  abstract removeOnOffCard(id: number): Observable<void>;
}
