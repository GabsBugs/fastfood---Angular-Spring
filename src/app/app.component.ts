import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { OrderListComponent } from './components/order-list/order-list.component'; // Atualize o caminho

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatToolbarModule,
    RouterModule,
    OrderListComponent // Certifique-se de que isso está correto
  ],
})
export class AppComponent {
  title = 'Fast Food System';
}
