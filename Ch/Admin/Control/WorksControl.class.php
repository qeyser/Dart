<?php
//演员控制器类
class WorksControl extends CommonControl{

    public function index(){
    	$total = M('Works')->count();
		$page = new page($total, 10, 4, 2);
		$works = M('Works')->order('time DESC')->select($page->limit());
    	$this->assign('works',$works);
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
			M('Works')->add($data);
			$this->success('添加新闻成功！','index');
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
			$wrid = Q('post.wrid',NULL,'intval');
			M('Works')->where(array('wrid'=>$wrid))->save($data);
			$this->success('编辑成功！','index');
		}else{
			$wrid = Q('get.wrid',NULL,'intval');
			$works = M('Works')->where(array('wrid'=>$wrid))->find();
			$this->assign('works',$works);
			$this->display();
		}    	
    }

    public function del(){
    	$db = M('Works');
    	$db->where(array('wrid'=>$_GET['wrid']))->delete();
    	$this->success('删除成功！','index');
    }

}
