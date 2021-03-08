chrome.runtime.sendMessage({todo:"showPageAction"});
//primarily for testing
chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
    if(request.todo == "changeColo"){
        //add storage for settings 
        chrome.storage.sync.get('preferences', function(result){
            var preferences = result.preferences;
            //they gon hate me for this one
            if(preferences['Off']){
                return;
            }

            //fix wrapper max width
            var wrapper = document.getElementById('wrapper');
            wrapper.style = "max-width: 100%;";
            
            var content = document.getElementById('content');

            //get rid of top bar
            if(preferences['Default'] || preferences['TopBar']){
                var topBar = document.getElementsByClassName('ic-app-nav-toggle-and-crumbs no-print');
                //console.log(topBar[0].innerHTML); 
                //topBar[0].innerHTML = "";
                wrapper.removeChild(topBar[0]);
            }

            //remove bottom bar
            if(preferences['Default'] || preferences['BottomBar']){
                content.removeChild(document.getElementById('sequence_footer'));
            }
            var iframes = document.querySelectorAll('iframe');
            //fix iframes, add a setting for later???
            if(preferences['Default'] || true){
                //console.log(iframes.length);
                //console.log(iframes[0].id);
                //console.log(iframes[1]);
                for(var i = 0; i < iframes.length; i++){
                    console.log('fixing iframess');
                    if(iframes[i].id != "instructure_ajax_error_result"){
                        iframes[i].style = "width: 100%; border: 0px; overflow: auto; height: 100%; min-height: 100%;"
                    }
                };
            }

            if(iframes.length > 1){
                //fix overflow, add setting for this??
                if(preferences['Default'] || true){
                    console.log('fixing overflow');
                    var doc_preview = document.getElementById('doc_preview');
                    console.log(doc_preview.childNodes[0].style);
                    console.log(doc_preview.childNodes[0]);
                    doc_preview.childNodes[0].style = "overflow: auto hidden; padding-right: 10px; resize: vertical; border: 1px solid transparent; height: 100%;";
                }
                //var get rid of redundant title
                if(preferences['Default'] || preferences['Title']){
                    console.log(content.childNodes);
                    content.removeChild(content.childNodes[1]);
                }
            }
        
            window.dispatchEvent(new Event('resize'));
        })
    }
});

function fix(){
    chrome.storage.sync.get('preferences', function(result){
        var preferences = result.preferences;
        //they gon hate me for this one
        if(preferences['Off']){
            return;
        }

        //fix wrapper max width
        var wrapper = document.getElementById('wrapper');
        wrapper.style = "max-width: 100%;";
        
        var content = document.getElementById('content');

        //get rid of top bar
        if(preferences['Default'] || preferences['TopBar']){
            var topBar = document.getElementsByClassName('ic-app-nav-toggle-and-crumbs no-print');
            //console.log(topBar[0].innerHTML); 
            //topBar[0].innerHTML = "";
            wrapper.removeChild(topBar[0]);
        }

        //remove bottom bar
        if(preferences['Default'] || preferences['BottomBar']){
            var sequence_footer = document.getElementById('sequence_footer')
            console.log(sequence_footer);
            if(sequence_footer!=null){
                content.removeChild(sequence_footer);
            }
        }
        var iframes = document.querySelectorAll('iframe');
        //fix iframes, add a setting for later???
        if(preferences['Default'] || preferences['Enlarge']){
            //console.log(iframes.length);
            //console.log(iframes[0].id);
            //console.log(iframes[1]);
            for(var i = 0; i < iframes.length; i++){
                console.log('fixing iframess');
                if(iframes[i].id != "instructure_ajax_error_result"){
                    iframes[i].style = "width: 100%; border: 0px; overflow: auto; height: 98%; min-height: 98%;"
                }
            };
        }

        if(iframes.length > 1){
            //fix overflow, add setting for this??
            if(preferences['Default'] || preferences['Enlarge']){
                console.log('fixing overflow');
                var doc_preview = document.getElementById('doc_preview');
                console.log(doc_preview.childNodes[0].style);
                console.log(doc_preview.childNodes[0]);
                doc_preview.childNodes[0].style = "overflow: auto hidden; padding-right: 10px; resize: vertical; border: 1px solid transparent; height: 100%;";
            }
            //var get rid of redundant title
            if(preferences['Default'] || preferences['Title']){
                console.log(content.childNodes);
                content.removeChild(content.childNodes[1]);
            }
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
fix();