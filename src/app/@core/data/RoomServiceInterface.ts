import { Observable } from 'rxjs';

export abstract class RoomServiceInterface {
  abstract getAllRooms(): Observable<Room[]>;
  abstract getRoomNameById(id: number): string;
}
