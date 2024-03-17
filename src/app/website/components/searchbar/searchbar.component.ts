import { Component } from '@angular/core';
import { SearchService } from '@shared/services/search.service';
import { FormsModule } from '@angular/forms'; 
import { MaterialModule } from '@material/material.module';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [
    FormsModule,
    MaterialModule
  ],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss'
})
export class SearchbarComponent {

  public searchString: string ='';

  constructor(private searchService: SearchService) { }

  onSearchStringInputChange(){
    this.searchService.searchTermChanged.emit(this.searchString);
  }
}
