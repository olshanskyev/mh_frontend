import { NgModule } from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbInputModule,
  NbCardModule,
  NbTabsetModule,
  NbUserModule,
  NbRadioModule,
  NbDialogModule,
  NbSelectModule,
  NbListModule,
  NbIconModule,
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { OnOffCardComponent } from './status-cards/on-off-card/on-off-card.component';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomSelectorComponent } from './rooms/room-selector/room-selector.component';
import { PlayerComponent } from './rooms/player/player.component';
import { FormsModule } from '@angular/forms';
import { SettingsWindowComponent } from './status-cards/on-off-card/settings-window/settings-window.component';
import { DisplayValueCardComponent } from './status-cards/display-value-card/display-value-card.component';


@NgModule({
  imports: [
    FormsModule,
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbInputModule,
    NbTabsetModule,
    NbActionsModule,
    NbRadioModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
    NbButtonModule,
    NgxEchartsModule,
    NbDialogModule.forChild(),
  ],
  declarations: [
    DashboardComponent,
    OnOffCardComponent,
    DisplayValueCardComponent,
    RoomSelectorComponent,
    RoomsComponent,
    PlayerComponent,
    SettingsWindowComponent,
  ],
  entryComponents: [
    SettingsWindowComponent,
  ],

})
export class DashboardModule { }
