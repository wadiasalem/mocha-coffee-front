import { Injectable } from '@angular/core';

interface sort{
  name : String,
  sort_by : String,
  value : String
}

@Injectable({
  providedIn: 'root'
})
export class Sort {

  sort : Array<sort>= [
    {
      name : '-Select-',
    sort_by :'id',
    value : 'asc'
    },
    { name : 'Name, A to Z',
    sort_by :'name',
    value : 'asc'},

    { name : 'Name, Z to A',
    sort_by :'name',
    value : 'desc'},

    { name : 'Ascending Price',
    sort_by :'price',
    value : 'asc'},

    { name : 'Descending Price',
    sort_by :'price',
    value : 'desc'}
    
  ];

  constructor() { }

  getSort(){
    return this.sort ;
  }
}
