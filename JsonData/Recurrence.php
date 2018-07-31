<?php 
session_save_path("../session/");
session_start();
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
    include_once '../template/plugins/function_date.php';
    include_once '../template/plugins/funcDateThai.php';
if (empty($_GET['data'])) {
     if($date >= $bdate and $date <= $edate){
                             $y= $Yy;
                             $Y= date("Y");
                             $year = $Yy;
                             $years = $year + 543;
                            }else{
                            $y = date("Y");
                            $Y = date("Y") - 1;
                            $year = date('Y');
                            $years = $year + 543;
                            }
                        } else {
                            $YeaR=$_GET['data'];
                            $y = $_GET['data'] - 543;
                            $Y = $y - 1;
                            $year = $_GET['data'] - 543;
                            $years = $year + 543;
                        }
                        $date_start = "$Y-10-01";
                        $date_end = "$y-09-30";
                        
        $chk = isset($_GET['data2'])?$_GET['data2']:'';
        if(empty($chk)){$inner='';
        $code="";}
        elseif($chk=='user'){$inner='';
            $code="and t1.res_dep=".$_SESSION['rm_dep'];
        }
        elseif($chk=='suser'){$inner="INNER JOIN department d on d.dep_id=t1.res_dep";
        $code="and d.main_dep=".$_SESSION['rm_main_dep'];}  
        
$sql_results1 = "select s1.name as sub_name, c1.name AS cate_name, t1.subcategory as sub,d.name as dep_name,p.name,count(t1.takerisk_id) as num_risk
from takerisk t1 
INNER JOIN subcategory s1 on t1.subcategory = s1.subcategory
INNER JOIN category c1 ON t1.category = c1.category 
INNER JOIN department d on d.dep_id=t1.res_dep
INNER JOIN place p on p.place=t1.take_place
where t1.recycle = 'N'
and t1.take_date between '$date_start' and '$date_end'
and t1.move_status='N'
$code
GROUP BY t1.subcategory order by num_risk desc,sub_name";
                            $conn_DB->imp_sql($sql_results1);
                            $results1 = $conn_DB->select();
                            
                            $sql_results2 = "SELECT level_risk,num FROM level_risk ORDER BY num asc";
                            $conn_DB->imp_sql($sql_results2);
                            $results2 = $conn_DB->select();
                            
                            foreach ($results1 as $key1 => $value1) {
                            $series['sub_name'] = $value1['sub_name'];
                            $series['cate_name'] = $value1['cate_name'];
                            $series['dep_name'] = $value1['dep_name'];
                            $series['name'] = $value1['name'];
                            $series['num_risk'] = (int) $value1['num_risk'];
                            foreach ($results2 as $key2 => $value2) {
                               $sql = "select COUNT(t1.level_risk)results FROM takerisk t1 
INNER JOIN subcategory s1 on t1.subcategory = s1.subcategory $inner
WHERE t1.subcategory=".$value1['sub']." and t1.LR_id = ".$value2['num']." and t1.recycle =  'N' 
and t1.take_date between '$date_start' and '$date_end'
and t1.move_status='N' $code";
                            $conn_DB->imp_sql($sql);
                            $results = $conn_DB->select_a();
                            $series["s".$key2] = (int) $results['results'];
                            }
                            array_push($rslt, $series);
                            }
                            print json_encode($rslt);
                            //print_r($rslt);
$conn_DB->close_PDO();
                            ?>