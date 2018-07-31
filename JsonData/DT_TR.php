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
$sql="select t1.takerisk_id,s1.name,t1.take_date,t1.take_rec_date
,if(m1.mng_status='Y'
,CASE m1.admin_check
WHEN 'Y' THEN 'กำลังดำเนินการ'
WHEN 'R' THEN 'ไม่ผ่าน'
WHEN 'G' THEN 'ผ่านการทบทวน'
ELSE 'รอประเมิน' END,
if(t1.move_status='Y','อยู่ระหว่างการพิจารณา','รอทบทวน')) as check_status
from takerisk t1 
inner JOIN mngrisk m1 on t1.takerisk_id=m1.takerisk_id and  m1.chk_show=1
inner join department d1 on  t1.take_dep=d1.dep_id
inner join subcategory s1 on t1.subcategory=s1.subcategory
Where t1.recycle='N' and t1.take_date between '$date_start' and '$date_end' ORDER BY takerisk_id DESC"; 
$conn_DB->imp_sql($sql);
    $num_risk = $conn_DB->select();
    for($i=0;$i<count($num_risk);$i++){
    $series['takerisk_id'] = $num_risk[$i]['takerisk_id'];
    $series['name']= $num_risk[$i]['name'];
    $series['take_date']= DateThai1($num_risk[$i]['take_date']);
    $series['rec_date']= DateThai1($num_risk[$i]['take_rec_date']);
    //$series['detail_id'] = $conn_DB->sslEnc($num_risk[$i]['takerisk_id']);
    $series['check_status'] = $num_risk[$i]['check_status'];
    array_push($rslt, $series);    
    }
print json_encode($rslt);
$conn_DB->close_PDO();