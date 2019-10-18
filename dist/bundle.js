/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/app.js":
/*!*******************!*\
  !*** ./js/app.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var userInputValue = document.querySelector("#search-user"); // const repoInputValue = document.querySelector("#search-repo");

var searchButton = document.querySelector(".searchButton");
var nameContainer = document.querySelector(".main__profile-name");
var unContainer = document.querySelector(".main__profile-username");
var reposContainer = document.querySelector(".main__profile-repos");
var urlContainer = document.querySelector(".main__profile-url"); // const commitContainer = document.querySelector(".main__profile-commits"); 

var clientId = "Iv1.9e39903e84bf3a07";
var clientSecret = "0bf1a222c2f3f2a99c08bc84ba5fde728b6e4e41";

var fetchUsers =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(user) {
    var user_api_call, userData;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch("https://api.github.com/users/".concat(user, "?client_id=").concat(clientId, "&client_secret=").concat(clientSecret));

          case 2:
            user_api_call = _context.sent;
            _context.next = 5;
            return user_api_call.json();

          case 5:
            userData = _context.sent;
            return _context.abrupt("return", userData);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function fetchUsers(_x) {
    return _ref.apply(this, arguments);
  };
}();

var fetchRepos =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(owner) {
    var repo_api_call, repo_data, repoNames;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return fetch("https://api.github.com/users/".concat(owner, "/repos?client_id=").concat(clientId, "&client_secret=").concat(clientSecret));

          case 2:
            repo_api_call = _context2.sent;
            _context2.next = 5;
            return repo_api_call.json();

          case 5:
            repo_data = _context2.sent;
            repoNames = repo_data.map(function (repo_datum) {
              return repo_datum.name;
            });
            return _context2.abrupt("return", repoNames);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function fetchRepos(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var fetchRepoStats =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(owner, repo) {
    var repo_stats_api_call, repo_stats_data, sum;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return fetch("https://api.github.com/repos/".concat(owner, "/").concat(repo, "/stats/commit_activity?client_id=").concat(clientId, "&client_secret=").concat(clientSecret));

          case 2:
            repo_stats_api_call = _context3.sent;
            _context3.next = 5;
            return repo_stats_api_call.json();

          case 5:
            repo_stats_data = _context3.sent;
            sum = 0; // console.log(repo_stats_data);

            repo_stats_data.map(function (repo_stats_datum) {
              return sum += repo_stats_datum.total;
            });
            return _context3.abrupt("return", sum);

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function fetchRepoStats(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();

var showData =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4() {
    var user;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return fetchUsers(userInputValue.value);

          case 2:
            user = _context4.sent;
            nameContainer.innerHTML = "Name: <span class=\"main__profile-value\">".concat(user.name, "</span>");
            unContainer.innerHTML = "Username: <span class=\"main__profile-value\">".concat(user.login, "</span>");
            reposContainer.innerHTML = "Repos: <span class=\"main__profile-value\">".concat(user.public_repos, "</span>");
            urlContainer.innerHTML = "URL: <span class=\"main__profile-value\">".concat(user.html_url, "</span>");

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function showData() {
    return _ref4.apply(this, arguments);
  };
}();

var pieGenerator =
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6() {
    var repoNames, repoCommits, pieArray, i;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return fetchRepos(userInputValue.value);

          case 2:
            repoNames = _context6.sent;
            _context6.next = 5;
            return Promise.all(repoNames.map(
            /*#__PURE__*/
            function () {
              var _ref6 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee5(repoName) {
                var repoStat;
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        _context5.next = 2;
                        return fetchRepoStats(userInputValue.value, repoName);

                      case 2:
                        repoStat = _context5.sent;
                        return _context5.abrupt("return", repoStat);

                      case 4:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5);
              }));

              return function (_x5) {
                return _ref6.apply(this, arguments);
              };
            }()));

          case 5:
            repoCommits = _context6.sent;
            // const pieDataLabels = ["name", "commits"]
            pieArray = [];

            for (i = 0; i < repoCommits.length; i++) {
              pieArray.push({
                name: repoNames[i],
                commits: repoCommits[i]
              });
            } // let jasonPieData = JSON.stringify(pieData);
            // console.log(jasonPieData);


            console.log(pieArray);

          case 9:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function pieGenerator() {
    return _ref5.apply(this, arguments);
  };
}();

searchButton.addEventListener("click", function () {
  showData();
  pieGenerator();
});

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map