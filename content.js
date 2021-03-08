chrome.storage.sync.get('preferences', function(result){
    var preferences = result.preferences;
    if(preferences['Off']){
        return;
    }

    const mo = new MutationObserver(onMutation);
    // in case the content script was injected after the page is partially loaded
    onMutation([{addedNodes: [document.documentElement]}]);
    //onMutation(document.documentElement);
    observe();

    //var wrapper;
    //var content;

    function onMutation(mutations){
        const toRemove = [];
        for(const {addedNodes} of mutations){
            for(const n of addedNodes){
                if(n.tagName){
                    //fix wrapper max width
                    if (n.matches('#wrapper')){
                        //wrapper = n;
                        n.style = "max-width: 100%;";
                        if(preferences['TopBar']){
                            toRemove.push(n.childNodes[1]);
                        }
                    }
                    else if(n.matches('#content')){
                        //content = n;
                        //console.log(n.childNodes[1].tagName=='H2');
                        if(preferences['Title'] && n.childNodes[1]!=undefined && n.childNodes[1].tagName=='H2'){
                            toRemove.push(n.childNodes[1]);
                        }
                    }  
                    else if(preferences['BottomBar'] && n.matches('#sequence_footer')){
                        toRemove.push(n)
                    }
                    else if(n.querySelector('iframe')){
                        //console.log('found iframe');
                        n.style = "width: 100%; border: 0px; overflow: auto; height: 98%; min-height: 98%;";
                    }
                    // else if((preferences['Default'] || preferences['Enlarge']) && n.matches('#doc_preview')){
                    //     console.log('found doc_preview');
                    //     console.log(n.childNodes);
                    //     n.childNodes[0].style = "overflow: auto hidden; padding-right: 10px; resize: vertical; border: 1px solid transparent; height: 100%;";
                    // }
                    else if(!preferences['Default'] && preferences['SideBar'] && n.matches('#section-tabs-header-subtitle')){
                        //console.log('found sidebar');
                        var minimize = document.createElement("button");
                        //minimize.innerText = "Min";
                        n.innerText = "";
                        n.append(minimize);
                        var main = document.getElementById('main');
                        var leftSide = document.getElementById('left-side');
                        //main.style = "margin-left: 140px;";
                        //leftSide.style = "width: 140px; padding: 24px 0px 6px 12px;";

                        function minOrMax(){
                            if(preferences['Maximized']){
                                main.style = "margin-left: 140px;";
                                leftSide.style = "width: 140px; padding: 24px 0px 6px 12px;";
                                minimize.innerText = "Min";
                                //preferences['Maximized'] = false;
                            }
                            else{
                                main.style = "margin-left:75px;";
                                leftSide.style = "width:75px; padding: 24px 0px 6px 12px;";
                                minimize.innerText = "Max";
                                //preferences['Maximized'] = true;
                            }
                            chrome.storage.sync.set({'preferences':preferences});
                        }
                        minOrMax();
                        minimize.addEventListener('click', function(){
                            preferences['Maximized'] = !preferences['Maximized'];
                            minOrMax();
                        });
                    }
                }
            }
        }
        if(toRemove.length){
            mo.disconnect();
            for (const el of toRemove) el.remove();
            observe();
        }
    }

    function observe(){
        mo.observe(document, {
            subtree: true,
            childList: true,
        });
    }
});

//fix2();

















chrome.runtime.sendMessage({todo:"showPageAction"});
//primarily for testing
chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
    if(request.todo == "test"){
        //console.log('recieved');
        fix2();
    }
});
function fix2(){
    chrome.storage.sync.get('preferences', function(result){
        var preferences = result.preferences;
        //they gon hate me for this one
        if(preferences['Off']){
            return;
        }

        // //fix wrapper max width
        // var wrapper = document.getElementById('wrapper');
        // //console.log(wrapper);
        // //if(wrapper!=null){
        //     wrapper.style = "max-width: 100%;";
        // //}
        // var content = document.getElementById('content');

        // //get rid of top bar
        // if(preferences['Default'] || preferences['TopBar']){
        //     var topBar = document.getElementsByClassName('ic-app-nav-toggle-and-crumbs no-print');
        //     //console.log(topBar); 
        //     //topBar[0].innerHTML = "";
        //     if(topBar[0]!=null){
        //         wrapper.removeChild(topBar[0]);
        //     }
        // }

        // //remove bottom bar
        // if(preferences['Default'] || preferences['BottomBar']){
        //     var sequence_footer = document.getElementById('sequence_footer')
        //     //console.log(sequence_footer);
        //     if(sequence_footer!=null){
        //         content.removeChild(sequence_footer);
        //     }
        // }
        var iframes = document.querySelectorAll('iframe');
        //fix iframes, add a setting for later???
        // if(preferences['Default'] || preferences['Enlarge']){
        //     //console.log(iframes.length);
        //     //console.log(iframes[0].id);
        //     //console.log(iframes[1]);
        //     for(var i = 0; i < iframes.length; i++){
        //         //console.log('fixing iframess');
        //         if(iframes[i].id != "instructure_ajax_error_result"){
        //             iframes[i].style = "width: 100%; border: 0px; overflow: auto; height: 98%; min-height: 98%;"
        //         }
        //     };
        // }
        //console.log(iframes.length);
        if(iframes.length > 1){
            //fix overflow, add setting for this??
            if(preferences['Default'] || preferences['Enlarge']){
                console.log('fixing overflow');
                var doc_preview = document.getElementById('doc_preview');
                //console.log(doc_preview.childNodes[0].style);
                console.log(doc_preview.childNodes[0]);
                doc_preview.childNodes[0].style = "overflow: auto hidden; padding-right: 10px; resize: vertical; border: 1px solid transparent; height: 100%;";
            }
            //var get rid of redundant title
            // if(preferences['Default'] || preferences['Title']){
            //     //console.log(content.childNodes);
            //     content.removeChild(content.childNodes[1]);
            // }
        }

        //sidebar stuff
        if(!preferences['Default'] && preferences['SideBar']){
            var minimize = document.createElement("button");
            //minimize.innerText = "Min";
            var spring = document.getElementById('section-tabs-header-subtitle');
            spring.innerText = "";
            spring.append(minimize);
            var main = document.getElementById('main');
            var leftSide = document.getElementById('left-side');
            //main.style = "margin-left: 140px;";
            //leftSide.style = "width: 140px; padding: 24px 0px 6px 12px;";

            function minOrMax(){
                if(preferences['Maximized']){
                    main.style = "margin-left: 140px;";
                    leftSide.style = "width: 140px; padding: 24px 0px 6px 12px;";
                    minimize.innerText = "Min";
                    //preferences['Maximized'] = false;
                }
                else{
                    main.style = "margin-left:75px;";
                    leftSide.style = "width:75px; padding: 24px 0px 6px 12px;";
                    minimize.innerText = "Max";
                    //preferences['Maximized'] = true;
                }
                chrome.storage.sync.set({'preferences':preferences});
            }
            minOrMax();
            minimize.addEventListener('click', function(){
                preferences['Maximized'] = !preferences['Maximized'];
                minOrMax();
            });
        }
        window.dispatchEvent(new Event('resize'));
    })
}
