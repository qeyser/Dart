<?php
//测试控制器类
class CommonControl extends Control{
	/**
	 * 新闻模块
	 */
    public function news(){
	    $db = M('News');
	    //置顶新闻
	    $topnews = $db ->where(array('istop'=>1))->order('time DESC')->limit(3)->select();
	    $this->assign('topnews',$topnews);
	    //普通新闻
	    $news = $db ->where(array('istop'=>2))->order('time DESC')->limit(3)->select();
	    $this->assign('news',$news);
    }

    public function rightnews(){
	    $db = M('News');
	    $field = 'nid,title,time,istop';
	    //最新新闻
	    $topnews = $db ->where(array('istop'=>1))->field($field)->order('time DESC')->limit(10)->select();
	    $this->assign('topnews',$topnews);
	    //热点新闻
	    $newnews = $db ->where(array('istop'=>2))->field($field)->order('click')->limit(10)->select();
	    $this->assign('newnews',$newnews);
    }

    /**
	 * 视频模块
	 */
    public function video(){
	    $db = M('Video');
	    //置顶新闻
	    $topvideo = $db ->where(array('istop'=>1))->order('time DESC')->limit(6)->select();
	    $this->assign('topvideo',$topvideo);
	    //普通新闻
	    $video = $db ->where(array('istop'=>2))->order('time DESC')->limit(10)->select();
	    $this->assign('video',$video);
    }
    public function rightvideo(){
	    $db = M('Video');
	    $field = 'void,title,time,istop';
	    //最新新闻
	    $topvideo = $db ->where(array('istop'=>1))->field($field)->order('time DESC')->limit(10)->select();
	    $this->assign('topvideo',$topvideo);
	    //热点新闻
	    $newvideo = $db ->where(array('istop'=>2))->field($field)->order('click')->limit(10)->select();
	    $this->assign('newvideo',$newvideo);
    }
    /**
	 * 演员模块
	 */
    public function artist(){
	    $db = M('Artist');
	    $artist = $db ->order('sort DESC')->select();
	    $this->assign('artist',$artist);
    }

    /**
	 * 活动模块
	 */
    public function works(){
	    $db = M('Works');
	    //置顶新闻
	    $works = $db ->where(array('wrid'=>array('neq'=>0)))->order('time DESC')->limit(10)->select();
	    $this->assign('works',$works);
    }
    public function rightworks(){
	    $db = M('Works');
	    $field = 'wrid,title,time,click';
	    //最新新闻
	    $topworks = $db ->field($field)->order('time DESC')->limit(10)->select();
	    $this->assign('topworks',$topworks);
	    //热点新闻
	    $newworks = $db ->field($field)->order('click')->limit(10)->select();
	    $this->assign('newworks',$newworks);
    }
    /**
	 * 文章模块
	 */
    public function article(){
	    $db = M('Article');
	    //置顶文章
	    $article = $db ->where(array('arid'=>array('neq'=>0)))->order('time DESC')->limit(10)->select();
	    
	    $this->assign('article',$article);
    }
    public function rightarticle(){
	    $db = M('Article');
	    $field = 'arid,title,author,time,click';
	    //最新文章
	    $toparticle = $db ->field($field)->order('time DESC')->limit(10)->select();
	    $this->assign('toparticle',$toparticle);
	    //热点文章
	    $newarticle = $db ->field($field)->order('click')->limit(10)->select();
	    $this->assign('newarticle',$newarticle);
    }    
    /**
	 * 下载模块
	 */
    public function music(){
	    $db = M('Music');
	    //置顶新闻
	    $music = $db ->where(array('muid'=>array('neq'=>0)))->order('time DESC')->limit(10)->select();
	    $this->assign('music',$music);
    }
    public function rightmusic(){
	    $db = M('music');
	    $field = 'muid,title,time,click';
	    //最新新闻
	    $topmusic = $db ->field($field)->order('time DESC')->limit(10)->select();
	    $this->assign('topmusic',$topmusic);
	    //热点新闻
	    $newmusic = $db ->field($field)->order('click')->limit(10)->select();
	    $this->assign('newmusic',$newmusic);
    }
    /**
	 * 图片模块
	 */
    public function piclist(){
	    $db = M('Pic');
	    //图片
	    $pic = $db ->where(array('pcid'=>array('neq'=>0)))->order('time DESC')->limit(10)->select();
	    $this->assign('pic',$pic);
    }

    public function rightpic(){
	    $db = M('Pic');
	    $field = 'pcid,title,time,click';
	    //最新新闻
	    $toppic = $db ->field($field)->order('time DESC')->limit(10)->select();
	    $this->assign('toppic',$toppic);
	    //热点新闻
	    $newpic = $db ->field($field)->order('click')->limit(10)->select();
	    $this->assign('newpic',$newpic);
    }

}
