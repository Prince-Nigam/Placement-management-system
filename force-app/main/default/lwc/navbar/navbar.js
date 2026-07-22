 import { LightningElement } from 'lwc';

export default class Navbar extends LightningElement {
    logoutUser() {
        this.dispatchEvent(new CustomEvent('logout'));
        
    }
}