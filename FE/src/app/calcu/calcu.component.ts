import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { AppService } from "../service/app.service";

@Component({
  selector: 'app-calcu',
  templateUrl: './calcu.component.html',
  styleUrls: ['./calcu.component.css']
})
export class CalcuComponent implements OnInit {
  data: [];
  dataObject: any;
  reducedSize: any;
  reducedGHG: any;
  time: any;
  usage: any;
  coeff: any;
  tree: any;
  person: any;
  car: any;
  phone: any;
  plastic: any;
  reducedGHGForAccenturePop: any;
  loadingSub: Subscription;

  isLoading = false;
  isResponseData = false;
  isGenerate = false;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.appService.isLoadingListener()
      .subscribe(
        (isLoading) => {
          this.isLoading = isLoading
        }
      )

    this.appService.isResponseDataListener()
      .subscribe(
        (isResponseData) => {
          if (isResponseData) {
            this.isResponseData = true;
          }
        }
      )

    this.appService.isGenerateListener()
      .subscribe(
        (isGenerate) => {
          this.isGenerate = isGenerate;
        }
      )
  }

  onCalculate(form: NgForm) {
    this.reducedSize = parseFloat(form.value.reducedSize);


    this.data = this.appService.calcDataGatheredListener();
    this.dataObject = this.data[this.data.length - 1]
    this.time = this.dataObject.time
    this.usage = this.dataObject.population
    this.coeff = this.dataObject.coefficient

    // this.tree = this.dataObject.tree;
    // this.person = this.dataObject.person;
    // this.car = this.dataObject.car;
    // this.phone = this.dataObject.phone;
    // this.plastic = this.dataObject.plastic;

    this.reducedGHG = (this.coeff * this.reducedSize * this.time * this.usage).toFixed(0)

    this.reducedGHGForAccenturePop = (this.reducedGHG * 500000).toFixed(0)

    this.tree = (this.reducedGHGForAccenturePop / 21000).toFixed(0);
    this.person = (this.reducedGHGForAccenturePop / 14514960).toFixed(0);
    this.car = (this.reducedGHG / 404).toFixed(2);
    this.phone = (this.reducedGHG / 7.84).toFixed(0);
    this.plastic = (this.reducedGHG / 33).toFixed(0);

    this.isGenerate = false;


    form.reset();




  }

}
