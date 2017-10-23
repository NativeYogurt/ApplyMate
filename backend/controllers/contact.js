const express = require('express');
const Sequelize = require('sequelize');
const parser = require('body-parser');

const sequelize = require('../db/db.js');
const Contacts = require('../models/Contacts.js');
const SavedJobs = require('../models/SavedJobs.js');

exports.handleContactAdd = (req, res) => {
  const newContact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    jobTitle: req.body.jobTitle,
    email: req.body.email,
    linkedInProfile: req.body.linkedInProfile,
    workPhone: req.body.workPhone,
    personalPhone: req.body.personalPhone,
    howWeMet: req.body.howWeMet,
    notes: req.body.notes,
    jobId: req.body.jobId,
  };
  Contacts
    .build(newContact)
    .save()
    .then((contact) => {
      res.send(contact);
    })
    .catch((error) => {
      throw error;
    });
};

exports.handleGetContacts = (req, res) => {
  Contacts.findAll({
    where: {
      jobId: req.query.jobId,
      deleted: false,
    },
  })
    .then(contacts => {
      res.send(contacts);
    });
};

exports.handleGetContact = (req, res) => {
  Contacts.findOne({
    where: {
      contactId: req.params.id,
    },
  })
    .then(contact => {
      res.send(contact);
    });
};

exports.handleEditContact = (req, res) => {
  Contacts.update({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    jobTitle: req.body.jobTitle,
    email: req.body.email,
    linkedInProfile: req.body.linkedInProfile,
    workPhone: req.body.workPhone,
    personalPhone: req.body.personalPhone,
    howWeMet: req.body.howWeMet,
    notes: req.body.notes,
  }, {
    where: {
      contactId: req.params.id,
    },
  })
    .then(data => res.send(data))
    .catch(error => console.error(error));
};

exports.handleContactDelete = (req, res) => {
  Contacts.update({
    deleted: true,
  }, {
    where: {
      contactId: req.body.contactId,
    },
  })
    .then(success => res.send('success'))
    .catch(error => console.error(error));
};
