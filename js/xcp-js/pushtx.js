
function ajax(url, data) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            
            console.log(xhr.responseText);
            
            xhr.close;
            
        }
    }
    xhr.open(data ? "POST" : "GET", url, true);
    if (data) xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(data);
}


function sendBTCpush(hextx) {
    url = 'http://blockchain.info/pushtx';
    postdata = 'tx=' + hextx;
    if (url != null && url != "")
    {
        ajax(url, postdata);
    }
}


       


    
