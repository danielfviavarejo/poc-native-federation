import {Component, Injector, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {loadRemoteModule} from '@angular-architects/native-federation';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'shell';
  catalogoRemoteService: any;

  constructor(
    private injector: Injector
  ) {}

  async load<T>(){
    this.catalogoRemoteService = await loadRemoteModule({
      remoteEntry: 'http://localhost:4201/remoteEntry.json',
      exposedModule: './CatalogoService'
    }).then((m) => this.injector.get<T>(m.CatalogoService))
  }

  ngOnInit(): void {
    this.load().then(() => this.catalogoRemoteService.getRemoteCatalogMethod());
  }
}
