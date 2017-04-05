import {Injectable} from '@angular/core';
import {AngularFire, FirebaseListObservable, AngularFireDatabase} from 'angularfire2';

@Injectable()
export class FirebaseService {

  database: AngularFireDatabase;
  items: FirebaseListObservable<any>;

  constructor(af: AngularFire) {
    this.database = af.database;
  }

  addItem(data: Object): firebase.database.ThenableReference {
    return this.items.push(data);
  }

  updateItem(key: string, data: Object) {
    this.items.update(key, data);
  }

  deleteItem(key?: string): firebase.Promise<any> {
    return this.items.remove(key);
  }

  listItems(key = '/'): FirebaseListObservable<any> {
    this.items = this.database.list(key);
    return this.items;
  }

}
