import React from 'react';
import $ from 'jquery';
import TutorialListEntry from './TutorialListEntry.js';

class TutorialList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tutorials: [],
    };
    this.getTutorials = this.getTutorials.bind(this);
  }
  componentDidMount() {
    this.getTutorials(this.props.skill);
  }
  getTutorials(query) {
    var options = {
      query: query
    };
    console.log('query', query);
    $.get('https://www.googleapis.com/customsearch/v1?parameters', {
      cx: '009271936799338995815:cwbl2stajg0',
      key: 'AIzaSyDKRhtDd9b4RU7QXN9OLJo3zylZ3d4KRpU',
      // key: process.env.YOUTUBE_KEY,
      q: query,
      num: 3,
    })
      .done(({ items }) => {
        this.setState({
          tutorials: items,
        });
        console.log('search result', this.state.tutorials);
      })
      .fail(({ responseJSON }) => {
        responseJSON.error.errors.forEach(err =>
          console.error(err));
      });
  }
  render() {
    return (
      <div className="Tutorial-list">
        <h3>Tutorial Sites</h3>
        {this.state.tutorials ? this.state.tutorials.map((tutorial) =>
          <TutorialListEntry
            key={tutorial.title}
            Tutorial={tutorial}
          />
        ) : null}
      </div>
    );
  }
}

export default TutorialList;
