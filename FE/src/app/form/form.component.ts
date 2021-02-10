
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppService } from '../service/app.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  link = '';
  isLoading = false;
  formView: boolean;
  welcomeMessage: boolean;
  gatherDataSub: Subscription;

  constructor(private appService: AppService) { }

  ngOnInit(): void { }

  generate(form: NgForm) {
    this.appService.getData(this.link)
    form.reset();
  }


}
