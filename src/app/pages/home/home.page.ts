import { Component, ViewChild } from '@angular/core';
import { AlertController, IonSlides } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Aviso } from 'src/app/interfaces/aviso';
import { BotaoMenu } from 'src/app/interfaces/botao-menu';
import { MenuEspecifico } from 'src/app/interfaces/menu-especifico';
import { Produto } from 'src/app/interfaces/produto';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { AvisoService } from 'src/app/services/aviso.service';
import { BotaoMenuService } from 'src/app/services/botao-menu.service';
import { MenuEspService } from 'src/app/services/menu-esp.service';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  public usuario: Usuario = null;
  public usuarioId: string = null;
  public usuarioSubscription: Subscription;

  public produtos = new Array<Produto>();
  private produtosSubscription: Subscription;
  public produtosFiltrados: Array<Produto>;

  public botoesMenu = new Array<BotaoMenu>();
  private botoesMenuSubscription: Subscription;

  public menusEsp = new Array<MenuEspecifico>();
  private menuEspSubscription: Subscription;

  public avisos = new Array<Aviso>();
  private avisosSubscription: Subscription;

  public focar: number;

  @ViewChild(IonSlides) slides: IonSlides;

  public slideOpts = {
    initialSlide: 0,
    loop: true
  }

  constructor(private authService: AuthService,
    private produtosService: ProdutoService,
    private botoesMenuService: BotaoMenuService,
    private menusEspService: MenuEspService,
    private avisosService: AvisoService,
    private alertCtrl: AlertController) {
    this.carregarDados();
  }

  public async carregarDados() {
    console.log('entrou');
    this.focar = 0;
    this.usuarioId = (await this.authService.getAuth().currentUser).uid
    this.usuarioSubscription = this.authService.getUsuario(this.usuarioId).subscribe(data => {
      this.usuario = data;
    });
    this.produtosSubscription = this.produtosService.getProdutos().subscribe(data => {
      this.produtos = data;
      this.produtosFiltrados = this.produtos;
    });
    this.botoesMenuSubscription = this.botoesMenuService.getBotoesMenu().subscribe(data => {
      this.botoesMenu = data;
    });
    this.menuEspSubscription = this.menusEspService.getMenusEsp().subscribe(data => {
      this.menusEsp = data;
    });
    this.avisosSubscription = this.avisosService.getAvisos().subscribe(data => {
      this.avisos = data;
    });
  }

  ngOnDestroy() {
    this.produtosSubscription.unsubscribe();
    this.botoesMenuSubscription.unsubscribe();
    this.menuEspSubscription.unsubscribe();
    this.avisosSubscription.unsubscribe();
  }

  public busca(ev: Event) {
    let val = (ev as CustomEvent).detail.value;
    if (val && val.trim() !== '') {
      this.produtosFiltrados = this.produtos.filter(termo =>
        termo.nome.toLocaleLowerCase().indexOf(val.toLocaleLowerCase().trim()) > -1)
    } else {
      this.produtosFiltrados = this.produtos;
    }
  }

  public focado() {
    this.focar = 1;
  }

  public desfocado() {
    this.focar = 0;
  }

  public voltarSlide() {
    this.slides.slidePrev();
  }

  public avancarSlide() {
    this.slides.slideNext();
  }

  public async sair() {
    const alertaSair = await this.alertCtrl.create({
      header: 'Deseja mesmo sair?',
      buttons: [{
        text: 'Cancelar'
      }, {
        text: 'Sair',
        handler: () => {
          this.authService.sair();
        }
      }]
    })
    await alertaSair.present();
  }

}
