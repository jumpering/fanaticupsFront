import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from 'src/app/user/services/user.service';
import { CupModule } from "../../cup.module";
import { User } from '@cup/models/user.model';
import { CriteriaService } from '@cup/services/criteria.service';
import { Criteria } from '@cup/filterCriteria/criteria';
import { MaterialModule } from '@material/material.module';

@Component({
  selector: 'app-cup-user-list',
  standalone: true,
  imports: [CupModule, MaterialModule],
  templateUrl: './cup-user-list.component.html',
  styleUrl: './cup-user-list.component.scss'
})
export class CupUserListComponent implements OnInit{

  public userName?: string;

  constructor(private activatedRouter: ActivatedRoute, private userService: UserService, private criteriaService: CriteriaService){}

  ngOnInit(): void {
    this.activatedRouter.params.subscribe((params: Params) =>{
      const userId: number = params['id'];
      this.userService.getUser(userId).subscribe((user: User) => {
        this.userName = user.name;
      });
      const criteria: Criteria = {
        userId: userId,
        cupName: '',
        cupDescription: '',
        showFavorites: false,
        categoryId: undefined
      }
      this.criteriaService.setCriteria(criteria);
    });
  }

}
