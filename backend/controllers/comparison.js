const SavedJobs = require('../models/SavedJobs.js');
const User = require('../models/User.js');

exports.getComparison = async (req, res) => {
  const userId = req.query.userId;
  try {
    let userSkills = await User.findAll({
      attributes: ['skills'],
      where: {
        userId,
      },
    });
    let jobs = await SavedJobs.findAll({
      where: {
        userId,
      },
      order: [['createdAt', 'DESC']],
      limit: 1,
    });
    userSkills = userSkills[0].skills;
    res.send({ userSkills, jobs });
  } catch (e) {
    console.error(e);
  }
};
