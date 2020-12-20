import {Component, OnDestroy} from '@angular/core';
import { NbThemeService, NbMediaBreakpoint, NbMediaBreakpointsService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators' ;
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import { DeviceService } from '../../@core/service/DeviceService';
import { Observable } from 'rxjs';
import { RoomService } from '../../@core/service/RoomService';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnDestroy {

  private alive = true;
  solarValue: number;


  // ============= common ============
  wirelessAudioCard: OnOffCard = {
    id: 0,
    title: 'Музыка',
    iconClass: 'nb-audio',
    type: 'danger',
    device: '',
    parameter: 'State',
    command: 'TOGGLE',
    roomId: 0,
  };
  lightCardAll:  OnOffCard = {
    id: 0,
    title: 'Общий свет',
    iconClass: 'nb-lightbulb',
    type: 'primary',
    device: '',
    parameter: 'State',
    command: 'TOGGLE',
    roomId: 0,
  };
  alarmCard:  OnOffCard = {
    id: 0,
    title: 'Сигнализация',
    iconClass: 'nb-danger',
    type: 'info',
    device: '',
    parameter: 'State',
    command: 'TOGGLE',
    roomId: 0,
  };
  themeName: string;
  commonCards: string;
  roomCards: OnOffCard[];

  commonStatusCardsSet: OnOffCard[] = [
    this.wirelessAudioCard,
    this.lightCardAll,
    this.alarmCard,
  ];

  commonStatusCardsByThemes: {
    default: OnOffCard[];
    cosmic: OnOffCard[];
    corporate: OnOffCard[];
    dark: OnOffCard[];
  } = {
    default: this.commonStatusCardsSet,
    cosmic: this.commonStatusCardsSet,
    corporate: this.commonStatusCardsSet,
    dark: this.commonStatusCardsSet,
  };


  breakpoint: NbMediaBreakpoint;
  breakpoints: any;
  breakpointsSubscription: any;


  getRoomCardsByRoom(roomId: number): Observable<OnOffCard[]> {
    return this.deviceService.getOnOffCardsByRoom(roomId);
  }

  constructor(private themeService: NbThemeService,
              private breakpointService: NbMediaBreakpointsService,
              private scrollToService: ScrollToService,
              private deviceService: DeviceService,
              private roomService: RoomService) {

    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {

        this.commonCards = this.commonStatusCardsByThemes[theme.name];
        this.themeName = theme.name;
    });

    this.breakpoints = this.breakpointService.getBreakpointsMap();
    this.breakpointsSubscription = this.themeService.onMediaQueryChange()
      .subscribe(([, newValue]) => {
        this.breakpoint = newValue;
      });

    this.selectRoom('1');
  }

  ngOnDestroy() {
    this.alive = false;
  }

  currentRoomTitle: string;

  selectRoom(roomNumber) {
      this.roomService.getAllRooms().subscribe(rooms => {
        this.currentRoomTitle = rooms.filter(item => item.id === roomNumber)[0].name;
      });
      this.getRoomCardsByRoom(roomNumber).subscribe(cards => {
        this.roomCards = cards;
      });

    const config: ScrollToConfigOptions = {
      target: 'roomCards',
      offset: -100,
    };
    this.scrollToService.scrollTo(config);

  }

}
