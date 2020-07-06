import React from 'react';

const Loader = (props)=>{
    return(
        <div className="col-12 row justify-content-center mt-5">
            <i className="fa fa-spinner fa-pulse fa-5x fa-fw" aria-hidden="true"></i>
        </div>
    )
}

export default Loader