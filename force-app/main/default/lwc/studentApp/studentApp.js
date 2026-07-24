import { LightningElement } from 'lwc';

export default class StudentApp extends LightningElement {
    page = 'dashboard';
    isLoggedIn = false;
    showSignup = false;

    loginUser() {
        this.isLoggedIn = true;
        this.showSignup = false;
    }

    logoutUser() {
        this.isLoggedIn = false;
        this.showSignup = false;
    }

    goToSignup() {
        this.showSignup = true;
    }

    goToLogin() {
        this.showSignup = false;
    }

    handleSignup() {
        this.showSignup = false;
        this.isLoggedIn = true;
        this.page = 'dashboard';
    }

    changeTab(event) {
        this.page = event.detail.tab;
    }

    get isStudents() {
        return this.page === 'students';
    }

    get isDashboard() {
        return this.page === 'dashboard' || this.page === '';
    }

    get isCompany() {
        return this.page === 'companies';
    }
}