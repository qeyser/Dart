<?php
/**
 * 登录控制器
 */
class LoginControl extends Control{
	/**
	 * 登录页显示
	 */
	public function index(){
		$this->display();
	}
	/**
	 * 验证码显示
	 */
	public function code(){
		$code = new code();
		$code->show();
	}

	/**
	 * 登录
	 */
	public function login(){
		$code = Q('code',NULL,'htmlspecialchars,strtoupper');
		if($code != session('code')) $this->error('验证码不正确');
		//判断用户名或者密码是否正确
		$username = Q('post.username');
		$passwd = Q('post.passwd', NULL,'md5');
		$user = M('admin')->where(array('username'=>$username))->field('passwd,adid')->find();
		if(!$user || $passwd != $user['passwd']) $this->error('用户名或者密码不正确');
		$_SESSION['adid'] = $user['adid'];
		$_SESSION['uname'] = $username;
		$this->success('登录成功,正在为您跳转...', __APP__);

	}
	
	/**
	 * 退出
	 */
	public function out(){
		session_unset();
		session_destroy();
		$this->success('退出成功');
	}
}