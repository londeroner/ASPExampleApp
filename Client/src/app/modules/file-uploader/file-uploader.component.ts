import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FileUploaderService } from './file-uploader.service';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {

  constructor(private toastr: ToastrService, private fileUploaderService: FileUploaderService) { }

  ngOnInit(): void {
  }

  filesDropped(files: File[]): void {
    files.forEach(file => {

      if (!file.name.includes(".xls") || !file.name.includes(".xlsx"))
      {
        this.toastr.error("Загружаемый файл должен быть Excel-таблицей.", "Ошибка");
        return;
      }

      this.fileUploaderService.uploadFile(file).then(x => {
          this.toastr.success("Excel файл успешно загружен.", "Успех");
      });

    });
  }
}
