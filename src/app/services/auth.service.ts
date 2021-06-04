import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { DadoEndereco } from '../interfaces/dado-endereco';
import { Produto } from '../interfaces/produto';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public usuarioColecao: AngularFirestoreCollection<Usuario>;

  constructor(private afa: AngularFireAuth,
    private afs: AngularFirestore) {
    this.usuarioColecao = this.afs.collection<Usuario>('Usuarios');
  }

  public getAuth() {
    return this.afa;
  }

  public getUsuario(id: string) {
    return this.usuarioColecao.doc<Usuario>(id).valueChanges();
  }

  public cadastrar(usuarioCadastro: Usuario) {
    return this.afa.createUserWithEmailAndPassword(usuarioCadastro.email, usuarioCadastro.senha);
  }

  public login(usuarioLogin: Usuario) {
    return this.afa.signInWithEmailAndPassword(usuarioLogin.email, usuarioLogin.senha);
  }

  public atualizarDados(id: string, usuario: Usuario) {
    return this.usuarioColecao.doc<Usuario>(id).update(usuario);
  }

  public atualizarEndereco(id: string, endereco: DadoEndereco) {
    return this.usuarioColecao.doc<Usuario>(id).update({ dadoEndereco: endereco });
  }

  public atualizarFavorito(id: string, produtosFav: string[]) {
    return this.usuarioColecao.doc<Usuario>(id).update({ produtosFavoritos: produtosFav });
  }

  public atualizarCarrinho(id: string, produto: Produto[]) {
    return this.usuarioColecao.doc<Usuario>(id).update({ carrinho: produto });
  }

  public atualizarPedidos(id: string, usuario: Usuario) {
    return this.usuarioColecao.doc<Usuario>(id).update({ pedidos: usuario.pedidos });
  }

  public sair() {
    return this.afa.signOut();
  }
}
