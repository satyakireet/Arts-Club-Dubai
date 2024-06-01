trigger MembershipApplicationTrigger on Mem__c (after update, before insert,after insert) {
   
    if(Trigger.isBefore && Trigger.isInsert){
        for(Mem__c m : Trigger.new) {
            if(m.Country__c == 'London') {
                m.RecordTypeId = '0125h000000uSKvAAM';
            } else if(m.Country__c == 'Dubai'){
                m.RecordTypeId = '0125h000000uSKbAAM';
            }           
        }
    }
  
    if(Trigger.isAfter && Trigger.isInsert){
        
        set<Id> memIds = new set<Id>();
        for(Mem__c m : Trigger.new) {
            if(m.Transferred_to_Country__c == null){
                memIds.add(m.Id);    
            }
                  
        }
         List<Contact> insertcontactList = new List<Contact>();
        List<Contact> updatecontactList = new List<Contact>();
        List<Contact> tempcontactList = new List<Contact>();
        
        List<Mem__c> updateMemAppList = new List<Mem__c>();
        
        List<Mem__c> MemAppList = [Select Id,Name,Last_Name__c,Email_ID__c,Transferred__c,Contact__c from Mem__c where Id In:memIds and Transferred__c != true ];
		//List<Mem__c> MemAppList = [Select Id,Name,Last_Name__c,Email_ID__c,Transferred__c,Contact__c from Mem__c where Id In:memIds and Transferred__c != true ];

        List<Contact> contactList = [Select Id,FirstName,LastName,Email,Name,AccountId from Contact];

        for(Mem__c mem:MemAppList){
            String memberName = mem.Name+ ' '+mem.Last_Name__c;
            
           for(Contact cont:contactList){
               
               if(cont.Name == memberName && cont.Email == mem.Email_ID__c && mem.Transferred__c != True){
                   cont.Membership_Application__c = mem.Id;
                   mem.Contact__c = cont.Id;
                   updatecontactList.add(cont);
                   updateMemAppList.add(mem);
                   break;
               }   
        
            } 
            
            if(updatecontactList.isEmpty() && MemAppList.size()>0 && mem.Contact__c == null){
                    Contact newContact = new Contact();
                      newContact.FirstName = mem.Name;
                      newContact.LastName = mem.Last_Name__c;
                      newContact.Email = mem.Email_ID__c;
                      newContact.AccountId = '0015h0000167wNbAAI';
                      newContact.Membership_Application__c=mem.Id;     
                      insertcontactList.add(newContact);
            }
            
        }
        
        if(updatecontactList.size()>0){
            update updatecontactList;
            update updateMemAppList;
        }
        else if(updatecontactList.isEmpty()){
           insert insertcontactList;
            system.debug('insertcontactList'+insertcontactList);
        }
        
        
    } 
     /*  
    if(Trigger.isAfter && Trigger.isUpdate){
     
        Set<id> memIdSet = new Set <Id>();

        for(Mem__c mem:Trigger.new){
            if(mem.Status__c == 'Accepted'){
                memIdSet.add(mem.Id);
            }
        }
        List<Membership_Invoice__c> MemInvoiceList = new List<Membership_Invoice__c>();
        if(memIdSet.size()>0){
            for(Mem__c memapplcn:[Select id,Membership_Type__c from Mem__c where id In:memIdSet]){
                
                Membership_Invoice__c MemInvoice = new Membership_Invoice__c();
                MemInvoice.Membership_Application__c =memapplcn.Id;
                MemInvoice.Start_Date__c = Date.today();
                MemInvoice.End_Date__c =Date.today().addMonths(3);
                
                if(memapplcn.Membership_Type__c == 'Full Membership'){
                    MemInvoice.Price__c = 5680;
                }
                else if(memapplcn.Membership_Type__c == 'Second Person'){
                    MemInvoice.Price__c = 3500;
                }
                else if(memapplcn.Membership_Type__c == 'Young Person'){
                    MemInvoice.Price__c = 5678;
                }
                else if(memapplcn.Membership_Type__c == 'International Membership'){
                    MemInvoice.Price__c = 7383;
                }
                
                MemInvoiceList.add(MemInvoice);
            } */
            /*
             for(Id memId:memIdSet){
                Membership_Invoice__c MemInvoice = new Membership_Invoice__c();
                MemInvoice.Membership_Application__c =memId;
                MemInvoice.Price__c = 500;
                MemInvoiceList.add(MemInvoice);
            } 
             
        }*/
        
        /*
        if(MemInvoiceList.size()>0){
            system.debug('List');
            system.debug(MemInvoiceList);
           insert  MemInvoiceList;
        }
        
      
    }
    */  
}