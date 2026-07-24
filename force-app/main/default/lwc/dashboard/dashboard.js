import { LightningElement, track } from 'lwc';

const AVATAR_COLORS = ['#4dabf7', '#5dcaa5', '#ef9f27', '#f87171', '#a78bfa', '#818cf8', '#fb923c'];

const ALL_STUDENTS = [
    { id:  1, name: 'Aman Jaiswal',    rollNo: 'CS2101', branch: 'Computer Science', cgpa: 9.2, company: 'Google',           role: 'SDE-1',              package: 45, status: 'Placed'   },
    { id:  2, name: 'Priya Sharma',    rollNo: 'IT2102', branch: 'Information Tech',  cgpa: 8.7, company: 'Microsoft',        role: 'Software Engineer',  package: 38, status: 'Placed'   },
    { id:  3, name: 'Rahul Verma',     rollNo: 'EC2103', branch: 'Electronics',       cgpa: 7.9, company: 'Infosys',          role: 'Systems Engineer',   package: 12, status: 'Placed'   },
    { id:  4, name: 'Sneha Patel',     rollNo: 'CS2104', branch: 'Computer Science',  cgpa: 8.1, company: 'Wipro',            role: 'Developer',          package: 10, status: 'Placed'   },
    { id:  5, name: 'Vikram Singh',    rollNo: 'ME2105', branch: 'Mechanical',        cgpa: 6.8, company: '—',                role: '—',                  package: 0,  status: 'Pending'  },
    { id:  6, name: 'Anjali Gupta',    rollNo: 'CS2106', branch: 'Computer Science',  cgpa: 9.5, company: 'Amazon',           role: 'SDE-2',              package: 52, status: 'Placed'   },
    { id:  7, name: 'Rohan Mehta',     rollNo: 'IT2107', branch: 'Information Tech',  cgpa: 7.2, company: '—',                role: '—',                  package: 0,  status: 'Pending'  },
    { id:  8, name: 'Kavya Reddy',     rollNo: 'CS2108', branch: 'Computer Science',  cgpa: 9.0, company: 'Astrea IT',        role: 'Full Stack Dev',     package: 18, status: 'Placed'   },
    { id:  9, name: 'Arjun Nair',      rollNo: 'EC2109', branch: 'Electronics',       cgpa: 8.3, company: 'TCS',              role: 'Associate Engineer', package: 7,  status: 'Placed'   },
    { id: 10, name: 'Pooja Iyer',      rollNo: 'CS2110', branch: 'Computer Science',  cgpa: 8.9, company: 'Flipkart',         role: 'SDE-1',              package: 28, status: 'Placed'   },
    { id: 11, name: 'Deepak Yadav',    rollNo: 'ME2111', branch: 'Mechanical',        cgpa: 7.1, company: '—',                role: '—',                  package: 0,  status: 'Opted Out'},
    { id: 12, name: 'Nisha Kapoor',    rollNo: 'IT2112', branch: 'Information Tech',  cgpa: 8.4, company: 'Capgemini',        role: 'Analyst',            package: 9,  status: 'Placed'   },
    { id: 13, name: 'Siddharth Roy',   rollNo: 'CS2113', branch: 'Computer Science',  cgpa: 7.6, company: 'HCL Technologies', role: 'Software Engineer',  package: 8,  status: 'Placed'   },
    { id: 14, name: 'Meera Joshi',     rollNo: 'CV2114', branch: 'Civil',             cgpa: 7.4, company: '—',                role: '—',                  package: 0,  status: 'Opted Out'},
    { id: 15, name: 'Aditya Kumar',    rollNo: 'CS2115', branch: 'Computer Science',  cgpa: 9.3, company: 'Salesforce',       role: 'Associate SWE',      package: 42, status: 'Placed'   },
];

export default class Dashboard extends LightningElement {
    @track searchTerm = '';
    @track activeFilter = 'all';

    get filteredStudents() {
        return this.enrichedStudents.filter(s => {
            const term = this.searchTerm.toLowerCase();
            const matchesSearch = !term ||
                s.name.toLowerCase().includes(term) ||
                s.company.toLowerCase().includes(term) ||
                s.branch.toLowerCase().includes(term);

            const matchesFilter =
                this.activeFilter === 'all' ||
                (this.activeFilter === 'placed'   && s.status === 'Placed')    ||
                (this.activeFilter === 'pending'  && s.status === 'Pending')   ||
                (this.activeFilter === 'optedout' && s.status === 'Opted Out');

            return matchesSearch && matchesFilter;
        });
    }

    get totalStudents()   { return ALL_STUDENTS.length; }
    get placedCount()     { return ALL_STUDENTS.filter(s => s.status === 'Placed').length; }
    get pendingCount()    { return ALL_STUDENTS.filter(s => s.status === 'Pending').length; }
    get optedOutCount()   { return ALL_STUDENTS.filter(s => s.status === 'Opted Out').length; }
    get placementRate()   { return Math.round((this.placedCount / this.totalStudents) * 100); }
    get rateBarStyle()    { return `width:${this.placementRate}%;`; }
    get filteredCount()   { return this.filteredStudents.length; }
    get isEmpty()         { return this.filteredStudents.length === 0; }

    get avgPackage() {
        const placed = ALL_STUDENTS.filter(s => s.package > 0);
        if (!placed.length) return 0;
        const avg = placed.reduce((sum, s) => sum + s.package, 0) / placed.length;
        return avg.toFixed(1);
    }

    get topCompanies() {
        const map = {};
        ALL_STUDENTS.filter(s => s.status === 'Placed').forEach(s => {
            map[s.company] = (map[s.company] || 0) + 1;
        });
        return Object.entries(map)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 4)
            .map(([name, count]) => ({ name, count, key: name }));
    }

    get enrichedStudents() {
        return ALL_STUDENTS.map((s, i) => {
            const initials = s.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
            const color = AVATAR_COLORS[i % AVATAR_COLORS.length];
            const statusClass =
                s.status === 'Placed'    ? 'status-badge status-placed'    :
                s.status === 'Opted Out' ? 'status-badge status-optedout'  :
                'status-badge status-pending';
            return {
                ...s,
                initials,
                avatarStyle: `background:${color};`,
                companyInitial: s.company !== '—' ? s.company[0].toUpperCase() : '—',
                companyLogoStyle: `background:${color};`,
                cgpaClass: s.cgpa >= 8.5 ? 'cgpa-badge cgpa-high' : s.cgpa >= 7 ? 'cgpa-badge cgpa-mid' : 'cgpa-badge cgpa-low',
                statusClass,
                packageDisplay: s.package > 0 ? `${s.package} LPA` : '—',
            };
        });
    }

    get allFilterClass()      { return this.activeFilter === 'all'      ? 'filter-btn filter-active' : 'filter-btn'; }
    get placedFilterClass()   { return this.activeFilter === 'placed'   ? 'filter-btn filter-active' : 'filter-btn'; }
    get pendingFilterClass()  { return this.activeFilter === 'pending'  ? 'filter-btn filter-active' : 'filter-btn'; }
    get optedOutFilterClass() { return this.activeFilter === 'optedout' ? 'filter-btn filter-active' : 'filter-btn'; }

    handleSearch(event) { this.searchTerm = event.target.value; }
    filterAll()      { this.activeFilter = 'all'; }
    filterPlaced()   { this.activeFilter = 'placed'; }
    filterPending()  { this.activeFilter = 'pending'; }
    filterOptedOut() { this.activeFilter = 'optedout'; }
}
