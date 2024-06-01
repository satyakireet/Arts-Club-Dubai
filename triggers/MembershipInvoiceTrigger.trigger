trigger MembershipInvoiceTrigger on Quote (after update) {
    
    /*

    if(Trigger.isAfter && Trigger.isUpdate){
        set<Id> MemApplicationIds = new set<Id>();
        for(Quote Qt:Trigger.new){
            if(Qt.Payment_Status__c == 'Paid'){
                MemApplicationIds.add(Qt.Membership_Application__c);
                
            }
        }
        if(MemApplicationIds.size()>0){
            List<Subscription__c> subscriptionList = new List<Subscription__c>();
            
            for(Mem__c memApplcn:[Select id,Membership_Type__c from Mem__c where Id In:MemApplicationIds]){
                Subscription__c sub= new Subscription__c();
                sub.Membership_Application__c =memApplcn.id;
                sub.Start_Date__c = System.Today();
                sub.Expiry_Date__c = System.Today().addYears(1);
                subscriptionList.add(sub);
            } 
            
            if(subscriptionList.size()>0){
                insert subscriptionList;
            }
        }
    }

*/
}