import { LightningElement, wire } from 'lwc';
import getAllStudent from '@salesforce/apex/StudentController.getAllStudent';

export default class FirstComponent extends LightningElement {

    @wire(getAllStudent)
    wiredStudent({ error, data }) {
        if (data) {
            console.log('Data : ', data);
        } else if (error) {
            console.log('Error : ', error);
        }
    }
}