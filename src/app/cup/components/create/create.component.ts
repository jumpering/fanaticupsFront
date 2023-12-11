import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Cup } from '@cup/models/cup.model';
import { CupService } from '@cup/services/cup.service';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  public file: File | null = null;
  public form!: FormGroup;
  public urlImage!: string;

  constructor(
    public cupService: CupService,
    public formBuilder: FormBuilder,
    public authService: AuthService,
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

  onSelectedFile(event: any){
    this.file =  event.target.files[0];
    if (this.file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.urlImage = reader.result as string;
      };
      reader.readAsDataURL(this.file);
    }
  }

  onCreateCup(){
    const cup: Cup = {
      name: this.form.get('name')?.value,
      origin: this.form.get('origin')?.value,
      description: this.form.get('description')?.value,
      image: this.file?.name.toString(),
    };
    const userId: number = this.authService.getId();
    this.cupService.create(cup, this.file!);
  }

}
