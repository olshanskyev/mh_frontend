import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { DeviceService } from '../../../../../@core/service/DeviceService';

@Component({
  selector: 'ngx-settings-window',
  templateUrl: 'settings-window.component.html',
  styleUrls: ['settings-window.component.scss'],
})
export class SettingsWindowComponent {

    @Input() card: OnOffCard;

    allDevices: Array<any> = [];
    allInputs: Array<any> = [];

    selectedDevice: string = null;
    selectedInput: string = null;

    loadAllDevices() {
        /*this.deviceService.getAllDevices().subscribe(devices => {
        this.allDevices = devices;
        })*/
    }

    constructor(protected ref: NbDialogRef<SettingsWindowComponent>, deviceService: DeviceService) {
        this.loadAllDevices();

    }

    cancel() {
        this.ref.close();
    }

    submit(title) {

        const card: OnOffCard = this.card;
        if (title != null && title !== '') {
            card.title = title;
        }
        if (this.selectedDevice != null && this.selectedInput != null) {
            card.device = this.selectedDevice;
            card.parameter = this.selectedInput;
        }
        this.ref.close(card);
    }


    onDeviceSelected(deviceName) {
        this.selectedDevice = deviceName;
        /*this.deviceService.getListOfParameters(this.selectedDevice, DeviceParameterType.ON_OFF).subscribe(inputs => {
            console.log(inputs);
            this.allInputs = inputs;
        })*/
    }

    onInputSelected(input) {
        this.selectedInput = input;
    }
}
