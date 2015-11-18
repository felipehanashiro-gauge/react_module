/* eslint-env node */
module.exports = function(string, limit) {
  var stripped;
  string = string || "";

  if (string.length > limit) {
    stripped = string.substr(0, limit) + ".";
  } else {
    stripped = string;
  }

  return stripped;
};
