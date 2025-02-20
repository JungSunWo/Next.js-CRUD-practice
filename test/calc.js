'use client'

import {React, useEffect, useState} from 'react';
import styled from 'styled-components';

const StyledCalendar = styled.div`
.ctsCalendarWarpper { height : calc( 100vh -37.4rem); overflow-x: hidden; overflow-y: scroll;}
.ctsCalendar { display : flex; flex-direction: column; align-items: center;}
@media only screen and (min-width :370px) and (min-height:720px) and (max-height :900px){
    .ctsCalendarWarpper { height :calc(100vh - 43rem);}
    .ctsCalendar { padding-bottom : 3rem;}
}
.ctsCalendar .ctsCalendarMonth { display : flex; align-items: center; justify-content: center; height; 7.3rem; }
.ctsCalendar .ctsCalendarMonth .ctsPrevBtn{ width : 2rem; height: 2rem; backround: url() no-repeat cnter/2rem 2rem;}
.ctsCalendar .ctsCalendarMonth .ctsCurMonth{ margin: -0.2rem 0.8rem 0; width:8rem;height:2.4rem; font-size:1.6rem; color: var(--gray10); font-weight:bold; text-align:center;}
.ctsCalendar .ctsCalendarMonth .ctsNextBtn{ width : 2rem; height: 2rem; backround: url() no-repeat cnter/2rem 2rem;}
.ctsCalendar .ctsCalendarDay { display : flex; padding: 2.4rem 0 0.8rem; heightt: 5.4rem; border-top 1px solid var(--gray4); }
.ctsCalendar .ctsCalendarDay .ctsDay { width: 4.8rem; height: 2.2rem; font-size: 1.4rem; font-weight:500; color: var(--gray10); text-align:conter;}
.ctsCalendar .ctsCalendarDay .ctsDay .ctsSun { color: var(--danger);}
.ctsCalendar .ctsWeek { display: flex; margin-top: 0.3rem;}
.ctsCalendar .ctsWeek .ctsBlank{ width: 4.8rem; height: 4.8rem;}
.ctsCalendar .ctsWeek .ctsDate { display: flex; flex-direction: column; align-items: center; width: 4.8rem; height: 4.8rem;}
.ctsCalendar .ctsWeek .ctsDate p{ position: relative; display: flex; align-items: center; justify-content: center; width: 2.8rem; height: 2.8rem; background-color: var(--blue2); border-radius: 50%; }
.ctsCalendar .ctsWeek .ctsDate .ctsSun p{ color : var(--danger);}
.ctsCalendar .ctsWeek .ctsDate .ctsChooseDay { position: relative;}
.ctsCalendar .ctsWeek .ctsDate .ctsChooseDay::before { content: ''; position: absolute; top: -0.2rem; left: calc(50% - 1.4rem); width: 2.8rem; height: 2.8rem; background-color: var(--blue2); border-radius: 50%;}
.ctsCalendar .ctsWeek .ctsDate .ctsChooseDay p {color: var(--blue6);}
.ctsCalendar .ctsWeek .ctsDate .ctsScheduleDot { display: flex; flex-wrap: wrap; justify-content: center; width: 3rem; height: 2rem; margin-top: 0.3rem; z-index:1;}
.ctsCalendar .ctsWeek .ctsDate .ctsScheduleDot span { margin-top: 0.3rem; width: 0.4rem; height: 0.4rem; border-radius: 50%; }
.ctsCalendar .ctsWeek .ctsDate .ctsScheduleDot .ty1 { backround-color: #034f36; }
.ctsCalendar .ctsWeek .ctsDate .ctsScheduleDot .ty2 { backround-color: var(--jb-blue); }
.ctsCalendar .ctsWeek .ctsDate .ctsScheduleDot .ty3 { backround-color: #613e18 }
.ctsCalendar .ctsWeek .ctsDate .ctsScheduleDot span + span { margin-left: 0.2rem; }
.ctsCalendar .ctsWeek .ctsDate .ctsScheduleDot span:nth-child(6n) { margin-left: 0; }
`;

const Calendar = (props) =>{
    const {showTimeDtInit, chooseTimeDtinit, gridInit, getChooseDate, getChooseMonth, eventKindInit } = props;
    const [showTimeDt, setShowTimeDt ] = useState(showTimeDtInit);
    const [chooseTimeDt, setChooseTimeDt] = useState(chooseTimeDtinit);
    const [grid , setGrid] = useState(gridInit);
    const [eventKind, setEventKind] = useState(eventKindInit);

    const showYearTop = showTimeDt.getFullYear();
    const showMonthTop = showTimeDt.getMonth();

    const showMonthStr = showMonthTop < 9 ? "0" + String(showMonthTop +1) : String(showMonthTop+1);
    const showTimeDtStr = showYearTop + "." + showMonthStr;

    const dateHtml = () =>{
        let showYear = showTimeDt.getFullYear();
        let showMonth = showTimeDt.getMonth();

        let chooseYear = chooseTimeDt.getFullYear();
        let chooseMonth = chooseTimeDt.getMonth();
        let chooseDate = chooseTimeDt.getDate();

        let date1 = new Date(showYear, showMonth,1);
        let day1 = date1.getDay();
        let totalDay = new Date(showYear, showMonth+1, 0).getDate();

        let dateHtmlStr = "";

        for(let i=0; i<day1;i++){
            if(dateHtmlStr == "") dateHtmlStr = "<div class=\"ctsWeek\">";
            date += "<div class=\"ctsBlank\"></div>";
        }

        for(let i =1 ; i<=totalDay;i++){
            let thisTimeDt = new Date(showYear, showMonth, i);
            let dateStr = (i<10)? "0"+String(i): String(i);
            let monthStr = thisTimeDt.getMonth() + 1;
            monthStr = (monthStr < 10) ? "0"+String(monthStr): String(monthStr);

            let dataDateStr = thisTimeDt.getFullYear()+monthStr+dateStr;

            let headStr = "";
            let taleStr = "";
            let classStr = "ctsDate";
            let ariaSelected = "false";

            let idStr = " id=\"\"";
            let cntApp = 1;
            let cntHome = 3;
            let cntDot = 2;

            if(thisTimeDt.getDay() == 0){
                headStr = "<div class=\"ctsWeek\">";
                classStr += " ctsSun";
            }

            if(thisTimeDt.getDay() == 6 || i == totalDay){
                taleStr = "</div>";
            }

            if(chooseYear == thisTimeDt.getFullYear() && chooseMonth == thisTimeDt.getMonth() && i == chooseDate){
                classStr += " ctsChooseDay";
                ariaSelected = "true";
            }

            let eventDtStr = chooseYear + monthStr + dateStr;
            let dateWarpperStr = "<p>" + dateStr + "</p>";
            dateWarpperStr += "<div class=\"ctsScheduleDot\">";
            for( let j =0; j < grid.length ; j++){
                if(grid[j].EVNT_PRGS_DT == eventDtStr){
                    if("04" == eventKind){
                        dateWarpperStr += "<span class=\"ty1\"></span>";
                    }else{
                        if("01" == grid[j].EVNT_CHNL_DVCD){
                            dateWarpperStr += "<span class=\"ty2\"></span>";
                        }else{
                            dateWarpperStr += "<span class=\"ty3\"></span>";
                        }
                    }
                }
            }

            for(let j=0;j< cntApp;j++) dateWarpperStr += "<span class=\"ty1\"></span>";
            for(let j=0;j< cntDot;j++) dateWarpperStr += "<span class=\"ty2\"></span>";
            for(let j=0;j< cntHome;j++) dateWarpperStr += "<span class=\"ty3\"></span>";

            dateWarpperStr += "</div";
            classStr = " class=\"" + classStr + "\"";
            dateHtmlStr += headStr + "<div" + classStr + idStr + " data-date=\""+ dataDateStr + "\" aria-selected=\"" + ariaSelected + "\">" + dateWarpperStr + "</div>" + taleStr;
 

        }

        return dateHtmlStr;
    }

    const movePrevMonth = () =>{
        let newShowMonth = showTimeDt.getMonth();
        let newShowYear = showTimeDt.getFullYear();
        
        newShowMonth--;
        if(newShowMonth < 0){
            newShowMonth = 11;
            newShowYear--;
        }

        let monthStr = (newShowMonth+1 < 10 ) ? "0"+ String(newShowMonth+1): String(newShowMonth+1);
        getChooseMonth(String(newShowYear)+monthStr);
        setShowTimeDt(new Date(newShowYear, newShowMonth,1));
        setChooseTimeDt(new Date(newShowYear,newShowMonth,1));

    }

    const moveNextMonth = () =>{
        let newShowMonth = showTimeDt.getMonth();
        let newShowYear = showTimeDt.getFullYear();
        
        newShowMonth++;
        if(newShowMonth > 11){
            newShowMonth = 0;
            newShowYear++;
        }

        let monthStr = (newShowMonth+1 < 10 ) ? "0"+ String(newShowMonth+1): String(newShowMonth+1);
        getChooseMonth(String(newShowYear)+monthStr);
        setShowTimeDt(new Date(newShowYear, newShowMonth,1));
        setChooseTimeDt(new Date(newShowYear,newShowMonth,1));

    }

    useEffect(()=>{
        const ctsDateElAll = document.querySelectorAll(".ctsDate");
        for(const el of ctsDateElAll){
            el.addEventListener("click",()=>{
                const clickDate = el.getAttribute("data-date");
                const newChooseYear = clickDate.substr(0,4);
                const newChooseMonth = Number(clickDate.substr(4,2))-1;
                const newChooseDate = clickDate.substr(6,2);

                getChooseDate(clickDate);
                setChooseTimeDt(new Date(newChooseYear,newChooseMonth,newChooseDate));
            });
        }

        setGrid(gridInit);
    });

    return(
        <StyledCalendar>
            <div className ="ctsCalendarWarpper">
                <div className="ctsCalendar">
                    <div className="ctsCalendarMonth">
                        <button className="ctsPrevBtn" onClick={() => movePrevMonth()} title="이전 월로 이동"></button>
                        <p className="ctsCurMonth">{showTimeDtStr}</p>
                        <button className="ctsNextBtn" onClick={() => moveNextMonth()} title="다음음 월로 이동"></button>
                    </div>
                    <div className="ctsCalendarDay">
                        <p className="ctsDay ctsSun">일</p>
                        <p className="ctsDay">월</p>
                        <p className="ctsDay">화</p>
                        <p className="ctsDay">수</p>
                        <p className="ctsDay">목</p>
                        <p className="ctsDay">금</p>
                        <p className="ctsDay">토</p>
                    </div>
                    <div className="ctsCalendarDateArea" dangerouslySetInnerHTML={{__html:dateHtml()}}></div>
                </div>
            </div>
        </StyledCalendar>

    );
}

export {Calendar};