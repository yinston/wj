<?php
require_once 'model/question.php';
$qusetions['head'] = questionService::question('head');
$qusetions['base'] = questionService::question('base');
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"><head>
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
<script src="wj/jqmobo2.js" type="text/javascript"></script>

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
                      istore</h1>
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
                                <input value="'.$keyA.'" id="'.$id.'" name="q'.$i.
                                '" style="display:none;" type="radio">
                            <a class="jqradio" href="javascript:;">
                            </a>
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
                            if (isset($value['event'])) {
                                if ($value['event']['jumpType'] == 'out' && $value['event'][$keyA] == 'N') {
                                    $event = "goAnswer()";
                                } else if ($value['event']['jumpType'] == 'out') {
                                    $event = "finish()";
                                }
                            }
                            $content .= '
                                <div class="ui-radio">
                                    <span class="jqradiowrapper">
                                        <input value="' . $keyA . '" id="' . $id . '" name="q' . $i .
                                '" style="display:none;" type="radio">
                                    <a class="jqradio" href="javascript:; ' . $event . '">
                                    </a>
                                    </span>
                                    <div class="label" for="' . $id . '">' . $valueA . '</div>
                                </div>';
                        }
                        $content .= '</div><div class="errorMessage"></div></div>';
                        $content .= '</div>';
                    
                    }
                } else if ($value['type'] == 1) {
                    $i = $i + 1;
                    $content .='<div id="qn'.$i.'" name="qname" aid="'.$i.'">';
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
                                        <input value="' . $keyA . '" id="' . $id . '" name="q' . $i .'" type="radio">
                                    </span>
                                    <div class="label" for="' . $id . '">' . $valueA . '</div>
                                </div>';

                    }
                    if (isset($value['is_custom'])) {
                        $keyA+=1;
                                    $content .= '
                                    <div class="ui-radio">
                                        <span class="jqradiowrapper">
                                                <input value="' . $keyA . '" id="' . $tid . '" name="q' . $i .
                                '[]" style="display:none;" type="radio">
                                            <a id="a'.$tid.'" class="jqradio" href="javascript:;"' . $event . '>
                                            </a>
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
                    $content .='<div id="qn'.$i.'" name="qname" aid="'.$i.'">';
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
                                            <input value="' . $keyA . '" id="' . $id . '" name="q' . $i .
                            '[]" style="display:none;" type="checkbox">
                                        <a class="jqcheck" href="javascript:;"' . $event . '>
                                        </a>
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
                                                <input value="' . $keyA . '" id="' . $tid . '" name="q' . $i .
                                '[]" style="display:none;" type="checkbox">
                                            <a id="a'.$tid.'" class="jqcheck" href="javascript:;"' . $event . '>
                                            </a>
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
                        $sortradio = '';
                        $content .= '
                                <div name="customradio" class="ui-radio" '.$event.'>
                                    <span class="jqradiowrapper">
                                    </span>
                                    <div class="label"><span class="emptyblock">' . $valueA .'</span>
                                    <span  class="spanradio">
                                        <input value="1" group="1" class="sortradio" name="q'.$i.'" type="radio">
                                    </span>
                                    <span  class="spanradio">
                                        <input value="2" group="2" class="sortradio" name="q'.$i.'" type="radio">
                                    </span>
                                    <span  class="spanradio">
                                        <input value="3" group="3" class="sortradio" name="q'.$i.'" type="radio">
                                    </span>
                                    <span  class="spanradio">
                                        <input value="4" group="4" class="sortradio" name="q'.$i.'" type="radio">
                                    </span>
                                    <span  class="spanradio">
                                        <input value="5" group="5" class="sortradio" name="q'.$i.'" type="radio">
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

   
    <script type="text/javascript">
        var totalPage=1;
        var langVer=0;
        var nowNum = 1;
        var nextNum = 1;
        var numArr = {};
        var parentDiv;
        var pn = 0;
        var text_v;
        var oldPart;
        var preNum;
        function SendForm(){
            /*var bottombox = document.getElementById("div1");
            bottombox.scrollIntoView(); */
             text_v = $('textarea').val();
             text_v = text_v.replace(/(^\s*)|(\s*$)/g, "");
             if(text_v==''){
                $("div.errorMessage").eq(nowNum-1).html('请填写') 
             }else{
                $.ajax({
                     url:"wjsubmit.php",
                     type:"post",
                     data:$("#form1").serialize(),
                    success:function(data){
                        if(data['flag']){
                            $('#divContent').html('<span class="mesbox">提交成功，感谢您的参与，再会</span>');
                        }else{
                            $('#divContent').html('<span class="mesbox">提交失败，'+data['error']+'</span>');
                        }
                    },
                    dataType:'json',
                });
             }
            //document.addForm.submit();
        }
        function jumpTo(id){
            /*var bottombox = document.getElementById(id);
            bottombox.scrollIntoView(); */
            nextNum = id;
            for(var i=1;i<nextNum;i++){
                var passNum = parseInt(nowNum)+i;
                 $("#qn"+passNum).find('a.jqradio.jqchecked').each(function(){
                    $(this).parents('.ui-radio').click();
                 });
            }
        }
        function finish(){
                //alert("感谢您的参与，再会");
                $('#goSubmit').hide();
                $('#baseAnswer').hide();
                $('#qusetionsHead').hide();
                $('#divContent').html('<span class="mesbox">感谢您的参与，再会</span>');
        }
        function goAnswer(){
            nowNum = 7;
        }
        function otherDB(obj){
            var vname = $(obj).attr('name');
            $("input[name='"+vname+"']").attr('disabled',true);
            $(obj).attr('disabled',false);
        }
        function getFocus(obj){
            var cname = '#a'+$(obj).attr('link');
            if(!$(cname).hasClass('jqchecked')){
                $(cname).addClass("jqchecked")
            };
            event.stopPropagation(); 
        }

        $(document).ready(function(){  
            $('#baseAnswer').hide();
            $("div[name='qname']").each(function(){
                $(this).hide();     
            });
            $("div[name='qname']").each(function(){
                $(this).bind("click",function(){
                        nowNum = $(this).attr('aid');
                });
            });

            $("textarea").blur(function(){
                text_v = $('textarea').val();
                text_v = text_v.replace(/(^\s*)|(\s*$)/g, "");
                if(text_v){
                    $('#goSubmit').show();
                    $('#nextPro').hide();
                    $('#prePro').hide();
                    $('#goSubmit').bind('click',function(){
                        SendForm();
                    });
                }else{
                    $('#goSubmit').hide();
                    $('#nextPro').show();
                    $('#prePro').show();
                }
            });
            $('#qn1').show();
            $('#prePro').bind("click",function(){
                if(numArr[nowNum]){
                    parentDiv = $("#qn"+nowNum).parent("div[name='questionsBase']");
                    pn = parentDiv.index();//当前所属part
                    if(numArr[nowNum]['part'] != pn){
                        if(numArr[nowNum]['part'] == -1){
                            $("div[name='questionsBase']").eq(pn).hide();
                            $('#qusetionsHead').show(); 
                        }else{
                            $("div[name='questionsBase']").eq(pn).hide();
                            $("div[name='questionsBase']").eq(numArr[nowNum]['part']).show();
                        }
                        
                    }
                    $("#qn"+nowNum).hide();
                    $("#qn"+numArr[nowNum]['preNum']).show();
                    nowNum = numArr[nowNum]['preNum'];
                }
            });
            $('#nextPro').bind("click",function(){
                var isCheck = isFill = false;
                if(nowNum == 63 && $("input[name='q63']:checked").length!=5){
                    $("div.errorMessage").eq(nowNum-1).html('请选择五个选项');
                    return; 
                }
                if(nowNum == 28 && $("#qn28").find('a.jqcheck.jqchecked').length>3){
                    $("div.errorMessage").eq(nowNum-1).html('最多选择三个选项') ;
                    return;
                }
                $("input[name='q"+nowNum+"']").each(function(){
                   if($(this).attr('type')=='radio'){
                        if($(this).is(":checked")){
                            isCheck = true;    
                        }
                   }     
                });
                $("input[name='q"+nowNum+"[]']").each(function(){
                   if($(this).attr('type')=='checkbox' ){
                        if($(this).is(":checked")){
                            isCheck = true;    
                        }
                   }
                });
                if($("input[name='q"+nowNum+"_text']").length){
                    var qid = $("input[name='q"+nowNum+"_text']").attr('link');
                    var text_v = $("input[name='q"+nowNum+"_text']").val();
                    var context = text_v.replace(/(^\s*)|(\s*$)/g, "");
                    if($("#"+qid).is(":checked") && context == ''){
                      isFill = true;   
                    }
                }  
                if(isFill){
                   //alert('请填写其他说明'+nowNum);console.log($("div.errorMessage").eq(nowNum-1))
                   $("div.errorMessage").eq(nowNum-1).html('请填写其他说明') 
                   return;     
                }
                if(isCheck == false){
                   $("div.errorMessage").eq(nowNum-1).html('请做选择') 
                   return;     
                }
                if(nowNum == 8){
                    $('#baseAnswer').show();
                        $("div[name='questionsBase']").each(function(){
                            $(this).hide();     
                        });
                        $("div[name='questionsBase']").eq(0).show();
                        
                        $("div[name='qname']").each(function(){
                            $(this).hide();     
                        });
                        $('#qusetionsHead').hide(); 
                }
              $("#qn"+nowNum).hide();
              //上一题数据
              oldPart = $("#qn"+nowNum).parent("div[name='questionsBase']").index();
              preNum = nowNum;
              nowNum = parseInt(nowNum)+parseInt(nextNum);
              numArr[nowNum] = {'part':oldPart,'preNum':preNum};
              parentDiv = $("#qn"+nowNum).parent("div[name='questionsBase']");
              pn = parentDiv.index();//当前所属part
              if(nowNum>8){
                  if(pn>0){
                    $("div[name='questionsBase']").eq(parseInt(pn)-1).hide();
                  }
                  parentDiv.show();
              }
              $("#qn"+nowNum).show();
              nextNum=1;
              event.stopPropagation(); 
            });
        });  
        $("input.sortradio").each(function(){
            $(this).parents('div[name="customradio"]').unbind();//exit;
            //console.log($(this).parents('div[name="customradio"]'));
            $(this).bind('click',function(){
               var group = $(this).attr('group');
               $("input.sortradio").each(function(){
                   if($(this).attr('group') == group){
                       if($(this).hasClass('rediochecked')){
                            $(this).removeClass('rediochecked');
                       } 
                   }                          
               });
               
               $(this).parents('.label').find('input.sortradio').each(function(){
                    if($(this).hasClass('rediochecked')){
                            $(this).removeClass('rediochecked');
                    } 
               });
               $(this).addClass('rediochecked');
               $(this).attr('checked',true);
               event.stopPropagation(); 
            });
        });
        $("input.normalradio").each(function(){
            $(this).bind('click',function(){
                $("input.normalradio").each(function(){
                    if($(this).is(':checked')){
                        if(!$(this).hasClass('rediochecked')){
                            $(this).addClass('rediochecked');
                        }
                    }else{
                        $(this).removeClass('rediochecked');
                    }
                });
                event.stopPropagation();
            });
        });
    </script>
   
    
    <script type="text/javascript">
        var needAvoidCrack=0;
        var tdCode="tdCode";
        var imgCode = $("#imgCode")[0];
        var submit_text = $("#yucinput")[0];
        var tCode = $("#"+tdCode)[0];
        var hasTouPiao=0;
    </script>
    </div>
</body></html>