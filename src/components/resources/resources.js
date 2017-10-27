import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'react-materialize';

import SavedResources from './SavedResources';

class Resources extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      savedResources: [],
    };
    this.getResources = this.getResources.bind(this);
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
  deleteResource(resourceId) {
    const resources = this.state.savedResources.filter(resource =>
      resource.resourceId !== resourceId);
    this.setState({
      savedResources: resources,
    });
    axios.put('/api/resource/delete', { resourceId });
  }
  render() {
    return (
      <div className="container">
        <h5>Your Saved Resources</h5>
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
};
export default Resources;
