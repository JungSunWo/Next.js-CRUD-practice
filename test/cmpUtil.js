import React from "react";
import gsap from "gsap";

export const FormattedLabel = (label) => {
    if(label === undefined){
        return null;
    }

    return label.split("<br/>").map((line,idx, arr)=>(
        <React.Fragment key={idx}>
            {line}
            {idx !== arr.length -1 && <br />}
        </React.Fragment>
    ));
};

export const ConvertToDataAttributes = (styles) =>{
    if(styles){
        const convertedStyles = ();
        Object.keys(styles).forEach(key=>{
            convertedStyles[`data-${key}`] = styles[key];
        });
        return convertedStyles;
    }
    return {};
};