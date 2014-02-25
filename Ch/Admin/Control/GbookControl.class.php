<?php
//留言控制器类
class GbookControl extends CommonControl{

    public function index(){
    	$total = M('Gbook')->count();
		$page = new page($total, 10, 4, 2);
		$gblist = M('Gbook')->order('time DESC')->select($page->limit());
    	$this->assign('gblist',$gblist);
    	$this->assign('page', $page->show());
        $this->display();
    }

    public function del(){
    	$gbid = $_GET['gbid'];
    	$gbook = M('Gbook')->where(array('gbid'=>$gbid))->delete();
    	if($gbook){
    		$this->success('删除成功！','index');
    	}else{
    		$this->error('删除失败');
    	}
    }

}
