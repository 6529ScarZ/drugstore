<?php 
session_save_path("../session/");
session_start(); 
if (empty($_SESSION['rm_status'])) {
    echo "<meta http-equiv='refresh' content='0;url=../index.html'/>";
    exit();
}
unset($_SESSION['rm_id']);
unset($_SESSION['rm_fullname']);
unset($_SESSION['rm_dep']);
unset($_SESSION['rm_main_dep']);
unset($_SESSION['rm_status']);
session_destroy();
echo 'Logout เรียบร้อยครับ !!!';
?>
 