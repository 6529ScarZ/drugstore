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
$month= array();
$month_id = isset($_GET['data'])?$_GET['data']:''; 

                        $sqlMonth = "select * from month where month_id='$month_id'";
                        $conn_DB->imp_sql($sqlMonth);
                        $monthdata=$conn_DB->select_a();
    
$conn_DB->imp_sql($sqlMonth);
$result=$conn_DB->select_a();
print json_encode($result);
    $conn_DB->close_PDO();
                    ?>