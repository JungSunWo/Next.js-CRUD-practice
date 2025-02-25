import util from "@/common/util";


const swrFetch = async (...args) =>{
  let id  = args[0][0];
  let opt = args[0][1];  

  if(typeof window == "undefined") return;
  const suffix = "";

  if(id == ""){
      alert.open("안내","요청 서비스ID가 없습니다.",{cb : ()=>{},oklabel : "확인"});
      return;
  }

  let url=process.env.NEXT_PUBLIC_PROXY_URL;
  url =  url+ id+suffix; 
  
  const res = await fetch(url
    ,{
          cache : "no-store",
          method : "post",
          credentials : "include",
          headers : {"Content-Type" : "application/json"},
          body : JSON.stringify(opt),
      });

  return await res.json(); 
}

const  schedulFetch = (id,opt,cb,ecb) =>{
    if(typeof window == "undefined") return; 
    const suffix = "";

    if(id == ""){
        alert.open("안내","요청 서비스ID가 없습니다.",{cb : ()=>{},oklabel : "확인"});
        return;
    }

    let url=process.env.NEXT_PUBLIC_PROXY_URL;
    url =  url+id+suffix;

    fetch(url,{
        cache : "no-store",
        method : "post",
        credentials : "include",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify(opt),
    })
    .then( res =>{
        return res.json();
    })
    .then( res =>{
        if(res?.ERROR =="true" || res?.ERROR == true){
            if(util.isEmpty(ecb)){
                if(!util.isEmpty(res?.ERROR?.MSG)){
                    util.errorMsgPopup(res?.ERROR?.MSG);
                }
            }else{
                ecb(res);
            }

        }else{
            if(util.isEmpty(cb)){
                return res;
            }else{
                cb(res);
            }
        }
    })
    .catch(err=>{
        console.error(err);
    })
    .finally(()=>{})

}

export {schedulFetch,swrFetch } ;