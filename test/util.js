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
        return (val == undefined || val == null || val == "undefined" || val == "null" || util.null2void(String(vla)).replace(/ /g, "") == "");
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
}

export default util;