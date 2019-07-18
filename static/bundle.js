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
/******/ 	return __webpack_require__(__webpack_require__.s = "./static/js/login.js");
/******/ })
/************************************************************************/
/******/ ({

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
  console.log('SUCCESS!!!', xhttp.status, xhttp.responseText);
  document.getElementById("invalid-login").innerHTML = '';
}

function failFunction(xhttp) {
  //
  console.log('FAIL!!!', xhttp.status);
  document.getElementById("invalid-login").innerHTML = '&nbsp&nbsp&nbsp&nbsp Pair login/password is invalid!';
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

$('#login_form').on('submit', function (event) {
  event.preventDefault();
  var values = {};
  $.each($('#login_form').serializeArray(), function (i, field) {
    values[field.name] = field.value;
  });
  var jsonString = JSON.stringify(values);
  console.log(jsonString);
  sendPostRequest('/api/v1/login', jsonString);
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3RhdGljL2pzL2xvZ2luLmpzIl0sIm5hbWVzIjpbIkFwaVRva2VuIiwic3VjY2Vzc0Z1bmN0aW9uIiwieGh0dHAiLCJqc29uU3RyaW5nIiwicmVzcG9uc2VUZXh0IiwiY29uc29sZSIsImxvZyIsInN0YXR1cyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJpbm5lckhUTUwiLCJmYWlsRnVuY3Rpb24iLCJzZW5kUG9zdFJlcXVlc3QiLCJ1cmwiLCJYTUxIdHRwUmVxdWVzdCIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJvcGVuIiwic2V0UmVxdWVzdEhlYWRlciIsInNlbmQiLCIkIiwib24iLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwidmFsdWVzIiwiZWFjaCIsInNlcmlhbGl6ZUFycmF5IiwiaSIsImZpZWxkIiwibmFtZSIsInZhbHVlIiwiSlNPTiIsInN0cmluZ2lmeSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBOzs7QUFJQSxJQUFJQSxRQUFRLEdBQUcsRUFBZjs7QUFFQSxTQUFTQyxlQUFULENBQXlCQyxLQUF6QixFQUFnQztBQUM1QjtBQUNBLE1BQUlDLFVBQVUsR0FBR0QsS0FBSyxDQUFDRSxZQUF2QjtBQUNBQyxTQUFPLENBQUNDLEdBQVIsQ0FBWSxZQUFaLEVBQTBCSixLQUFLLENBQUNLLE1BQWhDLEVBQXdDTCxLQUFLLENBQUNFLFlBQTlDO0FBQ0FJLFVBQVEsQ0FBQ0MsY0FBVCxDQUF3QixlQUF4QixFQUF5Q0MsU0FBekMsR0FBcUQsRUFBckQ7QUFDSDs7QUFHRCxTQUFTQyxZQUFULENBQXNCVCxLQUF0QixFQUE2QjtBQUN6QjtBQUNBRyxTQUFPLENBQUNDLEdBQVIsQ0FBWSxTQUFaLEVBQXVCSixLQUFLLENBQUNLLE1BQTdCO0FBQ0FDLFVBQVEsQ0FBQ0MsY0FBVCxDQUF3QixlQUF4QixFQUF5Q0MsU0FBekMsR0FBcUQsc0RBQXJEO0FBQ0g7O0FBR0QsU0FBU0UsZUFBVCxDQUF5QkMsR0FBekIsRUFBOEJWLFVBQTlCLEVBQTBDO0FBQ3RDLE1BQUlELEtBQUssR0FBRyxJQUFJWSxjQUFKLEVBQVo7O0FBRUFaLE9BQUssQ0FBQ2Esa0JBQU4sR0FBMkIsWUFBWTtBQUNuQyxRQUFJLEtBQUtDLFVBQUwsSUFBbUIsQ0FBbkIsSUFBd0IsS0FBS1QsTUFBTCxJQUFlLEdBQTNDLEVBQWdEO0FBQzVDTixxQkFBZSxDQUFDLElBQUQsQ0FBZjtBQUNIOztBQUNELFFBQUksS0FBS2UsVUFBTCxJQUFtQixDQUFuQixJQUF3QixLQUFLVCxNQUFMLElBQWUsR0FBM0MsRUFBZ0Q7QUFDNUNJLGtCQUFZLENBQUMsSUFBRCxDQUFaO0FBQ0g7QUFDSixHQVBEOztBQVNBVCxPQUFLLENBQUNlLElBQU4sQ0FBVyxNQUFYLEVBQW1CSixHQUFuQixFQUF3QixJQUF4QjtBQUNBWCxPQUFLLENBQUNnQixnQkFBTixDQUF1QixjQUF2QixFQUF1QyxrQkFBdkM7QUFDQWhCLE9BQUssQ0FBQ2lCLElBQU4sQ0FBV2hCLFVBQVg7QUFFSDs7QUFHRGlCLENBQUMsQ0FBQyxhQUFELENBQUQsQ0FBaUJDLEVBQWpCLENBQW9CLFFBQXBCLEVBQThCLFVBQVVDLEtBQVYsRUFBaUI7QUFDM0NBLE9BQUssQ0FBQ0MsY0FBTjtBQUNBLE1BQUlDLE1BQU0sR0FBRyxFQUFiO0FBQ0FKLEdBQUMsQ0FBQ0ssSUFBRixDQUFPTCxDQUFDLENBQUMsYUFBRCxDQUFELENBQWlCTSxjQUFqQixFQUFQLEVBQTBDLFVBQVVDLENBQVYsRUFBYUMsS0FBYixFQUFvQjtBQUMxREosVUFBTSxDQUFDSSxLQUFLLENBQUNDLElBQVAsQ0FBTixHQUFxQkQsS0FBSyxDQUFDRSxLQUEzQjtBQUNILEdBRkQ7QUFHQSxNQUFJM0IsVUFBVSxHQUFHNEIsSUFBSSxDQUFDQyxTQUFMLENBQWVSLE1BQWYsQ0FBakI7QUFDQW5CLFNBQU8sQ0FBQ0MsR0FBUixDQUFZSCxVQUFaO0FBQ0FTLGlCQUFlLENBQUMsZUFBRCxFQUFrQlQsVUFBbEIsQ0FBZjtBQUNILENBVEQsRSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3N0YXRpYy9qcy9sb2dpbi5qc1wiKTtcbiIsIi8qXG4gICAgUHJvY2VzcyBsb2dpbiBmb3JtOiBjYWxsIGxvZ2luIEFQSSwgYW5kIGluIGNhc2Ugb2Ygc3VjY2VzcyByZWRpcmVjdCB0byBtYWluIHBhZ2VcbiovXG5cbnZhciBBcGlUb2tlbiA9ICcnO1xuXG5mdW5jdGlvbiBzdWNjZXNzRnVuY3Rpb24oeGh0dHApIHtcbiAgICAvL1xuICAgIGxldCBqc29uU3RyaW5nID0geGh0dHAucmVzcG9uc2VUZXh0O1xuICAgIGNvbnNvbGUubG9nKCdTVUNDRVNTISEhJywgeGh0dHAuc3RhdHVzLCB4aHR0cC5yZXNwb25zZVRleHQpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW52YWxpZC1sb2dpblwiKS5pbm5lckhUTUwgPSAnJztcbn1cblxuXG5mdW5jdGlvbiBmYWlsRnVuY3Rpb24oeGh0dHApIHtcbiAgICAvL1xuICAgIGNvbnNvbGUubG9nKCdGQUlMISEhJywgeGh0dHAuc3RhdHVzKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImludmFsaWQtbG9naW5cIikuaW5uZXJIVE1MID0gJyZuYnNwJm5ic3AmbmJzcCZuYnNwIFBhaXIgbG9naW4vcGFzc3dvcmQgaXMgaW52YWxpZCEnO1xufVxuXG5cbmZ1bmN0aW9uIHNlbmRQb3N0UmVxdWVzdCh1cmwsIGpzb25TdHJpbmcpIHtcbiAgICBsZXQgeGh0dHAgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgIHhodHRwLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PSA0ICYmIHRoaXMuc3RhdHVzID09IDIwMCkge1xuICAgICAgICAgICAgc3VjY2Vzc0Z1bmN0aW9uKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT0gNCAmJiB0aGlzLnN0YXR1cyAhPSAyMDApIHtcbiAgICAgICAgICAgIGZhaWxGdW5jdGlvbih0aGlzKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB4aHR0cC5vcGVuKFwiUE9TVFwiLCB1cmwsIHRydWUpO1xuICAgIHhodHRwLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LXR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuICAgIHhodHRwLnNlbmQoanNvblN0cmluZyk7XG5cbn1cblxuXG4kKCcjbG9naW5fZm9ybScpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGxldCB2YWx1ZXMgPSB7fTtcbiAgICAkLmVhY2goJCgnI2xvZ2luX2Zvcm0nKS5zZXJpYWxpemVBcnJheSgpLCBmdW5jdGlvbiAoaSwgZmllbGQpIHtcbiAgICAgICAgdmFsdWVzW2ZpZWxkLm5hbWVdID0gZmllbGQudmFsdWU7XG4gICAgfSk7XG4gICAgbGV0IGpzb25TdHJpbmcgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZXMpO1xuICAgIGNvbnNvbGUubG9nKGpzb25TdHJpbmcpO1xuICAgIHNlbmRQb3N0UmVxdWVzdCgnL2FwaS92MS9sb2dpbicsIGpzb25TdHJpbmcpXG59KTtcblxuXG4iXSwic291cmNlUm9vdCI6IiJ9