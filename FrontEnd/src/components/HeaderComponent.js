import React, {Component} from 'react';
import {  Nav, Navbar} from 'reactstrap';
import { Link} from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';
class Header extends Component{
    render(){
        var hide=this.props.hide;
        var isSearch = this.props.isSearching;
        var class_search = isSearch?'fa-times':'fa-search';
        return(
            <Navbar className={hide?'d-none':''}  expand="md">
                <div className="container">
                    <Link to="/">
                    <div className="mr-auto">
                        <img src={`${baseUrl}/assets/logo.png`} height="45"  alt="HouseFlix"/>
                    </div>
                    </Link>
                    <Nav className="ml-auto col-12 col-md-4" navbar>
                        <div style={{border:`${!isSearch?'none':'0.23px solid white'}`}} className="ml-auto col-12 col-md-auto mt-4 mt-md-0 searchbar row">
                            <input className={`col-10 ${isSearch?'d-block':'d-none'} searchbar-input`}
                                type="text"
                                placeholder="Search.."
                                onChange={this.props.onChange}
                                value={this.props.searchKey}
                            />
                            <div onClick={this.props.clearState} className="col-2 search-icon">
                            <Link style={{margin:0, padding:0, color:'#fff'}} to={isSearch?'/':'/search'}>
                                <i className="text-right"><span className={`fa ${class_search} fa-lg`}></span></i>
                            </Link>
                            </div>
                        </div>
                    </Nav>
                </div>
            </Navbar>
        );
    }
}

export default Header;