<?php
if (!defined("HDPHP_PATH"))exit('No direct script access allowed');
//更多配置请查看hdphp/Config/config.php
$arr = array(
    /********************************验证码********************************/
    "CODE_WIDTH"                    => 80,         //宽度
    "CODE_HEIGHT"                   => 25,          //高度
    "CODE_LEN"                      => 4,           //文字数量
    "CODE_FONT_SIZE"                => 16,          //字体大小
     /********************************文件上传********************************/
    "UPLOAD_THUMB_ON"               => 0,           //上传图片缩略图处理
    "UPLOAD_EXT_SIZE"               => array("jpg" => 5000000, "jpeg" => 5000000, "gif" => 5000000,
                                    "png" => 5000000, "bmp" => 5000000), //上传类型与大小
    "UPLOAD_PATH"                   => ROOT_PATH . "/upload", //上传路径
    "UPLOAD_IMG_DIR"                => "",       //图片上传目录名
    "UPLOAD_IMG_RESIZE_ON"          => 1,           //上传图片缩放处理,超过以下值系统进行缩放
    "UPLOAD_IMG_MAX_WIDTH"          => 300,     //上传图片超过此值，进行缩放
    "UPLOAD_IMG_MAX_HEIGHT"         => 210,     //上传图片超过此值，进行缩放
);
return array_merge(include "./Conf/CNdb.php", $arr);
?>