<template>
	<view class="grace-schedule-wrap">
		<view class="grace-schedule-header">
			<picker class="grace-flex-center grace-flex-vcenter" 
			mode="date" :value="currentDayIn" :start="startDate" :end="endDate" @change="selectDate">
				<text class="grace-schedule-header-date grace-icons">{{cYear}} 年 {{cMonthStr}} 月 &#xe603;</text>
			</picker>
			<text class="grace-schedule-today" @tap="gotoToday">返回今天</text>
		</view>
		<view class="grace-date-week">
			<text class="grace-date-weeks" v-for="(item, index) in weeks" :key="index">{{item}}</text>
		</view>
		<view class="grace-date-days">
			<block v-for="(item, index) in days" :key="index">
				<view class="grace-date-ditems"  v-if="item != ''" 
				:style="{backgroundColor:currentDayIn == cYear+'-'+cMonthStr+'-'+ item.date ? activeBgColor : bgColor}" 
				@click="chooseDate(cYear+'-'+cMonthStr+'-'+item.date, item.date)">
					<text class="grace-date-day" 
					:class="[currentDayIn == (cYear+'-'+cMonthStr+'-'+item.date) ? 'grace-d-current-txt' : '']">{{item.date}}</text>
					<text class="grace-date-nl" v-if="isLunar" 
					:class="[currentDayIn == (cYear+'-'+cMonthStr+'-'+item.date) ? 'grace-d-current-txt' : '']">{{item.nl}}</text>
					<view class="grace-schedule-point" v-if="item.haveSe" :style="{backgroundColor:pointColor}"></view>
				</view>
				<view class="grace-date-ditems" v-else style="background-color:none;"></view>
			</block>
		</view>
		<view class="grace-schedule-line"></view>
		<view class="grace-schedule-time-list-wrap">
			<view class="grace-schedule-time-list" v-for="(item, index) in hours" :key="index">
				<text class="grace-schedule-timer">{{item}}:00</text>
				<view class="grace-schedule-body">
					<text class="grace-schedules" v-for="(schedule, idx) in schedulesIn[index]" :key="idx" 
					@tap="scheduleTap" :data-id="schedule.id" 
					:style="{backgroundColor:schedule.bgColor, color:schedule.color}">{{schedule.content}}</text>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
export default{
	data() {
		return {
			cYear      : 2020,
			cMonth     : 1,
			cDay       : 10,
			cMonthStr  : '01',
			weeks      : ['一', '二', '三', '四', '五', '六', '日'],
			days       : [],
			currentDayIn : '',
			hours      : ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'],
			schedulesIn: [] 
		}
	},
	props:{
		// 当前默认日期
		currentDate   : {type:String, default:""},
		bgColor       : {type:String, default:"#F8F8F8"},
		activeBgColor : {type:String, default:"#3688FF"},
		isLunar       : {type:Boolean, default:true },
		startDate     : {type:String, default:'1950-01-01'},
		endDate       : {type:String, default:'2050-01-01'},
		schedules     : {type:Array, default:function () {return []}},
		pointColor    : {type:String, default:"#FF0036"}
	},
	created:function(){
		this.currentDayIn = this.currentDate;
		this.initTime();
		this.getSchedulesIn();
	},
	methods:{
		initTime : function(){
			if(this.currentDayIn == ''){
				var dateObj        = new Date();
				this.cYear         = Number(dateObj.getFullYear());
				this.cMonth        = Number(dateObj.getMonth() + 1);
				this.cMonthStr     = this.cMonth < 10 ? '0' + this.cMonth : this.cMonth;
				this.cDay          = dateObj.getDate();
				this.cDay          = this.cDay < 10 ? '0' + this.cDay : this.cDay;
				this.currentDayIn  = this.cYear + '-' + this.cMonthStr + '-' + this.cDay;
				this.changeMonth();
			}else{
				var dates          = this.currentDayIn.split(' ');
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
		changeMonth:function(){
			var daysList  = [];
			var days      = this.getDaysInOneMonth();
			var startWeek = this.getDay();
			var forSteps  = 0;
			for (var i = (0 - startWeek); i < days; i++){
				if(i >= 0){
					daysList[forSteps] = {date : i >= 9 ? i + 1 : '0' + (i+1), nl : ''};
					daysList[forSteps].nl = GetLunarDay(this.cYear, this.cMonth, i + 1);
					daysList[forSteps].haveSe = this.haveSchedule(daysList[forSteps].date);
				}else{
					daysList[forSteps] = '';
				}
				forSteps++;
			}
			this.days    = daysList;
		},
		haveSchedule : function (day) {
			var cDay = this.cYear+'-'+this.cMonthStr+'-'+day;
			for(let i = 0; i < this.schedules.length; i++){
				if(this.schedules[i].datetime.indexOf(cDay) != -1){
					return true;
				}
			}
			return false;
		},
		getDaysInOneMonth : function (){
			var d = new Date(this.cYear, this.cMonth, 0);
			return d.getDate();
		},
		getDay : function (){
			var d = new Date(this.cYear, this.cMonth - 1, 0);
			return d.getDay();
		},
		selectDate : function(e){
			this.currentDayIn = e.detail.value;
			this.initTime();
			this.getSchedulesIn();
			this.$emit('selectDate', e.detail.value);
		},
		chooseDate: function (sedDate) {
			this.currentDayIn = sedDate;
			this.getSchedulesIn();
			this.$emit('chooseDate', sedDate);
		},
		getSchedulesIn : function (){
			var res = [];
			for(let i = 0; i < this.hours.length; i++){
				var ctime = this.currentDayIn + ' ' + this.hours[i] + ':00';
				res.push([]);
				for(let ii = 0; ii < this.schedules.length; ii++){
					if(this.schedules[ii].datetime == ctime){
						res[i].push(this.schedules[ii]);
					}
				}
			}
			this.schedulesIn = res;
		},
		scheduleTap : function (e) {
			var id = e.currentTarget.dataset.id;
			this.$emit('scheduleTap', id);
		},
		gotoToday : function(){
			var dateObj        = new Date();
			this.cYear         = Number(dateObj.getFullYear());
			this.cMonth        = Number(dateObj.getMonth() + 1);
			this.cMonthStr     = this.cMonth < 10 ? '0' + this.cMonth : this.cMonth;
			this.cDay          = dateObj.getDate();
			this.cDay          = this.cDay < 10 ? '0' + this.cDay : this.cDay;
			this.currentDayIn  = this.cYear + '-' + this.cMonthStr + '-' + this.cDay;
			this.changeMonth();
			this.getSchedulesIn();
			this.$emit('gotoToday', this.currentDayIn);
		}
	}
}
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
</script>
<style scoped>
.grace-schedule-wrap{width:702rpx; margin-left:24rpx;}
.grace-schedule-header{flex-direction:row; justify-content:space-between; align-items:center;}
.grace-schedule-header-date{height:88rpx; line-height:88rpx; color:#323232; font-size:32rpx;}
.grace-date-week{width:702rpx; flex-wrap:nowrap; flex-direction:row; justify-content:center;}
.grace-date-weeks{width:100rpx; height:60rpx; font-size:26rpx; line-height:60rpx; color:#666666; text-align:center;}
.grace-date-days{width:702rpx; flex-direction:row; flex-wrap:wrap;}
.grace-date-ditems{width:80rpx; height:80rpx; flex-direction:column; align-items:center; justify-content:center; margin:10rpx; border-radius:80rpx;}
.grace-d-current-txt{color:#FFFFFF !important;}
.grace-date-day{height:38rpx; line-height:38rpx; text-align:center; font-size:28rpx;}
.grace-date-nl{height:26rpx; line-height:26rpx; color:#888888; font-size:20rpx; text-align:center;}
.grace-schedule-line{height:20rpx; border-style:solid; border-color:#F8F8F8; border-bottom-width:1px;}
.grace-schedule-time-list{margin-top:20rpx; flex-direction:row; flex-wrap:nowrap; align-items:flex-start;}
.grace-schedule-timer{width:100rpx; font-size:22rpx; color:#999999; line-height:36rpx;}
.grace-schedule-body{width:200rpx; flex:1; border-style:solid; border-color:#F8F8F8; border-top-width:1px; margin-top:15rpx;}
.grace-schedules{padding:10rpx; line-height:30rpx; font-size:22rpx; margin-top:15rpx; border-radius:8rpx;}
.grace-schedule-time-list-wrap{padding:20rpx;}
.grace-schedule-today{line-height:50rpx; height:50rpx; font-size:22rpx; color:#828282; padding-left:20rpx; padding-right:20rpx; margin-left:30rpx; border-radius:8rpx; border-width:1px; border-style:solid; border-color:#F1F2F3;}
.grace-schedule-point{width:18rpx; height:18rpx; border-radius:10rpx; background-color:#FF0036; position:absolute; right:5rpx; top:5rpx;}
</style>