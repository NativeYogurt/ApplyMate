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
