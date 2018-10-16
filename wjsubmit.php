<?php
//var_dump($_POST);
$qusetionArr = $_POST['anum'];
foreach($qusetionArr as $k => $num){
	$name = 'q'.($k+1);//echo $name;exit;
	$name_text = 'q'.($k+1).'_text';
	$data[$k] = array();
	if($num>1 && isset($_POST[$name_text])){
		$num = $num+1;
	}
	$data[$k]['num'] = $num;
	if(is_array($_POST[$name]) && $num>1){
		foreach ($_POST[$name] as $kn => $v) {
			$data[$k]['data'][$v] = $v;
		}
	}else if(isset($_POST[$name]) && is_numeric($_POST[$name])){
		$data[$k]['data'][$_POST[$name]] = $_POST[$name];
	}else if($num == 1 && !is_numeric($_POST[$name])){
		$data[$k]['data'][] = $_POST[$name];
	}
	if(isset($_POST[$name_text])){
		$data[$k]['data'][$num] = $_POST[$name_text];
		if($num>2 && !isset($data[$k]['data'][$num-1]) && !empty($_POST[$name_text])){
			$data[$k]['data'][$num-1] = $num-1;
		}
	}
}//var_dump($data);exit;
try{
	$return = array('flag'=>0,'error'=>'');
	if($data){
		$data = json_encode($data);
		$con = mysqli_connect('localhost','root','root');
		mysqli_select_db($con,'wenjuan');//选择数据库 
		$sql = "INSERT INTO wenjuan (context) 
		VALUES ('".$data."')";
		//file_put_contents('3.txt',$sql);
		$return['flag']=mysqli_query($con,$sql);
	}
}catch (Exception $e) {
	$return['error'] = $e->getMessage();
}
die(json_encode($return));