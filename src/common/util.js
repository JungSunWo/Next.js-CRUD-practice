import {parse, format} from "date-fns"

const util ={
    null2void : function(v,r){
        if( v == undefined || v == "undefined"){
            v = "";
        }else {
            v = r;
        }

        return v;
    },
    isEmpty : function(val){
        return (val == undefined || val == null || val == "undefined" || val == "null" || util.null2void(String(val))?.replace(/ /g, "") == "");
    },
    isNull : function(val){
        if(val === null || val === undefined){
            return true;
        }

        return false;
    },
    toDateObject : function(strDateTime){
        let year    = strDateTime.substring(0,4);
        let month   = strDateTime.substring(4,6) -1;
        let day     = strDateTime.substring(6,8);
        let hour    = strDateTime.substring(8,10);
        let min     = strDateTime.substring(10,12);

        return new Date(year, month, day, hour,min );
    },
    trim : function(str){
        if(typeof str == "boolean"){
            return str;
        }else{
            if(util.null2void(str) == ""){
                return str;
            }else{
                return str.replace(/(^\s*)|(\s*$)/g,"");
            }
        }
    },
    date : function(str,strformat){ 
        let year    = str.substring(0,4);
        let month   = str.substring(4,6);
        let day     = str.substring(6,8); 

        return year+"-"+month+"-"+day;
    },
    dateFormat : function(str,strformat){
    //    const vDate = parse(str,"yyyyMMdd",new Date()); 
    //    let vformat = "yyyy-MM-dd";
    //    vformat = strformat !="undefined" ? strformat : vformat;
    //    return format(vDate,vformat);///
   },
    getDayOfWeek : function(str){
        let year    = str.substring(0,4);
        let month   = str.substring(4,6)-1;
        let day     = str.substring(6,8); 

        const date = new Date(year, month, day);
        const dayOfWeek = date.getDay();

        const days = ['일', '월', '화', '수', '목', '금', '토'];
        const dayName = days[dayOfWeek];

        return dayName; 
    },
}

export default util;