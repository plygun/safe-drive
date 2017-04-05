import {Injectable} from '@angular/core';
import {FirebaseListObservable} from 'angularfire2';

import {FirebaseService} from '../firebase/firebase.service';
import {Obstacle} from '../../../classes/obstacle.interface';

@Injectable()
export class ObstacleService {
  private _items: FirebaseListObservable<any>;
  private _currentItem: Obstacle;
  private _obstacleDialogType: string = 'show';

  constructor(public firebaseService: FirebaseService){
    firebaseService.listItems();
  }

  createObstacle(data: Obstacle): firebase.database.ThenableReference {
    return this.firebaseService.addItem(data);
  }

  updateObstacle(key: string, data: Object): void {
    return this.firebaseService.updateItem(key, data);
  }

  deleteObstacle(key?: string): firebase.Promise<any> {
    return this.firebaseService.deleteItem(key);
  }

  list(path?: string): FirebaseListObservable<any> {
    this._items = this.firebaseService.listItems(path);

    return this._items;
  }


  // class accessors
  get items(): FirebaseListObservable<any> {
    return this._items;
  }

  get obstacleDialogType(): string{
    return this._obstacleDialogType;
  }

  set obstacleDialogType(type: string){
    this._obstacleDialogType = type;
  }

  get currentItem(): Obstacle{
    return this._currentItem;
  }

  set currentItem(item: Obstacle){
    this._currentItem = item;
  }

}
