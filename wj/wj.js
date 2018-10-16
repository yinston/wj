<script type="text/javascript">
        var totalPage=1;
        var langVer=0;
        var nowNum = 1;
        var nextNum = 1;
        var numArr = {};
        var parentDiv;
        var pn = 0;
        var text_v;
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
                        $("div[name='questionsBase']").eq(pn).hide();
                        $("div[name='questionsBase']").eq(numArr[nowNum]['part']).show();
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
              nowNum = parseInt(nowNum)+parseInt(nextNum);
              parentDiv = $("#qn"+nowNum).parent("div[name='questionsBase']");
              pn = parentDiv.index();//当前所属part
              if(nowNum>8){

                  if(pn>0){
                    pn = parseInt(pn)-1;
                    $("div[name='questionsBase']").eq(pn).hide();
                  }
                  parentDiv.show();
              }
              numArr[nowNum] = {'part':pn,'preNum':parseInt(nowNum)-parseInt(nextNum)}
              $("#qn"+nowNum).show();
              nextNum=1;
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
    </script>
   
    
    <script type="text/javascript">
        var needAvoidCrack=0;
        var tdCode="tdCode";
        var imgCode = $("#imgCode")[0];
        var submit_text = $("#yucinput")[0];
        var tCode = $("#"+tdCode)[0];
        var hasTouPiao=0;
    </script>