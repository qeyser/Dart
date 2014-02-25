<?php
//测试控制器类
class IndexControl extends CommonControl{
    function index(){
    	$this->news();
    	$this->works();
    	$this->article();
    	$this->video();
    	$this->artist();
    	$this->music();
    	$this->piclist();
        $this->display();
    }
}
?>