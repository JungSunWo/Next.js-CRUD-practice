"use client"

import {React, useState, useCallback, useEffect} from "react";
import { Calendar } from "@/components/CustomCalendar";
import { SlideBottomSheet } from "@/components/SlideBottomSheet"

import styled,{css} from "styled-components";

import util from "@/common/util";
import strorage from "@/common/storage"
import {schedulFetch} from "@/common/fetch"


const Schedule_style = styled.div`
.wN{ font-weight:normal;}
.t18 { font-size:1.8rem;}
.mT4{ margin-top:0.4rem;}
.mT8{ margin-top:0.8rem;}
.mT12{ margin-top:1.2rem;}
.mT16{ margin-top:1.6rem;}
.mT20{ margin-top:2rem;}
.mT24{ margin-top:2.4rem;}
.mT40{ margin-top:4rem;}
.mT60{ margin-top:6rem;}

.ctsScheduleWrapper { padding-bottom: 10rem;}
.ctsScheduleWrapper .ctsSchedulItem { position:relative;display:flex; align-items: center; justify-content: space-between; height: 6rem;}
.ctsScheduleWrapper .ctsSchedulItem::before {content: ''; position: absolute; top:0; left:0; width: 0.4rem; height: 100%; border-radius: 0.4rem; background-color: var(--jb_blue);}
.ctsScheduleWrapper .ctsSchedulItem.ctsBlank::before { background-color: var(--gray7)}
.ctsScheduleWrapper .ctsSchedulItem.applyHome::before { background-color: #613e18;}
.ctsScheduleWrapper .ctsSchedulItem p:first-child { padding-left: 2rem; width:55%; word-break: break-all;}
.ctsScheduleWrapper .ctsSchedulItem + .ctsScheduleItem { margin-top: 1.2rem; }
.ctsLegendBottom { position: fixed; left:2rem; bottom:0; height: 6rem; display: flex; align-items: center; background: var(--white); width:calc(100%- 4rem); z-index:80;}
.ctsLegendBottom p{ position: relative;}
.ctsLegendBottom p::before{ content: ''; position: absolute; top:calc(50% - 0.5rem); left:2rem;width:1rem; height: 1rem; border-radius: 50%; background-color: var(--jb-blue);}
.ctsLegendBottom p:last-child::before{ left:4rem; background-color: #613e18;}
.ctsLegendBottom p:first-child{ padding-left: 3.4rem; }
.ctsLegendBottom p:last-child{ padding-left: 5.4rem; }
`

export default function Schedule(){

    const eventKindDvcd = "11";
    const showTimeDt = new Date();
    const timeDt = new Date();

    let yearStr = String(timeDt.getFullYear());
    let monthStr = (timeDt.getMonth() +1 <10) ? "0" + String(timeDt.getMonth()+1) : String(timeDt.getMonth()+1);
    let dateStr = (timeDt.getDate() < 10 ) ? "0"+String(timeDt.getDate()) : String(timeDt.getDate());

    const [chooseDate , setChooseDate ] = useState(yearStr+monthStr+dateStr);
    const [gridList, setGridList] = useState([]);
    const [bottomList, setBottomList] = useState([]);


    const { getItem , setItem } = strorage();

    const getChooseDate = date =>{
        let list = gridList.filter((item) => item.reg_dt == date);
        getBottomList(date, list);
    }

    const getBottomList = (date,list) =>{
        setChooseDate(date);

        setBottomList(list);
    }

    const getChooseMonth = yearMonth => {
        search(yearMonth+"01");
    }

    const search = (date) =>{
        schedulFetch("schedule",{
            params : {
                KIND_DVCD : eventKindDvcd
                , YM : date.substring(0,6)
            }
        },(res)=>{
            setGridList(res.data.posts);
            getBottomList(date,res.data.posts);
        });
    }

    setItem("TEST",{"key":"1111"}); 
    console.log( getItem("TEST"));

    useEffect(()=>{
        search(yearStr+monthStr+dateStr);
    },[]);


    const calcArea = useCallback(()=>{
        return(<Calendar
            chooseTimeDtInit={timeDt}
            showTimeDtInit={showTimeDt}
            gridInit={gridList}
            getChooseDate={getChooseDate}
            getChooseMonth={getChooseMonth}
            eventKindInit={eventKindDvcd}
        >
        </Calendar>);
    },[gridList]);

    const bottomArea = useCallback(()=>{
        if(bottomList.length > 0){
            let bottomHtml = bottomList.map((item,idx)=>{
                return( 
                <div className={"ctsScheduleItem" +("01" == item?.DVCD ?" applyHome" : "")} key={idx} onClick={()=> alert("content : " + item.content)}>
                    <p className="t14 gray9">{item.subject}</p> 
                </div> 
                 )
            });

            console.log("232")

            return(
                <SlideBottomSheet>
                <p className="t16 gray10 wB mT8">{util.date(chooseDate)} {util.getDayOfWeek(chooseDate)}요일</p>
                <div className="ctsScheduleWrapper mT24">
                    {bottomHtml}
                </div>
              </SlideBottomSheet>  
            );
        }else{
            return(
              <SlideBottomSheet>
                <p className="t16 gray10 wB mT8">{util.date(chooseDate)} {util.getDayOfWeek(chooseDate)}요일</p>
                <div className="ctsScheduleWrapper mT24">
                    <div className="ctsScheduleItem ctsBlank">
                        <p className="t14 gray9">일정이 없습니다.</p>
                    </div>
                </div>
              </SlideBottomSheet>  
            );
        }

    },[chooseDate]);

    return(
        <Schedule_style> 
        <div>
            {calcArea()}
            {bottomArea()}
       
                <div className="ctsLegendBottom">
                    <p className="t13 cG70">일정</p>
                    <p className="t13 cG70">헹사</p>
                </div>
            </div>
        </Schedule_style> 
    );
}


