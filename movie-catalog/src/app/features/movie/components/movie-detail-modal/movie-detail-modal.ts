import { Component, Input, Output, EventEmitter, HostListener, OnChanges, SimpleChanges, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Movie } from '../../models/movie.interface';

@Component({
  selector: 'app-movie-detail-modal',
  imports: [CommonModule],
  templateUrl: './movie-detail-modal.html',
  styleUrl: './movie-detail-modal.scss'
})
export class MovieDetailModalComponent implements OnChanges, AfterViewInit {
  @Input() movie!: Movie;
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  @ViewChild('modalContent') modalContent!: ElementRef<HTMLDivElement>;

  @HostListener('document:keydown', ['$event'])
  onEscapeKey(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.isOpen) {
      this.onClose();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isOpen']) {
      if (this.isOpen) {
        this.lockBodyScroll();
        setTimeout(() => {
          if (this.modalContent) {
            this.modalContent.nativeElement.focus();
          }
        }, 100);
      } else {
        this.unlockBodyScroll();
      }
    }
  }

  ngAfterViewInit() {
    if (this.isOpen && this.modalContent) {
      this.modalContent.nativeElement.focus();
    }
  }

  onClose() {
    this.unlockBodyScroll();
    this.close.emit();
  }

  onBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.onClose();
    }
  }

  private lockBodyScroll() {
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
  }

  private unlockBodyScroll() {
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
  }
}