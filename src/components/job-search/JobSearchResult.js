import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Col, Row } from 'react-materialize';

class JobSearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      added: false,
    };
  }
  render() {
    return (
      <Col m={6} s={6}>
        <Card>
          <div>Job Title: {this.props.job.title}</div>
          <div>Company: {this.props.job.company}</div>
          <div>Location: {this.props.job.location}</div>
          <div>Company URL: <a href={this.props.job.company_url} target="_blank">Link</a></div>
          <div>Created at: {this.props.job.created_at}</div>
          <div><a href={this.props.job.url} target="_blank">Job Post</a></div>
          <div>
            <Button
              onClick={() => {
                this.props.handleJobAdd(this.props.job);
                Materialize.toast('Job application saved!', 4000);
                this.setState({
                  added: true,
                });
              }}
              disabled={this.state.added}
            >Add to Dashboard
            </Button>
          </div>
          <br />
        </Card>
      </Col>
    );
  }
}

JobSearchResult.propTypes = {
  company: PropTypes.string.isRequired,
};

export default JobSearchResult;
