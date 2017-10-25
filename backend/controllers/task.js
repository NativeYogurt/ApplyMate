const express = require('express');
const Sequelize = require('sequelize');
const parser = require('body-parser');

const sequelize = require('../db/db.js');
const Tasks = require('../models/Tasks.js');
const SavedJobs = require('../models/SavedJobs.js');

exports.handleTaskAdd = (req, res) => {
  const newTask = {
    taskDesc: req.body.taskDesc,
    taskDueDate: req.body.taskDueDate || null,
    jobId: req.body.jobId,
    userId: req.body.userId,
  };
  Tasks
    .build(newTask)
    .save()
    .then((task) => {
      res.send(task);
    })
    .catch((error) => {
      throw error;
    });
};

exports.handleGetTasks = (req, res) => {
  Tasks.findAll({
    where: {
      jobId: req.query.jobId,
      deleted: false,
    },
  })
    .then(tasks => {
      res.send(tasks);
    });
};

exports.handleGetTasksByUser = (req, res) => {
  Tasks.findAll({
    where: {
      userId: req.query.userId,
      deleted: false,
    },
  })
    .then(tasks => {
      res.send(tasks);
    });
};

exports.handleTaskDelete = (req, res) => {
  Tasks.update({
    deleted: true,
  }, {
    where: {
      taskId: req.body.taskId,
    },
  })
    .then(success => res.send('success'))
    .catch(error => console.error(error));
};
