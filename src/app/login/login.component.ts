import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { NgModel} from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  password: string = '';
  gmail: string = '';
  constructor(private firestore: AngularFireDatabase, private route : Router, public auth:AngularFireAuth) { }
  ngOnInit(): void {
  }

//this.profileForm.value
  submit(){
    this.auth.authState
    this.auth.signInWithEmailAndPassword(this.gmail, this.password)
    .catch(error => console.log(error.code))
    .then(res => this.route.navigate(['/main']))
}}
