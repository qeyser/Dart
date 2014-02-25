<?php if(!defined("HDPHP_PATH"))exit;C("SHOW_NOTICE",FALSE);?><?php if(!defined("HDPHP_PATH"))exit;C("SHOW_NOTICE",FALSE);?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="zh-CN">
<head>
<meta charset="UTF-8" />
<meta http-equiv="X-UA-Compatible" content="IE=7" />
<title>新疆麦盖提县刀郎艺术团 - Xinjiang Maigaiti Daolang Yishutuan</title>
<meta name="keywords" content="刀郎,木卡姆,歌舞团,艺术团,麦盖提,新疆,麦西莱普,makit,dolan,art,Html5,CSS3">
<meta name="description" content="">
<meta name="author" content="Qeyser.Mutellip">
<meta name="Copyright" content="新疆麦盖提县刀郎艺术团">
<link rel="stylesheet" href="http://dolanart/Ch/Ch/Tpl/Public/css/common.css" type="text/css">
<style media="screen" type="text/css">#cu3er-container {visibility: hidden}</style>
<script src="http://dolanart/Ch/Ch/Tpl/Public/js/jquery.js"></script>
<script src="http://dolanart/Ch/Ch/Tpl/Public/scripts/easingAndLazyload.js"></script>
<script src="http://dolanart/Ch/Ch/Tpl/Public/scripts/commonAnimate.js"></script>
</head>
<body>
<div class="topside01">
  <div class="top01">
    <div class="logobox">
      <div class="logo01"></div>
      <div class="clear"></div>
    </div>
  </div>
</div>
<div class="centerside">
<div class="center"> 
<!--Menu start-->
<div class="bg_picture">
  <div class="bg_box">
    <div class="lf_space"><img src="http://dolanart/Ch/Ch/Tpl/Public/Newimages/lf_space.jpg" width="11" height="280"/></div>
    <div class="bg_img">
      <object style="visibility: visible;" id="cu3er-container" data="cu3er.swf" type="application/x-shockwave-flash" width="980" height="280">
        <param value="transparent" name="wmode">
        <param value="slider" name="id">
        <param value="xml=config.xml&amp;font=font.swf" name="flashvars">
      </object>
    </div>
    <div class="rt_space"><img src="http://dolanart/Ch/Ch/Tpl/Public/Newimages/rt_space.jpg" width="12" height="280"/></div>
    <div class="clear"></div>
  </div>
  <div class="biaoyu">
  <div class="global01"><?php if(!defined("HDPHP_PATH"))exit;C("SHOW_NOTICE",FALSE);?><ul>
  <li class="first"><a href="http://dolanart/Ch/index.php" onFocus="this.blur();"><img src="http://dolanart/Ch/Ch/Tpl/Public/images/gbl_home.jpg" width="141" height="56"/></a></li>
  <li ><a href="<?php echo U('Show/info',array('inid'=>1));?>" onFocus="this.blur();"><img src="http://dolanart/Ch/Ch/Tpl/Public/images/gbl_Umak.jpg" width="156" height="56"/></a></li>
  <li ><a href="<?php echo U('List/artist');?>" onFocus="this.blur();"><img src="http://dolanart/Ch/Ch/Tpl/Public/images/gbl_artis.jpg" width="156" height="56"/></a></li>
  <li class="bg"><a href="<?php echo U('List/creation');?>" onFocus="this.blur();"><img src="http://dolanart/Ch/Ch/Tpl/Public/images/gbl_creation.jpg" width="167" height="56"/></a></li>
  <li ><a href="<?php echo U('List/video');?>" onFocus="this.blur();"><img src="http://dolanart/Ch/Ch/Tpl/Public/images/gbl_video.jpg" width="156" height="56"/></a></li>
  <li class="last"><a href="<?php echo U('Show/contect');?>" onFocus="this.blur();"><img src="http://dolanart/Ch/Ch/Tpl/Public/images/gbl_content.jpg" width="156" height="56"/></a></li>
</ul></div>
  <div class="clear"></div>
  </div>
</div>
<!--Video start-->
<div class="service_news">
<div class="service">
  <div class="service_tt"><img src="http://dolanart/Ch/Ch/Tpl/Public/images/video_tt.jpg" width="681" height="37"/></div>
  <div class="service_box">
    <ul id="service_box_ul">
    <?php $hd["list"]["n"]["total"]=0;if(isset($topvideo) && !empty($topvideo)):$_id_n=0;$_index_n=0;$lastn=min(1000,count($topvideo));
$hd["list"]["n"]["first"]=true;
$hd["list"]["n"]["last"]=false;
$_total_n=ceil($lastn/1);$hd["list"]["n"]["total"]=$_total_n;
$_data_n = array_slice($topvideo,0,$lastn);
if(count($_data_n)==0):echo "";
else:
foreach($_data_n as $key=>$n):
if(($_id_n)%1==0):$_id_n++;else:$_id_n++;continue;endif;
$hd["list"]["n"]["index"]=++$_index_n;
if($_index_n>=$_total_n):$hd["list"]["n"]["last"]=true;endif;?>
<li>
    <span class="service_img"><a href="<?php echo U('Show/video',array('void'=>$n['void']));?>" target="_blank">
    <img src="<?php $_emptyVar =isset($n['thumb'])?$n['thumb']:null?><?php  if( empty($_emptyVar)){?>http://dolanart/Ch/Ch/Tpl/Public/Newimages/services_img01.jpg<?php }else{ ?><?php echo $n['thumb'];?><?php }?>"  alt="<?php echo $n['title'];?>" width="199" height="100"/></a></span>
    <span class="service_title"><?php echo $n['title'];?></span></li><?php $hd["list"]["n"]["first"]=false;
endforeach;
endif;
else:
echo "";
endif;?>
    </ul>
  </div>
</div>
<!--News start-->
<div class="space01"><img src="http://dolanart/Ch/Ch/Tpl/Public/Newimages/space01.jpg" width="11" height="308"/></div>
<div class="news" style="position:relative; overflow:hidden">
<div class="news_tt"><ul>
  <li class="newsicon" id="news_pic_0"><a href="javascript:show_pic(0)">1</a></li>
  <li id="news_pic_1"><a href="javascript:show_pic(1)">2</a></li>
  <li id="news_pic_2"><a href="javascript:show_pic(2)">3</a></li>
  </ul></div>
<div class="news_cn" style="overflow:hidden">
  <div style="width:286px; height:189px; display:block; overflow:hidden">
  <?php $hd["list"]["n"]["total"]=0;if(isset($topnews) && !empty($topnews)):$_id_n=0;$_index_n=0;$lastn=min(1000,count($topnews));
$hd["list"]["n"]["first"]=true;
$hd["list"]["n"]["last"]=false;
$_total_n=ceil($lastn/1);$hd["list"]["n"]["total"]=$_total_n;
$_data_n = array_slice($topnews,0,$lastn);
if(count($_data_n)==0):echo "";
else:
foreach($_data_n as $key=>$n):
if(($_id_n)%1==0):$_id_n++;else:$_id_n++;continue;endif;
$hd["list"]["n"]["index"]=++$_index_n;
if($_index_n>=$_total_n):$hd["list"]["n"]["last"]=true;endif;?>

    <div id="news_cn_<?php echo $key;?>" style=" height:189px;display:block; overflow:hidden">
      <div class="news_cn_img" style="overflow:hidden;">
      <img class="lazy" src="<?php $_emptyVar =isset($n['thumb'])?$n['thumb']:null?><?php  if( empty($_emptyVar)){?>http://dolanart/Ch/Ch/Tpl/Public/images/0830011428.jpg<?php }else{ ?><?php echo $n['thumb'];?><?php }?>" width="256" height="116"/></div>
      <div class="news_jianxu"> <span class="news_jxtt"><a href="<?php echo U('Show/news',array('nid'=>$n['nid']));?>"><?php echo $n['title'];?></a>
      <span><?php echo date('Y-m',$n['time']);?></span></span>
      <span class="news_jxcn"><?php echo $n['content'];?></span> </div>
    </div>
    <?php $hd["list"]["n"]["first"]=false;
endforeach;
endif;
else:
echo "";
endif;?>
  </div>
  <div class="news_list" style="overflow:hidden">
    <ul><?php $hd["list"]["n"]["total"]=0;if(isset($news) && !empty($news)):$_id_n=0;$_index_n=0;$lastn=min(1000,count($news));
$hd["list"]["n"]["first"]=true;
$hd["list"]["n"]["last"]=false;
$_total_n=ceil($lastn/1);$hd["list"]["n"]["total"]=$_total_n;
$_data_n = array_slice($news,0,$lastn);
if(count($_data_n)==0):echo "";
else:
foreach($_data_n as $key=>$n):
if(($_id_n)%1==0):$_id_n++;else:$_id_n++;continue;endif;
$hd["list"]["n"]["index"]=++$_index_n;
if($_index_n>=$_total_n):$hd["list"]["n"]["last"]=true;endif;?>

      <li><a href="<?php echo U('Show/news',array('nid'=>$n['nid']));?>"><?php echo $n['title'];?></a></li>
    <?php $hd["list"]["n"]["first"]=false;
endforeach;
endif;
else:
echo "";
endif;?></ul>
  </div>
</div>
<span style="position:absolute; left:245px; top:231px;"><a href="<?php echo U('List/news');?>" style="width:30px; height:30px; display:block;"></a></span> 
</div>
<div class="space02"><img src="http://dolanart/Ch/Ch/Tpl/Public/Newimages/space02.jpg" width="12" height="308"/></div>
<div class="clear"></div>
</div>
<script type="text/javascript">
var hot_video_index = 0;
function show_pic(){
for(var i = 0; i < 3 ;i++){
$("#news_cn_" + i).hide();
$("#news_pic_" + i).removeClass("newsicon");
}
$("#news_cn_" + hot_video_index).show();
$("#news_pic_" + hot_video_index).addClass("newsicon");	
hot_video_index++;
if(hot_video_index > 2){
hot_video_index = 0;
}
}
function set_pic(index){
hot_video_index = index;
show_pic();
}
function loop_util(){
show_pic();
}
setInterval(loop_util, 3000);
</script> 

<!-- Artist start-->
<div id="out_pic_div">
<a href="javascript:void(0)" onClick="move_pic('left',1)" id="pic_leftan"></a>
<div id="pic_div"><ul id="pic_ul"><?php $hd["list"]["n"]["total"]=0;if(isset($artist) && !empty($artist)):$_id_n=0;$_index_n=0;$lastn=min(1000,count($artist));
$hd["list"]["n"]["first"]=true;
$hd["list"]["n"]["last"]=false;
$_total_n=ceil($lastn/1);$hd["list"]["n"]["total"]=$_total_n;
$_data_n = array_slice($artist,0,$lastn);
if(count($_data_n)==0):echo "";
else:
foreach($_data_n as $key=>$n):
if(($_id_n)%1==0):$_id_n++;else:$_id_n++;continue;endif;
$hd["list"]["n"]["index"]=++$_index_n;
if($_index_n>=$_total_n):$hd["list"]["n"]["last"]=true;endif;?>

<li><a href="<?php echo U('Show/artist',array('arid'=>$n['arid']));?>"><img src="<?php echo $n['thumb'];?>" width="110" height="80" alt="24" /></a></li>
<?php $hd["list"]["n"]["first"]=false;
endforeach;
endif;
else:
echo "";
endif;?></ul></div>
<a href="javascript:void(0)" onClick="move_pic('right',1)" id="pic_rightan"></a>
</div><!--out_pic_div-->
<script type="text/javascript">
var i_n=0;//当前第几张图片
var i_all=0; //共几张图片
var f_settime; //定时器
var b_direction="left";//方向
function move_pic(id,i){
  var ii=i_all-7;
  if (ii<1)return;
  if(b_direction=="left"){
    i_n-=1;
  }else{
    i_n+=1;
  }
  if(i_n<1){
    i_n=2;
    b_direction="right";
  }
  if(i_n>i_all-6){
    i_n=i_all-7;
    b_direction="left";
  }
  if(i==0)
    $("#pic_ul").animate({left: -(i_n-1)*134+"px"},"slow");
  else
    $("#pic_ul").css("left", -(i_n-1)*134+"px");
}
var ad_inter;
$(document).ready(function(){
  ad_inter=setInterval("top_adpic('')", 4000);
  $("#topad_ul li").hover(function(){
    clearInterval(ad_inter);
  },function(){
    ad_inter=setInterval("top_adpic('')", 4000);
  });
  i_all=$("#pic_ul li").size();
  $("#pic_ul").css("width",i_all*134);
  if(i_all>7)f_settime = setInterval("move_pic('left',0)", 4000);
  $("#pic_leftan,#pic_rightan").hover(function(){
    clearInterval(f_settime);
  },function(){
    f_settime = setInterval("move_pic('left',0)", 4000);
  });
});
</script>

<div class="snews_list">
<!--Works start-->
  <div class="snews">
    <div class="snews_tt1"><span class="frs"><a href="<?php echo U('List/works');?>">更多>></a></span></div>
    <div class="snews_box">
      <ul><?php $hd["list"]["n"]["total"]=0;if(isset($works) && !empty($works)):$_id_n=0;$_index_n=0;$lastn=min(1000,count($works));
$hd["list"]["n"]["first"]=true;
$hd["list"]["n"]["last"]=false;
$_total_n=ceil($lastn/1);$hd["list"]["n"]["total"]=$_total_n;
$_data_n = array_slice($works,0,$lastn);
if(count($_data_n)==0):echo "";
else:
foreach($_data_n as $key=>$n):
if(($_id_n)%1==0):$_id_n++;else:$_id_n++;continue;endif;
$hd["list"]["n"]["index"]=++$_index_n;
if($_index_n>=$_total_n):$hd["list"]["n"]["last"]=true;endif;?>

        <li><a href="<?php echo U('Show/works',array('wrid'=>$n['wrid']));?>"><?php echo $n['title'];?></a><span class="fr"><?php echo date('Y-m',$n['time']);?></span></li>
      <?php $hd["list"]["n"]["first"]=false;
endforeach;
endif;
else:
echo "";
endif;?></ul>
    </div>
  </div>

<div class="space01"><img src="http://dolanart/Ch/Ch/Tpl/Public/Newimages/space01.jpg" width="11" height="308"/></div>

<!--Video start-->
<div class="snews">
  <div class="snews_tt2"><span class="frs"><a href="<?php echo U('List/article');?>">更多>></a></span></div>
  <div class="snews_box">
    <ul><?php $hd["list"]["n"]["total"]=0;if(isset($article) && !empty($article)):$_id_n=0;$_index_n=0;$lastn=min(1000,count($article));
$hd["list"]["n"]["first"]=true;
$hd["list"]["n"]["last"]=false;
$_total_n=ceil($lastn/1);$hd["list"]["n"]["total"]=$_total_n;
$_data_n = array_slice($article,0,$lastn);
if(count($_data_n)==0):echo "";
else:
foreach($_data_n as $key=>$n):
if(($_id_n)%1==0):$_id_n++;else:$_id_n++;continue;endif;
$hd["list"]["n"]["index"]=++$_index_n;
if($_index_n>=$_total_n):$hd["list"]["n"]["last"]=true;endif;?>

      <li><a href="<?php echo U('Show/article',array('arid'=>$n['arid']));?>"><?php echo $n['title'];?></a><span class="fr"><?php echo date('Y-m',$n['time']);?></span></li>
    <?php $hd["list"]["n"]["first"]=false;
endforeach;
endif;
else:
echo "";
endif;?></ul>
  </div>
</div>

<div class="space01"><img src="http://dolanart/Ch/Ch/Tpl/Public/Newimages/space01.jpg" width="11" /></div>

<!--Music start-->
<div class="snews">
  <div class="snews_tt3"><span class="frs"><a href="<?php echo U('List/music');?>">更多>></a></span></div>
  <div class="snews_box">
    <ul><?php $hd["list"]["n"]["total"]=0;if(isset($music) && !empty($music)):$_id_n=0;$_index_n=0;$lastn=min(1000,count($music));
$hd["list"]["n"]["first"]=true;
$hd["list"]["n"]["last"]=false;
$_total_n=ceil($lastn/1);$hd["list"]["n"]["total"]=$_total_n;
$_data_n = array_slice($music,0,$lastn);
if(count($_data_n)==0):echo "";
else:
foreach($_data_n as $key=>$n):
if(($_id_n)%1==0):$_id_n++;else:$_id_n++;continue;endif;
$hd["list"]["n"]["index"]=++$_index_n;
if($_index_n>=$_total_n):$hd["list"]["n"]["last"]=true;endif;?>

      <li><a href="<?php echo U('Show/music',array('muid'=>$n['muid']));?>"><?php echo $n['title'];?></a><span class="fr"><?php echo date('Y-m',$n['time']);?></span></li>
    <?php $hd["list"]["n"]["first"]=false;
endforeach;
endif;
else:
echo "";
endif;?></ul>
  </div>
</div>

  <div class="clear"></div>
</div>

<!--Picture start-->
<div class="bgnews_list">
  <div class="bgnews">
    <div class="bgnews_tt"><span class="frs"><a href="<?php echo U('List/pic');?>">更多>></a></span></div>
    <div class="bgnews_box">
      <ul id="bgnews_box_ul"><?php $hd["list"]["n"]["total"]=0;if(isset($pic) && !empty($pic)):$_id_n=0;$_index_n=0;$lastn=min(1000,count($pic));
$hd["list"]["n"]["first"]=true;
$hd["list"]["n"]["last"]=false;
$_total_n=ceil($lastn/1);$hd["list"]["n"]["total"]=$_total_n;
$_data_n = array_slice($pic,0,$lastn);
if(count($_data_n)==0):echo "";
else:
foreach($_data_n as $key=>$n):
if(($_id_n)%1==0):$_id_n++;else:$_id_n++;continue;endif;
$hd["list"]["n"]["index"]=++$_index_n;
if($_index_n>=$_total_n):$hd["list"]["n"]["last"]=true;endif;?>

        <li class="fli"> <span class="bgnews_img"><a href="<?php echo U('Show/pic',array('pcid'=>$n['pcid']));?>">
        <img src="<?php echo Get_img($n['content'],content);?>" alt="广州网站建设" width="178" height="140"/></a></span> <span class="bgnews_title"><a href="<?php echo U('Show/pic',array('pcid'=>$n['pcid']));?>"><?php echo $n['title'];?></a></span></li>
      <?php $hd["list"]["n"]["first"]=false;
endforeach;
endif;
else:
echo "";
endif;?></ul>
    </div>
  </div>
  <div class="spacebg"><img src="http://dolanart/Ch/Ch/Tpl/Public/Newimages/spacebg.jpg" width="11" height="392" /></div>
  <div class="clear"></div>
</div>

<!--LOGO start-->
<div class="logolist">
  <div class="lfbtn"><img src="http://dolanart/Ch/Ch/Tpl/Public/logoimages/lfbtn.jpg" alt="广州网络营销NEWS" width="24" height="23"/></div>
  <div class="logo_list">
    <ul>
      <li><a href="#"><img src="http://dolanart/Ch/Ch/Tpl/Public/logoimages/logo-01.jpg" alt="广州网络营销N1" width="105" height="83"/></a></li>
      <li><a href="#"><img src="http://dolanart/Ch/Ch/Tpl/Public/logoimages/logo-01.jpg" alt="广州网络营销N1" width="105" height="83"/></a></li>
      <li><a href="#"><img src="http://dolanart/Ch/Ch/Tpl/Public/logoimages/logo-01.jpg" alt="广州网络营销N1" width="105" height="83"/></a></li>
      <li><a href="#"><img src="http://dolanart/Ch/Ch/Tpl/Public/logoimages/logo-01.jpg" alt="广州网络营销N1" width="105" height="83"/></a></li>
      <li><a href="#"><img src="http://dolanart/Ch/Ch/Tpl/Public/logoimages/logo-01.jpg" alt="广州网络营销N1" width="105" height="83"/></a></li>
      <li><a href="#"><img src="http://dolanart/Ch/Ch/Tpl/Public/logoimages/logo-01.jpg" alt="广州网络营销N1" width="105" height="83"/></a></li>
      <li><a href="#"><img src="http://dolanart/Ch/Ch/Tpl/Public/logoimages/logo-01.jpg" alt="广州网络营销N1" width="105" height="83"/></a></li>
      <li><a href="#"><img src="http://dolanart/Ch/Ch/Tpl/Public/logoimages/logo-01.jpg" alt="广州网络营销N1" width="105" height="83"/></a></li>
    </ul>
  </div>
  <div class="rtbtn"><img src="http://dolanart/Ch/Ch/Tpl/Public/logoimages/rtbtn.jpg" alt="广州网络营销rt"width="24" height="23"/></div>
  <div class="clear"></div>
</div>
  </div>
</div>

<!--Foot start-->
<?php if(!defined("HDPHP_PATH"))exit;C("SHOW_NOTICE",FALSE);?><div class="footer">
  <div class="foot">
      <div class="footlinks">
      <a href="index.php">网站首页</a> <span>|</span> 
      <a href="http://www.dolan-art.com/about.html">关于我们</a> <span>|</span> 
      <a href="http://www.dolan-art.com/join.html">联系我们</a> <span>|</span> 
      <a href="http://www.dolan-art.com/web-design.html">精彩视频</a> <span>|</span> 
      <a href="http://www.dolan-art.com/bulid_c_1.html">团新闻</a> <span>|</span> 
      <a href="http://www.dolan-art.com/contact.html">给我们留言</a> </div>
      <div class="foottxts"> Copyright © 2014-2015 DoLan-Art . All rights reserved<br />
        互动版权所有，抄版必究   <a href="http://www.miitbeian.gov.cn/" target="_blank">新ICP备201401号</a><br />
        TEL: +86-0998-7859051   Fax:020-33528812 </div>
    <div class="clear"></div>
  </div>
</div>
<script src="http://dolanart/Ch/Ch/Tpl/Public/js/swfobject.js"></script> 
<script type="text/javascript">
$(function () {
    var flashvars = {};
    flashvars.xml = "config.xml";
    flashvars.font = "font.swf";
    var attributes = {};
    attributes.wmode = "transparent";
    attributes.id = "slider";
    swfobject.embedSWF("cu3er.swf", "cu3er-container", "980", "280", "9", "expressInstall.swf", flashvars, attributes);
    jQuery(function () {
        jQuery(".logo_list").jCarouselLite({
            btnNext: ".lfbtn",
            btnPrev: ".rtbtn",
            visible: 7,
            auto: 800,
            speed: 1000
            /*circular: false*/
        });
    });
});
</script>
</body>
</html>