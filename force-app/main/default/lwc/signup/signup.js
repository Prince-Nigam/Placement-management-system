import { LightningElement, track } from 'lwc';

export default class Signup extends LightningElement {
    @track fullName       = '';
    @track email          = '';
    @track password       = '';
    @track confirmPassword = '';
    @track errorMessage   = '';
    @track successMessage = '';
    @track isLoading      = false;
    @track showPass       = false;

    handleFullName(e)  { this.fullName        = e.target.value; this.errorMessage = ''; }
    handleEmail(e)     { this.email           = e.target.value; this.errorMessage = ''; }
    handlePassword(e)  { this.password        = e.target.value; this.errorMessage = ''; }
    handleConfirm(e)   { this.confirmPassword = e.target.value; this.errorMessage = ''; }

    togglePassword() { this.showPass = !this.showPass; }

    get passwordType() { return this.showPass ? 'text' : 'password'; }
    get passwordIcon() { return this.showPass ? 'utility:hide' : 'utility:preview'; }

    /* password strength */
    get showStrength() { return this.password.length > 0; }

    get strengthLevel() {
        const p = this.password;
        if (p.length < 6) return 1;
        let score = 0;
        if (p.length >= 8)              score++;
        if (/[A-Z]/.test(p))            score++;
        if (/[0-9]/.test(p))            score++;
        if (/[^A-Za-z0-9]/.test(p))     score++;
        if (score <= 1) return 1;
        if (score === 2) return 2;
        return 3;
    }

    get strengthLabel()    { return ['', 'Weak', 'Good', 'Strong'][this.strengthLevel]; }
    get strengthFillClass(){ return `strength-fill strength-${['','weak','good','strong'][this.strengthLevel]}`; }
    get strengthLabelClass(){ return `strength-text strength-text-${['','weak','good','strong'][this.strengthLevel]}`; }

    /* confirm match indicator */
    get passwordsMatch()  { return this.password === this.confirmPassword; }
    get confirmIcon()     { return this.passwordsMatch ? 'utility:check' : 'utility:close'; }
    get confirmIconClass(){ return this.passwordsMatch ? 'confirm-icon confirm-ok' : 'confirm-icon confirm-err'; }
    get confirmClass()    {
        if (!this.confirmPassword) return 'field-input';
        return this.passwordsMatch ? 'field-input input-ok' : 'field-input input-err';
    }
    get passwordClass()   { return 'field-input'; }

    handleSignup() {
        this.errorMessage  = '';
        this.successMessage = '';

        const name    = this.fullName.trim();
        const email   = this.email.trim();
        const pass    = this.password;
        const confirm = this.confirmPassword;

        if (!name || !email || !pass || !confirm) {
            this.errorMessage = 'Please fill in all fields.';
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            this.errorMessage = 'Please enter a valid email address.';
            return;
        }
        if (pass.length < 6) {
            this.errorMessage = 'Password must be at least 6 characters.';
            return;
        }
        if (pass !== confirm) {
            this.errorMessage = 'Passwords do not match.';
            return;
        }

        this.isLoading = true;
        /* Simulate a brief registration delay then fire event */
        setTimeout(() => {
            this.isLoading      = false;
            this.successMessage = `Welcome, ${name}! Account created successfully.`;
            setTimeout(() => {
                this.dispatchEvent(new CustomEvent('signup', {
                    detail: { name, email }
                }));
            }, 900);
        }, 1200);
    }

    goToLogin() {
        this.dispatchEvent(new CustomEvent('gologin'));
    }
}
