import { LightningElement, track } from 'lwc';

const AVATAR_COLORS = ['#4dabf7', '#5dcaa5', '#ef9f27', '#f87171', '#a78bfa', '#818cf8', '#fb923c'];

const RAW_STUDENTS = [
    { id:  1, name: 'Aman Jaiswal',    rollNo: 'CS2101', branch: 'Computer Science', year: 4, cgpa: 9.2, skills: 'C,C++,Python,Java',          applications: 2, email: 'aman@college.edu',     phone: '9876543201', status: 'Placed'   },
    { id:  2, name: 'Priya Sharma',    rollNo: 'IT2102', branch: 'Information Tech',  year: 4, cgpa: 8.7, skills: 'C#,Python,HTML,CSS',          applications: 3, email: 'priya@college.edu',    phone: '9876543202', status: 'Placed'   },
    { id:  3, name: 'Rahul Verma',     rollNo: 'EC2103', branch: 'Electronics',       year: 4, cgpa: 7.9, skills: 'C,Python,AWS,VHDL',           applications: 4, email: 'rahul@college.edu',    phone: '9876543203', status: 'Placed'   },
    { id:  4, name: 'Sneha Patel',     rollNo: 'CS2104', branch: 'Computer Science',  year: 4, cgpa: 8.1, skills: 'Java,Spring,MySQL,Docker',     applications: 1, email: 'sneha@college.edu',    phone: '9876543204', status: 'Placed'   },
    { id:  5, name: 'Vikram Singh',    rollNo: 'ME2105', branch: 'Mechanical',        year: 4, cgpa: 6.8, skills: 'AutoCAD,MATLAB,SolidWorks',    applications: 2, email: 'vikram@college.edu',   phone: '9876543205', status: 'Pending'  },
    { id:  6, name: 'Anjali Gupta',    rollNo: 'CS2106', branch: 'Computer Science',  year: 4, cgpa: 9.5, skills: 'React,Node,AWS,GraphQL',       applications: 5, email: 'anjali@college.edu',   phone: '9876543206', status: 'Placed'   },
    { id:  7, name: 'Rohan Mehta',     rollNo: 'IT2107', branch: 'Information Tech',  year: 4, cgpa: 7.2, skills: 'Python,ML,TensorFlow',         applications: 3, email: 'rohan@college.edu',    phone: '9876543207', status: 'Pending'  },
    { id:  8, name: 'Kavya Reddy',     rollNo: 'CS2108', branch: 'Computer Science',  year: 4, cgpa: 9.0, skills: 'React,TypeScript,Node,SQL',    applications: 4, email: 'kavya@college.edu',    phone: '9876543208', status: 'Placed'   },
    { id:  9, name: 'Arjun Nair',      rollNo: 'EC2109', branch: 'Electronics',       year: 4, cgpa: 8.3, skills: 'Embedded C,IoT,MATLAB',        applications: 2, email: 'arjun@college.edu',    phone: '9876543209', status: 'Placed'   },
    { id: 10, name: 'Pooja Iyer',      rollNo: 'CS2110', branch: 'Computer Science',  year: 4, cgpa: 8.9, skills: 'Java,DSA,Kubernetes,Go',       applications: 3, email: 'pooja@college.edu',    phone: '9876543210', status: 'Placed'   },
    { id: 11, name: 'Deepak Yadav',    rollNo: 'ME2111', branch: 'Mechanical',        year: 4, cgpa: 7.1, skills: 'AutoCAD,Ansys,Pro-E',          applications: 1, email: 'deepak@college.edu',   phone: '9876543211', status: 'Opted Out'},
    { id: 12, name: 'Nisha Kapoor',    rollNo: 'IT2112', branch: 'Information Tech',  year: 4, cgpa: 8.4, skills: 'Python,Django,PostgreSQL',     applications: 3, email: 'nisha@college.edu',    phone: '9876543212', status: 'Placed'   },
    { id: 13, name: 'Siddharth Roy',   rollNo: 'CS2113', branch: 'Computer Science',  year: 4, cgpa: 7.6, skills: 'Java,Android,Firebase',        applications: 2, email: 'sid@college.edu',      phone: '9876543213', status: 'Placed'   },
    { id: 14, name: 'Meera Joshi',     rollNo: 'CV2114', branch: 'Civil',             year: 4, cgpa: 7.4, skills: 'AutoCAD,Revit,Primavera',      applications: 0, email: 'meera@college.edu',    phone: '9876543214', status: 'Opted Out'},
    { id: 15, name: 'Aditya Kumar',    rollNo: 'CS2115', branch: 'Computer Science',  year: 4, cgpa: 9.3, skills: 'Salesforce,Apex,LWC,SOQL',    applications: 4, email: 'aditya@college.edu',   phone: '9876543215', status: 'Placed'   },
];

const BRANCHES = ['All', 'Computer Science', 'Information Tech', 'Electronics', 'Mechanical', 'Civil'];

export default class Students extends LightningElement {
    @track students = [];
    @track searchTerm = '';
    @track activeBranch = 'All';
    @track activeStatus = 'All';

    connectedCallback() {
        this.students = RAW_STUDENTS.map((st, i) => {
            const initials = st.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
            const color = AVATAR_COLORS[i % AVATAR_COLORS.length];
            const statusClass =
                st.status === 'Placed'    ? 'status-badge status-placed'   :
                st.status === 'Opted Out' ? 'status-badge status-optedout' :
                'status-badge status-pending';
            return {
                ...st,
                skills: st.skills.split(',').map(s => s.trim()),
                nameInitial: initials,
                avatarStyle: `background:${color};`,
                statusClass,
            };
        });
    }

    get branchFilters() {
        return BRANCHES.map(b => ({
            label: b,
            key: b,
            cls: this.activeBranch === b ? 'filter-btn filter-active' : 'filter-btn',
        }));
    }

    get filteredStudents() {
        const term = this.searchTerm.toLowerCase();
        return this.students.filter(s => {
            const matchSearch = !term ||
                s.name.toLowerCase().includes(term) ||
                s.branch.toLowerCase().includes(term) ||
                s.email.toLowerCase().includes(term) ||
                s.rollNo.toLowerCase().includes(term);
            const matchBranch = this.activeBranch === 'All' || s.branch === this.activeBranch;
            const matchStatus = this.activeStatus === 'All' || s.status === this.activeStatus;
            return matchSearch && matchBranch && matchStatus;
        });
    }

    get isEmpty() { return this.filteredStudents.length === 0; }
    get totalCount() { return this.students.length; }
    get shownCount() { return this.filteredStudents.length; }

    get allStatusClass()      { return this.activeStatus === 'All'       ? 'filter-btn filter-active' : 'filter-btn'; }
    get placedStatusClass()   { return this.activeStatus === 'Placed'    ? 'filter-btn filter-active' : 'filter-btn'; }
    get pendingStatusClass()  { return this.activeStatus === 'Pending'   ? 'filter-btn filter-active' : 'filter-btn'; }
    get optedOutStatusClass() { return this.activeStatus === 'Opted Out' ? 'filter-btn filter-active' : 'filter-btn'; }

    handleSearch(event)      { this.searchTerm = event.target.value; }
    filterBranch(event)      { this.activeBranch = event.target.dataset.branch; }
    filterStatusAll()        { this.activeStatus = 'All'; }
    filterStatusPlaced()     { this.activeStatus = 'Placed'; }
    filterStatusPending()    { this.activeStatus = 'Pending'; }
    filterStatusOptedOut()   { this.activeStatus = 'Opted Out'; }
}
