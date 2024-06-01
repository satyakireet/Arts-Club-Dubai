trigger ContactTrigger on Contact (after insert) {
    
    if(Trigger.isAfter && Trigger.isInsert){
        //set<Id> memId = new set<id>();
        List<Mem__c> memAppList = new List<Mem__c>();
        for(Contact con:Trigger.New){
            if(con.Membership_Application__c !=null && con.Membership_Application__r.Transferred__c != true){
                
                Mem__c memApp = new Mem__c();
                	memApp.Id =con.Membership_Application__c;
                	memApp.Contact__c = con.Id;
                	memAppList.add(memApp);

				
            }
        }
        
        if(memAppList.size()>0){
            update memAppList;
        }
        
    }



}