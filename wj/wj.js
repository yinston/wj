
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
            /*$.ajax({
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
            });*/
        $.post("wjsubmit.php",$("#form1").serialize(),function(data){
            if(data['flag']){
                                $('#divContent').html('<span class="mesbox">提交成功，感谢您的参与，再会</span>');
                            }else{
                                $('#divContent').html('<span class="mesbox">提交失败，'+data['error']+'</span>');
                            }
          },'json');

        }
        //document.addForm.submit();
    }
    function jumpTo(id){
        /*var bottombox = document.getElementById(id);
         bottombox.scrollIntoView(); */
        nextNum = id;
        for(var i=1;i<nextNum;i++){
            var passNum = parseInt(nowNum)+i;
            $("#qn"+passNum).find('input[type="radio"]:checked').each(function(){
                $(this).attr('checked',false);
            });
            $("#qn"+passNum).find('input[type="checkbox"]:checked').each(function(){
                $(this).attr('checked',false);
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
        nowNum = 8;
    }
    function otherDB(obj){
        var vname = $(obj).attr('name');
        $("input[name='"+vname+"']").attr('disabled',true);
        $(obj).attr('disabled',false);
    }
    function getFocus(obj){
        var cname = '#q'+$(obj).attr('link');
        if(!$(cname).hasClass('checkboxchecked')){
            $(cname).addClass("checkboxchecked")
        };
        event.stopPropagation();
    }

    $(document).ready(function(){
        $('#baseAnswer').hide();
        $("div[name='qname']").each(function(){
            $(this).hide();
        });
        $("div.ui-radio,input[type='radio'],div.ui-checkbox,input[type='checkbox']").each(function(){
            $(this).bind("click",function(){
                nowNum = $(this).parents('div[name="qname"]').attr('aid');
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
        var radioC ;
        var checkboxC ;
        var isCheck = isFill = false;
        var pnm;
        var sonIndex;
        var sonId;
        $('#nextPro').bind("click",function(e){
            //点击选项附值
            radioC = $("input[name='q"+nowNum+"']:checked");
            checkboxC = $("input[name='q"+nowNum+"[]']:checked");
            if(radioC.length && parseInt(radioC.attr('passnum'))>0){
                nextNum = radioC.attr('passnum');
                jumpTo(nextNum);
            }
            if(checkboxC.length){
              var arrs = [];
              sonId =  '#qn'+(parseInt(nowNum)+1); 
              var isSonCheck = $('#qn'+nowNum).attr('son');
              $("input[name='q"+nowNum+"[]']").each(function(i,t){
                  if($(this).attr('checked')){
                      arrs.push(i);
                  }
              });
              if(isSonCheck==1){
                $(sonId).find('.ui-radio').each(function(){
                  $(this).hide();
                });
              }
              var isAllCheck = 0;
              var isCustomCheck = 0;
              var divid;
              var sonText;
              $("input[name='q"+nowNum+"[]']").each(function(k,v){
               if($(this).attr('checked')!=undefined){
                   pnm = $(this).attr('passnum')
                   if(parseInt(pnm)>1){
                       jumpTo(pnm);
                   }
                   if(isSonCheck==1){
                       sonIndex = k;
                       if(checkboxC.length!=$('input[name="anum[]"]').eq(nowNum-1).val()){
                           divid = $(this).attr('id');
                           if($('#'+divid+'_text').val()!=undefined && $('#'+divid+'_text').val()!=''){
                               sonText = parseInt(nowNum)+1;
                               if($('#q'+sonText+'_'+sonIndex+'_text').val()!=undefined){
                                   $('input[name="q'+sonText+'_text"]').val($('#'+divid+'_text').val());
                                   $('#q'+sonText+'_text').attr('type','label');
                               }
                               isCustomCheck = 1;
                           }
                       }else{
                           isAllCheck = 1;
                       }
                   }
               }
              });
              if(arrs.length==1){
                  if(isCustomCheck){
                      isAllCheck = 1;
                  }else{
                      $(arrs).each(function(i,item){
                          $(sonId).find('.ui-radio').eq(item).show();
                      });
                  }
              }else{
                  $(arrs).each(function(i,item){
                      $(sonId).find('.ui-radio').eq(item).show();
                  });
              }
              if(isAllCheck){
                $(sonId).find('.ui-radio').each(function(){
                  $(this).show();
                });
              }
            }
            if(nowNum==8 && $("input[name='q8']:checked").val() == 2){
              finish();
            }
            if(nowNum == 63 && $("input[name='q63[]']:checked").length!=5){
                $("div.errorMessage").eq(nowNum-1).html('请选择五个选项');
                return;
            }
            if(nowNum == 28 && $("#qn28").find('input.normalcheckbox.checkboxchecked').length>3){
                $("div.errorMessage").eq(nowNum-1).html('最多选择三个选项') ;
                return;
            }
            isFill = isCheck = false;
            $("input[name='q"+nowNum+"']").each(function(){
                if($(this).attr('type')=='radio'){
                    if($(this).attr("checked")!=undefined && $(this).attr("checked")){
                        isCheck = true;
                    }
                }
            });
            $("input[name='q"+nowNum+"[]']").each(function(){
                if($(this).attr('type')=='checkbox' ){
                    if($(this).attr("checked")!=undefined && $(this).attr("checked")){
                        isCheck = true;
                    }
                }
            });
            if($("input[name='q"+nowNum+"_text']").length){
                var qid = $("input[name='q"+nowNum+"_text']").attr('link');
                var text_v = $("input[name='q"+nowNum+"_text']").val();
                var context = text_v.replace(/(^\s*)|(\s*$)/g, "");        
                if($("#"+qid).attr("checked")!=undefined && $("#"+qid).attr("checked") && context == ''){
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
            e.stopPropagation();
            /*event.stopPropagation();*/
        });
        $("input.sortradio").each(function(){
            $(this).parents('div[name="customradio"]').unbind();//exit;
            //console.log($(this).parents('div[name="customradio"]'));
            $(this).bind('click',function(e){
                var group = $(this).attr('group');
                $("input.sortradio").each(function(){
                    if($(this).attr('group') == group){
                        if($(this).hasClass('rediochecked')){
                            $(this).removeClass('rediochecked');
                            $(this).attr('checked',false);
                        }
                    }
                });

                $(this).parents('.label').find('input.sortradio').each(function(){
                    if($(this).hasClass('rediochecked')){
                        $(this).removeClass('rediochecked');
                        $(this).attr('checked',false);
                    }
                });
                $(this).addClass('rediochecked');
                $(this).attr('checked',true);
                e.stopPropagation();

                /*event.stopPropagation();*/
            });
        });
        $("input.normalradio").each(function(){
            $(this).bind('click',function(e){
                $(this).parents('.ui-controlgroup').find('input.normalradio').each(function(){
                    if($(this).hasClass('rediochecked')){
                        $(this).removeClass('rediochecked');
                        $(this).attr('checked',false);
                    }
                });
                $(this).attr('checked',true);
                $(this).addClass('rediochecked');
                /*event.stopPropagation();*/
                e.stopPropagation();

            });
        });
        $("input.normalcheckbox").each(function(){
            $(this).bind('click',function(e){
                if($(this).attr('checked')){
                    $(this).removeClass('checkboxchecked');
                    $(this).attr('checked',false);
                }else{
                    $(this).attr('checked',true);
                    if(!$(this).hasClass('checkboxchecked')){
                        $(this).addClass('checkboxchecked');
                    }
                }
                e.stopPropagation();

                /*event.stopPropagation();*/
            });
        });
        $(".ui-radio").each(function(){
            $(this).bind('click',function(e){
                if($(this).find("input.normalradio")[0]){
                    $(this).find("input.normalradio")[0].click();
                }
                e.stopPropagation();

                /*event.stopPropagation();*/
            });
        });
        $(".ui-checkbox").each(function(){
            $(this).bind('click',function(e){
                if($(this).find("input.normalcheckbox")[0]){
                    $(this).find("input.normalcheckbox")[0].click();
                }
                e.stopPropagation();

                /*event.stopPropagation();*/
            });
        });
    });


    var needAvoidCrack=0;
    var tdCode="tdCode";
    var imgCode = $("#imgCode")[0];
    var submit_text = $("#yucinput")[0];
    var tCode = $("#"+tdCode)[0];
    var hasTouPiao=0;