chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.todo == "showPageAction"){
        chrome.tabs.query({active:true,currentWindow:true},function(tabs){
            chrome.pageAction.show(tabs[0].id);
        });
    }
})
chrome.storage.sync.get('preferences',function(result){
    //test if preferences has not been set
    if(result && Object.keys(result).length === 0 && result.constructor === Object){
        console.log('no saved settings');
        var preferences = {'Off':false, 'Default':true};
        preferences['TopBar'] = true;
        preferences['BottomBar'] = true;
        preferences['Enlarge'] = true;
        preferences['SideBar'] = true;
        preferences['Title'] = true;
        preferences['Maximized'] = true;
        chrome.storage.sync.set({'preferences':preferences});
    }
});

chrome.webNavigation.onCompleted.addListener(function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {todo: "test"});
      });
});