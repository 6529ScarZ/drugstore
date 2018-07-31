            $.getJSON('JsonData/up_header.php',function (data) {
                if(data.conn=='Connect_DB_false'){
                    $(".content-wrapper").append("<section class='content' id='sec_content'></section>");   
                                            $("#sec_content").append("<div id='index_content'></div>");
                                            $("#index_content").html("<center><h4><a href='#'>Please connect Database!!!!</a></h4></center>");
                                                $("a").attr("onclick","return popup('content/set_conn_db.php?method="+data.check+"&host=main', popup, 400, 600);");
                }else{
              $("head").prepend($("<title></title>").text("ระบบว่าง")
                                ,$("<link rel='SHORTCUT ICON' href='"+data.logo+"'>"));  
              if(data.rm_status == 'Y'){
                  var onload="bodyOnload();";
              }else{
                var onload="";
            }
        $("body").attr("Onload",onload);
                                    $("#gear_side").empty().load("content/inbox.php");//โหลด inbox.php เข้ามา
                        $(".sidebar").append($("<ul class='sidebar-menu'></ul>"));
                                $(".image").append("<img src='"+data.logo+"' class='img-circle' alt='User Image'>");
                                $(".info").append($("<p>"+data.name2+"</p>"),$("<a href='#'><i class='fa fa-circle text-success'></i> ระบบบริหารความเสี่ยง</a>"));
                                $(".sidebar-menu").append($("<li class='header'>เมนูหลัก</li>")
                                                        ,$("<li id='home'><a href='#'><img src='images/gohome.ico' width='20'> <span>หน้าหลัก</span></a></li>"));
                                                        $(".content-wrapper").append("<section class='content' id='sec_content'></section>");   
                                            $("#sec_content").append("<div id='index_content'></div><div id='createModal'></div>");
                                                $("#home > a").attr("onclick","loadPage('#index_content','content/info_index.html');");        
                                    if(data.rm_status == ''){
                                            $("#home > a").attr("onclick","loadPage('#index_content','content/NoLogon_index2.html');");
                                            $("#index_content").empty().load("content/NoLogon_index2.html");
                                        }else{
                                            ///// set cookie ////
                                            GetjQueryCookie('rm_main_dep',data.rm_main_dep)
                                            GetjQueryCookie('rm_dep',data.rm_dep)
                                            GetjQueryCookie('rm_status',data.rm_status)
                                            ///// end set cookie ////
                                            $("#home > a").attr("onclick","loadPage('#index_content','content/info_index.html');");
                                            $("#index_content").empty().load("content/info_index.html");    
                                        }
                                            //$("#sec_content").append("<div id='index_content'>No Login.</div>");
                                        
                    $(".main-footer").append("<div id='version' class='pull-right hidden-xs'></div>").append("<strong>Copyright &copy; 2017 <a href='http://rploei.go.th'>โรงพยาบาลจิตเวชเลยราชนครินทร์</a>.</strong> All rights reserved.");       
                                $("#version").append("<b>Version</b> 3.0");
                    $(".control-sidebar").empty().load("menu_footer.php"); 
                                              if(data.rm_status == 'Y'){
                                            $(".sidebar-menu").append($("<li id='ad_treeview1' class='treeview'></li>"),$("<li id='ad_treeview2' class='treeview'></li>")
                                                                    ,$("<li id='ad_manual'></li>"));
                                                        $("#ad_treeview1").append($("<a href='#'><img src='images/menu_items_options.ico' width='20'> <span>เมนูคณะกรรมการ</span><i class='fa fa-angle-left pull-right'></i></a>")
                                                                                ,$("<ul id='ad_treeview-menu1' class='treeview-menu'></ul>"));
                                                                $("#ad_treeview-menu1").append($("<li class=''> <a id='checkRM' href='#'>&nbsp;&nbsp;<img src='images/Transfer.ico' width='20'> <span>รายการแจ้งย้ายความเสี่ยง</span></a></li>")
                                                                                            ,$("<li class=''> <a id='totalRM' href='#'>&nbsp;&nbsp;<img src='images/icon_set2/eye.ico' width='20'> <span>ติดตาม/ประเมินผล</span></a></li>")
                                                                                            ,$("<li class=''> <a id='recycleRM' href='#'>&nbsp;&nbsp;<img src='images/bin1.png' width='20'> <span>รายการความเสี่ยงในถังขยะ</span></a></li>")
                                                                                            ,$("<li id='ad_report'><a href='#'>&nbsp;&nbsp;<img src='images/icon_set2/piechart.ico' width='20'> รายงานคณะกรรมการ <i class='fa fa-angle-left pull-right'></i></a></li>"));
                                                                                    $("#checkRM").attr("onclick","loadPage('#index_content','content/check_risk.html');"); 
                                                                                    $("#totalRM").attr("onclick","loadPage('#index_content','content/total_risk.html');");
                                                                                    $("#recycleRM").attr("onclick","loadPage('#index_content','content/recycle_risk.html');");
                                                                            $("#ad_report").append("<ul id='ulad_report' class='treeview-menu'></ul>");  
                                                                                $("#ulad_report").append($("<li><a href='#' id='deprep_res'><i class='fa fa-circle-o text-aqua'></i> ความเสี่ยงของงาน </a></li>")
                                                                                                        ,$("<li><a href='#' id='deprep_write'><i class='fa fa-circle-o text-aqua'></i> การรายงานความเสี่ยง </a></li>")
                                                                                                        ,$("<li><a href='#' id='deprep_cate'><i class='fa fa-circle-o text-aqua'></i> ความเสี่ยงของงาน(แยกหมวด) </a></li>")
                                                                                                        ,$("<li><a href='#' id='risk_cate'><i class='fa fa-circle-o text-aqua'></i> รายงานความเสี่ยงแยกหมวด </a></li>")
                                                                                                        ,$("<li><a href='#' id='risk_level'><i class='fa fa-circle-o text-aqua'></i> รายงานความเสี่ยงแยกระดับ </a></li>")
                                                                                                        ,$("<li><a href='#' id='risk_total'><i class='fa fa-circle-o text-aqua'></i> สรุปความเสี่ยงทั้งหมด </a></li>")
                                                                                                        ,$("<li><a href='#' id='user_report'><i class='fa fa-circle-o text-aqua'></i> หน่วยงานที่เขียนความเสี่ยง </a></li>"));
                                                                                        $("a#deprep_res").attr("onclick","loadPage('#index_content','content/dep_report(admin).html');");
                                                                                        $("a#deprep_write").attr("onclick","loadPage('#index_content','content/dep_report2(admin).html');");
                                                                                        $("a#deprep_cate").attr("onclick","loadPage('#index_content','content/cate_report(admin).html');");
                                                                                        $("a#risk_cate").attr("onclick","loadPage('#index_content','content/risk_report(admin).html');");
                                                                                        $("a#risk_level").attr("onclick","loadPage('#index_content','content/risk_level_report(admin).html');");
                                                                                        $("a#risk_total").attr("onclick","loadPage('#index_content','content/risk_total_report(admin).html');");
                                                                                        $("a#user_report").attr("onclick","loadPage('#index_content','content/risk_user_report(admin).html');");
                                                        $("#ad_treeview2").append($("<a href='#'><img src='images/menu_items_options.ico' width='20'> <span>เมนูผู้ใช้ทั่วไป</span><i class='fa fa-angle-left pull-right'></i></a>")
                                                                                ,$("<ul id='ad_treeview-menu2' class='treeview-menu'></ul>"));
                                                                $("#ad_treeview-menu2").append($("<li class=''> <a id='writeRM' href='#'>&nbsp;&nbsp;<img src='images/icon_set2/compose.ico' width='20'> <span>เขียนความเสี่ยง</span></a></li>")
                                                                                            ,$("<li class=''> <a id='receiveRM' href='#'>&nbsp;&nbsp;<img src='images/icon_set2/clipboard.ico' width='20'> <span>ความเสี่ยงที่ได้รับ</span></a></li>")
                                                                                            ,$("<li class=''> <a id='hisWRM' href='#'>&nbsp;&nbsp;<img src='images/icon_set2/folder.ico' width='20'> <span>ประวัติการรายงานความเสี่ยง</span></a></li>")
                                                                                            ,$("<li id='us_report'><a href='#'>&nbsp;&nbsp;<img src='images/icon_set2/piechart.ico' width='20'> รายงานหน่วยงาน <i class='fa fa-angle-left pull-right'></i></a></li>"));
                                                                                    $("#writeRM").attr("onclick","loadPage('#index_content','content/write_risk.html');");   
                                                                                    $("#receiveRM").attr("onclick","loadPage('#index_content','content/dep_risk.html');");
                                                                                    $("#hisWRM").attr("onclick","loadPage('#index_content','content/his_writerisk.html');");
                                                                            $("#us_report").append("<ul id='ulus_report' class='treeview-menu'></ul>");  
                                                                                $("#ulus_report").append($("<li><a href='#' id='risk_depcate'><i class='fa fa-circle-o text-aqua'></i> รายงานการเขียนความเสี่ยง </a></li>")
                                                                                                        ,$("<li><a href='#' id='risk_depres'><i class='fa fa-circle-o text-aqua'></i> รายงานความเสี่ยงที่ได้รับ </a></li>")
                                                                                                        ,$("<li><a href='#' id='user_total'><i class='fa fa-circle-o text-aqua'></i> สรุปความเสี่ยงทั้งหมด </a></li>")
                                                                                                        ,$("<li><a href='#' id='user_reportus'><i class='fa fa-circle-o text-aqua'></i> หน่วยงานที่เขียนความเสี่ยง </a></li>"));  
                                                                                        $("a#risk_depcate").attr("onclick","loadPage('#index_content','content/risk_report(user).html');");   
                                                                                        $("a#risk_depres").attr("onclick","loadPage('#index_content','content/risk_resreport(user).html');");
                                                                                        $("a#user_total").attr("onclick","loadPage('#index_content','content/risk_total_report(user).html');");
                                                                                        $("a#user_reportus").attr("onclick","loadPage('#index_content','content/risk_user_report(user).html');");
                                                        $("#ad_manual").append("<a href='#'><img src='images/icon_set2/booklet.ico' width='20'> <span>คู่มือโปรแกรมความเสี่ยง</span></a>");
                                                        $("#ad_manual > a").attr("onclick","window.open('form-format/manual_risk(admin).pdf','','width=750,height=1000'); return false");
                                        
//        var page = getURL("page");
//        var data = getURL("data");
//if(page!=''){
//    $("#index_content").empty().load(page,{data: data}, function(responseTxt, statusTxt, xhr){
//        if(statusTxt == "success")
//            /*$(function(){
//                $.ajax({
//  dataType: "json",
//  type: "post",
//  url: 'JsonData/detail_risk.php',
//  data: {data:data},
//  success: success
//});
//});*/
//        if(statusTxt == "error")
//            alert("Error: " + xhr.status + ": " + xhr.statusText);
//    });
//    }else{
//    $("#index_content").empty().load("content/info_index.html");    
//    }
    //loadPage('#index_content',page,data);  
                                    }else if(data.rm_status == 'N' || data.rm_status == 'A'){
                                        $("#gear_side1").remove();//ไม่ให้แสดง gear  
                                        $(".sidebar-menu").append($("<li id='ad_treeview2' class='treeview'></li>"));
                                        $("#ad_treeview2").append($("<a href='#'><img src='images/menu_items_options.ico' width='20'> <span>เมนูผู้ใช้ทั่วไป</span><i class='fa fa-angle-left pull-right'></i></a>")
                                                                                ,$("<ul id='ad_treeview-menu2' class='treeview-menu'></ul>"));
                                                                $("#ad_treeview-menu2").append($("<li class=''> <a id='writeRM' href='#'>&nbsp;&nbsp;<img src='images/icon_set2/compose.ico' width='20'> <span>เขียนความเสี่ยง</span></a></li>")
                                                                                            ,$("<li class=''> <a id='receiveRM' href='#'>&nbsp;&nbsp;<img src='images/icon_set2/clipboard.ico' width='20'> <span>ความเสี่ยงที่ได้รับ</span></a></li>")
                                                                                            ,$("<li class=''> <a id='hisWRM' href='#'>&nbsp;&nbsp;<img src='images/icon_set2/folder.ico' width='20'> <span>ประวัติการรายงานความเสี่ยง</span></a></li>")
                                                                                            ,$("<li id='us_report'><a href='#'>&nbsp;&nbsp;<img src='images/icon_set2/piechart.ico' width='20'> รายงานหน่วยงาน <i class='fa fa-angle-left pull-right'></i></a></li>"));
                                                                                    $("#writeRM").attr("onclick","loadPage('#index_content','content/write_risk.html');");   
                                                                                    $("#receiveRM").attr("onclick","loadPage('#index_content','content/dep_risk.html');");
                                                                                    $("#hisWRM").attr("onclick","loadPage('#index_content','content/his_writerisk.html');");
                                                                            $("#us_report").append("<ul id='ulus_report' class='treeview-menu'></ul>");  
                                                                                $("#ulus_report").append($("<li><a href='#' id='risk_depcate'><i class='fa fa-circle-o text-aqua'></i> รายงานการเขียนความเสี่ยง </a></li>")
                                                                                                        ,$("<li><a href='#' id='risk_depres'><i class='fa fa-circle-o text-aqua'></i> รายงานความเสี่ยงที่ได้รับ </a></li>")
                                                                                                        ,$("<li><a href='#' id='user_total'><i class='fa fa-circle-o text-aqua'></i> สรุปความเสี่ยงทั้งหมด </a></li>")
                                                                                                        ,$("<li><a href='#' id='user_reportus'><i class='fa fa-circle-o text-aqua'></i> หน่วยงานที่เขียนความเสี่ยง </a></li>"));  
                                                                                        $("a#risk_depcate").attr("onclick","loadPage('#index_content','content/risk_report(user).html');");   
                                                                                        $("a#risk_depres").attr("onclick","loadPage('#index_content','content/risk_resreport(user).html');");
                                                                                        $("a#user_total").attr("onclick","loadPage('#index_content','content/risk_total_report(user).html');");
                                                                                        $("a#user_reportus").attr("onclick","loadPage('#index_content','content/risk_user_report(user).html');");                
                                        if(data.rm_status == 'A'){
                                        $(".sidebar-menu").append($("<li id='ad_treeview3' class='treeview'></li>"));
                                        $("#ad_treeview3").append($("<a href='#'><img src='images/menu_items_options.ico' width='20'> <span>เมนูหัวหน้าฝ่าย</span><i class='fa fa-angle-left pull-right'></i></a>")
                                                                                ,$("<ul id='ad_treeview-menu3' class='treeview-menu'></ul>"));
                                                                $("#ad_treeview-menu3").append($("<li class=''> <a id='receiveDRM' href='#'>&nbsp;&nbsp;<img src='images/icon_set2/clipboard.ico' width='20'> <span>ความเสี่ยงของฝ่าย</span></a></li>")
                                                                                            ,$("<li id='depus_report'><a href='#'>&nbsp;&nbsp;<img src='images/icon_set2/piechart.ico' width='20'> รายงานฝ่ายงาน <i class='fa fa-angle-left pull-right'></i></a></li>"));
                                                                                    $("#receiveDRM").attr("onclick","loadPage('#index_content','content/Mdep_risk.html');");
                                                                            $("#depus_report").append("<ul id='uldepus_report' class='treeview-menu'></ul>");  
                                                                                $("#uldepus_report").append($("<li><a href='#' id='risk_mdepres'><i class='fa fa-circle-o text-aqua'></i> รายงานความเสี่ยงที่ฝ่ายได้รับ </a></li>")
                                                                                                        ,$("<li><a href='#' id='suser_total'><i class='fa fa-circle-o text-aqua'></i> สรุปความเสี่ยงทั้งหมด </a></li>")); 
                                                                                        $("a#risk_mdepres").attr("onclick","loadPage('#index_content','content/risk_resreport(suser).html');");
                                                                                        $("a#suser_total").attr("onclick","loadPage('#index_content','content/risk_total_report(suser).html');");
                                    }                                                                
                                    }else if(data.rm_status == ''){
                                            $(".sidebar-menu").append($("<li class=''><a href='#' id='knowledge'>\n\
                                <img src='images/icon_set2/bookshelf.ico' width='20'> <span>ความรู้เกี่ยวกับความเสี่ยง</span></a></li>")
                                                                    ,$("<li id='treeview1' class='treeview'></li>")
                                                                    ,$("<li class=''><a href='#' id='manual_risk'>\n\
                                <img src='images/icon_set2/booklet.ico' width='20'> <span>คู่มือโปรแกรมความเสี่ยง</span></a></li>"));
                                                $("#treeview1").append($("<a href='#'><img src='images/Import.ico' width='20'> <span>ดาวน์โหลดแบบฟอร์ม</span>\n\
                                <i class='fa fa-angle-left pull-right'></i></a>")
                                                                    ,$("<ul id='treeview-menu1' class='treeview-menu'></ul>"));
                                                    $("#treeview-menu1").append($("<li><a href='form-format/RM 1.doc' title='แบบรายงานอุบัติการณ์ความเสี่ยง'><i class='fa fa-circle-o text-aqua'></i> แบบรายงานความเสี่ยง </a></li>")
                                                                               ,$("<li><a href='form-format/RCA.doc' title='แบบฟอร์ม RCA'><i class='fa fa-circle-o text-aqua'></i> แบบฟอร์ม RCA </a></li>"));
                                                    $("#knowledge").attr("onclick","sendget('content/knowledge.html','index_content')");
                                                    $("#manual_risk").attr("onclick","window.open('form-format/manual_risk.pdf','','width=750,height=1000'); return false");
                                            $("#gear_side").append("<li class='dropdown messages-menu'><a id='login' href='#' title='เข้าสู่ระบบบริหารความเสี่ยง'><img src='images/key-y.ico' width='18'> เข้าสู่ระบบ</a></li>");
                                                            $("#login").attr("onclick","return popup('login_page.html', popup, 300, 330);");
                                            $("#gear_side1").remove();//ไม่ให้แสดง gear         
                                        }
                                $(".sidebar-menu").append("<li class=''><a id='about' href='#'><img src='images/Paper Mario.ico' width='20'> <span>เกี่ยวกับ</span></a></li>");
                                            $("#about").attr("onclick","loadPage('#index_content','content/about.html')");        
                }
                });                     