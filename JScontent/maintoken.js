function mainToken(content, id = null) {
    $(".breadcrumb").empty().append($("<li class='breadcrumb-item active' aria-current='page'>Home</li>"))
    $(content).empty().append($("<span id='div_print'><button name='b_search' id='b_search' class='btn btn-success'>อ่านข้อมูลจากบัตร</button> <button id='print' class='btn btn-primary'>พิมพ์ข้อมูล</button></span><p>")
            ,$("<div class='card border-success'>"
            + "<div class='card-header'><b style='color: green'>ระบบ Smart health</b></div>"
            + "<div class='card-body text-success'>"
            + "<h5 class='card-title'>ผู้ใช้ระบบ Smart health</h5>"
            + "<p class='card-text' id='use_token'></p></div></div>"));
    $(".card-text#use_token").empty().append($("<span id='user'></span><p>"));
    //$("#print").attr( "onclick","printJS('print-form', 'html')");
    $("#print").attr( "onclick","window.print()");
    if ($.cookie("user_id") != '') {
        $("#user").empty().text($.cookie("name"));
    }
    
    var Readerurl = localStorage.getItem("Readerurl");
    var nhso_token = localStorage.getItem("nhso_token");
    var nhso_cid = localStorage.getItem("nhso_cid");
    
    function SmartCard() {
        var smc = new $.Deferred();
//    addLoadSpin("#smartcard_body");
//    addLoadSpin("#hdcdata_body");
        $.when($.getJSON(Readerurl+'data/')).done(function (data) { 
            smc.resolve(data);
        });
        return smc;
    }  
    
    $("button#b_search").click(function (e) { waitingDialog.show('กำลังอ่านข้อมูล');
        e.preventDefault();
        var count = 0;
                $(function readCard (){
            var timeOut;
            
            var SMC = SmartCard();
                $.when(SMC).done(function (data) { console.log("smart card :"); 
         var checkImg = doesFileExist(Readerurl + "picture/");
    if (SMC == undefined || (Object.keys(SMC).length < 9 || checkImg == false)) {
        timeOut = setTimeout(readCard, 2000);console.log(count);
        count++;
        if(count>=5){
          waitingDialog.hide();  
          clearTimeout(timeOut); 
          $(".row").remove();
          $("#message_smart").remove(); 
          $(".card-text#use_token").append($('<center id="message_smart"><div class="alert alert-danger"><h3>ไม่ได้เสียบ smart card </h3></div></center>'));
        }
        } else {
        clearTimeout(timeOut);
            
            $("#message_smart").remove(); 
            $(".card-text#use_token").append($("<div class='row'><form class='col-lg-12' id='print-form'> <div class='col-lg-12' id='smart'></div><div class='col-lg-12' id='moph'></div><div class='col-lg-12' id='general'></div><div class='col-lg-12' id='add_no'></div><div class='col-lg-12' id='drug'></div><div class='col-lg-12' id='right'></div></form></div>"))
            $("#smart").empty().append($("<div class='card border-primary'>"
                    + "<div class='card-header'><b style='color: green'>ข้อมูลจาก smart card</b></div>"
                    + "<div class='card-body text-primary'>"
                    + "<h5 class='card-title'>ข้อมูลจาก smart card</h5><hr>"
                    + "<div class='card-text' id='smart_data'></div></div></div><br>"));
            
            $("#moph").empty().append($("<div class='card border-success'>"
                    + "<div class='card-header'><b style='color: green'>ข้อมูลจากฐานข้อมูลผู้เข้ารับบริการของกระทรวงสาธารณสุข</b></div>"
                    + "<div class='card-body text-success'>"
                    + "<h5 class='card-title'>ข้อมูลจากกระทรวงสาธารณสุข</h5>"
                    + "<p class='card-text' id='moph_data'></p></div></div><br>"));
            
            $("#general").empty().append($("<div class='card border-info'>"
                    + "<div class='card-header'><b style='color: green'>ข้อมูลทั่วไป</b></div>"
                    + "<div class='card-body text-info'>"
                    + "<h5 class='card-title'>ข้อมูลทั่วไป</h5>"
                    + "<p class='card-text' id='general_data'></p></div></div><br>"));
            
            $("#add_no").empty().append($("<div class='card border-secondary'>"
                    + "<div class='card-header'><b style='color: green'>ที่อยู่</b></div>"
                    + "<div class='card-body text-secondary'>"
                    + "<h5 class='card-title'>ข้อมูลที่อยู่</h5>"
                    + "<p class='card-text' id='add_data'></p></div></div><br>"));
            
            $("#drug").empty().append($("<div class='card border-danger'>"
                    + "<div class='card-header'><b style='color: red'>ข้อมูลการแพ้ยา</b></div>"
                    + "<div class='card-body text-danger'>"
                    + "<h5 class='card-title'>ข้อมูลการแพ้ยา</h5>"
                    + "<div class='col-lg-12  table-responsive'><p class='card-text' id='drug_data'></p></div></div></div><br>"));  
            
            $("#right").empty().append($("<div class='card border-warning'>"
                    + "<div class='card-header'><b style='color: green'>ข้อมูลสิทธิ</b></div>"
                    + "<div class='card-body text-warning'>"
                    + "<h5 class='card-title'>ข้อมูลสิทธิ</h5>"
                    + "<p class='card-text' id='right_treatment'></p></div></div>"));  
               
                $("img#hdc_img").remove();
                var sex;
                if(data.gender == 1){
                    sex = 'ชาย';
                }else{
                    sex = 'หญิง';
                }
            $("#smart_data").empty().html("ชื่อ-นามสกุล : "+data.prename + data.fname + ' ' + data.lname+" เลขบัตรประชาชน : "+data.cid+"<br>"
                                        +"วันเกิด : "+getThaiDate(data.dob)+" เพศ : "+sex+"<br>"
                                        +"วันที่ออกบัตร : "+getThaiDate(data.issue_date)+" วันทีหมดอายุ : "+getThaiDate(data.expire_date)+"<br>"
                                        +"ที่อยู่ : "+getAddress(data.address)).prepend($("<img class='block' id='hdc_img' height='115'>"));
                $("img#hdc_img").empty().attr("src", Readerurl+"picture/" + data.cid);
            
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://smarthealth.service.moph.go.th/phps/api/person/v2/findby/cid?cid=" + data.cid,
                "method": "GET",
                "headers": {
                    "jwt-token": $.cookie("jwt_token"),
                    "Cache-Control": "no-cache",
                    "Jvteam-Token": "15e519b8-f53f-4bbd-a391-ee1711f60052"
                }
            }
            $.ajax(settings).done(function (response) {
                console.log("moph person : ");
                console.log(response);
                
                if (response.status == "204") {
                    $("#smart_data").html('<center id="message_error"><div class="alert alert-danger"><h3>ไม่มีเลขบัตรนี้ : ' + response.message + ' </h3></div></center>');
                } else {
                    
                            
                    $("#message_error").remove(); 
                    var sex_moph;
                if(response.sex == 1){
                    sex_moph = 'ชาย';
                }else{
                    sex_moph = 'หญิง';
                }
                    $("#moph_data").html("เลขบัตรประชาชน : "+response.cid+" moph_id : "+response.moph_id+"<br>รหัสบ้าน : "+response.hid+" ชื่อ-นามสกุล : "+response.prename_moi + response.name + ' ' + response.lname+"<br>เพศ : "+sex_moph)
                    
                    $("#general_data").html("เลขบัตรประชาชนบิดา : "+response.father+" เลขบัตรประชาชนมารดา : "+response.mother+"<br>")
                            var oldoccup = getJsonFile('JsonData/occupation',response.occupation_old,"occupation","name");
                    $.when(oldoccup).done(function(data) { return $("#general_data").append("อาชีพเก่า : "+ifNullValue(data))});
                            var newoccup = getJsonFile('JsonData/occupation',response.occupation_new,"occupation","name");
                    $.when(newoccup).done(function(data) { return $("#general_data").append(" อาชีพใหม่ : "+ifNullValue(data))});
                            var religion = getJsonFile('JsonData/religion',response.religion,"religion","name");
                    $.when(religion).done(function(data) { return $("#general_data").append("<br> ศาสนา : "+ifNullValue(data))});
                            var nation = getJsonFile('JsonData/nationality',response.nation,"nationality","name");
                    $.when(nation).done(function(data) { return $("#general_data").append(" สัญชาต : "+ifNullValue(data))});
                    var settings2 = {
                        "async": true,
                        "crossDomain": true,
                        "url": "https://smarthealth.service.moph.go.th/phps/api/address/v1/find_by_cid?cid=" + data.cid,
                        "method": "GET",
                        "headers": {
                            "jwt-token": $.cookie("jwt_token"),
                            "Cache-Control": "no-cache",
                            "Postman-Token": "9cd3ea08-ab98-4f10-b74a-b68eff070687"
                        }
                    }
                    $.ajax(settings2).done(function (response) {
                        console.log("address : ");
                        console.log(response);
                        $("#add_data").text(response.houseno)
                        var address = getJsonFile('JsonData/thaiaddress',response.changwat+response.ampur+response.tambon,"addressid","full_name");
                            $.when(address).done(function(data) { return $("#add_data").append(" "+ifNullValue(data))});
                    });
                    
                    var settings3 = {
                        "async": true,
                        "crossDomain": true,
                        "url": "https://smarthealth.service.moph.go.th/phps/api/drugallergy/v1/find_by_cid?cid="+ data.cid,
                        "method": "GET",
                        "headers": {
                            "jwt-token": $.cookie("jwt_token"),
                            "Cache-Control": "no-cache",
                            "Postman-Token": "4544318c-84ab-440a-8bd5-c7be5977fc89"
                        }
                    }
                    
                    $.ajax(settings3).done(function (response) {
                        console.log("drug : ");
                        console.log(response);
                        if (response.status == "204") {
                            $("#drug_data").html('<center id="message_drug"><div class="alert alert-danger"><h4>ไม่มีข้อมูลการแพ้ยา : ' + response.message + ' </h4></div></center>');
                        } else {
                            $("#message_drug").remove(); 
                            $("#drug_data").append($("<table class='table table-border table-hover table-sm' frame='below' width='100%'><thead class='thead-dark'></thead><tbody></tbody></table>"))
                                $("thead").append($("<tr align='center'><th>รหัสโรงพยาบาล</th><th>รหัสยา</th><th>ชื่อยา</th></tr>"))
                            var sub,table='';
                            for (var keys in response['data']) {
                                sub = response['data'][keys];
                                console.log('<tr><td>'+sub.hospcode+'</td><td>'+sub.drugcode+'</td><td>'+sub.drugname+'</td>');;
                                table +='<tr align="center"><td>'+sub.hospcode+'</td><td> '+sub.drugcode+'</td><td> '+sub.drugname+'</td>';
                            }
                            $("tbody").html(table)
                        }
                    });
                    
                    var settings4 = {
                        "async": true,
                        "crossDomain": true,
                        "url": "https://smarthealth.service.moph.go.th/phps/api/nhsodata/v1/search_by_pid?userPersonId="+nhso_cid+"&smctoken="+nhso_token+"&personId=" + data.cid,
                        "method": "GET",
                        "headers": {
                            "jwt-token": $.cookie("jwt_token"),
                            "Cache-Control": "no-cache",
                            "Postman-Token": "173afd77-5ab6-4986-bcd4-00912b91fb7d"
                        },
                    }
                    
                    $.ajax(settings4).done(function (response) {
                        console.log("right : ");
                        console.log(response);
                        if (response.personId == null) {
                            $("#right_treatment").html('<center id="message_right"><div class="alert alert-warning"><h4>ไม่สามารถเข้าถึงบริการเช็คสิทธิ : ' + response.wsStatusDesc + ' </h4></div></center>');
                        } else {
                            $("#message_right").remove();
                            $("#right_treatment").append(response.maininsclName);
                        }
                    });
                }
            }) 
          waitingDialog.hide();
    }  
        }) 
    })
    }) //button click
}
function cencelReadClick() {
//    $("#btn_read").removeClass("btn-danger").addClass("btn-primary");
//    $("#btn_read_icon").removeClass("fa-cog fa-spin").addClass("fa-credit-card");
//    $("#btn_read_status").text("ยกเลิก");
//    $("#btn_read").attr("onclick", "btnReadClick();");
//    $("#card_img").attr("src", "images/default-avatar.jpg");
//    removeLoadSpin("#smartcard_body");
//    removeLoadSpin("#hdcdata_body");
    waitingDialog.hide();
    clearTimeout(timeOut);
    //clearTimeout(timeOut2);
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
function getThaiDate(date) {//yyyy-mm-dd
    date = (date == "" || date == undefined || date.length < 8 || date == null ||  date == 'undefined' ? "00000000" : date);
    if (date != "00000000") {
        var year = date.substr(0, 4);
        var month = date.substr(4, 2);
        var day = date.substr(6, 2);
        var monthNamesThai = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
        return  parseInt(day) + " " + monthNamesThai[parseInt(month) - 1] + " " + parseInt(year);
    } else {
        return "รูปแบบไม่ถูกต้อง";
    }
}
function getAddress(addr) {
    if (addr != "" && addr != undefined && addr != null && addr != "null") {
        addr = addr.replace(/#+/g, ' ').replace(/  +/g, ' ');
        return addr;
    } else {
        return "รูปแบบไม่ถูกต้อง";
    }
}
function getJsonFile(jsonfile,id,fieldchk,fieldkey){    // ( file.json,ค่าที่ต้องการดึง,ฟิล์ดที่ใช้เปรียบเทียบใน file.json,key ของค่าที่ต้องการ )
    var Subvals = new $.Deferred();
        $.getJSON(jsonfile+".json",function(data){
            var vals;
                for (var keys in data['RECORDS']) {
                    if(parseInt(id)==parseInt(data.RECORDS[keys][fieldchk])){
                         vals = data.RECORDS[keys][fieldkey];
                }
                };
                Subvals.resolve(vals);
        });
        return Subvals;   
    }
function ifNullValue(data) {
    var dt = data;
    if (data == null || data == "null" || data == "") {
        dt = "ไม่มีข้อมูล";
        //dt = "<span class=\"glyphicon glyphicon-option-horizontal\"></span>";
    }
    return dt;
}
