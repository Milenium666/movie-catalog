import { Component, Input, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  @Input() searchQuery!: WritableSignal<string>;

  onSearchChange(value: string) {
    this.searchQuery.set(value);
  }
}
