import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { MenuEspecifico } from 'src/app/interfaces/menu-especifico';
import { Produto } from 'src/app/interfaces/produto';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { MenuEspService } from 'src/app/services/menu-esp.service';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage {

  public produtosFavoritos: string[];

  public menuEsp: MenuEspecifico = null;
  public menuEspId: string = null;
  public menuEspSubscription: Subscription;

  public produtos = new Array<Produto>();
  public produtosFiltrados = this.produtos;
  private produtosSubscription: Subscription;

  public usuario: Usuario = null;
  public usuarioId: string = null;
  public usuarioSubscription: Subscription;

  constructor(private menusEspService: MenuEspService,
    private produtoService: ProdutoService,
    private authService: AuthService,
    private activeRoute: ActivatedRoute,
    private toastCtrl: ToastController) {
    this.carregarDados();
  }

  public async carregarDados() {
    this.menuEspId = this.activeRoute.snapshot.params['id'];
    this.produtosSubscription = this.produtoService.getProdutos().subscribe(data => {
      this.produtos = data;
    });
    this.menuEspSubscription = this.menusEspService.getMenuEsp(this.menuEspId).subscribe(data => {
      this.menuEsp = data;
    });
    this.usuarioId = (await this.authService.getAuth().currentUser).uid
    this.usuarioSubscription = this.authService.getUsuario(this.usuarioId).subscribe(data => {
      this.usuario = data;
      this.produtosFavoritos = this.usuario.produtosFavoritos;
    });
  }

  ngOnDestroy() {
    this.produtosSubscription.unsubscribe();
    this.menuEspSubscription.unsubscribe();
    this.usuarioSubscription.unsubscribe();
  }

  public filtrarProdutos(categoria: string) {
    this.produtosFiltrados = this.produtos.filter(p => p.categoria === categoria);
    return this.produtosFiltrados;
  }

  public darFavorito(id: string) {
    if (this.produtosFavoritos.find(p => p === id)) {
      const index = this.produtosFavoritos.findIndex(p => p === id)
      this.produtosFavoritos.splice(index, 1)
      console.log(this.produtosFavoritos)
      this.authService.atualizarFavorito(this.usuarioId, this.produtosFavoritos)
      this.toast('Produto retirado da lista de favoritos.')
    } else {
      this.produtosFavoritos.push(id)
      console.log(this.produtosFavoritos)
      this.authService.atualizarFavorito(this.usuarioId, this.produtosFavoritos)
      this.toast('Produto colocado na lista de favoritos.')
    }
  }

  private async toast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000, color: 'primary' });
    toast.present();
  }

}
