import React from 'react';
import './index.css';
import Selection from '../selection/selection';

export default class DisplayData extends React.Component {
    render() {
        //Create two lists of display data
        let list = Object.keys(this.props.listContent).map((key, index) => <li key={index}>{key + ": " + this.props.listContent[key]}</li>);
        let secondList = list.splice(Math.ceil(list.length/2), Math.floor(list.length/2));
        //Create children selections
        let selections = this.createSelections(this.props.children);
        return(
            <div>
                <div className={"display-data-container"}>
                    <div className={"data-list-container"}>
                        <ul className={"data-list"}>
                            {list}
                        </ul>
                    </div>
                    <div className={"data-list-container"}>
                        <ul className={"data-list"}>
                            {secondList}
                        </ul>
                    </div>
                </div>
                <div className={"data-btn"}>
                    {selections}
                </div>
            </div>
        );
    }

    createSelections(children) {
        return children.map((child, index) => (
            <Selection
                key={index}
                style={style.selection}
                title={child.subtitle}
                subtitle={child.subtitle}
                icon={child.icon}
                iconStyle={style.icon}
                type={child.type}
                onClick={(type) => this.props.onClick(this.props.listContent.id, type)}/>
        ))
    }
}

const style={
    selection: {
        minHeight: "100%",
        maxWidth: "75%",
        padding: "0 6%",
        paddingBottom: "3%",
        flex: "0 1 32%",
        textAlign: "center"
    },
    icon: {
        height: "3em",
        width: "3em"
    }
}