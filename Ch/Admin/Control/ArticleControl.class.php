<?php
//演员控制器类
class ArticleControl extends CommonControl{

    public function index(){
    	$total = M('Article')->count();
		$page = new page($total, 10, 4, 2);
		$article = M('Article')->order('time DESC')->select($page->limit());
    	$this->assign('article',$article);
    	$this->assign('page', $page->show());
        $this->display();
    }

    public function add(){
    	if(IS_POST){
			$data = array(
				'title'	=> Q('name'),
				'author'=> Q('author'),
				'content'=>Q('content'),
				'click'	=> Q('click',NULL,'intval'),
				'time'	=> time(),
				); 
			M('Article')->add($data);
			$this->success('添加文章成功！','index');
		}else{
			$this->display();
		}
    }

    public function edit(){
    	if(IS_POST){
			$data = array(
				'title'	=> Q('name'),
				'author'=> Q('author'),
				'content'=>Q('content'),
				'click'	=> Q('click'),
				'time'	=> time(),
				);
			$arid = Q('post.arid',NULL,'intval');
			M('Article')->where(array('arid'=>$arid))->save($data);
			$this->success('编辑成功！','index');
		}else{
			$arid = Q('get.arid',NULL,'intval');
			$article = M('Article')->where(array('arid'=>$arid))->find();
			$this->assign('article',$article);
			$this->display();
		}    	
    }

    public function del(){
    	$db = M('Article');
    	$db->where(array('arid'=>$_GET['arid']))->delete();
    	$this->success('删除成功！','index');
    }

}
