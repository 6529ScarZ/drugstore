<?php
session_save_path("../session/");
session_start(); 
if (empty($_SESSION['rm_status'])) {
    echo "<meta http-equiv='refresh' content='0;url=../index.html'/>";
    exit();
}
header('Content-type: text/json; charset=utf-8');

function __autoload($class_name) {
    include '../class/' . $class_name . '.php';
}
include_once '../template/plugins/function_date.php';
include_once '../template/plugins/funcDateThai.php';
$conn_DB = new EnDeCode();
$read = "../connection/conn_DB.txt";
$conn_DB->para_read($read);
$conn_db = $conn_DB->Read_Text();
$conn_DB->conn_PDO();
set_time_limit(0);
$rslt = array();
$series = array();

//$category = isset($_GET['data2'])?$_GET['data2']:''; 
//$dep = isset($_GET['data3'])?$_GET['data3']:''; 
if (empty($_GET['data'])) {
                    if($date >= $bdate and $date <= $edate){
                             $y= $Yy;
                             $Y= date("Y");
                            }else{
                            $y = date("Y");
                            $Y = date("Y") - 1;
                            }
                        } else {
                            $y = $_GET['data'] - 543;
                            $Y = $y - 1;
                        }
                        $date_start = "$Y-10-01";
                        $date_end = "$y-09-30";
$chk = isset($_GET['data2'])?$_GET['data2']:'';
if(empty($chk)){ $code='';}else{$chk="and u1.dep_id=".$_SESSION['rm_dep'];}
$sql="select concat(u1.user_fname,' ',u1.user_lname) as user,d1.name as dname,count(t1.takerisk_id) as numrisk
                            from takerisk t1 
                            inner join user u1 on t1.user_id=u1.user_id
                            inner join department d1 on t1.take_dep=d1.dep_id
                            where t1.move_status='N' and t1.recycle='N'
                            and t1.take_date between '$date_start' and '$date_end' $chk
                            group by t1.user_id order by t1.take_dep,numrisk desc";
 $conn_DB->imp_sql($sql);
    $num_risk = $conn_DB->select();
    for($i=0;$i<count($num_risk);$i++){
    $series['user'] = $num_risk[$i]['user'];
    $series['dname']= $num_risk[$i]['dname'];
    $series['numrisk']= $num_risk[$i]['numrisk'];
    array_push($rslt, $series);    
    }
print json_encode($rslt);
$conn_DB->close_PDO();