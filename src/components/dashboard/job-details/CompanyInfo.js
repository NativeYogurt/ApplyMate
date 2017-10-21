import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const CompanyInfo = (props) => {
  return (
    <div>
      <h3>Company Information</h3>
      <h4>{props.companyInfo.organization.name}</h4>
      <div>{props.companyInfo.organization.overview}</div>
      <div>Heaquarters at <span className="address">{props.companyInfo.organization.contactInfo.addresses[0].addressLine1},</span>
        <span className="address">{props.companyInfo.organization.contactInfo.addresses[0].locality},</span>
        {props.companyInfo.organization.contactInfo.addresses[0].region ?
          (<span className="address">{props.companyInfo.organization.contactInfo.addresses[0].region.code}</span>) :
            null}
        <span className="address">{props.companyInfo.organization.contactInfo.addresses[0].postalCode},</span>
        <span className="address">{props.companyInfo.organization.contactInfo.addresses[0].country.code}</span>
      </div>
      <div>Founded: {props.companyInfo.organization.founded}</div>
      <div>Country: {props.companyInfo.organization.contactInfo.addresses[0].country.name}</div>
      <div>Website: <a href={props.companyInfo.website} target="_blank">{props.companyInfo.website}</a></div>
      {props.companyInfo.organization.contactInfo.phoneNumbers ?
        <div>
          ContactInfo: {props.companyInfo.organization.contactInfo.phoneNumbers[0].number}
        </div> :
        null}
    </div>
  );
};
CompanyInfo.propTypes = {
  companyInfo: PropTypes.object.isRequired,
};
export default CompanyInfo;
