import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import './index.css';

export default class Loading extends React.Component {  
    render() {
        return(
            <div className="loading">
                <CircularProgress
                    style={{display: (this.props.isLoading) ? "block" : "none"}}
                    size={80}
                    thickness={5}/>
            </div>
        );
    }
}