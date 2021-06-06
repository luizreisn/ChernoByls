import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Pedido } from 'src/app/interfaces/pedido';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-pedidos-anteriores',
  templateUrl: './pedidos-anteriores.page.html',
  styleUrls: ['./pedidos-anteriores.page.scss'],
})
export class PedidosAnterioresPage {

  public quantidadePedidos: number;
  public data: Pedido[];

  public usuario: Usuario = {};
  public usuarioId: string = null;
  public usuarioSubscription: Subscription;

  constructor(private authService: AuthService,) {
    this.carregarDados();
  }

  public async carregarDados() {
    this.usuarioId = (await this.authService.getAuth().currentUser).uid
    this.usuarioSubscription = this.authService.getUsuario(this.usuarioId).subscribe(data => {
      this.usuario = data;
      this.quantidadePedidos = this.usuario.pedidos.length;
    });
  }

  ngOnDestroy() {
    this.usuarioSubscription.unsubscribe();
  }

}