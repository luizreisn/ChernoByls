import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { BotaoMenu } from '../interfaces/botao-menu';

@Injectable({
  providedIn: 'root'
})
export class BotaoMenuService {

  private botoesMenuColecao: AngularFirestoreCollection<BotaoMenu>;

  constructor(private afs: AngularFirestore) {
    this.botoesMenuColecao = this.afs.collection<BotaoMenu>('BotoesMenu');
  }

  public getBotoesMenu() {
    return this.botoesMenuColecao.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      })
    )
  }

}
