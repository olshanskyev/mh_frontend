import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import {
  NbButtonModule,
  NbCardModule, NbInputModule, NbListModule, NbRadioModule, NbSelectModule, NbStepperModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { ControlComponent } from './control.component';
import { ControlRoutingModule } from './control-routing.module';
import { DeviceControlComponent } from './device/device-control.component';
import { StatusCardsControlComponent } from './status-cards/status-cards-control.component';
import { FormsModule } from '@angular/forms';
import { LinksRenderComponent } from './device/links-render.component';


@NgModule({
  imports: [
    ThemeModule,
    ControlRoutingModule,
    NbCardModule,
    Ng2SmartTableModule,
    NbStepperModule,
    FormsModule,
    NbButtonModule,
    NbListModule,
    NbRadioModule,
    NbInputModule,
    NbSelectModule,
  ],
  entryComponents: [
    LinksRenderComponent,
  ],
  declarations: [
    ControlComponent,
    DeviceControlComponent,
    StatusCardsControlComponent,
    LinksRenderComponent,
  ],
  providers: [

  ],
})
export class ControlModule { }
