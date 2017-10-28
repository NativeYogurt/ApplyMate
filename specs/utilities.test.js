const extract = require('../backend/utilities/extractSkills');
const env = require('dotenv').config();
const db = require('../backend/db/db');
const SavedJobs = require('../backend/models/SavedJobs');

const text = 'javascript alex Python GOPHER scAla Objective-C javascript';

test('only programmingSkills are pulled out of string', () => {
  let result;
  extract.extractSkills(text)
    .then((data) => {
      result = data;
    })
    .then(() => {
      result.sort();
      expect(result).toEqual(['javascript', 'objective-c', 'python', 'scala']);
    });
});
