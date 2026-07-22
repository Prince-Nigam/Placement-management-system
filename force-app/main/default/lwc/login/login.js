import { LightningElement } from 'lwc';

export default class Login extends LightningElement {

    loginUser(event) {
        this.dispatchEvent(new CustomEvent('login'));
       
    }
}