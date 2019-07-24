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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./static/js/calendar.js":
/*!*******************************!*\
  !*** ./static/js/calendar.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

var today = new Date();
var month = today.getMonth();
var year = today.getFullYear();
var selectYear = document.getElementById('calendarYear');
var YEAR_RANGE = 3;
document.getElementById('calendarMonth').getElementsByTagName('option')[month].selected = true;

for (var i = 0; i < YEAR_RANGE; i++) {
  var option = document.createElement('option');
  option.value = year + i;
  option.text = year + i;
  selectYear.appendChild(option);
}

$('#calendarForm').on('submit', function (event) {
  event.preventDefault();
  var values = {};
  $.each($('#calendarForm').serializeArray(), function (i, field) {
    values[field.name] = field.value;
  });
  var jsonString = JSON.stringify(values);
  console.log(jsonString);
  sendPostRequest('/api/v1/calendar', jsonString);
});

/***/ }),

/***/ "./static/js/login.js":
/*!****************************!*\
  !*** ./static/js/login.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
    Process login form: call login API, and in case of success redirect to main page
*/
var ApiToken = '';

function successFunction(xhttp) {
  //
  var jsonString = xhttp.responseText;
  var message = 'You have logged in, API token=';
  var json_data = JSON.parse(jsonString);
  ApiToken = json_data.token;
  document.getElementById("login-result").innerHTML = message + ApiToken;
  document.getElementById("login-result").className = 'alert alert-success';
}

function failFunction(xhttp) {
  document.getElementById("login-result").innerHTML = 'Pair login/password is invalid!';
  document.getElementById("login-result").className = 'alert alert-danger';
}

function sendPostRequest(url, jsonString) {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      successFunction(this);
    }

    if (this.readyState == 4 && this.status != 200) {
      failFunction(this);
    }
  };

  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(jsonString);
}

$('#loginForm').on('submit', function (event) {
  event.preventDefault();
  var values = {};
  $.each($('#loginForm').serializeArray(), function (i, field) {
    values[field.name] = field.value;
  });
  var jsonString = JSON.stringify(values);
  sendPostRequest('/api/v1/get_auth_token', jsonString);
});

/***/ }),

/***/ 0:
/*!**********************************************************!*\
  !*** multi ./static/js/login.js ./static/js/calendar.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./static/js/login.js */"./static/js/login.js");
module.exports = __webpack_require__(/*! ./static/js/calendar.js */"./static/js/calendar.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3RhdGljL2pzL2NhbGVuZGFyLmpzIiwid2VicGFjazovLy8uL3N0YXRpYy9qcy9sb2dpbi5qcyJdLCJuYW1lcyI6WyJ0b2RheSIsIkRhdGUiLCJtb250aCIsImdldE1vbnRoIiwieWVhciIsImdldEZ1bGxZZWFyIiwic2VsZWN0WWVhciIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJZRUFSX1JBTkdFIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJzZWxlY3RlZCIsImkiLCJvcHRpb24iLCJjcmVhdGVFbGVtZW50IiwidmFsdWUiLCJ0ZXh0IiwiYXBwZW5kQ2hpbGQiLCIkIiwib24iLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwidmFsdWVzIiwiZWFjaCIsInNlcmlhbGl6ZUFycmF5IiwiZmllbGQiLCJuYW1lIiwianNvblN0cmluZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJjb25zb2xlIiwibG9nIiwic2VuZFBvc3RSZXF1ZXN0IiwiQXBpVG9rZW4iLCJzdWNjZXNzRnVuY3Rpb24iLCJ4aHR0cCIsInJlc3BvbnNlVGV4dCIsIm1lc3NhZ2UiLCJqc29uX2RhdGEiLCJwYXJzZSIsInRva2VuIiwiaW5uZXJIVE1MIiwiY2xhc3NOYW1lIiwiZmFpbEZ1bmN0aW9uIiwidXJsIiwiWE1MSHR0cFJlcXVlc3QiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwib3BlbiIsInNldFJlcXVlc3RIZWFkZXIiLCJzZW5kIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFF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akI7QUFFQVUsaUJBQWUsQ0FBQyx3QkFBRCxFQUEyQkwsVUFBM0IsQ0FBZjtBQUNILENBVEQsRSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCJsZXQgdG9kYXkgPSBuZXcgRGF0ZSgpO1xubGV0IG1vbnRoID0gdG9kYXkuZ2V0TW9udGgoKTtcbmxldCB5ZWFyID0gdG9kYXkuZ2V0RnVsbFllYXIoKTtcbmxldCBzZWxlY3RZZWFyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbGVuZGFyWWVhcicpO1xuY29uc3QgWUVBUl9SQU5HRSA9IDM7XG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYWxlbmRhck1vbnRoJykuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ29wdGlvbicpW21vbnRoXS5zZWxlY3RlZCA9IHRydWU7XG5cbmZvciAobGV0IGkgPSAwOyBpIDwgWUVBUl9SQU5HRTsgaSsrKSB7XG4gICAgbGV0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgIG9wdGlvbi52YWx1ZSA9IHllYXIgKyBpO1xuICAgIG9wdGlvbi50ZXh0ID0geWVhciArIGk7XG4gICAgc2VsZWN0WWVhci5hcHBlbmRDaGlsZChvcHRpb24pXG59XG5cbiQoJyNjYWxlbmRhckZvcm0nKS5vbignc3VibWl0JywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgdmFsdWVzID0ge307XG4gICAgJC5lYWNoKCQoJyNjYWxlbmRhckZvcm0nKS5zZXJpYWxpemVBcnJheSgpLCBmdW5jdGlvbiAoaSwgZmllbGQpIHtcbiAgICAgICAgdmFsdWVzW2ZpZWxkLm5hbWVdID0gZmllbGQudmFsdWU7XG4gICAgfSk7XG4gICAgbGV0IGpzb25TdHJpbmcgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZXMpO1xuXG4gICAgY29uc29sZS5sb2coanNvblN0cmluZylcblxuICAgIHNlbmRQb3N0UmVxdWVzdCgnL2FwaS92MS9jYWxlbmRhcicsIGpzb25TdHJpbmcpXG59KTtcblxuXG5cbiIsIi8qXG4gICAgUHJvY2VzcyBsb2dpbiBmb3JtOiBjYWxsIGxvZ2luIEFQSSwgYW5kIGluIGNhc2Ugb2Ygc3VjY2VzcyByZWRpcmVjdCB0byBtYWluIHBhZ2VcbiovXG5cbnZhciBBcGlUb2tlbiA9ICcnO1xuXG5mdW5jdGlvbiBzdWNjZXNzRnVuY3Rpb24oeGh0dHApIHtcbiAgICAvL1xuICAgIGxldCBqc29uU3RyaW5nID0geGh0dHAucmVzcG9uc2VUZXh0O1xuICAgIGxldCBtZXNzYWdlID0gJ1lvdSBoYXZlIGxvZ2dlZCBpbiwgQVBJIHRva2VuPSdcbiAgICBsZXQganNvbl9kYXRhID0gSlNPTi5wYXJzZShqc29uU3RyaW5nKVxuICAgIEFwaVRva2VuID0ganNvbl9kYXRhLnRva2VuXG5cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ2luLXJlc3VsdFwiKS5pbm5lckhUTUwgPSBtZXNzYWdlICsgQXBpVG9rZW47XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dpbi1yZXN1bHRcIikuY2xhc3NOYW1lID0gJ2FsZXJ0IGFsZXJ0LXN1Y2Nlc3MnO1xufVxuXG5cbmZ1bmN0aW9uIGZhaWxGdW5jdGlvbih4aHR0cCkge1xuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dpbi1yZXN1bHRcIikuaW5uZXJIVE1MID0gJ1BhaXIgbG9naW4vcGFzc3dvcmQgaXMgaW52YWxpZCEnO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9naW4tcmVzdWx0XCIpLmNsYXNzTmFtZSA9ICdhbGVydCBhbGVydC1kYW5nZXInO1xufVxuXG5cbmZ1bmN0aW9uIHNlbmRQb3N0UmVxdWVzdCh1cmwsIGpzb25TdHJpbmcpIHtcbiAgICBsZXQgeGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgIHhodHRwLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PSA0ICYmIHRoaXMuc3RhdHVzID09IDIwMCkge1xuICAgICAgICAgICAgc3VjY2Vzc0Z1bmN0aW9uKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT0gNCAmJiB0aGlzLnN0YXR1cyAhPSAyMDApIHtcbiAgICAgICAgICAgIGZhaWxGdW5jdGlvbih0aGlzKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB4aHR0cC5vcGVuKFwiUE9TVFwiLCB1cmwsIHRydWUpO1xuICAgIHhodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LXR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuICAgIHhodHRwLnNlbmQoanNvblN0cmluZyk7XG5cbn1cblxuXG4kKCcjbG9naW5Gb3JtJykub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uIChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgbGV0IHZhbHVlcyA9IHt9O1xuICAgICQuZWFjaCgkKCcjbG9naW5Gb3JtJykuc2VyaWFsaXplQXJyYXkoKSwgZnVuY3Rpb24gKGksIGZpZWxkKSB7XG4gICAgICAgIHZhbHVlc1tmaWVsZC5uYW1lXSA9IGZpZWxkLnZhbHVlO1xuICAgIH0pO1xuICAgIGxldCBqc29uU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkodmFsdWVzKTtcblxuICAgIHNlbmRQb3N0UmVxdWVzdCgnL2FwaS92MS9nZXRfYXV0aF90b2tlbicsIGpzb25TdHJpbmcpXG59KTtcblxuXG4iXSwic291cmNlUm9vdCI6IiJ9