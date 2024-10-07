import { loadRemoteModule } from '@angular-architects/native-federation';
import { Component, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-first-remote',
  standalone: true,
  imports: [],
  templateUrl: './first-remote.component.html',
  styleUrl: './first-remote.component.css',
})
export class FirstRemoteComponent {
  @ViewChild('placeHolder', { read: ViewContainerRef })
  viewContainer!: ViewContainerRef;

  constructor() {}

  ngOnInit(): void {
    this.load()
  }

  async load(): Promise<void> {
    const m = await loadRemoteModule({
      remoteEntry: 'http://localhost:4201/remoteEntry.json',
      exposedModule: './Component'
    });

    const ref = this.viewContainer.createComponent(m.AppComponent);
  }
}
