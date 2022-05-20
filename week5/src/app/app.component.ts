import { Component } from '@angular/core';

import { AccountsServices } from './accounts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  accounts: {name: string, status: string}[] = [];
  constructor(private accountsServices: AccountsServices) {}

  ngOnInit() {
    this.accounts = this.accountsServices.accounts;
  }
}

