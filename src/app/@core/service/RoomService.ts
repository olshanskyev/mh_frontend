import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RoomServiceInterface } from '../data/RoomServiceInterface';

@Injectable()
export class RoomService extends RoomServiceInterface {

  private rooms: Room[] =  [
    {
      id: 0,
      name: 'Без комнаты',
    },
    {
      id: 1,
      name: 'Гостиная',
    },
    {
      id: 2,
      name: 'Кухня',
    },
    {
      id: 3,
      name: 'Тамбур',
    },
    {
      id: 4,
      name: 'С/У',
    },
    {
      id: 5,
      name: 'Котельная',
    },
  ];

  getAllRooms(): Observable<Room[]> {
    return of(this.rooms);
  }

  getRoomNameById(id: number): string {
    return this.rooms.find(item => item.id === id).name;
  }



}
