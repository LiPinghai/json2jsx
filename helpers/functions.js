const fs = require("fs");

module.exports = {
  recursive_rendering: function(string, context, stack) {
    for (var key in context) {
      if (context.hasOwnProperty(key)) {
        if (typeof context[key] === "object") {
          string = module.exports.recursive_rendering(
            string,
            context[key],
            (stack ? stack + "." : "") + key
          );
        } else {
          var find =
            "\\$\\{\\s*" + (stack ? stack + "." : "") + key + "\\s*\\}";
          var re = new RegExp(find, "g");
          string = string.replace(re, context[key]);
        }
      }
    }
    return string;
  },
  getFolderPrefix: function(defaultFolderPrefix) {
    return defaultFolderPrefix === "currentdate"
      ? module.exports.getCurrentDate()
      : defaultFolderPrefix;
  },
  getCurrentDate: function() {
    const dateToken = [];
    now = new Date();
    dateToken.push(now.getFullYear());
    month = now.getMonth() + 1;
    if (month.length == 1) {
      month = "0" + month;
    }
    dateToken.push(month);
    day = now.getDate();
    if (day.length == 1) {
      day = "0" + day;
    }
    dateToken.push(day);
    hour = now.getHours();
    if (hour.length == 1) {
      hour = "0" + hour;
    }
    dateToken.push(hour);
    minute = now.getMinutes();
    if (minute.length == 1) {
      minute = "0" + minute;
    }
    dateToken.push(minute);
    second = now.getSeconds();
    if (second.length == 1) {
      second = "0" + second;
    }
    dateToken.push(second);
    return dateToken.join("");
  },
  capitalize: function(name) {
    const [first, ...other] = name;
    const capitalizedName = [first.toUpperCase()].concat(other).join("");
    return capitalizedName;
  },
  pascalCase: function(name) {
    if (name.indexOf("_") !== -1) {
      return name
        .split("_")
        .map(token => {
          return module.exports.capitalize(token);
        })
        .join("");
    } else return module.exports.capitalize(name);
  },
  createDir: function(dirName) {
    if (!fs.existsSync(dirName)) {
      fs.mkdirSync(dirName);
    }
  }
};
