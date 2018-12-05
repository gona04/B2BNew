import { NgModule } from '@angular/core';
import {MatButtonModule, MatCheckboxModule, 
        MatInputModule, MatMenuModule, 
        MatTableModule, MatSortModule, 
        MatDialogModule, MatSnackBarModule, 
        MatBadgeModule, MatIconModule,
        MatTooltipModule, MatSliderModule, 
        MatDatepickerModule, MatNativeDateModule, 
        MatRadioModule, MatPaginatorModule, 
        MatCardModule, MatFormFieldModule, 
        MatSelectModule} from '@angular/material';


@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, 
            MatInputModule,MatMenuModule,  
            MatTableModule, MatSortModule,
            MatDialogModule, MatSnackBarModule, 
            MatBadgeModule, MatIconModule, 
            MatTooltipModule, MatSliderModule, 
            MatDatepickerModule, MatNativeDateModule, 
            MatRadioModule, MatPaginatorModule, 
            MatCardModule,MatFormFieldModule, 
            MatSelectModule],
            
 exports: [MatButtonModule, MatCheckboxModule, 
  MatInputModule,MatMenuModule,  
  MatTableModule, MatSortModule,
  MatDialogModule, MatSnackBarModule, 
  MatBadgeModule, MatIconModule, 
  MatTooltipModule, MatSliderModule, 
  MatDatepickerModule, MatNativeDateModule, 
  MatRadioModule, MatPaginatorModule, 
  MatCardModule,MatFormFieldModule, 
  MatSelectModule],


})
export class CustomMaterialModule { }
