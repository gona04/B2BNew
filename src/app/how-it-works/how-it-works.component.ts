import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/components/common/treenode';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.scss'],
  providers:[MessageService]
})
export class HowItWorksComponent implements OnInit {
  data: TreeNode[];

  ngOnInit() {
      this.data = [{
          label: 'You Register Your Company',
          children: [
              {
                  label: 'Admin Varifies',
                  children: [
                      {
                          label: 'Add Employees', type: 'person'
                      },
                      {
                          label: 'Hier Employees', type: 'person'
                      }
                  ]
              },
              // {
              //     label: 'Child 2',
              //     children: [
              //         {
              //             label: 'Child 2.1', type: 'leaf'
              //         },
              //         {
              //             label: 'Child 2.2', type: 'leaf'
              //         }
              //     ]
              // }
          ]
      }];
}
}