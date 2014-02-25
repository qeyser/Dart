<?php
//阅读控制器类
class ShowControl extends CommonControl{

	// 信息阅读
	public function info(){
		$inid = $_GET['inid'];
		$info = M('Info')->where(array('inid'=>$inid))->find();
		$this->assign('info',$info);
        $this->piclist();
		$this->display();
	}
	// 新闻阅读
    public function news(){
    	$nid = $_GET['nid'];
    	$field = 'nid,title,click,time';
    	$news = M('News')->where(array('nid'=>$nid))->field($field)->find();
    	M('News')->inc('click',"nid=$nid",1);
    	$this->assign('news',$news);
    	$this->rightnews();
        $this->display();
    }
    // 活动阅读
    public function works(){
        $wrid = $_GET['wrid'];
        $field = 'wrid,title,click,time';
        $works = M('Works')->where(array('wrid'=>$wrid))->field($field)->find();
        M('Works')->inc('click',"wrid=$wrid",1);
        $this->assign('works',$works);
        $this->rightworks();
        $this->display();
    }
    // 活动阅读
    public function article(){
        $arid = $_GET['arid'];
        $field = 'arid,title,click,time';
        $article = M('Article')->where(array('arid'=>$arid))->field($field)->find();
        M('Article')->inc('click',"arid=$arid",1);
        $this->assign('article',$article);
        $this->rightarticle();
        $this->display();
    }    
    // 演员阅读
    public function artist(){
        $arid = $_GET['arid'];
        $artist = M('Artist')->where(array('arid'=>$arid))->find();
        M('Artist')->inc('click',"arid=$arid",1);
        $this->assign('artist',$artist);
        $this->display();
    }
    // 视频阅读
    public function video(){
        $void = $_GET['void'];
        $field = 'void,title,content,click,time';
        $video = M('Video')->where(array('void'=>$void))->field($field)->find();
        M('Video')->inc('click',"void=$void",1);
        $this->assign('video',$video);
        $this->rightvideo();
        $this->display();
    }
    // 音乐阅读
    public function music(){
        $muid = $_GET['muid'];
        $field = 'muid,title,url,click,time';
        $music = M('music')->where(array('muid'=>$muid))->field($field)->find();
        M('music')->inc('click',"muid=$muid",1);
        $this->assign('music',$music);
        $this->rightmusic();
        $this->display();
    }
    // 图片阅读
    public function pic(){
        $pcid = $_GET['pcid'];
        $field = 'pcid,title,content,click,time';
        $pic = M('Pic')->where(array('pcid'=>$pcid))->field($field)->find();
        M('Pic')->inc('click',"pcid=$pcid",1);
        $this->assign('pic',$pic);
        $this->rightpic();
        $this->display();
    }    
    // 联系
    public function contect(){
        if(IS_POST){
            $data = array(
                'name'      => Q('name'),
                'telephone' => Q('telephone'),
                'content'   => Q('content'),
                'qq'        => Q('qq'),
                'time'      => time()
                );
            M('Gbook')->add($data);
            $this->success('留言成功,感谢您的支持！');
        }else{
            $this->display();
        }
    }    
}
?>