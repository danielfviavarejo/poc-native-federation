import { loadRemoteModule } from '@angular-architects/native-federation';
import { CommonModule } from '@angular/common';
import { Component, ComponentRef, NO_ERRORS_SCHEMA, ViewChild, ViewContainerRef } from '@angular/core';
import { RemoteDirective } from './remote.directive';
import { RemoteOutput } from './remote-output';

@Component({
  selector: 'app-first-remote',
  standalone: true,
  imports: [CommonModule, RemoteDirective],
  templateUrl: './first-remote.component.html',
  styleUrl: './first-remote.component.css'
})
export class FirstRemoteComponent {
  @ViewChild('placeHolder', { read: ViewContainerRef })
  viewContainer!: ViewContainerRef;

  inputText = 'input text';

  constructor() { }

  ngOnInit(): void {
    // this.load()

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

  // async load(): Promise<void> {
  //   const m = await loadRemoteModule({
  //     remoteEntry: 'http://localhost:4201/remoteEntry.json',
  //     exposedModule: './Component'
  //   });

  //   const ref: ComponentRef<any> = this.viewContainer.createComponent(m.AppComponent);
  //   ref.instance.text = 'Text from Shell';
  //   ref.changeDetectorRef.detectChanges();

  //   ref.instance.textChange.subscribe((text: string) => {
  //     console.log('subscribe output:', text);
  //   });
  // }
}
