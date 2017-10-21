import React from 'react';
import { Link } from 'react-router-dom';

class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <div>
        <Link to="/home/dashboard/:id/contacts/new">Add</Link>
      </div>
    );
  }
}

export default Contacts;
