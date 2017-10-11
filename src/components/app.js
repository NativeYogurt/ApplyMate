import React from 'react';
import axios from 'axios';
import Resume from './resumeUpload';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.readPDF = this.readPDF.bind(this);
  }

  readPDF(event) {
    const reader = new FileReader();
    console.log(this);
    reader.onload = () => {
      const { result } = reader;
      axios.post('/api/resume', {
        result,
      });
    };
    reader.readAsBinaryString(event.target.files[0]);
  }

  render() {
    return (<Resume readPDF={this.readPDF} />);
  }
}

export default App;
