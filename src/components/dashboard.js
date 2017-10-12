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
    this.addJob = this.addJob.bind(this);
  }
  addJob(job) {
    console.log('new job',job);
    fetch('/api/job', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(job)
		}).then(function(res){ return res.json(); })
			.then(function(data){
        console.log('post result', data);
	});
  }
  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.jobAdd;
    this.addJob({
      company: form.company.value,
      jobTitle: form.jobtitle.value,
      description: form.description.value,
      url: form.url.value,
      skills: [],
      userId: this.props.userId,
    });
    // clear the form for the next input
    form.company.value = '';
    form.jobtitle.value = '';
    form.description.value = '';
    form.url.value = '';
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
