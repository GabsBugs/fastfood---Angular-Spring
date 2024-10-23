import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router'; // Importando RouterModule

// Importação de módulos do Angular Material
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// Importação do módulo de roteamento
import { AppRoutingModule } from './app-routing.module';

// Importação dos componentes da aplicação
import { AppComponent } from './app.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderFormComponent } from './components/order-form/order-form.component';

@NgModule({
  declarations: [
    AppComponent,          // Componente principal da aplicação
    OrderListComponent,    // Componente para listar pedidos
    OrderFormComponent,    // Componente para o formulário de pedidos
  ],
  imports: [
    BrowserModule,         // Módulo do navegador
    BrowserAnimationsModule,// Módulo para animações no navegador
    ReactiveFormsModule,   // Módulo para formulários reativos
    HttpClientModule,      // Módulo para realizar requisições HTTP
    MatDialogModule,       // Módulo para usar diálogos do Angular Material
    MatToolbarModule,      // Módulo para a barra de ferramentas do Angular Material
    MatButtonModule,       // Módulo para botões do Angular Material
    MatIconModule,         // Módulo para ícones do Angular Material
    MatSnackBarModule,     // Módulo para usar a barra de notificação (snackbar) do Angular Material
    AppRoutingModule,      // Módulo de roteamento da aplicação
    RouterModule,          // Adicionando RouterModule
  ],
  providers: [],          // Lista de provedores de serviços
  bootstrap: [AppComponent], // Componente que inicia a aplicação
})
export class AppModule {}
