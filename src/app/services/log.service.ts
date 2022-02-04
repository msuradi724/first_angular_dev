import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable,of } from 'rxjs';

import { Log } from '../models/log';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  logs: Log[];

  private logSource = new BehaviorSubject<Log>({id: '', text: '', date: null});
  selectedLog = this.logSource.asObservable();

  private stateSource = new BehaviorSubject<boolean>(true);
  stateClear = this.stateSource.asObservable();

  constructor() { 
    // this.logs = [
    //   {
    //     id: '1',
    //     text: 'Generated Component',
    //     date: new Date ('01/29/2022 15:15:50')
    //   },
    //   {
    //     id: '2',
    //     text: 'Added Bootstrap',
    //     date: new Date ('01/29/2022 16:15:50')
    //   },
    //   {
    //     id: '3',
    //     text: 'Added JS',
    //     date: new Date ('01/29/2022 17:15:50')
    //   }
    // ]
    this.logs = [];
  }

  getLogs(): Observable<Log[]>{
    if(localStorage.getItem('logs') === null){
      this.logs = [];
    }else {
      //this.logs = JSON.parse(localStorage.getItem('logs'));
      const data = JSON.parse(localStorage.getItem('logs') || '{}');
      this.logs = data;
    }
    //return this.logs;
    return of(this.logs.sort((curD,newD) => {
      return newD.date = curD.date;
    }));
  }

  setFormLog(log: Log){
    this.logSource.next(log);
  }

  addLog(log: Log){
    this.logs.unshift(log);

    //Add to local storage
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  updateLog(log: Log){
    this.logs.forEach((cur, index) => {
      if(log.id === cur.id){
        this.logs.splice(index,1);
      }
    });
    this.logs.unshift(log);

    //update localstorage
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  deleteLog(log: Log){
    this.logs.forEach((cur, index) => {
      if(log.id === cur.id){
        this.logs.splice(index,1);
      }
    });

    //Delete localstorage
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  clearState(){
    this.stateSource.next(true);
  }

}
