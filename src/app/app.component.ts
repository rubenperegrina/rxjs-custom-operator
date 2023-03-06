import { Component } from '@angular/core';
import { Observable, Subject, switchMap } from 'rxjs';
import { liveSearchOperator } from './live-search-operator';

@Component({
  selector: 'app-root',
  template: ``,
  styles: []
})
export class AppComponent {
  searchTerm$ = new Subject<string>();
  user$!: Observable<any>;

  constructor() {
    this.user$ = this.searchTerm$.pipe(
      liveSearchOperator(
        (term: string) => term.length >= 4,
        500,
        (prev, curr) => prev === curr
      ),
      //switchMap((term: string) => this.yourService.filterUser(term))
    );
  }

  search(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    this.searchTerm$.next(element.value);
  }
}
