trigger SubscriptionTrigger on Subscription__c (after update) {
    
    /*
	
    if(Trigger.isAfter && Trigger.isUpdate){

        List<Subscription__c> subscriptionList = new List<Subscription__c>();
        
        for(Subscription__c subscr:Trigger.new){
            
            if(subscr.Is_Subscription_Expired__c == true){
                
               Subscription__c subscription= new Subscription__c();
                subscription.Membership_Application__c =subscr.Membership_Application__c;
                subscription.Start_Date__c = System.Today();
                subscription.Expiry_Date__c = System.Today().addYears(1);
                subscriptionList.add(subscription); 
                
            }
        }
            
            if(subscriptionList.size()>0){
                insert subscriptionList;
            }
        
    }

*/
}