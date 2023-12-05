import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Event } from '@angular/router';
import { Cup } from '@cup/models/cup.model';
import { CupService } from '@cup/services/cup.service';
import { AuthService } from '@auth/services/auth.service';
import { User } from '@cup/models/user.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  public file: File | null = null;
  //public status: "initial" | "uploading" | "success" | "fail" = "initial"; // Variable to store file status
  public form!: FormGroup;

  constructor(
    public cupService: CupService,
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public http: HttpClient
  ) { 
    this.buildForm();
  }

  ngOnInit(): void {
  }

  buildForm(){
    this.form = this.formBuilder.group({
      name: [''],
      origin: [''],
      description: [''],
    });
  }

  private uploadImage(){
    console.log('...enviando');
    if (this.file) {
      const formData = new FormData();
      formData.append("file", this.file);
      formData.append("userId", this.authService.getId().toString());
      
      this.http.post('http://localhost:8080/files', formData).subscribe(
        { complete: () => {console.log('complete: ')},
          error: () => {console.log('error')}
        },
      )


    }
  }

  onSelectedFile(event: any){
    this.file =  event.target.files[0];
  }

  onCreateCup(){
    console.log('dentro del metodo onCreateCup');
    this.uploadImage();
    const cup: Cup = {
      name: this.form.get('name')?.value,
      origin: this.form.get('origin')?.value,
      description: this.form.get('description')?.value,
      image: this.file?.name.toString(),
      //user: this.user,
    };
    const userId: number = this.authService.getId();
    this.cupService.create(cup, userId);
  }

}
