import { LightningElement } from 'lwc';

export default class FirstComponent extends LightningElement {

    isExecuted = false;

    students = [
        { id: 1, name: "Aman", branch: "CSE", cgpa: 8.5, placed: true, package: 1200000 },
        { id: 2, name: "Rahul", branch: "IT", cgpa: 6.8, placed: false, package: 0 },
        { id: 3, name: "Sneha", branch: "ECE", cgpa: 9.1, placed: true, package: 1800000 },
        { id: 4, name: "Priya", branch: "CSE", cgpa: 7.2, placed: true, package: 800000 },
        { id: 5, name: "Karan", branch: "Mechanical", cgpa: 5.9, placed: false, package: 0 },
        { id: 6, name: "Neha", branch: "IT", cgpa: 8.9, placed: true, package: 1500000 }

    ];

    checkIfEligible(){
        
        this.students = this.students.map(student => {
            return {
                ...student,
                isEligible: student.cgpa > 7
            }
        })
        this.isExecuted = true;
    }

}