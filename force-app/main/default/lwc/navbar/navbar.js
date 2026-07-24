 import { LightningElement, track } from 'lwc';

export default class Navbar extends LightningElement {
    @track activeTab = 'dashboard';

    logoutUser() {
        this.dispatchEvent(new CustomEvent('logout'));
    }

    tabClick(event) {
        this.activeTab = event.target.dataset.name;
        this.dispatchEvent(new CustomEvent('tabchange', {
            detail: { tab: this.activeTab }
        }));
    }

    get dashboardClass() {
        return this.activeTab === 'dashboard' ? 'tab-btn tab-active' : 'tab-btn';
    }

    get studentsClass() {
        return this.activeTab === 'students' ? 'tab-btn tab-active' : 'tab-btn';
    }

    get companiesClass() {
        return this.activeTab === 'companies' ? 'tab-btn tab-active' : 'tab-btn';
    }
}
