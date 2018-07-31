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
include_once '../template/plugins/funcDateThai.php';
$conn_DB = new EnDeCode();
$read = "../connection/conn_DB.txt";
$conn_DB->para_read($read);
$conn_db = $conn_DB->Read_Text();
$conn_DB->conn_PDO();
set_time_limit(0);
$rslt = array();
$series = array();

$countnum = array();

$category = isset($_GET['data2'])?$_GET['data2']:''; 
$subcategory = isset($_GET['data3'])?$_GET['data3']:'';
$dim = isset($_GET['data4'])?$_GET['data4']:'';
//$dim = 12;
if($dim=='1' || $dim=='3' || $dim=='5' || $dim=='7' || $dim=='8' || $dim=='10' || $dim=='12'){ $DIM = 31;}
elseif ($dim=='4' || $dim=='6' || $dim=='9' || $dim=='11') {$DIM = 30;}else{$DIM = 29;}
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
                            if($date >= $bdate and $date <= $edate){//3เดือนแรกของปีงบ
                            if($dim==10 or $dim==11 or $dim==12){
                              $Y = $y + 1;  
                            }else{
                               $Y = $y;    
                            }
                            
                            } else {
                            if($dim==10 or $dim==11 or $dim==12){
                             $Y = $y-1;    
                            }else{
                             $Y = $y;    
                            }
                              
                            }
                        }
                        //$date_chk = $Y."-".$dim;
                        $date_chk = $Y."-".$dim;//echo $Y;
    $month = '';   $i=0;                 
    for($I=1;$I<=$DIM;$I++){
        $sql="SELECT count(takerisk_id) as total,t.take_date FROM takerisk t
            WHERE t.subcategory='$subcategory' and (t.take_date between '$date_chk-$I' and '$date_chk-$I')";
    $conn_DB->imp_sql($sql);
    $num_risk = $conn_DB->select_a();
    if(!empty($num_risk['take_date'])){ $month = $num_risk['take_date']; }
        $day = (int)substr($num_risk['take_date'],8,2);
        if($I == $day){ 
    $countnum[0] = DateThai2($num_risk['take_date']);
    $countnum[1] = (int)$num_risk['total'];
        } else {
    $date = substr($month,0,8).$I;  //echo 'false';   
    $countnum[0] = DateThai2($date);
    $countnum[1] = 0;  
        }
    $series['data'][$i] = $countnum; 
    $i++;
    }
    $series['name'] = 'ความเสี่ยง'; 
    //$series['colorByPoint'] = 'true'; 
    array_push($rslt, $series);
    //print_r($rslt);
print json_encode($rslt);
$conn_DB->close_PDO();