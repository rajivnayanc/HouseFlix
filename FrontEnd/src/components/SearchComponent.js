import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';
import Loader from './LoadingComponent';
import {Fade, Stagger} from 'react-animation-components';
function ShowThumbnail(props){
    const item = props.item;
    const posterUrl = `${baseUrl}${item.poster}`;
    return (
        <div className="link-unstyled movie-thumbnail col-6 col-md-3 col-sm-4 mb-3">
            <Fade in>
            <Link className="" to={`movie/${item.id}`}>
                <div className="row">
                    <div className="col-12">
                        <div className="thumbnail-header">
                            <div className="elevation-1 thumbnail-img" style={{backgroundImage:`url(${posterUrl})`}}></div>
                            <div className="d-none d-md-block elevation-1 thumbnail-img-overlay">
                                <div className="thumbnail-overlay-text">
                                    <h5><b>{item.title}</b></h5>
                                    <p><i>{item.year_of_release}</i></p>
                                    <p><b><small><i>{item.duration}</i></small></b></p>
                                </div>
                            </div>
                        </div>
                        <div className="d-block d-md-none thumbnail-body mt-4">
                            <div className="thumbnail-body-text">
                                <h5><b>{item.title}</b></h5>
                                <p><i>{item.year_of_release}</i></p>
                                <p><b><small><i>{item.duration}</i></small></b></p>
                            </div>
                        </div>
                     </div>
                </div>
            </Link>
            </Fade>
        </div>
    )
}

function MenuDetails(props){
    return(
        <div className="container mt-5">
            <div className="row">
                {props.children}
            </div>
        </div>
    )
}
class Search extends Component {

    render(){
        if(this.props.isLoading){
            return (
                <>
                <MenuDetails title={"Movies"}>
                    <div className="col-12">
                        <Loader />
                    </div>
                </MenuDetails>
                </>
            )
        }
        if(!this.props.isLoading && !this.props.lists){
            return(
            <MenuDetails title={"Movies"}>
                <div className="col-12">
                    <center>
                        <h4>Search for Movies</h4>
                    </center>
                </div>
            </MenuDetails>
            );
        }

        if(this.props.lists.status==='ERROR'){
            return(
                <MenuDetails title={"Movies"}>
                    <div className="col-12">
                        <center>
                            <h4>{this.props.lists.payload}</h4>
                        </center>
                    </div>
                </MenuDetails>
            );
        }

        let movie_lists = this.props.lists.payload.map(movie=>{
            return (
                    <ShowThumbnail key={movie.id}  item={movie}/>
            )
        });
        if(movie_lists.length ===0){
            movie_lists = (
                <div className="col-12">
                <center>
                    <h4>No Results</h4>
                </center>
            </div>
            )
        }
        return (
            <>
                <MenuDetails title={"Movies"}>
                    <Stagger in className="col-12 row">
                        {movie_lists}
                    </Stagger>
                </MenuDetails>
            </>
        );
    
    }
}

export default Search;