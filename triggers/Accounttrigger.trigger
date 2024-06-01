trigger Accounttrigger on Account (after insert) {
    Set<id> accIdSet=new Set<id>();
    for(Account acc:trigger.new){
        if(acc.name!=Null){
            accIdSet.add(acc.id);
        }
    }
    if(accIdSet.size() > 0){
        callWebserviceClass.getConList(accIdSet);
    }
}