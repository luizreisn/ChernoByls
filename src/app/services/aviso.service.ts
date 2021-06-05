import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Aviso } from '../interfaces/aviso';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AvisoService {

  private avisoColecao: AngularFirestoreCollection<Aviso>;

  constructor(private afs: AngularFirestore) {
    this.avisoColecao = this.afs.collection<Aviso>('Avisos');
  }

  public getAvisos() {
    return this.avisoColecao.snapshotChanges().pipe(
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
