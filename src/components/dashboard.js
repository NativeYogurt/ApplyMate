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
    return (
      <div>
        <h2>Add a new job</h2>
        <form name="jobAdd" onSubmit={this.handleSubmit}>
          <label htmlFor="company">
            Company:
            <input type="text" name="company" />
          </label>
          <label htmlFor="jobtitle">
            Job Title:
            <input type="text" name="jobtitle" />
          </label>
          <label htmlFor="description">
            Description:
            <input type="text" name="description" />
          </label>
          <label htmlFor="url">
            URL:
            <input type="text" name="url" />
          </label>
          <input type="submit" value="Add" />
        </form>
      </div>);
  }
}

export default Dashboard;
