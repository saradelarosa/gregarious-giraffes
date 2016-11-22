import React, { Component } from 'react';
import { ListGroup, ListGroupItem, ButtonToolbar, ControlLabel, Popover, OverlayTrigger, Modal, ButtonGroup, DropdownButton, MenuItem, Button, Col, Row, Grid, FormGroup, FormControl, Thumbnail, Carousel } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { addFriend, setCurrentFriend } from '../../../actions/friends';
import axios from 'axios';
import {toastr} from 'react-redux-toastr';

//FriendSearch renders a dropdown menu and a button that loads 10 users with the option to load the next ten
//if the next ten exceed the number of users in the db then the users being fetched starts from the beginning
//when a user clicks on a user they have the option of viewing their profile or friending them
class FriendSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectedUser: {},
      userOptions: [],
      name: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  //when text is changed a request goes to db to see if mathcing name is there, appears like a live update
  handleChange(name) {
    axios.get('/api/users/search?name=' + name.currentTarget.value)
      .then((data) => this.setState({userOptions:data.data}))
      .catch((err)=> console.log(err));
    this.setState({name: name.currentTarget.value});
  }

  friendOrViewProfile(e) {
    //add more data attributes and get them here if you want more user info to appear in the modal
      let email = e.currentTarget.getAttribute('data-email');
      let name = e.currentTarget.getAttribute('data-name');
      let image = e.currentTarget.getAttribute('data-image');
      let index = e.currentTarget.getAttribute('data-index')
      this.setState({
        selectedUser:{email: email, name: name, image: image},
        open: true
      })
      let selectedUser = this.state.userOptions[index];
      this.props.setCurrentFriend(selectedUser);
  }

  friend() {
    let email = this.state.selectedUser.email; //person being friended
    let id = this.props.id; //id of signed in user
    if(email === this.props.email && this.state.selectedUser.name === this.props.name) {
      toastr.warning('Uh Oh!', `You can't friend yourself, please select a different user`);
      return null;
    }
    //dispatch action to add a friend
    this.props.addFriend(id, email)
      .catch((err) => console.log(err));//add error handling for if already friended
    toastr.success('Friended Success!', `You friended ${this.state.selectedUser.name}`);
  }

  viewProfile() {
    browserHistory.push('/friendProfile')
  }

  close() {
    this.setState({ open: false });
  }

  open() {
    this.setState({ open: true });
  }

    render() {
      const popover = (
        <Popover id="modal-popover" title="ProfilePic">
        <img src={this.state.selectedUser.image} />
        </Popover>
      );
        return (
            <div className="FriendSearch">
                <h1 className="section_title">Search For Friends</h1>
                <Modal show={this.state.open} onHide={() => {this.close()}}>
                    <Modal.Header closeButton>
                        <Modal.Title>What would you like to do?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Username:</h4><p><OverlayTrigger overlay={popover}><a href="#">{this.state.selectedUser.name}</a></OverlayTrigger></p>
                        <h4>Email:</h4><p>{this.state.selectedUser.email }</p>
                        {/* <h4>Species:</h4><p>{this.state.selectedUser.species }</p>
                        <h4>Hobbies:</h4><p>{this.state.selectedUser.hobbies }</p>
                        <h4>BooldType:</h4><p>{this.state.selectedUser.bloodType }</p>
                        <h4>Quote:</h4><p>{this.state.selectedUser.quote }</p> */}
                    </Modal.Body>
                    <Modal.Footer>
                        <h5>Keep on Smiling!</h5>
                        <Button onClick={() => {this.close()}}>Close</Button>
                        <Button onClick={() => {this.viewProfile()}}>View Profile</Button>
                        <Button
                          onClick={() => {this.friend();
                                          setTimeout(() => {this.close()}, 3000)
                                  }}> Friend
                        </Button>
                   </Modal.Footer>
                </Modal>

                <FormGroup controlId="formControlsTextarea">
                    <FormControl value={this.state.name}
                                 onChange={this.handleChange}
                                 componentClass="input"
                                 placeholder="Name"
                                 required='true'/>
                </FormGroup>
                    <ListGroup>
                        {this.state.userOptions.map((user, i)=> (
                            <ListGroupItem onClick={(e) => {this.friendOrViewProfile(e)}}
                                href="#"
                                data-email={user.email}
                                data-name={user.name}
                                data-image={user.image}
                                data-index={i}
                                eventKey={i}  >
                                name: {user.name}, email: {user.email}, species: {user.species}
                            </ListGroupItem>
                        ))}
                    </ListGroup>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        user: state.reducers.isAuthorized,
        email: state.reducers.isAuthorized.email,
        id: state.reducers.isAuthorized.id,
        name: state.reducers.isAuthorized.name
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({addFriend, setCurrentFriend}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendSearch);
