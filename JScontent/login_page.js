function loginPage (content,id=null) {
$(".breadcrumb").empty().append($("<li class='breadcrumb-item' aria-current='page'>Home</li>")
                                ,$("<li class='breadcrumb-item active' aria-current='page'>login</li>"))
$(content).empty().append($("<div class='card border-success'>"
                                    +"<div class='card-header'><b style='color: green'>User data</b></div>"
                                    +"<div class='card-body text-success'>"
                                    +"<h5 class='card-title'>Login token</h5>"
                                    +"<p class='card-text'></p></div></div>"));
$(".card-text").empty().append($("<label for='hdc_token'>TOKEN</label><input type='text' class='form-control' id='hdc_token' style='width: 100%;' readonly>")
                                ,$("<label for='hdc_code'>Hos code</label><input type='text' class='form-control' id='hdc_code' style='width: 100%;'>")
                                ,$("<label for='hdc_id'>id</label><input type='text' class='form-control' id='hdc_id' style='width: 100%;'>")
                                ,$("<label for='hdc_name'>name</label><input type='text' class='form-control' id='hdc_name' style='width: 100%;'>")
                                ,$("<label for='hdc_posi'>position</label><input type='text' class='form-control' id='hdc_posi' style='width: 100%;'>")
                                ,$("<label for='hdc_tel'>telephone</label><input type='text' class='form-control' id='hdc_tel' style='width: 100%;'>")
                                ,$("<label for='hdc_email'>email</label><input type='text' class='form-control' id='hdc_email' style='width: 100%;'>")
                                ,$("<hr><label for='search'>ค้นหา</label><input type='text' class='form-control' id='search' style='width: 100%;'>")
                                ,$("<br><button name='b_search' id='b_search' class='btn btn-success'>ค้นหา</button>")
                                ,$("<hr><span id='fname'></span><div id='gen'></div>"));
                function SmartCard() {
                var smc = new $.Deferred();
                    $.when($.getJSON('http://localhost:8084/smartcard/data/')).done( function (data) { 
                        smc.resolve(data);
                    });
                   return smc;
                }  
                
                $("button#b_search").click(function(e) {
                e.preventDefault();
                var SMC = SmartCard();
                    $.when(SMC).done(function(data) { 
                        
    var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://smarthealth.service.moph.go.th/phps/api/person/v2/findby/cid?cid="+data.cid,
  "method": "GET",
  "headers": {
    "jwt-token": $("#hdc_token").val(),
    "Cache-Control": "no-cache",
    "Jvteam-Token": "15e519b8-f53f-4bbd-a391-ee1711f60052"
  }
  }
  $.ajax(settings).done(function (response) {
  //console.log(response);

  $('#fname').text(response.prename_moi+response.name+' '+response.lname);

  

  if(response.status=="204"){
    $("#gen").html('<center><div class="alert alert-danger"><h1>ไม่มีเลขบัตรนี้ : '+response.message+' </h1></div></center>');
  }

}) 

}) 
}) 
 }

