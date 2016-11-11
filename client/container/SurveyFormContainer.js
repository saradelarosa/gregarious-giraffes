import React from 'react';
import { Button, Col, Row, Grid, FormControl, FormGroup, ControlLabel, HelpBlock, Checkbox } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { submitForm } from '../actions/form';
import { browserHistory } from 'react-router';
import axios from 'axios';
import Select from 'react-select';


//FieldGroup returns a bootstrap form
const FieldGroup = ({ id, label, help, ...props }) => {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
};

const HOBBIES = [
  {label: 'Running', value: 'Running'},
  {label: 'Sniffing', value: 'Sniffing'},
  {label: 'Flying', value: 'Flying'},
  {label: 'Napping', value: 'Napping'},
  {label: 'Singing', value: 'Singing'},
  {label: 'Hunting', value: 'Hunting'},
  {label: 'Swimming', value: 'Swimming'},
  {label: 'Destroying things', value: 'Destroying things'},
  {label: 'Snuggling', value: 'Snuggling'},
  {label: 'Eating humans', value: 'Eating humans'},
  {label: 'Making Noise', value: 'Making Noise'},
  {label: 'Marking Territory', value: 'Marking Territory'},
  {label: 'Stealing Socks', value: 'Stealing Socks'}
];

//the Form component renders the survey form and sends the responses on submit as a json object to '/survey'
class SurveyForm extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
        dob: '',
        bloodType: '',
        season: '',
        trained: '',
        species: '',
        quote: '',
        options: HOBBIES,
        value: []
      }
      //pre-bind functions
      this.handleSubmit = this.handleSubmit.bind(this);
      this.onDobChange = this.onDobChange.bind(this);
      this.onBloodTypeChange = this.onBloodTypeChange.bind(this);
      this.onSeasonChange = this.onSeasonChange.bind(this);
      this.onTrainedChange = this.onTrainedChange.bind(this);
      this.onSpeciesChange = this.onSpeciesChange.bind(this);
      this.onQuoteChange = this.onQuoteChange.bind(this);
      this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    //submit action with all form data
    console.log(this.props.email, 'email');
    this.props.submitForm({
      dob: this.state.dob,
      bloodType: this.state.bloodType,
      season: this.state.season,
      trained: this.state.trained,
      hobbies: this.state.value,
      species: this.state.species,
      quote: this.state.quote,
      //hardcoding userId for testing---REFACTOR-------
      email: this.props.email
    });
    //redirect to imageUpload view

    //CHANGE THIS TO CONETEXT OR SOMETHING
    browserHistory.push('/imageUploader');
  }

  onDobChange(e) {
    this.setState({dob:e.currentTarget.value});
  }

  handleSelectChange(value) {
    console.log('You\'ve selected:', this.state.value);
    this.setState({value});
  }

  onBloodTypeChange(e) {
    this.setState({bloodType:e.currentTarget.value});
  }

  onSeasonChange(e) {
    this.setState({season:e.currentTarget.value});
  }

  onTrainedChange(e) {
    this.setState({trained:e.currentTarget.value});
  }

  onSpeciesChange(e) {
    this.setState({species: e.currentTarget.value});
  }

  onQuoteChange(e) {
    this.setState({quote:e.currentTarget.value});
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit} data-toggle='validator'>

        <FieldGroup
          id="formControlsDob"
          type="date"
          label="date of birth"
          required='true'
          value={this.state.dob}
          onChange={this.onDobChange}
        />

        <FormGroup
          controlId="formControlsSelect" >
          <ControlLabel>Select Blood Type</ControlLabel>
          <select noValidate value={this.state.bloodType} onChange={this.onBloodTypeChange} className='selectpicker' title="warm or cold?" data-max-options="1" required='true'>
            <option value="Cold">Cold</option>
            <option value="Warm">Warm</option>
          </select>
        </FormGroup>

        <FormGroup controlId="formControlsSelect" >
          <ControlLabel>Select Favorite Season</ControlLabel>
          <select noValidate value={this.state.season} onChange={this.onSeasonChange} className='selectpicker season' title="favorite season" data-max-options="1" required='true'>
            <option value="spring">Spring</option>
            <option value="summer">Summer</option>
            <option value="Autumn">Autumn</option>
            <option value="Winter">Winter</option>
          </select>
        </FormGroup>

        <FormGroup controlId="formControlsSelect" >
          <ControlLabel>Are you House Trained?</ControlLabel>
          <select noValidate value={this.state.trained} onChange={this.onTrainedChange} className='selectpicker' title="yes or no" data-max-options="1" required='true'>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </FormGroup>

        <FormGroup>
          <Select multi simpleValue disabled={this.state.disabled} value={this.state.value}
                  placeholder="Select your hobbies" options={this.state.options}
                  onChange={this.handleSelectChange}/>
        </FormGroup>


        <FormGroup controlId="formControlsSelectMultiple" >
          <ControlLabel>Select your Species</ControlLabel>
          <select noValidate value={this.state.species} onChange={this.onSpeciesChange} className='selectpicker' title="search or select" data-max-options="1" data-live-search="true" required='true'>
            <option value="giraffe">Giraffe, Giraffa camelopardalis</option>
            <option value="dog">Dog, Canis lupus familiaris</option>
            <option value="cat">Cat, Felis silvestris catus</option>
            <option value="sheep">Sheep, Ovis aries</option>
            <option value="pig">Pig, Sus scrofa domesticus</option>
            <option value="goat">Goat, Capra aegagrus hircus</option>
            <option value="cow">Cow, Bos taurus</option>
            <option value="chicken">Chicken, Gallus gallus domesticus</option>
            <option value="duck">Duck, Anas platyrhynchos domesticus</option>
            <option value="horse">Horse, Equus ferus caballus</option>
            <option value="goldfish">Goldfish, Carassius auratus auratus</option>
            <option value="koi">Koi, Cyprinus carpio haematopterus</option>
            <option value="hedgehog">Hedgehog, Atelerix albiventris</option>
            <option value="camel">Camel, Camelus dromedarius</option>
          </select>
        </FormGroup>

        <FormGroup controlId="formControlsTextarea" >
          <ControlLabel>Enter your favorite quote</ControlLabel>
          <FormControl value={this.state.quote} onChange={this.onQuoteChange} componentClass="textarea" placeholder="'Nature teaches beasts to know their friends.'
          -William Shakespeare" required='true' />
        </FormGroup>

        <Button type="submit">
          Submit
        </Button>

      </form>
    )
  }
}

function mapStateToProps(state) {
  return { email: state.email }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({submitForm}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SurveyForm);
