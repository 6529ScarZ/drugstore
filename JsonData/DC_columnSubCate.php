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
include '../template/plugins/function_date.php';

$conn_DB = new EnDeCode();
$read = "../connection/conn_DB.txt";
$conn_DB->para_read($read);
$conn_db = $conn_DB->Read_Text();
$conn_DB->conn_PDO();
set_time_limit(0);
$rslt = array();
$series = array();

$countnum = array();

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
$category = isset($_GET['data2'])?$_GET['data2']:'';                         
                        $date_start = "$Y-10-01";
                        $date_end = "$y-09-30";
            $sql ="select count(takerisk_id) as number_risk,s.name,s.subcategory  from takerisk t1
				 LEFT OUTER JOIN subcategory s on s.subcategory=t1.subcategory
				 where  t1.category='$category' and (t1.take_date between '$date_start' and '$date_end') and t1.move_status='N'
                                group by s.subcategory order by number_risk DESC,s.subcategory asc";
            $conn_DB->imp_sql($sql);
            $rs = $conn_DB->select();
    $series['name'] = 'ความเสี่ยง'; 
    $series['colorByPoint'] = 'true'; 
for($i=0;$i<count($rs);$i++){
    $countnum[0] = $rs[$i]['name'];
    $countnum[1] = (int)$rs[$i]['number_risk'];
    
    $series['data'][$i] = $countnum;
     }            
    array_push($rslt, $series);
    //print_r($rslt);
print json_encode($rslt);
$conn_DB->close_PDO();