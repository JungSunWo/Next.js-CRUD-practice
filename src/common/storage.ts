type strType = "session" | "local";
type typeStrReturnVal = {
    getItem : (key : string, type?:strType) =>string;
    setItem : (key : string, value:string ,type?:strType) => boolean;
}

const strorage = () : typeStrReturnVal => {
    const isBr : boolean = (() : boolean => typeof window !== "undefined")();
    const storageType = (type?:strType): "localStorage"| "sessionStorage" => `${type?? 'session'}Storage`;

    const getItem = (key : string, type?:strType)  => {
        if(isBr){
            var result = window[storageType(type)][key];

            if(result != null){
                result = decodeURIComponent(result);
                try{
                    result = JSON.parse(result);
                }catch(e){}
            }

            return result;
        }
    };

    const setItem = (key : string, value : string, type?:strType) : boolean =>{
        if(isBr){
            if(value != null){
                if(typeof value == "object"){
                    value = JSON.stringify(value);
                }

                value = encodeURIComponent(value);
            }

            window[storageType(type)][key]=value;

            return true;
        }
        return false;
        
    };

    return{
        getItem,
        setItem,
    };
}

export default strorage;