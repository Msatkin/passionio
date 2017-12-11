import React, { Component } from 'react';
import './App.css';
//Redux
import {connect} from 'react-redux'; 
import {bindActionCreators} from 'redux';
import * as tabActions from './actions/tabActions';
import * as appActions from './actions/appActions';
//Components
import AppBar from 'material-ui/AppBar';
import Selection from './components/selection/selection';
import SearchViewer from './components/tabs/searchViewer';
import {Tabs, Tab} from 'material-ui/Tabs';
import Loading from './components/loading/loading';
//Icons
import NavigationClose from 'material-ui/svg-icons/navigation/arrow-back';
import ActionHome from 'material-ui/svg-icons/action/home';
import IconButton from 'material-ui/IconButton';
import UserIcon from 'material-ui/svg-icons/action/account-circle';
import CourseIcon from 'material-ui/svg-icons/social/school';
import ChapterIcon from 'material-ui/svg-icons/action/speaker-notes';

class App extends Component {
  render() {
    let activeTab = this.props.tabs.filter((tab) => (tab.active));
    let tabElements = this.createTabs(this.props.tabs);
    return (
      <div className="App">
        <Loading className="loading" isLoading={this.props.app.isLoading}/>
          <div>
            <AppBar
              title={(activeTab.length > 0) ? "Return Home" : "Passion.io Search"}
              titleStyle={{textAlign: "left", cursor: "pointer"}}
              onTitleClick={this.handleTitleClick.bind(this)}
              iconElementLeft={(activeTab.length > 0) ?
                <IconButton onClick={this.handleTitleClick.bind(this)}>
                  <NavigationClose />
                </IconButton>
                : 
                <IconButton><ActionHome /></IconButton>}/>
            <div>
              {(activeTab.length > 0) ?
                <Tabs className="tabs" value={activeTab[0].title}>
                  {tabElements}
                </Tabs>
              :
                <div className="flex-row selection-container">
                    <Selection title="Users" subtitle="Search Through Users" icon={UserIcon} iconStyle={style.largeIcon} type="user" onClick={this.props.tabActions.createTab}/>
                    <Selection title="Courses" subtitle="Search Through Courses" icon={CourseIcon} iconStyle={style.largeIcon} type="course" onClick={this.props.tabActions.createTab}/>
                    <Selection title="Chapters" subtitle="Search Through Chapters" icon={ChapterIcon} iconStyle={style.largeIcon} type="chapter" onClick={this.props.tabActions.createTab}/>
                </div>
              }
            </div>
          </div>
      </div>
    );
  }

  handleTitleClick() {
    this.props.tabActions.clearTabs();
  }
  //Creates tabs
  createTabs(tabs) {
    return tabs.map((tab, index) => {
      let Icon = tab.icon;
      return (
        <Tab
          key={index}
          value={tab.title}
          icon={<Icon />}
          label={(tab.parent.name != null) ? tab.parent.name + "'s " + tab.title: tab.title}
          onActive={() => this.props.tabActions.activateTab(tab.title)}>
          
          <SearchViewer
            key={index}
            content={tab}
            onSearch={this.props.tabActions.searchTab}
            onPageChange={this.props.tabActions.gotoPage}
            createChild={this.props.tabActions.createTab}
            />
        </Tab>);
      });
  }
}

function mapStateToProps(state, ownProps) {
  return {
      tabs: state.tabs,
      app: state.app
  }
}

function mapDispatchToProps(dispatch) {  
  return {
    tabActions: bindActionCreators(tabActions, dispatch),
    appActions: bindActionCreators(appActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

const style = {
  largeIcon: {
    height: "5em",
    width: "5em"
  }
}