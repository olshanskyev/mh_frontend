import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceService } from './DeviceService';
import { RoomService } from './RoomService';

const SERVICES = [
  DeviceService,
  RoomService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class ServiceDataModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: ServiceDataModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
