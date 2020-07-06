import React , {Component} from 'react';
import fetch from 'cross-fetch';
import { baseUrl } from '../shared/baseUrl';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Menu from './MenuComponent';
import VideoStream from './VideoStreamComponent';
import Search from './SearchComponent';
import Header from './HeaderComponent';

class Main extends Component{
    constructor(props){
        super(props);
        this.state = {
            output:null,
            isLoading: true,
            searchResults:{
                searchKey:'',
                isLoading:false,
                output:null
            }
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.clearSearchState = this.clearSearchState.bind(this);
    }
    componentDidMount(){
        fetch(baseUrl+'browse')
        .then(response => {
            if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                    var errmess = new Error(error.message);
                    throw errmess;
        })
        .then(response => response.json())
        .then(lists => {
            this.setState({
                output:{
                    status:'OK',
                    payload:lists
                },
                isLoading:false
            });
        })
        .catch(error => {
            this.setState({
                output:{
                    status:'ERROR',
                    payload:error.message
                },
                isLoading:false,
            });
        });
    }

    fetchSearchResults = (query)=>{
        const url = `${baseUrl}search?q=${query}`;
        fetch(url)
        .then(response => {
            if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                    var errmess = new Error(error.message);
                    throw errmess;
        })
        .then(response => response.json())
        .then(lists => {
            this.setState({
                searchResults:{
                    ...this.state.searchResults,
                    isLoading:false,
                    output:{
                        status:'OK',
                        payload:lists
                    }
                }
            });
        })
        .catch(error => {
            this.setState({
                searchResults:{
                    ...this.state.searchResults,
                    isLoading:false,
                    output:{
                        status:'OK',
                        payload:error.message
                    }
                }
            });
        });

    }
    handleSearch = (event)=>{
        const value =event.target.value;
        const isLoading = !(value==='');
        this.setState({
            searchResults:{
                ...this.state.searchResults,searchKey:value, isLoading:isLoading
            }
        }, ()=>{
            if(value!=='')
                this.fetchSearchResults(value);
            if(value==='')
                this.clearSearchState();    
        });

    }

    clearSearchState = ()=>{
        this.setState({
            searchResults:{
                searchKey:'',
                isLoading:false,
                output:null
            }
        });
    }

    render(){
        var patt = /((movie|tvshow)[/])\d+/;
        var hide = patt.test(this.props.location.pathname)
        var patt2 = /search/;
        var isSearch = patt2.test(this.props.location.pathname)
        return (
            <>
                <Header hide={hide} clearState={this.clearSearchState} isSearching={isSearch} searchKey={this.state.searchResults.searchKey} onChange={this.handleSearch}/>
                <Switch>
                    <Route path='/browse' component={()=><Menu onChange={this.handleSearch} isLoading={this.state.isLoading} lists = {this.state.output}/>}/>
                    <Route exact path='/movie/:movieId' component={({match})=>{
                        return(
                            <VideoStream videoId={match.params.movieId} />
                        );
                    }}/>
                    <Route exact path='/tvshow/:tvShowId' component={Menu}/>
                    <Route exact path='/search' component={()=>(
                                <Search isLoading={this.state.searchResults.isLoading}
                                    lists = {this.state.searchResults.output} 
                                    onChange={this.handleSearch}/>
                            )}/>
                    <Redirect to="/browse"/>
                </Switch>
            </>
        );
    }
}
export default withRouter(Main);