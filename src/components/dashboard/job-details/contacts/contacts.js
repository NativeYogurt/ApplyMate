import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Row, Col, Icon, Button, Input } from 'react-materialize';

import ContactEntry from './contact-entry';

class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
    };
    this.getContacts = this.getContacts.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
  }
  componentDidMount() {
    this.getContacts();
  }
  getContacts() {
    axios.get('/api/contacts', {
      params: {
        jobId: this.props.jobId,
      },
    })
      .then(({ data }) => {
        this.setState({
          contacts: data,
        });
      })
      .catch(err => console.error(err));
  }
  deleteContact(contactId) {
    const contacts = this.state.contacts.filter(contact => contact.contactId !== contactId);
    this.setState({
      contacts,
    });
    axios.put('/api/contact/delete', { contactId });
  }
  render() {
    return (
      <div>
        <div>
          {this.state.contacts.length === 0 ? (
            <div>
              <Icon large>contacts</Icon>
              <div>Save contact information here for people related to this job
                 application or company.
              </div>
            </div>
            ) : null
          }
          <Link className="waves-effect waves-light btn" to={`/home/dashboard/${this.props.jobId}/contacts/new`}>Add Contact</Link>
        </div>
        <div>
          {this.state.contacts.length > 0 ? this.state.contacts.map(contact => {
            return (<ContactEntry
              key={contact.contactId}
              contact={contact}
              deleteContact={this.deleteContact}
              jobId={this.props.jobId}
            />
          );
          }) : null
          }
        </div>
      </div>
    );
  }
}

export default Contacts;
