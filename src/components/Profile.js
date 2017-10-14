import React from 'react';
import axios from 'axios';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  // confirm user is authenticated
  // set initial state to empty user & pw
  // when page loads...
    // make req to DB to get username & pw
    // set state with response user & pw
  // render username & pw
  // render change buttons

  // if change is clicked
    // render form field & submit buttin to enter new
  // if new text value is submitted
    // make out req to DB & send back success msg


  // componentWillMount() {
  //   axios.get('/users')
  //     .then(data => {
  //       // console.log('returned data', );
  //       this.setState({
  //         firstName: ,
  //         lastName:
  //       });
  //       // console.log('state data after setState', );
  //     })
  //     .catch(error => {
  //       console.log('error getting user data');
  //     });
  // }

  render() {
    console.log(this.props);
    return (
      <div>
         username
        <br />
         password
      </div>
    );
  }
}

export default Profile;

// {this.state.firstName}
// {this.state.lastName}
