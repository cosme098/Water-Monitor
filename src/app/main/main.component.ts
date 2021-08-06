import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Label, MultiDataSet, Color } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { ServicoService } from './servico.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  doughnutChartLabels: Label[] = ['Cheias', 'Secas',];
  doughnutChartData: MultiDataSet = [
    [0, 0],
  ];
  public pieChartColors: Array<any> = [{
    backgroundColor: ['#00BB2D', '#FF2800',],
    borderColor: ['#ffffff', '#ffffff',]
  }];

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  }
  doughnutChartType: ChartType = 'doughnut';
  registro = new FormGroup({
    nome: new FormControl(null, Validators.required),
    enderecoMac: new FormControl(null, Validators.required),
    endereco: new FormControl(null, Validators.required)
  });
  sensores: any = [];
  total: any ;
  sensoresSeco: any;
  constructor(private servico: ServicoService, private firestore: AngularFireDatabase) { }

  ngOnInit() {
    
    this.sensores = []
    this.firestore.object('/sensor').valueChanges().subscribe((sensores: any) => {
      console.log(sensores);
      this.sensores = sensores == null ? [] : Object.values(sensores);
      var aberta = []
      var fechado = []

this.sensores.map((valor : any)=>{
	if(valor.state === true){
  aberta.push(valor)
 
}else if(valor.state === false){
	fechado.push(valor)

}
})
let fechados = aberta.length;
let abertas = fechado.length;
this.total = [fechados, abertas]
this.doughnutChartData = [this.total]
this.sensoresSeco = this.sensores.filter(this.boxSeco);
console.log(this.sensoresSeco);
console.log(this.sensores);
    });
  }

   boxSeco (value : any) {
    if (value.state == false) 
    return value;
}

  submit() {
    let item = {
      nome: this.registro.value.nome,
      enderecoMac: this.registro.value.enderecoMac,
      endereco: this.registro.value.endereco,
      state: false,
      waiting: false,
    }
    if (this.registro.valid) {
      this.servico.Create(item)
    }
  }

  formatNameAll(item: any) {
    if(window.innerWidth <= 600){
      return item.substring(0, 10) + "..."
    }
    else {
      return item;
    } 
  }
  formatNameOne(item: any) {
    if(window.innerWidth <= 600){
      return item.substring(0, 10) + "..."
    }
    else {
      return item;
    } 
  }
  tst(iten : any){
    console.log(iten);
    
  }
  
  pendent(iten : any){
    iten.waiting = !iten.waiting 
    this.servico.pendentes(iten)
  }
}
