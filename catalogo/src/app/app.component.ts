import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnChanges {
  title = 'catalogo';

  @Input() text!: string;
  @Input() message!: string;

  @Output() textChange = new EventEmitter<string>();

  ngOnInit(): void {
    console.log('remote init');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('remote changes', changes);
  }

  emitClick() {
    this.textChange.emit('Text from Catalogo');
  }

}
