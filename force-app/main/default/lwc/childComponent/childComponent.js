import { api, LightningElement } from 'lwc';

export default class ChildComponent extends LightningElement {
    @api
    childstudent = [];

    sendDataToParent(event) {
        console.log('Name :',event.target.dataset.name);
        const student = this.childstudent.filter(st => {
            return st.name === event.target.dataset.name
        })

        const c = new CustomEvent('selectstudent', {
                detail : student
        });
        this.dispatchEvent(c);
         
    }
}