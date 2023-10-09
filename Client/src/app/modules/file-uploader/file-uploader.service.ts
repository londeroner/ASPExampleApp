import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploaderService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  async uploadFile(file: File) {
    let content = await this.readFileAsync(file);

    let base64Content = (<string>content).split(',')[1]
    
    return await lastValueFrom(this.http.post(this.baseUrl + 'weather/uploadweather', { base64Content: base64Content }, { observe: 'response' })
      .pipe(
        map(response => {
          return response;
        })
      ));
  }

  private readFileAsync(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = reject;

      reader.readAsDataURL(file);
    })
  }
}
