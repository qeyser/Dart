<?php
//演员控制器类
class NewsControl extends CommonControl{

    public function index(){
    	$total = M('News')->count();
		$page = new page($total, 10, 4, 2);
		$news = M('News')->order('time DESC')->select($page->limit());
    	$this->assign('news',$news);
    	$this->assign('page', $page->show());
        $this->display();
    }

    public function add(){
    	if(IS_POST){
			$upload = new upload();
			$info = $upload->upload();
			if($info){
				$thumb = $info[0]['path'];
			}
			// $intro = mb_substr(strip_tags($_POST['con']), 0, 100, 'UTF-8') . '.....';
			$data = array(
				'title'	=>  Q('name'),
				'thumb'	=> isset($thumb) ? $thumb : '',
				'content'=> Q('content'),
				'click'	=>  Q('click',NULL,'intval'),
				'istop'	=>  Q('istop',NULL,'intval'),
				'time'	=>  time(),
				); 
			M('News')->add($data);
			$this->success('添加新闻成功！','index');
		}else{
			$this->display();
		}
    }

    public function edit(){
    	if(IS_POST){
			$upload = new upload();
			$info = $upload->upload();
			if($info){
				$thumb = $info[0]['path'];
			}
			$data = array(
				'title'	=>  Q('name'),
				'thumb'	=> isset($thumb) ? $thumb : '',
				'content'=> Q('content'),
				'click'	=>  Q('click',NULL,'intval'),
				'istop'	=>  Q('istop',NULL,'intval'),
				'time'	=>  time(),
				);
			$nid = Q('post.nid',NULL,'intval');
			M('News')->where(array('nid'=>$nid))->save($data);
			$this->success('编辑成功！','index');
		}else{
			$nid = Q('get.nid',NULL,'intval');
			$news = M('News')->where(array('nid'=>$nid))->find();
			$this->assign('news',$news);
			$this->display();
		}    	
    }

    public function del(){
    	$db = M('News');
    	$arts= $db->where(array('nid'=>$_GET['nid']))->find();
    	$img = $arts['thumb'];
    	$db->where(array('nid'=>$_GET['nid']))->delete();
    	if(!empty($img)){unlink($img);}
    	$this->success('删除成功！','index');
    }

}
