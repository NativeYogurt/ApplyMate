import React from 'react';
import axios from 'axios';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    fetch('/api/findUser', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: this.props.userId }),
    })
      .then((res) => {
        return res.json();
        console.log(res);
      })
      .then((data) => {
        this.setState({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
        });
      })
      .catch(error => console.log('error getting data'));
  }

  updateUser(user) {
    console.log(user);
    axios.put('api/updateUser/', {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
    })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.updateUser;
    this.updateUser({
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      email: form.email.value,
    });
    // clear the form for the next input
    form.firstName.value = '';
    form.lastName.value = '';
    form.email.value = '';
  }

  render() {
    return (
      <div className="user-profile">
        <h3>Hello, {this.state.firstName} {this.state.lastName}!<br />{this.state.email}</h3>
        <br />

        <strong>Update Your Info:</strong><br />
        <form name="updateUser" onSubmit={this.handleSubmit}>
          <label htmlFor="firstName">
            First Name:
            <input type="text" name="firstName" />
          </label>
          <br />
          <label htmlFor="firstName">
            Last Name:
            <input type="text" name="lastName" />
          </label>
          <br />
          <label htmlFor="email">
            Email:
            <input type="text" name="email" />
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default Profile;
