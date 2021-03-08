var topBarSucc = false;
var bottomBarSucc = false;
var SideBarSucc = false;
var titleSucc = false;
var overflowSucc = false;

chrome.storage.sync.get('preferences', function(result){
    var preferences = result.preferences;
    if(preferences['Off']){
        return;
    }

    const mo = new MutationObserver(onMutation);
    // in case the content script was injected after the page is partially loaded
    onMutation([{addedNodes: [document.documentElement]}]);
    observe();

    function onMutation(mutations){
        const toRemove = [];
        for(const {addedNodes} of mutations){
            for(const n of addedNodes){
                if(n.tagName){
                    //fix wrapper max width
                    if (n.matches('#wrapper')){
                        n.style = "max-width: 100%;";
                        // if(preferences['TopBar'] && n.childNodes[1]!=undefined && (n.childNodes[1].classList.contains('ic-app-nav-toggle-and-crumbs no-print') || n.childNodes[1].classList.contains('ic-app-nav-toggle-and-crumbs no-print'))){
                        //     topBarSucc = true;
                        //     toRemove.push(n.childNodes[1]);
                        // }
                    }
                    else if(n.classList.contains('ic-app-nav-toggle-and-crumbs')){
                        topBarSucc = true;
                        //console.log('test');
                        n.style = "display:none;";
                        toRemove.push(n);
                    }
                    else if(n.matches('#content')){
                        if(preferences['Title'] && n.childNodes[1]!=undefined && n.childNodes[1].tagName=='H2'){
                            titleSucc = true;
                            toRemove.push(n.childNodes[1]);
                        }
                    }
                    else if(preferences['BottomBar'] && n.matches('#sequence_footer')){
                        bottomBarSucc = true;
                        toRemove.push(n)
                    }
                    else if(n.tagName=='iframe' && (n.id != "instructure_ajax_error_result" || n.id != "instructure_ajax_error_result")){
                        n.style = "width: 100%; border: 0px; overflow: auto; height: 98%; min-height: 98%;";
                    }
                    else if(!preferences['Default'] && preferences['SideBar'] && n.matches('#main')){
                        var minimize = document.createElement("button");
                        var leftSide = n.childNodes[3];
                        if(leftSide.id == "left-side"){
                            leftSide.childNodes[1].innerText = "";
                            leftSide.childNodes[1].append(minimize);

                            function minOrMax(){
                                if(preferences['Maximized']){
                                    n.style = "margin-left: 140px;";
                                    leftSide.style = "width: 140px; padding: 24px 0px 6px 12px;";
                                    minimize.innerText = "Min";
                                }
                                else{
                                    n.style = "margin-left:75px;";
                                    leftSide.style = "width:75px; padding: 24px 0px 6px 12px;";
                                    minimize.innerText = "Max";
                                }
                                chrome.storage.sync.set({'preferences':preferences});
                            }
                            minOrMax();
                            minimize.addEventListener('click', function(){
                                preferences['Maximized'] = !preferences['Maximized'];
                                minOrMax();
                            });
                            SideBarSucc = true;
                        }
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

chrome.runtime.sendMessage({todo:"showPageAction"});
//primarily for testing
chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
    if(request.todo == "test"){
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

        // //get rid of top bar
        if(!topBarSucc && (preferences['Default'] || preferences['TopBar'])){
            //console.log('backup topbar')
            var topBar = document.getElementsByClassName('ic-app-nav-toggle-and-crumbs');
            if(topBar[0]!=null){
                var wrapper = document.getElementById('wrapper');
                topBar[0].style = "display:none;";
            }
            topBarSucc = true;
        }

        var content = document.getElementById('content');

        //remove bottom bar
        if(!bottomBarSucc && (preferences['Default'] || preferences['BottomBar'])){
            //console.log('backup bottombar')
            var sequence_footer = document.getElementById('sequence_footer')
            if(sequence_footer!=null){
                content.removeChild(sequence_footer);
            }
            bottomBarSucc = true;
        }

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

        if(iframes.length > 1){
            //fix overflow, add setting for this??
            if(!overflowSucc && (preferences['Default'] || preferences['Enlarge'])){
                //console.log('fixing overflow');
                var doc_preview = document.getElementById('doc_preview');
                if(doc_preview!=null && doc_preview.childNodes[0]!=undefined){
                    doc_preview.childNodes[0].style = "overflow: auto hidden; padding-right: 10px; resize: vertical; border: 1px solid transparent; height: 100%;";
                    overflow = true;
                }
            }
            //var get rid of redundant title
            if(!titleSucc && (preferences['Default'] || preferences['Title'])){
                //console.log('backup title');
                if(content.childNodes[1] != undefined && content.childNodes[1].tagName=='H2'){
                    content.removeChild(content.childNodes[1]);
                }
                titleSucc = true;
            }
        }

        //sidebar stuff
        if(!SideBarSucc && !preferences['Default'] && preferences['SideBar']){
            //console.log('backup sidebar');
            var minimize = document.createElement("button");
            var main = document.getElementById('main');
            var leftSide = document.getElementById('left-side');
            if(leftSide != null){
                var spring = document.getElementById('section-tabs-header-subtitle');
                spring.innerText = "";
                spring.append(minimize);

                function minOrMax(){
                    if(preferences['Maximized']){
                        main.style = "margin-left: 140px;";
                        leftSide.style = "width: 140px; padding: 24px 0px 6px 12px;";
                        minimize.innerText = "Min";
                    }
                    else{
                        main.style = "margin-left:75px;";
                        leftSide.style = "width:75px; padding: 24px 0px 6px 12px;";
                        minimize.innerText = "Max";
                    }
                    chrome.storage.sync.set({'preferences':preferences});
                }
                minOrMax();
                minimize.addEventListener('click', function(){
                    preferences['Maximized'] = !preferences['Maximized'];
                    minOrMax();
                });
                SideBarSucc = true;
            }
        }
        window.dispatchEvent(new Event('resize'));
    })
}
