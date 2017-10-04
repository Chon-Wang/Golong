function getVerifyCode(options) {
	return function() {
		clearInterval(timer);
		if(!(options && Object.prototype.toString.call(options.callBack) == "[object Function]")) {
			throw new Error("必须传递参数及回调函数");
		}
		var that = $(this);
		if(options.isPhone){
			var phone = options.getPhone(),
				reg = options.phoneReg || /^1[3|4|5|7|8][0-9]\d{8}$/;
			if(!reg.test(phone)) {
				//如果手机号码不正确，则执行手机号码对应的回调函数
				options.phoneCallBack && options.phoneCallBack.call(that,phone);
				return;
			}
		}
		
		var timer = null,
			time = options.time || 60,
			unabledClass = options.unabledClass || "",
			timeIsUpText = options.timeIsUpText || "重新获取",
			timeRunnigText = options.timeRunnigText || " s后重新获取";
		that.off("click");
		that.addClass(unabledClass);
		timer = setInterval(function() {
			//避免重复发送
			if(time <= 0) {
				clearInterval(timer);
				/*time = 60;*/
				that.html(timeIsUpText).removeClass(unabledClass);
				that.on("click", getVerifyCode(options));
			} else {
				time--;
				that.html(time + timeRunnigText);
				//在外部可以获取到倒计时当前时间
				if(options.getCurrentTime && (Object.prototype.toString.call(options.getCurrentTime) == "[object Function]")){
					options.getCurrentTime.call(that,time);
				}
			}
		}, 1000);
		//执行回调函数
		options.callBack.call(that);
	}
}






	$(function (){
			
			
			
			

			//获取普通验证码
			$("#j_timekeeping").on("click",getVerifyCode({
				callBack: function (){
					console.log(this);
					alert("验证码发送成功");
				},
				getPhone:function () {
					return $('#pass').val()
				},
				isPhone:true,

				time: 60,//定时时间，以秒为单位
				unabledClass: "unlabed"//按钮不能用的样式，即点击按钮后的样式
			}));



			$("#j_timekeeping2").on("click",getVerifyCode({
				callBack: function (){//按钮点击后的回调函数，-----必须-----
					//在这里你还是可以对你的按钮进行操作
					console.log(this);
					alert("验证码发送成功");
				},
				time: 60,//定时时间，以秒为单位
				unabledClass: "unlabed"//按钮不能用的样式，即点击按钮后的样式
			}));




		});


