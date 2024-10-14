import { loadRemoteModule } from '@angular-architects/native-federation';
import { CommonModule } from '@angular/common';
import {Component, Injector, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import { RemoteDirective } from './remote.directive';
import { RemoteOutput } from './remote-output';

@Component({
  selector: 'app-first-remote',
  standalone: true,
  imports: [CommonModule, RemoteDirective],
  templateUrl: './first-remote.component.html',
  styleUrl: './first-remote.component.css'
})
export class FirstRemoteComponent implements OnInit {
  @ViewChild('placeHolder', { read: ViewContainerRef })
  viewContainer!: ViewContainerRef;

  inputText = 'input text';

  catalogoRemoteService: any;

  constructor( private injector: Injector) { }

  async load<T>() {
    this.catalogoRemoteService  = await loadRemoteModule({
      remoteEntry: 'http://localhost:4201/remoteEntry.json',
      exposedModule: './CatalogoService'
    }).then((m) => this.injector.get<T>(m.CatalogoService));
  }

  ngOnInit(): void {
    this.load().then(() => this.catalogoRemoteService.getRemoteCatalogMethodTwo());

    setTimeout(() => {
      this.inputText = 'input text changed';
    }, 5000);
  }

  handleOutput(output: RemoteOutput): void {
    console.log('handleOutput', output);
  }

  handleLoaded(): void {
    console.log('handleLoaded');
  }

  handleDestroyed(): void {
    console.log('handleDestroyed');
  }

  handleError(event: any): void {
    console.log('handleError', event);
  }


}
