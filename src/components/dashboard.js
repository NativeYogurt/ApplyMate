import React from 'react';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      company: '',
      jobtitle: '',
      description: '',
      url: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    var form = document.forms.jobAdd;
    alert('form submitted', form.company.value);
  }
  render() {
    console.log('dashboard');

    return (
      <div>
        <h2>Add a new job</h2>
        <form name="jobAdd" onSubmit={this.handleSubmit}>
          <label htmlFor="company">
            Company:
            <input type="text" name="company" />
          </label>
          <br />
          <label htmlFor="jobtitle">
            Job Title:
            <input type="text" name="jobtitle" />
          </label>
          <br />
          <label htmlFor="description">
            Description:
            <input type="text" name="description" />
          </label>
          <br />
          <label htmlFor="url">
            URL:
            <input type="text" name="url" />
          </label>
          <br />
          <input type="submit" value="Add" />
        </form>
      </div>);
  }
}

export default Dashboard;
