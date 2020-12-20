import { Component, Input, OnInit } from '@angular/core';
import { DeviceService } from '../../../../@core/service/DeviceService';
import { interval } from 'rxjs';
import { NbDialogService } from '@nebular/theme';
import { SettingsWindowComponent } from './settings-window/settings-window.component';

@Component({
  selector: 'ngx-on-off-card',
  styleUrls: ['./on-off-card.component.scss'],
  templateUrl: './on-off-card.component.html',
})

export class OnOffCardComponent implements OnInit {

  @Input() on = false;
  @Input() card: OnOffCard;

  constructor(private deviceService: DeviceService, private dialogService: NbDialogService) {

  }

  ngOnInit() {
    this.getStatus(); // first time
    interval(3000).subscribe(val => { // run every 3 second
        this.getStatus();
     });
  }

  getStatus() {
    if (this.card.device != null && this.card.device !== '') {
      this.deviceService.getParameterValue(this.card.device, this.card.parameter)
      .subscribe((paramValue) => {
        this.on = (paramValue.toUpperCase() === 'ON') ? true : false;
      },
      error => {
        this.on = false;
      });
    }
  }

  click() {
    if (this.card.device != null && this.card.device !== '') {
      this.deviceService.executeCommand(this.card.device,
        {command: this.card.command, data: null})
      .subscribe((reply) => {
        this.on = !this.on;
      });
    }
  }

  openSettingsMenu() {
    this.dialogService.open(SettingsWindowComponent, {
      context: {
        card: this.card,
      },
    })
    .onClose.subscribe(card => {
        /*if (card != null){
          this.deviceService.updateQuickCard(card).subscribe(returnedCard => {
            this.cardSettings = returnedCard; //seems to be not neccessary
          })


        }*/
    });
  }
}
