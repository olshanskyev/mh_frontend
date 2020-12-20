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
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    actions: {
      add: false,
      edit: false,
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
      firmware: {
        title: 'Firmware version',
        type: 'string',
        editable: false,
      },
    },
  };

  saveUsedDevice(device: Device) {

    const devicesPromise: Promise<Device[]> = this.sourceUsedDevices.getAll();
    devicesPromise.then(devices => {
        const foundDevices: Device[] = devices.filter(item => item.name === device.name);
        if (foundDevices != null && foundDevices.length > 0) { // already exists
          this.toaster.showToast(this.toaster.types[3], 'Warning', 'Device ' + device.name + ' already in use');
        } else {
          this.deviceService.saveAsUsedDevice(device).subscribe(savedDevice => {
            this.sourceUsedDevices.add(savedDevice);
            this.sourceUsedDevices.refresh();
          });
        }
    });


  }
  constructor(private themeService: NbThemeService, private deviceService: DeviceService,
     toastrService: NbToastrService) {
    this.themeService.getJsTheme()
      .subscribe(theme => {
    });
    this.toaster = new Toaster(toastrService);

  }
  ngOnInit(): void {
    this.getOnlineDevices();  // first time
    interval(10000).subscribe(val => { // run every 10 second
        this.getOnlineDevices();
     });
    this.deviceService.getUsedDevices().subscribe(devices => {
        this.sourceUsedDevices.load(devices);
    });
  }

  getOnlineDevices() {
    this.deviceService.getOnlineDevices().
    subscribe(devices => {
        this.sourceOnlineDevices.load(devices);
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Remove device ' + event.data.name + ' from used devices?')) {
      this.deviceService.deleteDevice(event.data.name).subscribe(() => {
        event.confirm.resolve();
        this.toaster.showToast(this.toaster.types[1], 'Info', 'Device removed');
      },
      () => {
        event.confirm.reject();
      });


    }
  }


}
