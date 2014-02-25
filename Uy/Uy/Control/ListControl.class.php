<?php
//列表控制器类
class ListControl extends CommonControl{
    public function news(){
    	$ndb = M('News');
    	$field = 'nid,title,click,time';
		$count = $ndb->count();
		$page = new page($count, 6, 5, 2);
		$news = $ndb->field($field)->select($page->limit());
		$this->assign('news', $news);
		$this->assign('page', $page->show());
		$this->rightnews();
        $this->display();
    }

    public function article(){
    	$ndb = M('Article');
    	$field = 'arid,title,click,time';
		$count = $ndb->count();
		$page = new page($count, 6, 5, 2);
		$article = $ndb->field($field)->select($page->limit());
		$this->assign('article', $article);
		$this->assign('page', $page->show());
		$this->rightarticle();
        $this->display();
    }

    public function works(){
    	$ndb = M('Works');
    	$field = 'wrid,title,click,time';
		$count = $ndb->count();
		$page = new page($count, 6, 5, 2);
		$works = $ndb->field($field)->select($page->limit());
		$this->assign('works', $works);
		$this->assign('page', $page->show());
		$this->rightworks();
        $this->display();
    }

    public function artist(){
    	$ardb = M('Artist');
    	$field = 'arid,name,sort,content,thumb';
		$count = $ardb->count();
		$page = new page($count, 60, 5, 2);
		$artist = $ardb->field($field)->select($page->limit());
		$this->assign('artist', $artist);
		$this->assign('page', $page->show());
        $this->display();
    }

    public function creation(){
    	$crdb = M('Creation');
    	$field = 'crid,title,sort,content,thumb';
		$count = $crdb->count();
		$page = new page($count, 60, 5, 2);
		$creation = $crdb->field($field)->select($page->limit());
		$this->assign('creation', $creation);
		$this->assign('page', $page->show());
        $this->display();
    }

    public function video(){
    	$vodb = M('Video');
    	$field = 'void,title,click,content,thumb';
		$count = $vodb->count();
		$page = new page($count, 60, 5, 2);
		$video = $vodb->field($field)->select($page->limit());
		$this->assign('video', $video);
		$this->assign('page', $page->show());
        $this->display();
    }

    public function music(){
    	$mudb = M('Music');
    	$field = 'muid,title,url,click,time,thumb';
		$count = $mudb->count();
		$page = new page($count, 9, 5, 2);
		$music = $mudb->field($field)->select($page->limit());
		$this->assign('music', $music);
		$this->assign('page', $page->show());
        $this->display();
    }

    public function pic(){
    	$vodb = M('Pic');
    	$field = 'pcid,title,click,content,time,istop';
		$count = $vodb->count();
		$page = new page($count, 60, 5, 2);
		$pic = $vodb->field($field)->select($page->limit());
		
		$this->assign('pic', $pic);
		$this->assign('page', $page->show());
        $this->display();
    }
}
?>