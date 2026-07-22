public with sharing class CompanyController {

    @AuraEnabled(cacheable=true)
    public static List<Company__c> getAllCompanies() {

        return [
            SELECT Id,
                   Name,
                   HR_Contect__c,
                   Job_Roles_Offered__c
            FROM Company__c
        ];
    }
}