
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
interface item {
  items : Array<{
    id :number
    name : string,
    price : number,
    quantity :number
  }>,
  length : number,
  total : number
}
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  food : BehaviorSubject<any> ;

  constructor() {
    let foodString = localStorage.getItem('food');
    if(foodString)
      this.food = new BehaviorSubject(JSON.parse(foodString ) );
    else
      this.food = new BehaviorSubject({items : [],length :0,total : 0});
  }

  add(id:string,quantity:number,name : string , price : number){
    let food = this.food.getValue();
    if(!food.items[id]){
      food.items[id]={
        id : id,
        name : name,
        price : price,
        quantity : quantity
      }
      this.food.next(food);
    }else{
      food.items[id].quantity +=  quantity;
      this.food.next(food);
    }
    food.length += quantity ;
    food.total+=quantity*price;
    this.store();
  }

  getAll():Observable<item>{
    return this.food.asObservable();
  }

  getfood(){
    return this.food.value;
  }

  clearfood(){
    this.food.next({items : [],length :0,total : 0}) ;
    localStorage.removeItem('food');
  }

  store(){
    localStorage.setItem('food',JSON.stringify(this.food.getValue()));
  }

  update(food : any ){
    this.food.next(food) ;
    this.store();
  }

}
