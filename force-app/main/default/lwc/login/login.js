import { LightningElement, track } from 'lwc';

const VALID_USERNAME = 'hn878282@gmail.com';
const VALID_PASSWORD = 'admin@123';

export default class Login extends LightningElement {
    @track username     = '';
    @track password     = '';
    @track errorMessage = '';
    @track isLoading    = false;
    @track showPass     = false;

    handleUsername(e) { this.username     = e.target.value; this.errorMessage = ''; }
    handlePassword(e) { this.password     = e.target.value; this.errorMessage = ''; }

    togglePassword() { this.showPass = !this.showPass; }

    get passwordType() { return this.showPass ? 'text' : 'password'; }
    get passwordIcon() { return this.showPass ? 'utility:hide' : 'utility:preview'; }

    loginUser() {
        this.errorMessage = '';
        const username = this.username.trim();
        const password = this.password;

        if (!username || !password) {
            this.errorMessage = 'Please enter your email and password.';
            return;
        }

        this.isLoading = true;
        setTimeout(() => {
            this.isLoading = false;
            if (username !== VALID_USERNAME || password !== VALID_PASSWORD) {
                this.errorMessage = 'Invalid email or password. Please try again.';
                return;
            }
            this.dispatchEvent(new CustomEvent('login'));
        }, 900);
    }

    goToSignup() {
        this.dispatchEvent(new CustomEvent('gosignup'));
    }
}
