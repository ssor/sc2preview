
/*
 * GET home page.
 */
var $ = require('jquery');
var iconv = require('iconv-lite');
var BufferHelper = require('bufferhelper');
var http = require('http');

var testobj = {'name':'zhang', 'age':10};
var contests = [{index:0,'day':'星期一',contest:'测试赛事',contest_time:'测试时间'}];

function requestContestFrom163(callback){
    // var url = "http://localhost:3002/test";
    var url = "http://s.163.com/";
	var req = http.get(url,function(res){
        var buffer = new BufferHelper();
        res.on('data',function(data){
            buffer.concat(data);
        }).on('end',function(){
            var buf = buffer.toBuffer();
 
            var str = iconv.decode(buf,'gb2312');
            // var str = iconv.decode(buf,'utf8');
            contests = parse(str);
            callback();
        }).on('close',function(){
            console.log('Close recevied!');
        });
    });

	req.on('error',function(error){
        console.log('error.log',new Date().getTime()+' '
            +error+'\r\n','utf-8');
    });
}
function parse(html){
		var contests = [];
		var gameList = $(html).find("#games-list");
		var days = gameList.children('ul');
		for(var i = 0; i< days.length; i++){
			var day = days[i];
			var reports = day.children;
			for(var j= 0; j < reports.length; j++){
				var report = reports[j];
				var contest = $(report).find('.contest').text();
				var contest_time = $(report).find('.contest-time').text();
				if(contest_time.replace(/(^\s*)|(\s*$)/g, "") != "" && contest_time != "时间"){
					// var utf8Contest = iconv.decode(iconv.encode(contest, 'gb2312'), 'utf-8');
					// console.log('parsing ... => ' + utf8Contest);
					// contests[contests.length] = {'index':i, 'day': itoDay(i), 'contest':utf8Contest, 'contest_time':contest_time};
					contests[contests.length] = {'index':i, 'day': itoDay(i), 'contest':contest, 'contest_time':contest_time};
					// console.log((i+1) +' ' + contest_time + ' => ' + utf8Contest);
					console.log((i) +' ' + contest_time + ' => ' + contest);
				}
			}
		}
		return contests;
}
function itoDay(i){
	var day = '星期一';
	switch(i){
		case 1:
		day = '星期二' 
		break;
		case 2:
		day = '星期三' 
		break;
		case 3:
		day = '星期四' 
		break;
		case 4:
		day = '星期五' 
		break;
		case 5:
		day = '星期六' 
		break;
		case 6:
		day = '星期日' 
		break;
	}
	return day;
}
exports.ajax = function(req, res){
	res.json(testobj);
};
exports.testajax = function(req, res){
	res.render('testajax');
};
exports.ajaxContests = function(req, res){
	console.log('ajaxContests =>');
	res.json(contests);
}
exports.ajaxRefreshContests = function(req, res){
	requestContestFrom163(function(){
		res.json(contests);
	});
};

exports.index = function(req, res){

    // var url = "http://s.163.com/";
    // var url = "http://localhost:3002/test";
	// var req = http.get(url,function(_res){
 //        var buffer = new BufferHelper();
 //        _res.on('data',function(data){
 //            buffer.concat(data);
 //            console.log('receiving data ...');
 //        }).on('end',function(){
 //            var buf = buffer.toBuffer();
 
 //            var str = iconv.decode(buf,'gb2312');
 //            // var str = iconv.decode(buf,'utf-8');
 //            contests = parse(str);
 //            console.log('parse over ...');
 //            var strContests = JSON.stringify(contests);
 //          	// var gbBuffer = iconv.encode(strContests, 'gb2312');//第二个参数表示被转化的字符串使用的编码
 //          	// var utf8String = iconv.decode(gbBuffer, 'utf-8');
 //            console.log(strContests);
	// 		res.render('index', { title: '一周赛事预告', 
	// 							  contests: strContests,
	// 							  contestList: contests});

 //        }).on('close',function(){
 //            console.log('Close recevied!');
 //        });
 //    });

	// req.on('error',function(error){
 //        console.log('error.log',new Date().getTime()+' '
 //            +error+'\r\n','utf-8');
 //    });
    // console.log('render...');
  res.render('index', { title: '一周赛事预告'});
};

exports.test = function(req, res){
	res.render('test');
};