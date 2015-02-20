var bitcore = require('bitcore');

$( document ).ready(function() {
    
    getStorage();
    
    //on open
    var manifest = chrome.runtime.getManifest();
    $("#nameversion").html("LTB Companion Wallet v" + manifest.version);
    
       var JsonFormatter = {
        stringify: function (cipherParams) {
            // create json object with ciphertext
            var jsonObj = {
                ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64)
            };

            return JSON.stringify(jsonObj);
        },

        parse: function (jsonStr) {
            // parse json string
            var jsonObj = JSON.parse(jsonStr);

            // extract ciphertext from json object, and create cipher params object
            var cipherParams = CryptoJS.lib.CipherParams.create({
                ciphertext: CryptoJS.enc.Base64.parse(jsonObj.ct)
            });

            return cipherParams;
        }
        };


$(document).on("click", '#encryptbutton', function (event) { 

    var message = $("#message").val();
    var password = $("#password").val();
    
    var encrypted = CryptoJS.AES.encrypt(message, password, { format: JsonFormatter });

	$( "body" ).data(encrypted);

    console.log(encrypted); // {"ct":"tZ4MsEnfbcDOwqau68aOrQ==","iv":"8a8c8fd8fe33743d3638737ea4a00698","s":"ba06373c8f57179c"}
    
   
    
});

    
$(document).on("click", '#decryptbutton', function (event) { 

	var password = $("#password").val();
	var encrypted = $( "body" ).data(encrypted);

    var decrypted = CryptoJS.AES.decrypt(encrypted, password, { format: JsonFormatter });

    console.log(decrypted.toString(CryptoJS.enc.Utf8)); // Message
    
});

  
    
    $('#myTab a').click(function (e) {
        e.preventDefault()
        $(this).tab('show')
    });
    
    $( "#addressselect" ).change(function () {
    
    var addr = $(this).val();
    
//    chrome.storage.local.set(
//                    {
//                        'lastAddress': addr
//                    }, function () {
                    
                        $("#xcpaddress").html(addr);
    
                        getPrimaryBalance(addr);
                    
//                    });
    
    
    });
    
    
    
    
    $('#resetAddress').click(function ()
        {
            newPassphrase();
        });
    
    $('#revealPassphrase').click( function ()
        {
            if($("#newpassphrase").is(":visible")) {
                $("#passphrasebox").hide();
                $("#revealPassphrase").html("Reveal Passphrase");
            } else {
                $("#passphrasebox").show(); 
                $("#revealPassphrase").html("Hide Passphrase");
            }
        });
    
    $('#manualPassphrase').click( function ()
        {
            if($("#manualPassBox").is(":visible")) {
                $("#manualPassBox").hide();
                //$("#revealPassphrase").html("Reveal Passphrase");
            } else {
                $("#manualPassBox").show(); 
                //$("#newpassphrase").hide();
                //$("#revealPassphrase").html("Hide Passphrase");
            }    
        });
    
    $('#manualAddressButton').click( function ()
        {
            manualPassphrase();
        });
 
      $(document).on("click", '#depositBTC', function (event)
  {
    
        if ($("#moreBTCinfo").length){
          
            $("#moreBTCinfo").toggle();
          
        } else {
      
            var currentaddr = $("#xcpaddress").html();
            $("#btcbalance").append("<div id='moreBTCinfo'><div style='margin: 20px 0 10px 0; font-size: 10px; font-weight: bold;'>"+currentaddr+"</div><div id='btcqr' style='margin: 10px auto 20px auto; height: 100px; width: 100px;'></div><div>Cost per transaction is 0.00043230 BTC.</div></div>");  
            var qrcode = new QRCode(document.getElementById("btcqr"), {
    			text: currentaddr,
    			width: 100,
    			height: 100,
    			colorDark : "#000000",
    			colorLight : "#ffffff",
    			correctLevel : QRCode.CorrectLevel.H
				});
        }
        });

    
 
  $(document).on("click", '#refreshWallet', function (event)
  {
      var assetbalance = $("#xcpbalance").html();
      var array = assetbalance.split(" ");
      
      
      var pubkey = $("#xcpaddress").html();
      var currenttoken = $("#currenttoken").html();
      
      getRate(array[0], pubkey, currenttoken);
  });
    
  $('#switchtoxcp').click(function ()
  {
      $("#currenttoken").html("LTBCOIN");     
      var pubkey = $("#xcpaddress").html();
      getPrimaryBalance(pubkey);
      $('#allTabs a:first').tab('show');
  });


  $('#txHistory').click(function ()
  {
    var address = $("#xcpaddress").html();
    chrome.tabs.create(
    {
      url: "http://blockscan.com/address/" + address
    });
  });

  $('#contact').click(function ()
  {
    chrome.tabs.create({ url: "mailto:support@letstalkbitcoin.com" });
  });

    
  $('#refresharrow').click(function ()
  {
    var pubkey = $("#xcpaddress").html();
    getPrimaryBalance(pubkey);
  });
    
  
   $(document).on("click", '.movetowallet', function (event)
  {  
  
      var $assetdiv = $( this ).prev();
      var currentasset = $assetdiv.html();
      $("#currenttoken").html(currentasset);
      //$("#currenttoken").html("WORKS");
      
      
      var pubkey = $("#xcpaddress").html();
      
      
      getPrimaryBalance(pubkey);
      
      
      $('#allTabs a:first').tab('show');
      
  });


  $('#inventoryTab').click(function ()
  {
    
    var address = $("#xcpaddress").html();
      
    loadAssets(address);
      
  });  


       
});