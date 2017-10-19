const SavedJobs = require('../models/SavedJobs.js');
const User = require('../models/User.js');

exports.getComparison = async (req, res) => {
  const { query: { userId } } = req;
  let jobs = [];
  let userSkills = [];
  try {
    userSkills = await User.findAll({
      attributes: ['skills'],
      where: {
        userId,
      },
    });
    jobs = await SavedJobs.findAll({
      where: {
        userId,
        deleted: false,
      },
      // order: [['createdAt', 'DESC']],
      // limit: 1,
    });
    userSkills = userSkills[0].skills;
    res.send({ userSkills, jobs });
  } catch (e) {
    console.error(e);
  }
};
