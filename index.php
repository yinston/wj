<?php
require_once 'model/question.php';
$qusetions['head'] = questionService::question('head');
$qusetions['base'] = questionService::question('base');
?>
<!DOCTYPE html>
<html><head>
<title>问卷</title>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, minimum-scale=1, maximum-scale=1,user-scalable=no">
<meta name="format-detection" content="telephone=no">


<meta property="og:type" content="article">
<meta property="og:release_date" content="2014-01-13">

<meta property="og:title" content="问卷">
<meta property="og:description" content="请帮忙填写，非常感谢！">

<meta name="applicable-device" content="mobile">
<link rel="dns-prefetch" href="https://sojump.cn-hangzhou.log.aliyuncs.com/">

</script><script type="text/javascript">
    var maxCheatTimes = 0;
    var activityId =3050790;
    if (window.location.hash) {
        window.location.hash = "";
        window.location.href = window.location.href.replace("#", "");
    }
    var isWeiXin=0;
</script>
<link rel="stylesheet" href="wj/jqmobo.css">
  
<script src="wj/jquery.js"></script>
    <script src="wj/wj.js"></script>


<script type="text/javascript">
    !window.jQuery && document.write('<script src="wj/jquery-1.10.1.min.js"><\/script>');
</script>
    
</head>
<body>
   
    

    <div id="divTip" style="display: none; font-size:14px;color: #ffffff; line-height: 24px; padding:8px;background-color: #f95b5b;"></div>
    <div style="background:#fff;position: fixed; top: 0px; left: 0px; right: 0px; bottom: 0px; z-index: 2;display:none;" id="divWorkError">
    </div>
    <form id="form1" name='addForm' method="post" action="wjsubmit.php" style="overflow:hidden;">
    
    <div id="divContent" class="divContent">
        
        <!-- <div id="divDesc" class="formfield">
            <span class="description">
                在访问之前，我想先问您几个问题：
            </span>
        </div> -->
        
       
        <div id="divQuestion">
            <fieldset class="fieldset" style="" id="fieldset1">
             <div id="qusetionsHead"> 
                <div id="toptitle">
                    <h1 class="htitle" id="htitle">
                      甄别问卷</h1>
                </div>   
    <?php 
        $content = '';
        foreach ($qusetions['head'] as $key => $value) {
            $i=$key+1;
            $content .='<div id="qn'.$i.'" name="qname" aid="'.$i.'">';
            $content .='<input type="hidden" name="anum[]" value="1">';
            $content .= '<div class="field ui-field-contain" id=div'.$i.' req='.$i.' topic='.$i.
            ' data-role="fieldcontain" type="3">
            <div class="field-label">'.$value['question'].
            '<span class="req">*</span></div>
            <div class="ui-controlgroup">';
                $t = 0;
                foreach ($value['answer'] as $keyA => $valueA) {
                    $t++;
                    $id='q'.$i.'_'.$t;
                    $event = '';
                    $div = "";
                    if(isset($value['event'])){
                        if($value['event']['jumpType']=='out' && $value['event'][$keyA]=='N'){
                             $event = "onclick='goAnswer()'";
                        }else if($value['event']['jumpType']=='out'){
                             $event = "onclick='finish()'"; 
                        }else if ($value['event']['jumpType'] == 'pass' && $value['event'][$keyA] != 'N') {
                            $div = $value['event'][$keyA] + 1;//var_dump($div);exit; 
                            $event = "onclick='jumpTo(\"" . $div . "\")'";
                        }
                    }
                    $content .= '
                        <div class="ui-radio" '.$event.'>
                            <span class="jqradiowrapper">
                                <input class="normalradio" passnum="'.$div.'" value="'.$keyA.'" id="'.$id.'" name="q'.$i.
                                '" type="radio">
                            </span>
                            <div class="label" for="'.$id.'">'.$valueA.'</div>
                        </div>';
                }
             $content .= '</div><div class="errorMessage"></div>
                </div>';  
             $content .= '</div>';
            //var_dump($value) ;
        }   
        echo  $content;  
    ?>
    </div>

    <div id="baseAnswer">
        <?php 
        $content = '';
        foreach ($qusetions['base'] as $bk => $bv) {
            $content .='<div name="questionsBase">';
            $content .= '<div id="toptitle">
                            <h1 class="htitle" id="htitle">
                               '.$bk.'</h1>
                            </div>';
            foreach ($bv as $key => $value) {
                if ($value['type'] == 2 && is_array($value['question_arr'])) {
                    
                    foreach ($value['question_arr'] as $k => $v) {
                        $i = $i + 1;
                        $content .='<div id="qn'.$i.'" name="qname" aid="'.$i.'">';
                        $content .='<input type="hidden" name="anum[]" value="1">';
                        $content .= '<div class="field ui-field-contain">
                    <div class="field-label">' . $value['title'] . '</div></div>';
                        $content .= '<div class="field ui-field-contain" id=div' . $i . ' req=' . $i . ' topic=' . $i .
                            ' data-role="fieldcontain" type="3"><div class="field-label">'.++$k.'.'.$v['question'] .
                            '<span class="req">*</span></div><div class="ui-controlgroup">';
                        $t = 0;
                        foreach ($value['answer'] as $keyA => $valueA) {
                            $t++;
                            $id = 'q' . $i . '_' . $t;
                            $event = '';
                            $div = "";
                            if (isset($value['event'])) {
                                if ($value['event']['jumpType'] == 'out' && $value['event'][$keyA] == 'N') {
                                    $event = "goAnswer()";
                                } else if ($value['event']['jumpType'] == 'out') {
                                    $event = "finish()";
                                }
                            }
                            $son = "";
                            if (isset($value['son'])) {
                                $son =' son="1"';
                            }
                            $content .= '
                                <div class="ui-radio">
                                    <span class="jqradiowrapper">
                                        <input class="normalradio" "'.$son.'" passnum="'.$div.'" value="'.$keyA.'" id="'.$id.'" name="q'.$i.
                                    '" type="radio">
                                    </span>
                                    <div class="label" for="' . $id . '">' . $valueA . '</div>
                                </div>';
                        }
                        $content .= '</div><div class="errorMessage"></div></div>';
                        $content .= '</div>';
                    
                    }
                } else if ($value['type'] == 1) {
                    $i = $i + 1;
                    $son = "";
                    if (isset($value['son'])) {
                        $son =' son="1"';
                    }
                    $content .='<div id="qn'.$i.'" name="qname" aid="'.$i.'" '.$son.'>';
                    $content .='<input type="hidden" name="anum[]" value="1">';
                    $content .= '<div class="field ui-field-contain" id=div' . $i . ' req=' . $i . ' topic=' . $i .
                        ' data-role="fieldcontain" type="3">
                    <div class="field-label">' . $value['question'] .
                        '<span class="req">*</span></div>
                    <div class="ui-controlgroup">';
                    $t = 0;
                    foreach ($value['answer'] as $keyA => $valueA) {
                        $t++;
                        $id = 'q' . $i . '_' . $t;
                        $event = '';
                        $div = "";
                        if (isset($value['event'])) {
                            if ($value['event']['jumpType'] == 'out' && $value['event'][$keyA] == 'N') {
                                $event = "onclick='goAnswer()'";
                            } else if ($value['event']['jumpType'] == 'out') {
                                $event = "onclick='finish()'";
                            } else if ($value['event']['jumpType'] == 'pass' && $value['event'][$keyA] != 'N') {
                                $div = $value['event'][$keyA] + 1;//var_dump($div);exit; 
                                $event = "onclick='jumpTo(\"" . $div . "\")'";
                            }
                        }
                        $content .= '
                                <div class="ui-radio" '.$event.'>
                                    <span class="jqradiowrapper">
                                        <input class="normalradio" "'.$son.'" passnum="'.$div.'" value="' . $keyA . '" id="' . $id . '" name="q' . $i .'" type="radio">
                                    </span>
                                    <div class="label" for="' . $id . '">' . $valueA . '</div>
                                </div>';

                    }
                    if (isset($value['is_custom'])) {
                        $keyA++;
                        $t++;
                        $tid = 'q' . $i . '_' . $t;
                                    $content .= '
                                    <div class="ui-radio">
                                        <span class="jqradiowrapper">
                                                <input class="normalradio" passnum="'.$div.'" value="' . $keyA . '" id="' . $tid . '" name="q' . $i .
                                '" type="radio">
                                            </span>
                                        <div class="is_custom">'.$value['is_custom'].'<input id="' . $tid . '_text" name="q' . $i .
                            '_text" class="customAnswer" link="'.$tid.'" type="text" onclick="getFocus(this)"></div>
                                    </div>';
                    }
                    $content .= '</div><div class="errorMessage"></div>
                        </div>';
                    $content .= '</div>';
                } else if ($value['type'] == 3) {
                    $i = $i + 1;
                    $son = "";
                    if (isset($value['son'])) {
                        $son =' son="1"';
                    }
                    $content .='<div id="qn'.$i.'" name="qname" aid="'.$i.'" '.$son.'>';
                    $content .= '<div class="field ui-field-contain" id=div' . $i . ' req=' . $i . ' topic=' . $i .
                        ' data-role="fieldcontain" type="4">
                        <div class="field-label">' . $value['question'] .
                        '<span class="req">*</span></div>
                        <div class="ui-controlgroup">';
                    $t = 0;
                    foreach ($value['answer'] as $keyA => $valueA) {
                        $t++;
                        $id = 'q' . $i . '_' . $t;
                        $event = '';
                        $div = "";
                        if (isset($value['event'])) {
                            if ($value['event']['jumpType'] == 'out' && $value['event'][$keyA] == 'N') {
                                $event = "onclick='goAnswer()'";
                            } else if ($value['event']['jumpType'] == 'out') {
                                $event = "onclick='finish()'";
                            } else if ($value['event']['jumpType'] == 'pass' && $value['event'][$keyA] != 'N') {
                                $div = $value['event'][$keyA] + 1;
                                $event = "onclick='jumpTo(\"" . $div . "\")'";
                            }
                        }
                        $content .= '
                                    <div class="ui-checkbox" '.$event.'>
                                        <span class="jqcheckwrapper">
                                            <input class="normalcheckbox" passnum="'.$div.'" value="'.$keyA.'" id="'.$id.'" name="q'.$i.
                                    '[]" type="checkbox">
                                        </span>
                                        <div class="label" for="' . $id . '">' . $valueA . '</div>
                                    </div>';
                    }
                    $count = count($value['answer']);
                    if (isset($value['is_custom'])) {
                        $t+= 1;
                        $keyA +=1;
                        $tid = 'q' . $i . '_' . $t;
                        $count+=1;
                        $content .= '
                                    <div class="ui-checkbox" '.$event.'>
                                        <span class="jqcheckwrapper">
                                                <input class="normalcheckbox" passnum="'.$div.'" value="' . $keyA . '" id="' . $tid . '" name="q' . $i .
                                '[]" type="checkbox">
                                            </span>
                                        <div class="is_custom">'.$value['is_custom'].'<input id="' . $tid . '_text" name="q' . $i .
                            '_text" class="customAnswer" link="'.$tid.'" type="text" onclick="getFocus(this)"></div>
                                    </div>';
                    }
                    $content .= '</div><div class="errorMessage"></div>
                        </div>';
                        $content .='<input type="hidden" name="anum[]" value="'.$count.'">';
                        $content .= '</div>';
                } else if ($value['type'] == 4) {
                    $i = $i + 1;
                    $inputText = '';
                    for ($j = 0; $j < $value['num']; $j++) {
                        //$inputText .= "&nbsp&nbsp<input type='text' class='sortAnswer' size='2' name='sort[]'>";
                    }
                    $content .='<div id="qn'.$i.'" name="qname" aid="'.$i.'">';
                    $content .='<input type="hidden" name="anum[]" value="5">';
                    $content .= '<div class="field ui-field-contain" id=div' . $i . ' req=' . $i . ' topic=' . $i .
                        ' data-role="fieldcontain" type="3">
                    <div class="field-label">' . $value['question'] .
                        '<span class="req">*</span></div>
                    <div class="ui-controlgroup">';
                    $t = 0;
                    $content .='<div class="ui-radio">
                                    <span class="jqradiowrapper">
                                        <span class="emptyblock"></span>
                                    </span>
                                    <div class="label"><span class="emptyblock"></span>
                                    <span  class="spanradio">第一排序</span>
                                    <span  class="spanradio">第二排序</span>
                                    <span class="spanradio">第三排序</span>
                                    <span  class="spanradio">第四排序</span>
                                    <span  class="spanradio">第五排序</span></div>
                                </div>';
                    foreach ($value['answer'] as $keyA => $valueA) {
                        $t++;
                        $id = 'q' . $i . '_' . $t;
                        $event = '';
                        $content .= '
                                <div name="customradio" class="ui-radio" '.$event.'>
                                    <span class="jqradiowrapper">
                                    </span>
                                    <div class="label"><span class="emptyblock">' . $valueA .'</span>
                                    <span  class="spanradio">
                                        <input value="'.$keyA.'" group="1" class="sortradio" name="q'.$i.'[]" type="checkbox">
                                    </span>
                                    <span  class="spanradio">
                                        <input value="'.$keyA.'" group="2" class="sortradio" name="q'.$i.'[]" type="checkbox">
                                    </span>
                                    <span  class="spanradio">
                                        <input value="'.$keyA.'" group="3" class="sortradio" name="q'.$i.'[]" type="checkbox">
                                    </span>
                                    <span  class="spanradio">
                                        <input value="'.$keyA.'" group="4" class="sortradio" name="q'.$i.'[]" type="checkbox">
                                    </span>
                                    <span  class="spanradio">
                                        <input value="'.$keyA.'" group="5" class="sortradio" name="q'.$i.'[]" type="checkbox">
                                    </span>
                                    </div>
                                </div>';
                    }
                    $content .= '</div><div class="errorMessage"></div>
                        </div>';
                    $content .= '</div>';
                }else if ($value['type'] == 5){
                    $i = $i + 1;
                    $content .='<div id="qn'.$i.'" name="qname" aid="'.$i.'">';
                    $content .='<input type="hidden" name="anum[]" value="1">';
                    $content .= '<div class="field ui-field-contain" id=div' . $i . ' req=' . $i . ' topic=' . $i .
                        ' data-role="fieldcontain" type="4">
                        <div class="field-label">' . $value['question'] .
                        '<span class="req">*</span></div>
                        <div class="ui-controlgroup"><textarea style="width: 100%;" rows="5" cols="20" name="q'.$i.'"></textarea></div>
                        <div class="errorMessage"></div>';
                        $content .= '</div>';
                }
                
            }
            $content .='</div>';
        }   
        $content && $content.='</div>';
        echo  $content;  
    ?>
    </div>
        </fieldset>
        <a class="button blue" id="nextPro">下一题</a>
        <a class="button blue" id="prePro">上一题</a>
        </div>
        <div class="footer">
            <div class="ValError" id="ValError">
            </div>
            
            
            <div id="goSubmit" style="padding: 0px 20px 10px;">
                <div>
                <a id="" href="javascript:;" class="button blue">
                    提交</a>
                </div>
            </div>
            
            
            <div id="divSearch" style="background:#020d15;color: #7c7c7c; font-size: 18px; height:50px;
                left: 0; line-height:50px; position: fixed; text-align: center; bottom: 0; width: 100%;
                z-index: 100;display:none;">
                
            </div>
            
        </div>
       
    </div>
   
     
    <div id="divPowerBy" style="margin: 0 auto;" class="logofooter"><div class="wjfooter">LT&nbsp;提供技术支持</div></div>
    
    
        
    </form>



    </div>
</body></html>