<?php
//演员控制器类
class PicControl extends CommonControl{

    public function index(){
    	$total = M('Pic')->count();
		$page = new page($total, 10, 4, 2);
		$pic = M('Pic')->order('time DESC')->select($page->limit());
    	$this->assign('pic',$pic);
    	$this->assign('page', $page->show());
        $this->display();
    }

    public function add(){
    	if(IS_POST){
			$data = array(
				'title'	=>  Q('name'),
				'content'=> Q('content'),
				'click'	=>  Q('click',NULL,'intval'),
				'time'	=>  time(),
				);

			M('Pic')->add($data);
			$this->success('添加成功！','index');
		}else{
			$this->display();
		}
    }

    public function edit(){
    	if(IS_POST){
			$data = array(
				'title'	=>  Q('name'),
				'content'=> Q('content'),
				'click'	=>  Q('click',NULL,'intval'),
				'time'	=>  time(),
				);
			$nid = Q('post.nid',NULL,'intval');
			M('Pic')->where(array('nid'=>$nid))->save($data);
			$this->success('编辑成功！','index');
		}else{
			$nid = Q('get.nid',NULL,'intval');
			$pic = M('Pic')->where(array('nid'=>$nid))->find();
			$this->assign('pic',$pic);
			$this->display();
		}    	
    }

    public function del(){
    	$db = M('Pic');
    	$arts= $db->where(array('nid'=>$_GET['nid']))->delete();
    	$this->success('删除成功！','index');
    }

}
