(function(){
    chrome.tabs.query({active:true ,currentWindow:true},function(tabs){
        chrome.tabs.sendMessage(tabs[0].id,{todo:"changeColor"});
    });
    //setup click listeners
    document.getElementById('Off');
    document.getElementById('Default').addEventListener('click', function(){
        if(!document.getElementById('Default').checked){
            var checkboxs = [];
            for(var i = 0; i < 5;i++){
                var div = document.createElement('div');
                div.appendChild(document.createElement('input'));
                div.children[0].type="checkbox";
                checkboxs.push(div);
            }
            // set ids
            checkboxs[0].children[0].id="TopBar";
            checkboxs[1].children[0].id="BottomBar";
            checkboxs[2].children[0].id="Enlarge";
            checkboxs[3].children[0].id="SideBar";
            checkboxs[4].children[0].id="Title";
            // set labels
            checkboxs[0].innerHTML += "Remove Top Bar";
            checkboxs[1].innerHTML += "Remove Bottom Bar";
            checkboxs[2].innerHTML += "Enlarge Previews";
            checkboxs[3].innerHTML += "Remove Side Bar";
            checkboxs[4].innerHTML += "Remove Redundant Title";
            //create options
            var options = document.createElement('h1');
            options.innerText = "Options:";
            document.getElementsByClassName('checkboxs')[0].appendChild(options);
            for(var i = 0; i < checkboxs.length; i++){
                checkboxs[i].children[0].checked=true;
                document.getElementsByClassName('checkboxs')[0].appendChild(checkboxs[i]);
            }
        }
        else{
            var boxs = document.getElementsByClassName('checkboxs')[0];
            for(var i = boxs.children.length; i > 2; i--){
                boxs.removeChild(boxs.children[i-1]);
            }
        }
    });
})();

// (function(){
//         resetSettings.addEventListener('click',function(){
//             preferences = {'WR':false,'CR':false,'HR':false,'ECO':false,'CORRUPT':false,'LOB':false,'ECONOMY':false,'ACONSUMER':false};
//             var wr = document.getElementById('WR');
//             if(wr){preferences.WR=wr.checked;};
//             var cr = document.getElementById('CR');
//             if(cr){preferences.CR=cr.checked;};
//             var hr = document.getElementById('HR');
//             if(hr){preferences.HR=hr.checked;};
//             var eco = document.getElementById('ECO');
//             if(eco){preferences.ECO=eco.checked;};
//             var corrupt = document.getElementById('CORRUPT');
//             if(corrupt){preferences.CORRUPT=corrupt.checked;};
//             var lob = document.getElementById('LOB');
//             if(lob){preferences.LOB=lob.checked;};
//             var economy = document.getElementById('ECONOMY');
//             if(economy){preferences.ECONOMY=economy.checked;};
//             var aconsumer = document.getElementById('ACONSUMER');
//             if(wr){preferences.ACONSUMER=aconsumer.checked;};
//             chrome.storage.sync.set({'preferences':preferences});
//         });
//     }
// })();

