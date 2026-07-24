import { LightningElement, track } from 'lwc';

const LOGO_COLORS = ['#4dabf7', '#5dcaa5', '#ef9f27', '#f87171', '#a78bfa', '#818cf8', '#fb923c', '#34d399', '#f472b6', '#60a5fa'];

const RAW_COMPANIES = [
    { id:  1, companyName: 'Google',           hrEmail: 'campus@google.com',       jobRole: 'Software Engineer',       minCgpa: 8.0, package: 45, domain: 'Product',  driveDate: '2025-09-10', openPositions: 5,  eligibleBranches: 'CS, IT' },
    { id:  2, companyName: 'Microsoft',         hrEmail: 'campus@microsoft.com',    jobRole: 'Software Developer',      minCgpa: 7.5, package: 38, domain: 'Product',  driveDate: '2025-09-18', openPositions: 8,  eligibleBranches: 'CS, IT, EC' },
    { id:  3, companyName: 'Amazon',            hrEmail: 'campus@amazon.com',       jobRole: 'SDE-1',                   minCgpa: 7.5, package: 32, domain: 'Product',  driveDate: '2025-09-25', openPositions: 10, eligibleBranches: 'CS, IT' },
    { id:  4, companyName: 'Salesforce',        hrEmail: 'campus@salesforce.com',   jobRole: 'Associate Software Engg', minCgpa: 7.0, package: 42, domain: 'Product',  driveDate: '2025-10-05', openPositions: 4,  eligibleBranches: 'CS, IT' },
    { id:  5, companyName: 'Flipkart',          hrEmail: 'campus@flipkart.com',     jobRole: 'SDE-1',                   minCgpa: 7.0, package: 28, domain: 'Product',  driveDate: '2025-10-12', openPositions: 6,  eligibleBranches: 'CS, IT, EC' },
    { id:  6, companyName: 'TCS',               hrEmail: 'campus@tcs.com',          jobRole: 'Systems Engineer',        minCgpa: 6.0, package: 7,  domain: 'Service',  driveDate: '2025-08-20', openPositions: 50, eligibleBranches: 'All Branches' },
    { id:  7, companyName: 'Infosys',           hrEmail: 'campus@infosys.com',      jobRole: 'Systems Engineer',        minCgpa: 6.5, package: 12, domain: 'Service',  driveDate: '2025-08-28', openPositions: 30, eligibleBranches: 'All Branches' },
    { id:  8, companyName: 'Wipro',             hrEmail: 'campus@wipro.com',        jobRole: 'Developer',               minCgpa: 6.5, package: 10, domain: 'Service',  driveDate: '2025-09-05', openPositions: 25, eligibleBranches: 'CS, IT, EC' },
    { id:  9, companyName: 'Capgemini',         hrEmail: 'campus@capgemini.com',    jobRole: 'Analyst',                 minCgpa: 6.0, package: 9,  domain: 'Service',  driveDate: '2025-09-15', openPositions: 20, eligibleBranches: 'All Branches' },
    { id: 10, companyName: 'Astrea IT Services',hrEmail: 'prince@astreait.com',     jobRole: 'Full Stack Developer',    minCgpa: 7.5, package: 18, domain: 'Startup',  driveDate: '2025-10-20', openPositions: 3,  eligibleBranches: 'CS, IT' },
];

const DOMAINS = ['All', 'Product', 'Service', 'Startup'];

export default class Companies extends LightningElement {
    @track companies = [];
    @track selectedCompany = null;
    @track activeDomain = 'All';
    @track searchTerm = '';

    connectedCallback() {
        this.companies = RAW_COMPANIES.map((c, i) => ({
            ...c,
            logoInitial: c.companyName[0].toUpperCase(),
            logoStyle: `background:${LOGO_COLORS[i % LOGO_COLORS.length]};`,
            hrMailto: `mailto:${c.hrEmail}`,
            domainClass: c.domain === 'Product' ? 'domain-badge domain-product' :
                         c.domain === 'Startup' ? 'domain-badge domain-startup' :
                         'domain-badge domain-service',
        }));
    }

    get domainFilters() {
        return DOMAINS.map(d => ({
            label: d,
            key: d,
            cls: this.activeDomain === d ? 'filter-btn filter-active' : 'filter-btn',
        }));
    }

    get filteredCompanies() {
        const term = this.searchTerm.toLowerCase();
        return this.companies.filter(c => {
            const matchSearch = !term ||
                c.companyName.toLowerCase().includes(term) ||
                c.jobRole.toLowerCase().includes(term) ||
                c.eligibleBranches.toLowerCase().includes(term);
            const matchDomain = this.activeDomain === 'All' || c.domain === this.activeDomain;
            return matchSearch && matchDomain;
        });
    }

    get hasSelected() { return this.selectedCompany !== null; }

    showDetail(event) {
        const id = Number(event.currentTarget.dataset.id);
        this.selectedCompany = this.companies.find(c => c.id === id) || null;
    }

    closeDetail()       { this.selectedCompany = null; }
    stopProp(event)     { event.stopPropagation(); }
    filterDomain(event) { this.activeDomain = event.target.dataset.domain; }
    handleSearch(event) { this.searchTerm = event.target.value; }
}
