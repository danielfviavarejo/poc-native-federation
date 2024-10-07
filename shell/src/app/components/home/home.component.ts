import { Component } from '@angular/core';
import { FirstRemoteComponent } from "../first-remote/first-remote.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FirstRemoteComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
