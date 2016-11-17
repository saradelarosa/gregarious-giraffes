import React, { Component } from 'react';
import { Button, Panel } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { showEvent } from '../../actions/eventForm';

class EventInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.props.showEvent(this.props.event[0].id, this.props.id);
    }

    componentWillUpdate(nextProps, nextState) {
        console.log(nextProps, "Props for EVENT ON PROFILE", nextState);
    }

    render() {
      return(
        <div className="events-div">
            <Button className="events-btn" bsStyle="success" onClick={ ()=> this.setState({ open1: !this.state.open1 })}>
            View Events
            </Button>
            <Panel collapsible expanded={this.state.open1}>
            <Panel header="Madison Square Park" bsStyle="success">
                <h2>Location: </h2>
            </Panel>
            <Panel header="Central Park" bsStyle="success">
                There is an Event in Central  Park.
                Wednesday Novermber 20, 2016 at 9:00am
            </Panel>
            </Panel>
        </div>
      )
    }
}

function mapStateToProps(state) {
    return {
        email: state.reducers.isAuthorized.email,
        name: state.reducers.isAuthorized.name,
        id: state.reducers.isAuthorized.id,
        event: state.reducers.eventForm.events,
        userEvent: state.reducers.eventForm.userEvents
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({showEvent}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventInfo);

