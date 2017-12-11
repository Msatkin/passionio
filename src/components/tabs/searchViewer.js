import React from 'react';
import SearchBar from '../searchBar/searchBar';
import PaginationBar from '../paginationBar/paginationBar';
import './index.css';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import DisplayData from '../displayData/displayData';

export default class SearchViewer extends React.Component {
    constructor(props) {
        super(props);
        //Sets autoFillData and rows to state
        this.state = {
            autoFillData: props.content.table.data.map((element) => element.name),
            rows: this.props.content.page.data.map(
                (element, index) => this.createRow(element, index))
        }
    }

    render() {
        //Sets table length depending on if a search is being performed
        let tableLength = (this.props.content.page.isSearching) ?
            this.props.content.table.search.length : this.props.content.table.data.length;
        return(
            <div>
                <div className="tab-container">
                    <div className="viewer-search-bar">
                        <SearchBar
                            ref="searchBar"
                            className="viewer-search-bar"
                            icon={this.props.content.icon}
                            title={this.props.content.title}
                            autoFillData={this.state.autoFillData}
                            onSearch={this.searchData.bind(this)}
                            isSearching={this.props.content.page.isSearching}
                            onClear={this.clearSearch.bind(this)}/>
                    </div>
                    <div>
                        {this.state.rows}
                    </div>
                    <PaginationBar
                        ref="pagination"
                        min={1}
                        max={Math.ceil(tableLength / this.props.content.page.length)}
                        optionCount={5}
                        enableSkip={true}
                        onChange={this.gotoPage.bind(this)}/>
                </div>
            </div>
        );
    }

    componentWillReceiveProps(props) {
        //Updates autoFillData and rows on prop change
        let autoFillData = (props.content.page.isSearching) ? props.content.table.search : props.content.table.data;
        this.setState({
            autoFillData: autoFillData.map((element) => element.name),
            rows: props.content.page.data.map(
                (element, index) => this.createRow(element, index))
        });
    }

    //Creates rows of data
    createRow(data, index) {
        return(
            <Card key={index}>
                <CardHeader
                    className="align-left"
                    title={data[this.props.content.table.title]}
                    subtitle={this.props.content.table.subtitle + data[this.props.content.table.subTitleProp]}
                    avatar={(this.props.content.table.avatar != null) ? data[this.props.content.table.avatar] : null}
                    actAsExpander={true}
                    showExpandableButton={true}
                    />
                <CardText expandable={true}>
                <DisplayData
                    listContent={data}
                    children={this.props.content.children.filter((child) => (child.type !== this.props.content.parent.type))}
                    onClick={this.createChildTab.bind(this)}/>
                </CardText>
            </Card>
        );
    }

    gotoPage(pageIndex) {
        this.props.onPageChange(this.props.content, pageIndex);
    }

    searchData(search) {
        this.props.onSearch(this.props.content, search)
    }
    
    clearSearch() {
        this.searchData(null);
        this.refs.searchBar.refs.searchBar.state.searchText = "";
    }

    //Creates new tab from selection
    createChildTab(id, type) {
        this.props.createChild(type, this.props.content.id, id, this.props.content.table.name);
    }
}