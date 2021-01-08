import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DeviceService } from '../../../../@core/service/DeviceService';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { SettingsWindowComponent } from './settings-window/settings-window.component';
import { Toaster } from '../../../Toaster';

@Component({
  selector: 'ngx-on-off-card',
  styleUrls: ['./on-off-card.component.scss'],
  templateUrl: './on-off-card.component.html',
})

export class OnOffCardComponent implements OnInit, OnDestroy {

  @Input() on = false;
  @Input() card: OnOffCard;


  private toaster: Toaster;

  constructor(private deviceService: DeviceService, private dialogService: NbDialogService, private toastrService: NbToastrService) {
    this.toaster = new Toaster(toastrService);
  }

  getStatusTimer: NodeJS.Timer;

  ngOnDestroy(): void {
    clearInterval(this.getStatusTimer);
  }
  ngOnInit() {
    this.getStatus(); // first time
    this.getStatusTimer = setInterval(() => this.getStatus(), 5000);
  }

  private errorShowed: boolean = false;

  getStatus() {
    if (this.card.device != null && this.card.device !== '') {
      this.deviceService.getParameterValue(this.card.device, this.card.parameter)
      .subscribe((paramValue) => {
        this.on = (paramValue.toUpperCase() === 'ON') ? true : false;
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
