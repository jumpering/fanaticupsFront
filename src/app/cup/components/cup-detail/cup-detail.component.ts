import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { CupService } from '@cup/services/cup.service'
import { Cup } from '@cup/models/cup.model';

@Component({
  selector: 'app-cup-detail',
  templateUrl: './cup-detail.component.html',
  styleUrls: ['./cup-detail.component.scss']
})
export class CupDetailComponent implements OnInit {

  public cup!: Cup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cupService: CupService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe((params: Params) => {
        const id = params['id'];
        this.cup = this.cupService.getById(id);
      });
  }



}
