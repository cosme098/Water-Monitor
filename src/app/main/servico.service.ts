import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  constructor(private firestore: AngularFireDatabase) { }
  Create(item: any) {
    console.log(item);
    //item.key = item.enderecoMac;
    this.firestore.object('sensor').update({ [item.enderecoMac]: item }).then((result: any) => {
      console.log('deu certo')
    })
  }
  pendentes(item: any) {
    this.firestore.database.ref(`sensor/${item.enderecoMac}`).update({'waiting': item.waiting}).then((result: any) => {
        console.log(result);
        
      console.log('deu certo')
    })
  }
  GetStudentsList() {
    return this.firestore.object('/sensor').valueChanges()
  }
}
