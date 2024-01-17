import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout"; 
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";

@Injectable({
    providedIn: 'root',
  })
export class BreakpointService{

    public isHandset$: Observable<boolean>;

    constructor(public breakpointObserver: BreakpointObserver){
        this.isHandset$ = this.breakpointObserver.observe([Breakpoints.Handset])
        .pipe(
          map(result => result.matches)
        );
        // this.breakpointObserver.observe([
        //     Breakpoints.XSmall,
        //     Breakpoints.Small,
        //     Breakpoints.Medium,
        //     Breakpoints.Large,
        //     Breakpoints.XLarge
        //   ]).subscribe(result => {
        //     const breakpoints = result.breakpoints;
        //     if (breakpoints[Breakpoints.Small] || breakpoints[Breakpoints.XSmall]){
        //       this.smallScreen = true;
        //     } else {
        //       this.smallScreen = false;
        //     }
        //   });
    }
}