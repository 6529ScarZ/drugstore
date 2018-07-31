<?php 
session_save_path("../session/");
session_start(); 
if (empty($_SESSION['rm_status'])) {
    echo "<meta http-equiv='refresh' content='0;url=../index.html'/>";
    exit();
}
header('Content-type: text/json; charset=utf-8');
function __autoload($class_name) {
    include '../class/'.$class_name.'.php';
}
set_time_limit(0);
$conn_DB= new EnDeCode();
$read="../connection/conn_DB.txt";
$conn_DB->para_read($read);
$conn_db=$conn_DB->Read_Text();
$conn_DB->conn_PDO();
$rslt = array();
$series = array();
$day= array();
$dim = isset($_GET['data'])?$_GET['data']:''; 
if($dim=='1' || $dim=='3' || $dim=='5' || $dim=='7' || $dim=='8' || $dim=='10' || $dim=='12'){ $DIM = 31;}
elseif ($dim=='4' || $dim=='6' || $dim=='9' || $dim=='11') {$DIM = 30;}else{$DIM = 29;}
    for ($I=1;$I<=$DIM;$I++) {

    $day[]=$I;
    }

    $series['day']=$day;
    print json_encode($series);
    $conn_DB->close_PDO();
                    ?>