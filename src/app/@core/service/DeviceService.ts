import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { DeviceServiceInterface } from '../data/DeviceServiceInterface';
import { AppConfigService } from '../app-config.service';

@Injectable()
export class DeviceService extends DeviceServiceInterface {

  private uri: string;

  constructor(private _http: HttpClient, configService: AppConfigService) {
    super();
    const config = configService.getConfig();
    this.uri = config.BACKEND_URI;
  }

  getOnlineDevices(): Observable<Device[]> {
    const _endpoint = this.uri + '/onlineDevices';
    return this._http.get<Device[]>(_endpoint);
  }


  executeCommand(deviceName: string, command: Command): Observable<CommandReply> {
    const _endpoint = this.uri + '/device/' + deviceName + '/command';
    return this._http.post<CommandReply>(_endpoint, command);
  }

  saveOnOffCard(card: OnOffCard): Observable<OnOffCard> {
    const _endpoint = this.uri + '/onOffCard';
    return this._http.post<OnOffCard>(_endpoint, card);

  }

  getOnOffCardsByRoom(roomId: number): Observable<OnOffCard[]> {
    const _endpoint = this.uri + '/onOffCard/' + roomId;
    return this._http.get<OnOffCard[]>(_endpoint);
  }

  getParameterValue(device: string, parameter: string): Observable<string> {
    const _endpoint = this.uri + '/device/' + device + '/' + parameter;
    return this._http.get(_endpoint, {responseType: 'text'});
  }

  saveAsUsedDevice(device: Device): Observable<Device> {
    const _endpoint = this.uri + '/device/save';
    return this._http.post<Device>(_endpoint, device);
  }

  getUsedDevices(): Observable<Device[]> {
    const _endpoint = this.uri + '/usedDevices';
    return this._http.get<Device[]>(_endpoint);
  }


}
