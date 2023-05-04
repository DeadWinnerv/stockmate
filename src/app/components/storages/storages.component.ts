import { Component } from '@angular/core';
import { Storage } from 'src/app/models/storage';
import {MatDialog} from '@angular/material/dialog';
import { STORAGES } from 'src/app/constants/STORAGES';

@Component({
  selector: 'app-storages',
  templateUrl: './storages.component.html',
  styleUrls: ['./storages.component.scss'],
})
export class StoragesComponent {

  activeStorage: number | null = null
  isDialogueOpen: boolean = false
  storages: Storage[] = STORAGES

  openDialogue() {
    this.isDialogueOpen = !this.isDialogueOpen
  }
}

