public with sharing class StudentController {

    @AuraEnabled(cacheable=true)
    public static List<Student__c> getAllStudent() {
        return [
            SELECT Id, Name FROM Student__c
        ];
    }

    @AuraEnabled(cacheable=true)
    public static List<Student__c> getStudentById(String sId) {
        return [
            SELECT Id, Name FROM Student__c WHERE Id = :sId
        ];
    }
}