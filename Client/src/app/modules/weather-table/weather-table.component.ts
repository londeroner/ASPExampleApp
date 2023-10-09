import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WeatherService } from './weather.service';
import { MatTableDataSource } from '@angular/material/table';
import { PagerParams } from 'src/app/shared/models/pagerparams';
import { PageEvent } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-weather-table',
  templateUrl: './weather-table.component.html',
  styleUrls: ['./weather-table.component.css']
})
export class WeatherTableComponent implements OnInit {
  data: MatTableDataSource<any>;
  @ViewChild('search', { static: false }) searchTerm: ElementRef;
  pagerParams = new PagerParams();
  totalCount: number;
  displayedColumns: string[] = ['date', 'time', 't', 'airHumidity', 'td', 'atmospherePressure',
                                'windDirection', 'windSpeed', 'cloudCover', 'h', 'vv', 'weatherPhenomenon'];
  searchKey: string;

  selectedMonth: string = "Not choosed";
  selectedYear: string = "Not choosed";
  years: number[];

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.years = Array(23).fill(1).map((x,i) => 2000 + i);
    this.getWeathers();
  }

  getWeathers() {
    this.weatherService.getPagingWeather(this.pagerParams, this.selectedYear, this.selectedMonth).subscribe(response => {
      this.data = new MatTableDataSource(response.data);
      this.pagerParams.pageNumber = response.pageIndex;
      this.pagerParams.pageSize = response.pageSize;
      this.totalCount = response.count;
    });
  }

  onPageChanged(event: PageEvent) {
    this.pagerParams.pageNumber = event.pageIndex;
    this.pagerParams.pageSize = event.pageSize;
    this.getWeathers();
  }

  applySearch() {
    this.pagerParams.search = this.searchTerm.nativeElement.value;
    this.getWeathers();
  }

  onSearchClear() {
    this.searchTerm.nativeElement.value = "";
    this.searchKey = "";
    this.applySearch();
  }

  yearSelected()
  {
    this.getWeathers();
  }

  monthSelected()
  {
    this.getWeathers();
  }
}
