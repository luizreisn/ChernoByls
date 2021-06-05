import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Pedido } from 'src/app/interfaces/pedido';
import { Produto } from 'src/app/interfaces/produto';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.page.html',
  styleUrls: ['./pedido.page.scss'],
})
export class PedidoPage {

  public pedido: Pedido = null;
  public pedidoId: string = null;

  public usuario: Usuario = {};
  public usuarioId: string = null;
  public usuarioSubscription: Subscription;

  constructor(private authService: AuthService,
    private activeRoute: ActivatedRoute,) {
    this.carregarDados();
  }

  public async carregarDados() {
    this.pedidoId = this.activeRoute.snapshot.params['id'];
    this.usuarioId = (await this.authService.getAuth().currentUser).uid
    this.usuarioSubscription = this.authService.getUsuario(this.usuarioId).subscribe(data => {
      this.usuario = data;
      this.pedido = this.usuario.pedidos.find(p => p.id === this.pedidoId);
      console.log(this.pedido)
    });

  }

  ngOnDestroy() {
    this.usuarioSubscription.unsubscribe();
  }

  public filtrar(produto: Produto) {
    const c = produto.personalizacao.filter(c => c.marcado === true)
    return c;
  }


}
