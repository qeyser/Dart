<?php
//公共
class CommonControl extends Control{
	public function __init(){
		if(!isset($_SESSION['adid']) || !isset($_SESSION['uname']))
			go('Login/index');
	}

}