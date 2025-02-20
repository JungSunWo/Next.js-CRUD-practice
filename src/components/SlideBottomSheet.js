"use client"

import {React, useRef } from "react"
import styled from "styled-components";


const StyledBottomSheet = styled.div`
.slide_btm_sheet { display:block; position:fixed;bottom:0;left:0;z-index:80;width:100%;height: 10.6rem;}
.slide_btm_sheet .btm_wrap { overflow:hidden;position:absolute;bottom:0;z-index:81;padding:0 2rem;width:100%;height:10.6rem;border-radius:2rem 2rem 0 0;background:#fff;transition:all 0.3s ease-out;-webkit-transition:all 0.3s ease-out;box-shadow: 0 -0.6rem 1rem 0 rgba( 33, 37, 41, 0.02), 0 -0.1rem 1.6rem 0 rgba(33, 37,41, 0.04);}
.slide_btm_sheet .btm_wrap .close_slide{position:absolute;top:0;left:50%;margin-left:-2.5rem;z-index:1;width:5rem;height:2rem;z-index:2;}
.slide_btm_sheet .btm_wrap .close_slide:before{content:'';display:block;margin:0.6rem auto 0;width:3.5rem;height:0.4remlborder-radius:0.4rem;background:#8c959f;}
.slide_btm_sheet .btm_wrap .btm_touch_area{position:relative:padding-top:2rem;padding-bottom:4rem;z-index:1;}
.slide_btm_sheet .btm_wrap .btm_touch_area + *{margin-top:-4rem;}
.slide_btm_sheet .btm_wrap .btm_cont_area { overflow-y:auto;position:relative;padding: 0 2rem; height:100% !important;max-height:100%;-webkit-overflow-scrolling:touch;z-index:3;}
.slide_btm_sheet .active  { height:100%;background:rgba(33,37,41,.7);border-radius:0rem 0rem 0 0 !important;}
.slide_btm_sheet .active .btm_wrap { height:85vh;transition:all 0.2s ease-out;-webkit-transition:all 0.2s ease-out;}
.ios .slide_btm_sheet .active .btm_wrap { height:80vh}
.slide_btm_sheet .active .btm_wrap .close_slide{ display:block;}
`;

const SlideBottomSheet = (props) => {
    const {id, children} = props;
    const SlideBtmSheetRef = useRef(null);
    const openSlideBtnRef = useRef(null);

    const openSlide = () =>{
        if(!SlideBtmSheetRef.current.classList.contains("active")){
            SlideBtmSheetRef.current.classList.add("active");
        }else{
            SlideBtmSheetRef.current.classList.remove("active");
        }
    }

    return(
        <StyledBottomSheet>
            <div ref={SlideBtmSheetRef} className="slide_btm_sheet" id={id}>
                <div className="btm_wrap">
                    <button type="button" ref={openSlideBtnRef} onClick={()=>openSlide()} className="close_slide" title="상세정보 열고 닫기"></button>
                    <div className="btm_touch_area"></div>
                    <div className="btm_cont_area">
                        {children}
                    </div>
                </div>
            </div>
        </StyledBottomSheet>
    );

};

export {SlideBottomSheet}
