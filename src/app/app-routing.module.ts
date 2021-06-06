import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    canActivate: [LoginGuard],
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'endereco',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/endereco/endereco.module').then(m => m.EnderecoPageModule)
  },
  {
    path: 'perfil',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/perfil/perfil.module').then(m => m.PerfilPageModule)
  },
  {
    path: 'favoritos',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/favoritos/favoritos.module').then(m => m.FavoritosPageModule)
  },
  {
    path: 'pedidos-anteriores',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/pedidos-anteriores/pedidos-anteriores.module').then(m => m.PedidosAnterioresPageModule)
  },
  {
    path: 'pedido/:id',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/pedido/pedido.module').then(m => m.PedidoPageModule)
  },
  {
    path: 'menu/:id',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/menu/menu.module').then(m => m.MenuPageModule)
  },
  {
    path: 'produto/:id',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/produto/produto.module').then(m => m.ProdutoPageModule)
  },
  {
    path: 'carrinho',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/carrinho/carrinho.module').then(m => m.CarrinhoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
