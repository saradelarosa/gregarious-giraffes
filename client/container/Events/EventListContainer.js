import React from 'react';
import { OverlayTrigger, Popover, Button, Col, Row, Grid, FormGroup, FormControl, ControlLabel, Navbar } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { getEvent, attendEvent, searchEventsByUserName, searchEventsByEventName } from '../../actions/eventForm';
import { connect } from 'react-redux';
import axios from 'axios';
import SimpleMapPage from '../Features/MapContainer';
import { toastr } from 'react-redux-toastr';



class EventList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            event: '',
            eventName: '',
            userName: ''
        }
    }

    componentDidMount() {
        this.props.getEvent();
        // this.props.attendEvent();  //I think this was causing issues it does not seem neccessary, how was it  workin if attendEvents needs  user and event Id?
    }

    attend(e) {
        let user_id = this.props.id; //this is the id of signed in user
        let event_id = e.currentTarget.getAttribute('data-eventID');
        this.props.attendEvent(event_id, user_id)
            .then((data) => {
                console.log('success on adding an event!!!!')
            })
            .catch((err) => console.log(err));
    }



    // called as soon as the the shouldComponentUpdate returned true. Any state changes via this.setState are not allowed as this method should be strictly used to prepare for an upcoming update not trigger an update itself.
    componentWillUpdate(nextProps, nextState) {
        // perform any preparations for an upcoming update
        console.log(nextProps, "props++++++state for EVENT LIST", nextState);
    }

    handleUserNameChange(e) {
      console.log(e.currentTarget.value, "val in andle user or event change");
      this.props.searchEventsByUserName(e.currentTarget.value);

    }

    handleEventNameChange(e) {
      console.log(e.currentTarget.value, "val in andle user or event change");
      this.props.searchEventsByEventName(e.currentTarget.value);
    }

    render() {
        let $data = null;

        if (this.props.event) {
            let eventList = this.props.event;
            console.log(this.attend, 'this.attend');
            $data = (
                <div className="eventList">
                    <Grid>
                        <Row>
                            <Col xs={12}>
                                    {
                                        eventList.map(function(e, i) {
                                            return (
                                                <div className="demo-card">
                                                    <div className="card card-inverse card-primary text-center">
                                                        <div className="card-block">
                                                            <blockquote className="card-blockquote">
                                                                <h2>{e.name}</h2>
                                                                <h4>Location: {e.location}</h4>
                                                                <p>
                                                                    <OverlayTrigger trigger="click" overlay={
                                                                            <Popover id="modal-popover" title="map">
                                                                                <div><SimpleMapPage place={e.coordinates} address={e.address} name={e.location}/></div>
                                                                            </Popover>}>
                                                                        <a style={{'color':'white'}} href="#">{e.address} <span style={{'fontSize': '10px'}}>click to view on map</span></a>
                                                                    </OverlayTrigger>
                                                                </p>
                                                                <h4>Time: {e.time}</h4>
                                                                <h4>Date: {e.date}</h4>
                                                                <p>Food Options? {e.eating}</p>
                                                                <p>Any Danger? {e.danger}</p>
                                                                <p>Animals in Attendance: {e.animals}</p>
                                                                <Button
                                                                    className="events-btn"
                                                                    bsStyle="success"
                                                                    onClick={(e) => {
                                                                    this.attend(e)
                                                                    toastr.success('Event Success!', `You added the event`);
                                                                    setTimeout(() => {this.close()}, 2500)
                                                                    }}

                                                                    data-eventID={e.id}
                                                                    data-index={i}>
                                                                    Attend Event
                                                                </Button>

                                                            </blockquote>
                                                        </div>
                                                    </div>
                                                </div>

                                            )
                                        }, this)
                                    }
                            </Col>
                        </Row>
                    </Grid>
                </div>
            );
        } else {
            $data = (<div>Please GET SOME PROPS</div>);
        }
        return (
            <div className="eventList">
                <h3>List of Events</h3>
                <FormGroup controlId="formControlsTextarea">
                    <ControlLabel>Search by the name of the event</ControlLabel>
                    <FormControl
                      onChange={(e) => {this.handleEventNameChange(e)}}
                      componentClass="input"
                      placeholder="Event Name"
                      required='true'/>
                </FormGroup>
                <FormGroup controlId="formControlsTextarea">
                    <ControlLabel>Search by who is attending the event</ControlLabel>
                    <FormControl
                       onChange={(e) => {this.handleUserNameChange(e)}}
                       componentClass="input"
                       placeholder="Event Name"
                       required='true'/>
                </FormGroup>
                {this.props.searchedEvents.map((e, i) => {
                  return(
                    <div className="demo-card">
                        <div className="card card-inverse card-primary text-center">
                            <div className="card-block">
                                <blockquote className="card-blockquote">
                                    <h2>{e.name}</h2>
                                    <h4>Location: {e.location}</h4>
                                    <p>
                                        <OverlayTrigger trigger="click" overlay={
                                                <Popover id="modal-popover" title="map">
                                                    <div><SimpleMapPage place={e.coordinates} address={e.address} name={e.location}/></div>
                                                </Popover>}>
                                            <a style={{'color':'white'}} href="#">{e.address} <span style={{'fontSize': '10px'}}>click to view on map</span></a>
                                        </OverlayTrigger>
                                    </p>
                                    <h4>Time: {e.time}</h4>
                                    <h4>Date: {e.date}</h4>
                                    <p>Food Options? {e.eating}</p>
                                    <p>Any Danger? {e.danger}</p>
                                    <p>Animals in Attendance: {e.animals}</p>
                                    <Button
                                        className="events-btn"
                                        bsStyle="success"
                                        onClick={(e) => {
                                        this.attend(e)
                                        toastr.success('Event Success!', `You added the event`);
                                        setTimeout(() => {this.close()}, 2500)
                                        }}

                                        data-eventID={e.id}
                                        data-index={i}>
                                        Attend Event
                                    </Button>

                                </blockquote>
                            </div>
                        </div>
                    </div>
                  )
                }, this)}
                {$data}
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        email: state.reducers.isAuthorized.email,
        name: state.reducers.isAuthorized.name,
        id: state.reducers.isAuthorized.id,
        event: state.reducers.eventForm.events,
        searchedEvents: state.reducers.eventForm.searchedEvents
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getEvent, attendEvent, searchEventsByUserName, searchEventsByEventName}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EventList);
