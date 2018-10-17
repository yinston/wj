<?php
set_time_limit(0);
header("Content-type: text/html; charset=utf-8");
header('Content-Type: application/vnd.ms-excel');
header('Content-Disposition: attachment;filename="Answer.csv"');
header('Cache-Control: max-age=0');


try{
    $con = mysqli_connect('localhost','wenjuan','testpasswd');

    mysqli_select_db($con,'wenjuan');//选择数据库 
    $sql = "select context from wenjuan";
    //file_put_contents('4.txt',$sql);
    $result=mysqli_query($con,$sql);
    $j = 0;
        while($row = mysqli_fetch_array($result))
          {
                  $data = json_decode($row['context'],true);
                  $items[$j][]  = '';
                  foreach ($data as $dkey => $dvalue) {//var_dump($dvalue);
                    for($i=1;$i<=$dvalue['num'];$i++){
                        if(isset($dvalue['data'])){
                            if(is_array($dvalue['data'])){
                                if(isset($dvalue['data'][$i])){
                                    //$items[$j][] = $i;
                                    if(is_numeric($dvalue['data'][$i])){
                                        $items[$j][] = $dvalue['data'][$i];    
                                    }else{
                                        $items[$j][] = iconv("utf-8","gb2312//IGNORE",urldecode($dvalue['data'][$i])); 
                                    }
                                }else if($dvalue['num'] == 1){
                                    $ival = array_values($dvalue['data']);
                                    $items[$j][] = iconv("utf-8","gb2312//IGNORE",urldecode($ival[0]));
                                }else{
                                    $items[$j][]  = '';
                                }
                            }
                        }else{
                            $items[$j][]='';
                        }
                    }
                }//var_dump($items);exit;
                $j++;
          }
    }catch (Exception $e) {
        print $e->getMessage();
}//count(($items);exit;
// 打开PHP文件句柄，php://output 表示直接输出到浏览器
$fp = fopen('php://output', 'a');
$head = array('问卷编号','S1性别','S2年龄','S3文化程度','S4-1政治面貌','S4-2党龄','S5职级','S6单位属性','S7所在单位工作年限','A1-A','A1-B','A1-C','A1-D','A1-E','A1-F','A1-G','A2','A3-1','A3-2','A3-3','A3-4','A3-5','A3-6','A3-6其他备注','A4-A','A4-B','A4-C','A4-D','A4-E','A4-F','A4-G','A5','A6','B1-1-1','B1-1-2','B-1-3','B1-1-4','B1-1-5','B-1-6','B1-1-7','B1-1-8','B1-1-9','B1-1-10','B1-1-10其他备注','B1-2-1','B1-2-2','B1-2-3','B1-2-4','B1-2-5','B1-2-6','B1-2-7','B1-2-8','B1-2-9','B1-2-10','B1-2-10其他备注','B2-1-1','B2-1-2','B2-1-3','B2-1-4','B2-1-5','B2-1-6','B2-1-6其他备注','B2-2-1','B2-2-2','B2-2-3','B2-2-4','B2-2-5','B2-2-6','B2-2-7','B2-2-7其他备注','B3-1','B3-2','B3-3','B3-4','B3-5','B3-6','B3-7','B3-8','B3-8其他备注','B4-1','B4-2','B4-3','B4-4','B4-5','B4-6','B4-7','B4-8','B4-8其他备注','B5-1','B5-2-1','B5-2-2','B5-2-3','B5-2-4','B5-2-5','B5-2-6','B5-2-7','B5-2-7其他准备','C1','C2-1','C2-2','C2-3','C2-4','C2-5','C2-6','C2-7','C2-7其他备注','C3-1','C3-2','C4','C5-1','C5-2-1','C5-2-2','C5-2-3','C5-2-4','C5-2-5','C5-2-6','C5-2-6其他注明','C5-2最突出','C5-3-1','C5-3-2','C5-3-3','C5-3-4','C5-3-5','C5-3-6','C5-3-7','C5-3-8','C5-3-8其他备注','C6-1-1','C6-1-2','C6-1-3','C6-1-4','C6-1-5','C6-1-5其他备注','C6-2-1','C6-2-2','C6-2-3','C6-2-4','C6-2-5','C6-2-5其他备注','C6-2-最需解决','C7-1','C7-2','C7-3','C7-4','C7-5','C7-6','C7-7','C7-8','C7-9','C7-10','C7最突出','D1','D2','D3-1','D3-2-1','D3-2-2','D3-2-3','D3-2-4','D3-2-5','D3-2-6','D3-2-7','D3-2-8','D3-2-8其他备注','D3-3-1','D3-3-2','D3-3-3','D3-3-4','D3-3-5','D3-3-6','D3-3-7','D3-3-8','D3-3-8其他备注','D3-3最主要','D4','D5','D6','D7-1','D7-2','D7-3','D7-4','D7-5','D7-6','D7-6其他备注','D8-1','D8-2-1','D8-2-2','D8-2-3','D8-2-4','D8-2-5','D8-2-6','D8-2-7','D8-2-8','D8-2-9','D8-2-9其他备注','D8-2最主要','D8-3-1','D8-3-2','D8-3-3','D8-3-4','D8-3-5','D8-3-6','D8-3-7','D8-3-8','D8-3-9','D8-3-9其他备注','D9第一顺序','D9第二顺序','D9第三顺序','D9第四顺序','D9第五顺程序','D10-1-A','D10-1-B','D10-1-C','D10-1-D','D10-1-E','D10-1-F','D10-1-G','D10-1-H','D10-1-I','D10-1-J','D10-1-K','D10-1-L','D10-1-M','D10-1-N','D10-1-O','D10-1-P','D10-1-Q','D10-1-R','D10-1-S','D10-1-T','D10-1-U','D10-1-V','D10-1-W','D10-1-X','D10-2-A','D10-2-B','D10-2-C','D10-2-D','D10-2-E','D10-2-F','D10-2-G','D10-2-H','D10-2-I','D10-2-J','D10-2-K','D10-2-L','D10-2-M','D10-2-N','D10-2-O','D10-2-P','D10-2-Q','D10-2-R','D10-2-S','D10-2-T','D10-2-U','D10-2-V','D10-2-W','D10-2-X','E1','E2','E3','E4','E5','E6','E7','E8','E9-1','E9-2-1','E9-2-2','E9-2-3','E9-2-4','E9-2-5','E9-2-6','E9-2-6其他备注','E9-2-最主要','E10-1','E10-2','E10-3','E10-4','E10-5','E10-6','E10-7','E10-8','E10-9','E10-9其他备注','E10-最大压力','E10-1','E11-1','E11-2','E11-3','E11-4','E11-5','E11-6','E11-7','E11-8','E11-9','E11-10','E11-10其他备注','F1','F2','F3-1','F3-2','F3-3','F3-4','F3-5','F3-6','F3-7','F3-7其他注明','F4-1','F4-2','F4-3','F4-4','F4-5','F4-6','F4-7','F4-8','F4-8其他注明','G1'
);
foreach ($head as $i => $v) {// CSV的Excel支持GBK编码，一定要转换，否则乱码
  $head[$i] =iconv("utf-8","gb2312//IGNORE",$v);
}
fputcsv($fp, $head);
$i = 1;
$n = 1;
$count = count($items);
while($n <= $count){
  foreach($items as $key => $val){
    fputcsv($fp,$val);
    $i++;
    if($i>20000){//读取一部分数据刷新下输出
    bufferob_flush();flush();$i = 0;
    }
    $n++;
  }
  /*if($n == 300){break;}*/
}