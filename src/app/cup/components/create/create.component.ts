import { Component, OnInit } from '@angular/core';
import { Event } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  public hideRequiredControl: boolean = false;
  public floatLabel: Boolean = false;
  public fileName!: any;

  constructor() { }

  ngOnInit(): void {
  }

  // getFloatLabelValue(): FloatLabelType {
  //   return this.floatLabelControl.value || 'auto';
  // }

  onSelectedFile(event: any){
    // const file:File = event.target.files[0];
    const file: File = event.target.file[0];
      
    if (file) {
        this.fileName = file.name;
        const formData = new FormData();
        formData.append("thumbnail", file);


        // const upload$ = this.http.post("/api/thumbnail-upload", formData, {
        //     reportProgress: true,
        //     observe: 'events'
        // })
        // .pipe(
        //     finalize(() => this.reset())
        // );
      
        // this.uploadSub = upload$.subscribe(event => {
        //   if (event.type == HttpEventType.UploadProgress) {
        //     this.uploadProgress = Math.round(100 * (event.loaded / event.total));
        //   }
        // })
    }
  }

}
