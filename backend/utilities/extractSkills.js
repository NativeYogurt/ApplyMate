const fs = require('fs');

const extractSkills = (text) => {
  return new Promise((resolve, reject) => {
    const normalize = ` ${text.toLowerCase()} `;
    let programmingSkillsArray = [];
    fs.readFile('backend/utilities/programmingSkills.txt', 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      programmingSkillsArray = data.split('\n')
        .filter(word => word !== '')
        .map(word => word.toLowerCase());
      programmingSkillsArray = programmingSkillsArray
        .filter(skill => {
          const regex = new RegExp(`([^a-zA-Z-])${skill}([^a-zA-Z])`);
          return normalize.match(regex) !== null;
        })
        .map(skill => {
          return skill.replace(/\\/g,'');
        });
      resolve(programmingSkillsArray);
    });
  });
};

exports.extractSkills = extractSkills;
