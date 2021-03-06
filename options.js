(function(){
    var resetSettings = document.getElementById('setSettings');
    if(resetSettings){
        resetSettings.addEventListener('click',function(){
            preferences = {'WR':false};
            var wr = document.getElementById('WR');
            if(wr){preferences.WR=wr.checked;};
            chrome.storage.sync.set({'preferences':preferences});
        });
    }
})();