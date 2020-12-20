import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ControlComponent } from './control.component';
import { DeviceControlComponent } from './device/device-control.component';
import { StatusCardsControlComponent } from './status-cards/status-cards-control.component';


const routes: Routes = [{
  path: '',
  component: ControlComponent,
  children: [
    {
      path: 'devices',
      component: DeviceControlComponent,
    },
    {
      path: 'statusCards',
      component: StatusCardsControlComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ControlRoutingModule {
}
