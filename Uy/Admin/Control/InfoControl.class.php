<?php
//信息控制器类
class InfoControl extends Control{

    public function jianjie(){
    	if(IS_POST){
    		$data = array(
				'title'	=>  Q('post.title'),
				'content'=> Q('post.content'),
				'time'	=> time(),
				);
			$inid = Q('inid',NULL,'intval');
			M('Info')->where(array('inid'=>$inid))->save($data);
			$this->success('修改成功！');
    	}else{
    		$jianjie = M('Info')->where(array('inid'=>1))->find();
    		$this->assign('jianjie', $jianjie);
    		$this->display();
    	}
        
    }

    public function lingdao(){
    	if(IS_POST){
    		$data = array(
				'title'	=>  Q('post.title'),
				'content'=> Q('post.content'),
				'time'	=> time(),
				);
			$inid = Q('inid',NULL,'intval');
			M('Info')->where(array('inid'=>$inid))->save($data);
			$this->success('修改成功！');
    	}else{
    		$lingdao = M('Info')->where(array('inid'=>2))->find();
    		$this->assign('lingdao', $lingdao);
    		$this->display();
    	}
    }

    public function lianxi(){
    	if(IS_POST){
    		$data = array(
				'title'	=>  Q('post.title'),
				'content'=> Q('post.content'),
				'time'	=> time(),
				);
			$inid = Q('inid',NULL,'intval');
			M('Info')->where(array('inid'=>$inid))->save($data);
			$this->success('修改成功！');
    	}else{
    		$lianxi = M('Info')->where(array('inid'=>3))->find();
    		$this->assign('lianxi', $lianxi);
    		$this->display();
    	}
    }
}
