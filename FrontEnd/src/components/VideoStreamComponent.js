import React from 'react';
import { baseUrl } from '../shared/baseUrl';

function VideoStream(props){
    const path = `${baseUrl}movies/${props.videoId}`;
    return(
        <div className="video-container">
            <video className="video-container video-container-overlay" controls autoPlay={true}>
                <source src={ path } type="video/mp4" />
            </video>
        </div>
    );
}

export default VideoStream;

