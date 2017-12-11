import React from 'react';
import './index.css';
import {Tabs, Tab} from 'material-ui/Tabs';

export default class PaginationBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        };
    }

    handleChange = (value) => {
        this.setState({
            value: value,
        });
        //Calls onChange callback
        if (this.props.onChange != null) this.props.onChange(value);
    };
    
    render() {
        //Creates tabs
        let tabs = this.createTabs();
        return(
            <div>
                <Tabs value={this.state.value} onChange={this.handleChange} style={{display: (tabs.length > 1) ? "inherit" : "none"}}>
                    {tabs}
                </Tabs>
            </div>
        );
    }

    createTabs() {
        let tabs =[];
        //Decides how many tabs to display on either side of current active tab
        let paddingValue = Math.floor(this.props.optionCount / 2);
        //Sets what page to start at
        let startValue = (this.state.value - paddingValue + 1< this.props.min) ? 
            this.props.min : this.state.value - paddingValue + 1;
        //Sets what page to end at
        let endValue = (startValue + this.props.optionCount > this.props.max) ?
            this.props.max : startValue + this.props.optionCount - 1;
        //Adjusts start value to show more if the end has been reached
        startValue = (endValue - this.props.optionCount < this.props.min) ?
            this.props.min : endValue - this.props.optionCount + 1;
        //Display skip to start
        if(this.props.enableSkip && startValue !== this.props.min) 
            tabs.push(<Tab key="start" label={"<< " + this.props.min} value={this.props.min - 1}></Tab>)
        
        //Creates tabs
        for(let value = startValue; value <= endValue; value++) {
            tabs.push(<Tab key={value} label={value} value={value - 1}/>)
        }
        //Display skip to end
        if(this.props.enableSkip && endValue !== this.props.max)
            tabs.push(<Tab key="end" label={this.props.max + " >>"} value={this.props.max - 1}></Tab>)
        
        return tabs;
    }
}