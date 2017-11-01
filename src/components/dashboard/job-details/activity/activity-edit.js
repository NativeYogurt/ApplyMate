import React from 'react';
import { Row, Col, Icon, Button, Input } from 'react-materialize';
import { Link } from 'react-router-dom';

import Error from '../../errorBanner';

class ActivityEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventType: '',
      eventDate: '',
      eventTime: '',
      eventParticipates: '',
      jobId: '',
      errorMessage: null,
    };
    this.submit = this.submit.bind(this);
    this.onChangeEventType = this.onChangeEventType.bind(this);
    this.onChangeEventDate = this.onChangeEventDate.bind(this);
    this.onChangeEventTime = this.onChangeEventTime.bind(this);
    this.onChangeEventParticipates = this.onChangeEventParticipates.bind(this);
  }
  componentDidMount() {
    this.loadEvent();
  }
  onChangeEventType(e) {
    this.setState({ eventType: e.target.value });
  }
  onChangeEventDate(e) {
    this.setState({ eventDate: e.target.value });
  }
  onChangeEventTime(e) {
    this.setState({ eventTime: e.target.value });
  }
  onChangeEventParticipates(e) {
    this.setState({ eventParticipates: e.target.value });
  }
  loadEvent() {
    fetch(`/api/activities/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          eventType: data.eventType,
          eventDate: data.eventDate,
          eventTime: data.eventTime,
          eventParticipates: data.eventParticipates,
          jobId: data.jobId,
        });
      });
  }
  submit(e) {
    e.preventDefault();
    if (!this.state.eventType) {
      this.setState({
        errorMessage: 'Please select event type',
      });
      return;
    }
    if (!this.state.eventDate) {
      this.setState({
        errorMessage: 'Please enter event date',
      });
      return;
    }
    if (!this.state.eventTime) {
      this.setState({
        errorMessage: 'Please enter event time',
      });
      return;
    }
    const event = {
      eventType: this.state.eventType,
      eventDate: this.state.eventDate,
      eventTime: this.state.eventTime,
      eventParticipates: this.state.eventParticipates,
    };

    fetch(`/api/activities/${this.props.match.params.id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    }).then(res => res.json())
      .then(data => {
        this.setState({
          errorMessage: null,
        });
        window.history.back();
      });
  }
  render() {
    return (
      <div>
        <form className="event-form" onSubmit={this.submit}>
          <Row>
            <Input s={12} label="Event Type" type="select" name="eventType" value={this.state.eventType} onChange={this.onChangeEventType}>
              <option value="phoneCall">Phone Call</option>
              <option value="interview">Interview</option>
            </Input>
            <Col s={6}>
              <label className="active" htmlFor="eventDate">
                When
                <input type="date" name="eventDate" value={this.state.eventDate} onChange={this.onChangeEventDate} />
              </label>
            </Col>
            <Col s={6}>
              <label className="active" htmlFor="eventTime">
                Event Time
                <input type="time" name="eventTime" value={this.state.eventTime} onChange={this.onChangeEventTime} />
              </label>
            </Col>
            <Col s={12}>
              <label className="active" htmlFor="eventParticipates">
                Who is participating?
                <input type="text" name="eventParticipates" value={this.state.eventParticipates} onChange={this.onChangeEventParticipates} />
              </label>
            </Col>
          </Row>
          <Button type="submit">Save</Button>
          <span className="btn-space">
            <Link className="waves-effect waves-light btn" to={`/home/dashboard/${this.state.jobId}/activity`}>Cancel</Link>
          </span>
        </form>
        <Error error={this.state.errorMessage} />
      </div>
    );
  }
}
export default ActivityEdit;
