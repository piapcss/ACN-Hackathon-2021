import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppService } from '../service/app.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit, OnDestroy {

  gatherDataSub: Subscription;
  loadingSub: Subscription;

  data: any;
  GHG: any;
  isLoading: false;
  sizeInKiB: any;
  errorMessage: any;
  welcomeMessage: boolean;
  urlLink: any;
  trees: any;
  person: any;
  car: any;
  phone: any;
  plastic: any;
  GHGAccenturePop: any;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.welcomeMessage = true;
    this.loadingSub = this.appService.isLoadingListener()
      .subscribe(
        (isLoading) => {
          this.isLoading = isLoading
          this.welcomeMessage = false;
        }
      )

    this.gatherDataSub = this.appService.getDataGatheredListener()
      .subscribe(
        (dataGathered) => {

          if (dataGathered.errorMessage) {
            this.errorMessage = dataGathered.errorMessage;
            console.log(this.errorMessage);
            return
          }
          this.data = dataGathered;
          this.GHG = parseInt(dataGathered.carbonFootprint)
          this.sizeInKiB = (dataGathered.size * 1000) / 1024;
          this.errorMessage = null;
          this.welcomeMessage = false;
          this.urlLink = dataGathered.URL;

          this.GHGAccenturePop = (this.GHG * 500000).toFixed(0)

          this.trees = (this.GHGAccenturePop / 21000).toFixed(0)
          this.person = (this.GHGAccenturePop / 14514960).toFixed(0)
          this.car = dataGathered.car
          this.phone = dataGathered.phone
          this.plastic = (dataGathered.plastic).toFixed(0)
        }
      )
  }


  ngOnDestroy() {
    this.gatherDataSub.unsubscribe();
    this.loadingSub.unsubscribe();
  }
}
