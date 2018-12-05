import { NgModule } from '@angular/core';
import {TableModule} from 'primeng/table';
import {OrganizationChartModule} from 'primeng/organizationchart';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {CarouselModule} from 'primeng/carousel';
import {ToastModule} from 'primeng/toast';
import {DataViewModule } from 'primeng/dataview';
import {PanelModule} from 'primeng/panel';
import {AccordionModule} from 'primeng/accordion';  
import {DropdownModule} from 'primeng/dropdown';   


@NgModule({
  imports: [TableModule, OrganizationChartModule,
            MessageModule, MessagesModule,
            CarouselModule, ToastModule, 
            DataViewModule, PanelModule,
            AccordionModule, DropdownModule,],
            
 exports: [TableModule, OrganizationChartModule,
          MessageModule, MessagesModule,
          CarouselModule, ToastModule,
          DataViewModule, PanelModule,
          AccordionModule, DropdownModule,],

})
export class CustomPrimeNgModule { }
