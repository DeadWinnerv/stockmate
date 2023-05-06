import { Component, OnInit } from '@angular/core';
import { Storage, TSchedule } from 'src/app/models/storage';
import { MatDialog } from '@angular/material/dialog';
import { MainService } from 'src/app/services/main.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-storages',
  templateUrl: './storages.component.html',
  styleUrls: ['./storages.component.scss'],
})
export class StoragesComponent implements OnInit {
  registerError: any;
  isErrorDisplay: boolean = false;

  storageForm: FormGroup;
  activeStorage: number | null = null;
  isDialogueOpen: boolean = false;
  storages: Storage[] = [];
  schedule: TSchedule[] = [false, false, false, false, false, false, false];
  aSub: Subscription;
  constructor(private service: MainService) {}

  openDialogue() {
    this.isDialogueOpen = !this.isDialogueOpen;
  }
  handleSchedule(index: any) {
    this.schedule[index] = !this.schedule[index];
  }
  submitAdd() {
    this.storageForm.disable();
    console.log(this.storageForm.value);
    this.aSub = this.service.addStorage(this.storageForm.value).subscribe({
      next: () => {
        this.loadStorages();
        this.openDialogue();
      },
      error: (error) => {
        this.isErrorDisplay = true;
        this.registerError = error.error.msg;
          console.warn(error);
          this.storageForm.enable();
      },
    });
  }
  removeStorage(id: String) {
    this.service.removeStorage(id).subscribe({
      next: () => {
        this.loadStorages();
      },
      error: (error) => {
        console.warn(error);
        this.storageForm.enable();
      },
    });
  }
  loadStorages() {
    this.service.getStorages().subscribe((res: any) => {
      this.storages = res;
    });
  }
  ngOnInit(): void {
    this.loadStorages();
    this.storageForm = new FormGroup({
      name: new FormControl('Иваново', [
        Validators.required,
        Validators.pattern(/^[а-яa-z ,.'-{1,20}$]+$/i),
      ]),
      address: new FormControl('Пушкина 7', [
        Validators.required,
        Validators.pattern(/^[а-я ,.'-{1,20}$]+$/i),
      ]),
      phone: new FormControl('89521081098', [
        Validators.pattern(/(?:\+|\d)[\d\-\(\) ]{9,}\d/g),
      ]),
      email: new FormControl('diga@sd.ru', [
        Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/),
      ]),
      schedule: new FormControl(this.schedule, [Validators.required]),
      isActive: new FormControl(true),
    });
  }
  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }
}
