webpackJsonp([0,1],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(1);
	
	__webpack_require__(6);
	
	__webpack_require__(9);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _addOne = __webpack_require__(7);
	
	var _thrities = __webpack_require__(8);
	
	var _thrities2 = _interopRequireDefault(_thrities);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	xtag.register('x-praise', {
	
	    content: '<div>\n        <span data-name></span>\n        <span class="count" data-number></span>\n        <button class=\'thumb\'>\u70B9\u8D5E</button>\n    </div>',
	
	    lifecycle: {
	        created: function created() {
	            this.thrities = (0, _thrities2.default)((0, _addOne.addOne)('/proxy'));
	        }
	    },
	    methods: {
	        praiseClick: function praiseClick(elem) {
	            var _this = this;
	
	            this.thrities(this['data-id']).then(function (res) {
	                _this['data-number'] = ++_this['data-number'];
	                ////渲染页面
	                // this.render(elem);
	            }).catch(function (err) {
	                alert(err.message);
	            });
	        }
	    },
	
	    accessors: {
	        'data-id': {
	            attribute: {
	                id: 0
	            },
	            get: function get() {
	                return this.id;
	            },
	            set: function set(value) {
	                this.id = value;
	            }
	        },
	
	        'data-number': {
	            attribute: {
	                number: 0
	            },
	            get: function get() {
	                return this.number;
	            },
	            set: function set(value) {
	
	                this.number = value;
	                $(this).find('[data-number]').text(value);
	            }
	        },
	
	        'data-name': {
	            attribute: {
	                name: ''
	            },
	            get: function get() {
	                return this.name;
	            },
	            set: function set(value) {
	
	                this.name = value;
	                $(this).find('[data-name]').text(value);
	            }
	        }
	
	    },
	
	    events: {
	        click: function click(e) {
	            if (e.target.className === 'thumb') {
	                this.praiseClick(e.target);
	            }
	        }
	    }
	});

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var addOne = exports.addOne = function addOne(proxy_url) {
	    if (typeof axios.post === 'undefined') {
	        alert('axios is not exit');
	        return;
	    }
	    var param = {
	        url: 'http://localhost/thumb_php/thumb.php',
	        type: 'POST',
	        data: {}
	    };
	    return function (id) {
	        param.data.id = id;
	        return axios.post(proxy_url, param).then(function (res) {
	            res = res.data;
	            if (!res.code) {
	                alert(res.message);
	                return;
	            }
	            return res;
	        });
	    };
	};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	/**
	 * 节流函数，在一定的时间范围内阻止请求
	 * @param {*cb} 是一个返回promise的函数
	 */
	
	exports.default = function (cb) {
	
	    if (typeof cb !== 'function') throw 'cb must is a function';
	    var canRun = true;
	    return function () {
	        if (!canRun) return;
	        canRun = false;
	        return cb.apply(this, arguments).then(function (res) {
	            canRun = true;
	            return res;
	        });
	    };
	};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _addOne = __webpack_require__(7);
	
	var _thrities = __webpack_require__(8);
	
	var _thrities2 = _interopRequireDefault(_thrities);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	xtag.register('x-star', {
	
	    content: '<div class="star">\u4E94\u89D2\u661F\u70B9\u8D5E</div>',
	
	    lifecycle: {
	        created: function created() {
	            this.thrities = (0, _thrities2.default)((0, _addOne.addOne)('/proxy'));
	        }
	    },
	    methods: {
	        praiseClick: function praiseClick(elem) {
	            var _this = this;
	
	            this.thrities(this['data-id']).then(function (res) {
	                _this['data-number'] = ++_this['data-number'];
	                ////渲染页面
	                // this.render(elem);
	            }).catch(function (err) {
	                alert(err.message);
	            });
	        }
	    },
	    events: {
	        click: function click(e) {
	            if (e.target.className === 'star') {
	                this.praiseClick(e.target);
	            }
	        }
	    }
	});

/***/ })
]);
//# sourceMappingURL=index.js.map