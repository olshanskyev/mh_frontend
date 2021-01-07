import { Component, Input, OnInit } from '@angular/core';
import { DeviceService } from '../../../../@core/service/DeviceService';
import { interval } from 'rxjs';

@Component({
  selector: 'ngx-display-value-card',
  styleUrls: ['./display-value-card.component.scss'],
  templateUrl: './display-value-card.component.html',
})

export class DisplayValueCardComponent implements OnInit {

  @Input() card: DisplayValueCard;
  value: string = 'NO_DATA';
  on: boolean = false;

  constructor(private deviceService: DeviceService) {

  }

  ngOnInit() {
    this.getStatus(); // first time
    interval(5000).subscribe(val => { // run every 5 second
        this.getStatus();
     });
  }

  getStatus() {
    if (this.card.device != null && this.card.device !== '') {
      this.deviceService.getParameterValue(this.card.device, this.card.parameter)
      .subscribe((paramValue) => {
        this.value = paramValue;
        this.on = true;
      },
      err => {
        this.on = false;
      });
    }
  }
}
