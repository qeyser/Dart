<?php
//演员控制器类
class ArtistControl extends Control{

    public function index(){
    	$total = M('Artist')->count();
		$page = new page($total, 10, 4, 2);
		$artist = M('Artist')->order('sort')->select($page->limit());
    	$this->assign('artist',$artist);
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
				'name'	=>  Q('name'),
				'thumb'	=> isset($thumb) ? $thumb : '',
				'content'=> Q('content'),
				'click'	=>  Q('click',NULL,'intval'),
				'sort'	=>  Q('sort',NULL,'intval'),
				'time'	=>  time(),
				); 
			M('Artist')->add($data);
			$this->success('添加成功！','index');
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
				'name'	=>  Q('name'),
				'content'=> Q('content'),
				'click'	=>  Q('click',NULL,'intval'),
				'sort'	=>  Q('sort',NULL,'intval'),
				'time'	=>  time(),
				);
			$arid = Q('arid',NULL,'intval');
			M('Artist')->where(array('arid'=>$arid))->save($data);
			$this->success('编辑成功！','index');
		}else{
			$arid = Q('post.arid',NULL,'intval');
			$artist = M('Artist')->where(array('arid'=>$arid))->find();
			$this->assign('artist',$artist);
			$this->display();
		}    	
    }

    public function del(){
    	$db = M('Artist');
    	$arts= $db->where(array('arid'=>$_GET['arid']))->find();
    	$img = $arts['thumb'];
    	$db->where(array('arid'=>$_GET['arid']))->delete();
    	if(!empty($img)){unlink($img);}
    	$this->success('删除成功！','index');
    }

}
