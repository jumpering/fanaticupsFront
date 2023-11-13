import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Event } from '@angular/router';
import { Cup } from '@cup/models/cup.model';
import { CupService } from '@cup/services/cup.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  public hideRequiredControl: boolean = false;
  public floatLabel: Boolean = false;
  public fileName!: any;

  constructor(
    public cupService: CupService
  ) { }

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

  onCreateCup(){
    console.log('dentro del metodo onCreateCup');
    const cup: Cup = {
      //id: 100,
      name: 'test',
      origin: 'test',
      description: 'test',
      image: 'imagen',
      price: 1000,
      owner: '1'
    };
    console.log('desde el front: ' + cup.name);
    this.cupService.create(cup);
  }

}
