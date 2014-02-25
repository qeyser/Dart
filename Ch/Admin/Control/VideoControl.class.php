<?php
//视频控制器类
class VideoControl extends CommonControl{

    public function index(){
    	$total = M('Video')->count();
		$page = new page($total, 10, 4, 2);
		$video = M('Video')->order('time DESC')->select($page->limit());
    	$this->assign('video',$video);
    	$this->assign('page', $page->show());
        $this->display();
    }

    public function add(){
    	if(IS_POST){
			$upload = new upload();
			$info = $upload->upload();
			if($info){
				$thumb =  $info[0]['path'];
			}
			$data = array(
				'title'	=>  Q('title'),
				'thumb'	=> isset($thumb) ? $thumb : '',
				'content'=> Q('content'),
				'click'	=>  Q('click',NULL,'intval'),
				'istop'	=>  Q('istop',2,'intval'),
				'time'	=>  time(),
				); 
			M('Video')->add($data);
			$this->success('添加成功！','index');
		}else{
			$this->display();
		}
    }

    public function edit(){
    	if(IS_POST){
			$data = array(
				'title'	=>  Q('title'),
				'content'=> Q('content'),
				'click'	=>  Q('click',NULL,'intval'),
				'istop'	=>  Q('istop',2,'intval'),
				'time'	=>  time(),
				);
			$void = Q('post.void',NULL,'intval');
			M('Video')->where(array('void'=>$void))->save($data);
			$this->success('编辑成功！','index');
		}else{
			$void = Q('void',NULL,'intval');
			$video = M('Video')->where(array('void'=>$void))->find();
			$this->assign('video',$video);
			$this->display();
		}    	
    }

    public function del(){
    	$db = M('Video');
    	$video= $db->where(array('void'=>$_GET['void']))->find();
    	$img = $video['thumb'];
    	$vdo = $video['content'];
    	$db->where(array('void'=>$_GET['void']))->delete();
    	if(!empty($img)){unlink($img); unlink($vdo);}
    	$this->success('删除成功！','index');
    }
}
