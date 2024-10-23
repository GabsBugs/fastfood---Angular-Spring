import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module'; 

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error('Erro ao inicializar a aplicação:', err));
