import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { MenuEspecifico } from 'src/app/interfaces/menu-especifico';


@Injectable({
  providedIn: 'root'
})
export class MenuEspService {

  private menuEspColecao: AngularFirestoreCollection<MenuEspecifico>;

  constructor(private afs: AngularFirestore) {
    this.menuEspColecao = this.afs.collection<MenuEspecifico>('MenusEsp');
  }

  public getMenusEsp() {
    return this.menuEspColecao.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      })
    )
  }

  public getMenuEsp(id: string) {
    return this.menuEspColecao.doc<MenuEspecifico>(id).valueChanges();
  }
}
