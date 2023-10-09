import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer) { }

  transform(value: any, searchText: any): any {
    return this.domSanitizer.bypassSecurityTrustHtml(this.stylize(value, searchText));
  }

  private stylize(text: string, searchText: string): string {
    return this.highlightText(text, searchText);
  }

  highlightText(text, searchText) {
    var regex = new RegExp(searchText, "gi");
    return text.toString().replace(regex, function (match) {
      return "\<span style=\"background-color: yellow;\"\>" + match + "\<\/span\>";
    });
  }

}
