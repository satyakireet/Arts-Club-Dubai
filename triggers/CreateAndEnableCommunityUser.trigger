trigger CreateAndEnableCommunityUser on Mem__c (after insert,after update) {
   
    // For London
    if(Trigger.IsAfter && Trigger.IsUpdate){
        Set<Id> memApplcnIds = new set<Id>();
        map<Id,Mem__c> memAppOldMap = Trigger.oldMap;
        system.debug('Test1');
        for(Mem__c memApplcn:Trigger.new){
            system.debug('Test2');
            //if(memApplcn.RecordTypeId == '0122w000002AjP7AAK' && memAppOldMap.get(memApplcn.Id).Status__c != 'Accepted' && memApplcn.Status__c == 'Accepted' && memApplcn.Transferred__c == true){
     		
            if(memApplcn.RecordTypeId == '0125h000000uSKvAAM' && memAppOldMap.get(memApplcn.Id).RecordTypeId != '0125h000000uSKvAAM' && memApplcn.Status__c == 'Accepted' && memApplcn.Transferred__c == true && memApplcn.External_Id__c != null){
            system.debug('In');
                memApplcnIds.add(memApplcn.Id);
            } 
        }
        
        if(memApplcnIds.size()>0){
            system.debug(memApplcnIds);
            Contact con = [Select id,Email,LastName from Contact where Membership_Application__c In:memApplcnIds and Membership_Application__c !=null Limit 1];
        
                List<User> userList = [Select id,ContactId from User where ContactId =:con.Id]; 
         
            
            if(userList.isEmpty()){
                Integer randomNumber = Integer.valueof((Math.random() * 100));    
                List<User> userInsert = new List<User>();
                
                User theUser = new User();
                theUser.Username = con.LastName+randomNumber+'code@yash.com';
                theUser.ContactId = con.Id;
                theUser.ProfileId = '00e5h000000hqZQAAY';
                theUser.Alias = con.LastName.substring(0,1)+randomNumber;
                theUser.Email = con.Email;
                theUser.EmailEncodingKey = 'UTF-8';
                theUser.LastName = con.LastName;
                theUser.CommunityNickname = con.LastName.substring(0,1)+randomNumber+ 'code@Community.com';
                theUser.TimeZoneSidKey = 'America/Los_Angeles';
                theUser.LocaleSidKey = 'en_US';
                theUser.LanguageLocaleKey = 'en_US';
                userInsert.add(theUser);
                
                if(userInsert.size()>0){
                    insert userInsert;
                }
            }
            
        }
        
    }

}