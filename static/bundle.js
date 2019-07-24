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

        $('#login_form').on('submit', function (event) {
            event.preventDefault();
            var values = {};
            $.each($('#login_form').serializeArray(), function (i, field) {
                values[field.name] = field.value;
            });
            var jsonString = JSON.stringify(values);
            sendPostRequest('/api/v1/get_auth_token', jsonString);
        });

        /***/ })

    /******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3RhdGljL2pzL2xvZ2luLmpzIl0sIm5hbWVzIjpbIkFwaVRva2VuIiwic3VjY2Vzc0Z1bmN0aW9uIiwieGh0dHAiLCJqc29uU3RyaW5nIiwicmVzcG9uc2VUZXh0IiwibWVzc2FnZSIsImpzb25fZGF0YSIsIkpTT04iLCJwYXJzZSIsInRva2VuIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImlubmVySFRNTCIsImNsYXNzTmFtZSIsImZhaWxGdW5jdGlvbiIsInNlbmRQb3N0UmVxdWVzdCIsInVybCIsIlhNTEh0dHBSZXF1ZXN0Iiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsIm9wZW4iLCJzZXRSZXF1ZXN0SGVhZGVyIiwic2VuZCIsIiQiLCJvbiIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJ2YWx1ZXMiLCJlYWNoIiwic2VyaWFsaXplQXJyYXkiLCJpIiwiZmllbGQiLCJuYW1lIiwidmFsdWUiLCJzdHJpbmdpZnkiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQTs7O0FBSUEsSUFBSUEsUUFBUSxHQUFHLEVBQWY7O0FBRUEsU0FBU0MsZUFBVCxDQUF5QkMsS0FBekIsRUFBZ0M7QUFDNUI7QUFDQSxNQUFJQyxVQUFVLEdBQUdELEtBQUssQ0FBQ0UsWUFBdkI7QUFDQSxNQUFJQyxPQUFPLEdBQUcsZ0NBQWQ7QUFDQSxNQUFJQyxTQUFTLEdBQUdDLElBQUksQ0FBQ0MsS0FBTCxDQUFXTCxVQUFYLENBQWhCO0FBQ0FILFVBQVEsR0FBR00sU0FBUyxDQUFDRyxLQUFyQjtBQUVBQyxVQUFRLENBQUNDLGNBQVQsQ0FBd0IsY0FBeEIsRUFBd0NDLFNBQXhDLEdBQW9EUCxPQUFPLEdBQUdMLFFBQTlEO0FBQ0FVLFVBQVEsQ0FBQ0MsY0FBVCxDQUF3QixjQUF4QixFQUF3Q0UsU0FBeEMsR0FBb0QscUJBQXBEO0FBQ0g7O0FBR0QsU0FBU0MsWUFBVCxDQUFzQlosS0FBdEIsRUFBNkI7QUFFekJRLFVBQVEsQ0FBQ0MsY0FBVCxDQUF3QixjQUF4QixFQUF3Q0MsU0FBeEMsR0FBb0QsaUNBQXBEO0FBQ0FGLFVBQVEsQ0FBQ0MsY0FBVCxDQUF3QixjQUF4QixFQUF3Q0UsU0FBeEMsR0FBb0Qsb0JBQXBEO0FBQ0g7O0FBR0QsU0FBU0UsZUFBVCxDQUF5QkMsR0FBekIsRUFBOEJiLFVBQTlCLEVBQTBDO0FBQ3RDLE1BQUlELEtBQUssR0FBRyxJQUFJZSxjQUFKLEVBQVo7O0FBRUFmLE9BQUssQ0FBQ2dCLGtCQUFOLEdBQTJCLFlBQVk7QUFDbkMsUUFBSSxLQUFLQyxVQUFMLElBQW1CLENBQW5CLElBQXdCLEtBQUtDLE1BQUwsSUFBZSxHQUEzQyxFQUFnRDtBQUM1Q25CLHFCQUFlLENBQUMsSUFBRCxDQUFmO0FBQ0g7O0FBQ0QsUUFBSSxLQUFLa0IsVUFBTCxJQUFtQixDQUFuQixJQUF3QixLQUFLQyxNQUFMLElBQWUsR0FBM0MsRUFBZ0Q7QUFDNUNOLGtCQUFZLENBQUMsSUFBRCxDQUFaO0FBQ0g7QUFDSixHQVBEOztBQVNBWixPQUFLLENBQUNtQixJQUFOLENBQVcsTUFBWCxFQUFtQkwsR0FBbkIsRUFBd0IsSUFBeEI7QUFDQWQsT0FBSyxDQUFDb0IsZ0JBQU4sQ0FBdUIsY0FBdkIsRUFBdUMsa0JBQXZDO0FBQ0FwQixPQUFLLENBQUNxQixJQUFOLENBQVdwQixVQUFYO0FBRUg7O0FBR0RxQixDQUFDLENBQUMsYUFBRCxDQUFELENBQWlCQyxFQUFqQixDQUFvQixRQUFwQixFQUE4QixVQUFVQyxLQUFWLEVBQWlCO0FBQzNDQSxPQUFLLENBQUNDLGNBQU47QUFDQSxNQUFJQyxNQUFNLEdBQUcsRUFBYjtBQUNBSixHQUFDLENBQUNLLElBQUYsQ0FBT0wsQ0FBQyxDQUFDLGFBQUQsQ0FBRCxDQUFpQk0sY0FBakIsRUFBUCxFQUEwQyxVQUFVQyxDQUFWLEVBQWFDLEtBQWIsRUFBb0I7QUFDMURKLFVBQU0sQ0FBQ0ksS0FBSyxDQUFDQyxJQUFQLENBQU4sR0FBcUJELEtBQUssQ0FBQ0UsS0FBM0I7QUFDSCxHQUZEO0FBR0EsTUFBSS9CLFVBQVUsR0FBR0ksSUFBSSxDQUFDNEIsU0FBTCxDQUFlUCxNQUFmLENBQWpCO0FBRUFiLGlCQUFlLENBQUMsd0JBQUQsRUFBMkJaLFVBQTNCLENBQWY7QUFDSCxDQVRELEUiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zdGF0aWMvanMvbG9naW4uanNcIik7XG4iLCIvKlxuICAgIFByb2Nlc3MgbG9naW4gZm9ybTogY2FsbCBsb2dpbiBBUEksIGFuZCBpbiBjYXNlIG9mIHN1Y2Nlc3MgcmVkaXJlY3QgdG8gbWFpbiBwYWdlXG4qL1xuXG52YXIgQXBpVG9rZW4gPSAnJztcblxuZnVuY3Rpb24gc3VjY2Vzc0Z1bmN0aW9uKHhodHRwKSB7XG4gICAgLy9cbiAgICBsZXQganNvblN0cmluZyA9IHhodHRwLnJlc3BvbnNlVGV4dDtcbiAgICBsZXQgbWVzc2FnZSA9ICdZb3UgaGF2ZSBsb2dnZWQgaW4sIEFQSSB0b2tlbj0nXG4gICAgbGV0IGpzb25fZGF0YSA9IEpTT04ucGFyc2UoanNvblN0cmluZylcbiAgICBBcGlUb2tlbiA9IGpzb25fZGF0YS50b2tlblxuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsb2dpbi1yZXN1bHRcIikuaW5uZXJIVE1MID0gbWVzc2FnZSArIEFwaVRva2VuO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9naW4tcmVzdWx0XCIpLmNsYXNzTmFtZSA9ICdhbGVydCBhbGVydC1zdWNjZXNzJztcbn1cblxuXG5mdW5jdGlvbiBmYWlsRnVuY3Rpb24oeGh0dHApIHtcblxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibG9naW4tcmVzdWx0XCIpLmlubmVySFRNTCA9ICdQYWlyIGxvZ2luL3Bhc3N3b3JkIGlzIGludmFsaWQhJztcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvZ2luLXJlc3VsdFwiKS5jbGFzc05hbWUgPSAnYWxlcnQgYWxlcnQtZGFuZ2VyJztcbn1cblxuXG5mdW5jdGlvbiBzZW5kUG9zdFJlcXVlc3QodXJsLCBqc29uU3RyaW5nKSB7XG4gICAgbGV0IHhodHRwID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cbiAgICB4aHR0cC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT0gNCAmJiB0aGlzLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgICAgIHN1Y2Nlc3NGdW5jdGlvbih0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09IDQgJiYgdGhpcy5zdGF0dXMgIT0gMjAwKSB7XG4gICAgICAgICAgICBmYWlsRnVuY3Rpb24odGhpcyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgeGh0dHAub3BlbihcIlBPU1RcIiwgdXJsLCB0cnVlKTtcbiAgICB4aHR0cC5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC10eXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcbiAgICB4aHR0cC5zZW5kKGpzb25TdHJpbmcpO1xuXG59XG5cblxuJCgnI2xvZ2luX2Zvcm0nKS5vbignc3VibWl0JywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgdmFsdWVzID0ge307XG4gICAgJC5lYWNoKCQoJyNsb2dpbl9mb3JtJykuc2VyaWFsaXplQXJyYXkoKSwgZnVuY3Rpb24gKGksIGZpZWxkKSB7XG4gICAgICAgIHZhbHVlc1tmaWVsZC5uYW1lXSA9IGZpZWxkLnZhbHVlO1xuICAgIH0pO1xuICAgIGxldCBqc29uU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkodmFsdWVzKTtcblxuICAgIHNlbmRQb3N0UmVxdWVzdCgnL2FwaS92MS9nZXRfYXV0aF90b2tlbicsIGpzb25TdHJpbmcpXG59KTtcblxuXG4iXSwic291cmNlUm9vdCI6IiJ9