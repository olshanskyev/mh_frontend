import { Component, EventEmitter, HostBinding, OnDestroy, OnInit, Output } from '@angular/core';
import { Location, LocationStrategy } from '@angular/common';
import { NbThemeService, NbMediaBreakpointsService, NbMediaBreakpoint } from '@nebular/theme';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-room-selector',
  templateUrl: './room-selector.component.html',
  styleUrls: ['./room-selector.component.scss'],
})
export class RoomSelectorComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();
  private hideGrid: boolean;

  @Output() select: EventEmitter<number> = new EventEmitter();

  selectedRoom = null;
  sortedRooms = [];
  viewBox = '-20 -20 618.88 407.99';
  isIE = !!(navigator.userAgent.match(/Trident/)
            || navigator.userAgent.match(/MSIE/)
            || navigator.userAgent.match(/Edge/));
  isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') >= 0;
  roomSvg = {
    borders: [{
      d: 'M186.21,130.05H216.37V160H186.21Z',
    }],
    stokedAreas: [

      { d: 'M-11.91,130V230h54V180h75V130Z' },
      { d: 'M-11.91,320v50h188v-50' },
      { d: 'M522.18,153h68a6.09,6.09,0,0,1,6.09,6.09v200a6.09,6.09,0,0,1,-6.09,6.09h-68Z' },
    ],
    furnitureAreas: [
      { d: 'M290,228h110v8h-110Z' },
    ],
    rooms: [
      {
        id: 1,
        name: { text: 'Гостиная', x: 345, y: 300 },
        area: { d: 'M178,370h340a6.09,6.09,0,0,0,6.09-6.09v-232' +
                  'h-342Z'},
        border: { d: 'M176.09,240v130h340a6.09,6.09,0,0,0,6.09-6.09v-150m0,-40v-44' +
        '             m-245,0h-93.1' },
      },
      {
        id: 2,
        name: { text: 'Кухня', x: 400, y: 90 },
        area: { d: 'M522.18,130v-86a6.09,6.09,0,0,0,-6.09-6.09h-228v90Z'},
        border: { d: 'M522.18,130v-86a6.09,6.09,0,0,0,-6.09-6.09h-230v85' },
      },
      {
        id: 3,
        name: { text: 'Тамбур', x: 80, y: 280 },
        area: { d: 'M150,320h26.09v-86.09a6.09,6.09,0,0,0,-6.09-6.09h-180' +
                     'a6.09,6.09,0,0,0,-6.09,6.09v80a6.09,6.09,0,0,0,6.09,6.09h160Z'},
        border: { d: 'M150,320h26.09v-86.09a6.09,6.09,0,0,0,-6.09-6.09h-20m-40,0h-120' +
                     'a6.09,6.09,0,0,0,-6.09,6.09v80a6.09,6.09,0,0,0,6.09,6.09h110' },
      },
      {
        id: 4,
        name: { text: 'С/У', x: 205, y: 90 },
        area: { d: 'M184,128h95a6.09,6.09,0,0,0,6.09-6.09v-86.09h-157.18' +
                      'v90h66.09Z'},
        border: { d: 'M184,130h96a6.09,6.09,0,0,0,6.09-6.09v-86.09h-157.18' +
                      'v36.09m0,40v16.09h16.09' },
      },
      {
        id: 5,
        name: { text: 'Котельная', x: 60, y: 90 },
        area: { d: 'M128.8,130v-92.18h-138.09' +
                     'a6.09,6.09,0,0,0,-6.09,6.09v80a6.09,6.09,0,0,0,6.09,6.09h140Z'},
        border: { d: 'M128.8,130v-16.09m0,-40v-36.09h-138.09' +
                     'a6.09,6.09,0,0,0,-6.09,6.09v80a6.09,6.09,0,0,0,6.09,6.09h140' },
      },

    ],
  };

  @HostBinding('style.background')
  get background(): 'none' | null {
    return this.hideGrid ? 'none' : null;
  }

  breakpoint: NbMediaBreakpoint;
  breakpoints: any;


  constructor(
    private location: Location,
    private locationStrategy: LocationStrategy,
    private themeService: NbThemeService,
    private breakpointService: NbMediaBreakpointsService,
  ) {

    this.selectRoom(1);

    this.breakpoints = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .subscribe(([, newValue]) => {
        this.breakpoint = newValue;
      });

  }

  ngOnInit() {
    this.hideGrid = this.themeService.currentTheme === 'corporate';

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name === 'corporate'),
        takeUntil(this.destroy$),
      )
      .subscribe((hideGrid: boolean) => this.hideGrid = hideGrid);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private sortRooms() {
    this.sortedRooms = this.roomSvg.rooms.slice(0).sort((a, b) => {
      if (a.id === this.selectedRoom) {
        return 1;
      }
      if (b.id === this.selectedRoom) {
        return -1;
      }
      return 0;
    });
  }

  selectRoom(roomNumber: number) {
    this.select.emit(roomNumber);
    this.selectedRoom = roomNumber;
    this.sortRooms();
  }

  setFromOuterSelectedRoom(roomNumber) {
    this.selectedRoom = roomNumber;
    this.sortRooms();
  }


  getUrlPath(id: string) {
    const baseHref = this.locationStrategy.getBaseHref().replace(/\/$/, '');
    const path = this.location.path().replace(/\/$/, '');

    return `url(${baseHref}${path}${id})`;
  }
}
