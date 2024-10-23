import { Component, OnInit } from '@angular/core';
import { SearchService } from '@shared/services/search.service';
import { FormControl, FormsModule } from '@angular/forms';
import { MaterialModule } from '@material/material.module';
import { CupService } from '@cup/services/cup.service';
import { Criteria } from '@cup/filterCriteria/criteria';
import { CriteriaService } from '@cup/services/criteria.service';
import { Cup } from '@cup/models/cup.model';
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { CommonModule } from '@angular/common';
import { debounceTime, switchMap } from 'rxjs/operators'; // Importa switchMap para manejar las solicitudes de búsqueda
import { of } from 'rxjs'; // Importa 'of' para gestionar la respuesta vacía
import { UserService } from 'src/app/user/services/user.service';
import { User } from '@cup/models/user.model';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss'
})
export class SearchbarComponent implements OnInit {

  public searchString: string = '';
  private page: number = 0;
  private cupsPerPage: number = 5;
  private criteria!: Criteria;
  public cups: Cup[] = [];
  public searchControl = new FormControl();
  public users?: User[] | undefined;

  constructor(private searchService: SearchService, 
    private cupService: CupService, 
    private userService: UserService, 
    //private criteriaService: CriteriaService,
    private router: Router) { }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        switchMap(value => {
          this.searchService.searchTermChanged.emit(value);
          if (!value) {
            return of({ content: [] });
          }
          this.criteria = {
            userId: undefined,
            cupName: value,
            cupDescription: '',
            showFavorites: false,
            categoryId: undefined
          };
          return this.cupService.getAllCups(this.page, this.cupsPerPage, this.criteria);
        })
      )
      .subscribe({
        next: (requestDataInput) => {
          this.cups = requestDataInput.content;
        },
        error: (error) => {
          console.log('Error al obtener los resultados:', error);
        },
        complete: () => {}
      });

      //para user
      this.searchControl.valueChanges.pipe(
        debounceTime(300),
        switchMap(value => {
          if (!value) {
            return of([]);
          }
          return this.userService.getByName(value);
        })
      )
      .subscribe({
        next: (users: User[] | undefined) => {
          this.users = users || [];
        },
        error: (error) => {
          console.error('Error fetching users:', error);
        },
        complete: () => {}
      });
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    const selectedOption = event.option.value;
    //console.log('Opción seleccionada:', selectedOption);
    if(selectedOption.type === 'cup'){
      this.searchControl.setValue('');
      this.router.navigate(['/', selectedOption.id]);
    } else if (selectedOption.type === 'user'){
      this.searchControl.setValue('');
      this.router.navigate(['/user-list', selectedOption.id]);
    }
  }

  displayCupOrUser(option: {name: string}): string {
    return option ? option.name : '';
  }
}
