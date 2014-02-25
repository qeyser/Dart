jQuery.easing.jswing=jQuery.easing.swing;jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(e,f,a,h,g){return jQuery.easing[jQuery.easing.def](e,f,a,h,g)},easeInQuad:function(e,f,a,h,g){return h*(f/=g)*f+a},easeOutQuad:function(e,f,a,h,g){return -h*(f/=g)*(f-2)+a},easeInOutQuad:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f+a}return -h/2*((--f)*(f-2)-1)+a},easeInCubic:function(e,f,a,h,g){return h*(f/=g)*f*f+a},easeOutCubic:function(e,f,a,h,g){return h*((f=f/g-1)*f*f+1)+a},easeInOutCubic:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f+a}return h/2*((f-=2)*f*f+2)+a},easeInQuart:function(e,f,a,h,g){return h*(f/=g)*f*f*f+a},easeOutQuart:function(e,f,a,h,g){return -h*((f=f/g-1)*f*f*f-1)+a},easeInOutQuart:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f+a}return -h/2*((f-=2)*f*f*f-2)+a},easeInQuint:function(e,f,a,h,g){return h*(f/=g)*f*f*f*f+a},easeOutQuint:function(e,f,a,h,g){return h*((f=f/g-1)*f*f*f*f+1)+a},easeInOutQuint:function(e,f,a,h,g){if((f/=g/2)<1){return h/2*f*f*f*f*f+a}return h/2*((f-=2)*f*f*f*f+2)+a},easeInSine:function(e,f,a,h,g){return -h*Math.cos(f/g*(Math.PI/2))+h+a},easeOutSine:function(e,f,a,h,g){return h*Math.sin(f/g*(Math.PI/2))+a},easeInOutSine:function(e,f,a,h,g){return -h/2*(Math.cos(Math.PI*f/g)-1)+a},easeInExpo:function(e,f,a,h,g){return(f==0)?a:h*Math.pow(2,10*(f/g-1))+a},easeOutExpo:function(e,f,a,h,g){return(f==g)?a+h:h*(-Math.pow(2,-10*f/g)+1)+a},easeInOutExpo:function(e,f,a,h,g){if(f==0){return a}if(f==g){return a+h}if((f/=g/2)<1){return h/2*Math.pow(2,10*(f-1))+a}return h/2*(-Math.pow(2,-10*--f)+2)+a},easeInCirc:function(e,f,a,h,g){return -h*(Math.sqrt(1-(f/=g)*f)-1)+a},easeOutCirc:function(e,f,a,h,g){return h*Math.sqrt(1-(f=f/g-1)*f)+a},easeInOutCirc:function(e,f,a,h,g){if((f/=g/2)<1){return -h/2*(Math.sqrt(1-f*f)-1)+a}return h/2*(Math.sqrt(1-(f-=2)*f)+1)+a},easeInElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return -(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e},easeOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k)==1){return e+l}if(!j){j=k*0.3}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}return g*Math.pow(2,-10*h)*Math.sin((h*k-i)*(2*Math.PI)/j)+l+e},easeInOutElastic:function(f,h,e,l,k){var i=1.70158;var j=0;var g=l;if(h==0){return e}if((h/=k/2)==2){return e+l}if(!j){j=k*(0.3*1.5)}if(g<Math.abs(l)){g=l;var i=j/4}else{var i=j/(2*Math.PI)*Math.asin(l/g)}if(h<1){return -0.5*(g*Math.pow(2,10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j))+e}return g*Math.pow(2,-10*(h-=1))*Math.sin((h*k-i)*(2*Math.PI)/j)*0.5+l+e},easeInBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*(f/=h)*f*((g+1)*f-g)+a},easeOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}return i*((f=f/h-1)*f*((g+1)*f+g)+1)+a},easeInOutBack:function(e,f,a,i,h,g){if(g==undefined){g=1.70158}if((f/=h/2)<1){return i/2*(f*f*(((g*=(1.525))+1)*f-g))+a}return i/2*((f-=2)*f*(((g*=(1.525))+1)*f+g)+2)+a},easeInBounce:function(e,f,a,h,g){return h-jQuery.easing.easeOutBounce(e,g-f,0,h,g)+a},easeOutBounce:function(e,f,a,h,g){if((f/=g)<(1/2.75)){return h*(7.5625*f*f)+a}else{if(f<(2/2.75)){return h*(7.5625*(f-=(1.5/2.75))*f+0.75)+a}else{if(f<(2.5/2.75)){return h*(7.5625*(f-=(2.25/2.75))*f+0.9375)+a}else{return h*(7.5625*(f-=(2.625/2.75))*f+0.984375)+a}}}},easeInOutBounce:function(e,f,a,h,g){if(f<g/2){return jQuery.easing.easeInBounce(e,f*2,0,h,g)*0.5+a}return jQuery.easing.easeOutBounce(e,f*2-g,0,h,g)*0.5+h*0.5+a}});
(function(c,b,a,e){var d=c(b);c.fn.lazyload=function(f){var h=this;var i;var g={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:b,data_attribute:"original",skip_invisible:true,appear:null,load:null};function j(){var k=0;h.each(function(){var l=c(this);if(g.skip_invisible&&!l.is(":visible")){return}if(c.abovethetop(this,g)||c.leftofbegin(this,g)){}else{if(!c.belowthefold(this,g)&&!c.rightoffold(this,g)){l.trigger("appear");k=0}else{if(++k>g.failure_limit){return false}}}})}if(f){if(e!==f.failurelimit){f.failure_limit=f.failurelimit;delete f.failurelimit}if(e!==f.effectspeed){f.effect_speed=f.effectspeed;delete f.effectspeed}c.extend(g,f)}i=(g.container===e||g.container===b)?d:c(g.container);if(0===g.event.indexOf("scroll")){i.bind(g.event,function(k){return j()})}this.each(function(){var k=this;var l=c(k);k.loaded=false;l.one("appear",function(){if(!this.loaded){if(g.appear){var m=h.length;g.appear.call(k,m,g)}c("<img />").bind("load",function(){l.hide().attr("src",l.data(g.data_attribute))[g.effect](g.effect_speed);k.loaded=true;var n=c.grep(h,function(p){return !p.loaded});h=c(n);if(g.load){var o=h.length;g.load.call(k,o,g)}}).attr("src",l.data(g.data_attribute))}});if(0!==g.event.indexOf("scroll")){l.bind(g.event,function(m){if(!k.loaded){l.trigger("appear")}})}});d.bind("resize",function(k){j()});if((/iphone|ipod|ipad.*os 5/gi).test(navigator.appVersion)){d.bind("pageshow",function(k){if(k.originalEvent.persisted){h.each(function(){c(this).trigger("appear")})}})}c(b).load(function(){j()});return this};c.belowthefold=function(g,h){var f;if(h.container===e||h.container===b){f=d.height()+d.scrollTop()}else{f=c(h.container).offset().top+c(h.container).height()}return f<=c(g).offset().top-h.threshold};c.rightoffold=function(g,h){var f;if(h.container===e||h.container===b){f=d.width()+d.scrollLeft()}else{f=c(h.container).offset().left+c(h.container).width()}return f<=c(g).offset().left-h.threshold};c.abovethetop=function(g,h){var f;if(h.container===e||h.container===b){f=d.scrollTop()}else{f=c(h.container).offset().top}return f>=c(g).offset().top+h.threshold+c(g).height()};c.leftofbegin=function(g,h){var f;if(h.container===e||h.container===b){f=d.scrollLeft()}else{f=c(h.container).offset().left}return f>=c(g).offset().left+h.threshold+c(g).width()};c.inviewport=function(f,g){return !c.rightoffold(f,g)&&!c.leftofbegin(f,g)&&!c.belowthefold(f,g)&&!c.abovethetop(f,g)};c.extend(c.expr[":"],{"below-the-fold":function(f){return c.belowthefold(f,{threshold:0})},"above-the-top":function(f){return !c.belowthefold(f,{threshold:0})},"right-of-screen":function(f){return c.rightoffold(f,{threshold:0})},"left-of-screen":function(f){return !c.rightoffold(f,{threshold:0})},"in-viewport":function(f){return c.inviewport(f,{threshold:0})},"above-the-fold":function(f){return !c.belowthefold(f,{threshold:0})},"right-of-fold":function(f){return c.rightoffold(f,{threshold:0})},"left-of-fold":function(f){return !c.rightoffold(f,{threshold:0})}})})(jQuery,window,document);