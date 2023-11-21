import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComunicacionService {

  private viewSubject = new Subject<string>();
  private botonSubject = new Subject<boolean>();
  
  sendView(view: string) {
    this.viewSubject.next(view);
  }

  getView() {
    return this.viewSubject.asObservable();
  }

  sendButton(show: boolean){
    this.botonSubject.next(show);
  }

  getButton(){
    return this.botonSubject.asObservable();
  }
}
