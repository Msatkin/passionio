import React from 'react';
import './index.css';
import AutoComplete from 'material-ui/AutoComplete';
import Chip from 'material-ui/Chip';

export default class SearchBar extends React.Component {  
    render() {
        //Adjusts border-radius of edges when searching
        let btnRadius = (this.props.isSearching) ? {borderRadius: "0px 4px 0px 0px"} : {borderRadius: "0px 4px 4px 0px"};
        let titleRadius = (this.props.isSearching) ? {borderRadius: "4px 0px 0px 0px"} : {};
        //Set icon component
        let Icon = this.props.icon;
        return(
            <div style={this.props.style}>
                <div className="search-bar-container">
                    <div className="search-type" style={titleRadius}>
                        <div className="margin-auto">
                            <span className="search-bar-icon"><Icon/></span>
                            <span>{this.props.title}</span>
                        </div>
                    </div>
                    <div className="search-bar">
                        <AutoComplete
                            floatingLabelText={"Search for " + this.props.title}
                            className={"auto-search"}
                            filter={AutoComplete.caseInsensitiveFilter}
                            dataSource={(this.props.autoFillData != null && this.props.autoFillData.length < 1000) ? this.props.autoFillData : []}
                            fullWidth={true}
                            onNewRequest={(request) => this.props.onSearch(request)}
                            ref="searchBar"
                            popoverProps={{style: {marginTop: "2%"}}}
                            />
                    </div>
                    <div className="search-bar-btn">
                        <button className="search-bar-search-icon btn btn-default"
                            type="submit"
                            onClick={() => this.props.onSearch(this.getInput())}
                            style={btnRadius}>
                            <i className="glyphicon glyphicon-search"></i>
                        </button>
                    </div>
                </div>
                <Chip
                    className="clear-search"
                    style={{display: (this.props.isSearching) ? "inherit" : "none"}}
                    onClick={() => this.props.onClear()}>
                    Clear Search
                </Chip>
            </div>
        );
    }

    //Gets input of searchbar
    getInput() {
        if (this.refs.searchBar != null)
            return (this.refs.searchBar.state.searchText !== "") ? this.refs.searchBar.state.searchText : null;
        return null;
    }
}