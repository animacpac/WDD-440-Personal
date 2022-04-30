import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.css']
})
export class UsernameComponent implements OnInit {
  allowNewUser = false;
  usernameCreationStatus = 'No Username created';
  username = 'Username'
  constructor() { 
    setTimeout(() => {
    this.allowNewUser = true;
  }, 2000)}

  ngOnInit(): void {
  }
  onCreateUsername() {
    this.usernameCreationStatus = 'Your username is' + this.username;
  }
  onUpdateUsername(event: any) {
    this.username = (<HTMLInputElement>event.target).value;
  }

}

