import React from 'react';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
    };
  }



  render() {
    return (
      <div className="user-profile">
        Test
      </div>
    );
  }
}

export default Profile;
