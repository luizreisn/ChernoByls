import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Produto } from '../interfaces/produto';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private produtoColecao: AngularFirestoreCollection<Produto>;

  constructor(private afs: AngularFirestore) {
    this.produtoColecao = this.afs.collection<Produto>('Produtos');
  }

  public getProdutos() {
    return this.produtoColecao.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      })
    )
  }

  public getProduto(id: string) {
    return this.produtoColecao.doc<Produto>(id).valueChanges();
  }
}
