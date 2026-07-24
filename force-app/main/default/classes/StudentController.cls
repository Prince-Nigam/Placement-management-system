public with sharing class StudentController {

    @AuraEnabled(cacheable=true)
    public static List<Student__c> getAllStudent() {
        return [
            SELECT Id, Name, Branch__c, CGPA__c, Skills__c,
                   Application_Count__c, Email__c, Status__c
            FROM Student__c
            ORDER BY Name
        ];
    }

    @AuraEnabled(cacheable=true)
    public static List<Student__c> getStudentById(String sId) {
        return [
            SELECT Id, Name, Branch__c, CGPA__c, Skills__c,
                   Application_Count__c, Email__c, Status__c
            FROM Student__c
            WHERE Id = :sId
        ];
    }
}
