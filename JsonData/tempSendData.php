<?php
session_save_path("../session/");
session_start(); 
if (empty($_SESSION['rm_status'])) {
    echo "<meta http-equiv='refresh' content='0;url=../index.html'/>";
    exit();
}
$data = isset($_POST['data'])?$_POST['data']:'';
$rslt = array();
$series = array();
$series['data'] = $data;
array_push($rslt, $series);
print json_encode($series);

