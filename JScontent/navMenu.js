$("nav#head-nav").empty().append($("<a class='navbar-brand' href='#'><img src='images/cross.ico' width='35' class='d-inline-block align-top' alt=''><b>  Drug Store system.v.1.0</b></a>")
                                ,$("<button class='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNavDropdown' aria-controls='navbarNavDropdown' aria-expanded='false' aria-label='Toggle navigation'><span class='navbar-toggler-icon'></span></button>")
                                ,$("<div class='collapse navbar-collapse justify-content-end' id='navbarNavDropdown'><ul class='navbar-nav'></ul></div>"));
$("ul.navbar-nav").empty().append($("<li class='nav-item' id='log'></li>"));
                      
$("nav#foot-nav").empty().append($("<span style='color: white'>Copyright &copy; 2018 <a class='linkfoot' href='https://www.facebook.com/thapanapong.deeudomchan' target='_blank'>ScarZ</a>.</span> All rights reserved.")
        ,$("<div class='pull-right hidden-xs'><span id='version' style='color: white'></span></div>"));
                    $("#version").append("<b>Version</b> 1.0");                                  

                    if($.cookie("user_id")){
                        $("#login").remove();
                        $("#log").empty().append($("<li class='nav-item dropdown'>"
                        +"<a class='nav-link dropdown-toggle' href='#' id='navbarDropdownMenuLink' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>"+$.cookie("name")+"</a>"
                        +"<div id='list2' class='dropdown-menu dropdown-menu-right' aria-labelledby='navbarDropdownMenuLink'></div></li>"))
                        
                        if($.cookie("photo")){
                            var photo = "USERimgs/"+$.cookie("photo");
                        }else{
                            var photo = "images/person.png";
                        }
                        $("#list2").empty().append($("<center><a class='dropdown-item'><img src='"+photo+"' width='45'></a></center>")
                                                    ,$("<center><a class='dropdown-item' id='logout' href='#'>LOGOUT</a></center>"))

                        $("ul.navbar-nav").append($("<li class='nav-item dropdown'>"
                                    +"<a class='nav-link dropdown-toggle' href='#' id='navbarDropdownMenuLink' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'><i class='fa fa-gears'></i></a>"
                                    +"<div id='list1' class='dropdown-menu dropdown-menu-right' aria-labelledby='navbarDropdownMenuLink'></div></li>"));
            $("#list1").empty().append($("<a class='dropdown-item' id='adduser' href='#'><i class='fa fa-gear'></i> เพิ่มผู้ใช้งาน</a>")
                                    ,$("<a class='dropdown-item' id='adduser2' href='#'><i class='fa fa-gear'></i> เพิ่มผู้ใช้งาน2</a>")
                                    ,$("<a class='dropdown-item' href='#' id='smReader'>JSmartcardReader</a>")
                                    //,$("<a class='dropdown-item' href='#' id='OpenReader'>Start JSmartcardReader</a>")
                                            );
                    $("a#adduser").attr("onclick","AddUserModal();").attr("data-toggle","modal").attr("data-target","#AddUserModal");
                    $("a#adduser2").attr("onclick","TBUser('index_content');");
                    $("a#smReader").attr("onclick","ReaderModal();").attr("data-toggle","modal").attr("data-target","#ReaderModal");
                    }else{
                        $("#logout").remove();
                        $("#log").empty().append($("<a class='btn btn-sm btn-success' href='#' id='login' style='color: white'><i class='fa fa-key'></i><b> LOGIN</b></a>"))
                        $("a#login").attr("onclick","popup('login_page.html', popup, 400, 300);"); 
                    }
       
        $("#logout").click(function(e) {
           e.preventDefault();
           $.removeCookie("user_id");
           $.removeCookie("name");
           $.removeCookie("user_status");
           alert('logout เรียบร้อยครับ');
           window.location.reload();
        })

