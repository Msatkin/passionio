import React from 'react';
import {Card, CardTitle } from 'material-ui/Card';
import './selection.css';

export default class Selection extends React.Component {  
    render() {
        //Set icon component
        let Icon = this.props.icon;
        return(
            <Card
                className="selection"
                style={(this.props.style != null) ? this.props.style : null}
                onClick={()=> this.props.onClick(this.props.type)}>
                <CardTitle
                    className="selection-title"
                    title={this.props.title}
                    subtitle={this.props.subtitle}
                    />
                <div className="selection-icon-container">
                    <Icon 
                        className={(this.props.iconClass != null) ? this.props.iconClass : ""}
                        style={(this.props.iconStyle != null) ? this.props.iconStyle : {}}/>
                </div>
            </Card>
        );
    }
}