import React from 'react';
import { Row, Col, Icon, Button, Input } from 'react-materialize';

class ActivityAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventType: '',
      eventDate: '',
      eventTime: '',
      eventParticipates: '',
    };
    this.submit = this.submit.bind(this);
    this.onChangeEventType = this.onChangeEventType.bind(this);
    this.onChangeEventDate = this.onChangeEventDate.bind(this);
    this.onChangeEventTime = this.onChangeEventTime.bind(this);
    this.onChangeEventParticipates = this.onChangeEventParticipates.bind(this);
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
  submit(e) {
    e.preventDefault();
    const newEvent = {
      eventType: this.state.eventType,
      eventDate: this.state.eventDate,
      eventTime: this.state.eventTime,
      eventParticipates: this.state.eventParticipates,
      jobId: this.props.jobId,
      userId: this.props.userId,
    };

    fetch('/api/activities', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEvent),
    }).then(res => res.json())
      .then((data) => {
        this.setState({
          eventType: '',
          eventDate: '',
          eventTime: '',
          eventParticipates: '',
        });
      });
  }
  render() {
    return (
      <div>
        <form className="event-form" onSubmit={this.submit}>
          <Row>
            <Input s={12} label="Event Type" type="select" name="eventType" defaultValue="phoneCall" value={this.state.eventType} onChange={this.onChangeEventType}>
              <option value="phoneCall">Phone Call</option>
              <option value="interview">Interview</option>
            </Input>
            <Input s={6} label="Event Date" type="date" name="eventDate" value={this.state.eventDate} onChange={this.onChangeEventDate} />
            <Input s={6} label="Event Time" type="time" name="eventTime" value={this.state.eventTime} onChange={this.onChangeEventTime} />
            <Input s={12} label="Who is participating?" type="text" name="eventParticipates" value={this.state.eventParticipates} onChange={this.onChangeEventParticipates} />
          </Row>
          <Button type="submit">Save</Button>
        </form>
      </div>
    );
  }
}
export default ActivityAdd;
