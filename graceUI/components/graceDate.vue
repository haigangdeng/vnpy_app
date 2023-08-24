<template name="graceDate">
	<view class="grace-date"
	:style="{top:top, zIndex:zIndex, left:realshow?'0':'-2000px'}" @tap.stop="stopfun" @touchmove.stop.prevent="stopfun">
		<view class="grace-date-header">
			<text class="grace-date-header-btn grace-icons" @click="prevYear">&#xe600;&#xe600;</text>
			<text class="grace-date-header-btn grace-icons" @click="prevMonth">&#xe600;</text>
			<text class="grace-date-header-date grace-icons">{{cYear}} 年 {{cMonth}} 月</text>
			<text class="grace-date-header-btn grace-icons" @click="nextMonth">&#xe601;</text>
			<text class="grace-date-header-btn grace-icons" @click="nextYear">&#xe601;&#xe601;</text>
		</view>
		<view class="grace-date-week">
			<text class="grace-date-weeks" v-for="(item, index) in weeks" :key="index">{{item}}</text>
		</view>
		<view class="grace-date-days">
			<view :class="['grace-date-ditems', currentDayIn == cYear+'-'+cMonthStr+'-'+ item.date ? 'grace-d-current' : '']" 
			:style="{background: currentDayIn == cYear+'-'+cMonthStr+'-'+ item.date ? activeBgColor : bgColor, borderRadius:borderRadius}" 
			@click="chooseDate(cYear+'-'+cMonthStr+'-'+item.date, item.date)" v-for="(item, index) in days" :key="index">
				<text class="grace-date-day" :class="[currentDayIn == (cYear+'-'+cMonthStr+'-'+item.date) ? 'grace-d-current-txt' : '']">{{item.date}}</text>
				<text class="grace-date-nl" v-if="isLunar" :class="[currentDayIn == (cYear+'-'+cMonthStr+'-'+item.date) ? 'grace-d-current-txt' : '']">{{item.nl}}</text>
			</view>
		</view>
		<view class="grace-nowrap grace-flex-center" style="margin-top:50rpx;" v-if="isTime">
			<picker class="grace-date-time" mode="time" @change="timechange" :value="currentTimeIn">
				<text>时间 : {{currentTimeIn}}</text>
			</picker>
		</view>
		<view class="grace-date-btns" v-if="isTime">
			<text class="grace-date-btns-text" @click="close" style="color:#888888;">关闭</text>
			<text class="grace-date-btns-text" @click="submit">确定</text>
		</view>
	</view>
</template>
<script>
var CalendarData = new Array(100);
var madd = new Array(12);
var tgString = "甲乙丙丁戊己庚辛壬癸";
var dzString = "子丑寅卯辰巳午未申酉戌亥";
var numString = "一二三四五六七八九十";
var monString = "正二三四五六七八九十冬腊";
var weekString = "日一二三四五六";
var sx = "鼠牛虎兔龙蛇马羊猴鸡狗猪";
var cYear, cMonth, cDay, TheDate;
CalendarData = new Array(0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95);
madd[0] = 0;
madd[1] = 31;
madd[2] = 59;
madd[3] = 90;
madd[4] = 120;
madd[5] = 151;
madd[6] = 181;
madd[7] = 212;
madd[8] = 243;
madd[9] = 273;
madd[10] = 304;
madd[11] = 334;
function GetBit(m, n){return (m >> n) & 1;}
//农历转换
function e2c() {
	TheDate = (arguments.length != 3) ? new Date() : new Date(arguments[0], arguments[1], arguments[2]);
	var total, m, n, k;
	var isEnd = false;
	var tmp = TheDate.getYear();
	if (tmp < 1900) {tmp += 1900;}
	total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + madd[TheDate.getMonth()] + TheDate.getDate() - 38;
	if (TheDate.getYear() % 4 == 0 && TheDate.getMonth() > 1) {total++;}
	for (m = 0; ; m++) {
		k = (CalendarData[m] < 0xfff) ? 11 : 12;
		for (n = k; n >= 0; n--) {
			if (total <= 29 + GetBit(CalendarData[m], n)) {isEnd = true; break;}
			total = total - 29 - GetBit(CalendarData[m], n);
		}
		if (isEnd) break;
	}
	cYear = 1921 + m;
	cMonth = k - n + 1;
	cDay = total;
	if (k == 12) {
		if (cMonth == Math.floor(CalendarData[m] / 0x10000) + 1) {cMonth = 1 - cMonth;}
		if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) {cMonth--;}
	}
}
function GetcDateString() {
	var tmp = "";
	tmp += (cDay < 11) ? "初" : ((cDay < 20) ? "十" : ((cDay < 30) ? "廿" : "三十"));
	if (cDay % 10 != 0 || cDay == 10) {tmp += numString.charAt((cDay - 1) % 10);}
	return tmp;
}
function GetLunarDay(solarYear, solarMonth, solarDay) {
	if (solarYear < 1921) {return "";}
	solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11;
	e2c(solarYear, solarMonth, solarDay);
	return GetcDateString();
}
export default {
	name: "graceCountd",
	props: {
		show        : {type:Boolean, default:false },
		currentDate : {type:String, default:"" },
		isTime      : {type:Boolean, default:true },
		top : {
			type : String,
			// #ifdef H5
			default : '44px'
			// #endif
			// #ifndef H5
			default : '0'
			// #endif
		},
		zIndex        : {type:String, default:"1"},
		bgColor       : {type:String, default:"#F6F7F8"},
		activeBgColor : {type:String, default:"#3688FF"},
		borderRadius  : {type:String, default:"6rpx"},
		isLunar       : {type:Boolean, default:true }
	},
	created:function(){
		this.initTime();
		this.realshow = this.show;
	},
	watch:{
		currentDate  : function(){this.initTime();},
		show         : function(val){
			if(val){this.open();}else{this.hide();}
		}
	},
	data(){
		return {
			weeks         : ['一', '二', '三', '四', '五', '六', '日'],
			cYear         : 2016,
			cMonth        : 6,
			cMonthStr     : "06",
			cDay          : "01",
			days          : '',
			currentDayIn  : '',
			currentTimeIn : '',
			realshow      : false
		}
	},
	methods: {
		stopfun : function(){},
		timechange : function(e){
			this.currentTimeIn = e.detail.value;
		},
		getDaysInOneMonth : function (){
			var d = new Date(this.cYear, this.cMonth, 0);
			return d.getDate();
		},
		getDay : function (){
			var d = new Date(this.cYear, this.cMonth - 1, 0);
			return d.getDay();
		},
		prevYear : function(){
			this.cYear = this.cYear - 1;
			this.changeMonth();
		},
		prevMonth : function(){
			this.cMonth =  this.cMonth - 1;
			if (this.cMonth < 1) { this.cMonth = 12; this.cYear = this.cYear - 1; }
			this.cMonthStr = this.cMonth < 10 ? '0' + this.cMonth : this.cMonth;
			this.changeMonth();
		},
		nextMonth : function(){
			this.cMonth = this.cMonth + 1;
			if (this.cMonth > 12){this.cMonth = 1; this.cYear = this.cYear + 1;}
			this.cMonthStr = this.cMonth < 10 ? '0' + this.cMonth : this.cMonth;
			this.changeMonth();
		},
		nextYear : function(){
			this.cYear = this.cYear + 1;
			this.changeMonth();
		},
		changeMonth:function(){
			var daysList  = [];
			var days      = this.getDaysInOneMonth();
			var startWeek = this.getDay();
			var forSteps  = 0;
			for (var i = (0 - startWeek); i < days; i++){
				if(i >= 0){
					daysList[forSteps] = {date : i >= 9 ? i + 1 : '0' + (i+1), nl : ''};
					daysList[forSteps].nl = GetLunarDay(this.cYear, this.cMonth, i + 1);
				}else{
					daysList[forSteps] = '';
				}
				forSteps++;
			}
			this.days    = daysList;
		},
		chooseDate: function (sedDate, isday) {
			if(!isday){return ;}
			this.currentDayIn = sedDate;
			if(this.isTime){return ;}
			this.$emit('changeDate', sedDate);
		},
		submit : function(){
			if(this.isTime){
				this.$emit('changeDate', this.currentDayIn+' '+this.currentTimeIn);
			}else{
				this.$emit('changeDate', this.currentDayIn);
			}
		},
		close : function(){
			this.$emit("closeDate");
		},
		//初始化时间
		initTime : function(){
			if(this.currentDate == ''){
				var dateObj        = new Date();
				this.cYear         = dateObj.getFullYear();
				this.cMonth        = dateObj.getMonth() + 1;
				this.cMonthStr     = this.cMonth < 10 ? '0' + this.cMonth : this.cMonth;
				this.cDay          = dateObj.getDate();
				this.cDay          = this.cDay < 10 ? '0' + this.cDay : this.cDay;
				this.currentDayIn  = this.cYear + '-' + this.cMonthStr + '-' + this.cDay;
				this.currentTimeIn = '00:00';
				this.changeMonth();
			}else{
				var dates          = this.currentDate.split(' ');
				if (!dates[1]) { dates[1] = '';}
				var dayArr         = dates[0].split('-');
				this.cYear         = Number(dayArr[0]);
				this.cMonth        = dayArr[1];
				this.cDay          = dayArr[2];
				var reg            = new RegExp('^0[0-9]+$');
				if(reg.test(this.cMonth)){this.cMonth = this.cMonth.substr(1,1);}
				this.cMonth        = Number(this.cMonth);
				this.cMonthStr     = this.cMonth < 10 ? '0'+this.cMonth : this.cMonth;
				this.currentDayIn  = dates[0];
				this.currentTimeIn = dates[1];
				this.changeMonth();
			}
		},
		open:function(){this.realshow = true;},
		hide:function(){this.realshow = false;}
	}
}
</script>
<style scoped>
.grace-date{position:fixed; z-index:1; left:-2000px; top:0; bottom:0px; width:730rpx; padding:0 10rpx; display:flex; flex-direction:column; align-items:center; background:#FFFFFF; overflow:hidden;}
.grace-date-header{display:flex; justify-content:center; flex-direction:row; text-align:center; margin-top:20rpx;}
.grace-date-header-btn{font-size:36rpx; line-height:88rpx; padding:0 10rpx; color:#888888;}
.grace-date-header-date{line-height:88rpx; font-size:36rpx; margin:0 20rpx;}
.grace-date-week{text-align:center; width:702rpx; display:flex; flex-wrap:nowrap; flex-direction:row;}
.grace-date-weeks{display:block; width:100rpx; height:80rpx; text-align:center; font-size:32rpx; line-height:80rpx; color:#666666;}
.grace-date-days{width:702rpx; display:flex; flex-direction:row; flex-wrap:wrap;}
.grace-date-ditems{width:96rpx; height:96rpx; display:flex; flex-direction:column; align-items:center; justify-content:center; margin:2rpx; background-color:#F6F7F8; border-radius:5rpx;}
.grace-d-current{background-color:#3688FF;}
.grace-d-current-txt{color:#FFFFFF !important;}
.grace-date-day{display:block; width:100%; height:38rpx; line-height:38rpx; text-align:center; font-size:32rpx;}
.grace-date-nl{display:block; width:100%; height:26rpx; line-height:26rpx; color:#888888; font-size:20rpx; text-align:center;}
.grace-date-btns{display:flex; flex-wrap:nowrap; flex-direction:row; justify-content:space-between; position:absolute; z-index:1; left:0; bottom:20px; width:100%;}
.grace-date-btns-text{display:block; color:#3688FF; line-height:100rpx; font-size:30rpx; text-align:center; width:300rpx;}
.grace-date-time{font-size:30rpx; line-height:100rpx; color:#666666; border-top:1px solid #F6F6F6; border-bottom:1px solid #F6F6F6; padding:0 20rpx;}
</style>