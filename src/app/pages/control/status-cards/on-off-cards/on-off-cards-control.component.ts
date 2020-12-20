import {Component} from '@angular/core';
import { NbThemeService, NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { DeviceService } from '../../../../@core/service/DeviceService';
import { RoomService } from '../../../../@core/service/RoomService';
import { Toaster } from '../../../Toaster';

@Component({
  selector: 'ngx-on-off-cards-control',
  styleUrls: ['./on-off-cards-control.component.scss'],
  templateUrl: './on-off-cards-control.component.html',
})
export class OnOffCardsControlComponent {

  onOffCardsSettings = {
    actions: {
      add: false,
      edit: false,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      title: {
        title: 'Title',
        type: 'string',
        editable: false,
      },
      iconClass: {
        title: 'icon',
        type: 'string',
        editable: false,
      },
      type: {
        title: 'type',
        type: 'string',
        editable: false,
      },
      device: {
        title: 'Device',
        type: 'string',
        editable: false,
      },
      parameter: {
        title: 'Parameter',
        type: 'string',
        editable: false,
      },
      command: {
        title: 'Command',
        type: 'string',
        editable: false,
      },
    },
  };

  onOffCardsSource: LocalDataSource = new LocalDataSource();
  private allDevices: Device[] = [];

  toaster: Toaster;
  constructor(private themeService: NbThemeService,
    private deviceService: DeviceService,
    private roomService: RoomService, toastrService: NbToastrService) {

      this.toaster = new Toaster(toastrService);
    this.themeService.getJsTheme()
      .subscribe(theme => {
    });

    this.deviceService.getOnOffCards().subscribe(cards => {
      this.onOffCardsSource.load(cards);
    });

    this.deviceService.getUsedDevices().
      subscribe(devices => {
      this.allDevices = devices;
    });

    this.roomService.getAllRooms().
      subscribe(rooms => {
        this.allRooms = rooms;
      });
  }
  allParameters: Parameter[] = [];
  allCommands: Command[] = [];
  allRooms: Room[];

  onDeviceSelected($event) {
    this.selectedDevice = $event;
    const foundDevice = this.allDevices.find(item => item.name === this.selectedDevice);
    this.allParameters = foundDevice.parameters.filter( item => item.type === ParameterType.ON_OFF);
    this.allCommands = foundDevice.commands;
  }

  private selectedIcon: string = null;
  private selectedType: string = null;
  private selectedDevice: string = null;
  private selectedParameter: string = null;
  private selectedCommand: string = null;
  private selectedRoomId: number = null;

  createCard(title: string) {
    const card: OnOffCard = {
      id: null,
      title: title,
      iconClass : this.selectedIcon,
      type: this.selectedType,
      device: this.selectedDevice,
      parameter: this.selectedParameter,
      command: this.selectedCommand,
      roomId: this.selectedRoomId,
    };
    this.deviceService.saveOnOffCard(card).subscribe(cardItem => {
      this.onOffCardsSource.add(cardItem);
      this.onOffCardsSource.refresh();
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Remove card ' + event.data.title + '?')) {
      this.deviceService.removeOnOffCard(event.data.id).subscribe(() => {
        event.confirm.resolve();
        this.toaster.showToast(this.toaster.types[1], 'Info', 'Card removed');
      },
      () => {
        event.confirm.reject();
      });


    }
  }

  typeList: string[] = [
    'primary',
    'success',
    'warning',
    'info',
    'danger',
  ];

  iconList: string[] = [
    'nb-lightbulb',
    'nb-audio',
    'nb-coffee-maker',
    'nb-danger',
    'nb-flame-circled',
    'nb-home',
    'nb-locked',
    'nb-drop',
    'nb-gear',
    'nb-power-circled',
    'nb-power',
    'nb-roller-shades',
    'nb-notifications',
    'nb-volume-high',
    'nb-alert',
    'nb-angle-double-left',
    'nb-angle-double-right',
    'nb-arrow-down',
    'nb-arrow-dropdown',
    'nb-arrow-dropleft',
    'nb-arrow-dropright',
    'nb-arrow-dropup',
    'nb-arrow-left',
    'nb-arrow-retweet',
    'nb-arrow-right',
    'nb-arrow-thin-down',
    'nb-arrow-thin-left',
    'nb-arrow-thin-right',
    'nb-arrow-thin-up',
    'nb-arrow-up',
    'nb-bar-chart',
    'nb-checkmark-circle',
    'nb-checkmark',
    'nb-chevron-down-outline',
    'nb-chevron-down',
    'nb-chevron-left-outline',
    'nb-chevron-left',
    'nb-chevron-right-outline',
    'nb-chevron-right',
    'nb-chevron-up-outline',
    'nb-chevron-up',
    'nb-close-circled',
    'nb-close',
    'nb-cloudy',
    'nb-collapse',
    'nb-compose',
    'nb-drops',
    'nb-e-commerce',
    'nb-edit',
    'nb-email',
    'nb-fold',
    'nb-grid-a-outline',
    'nb-grid-a',
    'nb-grid-b-outline',
    'nb-grid-b',
    'nb-heart',
    'nb-help',
    'nb-keypad',
    'nb-layout-centre',
    'nb-layout-default',
    'nb-layout-one-column',
    'nb-layout-sidebar-left',
    'nb-layout-sidebar-right',
    'nb-layout-two-column',
    'nb-list',
    'nb-location',
    'nb-loop-circled',
    'nb-loop',
    'nb-maximize',
    'nb-menu',
    'nb-minimize',
    'nb-paper-plane',
    'nb-partlysunny',
    'nb-pause-outline',
    'nb-pause',
    'nb-person',
    'nb-phone',
    'nb-play-outline',
    'nb-play',
    'nb-plus-circled',
    'nb-plus',
    'nb-rainy',
    'nb-search',
    'nb-shuffle',
    'nb-skip-backward-outline',
    'nb-skip-backward',
    'nb-skip-forward-outline',
    'nb-skip-forward',
    'nb-snowy-circled',
    'nb-square-outline',
    'nb-square',
    'nb-star',
    'nb-sunny-circled',
    'nb-sunny',
    'nb-tables',
    'nb-title',
    'nb-trash',
    'nb-volume-mute',
  ];
}
