import { LightningElement } from 'lwc';

export default class FirstComponent extends LightningElement {
    name = ' ';
    rollNo = ' ';

    storeName(event){
        this.name = event.target.value;
        console.log("Name : ",this.name);
    }

    storeRollNo(event){
        this.rollNo = event.target.value;
        console.log('Roll No : ',this.rollNo);
    }

    createstudent(){
        alert(`Student Created Successfully. Name : ${this.name} Roll Number : ${this.rollNo}`);
    }
}