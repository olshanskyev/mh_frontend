import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DeviceService } from '../../../../@core/service/DeviceService';
import { Toaster } from '../../../Toaster';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-display-value-card',
  styleUrls: ['./display-value-card.component.scss'],
  templateUrl: './display-value-card.component.html',
})

export class DisplayValueCardComponent implements OnInit, OnDestroy {

  @Input() card: DisplayValueCard;
  value: string = 'NO_DATA';
  on: boolean = false;

  private toaster: Toaster;

  constructor(private deviceService: DeviceService, private toastrService: NbToastrService) {
    this.toaster = new Toaster(toastrService);
  }

  getStatusTimer: NodeJS.Timer;

  ngOnDestroy(): void {
    clearInterval(this.getStatusTimer);
  }
  ngOnInit() {
    this.getStatus(); // first time
    this.getStatusTimer = setInterval(() => this.getStatus(), 10000);
  }

  private errorShowed: boolean = false;

  getStatus() {
    if (this.card.device != null && this.card.device !== '') {
      this.deviceService.getParameterValue(this.card.device, this.card.parameter)
      .subscribe((paramValue) => {
        this.value = paramValue;
        this.on = true;
        this.errorShowed = false;
      },
      err => {
        if (!this.errorShowed) {
          this.toaster.showToast(this.toaster.types[4], 'Error', `${err.error}. Error code: ${err.status}`);
          this.errorShowed = true;
        }
        this.on = false;
      });
    }
  }
}
