import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { Order } from '../models';
import { PizzaService } from '../pizza.service';

const SIZES: string[] = [
  "Personal - 6 inches",
  "Regular - 9 inches",
  "Large - 12 inches",
  "Extra Large - 15 inches"
]

const PizzaToppings: string[] = [
    'chicken', 'seafood', 'beef', 'vegetables',
    'cheese', 'arugula', 'pineapple'
]

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  form!: FormGroup
  topppingsArrayCtrl!: FormArray
  selectedToppings!: []

  pizzaSize = SIZES[0]

  constructor(private fb: FormBuilder, private pizzaSvc: PizzaService) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: this.fb.control<string>('', [Validators.required]),
      email: this.fb.control<string>('', [Validators.required, Validators.email]),
      size: this.fb.control<number>(0, [Validators.required]),
      base: this.fb.control<string>('', [Validators.required]),
      sauce: this.fb.control<string>('', [Validators.required]),
      toppings: new FormArray([]),
      comments: this.fb.control<string>('')
    })
  }

  updateSize(size: string) {
    this.pizzaSize = SIZES[parseInt(size)]
  }

  processOrder(){
    const order = this.form.value as Order
    console.info('>>order submitted: ', order)
    this.pizzaSvc.createOrder(order)
  }

  getAllOrders() {
    const email = this.form.controls['email']
    this.pizzaSvc.getOrders(email)
  }

  onCheckBoxChange(event: any) {
    const toppings = this.form.controls['toppings'] as FormArray
    if (event.target.checked) {
      toppings.push(new FormControl(event.target.value));
    } else {
      const index = toppings.controls
      .findIndex(x => x.value === event.target.value);
      toppings.removeAt(index);
    }
  }


  private createForm() {
    this.topppingsArrayCtrl = this.fb.array([])
    return this.fb.group({
      name: this.fb.control<string>('', [Validators.required]),
      email: this.fb.control<string>('', [Validators.required, Validators.email]),
      size: this.fb.control<number>(0, [Validators.required]),
      base: this.fb.control<string>('', [Validators.required]),
      sauce: this.fb.control<string>('', [Validators.required]),
      toppings: this.topppingsArrayCtrl,
      comments: this.fb.control<string>('')
    })

  }



}
