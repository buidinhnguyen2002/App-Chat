import React, {useEffect, useMemo, useRef, useState} from "react";
import "./link_preview.scss";
import {useLinkPreview} from "get-link-preview";

function LinkPreview(props) {
    const { getLinkPreviewData, loading, error, data } = useLinkPreview(props.url);
    return (
        <div>
            {  <div className="link_preview">
                <div className="link_preview-card">
                    <div className={`${data ? "link": 'message_item message_item-round link-preview d-flex'} ${props.isMyChat ? "message_item-bgBlue" : "message_item-bgWhite"} `}>
                        <a className={`${props.isMyChat ? 'cl-white': 'cl-grey'}`} href={props.url} target="_blank" rel="noopener noreferrer" style={{color: data ? "white": ''}}>{props.url}</a>
                    </div>
                    {data && data.image && <div className="image-review"><img src={data.image} alt=""/></div>}
                    {data && data.title && <div className="title">
                        <h2>{data.title}</h2>
                    </div>}
                    {data && <div className="favicon-container">
                        <img src={data.favicon} alt="Favicon"/>
                        <span className={"domain"}>{data.domain}</span>
                    </div>}
                </div>
            </div>
            }
        </div>
    );
}
export default LinkPreview;