import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { IModelPagination } from 'src/app/shared/models/imodelpagination';
import { PagerParams } from 'src/app/shared/models/pagerparams';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPagingWeather(pagerParams: PagerParams, year: string, month: string) {
    let params = new HttpParams();

    if (pagerParams.search)
      params = params.append('search', pagerParams.search);
    if (pagerParams.filter)
      params = params.append('filter', pagerParams.filter.toString());

    params = params.append('pageIndex', pagerParams.pageNumber.toString());
    params = params.append('pageSize', pagerParams.pageSize.toString());

    if (Number(year))
      params = params.append('selectedYear', year);
    if (Number(month))
      params = params.append('selectedMonth', month);

    return this.http.get<IModelPagination>(this.baseUrl + 'weather/getpagingweather', { observe: 'response', params })
      .pipe(
        map(response => {
          return response.body;
        })
      )
  }
}
