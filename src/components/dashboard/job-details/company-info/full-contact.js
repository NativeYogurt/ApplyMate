import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';


class FullContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: this.props.companyUrl,
      data: { ranks: [] },
    };
    this.fullContactApiCall = this.fullContactApiCall.bind(this);
  }

  componentDidMount() {
    this.fullContactApiCall();
  }

  fullContactApiCall() {
    axios.post('/api/fullContact', { searchTerm: this.state.searchTerm })
      .then(data => {
        this.setState({
          data: data.data,
        });
      });
  }

  render() {
    return (
      <div id="FullContactComponent">
        {!this.state.data.name ? (<div className="centerText" > This company is not on Full Contact </div>
        ) : (
          <div>
            <div className="centerText">{this.state.data.name}</div>
            <img src="/imgs/Founded.png" alt="Founded" />&nbsp;&nbsp; Founded in  {this.state.data.founded}, currently with {this.state.data.employees} Employees. &nbsp;&nbsp;<img src="/imgs/Employees.png" alt="Employees" /> <br />
            {this.state.data.overview} <br />
            {this.state.data.LinkedIn ? (<div> <img src="/imgs/LinkedIn.png" alt="Employees" /> {' '}LinkedIn: <a href={this.state.data.LinkedIn} > {this.state.data.LinkedIn} </a></div>) : (null)}
            {this.state.data.AngelList ? (<div> <img src="/imgs/AngelList.png" alt="Employees" /> {' '} AngelList: <a href={this.state.data.AngelList} > {this.state.data.AngelList} </a></div>) : (null)}
            {this.state.data.Facebook ? (<div> <img src="/imgs/Facebook.png" alt="Employees" /> {' '} Facebook: <a href={this.state.data.Facebook} > {this.state.data.Facebook} </a></div>) : (null)}
            {this.state.data.GooglePlus ? (<div> <img src="/imgs/GooglePlus.png" alt="Employees" /> {' '} GooglePlus: <a href={this.state.data.GooglePlus} > {this.state.data.GooglePlus} </a></div>) : (null)}
            {this.state.data.Klout ? (<div> <img src="/imgs/Klout.png" alt="Employees" /> {' '} Klout: <a href={this.state.data.Klout} > {this.state.data.Klout} </a></div>) : (null)}
            {this.state.data.CrunchBase ? (<div> <img src="/imgs/CrunchBase.png" alt="Employees" /> {' '} CrunchBase: <a href={this.state.data.CrunchBase} > {this.state.data.CrunchBase} </a></div>) : (null)}
            {this.state.data.Owler ? (<div> <img src="/imgs/Owler.png" alt="Employees" /> {' '} Owler: <a href={this.state.data.Owler} > {this.state.data.Owler} </a></div>) : (null)}
            <img src="/imgs/chart.png" alt="Traffic Rankings" /> Traffic Rankings: &nbsp; &nbsp;
            {this.state.data.globalRanking ? (<span><img src="/imgs/globe.png" alt="Global:" /> &nbsp;&nbsp; #{this.state.data.globalRanking}  </span>) : (null)} &nbsp;&nbsp;&nbsp;
            {this.state.data.usRanking ? (<span><img src="/imgs/USA.png" alt="USA: " />  &nbsp;&nbsp; #{this.state.data.usRanking}  </span>) : (null)}
          </div>
        )}
      </div>
    );
  }
}
{ /* <pre><code>{JSON.stringify(this.state.data, null, 4)}</code></pre> */ }
FullContact.propTypes = {
  companyUrl: PropTypes.string.isRequired,
};
export default FullContact;
