import { LightningElement } from 'lwc';

export default class ParentsComponent extends LightningElement {
    students = [
        {name: 'Prince', cgpa: 8.6},
        {name: 'Aman', cgpa: 7.2},
        {name: 'Samar', cgpa: 9.4},
        {name: 'Neha', cgpa: 5.7},
        {name: 'Rahul', cgpa: 6.8},
        {name: 'Priya', cgpa: 7.6}

    ]

    dataFromChild(event){
        console.log('Event from Parent Component', event);
        console.log('Student : ',JSON.stringify(event.detail));
    }
}