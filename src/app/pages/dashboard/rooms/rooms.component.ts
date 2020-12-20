import { Component, HostBinding, OnDestroy, EventEmitter, Output, ViewChild } from '@angular/core';
import { NbThemeService, NbMediaBreakpoint, NbMediaBreakpointsService } from '@nebular/theme';
import { map } from 'rxjs/operators';
import { RoomSelectorComponent } from './room-selector/room-selector.component';

@Component({
  selector: 'ngx-rooms',
  styleUrls: ['./rooms.component.scss'],
  template: `
    <nb-card [size]="breakpoint.width >= breakpoints.sm ? 'giant' : ''">
      <nb-icon icon="arrow-ios-downward" pack="eva"
               (click)="collapse()"
               class="collapse"
               [hidden]="isCollapsed()">
      </nb-icon>
      <ngx-room-selector [class.dark-background]="isDarkTheme" (select)="select($event)" #selector></ngx-room-selector>
      <ngx-player [collapsed]="isCollapsed() && breakpoint.width <= breakpoints.md"></ngx-player>
    </nb-card>
  `,
})
export class RoomsComponent implements OnDestroy {

  @HostBinding('class.expanded')
  private expanded: boolean;
  private selected: number;

  @Output() selectedRoom: EventEmitter<number> = new EventEmitter();

  @ViewChild('selector', {static: false}) roomSelector: RoomSelectorComponent;

  isDarkTheme: boolean;

  breakpoint: NbMediaBreakpoint;
  breakpoints: any;
  themeSubscription: any;
  themeChangeSubscription: any;

  constructor(private themeService: NbThemeService,
              private breakpointService: NbMediaBreakpointsService) {

    this.breakpoints = this.breakpointService.getBreakpointsMap();
    this.themeSubscription = this.themeService.onMediaQueryChange()
      .subscribe(([, newValue]) => {
        this.breakpoint = newValue;
      });

    this.themeChangeSubscription = this.themeService.onThemeChange()
      .pipe(map(({ name }) => name === 'cosmic' || name === 'dark'))
      .subscribe((isDark: boolean) => this.isDarkTheme = isDark);
  }

  select(roomNumber) {
    if (this.isSelected(roomNumber)) {
      this.expand();
    } else {
      this.collapse();
    }

    this.selected = roomNumber;
    this.selectedRoom.emit(roomNumber);

  }

  setSelectedRoom(roomNumber) {
    if (this.isSelected(roomNumber)) {
      this.expand();
    } else {
      this.collapse();
    }
    // call roomSelector
    this.selected = roomNumber;
    this.roomSelector.setFromOuterSelectedRoom(roomNumber);
  }

  expand() {
    this.expanded = true;
  }

  collapse() {
    this.expanded = false;
  }

  isCollapsed() {
    return !this.expanded;
  }

  private isSelected(roomNumber): boolean {
    return this.selected === roomNumber;
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
    this.themeChangeSubscription.unsubscribe();
  }
}
