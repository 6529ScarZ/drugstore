/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//config application
var default_setting = {
    "smarthealth_service_url": "https://smarthealth.service.moph.go.th/",
    "smarthealth_url": "https://smarthealth.moph.go.th/example/",
    "printdaemon_port": "https://localhost:8443/smartcard/",
    "login_server_url": "https://ictportal.moph.go.th/",
    "client_id": "19",
    "smctoken": "",
    "staffcid":""
};
var specialUser = [
	"sineenat.p@moph.mail.go.th",
	"smh@smh.go.th"
];
//var default_setting = {
//		"smarthealth_service_url":"http://smarthealth.service.moph.go.th:8080/",
//		"smarthealth_url":"http://localhost:8080/example/",
//		"printdaemon_port":"http://localhost:8084/smartcard/",
//		"login_server_url":"http://ictportal.moph.go.th/",
//		"client_id":"9"
//};
Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}

$("#smarthealth_service_url").val(default_setting.smarthealth_service_url);
(localStorage.getItem("smarthealth_service_url") == "" || localStorage.getItem("smarthealth_service_url") == null ? localStorage.setItem("smarthealth_service_url", $("#smarthealth_service_url").val()) : $("#smarthealth_service_url").val(localStorage.getItem("smarthealth_service_url")));
$("#smarthealth_url").val(default_setting.smarthealth_url);
(localStorage.getItem("smarthealth_url") == "" || localStorage.getItem("smarthealth_url") == null ? localStorage.setItem("smarthealth_url", $("#smarthealth_url").val()) : $("#smarthealth_url").val(localStorage.getItem("smarthealth_url")));
$("#printdaemon_port").val(default_setting.printdaemon_port);
(localStorage.getItem("printdaemon_port") == "" || localStorage.getItem("printdaemon_port") == null ? localStorage.setItem("printdaemon_port", $("#printdaemon_port").val()) : $("#printdaemon_port").val(localStorage.getItem("printdaemon_port")));
$("#login_server_url").val(default_setting.login_server_url);
(localStorage.getItem("login_server_url") == "" || localStorage.getItem("login_server_url") == null ? localStorage.setItem("login_server_url", $("#login_server_url").val()) : $("#login_server_url").val(localStorage.getItem("login_server_url")));
$("#client_id").val(default_setting.client_id);
(localStorage.getItem("client_id") == "" || localStorage.getItem("client_id") == null ? localStorage.setItem("client_id", $("#client_id").val()) : $("#client_id").val(localStorage.getItem("client_id")));

$("#smc_token").val(default_setting.smctoken);
(localStorage.getItem("smc_token") == "" || localStorage.getItem("smc_token") == null ? localStorage.setItem("smc_token", $("#smc_token").val()) : $("#smc_token").val(localStorage.getItem("smc_token")));

$("#staff_cid").val(default_setting.staffcid);
(localStorage.getItem("staff_cid") == "" || localStorage.getItem("staff_cid") == null ? localStorage.setItem("staff_cid", $("#staff_cid").val()) : $("#staff_cid").val(localStorage.getItem("staff_cid")));

//config application
var timeOut;
var timeOut2;
var find;

$(document).ready(function () {
    setLoginStatus();
    //$("#healthCerForm").modal("show");
});

function setLoginStatus() {
    $("#a_login_dropdown").attr("href", localStorage.getItem("login_server_url") + "oauth/authorize?client_id=" + localStorage.getItem("client_id") + "&redirect_uri=" + localStorage.getItem("smarthealth_url") + "callback&response_type=code&scope=");
    if (typeof (Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.
        var jwt_token = localStorage.getItem("jwt_token");
        console.log(localStorage.getItem("jwt_token"));
        if (jwt_token != "" && jwt_token != null && isTokenNonExpire()) {
            var user = getUserInfo();
            if (user != undefined && user != "" && user != null) {
                $("#_token").val(jwt_token);
                $("#btn_read").prop('disabled', false);
                $("#btn_read").attr('onClick', 'btnReadClick();');
                //$("#btn_read").css("display","inline");
                $("#login_btn").css("display", "none");
                $("#info_logout").css("display", "inline");
                $("#info_login").css("display", "none");
                $("#info_username").html(user.username);
                $("#info_username_dropdown").html(user.firstName + " " + user.lastName);
                $("#info_email").html(user.email);
            }

        } else {
            $("#btn_read").prop('disabled', true);
            localStorage.setItem("jwt_token", "");
            document.cookie = "XSRF-TOKEN="; 
            document.cookie = "_ga="; 
            document.cookie = "laravel_session="; 
            document.cookie = "laravel_token="; 
            $("#btn_read").attr('onClick', '');
            //$("#btn_read").css("display","none");
            $("#login_btn").css("display", "inline");
            $("#info_logout").css("display", "none");
            $("#info_login").css("display", "inline");
            $("#info_username").html("เธฅเธเธเธทเนเธญเน€เธเนเธฒเนเธเนเธเธฒเธ");
            $("#info_username_dropdown").html("เธขเธฑเธเนเธกเนเนเธ”เนเน€เธเนเธฒเธชเธนเนเธฃเธฐเธเธ");
            $("#info_email").html("เธเธฃเธธเธ“เธฒเน€เธเนเธฒเธชเธนเนเธฃเธฐเธเธ");
        }
    } else {
        // Sorry! No Web Storage support..
        $("#btn_read").prop('disabled', true);
        $("#btn_read").attr('onClick', '');
        //$("#btn_read").css("display","none");
        console.log("Sorry! No Web Storage support..");
    }
}
function getUserInfo() {
    var user;
    var settings = {
        "async": false,
        "url": "" + localStorage.getItem("smarthealth_service_url") + "phps/api/v1/user/current",
        "method": "GET",
        "headers": {
            "JWT-TOKEN": localStorage.getItem("jwt_token")
        }
    };
    $.ajax(settings).done(function (response) {
        user = response;
    });
    return user;
}
function isTokenNonExpire() {
    var nonexpire = false;
    var settings = {
        "async": false,
        "url": "" + localStorage.getItem("smarthealth_service_url") + "phps/api/v1/user/current",
        "method": "GET",
        "headers": {
            "JWT-TOKEN": localStorage.getItem("jwt_token")
        }
    };
    $.ajax(settings).done(function (response) {
        if (response != undefined && Object.keys(response).length > 0 && response != "" && response != null) {
            nonexpire = true;
        }
    });
    return nonexpire;
}
function getCurrentAddress(cid) {
    var addr = {};
    var settings = {
        "async": false,
        "url": "" + localStorage.getItem("smarthealth_service_url") + "phps/api/address/v1/find_by_cid?cid=" + cid,
        "method": "GET",
        "headers": {
            "JWT-TOKEN": localStorage.getItem("jwt_token")
        }
    };
    $.ajax(settings).done(function (response) {
        if (response != undefined && Object.keys(response).length > 0 && response != "" && response != null) {
            addr = response;
        }
    });
    return addr;
}
function getAddressByType(cid, addresstype) {
    var addr = {};
    var settings = {
        "async": false,
        "url": "" + localStorage.getItem("smarthealth_service_url") + "phps/api/address/v1/find_by_cid_and_addresstype?cid=" + cid + "&addresstype=" + addresstype,
        "method": "GET",
        "headers": {
            "JWT-TOKEN": localStorage.getItem("jwt_token")
        }
    };
    $.ajax(settings).done(function (response) {
        if (response != undefined && Object.keys(response).length > 0 && response != "" && response != null) {
            addr = response;
        }
    });
    return addr;
}
function getDrugAllergy(cid) {
    var drug = {};
    var settings = {
        "async": false,
        "url": "" + localStorage.getItem("smarthealth_service_url") + "phps/api/drugallergy/v1/find_by_cid?cid=" + cid,
        "method": "GET",
        "headers": {
            "JWT-TOKEN": localStorage.getItem("jwt_token")
        }
    };
    $.ajax(settings).done(function (response) {
        if (response != undefined && Object.keys(response).length > 0 && response != "" && response != null) {
            drug = response;
        }
    });
    return drug;
}
function btnReadClick() {
	waitingDialog.show('เธเธณเธฅเธฑเธเธญเนเธฒเธเธเนเธญเธกเธนเธฅ');
    if (isTokenNonExpire()) {
        find = false;
        $("#btn_read").removeClass("btn-primary").addClass("btn-danger");
        $("#btn_read_icon").removeClass("fa-credit-card").addClass("fa-cog fa-spin");
        $("#btn_read_status").text("เธขเธเน€เธฅเธดเธ");
        $("#btn_read").attr('onClick', 'cencelReadClick();');
        readSmartCard();
        timeOut2 = setTimeout(function () {
            if (find == false) {
                clearTimeout(timeOut);
                clearTimeout(timeOut2);
                clearIDCARDData();
                clearHDCData();
                $("#btn_read").removeClass("btn-danger").addClass("btn-primary");
                $("#btn_read_icon").removeClass("fa-cog fa-spin").addClass("fa-credit-card");
                $("#btn_read_status").text("เธญเนเธฒเธเธเนเธญเธกเธนเธฅเธเธฒเธเธเธฑเธ•เธฃ");
                $("#btn_read").attr("onclick", "btnReadClick();");
                removeLoadSpin("#smartcard_body");
                removeLoadSpin("#hdcdata_body");
                clearHDCData();
                waitingDialog.hide();
                swal("เธเธดเธ”เธเธฅเธฒเธ”", "เนเธกเนเธชเธฒเธกเธฒเธฃเธ–เธญเนเธฒเธเธเนเธญเธกเธนเธฅเธเธฒเธเธเธฑเธ•เธฃเนเธ”เน เธเธฃเธธเธ“เธฒเธฅเธญเธเธญเธตเธเธเธฃเธฑเนเธ", "error");
            }
        }, 10000);
    } else {
        window.location = localStorage.getItem("login_server_url") + "oauth/authorize?client_id=" + localStorage.getItem("client_id") + "&redirect_uri=" + localStorage.getItem("smarthealth_url") + "callback&response_type=code&scope=";
    }
}
function cencelReadClick() {
    $("#btn_read").removeClass("btn-danger").addClass("btn-primary");
    $("#btn_read_icon").removeClass("fa-cog fa-spin").addClass("fa-credit-card");
    $("#btn_read_status").text("เธญเนเธฒเธเธเนเธญเธกเธนเธฅเธเธฒเธเธเธฑเธ•เธฃ");
    $("#btn_read").attr("onclick", "btnReadClick();");
    $("#card_img").attr("src", "images/default-avatar.jpg");
    removeLoadSpin("#smartcard_body");
    removeLoadSpin("#hdcdata_body");
    waitingDialog.hide();
    clearTimeout(timeOut);
    clearTimeout(timeOut2);
}
function readSmartCard() {
    //$.spin(true);

    addLoadSpin("#smartcard_body");
    addLoadSpin("#hdcdata_body");

    var idcard = $.ajax({
        type: "GET",
        url: localStorage.getItem("printdaemon_port") + "data/",
        dataType: "json",
        async: false
    }).responseJSON;

    var checkImg = doesFileExist(localStorage.getItem("printdaemon_port") + "picture/");
    if (idcard == undefined || (Object.keys(idcard).length < 9 || checkImg == false)) {
        find = false;
        timeOut = setTimeout(readSmartCard, 2000);
        $("#smartcard_data").html("เธเธณเธฅเธฑเธเธญเนเธฒเธเธเนเธญเธกเธนเธฅเธเธฒเธเธเธฑเธ•เธฃ");
        $("#card_img").attr("src", "images/default-avatar.jpg");
    } else {
        find = true;
        clearTimeout(timeOut);
        clearIDCARDData();
        $("#card_cid").html(idcard.cid);
        $("#card_name").html(idcard.prename + "" + idcard.fname + " " + idcard.lname);
        $("#card_dob").html(getThaiDate(idcard.dob));
        $("#card_gender").html(idcard.gender);
        $("#card_issue_date").html(getThaiDate(idcard.issue_date));
        $("#card_expire_date").html(getThaiDate(idcard.expire_date));
        $("#card_address").html(getAddress(idcard.address));

        convertFileToBase64viaFileReader(localStorage.getItem("printdaemon_port") + "picture/?" + new Date().getTime(), function (base64Img) {
            // console.log(base64Img);
            $('#card_img').attr('src', base64Img);
            // Base64DataURL
        });
        getDataFromHDC(idcard.cid);
        
      //show nhso with input token
        var staffcid = localStorage.getItem("staff_cid");
        var smctoken = localStorage.getItem("smc_token");
        if(staffcid!="" && smctoken!=""){
        	$("#li-right").css("display","");
    		$("#tab-right").css("display","");
        	showNhsoData(staffcid, smctoken, idcard.cid);
        }
        
      //show data from likage center by special user
        if(isSpecialUser()){
        	getLinkageTabienradData(idcard.cid);
        	getLinkageNhsoData(idcard.cid);
        }
        
        $("#btn_read").removeClass("btn-danger").addClass("btn-primary");
        $("#btn_read_icon").removeClass("fa-cog fa-spin").addClass("fa-credit-card");
        $("#btn_read_status").text("เธญเนเธฒเธเธเนเธญเธกเธนเธฅเธเธฒเธเธเธฑเธ•เธฃ");
        $("#btn_read").attr("onclick", "btnReadClick();");
        removeLoadSpin("#smartcard_body");
        removeLoadSpin("#hdcdata_body");
        waitingDialog.hide();
    }
}
function getLinkageNhsoData(cid){
	var nhsoData = null;
	var linkage_settings = {
	  "async": false,
	  "crossDomain": true,
	  "url": localStorage.getItem("smarthealth_service_url")+"phps/api/00031/009/01",
	  "method": "POST",
	  "headers": {
	    "jwt-token": localStorage.getItem("jwt_token"),
	    "cache-control": "no-cache"
	  },
	  "data": cid
	}
	$.ajax(linkage_settings).done(function (response) {
		if(response.error){
			nhsoData = undefined;
		}else{
			nhsoData = response.data;
		}
	});
	if (nhsoData != undefined && nhsoData != null) {
		$("#li-right").css("display","none");
		$("#tab-right").css("display","none");
		var cardId = (nhsoData.maininscl =="WEL" ? nhsoData.cardId :  nhsoData.personId);
		var subHos = (nhsoData.hsubName != undefined && nhsoData.hsubName != null ? nhsoData.hsubName :  '<span class=\"glyphicon glyphicon-option-horizontal\"></span>');
		
		var active_select  = ($( "#li-linkage-nhso" ).hasClass( "active" ) == true) ? "active" : "";
		$("#li-linkage-nhso").remove();
		$("#tab-head-btn").append('<li class="'+active_select+'" id="li-linkage-nhso"><a data-toggle="tab" href="#tab-linkage-nhso" id=""><span class="fa fa-credit-card"></span> เธชเธดเธ—เธเธดเธเธฒเธฃเธฃเธฑเธเธฉเธฒ</a></li>');
		var tab_content = '<div id="tab-linkage-nhso" class="tab-pane '+active_select+'">'
			+ '		<div class="table-responsive">'
			+ '			<table class="table table-bordered table-striped" style="margin-bottom: 0px;">'
			+ '				<tr>'
			+ '					<th width="13%" class="text-right">เธชเธดเธ—เธเธดเธฃเธฑเธเธฉเธฒเธเธขเธฒเธเธฒเธฅ</th>'
			+ '					<td width="20%">'+ifNullValue(nhsoData.maininsclName)+'</td>'
			+ '					<th width="13%" class="text-right">เน€เธฅเธเธ—เธตเนเธเธฑเธ•เธฃ</th>'
			+ '					<td width="20%">'+cardId+'</td>'
			+ '					<th width="14%" class="text-right">เธฃเธ.เธซเธฅเธฑเธ(CUP)</th>'
			+ '					<td width="20%">'+ifNullValue(nhsoData.hmainName)+'</td>'
			+ '				</tr>'
			+ '				<tr>'
			+ '					<th class="text-right">เธฃเธ.เธฃเธญเธ(PCU)</th>'
			+ '					<td>'+subHos+'</td>'
			+ '					<th class="text-right">เธเธฑเธเธซเธงเธฑเธ”</th>'
			+ '					<td>'+ifNullValue(nhsoData.purchaseprovinceName)+'</td>'
			+ '					<th class="text-right">เธงเธฑเธเน€เธฃเธดเนเธกเธกเธตเธชเธดเธ—เธเธด</th>'
			+ '					<td>'+ifNullValue(getThaiDate(nhsoData.startdate))+'</td>'
			+ '				</tr>'
			+ '				<tr>'
			+ '					<th class="text-right">เธงเธฑเธเธซเธกเธ”เธญเธฒเธขเธธ</th>'
			+ '					<td>'+ifNullValue(getThaiDate(nhsoData.expdate))+'</td>'
			+ '					<th class="text-right">wsStatus</th>'
			+ '					<td>'+ifNullValue(nhsoData.wsStatus)+'</td>'
			+ '					<th class="text-right">wsDataSource</th>'
			+ '					<td>'+ifNullValue(nhsoData.wsDataSource)+'</td>'
			+ '				</tr>'
			+ '			</table>'
			+ '		</div>'
			+ '</div>';
		$("#tab-linkage-nhso").remove();
		$("#tab-content-div").append(tab_content);
		
    }else{
    	swal("เธเธดเธ”เธเธฅเธฒเธ”", "เนเธกเนเธชเธฒเธกเธฒเธฃเธ–เน€เธฃเธตเธขเธเนเธเนเธเนเธญเธกเธนเธฅเธเธฒเธ linkage center เนเธ”เน", "error");
    }
	
}
function getLinkageTabienradData(cid){
	// data tabien-rad
	var tabienrad = null;
	var linkage_settings = {
	  "async": false,
	  "crossDomain": true,
	  "url": localStorage.getItem("smarthealth_service_url")+"phps/api/00023/001/01",
	  "method": "POST",
	  "headers": {
	    "jwt-token": localStorage.getItem("jwt_token"),
	    "cache-control": "no-cache"
	  },
	  "data": cid
	}

	$.ajax(linkage_settings).done(function (response) {
		if(response.error){
			tabienrad = undefined;
		}else{
			tabienrad = response.data;
		}
	});
	
	var tabienrad_addr = null;
	var linkage2_settings = {
	  "async": false,
	  "crossDomain": true,
	  "url": localStorage.getItem("smarthealth_service_url")+"phps/api/00023/008/01",
	  "method": "POST",
	  "headers": {
	    "jwt-token": localStorage.getItem("jwt_token"),
	    "cache-control": "no-cache"
	  },
	  "data": cid
	}

	$.ajax(linkage2_settings).done(function (response) {
		if(response.error){
			tabienrad_addr = undefined;
		}else{
			tabienrad_addr = response.data;
		}
	});
	
	if((tabienrad_addr != undefined && tabienrad_addr != null) && (tabienrad != undefined && tabienrad != null)){
		var active_select  = ($( "#li-tabien-rad" ).hasClass( "active" ) == true) ? "active" : "";
		$("#li-tabien-rad").remove();
		$("#tab-head-btn").append('<li class="'+active_select+'" id="li-tabien-rad"><a data-toggle="tab" href="#tab-tabien-rad" id=""><span class="fa fa-link"></span> เธเนเธญเธกเธนเธฅเธ—เธฐเน€เธเธตเธขเธเธฃเธฒเธฉเธเธฃเน</a></li>');
		var tab_content = '<div id="tab-tabien-rad" class="tab-pane '+active_select+'">'
			+ '		<div class="table-responsive">'
			+ '			<table class="table table-bordered table-striped" style="margin-bottom: 0px;">'
			+ '				<tr>'
			+ '					<th width="13%" class="text-right">เธเธทเนเธญ</th>'
			+ '					<td width="20%">'+tabienrad.titleDesc+''+ifNullValue(tabienrad.firstName)+'</td>'
			+ '					<th width="13%" class="text-right">เธเธฒเธกเธชเธเธธเธฅ</th>'
			+ '					<td width="20%">'+ifNullValue(tabienrad.lastName)+'</td>'
			+ '					<th width="14%" class="text-right">เธญเธฒเธขเธธ</th>'
			+ '					<td width="20%">'+ifNullValue(tabienrad.age)+' เธเธต</td>'
			+ '				</tr>'
			+ '				<tr>'
			+ '					<th class="text-right">เน€เธเธจ</th>'
			+ '					<td>'+ifNullValue(tabienrad.genderDesc)+'</td>'
			+ '					<th class="text-right">เธงเธฑเธเน€เธเธดเธ”</th>'
			+ '					<td>'+ifNullValue(getThaiDate(tabienrad.dateOfBirth))+'</td>'
			+ '					<th class="text-right">เธชเธฑเธเธเธฒเธ•เธด</th>'
			+ '					<td>'+ifNullValue(tabienrad.nationalityDesc)+'</td>'
			+ '				</tr>'
			+ '				<tr>'
			+ '					<th class="text-right">เธเธดเธ”เธฒ</th>'
			+ '					<td>'+ifNullValue(tabienrad.fatherName)+'</td>'
			+ '					<th class="text-right">เน€เธฅเธเธเธฃเธฐเธเธณเธ•เธฑเธงเธเธฃเธฐเธเธฒเธเธ</th>'
			+ '					<td>'+ifNullValue(idNoFormat(tabienrad.fatherPersonalID))+'</td>'
			+ '					<th class="text-right">เธชเธฑเธเธเธฒเธ•เธด</th>'
			+ '					<td>'+ifNullValue(tabienrad.fatherNationalityDesc)+'</td>'
			+ '				</tr>'
			+ '				<tr>'
			+ '					<th class="text-right">เธกเธฒเธฃเธ”เธฒ</th>'
			+ '					<td>'+ifNullValue(tabienrad.motherName)+'</td>'
			+ '					<th class="text-right">เน€เธฅเธเธเธฃเธฐเธเธณเธ•เธฑเธงเธเธฃเธฐเธเธฒเธเธ</th>'
			+ '					<td>'+ifNullValue(idNoFormat(tabienrad.motherPersonalID))+'</td>'
			+ '					<th class="text-right">เธชเธฑเธเธเธฒเธ•เธด</th>'
			+ '					<td>'+ifNullValue(tabienrad.motherNationalityDesc)+'</td>'
			+ '				</tr>'
			+ '				<tr>'
			+ '					<th class="text-left"></th>'
			+ '					<th colspan="5" class="text-left">เธ—เธตเนเธญเธขเธนเนเธ•เธฒเธกเธ—เธฐเน€เธเธตเธขเธเธเนเธฒเธ</th>'
			+ '				</tr>'
			+ '				<tr>'
			+ '					<th class="text-right">เธฃเธซเธฑเธชเธเนเธฒเธ</th>'
			+ '					<td colspan="5">'+ifNullValue(tabienrad_addr.houseID)+'</td>'
			+ '				</tr>'
			+ '				<tr>'
			+ '					<th class="text-right">เน€เธฅเธเธ—เธตเนเธเนเธฒเธ</th>'
			+ '					<td>'+ifNullValue(tabienrad_addr.houseNo)+'</td>'
			+ '					<th class="text-right">เธซเธกเธนเน</th>'
			+ '					<td>'+ifNullValue(tabienrad_addr.villageNo)+'</td>'
			+ '					<th class="text-right">เธ–เธเธ</th>'
			+ '					<td>'+ifNullValue(tabienrad_addr.roadDesc)+'</td>'
			+ '				</tr>'
			+ '				<tr>'
			+ '					<th class="text-right">เธ•เธณเธเธฅ</th>'
			+ '					<td>'+ifNullValue(tabienrad_addr.subdistrictDesc)+'</td>'
			+ '					<th class="text-right">เธญเธณเน€เธ เธญ</th>'
			+ '					<td>'+ifNullValue(tabienrad_addr.districtDesc)+'</td>'
			+ '					<th class="text-right">เธเธฑเธเธซเธงเธฑเธ”</th>'
			+ '					<td>'+ifNullValue(tabienrad_addr.provinceDesc)+'</td>'
			+ '				</tr>'
			+ '			</table>'
			+ '		</div>'
			+ '</div>';
		$("#tab-tabien-rad").remove();
		$("#tab-content-div").append(tab_content);
	}else{
		swal("เธเธดเธ”เธเธฅเธฒเธ”", "เนเธกเนเธชเธฒเธกเธฒเธฃเธ–เน€เธฃเธตเธขเธเนเธเนเธเนเธญเธกเธนเธฅเธเธฒเธ linkage center เนเธ”เน", "error");
	}
	
}
function convertFileToBase64viaFileReader(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = function () {
            callback(reader.result);
        };
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.send();
}

function doesFileExist(urlToFile)
{
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', urlToFile, false);
    xhr.send();
    console.log(xhr.status + "<<");
    if (xhr.status == "404") {
        console.log("File doesn't exist");
        return false;
    } else {
        console.log("File exists");
        return true;
    }
}
function getDataFromHDC(cid) {
    var settings = {
        "async": false,
        "url": "" + localStorage.getItem("smarthealth_service_url") + "phps/api/v1/person/findby/cid/" + cid,
        "method": "GET",
        "headers": {
            "JWT-TOKEN": localStorage.getItem("jwt_token")
        }
    }

    $.ajax(settings).done(function (response) {
        person = response;
    });
    $("#hdc_general_data").val(JSON.stringify(person));
//    var person;
//    $.ajax({
//        type: "GET",
//        contentType: "application/json",
//        url: "http://203.157.19.160:8080/api/v1/person/findby/cid/" + cid,
//        dataType: 'json',
//        cache: false,
//        timeout: 600000,
//        success: function (data) {
//            console.log("SUCCESS : ", data);
//            person = data;
//        },
//        error: function (e) {
//            console.log("ERROR : ", e);
//        },
//        statusCode: {
//            204: function (e) {
//                console.log("ERROR : ", e);
//            },
//            404: function (e) {
//                console.log("ERROR : ", e);
//            },
//            400: function (e) {
//                console.log("ERROR : ", e);
//            }
//        }
//    });

    if (person != undefined && Object.keys(person).length > 0) {
        clearHDCData();
        $("#cid").html(idNoFormat(person.cid));
        $("#moph_id").html(ifNullValue(person.moph_id));
        $("#hid").html(ifNullValue(person.hid));
        $("#prename").html(ifNullValue(person.prename));
        $("#prename_moi").html(ifNullValue(person.prename_moi));
        $("#name").html(ifNullValue(person.name));
        $("#lname").html(ifNullValue(person.lname));
        $("#sex").html(ifNullValue(person.sex));
        $("#birth").html(ifNullValue(person.birth));
        $("#birth_moi").html(ifNullValue(person.birth_moi));
        $("#mstatus").html(ifNullValue(person.mstatus));
        $("#occupation_old").html(ifNullValue(person.occupation_old));
        $("#occupation_new").html(ifNullValue(person.occupation_new));
        $("#race").html(ifNullValue(person.race));
        $("#nation").html(ifNullValue(person.nation));
        $("#religion").html(ifNullValue(person.religion));
        $("#education").html(ifNullValue(person.education));
        $("#fstatus").html(ifNullValue(person.fstatus));
        $("#father").html(idNoFormat(person.father) + (person.father != "" && person.father != null ? '<button onclick="showModalData(\'father\',\'' + person.father + '\');" class="btn btn-success flat btn-xs pull-right"><span class="glyphicon glyphicon-eye-open"></span></button>' : ''));
        $("#mother").html(idNoFormat(person.mother) + (person.mother != "" && person.mother != null ? '<button onclick="showModalData(\'mother\',\'' + person.mother + '\');" class="btn btn-success flat btn-xs pull-right"><span class="glyphicon glyphicon-eye-open"></span></button>' : ''));
        $("#couple").html(person.couple + (person.couple != "" && person.couple != null ? '<button onclick="showModalData(\'couple\',\'' + person.couple + '\');" class="btn btn-success flat btn-xs pull-right"><span class="glyphicon glyphicon-eye-open"></span></button>' : ''));
        $("#vstatus").html(ifNullValue(person.vstatus));
        $("#movein").html(ifNullValue(person.movein));
        $("#discharge").html(ifNullValue(person.discharge));
        $("#ddischarge").html(ifNullValue(person.ddischarge));
        $("#date_discharge_moi").html(ifNullValue(person.date_discharge_moi));
        $("#abogroup").html(ifNullValue(person.abogroup));
        $("#rhgroup").html(ifNullValue(person.rhgroup));
        $("#labor").html(ifNullValue(person.labor));
        $("#passport").html(ifNullValue(person.passport));
        $("#typearea").html(ifNullValue(person.typearea));
        $("#d_update").html(ifNullValue(person.d_update));

        //show address type 1
        var addr = getAddressByType(cid, 1);
        $("#hdc_address_data").val(JSON.stringify(addr));
        if (Object.keys(addr).length > 0) {
            $("#addresstype").html(ifNullValue(addr.addresstype));
            $("#houseId").html(ifNullValue(addr.houseId));
            $("#housetype").html(ifNullValue(addr.housetype));
            $("#roomno").html(ifNullValue(addr.roomno));
            $("#condo").html(ifNullValue(addr.condo));
            $("#houseno").html(ifNullValue(addr.houseno));
            $("#soisub").html(ifNullValue(addr.soisub));
            $("#soimain").html(ifNullValue(addr.soimain));
            $("#road").html(ifNullValue(addr.road));
            $("#villaname").html(ifNullValue(addr.villaname));
            $("#village").html(ifNullValue(addr.village));
            $("#tambon").html(ifNullValue(addr.tambon));
            $("#ampur").html(ifNullValue(addr.ampur));
            $("#changwat").html(ifNullValue(addr.changwat));
            $("#telephone").html(ifNullValue(addr.telephone));
            $("#mobile").html(ifNullValue(addr.mobile));
        }
        
        //show drugallergy
        var drugallergy = getDrugAllergy(cid);
        $("#hdc_drugallergy_data").val(JSON.stringify(drugallergy));
        $("#drugallergyTbody").html("");
        if (Object.keys(drugallergy).length > 0) {
            var drugLine = drugallergy.data;
            $.each(drugLine, function (index, obj) {
                var table = '';
                table += '<tr>';
                table += '	<td>' + ifNullValue(obj.daterecord) + '</td>';
                table += '	<td>' + ifNullValue(obj.drugcode) + '</td>';
                table += '	<td>' + ifNullValue(obj.drugname) + '</td>';
                table += '	<td>' + ifNullValue(obj.typedxcode) + ' : ' + ifNullValue(obj.typedx) + '</td>';
                table += '	<td>' + ifNullValue(obj.allerglevelcode) + ' : ' + ifNullValue(obj.allerglevel) + '</td>';
                table += '	<td>' + ifNullValue(obj.allergsymptomcode) + ' : ' + ifNullValue(obj.allergsymptom) + '</td>';
                table += '	<td>' + ifNullValue(obj.informat) + '</td>';
                table += '	<td>' + ifNullValue(obj.inforhosp) + '</td>';
                table += '</tr>';
                $("#drugallergyTbody").append(table);
            });
            if (drugLine.length == 0) {
                $("#drugallergyTbody").html('<tr><td colspan="8" class="text-center">เนเธกเนเธกเธตเธเนเธญเธกเธนเธฅ</td></tr>');
            }
        }
        
        
        
        var old = ($("#current_cid").val() != "" ? JSON.parse($("#current_cid").val()) : new Array());//[{cid:"",name:""}]
        old.push({cid: person.cid, name: person.prename_moi + "" + person.name + " " + person.lname});
        $("#current_cid").val(JSON.stringify(old));

    } else {
        clearHDCData();
        swal("เธเธดเธ”เธเธฅเธฒเธ”", "เนเธกเนเธเธเธเนเธญเธกเธนเธฅเธเธฒเธเธฃเธฐเธเธ HDC", "error");
    }
}
function showNhsoData(staffcid, smctoken, personid) {
    var nhso = null;
    var settings = {
        "async": false,
        "url": "" + localStorage.getItem("smarthealth_service_url") + "phps/api/nhsodata/v1/search_by_pid?userPersonId=" + staffcid + "&smctoken=" + smctoken + "&personId=" + personid,
        "method": "GET",
        "headers": {
            "JWT-TOKEN": localStorage.getItem("jwt_token")
        }
    }

    $.ajax(settings).done(function (response) {
    	nhso = response;
    });

    if (nhso != undefined && Object.keys(nhso).length > 0) {
    	var cardId = (nhso.maininscl =="WEL" ? nhso.cardid :  nhso.personId);
        $("#nhso_cid").html(ifNullValue(cardId));
        $("#nhso_name").html(ifNullValue(nhso.fname) + " " + ifNullValue(nhso.lname));
        $("#nhso_right_main").html(ifNullValue(nhso.maininsclName));
        $("#nhso_right_sub").html(ifNullValue(nhso.subinsclName));
        $("#nhso_main_code").html(ifNullValue(nhso.maininscl));
        $("#nhso_main_hos").html(ifNullValue(nhso.hmainOpName));
        $("#nhso_sub_hos").html(ifNullValue(nhso.hsubName));
        $("#nhso_start").html(ifNullValue(getThaiDate(nhso.startdate)));
        $("#nhso_end").html(ifNullValue(getThaiDate(nhso.expdate)));
        $("#nhso_province").html(ifNullValue(nhso.purchaseprovinceName));
        if(nhso.wsStatusDesc != "ok"){
        	$("#nhso_error").html(nhso.wsStatusDesc);
        }else{
        	$("#nhso_error").html("");
        }
    }
    
}
function showModalData(type, cid) {
    $("#refferenceDataForm").modal('show');
    $("#tab-li-1").nextAll('li').remove();
    $("#tab-ref-1").nextAll('div').remove();
    $("#tab-li-1").after('<li class="pull-right header"><button type="button" style="margin-top: 8px;" class="close" data-dismiss="modal" >&times;</button></li>');
    activaTab('tab-ref-1');
    getDataRefference(cid, type);
    //generateNewTabData(type,cid);
}
function getDataRefference(cid, type) {
    $("#current_main").val(type);
    addLoadSpin("#referBody");

    var settings = {
        "async": false,
        "url": "" + localStorage.getItem("smarthealth_service_url") + "phps/api/v1/person/findby/cid/" + cid,
        "method": "GET",
        "headers": {
            "JWT-TOKEN": localStorage.getItem("jwt_token")
        }
    }

    $.ajax(settings).done(function (response) {
        person = response;
    });

    if (person != undefined && Object.keys(person).length > 0) {
        clearRefferenceData();
        $("#ref_cid").html(idNoFormat(person.cid));
        $("#ref_moph_id").html(ifNullValue(person.moph_id));
        $("#ref_hid").html(ifNullValue(person.hid));
        $("#ref_prename").html(ifNullValue(person.prename));
        $("#ref_prename_moi").html(ifNullValue(person.prename_moi));
        $("#ref_name").html(ifNullValue(person.name));
        $("#ref_lname").html(ifNullValue(person.lname));
        $("#ref_sex").html(ifNullValue(person.sex));
        $("#ref_birth").html(ifNullValue(person.birth));
        $("#ref_birth_moi").html(ifNullValue(person.birth_moi));
        $("#ref_mstatus").html(ifNullValue(person.mstatus));
        $("#ref_occupation_old").html(ifNullValue(person.occupation_old));
        $("#ref_occupation_new").html(ifNullValue(person.occupation_new));
        $("#ref_race").html(ifNullValue(person.race));
        $("#ref_nation").html(ifNullValue(person.nation));
        $("#ref_religion").html(ifNullValue(person.religion));
        $("#ref_education").html(ifNullValue(person.education));
        $("#ref_fstatus").html(ifNullValue(person.fstatus));
        $("#ref_father").html(idNoFormat(person.father) + (person.father != "" && person.father != null && person.father.length == 13 ? '<button onclick="generateNewTabData(\'' + person.father + '\',\'father\');" class="btn btn-success flat btn-xs pull-right"><span class="glyphicon glyphicon-eye-open"></span></button>' : ''));
        $("#ref_mother").html(idNoFormat(person.mother) + (person.mother != "" && person.mother != null && person.mother.length == 13 ? '<button onclick="generateNewTabData(\'' + person.mother + '\',\'mother\');" class="btn btn-success flat btn-xs pull-right"><span class="glyphicon glyphicon-eye-open"></span></button>' : ''));
        $("#ref_couple").html(person.couple + (person.couple != "" && person.couple != null && person.couple.length == 13 ? '<button onclick="generateNewTabData(\'' + person.couple + '\',\'couple\');" class="btn btn-success flat btn-xs pull-right"><span class="glyphicon glyphicon-eye-open"></span></button>' : ''));
        /*$("#ref_father").html(idNoFormat(person.father) + (person.father != "" && person.father != null && person.father.length == 13 ? '' : ''));
         $("#ref_mother").html(idNoFormat(person.mother) + (person.mother != "" && person.mother != null && person.mother.length == 13 ? '' : ''));
         $("#ref_couple").html(person.couple + (person.couple != "" && person.couple != null && person.couple.length == 13 ? '' : ''));*/
        $("#ref_vstatus").html(ifNullValue(person.vstatus));
        $("#ref_movein").html(ifNullValue(person.movein));
        $("#ref_discharge").html(ifNullValue(person.discharge));
        $("#ref_ddischarge").html(ifNullValue(person.ddischarge));
        $("#ref_date_discharge_moi").html(ifNullValue(person.date_discharge_moi));
        $("#ref_abogroup").html(ifNullValue(person.abogroup));
        $("#ref_rhgroup").html(ifNullValue(person.rhgroup));
        $("#ref_labor").html(ifNullValue(person.labor));
        $("#ref_passport").html(ifNullValue(person.passport));
        $("#ref_typearea").html(ifNullValue(person.typearea));
        $("#ref_d_update").html(ifNullValue(person.d_update));
        var old = ($("#current_cid").val() != "" ? JSON.parse($("#current_cid").val()) : new Array());//[{cid:"",name:""}]
        old.push({cid: person.cid, name: person.prename_moi + "" + person.name + " " + person.lname});
        $("#current_cid").val(JSON.stringify(old));

        if (type == "father") {
            $("#tab-a-1").html("เธเธดเธ”เธฒ <span class='glyphicon glyphicon-chevron-right'></span> " + person.prename_moi + "" + person.name + " " + person.lname);
        } else if (type == "mother") {
            $("#tab-a-1").html("เธกเธฒเธฃเธ”เธฒ <span class='glyphicon glyphicon-chevron-right'></span> " + person.prename_moi + "" + person.name + " " + person.lname);
        } else if (type == "couple") {
            $("#tab-a-1").html("เธเธนเนเธชเธกเธฃเธช <span class='glyphicon glyphicon-chevron-right'></span> " + person.prename_moi + "" + person.name + " " + person.lname);
        }

        removeLoadSpin("#referBody");
        waitingDialog.hide();

    } else {
        clearRefferenceData();
        removeLoadSpin("#referBody");
        waitingDialog.hide();
        swal("เธเธดเธ”เธเธฅเธฒเธ”", "เนเธกเนเธเธเธเนเธญเธกเธนเธฅเธเธฒเธเธฃเธฐเธเธ HDC", "error");
    }
}

function generateNewTabData(cid, type) {
    var table = "<div class=\"table-responsive\">"
            + "    <table class=\"table table-bordered table-striped\" style=\"margin-bottom: 10px;\">"
            + "        <tr>"
            + "            <th width=\"13%\">เน€เธฅเธเธ—เธตเนเธเธฑเธ•เธฃเธเธฃเธฐเธเธฒเธเธ</th>"
            + "            <td width=\"20%\"><span id=\"ref_cid_" + cid + "\"></span></td>"
            + "            <th width=\"13%\">MOPH_ID</th>"
            + "            <td width=\"20%\"><span id=\"ref_moph_id_" + cid + "\"></span></td>"
            + "            <td rowspan=\"4\" width=\"34%\" class=\"text-right bg-gray-light\"><img src=\"images/default-avatar.jpg\" id=\"ref_hdc_img_" + cid + "\" height=\"130\"></td>"
            + "        </tr>"
            + "        <tr>"
            + "            <th>เธฃเธซเธฑเธชเธเนเธฒเธ</th>"
            + "            <td><span id=\"ref_hid_" + cid + "\"></span></td>"
            + "            <th>เธเนเธฒเธเนเธฒเธซเธเนเธฒ</th>"
            + "            <td><span id=\"ref_prename_" + cid + "\"></span></td>"
            + "        </tr>"
            + "        <tr>"
            + "            <th>PRENAME_MOI</th>"
            + "            <td><span id=\"ref_prename_moi_" + cid + "\"></span></td>"
            + "            <th>เธเธทเนเธญ-เธเธฒเธกเธชเธเธธเธฅ</th>"
            + "            <td><span id=\"ref_name_" + cid + "\"></span> <span id=\"ref_lname_" + cid + "\"></span></td>"
            + "        </tr>"
            + "        <tr>"
            + "            <th>เน€เธเธจ</th>"
            + "            <td><span id=\"ref_sex_" + cid + "\"></span></td>"
            + "            <th>เธงเธฑเธเน€เธเธดเธ”</th>"
            + "            <td><span id=\"ref_birth_" + cid + "\"></span></td>"
            + "        </tr>"
            + "    </table>"
            + "    <table class=\"table table-striped\" style=\"margin-bottom: 10px;\">"
            + "        <tr>"
            + "            <th width=\"13%\">BIRTH_MOI</th>"
            + "            <td width=\"20%\"><span id=\"ref_birth_moi_" + cid + "\"></span></td>"
            + "            <th width=\"13%\">เธชเธ–เธฒเธเธฐเธชเธกเธฃเธช</th>"
            + "            <td width=\"20%\"><span id=\"ref_mstatus_" + cid + "\"></span></td>"
            + "            <th width=\"14%\">เธญเธฒเธเธตเธ(เธฃเธซเธฑเธชเน€เธเนเธฒ)</th>"
            + "            <td width=\"20%\"><span id=\"ref_occupation_old_" + cid + "\"></span></td>"
            + "        </tr>"
            + "        <tr>"
            + "            "
            + "            <th>เธญเธฒเธเธตเธ(เธฃเธซเธฑเธชเนเธซเธกเน)</th>"
            + "            <td><span id=\"ref_occupation_new_" + cid + "\"></span></td>"
            + "            <th>เน€เธเธทเนเธญเธเธฒเธ•เธด</th>"
            + "            <td><span id=\"ref_race_" + cid + "\"></span></td>"
            + "            <th>เธชเธฑเธเธเธฒเธ•เธด</th>"
            + "            <td><span id=\"ref_nation_" + cid + "\"></span></td>"
            + "        </tr>"
            + "        <tr>"
            + "            <th>เธจเธฒเธชเธเธฒ</th>"
            + "            <td><span id=\"ref_religion_" + cid + "\"></span></td>"
            + "            <th>เธฃเธฐเธ”เธฑเธเธเธฒเธฃเธจเธถเธเธฉเธฒ</th>"
            + "            <td><span id=\"ref_education_" + cid + "\"></span></td>"
            + "            <th>เธฃเธซเธฑเธช CID เธเธดเธ”เธฒ</th>"
            + "            <td><span id=\"ref_father_" + cid + "\"></span></td>"
            + "        </tr>"
            + "        <tr>"
            + "            <th>เธฃเธซเธฑเธช CID เธกเธฒเธฃเธ”เธฒ</th>"
            + "            <td><span id=\"ref_mother_" + cid + "\"></span></td>"
            + "            <th>เธชเธ–เธฒเธเธฐเนเธเธเธฃเธญเธเธเธฃเธฑเธง</th>"
            + "            <td><span id=\"ref_fstatus_" + cid + "\"></span></td>"
            + "            <th>เธฃเธซเธฑเธช CID เธเธนเนเธชเธกเธฃเธช</th>"
            + "            <td><span id=\"ref_couple_" + cid + "\"></span></td>"
            + "        </tr>          "
            + "        <tr>"
            + "            <th>เธชเธ–เธฒเธเธฐ/เธชเธฒเน€เธซเธ•เธธเธเธฒเธฃเธเนเธฒเธซเธเนเธฒเธข</th>"
            + "            <td><span id=\"ref_discharge_" + cid + "\"></span></td>"
            + "            <th>เธงเธฑเธเธ—เธตเนเธเนเธฒเธซเธเนเธฒเธข</th>"
            + "            <td><span id=\"ref_ddischarge_" + cid + "\"></span></td>"
            + "            <th>DATE_DISCHARGE_MOI</th>"
            + "            <td><span id=\"ref_date_discharge_moi_" + cid + "\"></span></td>"
            + "        </tr>"
            + "        <tr>"
            + "            <th>เธซเธกเธนเนเน€เธฅเธทเธญเธ”</th>"
            + "            <td><span id=\"ref_abogroup_" + cid + "\"></span></td>"
            + "            <th>เธซเธกเธนเนเน€เธฅเธทเธญเธ” RH</th>"
            + "            <td><span id=\"ref_rhgroup_" + cid + "\"></span></td>"
            + "            <th>เธฃเธซเธฑเธชเธเธงเธฒเธกเน€เธเนเธเธเธเธ•เนเธฒเธเธ”เนเธฒเธง</th>"
            + "            <td><span id=\"ref_labor_" + cid + "\"></span></td>"
            + "        </tr>"
            + "        <tr>"
            + "            <th>VSTATUS</th>"
            + "            <td><span id=\"ref_vstatus_" + cid + "\"></span></td>"
            + "            <th>เธงเธฑเธเธ—เธตเนเธขเนเธฒเธขเน€เธเนเธฒเธกเธฒเน€เธเธ•เธเธทเนเธเธ—เธตเน</th>"
            + "            <td><span id=\"ref_movien_" + cid + "\"></span></td>"
            + "            <th>เน€เธฅเธเธ—เธตเน passport</th>"
            + "            <td><span id=\"ref_passport_" + cid + "\"></span></td>                                            "
            + "        </tr>"
            + "        <tr>"
            + "            <th>เธชเธ–เธฒเธเธฐเธเธธเธเธเธฅ</th>"
            + "            <td><span id=\"ref_typearea_" + cid + "\"></span></td>"
            + "            <th>เธงเธฑเธเน€เธ”เธทเธญเธเธเธตเธ—เธตเนเธเธฃเธฑเธเธเธฃเธธเธเธเนเธญเธกเธนเธฅ</th>"
            + "            <td colspan=\"3\"><span id=\"ref_d_update_" + cid + "\"></span></td>"
            + "        </tr>"
            + "    </table>"
            + "</div>";

    //addLoadSpin("#referBody");
    var settings = {
        "async": false,
        "url": "" + localStorage.getItem("smarthealth_service_url") + "phps/api/v1/person/findby/cid/" + cid,
        "method": "GET",
        "headers": {
            "JWT-TOKEN": localStorage.getItem("jwt_token")
        }
    }

    $.ajax(settings).done(function (response) {
        person = response;
    });
    if (!$("#tab-ref-" + cid).length) {
        $("#tab-li-1").after('<li id="tab-li-' + cid + '"><a id="tab-a-' + cid + '" data-toggle="tab" href="#tab-ref-' + cid + '">' + cid + '<button type="button" onclick="removeTab(\'' + cid + '\');" style="margin-left: 10px;" class="close">&times;</button></a></li>');
        $("#tab-ref-1").after('<div id="tab-ref-' + cid + '" class="tab-pane">' + table + '</div>');
    }
    activaTab('tab-ref-' + cid);
    if (person != undefined && Object.keys(person).length > 0) {
        $("#ref_cid_" + cid).html(idNoFormat(person.cid));
        $("#ref_moph_id_" + cid).html(ifNullValue(person.moph_id));
        $("#ref_hid_" + cid).html(ifNullValue(person.hid));
        $("#ref_prename_" + cid).html(ifNullValue(person.prename));
        $("#ref_prename_moi_" + cid).html(ifNullValue(person.prename_moi));
        $("#ref_name_" + cid).html(ifNullValue(person.name));
        $("#ref_lname_" + cid).html(ifNullValue(person.lname));
        $("#tab-a-" + cid).html(person.prename_moi + "" + person.name + " " + person.lname + '<button type="button" onclick="removeTab(\'' + cid + '\');" style="margin-left: 10px;" class="close">&times;</button>');
        $("#ref_sex_" + cid).html(ifNullValue(person.sex));
        $("#ref_birth_" + cid).html(ifNullValue(person.birth));
        $("#ref_birth_moi_" + cid).html(ifNullValue(person.birth_moi));
        $("#ref_mstatus_" + cid).html(ifNullValue(person.mstatus));
        $("#ref_occupation_old_" + cid).html(ifNullValue(person.occupation_old));
        $("#ref_occupation_new_" + cid).html(ifNullValue(person.occupation_new));
        $("#ref_race_" + cid).html(ifNullValue(person.race));
        $("#ref_nation_" + cid).html(ifNullValue(person.nation));
        $("#ref_religion_" + cid).html(ifNullValue(person.religion));
        $("#ref_education_" + cid).html(ifNullValue(person.education));
        $("#ref_fstatus_" + cid).html(ifNullValue(person.fstatus));
        $("#ref_father_" + cid).html(idNoFormat(person.father) + (person.father != "" && person.father != null && person.father.length == 13 ? '<button onclick="showModalData(\'father\',\'' + person.father + '\');" class="btn btn-success flat btn-xs pull-right"><span class="glyphicon glyphicon-eye-open"></span></button>' : ''));
        $("#ref_mother_" + cid).html(idNoFormat(person.mother) + (person.mother != "" && person.mother != null && person.mother.length == 13 ? '<button onclick="showModalData(\'mother\',\'' + person.mother + '\');" class="btn btn-success flat btn-xs pull-right"><span class="glyphicon glyphicon-eye-open"></span></button>' : ''));
        $("#ref_couple_" + cid).html(person.couple + (person.couple != "" && person.couple != null && person.couple.length == 13 ? '<button onclick="showModalData(\'couple\',\'' + person.couple + '\');" class="btn btn-success flat btn-xs pull-right"><span class="glyphicon glyphicon-eye-open"></span></button>' : ''));
        /*$("#ref_father").html(idNoFormat(person.father) + (person.father != "" && person.father != null && person.father.length == 13 ? '' : ''));
         $("#ref_mother").html(idNoFormat(person.mother) + (person.mother != "" && person.mother != null && person.mother.length == 13 ? '' : ''));
         $("#ref_couple").html(person.couple + (person.couple != "" && person.couple != null && person.couple.length == 13 ? '' : ''));*/
        $("#ref_vstatus_" + cid).html(ifNullValue(person.vstatus));
        $("#ref_movein_" + cid).html(ifNullValue(person.movein));
        $("#ref_discharge_" + cid).html(ifNullValue(person.discharge));
        $("#ref_ddischarge_" + cid).html(ifNullValue(person.ddischarge));
        $("#ref_date_discharge_moi_" + cid).html(ifNullValue(person.date_discharge_moi));
        $("#ref_abogroup_" + cid).html(ifNullValue(person.abogroup));
        $("#ref_rhgroup_" + cid).html(ifNullValue(person.rhgroup));
        $("#ref_labor_" + cid).html(ifNullValue(person.labor));
        $("#ref_passport_" + cid).html(ifNullValue(person.passport));
        $("#ref_typearea_" + cid).html(ifNullValue(person.typearea));
        $("#ref_d_update_" + cid).html(ifNullValue(person.d_update));

        //removeLoadSpin("#referBody");

    } else {
        removeLoadSpin("#referBody");
        waitingDialog.hide();
        swal("เธเธดเธ”เธเธฅเธฒเธ”", "เนเธกเนเธเธเธเนเธญเธกเธนเธฅเธเธฒเธเธฃเธฐเธเธ HDC", "error");
    }
}
function clearHDCData() {
    $("#cid").html("");
    $("#moph_id").html("");
    $("#hid").html("");
    $("#prename").html("");
    $("#prename_moi").html("");
    $("#name").html("");
    $("#lname").html("");
    $("#sex").html("");
    $("#birth").html("");
    $("#birth_moi").html("");
    $("#mstatus").html("");
    $("#occupation_old").html("");
    $("#occupation_new").html("");
    $("#race").html("");
    $("#nation").html("");
    $("#religion").html("");
    $("#education").html("");
    $("#fstatus").html("");
    $("#father").html("");
    $("#mother").html("");
    $("#couple").html("");
    $("#vstatus").html("");
    $("#movein").html("");
    $("#discharge").html("");
    $("#ddischarge").html("");
    $("#date_discharge_moi").html("");
    $("#abogroup").html("");
    $("#rhgroup").html("");
    $("#labor").html("");
    $("#passport").html("");
    $("#typearea").html("");
    $("#d_update").html("");

    $("#addresstype").html("");
    $("#houseId").html("");
    $("#housetype").html("");
    $("#roomno").html("");
    $("#condo").html("");
    $("#houseno").html("");
    $("#soisub").html("");
    $("#soimain").html("");
    $("#road").html("");
    $("#villaname").html("");
    $("#village").html("");
    $("#tambon").html("");
    $("#ampur").html("");
    $("#changwat").html("");
    $("#telephone").html("");
    $("#mobile").html("");
}
function clearRefferenceData() {
    $("#ref_cid").html("");
    $("#ref_moph_id").html("");
    $("#ref_hid").html("");
    $("#ref_prename").html("");
    $("#ref_prename_moi").html("");
    $("#ref_name").html("");
    $("#ref_lname").html("");
    $("#ref_sex").html("");
    $("#ref_birth").html("");
    $("#ref_birth_moi").html("");
    $("#ref_mstatus").html("");
    $("#ref_occupation_old").html("");
    $("#ref_occupation_new").html("");
    $("#ref_race").html("");
    $("#ref_nation").html("");
    $("#ref_religion").html("");
    $("#ref_education").html("");
    $("#ref_fstatus").html("");
    $("#ref_father").html("");
    $("#ref_mother").html("");
    $("#ref_couple").html("");
    $("#ref_vstatus").html("");
    $("#ref_movein").html("");
    $("#ref_discharge").html("");
    $("#ref_ddischarge").html("");
    $("#ref_date_discharge_moi").html("");
    $("#ref_abogroup").html("");
    $("#ref_rhgroup").html("");
    $("#ref_labor").html("");
    $("#ref_passport").html("");
    $("#ref_typearea").html("");
    $("#ref_d_update").html("");
}
function clearIDCARDData() {
    $("#card_cid").html("");
    $("#card_name").html("");
    $("#card_dob").html("");
    $("#card_gender").html("");
    $("#card_issue_date").html("");
    $("#card_expire_date").html("");
    $("#card_address").html("");
    $("#card_img").attr("src", "images/default-avatar.jpg")
}
function clearNhsoData(){
	$("#nhso_cid").html("");
    $("#nhso_name").html("");
    $("#nhso_right_main").html("");
    $("#nhso_right_sub").html("");
    $("#nhso_main_code").html("");
    $("#nhso_main_hos").html("");
    $("#nhso_sub_hos").html("");
    $("#nhso_start").html("");
    $("#nhso_end").html("");
    $("#nhso_province").html("");
    $("#nhso_error").html("");
}
function addLoadSpinWithTimeout(selector, timeout) {
    $(selector).removeClass("box").addClass("box");
    $(selector).find(".overlay").remove();
    $(selector).append('<div class="overlay load_spin"><i class="fa fa-spinner fa-pulse" style="font-size:54px;"></i></div>');
    setTimeout(() => {
        console.log($(".load_spin").length);
        if ($(".load_spin").length >= 1) {
            $(selector).removeClass("box");
            $(selector).find(".load_spin").remove();
        }
    }, timeout * 1000);
}

function addLoadSpin(selector) {
    $(selector).removeClass("box").addClass("box");
    $(selector).find(".overlay").remove();
    $(selector).append('<div class="overlay load_spin"><i class="fa fa-spinner fa-pulse" style="font-size:54px;"></i></div>');
    setTimeout(() => {
        if ($(".load_spin")) {
            $(selector).removeClass("box");
            $(selector).find(".load_spin").remove();
        }
    }, 30 * 1000);
}

function removeLoadSpin(selector) {
    $(selector).removeClass("box");
    $(selector).find(".load_spin").remove();
}
function idNoFormat(str) {
    var format = "";
    if (str != null && str != "" && str != "null") {
        format = str.substring(0, 1) + "-" + str.substring(1, 5) + "-" + str.substring(5, 10) + "-" + str.substring(10, 12) + "-" + str.substring(12, 13);
    } else {
        format = "-";
    }
    //x-xxxx-xxxxx-xx-x
    return format;
}

function getThaiDate(date) {//yyyy-mm-dd
    date = (date == "" || date == undefined || date.length < 8 || date == null ||  date == 'undefined' ? "00000000" : date);
    if (date != "00000000") {
        var year = date.substr(0, 4);
        var month = date.substr(4, 2);
        var day = date.substr(6, 2);
        var monthNamesThai = ["เธกเธเธฃเธฒเธเธก", "เธเธธเธกเธ เธฒเธเธฑเธเธเน", "เธกเธตเธเธฒเธเธก", "เน€เธกเธฉเธฒเธขเธ", "เธเธคเธฉเธ เธฒเธเธก", "เธกเธดเธ–เธธเธเธฒเธขเธ", "เธเธฃเธเธเธฒเธเธก", "เธชเธดเธเธซเธฒเธเธก", "เธเธฑเธเธขเธฒเธขเธ", "เธ•เธธเธฅเธฒเธเธก", "เธเธคเธจเธเธดเธเธฒเธขเธ", "เธเธฑเธเธงเธฒเธเธก"];
        return  parseInt(day) + " " + monthNamesThai[parseInt(month) - 1] + " " + parseInt(year);
    } else {
        return "เธงเธฑเธเธ—เธตเนเนเธกเนเธ–เธนเธเธ•เนเธญเธ";
    }
}
function getAddress(addr) {
    if (addr != "" && addr != undefined && addr != null && addr != "null") {
        addr = addr.replace(/#+/g, ' ').replace(/  +/g, ' ');
        return addr;
    } else {
        return "เธ—เธตเนเธญเธขเธนเนเนเธกเนเธ–เธนเธเธ•เนเธญเธ";
    }
}

function logOut() {
    localStorage.setItem("jwt_token", "");
    document.cookie = "XSRF-TOKEN="; 
    document.cookie = "_ga="; 
    document.cookie = "laravel_session="; 
    document.cookie = "laravel_token="; 
    window.location = localStorage.getItem("login_server_url") + "logout?redirect=" + localStorage.getItem("smarthealth_url") + "home"


//    $.ajax(settings).done(function (response) {
//        console.log(response);
//        swal("Logout", "loged out complete.", "success");
//    });
}

function showTab(panelid, number) {
    var count = 1;
    $('div#' + panelid + ' ul.nav li').each(function (i, li) {
        if (count == number) {
            $(li).addClass("active");
        } else {
            $(li).removeClass("active");
        }
        count = count + 1;
    });
    var count2 = 1;
    $('div#' + panelid + ' .tab-content div.tab-pane').each(function (i, div) {
        if (count2 == number) {
            $(div).addClass("in active");
        } else {
            $(div).removeClass("in active");
        }
        count2 = count2 + 1;
    });
}
function activaTab(tab) {
    $('.nav-tabs a[href="#' + tab + '"]').tab('show');
}


function disbledTab(tab) {
    $('#' + tab).click(function (event) {
        if ($(this).hasClass('disabled')) {
            return false;
        }
    });

}
function removeTab(cid) {
    $("#tab-li-" + cid).remove();
    $("#tab-ref-" + cid).remove();
    activaTab('tab-ref-1');
}
function exportJS() {
    var general = $("#hdc_general_data").val();
    var address = $("#hdc_address_data").val();
    var js = {
        "general": (general != undefined && general != "" ? JSON.parse(general) : {}),
        "address": (address != undefined && address != "" ? JSON.parse(address) : {})
    };
    js = JSON.stringify(js);
    $("#json_show").val(js);
    $("#exportForm").modal("show");
}
function downloadFile(filename, elId, mimeType) {
    var elHtml = document.getElementById(elId).value;
    var link = document.createElement('a');
    mimeType = mimeType || 'text/plain';
    link.setAttribute('download', filename);
    link.setAttribute('href', 'data:' + mimeType + ';charset=utf-8,' + encodeURIComponent(elHtml));
    link.click();
}
function printData() {
    var general = $("#hdc_general_data").val();
    var address = $("#hdc_address_data").val();
    var js = {
        "general": (general != undefined && general != "" ? JSON.parse(general) : {}),
        "address": (address != undefined && address != "" ? JSON.parse(address) : {})
    };
    //js = JSON.stringify(js);
    var win = window.open("" + localStorage.getItem("smarthealth_url") + "print?param=" + js, '_blank');
    win.focus();
}

function showSetting() {
    $("#settingForm").modal("show");
}
function showHealthCerForm() {
    $("#healthCerForm").modal("show");
}
function verifyUserData() {
    $("#verifyUserDataForm").modal("show");
}
function verifyDoctor() {
    $("#verifyDoctorForm").modal("show");
}
function acceptVerifyUserData() {
    $("#verifyUserDataForm").modal("hide");
    $("#btnShowExceptUserDataForm").removeClass("btn-danger").addClass("btn-success");
    $(".userStatus").html("<span class='fa fa-check-circle' style='color:green;font-size:1.5em;'></span>");
}
function acceptVerifyDoctor() {
    $("#verifyDoctorForm").modal("hide");
    $("#btnShowExceptDoctorForm").removeClass("btn-danger").addClass("btn-success");
}
function applySetting() {
    var printdaemon_port = $("#printdaemon_port").val();
    localStorage.setItem("printdaemon_port", printdaemon_port);
    localStorage.setItem("smarthealth_service_url", $("#smarthealth_service_url").val());
    localStorage.setItem("smarthealth_url", $("#smarthealth_url").val());
    localStorage.setItem("login_server_url", $("#login_server_url").val());
    localStorage.setItem("client_id", $("#client_id").val());
    localStorage.setItem("smc_token", $("#smc_token").val());
    localStorage.setItem("staff_cid", $("#staff_cid").val());
    $("#a_login_dropdown").attr("href", localStorage.getItem("login_server_url") + "oauth/authorize?client_id=" + localStorage.getItem("client_id") + "&redirect_uri=" + localStorage.getItem("smarthealth_url") + "callback&response_type=code&scope=");
    $("#settingForm").modal("hide");
}
function applyStarter() {
    var starter_setting = {
        "smarthealth_service_url": "https://smarthealth.service.moph.go.th/",
        "smarthealth_url": "https://smarthealth.moph.go.th/example/",
        "printdaemon_port": "https://localhost:8443/smartcard/",
        "login_server_url": "https://ictportal.moph.go.th/",
        "client_id": "19",
        "smctoken": "",
        "staffcid":""
    };
    $("#smarthealth_service_url").val(starter_setting.smarthealth_service_url);
    $("#smarthealth_url").val(starter_setting.smarthealth_url);
    $("#printdaemon_port").val(starter_setting.printdaemon_port);
    $("#login_server_url").val(starter_setting.login_server_url);
    $("#client_id").val(starter_setting.client_id);
    $("#smc_token").val(starter_setting.smctoken);
    $("#staff_cid").val(starter_setting.smctoken);
}
function ifNullValue(data) {
    var dt = data;
    if (data == null || data == "null" || data == "") {
        dt = "<span class=\"glyphicon glyphicon-option-horizontal\"></span>";
    }
    return dt;
}
function clearDataOnScreen(){
	clearHDCData();
	clearRefferenceData();
	clearIDCARDData();
	clearNhsoData();
	showTab("tab_detail", 1);
	$("#li-tabien-rad").remove();
	$("#li-linkage-nhso").remove();
	$("#tab-tabien-rad").remove();
	$("#tab-linkage-nhso").remove();
	$("#li-general").addClass("active");
	$("#tab-general").addClass("active");
}
function isSpecialUser(){
	var user_check = getUserInfo();
	return specialUser.contains(user_check.email);
}