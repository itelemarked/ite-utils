import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { isFunction, isNumber, isPlainObject } from './utils/validation';





type Point = {
  x: number,
  y: number
}


const isInterface = <T extends Record<string, any>>(val: any, fns: Record<string, ((arg: any) => boolean)[]>): val is T => {
  // check if 'val' is a PlainObject
  if(!isPlainObject(val)) return false

  // *************************************
  // CHECK IF 'VAL' HAS ALL REQUIRED KEYS
  // VARIANTE 1:
  // const requiredKeys = Object.entries(fns).filter(([_, values]) => !values.map(v => v.name).includes('isOptional')).map(([key, values]) => key)
  // console.log(requiredKeys)
  // VARIANTE 2:
  const optionalKeys = Object.entries(fns).filter(([key, values]) => values.map(v => v.name).includes('isOptional')).map(([key, values]) => key)
  const requiredKeys = Object.keys(fns).filter(key => !optionalKeys.includes(key))

  if(!requiredKeys.every(requiredKey => Object.keys(val).includes(requiredKey))) return false
  // *************************************

  // CHECK IF EVERY PROPS OF 'val' FULLFILLS THE REQUIRED CONDITIONS ('isOptional' ALWAYS FULLFILLS SINCE IT RETURNS TRUE ANYWAY)
  return Object.entries(val).every(([key, value]) => fns[key].every(fn => fn(value)))
}



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ITE-UTILS';


  constructor() {}


}
