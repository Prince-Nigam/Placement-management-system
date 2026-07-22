import { LightningElement } from 'lwc';

export default class StudentApp extends LightningElement {
    isLoggedIn = false;

    loginUser() {
        this.isLoggedIn = true;
    }
    
    logoutUser() {
        this.isLoggedIn = false;
    }
}