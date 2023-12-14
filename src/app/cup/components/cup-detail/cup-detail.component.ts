import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { CupService } from '@cup/services/cup.service'
import { Cup } from '@cup/models/cup.model';

@Component({
  selector: 'app-cup-detail',
  templateUrl: './cup-detail.component.html',
  styleUrls: ['./cup-detail.component.scss']
})
export class CupDetailComponent implements OnInit {

  public cup!: Cup;
  public cupImage: string = 'http://localhost:8080/images/';

  constructor(
    private activatedRoute: ActivatedRoute,
    private cupService: CupService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe((params: Params) => {
        const id: number = params['id'];
        this.cupService.getById(id)
        .subscribe(element => {
          this.cup = element;
          const image = element.image?.toString();
          this.cupImage = this.cupImage.concat(image!).replace('assets/images/', '');
        });
      });
  }

  delete(): void {
    this.cupService.delete(this.cup.id!);
    
  }

  toHome() {
    this.router.navigate(['/']);
  }

}
