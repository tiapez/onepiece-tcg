import { Component } from '@angular/core';
import { ExcelService } from 'src/app/Service/Interface/Excel/excel.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-import-card',
  templateUrl: './import-card.component.html',
  styleUrls: ['./import-card.component.css']
})
export class ImportCardComponent {

  constructor(private excelService : ExcelService, private titleService : Title) { }
  private excell! : Blob;
  private file! : File;
  
ngOnInit(){
  this.titleService.setTitle("Onepiece TCG - Import");
}



  changeFile(file : any) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}


uploadFile(excellInput: any) {
  const file: File = excellInput.target.files[0];
  this.file = excellInput.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    const base64String: string = (reader.result as string);
    this.excell = base64String as unknown as Blob;
  };
}

downloadFile(){
  let a = document.createElement('a');
  document.body.appendChild(a);
  a.setAttribute('style', 'display: none');
  a.href = "./assets/Excel/RomanceDawn.xlsx";
  a.download = "RomanceDawn";
  a.click();
  a.remove();
}
  d2(){
    this.excelService.importExcel(this.file);
  }

}
