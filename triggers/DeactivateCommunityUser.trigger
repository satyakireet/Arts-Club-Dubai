trigger DeactivateCommunityUser on Mem__c (after insert,after update) {
if(Trigger.IsAfter && Trigger.IsUpdate){
        Set<Id> memApplcnIds = new set<Id>();
        
        for(Mem__c memApplcn:Trigger.new){
            if(memApplcn.RecordTypeId == '0125h000000uSKbAAM' && memApplcn.Status__c == 'Transferred'){
                
                memApplcnIds.add(memApplcn.Id);
            } 
        }
        system.debug('memApplcnIds'+memApplcnIds);
        if(memApplcnIds.size()>0){
            CommunityUserHandler.UpdateUserStatus(memApplcnIds);

           }
   
        }
        
    
}