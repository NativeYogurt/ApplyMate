import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import SkillEntry from './skillentry';
import SavedResources from './SavedResources';

class Resources extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      userSkills: [],
      missingSkills: [],
      savedResources: [],
    };
    this.addResource = this.addResource.bind(this);
    this.getResources = this.getResources.bind(this);
    this.checkResource = this.checkResource.bind(this);
    this.deleteResource = this.deleteResource.bind(this);
  }
  componentDidMount() {
    this.getResources();
  }
  getResources() {
    axios.get('/api/resource', {
      params: {
        userId: this.props.userId,
      },
    })
      .then(resources => {
        // console.log('saved resource', resources.data);
        this.setState({
          savedResources: resources.data,
        });
      })
      .catch(err => console.error(err));
  }
  addResource(resource) {
    fetch('/api/resource', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resource),
    }).then(res => res.json())
      .then((data) => {
        console.log('post resource', data);
        const newResource = data;
        const savedResources = this.state.savedResources.concat(newResource);
        this.setState({ savedResources });
      });
  }
  checkResource(resourceTitle, savedResources) {
    if (savedResources) {
      for (let i = 0; i < savedResources.length; i++) {
        if (savedResources[i].tutorialTitle === resourceTitle) {
          return true;
          break;
        }
      }
    }
    return false;
  }
  deleteResource(resourceId) {
    const resources = this.state.savedResources.filter(resource => resource.resourceId !== resourceId);
    this.setState({
      savedResources: resources,
    });
    axios.put('/api/resource/delete', { resourceId });
  }
  render() {
    const hasMissingSkills = (
      <div className="alert">
        You are missing the following skills required by the job.
      </div>
    );
    const noMissingSkills = (
      <div className="alert">
        You have all the skills required by the job.
      </div>
    );
    return (
      <div>
        {this.props.missingSkills.length ? hasMissingSkills : noMissingSkills}
        <div className="skill-list">
          {this.props.missingSkills.map(skill =>
            (<SkillEntry
              key={skill}
              skill={skill}
              addResource={this.addResource}
              userId={this.props.userId}
              savedResources={this.state.savedResources}
              checkResource={this.checkResource}
            />))}
        </div>
        <h2>Your Saved Resources</h2>
        {this.state.savedResources.length > 0 ? this.state.savedResources.map(resource => {
          return (<SavedResources
            key={resource.resourceId}
            resource={resource}
            deleteResource={this.deleteResource}
          />);
        }) : null}
      </div>
    );
  }
}
Resources.propTypes = {
  userId: PropTypes.string.isRequired,
  missingSkills: PropTypes.array.isRequired,
};
export default Resources;
