const extract = require('../backend/utilities/extractSkills');

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
    })
});
