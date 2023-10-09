import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Directive({
  selector: '[appDragDrop]'
})
export class DragDropDirective {
  @Output() files: EventEmitter<File[]> = new EventEmitter();
  @HostBinding("style.background") private background = "#eee";
  constructor(private sanitizer: DomSanitizer) { }
  @HostListener("dragover", ["$event"]) public onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "#999";
  }
  @HostListener("dragleave", ["$event"]) public onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "#eee";
  }
  @HostListener('drop', ['$event']) public onDrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee';
  
    let files: File[] = [];
    for (let i = 0; i < evt.dataTransfer.files.length; i++) {
      const file = evt.dataTransfer.files[i];
      files.push(file);
    }
    if (files.length > 0) {
      this.files.emit(files);
    }
  }
}
