import React from 'react';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      resume: ''
    };
  }

  componentDidMount() {
    fetch('/api/user', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: this.props.userId }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => console.log('get result', data));
  }

  render() {
    return (
      <div className="user-profile">
        <p>STATIC USER INFO HERE</p>
        <strong>Update Your Info:</strong><br />
        <form>
          <label>First Name</label><br />
          <input type="text" name="firstName" /><input type="submit" value="Submit" /><br />
          <label>Change Last Name</label><br />
          <input type="text" name="lastName" /><input type="submit" value="Submit" /><br />
          <label>Change Email</label><br />
          <input type="text" name="email" /><input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Profile;
