chrome.runtime.sendMessage({todo:"showPageAction"})
chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
    if(request.todo == "changeColor"){
        //add storage for settings 

        //fix wrapper max width
        var wrapper = document.getElementById('wrapper');
        wrapper.style = "max-width: 100%;";

        //get rid of top bar
        var topBar = document.getElementsByClassName('ic-app-nav-toggle-and-crumbs no-print');
        //console.log(topBar[0].innerHTML); 
        //topBar[0].innerHTML = "";
        wrapper.removeChild(topBar[0]);

        //remove bottom bar
        var content = document.getElementById('content');
        content.removeChild(document.getElementById('sequence_footer'));

        //fix iframes
        var iframes = document.querySelectorAll('iframe');
        //console.log(iframes.length);
        //console.log(iframes[0].id);
        //console.log(iframes[1]);
        for(var i = 0; i < iframes.length; i++){
            if(iframes[i].id != "instructure_ajax_error_result"){
                iframes[i].style = "width: 100%; border: 0px; overflow: auto; height: 100%; min-height: 100%;"
            }
        };

        //fix overflow
        if(iframes.length > 1){
            var doc_preview = document.getElementById('doc_preview');
            console.log(doc_preview.childNodes[0].style);
            console.log(doc_preview.childNodes[0]);
            doc_preview.childNodes[0].style = "overflow: auto hidden; padding-right: 10px; resize: vertical; border: 1px solid transparent; height: 100%;";

            //var get rid of redundant title
            console.log(content.childNodes);
            content.removeChild(content.childNodes[1]);
        }

        window.dispatchEvent(new Event('resize'));
        //var get rid of 

        // chrome.storage.local.get('companies',function(companies){
        //     for(var i = 0; i < companies.companies.length;i++){
        //         var content = document.getElementById("bylineInfo");
        //         if(content.innerHTML.toLowerCase().includes(companies.companies[i].name.toLowerCase())){
        //             console.log('FOUND!');
        //             content.style.color = 'seashell'/*companies.companies[i].color*/;
        //         }
        //         /*if(classes.toString().indexOf(companies.companies[i].name)>-1){
        //             //console.log("Onscreen!");
        //         }*/
        //     }
        // });
    }
})

function fix(){
    //add storage for settings 

    //fix wrapper max width
    var wrapper = document.getElementById('wrapper');
    wrapper.style = "max-width: 100%;";

    //get rid of top bar
    var topBar = document.getElementsByClassName('ic-app-nav-toggle-and-crumbs no-print');
    //console.log(topBar[0].innerHTML); 
    //topBar[0].innerHTML = "";
    wrapper.removeChild(topBar[0]);

    //remove bottom bar
    var content = document.getElementById('content');
    content.removeChild(document.getElementById('sequence_footer'));

    //fix iframes
    var iframes = document.querySelectorAll('iframe');
    //console.log(iframes.length);
    //console.log(iframes[0].id);
    //console.log(iframes[1]);
    for(var i = 0; i < iframes.length; i++){
        if(iframes[i].id != "instructure_ajax_error_result"){
            iframes[i].style = "width: 100%; border: 0px; overflow: auto; height: 100%; min-height: 100%;"
        }
    };

    //fix overflow
    if(iframes.length > 1){
        var doc_preview = document.getElementById('doc_preview');
        console.log(doc_preview.childNodes[0].style);
        console.log(doc_preview.childNodes[0]);
        doc_preview.childNodes[0].style = "overflow: auto hidden; padding-right: 10px; resize: vertical; border: 1px solid transparent; height: 100%;";

        //var get rid of redundant title
        console.log(content.childNodes);
        content.removeChild(content.childNodes[1]);
    }

    window.dispatchEvent(new Event('resize'));
    //var get rid of 
}
fix();