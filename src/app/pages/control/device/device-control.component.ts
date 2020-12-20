import {Component, OnInit} from '@angular/core';
import { NbThemeService, NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { DeviceService } from '../../../@core/service/DeviceService';
import { interval } from 'rxjs';
import { LinksRenderComponent } from './links-render.component';
import { Toaster } from '../../Toaster';

@Component({
  selector: 'ngx-device-control',
  styleUrls: ['./device-control.component.scss'],
  templateUrl: './device-control.component.html',
})
export class DeviceControlComponent implements OnInit {

  sourceOnlineDevices: LocalDataSource = new LocalDataSource();
  sourceUsedDevices: LocalDataSource = new LocalDataSource();
  toaster: Toaster;

  settingsOnlineDevices = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      name: {
        title: 'Device name',
        type: 'string',
        editable: false,
      },
      type: {
        title: 'Device Type',
        type: 'string',
        editable: false,
      },
      ip: {
        title: 'ip',
        type: 'string',
        editable: false,
      },
      used: {
        title: 'used',
        type: 'custom',
        renderComponent: LinksRenderComponent,
        onComponentInitFunction: (instance) => {
          instance.clicked.subscribe((data) => {
              this.saveUsedDevice(data);
            });
        },
        editable: false,
      },
    },
  };

  settingsUsedDevices = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      name: {
        title: 'Device name',
        type: 'string',
        editable: false,
      },
      type: {
        title: 'Device Type',
        type: 'string',
        editable: false,
      },
      ip: {
        title: 'ip',
        type: 'string',
        editable: false,
      },
    },
  };

  saveUsedDevice(device: Device) {
    this.deviceService.saveAsUsedDevice(device).subscribe(savedDevice => {
      // ToDo not tested
      this.sourceUsedDevices.add(savedDevice);
    });
  }
  constructor(private themeService: NbThemeService, private deviceService: DeviceService,
     toastrService: NbToastrService) {
    this.themeService.getJsTheme()
      .subscribe(theme => {
    }, err => {
        this.toaster.showToast(this.toaster.types[4], 'Error', `${err.error}. Error code: ${err.status}`);
    });
    this.toaster = new Toaster(toastrService);

  }
  ngOnInit(): void {
    this.getOnlineDevices();  // first time
    interval(3000).subscribe(val => { // run every 3 second
        this.getOnlineDevices();
     });
    this.deviceService.getUsedDevices().subscribe(devices => {
      this.sourceUsedDevices.load(devices);
    });
  }

  private intervalToasterShowed: boolean = false;
  getOnlineDevices() {
    this.deviceService.getOnlineDevices().
    subscribe(devices => {
        this.sourceOnlineDevices.load(devices);
    }, err => {
      if (!this.intervalToasterShowed) // ToDo not tested
        this.toaster.showToast(this.toaster.types[4], 'Error', `${err.error}. Error code: ${err.status}`);
      this.intervalToasterShowed = true;
    });
  }


}
