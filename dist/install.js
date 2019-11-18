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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/install.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@actions/core/lib/command.js":
/*!***************************************************!*\
  !*** ./node_modules/@actions/core/lib/command.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const os = __webpack_require__(/*! os */ "os");
/**
 * Commands
 *
 * Command Format:
 *   ##[name key=value;key=value]message
 *
 * Examples:
 *   ##[warning]This is the user warning message
 *   ##[set-secret name=mypassword]definitelyNotAPassword!
 */
function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
}
exports.issueCommand = issueCommand;
function issue(name, message = '') {
    issueCommand(name, {}, message);
}
exports.issue = issue;
const CMD_STRING = '::';
class Command {
    constructor(command, properties, message) {
        if (!command) {
            command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        // safely append the val - avoid blowing up when attempting to
                        // call .replace() if message is not a string for some reason
                        cmdStr += `${key}=${escape(`${val || ''}`)},`;
                    }
                }
            }
        }
        cmdStr += CMD_STRING;
        // safely append the message - avoid blowing up when attempting to
        // call .replace() if message is not a string for some reason
        const message = `${this.message || ''}`;
        cmdStr += escapeData(message);
        return cmdStr;
    }
}
function escapeData(s) {
    return s.replace(/\r/g, '%0D').replace(/\n/g, '%0A');
}
function escape(s) {
    return s
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/]/g, '%5D')
        .replace(/;/g, '%3B');
}
//# sourceMappingURL=command.js.map

/***/ }),

/***/ "./node_modules/@actions/core/lib/core.js":
/*!************************************************!*\
  !*** ./node_modules/@actions/core/lib/core.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __webpack_require__(/*! ./command */ "./node_modules/@actions/core/lib/command.js");
const os = __webpack_require__(/*! os */ "os");
const path = __webpack_require__(/*! path */ "path");
/**
 * The code to exit an action
 */
var ExitCode;
(function (ExitCode) {
    /**
     * A code indicating that the action was successful
     */
    ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */
    ExitCode[ExitCode["Failure"] = 1] = "Failure";
})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable
 */
function exportVariable(name, val) {
    process.env[name] = val;
    command_1.issueCommand('set-env', { name }, val);
}
exports.exportVariable = exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */
function setSecret(secret) {
    command_1.issueCommand('add-mask', {}, secret);
}
exports.setSecret = setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */
function addPath(inputPath) {
    command_1.issueCommand('add-path', {}, inputPath);
    process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
}
exports.addPath = addPath;
/**
 * Gets the value of an input.  The value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store
 */
function setOutput(name, value) {
    command_1.issueCommand('set-output', { name }, value);
}
exports.setOutput = setOutput;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */
function setFailed(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
}
exports.setFailed = setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Writes debug message to user log
 * @param message debug message
 */
function debug(message) {
    command_1.issueCommand('debug', {}, message);
}
exports.debug = debug;
/**
 * Adds an error issue
 * @param message error issue message
 */
function error(message) {
    command_1.issue('error', message);
}
exports.error = error;
/**
 * Adds an warning issue
 * @param message warning issue message
 */
function warning(message) {
    command_1.issue('warning', message);
}
exports.warning = warning;
/**
 * Writes info to log with console.log.
 * @param message info message
 */
function info(message) {
    process.stdout.write(message + os.EOL);
}
exports.info = info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */
function startGroup(name) {
    command_1.issue('group', name);
}
exports.startGroup = startGroup;
/**
 * End an output group.
 */
function endGroup() {
    command_1.issue('endgroup');
}
exports.endGroup = endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
            result = yield fn();
        }
        finally {
            endGroup();
        }
        return result;
    });
}
exports.group = group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store
 */
function saveState(name, value) {
    command_1.issueCommand('save-state', { name }, value);
}
exports.saveState = saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */
function getState(name) {
    return process.env[`STATE_${name}`] || '';
}
exports.getState = getState;
//# sourceMappingURL=core.js.map

/***/ }),

/***/ "./node_modules/adm-zip/adm-zip.js":
/*!*****************************************!*\
  !*** ./node_modules/adm-zip/adm-zip.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Utils = __webpack_require__(/*! ./util */ "./node_modules/adm-zip/util/index.js");
var fs = Utils.FileSystem.require(),
	pth = __webpack_require__(/*! path */ "path");

fs.existsSync = fs.existsSync || pth.existsSync;

var ZipEntry = __webpack_require__(/*! ./zipEntry */ "./node_modules/adm-zip/zipEntry.js"),
	ZipFile = __webpack_require__(/*! ./zipFile */ "./node_modules/adm-zip/zipFile.js");

var isWin = /^win/.test(process.platform);


module.exports = function (/*String*/input) {
	var _zip = undefined,
		_filename = "";

	if (input && typeof input === "string") { // load zip file
		if (fs.existsSync(input)) {
			_filename = input;
			_zip = new ZipFile(input, Utils.Constants.FILE);
		} else {
			throw Utils.Errors.INVALID_FILENAME;
		}
	} else if (input && Buffer.isBuffer(input)) { // load buffer
		_zip = new ZipFile(input, Utils.Constants.BUFFER);
	} else { // create new zip file
		_zip = new ZipFile(null, Utils.Constants.NONE);
	}

	function sanitize(prefix, name) {
		prefix = pth.resolve(pth.normalize(prefix));
		var parts = name.split('/');
		for (var i = 0, l = parts.length; i < l; i++) {
			var path = pth.normalize(pth.join(prefix, parts.slice(i, l).join(pth.sep)));
			if (path.indexOf(prefix) === 0) {
				return path;
			}
		}
		return pth.normalize(pth.join(prefix, pth.basename(name)));
	}

	function getEntry(/*Object*/entry) {
		if (entry && _zip) {
			var item;
			// If entry was given as a file name
			if (typeof entry === "string")
				item = _zip.getEntry(entry);
			// if entry was given as a ZipEntry object
			if (typeof entry === "object" && typeof entry.entryName !== "undefined" && typeof entry.header !== "undefined")
				item = _zip.getEntry(entry.entryName);

			if (item) {
				return item;
			}
		}
		return null;
	}

	return {
		/**
		 * Extracts the given entry from the archive and returns the content as a Buffer object
		 * @param entry ZipEntry object or String with the full path of the entry
		 *
		 * @return Buffer or Null in case of error
		 */
		readFile: function (/*Object*/entry) {
			var item = getEntry(entry);
			return item && item.getData() || null;
		},

		/**
		 * Asynchronous readFile
		 * @param entry ZipEntry object or String with the full path of the entry
		 * @param callback
		 *
		 * @return Buffer or Null in case of error
		 */
		readFileAsync: function (/*Object*/entry, /*Function*/callback) {
			var item = getEntry(entry);
			if (item) {
				item.getDataAsync(callback);
			} else {
				callback(null, "getEntry failed for:" + entry)
			}
		},

		/**
		 * Extracts the given entry from the archive and returns the content as plain text in the given encoding
		 * @param entry ZipEntry object or String with the full path of the entry
		 * @param encoding Optional. If no encoding is specified utf8 is used
		 *
		 * @return String
		 */
		readAsText: function (/*Object*/entry, /*String - Optional*/encoding) {
			var item = getEntry(entry);
			if (item) {
				var data = item.getData();
				if (data && data.length) {
					return data.toString(encoding || "utf8");
				}
			}
			return "";
		},

		/**
		 * Asynchronous readAsText
		 * @param entry ZipEntry object or String with the full path of the entry
		 * @param callback
		 * @param encoding Optional. If no encoding is specified utf8 is used
		 *
		 * @return String
		 */
		readAsTextAsync: function (/*Object*/entry, /*Function*/callback, /*String - Optional*/encoding) {
			var item = getEntry(entry);
			if (item) {
				item.getDataAsync(function (data, err) {
					if (err) {
						callback(data, err);
						return;
					}

					if (data && data.length) {
						callback(data.toString(encoding || "utf8"));
					} else {
						callback("");
					}
				})
			} else {
				callback("");
			}
		},

		/**
		 * Remove the entry from the file or the entry and all it's nested directories and files if the given entry is a directory
		 *
		 * @param entry
		 */
		deleteFile: function (/*Object*/entry) { // @TODO: test deleteFile
			var item = getEntry(entry);
			if (item) {
				_zip.deleteEntry(item.entryName);
			}
		},

		/**
		 * Adds a comment to the zip. The zip must be rewritten after adding the comment.
		 *
		 * @param comment
		 */
		addZipComment: function (/*String*/comment) { // @TODO: test addZipComment
			_zip.comment = comment;
		},

		/**
		 * Returns the zip comment
		 *
		 * @return String
		 */
		getZipComment: function () {
			return _zip.comment || '';
		},

		/**
		 * Adds a comment to a specified zipEntry. The zip must be rewritten after adding the comment
		 * The comment cannot exceed 65535 characters in length
		 *
		 * @param entry
		 * @param comment
		 */
		addZipEntryComment: function (/*Object*/entry, /*String*/comment) {
			var item = getEntry(entry);
			if (item) {
				item.comment = comment;
			}
		},

		/**
		 * Returns the comment of the specified entry
		 *
		 * @param entry
		 * @return String
		 */
		getZipEntryComment: function (/*Object*/entry) {
			var item = getEntry(entry);
			if (item) {
				return item.comment || '';
			}
			return ''
		},

		/**
		 * Updates the content of an existing entry inside the archive. The zip must be rewritten after updating the content
		 *
		 * @param entry
		 * @param content
		 */
		updateFile: function (/*Object*/entry, /*Buffer*/content) {
			var item = getEntry(entry);
			if (item) {
				item.setData(content);
			}
		},

		/**
		 * Adds a file from the disk to the archive
		 *
		 * @param localPath File to add to zip
		 * @param zipPath Optional path inside the zip
		 * @param zipName Optional name for the file
		 */
		addLocalFile: function (/*String*/localPath, /*String*/zipPath, /*String*/zipName) {
			if (fs.existsSync(localPath)) {
				if (zipPath) {
					zipPath = zipPath.split("\\").join("/");
					if (zipPath.charAt(zipPath.length - 1) !== "/") {
						zipPath += "/";
					}
				} else {
					zipPath = "";
				}
				var p = localPath.split("\\").join("/").split("/").pop();

				if (zipName) {
					this.addFile(zipPath + zipName, fs.readFileSync(localPath), "", 0)
				} else {
					this.addFile(zipPath + p, fs.readFileSync(localPath), "", 0)
				}
			} else {
				throw Utils.Errors.FILE_NOT_FOUND.replace("%s", localPath);
			}
		},

		/**
		 * Adds a local directory and all its nested files and directories to the archive
		 *
		 * @param localPath
		 * @param zipPath optional path inside zip
		 * @param filter optional RegExp or Function if files match will
		 *               be included.
		 */
		addLocalFolder: function (/*String*/localPath, /*String*/zipPath, /*RegExp|Function*/filter) {
			if (filter === undefined) {
				filter = function () {
					return true;
				};
			} else if (filter instanceof RegExp) {
				filter = function (filter) {
					return function (filename) {
						return filter.test(filename);
					}
				}(filter);
			}

			if (zipPath) {
				zipPath = zipPath.split("\\").join("/");
				if (zipPath.charAt(zipPath.length - 1) !== "/") {
					zipPath += "/";
				}
			} else {
				zipPath = "";
			}
			// normalize the path first
			localPath = pth.normalize(localPath);
			localPath = localPath.split("\\").join("/"); //windows fix
			if (localPath.charAt(localPath.length - 1) !== "/")
				localPath += "/";

			if (fs.existsSync(localPath)) {

				var items = Utils.findFiles(localPath),
					self = this;

				if (items.length) {
					items.forEach(function (path) {
						var p = path.split("\\").join("/").replace(new RegExp(localPath.replace(/(\(|\))/g, '\\$1'), 'i'), ""); //windows fix
						if (filter(p)) {
							if (p.charAt(p.length - 1) !== "/") {
								self.addFile(zipPath + p, fs.readFileSync(path), "", 0)
							} else {
								self.addFile(zipPath + p, Buffer.alloc(0), "", 0)
							}
						}
					});
				}
			} else {
				throw Utils.Errors.FILE_NOT_FOUND.replace("%s", localPath);
			}
		},

		/**
		 * Allows you to create a entry (file or directory) in the zip file.
		 * If you want to create a directory the entryName must end in / and a null buffer should be provided.
		 * Comment and attributes are optional
		 *
		 * @param entryName
		 * @param content
		 * @param comment
		 * @param attr
		 */
		addFile: function (/*String*/entryName, /*Buffer*/content, /*String*/comment, /*Number*/attr) {
			var entry = new ZipEntry();
			entry.entryName = entryName;
			entry.comment = comment || "";

			if (!attr) {
				if (entry.isDirectory) {
					attr = (0o40755 << 16) | 0x10; // (permissions drwxr-xr-x) + (MS-DOS directory flag)
				} else {
					attr = 0o644 << 16; // permissions -r-wr--r--
				}
			}

			entry.attr = attr;

			entry.setData(content);
			_zip.setEntry(entry);
		},

		/**
		 * Returns an array of ZipEntry objects representing the files and folders inside the archive
		 *
		 * @return Array
		 */
		getEntries: function () {
			if (_zip) {
				return _zip.entries;
			} else {
				return [];
			}
		},

		/**
		 * Returns a ZipEntry object representing the file or folder specified by ``name``.
		 *
		 * @param name
		 * @return ZipEntry
		 */
		getEntry: function (/*String*/name) {
			return getEntry(name);
		},

		/**
		 * Extracts the given entry to the given targetPath
		 * If the entry is a directory inside the archive, the entire directory and it's subdirectories will be extracted
		 *
		 * @param entry ZipEntry object or String with the full path of the entry
		 * @param targetPath Target folder where to write the file
		 * @param maintainEntryPath If maintainEntryPath is true and the entry is inside a folder, the entry folder
		 *                          will be created in targetPath as well. Default is TRUE
		 * @param overwrite If the file already exists at the target path, the file will be overwriten if this is true.
		 *                  Default is FALSE
		 *
		 * @return Boolean
		 */
		extractEntryTo: function (/*Object*/entry, /*String*/targetPath, /*Boolean*/maintainEntryPath, /*Boolean*/overwrite) {
			overwrite = overwrite || false;
			maintainEntryPath = typeof maintainEntryPath === "undefined" ? true : maintainEntryPath;

			var item = getEntry(entry);
			if (!item) {
				throw Utils.Errors.NO_ENTRY;
			}

			var entryName = item.entryName;

			var target = sanitize(targetPath, maintainEntryPath ? entryName : pth.basename(entryName));

			if (item.isDirectory) {
				target = pth.resolve(target, "..");
				var children = _zip.getEntryChildren(item);
				children.forEach(function (child) {
					if (child.isDirectory) return;
					var content = child.getData();
					if (!content) {
						throw Utils.Errors.CANT_EXTRACT_FILE;
					}
					var childName = sanitize(targetPath, maintainEntryPath ? child.entryName : pth.basename(child.entryName));

					Utils.writeFileTo(childName, content, overwrite);
				});
				return true;
			}

			var content = item.getData();
			if (!content) throw Utils.Errors.CANT_EXTRACT_FILE;

			if (fs.existsSync(target) && !overwrite) {
				throw Utils.Errors.CANT_OVERRIDE;
			}
			Utils.writeFileTo(target, content, overwrite);

			return true;
		},

		/**
		 * Test the archive
		 *
		 */
		test: function () {
			if (!_zip) {
				return false;
			}

			for (var entry in _zip.entries) {
				try {
					if (entry.isDirectory) {
						continue;
					}
					var content = _zip.entries[entry].getData();
					if (!content) {
						return false;
					}
				} catch (err) {
					return false;
				}
			}
			return true;
		},

		/**
		 * Extracts the entire archive to the given location
		 *
		 * @param targetPath Target location
		 * @param overwrite If the file already exists at the target path, the file will be overwriten if this is true.
		 *                  Default is FALSE
		 */
		extractAllTo: function (/*String*/targetPath, /*Boolean*/overwrite) {
			overwrite = overwrite || false;
			if (!_zip) {
				throw Utils.Errors.NO_ZIP;
			}
			_zip.entries.forEach(function (entry) {
				var entryName = sanitize(targetPath, entry.entryName.toString());
				if (entry.isDirectory) {
					Utils.makeDir(entryName);
					return;
				}
				var content = entry.getData();
				if (!content) {
					throw Utils.Errors.CANT_EXTRACT_FILE;
				}
				Utils.writeFileTo(entryName, content, overwrite);
				try {
					fs.utimesSync(entryName, entry.header.time, entry.header.time)
				} catch (err) {
					throw Utils.Errors.CANT_EXTRACT_FILE;
				}
			})
		},

		/**
		 * Asynchronous extractAllTo
		 *
		 * @param targetPath Target location
		 * @param overwrite If the file already exists at the target path, the file will be overwriten if this is true.
		 *                  Default is FALSE
		 * @param callback
		 */
		extractAllToAsync: function (/*String*/targetPath, /*Boolean*/overwrite, /*Function*/callback) {
			if (!callback) {
				callback = function() {}
			}
			overwrite = overwrite || false;
			if (!_zip) {
				callback(new Error(Utils.Errors.NO_ZIP));
				return;
			}

			var entries = _zip.entries;
			var i = entries.length;
			entries.forEach(function (entry) {
				if (i <= 0) return; // Had an error already

				var entryName = pth.normalize(entry.entryName.toString());

				if (entry.isDirectory) {
					Utils.makeDir(sanitize(targetPath, entryName));
					if (--i === 0)
						callback(undefined);
					return;
				}
				entry.getDataAsync(function (content, err) {
					if (i <= 0) return;
					if (err) {
						callback(new Error(err));
						return;
					}
					if (!content) {
						i = 0;
						callback(new Error(Utils.Errors.CANT_EXTRACT_FILE));
						return;
					}

					Utils.writeFileToAsync(sanitize(targetPath, entryName), content, overwrite, function (succ) {
						try {
							fs.utimesSync(pth.resolve(targetPath, entryName), entry.header.time, entry.header.time);
						} catch (err) {
							callback(new Error('Unable to set utimes'));
						}
						if (i <= 0) return;
						if (!succ) {
							i = 0;
							callback(new Error('Unable to write'));
							return;
						}
						if (--i === 0)
							callback(undefined);
					});
				});
			})
		},

		/**
		 * Writes the newly created zip file to disk at the specified location or if a zip was opened and no ``targetFileName`` is provided, it will overwrite the opened zip
		 *
		 * @param targetFileName
		 * @param callback
		 */
		writeZip: function (/*String*/targetFileName, /*Function*/callback) {
			if (arguments.length === 1) {
				if (typeof targetFileName === "function") {
					callback = targetFileName;
					targetFileName = "";
				}
			}

			if (!targetFileName && _filename) {
				targetFileName = _filename;
			}
			if (!targetFileName) return;

			var zipData = _zip.compressToBuffer();
			if (zipData) {
				var ok = Utils.writeFileTo(targetFileName, zipData, true);
				if (typeof callback === 'function') callback(!ok ? new Error("failed") : null, "");
			}
		},

		/**
		 * Returns the content of the entire zip file as a Buffer object
		 *
		 * @return Buffer
		 */
		toBuffer: function (/*Function*/onSuccess, /*Function*/onFail, /*Function*/onItemStart, /*Function*/onItemEnd) {
			this.valueOf = 2;
			if (typeof onSuccess === "function") {
				_zip.toAsyncBuffer(onSuccess, onFail, onItemStart, onItemEnd);
				return null;
			}
			return _zip.compressToBuffer()
		}
	}
};


/***/ }),

/***/ "./node_modules/adm-zip/headers/entryHeader.js":
/*!*****************************************************!*\
  !*** ./node_modules/adm-zip/headers/entryHeader.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Utils = __webpack_require__(/*! ../util */ "./node_modules/adm-zip/util/index.js"),
    Constants = Utils.Constants;

/* The central directory file header */
module.exports = function () {
    var _verMade = 0x0A,
        _version = 0x0A,
        _flags = 0,
        _method = 0,
        _time = 0,
        _crc = 0,
        _compressedSize = 0,
        _size = 0,
        _fnameLen = 0,
        _extraLen = 0,

        _comLen = 0,
        _diskStart = 0,
        _inattr = 0,
        _attr = 0,
        _offset = 0;

    var _dataHeader = {};

    function setTime(val) {
        val = new Date(val);
        _time = (val.getFullYear() - 1980 & 0x7f) << 25  // b09-16 years from 1980
            | (val.getMonth() + 1) << 21                 // b05-08 month
            | val.getDate() << 16                        // b00-04 hour

            // 2 bytes time
            | val.getHours() << 11    // b11-15 hour
            | val.getMinutes() << 5   // b05-10 minute
            | val.getSeconds() >> 1;  // b00-04 seconds divided by 2
    }

    setTime(+new Date());

    return {
        get made () { return _verMade; },
        set made (val) { _verMade = val; },

        get version () { return _version; },
        set version (val) { _version = val },

        get flags () { return _flags },
        set flags (val) { _flags = val; },

        get method () { return _method; },
        set method (val) { _method = val; },

        get time () { return new Date(
            ((_time >> 25) & 0x7f) + 1980,
            ((_time >> 21) & 0x0f) - 1,
            (_time >> 16) & 0x1f,
            (_time >> 11) & 0x1f,
            (_time >> 5) & 0x3f,
            (_time & 0x1f) << 1
        );
        },
        set time (val) {
            setTime(val);
        },

        get crc () { return _crc; },
        set crc (val) { _crc = val; },

        get compressedSize () { return _compressedSize; },
        set compressedSize (val) { _compressedSize = val; },

        get size () { return _size; },
        set size (val) { _size = val; },

        get fileNameLength () { return _fnameLen; },
        set fileNameLength (val) { _fnameLen = val; },

        get extraLength () { return _extraLen },
        set extraLength (val) { _extraLen = val; },

        get commentLength () { return _comLen },
        set commentLength (val) { _comLen = val },

        get diskNumStart () { return _diskStart },
        set diskNumStart (val) { _diskStart = val },

        get inAttr () { return _inattr },
        set inAttr (val) { _inattr = val },

        get attr () { return _attr },
        set attr (val) { _attr = val },

        get offset () { return _offset },
        set offset (val) { _offset = val },

        get encripted () { return (_flags & 1) === 1 },

        get entryHeaderSize () {
            return Constants.CENHDR + _fnameLen + _extraLen + _comLen;
        },

        get realDataOffset () {
            return _offset + Constants.LOCHDR + _dataHeader.fnameLen + _dataHeader.extraLen;
        },

        get dataHeader () {
            return _dataHeader;
        },

        loadDataHeaderFromBinary : function(/*Buffer*/input) {
            var data = input.slice(_offset, _offset + Constants.LOCHDR);
            // 30 bytes and should start with "PK\003\004"
            if (data.readUInt32LE(0) !== Constants.LOCSIG) {
                throw Utils.Errors.INVALID_LOC;
            }
            _dataHeader = {
                // version needed to extract
                version : data.readUInt16LE(Constants.LOCVER),
                // general purpose bit flag
                flags : data.readUInt16LE(Constants.LOCFLG),
                // compression method
                method : data.readUInt16LE(Constants.LOCHOW),
                // modification time (2 bytes time, 2 bytes date)
                time : data.readUInt32LE(Constants.LOCTIM),
                // uncompressed file crc-32 value
                crc : data.readUInt32LE(Constants.LOCCRC),
                // compressed size
                compressedSize : data.readUInt32LE(Constants.LOCSIZ),
                // uncompressed size
                size : data.readUInt32LE(Constants.LOCLEN),
                // filename length
                fnameLen : data.readUInt16LE(Constants.LOCNAM),
                // extra field length
                extraLen : data.readUInt16LE(Constants.LOCEXT)
            }
        },

        loadFromBinary : function(/*Buffer*/data) {
            // data should be 46 bytes and start with "PK 01 02"
            if (data.length !== Constants.CENHDR || data.readUInt32LE(0) !== Constants.CENSIG) {
                throw Utils.Errors.INVALID_CEN;
            }
            // version made by
            _verMade = data.readUInt16LE(Constants.CENVEM);
            // version needed to extract
            _version = data.readUInt16LE(Constants.CENVER);
            // encrypt, decrypt flags
            _flags = data.readUInt16LE(Constants.CENFLG);
            // compression method
            _method = data.readUInt16LE(Constants.CENHOW);
            // modification time (2 bytes time, 2 bytes date)
            _time = data.readUInt32LE(Constants.CENTIM);
            // uncompressed file crc-32 value
            _crc = data.readUInt32LE(Constants.CENCRC);
            // compressed size
            _compressedSize = data.readUInt32LE(Constants.CENSIZ);
            // uncompressed size
            _size = data.readUInt32LE(Constants.CENLEN);
            // filename length
            _fnameLen = data.readUInt16LE(Constants.CENNAM);
            // extra field length
            _extraLen = data.readUInt16LE(Constants.CENEXT);
            // file comment length
            _comLen = data.readUInt16LE(Constants.CENCOM);
            // volume number start
            _diskStart = data.readUInt16LE(Constants.CENDSK);
            // internal file attributes
            _inattr = data.readUInt16LE(Constants.CENATT);
            // external file attributes
            _attr = data.readUInt32LE(Constants.CENATX);
            // LOC header offset
            _offset = data.readUInt32LE(Constants.CENOFF);
        },

        dataHeaderToBinary : function() {
            // LOC header size (30 bytes)
            var data = Buffer.alloc(Constants.LOCHDR);
            // "PK\003\004"
            data.writeUInt32LE(Constants.LOCSIG, 0);
            // version needed to extract
            data.writeUInt16LE(_version, Constants.LOCVER);
            // general purpose bit flag
            data.writeUInt16LE(_flags, Constants.LOCFLG);
            // compression method
            data.writeUInt16LE(_method, Constants.LOCHOW);
            // modification time (2 bytes time, 2 bytes date)
            data.writeUInt32LE(_time, Constants.LOCTIM);
            // uncompressed file crc-32 value
            data.writeUInt32LE(_crc, Constants.LOCCRC);
            // compressed size
            data.writeUInt32LE(_compressedSize, Constants.LOCSIZ);
            // uncompressed size
            data.writeUInt32LE(_size, Constants.LOCLEN);
            // filename length
            data.writeUInt16LE(_fnameLen, Constants.LOCNAM);
            // extra field length
            data.writeUInt16LE(_extraLen, Constants.LOCEXT);
            return data;
        },

        entryHeaderToBinary : function() {
            // CEN header size (46 bytes)
            var data = Buffer.alloc(Constants.CENHDR + _fnameLen + _extraLen + _comLen);
            // "PK\001\002"
            data.writeUInt32LE(Constants.CENSIG, 0);
            // version made by
            data.writeUInt16LE(_verMade, Constants.CENVEM);
            // version needed to extract
            data.writeUInt16LE(_version, Constants.CENVER);
            // encrypt, decrypt flags
            data.writeUInt16LE(_flags, Constants.CENFLG);
            // compression method
            data.writeUInt16LE(_method, Constants.CENHOW);
            // modification time (2 bytes time, 2 bytes date)
            data.writeUInt32LE(_time, Constants.CENTIM);
            // uncompressed file crc-32 value
            data.writeInt32LE(_crc & 0xFFFF, Constants.CENCRC, true);
            // compressed size
            data.writeUInt32LE(_compressedSize, Constants.CENSIZ);
            // uncompressed size
            data.writeUInt32LE(_size, Constants.CENLEN);
            // filename length
            data.writeUInt16LE(_fnameLen, Constants.CENNAM);
            // extra field length
            data.writeUInt16LE(_extraLen, Constants.CENEXT);
            // file comment length
            data.writeUInt16LE(_comLen, Constants.CENCOM);
            // volume number start
            data.writeUInt16LE(_diskStart, Constants.CENDSK);
            // internal file attributes
            data.writeUInt16LE(_inattr, Constants.CENATT);
            // external file attributes
            data.writeUInt32LE(_attr, Constants.CENATX);
            // LOC header offset
            data.writeUInt32LE(_offset, Constants.CENOFF);
            // fill all with
            data.fill(0x00, Constants.CENHDR);
            return data;
        },

        toString : function() {
            return '{\n' +
                '\t"made" : ' + _verMade + ",\n" +
                '\t"version" : ' + _version + ",\n" +
                '\t"flags" : ' + _flags + ",\n" +
                '\t"method" : ' + Utils.methodToString(_method) + ",\n" +
                '\t"time" : ' + this.time + ",\n" +
                '\t"crc" : 0x' + _crc.toString(16).toUpperCase() + ",\n" +
                '\t"compressedSize" : ' + _compressedSize + " bytes,\n" +
                '\t"size" : ' + _size + " bytes,\n" +
                '\t"fileNameLength" : ' + _fnameLen + ",\n" +
                '\t"extraLength" : ' + _extraLen + " bytes,\n" +
                '\t"commentLength" : ' + _comLen + " bytes,\n" +
                '\t"diskNumStart" : ' + _diskStart + ",\n" +
                '\t"inAttr" : ' + _inattr + ",\n" +
                '\t"attr" : ' + _attr + ",\n" +
                '\t"offset" : ' + _offset + ",\n" +
                '\t"entryHeaderSize" : ' + (Constants.CENHDR + _fnameLen + _extraLen + _comLen) + " bytes\n" +
                '}';
        }
    }
};


/***/ }),

/***/ "./node_modules/adm-zip/headers/index.js":
/*!***********************************************!*\
  !*** ./node_modules/adm-zip/headers/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports.EntryHeader = __webpack_require__(/*! ./entryHeader */ "./node_modules/adm-zip/headers/entryHeader.js");
exports.MainHeader = __webpack_require__(/*! ./mainHeader */ "./node_modules/adm-zip/headers/mainHeader.js");


/***/ }),

/***/ "./node_modules/adm-zip/headers/mainHeader.js":
/*!****************************************************!*\
  !*** ./node_modules/adm-zip/headers/mainHeader.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Utils = __webpack_require__(/*! ../util */ "./node_modules/adm-zip/util/index.js"),
    Constants = Utils.Constants;

/* The entries in the end of central directory */
module.exports = function () {
    var _volumeEntries = 0,
        _totalEntries = 0,
        _size = 0,
        _offset = 0,
        _commentLength = 0;

    return {
        get diskEntries () { return _volumeEntries },
        set diskEntries (/*Number*/val) { _volumeEntries = _totalEntries = val; },

        get totalEntries () { return _totalEntries },
        set totalEntries (/*Number*/val) { _totalEntries = _volumeEntries = val; },

        get size () { return _size },
        set size (/*Number*/val) { _size = val; },

        get offset () { return _offset },
        set offset (/*Number*/val) { _offset = val; },

        get commentLength () { return _commentLength },
        set commentLength (/*Number*/val) { _commentLength = val; },

        get mainHeaderSize () {
            return Constants.ENDHDR + _commentLength;
        },

        loadFromBinary : function(/*Buffer*/data) {
            // data should be 22 bytes and start with "PK 05 06"
            if (data.length !== Constants.ENDHDR || data.readUInt32LE(0) !== Constants.ENDSIG)
                throw Utils.Errors.INVALID_END;

            // number of entries on this volume
            _volumeEntries = data.readUInt16LE(Constants.ENDSUB);
            // total number of entries
            _totalEntries = data.readUInt16LE(Constants.ENDTOT);
            // central directory size in bytes
            _size = data.readUInt32LE(Constants.ENDSIZ);
            // offset of first CEN header
            _offset = data.readUInt32LE(Constants.ENDOFF);
            // zip file comment length
            _commentLength = data.readUInt16LE(Constants.ENDCOM);
        },

        toBinary : function() {
           var b = Buffer.alloc(Constants.ENDHDR + _commentLength);
            // "PK 05 06" signature
            b.writeUInt32LE(Constants.ENDSIG, 0);
            b.writeUInt32LE(0, 4);
            // number of entries on this volume
            b.writeUInt16LE(_volumeEntries, Constants.ENDSUB);
            // total number of entries
            b.writeUInt16LE(_totalEntries, Constants.ENDTOT);
            // central directory size in bytes
            b.writeUInt32LE(_size, Constants.ENDSIZ);
            // offset of first CEN header
            b.writeUInt32LE(_offset, Constants.ENDOFF);
            // zip file comment length
            b.writeUInt16LE(_commentLength, Constants.ENDCOM);
            // fill comment memory with spaces so no garbage is left there
            b.fill(" ", Constants.ENDHDR);

            return b;
        },

        toString : function() {
            return '{\n' +
                '\t"diskEntries" : ' + _volumeEntries + ",\n" +
                '\t"totalEntries" : ' + _totalEntries + ",\n" +
                '\t"size" : ' + _size + " bytes,\n" +
                '\t"offset" : 0x' + _offset.toString(16).toUpperCase() + ",\n" +
                '\t"commentLength" : 0x' + _commentLength + "\n" +
            '}';
        }
    }
};

/***/ }),

/***/ "./node_modules/adm-zip/methods/deflater.js":
/*!**************************************************!*\
  !*** ./node_modules/adm-zip/methods/deflater.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function (/*Buffer*/inbuf) {

  var zlib = __webpack_require__(/*! zlib */ "zlib");
  
  var opts = {chunkSize: (parseInt(inbuf.length / 1024) + 1) * 1024};
  
  return {
    deflate: function () {
      return zlib.deflateRawSync(inbuf, opts);
    },

    deflateAsync: function (/*Function*/callback) {
      var tmp = zlib.createDeflateRaw(opts), parts = [], total = 0;
      tmp.on('data', function (data) {
        parts.push(data);
        total += data.length;
      });
      tmp.on('end', function () {
        var buf = Buffer.alloc(total), written = 0;
        buf.fill(0);
        for (var i = 0; i < parts.length; i++) {
          var part = parts[i];
          part.copy(buf, written);
          written += part.length;
        }
        callback && callback(buf);
      });
      tmp.end(inbuf);
    }
  }
};


/***/ }),

/***/ "./node_modules/adm-zip/methods/index.js":
/*!***********************************************!*\
  !*** ./node_modules/adm-zip/methods/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports.Deflater = __webpack_require__(/*! ./deflater */ "./node_modules/adm-zip/methods/deflater.js");
exports.Inflater = __webpack_require__(/*! ./inflater */ "./node_modules/adm-zip/methods/inflater.js");

/***/ }),

/***/ "./node_modules/adm-zip/methods/inflater.js":
/*!**************************************************!*\
  !*** ./node_modules/adm-zip/methods/inflater.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = function (/*Buffer*/inbuf) {

  var zlib = __webpack_require__(/*! zlib */ "zlib");

  return {
    inflate: function () {
      return zlib.inflateRawSync(inbuf);
    },

    inflateAsync: function (/*Function*/callback) {
      var tmp = zlib.createInflateRaw(), parts = [], total = 0;
      tmp.on('data', function (data) {
        parts.push(data);
        total += data.length;
      });
      tmp.on('end', function () {
        var buf = Buffer.alloc(total), written = 0;
        buf.fill(0);
        for (var i = 0; i < parts.length; i++) {
          var part = parts[i];
          part.copy(buf, written);
          written += part.length;
        }
        callback && callback(buf);
      });
      tmp.end(inbuf);
    }
  }
};


/***/ }),

/***/ "./node_modules/adm-zip/util/constants.js":
/*!************************************************!*\
  !*** ./node_modules/adm-zip/util/constants.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
    /* The local file header */
    LOCHDR           : 30, // LOC header size
    LOCSIG           : 0x04034b50, // "PK\003\004"
    LOCVER           : 4,	// version needed to extract
    LOCFLG           : 6, // general purpose bit flag
    LOCHOW           : 8, // compression method
    LOCTIM           : 10, // modification time (2 bytes time, 2 bytes date)
    LOCCRC           : 14, // uncompressed file crc-32 value
    LOCSIZ           : 18, // compressed size
    LOCLEN           : 22, // uncompressed size
    LOCNAM           : 26, // filename length
    LOCEXT           : 28, // extra field length

    /* The Data descriptor */
    EXTSIG           : 0x08074b50, // "PK\007\008"
    EXTHDR           : 16, // EXT header size
    EXTCRC           : 4, // uncompressed file crc-32 value
    EXTSIZ           : 8, // compressed size
    EXTLEN           : 12, // uncompressed size

    /* The central directory file header */
    CENHDR           : 46, // CEN header size
    CENSIG           : 0x02014b50, // "PK\001\002"
    CENVEM           : 4, // version made by
    CENVER           : 6, // version needed to extract
    CENFLG           : 8, // encrypt, decrypt flags
    CENHOW           : 10, // compression method
    CENTIM           : 12, // modification time (2 bytes time, 2 bytes date)
    CENCRC           : 16, // uncompressed file crc-32 value
    CENSIZ           : 20, // compressed size
    CENLEN           : 24, // uncompressed size
    CENNAM           : 28, // filename length
    CENEXT           : 30, // extra field length
    CENCOM           : 32, // file comment length
    CENDSK           : 34, // volume number start
    CENATT           : 36, // internal file attributes
    CENATX           : 38, // external file attributes (host system dependent)
    CENOFF           : 42, // LOC header offset

    /* The entries in the end of central directory */
    ENDHDR           : 22, // END header size
    ENDSIG           : 0x06054b50, // "PK\005\006"
    ENDSUB           : 8, // number of entries on this disk
    ENDTOT           : 10, // total number of entries
    ENDSIZ           : 12, // central directory size in bytes
    ENDOFF           : 16, // offset of first CEN header
    ENDCOM           : 20, // zip file comment length

    /* Compression methods */
    STORED           : 0, // no compression
    SHRUNK           : 1, // shrunk
    REDUCED1         : 2, // reduced with compression factor 1
    REDUCED2         : 3, // reduced with compression factor 2
    REDUCED3         : 4, // reduced with compression factor 3
    REDUCED4         : 5, // reduced with compression factor 4
    IMPLODED         : 6, // imploded
    // 7 reserved
    DEFLATED         : 8, // deflated
    ENHANCED_DEFLATED: 9, // enhanced deflated
    PKWARE           : 10,// PKWare DCL imploded
    // 11 reserved
    BZIP2            : 12, //  compressed using BZIP2
    // 13 reserved
    LZMA             : 14, // LZMA
    // 15-17 reserved
    IBM_TERSE        : 18, // compressed using IBM TERSE
    IBM_LZ77         : 19, //IBM LZ77 z

    /* General purpose bit flag */
    FLG_ENC          : 0,  // encripted file
    FLG_COMP1        : 1,  // compression option
    FLG_COMP2        : 2,  // compression option
    FLG_DESC         : 4,  // data descriptor
    FLG_ENH          : 8,  // enhanced deflation
    FLG_STR          : 16, // strong encryption
    FLG_LNG          : 1024, // language encoding
    FLG_MSK          : 4096, // mask header values

    /* Load type */
    FILE             : 0,
    BUFFER           : 1,
    NONE             : 2,

    /* 4.5 Extensible data fields */
    EF_ID            : 0,
    EF_SIZE          : 2,

    /* Header IDs */
    ID_ZIP64         : 0x0001,
    ID_AVINFO        : 0x0007,
    ID_PFS           : 0x0008,
    ID_OS2           : 0x0009,
    ID_NTFS          : 0x000a,
    ID_OPENVMS       : 0x000c,
    ID_UNIX          : 0x000d,
    ID_FORK          : 0x000e,
    ID_PATCH         : 0x000f,
    ID_X509_PKCS7    : 0x0014,
    ID_X509_CERTID_F : 0x0015,
    ID_X509_CERTID_C : 0x0016,
    ID_STRONGENC     : 0x0017,
    ID_RECORD_MGT    : 0x0018,
    ID_X509_PKCS7_RL : 0x0019,
    ID_IBM1          : 0x0065,
    ID_IBM2          : 0x0066,
    ID_POSZIP        : 0x4690,

    EF_ZIP64_OR_32   : 0xffffffff,
    EF_ZIP64_OR_16   : 0xffff,
    EF_ZIP64_SUNCOMP : 0,
    EF_ZIP64_SCOMP   : 8,
    EF_ZIP64_RHO     : 16,
    EF_ZIP64_DSN     : 24
};


/***/ }),

/***/ "./node_modules/adm-zip/util/errors.js":
/*!*********************************************!*\
  !*** ./node_modules/adm-zip/util/errors.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
    /* Header error messages */
    "INVALID_LOC" : "Invalid LOC header (bad signature)",
    "INVALID_CEN" : "Invalid CEN header (bad signature)",
    "INVALID_END" : "Invalid END header (bad signature)",

    /* ZipEntry error messages*/
    "NO_DATA" : "Nothing to decompress",
    "BAD_CRC" : "CRC32 checksum failed",
    "FILE_IN_THE_WAY" : "There is a file in the way: %s",
    "UNKNOWN_METHOD" : "Invalid/unsupported compression method",

    /* Inflater error messages */
    "AVAIL_DATA" : "inflate::Available inflate data did not terminate",
    "INVALID_DISTANCE" : "inflate::Invalid literal/length or distance code in fixed or dynamic block",
    "TO_MANY_CODES" : "inflate::Dynamic block code description: too many length or distance codes",
    "INVALID_REPEAT_LEN" : "inflate::Dynamic block code description: repeat more than specified lengths",
    "INVALID_REPEAT_FIRST" : "inflate::Dynamic block code description: repeat lengths with no first length",
    "INCOMPLETE_CODES" : "inflate::Dynamic block code description: code lengths codes incomplete",
    "INVALID_DYN_DISTANCE": "inflate::Dynamic block code description: invalid distance code lengths",
    "INVALID_CODES_LEN": "inflate::Dynamic block code description: invalid literal/length code lengths",
    "INVALID_STORE_BLOCK" : "inflate::Stored block length did not match one's complement",
    "INVALID_BLOCK_TYPE" : "inflate::Invalid block type (type == 3)",

    /* ADM-ZIP error messages */
    "CANT_EXTRACT_FILE" : "Could not extract the file",
    "CANT_OVERRIDE" : "Target file already exists",
    "NO_ZIP" : "No zip file was loaded",
    "NO_ENTRY" : "Entry doesn't exist",
    "DIRECTORY_CONTENT_ERROR" : "A directory cannot have content",
    "FILE_NOT_FOUND" : "File not found: %s",
    "NOT_IMPLEMENTED" : "Not implemented",
    "INVALID_FILENAME" : "Invalid filename",
    "INVALID_FORMAT" : "Invalid or unsupported zip format. No END header found"
};

/***/ }),

/***/ "./node_modules/adm-zip/util/fattr.js":
/*!********************************************!*\
  !*** ./node_modules/adm-zip/util/fattr.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fs = __webpack_require__(/*! ./fileSystem */ "./node_modules/adm-zip/util/fileSystem.js").require(),
    pth = __webpack_require__(/*! path */ "path");
	
fs.existsSync = fs.existsSync || pth.existsSync;

module.exports = function(/*String*/path) {

    var _path = path || "",
        _permissions = 0,
        _obj = newAttr(),
        _stat = null;

    function newAttr() {
        return {
            directory : false,
            readonly : false,
            hidden : false,
            executable : false,
            mtime : 0,
            atime : 0
        }
    }

    if (_path && fs.existsSync(_path)) {
        _stat = fs.statSync(_path);
        _obj.directory = _stat.isDirectory();
        _obj.mtime = _stat.mtime;
        _obj.atime = _stat.atime;
        _obj.executable = !!(1 & parseInt ((_stat.mode & parseInt ("777", 8)).toString (8)[0]));
        _obj.readonly = !!(2 & parseInt ((_stat.mode & parseInt ("777", 8)).toString (8)[0]));
        _obj.hidden = pth.basename(_path)[0] === ".";
    } else {
        console.warn("Invalid path: " + _path)
    }

    return {

        get directory () {
            return _obj.directory;
        },

        get readOnly () {
            return _obj.readonly;
        },

        get hidden () {
            return _obj.hidden;
        },

        get mtime () {
            return _obj.mtime;
        },

        get atime () {
           return _obj.atime;
        },


        get executable () {
            return _obj.executable;
        },

        decodeAttributes : function(val) {

        },

        encodeAttributes : function (val) {

        },

        toString : function() {
           return '{\n' +
               '\t"path" : "' + _path + ",\n" +
               '\t"isDirectory" : ' + _obj.directory + ",\n" +
               '\t"isReadOnly" : ' + _obj.readonly + ",\n" +
               '\t"isHidden" : ' + _obj.hidden + ",\n" +
               '\t"isExecutable" : ' + _obj.executable + ",\n" +
               '\t"mTime" : ' + _obj.mtime + "\n" +
               '\t"aTime" : ' + _obj.atime + "\n" +
           '}';
        }
    }

};


/***/ }),

/***/ "./node_modules/adm-zip/util/fileSystem.js":
/*!*************************************************!*\
  !*** ./node_modules/adm-zip/util/fileSystem.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports.require = function() {
  var fs = __webpack_require__(/*! fs */ "fs");
  if (process.versions['electron']) {
	  try {
	    originalFs = __webpack_require__(/*! original-fs */ "./node_modules/original-fs/index.js");
	    if (Object.keys(originalFs).length > 0) {
	      fs = originalFs;
      }
	  } catch (e) {}
  }
  return fs
};


/***/ }),

/***/ "./node_modules/adm-zip/util/index.js":
/*!********************************************!*\
  !*** ./node_modules/adm-zip/util/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./utils */ "./node_modules/adm-zip/util/utils.js");
module.exports.FileSystem = __webpack_require__(/*! ./fileSystem */ "./node_modules/adm-zip/util/fileSystem.js");
module.exports.Constants = __webpack_require__(/*! ./constants */ "./node_modules/adm-zip/util/constants.js");
module.exports.Errors = __webpack_require__(/*! ./errors */ "./node_modules/adm-zip/util/errors.js");
module.exports.FileAttr = __webpack_require__(/*! ./fattr */ "./node_modules/adm-zip/util/fattr.js");

/***/ }),

/***/ "./node_modules/adm-zip/util/utils.js":
/*!********************************************!*\
  !*** ./node_modules/adm-zip/util/utils.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fs = __webpack_require__(/*! ./fileSystem */ "./node_modules/adm-zip/util/fileSystem.js").require(),
    pth = __webpack_require__(/*! path */ "path");

fs.existsSync = fs.existsSync || pth.existsSync;

module.exports = (function() {

    var crcTable = [],
        Constants = __webpack_require__(/*! ./constants */ "./node_modules/adm-zip/util/constants.js"),
        Errors = __webpack_require__(/*! ./errors */ "./node_modules/adm-zip/util/errors.js"),

        PATH_SEPARATOR = pth.sep;


    function mkdirSync(/*String*/path) {
        var resolvedPath = path.split(PATH_SEPARATOR)[0];
        path.split(PATH_SEPARATOR).forEach(function(name) {
            if (!name || name.substr(-1,1) === ":") return;
            resolvedPath += PATH_SEPARATOR + name;
            var stat;
            try {
                stat = fs.statSync(resolvedPath);
            } catch (e) {
                fs.mkdirSync(resolvedPath);
            }
            if (stat && stat.isFile())
                throw Errors.FILE_IN_THE_WAY.replace("%s", resolvedPath);
        });
    }

    function findSync(/*String*/dir, /*RegExp*/pattern, /*Boolean*/recoursive) {
        if (typeof pattern === 'boolean') {
            recoursive = pattern;
            pattern = undefined;
        }
        var files = [];
        fs.readdirSync(dir).forEach(function(file) {
            var path = pth.join(dir, file);

            if (fs.statSync(path).isDirectory() && recoursive)
                files = files.concat(findSync(path, pattern, recoursive));

            if (!pattern || pattern.test(path)) {
                files.push(pth.normalize(path) + (fs.statSync(path).isDirectory() ? PATH_SEPARATOR : ""));
            }

        });
        return files;
    }

    return {
        makeDir : function(/*String*/path) {
            mkdirSync(path);
        },

        crc32 : function(buf) {
            if (typeof buf === 'string') {
                buf = Buffer.alloc(buf.length, buf);
            }
            var b = Buffer.alloc(4);
            if (!crcTable.length) {
                for (var n = 0; n < 256; n++) {
                    var c = n;
                    for (var k = 8; --k >= 0;)  //
                        if ((c & 1) !== 0)  { c = 0xedb88320 ^ (c >>> 1); } else { c = c >>> 1; }
                    if (c < 0) {
                        b.writeInt32LE(c, 0);
                        c = b.readUInt32LE(0);
                    }
                    crcTable[n] = c;
                }
            }
            var crc = 0, off = 0, len = buf.length, c1 = ~crc;
            while(--len >= 0) c1 = crcTable[(c1 ^ buf[off++]) & 0xff] ^ (c1 >>> 8);
            crc = ~c1;
            b.writeInt32LE(crc & 0xffffffff, 0);
            return b.readUInt32LE(0);
        },

        methodToString : function(/*Number*/method) {
            switch (method) {
                case Constants.STORED:
                    return 'STORED (' + method + ')';
                case Constants.DEFLATED:
                    return 'DEFLATED (' + method + ')';
                default:
                    return 'UNSUPPORTED (' + method + ')';
            }

        },

        writeFileTo : function(/*String*/path, /*Buffer*/content, /*Boolean*/overwrite, /*Number*/attr) {
            if (fs.existsSync(path)) {
                if (!overwrite)
                    return false; // cannot overwrite

                var stat = fs.statSync(path);
                if (stat.isDirectory()) {
                    return false;
                }
            }
            var folder = pth.dirname(path);
            if (!fs.existsSync(folder)) {
                mkdirSync(folder);
            }

            var fd;
            try {
                fd = fs.openSync(path, 'w', 438); // 0666
            } catch(e) {
                fs.chmodSync(path, 438);
                fd = fs.openSync(path, 'w', 438);
            }
            if (fd) {
                try {
                    fs.writeSync(fd, content, 0, content.length, 0);
                }
                catch (e){
                    throw e;
                }
                finally {
                    fs.closeSync(fd);
                }
            }
            fs.chmodSync(path, attr || 438);
            return true;
        },

        writeFileToAsync : function(/*String*/path, /*Buffer*/content, /*Boolean*/overwrite, /*Number*/attr, /*Function*/callback) {
            if(typeof attr === 'function') {
                callback = attr;
                attr = undefined;
            }

            fs.exists(path, function(exists) {
                if(exists && !overwrite)
                    return callback(false);

                fs.stat(path, function(err, stat) {
                    if(exists &&stat.isDirectory()) {
                        return callback(false);
                    }

                    var folder = pth.dirname(path);
                    fs.exists(folder, function(exists) {
                        if(!exists)
                            mkdirSync(folder);

                        fs.open(path, 'w', 438, function(err, fd) {
                            if(err) {
                                fs.chmod(path, 438, function() {
                                    fs.open(path, 'w', 438, function(err, fd) {
                                        fs.write(fd, content, 0, content.length, 0, function() {
                                            fs.close(fd, function() {
                                                fs.chmod(path, attr || 438, function() {
                                                    callback(true);
                                                })
                                            });
                                        });
                                    });
                                })
                            } else {
                                if(fd) {
                                    fs.write(fd, content, 0, content.length, 0, function() {
                                        fs.close(fd, function() {
                                            fs.chmod(path, attr || 438, function() {
                                                callback(true);
                                            })
                                        });
                                    });
                                } else {
                                    fs.chmod(path, attr || 438, function() {
                                        callback(true);
                                    })
                                }
                            }
                        });
                    })
                })
            })
        },

        findFiles : function(/*String*/path) {
            return findSync(path, true);
        },

        getAttributes : function(/*String*/path) {

        },

        setAttributes : function(/*String*/path) {

        },

        toBuffer : function(input) {
            if (Buffer.isBuffer(input)) {
                return input;
            } else {
                if (input.length === 0) {
                    return Buffer.alloc(0)
                }
                return Buffer.from(input, 'utf8');
            }
        },

        Constants : Constants,
        Errors : Errors
    }
})();


/***/ }),

/***/ "./node_modules/adm-zip/zipEntry.js":
/*!******************************************!*\
  !*** ./node_modules/adm-zip/zipEntry.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Utils = __webpack_require__(/*! ./util */ "./node_modules/adm-zip/util/index.js"),
    Headers = __webpack_require__(/*! ./headers */ "./node_modules/adm-zip/headers/index.js"),
    Constants = Utils.Constants,
    Methods = __webpack_require__(/*! ./methods */ "./node_modules/adm-zip/methods/index.js");

module.exports = function (/*Buffer*/input) {

    var _entryHeader = new Headers.EntryHeader(),
        _entryName = Buffer.alloc(0),
        _comment = Buffer.alloc(0),
        _isDirectory = false,
        uncompressedData = null,
        _extra = Buffer.alloc(0);

    function getCompressedDataFromZip() {
        if (!input || !Buffer.isBuffer(input)) {
            return Buffer.alloc(0);
        }
        _entryHeader.loadDataHeaderFromBinary(input);
        return input.slice(_entryHeader.realDataOffset, _entryHeader.realDataOffset + _entryHeader.compressedSize)
    }

    function crc32OK(data) {
        // if bit 3 (0x08) of the general-purpose flags field is set, then the CRC-32 and file sizes are not known when the header is written
        if ((_entryHeader.flags & 0x8) !== 0x8) {
           if (Utils.crc32(data) !== _entryHeader.dataHeader.crc) {
               return false;
           }
        } else {
            // @TODO: load and check data descriptor header
            // The fields in the local header are filled with zero, and the CRC-32 and size are appended in a 12-byte structure
            // (optionally preceded by a 4-byte signature) immediately after the compressed data:
        }
        return true;
    }

    function decompress(/*Boolean*/async, /*Function*/callback, /*String*/pass) {
        if(typeof callback === 'undefined' && typeof async === 'string') {
            pass=async;
            async=void 0;
        }
        if (_isDirectory) {
            if (async && callback) {
                callback(Buffer.alloc(0), Utils.Errors.DIRECTORY_CONTENT_ERROR); //si added error.
            }
            return Buffer.alloc(0);
        }

        var compressedData = getCompressedDataFromZip();
       
        if (compressedData.length === 0) {
            if (async && callback) callback(compressedData, Utils.Errors.NO_DATA);//si added error.
            return compressedData;
        }

        var data = Buffer.alloc(_entryHeader.size);

        switch (_entryHeader.method) {
            case Utils.Constants.STORED:
                compressedData.copy(data);
                if (!crc32OK(data)) {
                    if (async && callback) callback(data, Utils.Errors.BAD_CRC);//si added error
                    return Utils.Errors.BAD_CRC;
                } else {//si added otherwise did not seem to return data.
                    if (async && callback) callback(data);
                    return data;
                }
            case Utils.Constants.DEFLATED:
                var inflater = new Methods.Inflater(compressedData);
                if (!async) {
                    var result = inflater.inflate(data);
                    result.copy(data, 0);
                    if (!crc32OK(data)) {
                        console.warn(Utils.Errors.BAD_CRC + " " + _entryName.toString())
                    }
                    return data;
                } else {
                    inflater.inflateAsync(function(result) {
                        result.copy(data, 0);
                        if (!crc32OK(data)) {
                            if (callback) callback(data, Utils.Errors.BAD_CRC); //si added error
                        } else { //si added otherwise did not seem to return data.
                            if (callback) callback(data);
                        }
                    })
                }
                break;
            default:
                if (async && callback) callback(Buffer.alloc(0), Utils.Errors.UNKNOWN_METHOD);
                return Utils.Errors.UNKNOWN_METHOD;
        }
    }

    function compress(/*Boolean*/async, /*Function*/callback) {
        if ((!uncompressedData || !uncompressedData.length) && Buffer.isBuffer(input)) {
            // no data set or the data wasn't changed to require recompression
            if (async && callback) callback(getCompressedDataFromZip());
            return getCompressedDataFromZip();
        }

        if (uncompressedData.length && !_isDirectory) {
            var compressedData;
            // Local file header
            switch (_entryHeader.method) {
                case Utils.Constants.STORED:
                    _entryHeader.compressedSize = _entryHeader.size;

                    compressedData = Buffer.alloc(uncompressedData.length);
                    uncompressedData.copy(compressedData);

                    if (async && callback) callback(compressedData);
                    return compressedData;
                default:
                case Utils.Constants.DEFLATED:

                    var deflater = new Methods.Deflater(uncompressedData);
                    if (!async) {
                        var deflated = deflater.deflate();
                        _entryHeader.compressedSize = deflated.length;
                        return deflated;
                    } else {
                        deflater.deflateAsync(function(data) {
                            compressedData = Buffer.alloc(data.length);
                            _entryHeader.compressedSize = data.length;
                            data.copy(compressedData);
                            callback && callback(compressedData);
                        })
                    }
                    deflater = null;
                    break;
            }
        } else {
            if (async && callback) {
                callback(Buffer.alloc(0));
            } else {
                return Buffer.alloc(0);
            }
        }
    }

    function readUInt64LE(buffer, offset) {
        return (buffer.readUInt32LE(offset + 4) << 4) + buffer.readUInt32LE(offset);
    }

    function parseExtra(data) {
        var offset = 0;
        var signature, size, part;
        while(offset<data.length) {
            signature = data.readUInt16LE(offset);
            offset += 2;
            size = data.readUInt16LE(offset);
            offset += 2;
            part = data.slice(offset, offset+size);
            offset += size;
            if(Constants.ID_ZIP64 === signature) {
                parseZip64ExtendedInformation(part);
            }
        }
    }

    //Override header field values with values from the ZIP64 extra field
    function parseZip64ExtendedInformation(data) {
        var size, compressedSize, offset, diskNumStart;

        if(data.length >= Constants.EF_ZIP64_SCOMP) {
            size = readUInt64LE(data, Constants.EF_ZIP64_SUNCOMP);
            if(_entryHeader.size === Constants.EF_ZIP64_OR_32) {
                _entryHeader.size = size;
            }
        }
        if(data.length >= Constants.EF_ZIP64_RHO) {
            compressedSize = readUInt64LE(data, Constants.EF_ZIP64_SCOMP);
            if(_entryHeader.compressedSize === Constants.EF_ZIP64_OR_32) {
                _entryHeader.compressedSize = compressedSize;
            }
        }
        if(data.length >= Constants.EF_ZIP64_DSN) {
            offset = readUInt64LE(data, Constants.EF_ZIP64_RHO);
            if(_entryHeader.offset === Constants.EF_ZIP64_OR_32) {
                _entryHeader.offset = offset;
            }
        }
        if(data.length >= Constants.EF_ZIP64_DSN+4) {
            diskNumStart = data.readUInt32LE(Constants.EF_ZIP64_DSN);
            if(_entryHeader.diskNumStart === Constants.EF_ZIP64_OR_16) {
                _entryHeader.diskNumStart = diskNumStart;
            }
        }
    }


    return {
        get entryName () { return _entryName.toString(); },
        get rawEntryName() { return _entryName; },
        set entryName (val) {
            _entryName = Utils.toBuffer(val);
            var lastChar = _entryName[_entryName.length - 1];
            _isDirectory = (lastChar === 47) || (lastChar === 92);
            _entryHeader.fileNameLength = _entryName.length;
        },

        get extra () { return _extra; },
        set extra (val) {
            _extra = val;
            _entryHeader.extraLength = val.length;
            parseExtra(val);
        },

        get comment () { return _comment.toString(); },
        set comment (val) {
            _comment = Utils.toBuffer(val);
            _entryHeader.commentLength = _comment.length;
        },

        get name () { var n = _entryName.toString(); return _isDirectory ? n.substr(n.length - 1).split("/").pop() : n.split("/").pop(); },
        get isDirectory () { return _isDirectory },

        getCompressedData : function() {
            return compress(false, null)
        },

        getCompressedDataAsync : function(/*Function*/callback) {
            compress(true, callback)
        },

        setData : function(value) {
            uncompressedData = Utils.toBuffer(value);
            if (!_isDirectory && uncompressedData.length) {
                _entryHeader.size = uncompressedData.length;
                _entryHeader.method = Utils.Constants.DEFLATED;
                _entryHeader.crc = Utils.crc32(value);
                _entryHeader.changed = true;
            } else { // folders and blank files should be stored
                _entryHeader.method = Utils.Constants.STORED;
            }
        },

        getData : function(pass) {
            if (_entryHeader.changed) {
				return uncompressedData;
			} else {
				return decompress(false, null, pass);
            }
        },

        getDataAsync : function(/*Function*/callback, pass) {
			if (_entryHeader.changed) {
				callback(uncompressedData)
			} else {
				decompress(true, callback, pass)
            }
        },

        set attr(attr) { _entryHeader.attr = attr; },
        get attr() { return _entryHeader.attr; },

        set header(/*Buffer*/data) {
            _entryHeader.loadFromBinary(data);
        },

        get header() {
            return _entryHeader;
        },

        packHeader : function() {
            var header = _entryHeader.entryHeaderToBinary();
            // add
            _entryName.copy(header, Utils.Constants.CENHDR);
            if (_entryHeader.extraLength) {
                _extra.copy(header, Utils.Constants.CENHDR + _entryName.length)
            }
            if (_entryHeader.commentLength) {
                _comment.copy(header, Utils.Constants.CENHDR + _entryName.length + _entryHeader.extraLength, _comment.length);
            }
            return header;
        },

        toString : function() {
            return '{\n' +
                '\t"entryName" : "' + _entryName.toString() + "\",\n" +
                '\t"name" : "' + (_isDirectory ? _entryName.toString().replace(/\/$/, '').split("/").pop() : _entryName.toString().split("/").pop()) + "\",\n" +
                '\t"comment" : "' + _comment.toString() + "\",\n" +
                '\t"isDirectory" : ' + _isDirectory + ",\n" +
                '\t"header" : ' + _entryHeader.toString().replace(/\t/mg, "\t\t").replace(/}/mg, "\t}")  + ",\n" +
                '\t"compressedData" : <' + (input && input.length  + " bytes buffer" || "null") + ">\n" +
                '\t"data" : <' + (uncompressedData && uncompressedData.length  + " bytes buffer" || "null") + ">\n" +
                '}';
        }
    }
};


/***/ }),

/***/ "./node_modules/adm-zip/zipFile.js":
/*!*****************************************!*\
  !*** ./node_modules/adm-zip/zipFile.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ZipEntry = __webpack_require__(/*! ./zipEntry */ "./node_modules/adm-zip/zipEntry.js"),
	Headers = __webpack_require__(/*! ./headers */ "./node_modules/adm-zip/headers/index.js"),
	Utils = __webpack_require__(/*! ./util */ "./node_modules/adm-zip/util/index.js");

module.exports = function (/*String|Buffer*/input, /*Number*/inputType) {
	var entryList = [],
		entryTable = {},
		_comment = Buffer.alloc(0),
		filename = "",
		fs = Utils.FileSystem.require(),
		inBuffer = null,
		mainHeader = new Headers.MainHeader();

	if (inputType === Utils.Constants.FILE) {
		// is a filename
		filename = input;
		inBuffer = fs.readFileSync(filename);
		readMainHeader();
	} else if (inputType === Utils.Constants.BUFFER) {
		// is a memory buffer
		inBuffer = input;
		readMainHeader();
	} else {
		// none. is a new file
	}

	function readEntries() {
		entryTable = {};
		entryList = new Array(mainHeader.diskEntries);  // total number of entries
		var index = mainHeader.offset;  // offset of first CEN header
		for (var i = 0; i < entryList.length; i++) {

			var tmp = index,
				entry = new ZipEntry(inBuffer);
			entry.header = inBuffer.slice(tmp, tmp += Utils.Constants.CENHDR);

			entry.entryName = inBuffer.slice(tmp, tmp += entry.header.fileNameLength);

			if (entry.header.extraLength) {
				entry.extra = inBuffer.slice(tmp, tmp += entry.header.extraLength);
			}

			if (entry.header.commentLength)
				entry.comment = inBuffer.slice(tmp, tmp + entry.header.commentLength);

			index += entry.header.entryHeaderSize;

			entryList[i] = entry;
			entryTable[entry.entryName] = entry;
		}
	}

	function readMainHeader() {
		var i = inBuffer.length - Utils.Constants.ENDHDR, // END header size
			n = Math.max(0, i - 0xFFFF), // 0xFFFF is the max zip file comment length
			endOffset = -1; // Start offset of the END header

		for (i; i >= n; i--) {
			if (inBuffer[i] !== 0x50) continue; // quick check that the byte is 'P'
			if (inBuffer.readUInt32LE(i) === Utils.Constants.ENDSIG) { // "PK\005\006"
				endOffset = i;
				break;
			}
		}
		if (!~endOffset)
			throw Utils.Errors.INVALID_FORMAT;

		mainHeader.loadFromBinary(inBuffer.slice(endOffset, endOffset + Utils.Constants.ENDHDR));
		if (mainHeader.commentLength) {
			_comment = inBuffer.slice(endOffset + Utils.Constants.ENDHDR);
		}
		readEntries();
	}

	return {
		/**
		 * Returns an array of ZipEntry objects existent in the current opened archive
		 * @return Array
		 */
		get entries() {
			return entryList;
		},

		/**
		 * Archive comment
		 * @return {String}
		 */
		get comment() {
			return _comment.toString();
		},
		set comment(val) {
			mainHeader.commentLength = val.length;
			_comment = val;
		},

		/**
		 * Returns a reference to the entry with the given name or null if entry is inexistent
		 *
		 * @param entryName
		 * @return ZipEntry
		 */
		getEntry: function (/*String*/entryName) {
			return entryTable[entryName] || null;
		},

		/**
		 * Adds the given entry to the entry list
		 *
		 * @param entry
		 */
		setEntry: function (/*ZipEntry*/entry) {
			entryList.push(entry);
			entryTable[entry.entryName] = entry;
			mainHeader.totalEntries = entryList.length;
		},

		/**
		 * Removes the entry with the given name from the entry list.
		 *
		 * If the entry is a directory, then all nested files and directories will be removed
		 * @param entryName
		 */
		deleteEntry: function (/*String*/entryName) {
			var entry = entryTable[entryName];
			if (entry && entry.isDirectory) {
				var _self = this;
				this.getEntryChildren(entry).forEach(function (child) {
					if (child.entryName !== entryName) {
						_self.deleteEntry(child.entryName)
					}
				})
			}
			entryList.splice(entryList.indexOf(entry), 1);
			delete(entryTable[entryName]);
			mainHeader.totalEntries = entryList.length;
		},

		/**
		 *  Iterates and returns all nested files and directories of the given entry
		 *
		 * @param entry
		 * @return Array
		 */
		getEntryChildren: function (/*ZipEntry*/entry) {
			if (entry.isDirectory) {
				var list = [],
					name = entry.entryName,
					len = name.length;

				entryList.forEach(function (zipEntry) {
					if (zipEntry.entryName.substr(0, len) === name) {
						list.push(zipEntry);
					}
				});
				return list;
			}
			return []
		},

		/**
		 * Returns the zip file
		 *
		 * @return Buffer
		 */
		compressToBuffer: function () {
			if (entryList.length > 1) {
				entryList.sort(function (a, b) {
					var nameA = a.entryName.toLowerCase();
					var nameB = b.entryName.toLowerCase();
					if (nameA < nameB) {
						return -1
					}
					if (nameA > nameB) {
						return 1
					}
					return 0;
				});
			}

			var totalSize = 0,
				dataBlock = [],
				entryHeaders = [],
				dindex = 0;

			mainHeader.size = 0;
			mainHeader.offset = 0;

			entryList.forEach(function (entry) {
				// compress data and set local and entry header accordingly. Reason why is called first
				var compressedData = entry.getCompressedData();
				// data header
				entry.header.offset = dindex;
				var dataHeader = entry.header.dataHeaderToBinary();
				var entryNameLen = entry.rawEntryName.length;
				var extra = entry.extra.toString();
				var postHeader = Buffer.alloc(entryNameLen + extra.length);
				entry.rawEntryName.copy(postHeader, 0);
				postHeader.fill(extra, entryNameLen);

				var dataLength = dataHeader.length + postHeader.length + compressedData.length;

				dindex += dataLength;

				dataBlock.push(dataHeader);
				dataBlock.push(postHeader);
				dataBlock.push(compressedData);

				var entryHeader = entry.packHeader();
				entryHeaders.push(entryHeader);
				mainHeader.size += entryHeader.length;
				totalSize += (dataLength + entryHeader.length);
			});

			totalSize += mainHeader.mainHeaderSize; // also includes zip file comment length
			// point to end of data and beginning of central directory first record
			mainHeader.offset = dindex;

			dindex = 0;
			var outBuffer = Buffer.alloc(totalSize);
			dataBlock.forEach(function (content) {
				content.copy(outBuffer, dindex); // write data blocks
				dindex += content.length;
			});
			entryHeaders.forEach(function (content) {
				content.copy(outBuffer, dindex); // write central directory entries
				dindex += content.length;
			});

			var mh = mainHeader.toBinary();
			if (_comment) {
				_comment.copy(mh, Utils.Constants.ENDHDR); // add zip file comment
			}

			mh.copy(outBuffer, dindex); // write main header

			return outBuffer
		},

		toAsyncBuffer: function (/*Function*/onSuccess, /*Function*/onFail, /*Function*/onItemStart, /*Function*/onItemEnd) {
			if (entryList.length > 1) {
				entryList.sort(function (a, b) {
					var nameA = a.entryName.toLowerCase();
					var nameB = b.entryName.toLowerCase();
					if (nameA > nameB) {
						return -1
					}
					if (nameA < nameB) {
						return 1
					}
					return 0;
				});
			}

			var totalSize = 0,
				dataBlock = [],
				entryHeaders = [],
				dindex = 0;

			mainHeader.size = 0;
			mainHeader.offset = 0;

			var compress = function (entryList) {
				var self = arguments.callee;
				if (entryList.length) {
					var entry = entryList.pop();
					var name = entry.entryName + entry.extra.toString();
					if (onItemStart) onItemStart(name);
					entry.getCompressedDataAsync(function (compressedData) {
						if (onItemEnd) onItemEnd(name);

						entry.header.offset = dindex;
						// data header
						var dataHeader = entry.header.dataHeaderToBinary();
						var postHeader;
						try {
							postHeader = Buffer.alloc(name.length, name);  // using alloc will work on node  5.x+
						} catch(e){
							postHeader = new Buffer(name); // use deprecated method if alloc fails...
						}
						var dataLength = dataHeader.length + postHeader.length + compressedData.length;

						dindex += dataLength;

						dataBlock.push(dataHeader);
						dataBlock.push(postHeader);
						dataBlock.push(compressedData);

						var entryHeader = entry.packHeader();
						entryHeaders.push(entryHeader);
						mainHeader.size += entryHeader.length;
						totalSize += (dataLength + entryHeader.length);

						if (entryList.length) {
							self(entryList);
						} else {


							totalSize += mainHeader.mainHeaderSize; // also includes zip file comment length
							// point to end of data and beginning of central directory first record
							mainHeader.offset = dindex;

							dindex = 0;
							var outBuffer = Buffer.alloc(totalSize);
							dataBlock.forEach(function (content) {
								content.copy(outBuffer, dindex); // write data blocks
								dindex += content.length;
							});
							entryHeaders.forEach(function (content) {
								content.copy(outBuffer, dindex); // write central directory entries
								dindex += content.length;
							});

							var mh = mainHeader.toBinary();
							if (_comment) {
								_comment.copy(mh, Utils.Constants.ENDHDR); // add zip file comment
							}

							mh.copy(outBuffer, dindex); // write main header

							onSuccess(outBuffer);
						}
					});
				}
			};

			compress(entryList);
		}
	}
};


/***/ }),

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/http.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/adapters/http.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var http = __webpack_require__(/*! http */ "http");
var https = __webpack_require__(/*! https */ "https");
var httpFollow = __webpack_require__(/*! follow-redirects */ "./node_modules/follow-redirects/index.js").http;
var httpsFollow = __webpack_require__(/*! follow-redirects */ "./node_modules/follow-redirects/index.js").https;
var url = __webpack_require__(/*! url */ "url");
var zlib = __webpack_require__(/*! zlib */ "zlib");
var pkg = __webpack_require__(/*! ./../../package.json */ "./node_modules/axios/package.json");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");
var enhanceError = __webpack_require__(/*! ../core/enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

var isHttps = /https:?/;

/*eslint consistent-return:0*/
module.exports = function httpAdapter(config) {
  return new Promise(function dispatchHttpRequest(resolvePromise, rejectPromise) {
    var timer;
    var resolve = function resolve(value) {
      clearTimeout(timer);
      resolvePromise(value);
    };
    var reject = function reject(value) {
      clearTimeout(timer);
      rejectPromise(value);
    };
    var data = config.data;
    var headers = config.headers;

    // Set User-Agent (required by some servers)
    // Only set header if it hasn't been set in config
    // See https://github.com/axios/axios/issues/69
    if (!headers['User-Agent'] && !headers['user-agent']) {
      headers['User-Agent'] = 'axios/' + pkg.version;
    }

    if (data && !utils.isStream(data)) {
      if (Buffer.isBuffer(data)) {
        // Nothing to do...
      } else if (utils.isArrayBuffer(data)) {
        data = Buffer.from(new Uint8Array(data));
      } else if (utils.isString(data)) {
        data = Buffer.from(data, 'utf-8');
      } else {
        return reject(createError(
          'Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream',
          config
        ));
      }

      // Add Content-Length header if data exists
      headers['Content-Length'] = data.length;
    }

    // HTTP basic authentication
    var auth = undefined;
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      auth = username + ':' + password;
    }

    // Parse url
    var parsed = url.parse(config.url);
    var protocol = parsed.protocol || 'http:';

    if (!auth && parsed.auth) {
      var urlAuth = parsed.auth.split(':');
      var urlUsername = urlAuth[0] || '';
      var urlPassword = urlAuth[1] || '';
      auth = urlUsername + ':' + urlPassword;
    }

    if (auth) {
      delete headers.Authorization;
    }

    var isHttpsRequest = isHttps.test(protocol);
    var agent = isHttpsRequest ? config.httpsAgent : config.httpAgent;

    var options = {
      path: buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, ''),
      method: config.method.toUpperCase(),
      headers: headers,
      agent: agent,
      auth: auth
    };

    if (config.socketPath) {
      options.socketPath = config.socketPath;
    } else {
      options.hostname = parsed.hostname;
      options.port = parsed.port;
    }

    var proxy = config.proxy;
    if (!proxy && proxy !== false) {
      var proxyEnv = protocol.slice(0, -1) + '_proxy';
      var proxyUrl = process.env[proxyEnv] || process.env[proxyEnv.toUpperCase()];
      if (proxyUrl) {
        var parsedProxyUrl = url.parse(proxyUrl);
        var noProxyEnv = process.env.no_proxy || process.env.NO_PROXY;
        var shouldProxy = true;

        if (noProxyEnv) {
          var noProxy = noProxyEnv.split(',').map(function trim(s) {
            return s.trim();
          });

          shouldProxy = !noProxy.some(function proxyMatch(proxyElement) {
            if (!proxyElement) {
              return false;
            }
            if (proxyElement === '*') {
              return true;
            }
            if (proxyElement[0] === '.' &&
                parsed.hostname.substr(parsed.hostname.length - proxyElement.length) === proxyElement &&
                proxyElement.match(/\./g).length === parsed.hostname.match(/\./g).length) {
              return true;
            }

            return parsed.hostname === proxyElement;
          });
        }


        if (shouldProxy) {
          proxy = {
            host: parsedProxyUrl.hostname,
            port: parsedProxyUrl.port
          };

          if (parsedProxyUrl.auth) {
            var proxyUrlAuth = parsedProxyUrl.auth.split(':');
            proxy.auth = {
              username: proxyUrlAuth[0],
              password: proxyUrlAuth[1]
            };
          }
        }
      }
    }

    if (proxy) {
      options.hostname = proxy.host;
      options.host = proxy.host;
      options.headers.host = parsed.hostname + (parsed.port ? ':' + parsed.port : '');
      options.port = proxy.port;
      options.path = protocol + '//' + parsed.hostname + (parsed.port ? ':' + parsed.port : '') + options.path;

      // Basic proxy authorization
      if (proxy.auth) {
        var base64 = Buffer.from(proxy.auth.username + ':' + proxy.auth.password, 'utf8').toString('base64');
        options.headers['Proxy-Authorization'] = 'Basic ' + base64;
      }
    }

    var transport;
    var isHttpsProxy = isHttpsRequest && (proxy ? isHttps.test(proxy.protocol) : true);
    if (config.transport) {
      transport = config.transport;
    } else if (config.maxRedirects === 0) {
      transport = isHttpsProxy ? https : http;
    } else {
      if (config.maxRedirects) {
        options.maxRedirects = config.maxRedirects;
      }
      transport = isHttpsProxy ? httpsFollow : httpFollow;
    }

    if (config.maxContentLength && config.maxContentLength > -1) {
      options.maxBodyLength = config.maxContentLength;
    }

    // Create the request
    var req = transport.request(options, function handleResponse(res) {
      if (req.aborted) return;

      // uncompress the response body transparently if required
      var stream = res;
      switch (res.headers['content-encoding']) {
      /*eslint default-case:0*/
      case 'gzip':
      case 'compress':
      case 'deflate':
        // add the unzipper to the body stream processing pipeline
        stream = (res.statusCode === 204) ? stream : stream.pipe(zlib.createUnzip());

        // remove the content-encoding in order to not confuse downstream operations
        delete res.headers['content-encoding'];
        break;
      }

      // return the last request in case of redirects
      var lastRequest = res.req || req;

      var response = {
        status: res.statusCode,
        statusText: res.statusMessage,
        headers: res.headers,
        config: config,
        request: lastRequest
      };

      if (config.responseType === 'stream') {
        response.data = stream;
        settle(resolve, reject, response);
      } else {
        var responseBuffer = [];
        stream.on('data', function handleStreamData(chunk) {
          responseBuffer.push(chunk);

          // make sure the content length is not over the maxContentLength if specified
          if (config.maxContentLength > -1 && Buffer.concat(responseBuffer).length > config.maxContentLength) {
            stream.destroy();
            reject(createError('maxContentLength size of ' + config.maxContentLength + ' exceeded',
              config, null, lastRequest));
          }
        });

        stream.on('error', function handleStreamError(err) {
          if (req.aborted) return;
          reject(enhanceError(err, config, null, lastRequest));
        });

        stream.on('end', function handleStreamEnd() {
          var responseData = Buffer.concat(responseBuffer);
          if (config.responseType !== 'arraybuffer') {
            responseData = responseData.toString(config.responseEncoding);
          }

          response.data = responseData;
          settle(resolve, reject, response);
        });
      }
    });

    // Handle errors
    req.on('error', function handleRequestError(err) {
      if (req.aborted) return;
      reject(enhanceError(err, config, null, req));
    });

    // Handle request timeout
    if (config.timeout) {
      timer = setTimeout(function handleRequestTimeout() {
        req.abort();
        reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED', req));
      }, config.timeout);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (req.aborted) return;

        req.abort();
        reject(cancel);
      });
    }

    // Send the request
    if (utils.isStream(data)) {
      data.on('error', function handleStreamError(err) {
        reject(enhanceError(err, config, null, req));
      }).pipe(req);
    } else {
      req.end(data);
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);
  config.method = config.method ? config.method.toLowerCase() : 'get';

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");
var isAbsoluteURL = __webpack_require__(/*! ./../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ./../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  utils.forEach(['url', 'method', 'params', 'data'], function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });

  utils.forEach(['headers', 'auth', 'proxy'], function mergeDeepProperties(prop) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  utils.forEach([
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'maxContentLength',
    'validateStatus', 'maxRedirects', 'httpAgent', 'httpsAgent', 'cancelToken',
    'socketPath'
  ], function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  return config;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  // Only Node.JS has a process variable that is of [[Class]] process
  if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/http.js");
  } else if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;


/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var isBuffer = __webpack_require__(/*! is-buffer */ "./node_modules/axios/node_modules/is-buffer/index.js");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function deepMerge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  deepMerge: deepMerge,
  extend: extend,
  trim: trim
};


/***/ }),

/***/ "./node_modules/axios/node_modules/is-buffer/index.js":
/*!************************************************************!*\
  !*** ./node_modules/axios/node_modules/is-buffer/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

module.exports = function isBuffer (obj) {
  return obj != null && obj.constructor != null &&
    typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}


/***/ }),

/***/ "./node_modules/axios/package.json":
/*!*****************************************!*\
  !*** ./node_modules/axios/package.json ***!
  \*****************************************/
/*! exports provided: _from, _id, _inBundle, _integrity, _location, _phantomChildren, _requested, _requiredBy, _resolved, _shasum, _spec, _where, author, browser, bugs, bundleDependencies, bundlesize, dependencies, deprecated, description, devDependencies, homepage, keywords, license, main, name, repository, scripts, typings, version, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"_from\":\"axios\",\"_id\":\"axios@0.19.0\",\"_inBundle\":false,\"_integrity\":\"sha512-1uvKqKQta3KBxIz14F2v06AEHZ/dIoeKfbTRkK1E5oqjDnuEerLmYTgJB5AiQZHJcljpg1TuRzdjDR06qNk0DQ==\",\"_location\":\"/axios\",\"_phantomChildren\":{},\"_requested\":{\"type\":\"tag\",\"registry\":true,\"raw\":\"axios\",\"name\":\"axios\",\"escapedName\":\"axios\",\"rawSpec\":\"\",\"saveSpec\":null,\"fetchSpec\":\"latest\"},\"_requiredBy\":[\"#USER\",\"/\"],\"_resolved\":\"https://registry.npmjs.org/axios/-/axios-0.19.0.tgz\",\"_shasum\":\"8e09bff3d9122e133f7b8101c8fbdd00ed3d2ab8\",\"_spec\":\"axios\",\"_where\":\"/home/mathieu/Projects/mathrix-libs/actions-gcloud\",\"author\":{\"name\":\"Matt Zabriskie\"},\"browser\":{\"./lib/adapters/http.js\":\"./lib/adapters/xhr.js\"},\"bugs\":{\"url\":\"https://github.com/axios/axios/issues\"},\"bundleDependencies\":false,\"bundlesize\":[{\"path\":\"./dist/axios.min.js\",\"threshold\":\"5kB\"}],\"dependencies\":{\"follow-redirects\":\"1.5.10\",\"is-buffer\":\"^2.0.2\"},\"deprecated\":false,\"description\":\"Promise based HTTP client for the browser and node.js\",\"devDependencies\":{\"bundlesize\":\"^0.17.0\",\"coveralls\":\"^3.0.0\",\"es6-promise\":\"^4.2.4\",\"grunt\":\"^1.0.2\",\"grunt-banner\":\"^0.6.0\",\"grunt-cli\":\"^1.2.0\",\"grunt-contrib-clean\":\"^1.1.0\",\"grunt-contrib-watch\":\"^1.0.0\",\"grunt-eslint\":\"^20.1.0\",\"grunt-karma\":\"^2.0.0\",\"grunt-mocha-test\":\"^0.13.3\",\"grunt-ts\":\"^6.0.0-beta.19\",\"grunt-webpack\":\"^1.0.18\",\"istanbul-instrumenter-loader\":\"^1.0.0\",\"jasmine-core\":\"^2.4.1\",\"karma\":\"^1.3.0\",\"karma-chrome-launcher\":\"^2.2.0\",\"karma-coverage\":\"^1.1.1\",\"karma-firefox-launcher\":\"^1.1.0\",\"karma-jasmine\":\"^1.1.1\",\"karma-jasmine-ajax\":\"^0.1.13\",\"karma-opera-launcher\":\"^1.0.0\",\"karma-safari-launcher\":\"^1.0.0\",\"karma-sauce-launcher\":\"^1.2.0\",\"karma-sinon\":\"^1.0.5\",\"karma-sourcemap-loader\":\"^0.3.7\",\"karma-webpack\":\"^1.7.0\",\"load-grunt-tasks\":\"^3.5.2\",\"minimist\":\"^1.2.0\",\"mocha\":\"^5.2.0\",\"sinon\":\"^4.5.0\",\"typescript\":\"^2.8.1\",\"url-search-params\":\"^0.10.0\",\"webpack\":\"^1.13.1\",\"webpack-dev-server\":\"^1.14.1\"},\"homepage\":\"https://github.com/axios/axios\",\"keywords\":[\"xhr\",\"http\",\"ajax\",\"promise\",\"node\"],\"license\":\"MIT\",\"main\":\"index.js\",\"name\":\"axios\",\"repository\":{\"type\":\"git\",\"url\":\"git+https://github.com/axios/axios.git\"},\"scripts\":{\"build\":\"NODE_ENV=production grunt build\",\"coveralls\":\"cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js\",\"examples\":\"node ./examples/server.js\",\"fix\":\"eslint --fix lib/**/*.js\",\"postversion\":\"git push && git push --tags\",\"preversion\":\"npm test\",\"start\":\"node ./sandbox/server.js\",\"test\":\"grunt test && bundlesize\",\"version\":\"npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json\"},\"typings\":\"./index.d.ts\",\"version\":\"0.19.0\"}");

/***/ }),

/***/ "./node_modules/follow-redirects/index.js":
/*!************************************************!*\
  !*** ./node_modules/follow-redirects/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var url = __webpack_require__(/*! url */ "url");
var http = __webpack_require__(/*! http */ "http");
var https = __webpack_require__(/*! https */ "https");
var assert = __webpack_require__(/*! assert */ "assert");
var Writable = __webpack_require__(/*! stream */ "stream").Writable;
var debug = __webpack_require__(/*! debug */ "./node_modules/follow-redirects/node_modules/debug/src/index.js")("follow-redirects");

// RFC7231§4.2.1: Of the request methods defined by this specification,
// the GET, HEAD, OPTIONS, and TRACE methods are defined to be safe.
var SAFE_METHODS = { GET: true, HEAD: true, OPTIONS: true, TRACE: true };

// Create handlers that pass events from native requests
var eventHandlers = Object.create(null);
["abort", "aborted", "error", "socket", "timeout"].forEach(function (event) {
  eventHandlers[event] = function (arg) {
    this._redirectable.emit(event, arg);
  };
});

// An HTTP(S) request that can be redirected
function RedirectableRequest(options, responseCallback) {
  // Initialize the request
  Writable.call(this);
  options.headers = options.headers || {};
  this._options = options;
  this._redirectCount = 0;
  this._redirects = [];
  this._requestBodyLength = 0;
  this._requestBodyBuffers = [];

  // Since http.request treats host as an alias of hostname,
  // but the url module interprets host as hostname plus port,
  // eliminate the host property to avoid confusion.
  if (options.host) {
    // Use hostname if set, because it has precedence
    if (!options.hostname) {
      options.hostname = options.host;
    }
    delete options.host;
  }

  // Attach a callback if passed
  if (responseCallback) {
    this.on("response", responseCallback);
  }

  // React to responses of native requests
  var self = this;
  this._onNativeResponse = function (response) {
    self._processResponse(response);
  };

  // Complete the URL object when necessary
  if (!options.pathname && options.path) {
    var searchPos = options.path.indexOf("?");
    if (searchPos < 0) {
      options.pathname = options.path;
    }
    else {
      options.pathname = options.path.substring(0, searchPos);
      options.search = options.path.substring(searchPos);
    }
  }

  // Perform the first request
  this._performRequest();
}
RedirectableRequest.prototype = Object.create(Writable.prototype);

// Writes buffered data to the current native request
RedirectableRequest.prototype.write = function (data, encoding, callback) {
  // Validate input and shift parameters if necessary
  if (!(typeof data === "string" || typeof data === "object" && ("length" in data))) {
    throw new Error("data should be a string, Buffer or Uint8Array");
  }
  if (typeof encoding === "function") {
    callback = encoding;
    encoding = null;
  }

  // Ignore empty buffers, since writing them doesn't invoke the callback
  // https://github.com/nodejs/node/issues/22066
  if (data.length === 0) {
    if (callback) {
      callback();
    }
    return;
  }
  // Only write when we don't exceed the maximum body length
  if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
    this._requestBodyLength += data.length;
    this._requestBodyBuffers.push({ data: data, encoding: encoding });
    this._currentRequest.write(data, encoding, callback);
  }
  // Error when we exceed the maximum body length
  else {
    this.emit("error", new Error("Request body larger than maxBodyLength limit"));
    this.abort();
  }
};

// Ends the current native request
RedirectableRequest.prototype.end = function (data, encoding, callback) {
  // Shift parameters if necessary
  if (typeof data === "function") {
    callback = data;
    data = encoding = null;
  }
  else if (typeof encoding === "function") {
    callback = encoding;
    encoding = null;
  }

  // Write data and end
  var currentRequest = this._currentRequest;
  this.write(data || "", encoding, function () {
    currentRequest.end(null, null, callback);
  });
};

// Sets a header value on the current native request
RedirectableRequest.prototype.setHeader = function (name, value) {
  this._options.headers[name] = value;
  this._currentRequest.setHeader(name, value);
};

// Clears a header value on the current native request
RedirectableRequest.prototype.removeHeader = function (name) {
  delete this._options.headers[name];
  this._currentRequest.removeHeader(name);
};

// Proxy all other public ClientRequest methods
[
  "abort", "flushHeaders", "getHeader",
  "setNoDelay", "setSocketKeepAlive", "setTimeout",
].forEach(function (method) {
  RedirectableRequest.prototype[method] = function (a, b) {
    return this._currentRequest[method](a, b);
  };
});

// Proxy all public ClientRequest properties
["aborted", "connection", "socket"].forEach(function (property) {
  Object.defineProperty(RedirectableRequest.prototype, property, {
    get: function () { return this._currentRequest[property]; },
  });
});

// Executes the next native request (initial or redirect)
RedirectableRequest.prototype._performRequest = function () {
  // Load the native protocol
  var protocol = this._options.protocol;
  var nativeProtocol = this._options.nativeProtocols[protocol];
  if (!nativeProtocol) {
    this.emit("error", new Error("Unsupported protocol " + protocol));
    return;
  }

  // If specified, use the agent corresponding to the protocol
  // (HTTP and HTTPS use different types of agents)
  if (this._options.agents) {
    var scheme = protocol.substr(0, protocol.length - 1);
    this._options.agent = this._options.agents[scheme];
  }

  // Create the native request
  var request = this._currentRequest =
        nativeProtocol.request(this._options, this._onNativeResponse);
  this._currentUrl = url.format(this._options);

  // Set up event handlers
  request._redirectable = this;
  for (var event in eventHandlers) {
    /* istanbul ignore else */
    if (event) {
      request.on(event, eventHandlers[event]);
    }
  }

  // End a redirected request
  // (The first request must be ended explicitly with RedirectableRequest#end)
  if (this._isRedirect) {
    // Write the request entity and end.
    var i = 0;
    var buffers = this._requestBodyBuffers;
    (function writeNext() {
      if (i < buffers.length) {
        var buffer = buffers[i++];
        request.write(buffer.data, buffer.encoding, writeNext);
      }
      else {
        request.end();
      }
    }());
  }
};

// Processes a response from the current native request
RedirectableRequest.prototype._processResponse = function (response) {
  // Store the redirected response
  if (this._options.trackRedirects) {
    this._redirects.push({
      url: this._currentUrl,
      headers: response.headers,
      statusCode: response.statusCode,
    });
  }

  // RFC7231§6.4: The 3xx (Redirection) class of status code indicates
  // that further action needs to be taken by the user agent in order to
  // fulfill the request. If a Location header field is provided,
  // the user agent MAY automatically redirect its request to the URI
  // referenced by the Location field value,
  // even if the specific status code is not understood.
  var location = response.headers.location;
  if (location && this._options.followRedirects !== false &&
      response.statusCode >= 300 && response.statusCode < 400) {
    // RFC7231§6.4: A client SHOULD detect and intervene
    // in cyclical redirections (i.e., "infinite" redirection loops).
    if (++this._redirectCount > this._options.maxRedirects) {
      this.emit("error", new Error("Max redirects exceeded."));
      return;
    }

    // RFC7231§6.4: Automatic redirection needs to done with
    // care for methods not known to be safe […],
    // since the user might not wish to redirect an unsafe request.
    // RFC7231§6.4.7: The 307 (Temporary Redirect) status code indicates
    // that the target resource resides temporarily under a different URI
    // and the user agent MUST NOT change the request method
    // if it performs an automatic redirection to that URI.
    var header;
    var headers = this._options.headers;
    if (response.statusCode !== 307 && !(this._options.method in SAFE_METHODS)) {
      this._options.method = "GET";
      // Drop a possible entity and headers related to it
      this._requestBodyBuffers = [];
      for (header in headers) {
        if (/^content-/i.test(header)) {
          delete headers[header];
        }
      }
    }

    // Drop the Host header, as the redirect might lead to a different host
    if (!this._isRedirect) {
      for (header in headers) {
        if (/^host$/i.test(header)) {
          delete headers[header];
        }
      }
    }

    // Perform the redirected request
    var redirectUrl = url.resolve(this._currentUrl, location);
    debug("redirecting to", redirectUrl);
    Object.assign(this._options, url.parse(redirectUrl));
    this._isRedirect = true;
    this._performRequest();

    // Discard the remainder of the response to avoid waiting for data
    response.destroy();
  }
  else {
    // The response is not a redirect; return it as-is
    response.responseUrl = this._currentUrl;
    response.redirects = this._redirects;
    this.emit("response", response);

    // Clean up
    this._requestBodyBuffers = [];
  }
};

// Wraps the key/value object of protocols with redirect functionality
function wrap(protocols) {
  // Default settings
  var exports = {
    maxRedirects: 21,
    maxBodyLength: 10 * 1024 * 1024,
  };

  // Wrap each protocol
  var nativeProtocols = {};
  Object.keys(protocols).forEach(function (scheme) {
    var protocol = scheme + ":";
    var nativeProtocol = nativeProtocols[protocol] = protocols[scheme];
    var wrappedProtocol = exports[scheme] = Object.create(nativeProtocol);

    // Executes a request, following redirects
    wrappedProtocol.request = function (options, callback) {
      if (typeof options === "string") {
        options = url.parse(options);
        options.maxRedirects = exports.maxRedirects;
      }
      else {
        options = Object.assign({
          protocol: protocol,
          maxRedirects: exports.maxRedirects,
          maxBodyLength: exports.maxBodyLength,
        }, options);
      }
      options.nativeProtocols = nativeProtocols;
      assert.equal(options.protocol, protocol, "protocol mismatch");
      debug("options", options);
      return new RedirectableRequest(options, callback);
    };

    // Executes a GET request, following redirects
    wrappedProtocol.get = function (options, callback) {
      var request = wrappedProtocol.request(options, callback);
      request.end();
      return request;
    };
  });
  return exports;
}

// Exports
module.exports = wrap({ http: http, https: https });
module.exports.wrap = wrap;


/***/ }),

/***/ "./node_modules/follow-redirects/node_modules/debug/src/browser.js":
/*!*************************************************************************!*\
  !*** ./node_modules/follow-redirects/node_modules/debug/src/browser.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(/*! ./debug */ "./node_modules/follow-redirects/node_modules/debug/src/debug.js");
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  '#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC',
  '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF',
  '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC',
  '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF',
  '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC',
  '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033',
  '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366',
  '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933',
  '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC',
  '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF',
  '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // Internet Explorer and Edge do not support colors.
  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}


/***/ }),

/***/ "./node_modules/follow-redirects/node_modules/debug/src/debug.js":
/*!***********************************************************************!*\
  !*** ./node_modules/follow-redirects/node_modules/debug/src/debug.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__(/*! ms */ "./node_modules/ms/index.js");

/**
 * Active `debug` instances.
 */
exports.instances = [];

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  var prevTime;

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);
  debug.destroy = destroy;

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  exports.instances.push(debug);

  return debug;
}

function destroy () {
  var index = exports.instances.indexOf(this);
  if (index !== -1) {
    exports.instances.splice(index, 1);
    return true;
  } else {
    return false;
  }
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var i;
  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }

  for (i = 0; i < exports.instances.length; i++) {
    var instance = exports.instances[i];
    instance.enabled = exports.enabled(instance.namespace);
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  if (name[name.length - 1] === '*') {
    return true;
  }
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}


/***/ }),

/***/ "./node_modules/follow-redirects/node_modules/debug/src/index.js":
/*!***********************************************************************!*\
  !*** ./node_modules/follow-redirects/node_modules/debug/src/index.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Detect Electron renderer process, which is node, but we should
 * treat as a browser.
 */

if (typeof process === 'undefined' || process.type === 'renderer') {
  module.exports = __webpack_require__(/*! ./browser.js */ "./node_modules/follow-redirects/node_modules/debug/src/browser.js");
} else {
  module.exports = __webpack_require__(/*! ./node.js */ "./node_modules/follow-redirects/node_modules/debug/src/node.js");
}


/***/ }),

/***/ "./node_modules/follow-redirects/node_modules/debug/src/node.js":
/*!**********************************************************************!*\
  !*** ./node_modules/follow-redirects/node_modules/debug/src/node.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var tty = __webpack_require__(/*! tty */ "tty");
var util = __webpack_require__(/*! util */ "util");

/**
 * This is the Node.js implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(/*! ./debug */ "./node_modules/follow-redirects/node_modules/debug/src/debug.js");
exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;

/**
 * Colors.
 */

exports.colors = [ 6, 2, 3, 4, 5, 1 ];

try {
  var supportsColor = __webpack_require__(/*! supports-color */ "./node_modules/supports-color/index.js");
  if (supportsColor && supportsColor.level >= 2) {
    exports.colors = [
      20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68,
      69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128, 129, 134,
      135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171,
      172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204,
      205, 206, 207, 208, 209, 214, 215, 220, 221
    ];
  }
} catch (err) {
  // swallow - we only care if `supports-color` is available; it doesn't have to be.
}

/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */

exports.inspectOpts = Object.keys(process.env).filter(function (key) {
  return /^debug_/i.test(key);
}).reduce(function (obj, key) {
  // camel-case
  var prop = key
    .substring(6)
    .toLowerCase()
    .replace(/_([a-z])/g, function (_, k) { return k.toUpperCase() });

  // coerce string value into JS value
  var val = process.env[key];
  if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
  else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
  else if (val === 'null') val = null;
  else val = Number(val);

  obj[prop] = val;
  return obj;
}, {});

/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
  return 'colors' in exports.inspectOpts
    ? Boolean(exports.inspectOpts.colors)
    : tty.isatty(process.stderr.fd);
}

/**
 * Map %o to `util.inspect()`, all on a single line.
 */

exports.formatters.o = function(v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts)
    .split('\n').map(function(str) {
      return str.trim()
    }).join(' ');
};

/**
 * Map %o to `util.inspect()`, allowing multiple lines if needed.
 */

exports.formatters.O = function(v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts);
};

/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var name = this.namespace;
  var useColors = this.useColors;

  if (useColors) {
    var c = this.color;
    var colorCode = '\u001b[3' + (c < 8 ? c : '8;5;' + c);
    var prefix = '  ' + colorCode + ';1m' + name + ' ' + '\u001b[0m';

    args[0] = prefix + args[0].split('\n').join('\n' + prefix);
    args.push(colorCode + 'm+' + exports.humanize(this.diff) + '\u001b[0m');
  } else {
    args[0] = getDate() + name + ' ' + args[0];
  }
}

function getDate() {
  if (exports.inspectOpts.hideDate) {
    return '';
  } else {
    return new Date().toISOString() + ' ';
  }
}

/**
 * Invokes `util.format()` with the specified arguments and writes to stderr.
 */

function log() {
  return process.stderr.write(util.format.apply(util, arguments) + '\n');
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  if (null == namespaces) {
    // If you set a process.env field to null or undefined, it gets cast to the
    // string 'null' or 'undefined'. Just delete instead.
    delete process.env.DEBUG;
  } else {
    process.env.DEBUG = namespaces;
  }
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  return process.env.DEBUG;
}

/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */

function init (debug) {
  debug.inspectOpts = {};

  var keys = Object.keys(exports.inspectOpts);
  for (var i = 0; i < keys.length; i++) {
    debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
  }
}

/**
 * Enable namespaces listed in `process.env.DEBUG` initially.
 */

exports.enable(load());


/***/ }),

/***/ "./node_modules/has-flag/index.js":
/*!****************************************!*\
  !*** ./node_modules/has-flag/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = (flag, argv) => {
	argv = argv || process.argv;
	const prefix = flag.startsWith('-') ? '' : (flag.length === 1 ? '-' : '--');
	const pos = argv.indexOf(prefix + flag);
	const terminatorPos = argv.indexOf('--');
	return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
};


/***/ }),

/***/ "./node_modules/ms/index.js":
/*!**********************************!*\
  !*** ./node_modules/ms/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') ||
    plural(ms, h, 'hour') ||
    plural(ms, m, 'minute') ||
    plural(ms, s, 'second') ||
    ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}


/***/ }),

/***/ "./node_modules/original-fs/index.js":
/*!*******************************************!*\
  !*** ./node_modules/original-fs/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
﻿

var _default = __webpack_require__(/*! fs */ "fs");

module.exports = _default;


/***/ }),

/***/ "./node_modules/supports-color/index.js":
/*!**********************************************!*\
  !*** ./node_modules/supports-color/index.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const os = __webpack_require__(/*! os */ "os");
const hasFlag = __webpack_require__(/*! has-flag */ "./node_modules/has-flag/index.js");

const env = process.env;

let forceColor;
if (hasFlag('no-color') ||
	hasFlag('no-colors') ||
	hasFlag('color=false')) {
	forceColor = false;
} else if (hasFlag('color') ||
	hasFlag('colors') ||
	hasFlag('color=true') ||
	hasFlag('color=always')) {
	forceColor = true;
}
if ('FORCE_COLOR' in env) {
	forceColor = env.FORCE_COLOR.length === 0 || parseInt(env.FORCE_COLOR, 10) !== 0;
}

function translateLevel(level) {
	if (level === 0) {
		return false;
	}

	return {
		level,
		hasBasic: true,
		has256: level >= 2,
		has16m: level >= 3
	};
}

function supportsColor(stream) {
	if (forceColor === false) {
		return 0;
	}

	if (hasFlag('color=16m') ||
		hasFlag('color=full') ||
		hasFlag('color=truecolor')) {
		return 3;
	}

	if (hasFlag('color=256')) {
		return 2;
	}

	if (stream && !stream.isTTY && forceColor !== true) {
		return 0;
	}

	const min = forceColor ? 1 : 0;

	if (process.platform === 'win32') {
		// Node.js 7.5.0 is the first version of Node.js to include a patch to
		// libuv that enables 256 color output on Windows. Anything earlier and it
		// won't work. However, here we target Node.js 8 at minimum as it is an LTS
		// release, and Node.js 7 is not. Windows 10 build 10586 is the first Windows
		// release that supports 256 colors. Windows 10 build 14931 is the first release
		// that supports 16m/TrueColor.
		const osRelease = os.release().split('.');
		if (
			Number(process.versions.node.split('.')[0]) >= 8 &&
			Number(osRelease[0]) >= 10 &&
			Number(osRelease[2]) >= 10586
		) {
			return Number(osRelease[2]) >= 14931 ? 3 : 2;
		}

		return 1;
	}

	if ('CI' in env) {
		if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI'].some(sign => sign in env) || env.CI_NAME === 'codeship') {
			return 1;
		}

		return min;
	}

	if ('TEAMCITY_VERSION' in env) {
		return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
	}

	if (env.COLORTERM === 'truecolor') {
		return 3;
	}

	if ('TERM_PROGRAM' in env) {
		const version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

		switch (env.TERM_PROGRAM) {
			case 'iTerm.app':
				return version >= 3 ? 3 : 2;
			case 'Apple_Terminal':
				return 2;
			// No default
		}
	}

	if (/-256(color)?$/i.test(env.TERM)) {
		return 2;
	}

	if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
		return 1;
	}

	if ('COLORTERM' in env) {
		return 1;
	}

	if (env.TERM === 'dumb') {
		return min;
	}

	return min;
}

function getSupportLevel(stream) {
	const level = supportsColor(stream);
	return translateLevel(level);
}

module.exports = {
	supportsColor: getSupportLevel,
	stdout: getSupportLevel(process.stdout),
	stderr: getSupportLevel(process.stderr)
};


/***/ }),

/***/ "./src/download.ts":
/*!*************************!*\
  !*** ./src/download.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(__webpack_require__(/*! axios */ "./node_modules/axios/index.js"));
const fs_1 = __webpack_require__(/*! fs */ "fs");
const core = __importStar(__webpack_require__(/*! @actions/core */ "./node_modules/@actions/core/lib/core.js"));
class Download {
    constructor(version) {
        this.version = version;
        this.BASE_URL = 'https://dl.google.com/dl/cloudsdk/channels/rapid';
        this.sdkUrl = this.BASE_URL;
        this.compressMode = 'tar.gz';
        this.setSdkDownloadUrl();
    }
    download() {
        return __awaiter(this, void 0, void 0, function* () {
            const destination = `google-cloud-sdk.${this.compressMode}`;
            core.debug(`Downloading ${this.sdkUrl}`);
            const response = yield axios_1.default.get(this.sdkUrl, {
                onDownloadProgress: (e) => console.log(e)
            });
            yield fs_1.promises.writeFile(destination, response.data);
            core.debug(`Downloaded ${this.sdkUrl}`);
            return destination;
        });
    }
    setSdkDownloadUrl() {
        if (this.version === 'latest') {
            if (process.platform === 'win32') {
                this.sdkUrl = `${this.BASE_URL}/google-cloud-sdk.zip`;
                this.compressMode = 'zip';
            }
            else {
                this.sdkUrl = `${this.BASE_URL}/google-cloud-sdk.tar.gz`;
                this.compressMode = 'tar.gz';
            }
        }
        else {
            if (process.platform === 'win32') {
                this.sdkUrl = `${this.BASE_URL}/downloads/google-cloud-sdk-${this.version}-windows-x86_64.zip`;
                this.compressMode = 'zip';
            }
            else if (process.platform === 'darwin') {
                this.sdkUrl = `${this.BASE_URL}/downloads/google-cloud-sdk-${this.version}-darwin-x86_64.tar.gz`;
                this.compressMode = 'tar.gz';
            }
            else {
                this.sdkUrl = `${this.BASE_URL}/downloads/google-cloud-sdk-${this.version}-linux-x86_64.tar.gz`;
                this.compressMode = 'tar.gz';
            }
        }
    }
}
exports.Download = Download;


/***/ }),

/***/ "./src/install.ts":
/*!************************!*\
  !*** ./src/install.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const download_1 = __webpack_require__(/*! ./download */ "./src/download.ts");
const adm_zip_1 = __importDefault(__webpack_require__(/*! adm-zip */ "./node_modules/adm-zip/adm-zip.js"));
const path_1 = __webpack_require__(/*! path */ "path");
const core = __importStar(__webpack_require__(/*! @actions/core */ "./node_modules/@actions/core/lib/core.js"));
function install() {
    return __awaiter(this, void 0, void 0, function* () {
        const downloader = new download_1.Download('latest');
        const sdkFile = yield downloader.download();
        if (sdkFile.endsWith('.zip')) {
            core.debug('Downloaded file is a zip, unzipping...');
            const zip = new adm_zip_1.default(path_1.resolve(process.cwd(), sdkFile));
            const destinationFolder = path_1.resolve(process.cwd(), 'google-cloud-sdk');
            zip.extractAllTo(destinationFolder, true);
            core.debug(`Unzipped to ${destinationFolder}`);
        }
    });
}
exports.install = install;
install();


/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("assert");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),

/***/ "tty":
/*!**********************!*\
  !*** external "tty" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("tty");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("zlib");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhY3Rpb25zL2NvcmUvbGliL2NvbW1hbmQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhY3Rpb25zL2NvcmUvbGliL2NvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FkbS16aXAvYWRtLXppcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYWRtLXppcC9oZWFkZXJzL2VudHJ5SGVhZGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hZG0temlwL2hlYWRlcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FkbS16aXAvaGVhZGVycy9tYWluSGVhZGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hZG0temlwL21ldGhvZHMvZGVmbGF0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FkbS16aXAvbWV0aG9kcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYWRtLXppcC9tZXRob2RzL2luZmxhdGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hZG0temlwL3V0aWwvY29uc3RhbnRzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hZG0temlwL3V0aWwvZXJyb3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hZG0temlwL3V0aWwvZmF0dHIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FkbS16aXAvdXRpbC9maWxlU3lzdGVtLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hZG0temlwL3V0aWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FkbS16aXAvdXRpbC91dGlscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYWRtLXppcC96aXBFbnRyeS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYWRtLXppcC96aXBGaWxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2FkYXB0ZXJzL2h0dHAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy94aHIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9heGlvcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NhbmNlbC9DYW5jZWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsVG9rZW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvaXNDYW5jZWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0F4aW9zLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9JbnRlcmNlcHRvck1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2NyZWF0ZUVycm9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9kaXNwYXRjaFJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2VuaGFuY2VFcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvbWVyZ2VDb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3NldHRsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvdHJhbnNmb3JtRGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2RlZmF1bHRzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9iaW5kLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9idWlsZFVSTC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29tYmluZVVSTHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2Nvb2tpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcGFyc2VIZWFkZXJzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9zcHJlYWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi91dGlscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3Mvbm9kZV9tb2R1bGVzL2lzLWJ1ZmZlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZm9sbG93LXJlZGlyZWN0cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZm9sbG93LXJlZGlyZWN0cy9ub2RlX21vZHVsZXMvZGVidWcvc3JjL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2ZvbGxvdy1yZWRpcmVjdHMvbm9kZV9tb2R1bGVzL2RlYnVnL3NyYy9kZWJ1Zy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZm9sbG93LXJlZGlyZWN0cy9ub2RlX21vZHVsZXMvZGVidWcvc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9mb2xsb3ctcmVkaXJlY3RzL25vZGVfbW9kdWxlcy9kZWJ1Zy9zcmMvbm9kZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaGFzLWZsYWcvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL21zL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9vcmlnaW5hbC1mcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3VwcG9ydHMtY29sb3IvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Rvd25sb2FkLnRzIiwid2VicGFjazovLy8uL3NyYy9pbnN0YWxsLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImFzc2VydFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImZzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaHR0cFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImh0dHBzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwib3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXRoXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwic3RyZWFtXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidHR5XCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidXJsXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidXRpbFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInpsaWJcIiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsV0FBVyxtQkFBTyxDQUFDLGNBQUk7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxJQUFJLEdBQUcsVUFBVSxVQUFVLEdBQUc7QUFDbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsbUJBQW1CO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBLG1DOzs7Ozs7Ozs7Ozs7QUNqRWE7QUFDYjtBQUNBLDJCQUEyQiwrREFBK0QsZ0JBQWdCLEVBQUUsRUFBRTtBQUM5RztBQUNBLG1DQUFtQyxNQUFNLDZCQUE2QixFQUFFLFlBQVksV0FBVyxFQUFFO0FBQ2pHLGtDQUFrQyxNQUFNLGlDQUFpQyxFQUFFLFlBQVksV0FBVyxFQUFFO0FBQ3BHLCtCQUErQixxRkFBcUY7QUFDcEg7QUFDQSxLQUFLO0FBQ0w7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RCxrQkFBa0IsbUJBQU8sQ0FBQyw4REFBVztBQUNyQyxXQUFXLG1CQUFPLENBQUMsY0FBSTtBQUN2QixhQUFhLG1CQUFPLENBQUMsa0JBQU07QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLHVEQUF1RDtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxPQUFPO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDLDZCQUE2QixVQUFVLEVBQUUsZUFBZSxFQUFFLG9CQUFvQjtBQUM5RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxzQ0FBc0M7QUFDM0U7QUFDQSw0REFBNEQsS0FBSztBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLE9BQU87QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLE9BQU87QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLEtBQUs7QUFDckM7QUFDQTtBQUNBLGdDOzs7Ozs7Ozs7OztBQ2xNQSxZQUFZLG1CQUFPLENBQUMsb0RBQVE7QUFDNUI7QUFDQSxPQUFPLG1CQUFPLENBQUMsa0JBQU07O0FBRXJCOztBQUVBLGVBQWUsbUJBQU8sQ0FBQyxzREFBWTtBQUNuQyxXQUFXLG1CQUFPLENBQUMsb0RBQVc7O0FBRTlCOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUEsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsRUFBRSw0Q0FBNEM7QUFDOUM7QUFDQSxFQUFFLE9BQU87QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxPQUFPO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQztBQUMvQztBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7OztBQ2xDQSxTQUFTLG1CQUFPLENBQUMsK0RBQWM7QUFDL0IsVUFBVSxtQkFBTyxDQUFDLGtCQUFNOztBQUV4Qjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNM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QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGFBQWE7QUFDeEIsV0FBVyxTQUFTO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQ0FBbUMsT0FBTztBQUMxQztBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsU0FBUyxHQUFHLFNBQVM7QUFDNUMsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUEsdUNBQXVDLE9BQU87QUFDOUM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLGdDQUFnQztBQUNoQyxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBLHVDQUF1QyxPQUFPO0FBQzlDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUM3VUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1ZBLFVBQVUsbUJBQU8sQ0FBQyxnQkFBSztBQUN2QixXQUFXLG1CQUFPLENBQUMsa0JBQU07QUFDekIsWUFBWSxtQkFBTyxDQUFDLG9CQUFPO0FBQzNCLGFBQWEsbUJBQU8sQ0FBQyxzQkFBUTtBQUM3QixlQUFlLG1CQUFPLENBQUMsc0JBQVE7QUFDL0IsWUFBWSxtQkFBTyxDQUFDLDhFQUFPOztBQUUzQjtBQUNBO0FBQ0Esb0JBQW9COztBQUVwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLGlDQUFpQztBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQix1Q0FBdUMsRUFBRTtBQUMvRCxHQUFHO0FBQ0gsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUIsMkJBQTJCO0FBQ2xEOzs7Ozs7Ozs7Ozs7QUNqVUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkIsbUJBQU8sQ0FBQyxnRkFBUztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7O0FBRUE7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OztBQ0FBLCtCOzs7Ozs7Ozs7OztBQ0FBLGlDOzs7Ozs7Ozs7OztBQ0FBLGtDOzs7Ozs7Ozs7OztBQ0FBLCtCOzs7Ozs7Ozs7OztBQ0FBLGlDOzs7Ozs7Ozs7OztBQ0FBLG1DOzs7Ozs7Ozs7OztBQ0FBLGdDOzs7Ozs7Ozs7OztBQ0FBLGdDOzs7Ozs7Ozs7OztBQ0FBLGlDOzs7Ozs7Ozs7OztBQ0FBLGlDIiwiZmlsZSI6Imluc3RhbGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbnN0YWxsLnRzXCIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBvcyA9IHJlcXVpcmUoXCJvc1wiKTtcbi8qKlxuICogQ29tbWFuZHNcbiAqXG4gKiBDb21tYW5kIEZvcm1hdDpcbiAqICAgIyNbbmFtZSBrZXk9dmFsdWU7a2V5PXZhbHVlXW1lc3NhZ2VcbiAqXG4gKiBFeGFtcGxlczpcbiAqICAgIyNbd2FybmluZ11UaGlzIGlzIHRoZSB1c2VyIHdhcm5pbmcgbWVzc2FnZVxuICogICAjI1tzZXQtc2VjcmV0IG5hbWU9bXlwYXNzd29yZF1kZWZpbml0ZWx5Tm90QVBhc3N3b3JkIVxuICovXG5mdW5jdGlvbiBpc3N1ZUNvbW1hbmQoY29tbWFuZCwgcHJvcGVydGllcywgbWVzc2FnZSkge1xuICAgIGNvbnN0IGNtZCA9IG5ldyBDb21tYW5kKGNvbW1hbmQsIHByb3BlcnRpZXMsIG1lc3NhZ2UpO1xuICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKGNtZC50b1N0cmluZygpICsgb3MuRU9MKTtcbn1cbmV4cG9ydHMuaXNzdWVDb21tYW5kID0gaXNzdWVDb21tYW5kO1xuZnVuY3Rpb24gaXNzdWUobmFtZSwgbWVzc2FnZSA9ICcnKSB7XG4gICAgaXNzdWVDb21tYW5kKG5hbWUsIHt9LCBtZXNzYWdlKTtcbn1cbmV4cG9ydHMuaXNzdWUgPSBpc3N1ZTtcbmNvbnN0IENNRF9TVFJJTkcgPSAnOjonO1xuY2xhc3MgQ29tbWFuZCB7XG4gICAgY29uc3RydWN0b3IoY29tbWFuZCwgcHJvcGVydGllcywgbWVzc2FnZSkge1xuICAgICAgICBpZiAoIWNvbW1hbmQpIHtcbiAgICAgICAgICAgIGNvbW1hbmQgPSAnbWlzc2luZy5jb21tYW5kJztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbW1hbmQgPSBjb21tYW5kO1xuICAgICAgICB0aGlzLnByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIH1cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgbGV0IGNtZFN0ciA9IENNRF9TVFJJTkcgKyB0aGlzLmNvbW1hbmQ7XG4gICAgICAgIGlmICh0aGlzLnByb3BlcnRpZXMgJiYgT2JqZWN0LmtleXModGhpcy5wcm9wZXJ0aWVzKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjbWRTdHIgKz0gJyAnO1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5wcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbCA9IHRoaXMucHJvcGVydGllc1trZXldO1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzYWZlbHkgYXBwZW5kIHRoZSB2YWwgLSBhdm9pZCBibG93aW5nIHVwIHdoZW4gYXR0ZW1wdGluZyB0b1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2FsbCAucmVwbGFjZSgpIGlmIG1lc3NhZ2UgaXMgbm90IGEgc3RyaW5nIGZvciBzb21lIHJlYXNvblxuICAgICAgICAgICAgICAgICAgICAgICAgY21kU3RyICs9IGAke2tleX09JHtlc2NhcGUoYCR7dmFsIHx8ICcnfWApfSxgO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNtZFN0ciArPSBDTURfU1RSSU5HO1xuICAgICAgICAvLyBzYWZlbHkgYXBwZW5kIHRoZSBtZXNzYWdlIC0gYXZvaWQgYmxvd2luZyB1cCB3aGVuIGF0dGVtcHRpbmcgdG9cbiAgICAgICAgLy8gY2FsbCAucmVwbGFjZSgpIGlmIG1lc3NhZ2UgaXMgbm90IGEgc3RyaW5nIGZvciBzb21lIHJlYXNvblxuICAgICAgICBjb25zdCBtZXNzYWdlID0gYCR7dGhpcy5tZXNzYWdlIHx8ICcnfWA7XG4gICAgICAgIGNtZFN0ciArPSBlc2NhcGVEYXRhKG1lc3NhZ2UpO1xuICAgICAgICByZXR1cm4gY21kU3RyO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGVzY2FwZURhdGEocykge1xuICAgIHJldHVybiBzLnJlcGxhY2UoL1xcci9nLCAnJTBEJykucmVwbGFjZSgvXFxuL2csICclMEEnKTtcbn1cbmZ1bmN0aW9uIGVzY2FwZShzKSB7XG4gICAgcmV0dXJuIHNcbiAgICAgICAgLnJlcGxhY2UoL1xcci9nLCAnJTBEJylcbiAgICAgICAgLnJlcGxhY2UoL1xcbi9nLCAnJTBBJylcbiAgICAgICAgLnJlcGxhY2UoL10vZywgJyU1RCcpXG4gICAgICAgIC5yZXBsYWNlKC87L2csICclM0InKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbW1hbmQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvbW1hbmRfMSA9IHJlcXVpcmUoXCIuL2NvbW1hbmRcIik7XG5jb25zdCBvcyA9IHJlcXVpcmUoXCJvc1wiKTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKFwicGF0aFwiKTtcbi8qKlxuICogVGhlIGNvZGUgdG8gZXhpdCBhbiBhY3Rpb25cbiAqL1xudmFyIEV4aXRDb2RlO1xuKGZ1bmN0aW9uIChFeGl0Q29kZSkge1xuICAgIC8qKlxuICAgICAqIEEgY29kZSBpbmRpY2F0aW5nIHRoYXQgdGhlIGFjdGlvbiB3YXMgc3VjY2Vzc2Z1bFxuICAgICAqL1xuICAgIEV4aXRDb2RlW0V4aXRDb2RlW1wiU3VjY2Vzc1wiXSA9IDBdID0gXCJTdWNjZXNzXCI7XG4gICAgLyoqXG4gICAgICogQSBjb2RlIGluZGljYXRpbmcgdGhhdCB0aGUgYWN0aW9uIHdhcyBhIGZhaWx1cmVcbiAgICAgKi9cbiAgICBFeGl0Q29kZVtFeGl0Q29kZVtcIkZhaWx1cmVcIl0gPSAxXSA9IFwiRmFpbHVyZVwiO1xufSkoRXhpdENvZGUgPSBleHBvcnRzLkV4aXRDb2RlIHx8IChleHBvcnRzLkV4aXRDb2RlID0ge30pKTtcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFZhcmlhYmxlc1xuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLyoqXG4gKiBTZXRzIGVudiB2YXJpYWJsZSBmb3IgdGhpcyBhY3Rpb24gYW5kIGZ1dHVyZSBhY3Rpb25zIGluIHRoZSBqb2JcbiAqIEBwYXJhbSBuYW1lIHRoZSBuYW1lIG9mIHRoZSB2YXJpYWJsZSB0byBzZXRcbiAqIEBwYXJhbSB2YWwgdGhlIHZhbHVlIG9mIHRoZSB2YXJpYWJsZVxuICovXG5mdW5jdGlvbiBleHBvcnRWYXJpYWJsZShuYW1lLCB2YWwpIHtcbiAgICBwcm9jZXNzLmVudltuYW1lXSA9IHZhbDtcbiAgICBjb21tYW5kXzEuaXNzdWVDb21tYW5kKCdzZXQtZW52JywgeyBuYW1lIH0sIHZhbCk7XG59XG5leHBvcnRzLmV4cG9ydFZhcmlhYmxlID0gZXhwb3J0VmFyaWFibGU7XG4vKipcbiAqIFJlZ2lzdGVycyBhIHNlY3JldCB3aGljaCB3aWxsIGdldCBtYXNrZWQgZnJvbSBsb2dzXG4gKiBAcGFyYW0gc2VjcmV0IHZhbHVlIG9mIHRoZSBzZWNyZXRcbiAqL1xuZnVuY3Rpb24gc2V0U2VjcmV0KHNlY3JldCkge1xuICAgIGNvbW1hbmRfMS5pc3N1ZUNvbW1hbmQoJ2FkZC1tYXNrJywge30sIHNlY3JldCk7XG59XG5leHBvcnRzLnNldFNlY3JldCA9IHNldFNlY3JldDtcbi8qKlxuICogUHJlcGVuZHMgaW5wdXRQYXRoIHRvIHRoZSBQQVRIIChmb3IgdGhpcyBhY3Rpb24gYW5kIGZ1dHVyZSBhY3Rpb25zKVxuICogQHBhcmFtIGlucHV0UGF0aFxuICovXG5mdW5jdGlvbiBhZGRQYXRoKGlucHV0UGF0aCkge1xuICAgIGNvbW1hbmRfMS5pc3N1ZUNvbW1hbmQoJ2FkZC1wYXRoJywge30sIGlucHV0UGF0aCk7XG4gICAgcHJvY2Vzcy5lbnZbJ1BBVEgnXSA9IGAke2lucHV0UGF0aH0ke3BhdGguZGVsaW1pdGVyfSR7cHJvY2Vzcy5lbnZbJ1BBVEgnXX1gO1xufVxuZXhwb3J0cy5hZGRQYXRoID0gYWRkUGF0aDtcbi8qKlxuICogR2V0cyB0aGUgdmFsdWUgb2YgYW4gaW5wdXQuICBUaGUgdmFsdWUgaXMgYWxzbyB0cmltbWVkLlxuICpcbiAqIEBwYXJhbSAgICAgbmFtZSAgICAgbmFtZSBvZiB0aGUgaW5wdXQgdG8gZ2V0XG4gKiBAcGFyYW0gICAgIG9wdGlvbnMgIG9wdGlvbmFsLiBTZWUgSW5wdXRPcHRpb25zLlxuICogQHJldHVybnMgICBzdHJpbmdcbiAqL1xuZnVuY3Rpb24gZ2V0SW5wdXQobmFtZSwgb3B0aW9ucykge1xuICAgIGNvbnN0IHZhbCA9IHByb2Nlc3MuZW52W2BJTlBVVF8ke25hbWUucmVwbGFjZSgvIC9nLCAnXycpLnRvVXBwZXJDYXNlKCl9YF0gfHwgJyc7XG4gICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5yZXF1aXJlZCAmJiAhdmFsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSW5wdXQgcmVxdWlyZWQgYW5kIG5vdCBzdXBwbGllZDogJHtuYW1lfWApO1xuICAgIH1cbiAgICByZXR1cm4gdmFsLnRyaW0oKTtcbn1cbmV4cG9ydHMuZ2V0SW5wdXQgPSBnZXRJbnB1dDtcbi8qKlxuICogU2V0cyB0aGUgdmFsdWUgb2YgYW4gb3V0cHV0LlxuICpcbiAqIEBwYXJhbSAgICAgbmFtZSAgICAgbmFtZSBvZiB0aGUgb3V0cHV0IHRvIHNldFxuICogQHBhcmFtICAgICB2YWx1ZSAgICB2YWx1ZSB0byBzdG9yZVxuICovXG5mdW5jdGlvbiBzZXRPdXRwdXQobmFtZSwgdmFsdWUpIHtcbiAgICBjb21tYW5kXzEuaXNzdWVDb21tYW5kKCdzZXQtb3V0cHV0JywgeyBuYW1lIH0sIHZhbHVlKTtcbn1cbmV4cG9ydHMuc2V0T3V0cHV0ID0gc2V0T3V0cHV0O1xuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUmVzdWx0c1xuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLyoqXG4gKiBTZXRzIHRoZSBhY3Rpb24gc3RhdHVzIHRvIGZhaWxlZC5cbiAqIFdoZW4gdGhlIGFjdGlvbiBleGl0cyBpdCB3aWxsIGJlIHdpdGggYW4gZXhpdCBjb2RlIG9mIDFcbiAqIEBwYXJhbSBtZXNzYWdlIGFkZCBlcnJvciBpc3N1ZSBtZXNzYWdlXG4gKi9cbmZ1bmN0aW9uIHNldEZhaWxlZChtZXNzYWdlKSB7XG4gICAgcHJvY2Vzcy5leGl0Q29kZSA9IEV4aXRDb2RlLkZhaWx1cmU7XG4gICAgZXJyb3IobWVzc2FnZSk7XG59XG5leHBvcnRzLnNldEZhaWxlZCA9IHNldEZhaWxlZDtcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIExvZ2dpbmcgQ29tbWFuZHNcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8qKlxuICogV3JpdGVzIGRlYnVnIG1lc3NhZ2UgdG8gdXNlciBsb2dcbiAqIEBwYXJhbSBtZXNzYWdlIGRlYnVnIG1lc3NhZ2VcbiAqL1xuZnVuY3Rpb24gZGVidWcobWVzc2FnZSkge1xuICAgIGNvbW1hbmRfMS5pc3N1ZUNvbW1hbmQoJ2RlYnVnJywge30sIG1lc3NhZ2UpO1xufVxuZXhwb3J0cy5kZWJ1ZyA9IGRlYnVnO1xuLyoqXG4gKiBBZGRzIGFuIGVycm9yIGlzc3VlXG4gKiBAcGFyYW0gbWVzc2FnZSBlcnJvciBpc3N1ZSBtZXNzYWdlXG4gKi9cbmZ1bmN0aW9uIGVycm9yKG1lc3NhZ2UpIHtcbiAgICBjb21tYW5kXzEuaXNzdWUoJ2Vycm9yJywgbWVzc2FnZSk7XG59XG5leHBvcnRzLmVycm9yID0gZXJyb3I7XG4vKipcbiAqIEFkZHMgYW4gd2FybmluZyBpc3N1ZVxuICogQHBhcmFtIG1lc3NhZ2Ugd2FybmluZyBpc3N1ZSBtZXNzYWdlXG4gKi9cbmZ1bmN0aW9uIHdhcm5pbmcobWVzc2FnZSkge1xuICAgIGNvbW1hbmRfMS5pc3N1ZSgnd2FybmluZycsIG1lc3NhZ2UpO1xufVxuZXhwb3J0cy53YXJuaW5nID0gd2FybmluZztcbi8qKlxuICogV3JpdGVzIGluZm8gdG8gbG9nIHdpdGggY29uc29sZS5sb2cuXG4gKiBAcGFyYW0gbWVzc2FnZSBpbmZvIG1lc3NhZ2VcbiAqL1xuZnVuY3Rpb24gaW5mbyhtZXNzYWdlKSB7XG4gICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUobWVzc2FnZSArIG9zLkVPTCk7XG59XG5leHBvcnRzLmluZm8gPSBpbmZvO1xuLyoqXG4gKiBCZWdpbiBhbiBvdXRwdXQgZ3JvdXAuXG4gKlxuICogT3V0cHV0IHVudGlsIHRoZSBuZXh0IGBncm91cEVuZGAgd2lsbCBiZSBmb2xkYWJsZSBpbiB0aGlzIGdyb3VwXG4gKlxuICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIG91dHB1dCBncm91cFxuICovXG5mdW5jdGlvbiBzdGFydEdyb3VwKG5hbWUpIHtcbiAgICBjb21tYW5kXzEuaXNzdWUoJ2dyb3VwJywgbmFtZSk7XG59XG5leHBvcnRzLnN0YXJ0R3JvdXAgPSBzdGFydEdyb3VwO1xuLyoqXG4gKiBFbmQgYW4gb3V0cHV0IGdyb3VwLlxuICovXG5mdW5jdGlvbiBlbmRHcm91cCgpIHtcbiAgICBjb21tYW5kXzEuaXNzdWUoJ2VuZGdyb3VwJyk7XG59XG5leHBvcnRzLmVuZEdyb3VwID0gZW5kR3JvdXA7XG4vKipcbiAqIFdyYXAgYW4gYXN5bmNocm9ub3VzIGZ1bmN0aW9uIGNhbGwgaW4gYSBncm91cC5cbiAqXG4gKiBSZXR1cm5zIHRoZSBzYW1lIHR5cGUgYXMgdGhlIGZ1bmN0aW9uIGl0c2VsZi5cbiAqXG4gKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgZ3JvdXBcbiAqIEBwYXJhbSBmbiBUaGUgZnVuY3Rpb24gdG8gd3JhcCBpbiB0aGUgZ3JvdXBcbiAqL1xuZnVuY3Rpb24gZ3JvdXAobmFtZSwgZm4pIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBzdGFydEdyb3VwKG5hbWUpO1xuICAgICAgICBsZXQgcmVzdWx0O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVzdWx0ID0geWllbGQgZm4oKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIGVuZEdyb3VwKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9KTtcbn1cbmV4cG9ydHMuZ3JvdXAgPSBncm91cDtcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFdyYXBwZXIgYWN0aW9uIHN0YXRlXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vKipcbiAqIFNhdmVzIHN0YXRlIGZvciBjdXJyZW50IGFjdGlvbiwgdGhlIHN0YXRlIGNhbiBvbmx5IGJlIHJldHJpZXZlZCBieSB0aGlzIGFjdGlvbidzIHBvc3Qgam9iIGV4ZWN1dGlvbi5cbiAqXG4gKiBAcGFyYW0gICAgIG5hbWUgICAgIG5hbWUgb2YgdGhlIHN0YXRlIHRvIHN0b3JlXG4gKiBAcGFyYW0gICAgIHZhbHVlICAgIHZhbHVlIHRvIHN0b3JlXG4gKi9cbmZ1bmN0aW9uIHNhdmVTdGF0ZShuYW1lLCB2YWx1ZSkge1xuICAgIGNvbW1hbmRfMS5pc3N1ZUNvbW1hbmQoJ3NhdmUtc3RhdGUnLCB7IG5hbWUgfSwgdmFsdWUpO1xufVxuZXhwb3J0cy5zYXZlU3RhdGUgPSBzYXZlU3RhdGU7XG4vKipcbiAqIEdldHMgdGhlIHZhbHVlIG9mIGFuIHN0YXRlIHNldCBieSB0aGlzIGFjdGlvbidzIG1haW4gZXhlY3V0aW9uLlxuICpcbiAqIEBwYXJhbSAgICAgbmFtZSAgICAgbmFtZSBvZiB0aGUgc3RhdGUgdG8gZ2V0XG4gKiBAcmV0dXJucyAgIHN0cmluZ1xuICovXG5mdW5jdGlvbiBnZXRTdGF0ZShuYW1lKSB7XG4gICAgcmV0dXJuIHByb2Nlc3MuZW52W2BTVEFURV8ke25hbWV9YF0gfHwgJyc7XG59XG5leHBvcnRzLmdldFN0YXRlID0gZ2V0U3RhdGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb3JlLmpzLm1hcCIsInZhciBVdGlscyA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XHJcbnZhciBmcyA9IFV0aWxzLkZpbGVTeXN0ZW0ucmVxdWlyZSgpLFxyXG5cdHB0aCA9IHJlcXVpcmUoXCJwYXRoXCIpO1xyXG5cclxuZnMuZXhpc3RzU3luYyA9IGZzLmV4aXN0c1N5bmMgfHwgcHRoLmV4aXN0c1N5bmM7XHJcblxyXG52YXIgWmlwRW50cnkgPSByZXF1aXJlKFwiLi96aXBFbnRyeVwiKSxcclxuXHRaaXBGaWxlID0gcmVxdWlyZShcIi4vemlwRmlsZVwiKTtcclxuXHJcbnZhciBpc1dpbiA9IC9ed2luLy50ZXN0KHByb2Nlc3MucGxhdGZvcm0pO1xyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKC8qU3RyaW5nKi9pbnB1dCkge1xyXG5cdHZhciBfemlwID0gdW5kZWZpbmVkLFxyXG5cdFx0X2ZpbGVuYW1lID0gXCJcIjtcclxuXHJcblx0aWYgKGlucHV0ICYmIHR5cGVvZiBpbnB1dCA9PT0gXCJzdHJpbmdcIikgeyAvLyBsb2FkIHppcCBmaWxlXHJcblx0XHRpZiAoZnMuZXhpc3RzU3luYyhpbnB1dCkpIHtcclxuXHRcdFx0X2ZpbGVuYW1lID0gaW5wdXQ7XHJcblx0XHRcdF96aXAgPSBuZXcgWmlwRmlsZShpbnB1dCwgVXRpbHMuQ29uc3RhbnRzLkZJTEUpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhyb3cgVXRpbHMuRXJyb3JzLklOVkFMSURfRklMRU5BTUU7XHJcblx0XHR9XHJcblx0fSBlbHNlIGlmIChpbnB1dCAmJiBCdWZmZXIuaXNCdWZmZXIoaW5wdXQpKSB7IC8vIGxvYWQgYnVmZmVyXHJcblx0XHRfemlwID0gbmV3IFppcEZpbGUoaW5wdXQsIFV0aWxzLkNvbnN0YW50cy5CVUZGRVIpO1xyXG5cdH0gZWxzZSB7IC8vIGNyZWF0ZSBuZXcgemlwIGZpbGVcclxuXHRcdF96aXAgPSBuZXcgWmlwRmlsZShudWxsLCBVdGlscy5Db25zdGFudHMuTk9ORSk7XHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBzYW5pdGl6ZShwcmVmaXgsIG5hbWUpIHtcclxuXHRcdHByZWZpeCA9IHB0aC5yZXNvbHZlKHB0aC5ub3JtYWxpemUocHJlZml4KSk7XHJcblx0XHR2YXIgcGFydHMgPSBuYW1lLnNwbGl0KCcvJyk7XHJcblx0XHRmb3IgKHZhciBpID0gMCwgbCA9IHBhcnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG5cdFx0XHR2YXIgcGF0aCA9IHB0aC5ub3JtYWxpemUocHRoLmpvaW4ocHJlZml4LCBwYXJ0cy5zbGljZShpLCBsKS5qb2luKHB0aC5zZXApKSk7XHJcblx0XHRcdGlmIChwYXRoLmluZGV4T2YocHJlZml4KSA9PT0gMCkge1xyXG5cdFx0XHRcdHJldHVybiBwYXRoO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcHRoLm5vcm1hbGl6ZShwdGguam9pbihwcmVmaXgsIHB0aC5iYXNlbmFtZShuYW1lKSkpO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZ2V0RW50cnkoLypPYmplY3QqL2VudHJ5KSB7XHJcblx0XHRpZiAoZW50cnkgJiYgX3ppcCkge1xyXG5cdFx0XHR2YXIgaXRlbTtcclxuXHRcdFx0Ly8gSWYgZW50cnkgd2FzIGdpdmVuIGFzIGEgZmlsZSBuYW1lXHJcblx0XHRcdGlmICh0eXBlb2YgZW50cnkgPT09IFwic3RyaW5nXCIpXHJcblx0XHRcdFx0aXRlbSA9IF96aXAuZ2V0RW50cnkoZW50cnkpO1xyXG5cdFx0XHQvLyBpZiBlbnRyeSB3YXMgZ2l2ZW4gYXMgYSBaaXBFbnRyeSBvYmplY3RcclxuXHRcdFx0aWYgKHR5cGVvZiBlbnRyeSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgZW50cnkuZW50cnlOYW1lICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiBlbnRyeS5oZWFkZXIgIT09IFwidW5kZWZpbmVkXCIpXHJcblx0XHRcdFx0aXRlbSA9IF96aXAuZ2V0RW50cnkoZW50cnkuZW50cnlOYW1lKTtcclxuXHJcblx0XHRcdGlmIChpdGVtKSB7XHJcblx0XHRcdFx0cmV0dXJuIGl0ZW07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBudWxsO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIHtcclxuXHRcdC8qKlxyXG5cdFx0ICogRXh0cmFjdHMgdGhlIGdpdmVuIGVudHJ5IGZyb20gdGhlIGFyY2hpdmUgYW5kIHJldHVybnMgdGhlIGNvbnRlbnQgYXMgYSBCdWZmZXIgb2JqZWN0XHJcblx0XHQgKiBAcGFyYW0gZW50cnkgWmlwRW50cnkgb2JqZWN0IG9yIFN0cmluZyB3aXRoIHRoZSBmdWxsIHBhdGggb2YgdGhlIGVudHJ5XHJcblx0XHQgKlxyXG5cdFx0ICogQHJldHVybiBCdWZmZXIgb3IgTnVsbCBpbiBjYXNlIG9mIGVycm9yXHJcblx0XHQgKi9cclxuXHRcdHJlYWRGaWxlOiBmdW5jdGlvbiAoLypPYmplY3QqL2VudHJ5KSB7XHJcblx0XHRcdHZhciBpdGVtID0gZ2V0RW50cnkoZW50cnkpO1xyXG5cdFx0XHRyZXR1cm4gaXRlbSAmJiBpdGVtLmdldERhdGEoKSB8fCBudWxsO1xyXG5cdFx0fSxcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEFzeW5jaHJvbm91cyByZWFkRmlsZVxyXG5cdFx0ICogQHBhcmFtIGVudHJ5IFppcEVudHJ5IG9iamVjdCBvciBTdHJpbmcgd2l0aCB0aGUgZnVsbCBwYXRoIG9mIHRoZSBlbnRyeVxyXG5cdFx0ICogQHBhcmFtIGNhbGxiYWNrXHJcblx0XHQgKlxyXG5cdFx0ICogQHJldHVybiBCdWZmZXIgb3IgTnVsbCBpbiBjYXNlIG9mIGVycm9yXHJcblx0XHQgKi9cclxuXHRcdHJlYWRGaWxlQXN5bmM6IGZ1bmN0aW9uICgvKk9iamVjdCovZW50cnksIC8qRnVuY3Rpb24qL2NhbGxiYWNrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gZ2V0RW50cnkoZW50cnkpO1xyXG5cdFx0XHRpZiAoaXRlbSkge1xyXG5cdFx0XHRcdGl0ZW0uZ2V0RGF0YUFzeW5jKGNhbGxiYWNrKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRjYWxsYmFjayhudWxsLCBcImdldEVudHJ5IGZhaWxlZCBmb3I6XCIgKyBlbnRyeSlcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEV4dHJhY3RzIHRoZSBnaXZlbiBlbnRyeSBmcm9tIHRoZSBhcmNoaXZlIGFuZCByZXR1cm5zIHRoZSBjb250ZW50IGFzIHBsYWluIHRleHQgaW4gdGhlIGdpdmVuIGVuY29kaW5nXHJcblx0XHQgKiBAcGFyYW0gZW50cnkgWmlwRW50cnkgb2JqZWN0IG9yIFN0cmluZyB3aXRoIHRoZSBmdWxsIHBhdGggb2YgdGhlIGVudHJ5XHJcblx0XHQgKiBAcGFyYW0gZW5jb2RpbmcgT3B0aW9uYWwuIElmIG5vIGVuY29kaW5nIGlzIHNwZWNpZmllZCB1dGY4IGlzIHVzZWRcclxuXHRcdCAqXHJcblx0XHQgKiBAcmV0dXJuIFN0cmluZ1xyXG5cdFx0ICovXHJcblx0XHRyZWFkQXNUZXh0OiBmdW5jdGlvbiAoLypPYmplY3QqL2VudHJ5LCAvKlN0cmluZyAtIE9wdGlvbmFsKi9lbmNvZGluZykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IGdldEVudHJ5KGVudHJ5KTtcclxuXHRcdFx0aWYgKGl0ZW0pIHtcclxuXHRcdFx0XHR2YXIgZGF0YSA9IGl0ZW0uZ2V0RGF0YSgpO1xyXG5cdFx0XHRcdGlmIChkYXRhICYmIGRhdGEubGVuZ3RoKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gZGF0YS50b1N0cmluZyhlbmNvZGluZyB8fCBcInV0ZjhcIik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBcIlwiO1xyXG5cdFx0fSxcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEFzeW5jaHJvbm91cyByZWFkQXNUZXh0XHJcblx0XHQgKiBAcGFyYW0gZW50cnkgWmlwRW50cnkgb2JqZWN0IG9yIFN0cmluZyB3aXRoIHRoZSBmdWxsIHBhdGggb2YgdGhlIGVudHJ5XHJcblx0XHQgKiBAcGFyYW0gY2FsbGJhY2tcclxuXHRcdCAqIEBwYXJhbSBlbmNvZGluZyBPcHRpb25hbC4gSWYgbm8gZW5jb2RpbmcgaXMgc3BlY2lmaWVkIHV0ZjggaXMgdXNlZFxyXG5cdFx0ICpcclxuXHRcdCAqIEByZXR1cm4gU3RyaW5nXHJcblx0XHQgKi9cclxuXHRcdHJlYWRBc1RleHRBc3luYzogZnVuY3Rpb24gKC8qT2JqZWN0Ki9lbnRyeSwgLypGdW5jdGlvbiovY2FsbGJhY2ssIC8qU3RyaW5nIC0gT3B0aW9uYWwqL2VuY29kaW5nKSB7XHJcblx0XHRcdHZhciBpdGVtID0gZ2V0RW50cnkoZW50cnkpO1xyXG5cdFx0XHRpZiAoaXRlbSkge1xyXG5cdFx0XHRcdGl0ZW0uZ2V0RGF0YUFzeW5jKGZ1bmN0aW9uIChkYXRhLCBlcnIpIHtcclxuXHRcdFx0XHRcdGlmIChlcnIpIHtcclxuXHRcdFx0XHRcdFx0Y2FsbGJhY2soZGF0YSwgZXJyKTtcclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlmIChkYXRhICYmIGRhdGEubGVuZ3RoKSB7XHJcblx0XHRcdFx0XHRcdGNhbGxiYWNrKGRhdGEudG9TdHJpbmcoZW5jb2RpbmcgfHwgXCJ1dGY4XCIpKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGNhbGxiYWNrKFwiXCIpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Y2FsbGJhY2soXCJcIik7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBSZW1vdmUgdGhlIGVudHJ5IGZyb20gdGhlIGZpbGUgb3IgdGhlIGVudHJ5IGFuZCBhbGwgaXQncyBuZXN0ZWQgZGlyZWN0b3JpZXMgYW5kIGZpbGVzIGlmIHRoZSBnaXZlbiBlbnRyeSBpcyBhIGRpcmVjdG9yeVxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSBlbnRyeVxyXG5cdFx0ICovXHJcblx0XHRkZWxldGVGaWxlOiBmdW5jdGlvbiAoLypPYmplY3QqL2VudHJ5KSB7IC8vIEBUT0RPOiB0ZXN0IGRlbGV0ZUZpbGVcclxuXHRcdFx0dmFyIGl0ZW0gPSBnZXRFbnRyeShlbnRyeSk7XHJcblx0XHRcdGlmIChpdGVtKSB7XHJcblx0XHRcdFx0X3ppcC5kZWxldGVFbnRyeShpdGVtLmVudHJ5TmFtZSk7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBZGRzIGEgY29tbWVudCB0byB0aGUgemlwLiBUaGUgemlwIG11c3QgYmUgcmV3cml0dGVuIGFmdGVyIGFkZGluZyB0aGUgY29tbWVudC5cclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0gY29tbWVudFxyXG5cdFx0ICovXHJcblx0XHRhZGRaaXBDb21tZW50OiBmdW5jdGlvbiAoLypTdHJpbmcqL2NvbW1lbnQpIHsgLy8gQFRPRE86IHRlc3QgYWRkWmlwQ29tbWVudFxyXG5cdFx0XHRfemlwLmNvbW1lbnQgPSBjb21tZW50O1xyXG5cdFx0fSxcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFJldHVybnMgdGhlIHppcCBjb21tZW50XHJcblx0XHQgKlxyXG5cdFx0ICogQHJldHVybiBTdHJpbmdcclxuXHRcdCAqL1xyXG5cdFx0Z2V0WmlwQ29tbWVudDogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRyZXR1cm4gX3ppcC5jb21tZW50IHx8ICcnO1xyXG5cdFx0fSxcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEFkZHMgYSBjb21tZW50IHRvIGEgc3BlY2lmaWVkIHppcEVudHJ5LiBUaGUgemlwIG11c3QgYmUgcmV3cml0dGVuIGFmdGVyIGFkZGluZyB0aGUgY29tbWVudFxyXG5cdFx0ICogVGhlIGNvbW1lbnQgY2Fubm90IGV4Y2VlZCA2NTUzNSBjaGFyYWN0ZXJzIGluIGxlbmd0aFxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSBlbnRyeVxyXG5cdFx0ICogQHBhcmFtIGNvbW1lbnRcclxuXHRcdCAqL1xyXG5cdFx0YWRkWmlwRW50cnlDb21tZW50OiBmdW5jdGlvbiAoLypPYmplY3QqL2VudHJ5LCAvKlN0cmluZyovY29tbWVudCkge1xyXG5cdFx0XHR2YXIgaXRlbSA9IGdldEVudHJ5KGVudHJ5KTtcclxuXHRcdFx0aWYgKGl0ZW0pIHtcclxuXHRcdFx0XHRpdGVtLmNvbW1lbnQgPSBjb21tZW50O1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogUmV0dXJucyB0aGUgY29tbWVudCBvZiB0aGUgc3BlY2lmaWVkIGVudHJ5XHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIGVudHJ5XHJcblx0XHQgKiBAcmV0dXJuIFN0cmluZ1xyXG5cdFx0ICovXHJcblx0XHRnZXRaaXBFbnRyeUNvbW1lbnQ6IGZ1bmN0aW9uICgvKk9iamVjdCovZW50cnkpIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSBnZXRFbnRyeShlbnRyeSk7XHJcblx0XHRcdGlmIChpdGVtKSB7XHJcblx0XHRcdFx0cmV0dXJuIGl0ZW0uY29tbWVudCB8fCAnJztcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gJydcclxuXHRcdH0sXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBVcGRhdGVzIHRoZSBjb250ZW50IG9mIGFuIGV4aXN0aW5nIGVudHJ5IGluc2lkZSB0aGUgYXJjaGl2ZS4gVGhlIHppcCBtdXN0IGJlIHJld3JpdHRlbiBhZnRlciB1cGRhdGluZyB0aGUgY29udGVudFxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSBlbnRyeVxyXG5cdFx0ICogQHBhcmFtIGNvbnRlbnRcclxuXHRcdCAqL1xyXG5cdFx0dXBkYXRlRmlsZTogZnVuY3Rpb24gKC8qT2JqZWN0Ki9lbnRyeSwgLypCdWZmZXIqL2NvbnRlbnQpIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSBnZXRFbnRyeShlbnRyeSk7XHJcblx0XHRcdGlmIChpdGVtKSB7XHJcblx0XHRcdFx0aXRlbS5zZXREYXRhKGNvbnRlbnQpO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQWRkcyBhIGZpbGUgZnJvbSB0aGUgZGlzayB0byB0aGUgYXJjaGl2ZVxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSBsb2NhbFBhdGggRmlsZSB0byBhZGQgdG8gemlwXHJcblx0XHQgKiBAcGFyYW0gemlwUGF0aCBPcHRpb25hbCBwYXRoIGluc2lkZSB0aGUgemlwXHJcblx0XHQgKiBAcGFyYW0gemlwTmFtZSBPcHRpb25hbCBuYW1lIGZvciB0aGUgZmlsZVxyXG5cdFx0ICovXHJcblx0XHRhZGRMb2NhbEZpbGU6IGZ1bmN0aW9uICgvKlN0cmluZyovbG9jYWxQYXRoLCAvKlN0cmluZyovemlwUGF0aCwgLypTdHJpbmcqL3ppcE5hbWUpIHtcclxuXHRcdFx0aWYgKGZzLmV4aXN0c1N5bmMobG9jYWxQYXRoKSkge1xyXG5cdFx0XHRcdGlmICh6aXBQYXRoKSB7XHJcblx0XHRcdFx0XHR6aXBQYXRoID0gemlwUGF0aC5zcGxpdChcIlxcXFxcIikuam9pbihcIi9cIik7XHJcblx0XHRcdFx0XHRpZiAoemlwUGF0aC5jaGFyQXQoemlwUGF0aC5sZW5ndGggLSAxKSAhPT0gXCIvXCIpIHtcclxuXHRcdFx0XHRcdFx0emlwUGF0aCArPSBcIi9cIjtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0emlwUGF0aCA9IFwiXCI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHZhciBwID0gbG9jYWxQYXRoLnNwbGl0KFwiXFxcXFwiKS5qb2luKFwiL1wiKS5zcGxpdChcIi9cIikucG9wKCk7XHJcblxyXG5cdFx0XHRcdGlmICh6aXBOYW1lKSB7XHJcblx0XHRcdFx0XHR0aGlzLmFkZEZpbGUoemlwUGF0aCArIHppcE5hbWUsIGZzLnJlYWRGaWxlU3luYyhsb2NhbFBhdGgpLCBcIlwiLCAwKVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR0aGlzLmFkZEZpbGUoemlwUGF0aCArIHAsIGZzLnJlYWRGaWxlU3luYyhsb2NhbFBhdGgpLCBcIlwiLCAwKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aHJvdyBVdGlscy5FcnJvcnMuRklMRV9OT1RfRk9VTkQucmVwbGFjZShcIiVzXCIsIGxvY2FsUGF0aCk7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBZGRzIGEgbG9jYWwgZGlyZWN0b3J5IGFuZCBhbGwgaXRzIG5lc3RlZCBmaWxlcyBhbmQgZGlyZWN0b3JpZXMgdG8gdGhlIGFyY2hpdmVcclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0gbG9jYWxQYXRoXHJcblx0XHQgKiBAcGFyYW0gemlwUGF0aCBvcHRpb25hbCBwYXRoIGluc2lkZSB6aXBcclxuXHRcdCAqIEBwYXJhbSBmaWx0ZXIgb3B0aW9uYWwgUmVnRXhwIG9yIEZ1bmN0aW9uIGlmIGZpbGVzIG1hdGNoIHdpbGxcclxuXHRcdCAqICAgICAgICAgICAgICAgYmUgaW5jbHVkZWQuXHJcblx0XHQgKi9cclxuXHRcdGFkZExvY2FsRm9sZGVyOiBmdW5jdGlvbiAoLypTdHJpbmcqL2xvY2FsUGF0aCwgLypTdHJpbmcqL3ppcFBhdGgsIC8qUmVnRXhwfEZ1bmN0aW9uKi9maWx0ZXIpIHtcclxuXHRcdFx0aWYgKGZpbHRlciA9PT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdFx0ZmlsdGVyID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fSBlbHNlIGlmIChmaWx0ZXIgaW5zdGFuY2VvZiBSZWdFeHApIHtcclxuXHRcdFx0XHRmaWx0ZXIgPSBmdW5jdGlvbiAoZmlsdGVyKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gZnVuY3Rpb24gKGZpbGVuYW1lKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBmaWx0ZXIudGVzdChmaWxlbmFtZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fShmaWx0ZXIpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoemlwUGF0aCkge1xyXG5cdFx0XHRcdHppcFBhdGggPSB6aXBQYXRoLnNwbGl0KFwiXFxcXFwiKS5qb2luKFwiL1wiKTtcclxuXHRcdFx0XHRpZiAoemlwUGF0aC5jaGFyQXQoemlwUGF0aC5sZW5ndGggLSAxKSAhPT0gXCIvXCIpIHtcclxuXHRcdFx0XHRcdHppcFBhdGggKz0gXCIvXCI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHppcFBhdGggPSBcIlwiO1xyXG5cdFx0XHR9XHJcblx0XHRcdC8vIG5vcm1hbGl6ZSB0aGUgcGF0aCBmaXJzdFxyXG5cdFx0XHRsb2NhbFBhdGggPSBwdGgubm9ybWFsaXplKGxvY2FsUGF0aCk7XHJcblx0XHRcdGxvY2FsUGF0aCA9IGxvY2FsUGF0aC5zcGxpdChcIlxcXFxcIikuam9pbihcIi9cIik7IC8vd2luZG93cyBmaXhcclxuXHRcdFx0aWYgKGxvY2FsUGF0aC5jaGFyQXQobG9jYWxQYXRoLmxlbmd0aCAtIDEpICE9PSBcIi9cIilcclxuXHRcdFx0XHRsb2NhbFBhdGggKz0gXCIvXCI7XHJcblxyXG5cdFx0XHRpZiAoZnMuZXhpc3RzU3luYyhsb2NhbFBhdGgpKSB7XHJcblxyXG5cdFx0XHRcdHZhciBpdGVtcyA9IFV0aWxzLmZpbmRGaWxlcyhsb2NhbFBhdGgpLFxyXG5cdFx0XHRcdFx0c2VsZiA9IHRoaXM7XHJcblxyXG5cdFx0XHRcdGlmIChpdGVtcy5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdGl0ZW1zLmZvckVhY2goZnVuY3Rpb24gKHBhdGgpIHtcclxuXHRcdFx0XHRcdFx0dmFyIHAgPSBwYXRoLnNwbGl0KFwiXFxcXFwiKS5qb2luKFwiL1wiKS5yZXBsYWNlKG5ldyBSZWdFeHAobG9jYWxQYXRoLnJlcGxhY2UoLyhcXCh8XFwpKS9nLCAnXFxcXCQxJyksICdpJyksIFwiXCIpOyAvL3dpbmRvd3MgZml4XHJcblx0XHRcdFx0XHRcdGlmIChmaWx0ZXIocCkpIHtcclxuXHRcdFx0XHRcdFx0XHRpZiAocC5jaGFyQXQocC5sZW5ndGggLSAxKSAhPT0gXCIvXCIpIHtcclxuXHRcdFx0XHRcdFx0XHRcdHNlbGYuYWRkRmlsZSh6aXBQYXRoICsgcCwgZnMucmVhZEZpbGVTeW5jKHBhdGgpLCBcIlwiLCAwKVxyXG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdFx0XHRzZWxmLmFkZEZpbGUoemlwUGF0aCArIHAsIEJ1ZmZlci5hbGxvYygwKSwgXCJcIiwgMClcclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR0aHJvdyBVdGlscy5FcnJvcnMuRklMRV9OT1RfRk9VTkQucmVwbGFjZShcIiVzXCIsIGxvY2FsUGF0aCk7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBbGxvd3MgeW91IHRvIGNyZWF0ZSBhIGVudHJ5IChmaWxlIG9yIGRpcmVjdG9yeSkgaW4gdGhlIHppcCBmaWxlLlxyXG5cdFx0ICogSWYgeW91IHdhbnQgdG8gY3JlYXRlIGEgZGlyZWN0b3J5IHRoZSBlbnRyeU5hbWUgbXVzdCBlbmQgaW4gLyBhbmQgYSBudWxsIGJ1ZmZlciBzaG91bGQgYmUgcHJvdmlkZWQuXHJcblx0XHQgKiBDb21tZW50IGFuZCBhdHRyaWJ1dGVzIGFyZSBvcHRpb25hbFxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSBlbnRyeU5hbWVcclxuXHRcdCAqIEBwYXJhbSBjb250ZW50XHJcblx0XHQgKiBAcGFyYW0gY29tbWVudFxyXG5cdFx0ICogQHBhcmFtIGF0dHJcclxuXHRcdCAqL1xyXG5cdFx0YWRkRmlsZTogZnVuY3Rpb24gKC8qU3RyaW5nKi9lbnRyeU5hbWUsIC8qQnVmZmVyKi9jb250ZW50LCAvKlN0cmluZyovY29tbWVudCwgLypOdW1iZXIqL2F0dHIpIHtcclxuXHRcdFx0dmFyIGVudHJ5ID0gbmV3IFppcEVudHJ5KCk7XHJcblx0XHRcdGVudHJ5LmVudHJ5TmFtZSA9IGVudHJ5TmFtZTtcclxuXHRcdFx0ZW50cnkuY29tbWVudCA9IGNvbW1lbnQgfHwgXCJcIjtcclxuXHJcblx0XHRcdGlmICghYXR0cikge1xyXG5cdFx0XHRcdGlmIChlbnRyeS5pc0RpcmVjdG9yeSkge1xyXG5cdFx0XHRcdFx0YXR0ciA9ICgwbzQwNzU1IDw8IDE2KSB8IDB4MTA7IC8vIChwZXJtaXNzaW9ucyBkcnd4ci14ci14KSArIChNUy1ET1MgZGlyZWN0b3J5IGZsYWcpXHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdGF0dHIgPSAwbzY0NCA8PCAxNjsgLy8gcGVybWlzc2lvbnMgLXItd3ItLXItLVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZW50cnkuYXR0ciA9IGF0dHI7XHJcblxyXG5cdFx0XHRlbnRyeS5zZXREYXRhKGNvbnRlbnQpO1xyXG5cdFx0XHRfemlwLnNldEVudHJ5KGVudHJ5KTtcclxuXHRcdH0sXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBSZXR1cm5zIGFuIGFycmF5IG9mIFppcEVudHJ5IG9iamVjdHMgcmVwcmVzZW50aW5nIHRoZSBmaWxlcyBhbmQgZm9sZGVycyBpbnNpZGUgdGhlIGFyY2hpdmVcclxuXHRcdCAqXHJcblx0XHQgKiBAcmV0dXJuIEFycmF5XHJcblx0XHQgKi9cclxuXHRcdGdldEVudHJpZXM6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKF96aXApIHtcclxuXHRcdFx0XHRyZXR1cm4gX3ppcC5lbnRyaWVzO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJldHVybiBbXTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFJldHVybnMgYSBaaXBFbnRyeSBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBmaWxlIG9yIGZvbGRlciBzcGVjaWZpZWQgYnkgYGBuYW1lYGAuXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIG5hbWVcclxuXHRcdCAqIEByZXR1cm4gWmlwRW50cnlcclxuXHRcdCAqL1xyXG5cdFx0Z2V0RW50cnk6IGZ1bmN0aW9uICgvKlN0cmluZyovbmFtZSkge1xyXG5cdFx0XHRyZXR1cm4gZ2V0RW50cnkobmFtZSk7XHJcblx0XHR9LFxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogRXh0cmFjdHMgdGhlIGdpdmVuIGVudHJ5IHRvIHRoZSBnaXZlbiB0YXJnZXRQYXRoXHJcblx0XHQgKiBJZiB0aGUgZW50cnkgaXMgYSBkaXJlY3RvcnkgaW5zaWRlIHRoZSBhcmNoaXZlLCB0aGUgZW50aXJlIGRpcmVjdG9yeSBhbmQgaXQncyBzdWJkaXJlY3RvcmllcyB3aWxsIGJlIGV4dHJhY3RlZFxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSBlbnRyeSBaaXBFbnRyeSBvYmplY3Qgb3IgU3RyaW5nIHdpdGggdGhlIGZ1bGwgcGF0aCBvZiB0aGUgZW50cnlcclxuXHRcdCAqIEBwYXJhbSB0YXJnZXRQYXRoIFRhcmdldCBmb2xkZXIgd2hlcmUgdG8gd3JpdGUgdGhlIGZpbGVcclxuXHRcdCAqIEBwYXJhbSBtYWludGFpbkVudHJ5UGF0aCBJZiBtYWludGFpbkVudHJ5UGF0aCBpcyB0cnVlIGFuZCB0aGUgZW50cnkgaXMgaW5zaWRlIGEgZm9sZGVyLCB0aGUgZW50cnkgZm9sZGVyXHJcblx0XHQgKiAgICAgICAgICAgICAgICAgICAgICAgICAgd2lsbCBiZSBjcmVhdGVkIGluIHRhcmdldFBhdGggYXMgd2VsbC4gRGVmYXVsdCBpcyBUUlVFXHJcblx0XHQgKiBAcGFyYW0gb3ZlcndyaXRlIElmIHRoZSBmaWxlIGFscmVhZHkgZXhpc3RzIGF0IHRoZSB0YXJnZXQgcGF0aCwgdGhlIGZpbGUgd2lsbCBiZSBvdmVyd3JpdGVuIGlmIHRoaXMgaXMgdHJ1ZS5cclxuXHRcdCAqICAgICAgICAgICAgICAgICAgRGVmYXVsdCBpcyBGQUxTRVxyXG5cdFx0ICpcclxuXHRcdCAqIEByZXR1cm4gQm9vbGVhblxyXG5cdFx0ICovXHJcblx0XHRleHRyYWN0RW50cnlUbzogZnVuY3Rpb24gKC8qT2JqZWN0Ki9lbnRyeSwgLypTdHJpbmcqL3RhcmdldFBhdGgsIC8qQm9vbGVhbiovbWFpbnRhaW5FbnRyeVBhdGgsIC8qQm9vbGVhbiovb3ZlcndyaXRlKSB7XHJcblx0XHRcdG92ZXJ3cml0ZSA9IG92ZXJ3cml0ZSB8fCBmYWxzZTtcclxuXHRcdFx0bWFpbnRhaW5FbnRyeVBhdGggPSB0eXBlb2YgbWFpbnRhaW5FbnRyeVBhdGggPT09IFwidW5kZWZpbmVkXCIgPyB0cnVlIDogbWFpbnRhaW5FbnRyeVBhdGg7XHJcblxyXG5cdFx0XHR2YXIgaXRlbSA9IGdldEVudHJ5KGVudHJ5KTtcclxuXHRcdFx0aWYgKCFpdGVtKSB7XHJcblx0XHRcdFx0dGhyb3cgVXRpbHMuRXJyb3JzLk5PX0VOVFJZO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgZW50cnlOYW1lID0gaXRlbS5lbnRyeU5hbWU7XHJcblxyXG5cdFx0XHR2YXIgdGFyZ2V0ID0gc2FuaXRpemUodGFyZ2V0UGF0aCwgbWFpbnRhaW5FbnRyeVBhdGggPyBlbnRyeU5hbWUgOiBwdGguYmFzZW5hbWUoZW50cnlOYW1lKSk7XHJcblxyXG5cdFx0XHRpZiAoaXRlbS5pc0RpcmVjdG9yeSkge1xyXG5cdFx0XHRcdHRhcmdldCA9IHB0aC5yZXNvbHZlKHRhcmdldCwgXCIuLlwiKTtcclxuXHRcdFx0XHR2YXIgY2hpbGRyZW4gPSBfemlwLmdldEVudHJ5Q2hpbGRyZW4oaXRlbSk7XHJcblx0XHRcdFx0Y2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbiAoY2hpbGQpIHtcclxuXHRcdFx0XHRcdGlmIChjaGlsZC5pc0RpcmVjdG9yeSkgcmV0dXJuO1xyXG5cdFx0XHRcdFx0dmFyIGNvbnRlbnQgPSBjaGlsZC5nZXREYXRhKCk7XHJcblx0XHRcdFx0XHRpZiAoIWNvbnRlbnQpIHtcclxuXHRcdFx0XHRcdFx0dGhyb3cgVXRpbHMuRXJyb3JzLkNBTlRfRVhUUkFDVF9GSUxFO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0dmFyIGNoaWxkTmFtZSA9IHNhbml0aXplKHRhcmdldFBhdGgsIG1haW50YWluRW50cnlQYXRoID8gY2hpbGQuZW50cnlOYW1lIDogcHRoLmJhc2VuYW1lKGNoaWxkLmVudHJ5TmFtZSkpO1xyXG5cclxuXHRcdFx0XHRcdFV0aWxzLndyaXRlRmlsZVRvKGNoaWxkTmFtZSwgY29udGVudCwgb3ZlcndyaXRlKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIGNvbnRlbnQgPSBpdGVtLmdldERhdGEoKTtcclxuXHRcdFx0aWYgKCFjb250ZW50KSB0aHJvdyBVdGlscy5FcnJvcnMuQ0FOVF9FWFRSQUNUX0ZJTEU7XHJcblxyXG5cdFx0XHRpZiAoZnMuZXhpc3RzU3luYyh0YXJnZXQpICYmICFvdmVyd3JpdGUpIHtcclxuXHRcdFx0XHR0aHJvdyBVdGlscy5FcnJvcnMuQ0FOVF9PVkVSUklERTtcclxuXHRcdFx0fVxyXG5cdFx0XHRVdGlscy53cml0ZUZpbGVUbyh0YXJnZXQsIGNvbnRlbnQsIG92ZXJ3cml0ZSk7XHJcblxyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH0sXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBUZXN0IHRoZSBhcmNoaXZlXHJcblx0XHQgKlxyXG5cdFx0ICovXHJcblx0XHR0ZXN0OiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGlmICghX3ppcCkge1xyXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0Zm9yICh2YXIgZW50cnkgaW4gX3ppcC5lbnRyaWVzKSB7XHJcblx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdGlmIChlbnRyeS5pc0RpcmVjdG9yeSkge1xyXG5cdFx0XHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHZhciBjb250ZW50ID0gX3ppcC5lbnRyaWVzW2VudHJ5XS5nZXREYXRhKCk7XHJcblx0XHRcdFx0XHRpZiAoIWNvbnRlbnQpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gY2F0Y2ggKGVycikge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH0sXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBFeHRyYWN0cyB0aGUgZW50aXJlIGFyY2hpdmUgdG8gdGhlIGdpdmVuIGxvY2F0aW9uXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIHRhcmdldFBhdGggVGFyZ2V0IGxvY2F0aW9uXHJcblx0XHQgKiBAcGFyYW0gb3ZlcndyaXRlIElmIHRoZSBmaWxlIGFscmVhZHkgZXhpc3RzIGF0IHRoZSB0YXJnZXQgcGF0aCwgdGhlIGZpbGUgd2lsbCBiZSBvdmVyd3JpdGVuIGlmIHRoaXMgaXMgdHJ1ZS5cclxuXHRcdCAqICAgICAgICAgICAgICAgICAgRGVmYXVsdCBpcyBGQUxTRVxyXG5cdFx0ICovXHJcblx0XHRleHRyYWN0QWxsVG86IGZ1bmN0aW9uICgvKlN0cmluZyovdGFyZ2V0UGF0aCwgLypCb29sZWFuKi9vdmVyd3JpdGUpIHtcclxuXHRcdFx0b3ZlcndyaXRlID0gb3ZlcndyaXRlIHx8IGZhbHNlO1xyXG5cdFx0XHRpZiAoIV96aXApIHtcclxuXHRcdFx0XHR0aHJvdyBVdGlscy5FcnJvcnMuTk9fWklQO1xyXG5cdFx0XHR9XHJcblx0XHRcdF96aXAuZW50cmllcy5mb3JFYWNoKGZ1bmN0aW9uIChlbnRyeSkge1xyXG5cdFx0XHRcdHZhciBlbnRyeU5hbWUgPSBzYW5pdGl6ZSh0YXJnZXRQYXRoLCBlbnRyeS5lbnRyeU5hbWUudG9TdHJpbmcoKSk7XHJcblx0XHRcdFx0aWYgKGVudHJ5LmlzRGlyZWN0b3J5KSB7XHJcblx0XHRcdFx0XHRVdGlscy5tYWtlRGlyKGVudHJ5TmFtZSk7XHJcblx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHZhciBjb250ZW50ID0gZW50cnkuZ2V0RGF0YSgpO1xyXG5cdFx0XHRcdGlmICghY29udGVudCkge1xyXG5cdFx0XHRcdFx0dGhyb3cgVXRpbHMuRXJyb3JzLkNBTlRfRVhUUkFDVF9GSUxFO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRVdGlscy53cml0ZUZpbGVUbyhlbnRyeU5hbWUsIGNvbnRlbnQsIG92ZXJ3cml0ZSk7XHJcblx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdGZzLnV0aW1lc1N5bmMoZW50cnlOYW1lLCBlbnRyeS5oZWFkZXIudGltZSwgZW50cnkuaGVhZGVyLnRpbWUpXHJcblx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XHJcblx0XHRcdFx0XHR0aHJvdyBVdGlscy5FcnJvcnMuQ0FOVF9FWFRSQUNUX0ZJTEU7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0fSxcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEFzeW5jaHJvbm91cyBleHRyYWN0QWxsVG9cclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0gdGFyZ2V0UGF0aCBUYXJnZXQgbG9jYXRpb25cclxuXHRcdCAqIEBwYXJhbSBvdmVyd3JpdGUgSWYgdGhlIGZpbGUgYWxyZWFkeSBleGlzdHMgYXQgdGhlIHRhcmdldCBwYXRoLCB0aGUgZmlsZSB3aWxsIGJlIG92ZXJ3cml0ZW4gaWYgdGhpcyBpcyB0cnVlLlxyXG5cdFx0ICogICAgICAgICAgICAgICAgICBEZWZhdWx0IGlzIEZBTFNFXHJcblx0XHQgKiBAcGFyYW0gY2FsbGJhY2tcclxuXHRcdCAqL1xyXG5cdFx0ZXh0cmFjdEFsbFRvQXN5bmM6IGZ1bmN0aW9uICgvKlN0cmluZyovdGFyZ2V0UGF0aCwgLypCb29sZWFuKi9vdmVyd3JpdGUsIC8qRnVuY3Rpb24qL2NhbGxiYWNrKSB7XHJcblx0XHRcdGlmICghY2FsbGJhY2spIHtcclxuXHRcdFx0XHRjYWxsYmFjayA9IGZ1bmN0aW9uKCkge31cclxuXHRcdFx0fVxyXG5cdFx0XHRvdmVyd3JpdGUgPSBvdmVyd3JpdGUgfHwgZmFsc2U7XHJcblx0XHRcdGlmICghX3ppcCkge1xyXG5cdFx0XHRcdGNhbGxiYWNrKG5ldyBFcnJvcihVdGlscy5FcnJvcnMuTk9fWklQKSk7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgZW50cmllcyA9IF96aXAuZW50cmllcztcclxuXHRcdFx0dmFyIGkgPSBlbnRyaWVzLmxlbmd0aDtcclxuXHRcdFx0ZW50cmllcy5mb3JFYWNoKGZ1bmN0aW9uIChlbnRyeSkge1xyXG5cdFx0XHRcdGlmIChpIDw9IDApIHJldHVybjsgLy8gSGFkIGFuIGVycm9yIGFscmVhZHlcclxuXHJcblx0XHRcdFx0dmFyIGVudHJ5TmFtZSA9IHB0aC5ub3JtYWxpemUoZW50cnkuZW50cnlOYW1lLnRvU3RyaW5nKCkpO1xyXG5cclxuXHRcdFx0XHRpZiAoZW50cnkuaXNEaXJlY3RvcnkpIHtcclxuXHRcdFx0XHRcdFV0aWxzLm1ha2VEaXIoc2FuaXRpemUodGFyZ2V0UGF0aCwgZW50cnlOYW1lKSk7XHJcblx0XHRcdFx0XHRpZiAoLS1pID09PSAwKVxyXG5cdFx0XHRcdFx0XHRjYWxsYmFjayh1bmRlZmluZWQpO1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRlbnRyeS5nZXREYXRhQXN5bmMoZnVuY3Rpb24gKGNvbnRlbnQsIGVycikge1xyXG5cdFx0XHRcdFx0aWYgKGkgPD0gMCkgcmV0dXJuO1xyXG5cdFx0XHRcdFx0aWYgKGVycikge1xyXG5cdFx0XHRcdFx0XHRjYWxsYmFjayhuZXcgRXJyb3IoZXJyKSk7XHJcblx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGlmICghY29udGVudCkge1xyXG5cdFx0XHRcdFx0XHRpID0gMDtcclxuXHRcdFx0XHRcdFx0Y2FsbGJhY2sobmV3IEVycm9yKFV0aWxzLkVycm9ycy5DQU5UX0VYVFJBQ1RfRklMRSkpO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0VXRpbHMud3JpdGVGaWxlVG9Bc3luYyhzYW5pdGl6ZSh0YXJnZXRQYXRoLCBlbnRyeU5hbWUpLCBjb250ZW50LCBvdmVyd3JpdGUsIGZ1bmN0aW9uIChzdWNjKSB7XHJcblx0XHRcdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRcdFx0ZnMudXRpbWVzU3luYyhwdGgucmVzb2x2ZSh0YXJnZXRQYXRoLCBlbnRyeU5hbWUpLCBlbnRyeS5oZWFkZXIudGltZSwgZW50cnkuaGVhZGVyLnRpbWUpO1xyXG5cdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcclxuXHRcdFx0XHRcdFx0XHRjYWxsYmFjayhuZXcgRXJyb3IoJ1VuYWJsZSB0byBzZXQgdXRpbWVzJykpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGlmIChpIDw9IDApIHJldHVybjtcclxuXHRcdFx0XHRcdFx0aWYgKCFzdWNjKSB7XHJcblx0XHRcdFx0XHRcdFx0aSA9IDA7XHJcblx0XHRcdFx0XHRcdFx0Y2FsbGJhY2sobmV3IEVycm9yKCdVbmFibGUgdG8gd3JpdGUnKSk7XHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGlmICgtLWkgPT09IDApXHJcblx0XHRcdFx0XHRcdFx0Y2FsbGJhY2sodW5kZWZpbmVkKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9KVxyXG5cdFx0fSxcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFdyaXRlcyB0aGUgbmV3bHkgY3JlYXRlZCB6aXAgZmlsZSB0byBkaXNrIGF0IHRoZSBzcGVjaWZpZWQgbG9jYXRpb24gb3IgaWYgYSB6aXAgd2FzIG9wZW5lZCBhbmQgbm8gYGB0YXJnZXRGaWxlTmFtZWBgIGlzIHByb3ZpZGVkLCBpdCB3aWxsIG92ZXJ3cml0ZSB0aGUgb3BlbmVkIHppcFxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSB0YXJnZXRGaWxlTmFtZVxyXG5cdFx0ICogQHBhcmFtIGNhbGxiYWNrXHJcblx0XHQgKi9cclxuXHRcdHdyaXRlWmlwOiBmdW5jdGlvbiAoLypTdHJpbmcqL3RhcmdldEZpbGVOYW1lLCAvKkZ1bmN0aW9uKi9jYWxsYmFjaykge1xyXG5cdFx0XHRpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xyXG5cdFx0XHRcdGlmICh0eXBlb2YgdGFyZ2V0RmlsZU5hbWUgPT09IFwiZnVuY3Rpb25cIikge1xyXG5cdFx0XHRcdFx0Y2FsbGJhY2sgPSB0YXJnZXRGaWxlTmFtZTtcclxuXHRcdFx0XHRcdHRhcmdldEZpbGVOYW1lID0gXCJcIjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmICghdGFyZ2V0RmlsZU5hbWUgJiYgX2ZpbGVuYW1lKSB7XHJcblx0XHRcdFx0dGFyZ2V0RmlsZU5hbWUgPSBfZmlsZW5hbWU7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKCF0YXJnZXRGaWxlTmFtZSkgcmV0dXJuO1xyXG5cclxuXHRcdFx0dmFyIHppcERhdGEgPSBfemlwLmNvbXByZXNzVG9CdWZmZXIoKTtcclxuXHRcdFx0aWYgKHppcERhdGEpIHtcclxuXHRcdFx0XHR2YXIgb2sgPSBVdGlscy53cml0ZUZpbGVUbyh0YXJnZXRGaWxlTmFtZSwgemlwRGF0YSwgdHJ1ZSk7XHJcblx0XHRcdFx0aWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykgY2FsbGJhY2soIW9rID8gbmV3IEVycm9yKFwiZmFpbGVkXCIpIDogbnVsbCwgXCJcIik7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBSZXR1cm5zIHRoZSBjb250ZW50IG9mIHRoZSBlbnRpcmUgemlwIGZpbGUgYXMgYSBCdWZmZXIgb2JqZWN0XHJcblx0XHQgKlxyXG5cdFx0ICogQHJldHVybiBCdWZmZXJcclxuXHRcdCAqL1xyXG5cdFx0dG9CdWZmZXI6IGZ1bmN0aW9uICgvKkZ1bmN0aW9uKi9vblN1Y2Nlc3MsIC8qRnVuY3Rpb24qL29uRmFpbCwgLypGdW5jdGlvbiovb25JdGVtU3RhcnQsIC8qRnVuY3Rpb24qL29uSXRlbUVuZCkge1xyXG5cdFx0XHR0aGlzLnZhbHVlT2YgPSAyO1xyXG5cdFx0XHRpZiAodHlwZW9mIG9uU3VjY2VzcyA9PT0gXCJmdW5jdGlvblwiKSB7XHJcblx0XHRcdFx0X3ppcC50b0FzeW5jQnVmZmVyKG9uU3VjY2Vzcywgb25GYWlsLCBvbkl0ZW1TdGFydCwgb25JdGVtRW5kKTtcclxuXHRcdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gX3ppcC5jb21wcmVzc1RvQnVmZmVyKClcclxuXHRcdH1cclxuXHR9XHJcbn07XHJcbiIsInZhciBVdGlscyA9IHJlcXVpcmUoXCIuLi91dGlsXCIpLFxyXG4gICAgQ29uc3RhbnRzID0gVXRpbHMuQ29uc3RhbnRzO1xyXG5cclxuLyogVGhlIGNlbnRyYWwgZGlyZWN0b3J5IGZpbGUgaGVhZGVyICovXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIF92ZXJNYWRlID0gMHgwQSxcclxuICAgICAgICBfdmVyc2lvbiA9IDB4MEEsXHJcbiAgICAgICAgX2ZsYWdzID0gMCxcclxuICAgICAgICBfbWV0aG9kID0gMCxcclxuICAgICAgICBfdGltZSA9IDAsXHJcbiAgICAgICAgX2NyYyA9IDAsXHJcbiAgICAgICAgX2NvbXByZXNzZWRTaXplID0gMCxcclxuICAgICAgICBfc2l6ZSA9IDAsXHJcbiAgICAgICAgX2ZuYW1lTGVuID0gMCxcclxuICAgICAgICBfZXh0cmFMZW4gPSAwLFxyXG5cclxuICAgICAgICBfY29tTGVuID0gMCxcclxuICAgICAgICBfZGlza1N0YXJ0ID0gMCxcclxuICAgICAgICBfaW5hdHRyID0gMCxcclxuICAgICAgICBfYXR0ciA9IDAsXHJcbiAgICAgICAgX29mZnNldCA9IDA7XHJcblxyXG4gICAgdmFyIF9kYXRhSGVhZGVyID0ge307XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0VGltZSh2YWwpIHtcclxuICAgICAgICB2YWwgPSBuZXcgRGF0ZSh2YWwpO1xyXG4gICAgICAgIF90aW1lID0gKHZhbC5nZXRGdWxsWWVhcigpIC0gMTk4MCAmIDB4N2YpIDw8IDI1ICAvLyBiMDktMTYgeWVhcnMgZnJvbSAxOTgwXHJcbiAgICAgICAgICAgIHwgKHZhbC5nZXRNb250aCgpICsgMSkgPDwgMjEgICAgICAgICAgICAgICAgIC8vIGIwNS0wOCBtb250aFxyXG4gICAgICAgICAgICB8IHZhbC5nZXREYXRlKCkgPDwgMTYgICAgICAgICAgICAgICAgICAgICAgICAvLyBiMDAtMDQgaG91clxyXG5cclxuICAgICAgICAgICAgLy8gMiBieXRlcyB0aW1lXHJcbiAgICAgICAgICAgIHwgdmFsLmdldEhvdXJzKCkgPDwgMTEgICAgLy8gYjExLTE1IGhvdXJcclxuICAgICAgICAgICAgfCB2YWwuZ2V0TWludXRlcygpIDw8IDUgICAvLyBiMDUtMTAgbWludXRlXHJcbiAgICAgICAgICAgIHwgdmFsLmdldFNlY29uZHMoKSA+PiAxOyAgLy8gYjAwLTA0IHNlY29uZHMgZGl2aWRlZCBieSAyXHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGltZSgrbmV3IERhdGUoKSk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBnZXQgbWFkZSAoKSB7IHJldHVybiBfdmVyTWFkZTsgfSxcclxuICAgICAgICBzZXQgbWFkZSAodmFsKSB7IF92ZXJNYWRlID0gdmFsOyB9LFxyXG5cclxuICAgICAgICBnZXQgdmVyc2lvbiAoKSB7IHJldHVybiBfdmVyc2lvbjsgfSxcclxuICAgICAgICBzZXQgdmVyc2lvbiAodmFsKSB7IF92ZXJzaW9uID0gdmFsIH0sXHJcblxyXG4gICAgICAgIGdldCBmbGFncyAoKSB7IHJldHVybiBfZmxhZ3MgfSxcclxuICAgICAgICBzZXQgZmxhZ3MgKHZhbCkgeyBfZmxhZ3MgPSB2YWw7IH0sXHJcblxyXG4gICAgICAgIGdldCBtZXRob2QgKCkgeyByZXR1cm4gX21ldGhvZDsgfSxcclxuICAgICAgICBzZXQgbWV0aG9kICh2YWwpIHsgX21ldGhvZCA9IHZhbDsgfSxcclxuXHJcbiAgICAgICAgZ2V0IHRpbWUgKCkgeyByZXR1cm4gbmV3IERhdGUoXHJcbiAgICAgICAgICAgICgoX3RpbWUgPj4gMjUpICYgMHg3ZikgKyAxOTgwLFxyXG4gICAgICAgICAgICAoKF90aW1lID4+IDIxKSAmIDB4MGYpIC0gMSxcclxuICAgICAgICAgICAgKF90aW1lID4+IDE2KSAmIDB4MWYsXHJcbiAgICAgICAgICAgIChfdGltZSA+PiAxMSkgJiAweDFmLFxyXG4gICAgICAgICAgICAoX3RpbWUgPj4gNSkgJiAweDNmLFxyXG4gICAgICAgICAgICAoX3RpbWUgJiAweDFmKSA8PCAxXHJcbiAgICAgICAgKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNldCB0aW1lICh2YWwpIHtcclxuICAgICAgICAgICAgc2V0VGltZSh2YWwpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGdldCBjcmMgKCkgeyByZXR1cm4gX2NyYzsgfSxcclxuICAgICAgICBzZXQgY3JjICh2YWwpIHsgX2NyYyA9IHZhbDsgfSxcclxuXHJcbiAgICAgICAgZ2V0IGNvbXByZXNzZWRTaXplICgpIHsgcmV0dXJuIF9jb21wcmVzc2VkU2l6ZTsgfSxcclxuICAgICAgICBzZXQgY29tcHJlc3NlZFNpemUgKHZhbCkgeyBfY29tcHJlc3NlZFNpemUgPSB2YWw7IH0sXHJcblxyXG4gICAgICAgIGdldCBzaXplICgpIHsgcmV0dXJuIF9zaXplOyB9LFxyXG4gICAgICAgIHNldCBzaXplICh2YWwpIHsgX3NpemUgPSB2YWw7IH0sXHJcblxyXG4gICAgICAgIGdldCBmaWxlTmFtZUxlbmd0aCAoKSB7IHJldHVybiBfZm5hbWVMZW47IH0sXHJcbiAgICAgICAgc2V0IGZpbGVOYW1lTGVuZ3RoICh2YWwpIHsgX2ZuYW1lTGVuID0gdmFsOyB9LFxyXG5cclxuICAgICAgICBnZXQgZXh0cmFMZW5ndGggKCkgeyByZXR1cm4gX2V4dHJhTGVuIH0sXHJcbiAgICAgICAgc2V0IGV4dHJhTGVuZ3RoICh2YWwpIHsgX2V4dHJhTGVuID0gdmFsOyB9LFxyXG5cclxuICAgICAgICBnZXQgY29tbWVudExlbmd0aCAoKSB7IHJldHVybiBfY29tTGVuIH0sXHJcbiAgICAgICAgc2V0IGNvbW1lbnRMZW5ndGggKHZhbCkgeyBfY29tTGVuID0gdmFsIH0sXHJcblxyXG4gICAgICAgIGdldCBkaXNrTnVtU3RhcnQgKCkgeyByZXR1cm4gX2Rpc2tTdGFydCB9LFxyXG4gICAgICAgIHNldCBkaXNrTnVtU3RhcnQgKHZhbCkgeyBfZGlza1N0YXJ0ID0gdmFsIH0sXHJcblxyXG4gICAgICAgIGdldCBpbkF0dHIgKCkgeyByZXR1cm4gX2luYXR0ciB9LFxyXG4gICAgICAgIHNldCBpbkF0dHIgKHZhbCkgeyBfaW5hdHRyID0gdmFsIH0sXHJcblxyXG4gICAgICAgIGdldCBhdHRyICgpIHsgcmV0dXJuIF9hdHRyIH0sXHJcbiAgICAgICAgc2V0IGF0dHIgKHZhbCkgeyBfYXR0ciA9IHZhbCB9LFxyXG5cclxuICAgICAgICBnZXQgb2Zmc2V0ICgpIHsgcmV0dXJuIF9vZmZzZXQgfSxcclxuICAgICAgICBzZXQgb2Zmc2V0ICh2YWwpIHsgX29mZnNldCA9IHZhbCB9LFxyXG5cclxuICAgICAgICBnZXQgZW5jcmlwdGVkICgpIHsgcmV0dXJuIChfZmxhZ3MgJiAxKSA9PT0gMSB9LFxyXG5cclxuICAgICAgICBnZXQgZW50cnlIZWFkZXJTaXplICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIENvbnN0YW50cy5DRU5IRFIgKyBfZm5hbWVMZW4gKyBfZXh0cmFMZW4gKyBfY29tTGVuO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGdldCByZWFsRGF0YU9mZnNldCAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfb2Zmc2V0ICsgQ29uc3RhbnRzLkxPQ0hEUiArIF9kYXRhSGVhZGVyLmZuYW1lTGVuICsgX2RhdGFIZWFkZXIuZXh0cmFMZW47XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZ2V0IGRhdGFIZWFkZXIgKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX2RhdGFIZWFkZXI7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgbG9hZERhdGFIZWFkZXJGcm9tQmluYXJ5IDogZnVuY3Rpb24oLypCdWZmZXIqL2lucHV0KSB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gaW5wdXQuc2xpY2UoX29mZnNldCwgX29mZnNldCArIENvbnN0YW50cy5MT0NIRFIpO1xyXG4gICAgICAgICAgICAvLyAzMCBieXRlcyBhbmQgc2hvdWxkIHN0YXJ0IHdpdGggXCJQS1xcMDAzXFwwMDRcIlxyXG4gICAgICAgICAgICBpZiAoZGF0YS5yZWFkVUludDMyTEUoMCkgIT09IENvbnN0YW50cy5MT0NTSUcpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IFV0aWxzLkVycm9ycy5JTlZBTElEX0xPQztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBfZGF0YUhlYWRlciA9IHtcclxuICAgICAgICAgICAgICAgIC8vIHZlcnNpb24gbmVlZGVkIHRvIGV4dHJhY3RcclxuICAgICAgICAgICAgICAgIHZlcnNpb24gOiBkYXRhLnJlYWRVSW50MTZMRShDb25zdGFudHMuTE9DVkVSKSxcclxuICAgICAgICAgICAgICAgIC8vIGdlbmVyYWwgcHVycG9zZSBiaXQgZmxhZ1xyXG4gICAgICAgICAgICAgICAgZmxhZ3MgOiBkYXRhLnJlYWRVSW50MTZMRShDb25zdGFudHMuTE9DRkxHKSxcclxuICAgICAgICAgICAgICAgIC8vIGNvbXByZXNzaW9uIG1ldGhvZFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kIDogZGF0YS5yZWFkVUludDE2TEUoQ29uc3RhbnRzLkxPQ0hPVyksXHJcbiAgICAgICAgICAgICAgICAvLyBtb2RpZmljYXRpb24gdGltZSAoMiBieXRlcyB0aW1lLCAyIGJ5dGVzIGRhdGUpXHJcbiAgICAgICAgICAgICAgICB0aW1lIDogZGF0YS5yZWFkVUludDMyTEUoQ29uc3RhbnRzLkxPQ1RJTSksXHJcbiAgICAgICAgICAgICAgICAvLyB1bmNvbXByZXNzZWQgZmlsZSBjcmMtMzIgdmFsdWVcclxuICAgICAgICAgICAgICAgIGNyYyA6IGRhdGEucmVhZFVJbnQzMkxFKENvbnN0YW50cy5MT0NDUkMpLFxyXG4gICAgICAgICAgICAgICAgLy8gY29tcHJlc3NlZCBzaXplXHJcbiAgICAgICAgICAgICAgICBjb21wcmVzc2VkU2l6ZSA6IGRhdGEucmVhZFVJbnQzMkxFKENvbnN0YW50cy5MT0NTSVopLFxyXG4gICAgICAgICAgICAgICAgLy8gdW5jb21wcmVzc2VkIHNpemVcclxuICAgICAgICAgICAgICAgIHNpemUgOiBkYXRhLnJlYWRVSW50MzJMRShDb25zdGFudHMuTE9DTEVOKSxcclxuICAgICAgICAgICAgICAgIC8vIGZpbGVuYW1lIGxlbmd0aFxyXG4gICAgICAgICAgICAgICAgZm5hbWVMZW4gOiBkYXRhLnJlYWRVSW50MTZMRShDb25zdGFudHMuTE9DTkFNKSxcclxuICAgICAgICAgICAgICAgIC8vIGV4dHJhIGZpZWxkIGxlbmd0aFxyXG4gICAgICAgICAgICAgICAgZXh0cmFMZW4gOiBkYXRhLnJlYWRVSW50MTZMRShDb25zdGFudHMuTE9DRVhUKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgbG9hZEZyb21CaW5hcnkgOiBmdW5jdGlvbigvKkJ1ZmZlciovZGF0YSkge1xyXG4gICAgICAgICAgICAvLyBkYXRhIHNob3VsZCBiZSA0NiBieXRlcyBhbmQgc3RhcnQgd2l0aCBcIlBLIDAxIDAyXCJcclxuICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoICE9PSBDb25zdGFudHMuQ0VOSERSIHx8IGRhdGEucmVhZFVJbnQzMkxFKDApICE9PSBDb25zdGFudHMuQ0VOU0lHKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBVdGlscy5FcnJvcnMuSU5WQUxJRF9DRU47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gdmVyc2lvbiBtYWRlIGJ5XHJcbiAgICAgICAgICAgIF92ZXJNYWRlID0gZGF0YS5yZWFkVUludDE2TEUoQ29uc3RhbnRzLkNFTlZFTSk7XHJcbiAgICAgICAgICAgIC8vIHZlcnNpb24gbmVlZGVkIHRvIGV4dHJhY3RcclxuICAgICAgICAgICAgX3ZlcnNpb24gPSBkYXRhLnJlYWRVSW50MTZMRShDb25zdGFudHMuQ0VOVkVSKTtcclxuICAgICAgICAgICAgLy8gZW5jcnlwdCwgZGVjcnlwdCBmbGFnc1xyXG4gICAgICAgICAgICBfZmxhZ3MgPSBkYXRhLnJlYWRVSW50MTZMRShDb25zdGFudHMuQ0VORkxHKTtcclxuICAgICAgICAgICAgLy8gY29tcHJlc3Npb24gbWV0aG9kXHJcbiAgICAgICAgICAgIF9tZXRob2QgPSBkYXRhLnJlYWRVSW50MTZMRShDb25zdGFudHMuQ0VOSE9XKTtcclxuICAgICAgICAgICAgLy8gbW9kaWZpY2F0aW9uIHRpbWUgKDIgYnl0ZXMgdGltZSwgMiBieXRlcyBkYXRlKVxyXG4gICAgICAgICAgICBfdGltZSA9IGRhdGEucmVhZFVJbnQzMkxFKENvbnN0YW50cy5DRU5USU0pO1xyXG4gICAgICAgICAgICAvLyB1bmNvbXByZXNzZWQgZmlsZSBjcmMtMzIgdmFsdWVcclxuICAgICAgICAgICAgX2NyYyA9IGRhdGEucmVhZFVJbnQzMkxFKENvbnN0YW50cy5DRU5DUkMpO1xyXG4gICAgICAgICAgICAvLyBjb21wcmVzc2VkIHNpemVcclxuICAgICAgICAgICAgX2NvbXByZXNzZWRTaXplID0gZGF0YS5yZWFkVUludDMyTEUoQ29uc3RhbnRzLkNFTlNJWik7XHJcbiAgICAgICAgICAgIC8vIHVuY29tcHJlc3NlZCBzaXplXHJcbiAgICAgICAgICAgIF9zaXplID0gZGF0YS5yZWFkVUludDMyTEUoQ29uc3RhbnRzLkNFTkxFTik7XHJcbiAgICAgICAgICAgIC8vIGZpbGVuYW1lIGxlbmd0aFxyXG4gICAgICAgICAgICBfZm5hbWVMZW4gPSBkYXRhLnJlYWRVSW50MTZMRShDb25zdGFudHMuQ0VOTkFNKTtcclxuICAgICAgICAgICAgLy8gZXh0cmEgZmllbGQgbGVuZ3RoXHJcbiAgICAgICAgICAgIF9leHRyYUxlbiA9IGRhdGEucmVhZFVJbnQxNkxFKENvbnN0YW50cy5DRU5FWFQpO1xyXG4gICAgICAgICAgICAvLyBmaWxlIGNvbW1lbnQgbGVuZ3RoXHJcbiAgICAgICAgICAgIF9jb21MZW4gPSBkYXRhLnJlYWRVSW50MTZMRShDb25zdGFudHMuQ0VOQ09NKTtcclxuICAgICAgICAgICAgLy8gdm9sdW1lIG51bWJlciBzdGFydFxyXG4gICAgICAgICAgICBfZGlza1N0YXJ0ID0gZGF0YS5yZWFkVUludDE2TEUoQ29uc3RhbnRzLkNFTkRTSyk7XHJcbiAgICAgICAgICAgIC8vIGludGVybmFsIGZpbGUgYXR0cmlidXRlc1xyXG4gICAgICAgICAgICBfaW5hdHRyID0gZGF0YS5yZWFkVUludDE2TEUoQ29uc3RhbnRzLkNFTkFUVCk7XHJcbiAgICAgICAgICAgIC8vIGV4dGVybmFsIGZpbGUgYXR0cmlidXRlc1xyXG4gICAgICAgICAgICBfYXR0ciA9IGRhdGEucmVhZFVJbnQzMkxFKENvbnN0YW50cy5DRU5BVFgpO1xyXG4gICAgICAgICAgICAvLyBMT0MgaGVhZGVyIG9mZnNldFxyXG4gICAgICAgICAgICBfb2Zmc2V0ID0gZGF0YS5yZWFkVUludDMyTEUoQ29uc3RhbnRzLkNFTk9GRik7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZGF0YUhlYWRlclRvQmluYXJ5IDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIC8vIExPQyBoZWFkZXIgc2l6ZSAoMzAgYnl0ZXMpXHJcbiAgICAgICAgICAgIHZhciBkYXRhID0gQnVmZmVyLmFsbG9jKENvbnN0YW50cy5MT0NIRFIpO1xyXG4gICAgICAgICAgICAvLyBcIlBLXFwwMDNcXDAwNFwiXHJcbiAgICAgICAgICAgIGRhdGEud3JpdGVVSW50MzJMRShDb25zdGFudHMuTE9DU0lHLCAwKTtcclxuICAgICAgICAgICAgLy8gdmVyc2lvbiBuZWVkZWQgdG8gZXh0cmFjdFxyXG4gICAgICAgICAgICBkYXRhLndyaXRlVUludDE2TEUoX3ZlcnNpb24sIENvbnN0YW50cy5MT0NWRVIpO1xyXG4gICAgICAgICAgICAvLyBnZW5lcmFsIHB1cnBvc2UgYml0IGZsYWdcclxuICAgICAgICAgICAgZGF0YS53cml0ZVVJbnQxNkxFKF9mbGFncywgQ29uc3RhbnRzLkxPQ0ZMRyk7XHJcbiAgICAgICAgICAgIC8vIGNvbXByZXNzaW9uIG1ldGhvZFxyXG4gICAgICAgICAgICBkYXRhLndyaXRlVUludDE2TEUoX21ldGhvZCwgQ29uc3RhbnRzLkxPQ0hPVyk7XHJcbiAgICAgICAgICAgIC8vIG1vZGlmaWNhdGlvbiB0aW1lICgyIGJ5dGVzIHRpbWUsIDIgYnl0ZXMgZGF0ZSlcclxuICAgICAgICAgICAgZGF0YS53cml0ZVVJbnQzMkxFKF90aW1lLCBDb25zdGFudHMuTE9DVElNKTtcclxuICAgICAgICAgICAgLy8gdW5jb21wcmVzc2VkIGZpbGUgY3JjLTMyIHZhbHVlXHJcbiAgICAgICAgICAgIGRhdGEud3JpdGVVSW50MzJMRShfY3JjLCBDb25zdGFudHMuTE9DQ1JDKTtcclxuICAgICAgICAgICAgLy8gY29tcHJlc3NlZCBzaXplXHJcbiAgICAgICAgICAgIGRhdGEud3JpdGVVSW50MzJMRShfY29tcHJlc3NlZFNpemUsIENvbnN0YW50cy5MT0NTSVopO1xyXG4gICAgICAgICAgICAvLyB1bmNvbXByZXNzZWQgc2l6ZVxyXG4gICAgICAgICAgICBkYXRhLndyaXRlVUludDMyTEUoX3NpemUsIENvbnN0YW50cy5MT0NMRU4pO1xyXG4gICAgICAgICAgICAvLyBmaWxlbmFtZSBsZW5ndGhcclxuICAgICAgICAgICAgZGF0YS53cml0ZVVJbnQxNkxFKF9mbmFtZUxlbiwgQ29uc3RhbnRzLkxPQ05BTSk7XHJcbiAgICAgICAgICAgIC8vIGV4dHJhIGZpZWxkIGxlbmd0aFxyXG4gICAgICAgICAgICBkYXRhLndyaXRlVUludDE2TEUoX2V4dHJhTGVuLCBDb25zdGFudHMuTE9DRVhUKTtcclxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZW50cnlIZWFkZXJUb0JpbmFyeSA6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAvLyBDRU4gaGVhZGVyIHNpemUgKDQ2IGJ5dGVzKVxyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IEJ1ZmZlci5hbGxvYyhDb25zdGFudHMuQ0VOSERSICsgX2ZuYW1lTGVuICsgX2V4dHJhTGVuICsgX2NvbUxlbik7XHJcbiAgICAgICAgICAgIC8vIFwiUEtcXDAwMVxcMDAyXCJcclxuICAgICAgICAgICAgZGF0YS53cml0ZVVJbnQzMkxFKENvbnN0YW50cy5DRU5TSUcsIDApO1xyXG4gICAgICAgICAgICAvLyB2ZXJzaW9uIG1hZGUgYnlcclxuICAgICAgICAgICAgZGF0YS53cml0ZVVJbnQxNkxFKF92ZXJNYWRlLCBDb25zdGFudHMuQ0VOVkVNKTtcclxuICAgICAgICAgICAgLy8gdmVyc2lvbiBuZWVkZWQgdG8gZXh0cmFjdFxyXG4gICAgICAgICAgICBkYXRhLndyaXRlVUludDE2TEUoX3ZlcnNpb24sIENvbnN0YW50cy5DRU5WRVIpO1xyXG4gICAgICAgICAgICAvLyBlbmNyeXB0LCBkZWNyeXB0IGZsYWdzXHJcbiAgICAgICAgICAgIGRhdGEud3JpdGVVSW50MTZMRShfZmxhZ3MsIENvbnN0YW50cy5DRU5GTEcpO1xyXG4gICAgICAgICAgICAvLyBjb21wcmVzc2lvbiBtZXRob2RcclxuICAgICAgICAgICAgZGF0YS53cml0ZVVJbnQxNkxFKF9tZXRob2QsIENvbnN0YW50cy5DRU5IT1cpO1xyXG4gICAgICAgICAgICAvLyBtb2RpZmljYXRpb24gdGltZSAoMiBieXRlcyB0aW1lLCAyIGJ5dGVzIGRhdGUpXHJcbiAgICAgICAgICAgIGRhdGEud3JpdGVVSW50MzJMRShfdGltZSwgQ29uc3RhbnRzLkNFTlRJTSk7XHJcbiAgICAgICAgICAgIC8vIHVuY29tcHJlc3NlZCBmaWxlIGNyYy0zMiB2YWx1ZVxyXG4gICAgICAgICAgICBkYXRhLndyaXRlSW50MzJMRShfY3JjICYgMHhGRkZGLCBDb25zdGFudHMuQ0VOQ1JDLCB0cnVlKTtcclxuICAgICAgICAgICAgLy8gY29tcHJlc3NlZCBzaXplXHJcbiAgICAgICAgICAgIGRhdGEud3JpdGVVSW50MzJMRShfY29tcHJlc3NlZFNpemUsIENvbnN0YW50cy5DRU5TSVopO1xyXG4gICAgICAgICAgICAvLyB1bmNvbXByZXNzZWQgc2l6ZVxyXG4gICAgICAgICAgICBkYXRhLndyaXRlVUludDMyTEUoX3NpemUsIENvbnN0YW50cy5DRU5MRU4pO1xyXG4gICAgICAgICAgICAvLyBmaWxlbmFtZSBsZW5ndGhcclxuICAgICAgICAgICAgZGF0YS53cml0ZVVJbnQxNkxFKF9mbmFtZUxlbiwgQ29uc3RhbnRzLkNFTk5BTSk7XHJcbiAgICAgICAgICAgIC8vIGV4dHJhIGZpZWxkIGxlbmd0aFxyXG4gICAgICAgICAgICBkYXRhLndyaXRlVUludDE2TEUoX2V4dHJhTGVuLCBDb25zdGFudHMuQ0VORVhUKTtcclxuICAgICAgICAgICAgLy8gZmlsZSBjb21tZW50IGxlbmd0aFxyXG4gICAgICAgICAgICBkYXRhLndyaXRlVUludDE2TEUoX2NvbUxlbiwgQ29uc3RhbnRzLkNFTkNPTSk7XHJcbiAgICAgICAgICAgIC8vIHZvbHVtZSBudW1iZXIgc3RhcnRcclxuICAgICAgICAgICAgZGF0YS53cml0ZVVJbnQxNkxFKF9kaXNrU3RhcnQsIENvbnN0YW50cy5DRU5EU0spO1xyXG4gICAgICAgICAgICAvLyBpbnRlcm5hbCBmaWxlIGF0dHJpYnV0ZXNcclxuICAgICAgICAgICAgZGF0YS53cml0ZVVJbnQxNkxFKF9pbmF0dHIsIENvbnN0YW50cy5DRU5BVFQpO1xyXG4gICAgICAgICAgICAvLyBleHRlcm5hbCBmaWxlIGF0dHJpYnV0ZXNcclxuICAgICAgICAgICAgZGF0YS53cml0ZVVJbnQzMkxFKF9hdHRyLCBDb25zdGFudHMuQ0VOQVRYKTtcclxuICAgICAgICAgICAgLy8gTE9DIGhlYWRlciBvZmZzZXRcclxuICAgICAgICAgICAgZGF0YS53cml0ZVVJbnQzMkxFKF9vZmZzZXQsIENvbnN0YW50cy5DRU5PRkYpO1xyXG4gICAgICAgICAgICAvLyBmaWxsIGFsbCB3aXRoXHJcbiAgICAgICAgICAgIGRhdGEuZmlsbCgweDAwLCBDb25zdGFudHMuQ0VOSERSKTtcclxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdG9TdHJpbmcgOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuICd7XFxuJyArXHJcbiAgICAgICAgICAgICAgICAnXFx0XCJtYWRlXCIgOiAnICsgX3Zlck1hZGUgKyBcIixcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAnXFx0XCJ2ZXJzaW9uXCIgOiAnICsgX3ZlcnNpb24gKyBcIixcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAnXFx0XCJmbGFnc1wiIDogJyArIF9mbGFncyArIFwiLFxcblwiICtcclxuICAgICAgICAgICAgICAgICdcXHRcIm1ldGhvZFwiIDogJyArIFV0aWxzLm1ldGhvZFRvU3RyaW5nKF9tZXRob2QpICsgXCIsXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgJ1xcdFwidGltZVwiIDogJyArIHRoaXMudGltZSArIFwiLFxcblwiICtcclxuICAgICAgICAgICAgICAgICdcXHRcImNyY1wiIDogMHgnICsgX2NyYy50b1N0cmluZygxNikudG9VcHBlckNhc2UoKSArIFwiLFxcblwiICtcclxuICAgICAgICAgICAgICAgICdcXHRcImNvbXByZXNzZWRTaXplXCIgOiAnICsgX2NvbXByZXNzZWRTaXplICsgXCIgYnl0ZXMsXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgJ1xcdFwic2l6ZVwiIDogJyArIF9zaXplICsgXCIgYnl0ZXMsXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgJ1xcdFwiZmlsZU5hbWVMZW5ndGhcIiA6ICcgKyBfZm5hbWVMZW4gKyBcIixcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAnXFx0XCJleHRyYUxlbmd0aFwiIDogJyArIF9leHRyYUxlbiArIFwiIGJ5dGVzLFxcblwiICtcclxuICAgICAgICAgICAgICAgICdcXHRcImNvbW1lbnRMZW5ndGhcIiA6ICcgKyBfY29tTGVuICsgXCIgYnl0ZXMsXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgJ1xcdFwiZGlza051bVN0YXJ0XCIgOiAnICsgX2Rpc2tTdGFydCArIFwiLFxcblwiICtcclxuICAgICAgICAgICAgICAgICdcXHRcImluQXR0clwiIDogJyArIF9pbmF0dHIgKyBcIixcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAnXFx0XCJhdHRyXCIgOiAnICsgX2F0dHIgKyBcIixcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAnXFx0XCJvZmZzZXRcIiA6ICcgKyBfb2Zmc2V0ICsgXCIsXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgJ1xcdFwiZW50cnlIZWFkZXJTaXplXCIgOiAnICsgKENvbnN0YW50cy5DRU5IRFIgKyBfZm5hbWVMZW4gKyBfZXh0cmFMZW4gKyBfY29tTGVuKSArIFwiIGJ5dGVzXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgJ30nO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuIiwiZXhwb3J0cy5FbnRyeUhlYWRlciA9IHJlcXVpcmUoXCIuL2VudHJ5SGVhZGVyXCIpO1xyXG5leHBvcnRzLk1haW5IZWFkZXIgPSByZXF1aXJlKFwiLi9tYWluSGVhZGVyXCIpO1xyXG4iLCJ2YXIgVXRpbHMgPSByZXF1aXJlKFwiLi4vdXRpbFwiKSxcclxuICAgIENvbnN0YW50cyA9IFV0aWxzLkNvbnN0YW50cztcclxuXHJcbi8qIFRoZSBlbnRyaWVzIGluIHRoZSBlbmQgb2YgY2VudHJhbCBkaXJlY3RvcnkgKi9cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgX3ZvbHVtZUVudHJpZXMgPSAwLFxyXG4gICAgICAgIF90b3RhbEVudHJpZXMgPSAwLFxyXG4gICAgICAgIF9zaXplID0gMCxcclxuICAgICAgICBfb2Zmc2V0ID0gMCxcclxuICAgICAgICBfY29tbWVudExlbmd0aCA9IDA7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBnZXQgZGlza0VudHJpZXMgKCkgeyByZXR1cm4gX3ZvbHVtZUVudHJpZXMgfSxcclxuICAgICAgICBzZXQgZGlza0VudHJpZXMgKC8qTnVtYmVyKi92YWwpIHsgX3ZvbHVtZUVudHJpZXMgPSBfdG90YWxFbnRyaWVzID0gdmFsOyB9LFxyXG5cclxuICAgICAgICBnZXQgdG90YWxFbnRyaWVzICgpIHsgcmV0dXJuIF90b3RhbEVudHJpZXMgfSxcclxuICAgICAgICBzZXQgdG90YWxFbnRyaWVzICgvKk51bWJlciovdmFsKSB7IF90b3RhbEVudHJpZXMgPSBfdm9sdW1lRW50cmllcyA9IHZhbDsgfSxcclxuXHJcbiAgICAgICAgZ2V0IHNpemUgKCkgeyByZXR1cm4gX3NpemUgfSxcclxuICAgICAgICBzZXQgc2l6ZSAoLypOdW1iZXIqL3ZhbCkgeyBfc2l6ZSA9IHZhbDsgfSxcclxuXHJcbiAgICAgICAgZ2V0IG9mZnNldCAoKSB7IHJldHVybiBfb2Zmc2V0IH0sXHJcbiAgICAgICAgc2V0IG9mZnNldCAoLypOdW1iZXIqL3ZhbCkgeyBfb2Zmc2V0ID0gdmFsOyB9LFxyXG5cclxuICAgICAgICBnZXQgY29tbWVudExlbmd0aCAoKSB7IHJldHVybiBfY29tbWVudExlbmd0aCB9LFxyXG4gICAgICAgIHNldCBjb21tZW50TGVuZ3RoICgvKk51bWJlciovdmFsKSB7IF9jb21tZW50TGVuZ3RoID0gdmFsOyB9LFxyXG5cclxuICAgICAgICBnZXQgbWFpbkhlYWRlclNpemUgKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gQ29uc3RhbnRzLkVOREhEUiArIF9jb21tZW50TGVuZ3RoO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGxvYWRGcm9tQmluYXJ5IDogZnVuY3Rpb24oLypCdWZmZXIqL2RhdGEpIHtcclxuICAgICAgICAgICAgLy8gZGF0YSBzaG91bGQgYmUgMjIgYnl0ZXMgYW5kIHN0YXJ0IHdpdGggXCJQSyAwNSAwNlwiXHJcbiAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCAhPT0gQ29uc3RhbnRzLkVOREhEUiB8fCBkYXRhLnJlYWRVSW50MzJMRSgwKSAhPT0gQ29uc3RhbnRzLkVORFNJRylcclxuICAgICAgICAgICAgICAgIHRocm93IFV0aWxzLkVycm9ycy5JTlZBTElEX0VORDtcclxuXHJcbiAgICAgICAgICAgIC8vIG51bWJlciBvZiBlbnRyaWVzIG9uIHRoaXMgdm9sdW1lXHJcbiAgICAgICAgICAgIF92b2x1bWVFbnRyaWVzID0gZGF0YS5yZWFkVUludDE2TEUoQ29uc3RhbnRzLkVORFNVQik7XHJcbiAgICAgICAgICAgIC8vIHRvdGFsIG51bWJlciBvZiBlbnRyaWVzXHJcbiAgICAgICAgICAgIF90b3RhbEVudHJpZXMgPSBkYXRhLnJlYWRVSW50MTZMRShDb25zdGFudHMuRU5EVE9UKTtcclxuICAgICAgICAgICAgLy8gY2VudHJhbCBkaXJlY3Rvcnkgc2l6ZSBpbiBieXRlc1xyXG4gICAgICAgICAgICBfc2l6ZSA9IGRhdGEucmVhZFVJbnQzMkxFKENvbnN0YW50cy5FTkRTSVopO1xyXG4gICAgICAgICAgICAvLyBvZmZzZXQgb2YgZmlyc3QgQ0VOIGhlYWRlclxyXG4gICAgICAgICAgICBfb2Zmc2V0ID0gZGF0YS5yZWFkVUludDMyTEUoQ29uc3RhbnRzLkVORE9GRik7XHJcbiAgICAgICAgICAgIC8vIHppcCBmaWxlIGNvbW1lbnQgbGVuZ3RoXHJcbiAgICAgICAgICAgIF9jb21tZW50TGVuZ3RoID0gZGF0YS5yZWFkVUludDE2TEUoQ29uc3RhbnRzLkVORENPTSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdG9CaW5hcnkgOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICB2YXIgYiA9IEJ1ZmZlci5hbGxvYyhDb25zdGFudHMuRU5ESERSICsgX2NvbW1lbnRMZW5ndGgpO1xyXG4gICAgICAgICAgICAvLyBcIlBLIDA1IDA2XCIgc2lnbmF0dXJlXHJcbiAgICAgICAgICAgIGIud3JpdGVVSW50MzJMRShDb25zdGFudHMuRU5EU0lHLCAwKTtcclxuICAgICAgICAgICAgYi53cml0ZVVJbnQzMkxFKDAsIDQpO1xyXG4gICAgICAgICAgICAvLyBudW1iZXIgb2YgZW50cmllcyBvbiB0aGlzIHZvbHVtZVxyXG4gICAgICAgICAgICBiLndyaXRlVUludDE2TEUoX3ZvbHVtZUVudHJpZXMsIENvbnN0YW50cy5FTkRTVUIpO1xyXG4gICAgICAgICAgICAvLyB0b3RhbCBudW1iZXIgb2YgZW50cmllc1xyXG4gICAgICAgICAgICBiLndyaXRlVUludDE2TEUoX3RvdGFsRW50cmllcywgQ29uc3RhbnRzLkVORFRPVCk7XHJcbiAgICAgICAgICAgIC8vIGNlbnRyYWwgZGlyZWN0b3J5IHNpemUgaW4gYnl0ZXNcclxuICAgICAgICAgICAgYi53cml0ZVVJbnQzMkxFKF9zaXplLCBDb25zdGFudHMuRU5EU0laKTtcclxuICAgICAgICAgICAgLy8gb2Zmc2V0IG9mIGZpcnN0IENFTiBoZWFkZXJcclxuICAgICAgICAgICAgYi53cml0ZVVJbnQzMkxFKF9vZmZzZXQsIENvbnN0YW50cy5FTkRPRkYpO1xyXG4gICAgICAgICAgICAvLyB6aXAgZmlsZSBjb21tZW50IGxlbmd0aFxyXG4gICAgICAgICAgICBiLndyaXRlVUludDE2TEUoX2NvbW1lbnRMZW5ndGgsIENvbnN0YW50cy5FTkRDT00pO1xyXG4gICAgICAgICAgICAvLyBmaWxsIGNvbW1lbnQgbWVtb3J5IHdpdGggc3BhY2VzIHNvIG5vIGdhcmJhZ2UgaXMgbGVmdCB0aGVyZVxyXG4gICAgICAgICAgICBiLmZpbGwoXCIgXCIsIENvbnN0YW50cy5FTkRIRFIpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGI7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdG9TdHJpbmcgOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuICd7XFxuJyArXHJcbiAgICAgICAgICAgICAgICAnXFx0XCJkaXNrRW50cmllc1wiIDogJyArIF92b2x1bWVFbnRyaWVzICsgXCIsXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgJ1xcdFwidG90YWxFbnRyaWVzXCIgOiAnICsgX3RvdGFsRW50cmllcyArIFwiLFxcblwiICtcclxuICAgICAgICAgICAgICAgICdcXHRcInNpemVcIiA6ICcgKyBfc2l6ZSArIFwiIGJ5dGVzLFxcblwiICtcclxuICAgICAgICAgICAgICAgICdcXHRcIm9mZnNldFwiIDogMHgnICsgX29mZnNldC50b1N0cmluZygxNikudG9VcHBlckNhc2UoKSArIFwiLFxcblwiICtcclxuICAgICAgICAgICAgICAgICdcXHRcImNvbW1lbnRMZW5ndGhcIiA6IDB4JyArIF9jb21tZW50TGVuZ3RoICsgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICd9JztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoLypCdWZmZXIqL2luYnVmKSB7XHJcblxyXG4gIHZhciB6bGliID0gcmVxdWlyZShcInpsaWJcIik7XHJcbiAgXHJcbiAgdmFyIG9wdHMgPSB7Y2h1bmtTaXplOiAocGFyc2VJbnQoaW5idWYubGVuZ3RoIC8gMTAyNCkgKyAxKSAqIDEwMjR9O1xyXG4gIFxyXG4gIHJldHVybiB7XHJcbiAgICBkZWZsYXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiB6bGliLmRlZmxhdGVSYXdTeW5jKGluYnVmLCBvcHRzKTtcclxuICAgIH0sXHJcblxyXG4gICAgZGVmbGF0ZUFzeW5jOiBmdW5jdGlvbiAoLypGdW5jdGlvbiovY2FsbGJhY2spIHtcclxuICAgICAgdmFyIHRtcCA9IHpsaWIuY3JlYXRlRGVmbGF0ZVJhdyhvcHRzKSwgcGFydHMgPSBbXSwgdG90YWwgPSAwO1xyXG4gICAgICB0bXAub24oJ2RhdGEnLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHBhcnRzLnB1c2goZGF0YSk7XHJcbiAgICAgICAgdG90YWwgKz0gZGF0YS5sZW5ndGg7XHJcbiAgICAgIH0pO1xyXG4gICAgICB0bXAub24oJ2VuZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgYnVmID0gQnVmZmVyLmFsbG9jKHRvdGFsKSwgd3JpdHRlbiA9IDA7XHJcbiAgICAgICAgYnVmLmZpbGwoMCk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgdmFyIHBhcnQgPSBwYXJ0c1tpXTtcclxuICAgICAgICAgIHBhcnQuY29weShidWYsIHdyaXR0ZW4pO1xyXG4gICAgICAgICAgd3JpdHRlbiArPSBwYXJ0Lmxlbmd0aDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soYnVmKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHRtcC5lbmQoaW5idWYpO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuIiwiZXhwb3J0cy5EZWZsYXRlciA9IHJlcXVpcmUoXCIuL2RlZmxhdGVyXCIpO1xyXG5leHBvcnRzLkluZmxhdGVyID0gcmVxdWlyZShcIi4vaW5mbGF0ZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoLypCdWZmZXIqL2luYnVmKSB7XHJcblxyXG4gIHZhciB6bGliID0gcmVxdWlyZShcInpsaWJcIik7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBpbmZsYXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHJldHVybiB6bGliLmluZmxhdGVSYXdTeW5jKGluYnVmKTtcclxuICAgIH0sXHJcblxyXG4gICAgaW5mbGF0ZUFzeW5jOiBmdW5jdGlvbiAoLypGdW5jdGlvbiovY2FsbGJhY2spIHtcclxuICAgICAgdmFyIHRtcCA9IHpsaWIuY3JlYXRlSW5mbGF0ZVJhdygpLCBwYXJ0cyA9IFtdLCB0b3RhbCA9IDA7XHJcbiAgICAgIHRtcC5vbignZGF0YScsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgcGFydHMucHVzaChkYXRhKTtcclxuICAgICAgICB0b3RhbCArPSBkYXRhLmxlbmd0aDtcclxuICAgICAgfSk7XHJcbiAgICAgIHRtcC5vbignZW5kJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBidWYgPSBCdWZmZXIuYWxsb2ModG90YWwpLCB3cml0dGVuID0gMDtcclxuICAgICAgICBidWYuZmlsbCgwKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICB2YXIgcGFydCA9IHBhcnRzW2ldO1xyXG4gICAgICAgICAgcGFydC5jb3B5KGJ1Ziwgd3JpdHRlbik7XHJcbiAgICAgICAgICB3cml0dGVuICs9IHBhcnQubGVuZ3RoO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjayhidWYpO1xyXG4gICAgICB9KTtcclxuICAgICAgdG1wLmVuZChpbmJ1Zik7XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIC8qIFRoZSBsb2NhbCBmaWxlIGhlYWRlciAqL1xyXG4gICAgTE9DSERSICAgICAgICAgICA6IDMwLCAvLyBMT0MgaGVhZGVyIHNpemVcclxuICAgIExPQ1NJRyAgICAgICAgICAgOiAweDA0MDM0YjUwLCAvLyBcIlBLXFwwMDNcXDAwNFwiXHJcbiAgICBMT0NWRVIgICAgICAgICAgIDogNCxcdC8vIHZlcnNpb24gbmVlZGVkIHRvIGV4dHJhY3RcclxuICAgIExPQ0ZMRyAgICAgICAgICAgOiA2LCAvLyBnZW5lcmFsIHB1cnBvc2UgYml0IGZsYWdcclxuICAgIExPQ0hPVyAgICAgICAgICAgOiA4LCAvLyBjb21wcmVzc2lvbiBtZXRob2RcclxuICAgIExPQ1RJTSAgICAgICAgICAgOiAxMCwgLy8gbW9kaWZpY2F0aW9uIHRpbWUgKDIgYnl0ZXMgdGltZSwgMiBieXRlcyBkYXRlKVxyXG4gICAgTE9DQ1JDICAgICAgICAgICA6IDE0LCAvLyB1bmNvbXByZXNzZWQgZmlsZSBjcmMtMzIgdmFsdWVcclxuICAgIExPQ1NJWiAgICAgICAgICAgOiAxOCwgLy8gY29tcHJlc3NlZCBzaXplXHJcbiAgICBMT0NMRU4gICAgICAgICAgIDogMjIsIC8vIHVuY29tcHJlc3NlZCBzaXplXHJcbiAgICBMT0NOQU0gICAgICAgICAgIDogMjYsIC8vIGZpbGVuYW1lIGxlbmd0aFxyXG4gICAgTE9DRVhUICAgICAgICAgICA6IDI4LCAvLyBleHRyYSBmaWVsZCBsZW5ndGhcclxuXHJcbiAgICAvKiBUaGUgRGF0YSBkZXNjcmlwdG9yICovXHJcbiAgICBFWFRTSUcgICAgICAgICAgIDogMHgwODA3NGI1MCwgLy8gXCJQS1xcMDA3XFwwMDhcIlxyXG4gICAgRVhUSERSICAgICAgICAgICA6IDE2LCAvLyBFWFQgaGVhZGVyIHNpemVcclxuICAgIEVYVENSQyAgICAgICAgICAgOiA0LCAvLyB1bmNvbXByZXNzZWQgZmlsZSBjcmMtMzIgdmFsdWVcclxuICAgIEVYVFNJWiAgICAgICAgICAgOiA4LCAvLyBjb21wcmVzc2VkIHNpemVcclxuICAgIEVYVExFTiAgICAgICAgICAgOiAxMiwgLy8gdW5jb21wcmVzc2VkIHNpemVcclxuXHJcbiAgICAvKiBUaGUgY2VudHJhbCBkaXJlY3RvcnkgZmlsZSBoZWFkZXIgKi9cclxuICAgIENFTkhEUiAgICAgICAgICAgOiA0NiwgLy8gQ0VOIGhlYWRlciBzaXplXHJcbiAgICBDRU5TSUcgICAgICAgICAgIDogMHgwMjAxNGI1MCwgLy8gXCJQS1xcMDAxXFwwMDJcIlxyXG4gICAgQ0VOVkVNICAgICAgICAgICA6IDQsIC8vIHZlcnNpb24gbWFkZSBieVxyXG4gICAgQ0VOVkVSICAgICAgICAgICA6IDYsIC8vIHZlcnNpb24gbmVlZGVkIHRvIGV4dHJhY3RcclxuICAgIENFTkZMRyAgICAgICAgICAgOiA4LCAvLyBlbmNyeXB0LCBkZWNyeXB0IGZsYWdzXHJcbiAgICBDRU5IT1cgICAgICAgICAgIDogMTAsIC8vIGNvbXByZXNzaW9uIG1ldGhvZFxyXG4gICAgQ0VOVElNICAgICAgICAgICA6IDEyLCAvLyBtb2RpZmljYXRpb24gdGltZSAoMiBieXRlcyB0aW1lLCAyIGJ5dGVzIGRhdGUpXHJcbiAgICBDRU5DUkMgICAgICAgICAgIDogMTYsIC8vIHVuY29tcHJlc3NlZCBmaWxlIGNyYy0zMiB2YWx1ZVxyXG4gICAgQ0VOU0laICAgICAgICAgICA6IDIwLCAvLyBjb21wcmVzc2VkIHNpemVcclxuICAgIENFTkxFTiAgICAgICAgICAgOiAyNCwgLy8gdW5jb21wcmVzc2VkIHNpemVcclxuICAgIENFTk5BTSAgICAgICAgICAgOiAyOCwgLy8gZmlsZW5hbWUgbGVuZ3RoXHJcbiAgICBDRU5FWFQgICAgICAgICAgIDogMzAsIC8vIGV4dHJhIGZpZWxkIGxlbmd0aFxyXG4gICAgQ0VOQ09NICAgICAgICAgICA6IDMyLCAvLyBmaWxlIGNvbW1lbnQgbGVuZ3RoXHJcbiAgICBDRU5EU0sgICAgICAgICAgIDogMzQsIC8vIHZvbHVtZSBudW1iZXIgc3RhcnRcclxuICAgIENFTkFUVCAgICAgICAgICAgOiAzNiwgLy8gaW50ZXJuYWwgZmlsZSBhdHRyaWJ1dGVzXHJcbiAgICBDRU5BVFggICAgICAgICAgIDogMzgsIC8vIGV4dGVybmFsIGZpbGUgYXR0cmlidXRlcyAoaG9zdCBzeXN0ZW0gZGVwZW5kZW50KVxyXG4gICAgQ0VOT0ZGICAgICAgICAgICA6IDQyLCAvLyBMT0MgaGVhZGVyIG9mZnNldFxyXG5cclxuICAgIC8qIFRoZSBlbnRyaWVzIGluIHRoZSBlbmQgb2YgY2VudHJhbCBkaXJlY3RvcnkgKi9cclxuICAgIEVOREhEUiAgICAgICAgICAgOiAyMiwgLy8gRU5EIGhlYWRlciBzaXplXHJcbiAgICBFTkRTSUcgICAgICAgICAgIDogMHgwNjA1NGI1MCwgLy8gXCJQS1xcMDA1XFwwMDZcIlxyXG4gICAgRU5EU1VCICAgICAgICAgICA6IDgsIC8vIG51bWJlciBvZiBlbnRyaWVzIG9uIHRoaXMgZGlza1xyXG4gICAgRU5EVE9UICAgICAgICAgICA6IDEwLCAvLyB0b3RhbCBudW1iZXIgb2YgZW50cmllc1xyXG4gICAgRU5EU0laICAgICAgICAgICA6IDEyLCAvLyBjZW50cmFsIGRpcmVjdG9yeSBzaXplIGluIGJ5dGVzXHJcbiAgICBFTkRPRkYgICAgICAgICAgIDogMTYsIC8vIG9mZnNldCBvZiBmaXJzdCBDRU4gaGVhZGVyXHJcbiAgICBFTkRDT00gICAgICAgICAgIDogMjAsIC8vIHppcCBmaWxlIGNvbW1lbnQgbGVuZ3RoXHJcblxyXG4gICAgLyogQ29tcHJlc3Npb24gbWV0aG9kcyAqL1xyXG4gICAgU1RPUkVEICAgICAgICAgICA6IDAsIC8vIG5vIGNvbXByZXNzaW9uXHJcbiAgICBTSFJVTksgICAgICAgICAgIDogMSwgLy8gc2hydW5rXHJcbiAgICBSRURVQ0VEMSAgICAgICAgIDogMiwgLy8gcmVkdWNlZCB3aXRoIGNvbXByZXNzaW9uIGZhY3RvciAxXHJcbiAgICBSRURVQ0VEMiAgICAgICAgIDogMywgLy8gcmVkdWNlZCB3aXRoIGNvbXByZXNzaW9uIGZhY3RvciAyXHJcbiAgICBSRURVQ0VEMyAgICAgICAgIDogNCwgLy8gcmVkdWNlZCB3aXRoIGNvbXByZXNzaW9uIGZhY3RvciAzXHJcbiAgICBSRURVQ0VENCAgICAgICAgIDogNSwgLy8gcmVkdWNlZCB3aXRoIGNvbXByZXNzaW9uIGZhY3RvciA0XHJcbiAgICBJTVBMT0RFRCAgICAgICAgIDogNiwgLy8gaW1wbG9kZWRcclxuICAgIC8vIDcgcmVzZXJ2ZWRcclxuICAgIERFRkxBVEVEICAgICAgICAgOiA4LCAvLyBkZWZsYXRlZFxyXG4gICAgRU5IQU5DRURfREVGTEFURUQ6IDksIC8vIGVuaGFuY2VkIGRlZmxhdGVkXHJcbiAgICBQS1dBUkUgICAgICAgICAgIDogMTAsLy8gUEtXYXJlIERDTCBpbXBsb2RlZFxyXG4gICAgLy8gMTEgcmVzZXJ2ZWRcclxuICAgIEJaSVAyICAgICAgICAgICAgOiAxMiwgLy8gIGNvbXByZXNzZWQgdXNpbmcgQlpJUDJcclxuICAgIC8vIDEzIHJlc2VydmVkXHJcbiAgICBMWk1BICAgICAgICAgICAgIDogMTQsIC8vIExaTUFcclxuICAgIC8vIDE1LTE3IHJlc2VydmVkXHJcbiAgICBJQk1fVEVSU0UgICAgICAgIDogMTgsIC8vIGNvbXByZXNzZWQgdXNpbmcgSUJNIFRFUlNFXHJcbiAgICBJQk1fTFo3NyAgICAgICAgIDogMTksIC8vSUJNIExaNzcgelxyXG5cclxuICAgIC8qIEdlbmVyYWwgcHVycG9zZSBiaXQgZmxhZyAqL1xyXG4gICAgRkxHX0VOQyAgICAgICAgICA6IDAsICAvLyBlbmNyaXB0ZWQgZmlsZVxyXG4gICAgRkxHX0NPTVAxICAgICAgICA6IDEsICAvLyBjb21wcmVzc2lvbiBvcHRpb25cclxuICAgIEZMR19DT01QMiAgICAgICAgOiAyLCAgLy8gY29tcHJlc3Npb24gb3B0aW9uXHJcbiAgICBGTEdfREVTQyAgICAgICAgIDogNCwgIC8vIGRhdGEgZGVzY3JpcHRvclxyXG4gICAgRkxHX0VOSCAgICAgICAgICA6IDgsICAvLyBlbmhhbmNlZCBkZWZsYXRpb25cclxuICAgIEZMR19TVFIgICAgICAgICAgOiAxNiwgLy8gc3Ryb25nIGVuY3J5cHRpb25cclxuICAgIEZMR19MTkcgICAgICAgICAgOiAxMDI0LCAvLyBsYW5ndWFnZSBlbmNvZGluZ1xyXG4gICAgRkxHX01TSyAgICAgICAgICA6IDQwOTYsIC8vIG1hc2sgaGVhZGVyIHZhbHVlc1xyXG5cclxuICAgIC8qIExvYWQgdHlwZSAqL1xyXG4gICAgRklMRSAgICAgICAgICAgICA6IDAsXHJcbiAgICBCVUZGRVIgICAgICAgICAgIDogMSxcclxuICAgIE5PTkUgICAgICAgICAgICAgOiAyLFxyXG5cclxuICAgIC8qIDQuNSBFeHRlbnNpYmxlIGRhdGEgZmllbGRzICovXHJcbiAgICBFRl9JRCAgICAgICAgICAgIDogMCxcclxuICAgIEVGX1NJWkUgICAgICAgICAgOiAyLFxyXG5cclxuICAgIC8qIEhlYWRlciBJRHMgKi9cclxuICAgIElEX1pJUDY0ICAgICAgICAgOiAweDAwMDEsXHJcbiAgICBJRF9BVklORk8gICAgICAgIDogMHgwMDA3LFxyXG4gICAgSURfUEZTICAgICAgICAgICA6IDB4MDAwOCxcclxuICAgIElEX09TMiAgICAgICAgICAgOiAweDAwMDksXHJcbiAgICBJRF9OVEZTICAgICAgICAgIDogMHgwMDBhLFxyXG4gICAgSURfT1BFTlZNUyAgICAgICA6IDB4MDAwYyxcclxuICAgIElEX1VOSVggICAgICAgICAgOiAweDAwMGQsXHJcbiAgICBJRF9GT1JLICAgICAgICAgIDogMHgwMDBlLFxyXG4gICAgSURfUEFUQ0ggICAgICAgICA6IDB4MDAwZixcclxuICAgIElEX1g1MDlfUEtDUzcgICAgOiAweDAwMTQsXHJcbiAgICBJRF9YNTA5X0NFUlRJRF9GIDogMHgwMDE1LFxyXG4gICAgSURfWDUwOV9DRVJUSURfQyA6IDB4MDAxNixcclxuICAgIElEX1NUUk9OR0VOQyAgICAgOiAweDAwMTcsXHJcbiAgICBJRF9SRUNPUkRfTUdUICAgIDogMHgwMDE4LFxyXG4gICAgSURfWDUwOV9QS0NTN19STCA6IDB4MDAxOSxcclxuICAgIElEX0lCTTEgICAgICAgICAgOiAweDAwNjUsXHJcbiAgICBJRF9JQk0yICAgICAgICAgIDogMHgwMDY2LFxyXG4gICAgSURfUE9TWklQICAgICAgICA6IDB4NDY5MCxcclxuXHJcbiAgICBFRl9aSVA2NF9PUl8zMiAgIDogMHhmZmZmZmZmZixcclxuICAgIEVGX1pJUDY0X09SXzE2ICAgOiAweGZmZmYsXHJcbiAgICBFRl9aSVA2NF9TVU5DT01QIDogMCxcclxuICAgIEVGX1pJUDY0X1NDT01QICAgOiA4LFxyXG4gICAgRUZfWklQNjRfUkhPICAgICA6IDE2LFxyXG4gICAgRUZfWklQNjRfRFNOICAgICA6IDI0XHJcbn07XHJcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgLyogSGVhZGVyIGVycm9yIG1lc3NhZ2VzICovXHJcbiAgICBcIklOVkFMSURfTE9DXCIgOiBcIkludmFsaWQgTE9DIGhlYWRlciAoYmFkIHNpZ25hdHVyZSlcIixcclxuICAgIFwiSU5WQUxJRF9DRU5cIiA6IFwiSW52YWxpZCBDRU4gaGVhZGVyIChiYWQgc2lnbmF0dXJlKVwiLFxyXG4gICAgXCJJTlZBTElEX0VORFwiIDogXCJJbnZhbGlkIEVORCBoZWFkZXIgKGJhZCBzaWduYXR1cmUpXCIsXHJcblxyXG4gICAgLyogWmlwRW50cnkgZXJyb3IgbWVzc2FnZXMqL1xyXG4gICAgXCJOT19EQVRBXCIgOiBcIk5vdGhpbmcgdG8gZGVjb21wcmVzc1wiLFxyXG4gICAgXCJCQURfQ1JDXCIgOiBcIkNSQzMyIGNoZWNrc3VtIGZhaWxlZFwiLFxyXG4gICAgXCJGSUxFX0lOX1RIRV9XQVlcIiA6IFwiVGhlcmUgaXMgYSBmaWxlIGluIHRoZSB3YXk6ICVzXCIsXHJcbiAgICBcIlVOS05PV05fTUVUSE9EXCIgOiBcIkludmFsaWQvdW5zdXBwb3J0ZWQgY29tcHJlc3Npb24gbWV0aG9kXCIsXHJcblxyXG4gICAgLyogSW5mbGF0ZXIgZXJyb3IgbWVzc2FnZXMgKi9cclxuICAgIFwiQVZBSUxfREFUQVwiIDogXCJpbmZsYXRlOjpBdmFpbGFibGUgaW5mbGF0ZSBkYXRhIGRpZCBub3QgdGVybWluYXRlXCIsXHJcbiAgICBcIklOVkFMSURfRElTVEFOQ0VcIiA6IFwiaW5mbGF0ZTo6SW52YWxpZCBsaXRlcmFsL2xlbmd0aCBvciBkaXN0YW5jZSBjb2RlIGluIGZpeGVkIG9yIGR5bmFtaWMgYmxvY2tcIixcclxuICAgIFwiVE9fTUFOWV9DT0RFU1wiIDogXCJpbmZsYXRlOjpEeW5hbWljIGJsb2NrIGNvZGUgZGVzY3JpcHRpb246IHRvbyBtYW55IGxlbmd0aCBvciBkaXN0YW5jZSBjb2Rlc1wiLFxyXG4gICAgXCJJTlZBTElEX1JFUEVBVF9MRU5cIiA6IFwiaW5mbGF0ZTo6RHluYW1pYyBibG9jayBjb2RlIGRlc2NyaXB0aW9uOiByZXBlYXQgbW9yZSB0aGFuIHNwZWNpZmllZCBsZW5ndGhzXCIsXHJcbiAgICBcIklOVkFMSURfUkVQRUFUX0ZJUlNUXCIgOiBcImluZmxhdGU6OkR5bmFtaWMgYmxvY2sgY29kZSBkZXNjcmlwdGlvbjogcmVwZWF0IGxlbmd0aHMgd2l0aCBubyBmaXJzdCBsZW5ndGhcIixcclxuICAgIFwiSU5DT01QTEVURV9DT0RFU1wiIDogXCJpbmZsYXRlOjpEeW5hbWljIGJsb2NrIGNvZGUgZGVzY3JpcHRpb246IGNvZGUgbGVuZ3RocyBjb2RlcyBpbmNvbXBsZXRlXCIsXHJcbiAgICBcIklOVkFMSURfRFlOX0RJU1RBTkNFXCI6IFwiaW5mbGF0ZTo6RHluYW1pYyBibG9jayBjb2RlIGRlc2NyaXB0aW9uOiBpbnZhbGlkIGRpc3RhbmNlIGNvZGUgbGVuZ3Roc1wiLFxyXG4gICAgXCJJTlZBTElEX0NPREVTX0xFTlwiOiBcImluZmxhdGU6OkR5bmFtaWMgYmxvY2sgY29kZSBkZXNjcmlwdGlvbjogaW52YWxpZCBsaXRlcmFsL2xlbmd0aCBjb2RlIGxlbmd0aHNcIixcclxuICAgIFwiSU5WQUxJRF9TVE9SRV9CTE9DS1wiIDogXCJpbmZsYXRlOjpTdG9yZWQgYmxvY2sgbGVuZ3RoIGRpZCBub3QgbWF0Y2ggb25lJ3MgY29tcGxlbWVudFwiLFxyXG4gICAgXCJJTlZBTElEX0JMT0NLX1RZUEVcIiA6IFwiaW5mbGF0ZTo6SW52YWxpZCBibG9jayB0eXBlICh0eXBlID09IDMpXCIsXHJcblxyXG4gICAgLyogQURNLVpJUCBlcnJvciBtZXNzYWdlcyAqL1xyXG4gICAgXCJDQU5UX0VYVFJBQ1RfRklMRVwiIDogXCJDb3VsZCBub3QgZXh0cmFjdCB0aGUgZmlsZVwiLFxyXG4gICAgXCJDQU5UX09WRVJSSURFXCIgOiBcIlRhcmdldCBmaWxlIGFscmVhZHkgZXhpc3RzXCIsXHJcbiAgICBcIk5PX1pJUFwiIDogXCJObyB6aXAgZmlsZSB3YXMgbG9hZGVkXCIsXHJcbiAgICBcIk5PX0VOVFJZXCIgOiBcIkVudHJ5IGRvZXNuJ3QgZXhpc3RcIixcclxuICAgIFwiRElSRUNUT1JZX0NPTlRFTlRfRVJST1JcIiA6IFwiQSBkaXJlY3RvcnkgY2Fubm90IGhhdmUgY29udGVudFwiLFxyXG4gICAgXCJGSUxFX05PVF9GT1VORFwiIDogXCJGaWxlIG5vdCBmb3VuZDogJXNcIixcclxuICAgIFwiTk9UX0lNUExFTUVOVEVEXCIgOiBcIk5vdCBpbXBsZW1lbnRlZFwiLFxyXG4gICAgXCJJTlZBTElEX0ZJTEVOQU1FXCIgOiBcIkludmFsaWQgZmlsZW5hbWVcIixcclxuICAgIFwiSU5WQUxJRF9GT1JNQVRcIiA6IFwiSW52YWxpZCBvciB1bnN1cHBvcnRlZCB6aXAgZm9ybWF0LiBObyBFTkQgaGVhZGVyIGZvdW5kXCJcclxufTsiLCJ2YXIgZnMgPSByZXF1aXJlKFwiLi9maWxlU3lzdGVtXCIpLnJlcXVpcmUoKSxcclxuICAgIHB0aCA9IHJlcXVpcmUoXCJwYXRoXCIpO1xyXG5cdFxyXG5mcy5leGlzdHNTeW5jID0gZnMuZXhpc3RzU3luYyB8fCBwdGguZXhpc3RzU3luYztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oLypTdHJpbmcqL3BhdGgpIHtcclxuXHJcbiAgICB2YXIgX3BhdGggPSBwYXRoIHx8IFwiXCIsXHJcbiAgICAgICAgX3Blcm1pc3Npb25zID0gMCxcclxuICAgICAgICBfb2JqID0gbmV3QXR0cigpLFxyXG4gICAgICAgIF9zdGF0ID0gbnVsbDtcclxuXHJcbiAgICBmdW5jdGlvbiBuZXdBdHRyKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGRpcmVjdG9yeSA6IGZhbHNlLFxyXG4gICAgICAgICAgICByZWFkb25seSA6IGZhbHNlLFxyXG4gICAgICAgICAgICBoaWRkZW4gOiBmYWxzZSxcclxuICAgICAgICAgICAgZXhlY3V0YWJsZSA6IGZhbHNlLFxyXG4gICAgICAgICAgICBtdGltZSA6IDAsXHJcbiAgICAgICAgICAgIGF0aW1lIDogMFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoX3BhdGggJiYgZnMuZXhpc3RzU3luYyhfcGF0aCkpIHtcclxuICAgICAgICBfc3RhdCA9IGZzLnN0YXRTeW5jKF9wYXRoKTtcclxuICAgICAgICBfb2JqLmRpcmVjdG9yeSA9IF9zdGF0LmlzRGlyZWN0b3J5KCk7XHJcbiAgICAgICAgX29iai5tdGltZSA9IF9zdGF0Lm10aW1lO1xyXG4gICAgICAgIF9vYmouYXRpbWUgPSBfc3RhdC5hdGltZTtcclxuICAgICAgICBfb2JqLmV4ZWN1dGFibGUgPSAhISgxICYgcGFyc2VJbnQgKChfc3RhdC5tb2RlICYgcGFyc2VJbnQgKFwiNzc3XCIsIDgpKS50b1N0cmluZyAoOClbMF0pKTtcclxuICAgICAgICBfb2JqLnJlYWRvbmx5ID0gISEoMiAmIHBhcnNlSW50ICgoX3N0YXQubW9kZSAmIHBhcnNlSW50IChcIjc3N1wiLCA4KSkudG9TdHJpbmcgKDgpWzBdKSk7XHJcbiAgICAgICAgX29iai5oaWRkZW4gPSBwdGguYmFzZW5hbWUoX3BhdGgpWzBdID09PSBcIi5cIjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS53YXJuKFwiSW52YWxpZCBwYXRoOiBcIiArIF9wYXRoKVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcblxyXG4gICAgICAgIGdldCBkaXJlY3RvcnkgKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX29iai5kaXJlY3Rvcnk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZ2V0IHJlYWRPbmx5ICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9vYmoucmVhZG9ubHk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZ2V0IGhpZGRlbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfb2JqLmhpZGRlbjtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBnZXQgbXRpbWUgKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX29iai5tdGltZTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBnZXQgYXRpbWUgKCkge1xyXG4gICAgICAgICAgIHJldHVybiBfb2JqLmF0aW1lO1xyXG4gICAgICAgIH0sXHJcblxyXG5cclxuICAgICAgICBnZXQgZXhlY3V0YWJsZSAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfb2JqLmV4ZWN1dGFibGU7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZGVjb2RlQXR0cmlidXRlcyA6IGZ1bmN0aW9uKHZhbCkge1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBlbmNvZGVBdHRyaWJ1dGVzIDogZnVuY3Rpb24gKHZhbCkge1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB0b1N0cmluZyA6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgIHJldHVybiAne1xcbicgK1xyXG4gICAgICAgICAgICAgICAnXFx0XCJwYXRoXCIgOiBcIicgKyBfcGF0aCArIFwiLFxcblwiICtcclxuICAgICAgICAgICAgICAgJ1xcdFwiaXNEaXJlY3RvcnlcIiA6ICcgKyBfb2JqLmRpcmVjdG9yeSArIFwiLFxcblwiICtcclxuICAgICAgICAgICAgICAgJ1xcdFwiaXNSZWFkT25seVwiIDogJyArIF9vYmoucmVhZG9ubHkgKyBcIixcXG5cIiArXHJcbiAgICAgICAgICAgICAgICdcXHRcImlzSGlkZGVuXCIgOiAnICsgX29iai5oaWRkZW4gKyBcIixcXG5cIiArXHJcbiAgICAgICAgICAgICAgICdcXHRcImlzRXhlY3V0YWJsZVwiIDogJyArIF9vYmouZXhlY3V0YWJsZSArIFwiLFxcblwiICtcclxuICAgICAgICAgICAgICAgJ1xcdFwibVRpbWVcIiA6ICcgKyBfb2JqLm10aW1lICsgXCJcXG5cIiArXHJcbiAgICAgICAgICAgICAgICdcXHRcImFUaW1lXCIgOiAnICsgX29iai5hdGltZSArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICd9JztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59O1xyXG4iLCJleHBvcnRzLnJlcXVpcmUgPSBmdW5jdGlvbigpIHtcclxuICB2YXIgZnMgPSByZXF1aXJlKFwiZnNcIik7XHJcbiAgaWYgKHByb2Nlc3MudmVyc2lvbnNbJ2VsZWN0cm9uJ10pIHtcclxuXHQgIHRyeSB7XHJcblx0ICAgIG9yaWdpbmFsRnMgPSByZXF1aXJlKFwib3JpZ2luYWwtZnNcIik7XHJcblx0ICAgIGlmIChPYmplY3Qua2V5cyhvcmlnaW5hbEZzKS5sZW5ndGggPiAwKSB7XHJcblx0ICAgICAgZnMgPSBvcmlnaW5hbEZzO1xyXG4gICAgICB9XHJcblx0ICB9IGNhdGNoIChlKSB7fVxyXG4gIH1cclxuICByZXR1cm4gZnNcclxufTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi91dGlsc1wiKTtcclxubW9kdWxlLmV4cG9ydHMuRmlsZVN5c3RlbSA9IHJlcXVpcmUoXCIuL2ZpbGVTeXN0ZW1cIik7XHJcbm1vZHVsZS5leHBvcnRzLkNvbnN0YW50cyA9IHJlcXVpcmUoXCIuL2NvbnN0YW50c1wiKTtcclxubW9kdWxlLmV4cG9ydHMuRXJyb3JzID0gcmVxdWlyZShcIi4vZXJyb3JzXCIpO1xyXG5tb2R1bGUuZXhwb3J0cy5GaWxlQXR0ciA9IHJlcXVpcmUoXCIuL2ZhdHRyXCIpOyIsInZhciBmcyA9IHJlcXVpcmUoXCIuL2ZpbGVTeXN0ZW1cIikucmVxdWlyZSgpLFxyXG4gICAgcHRoID0gcmVxdWlyZSgncGF0aCcpO1xyXG5cclxuZnMuZXhpc3RzU3luYyA9IGZzLmV4aXN0c1N5bmMgfHwgcHRoLmV4aXN0c1N5bmM7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcclxuXHJcbiAgICB2YXIgY3JjVGFibGUgPSBbXSxcclxuICAgICAgICBDb25zdGFudHMgPSByZXF1aXJlKCcuL2NvbnN0YW50cycpLFxyXG4gICAgICAgIEVycm9ycyA9IHJlcXVpcmUoJy4vZXJyb3JzJyksXHJcblxyXG4gICAgICAgIFBBVEhfU0VQQVJBVE9SID0gcHRoLnNlcDtcclxuXHJcblxyXG4gICAgZnVuY3Rpb24gbWtkaXJTeW5jKC8qU3RyaW5nKi9wYXRoKSB7XHJcbiAgICAgICAgdmFyIHJlc29sdmVkUGF0aCA9IHBhdGguc3BsaXQoUEFUSF9TRVBBUkFUT1IpWzBdO1xyXG4gICAgICAgIHBhdGguc3BsaXQoUEFUSF9TRVBBUkFUT1IpLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xyXG4gICAgICAgICAgICBpZiAoIW5hbWUgfHwgbmFtZS5zdWJzdHIoLTEsMSkgPT09IFwiOlwiKSByZXR1cm47XHJcbiAgICAgICAgICAgIHJlc29sdmVkUGF0aCArPSBQQVRIX1NFUEFSQVRPUiArIG5hbWU7XHJcbiAgICAgICAgICAgIHZhciBzdGF0O1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgc3RhdCA9IGZzLnN0YXRTeW5jKHJlc29sdmVkUGF0aCk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIGZzLm1rZGlyU3luYyhyZXNvbHZlZFBhdGgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChzdGF0ICYmIHN0YXQuaXNGaWxlKCkpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcnMuRklMRV9JTl9USEVfV0FZLnJlcGxhY2UoXCIlc1wiLCByZXNvbHZlZFBhdGgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGZpbmRTeW5jKC8qU3RyaW5nKi9kaXIsIC8qUmVnRXhwKi9wYXR0ZXJuLCAvKkJvb2xlYW4qL3JlY291cnNpdmUpIHtcclxuICAgICAgICBpZiAodHlwZW9mIHBhdHRlcm4gPT09ICdib29sZWFuJykge1xyXG4gICAgICAgICAgICByZWNvdXJzaXZlID0gcGF0dGVybjtcclxuICAgICAgICAgICAgcGF0dGVybiA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGZpbGVzID0gW107XHJcbiAgICAgICAgZnMucmVhZGRpclN5bmMoZGlyKS5mb3JFYWNoKGZ1bmN0aW9uKGZpbGUpIHtcclxuICAgICAgICAgICAgdmFyIHBhdGggPSBwdGguam9pbihkaXIsIGZpbGUpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGZzLnN0YXRTeW5jKHBhdGgpLmlzRGlyZWN0b3J5KCkgJiYgcmVjb3Vyc2l2ZSlcclxuICAgICAgICAgICAgICAgIGZpbGVzID0gZmlsZXMuY29uY2F0KGZpbmRTeW5jKHBhdGgsIHBhdHRlcm4sIHJlY291cnNpdmUpKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghcGF0dGVybiB8fCBwYXR0ZXJuLnRlc3QocGF0aCkpIHtcclxuICAgICAgICAgICAgICAgIGZpbGVzLnB1c2gocHRoLm5vcm1hbGl6ZShwYXRoKSArIChmcy5zdGF0U3luYyhwYXRoKS5pc0RpcmVjdG9yeSgpID8gUEFUSF9TRVBBUkFUT1IgOiBcIlwiKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGZpbGVzO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbWFrZURpciA6IGZ1bmN0aW9uKC8qU3RyaW5nKi9wYXRoKSB7XHJcbiAgICAgICAgICAgIG1rZGlyU3luYyhwYXRoKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBjcmMzMiA6IGZ1bmN0aW9uKGJ1Zikge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGJ1ZiA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgICAgIGJ1ZiA9IEJ1ZmZlci5hbGxvYyhidWYubGVuZ3RoLCBidWYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBiID0gQnVmZmVyLmFsbG9jKDQpO1xyXG4gICAgICAgICAgICBpZiAoIWNyY1RhYmxlLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgbiA9IDA7IG4gPCAyNTY7IG4rKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjID0gbjtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrID0gODsgLS1rID49IDA7KSAgLy9cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChjICYgMSkgIT09IDApICB7IGMgPSAweGVkYjg4MzIwIF4gKGMgPj4+IDEpOyB9IGVsc2UgeyBjID0gYyA+Pj4gMTsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiLndyaXRlSW50MzJMRShjLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYyA9IGIucmVhZFVJbnQzMkxFKDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjcmNUYWJsZVtuXSA9IGM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGNyYyA9IDAsIG9mZiA9IDAsIGxlbiA9IGJ1Zi5sZW5ndGgsIGMxID0gfmNyYztcclxuICAgICAgICAgICAgd2hpbGUoLS1sZW4gPj0gMCkgYzEgPSBjcmNUYWJsZVsoYzEgXiBidWZbb2ZmKytdKSAmIDB4ZmZdIF4gKGMxID4+PiA4KTtcclxuICAgICAgICAgICAgY3JjID0gfmMxO1xyXG4gICAgICAgICAgICBiLndyaXRlSW50MzJMRShjcmMgJiAweGZmZmZmZmZmLCAwKTtcclxuICAgICAgICAgICAgcmV0dXJuIGIucmVhZFVJbnQzMkxFKDApO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIG1ldGhvZFRvU3RyaW5nIDogZnVuY3Rpb24oLypOdW1iZXIqL21ldGhvZCkge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKG1ldGhvZCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBDb25zdGFudHMuU1RPUkVEOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnU1RPUkVEICgnICsgbWV0aG9kICsgJyknO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBDb25zdGFudHMuREVGTEFURUQ6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdERUZMQVRFRCAoJyArIG1ldGhvZCArICcpJztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdVTlNVUFBPUlRFRCAoJyArIG1ldGhvZCArICcpJztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB3cml0ZUZpbGVUbyA6IGZ1bmN0aW9uKC8qU3RyaW5nKi9wYXRoLCAvKkJ1ZmZlciovY29udGVudCwgLypCb29sZWFuKi9vdmVyd3JpdGUsIC8qTnVtYmVyKi9hdHRyKSB7XHJcbiAgICAgICAgICAgIGlmIChmcy5leGlzdHNTeW5jKHBhdGgpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIW92ZXJ3cml0ZSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7IC8vIGNhbm5vdCBvdmVyd3JpdGVcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgc3RhdCA9IGZzLnN0YXRTeW5jKHBhdGgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXQuaXNEaXJlY3RvcnkoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgZm9sZGVyID0gcHRoLmRpcm5hbWUocGF0aCk7XHJcbiAgICAgICAgICAgIGlmICghZnMuZXhpc3RzU3luYyhmb2xkZXIpKSB7XHJcbiAgICAgICAgICAgICAgICBta2RpclN5bmMoZm9sZGVyKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmFyIGZkO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgZmQgPSBmcy5vcGVuU3luYyhwYXRoLCAndycsIDQzOCk7IC8vIDA2NjZcclxuICAgICAgICAgICAgfSBjYXRjaChlKSB7XHJcbiAgICAgICAgICAgICAgICBmcy5jaG1vZFN5bmMocGF0aCwgNDM4KTtcclxuICAgICAgICAgICAgICAgIGZkID0gZnMub3BlblN5bmMocGF0aCwgJ3cnLCA0MzgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChmZCkge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICBmcy53cml0ZVN5bmMoZmQsIGNvbnRlbnQsIDAsIGNvbnRlbnQubGVuZ3RoLCAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNhdGNoIChlKXtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZmluYWxseSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZnMuY2xvc2VTeW5jKGZkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmcy5jaG1vZFN5bmMocGF0aCwgYXR0ciB8fCA0MzgpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB3cml0ZUZpbGVUb0FzeW5jIDogZnVuY3Rpb24oLypTdHJpbmcqL3BhdGgsIC8qQnVmZmVyKi9jb250ZW50LCAvKkJvb2xlYW4qL292ZXJ3cml0ZSwgLypOdW1iZXIqL2F0dHIsIC8qRnVuY3Rpb24qL2NhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIGlmKHR5cGVvZiBhdHRyID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayA9IGF0dHI7XHJcbiAgICAgICAgICAgICAgICBhdHRyID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmcy5leGlzdHMocGF0aCwgZnVuY3Rpb24oZXhpc3RzKSB7XHJcbiAgICAgICAgICAgICAgICBpZihleGlzdHMgJiYgIW92ZXJ3cml0ZSlcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZmFsc2UpO1xyXG5cclxuICAgICAgICAgICAgICAgIGZzLnN0YXQocGF0aCwgZnVuY3Rpb24oZXJyLCBzdGF0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZXhpc3RzICYmc3RhdC5pc0RpcmVjdG9yeSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgZm9sZGVyID0gcHRoLmRpcm5hbWUocGF0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZnMuZXhpc3RzKGZvbGRlciwgZnVuY3Rpb24oZXhpc3RzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFleGlzdHMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBta2RpclN5bmMoZm9sZGVyKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZzLm9wZW4ocGF0aCwgJ3cnLCA0MzgsIGZ1bmN0aW9uKGVyciwgZmQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZzLmNobW9kKHBhdGgsIDQzOCwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZzLm9wZW4ocGF0aCwgJ3cnLCA0MzgsIGZ1bmN0aW9uKGVyciwgZmQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZzLndyaXRlKGZkLCBjb250ZW50LCAwLCBjb250ZW50Lmxlbmd0aCwgMCwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnMuY2xvc2UoZmQsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcy5jaG1vZChwYXRoLCBhdHRyIHx8IDQzOCwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihmZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcy53cml0ZShmZCwgY29udGVudCwgMCwgY29udGVudC5sZW5ndGgsIDAsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnMuY2xvc2UoZmQsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZzLmNobW9kKHBhdGgsIGF0dHIgfHwgNDM4LCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcy5jaG1vZChwYXRoLCBhdHRyIHx8IDQzOCwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGZpbmRGaWxlcyA6IGZ1bmN0aW9uKC8qU3RyaW5nKi9wYXRoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmaW5kU3luYyhwYXRoLCB0cnVlKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBnZXRBdHRyaWJ1dGVzIDogZnVuY3Rpb24oLypTdHJpbmcqL3BhdGgpIHtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2V0QXR0cmlidXRlcyA6IGZ1bmN0aW9uKC8qU3RyaW5nKi9wYXRoKSB7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHRvQnVmZmVyIDogZnVuY3Rpb24oaW5wdXQpIHtcclxuICAgICAgICAgICAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihpbnB1dCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpbnB1dDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChpbnB1dC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gQnVmZmVyLmFsbG9jKDApXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gQnVmZmVyLmZyb20oaW5wdXQsICd1dGY4Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBDb25zdGFudHMgOiBDb25zdGFudHMsXHJcbiAgICAgICAgRXJyb3JzIDogRXJyb3JzXHJcbiAgICB9XHJcbn0pKCk7XHJcbiIsInZhciBVdGlscyA9IHJlcXVpcmUoXCIuL3V0aWxcIiksXHJcbiAgICBIZWFkZXJzID0gcmVxdWlyZShcIi4vaGVhZGVyc1wiKSxcclxuICAgIENvbnN0YW50cyA9IFV0aWxzLkNvbnN0YW50cyxcclxuICAgIE1ldGhvZHMgPSByZXF1aXJlKFwiLi9tZXRob2RzXCIpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoLypCdWZmZXIqL2lucHV0KSB7XHJcblxyXG4gICAgdmFyIF9lbnRyeUhlYWRlciA9IG5ldyBIZWFkZXJzLkVudHJ5SGVhZGVyKCksXHJcbiAgICAgICAgX2VudHJ5TmFtZSA9IEJ1ZmZlci5hbGxvYygwKSxcclxuICAgICAgICBfY29tbWVudCA9IEJ1ZmZlci5hbGxvYygwKSxcclxuICAgICAgICBfaXNEaXJlY3RvcnkgPSBmYWxzZSxcclxuICAgICAgICB1bmNvbXByZXNzZWREYXRhID0gbnVsbCxcclxuICAgICAgICBfZXh0cmEgPSBCdWZmZXIuYWxsb2MoMCk7XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0Q29tcHJlc3NlZERhdGFGcm9tWmlwKCkge1xyXG4gICAgICAgIGlmICghaW5wdXQgfHwgIUJ1ZmZlci5pc0J1ZmZlcihpbnB1dCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIEJ1ZmZlci5hbGxvYygwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgX2VudHJ5SGVhZGVyLmxvYWREYXRhSGVhZGVyRnJvbUJpbmFyeShpbnB1dCk7XHJcbiAgICAgICAgcmV0dXJuIGlucHV0LnNsaWNlKF9lbnRyeUhlYWRlci5yZWFsRGF0YU9mZnNldCwgX2VudHJ5SGVhZGVyLnJlYWxEYXRhT2Zmc2V0ICsgX2VudHJ5SGVhZGVyLmNvbXByZXNzZWRTaXplKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNyYzMyT0soZGF0YSkge1xyXG4gICAgICAgIC8vIGlmIGJpdCAzICgweDA4KSBvZiB0aGUgZ2VuZXJhbC1wdXJwb3NlIGZsYWdzIGZpZWxkIGlzIHNldCwgdGhlbiB0aGUgQ1JDLTMyIGFuZCBmaWxlIHNpemVzIGFyZSBub3Qga25vd24gd2hlbiB0aGUgaGVhZGVyIGlzIHdyaXR0ZW5cclxuICAgICAgICBpZiAoKF9lbnRyeUhlYWRlci5mbGFncyAmIDB4OCkgIT09IDB4OCkge1xyXG4gICAgICAgICAgIGlmIChVdGlscy5jcmMzMihkYXRhKSAhPT0gX2VudHJ5SGVhZGVyLmRhdGFIZWFkZXIuY3JjKSB7XHJcbiAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gQFRPRE86IGxvYWQgYW5kIGNoZWNrIGRhdGEgZGVzY3JpcHRvciBoZWFkZXJcclxuICAgICAgICAgICAgLy8gVGhlIGZpZWxkcyBpbiB0aGUgbG9jYWwgaGVhZGVyIGFyZSBmaWxsZWQgd2l0aCB6ZXJvLCBhbmQgdGhlIENSQy0zMiBhbmQgc2l6ZSBhcmUgYXBwZW5kZWQgaW4gYSAxMi1ieXRlIHN0cnVjdHVyZVxyXG4gICAgICAgICAgICAvLyAob3B0aW9uYWxseSBwcmVjZWRlZCBieSBhIDQtYnl0ZSBzaWduYXR1cmUpIGltbWVkaWF0ZWx5IGFmdGVyIHRoZSBjb21wcmVzc2VkIGRhdGE6XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGRlY29tcHJlc3MoLypCb29sZWFuKi9hc3luYywgLypGdW5jdGlvbiovY2FsbGJhY2ssIC8qU3RyaW5nKi9wYXNzKSB7XHJcbiAgICAgICAgaWYodHlwZW9mIGNhbGxiYWNrID09PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgYXN5bmMgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHBhc3M9YXN5bmM7XHJcbiAgICAgICAgICAgIGFzeW5jPXZvaWQgMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKF9pc0RpcmVjdG9yeSkge1xyXG4gICAgICAgICAgICBpZiAoYXN5bmMgJiYgY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKEJ1ZmZlci5hbGxvYygwKSwgVXRpbHMuRXJyb3JzLkRJUkVDVE9SWV9DT05URU5UX0VSUk9SKTsgLy9zaSBhZGRlZCBlcnJvci5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gQnVmZmVyLmFsbG9jKDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGNvbXByZXNzZWREYXRhID0gZ2V0Q29tcHJlc3NlZERhdGFGcm9tWmlwKCk7XHJcbiAgICAgICBcclxuICAgICAgICBpZiAoY29tcHJlc3NlZERhdGEubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIGlmIChhc3luYyAmJiBjYWxsYmFjaykgY2FsbGJhY2soY29tcHJlc3NlZERhdGEsIFV0aWxzLkVycm9ycy5OT19EQVRBKTsvL3NpIGFkZGVkIGVycm9yLlxyXG4gICAgICAgICAgICByZXR1cm4gY29tcHJlc3NlZERhdGE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgZGF0YSA9IEJ1ZmZlci5hbGxvYyhfZW50cnlIZWFkZXIuc2l6ZSk7XHJcblxyXG4gICAgICAgIHN3aXRjaCAoX2VudHJ5SGVhZGVyLm1ldGhvZCkge1xyXG4gICAgICAgICAgICBjYXNlIFV0aWxzLkNvbnN0YW50cy5TVE9SRUQ6XHJcbiAgICAgICAgICAgICAgICBjb21wcmVzc2VkRGF0YS5jb3B5KGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFjcmMzMk9LKGRhdGEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFzeW5jICYmIGNhbGxiYWNrKSBjYWxsYmFjayhkYXRhLCBVdGlscy5FcnJvcnMuQkFEX0NSQyk7Ly9zaSBhZGRlZCBlcnJvclxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBVdGlscy5FcnJvcnMuQkFEX0NSQztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7Ly9zaSBhZGRlZCBvdGhlcndpc2UgZGlkIG5vdCBzZWVtIHRvIHJldHVybiBkYXRhLlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhc3luYyAmJiBjYWxsYmFjaykgY2FsbGJhY2soZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgVXRpbHMuQ29uc3RhbnRzLkRFRkxBVEVEOlxyXG4gICAgICAgICAgICAgICAgdmFyIGluZmxhdGVyID0gbmV3IE1ldGhvZHMuSW5mbGF0ZXIoY29tcHJlc3NlZERhdGEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFhc3luYykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBpbmZsYXRlci5pbmZsYXRlKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5jb3B5KGRhdGEsIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghY3JjMzJPSyhkYXRhKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oVXRpbHMuRXJyb3JzLkJBRF9DUkMgKyBcIiBcIiArIF9lbnRyeU5hbWUudG9TdHJpbmcoKSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZmxhdGVyLmluZmxhdGVBc3luYyhmdW5jdGlvbihyZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmNvcHkoZGF0YSwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY3JjMzJPSyhkYXRhKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjayhkYXRhLCBVdGlscy5FcnJvcnMuQkFEX0NSQyk7IC8vc2kgYWRkZWQgZXJyb3JcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHsgLy9zaSBhZGRlZCBvdGhlcndpc2UgZGlkIG5vdCBzZWVtIHRvIHJldHVybiBkYXRhLlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjayhkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGlmIChhc3luYyAmJiBjYWxsYmFjaykgY2FsbGJhY2soQnVmZmVyLmFsbG9jKDApLCBVdGlscy5FcnJvcnMuVU5LTk9XTl9NRVRIT0QpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFV0aWxzLkVycm9ycy5VTktOT1dOX01FVEhPRDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY29tcHJlc3MoLypCb29sZWFuKi9hc3luYywgLypGdW5jdGlvbiovY2FsbGJhY2spIHtcclxuICAgICAgICBpZiAoKCF1bmNvbXByZXNzZWREYXRhIHx8ICF1bmNvbXByZXNzZWREYXRhLmxlbmd0aCkgJiYgQnVmZmVyLmlzQnVmZmVyKGlucHV0KSkge1xyXG4gICAgICAgICAgICAvLyBubyBkYXRhIHNldCBvciB0aGUgZGF0YSB3YXNuJ3QgY2hhbmdlZCB0byByZXF1aXJlIHJlY29tcHJlc3Npb25cclxuICAgICAgICAgICAgaWYgKGFzeW5jICYmIGNhbGxiYWNrKSBjYWxsYmFjayhnZXRDb21wcmVzc2VkRGF0YUZyb21aaXAoKSk7XHJcbiAgICAgICAgICAgIHJldHVybiBnZXRDb21wcmVzc2VkRGF0YUZyb21aaXAoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh1bmNvbXByZXNzZWREYXRhLmxlbmd0aCAmJiAhX2lzRGlyZWN0b3J5KSB7XHJcbiAgICAgICAgICAgIHZhciBjb21wcmVzc2VkRGF0YTtcclxuICAgICAgICAgICAgLy8gTG9jYWwgZmlsZSBoZWFkZXJcclxuICAgICAgICAgICAgc3dpdGNoIChfZW50cnlIZWFkZXIubWV0aG9kKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFV0aWxzLkNvbnN0YW50cy5TVE9SRUQ6XHJcbiAgICAgICAgICAgICAgICAgICAgX2VudHJ5SGVhZGVyLmNvbXByZXNzZWRTaXplID0gX2VudHJ5SGVhZGVyLnNpemU7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbXByZXNzZWREYXRhID0gQnVmZmVyLmFsbG9jKHVuY29tcHJlc3NlZERhdGEubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICB1bmNvbXByZXNzZWREYXRhLmNvcHkoY29tcHJlc3NlZERhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXN5bmMgJiYgY2FsbGJhY2spIGNhbGxiYWNrKGNvbXByZXNzZWREYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29tcHJlc3NlZERhdGE7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgY2FzZSBVdGlscy5Db25zdGFudHMuREVGTEFURUQ6XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkZWZsYXRlciA9IG5ldyBNZXRob2RzLkRlZmxhdGVyKHVuY29tcHJlc3NlZERhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghYXN5bmMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRlZmxhdGVkID0gZGVmbGF0ZXIuZGVmbGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBfZW50cnlIZWFkZXIuY29tcHJlc3NlZFNpemUgPSBkZWZsYXRlZC5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkZWZsYXRlZDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZsYXRlci5kZWZsYXRlQXN5bmMoZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcHJlc3NlZERhdGEgPSBCdWZmZXIuYWxsb2MoZGF0YS5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2VudHJ5SGVhZGVyLmNvbXByZXNzZWRTaXplID0gZGF0YS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmNvcHkoY29tcHJlc3NlZERhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soY29tcHJlc3NlZERhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBkZWZsYXRlciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoYXN5bmMgJiYgY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKEJ1ZmZlci5hbGxvYygwKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gQnVmZmVyLmFsbG9jKDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlYWRVSW50NjRMRShidWZmZXIsIG9mZnNldCkge1xyXG4gICAgICAgIHJldHVybiAoYnVmZmVyLnJlYWRVSW50MzJMRShvZmZzZXQgKyA0KSA8PCA0KSArIGJ1ZmZlci5yZWFkVUludDMyTEUob2Zmc2V0KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBwYXJzZUV4dHJhKGRhdGEpIHtcclxuICAgICAgICB2YXIgb2Zmc2V0ID0gMDtcclxuICAgICAgICB2YXIgc2lnbmF0dXJlLCBzaXplLCBwYXJ0O1xyXG4gICAgICAgIHdoaWxlKG9mZnNldDxkYXRhLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBzaWduYXR1cmUgPSBkYXRhLnJlYWRVSW50MTZMRShvZmZzZXQpO1xyXG4gICAgICAgICAgICBvZmZzZXQgKz0gMjtcclxuICAgICAgICAgICAgc2l6ZSA9IGRhdGEucmVhZFVJbnQxNkxFKG9mZnNldCk7XHJcbiAgICAgICAgICAgIG9mZnNldCArPSAyO1xyXG4gICAgICAgICAgICBwYXJ0ID0gZGF0YS5zbGljZShvZmZzZXQsIG9mZnNldCtzaXplKTtcclxuICAgICAgICAgICAgb2Zmc2V0ICs9IHNpemU7XHJcbiAgICAgICAgICAgIGlmKENvbnN0YW50cy5JRF9aSVA2NCA9PT0gc2lnbmF0dXJlKSB7XHJcbiAgICAgICAgICAgICAgICBwYXJzZVppcDY0RXh0ZW5kZWRJbmZvcm1hdGlvbihwYXJ0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL092ZXJyaWRlIGhlYWRlciBmaWVsZCB2YWx1ZXMgd2l0aCB2YWx1ZXMgZnJvbSB0aGUgWklQNjQgZXh0cmEgZmllbGRcclxuICAgIGZ1bmN0aW9uIHBhcnNlWmlwNjRFeHRlbmRlZEluZm9ybWF0aW9uKGRhdGEpIHtcclxuICAgICAgICB2YXIgc2l6ZSwgY29tcHJlc3NlZFNpemUsIG9mZnNldCwgZGlza051bVN0YXJ0O1xyXG5cclxuICAgICAgICBpZihkYXRhLmxlbmd0aCA+PSBDb25zdGFudHMuRUZfWklQNjRfU0NPTVApIHtcclxuICAgICAgICAgICAgc2l6ZSA9IHJlYWRVSW50NjRMRShkYXRhLCBDb25zdGFudHMuRUZfWklQNjRfU1VOQ09NUCk7XHJcbiAgICAgICAgICAgIGlmKF9lbnRyeUhlYWRlci5zaXplID09PSBDb25zdGFudHMuRUZfWklQNjRfT1JfMzIpIHtcclxuICAgICAgICAgICAgICAgIF9lbnRyeUhlYWRlci5zaXplID0gc2l6ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihkYXRhLmxlbmd0aCA+PSBDb25zdGFudHMuRUZfWklQNjRfUkhPKSB7XHJcbiAgICAgICAgICAgIGNvbXByZXNzZWRTaXplID0gcmVhZFVJbnQ2NExFKGRhdGEsIENvbnN0YW50cy5FRl9aSVA2NF9TQ09NUCk7XHJcbiAgICAgICAgICAgIGlmKF9lbnRyeUhlYWRlci5jb21wcmVzc2VkU2l6ZSA9PT0gQ29uc3RhbnRzLkVGX1pJUDY0X09SXzMyKSB7XHJcbiAgICAgICAgICAgICAgICBfZW50cnlIZWFkZXIuY29tcHJlc3NlZFNpemUgPSBjb21wcmVzc2VkU2l6ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihkYXRhLmxlbmd0aCA+PSBDb25zdGFudHMuRUZfWklQNjRfRFNOKSB7XHJcbiAgICAgICAgICAgIG9mZnNldCA9IHJlYWRVSW50NjRMRShkYXRhLCBDb25zdGFudHMuRUZfWklQNjRfUkhPKTtcclxuICAgICAgICAgICAgaWYoX2VudHJ5SGVhZGVyLm9mZnNldCA9PT0gQ29uc3RhbnRzLkVGX1pJUDY0X09SXzMyKSB7XHJcbiAgICAgICAgICAgICAgICBfZW50cnlIZWFkZXIub2Zmc2V0ID0gb2Zmc2V0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGRhdGEubGVuZ3RoID49IENvbnN0YW50cy5FRl9aSVA2NF9EU04rNCkge1xyXG4gICAgICAgICAgICBkaXNrTnVtU3RhcnQgPSBkYXRhLnJlYWRVSW50MzJMRShDb25zdGFudHMuRUZfWklQNjRfRFNOKTtcclxuICAgICAgICAgICAgaWYoX2VudHJ5SGVhZGVyLmRpc2tOdW1TdGFydCA9PT0gQ29uc3RhbnRzLkVGX1pJUDY0X09SXzE2KSB7XHJcbiAgICAgICAgICAgICAgICBfZW50cnlIZWFkZXIuZGlza051bVN0YXJ0ID0gZGlza051bVN0YXJ0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGdldCBlbnRyeU5hbWUgKCkgeyByZXR1cm4gX2VudHJ5TmFtZS50b1N0cmluZygpOyB9LFxyXG4gICAgICAgIGdldCByYXdFbnRyeU5hbWUoKSB7IHJldHVybiBfZW50cnlOYW1lOyB9LFxyXG4gICAgICAgIHNldCBlbnRyeU5hbWUgKHZhbCkge1xyXG4gICAgICAgICAgICBfZW50cnlOYW1lID0gVXRpbHMudG9CdWZmZXIodmFsKTtcclxuICAgICAgICAgICAgdmFyIGxhc3RDaGFyID0gX2VudHJ5TmFtZVtfZW50cnlOYW1lLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICBfaXNEaXJlY3RvcnkgPSAobGFzdENoYXIgPT09IDQ3KSB8fCAobGFzdENoYXIgPT09IDkyKTtcclxuICAgICAgICAgICAgX2VudHJ5SGVhZGVyLmZpbGVOYW1lTGVuZ3RoID0gX2VudHJ5TmFtZS5sZW5ndGg7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZ2V0IGV4dHJhICgpIHsgcmV0dXJuIF9leHRyYTsgfSxcclxuICAgICAgICBzZXQgZXh0cmEgKHZhbCkge1xyXG4gICAgICAgICAgICBfZXh0cmEgPSB2YWw7XHJcbiAgICAgICAgICAgIF9lbnRyeUhlYWRlci5leHRyYUxlbmd0aCA9IHZhbC5sZW5ndGg7XHJcbiAgICAgICAgICAgIHBhcnNlRXh0cmEodmFsKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBnZXQgY29tbWVudCAoKSB7IHJldHVybiBfY29tbWVudC50b1N0cmluZygpOyB9LFxyXG4gICAgICAgIHNldCBjb21tZW50ICh2YWwpIHtcclxuICAgICAgICAgICAgX2NvbW1lbnQgPSBVdGlscy50b0J1ZmZlcih2YWwpO1xyXG4gICAgICAgICAgICBfZW50cnlIZWFkZXIuY29tbWVudExlbmd0aCA9IF9jb21tZW50Lmxlbmd0aDtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBnZXQgbmFtZSAoKSB7IHZhciBuID0gX2VudHJ5TmFtZS50b1N0cmluZygpOyByZXR1cm4gX2lzRGlyZWN0b3J5ID8gbi5zdWJzdHIobi5sZW5ndGggLSAxKS5zcGxpdChcIi9cIikucG9wKCkgOiBuLnNwbGl0KFwiL1wiKS5wb3AoKTsgfSxcclxuICAgICAgICBnZXQgaXNEaXJlY3RvcnkgKCkgeyByZXR1cm4gX2lzRGlyZWN0b3J5IH0sXHJcblxyXG4gICAgICAgIGdldENvbXByZXNzZWREYXRhIDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjb21wcmVzcyhmYWxzZSwgbnVsbClcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBnZXRDb21wcmVzc2VkRGF0YUFzeW5jIDogZnVuY3Rpb24oLypGdW5jdGlvbiovY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgY29tcHJlc3ModHJ1ZSwgY2FsbGJhY2spXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2V0RGF0YSA6IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHVuY29tcHJlc3NlZERhdGEgPSBVdGlscy50b0J1ZmZlcih2YWx1ZSk7XHJcbiAgICAgICAgICAgIGlmICghX2lzRGlyZWN0b3J5ICYmIHVuY29tcHJlc3NlZERhdGEubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBfZW50cnlIZWFkZXIuc2l6ZSA9IHVuY29tcHJlc3NlZERhdGEubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgX2VudHJ5SGVhZGVyLm1ldGhvZCA9IFV0aWxzLkNvbnN0YW50cy5ERUZMQVRFRDtcclxuICAgICAgICAgICAgICAgIF9lbnRyeUhlYWRlci5jcmMgPSBVdGlscy5jcmMzMih2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBfZW50cnlIZWFkZXIuY2hhbmdlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7IC8vIGZvbGRlcnMgYW5kIGJsYW5rIGZpbGVzIHNob3VsZCBiZSBzdG9yZWRcclxuICAgICAgICAgICAgICAgIF9lbnRyeUhlYWRlci5tZXRob2QgPSBVdGlscy5Db25zdGFudHMuU1RPUkVEO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZ2V0RGF0YSA6IGZ1bmN0aW9uKHBhc3MpIHtcclxuICAgICAgICAgICAgaWYgKF9lbnRyeUhlYWRlci5jaGFuZ2VkKSB7XHJcblx0XHRcdFx0cmV0dXJuIHVuY29tcHJlc3NlZERhdGE7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmV0dXJuIGRlY29tcHJlc3MoZmFsc2UsIG51bGwsIHBhc3MpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZ2V0RGF0YUFzeW5jIDogZnVuY3Rpb24oLypGdW5jdGlvbiovY2FsbGJhY2ssIHBhc3MpIHtcclxuXHRcdFx0aWYgKF9lbnRyeUhlYWRlci5jaGFuZ2VkKSB7XHJcblx0XHRcdFx0Y2FsbGJhY2sodW5jb21wcmVzc2VkRGF0YSlcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRkZWNvbXByZXNzKHRydWUsIGNhbGxiYWNrLCBwYXNzKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgc2V0IGF0dHIoYXR0cikgeyBfZW50cnlIZWFkZXIuYXR0ciA9IGF0dHI7IH0sXHJcbiAgICAgICAgZ2V0IGF0dHIoKSB7IHJldHVybiBfZW50cnlIZWFkZXIuYXR0cjsgfSxcclxuXHJcbiAgICAgICAgc2V0IGhlYWRlcigvKkJ1ZmZlciovZGF0YSkge1xyXG4gICAgICAgICAgICBfZW50cnlIZWFkZXIubG9hZEZyb21CaW5hcnkoZGF0YSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZ2V0IGhlYWRlcigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9lbnRyeUhlYWRlcjtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBwYWNrSGVhZGVyIDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciBoZWFkZXIgPSBfZW50cnlIZWFkZXIuZW50cnlIZWFkZXJUb0JpbmFyeSgpO1xyXG4gICAgICAgICAgICAvLyBhZGRcclxuICAgICAgICAgICAgX2VudHJ5TmFtZS5jb3B5KGhlYWRlciwgVXRpbHMuQ29uc3RhbnRzLkNFTkhEUik7XHJcbiAgICAgICAgICAgIGlmIChfZW50cnlIZWFkZXIuZXh0cmFMZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIF9leHRyYS5jb3B5KGhlYWRlciwgVXRpbHMuQ29uc3RhbnRzLkNFTkhEUiArIF9lbnRyeU5hbWUubGVuZ3RoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChfZW50cnlIZWFkZXIuY29tbWVudExlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgX2NvbW1lbnQuY29weShoZWFkZXIsIFV0aWxzLkNvbnN0YW50cy5DRU5IRFIgKyBfZW50cnlOYW1lLmxlbmd0aCArIF9lbnRyeUhlYWRlci5leHRyYUxlbmd0aCwgX2NvbW1lbnQubGVuZ3RoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gaGVhZGVyO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHRvU3RyaW5nIDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAne1xcbicgK1xyXG4gICAgICAgICAgICAgICAgJ1xcdFwiZW50cnlOYW1lXCIgOiBcIicgKyBfZW50cnlOYW1lLnRvU3RyaW5nKCkgKyBcIlxcXCIsXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgJ1xcdFwibmFtZVwiIDogXCInICsgKF9pc0RpcmVjdG9yeSA/IF9lbnRyeU5hbWUudG9TdHJpbmcoKS5yZXBsYWNlKC9cXC8kLywgJycpLnNwbGl0KFwiL1wiKS5wb3AoKSA6IF9lbnRyeU5hbWUudG9TdHJpbmcoKS5zcGxpdChcIi9cIikucG9wKCkpICsgXCJcXFwiLFxcblwiICtcclxuICAgICAgICAgICAgICAgICdcXHRcImNvbW1lbnRcIiA6IFwiJyArIF9jb21tZW50LnRvU3RyaW5nKCkgKyBcIlxcXCIsXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgJ1xcdFwiaXNEaXJlY3RvcnlcIiA6ICcgKyBfaXNEaXJlY3RvcnkgKyBcIixcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAnXFx0XCJoZWFkZXJcIiA6ICcgKyBfZW50cnlIZWFkZXIudG9TdHJpbmcoKS5yZXBsYWNlKC9cXHQvbWcsIFwiXFx0XFx0XCIpLnJlcGxhY2UoL30vbWcsIFwiXFx0fVwiKSAgKyBcIixcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAnXFx0XCJjb21wcmVzc2VkRGF0YVwiIDogPCcgKyAoaW5wdXQgJiYgaW5wdXQubGVuZ3RoICArIFwiIGJ5dGVzIGJ1ZmZlclwiIHx8IFwibnVsbFwiKSArIFwiPlxcblwiICtcclxuICAgICAgICAgICAgICAgICdcXHRcImRhdGFcIiA6IDwnICsgKHVuY29tcHJlc3NlZERhdGEgJiYgdW5jb21wcmVzc2VkRGF0YS5sZW5ndGggICsgXCIgYnl0ZXMgYnVmZmVyXCIgfHwgXCJudWxsXCIpICsgXCI+XFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgJ30nO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuIiwidmFyIFppcEVudHJ5ID0gcmVxdWlyZShcIi4vemlwRW50cnlcIiksXHJcblx0SGVhZGVycyA9IHJlcXVpcmUoXCIuL2hlYWRlcnNcIiksXHJcblx0VXRpbHMgPSByZXF1aXJlKFwiLi91dGlsXCIpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoLypTdHJpbmd8QnVmZmVyKi9pbnB1dCwgLypOdW1iZXIqL2lucHV0VHlwZSkge1xyXG5cdHZhciBlbnRyeUxpc3QgPSBbXSxcclxuXHRcdGVudHJ5VGFibGUgPSB7fSxcclxuXHRcdF9jb21tZW50ID0gQnVmZmVyLmFsbG9jKDApLFxyXG5cdFx0ZmlsZW5hbWUgPSBcIlwiLFxyXG5cdFx0ZnMgPSBVdGlscy5GaWxlU3lzdGVtLnJlcXVpcmUoKSxcclxuXHRcdGluQnVmZmVyID0gbnVsbCxcclxuXHRcdG1haW5IZWFkZXIgPSBuZXcgSGVhZGVycy5NYWluSGVhZGVyKCk7XHJcblxyXG5cdGlmIChpbnB1dFR5cGUgPT09IFV0aWxzLkNvbnN0YW50cy5GSUxFKSB7XHJcblx0XHQvLyBpcyBhIGZpbGVuYW1lXHJcblx0XHRmaWxlbmFtZSA9IGlucHV0O1xyXG5cdFx0aW5CdWZmZXIgPSBmcy5yZWFkRmlsZVN5bmMoZmlsZW5hbWUpO1xyXG5cdFx0cmVhZE1haW5IZWFkZXIoKTtcclxuXHR9IGVsc2UgaWYgKGlucHV0VHlwZSA9PT0gVXRpbHMuQ29uc3RhbnRzLkJVRkZFUikge1xyXG5cdFx0Ly8gaXMgYSBtZW1vcnkgYnVmZmVyXHJcblx0XHRpbkJ1ZmZlciA9IGlucHV0O1xyXG5cdFx0cmVhZE1haW5IZWFkZXIoKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0Ly8gbm9uZS4gaXMgYSBuZXcgZmlsZVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gcmVhZEVudHJpZXMoKSB7XHJcblx0XHRlbnRyeVRhYmxlID0ge307XHJcblx0XHRlbnRyeUxpc3QgPSBuZXcgQXJyYXkobWFpbkhlYWRlci5kaXNrRW50cmllcyk7ICAvLyB0b3RhbCBudW1iZXIgb2YgZW50cmllc1xyXG5cdFx0dmFyIGluZGV4ID0gbWFpbkhlYWRlci5vZmZzZXQ7ICAvLyBvZmZzZXQgb2YgZmlyc3QgQ0VOIGhlYWRlclxyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBlbnRyeUxpc3QubGVuZ3RoOyBpKyspIHtcclxuXHJcblx0XHRcdHZhciB0bXAgPSBpbmRleCxcclxuXHRcdFx0XHRlbnRyeSA9IG5ldyBaaXBFbnRyeShpbkJ1ZmZlcik7XHJcblx0XHRcdGVudHJ5LmhlYWRlciA9IGluQnVmZmVyLnNsaWNlKHRtcCwgdG1wICs9IFV0aWxzLkNvbnN0YW50cy5DRU5IRFIpO1xyXG5cclxuXHRcdFx0ZW50cnkuZW50cnlOYW1lID0gaW5CdWZmZXIuc2xpY2UodG1wLCB0bXAgKz0gZW50cnkuaGVhZGVyLmZpbGVOYW1lTGVuZ3RoKTtcclxuXHJcblx0XHRcdGlmIChlbnRyeS5oZWFkZXIuZXh0cmFMZW5ndGgpIHtcclxuXHRcdFx0XHRlbnRyeS5leHRyYSA9IGluQnVmZmVyLnNsaWNlKHRtcCwgdG1wICs9IGVudHJ5LmhlYWRlci5leHRyYUxlbmd0aCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChlbnRyeS5oZWFkZXIuY29tbWVudExlbmd0aClcclxuXHRcdFx0XHRlbnRyeS5jb21tZW50ID0gaW5CdWZmZXIuc2xpY2UodG1wLCB0bXAgKyBlbnRyeS5oZWFkZXIuY29tbWVudExlbmd0aCk7XHJcblxyXG5cdFx0XHRpbmRleCArPSBlbnRyeS5oZWFkZXIuZW50cnlIZWFkZXJTaXplO1xyXG5cclxuXHRcdFx0ZW50cnlMaXN0W2ldID0gZW50cnk7XHJcblx0XHRcdGVudHJ5VGFibGVbZW50cnkuZW50cnlOYW1lXSA9IGVudHJ5O1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gcmVhZE1haW5IZWFkZXIoKSB7XHJcblx0XHR2YXIgaSA9IGluQnVmZmVyLmxlbmd0aCAtIFV0aWxzLkNvbnN0YW50cy5FTkRIRFIsIC8vIEVORCBoZWFkZXIgc2l6ZVxyXG5cdFx0XHRuID0gTWF0aC5tYXgoMCwgaSAtIDB4RkZGRiksIC8vIDB4RkZGRiBpcyB0aGUgbWF4IHppcCBmaWxlIGNvbW1lbnQgbGVuZ3RoXHJcblx0XHRcdGVuZE9mZnNldCA9IC0xOyAvLyBTdGFydCBvZmZzZXQgb2YgdGhlIEVORCBoZWFkZXJcclxuXHJcblx0XHRmb3IgKGk7IGkgPj0gbjsgaS0tKSB7XHJcblx0XHRcdGlmIChpbkJ1ZmZlcltpXSAhPT0gMHg1MCkgY29udGludWU7IC8vIHF1aWNrIGNoZWNrIHRoYXQgdGhlIGJ5dGUgaXMgJ1AnXHJcblx0XHRcdGlmIChpbkJ1ZmZlci5yZWFkVUludDMyTEUoaSkgPT09IFV0aWxzLkNvbnN0YW50cy5FTkRTSUcpIHsgLy8gXCJQS1xcMDA1XFwwMDZcIlxyXG5cdFx0XHRcdGVuZE9mZnNldCA9IGk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGlmICghfmVuZE9mZnNldClcclxuXHRcdFx0dGhyb3cgVXRpbHMuRXJyb3JzLklOVkFMSURfRk9STUFUO1xyXG5cclxuXHRcdG1haW5IZWFkZXIubG9hZEZyb21CaW5hcnkoaW5CdWZmZXIuc2xpY2UoZW5kT2Zmc2V0LCBlbmRPZmZzZXQgKyBVdGlscy5Db25zdGFudHMuRU5ESERSKSk7XHJcblx0XHRpZiAobWFpbkhlYWRlci5jb21tZW50TGVuZ3RoKSB7XHJcblx0XHRcdF9jb21tZW50ID0gaW5CdWZmZXIuc2xpY2UoZW5kT2Zmc2V0ICsgVXRpbHMuQ29uc3RhbnRzLkVOREhEUik7XHJcblx0XHR9XHJcblx0XHRyZWFkRW50cmllcygpO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIHtcclxuXHRcdC8qKlxyXG5cdFx0ICogUmV0dXJucyBhbiBhcnJheSBvZiBaaXBFbnRyeSBvYmplY3RzIGV4aXN0ZW50IGluIHRoZSBjdXJyZW50IG9wZW5lZCBhcmNoaXZlXHJcblx0XHQgKiBAcmV0dXJuIEFycmF5XHJcblx0XHQgKi9cclxuXHRcdGdldCBlbnRyaWVzKCkge1xyXG5cdFx0XHRyZXR1cm4gZW50cnlMaXN0O1xyXG5cdFx0fSxcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEFyY2hpdmUgY29tbWVudFxyXG5cdFx0ICogQHJldHVybiB7U3RyaW5nfVxyXG5cdFx0ICovXHJcblx0XHRnZXQgY29tbWVudCgpIHtcclxuXHRcdFx0cmV0dXJuIF9jb21tZW50LnRvU3RyaW5nKCk7XHJcblx0XHR9LFxyXG5cdFx0c2V0IGNvbW1lbnQodmFsKSB7XHJcblx0XHRcdG1haW5IZWFkZXIuY29tbWVudExlbmd0aCA9IHZhbC5sZW5ndGg7XHJcblx0XHRcdF9jb21tZW50ID0gdmFsO1xyXG5cdFx0fSxcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFJldHVybnMgYSByZWZlcmVuY2UgdG8gdGhlIGVudHJ5IHdpdGggdGhlIGdpdmVuIG5hbWUgb3IgbnVsbCBpZiBlbnRyeSBpcyBpbmV4aXN0ZW50XHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIGVudHJ5TmFtZVxyXG5cdFx0ICogQHJldHVybiBaaXBFbnRyeVxyXG5cdFx0ICovXHJcblx0XHRnZXRFbnRyeTogZnVuY3Rpb24gKC8qU3RyaW5nKi9lbnRyeU5hbWUpIHtcclxuXHRcdFx0cmV0dXJuIGVudHJ5VGFibGVbZW50cnlOYW1lXSB8fCBudWxsO1xyXG5cdFx0fSxcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEFkZHMgdGhlIGdpdmVuIGVudHJ5IHRvIHRoZSBlbnRyeSBsaXN0XHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIGVudHJ5XHJcblx0XHQgKi9cclxuXHRcdHNldEVudHJ5OiBmdW5jdGlvbiAoLypaaXBFbnRyeSovZW50cnkpIHtcclxuXHRcdFx0ZW50cnlMaXN0LnB1c2goZW50cnkpO1xyXG5cdFx0XHRlbnRyeVRhYmxlW2VudHJ5LmVudHJ5TmFtZV0gPSBlbnRyeTtcclxuXHRcdFx0bWFpbkhlYWRlci50b3RhbEVudHJpZXMgPSBlbnRyeUxpc3QubGVuZ3RoO1xyXG5cdFx0fSxcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFJlbW92ZXMgdGhlIGVudHJ5IHdpdGggdGhlIGdpdmVuIG5hbWUgZnJvbSB0aGUgZW50cnkgbGlzdC5cclxuXHRcdCAqXHJcblx0XHQgKiBJZiB0aGUgZW50cnkgaXMgYSBkaXJlY3RvcnksIHRoZW4gYWxsIG5lc3RlZCBmaWxlcyBhbmQgZGlyZWN0b3JpZXMgd2lsbCBiZSByZW1vdmVkXHJcblx0XHQgKiBAcGFyYW0gZW50cnlOYW1lXHJcblx0XHQgKi9cclxuXHRcdGRlbGV0ZUVudHJ5OiBmdW5jdGlvbiAoLypTdHJpbmcqL2VudHJ5TmFtZSkge1xyXG5cdFx0XHR2YXIgZW50cnkgPSBlbnRyeVRhYmxlW2VudHJ5TmFtZV07XHJcblx0XHRcdGlmIChlbnRyeSAmJiBlbnRyeS5pc0RpcmVjdG9yeSkge1xyXG5cdFx0XHRcdHZhciBfc2VsZiA9IHRoaXM7XHJcblx0XHRcdFx0dGhpcy5nZXRFbnRyeUNoaWxkcmVuKGVudHJ5KS5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZCkge1xyXG5cdFx0XHRcdFx0aWYgKGNoaWxkLmVudHJ5TmFtZSAhPT0gZW50cnlOYW1lKSB7XHJcblx0XHRcdFx0XHRcdF9zZWxmLmRlbGV0ZUVudHJ5KGNoaWxkLmVudHJ5TmFtZSlcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9XHJcblx0XHRcdGVudHJ5TGlzdC5zcGxpY2UoZW50cnlMaXN0LmluZGV4T2YoZW50cnkpLCAxKTtcclxuXHRcdFx0ZGVsZXRlKGVudHJ5VGFibGVbZW50cnlOYW1lXSk7XHJcblx0XHRcdG1haW5IZWFkZXIudG90YWxFbnRyaWVzID0gZW50cnlMaXN0Lmxlbmd0aDtcclxuXHRcdH0sXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiAgSXRlcmF0ZXMgYW5kIHJldHVybnMgYWxsIG5lc3RlZCBmaWxlcyBhbmQgZGlyZWN0b3JpZXMgb2YgdGhlIGdpdmVuIGVudHJ5XHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIGVudHJ5XHJcblx0XHQgKiBAcmV0dXJuIEFycmF5XHJcblx0XHQgKi9cclxuXHRcdGdldEVudHJ5Q2hpbGRyZW46IGZ1bmN0aW9uICgvKlppcEVudHJ5Ki9lbnRyeSkge1xyXG5cdFx0XHRpZiAoZW50cnkuaXNEaXJlY3RvcnkpIHtcclxuXHRcdFx0XHR2YXIgbGlzdCA9IFtdLFxyXG5cdFx0XHRcdFx0bmFtZSA9IGVudHJ5LmVudHJ5TmFtZSxcclxuXHRcdFx0XHRcdGxlbiA9IG5hbWUubGVuZ3RoO1xyXG5cclxuXHRcdFx0XHRlbnRyeUxpc3QuZm9yRWFjaChmdW5jdGlvbiAoemlwRW50cnkpIHtcclxuXHRcdFx0XHRcdGlmICh6aXBFbnRyeS5lbnRyeU5hbWUuc3Vic3RyKDAsIGxlbikgPT09IG5hbWUpIHtcclxuXHRcdFx0XHRcdFx0bGlzdC5wdXNoKHppcEVudHJ5KTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRyZXR1cm4gbGlzdDtcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gW11cclxuXHRcdH0sXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBSZXR1cm5zIHRoZSB6aXAgZmlsZVxyXG5cdFx0ICpcclxuXHRcdCAqIEByZXR1cm4gQnVmZmVyXHJcblx0XHQgKi9cclxuXHRcdGNvbXByZXNzVG9CdWZmZXI6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKGVudHJ5TGlzdC5sZW5ndGggPiAxKSB7XHJcblx0XHRcdFx0ZW50cnlMaXN0LnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcclxuXHRcdFx0XHRcdHZhciBuYW1lQSA9IGEuZW50cnlOYW1lLnRvTG93ZXJDYXNlKCk7XHJcblx0XHRcdFx0XHR2YXIgbmFtZUIgPSBiLmVudHJ5TmFtZS50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0XHRcdFx0aWYgKG5hbWVBIDwgbmFtZUIpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIC0xXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRpZiAobmFtZUEgPiBuYW1lQikge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gMVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0cmV0dXJuIDA7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciB0b3RhbFNpemUgPSAwLFxyXG5cdFx0XHRcdGRhdGFCbG9jayA9IFtdLFxyXG5cdFx0XHRcdGVudHJ5SGVhZGVycyA9IFtdLFxyXG5cdFx0XHRcdGRpbmRleCA9IDA7XHJcblxyXG5cdFx0XHRtYWluSGVhZGVyLnNpemUgPSAwO1xyXG5cdFx0XHRtYWluSGVhZGVyLm9mZnNldCA9IDA7XHJcblxyXG5cdFx0XHRlbnRyeUxpc3QuZm9yRWFjaChmdW5jdGlvbiAoZW50cnkpIHtcclxuXHRcdFx0XHQvLyBjb21wcmVzcyBkYXRhIGFuZCBzZXQgbG9jYWwgYW5kIGVudHJ5IGhlYWRlciBhY2NvcmRpbmdseS4gUmVhc29uIHdoeSBpcyBjYWxsZWQgZmlyc3RcclxuXHRcdFx0XHR2YXIgY29tcHJlc3NlZERhdGEgPSBlbnRyeS5nZXRDb21wcmVzc2VkRGF0YSgpO1xyXG5cdFx0XHRcdC8vIGRhdGEgaGVhZGVyXHJcblx0XHRcdFx0ZW50cnkuaGVhZGVyLm9mZnNldCA9IGRpbmRleDtcclxuXHRcdFx0XHR2YXIgZGF0YUhlYWRlciA9IGVudHJ5LmhlYWRlci5kYXRhSGVhZGVyVG9CaW5hcnkoKTtcclxuXHRcdFx0XHR2YXIgZW50cnlOYW1lTGVuID0gZW50cnkucmF3RW50cnlOYW1lLmxlbmd0aDtcclxuXHRcdFx0XHR2YXIgZXh0cmEgPSBlbnRyeS5leHRyYS50b1N0cmluZygpO1xyXG5cdFx0XHRcdHZhciBwb3N0SGVhZGVyID0gQnVmZmVyLmFsbG9jKGVudHJ5TmFtZUxlbiArIGV4dHJhLmxlbmd0aCk7XHJcblx0XHRcdFx0ZW50cnkucmF3RW50cnlOYW1lLmNvcHkocG9zdEhlYWRlciwgMCk7XHJcblx0XHRcdFx0cG9zdEhlYWRlci5maWxsKGV4dHJhLCBlbnRyeU5hbWVMZW4pO1xyXG5cclxuXHRcdFx0XHR2YXIgZGF0YUxlbmd0aCA9IGRhdGFIZWFkZXIubGVuZ3RoICsgcG9zdEhlYWRlci5sZW5ndGggKyBjb21wcmVzc2VkRGF0YS5sZW5ndGg7XHJcblxyXG5cdFx0XHRcdGRpbmRleCArPSBkYXRhTGVuZ3RoO1xyXG5cclxuXHRcdFx0XHRkYXRhQmxvY2sucHVzaChkYXRhSGVhZGVyKTtcclxuXHRcdFx0XHRkYXRhQmxvY2sucHVzaChwb3N0SGVhZGVyKTtcclxuXHRcdFx0XHRkYXRhQmxvY2sucHVzaChjb21wcmVzc2VkRGF0YSk7XHJcblxyXG5cdFx0XHRcdHZhciBlbnRyeUhlYWRlciA9IGVudHJ5LnBhY2tIZWFkZXIoKTtcclxuXHRcdFx0XHRlbnRyeUhlYWRlcnMucHVzaChlbnRyeUhlYWRlcik7XHJcblx0XHRcdFx0bWFpbkhlYWRlci5zaXplICs9IGVudHJ5SGVhZGVyLmxlbmd0aDtcclxuXHRcdFx0XHR0b3RhbFNpemUgKz0gKGRhdGFMZW5ndGggKyBlbnRyeUhlYWRlci5sZW5ndGgpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHRvdGFsU2l6ZSArPSBtYWluSGVhZGVyLm1haW5IZWFkZXJTaXplOyAvLyBhbHNvIGluY2x1ZGVzIHppcCBmaWxlIGNvbW1lbnQgbGVuZ3RoXHJcblx0XHRcdC8vIHBvaW50IHRvIGVuZCBvZiBkYXRhIGFuZCBiZWdpbm5pbmcgb2YgY2VudHJhbCBkaXJlY3RvcnkgZmlyc3QgcmVjb3JkXHJcblx0XHRcdG1haW5IZWFkZXIub2Zmc2V0ID0gZGluZGV4O1xyXG5cclxuXHRcdFx0ZGluZGV4ID0gMDtcclxuXHRcdFx0dmFyIG91dEJ1ZmZlciA9IEJ1ZmZlci5hbGxvYyh0b3RhbFNpemUpO1xyXG5cdFx0XHRkYXRhQmxvY2suZm9yRWFjaChmdW5jdGlvbiAoY29udGVudCkge1xyXG5cdFx0XHRcdGNvbnRlbnQuY29weShvdXRCdWZmZXIsIGRpbmRleCk7IC8vIHdyaXRlIGRhdGEgYmxvY2tzXHJcblx0XHRcdFx0ZGluZGV4ICs9IGNvbnRlbnQubGVuZ3RoO1xyXG5cdFx0XHR9KTtcclxuXHRcdFx0ZW50cnlIZWFkZXJzLmZvckVhY2goZnVuY3Rpb24gKGNvbnRlbnQpIHtcclxuXHRcdFx0XHRjb250ZW50LmNvcHkob3V0QnVmZmVyLCBkaW5kZXgpOyAvLyB3cml0ZSBjZW50cmFsIGRpcmVjdG9yeSBlbnRyaWVzXHJcblx0XHRcdFx0ZGluZGV4ICs9IGNvbnRlbnQubGVuZ3RoO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdHZhciBtaCA9IG1haW5IZWFkZXIudG9CaW5hcnkoKTtcclxuXHRcdFx0aWYgKF9jb21tZW50KSB7XHJcblx0XHRcdFx0X2NvbW1lbnQuY29weShtaCwgVXRpbHMuQ29uc3RhbnRzLkVOREhEUik7IC8vIGFkZCB6aXAgZmlsZSBjb21tZW50XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdG1oLmNvcHkob3V0QnVmZmVyLCBkaW5kZXgpOyAvLyB3cml0ZSBtYWluIGhlYWRlclxyXG5cclxuXHRcdFx0cmV0dXJuIG91dEJ1ZmZlclxyXG5cdFx0fSxcclxuXHJcblx0XHR0b0FzeW5jQnVmZmVyOiBmdW5jdGlvbiAoLypGdW5jdGlvbiovb25TdWNjZXNzLCAvKkZ1bmN0aW9uKi9vbkZhaWwsIC8qRnVuY3Rpb24qL29uSXRlbVN0YXJ0LCAvKkZ1bmN0aW9uKi9vbkl0ZW1FbmQpIHtcclxuXHRcdFx0aWYgKGVudHJ5TGlzdC5sZW5ndGggPiAxKSB7XHJcblx0XHRcdFx0ZW50cnlMaXN0LnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcclxuXHRcdFx0XHRcdHZhciBuYW1lQSA9IGEuZW50cnlOYW1lLnRvTG93ZXJDYXNlKCk7XHJcblx0XHRcdFx0XHR2YXIgbmFtZUIgPSBiLmVudHJ5TmFtZS50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0XHRcdFx0aWYgKG5hbWVBID4gbmFtZUIpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIC0xXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRpZiAobmFtZUEgPCBuYW1lQikge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gMVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0cmV0dXJuIDA7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciB0b3RhbFNpemUgPSAwLFxyXG5cdFx0XHRcdGRhdGFCbG9jayA9IFtdLFxyXG5cdFx0XHRcdGVudHJ5SGVhZGVycyA9IFtdLFxyXG5cdFx0XHRcdGRpbmRleCA9IDA7XHJcblxyXG5cdFx0XHRtYWluSGVhZGVyLnNpemUgPSAwO1xyXG5cdFx0XHRtYWluSGVhZGVyLm9mZnNldCA9IDA7XHJcblxyXG5cdFx0XHR2YXIgY29tcHJlc3MgPSBmdW5jdGlvbiAoZW50cnlMaXN0KSB7XHJcblx0XHRcdFx0dmFyIHNlbGYgPSBhcmd1bWVudHMuY2FsbGVlO1xyXG5cdFx0XHRcdGlmIChlbnRyeUxpc3QubGVuZ3RoKSB7XHJcblx0XHRcdFx0XHR2YXIgZW50cnkgPSBlbnRyeUxpc3QucG9wKCk7XHJcblx0XHRcdFx0XHR2YXIgbmFtZSA9IGVudHJ5LmVudHJ5TmFtZSArIGVudHJ5LmV4dHJhLnRvU3RyaW5nKCk7XHJcblx0XHRcdFx0XHRpZiAob25JdGVtU3RhcnQpIG9uSXRlbVN0YXJ0KG5hbWUpO1xyXG5cdFx0XHRcdFx0ZW50cnkuZ2V0Q29tcHJlc3NlZERhdGFBc3luYyhmdW5jdGlvbiAoY29tcHJlc3NlZERhdGEpIHtcclxuXHRcdFx0XHRcdFx0aWYgKG9uSXRlbUVuZCkgb25JdGVtRW5kKG5hbWUpO1xyXG5cclxuXHRcdFx0XHRcdFx0ZW50cnkuaGVhZGVyLm9mZnNldCA9IGRpbmRleDtcclxuXHRcdFx0XHRcdFx0Ly8gZGF0YSBoZWFkZXJcclxuXHRcdFx0XHRcdFx0dmFyIGRhdGFIZWFkZXIgPSBlbnRyeS5oZWFkZXIuZGF0YUhlYWRlclRvQmluYXJ5KCk7XHJcblx0XHRcdFx0XHRcdHZhciBwb3N0SGVhZGVyO1xyXG5cdFx0XHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0XHRcdHBvc3RIZWFkZXIgPSBCdWZmZXIuYWxsb2MobmFtZS5sZW5ndGgsIG5hbWUpOyAgLy8gdXNpbmcgYWxsb2Mgd2lsbCB3b3JrIG9uIG5vZGUgIDUueCtcclxuXHRcdFx0XHRcdFx0fSBjYXRjaChlKXtcclxuXHRcdFx0XHRcdFx0XHRwb3N0SGVhZGVyID0gbmV3IEJ1ZmZlcihuYW1lKTsgLy8gdXNlIGRlcHJlY2F0ZWQgbWV0aG9kIGlmIGFsbG9jIGZhaWxzLi4uXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0dmFyIGRhdGFMZW5ndGggPSBkYXRhSGVhZGVyLmxlbmd0aCArIHBvc3RIZWFkZXIubGVuZ3RoICsgY29tcHJlc3NlZERhdGEubGVuZ3RoO1xyXG5cclxuXHRcdFx0XHRcdFx0ZGluZGV4ICs9IGRhdGFMZW5ndGg7XHJcblxyXG5cdFx0XHRcdFx0XHRkYXRhQmxvY2sucHVzaChkYXRhSGVhZGVyKTtcclxuXHRcdFx0XHRcdFx0ZGF0YUJsb2NrLnB1c2gocG9zdEhlYWRlcik7XHJcblx0XHRcdFx0XHRcdGRhdGFCbG9jay5wdXNoKGNvbXByZXNzZWREYXRhKTtcclxuXHJcblx0XHRcdFx0XHRcdHZhciBlbnRyeUhlYWRlciA9IGVudHJ5LnBhY2tIZWFkZXIoKTtcclxuXHRcdFx0XHRcdFx0ZW50cnlIZWFkZXJzLnB1c2goZW50cnlIZWFkZXIpO1xyXG5cdFx0XHRcdFx0XHRtYWluSGVhZGVyLnNpemUgKz0gZW50cnlIZWFkZXIubGVuZ3RoO1xyXG5cdFx0XHRcdFx0XHR0b3RhbFNpemUgKz0gKGRhdGFMZW5ndGggKyBlbnRyeUhlYWRlci5sZW5ndGgpO1xyXG5cclxuXHRcdFx0XHRcdFx0aWYgKGVudHJ5TGlzdC5sZW5ndGgpIHtcclxuXHRcdFx0XHRcdFx0XHRzZWxmKGVudHJ5TGlzdCk7XHJcblx0XHRcdFx0XHRcdH0gZWxzZSB7XHJcblxyXG5cclxuXHRcdFx0XHRcdFx0XHR0b3RhbFNpemUgKz0gbWFpbkhlYWRlci5tYWluSGVhZGVyU2l6ZTsgLy8gYWxzbyBpbmNsdWRlcyB6aXAgZmlsZSBjb21tZW50IGxlbmd0aFxyXG5cdFx0XHRcdFx0XHRcdC8vIHBvaW50IHRvIGVuZCBvZiBkYXRhIGFuZCBiZWdpbm5pbmcgb2YgY2VudHJhbCBkaXJlY3RvcnkgZmlyc3QgcmVjb3JkXHJcblx0XHRcdFx0XHRcdFx0bWFpbkhlYWRlci5vZmZzZXQgPSBkaW5kZXg7XHJcblxyXG5cdFx0XHRcdFx0XHRcdGRpbmRleCA9IDA7XHJcblx0XHRcdFx0XHRcdFx0dmFyIG91dEJ1ZmZlciA9IEJ1ZmZlci5hbGxvYyh0b3RhbFNpemUpO1xyXG5cdFx0XHRcdFx0XHRcdGRhdGFCbG9jay5mb3JFYWNoKGZ1bmN0aW9uIChjb250ZW50KSB7XHJcblx0XHRcdFx0XHRcdFx0XHRjb250ZW50LmNvcHkob3V0QnVmZmVyLCBkaW5kZXgpOyAvLyB3cml0ZSBkYXRhIGJsb2Nrc1xyXG5cdFx0XHRcdFx0XHRcdFx0ZGluZGV4ICs9IGNvbnRlbnQubGVuZ3RoO1xyXG5cdFx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHRcdGVudHJ5SGVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uIChjb250ZW50KSB7XHJcblx0XHRcdFx0XHRcdFx0XHRjb250ZW50LmNvcHkob3V0QnVmZmVyLCBkaW5kZXgpOyAvLyB3cml0ZSBjZW50cmFsIGRpcmVjdG9yeSBlbnRyaWVzXHJcblx0XHRcdFx0XHRcdFx0XHRkaW5kZXggKz0gY29udGVudC5sZW5ndGg7XHJcblx0XHRcdFx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdFx0XHRcdHZhciBtaCA9IG1haW5IZWFkZXIudG9CaW5hcnkoKTtcclxuXHRcdFx0XHRcdFx0XHRpZiAoX2NvbW1lbnQpIHtcclxuXHRcdFx0XHRcdFx0XHRcdF9jb21tZW50LmNvcHkobWgsIFV0aWxzLkNvbnN0YW50cy5FTkRIRFIpOyAvLyBhZGQgemlwIGZpbGUgY29tbWVudFxyXG5cdFx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdFx0bWguY29weShvdXRCdWZmZXIsIGRpbmRleCk7IC8vIHdyaXRlIG1haW4gaGVhZGVyXHJcblxyXG5cdFx0XHRcdFx0XHRcdG9uU3VjY2VzcyhvdXRCdWZmZXIpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRjb21wcmVzcyhlbnRyeUxpc3QpO1xyXG5cdFx0fVxyXG5cdH1cclxufTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9heGlvcycpOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIHNldHRsZSA9IHJlcXVpcmUoJy4vLi4vY29yZS9zZXR0bGUnKTtcbnZhciBidWlsZFVSTCA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9idWlsZFVSTCcpO1xudmFyIGh0dHAgPSByZXF1aXJlKCdodHRwJyk7XG52YXIgaHR0cHMgPSByZXF1aXJlKCdodHRwcycpO1xudmFyIGh0dHBGb2xsb3cgPSByZXF1aXJlKCdmb2xsb3ctcmVkaXJlY3RzJykuaHR0cDtcbnZhciBodHRwc0ZvbGxvdyA9IHJlcXVpcmUoJ2ZvbGxvdy1yZWRpcmVjdHMnKS5odHRwcztcbnZhciB1cmwgPSByZXF1aXJlKCd1cmwnKTtcbnZhciB6bGliID0gcmVxdWlyZSgnemxpYicpO1xudmFyIHBrZyA9IHJlcXVpcmUoJy4vLi4vLi4vcGFja2FnZS5qc29uJyk7XG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuLi9jb3JlL2NyZWF0ZUVycm9yJyk7XG52YXIgZW5oYW5jZUVycm9yID0gcmVxdWlyZSgnLi4vY29yZS9lbmhhbmNlRXJyb3InKTtcblxudmFyIGlzSHR0cHMgPSAvaHR0cHM6Py87XG5cbi8qZXNsaW50IGNvbnNpc3RlbnQtcmV0dXJuOjAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBodHRwQWRhcHRlcihjb25maWcpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGRpc3BhdGNoSHR0cFJlcXVlc3QocmVzb2x2ZVByb21pc2UsIHJlamVjdFByb21pc2UpIHtcbiAgICB2YXIgdGltZXI7XG4gICAgdmFyIHJlc29sdmUgPSBmdW5jdGlvbiByZXNvbHZlKHZhbHVlKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgcmVzb2x2ZVByb21pc2UodmFsdWUpO1xuICAgIH07XG4gICAgdmFyIHJlamVjdCA9IGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgIHJlamVjdFByb21pc2UodmFsdWUpO1xuICAgIH07XG4gICAgdmFyIGRhdGEgPSBjb25maWcuZGF0YTtcbiAgICB2YXIgaGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzO1xuXG4gICAgLy8gU2V0IFVzZXItQWdlbnQgKHJlcXVpcmVkIGJ5IHNvbWUgc2VydmVycylcbiAgICAvLyBPbmx5IHNldCBoZWFkZXIgaWYgaXQgaGFzbid0IGJlZW4gc2V0IGluIGNvbmZpZ1xuICAgIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vYXhpb3MvYXhpb3MvaXNzdWVzLzY5XG4gICAgaWYgKCFoZWFkZXJzWydVc2VyLUFnZW50J10gJiYgIWhlYWRlcnNbJ3VzZXItYWdlbnQnXSkge1xuICAgICAgaGVhZGVyc1snVXNlci1BZ2VudCddID0gJ2F4aW9zLycgKyBwa2cudmVyc2lvbjtcbiAgICB9XG5cbiAgICBpZiAoZGF0YSAmJiAhdXRpbHMuaXNTdHJlYW0oZGF0YSkpIHtcbiAgICAgIGlmIChCdWZmZXIuaXNCdWZmZXIoZGF0YSkpIHtcbiAgICAgICAgLy8gTm90aGluZyB0byBkby4uLlxuICAgICAgfSBlbHNlIGlmICh1dGlscy5pc0FycmF5QnVmZmVyKGRhdGEpKSB7XG4gICAgICAgIGRhdGEgPSBCdWZmZXIuZnJvbShuZXcgVWludDhBcnJheShkYXRhKSk7XG4gICAgICB9IGVsc2UgaWYgKHV0aWxzLmlzU3RyaW5nKGRhdGEpKSB7XG4gICAgICAgIGRhdGEgPSBCdWZmZXIuZnJvbShkYXRhLCAndXRmLTgnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiByZWplY3QoY3JlYXRlRXJyb3IoXG4gICAgICAgICAgJ0RhdGEgYWZ0ZXIgdHJhbnNmb3JtYXRpb24gbXVzdCBiZSBhIHN0cmluZywgYW4gQXJyYXlCdWZmZXIsIGEgQnVmZmVyLCBvciBhIFN0cmVhbScsXG4gICAgICAgICAgY29uZmlnXG4gICAgICAgICkpO1xuICAgICAgfVxuXG4gICAgICAvLyBBZGQgQ29udGVudC1MZW5ndGggaGVhZGVyIGlmIGRhdGEgZXhpc3RzXG4gICAgICBoZWFkZXJzWydDb250ZW50LUxlbmd0aCddID0gZGF0YS5sZW5ndGg7XG4gICAgfVxuXG4gICAgLy8gSFRUUCBiYXNpYyBhdXRoZW50aWNhdGlvblxuICAgIHZhciBhdXRoID0gdW5kZWZpbmVkO1xuICAgIGlmIChjb25maWcuYXV0aCkge1xuICAgICAgdmFyIHVzZXJuYW1lID0gY29uZmlnLmF1dGgudXNlcm5hbWUgfHwgJyc7XG4gICAgICB2YXIgcGFzc3dvcmQgPSBjb25maWcuYXV0aC5wYXNzd29yZCB8fCAnJztcbiAgICAgIGF1dGggPSB1c2VybmFtZSArICc6JyArIHBhc3N3b3JkO1xuICAgIH1cblxuICAgIC8vIFBhcnNlIHVybFxuICAgIHZhciBwYXJzZWQgPSB1cmwucGFyc2UoY29uZmlnLnVybCk7XG4gICAgdmFyIHByb3RvY29sID0gcGFyc2VkLnByb3RvY29sIHx8ICdodHRwOic7XG5cbiAgICBpZiAoIWF1dGggJiYgcGFyc2VkLmF1dGgpIHtcbiAgICAgIHZhciB1cmxBdXRoID0gcGFyc2VkLmF1dGguc3BsaXQoJzonKTtcbiAgICAgIHZhciB1cmxVc2VybmFtZSA9IHVybEF1dGhbMF0gfHwgJyc7XG4gICAgICB2YXIgdXJsUGFzc3dvcmQgPSB1cmxBdXRoWzFdIHx8ICcnO1xuICAgICAgYXV0aCA9IHVybFVzZXJuYW1lICsgJzonICsgdXJsUGFzc3dvcmQ7XG4gICAgfVxuXG4gICAgaWYgKGF1dGgpIHtcbiAgICAgIGRlbGV0ZSBoZWFkZXJzLkF1dGhvcml6YXRpb247XG4gICAgfVxuXG4gICAgdmFyIGlzSHR0cHNSZXF1ZXN0ID0gaXNIdHRwcy50ZXN0KHByb3RvY29sKTtcbiAgICB2YXIgYWdlbnQgPSBpc0h0dHBzUmVxdWVzdCA/IGNvbmZpZy5odHRwc0FnZW50IDogY29uZmlnLmh0dHBBZ2VudDtcblxuICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgcGF0aDogYnVpbGRVUkwocGFyc2VkLnBhdGgsIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKS5yZXBsYWNlKC9eXFw/LywgJycpLFxuICAgICAgbWV0aG9kOiBjb25maWcubWV0aG9kLnRvVXBwZXJDYXNlKCksXG4gICAgICBoZWFkZXJzOiBoZWFkZXJzLFxuICAgICAgYWdlbnQ6IGFnZW50LFxuICAgICAgYXV0aDogYXV0aFxuICAgIH07XG5cbiAgICBpZiAoY29uZmlnLnNvY2tldFBhdGgpIHtcbiAgICAgIG9wdGlvbnMuc29ja2V0UGF0aCA9IGNvbmZpZy5zb2NrZXRQYXRoO1xuICAgIH0gZWxzZSB7XG4gICAgICBvcHRpb25zLmhvc3RuYW1lID0gcGFyc2VkLmhvc3RuYW1lO1xuICAgICAgb3B0aW9ucy5wb3J0ID0gcGFyc2VkLnBvcnQ7XG4gICAgfVxuXG4gICAgdmFyIHByb3h5ID0gY29uZmlnLnByb3h5O1xuICAgIGlmICghcHJveHkgJiYgcHJveHkgIT09IGZhbHNlKSB7XG4gICAgICB2YXIgcHJveHlFbnYgPSBwcm90b2NvbC5zbGljZSgwLCAtMSkgKyAnX3Byb3h5JztcbiAgICAgIHZhciBwcm94eVVybCA9IHByb2Nlc3MuZW52W3Byb3h5RW52XSB8fCBwcm9jZXNzLmVudltwcm94eUVudi50b1VwcGVyQ2FzZSgpXTtcbiAgICAgIGlmIChwcm94eVVybCkge1xuICAgICAgICB2YXIgcGFyc2VkUHJveHlVcmwgPSB1cmwucGFyc2UocHJveHlVcmwpO1xuICAgICAgICB2YXIgbm9Qcm94eUVudiA9IHByb2Nlc3MuZW52Lm5vX3Byb3h5IHx8IHByb2Nlc3MuZW52Lk5PX1BST1hZO1xuICAgICAgICB2YXIgc2hvdWxkUHJveHkgPSB0cnVlO1xuXG4gICAgICAgIGlmIChub1Byb3h5RW52KSB7XG4gICAgICAgICAgdmFyIG5vUHJveHkgPSBub1Byb3h5RW52LnNwbGl0KCcsJykubWFwKGZ1bmN0aW9uIHRyaW0ocykge1xuICAgICAgICAgICAgcmV0dXJuIHMudHJpbSgpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgc2hvdWxkUHJveHkgPSAhbm9Qcm94eS5zb21lKGZ1bmN0aW9uIHByb3h5TWF0Y2gocHJveHlFbGVtZW50KSB7XG4gICAgICAgICAgICBpZiAoIXByb3h5RWxlbWVudCkge1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocHJveHlFbGVtZW50ID09PSAnKicpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocHJveHlFbGVtZW50WzBdID09PSAnLicgJiZcbiAgICAgICAgICAgICAgICBwYXJzZWQuaG9zdG5hbWUuc3Vic3RyKHBhcnNlZC5ob3N0bmFtZS5sZW5ndGggLSBwcm94eUVsZW1lbnQubGVuZ3RoKSA9PT0gcHJveHlFbGVtZW50ICYmXG4gICAgICAgICAgICAgICAgcHJveHlFbGVtZW50Lm1hdGNoKC9cXC4vZykubGVuZ3RoID09PSBwYXJzZWQuaG9zdG5hbWUubWF0Y2goL1xcLi9nKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBwYXJzZWQuaG9zdG5hbWUgPT09IHByb3h5RWxlbWVudDtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgaWYgKHNob3VsZFByb3h5KSB7XG4gICAgICAgICAgcHJveHkgPSB7XG4gICAgICAgICAgICBob3N0OiBwYXJzZWRQcm94eVVybC5ob3N0bmFtZSxcbiAgICAgICAgICAgIHBvcnQ6IHBhcnNlZFByb3h5VXJsLnBvcnRcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgaWYgKHBhcnNlZFByb3h5VXJsLmF1dGgpIHtcbiAgICAgICAgICAgIHZhciBwcm94eVVybEF1dGggPSBwYXJzZWRQcm94eVVybC5hdXRoLnNwbGl0KCc6Jyk7XG4gICAgICAgICAgICBwcm94eS5hdXRoID0ge1xuICAgICAgICAgICAgICB1c2VybmFtZTogcHJveHlVcmxBdXRoWzBdLFxuICAgICAgICAgICAgICBwYXNzd29yZDogcHJveHlVcmxBdXRoWzFdXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwcm94eSkge1xuICAgICAgb3B0aW9ucy5ob3N0bmFtZSA9IHByb3h5Lmhvc3Q7XG4gICAgICBvcHRpb25zLmhvc3QgPSBwcm94eS5ob3N0O1xuICAgICAgb3B0aW9ucy5oZWFkZXJzLmhvc3QgPSBwYXJzZWQuaG9zdG5hbWUgKyAocGFyc2VkLnBvcnQgPyAnOicgKyBwYXJzZWQucG9ydCA6ICcnKTtcbiAgICAgIG9wdGlvbnMucG9ydCA9IHByb3h5LnBvcnQ7XG4gICAgICBvcHRpb25zLnBhdGggPSBwcm90b2NvbCArICcvLycgKyBwYXJzZWQuaG9zdG5hbWUgKyAocGFyc2VkLnBvcnQgPyAnOicgKyBwYXJzZWQucG9ydCA6ICcnKSArIG9wdGlvbnMucGF0aDtcblxuICAgICAgLy8gQmFzaWMgcHJveHkgYXV0aG9yaXphdGlvblxuICAgICAgaWYgKHByb3h5LmF1dGgpIHtcbiAgICAgICAgdmFyIGJhc2U2NCA9IEJ1ZmZlci5mcm9tKHByb3h5LmF1dGgudXNlcm5hbWUgKyAnOicgKyBwcm94eS5hdXRoLnBhc3N3b3JkLCAndXRmOCcpLnRvU3RyaW5nKCdiYXNlNjQnKTtcbiAgICAgICAgb3B0aW9ucy5oZWFkZXJzWydQcm94eS1BdXRob3JpemF0aW9uJ10gPSAnQmFzaWMgJyArIGJhc2U2NDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgdHJhbnNwb3J0O1xuICAgIHZhciBpc0h0dHBzUHJveHkgPSBpc0h0dHBzUmVxdWVzdCAmJiAocHJveHkgPyBpc0h0dHBzLnRlc3QocHJveHkucHJvdG9jb2wpIDogdHJ1ZSk7XG4gICAgaWYgKGNvbmZpZy50cmFuc3BvcnQpIHtcbiAgICAgIHRyYW5zcG9ydCA9IGNvbmZpZy50cmFuc3BvcnQ7XG4gICAgfSBlbHNlIGlmIChjb25maWcubWF4UmVkaXJlY3RzID09PSAwKSB7XG4gICAgICB0cmFuc3BvcnQgPSBpc0h0dHBzUHJveHkgPyBodHRwcyA6IGh0dHA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChjb25maWcubWF4UmVkaXJlY3RzKSB7XG4gICAgICAgIG9wdGlvbnMubWF4UmVkaXJlY3RzID0gY29uZmlnLm1heFJlZGlyZWN0cztcbiAgICAgIH1cbiAgICAgIHRyYW5zcG9ydCA9IGlzSHR0cHNQcm94eSA/IGh0dHBzRm9sbG93IDogaHR0cEZvbGxvdztcbiAgICB9XG5cbiAgICBpZiAoY29uZmlnLm1heENvbnRlbnRMZW5ndGggJiYgY29uZmlnLm1heENvbnRlbnRMZW5ndGggPiAtMSkge1xuICAgICAgb3B0aW9ucy5tYXhCb2R5TGVuZ3RoID0gY29uZmlnLm1heENvbnRlbnRMZW5ndGg7XG4gICAgfVxuXG4gICAgLy8gQ3JlYXRlIHRoZSByZXF1ZXN0XG4gICAgdmFyIHJlcSA9IHRyYW5zcG9ydC5yZXF1ZXN0KG9wdGlvbnMsIGZ1bmN0aW9uIGhhbmRsZVJlc3BvbnNlKHJlcykge1xuICAgICAgaWYgKHJlcS5hYm9ydGVkKSByZXR1cm47XG5cbiAgICAgIC8vIHVuY29tcHJlc3MgdGhlIHJlc3BvbnNlIGJvZHkgdHJhbnNwYXJlbnRseSBpZiByZXF1aXJlZFxuICAgICAgdmFyIHN0cmVhbSA9IHJlcztcbiAgICAgIHN3aXRjaCAocmVzLmhlYWRlcnNbJ2NvbnRlbnQtZW5jb2RpbmcnXSkge1xuICAgICAgLyplc2xpbnQgZGVmYXVsdC1jYXNlOjAqL1xuICAgICAgY2FzZSAnZ3ppcCc6XG4gICAgICBjYXNlICdjb21wcmVzcyc6XG4gICAgICBjYXNlICdkZWZsYXRlJzpcbiAgICAgICAgLy8gYWRkIHRoZSB1bnppcHBlciB0byB0aGUgYm9keSBzdHJlYW0gcHJvY2Vzc2luZyBwaXBlbGluZVxuICAgICAgICBzdHJlYW0gPSAocmVzLnN0YXR1c0NvZGUgPT09IDIwNCkgPyBzdHJlYW0gOiBzdHJlYW0ucGlwZSh6bGliLmNyZWF0ZVVuemlwKCkpO1xuXG4gICAgICAgIC8vIHJlbW92ZSB0aGUgY29udGVudC1lbmNvZGluZyBpbiBvcmRlciB0byBub3QgY29uZnVzZSBkb3duc3RyZWFtIG9wZXJhdGlvbnNcbiAgICAgICAgZGVsZXRlIHJlcy5oZWFkZXJzWydjb250ZW50LWVuY29kaW5nJ107XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICAvLyByZXR1cm4gdGhlIGxhc3QgcmVxdWVzdCBpbiBjYXNlIG9mIHJlZGlyZWN0c1xuICAgICAgdmFyIGxhc3RSZXF1ZXN0ID0gcmVzLnJlcSB8fCByZXE7XG5cbiAgICAgIHZhciByZXNwb25zZSA9IHtcbiAgICAgICAgc3RhdHVzOiByZXMuc3RhdHVzQ29kZSxcbiAgICAgICAgc3RhdHVzVGV4dDogcmVzLnN0YXR1c01lc3NhZ2UsXG4gICAgICAgIGhlYWRlcnM6IHJlcy5oZWFkZXJzLFxuICAgICAgICBjb25maWc6IGNvbmZpZyxcbiAgICAgICAgcmVxdWVzdDogbGFzdFJlcXVlc3RcbiAgICAgIH07XG5cbiAgICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlID09PSAnc3RyZWFtJykge1xuICAgICAgICByZXNwb25zZS5kYXRhID0gc3RyZWFtO1xuICAgICAgICBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcmVzcG9uc2VCdWZmZXIgPSBbXTtcbiAgICAgICAgc3RyZWFtLm9uKCdkYXRhJywgZnVuY3Rpb24gaGFuZGxlU3RyZWFtRGF0YShjaHVuaykge1xuICAgICAgICAgIHJlc3BvbnNlQnVmZmVyLnB1c2goY2h1bmspO1xuXG4gICAgICAgICAgLy8gbWFrZSBzdXJlIHRoZSBjb250ZW50IGxlbmd0aCBpcyBub3Qgb3ZlciB0aGUgbWF4Q29udGVudExlbmd0aCBpZiBzcGVjaWZpZWRcbiAgICAgICAgICBpZiAoY29uZmlnLm1heENvbnRlbnRMZW5ndGggPiAtMSAmJiBCdWZmZXIuY29uY2F0KHJlc3BvbnNlQnVmZmVyKS5sZW5ndGggPiBjb25maWcubWF4Q29udGVudExlbmd0aCkge1xuICAgICAgICAgICAgc3RyZWFtLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHJlamVjdChjcmVhdGVFcnJvcignbWF4Q29udGVudExlbmd0aCBzaXplIG9mICcgKyBjb25maWcubWF4Q29udGVudExlbmd0aCArICcgZXhjZWVkZWQnLFxuICAgICAgICAgICAgICBjb25maWcsIG51bGwsIGxhc3RSZXF1ZXN0KSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBzdHJlYW0ub24oJ2Vycm9yJywgZnVuY3Rpb24gaGFuZGxlU3RyZWFtRXJyb3IoZXJyKSB7XG4gICAgICAgICAgaWYgKHJlcS5hYm9ydGVkKSByZXR1cm47XG4gICAgICAgICAgcmVqZWN0KGVuaGFuY2VFcnJvcihlcnIsIGNvbmZpZywgbnVsbCwgbGFzdFJlcXVlc3QpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc3RyZWFtLm9uKCdlbmQnLCBmdW5jdGlvbiBoYW5kbGVTdHJlYW1FbmQoKSB7XG4gICAgICAgICAgdmFyIHJlc3BvbnNlRGF0YSA9IEJ1ZmZlci5jb25jYXQocmVzcG9uc2VCdWZmZXIpO1xuICAgICAgICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlICE9PSAnYXJyYXlidWZmZXInKSB7XG4gICAgICAgICAgICByZXNwb25zZURhdGEgPSByZXNwb25zZURhdGEudG9TdHJpbmcoY29uZmlnLnJlc3BvbnNlRW5jb2RpbmcpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJlc3BvbnNlLmRhdGEgPSByZXNwb25zZURhdGE7XG4gICAgICAgICAgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIEhhbmRsZSBlcnJvcnNcbiAgICByZXEub24oJ2Vycm9yJywgZnVuY3Rpb24gaGFuZGxlUmVxdWVzdEVycm9yKGVycikge1xuICAgICAgaWYgKHJlcS5hYm9ydGVkKSByZXR1cm47XG4gICAgICByZWplY3QoZW5oYW5jZUVycm9yKGVyciwgY29uZmlnLCBudWxsLCByZXEpKTtcbiAgICB9KTtcblxuICAgIC8vIEhhbmRsZSByZXF1ZXN0IHRpbWVvdXRcbiAgICBpZiAoY29uZmlnLnRpbWVvdXQpIHtcbiAgICAgIHRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiBoYW5kbGVSZXF1ZXN0VGltZW91dCgpIHtcbiAgICAgICAgcmVxLmFib3J0KCk7XG4gICAgICAgIHJlamVjdChjcmVhdGVFcnJvcigndGltZW91dCBvZiAnICsgY29uZmlnLnRpbWVvdXQgKyAnbXMgZXhjZWVkZWQnLCBjb25maWcsICdFQ09OTkFCT1JURUQnLCByZXEpKTtcbiAgICAgIH0sIGNvbmZpZy50aW1lb3V0KTtcbiAgICB9XG5cbiAgICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgICAvLyBIYW5kbGUgY2FuY2VsbGF0aW9uXG4gICAgICBjb25maWcuY2FuY2VsVG9rZW4ucHJvbWlzZS50aGVuKGZ1bmN0aW9uIG9uQ2FuY2VsZWQoY2FuY2VsKSB7XG4gICAgICAgIGlmIChyZXEuYWJvcnRlZCkgcmV0dXJuO1xuXG4gICAgICAgIHJlcS5hYm9ydCgpO1xuICAgICAgICByZWplY3QoY2FuY2VsKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIFNlbmQgdGhlIHJlcXVlc3RcbiAgICBpZiAodXRpbHMuaXNTdHJlYW0oZGF0YSkpIHtcbiAgICAgIGRhdGEub24oJ2Vycm9yJywgZnVuY3Rpb24gaGFuZGxlU3RyZWFtRXJyb3IoZXJyKSB7XG4gICAgICAgIHJlamVjdChlbmhhbmNlRXJyb3IoZXJyLCBjb25maWcsIG51bGwsIHJlcSkpO1xuICAgICAgfSkucGlwZShyZXEpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXEuZW5kKGRhdGEpO1xuICAgIH1cbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgc2V0dGxlID0gcmVxdWlyZSgnLi8uLi9jb3JlL3NldHRsZScpO1xudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2J1aWxkVVJMJyk7XG52YXIgcGFyc2VIZWFkZXJzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL3BhcnNlSGVhZGVycycpO1xudmFyIGlzVVJMU2FtZU9yaWdpbiA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9pc1VSTFNhbWVPcmlnaW4nKTtcbnZhciBjcmVhdGVFcnJvciA9IHJlcXVpcmUoJy4uL2NvcmUvY3JlYXRlRXJyb3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB4aHJBZGFwdGVyKGNvbmZpZykge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gZGlzcGF0Y2hYaHJSZXF1ZXN0KHJlc29sdmUsIHJlamVjdCkge1xuICAgIHZhciByZXF1ZXN0RGF0YSA9IGNvbmZpZy5kYXRhO1xuICAgIHZhciByZXF1ZXN0SGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzO1xuXG4gICAgaWYgKHV0aWxzLmlzRm9ybURhdGEocmVxdWVzdERhdGEpKSB7XG4gICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddOyAvLyBMZXQgdGhlIGJyb3dzZXIgc2V0IGl0XG4gICAgfVxuXG4gICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgIC8vIEhUVFAgYmFzaWMgYXV0aGVudGljYXRpb25cbiAgICBpZiAoY29uZmlnLmF1dGgpIHtcbiAgICAgIHZhciB1c2VybmFtZSA9IGNvbmZpZy5hdXRoLnVzZXJuYW1lIHx8ICcnO1xuICAgICAgdmFyIHBhc3N3b3JkID0gY29uZmlnLmF1dGgucGFzc3dvcmQgfHwgJyc7XG4gICAgICByZXF1ZXN0SGVhZGVycy5BdXRob3JpemF0aW9uID0gJ0Jhc2ljICcgKyBidG9hKHVzZXJuYW1lICsgJzonICsgcGFzc3dvcmQpO1xuICAgIH1cblxuICAgIHJlcXVlc3Qub3Blbihjb25maWcubWV0aG9kLnRvVXBwZXJDYXNlKCksIGJ1aWxkVVJMKGNvbmZpZy51cmwsIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKSwgdHJ1ZSk7XG5cbiAgICAvLyBTZXQgdGhlIHJlcXVlc3QgdGltZW91dCBpbiBNU1xuICAgIHJlcXVlc3QudGltZW91dCA9IGNvbmZpZy50aW1lb3V0O1xuXG4gICAgLy8gTGlzdGVuIGZvciByZWFkeSBzdGF0ZVxuICAgIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gaGFuZGxlTG9hZCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCB8fCByZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBUaGUgcmVxdWVzdCBlcnJvcmVkIG91dCBhbmQgd2UgZGlkbid0IGdldCBhIHJlc3BvbnNlLCB0aGlzIHdpbGwgYmVcbiAgICAgIC8vIGhhbmRsZWQgYnkgb25lcnJvciBpbnN0ZWFkXG4gICAgICAvLyBXaXRoIG9uZSBleGNlcHRpb246IHJlcXVlc3QgdGhhdCB1c2luZyBmaWxlOiBwcm90b2NvbCwgbW9zdCBicm93c2Vyc1xuICAgICAgLy8gd2lsbCByZXR1cm4gc3RhdHVzIGFzIDAgZXZlbiB0aG91Z2ggaXQncyBhIHN1Y2Nlc3NmdWwgcmVxdWVzdFxuICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID09PSAwICYmICEocmVxdWVzdC5yZXNwb25zZVVSTCAmJiByZXF1ZXN0LnJlc3BvbnNlVVJMLmluZGV4T2YoJ2ZpbGU6JykgPT09IDApKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gUHJlcGFyZSB0aGUgcmVzcG9uc2VcbiAgICAgIHZhciByZXNwb25zZUhlYWRlcnMgPSAnZ2V0QWxsUmVzcG9uc2VIZWFkZXJzJyBpbiByZXF1ZXN0ID8gcGFyc2VIZWFkZXJzKHJlcXVlc3QuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpIDogbnVsbDtcbiAgICAgIHZhciByZXNwb25zZURhdGEgPSAhY29uZmlnLnJlc3BvbnNlVHlwZSB8fCBjb25maWcucmVzcG9uc2VUeXBlID09PSAndGV4dCcgPyByZXF1ZXN0LnJlc3BvbnNlVGV4dCA6IHJlcXVlc3QucmVzcG9uc2U7XG4gICAgICB2YXIgcmVzcG9uc2UgPSB7XG4gICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgc3RhdHVzOiByZXF1ZXN0LnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogcmVxdWVzdC5zdGF0dXNUZXh0LFxuICAgICAgICBoZWFkZXJzOiByZXNwb25zZUhlYWRlcnMsXG4gICAgICAgIGNvbmZpZzogY29uZmlnLFxuICAgICAgICByZXF1ZXN0OiByZXF1ZXN0XG4gICAgICB9O1xuXG4gICAgICBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgYnJvd3NlciByZXF1ZXN0IGNhbmNlbGxhdGlvbiAoYXMgb3Bwb3NlZCB0byBhIG1hbnVhbCBjYW5jZWxsYXRpb24pXG4gICAgcmVxdWVzdC5vbmFib3J0ID0gZnVuY3Rpb24gaGFuZGxlQWJvcnQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ1JlcXVlc3QgYWJvcnRlZCcsIGNvbmZpZywgJ0VDT05OQUJPUlRFRCcsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSBsb3cgbGV2ZWwgbmV0d29yayBlcnJvcnNcbiAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiBoYW5kbGVFcnJvcigpIHtcbiAgICAgIC8vIFJlYWwgZXJyb3JzIGFyZSBoaWRkZW4gZnJvbSB1cyBieSB0aGUgYnJvd3NlclxuICAgICAgLy8gb25lcnJvciBzaG91bGQgb25seSBmaXJlIGlmIGl0J3MgYSBuZXR3b3JrIGVycm9yXG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ05ldHdvcmsgRXJyb3InLCBjb25maWcsIG51bGwsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSB0aW1lb3V0XG4gICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge1xuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCd0aW1lb3V0IG9mICcgKyBjb25maWcudGltZW91dCArICdtcyBleGNlZWRlZCcsIGNvbmZpZywgJ0VDT05OQUJPUlRFRCcsXG4gICAgICAgIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEFkZCB4c3JmIGhlYWRlclxuICAgIC8vIFRoaXMgaXMgb25seSBkb25lIGlmIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50LlxuICAgIC8vIFNwZWNpZmljYWxseSBub3QgaWYgd2UncmUgaW4gYSB3ZWIgd29ya2VyLCBvciByZWFjdC1uYXRpdmUuXG4gICAgaWYgKHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkpIHtcbiAgICAgIHZhciBjb29raWVzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2Nvb2tpZXMnKTtcblxuICAgICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgICB2YXIgeHNyZlZhbHVlID0gKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMgfHwgaXNVUkxTYW1lT3JpZ2luKGNvbmZpZy51cmwpKSAmJiBjb25maWcueHNyZkNvb2tpZU5hbWUgP1xuICAgICAgICBjb29raWVzLnJlYWQoY29uZmlnLnhzcmZDb29raWVOYW1lKSA6XG4gICAgICAgIHVuZGVmaW5lZDtcblxuICAgICAgaWYgKHhzcmZWYWx1ZSkge1xuICAgICAgICByZXF1ZXN0SGVhZGVyc1tjb25maWcueHNyZkhlYWRlck5hbWVdID0geHNyZlZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFkZCBoZWFkZXJzIHRvIHRoZSByZXF1ZXN0XG4gICAgaWYgKCdzZXRSZXF1ZXN0SGVhZGVyJyBpbiByZXF1ZXN0KSB7XG4gICAgICB1dGlscy5mb3JFYWNoKHJlcXVlc3RIZWFkZXJzLCBmdW5jdGlvbiBzZXRSZXF1ZXN0SGVhZGVyKHZhbCwga2V5KSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVxdWVzdERhdGEgPT09ICd1bmRlZmluZWQnICYmIGtleS50b0xvd2VyQ2FzZSgpID09PSAnY29udGVudC10eXBlJykge1xuICAgICAgICAgIC8vIFJlbW92ZSBDb250ZW50LVR5cGUgaWYgZGF0YSBpcyB1bmRlZmluZWRcbiAgICAgICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNba2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBPdGhlcndpc2UgYWRkIGhlYWRlciB0byB0aGUgcmVxdWVzdFxuICAgICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihrZXksIHZhbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEFkZCB3aXRoQ3JlZGVudGlhbHMgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAoY29uZmlnLndpdGhDcmVkZW50aWFscykge1xuICAgICAgcmVxdWVzdC53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIEFkZCByZXNwb25zZVR5cGUgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAoY29uZmlnLnJlc3BvbnNlVHlwZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSBjb25maWcucmVzcG9uc2VUeXBlO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBFeHBlY3RlZCBET01FeGNlcHRpb24gdGhyb3duIGJ5IGJyb3dzZXJzIG5vdCBjb21wYXRpYmxlIFhNTEh0dHBSZXF1ZXN0IExldmVsIDIuXG4gICAgICAgIC8vIEJ1dCwgdGhpcyBjYW4gYmUgc3VwcHJlc3NlZCBmb3IgJ2pzb24nIHR5cGUgYXMgaXQgY2FuIGJlIHBhcnNlZCBieSBkZWZhdWx0ICd0cmFuc2Zvcm1SZXNwb25zZScgZnVuY3Rpb24uXG4gICAgICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlICE9PSAnanNvbicpIHtcbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIHByb2dyZXNzIGlmIG5lZWRlZFxuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgIC8vIE5vdCBhbGwgYnJvd3NlcnMgc3VwcG9ydCB1cGxvYWQgZXZlbnRzXG4gICAgaWYgKHR5cGVvZiBjb25maWcub25VcGxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJyAmJiByZXF1ZXN0LnVwbG9hZCkge1xuICAgICAgcmVxdWVzdC51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25VcGxvYWRQcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgICAgLy8gSGFuZGxlIGNhbmNlbGxhdGlvblxuICAgICAgY29uZmlnLmNhbmNlbFRva2VuLnByb21pc2UudGhlbihmdW5jdGlvbiBvbkNhbmNlbGVkKGNhbmNlbCkge1xuICAgICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZXF1ZXN0LmFib3J0KCk7XG4gICAgICAgIHJlamVjdChjYW5jZWwpO1xuICAgICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHJlcXVlc3REYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJlcXVlc3REYXRhID0gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBTZW5kIHRoZSByZXF1ZXN0XG4gICAgcmVxdWVzdC5zZW5kKHJlcXVlc3REYXRhKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG52YXIgQXhpb3MgPSByZXF1aXJlKCcuL2NvcmUvQXhpb3MnKTtcbnZhciBtZXJnZUNvbmZpZyA9IHJlcXVpcmUoJy4vY29yZS9tZXJnZUNvbmZpZycpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi9kZWZhdWx0cycpO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZWZhdWx0Q29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKiBAcmV0dXJuIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdENvbmZpZykge1xuICB2YXIgY29udGV4dCA9IG5ldyBBeGlvcyhkZWZhdWx0Q29uZmlnKTtcbiAgdmFyIGluc3RhbmNlID0gYmluZChBeGlvcy5wcm90b3R5cGUucmVxdWVzdCwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBheGlvcy5wcm90b3R5cGUgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBBeGlvcy5wcm90b3R5cGUsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgY29udGV4dCB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIGNvbnRleHQpO1xuXG4gIHJldHVybiBpbnN0YW5jZTtcbn1cblxuLy8gQ3JlYXRlIHRoZSBkZWZhdWx0IGluc3RhbmNlIHRvIGJlIGV4cG9ydGVkXG52YXIgYXhpb3MgPSBjcmVhdGVJbnN0YW5jZShkZWZhdWx0cyk7XG5cbi8vIEV4cG9zZSBBeGlvcyBjbGFzcyB0byBhbGxvdyBjbGFzcyBpbmhlcml0YW5jZVxuYXhpb3MuQXhpb3MgPSBBeGlvcztcblxuLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgbmV3IGluc3RhbmNlc1xuYXhpb3MuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGluc3RhbmNlQ29uZmlnKSB7XG4gIHJldHVybiBjcmVhdGVJbnN0YW5jZShtZXJnZUNvbmZpZyhheGlvcy5kZWZhdWx0cywgaW5zdGFuY2VDb25maWcpKTtcbn07XG5cbi8vIEV4cG9zZSBDYW5jZWwgJiBDYW5jZWxUb2tlblxuYXhpb3MuQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsJyk7XG5heGlvcy5DYW5jZWxUb2tlbiA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbFRva2VuJyk7XG5heGlvcy5pc0NhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL2lzQ2FuY2VsJyk7XG5cbi8vIEV4cG9zZSBhbGwvc3ByZWFkXG5heGlvcy5hbGwgPSBmdW5jdGlvbiBhbGwocHJvbWlzZXMpIHtcbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbn07XG5heGlvcy5zcHJlYWQgPSByZXF1aXJlKCcuL2hlbHBlcnMvc3ByZWFkJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gYXhpb3M7XG5cbi8vIEFsbG93IHVzZSBvZiBkZWZhdWx0IGltcG9ydCBzeW50YXggaW4gVHlwZVNjcmlwdFxubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGF4aW9zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEEgYENhbmNlbGAgaXMgYW4gb2JqZWN0IHRoYXQgaXMgdGhyb3duIHdoZW4gYW4gb3BlcmF0aW9uIGlzIGNhbmNlbGVkLlxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtzdHJpbmc9fSBtZXNzYWdlIFRoZSBtZXNzYWdlLlxuICovXG5mdW5jdGlvbiBDYW5jZWwobWVzc2FnZSkge1xuICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xufVxuXG5DYW5jZWwucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHJldHVybiAnQ2FuY2VsJyArICh0aGlzLm1lc3NhZ2UgPyAnOiAnICsgdGhpcy5tZXNzYWdlIDogJycpO1xufTtcblxuQ2FuY2VsLnByb3RvdHlwZS5fX0NBTkNFTF9fID0gdHJ1ZTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWw7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBDYW5jZWwgPSByZXF1aXJlKCcuL0NhbmNlbCcpO1xuXG4vKipcbiAqIEEgYENhbmNlbFRva2VuYCBpcyBhbiBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCB0byByZXF1ZXN0IGNhbmNlbGxhdGlvbiBvZiBhbiBvcGVyYXRpb24uXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBleGVjdXRvciBUaGUgZXhlY3V0b3IgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIENhbmNlbFRva2VuKGV4ZWN1dG9yKSB7XG4gIGlmICh0eXBlb2YgZXhlY3V0b3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdleGVjdXRvciBtdXN0IGJlIGEgZnVuY3Rpb24uJyk7XG4gIH1cblxuICB2YXIgcmVzb2x2ZVByb21pc2U7XG4gIHRoaXMucHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIHByb21pc2VFeGVjdXRvcihyZXNvbHZlKSB7XG4gICAgcmVzb2x2ZVByb21pc2UgPSByZXNvbHZlO1xuICB9KTtcblxuICB2YXIgdG9rZW4gPSB0aGlzO1xuICBleGVjdXRvcihmdW5jdGlvbiBjYW5jZWwobWVzc2FnZSkge1xuICAgIGlmICh0b2tlbi5yZWFzb24pIHtcbiAgICAgIC8vIENhbmNlbGxhdGlvbiBoYXMgYWxyZWFkeSBiZWVuIHJlcXVlc3RlZFxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRva2VuLnJlYXNvbiA9IG5ldyBDYW5jZWwobWVzc2FnZSk7XG4gICAgcmVzb2x2ZVByb21pc2UodG9rZW4ucmVhc29uKTtcbiAgfSk7XG59XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuQ2FuY2VsVG9rZW4ucHJvdG90eXBlLnRocm93SWZSZXF1ZXN0ZWQgPSBmdW5jdGlvbiB0aHJvd0lmUmVxdWVzdGVkKCkge1xuICBpZiAodGhpcy5yZWFzb24pIHtcbiAgICB0aHJvdyB0aGlzLnJlYXNvbjtcbiAgfVxufTtcblxuLyoqXG4gKiBSZXR1cm5zIGFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIGEgbmV3IGBDYW5jZWxUb2tlbmAgYW5kIGEgZnVuY3Rpb24gdGhhdCwgd2hlbiBjYWxsZWQsXG4gKiBjYW5jZWxzIHRoZSBgQ2FuY2VsVG9rZW5gLlxuICovXG5DYW5jZWxUb2tlbi5zb3VyY2UgPSBmdW5jdGlvbiBzb3VyY2UoKSB7XG4gIHZhciBjYW5jZWw7XG4gIHZhciB0b2tlbiA9IG5ldyBDYW5jZWxUb2tlbihmdW5jdGlvbiBleGVjdXRvcihjKSB7XG4gICAgY2FuY2VsID0gYztcbiAgfSk7XG4gIHJldHVybiB7XG4gICAgdG9rZW46IHRva2VuLFxuICAgIGNhbmNlbDogY2FuY2VsXG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbFRva2VuO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQ2FuY2VsKHZhbHVlKSB7XG4gIHJldHVybiAhISh2YWx1ZSAmJiB2YWx1ZS5fX0NBTkNFTF9fKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciBidWlsZFVSTCA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvYnVpbGRVUkwnKTtcbnZhciBJbnRlcmNlcHRvck1hbmFnZXIgPSByZXF1aXJlKCcuL0ludGVyY2VwdG9yTWFuYWdlcicpO1xudmFyIGRpc3BhdGNoUmVxdWVzdCA9IHJlcXVpcmUoJy4vZGlzcGF0Y2hSZXF1ZXN0Jyk7XG52YXIgbWVyZ2VDb25maWcgPSByZXF1aXJlKCcuL21lcmdlQ29uZmlnJyk7XG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlQ29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKi9cbmZ1bmN0aW9uIEF4aW9zKGluc3RhbmNlQ29uZmlnKSB7XG4gIHRoaXMuZGVmYXVsdHMgPSBpbnN0YW5jZUNvbmZpZztcbiAgdGhpcy5pbnRlcmNlcHRvcnMgPSB7XG4gICAgcmVxdWVzdDogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpLFxuICAgIHJlc3BvbnNlOiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKClcbiAgfTtcbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcgc3BlY2lmaWMgZm9yIHRoaXMgcmVxdWVzdCAobWVyZ2VkIHdpdGggdGhpcy5kZWZhdWx0cylcbiAqL1xuQXhpb3MucHJvdG90eXBlLnJlcXVlc3QgPSBmdW5jdGlvbiByZXF1ZXN0KGNvbmZpZykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgLy8gQWxsb3cgZm9yIGF4aW9zKCdleGFtcGxlL3VybCdbLCBjb25maWddKSBhIGxhIGZldGNoIEFQSVxuICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICBjb25maWcgPSBhcmd1bWVudHNbMV0gfHwge307XG4gICAgY29uZmlnLnVybCA9IGFyZ3VtZW50c1swXTtcbiAgfSBlbHNlIHtcbiAgICBjb25maWcgPSBjb25maWcgfHwge307XG4gIH1cblxuICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuICBjb25maWcubWV0aG9kID0gY29uZmlnLm1ldGhvZCA/IGNvbmZpZy5tZXRob2QudG9Mb3dlckNhc2UoKSA6ICdnZXQnO1xuXG4gIC8vIEhvb2sgdXAgaW50ZXJjZXB0b3JzIG1pZGRsZXdhcmVcbiAgdmFyIGNoYWluID0gW2Rpc3BhdGNoUmVxdWVzdCwgdW5kZWZpbmVkXTtcbiAgdmFyIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoY29uZmlnKTtcblxuICB0aGlzLmludGVyY2VwdG9ycy5yZXF1ZXN0LmZvckVhY2goZnVuY3Rpb24gdW5zaGlmdFJlcXVlc3RJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICBjaGFpbi51bnNoaWZ0KGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcblxuICB0aGlzLmludGVyY2VwdG9ycy5yZXNwb25zZS5mb3JFYWNoKGZ1bmN0aW9uIHB1c2hSZXNwb25zZUludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIGNoYWluLnB1c2goaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuXG4gIHdoaWxlIChjaGFpbi5sZW5ndGgpIHtcbiAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKGNoYWluLnNoaWZ0KCksIGNoYWluLnNoaWZ0KCkpO1xuICB9XG5cbiAgcmV0dXJuIHByb21pc2U7XG59O1xuXG5BeGlvcy5wcm90b3R5cGUuZ2V0VXJpID0gZnVuY3Rpb24gZ2V0VXJpKGNvbmZpZykge1xuICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuICByZXR1cm4gYnVpbGRVUkwoY29uZmlnLnVybCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpLnJlcGxhY2UoL15cXD8vLCAnJyk7XG59O1xuXG4vLyBQcm92aWRlIGFsaWFzZXMgZm9yIHN1cHBvcnRlZCByZXF1ZXN0IG1ldGhvZHNcbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAnb3B0aW9ucyddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHVybCwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCh1dGlscy5tZXJnZShjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgdXJsOiB1cmxcbiAgICB9KSk7XG4gIH07XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGRhdGEsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QodXRpbHMubWVyZ2UoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogdXJsLFxuICAgICAgZGF0YTogZGF0YVxuICAgIH0pKTtcbiAgfTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEF4aW9zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIEludGVyY2VwdG9yTWFuYWdlcigpIHtcbiAgdGhpcy5oYW5kbGVycyA9IFtdO1xufVxuXG4vKipcbiAqIEFkZCBhIG5ldyBpbnRlcmNlcHRvciB0byB0aGUgc3RhY2tcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdWxmaWxsZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgdGhlbmAgZm9yIGEgYFByb21pc2VgXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3RlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGByZWplY3RgIGZvciBhIGBQcm9taXNlYFxuICpcbiAqIEByZXR1cm4ge051bWJlcn0gQW4gSUQgdXNlZCB0byByZW1vdmUgaW50ZXJjZXB0b3IgbGF0ZXJcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS51c2UgPSBmdW5jdGlvbiB1c2UoZnVsZmlsbGVkLCByZWplY3RlZCkge1xuICB0aGlzLmhhbmRsZXJzLnB1c2goe1xuICAgIGZ1bGZpbGxlZDogZnVsZmlsbGVkLFxuICAgIHJlamVjdGVkOiByZWplY3RlZFxuICB9KTtcbiAgcmV0dXJuIHRoaXMuaGFuZGxlcnMubGVuZ3RoIC0gMTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIGFuIGludGVyY2VwdG9yIGZyb20gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGlkIFRoZSBJRCB0aGF0IHdhcyByZXR1cm5lZCBieSBgdXNlYFxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmVqZWN0ID0gZnVuY3Rpb24gZWplY3QoaWQpIHtcbiAgaWYgKHRoaXMuaGFuZGxlcnNbaWRdKSB7XG4gICAgdGhpcy5oYW5kbGVyc1tpZF0gPSBudWxsO1xuICB9XG59O1xuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbGwgdGhlIHJlZ2lzdGVyZWQgaW50ZXJjZXB0b3JzXG4gKlxuICogVGhpcyBtZXRob2QgaXMgcGFydGljdWxhcmx5IHVzZWZ1bCBmb3Igc2tpcHBpbmcgb3ZlciBhbnlcbiAqIGludGVyY2VwdG9ycyB0aGF0IG1heSBoYXZlIGJlY29tZSBgbnVsbGAgY2FsbGluZyBgZWplY3RgLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIGludGVyY2VwdG9yXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIGZvckVhY2goZm4pIHtcbiAgdXRpbHMuZm9yRWFjaCh0aGlzLmhhbmRsZXJzLCBmdW5jdGlvbiBmb3JFYWNoSGFuZGxlcihoKSB7XG4gICAgaWYgKGggIT09IG51bGwpIHtcbiAgICAgIGZuKGgpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEludGVyY2VwdG9yTWFuYWdlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGVuaGFuY2VFcnJvciA9IHJlcXVpcmUoJy4vZW5oYW5jZUVycm9yJyk7XG5cbi8qKlxuICogQ3JlYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBtZXNzYWdlLCBjb25maWcsIGVycm9yIGNvZGUsIHJlcXVlc3QgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIFRoZSBlcnJvciBtZXNzYWdlLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3BvbnNlXSBUaGUgcmVzcG9uc2UuXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBjcmVhdGVkIGVycm9yLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZUVycm9yKG1lc3NhZ2UsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgdmFyIGVycm9yID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xuICByZXR1cm4gZW5oYW5jZUVycm9yKGVycm9yLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciB0cmFuc2Zvcm1EYXRhID0gcmVxdWlyZSgnLi90cmFuc2Zvcm1EYXRhJyk7XG52YXIgaXNDYW5jZWwgPSByZXF1aXJlKCcuLi9jYW5jZWwvaXNDYW5jZWwnKTtcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4uL2RlZmF1bHRzJyk7XG52YXIgaXNBYnNvbHV0ZVVSTCA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9pc0Fic29sdXRlVVJMJyk7XG52YXIgY29tYmluZVVSTHMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvY29tYmluZVVSTHMnKTtcblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICovXG5mdW5jdGlvbiB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZykge1xuICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgY29uZmlnLmNhbmNlbFRva2VuLnRocm93SWZSZXF1ZXN0ZWQoKTtcbiAgfVxufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdCB0byB0aGUgc2VydmVyIHVzaW5nIHRoZSBjb25maWd1cmVkIGFkYXB0ZXIuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHRoYXQgaXMgdG8gYmUgdXNlZCBmb3IgdGhlIHJlcXVlc3RcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgUHJvbWlzZSB0byBiZSBmdWxmaWxsZWRcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkaXNwYXRjaFJlcXVlc3QoY29uZmlnKSB7XG4gIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAvLyBTdXBwb3J0IGJhc2VVUkwgY29uZmlnXG4gIGlmIChjb25maWcuYmFzZVVSTCAmJiAhaXNBYnNvbHV0ZVVSTChjb25maWcudXJsKSkge1xuICAgIGNvbmZpZy51cmwgPSBjb21iaW5lVVJMcyhjb25maWcuYmFzZVVSTCwgY29uZmlnLnVybCk7XG4gIH1cblxuICAvLyBFbnN1cmUgaGVhZGVycyBleGlzdFxuICBjb25maWcuaGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzIHx8IHt9O1xuXG4gIC8vIFRyYW5zZm9ybSByZXF1ZXN0IGRhdGFcbiAgY29uZmlnLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgIGNvbmZpZy5kYXRhLFxuICAgIGNvbmZpZy5oZWFkZXJzLFxuICAgIGNvbmZpZy50cmFuc2Zvcm1SZXF1ZXN0XG4gICk7XG5cbiAgLy8gRmxhdHRlbiBoZWFkZXJzXG4gIGNvbmZpZy5oZWFkZXJzID0gdXRpbHMubWVyZ2UoXG4gICAgY29uZmlnLmhlYWRlcnMuY29tbW9uIHx8IHt9LFxuICAgIGNvbmZpZy5oZWFkZXJzW2NvbmZpZy5tZXRob2RdIHx8IHt9LFxuICAgIGNvbmZpZy5oZWFkZXJzIHx8IHt9XG4gICk7XG5cbiAgdXRpbHMuZm9yRWFjaChcbiAgICBbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdwb3N0JywgJ3B1dCcsICdwYXRjaCcsICdjb21tb24nXSxcbiAgICBmdW5jdGlvbiBjbGVhbkhlYWRlckNvbmZpZyhtZXRob2QpIHtcbiAgICAgIGRlbGV0ZSBjb25maWcuaGVhZGVyc1ttZXRob2RdO1xuICAgIH1cbiAgKTtcblxuICB2YXIgYWRhcHRlciA9IGNvbmZpZy5hZGFwdGVyIHx8IGRlZmF1bHRzLmFkYXB0ZXI7XG5cbiAgcmV0dXJuIGFkYXB0ZXIoY29uZmlnKS50aGVuKGZ1bmN0aW9uIG9uQWRhcHRlclJlc29sdXRpb24ocmVzcG9uc2UpIHtcbiAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgIHJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgICAgcmVzcG9uc2UuZGF0YSxcbiAgICAgIHJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2VcbiAgICApO1xuXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9LCBmdW5jdGlvbiBvbkFkYXB0ZXJSZWplY3Rpb24ocmVhc29uKSB7XG4gICAgaWYgKCFpc0NhbmNlbChyZWFzb24pKSB7XG4gICAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgICBpZiAocmVhc29uICYmIHJlYXNvbi5yZXNwb25zZSkge1xuICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEsXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlYXNvbik7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVcGRhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIGNvbmZpZywgZXJyb3IgY29kZSwgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVycm9yIFRoZSBlcnJvciB0byB1cGRhdGUuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGVycm9yLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGVuaGFuY2VFcnJvcihlcnJvciwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICBlcnJvci5jb25maWcgPSBjb25maWc7XG4gIGlmIChjb2RlKSB7XG4gICAgZXJyb3IuY29kZSA9IGNvZGU7XG4gIH1cblxuICBlcnJvci5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgZXJyb3IucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgZXJyb3IuaXNBeGlvc0Vycm9yID0gdHJ1ZTtcblxuICBlcnJvci50b0pTT04gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLy8gU3RhbmRhcmRcbiAgICAgIG1lc3NhZ2U6IHRoaXMubWVzc2FnZSxcbiAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgIC8vIE1pY3Jvc29mdFxuICAgICAgZGVzY3JpcHRpb246IHRoaXMuZGVzY3JpcHRpb24sXG4gICAgICBudW1iZXI6IHRoaXMubnVtYmVyLFxuICAgICAgLy8gTW96aWxsYVxuICAgICAgZmlsZU5hbWU6IHRoaXMuZmlsZU5hbWUsXG4gICAgICBsaW5lTnVtYmVyOiB0aGlzLmxpbmVOdW1iZXIsXG4gICAgICBjb2x1bW5OdW1iZXI6IHRoaXMuY29sdW1uTnVtYmVyLFxuICAgICAgc3RhY2s6IHRoaXMuc3RhY2ssXG4gICAgICAvLyBBeGlvc1xuICAgICAgY29uZmlnOiB0aGlzLmNvbmZpZyxcbiAgICAgIGNvZGU6IHRoaXMuY29kZVxuICAgIH07XG4gIH07XG4gIHJldHVybiBlcnJvcjtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbi8qKlxuICogQ29uZmlnLXNwZWNpZmljIG1lcmdlLWZ1bmN0aW9uIHdoaWNoIGNyZWF0ZXMgYSBuZXcgY29uZmlnLW9iamVjdFxuICogYnkgbWVyZ2luZyB0d28gY29uZmlndXJhdGlvbiBvYmplY3RzIHRvZ2V0aGVyLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcxXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMlxuICogQHJldHVybnMge09iamVjdH0gTmV3IG9iamVjdCByZXN1bHRpbmcgZnJvbSBtZXJnaW5nIGNvbmZpZzIgdG8gY29uZmlnMVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1lcmdlQ29uZmlnKGNvbmZpZzEsIGNvbmZpZzIpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIGNvbmZpZzIgPSBjb25maWcyIHx8IHt9O1xuICB2YXIgY29uZmlnID0ge307XG5cbiAgdXRpbHMuZm9yRWFjaChbJ3VybCcsICdtZXRob2QnLCAncGFyYW1zJywgJ2RhdGEnXSwgZnVuY3Rpb24gdmFsdWVGcm9tQ29uZmlnMihwcm9wKSB7XG4gICAgaWYgKHR5cGVvZiBjb25maWcyW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnW3Byb3BdID0gY29uZmlnMltwcm9wXTtcbiAgICB9XG4gIH0pO1xuXG4gIHV0aWxzLmZvckVhY2goWydoZWFkZXJzJywgJ2F1dGgnLCAncHJveHknXSwgZnVuY3Rpb24gbWVyZ2VEZWVwUHJvcGVydGllcyhwcm9wKSB7XG4gICAgaWYgKHV0aWxzLmlzT2JqZWN0KGNvbmZpZzJbcHJvcF0pKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSB1dGlscy5kZWVwTWVyZ2UoY29uZmlnMVtwcm9wXSwgY29uZmlnMltwcm9wXSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgY29uZmlnMltwcm9wXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbmZpZ1twcm9wXSA9IGNvbmZpZzJbcHJvcF07XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc09iamVjdChjb25maWcxW3Byb3BdKSkge1xuICAgICAgY29uZmlnW3Byb3BdID0gdXRpbHMuZGVlcE1lcmdlKGNvbmZpZzFbcHJvcF0pO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGNvbmZpZzFbcHJvcF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25maWdbcHJvcF0gPSBjb25maWcxW3Byb3BdO1xuICAgIH1cbiAgfSk7XG5cbiAgdXRpbHMuZm9yRWFjaChbXG4gICAgJ2Jhc2VVUkwnLCAndHJhbnNmb3JtUmVxdWVzdCcsICd0cmFuc2Zvcm1SZXNwb25zZScsICdwYXJhbXNTZXJpYWxpemVyJyxcbiAgICAndGltZW91dCcsICd3aXRoQ3JlZGVudGlhbHMnLCAnYWRhcHRlcicsICdyZXNwb25zZVR5cGUnLCAneHNyZkNvb2tpZU5hbWUnLFxuICAgICd4c3JmSGVhZGVyTmFtZScsICdvblVwbG9hZFByb2dyZXNzJywgJ29uRG93bmxvYWRQcm9ncmVzcycsICdtYXhDb250ZW50TGVuZ3RoJyxcbiAgICAndmFsaWRhdGVTdGF0dXMnLCAnbWF4UmVkaXJlY3RzJywgJ2h0dHBBZ2VudCcsICdodHRwc0FnZW50JywgJ2NhbmNlbFRva2VuJyxcbiAgICAnc29ja2V0UGF0aCdcbiAgXSwgZnVuY3Rpb24gZGVmYXVsdFRvQ29uZmlnMihwcm9wKSB7XG4gICAgaWYgKHR5cGVvZiBjb25maWcyW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnW3Byb3BdID0gY29uZmlnMltwcm9wXTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb25maWcxW3Byb3BdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uZmlnW3Byb3BdID0gY29uZmlnMVtwcm9wXTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBjb25maWc7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuL2NyZWF0ZUVycm9yJyk7XG5cbi8qKlxuICogUmVzb2x2ZSBvciByZWplY3QgYSBQcm9taXNlIGJhc2VkIG9uIHJlc3BvbnNlIHN0YXR1cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlIEEgZnVuY3Rpb24gdGhhdCByZXNvbHZlcyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdCBBIGZ1bmN0aW9uIHRoYXQgcmVqZWN0cyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2UuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpIHtcbiAgdmFyIHZhbGlkYXRlU3RhdHVzID0gcmVzcG9uc2UuY29uZmlnLnZhbGlkYXRlU3RhdHVzO1xuICBpZiAoIXZhbGlkYXRlU3RhdHVzIHx8IHZhbGlkYXRlU3RhdHVzKHJlc3BvbnNlLnN0YXR1cykpIHtcbiAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgfSBlbHNlIHtcbiAgICByZWplY3QoY3JlYXRlRXJyb3IoXG4gICAgICAnUmVxdWVzdCBmYWlsZWQgd2l0aCBzdGF0dXMgY29kZSAnICsgcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgcmVzcG9uc2UuY29uZmlnLFxuICAgICAgbnVsbCxcbiAgICAgIHJlc3BvbnNlLnJlcXVlc3QsXG4gICAgICByZXNwb25zZVxuICAgICkpO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbi8qKlxuICogVHJhbnNmb3JtIHRoZSBkYXRhIGZvciBhIHJlcXVlc3Qgb3IgYSByZXNwb25zZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gZGF0YSBUaGUgZGF0YSB0byBiZSB0cmFuc2Zvcm1lZFxuICogQHBhcmFtIHtBcnJheX0gaGVhZGVycyBUaGUgaGVhZGVycyBmb3IgdGhlIHJlcXVlc3Qgb3IgcmVzcG9uc2VcbiAqIEBwYXJhbSB7QXJyYXl8RnVuY3Rpb259IGZucyBBIHNpbmdsZSBmdW5jdGlvbiBvciBBcnJheSBvZiBmdW5jdGlvbnNcbiAqIEByZXR1cm5zIHsqfSBUaGUgcmVzdWx0aW5nIHRyYW5zZm9ybWVkIGRhdGFcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0cmFuc2Zvcm1EYXRhKGRhdGEsIGhlYWRlcnMsIGZucykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgdXRpbHMuZm9yRWFjaChmbnMsIGZ1bmN0aW9uIHRyYW5zZm9ybShmbikge1xuICAgIGRhdGEgPSBmbihkYXRhLCBoZWFkZXJzKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGRhdGE7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgbm9ybWFsaXplSGVhZGVyTmFtZSA9IHJlcXVpcmUoJy4vaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lJyk7XG5cbnZhciBERUZBVUxUX0NPTlRFTlRfVFlQRSA9IHtcbiAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG59O1xuXG5mdW5jdGlvbiBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgdmFsdWUpIHtcbiAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzKSAmJiB1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzWydDb250ZW50LVR5cGUnXSkpIHtcbiAgICBoZWFkZXJzWydDb250ZW50LVR5cGUnXSA9IHZhbHVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldERlZmF1bHRBZGFwdGVyKCkge1xuICB2YXIgYWRhcHRlcjtcbiAgLy8gT25seSBOb2RlLkpTIGhhcyBhIHByb2Nlc3MgdmFyaWFibGUgdGhhdCBpcyBvZiBbW0NsYXNzXV0gcHJvY2Vzc1xuICBpZiAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChwcm9jZXNzKSA9PT0gJ1tvYmplY3QgcHJvY2Vzc10nKSB7XG4gICAgLy8gRm9yIG5vZGUgdXNlIEhUVFAgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuL2FkYXB0ZXJzL2h0dHAnKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gRm9yIGJyb3dzZXJzIHVzZSBYSFIgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuL2FkYXB0ZXJzL3hocicpO1xuICB9XG4gIHJldHVybiBhZGFwdGVyO1xufVxuXG52YXIgZGVmYXVsdHMgPSB7XG4gIGFkYXB0ZXI6IGdldERlZmF1bHRBZGFwdGVyKCksXG5cbiAgdHJhbnNmb3JtUmVxdWVzdDogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlcXVlc3QoZGF0YSwgaGVhZGVycykge1xuICAgIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgJ0FjY2VwdCcpO1xuICAgIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgJ0NvbnRlbnQtVHlwZScpO1xuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0FycmF5QnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0J1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNTdHJlYW0oZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzRmlsZShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCbG9iKGRhdGEpXG4gICAgKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXJWaWV3KGRhdGEpKSB7XG4gICAgICByZXR1cm4gZGF0YS5idWZmZXI7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIGRhdGEudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzT2JqZWN0KGRhdGEpKSB7XG4gICAgICBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgdHJhbnNmb3JtUmVzcG9uc2U6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXNwb25zZShkYXRhKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7IC8qIElnbm9yZSAqLyB9XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICAvKipcbiAgICogQSB0aW1lb3V0IGluIG1pbGxpc2Vjb25kcyB0byBhYm9ydCBhIHJlcXVlc3QuIElmIHNldCB0byAwIChkZWZhdWx0KSBhXG4gICAqIHRpbWVvdXQgaXMgbm90IGNyZWF0ZWQuXG4gICAqL1xuICB0aW1lb3V0OiAwLFxuXG4gIHhzcmZDb29raWVOYW1lOiAnWFNSRi1UT0tFTicsXG4gIHhzcmZIZWFkZXJOYW1lOiAnWC1YU1JGLVRPS0VOJyxcblxuICBtYXhDb250ZW50TGVuZ3RoOiAtMSxcblxuICB2YWxpZGF0ZVN0YXR1czogZnVuY3Rpb24gdmFsaWRhdGVTdGF0dXMoc3RhdHVzKSB7XG4gICAgcmV0dXJuIHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwO1xuICB9XG59O1xuXG5kZWZhdWx0cy5oZWFkZXJzID0ge1xuICBjb21tb246IHtcbiAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKidcbiAgfVxufTtcblxudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB7fTtcbn0pO1xuXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB1dGlscy5tZXJnZShERUZBVUxUX0NPTlRFTlRfVFlQRSk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBkZWZhdWx0cztcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBiaW5kKGZuLCB0aGlzQXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKCkge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBlbmNvZGUodmFsKSB7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodmFsKS5cbiAgICByZXBsYWNlKC8lNDAvZ2ksICdAJykuXG4gICAgcmVwbGFjZSgvJTNBL2dpLCAnOicpLlxuICAgIHJlcGxhY2UoLyUyNC9nLCAnJCcpLlxuICAgIHJlcGxhY2UoLyUyQy9naSwgJywnKS5cbiAgICByZXBsYWNlKC8lMjAvZywgJysnKS5cbiAgICByZXBsYWNlKC8lNUIvZ2ksICdbJykuXG4gICAgcmVwbGFjZSgvJTVEL2dpLCAnXScpO1xufVxuXG4vKipcbiAqIEJ1aWxkIGEgVVJMIGJ5IGFwcGVuZGluZyBwYXJhbXMgdG8gdGhlIGVuZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIGJhc2Ugb2YgdGhlIHVybCAoZS5nLiwgaHR0cDovL3d3dy5nb29nbGUuY29tKVxuICogQHBhcmFtIHtvYmplY3R9IFtwYXJhbXNdIFRoZSBwYXJhbXMgdG8gYmUgYXBwZW5kZWRcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgdXJsXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGRVUkwodXJsLCBwYXJhbXMsIHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIGlmICghcGFyYW1zKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIHZhciBzZXJpYWxpemVkUGFyYW1zO1xuICBpZiAocGFyYW1zU2VyaWFsaXplcikge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXNTZXJpYWxpemVyKHBhcmFtcyk7XG4gIH0gZWxzZSBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMocGFyYW1zKSkge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXMudG9TdHJpbmcoKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgcGFydHMgPSBbXTtcblxuICAgIHV0aWxzLmZvckVhY2gocGFyYW1zLCBmdW5jdGlvbiBzZXJpYWxpemUodmFsLCBrZXkpIHtcbiAgICAgIGlmICh2YWwgPT09IG51bGwgfHwgdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodXRpbHMuaXNBcnJheSh2YWwpKSB7XG4gICAgICAgIGtleSA9IGtleSArICdbXSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWwgPSBbdmFsXTtcbiAgICAgIH1cblxuICAgICAgdXRpbHMuZm9yRWFjaCh2YWwsIGZ1bmN0aW9uIHBhcnNlVmFsdWUodikge1xuICAgICAgICBpZiAodXRpbHMuaXNEYXRlKHYpKSB7XG4gICAgICAgICAgdiA9IHYudG9JU09TdHJpbmcoKTtcbiAgICAgICAgfSBlbHNlIGlmICh1dGlscy5pc09iamVjdCh2KSkge1xuICAgICAgICAgIHYgPSBKU09OLnN0cmluZ2lmeSh2KTtcbiAgICAgICAgfVxuICAgICAgICBwYXJ0cy5wdXNoKGVuY29kZShrZXkpICsgJz0nICsgZW5jb2RlKHYpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcnRzLmpvaW4oJyYnKTtcbiAgfVxuXG4gIGlmIChzZXJpYWxpemVkUGFyYW1zKSB7XG4gICAgdmFyIGhhc2htYXJrSW5kZXggPSB1cmwuaW5kZXhPZignIycpO1xuICAgIGlmIChoYXNobWFya0luZGV4ICE9PSAtMSkge1xuICAgICAgdXJsID0gdXJsLnNsaWNlKDAsIGhhc2htYXJrSW5kZXgpO1xuICAgIH1cblxuICAgIHVybCArPSAodXJsLmluZGV4T2YoJz8nKSA9PT0gLTEgPyAnPycgOiAnJicpICsgc2VyaWFsaXplZFBhcmFtcztcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgc3BlY2lmaWVkIFVSTHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGl2ZVVSTCBUaGUgcmVsYXRpdmUgVVJMXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgVVJMXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVsYXRpdmVVUkwpIHtcbiAgcmV0dXJuIHJlbGF0aXZlVVJMXG4gICAgPyBiYXNlVVJMLnJlcGxhY2UoL1xcLyskLywgJycpICsgJy8nICsgcmVsYXRpdmVVUkwucmVwbGFjZSgvXlxcLysvLCAnJylcbiAgICA6IGJhc2VVUkw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgc3VwcG9ydCBkb2N1bWVudC5jb29raWVcbiAgICAoZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKG5hbWUsIHZhbHVlLCBleHBpcmVzLCBwYXRoLCBkb21haW4sIHNlY3VyZSkge1xuICAgICAgICAgIHZhciBjb29raWUgPSBbXTtcbiAgICAgICAgICBjb29raWUucHVzaChuYW1lICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSk7XG5cbiAgICAgICAgICBpZiAodXRpbHMuaXNOdW1iZXIoZXhwaXJlcykpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdleHBpcmVzPScgKyBuZXcgRGF0ZShleHBpcmVzKS50b0dNVFN0cmluZygpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcocGF0aCkpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdwYXRoPScgKyBwYXRoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcoZG9tYWluKSkge1xuICAgICAgICAgICAgY29va2llLnB1c2goJ2RvbWFpbj0nICsgZG9tYWluKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc2VjdXJlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjb29raWUucHVzaCgnc2VjdXJlJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZG9jdW1lbnQuY29va2llID0gY29va2llLmpvaW4oJzsgJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZChuYW1lKSB7XG4gICAgICAgICAgdmFyIG1hdGNoID0gZG9jdW1lbnQuY29va2llLm1hdGNoKG5ldyBSZWdFeHAoJyhefDtcXFxccyopKCcgKyBuYW1lICsgJyk9KFteO10qKScpKTtcbiAgICAgICAgICByZXR1cm4gKG1hdGNoID8gZGVjb2RlVVJJQ29tcG9uZW50KG1hdGNoWzNdKSA6IG51bGwpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKG5hbWUpIHtcbiAgICAgICAgICB0aGlzLndyaXRlKG5hbWUsICcnLCBEYXRlLm5vdygpIC0gODY0MDAwMDApO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pKCkgOlxuXG4gIC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudiAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKCkge30sXG4gICAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQoKSB7IHJldHVybiBudWxsOyB9LFxuICAgICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgICB9O1xuICAgIH0pKClcbik7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0Fic29sdXRlVVJMKHVybCkge1xuICAvLyBBIFVSTCBpcyBjb25zaWRlcmVkIGFic29sdXRlIGlmIGl0IGJlZ2lucyB3aXRoIFwiPHNjaGVtZT46Ly9cIiBvciBcIi8vXCIgKHByb3RvY29sLXJlbGF0aXZlIFVSTCkuXG4gIC8vIFJGQyAzOTg2IGRlZmluZXMgc2NoZW1lIG5hbWUgYXMgYSBzZXF1ZW5jZSBvZiBjaGFyYWN0ZXJzIGJlZ2lubmluZyB3aXRoIGEgbGV0dGVyIGFuZCBmb2xsb3dlZFxuICAvLyBieSBhbnkgY29tYmluYXRpb24gb2YgbGV0dGVycywgZGlnaXRzLCBwbHVzLCBwZXJpb2QsIG9yIGh5cGhlbi5cbiAgcmV0dXJuIC9eKFthLXpdW2EtelxcZFxcK1xcLVxcLl0qOik/XFwvXFwvL2kudGVzdCh1cmwpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIGhhdmUgZnVsbCBzdXBwb3J0IG9mIHRoZSBBUElzIG5lZWRlZCB0byB0ZXN0XG4gIC8vIHdoZXRoZXIgdGhlIHJlcXVlc3QgVVJMIGlzIG9mIHRoZSBzYW1lIG9yaWdpbiBhcyBjdXJyZW50IGxvY2F0aW9uLlxuICAgIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICB2YXIgbXNpZSA9IC8obXNpZXx0cmlkZW50KS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgICB2YXIgdXJsUGFyc2luZ05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICB2YXIgb3JpZ2luVVJMO1xuXG4gICAgICAvKipcbiAgICAqIFBhcnNlIGEgVVJMIHRvIGRpc2NvdmVyIGl0J3MgY29tcG9uZW50c1xuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgVGhlIFVSTCB0byBiZSBwYXJzZWRcbiAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgKi9cbiAgICAgIGZ1bmN0aW9uIHJlc29sdmVVUkwodXJsKSB7XG4gICAgICAgIHZhciBocmVmID0gdXJsO1xuXG4gICAgICAgIGlmIChtc2llKSB7XG4gICAgICAgIC8vIElFIG5lZWRzIGF0dHJpYnV0ZSBzZXQgdHdpY2UgdG8gbm9ybWFsaXplIHByb3BlcnRpZXNcbiAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcbiAgICAgICAgICBocmVmID0gdXJsUGFyc2luZ05vZGUuaHJlZjtcbiAgICAgICAgfVxuXG4gICAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuXG4gICAgICAgIC8vIHVybFBhcnNpbmdOb2RlIHByb3ZpZGVzIHRoZSBVcmxVdGlscyBpbnRlcmZhY2UgLSBodHRwOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jdXJsdXRpbHNcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBocmVmOiB1cmxQYXJzaW5nTm9kZS5ocmVmLFxuICAgICAgICAgIHByb3RvY29sOiB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbCA/IHVybFBhcnNpbmdOb2RlLnByb3RvY29sLnJlcGxhY2UoLzokLywgJycpIDogJycsXG4gICAgICAgICAgaG9zdDogdXJsUGFyc2luZ05vZGUuaG9zdCxcbiAgICAgICAgICBzZWFyY2g6IHVybFBhcnNpbmdOb2RlLnNlYXJjaCA/IHVybFBhcnNpbmdOb2RlLnNlYXJjaC5yZXBsYWNlKC9eXFw/LywgJycpIDogJycsXG4gICAgICAgICAgaGFzaDogdXJsUGFyc2luZ05vZGUuaGFzaCA/IHVybFBhcnNpbmdOb2RlLmhhc2gucmVwbGFjZSgvXiMvLCAnJykgOiAnJyxcbiAgICAgICAgICBob3N0bmFtZTogdXJsUGFyc2luZ05vZGUuaG9zdG5hbWUsXG4gICAgICAgICAgcG9ydDogdXJsUGFyc2luZ05vZGUucG9ydCxcbiAgICAgICAgICBwYXRobmFtZTogKHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nKSA/XG4gICAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZSA6XG4gICAgICAgICAgICAnLycgKyB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZVxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICBvcmlnaW5VUkwgPSByZXNvbHZlVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcblxuICAgICAgLyoqXG4gICAgKiBEZXRlcm1pbmUgaWYgYSBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiBhcyB0aGUgY3VycmVudCBsb2NhdGlvblxuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSByZXF1ZXN0VVJMIFRoZSBVUkwgdG8gdGVzdFxuICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4sIG90aGVyd2lzZSBmYWxzZVxuICAgICovXG4gICAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKHJlcXVlc3RVUkwpIHtcbiAgICAgICAgdmFyIHBhcnNlZCA9ICh1dGlscy5pc1N0cmluZyhyZXF1ZXN0VVJMKSkgPyByZXNvbHZlVVJMKHJlcXVlc3RVUkwpIDogcmVxdWVzdFVSTDtcbiAgICAgICAgcmV0dXJuIChwYXJzZWQucHJvdG9jb2wgPT09IG9yaWdpblVSTC5wcm90b2NvbCAmJlxuICAgICAgICAgICAgcGFyc2VkLmhvc3QgPT09IG9yaWdpblVSTC5ob3N0KTtcbiAgICAgIH07XG4gICAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52cyAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbigpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9O1xuICAgIH0pKClcbik7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCBub3JtYWxpemVkTmFtZSkge1xuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMsIGZ1bmN0aW9uIHByb2Nlc3NIZWFkZXIodmFsdWUsIG5hbWUpIHtcbiAgICBpZiAobmFtZSAhPT0gbm9ybWFsaXplZE5hbWUgJiYgbmFtZS50b1VwcGVyQ2FzZSgpID09PSBub3JtYWxpemVkTmFtZS50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICBoZWFkZXJzW25vcm1hbGl6ZWROYW1lXSA9IHZhbHVlO1xuICAgICAgZGVsZXRlIGhlYWRlcnNbbmFtZV07XG4gICAgfVxuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLy8gSGVhZGVycyB3aG9zZSBkdXBsaWNhdGVzIGFyZSBpZ25vcmVkIGJ5IG5vZGVcbi8vIGMuZi4gaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9odHRwLmh0bWwjaHR0cF9tZXNzYWdlX2hlYWRlcnNcbnZhciBpZ25vcmVEdXBsaWNhdGVPZiA9IFtcbiAgJ2FnZScsICdhdXRob3JpemF0aW9uJywgJ2NvbnRlbnQtbGVuZ3RoJywgJ2NvbnRlbnQtdHlwZScsICdldGFnJyxcbiAgJ2V4cGlyZXMnLCAnZnJvbScsICdob3N0JywgJ2lmLW1vZGlmaWVkLXNpbmNlJywgJ2lmLXVubW9kaWZpZWQtc2luY2UnLFxuICAnbGFzdC1tb2RpZmllZCcsICdsb2NhdGlvbicsICdtYXgtZm9yd2FyZHMnLCAncHJveHktYXV0aG9yaXphdGlvbicsXG4gICdyZWZlcmVyJywgJ3JldHJ5LWFmdGVyJywgJ3VzZXItYWdlbnQnXG5dO1xuXG4vKipcbiAqIFBhcnNlIGhlYWRlcnMgaW50byBhbiBvYmplY3RcbiAqXG4gKiBgYGBcbiAqIERhdGU6IFdlZCwgMjcgQXVnIDIwMTQgMDg6NTg6NDkgR01UXG4gKiBDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb25cbiAqIENvbm5lY3Rpb246IGtlZXAtYWxpdmVcbiAqIFRyYW5zZmVyLUVuY29kaW5nOiBjaHVua2VkXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaGVhZGVycyBIZWFkZXJzIG5lZWRpbmcgdG8gYmUgcGFyc2VkXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBIZWFkZXJzIHBhcnNlZCBpbnRvIGFuIG9iamVjdFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhcnNlSGVhZGVycyhoZWFkZXJzKSB7XG4gIHZhciBwYXJzZWQgPSB7fTtcbiAgdmFyIGtleTtcbiAgdmFyIHZhbDtcbiAgdmFyIGk7XG5cbiAgaWYgKCFoZWFkZXJzKSB7IHJldHVybiBwYXJzZWQ7IH1cblxuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMuc3BsaXQoJ1xcbicpLCBmdW5jdGlvbiBwYXJzZXIobGluZSkge1xuICAgIGkgPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICBrZXkgPSB1dGlscy50cmltKGxpbmUuc3Vic3RyKDAsIGkpKS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhbCA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoaSArIDEpKTtcblxuICAgIGlmIChrZXkpIHtcbiAgICAgIGlmIChwYXJzZWRba2V5XSAmJiBpZ25vcmVEdXBsaWNhdGVPZi5pbmRleE9mKGtleSkgPj0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoa2V5ID09PSAnc2V0LWNvb2tpZScpIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSAocGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSA6IFtdKS5jb25jYXQoW3ZhbF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSBwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldICsgJywgJyArIHZhbCA6IHZhbDtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBwYXJzZWQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFN5bnRhY3RpYyBzdWdhciBmb3IgaW52b2tpbmcgYSBmdW5jdGlvbiBhbmQgZXhwYW5kaW5nIGFuIGFycmF5IGZvciBhcmd1bWVudHMuXG4gKlxuICogQ29tbW9uIHVzZSBjYXNlIHdvdWxkIGJlIHRvIHVzZSBgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5YC5cbiAqXG4gKiAgYGBganNcbiAqICBmdW5jdGlvbiBmKHgsIHksIHopIHt9XG4gKiAgdmFyIGFyZ3MgPSBbMSwgMiwgM107XG4gKiAgZi5hcHBseShudWxsLCBhcmdzKTtcbiAqICBgYGBcbiAqXG4gKiBXaXRoIGBzcHJlYWRgIHRoaXMgZXhhbXBsZSBjYW4gYmUgcmUtd3JpdHRlbi5cbiAqXG4gKiAgYGBganNcbiAqICBzcHJlYWQoZnVuY3Rpb24oeCwgeSwgeikge30pKFsxLCAyLCAzXSk7XG4gKiAgYGBgXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzcHJlYWQoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoYXJyKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KG51bGwsIGFycik7XG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG52YXIgaXNCdWZmZXIgPSByZXF1aXJlKCdpcy1idWZmZXInKTtcblxuLypnbG9iYWwgdG9TdHJpbmc6dHJ1ZSovXG5cbi8vIHV0aWxzIGlzIGEgbGlicmFyeSBvZiBnZW5lcmljIGhlbHBlciBmdW5jdGlvbnMgbm9uLXNwZWNpZmljIHRvIGF4aW9zXG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXkodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXIodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5QnVmZmVyXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGb3JtRGF0YVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEZvcm1EYXRhLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGb3JtRGF0YSh2YWwpIHtcbiAgcmV0dXJuICh0eXBlb2YgRm9ybURhdGEgIT09ICd1bmRlZmluZWQnKSAmJiAodmFsIGluc3RhbmNlb2YgRm9ybURhdGEpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXJWaWV3KHZhbCkge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcpICYmIChBcnJheUJ1ZmZlci5pc1ZpZXcpKSB7XG4gICAgcmVzdWx0ID0gQXJyYXlCdWZmZXIuaXNWaWV3KHZhbCk7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gKHZhbCkgJiYgKHZhbC5idWZmZXIpICYmICh2YWwuYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJpbmdcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmluZywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3RyaW5nKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3N0cmluZyc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBOdW1iZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIE51bWJlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTnVtYmVyKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ251bWJlcic7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgdW5kZWZpbmVkXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIHVuZGVmaW5lZCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IG51bGwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBEYXRlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBEYXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNEYXRlKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBEYXRlXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGaWxlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGaWxlKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGaWxlXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCbG9iXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCbG9iLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNCbG9iKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBCbG9iXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRnVuY3Rpb24sIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyZWFtXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJlYW0sIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmVhbSh2YWwpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KHZhbCkgJiYgaXNGdW5jdGlvbih2YWwucGlwZSk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNVUkxTZWFyY2hQYXJhbXModmFsKSB7XG4gIHJldHVybiB0eXBlb2YgVVJMU2VhcmNoUGFyYW1zICE9PSAndW5kZWZpbmVkJyAmJiB2YWwgaW5zdGFuY2VvZiBVUkxTZWFyY2hQYXJhbXM7XG59XG5cbi8qKlxuICogVHJpbSBleGNlc3Mgd2hpdGVzcGFjZSBvZmYgdGhlIGJlZ2lubmluZyBhbmQgZW5kIG9mIGEgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgU3RyaW5nIHRvIHRyaW1cbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBTdHJpbmcgZnJlZWQgb2YgZXhjZXNzIHdoaXRlc3BhY2VcbiAqL1xuZnVuY3Rpb24gdHJpbShzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzKi8sICcnKS5yZXBsYWNlKC9cXHMqJC8sICcnKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgd2UncmUgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnRcbiAqXG4gKiBUaGlzIGFsbG93cyBheGlvcyB0byBydW4gaW4gYSB3ZWIgd29ya2VyLCBhbmQgcmVhY3QtbmF0aXZlLlxuICogQm90aCBlbnZpcm9ubWVudHMgc3VwcG9ydCBYTUxIdHRwUmVxdWVzdCwgYnV0IG5vdCBmdWxseSBzdGFuZGFyZCBnbG9iYWxzLlxuICpcbiAqIHdlYiB3b3JrZXJzOlxuICogIHR5cGVvZiB3aW5kb3cgLT4gdW5kZWZpbmVkXG4gKiAgdHlwZW9mIGRvY3VtZW50IC0+IHVuZGVmaW5lZFxuICpcbiAqIHJlYWN0LW5hdGl2ZTpcbiAqICBuYXZpZ2F0b3IucHJvZHVjdCAtPiAnUmVhY3ROYXRpdmUnXG4gKiBuYXRpdmVzY3JpcHRcbiAqICBuYXZpZ2F0b3IucHJvZHVjdCAtPiAnTmF0aXZlU2NyaXB0JyBvciAnTlMnXG4gKi9cbmZ1bmN0aW9uIGlzU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgKG5hdmlnYXRvci5wcm9kdWN0ID09PSAnUmVhY3ROYXRpdmUnIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdG9yLnByb2R1Y3QgPT09ICdOYXRpdmVTY3JpcHQnIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmF2aWdhdG9yLnByb2R1Y3QgPT09ICdOUycpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnXG4gICk7XG59XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFuIEFycmF5IG9yIGFuIE9iamVjdCBpbnZva2luZyBhIGZ1bmN0aW9uIGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgYG9iamAgaXMgYW4gQXJyYXkgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBpbmRleCwgYW5kIGNvbXBsZXRlIGFycmF5IGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgJ29iaicgaXMgYW4gT2JqZWN0IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwga2V5LCBhbmQgY29tcGxldGUgb2JqZWN0IGZvciBlYWNoIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSBvYmogVGhlIG9iamVjdCB0byBpdGVyYXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgY2FsbGJhY2sgdG8gaW52b2tlIGZvciBlYWNoIGl0ZW1cbiAqL1xuZnVuY3Rpb24gZm9yRWFjaChvYmosIGZuKSB7XG4gIC8vIERvbid0IGJvdGhlciBpZiBubyB2YWx1ZSBwcm92aWRlZFxuICBpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gRm9yY2UgYW4gYXJyYXkgaWYgbm90IGFscmVhZHkgc29tZXRoaW5nIGl0ZXJhYmxlXG4gIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIG9iaiA9IFtvYmpdO1xuICB9XG5cbiAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBhcnJheSB2YWx1ZXNcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IG9iai5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2ldLCBpLCBvYmopO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgb2JqZWN0IGtleXNcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgICBmbi5jYWxsKG51bGwsIG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQWNjZXB0cyB2YXJhcmdzIGV4cGVjdGluZyBlYWNoIGFyZ3VtZW50IHRvIGJlIGFuIG9iamVjdCwgdGhlblxuICogaW1tdXRhYmx5IG1lcmdlcyB0aGUgcHJvcGVydGllcyBvZiBlYWNoIG9iamVjdCBhbmQgcmV0dXJucyByZXN1bHQuXG4gKlxuICogV2hlbiBtdWx0aXBsZSBvYmplY3RzIGNvbnRhaW4gdGhlIHNhbWUga2V5IHRoZSBsYXRlciBvYmplY3QgaW5cbiAqIHRoZSBhcmd1bWVudHMgbGlzdCB3aWxsIHRha2UgcHJlY2VkZW5jZS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcmVzdWx0ID0gbWVyZ2Uoe2ZvbzogMTIzfSwge2ZvbzogNDU2fSk7XG4gKiBjb25zb2xlLmxvZyhyZXN1bHQuZm9vKTsgLy8gb3V0cHV0cyA0NTZcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoxIE9iamVjdCB0byBtZXJnZVxuICogQHJldHVybnMge09iamVjdH0gUmVzdWx0IG9mIGFsbCBtZXJnZSBwcm9wZXJ0aWVzXG4gKi9cbmZ1bmN0aW9uIG1lcmdlKC8qIG9iajEsIG9iajIsIG9iajMsIC4uLiAqLykge1xuICB2YXIgcmVzdWx0ID0ge307XG4gIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHR5cGVvZiByZXN1bHRba2V5XSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gbWVyZ2UocmVzdWx0W2tleV0sIHZhbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGZvckVhY2goYXJndW1lbnRzW2ldLCBhc3NpZ25WYWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBGdW5jdGlvbiBlcXVhbCB0byBtZXJnZSB3aXRoIHRoZSBkaWZmZXJlbmNlIGJlaW5nIHRoYXQgbm8gcmVmZXJlbmNlXG4gKiB0byBvcmlnaW5hbCBvYmplY3RzIGlzIGtlcHQuXG4gKlxuICogQHNlZSBtZXJnZVxuICogQHBhcmFtIHtPYmplY3R9IG9iajEgT2JqZWN0IHRvIG1lcmdlXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXN1bHQgb2YgYWxsIG1lcmdlIHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gZGVlcE1lcmdlKC8qIG9iajEsIG9iajIsIG9iajMsIC4uLiAqLykge1xuICB2YXIgcmVzdWx0ID0ge307XG4gIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHR5cGVvZiByZXN1bHRba2V5XSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gZGVlcE1lcmdlKHJlc3VsdFtrZXldLCB2YWwpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gZGVlcE1lcmdlKHt9LCB2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRba2V5XSA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBmb3JFYWNoKGFyZ3VtZW50c1tpXSwgYXNzaWduVmFsdWUpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRXh0ZW5kcyBvYmplY3QgYSBieSBtdXRhYmx5IGFkZGluZyB0byBpdCB0aGUgcHJvcGVydGllcyBvZiBvYmplY3QgYi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYSBUaGUgb2JqZWN0IHRvIGJlIGV4dGVuZGVkXG4gKiBAcGFyYW0ge09iamVjdH0gYiBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tXG4gKiBAcGFyYW0ge09iamVjdH0gdGhpc0FyZyBUaGUgb2JqZWN0IHRvIGJpbmQgZnVuY3Rpb24gdG9cbiAqIEByZXR1cm4ge09iamVjdH0gVGhlIHJlc3VsdGluZyB2YWx1ZSBvZiBvYmplY3QgYVxuICovXG5mdW5jdGlvbiBleHRlbmQoYSwgYiwgdGhpc0FyZykge1xuICBmb3JFYWNoKGIsIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHRoaXNBcmcgJiYgdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgYVtrZXldID0gYmluZCh2YWwsIHRoaXNBcmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhW2tleV0gPSB2YWw7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpc0FycmF5OiBpc0FycmF5LFxuICBpc0FycmF5QnVmZmVyOiBpc0FycmF5QnVmZmVyLFxuICBpc0J1ZmZlcjogaXNCdWZmZXIsXG4gIGlzRm9ybURhdGE6IGlzRm9ybURhdGEsXG4gIGlzQXJyYXlCdWZmZXJWaWV3OiBpc0FycmF5QnVmZmVyVmlldyxcbiAgaXNTdHJpbmc6IGlzU3RyaW5nLFxuICBpc051bWJlcjogaXNOdW1iZXIsXG4gIGlzT2JqZWN0OiBpc09iamVjdCxcbiAgaXNVbmRlZmluZWQ6IGlzVW5kZWZpbmVkLFxuICBpc0RhdGU6IGlzRGF0ZSxcbiAgaXNGaWxlOiBpc0ZpbGUsXG4gIGlzQmxvYjogaXNCbG9iLFxuICBpc0Z1bmN0aW9uOiBpc0Z1bmN0aW9uLFxuICBpc1N0cmVhbTogaXNTdHJlYW0sXG4gIGlzVVJMU2VhcmNoUGFyYW1zOiBpc1VSTFNlYXJjaFBhcmFtcyxcbiAgaXNTdGFuZGFyZEJyb3dzZXJFbnY6IGlzU3RhbmRhcmRCcm93c2VyRW52LFxuICBmb3JFYWNoOiBmb3JFYWNoLFxuICBtZXJnZTogbWVyZ2UsXG4gIGRlZXBNZXJnZTogZGVlcE1lcmdlLFxuICBleHRlbmQ6IGV4dGVuZCxcbiAgdHJpbTogdHJpbVxufTtcbiIsIi8qIVxuICogRGV0ZXJtaW5lIGlmIGFuIG9iamVjdCBpcyBhIEJ1ZmZlclxuICpcbiAqIEBhdXRob3IgICBGZXJvc3MgQWJvdWtoYWRpamVoIDxodHRwczovL2Zlcm9zcy5vcmc+XG4gKiBAbGljZW5zZSAgTUlUXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0J1ZmZlciAob2JqKSB7XG4gIHJldHVybiBvYmogIT0gbnVsbCAmJiBvYmouY29uc3RydWN0b3IgIT0gbnVsbCAmJlxuICAgIHR5cGVvZiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIgPT09ICdmdW5jdGlvbicgJiYgb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyKG9iailcbn1cbiIsInZhciB1cmwgPSByZXF1aXJlKFwidXJsXCIpO1xudmFyIGh0dHAgPSByZXF1aXJlKFwiaHR0cFwiKTtcbnZhciBodHRwcyA9IHJlcXVpcmUoXCJodHRwc1wiKTtcbnZhciBhc3NlcnQgPSByZXF1aXJlKFwiYXNzZXJ0XCIpO1xudmFyIFdyaXRhYmxlID0gcmVxdWlyZShcInN0cmVhbVwiKS5Xcml0YWJsZTtcbnZhciBkZWJ1ZyA9IHJlcXVpcmUoXCJkZWJ1Z1wiKShcImZvbGxvdy1yZWRpcmVjdHNcIik7XG5cbi8vIFJGQzcyMzHCpzQuMi4xOiBPZiB0aGUgcmVxdWVzdCBtZXRob2RzIGRlZmluZWQgYnkgdGhpcyBzcGVjaWZpY2F0aW9uLFxuLy8gdGhlIEdFVCwgSEVBRCwgT1BUSU9OUywgYW5kIFRSQUNFIG1ldGhvZHMgYXJlIGRlZmluZWQgdG8gYmUgc2FmZS5cbnZhciBTQUZFX01FVEhPRFMgPSB7IEdFVDogdHJ1ZSwgSEVBRDogdHJ1ZSwgT1BUSU9OUzogdHJ1ZSwgVFJBQ0U6IHRydWUgfTtcblxuLy8gQ3JlYXRlIGhhbmRsZXJzIHRoYXQgcGFzcyBldmVudHMgZnJvbSBuYXRpdmUgcmVxdWVzdHNcbnZhciBldmVudEhhbmRsZXJzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbltcImFib3J0XCIsIFwiYWJvcnRlZFwiLCBcImVycm9yXCIsIFwic29ja2V0XCIsIFwidGltZW91dFwiXS5mb3JFYWNoKGZ1bmN0aW9uIChldmVudCkge1xuICBldmVudEhhbmRsZXJzW2V2ZW50XSA9IGZ1bmN0aW9uIChhcmcpIHtcbiAgICB0aGlzLl9yZWRpcmVjdGFibGUuZW1pdChldmVudCwgYXJnKTtcbiAgfTtcbn0pO1xuXG4vLyBBbiBIVFRQKFMpIHJlcXVlc3QgdGhhdCBjYW4gYmUgcmVkaXJlY3RlZFxuZnVuY3Rpb24gUmVkaXJlY3RhYmxlUmVxdWVzdChvcHRpb25zLCByZXNwb25zZUNhbGxiYWNrKSB7XG4gIC8vIEluaXRpYWxpemUgdGhlIHJlcXVlc3RcbiAgV3JpdGFibGUuY2FsbCh0aGlzKTtcbiAgb3B0aW9ucy5oZWFkZXJzID0gb3B0aW9ucy5oZWFkZXJzIHx8IHt9O1xuICB0aGlzLl9vcHRpb25zID0gb3B0aW9ucztcbiAgdGhpcy5fcmVkaXJlY3RDb3VudCA9IDA7XG4gIHRoaXMuX3JlZGlyZWN0cyA9IFtdO1xuICB0aGlzLl9yZXF1ZXN0Qm9keUxlbmd0aCA9IDA7XG4gIHRoaXMuX3JlcXVlc3RCb2R5QnVmZmVycyA9IFtdO1xuXG4gIC8vIFNpbmNlIGh0dHAucmVxdWVzdCB0cmVhdHMgaG9zdCBhcyBhbiBhbGlhcyBvZiBob3N0bmFtZSxcbiAgLy8gYnV0IHRoZSB1cmwgbW9kdWxlIGludGVycHJldHMgaG9zdCBhcyBob3N0bmFtZSBwbHVzIHBvcnQsXG4gIC8vIGVsaW1pbmF0ZSB0aGUgaG9zdCBwcm9wZXJ0eSB0byBhdm9pZCBjb25mdXNpb24uXG4gIGlmIChvcHRpb25zLmhvc3QpIHtcbiAgICAvLyBVc2UgaG9zdG5hbWUgaWYgc2V0LCBiZWNhdXNlIGl0IGhhcyBwcmVjZWRlbmNlXG4gICAgaWYgKCFvcHRpb25zLmhvc3RuYW1lKSB7XG4gICAgICBvcHRpb25zLmhvc3RuYW1lID0gb3B0aW9ucy5ob3N0O1xuICAgIH1cbiAgICBkZWxldGUgb3B0aW9ucy5ob3N0O1xuICB9XG5cbiAgLy8gQXR0YWNoIGEgY2FsbGJhY2sgaWYgcGFzc2VkXG4gIGlmIChyZXNwb25zZUNhbGxiYWNrKSB7XG4gICAgdGhpcy5vbihcInJlc3BvbnNlXCIsIHJlc3BvbnNlQ2FsbGJhY2spO1xuICB9XG5cbiAgLy8gUmVhY3QgdG8gcmVzcG9uc2VzIG9mIG5hdGl2ZSByZXF1ZXN0c1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHRoaXMuX29uTmF0aXZlUmVzcG9uc2UgPSBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICBzZWxmLl9wcm9jZXNzUmVzcG9uc2UocmVzcG9uc2UpO1xuICB9O1xuXG4gIC8vIENvbXBsZXRlIHRoZSBVUkwgb2JqZWN0IHdoZW4gbmVjZXNzYXJ5XG4gIGlmICghb3B0aW9ucy5wYXRobmFtZSAmJiBvcHRpb25zLnBhdGgpIHtcbiAgICB2YXIgc2VhcmNoUG9zID0gb3B0aW9ucy5wYXRoLmluZGV4T2YoXCI/XCIpO1xuICAgIGlmIChzZWFyY2hQb3MgPCAwKSB7XG4gICAgICBvcHRpb25zLnBhdGhuYW1lID0gb3B0aW9ucy5wYXRoO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIG9wdGlvbnMucGF0aG5hbWUgPSBvcHRpb25zLnBhdGguc3Vic3RyaW5nKDAsIHNlYXJjaFBvcyk7XG4gICAgICBvcHRpb25zLnNlYXJjaCA9IG9wdGlvbnMucGF0aC5zdWJzdHJpbmcoc2VhcmNoUG9zKTtcbiAgICB9XG4gIH1cblxuICAvLyBQZXJmb3JtIHRoZSBmaXJzdCByZXF1ZXN0XG4gIHRoaXMuX3BlcmZvcm1SZXF1ZXN0KCk7XG59XG5SZWRpcmVjdGFibGVSZXF1ZXN0LnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoV3JpdGFibGUucHJvdG90eXBlKTtcblxuLy8gV3JpdGVzIGJ1ZmZlcmVkIGRhdGEgdG8gdGhlIGN1cnJlbnQgbmF0aXZlIHJlcXVlc3RcblJlZGlyZWN0YWJsZVJlcXVlc3QucHJvdG90eXBlLndyaXRlID0gZnVuY3Rpb24gKGRhdGEsIGVuY29kaW5nLCBjYWxsYmFjaykge1xuICAvLyBWYWxpZGF0ZSBpbnB1dCBhbmQgc2hpZnQgcGFyYW1ldGVycyBpZiBuZWNlc3NhcnlcbiAgaWYgKCEodHlwZW9mIGRhdGEgPT09IFwic3RyaW5nXCIgfHwgdHlwZW9mIGRhdGEgPT09IFwib2JqZWN0XCIgJiYgKFwibGVuZ3RoXCIgaW4gZGF0YSkpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiZGF0YSBzaG91bGQgYmUgYSBzdHJpbmcsIEJ1ZmZlciBvciBVaW50OEFycmF5XCIpO1xuICB9XG4gIGlmICh0eXBlb2YgZW5jb2RpbmcgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIGNhbGxiYWNrID0gZW5jb2Rpbmc7XG4gICAgZW5jb2RpbmcgPSBudWxsO1xuICB9XG5cbiAgLy8gSWdub3JlIGVtcHR5IGJ1ZmZlcnMsIHNpbmNlIHdyaXRpbmcgdGhlbSBkb2Vzbid0IGludm9rZSB0aGUgY2FsbGJhY2tcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL25vZGVqcy9ub2RlL2lzc3Vlcy8yMjA2NlxuICBpZiAoZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuICAvLyBPbmx5IHdyaXRlIHdoZW4gd2UgZG9uJ3QgZXhjZWVkIHRoZSBtYXhpbXVtIGJvZHkgbGVuZ3RoXG4gIGlmICh0aGlzLl9yZXF1ZXN0Qm9keUxlbmd0aCArIGRhdGEubGVuZ3RoIDw9IHRoaXMuX29wdGlvbnMubWF4Qm9keUxlbmd0aCkge1xuICAgIHRoaXMuX3JlcXVlc3RCb2R5TGVuZ3RoICs9IGRhdGEubGVuZ3RoO1xuICAgIHRoaXMuX3JlcXVlc3RCb2R5QnVmZmVycy5wdXNoKHsgZGF0YTogZGF0YSwgZW5jb2Rpbmc6IGVuY29kaW5nIH0pO1xuICAgIHRoaXMuX2N1cnJlbnRSZXF1ZXN0LndyaXRlKGRhdGEsIGVuY29kaW5nLCBjYWxsYmFjayk7XG4gIH1cbiAgLy8gRXJyb3Igd2hlbiB3ZSBleGNlZWQgdGhlIG1heGltdW0gYm9keSBsZW5ndGhcbiAgZWxzZSB7XG4gICAgdGhpcy5lbWl0KFwiZXJyb3JcIiwgbmV3IEVycm9yKFwiUmVxdWVzdCBib2R5IGxhcmdlciB0aGFuIG1heEJvZHlMZW5ndGggbGltaXRcIikpO1xuICAgIHRoaXMuYWJvcnQoKTtcbiAgfVxufTtcblxuLy8gRW5kcyB0aGUgY3VycmVudCBuYXRpdmUgcmVxdWVzdFxuUmVkaXJlY3RhYmxlUmVxdWVzdC5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24gKGRhdGEsIGVuY29kaW5nLCBjYWxsYmFjaykge1xuICAvLyBTaGlmdCBwYXJhbWV0ZXJzIGlmIG5lY2Vzc2FyeVxuICBpZiAodHlwZW9mIGRhdGEgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIGNhbGxiYWNrID0gZGF0YTtcbiAgICBkYXRhID0gZW5jb2RpbmcgPSBudWxsO1xuICB9XG4gIGVsc2UgaWYgKHR5cGVvZiBlbmNvZGluZyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgY2FsbGJhY2sgPSBlbmNvZGluZztcbiAgICBlbmNvZGluZyA9IG51bGw7XG4gIH1cblxuICAvLyBXcml0ZSBkYXRhIGFuZCBlbmRcbiAgdmFyIGN1cnJlbnRSZXF1ZXN0ID0gdGhpcy5fY3VycmVudFJlcXVlc3Q7XG4gIHRoaXMud3JpdGUoZGF0YSB8fCBcIlwiLCBlbmNvZGluZywgZnVuY3Rpb24gKCkge1xuICAgIGN1cnJlbnRSZXF1ZXN0LmVuZChudWxsLCBudWxsLCBjYWxsYmFjayk7XG4gIH0pO1xufTtcblxuLy8gU2V0cyBhIGhlYWRlciB2YWx1ZSBvbiB0aGUgY3VycmVudCBuYXRpdmUgcmVxdWVzdFxuUmVkaXJlY3RhYmxlUmVxdWVzdC5wcm90b3R5cGUuc2V0SGVhZGVyID0gZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XG4gIHRoaXMuX29wdGlvbnMuaGVhZGVyc1tuYW1lXSA9IHZhbHVlO1xuICB0aGlzLl9jdXJyZW50UmVxdWVzdC5zZXRIZWFkZXIobmFtZSwgdmFsdWUpO1xufTtcblxuLy8gQ2xlYXJzIGEgaGVhZGVyIHZhbHVlIG9uIHRoZSBjdXJyZW50IG5hdGl2ZSByZXF1ZXN0XG5SZWRpcmVjdGFibGVSZXF1ZXN0LnByb3RvdHlwZS5yZW1vdmVIZWFkZXIgPSBmdW5jdGlvbiAobmFtZSkge1xuICBkZWxldGUgdGhpcy5fb3B0aW9ucy5oZWFkZXJzW25hbWVdO1xuICB0aGlzLl9jdXJyZW50UmVxdWVzdC5yZW1vdmVIZWFkZXIobmFtZSk7XG59O1xuXG4vLyBQcm94eSBhbGwgb3RoZXIgcHVibGljIENsaWVudFJlcXVlc3QgbWV0aG9kc1xuW1xuICBcImFib3J0XCIsIFwiZmx1c2hIZWFkZXJzXCIsIFwiZ2V0SGVhZGVyXCIsXG4gIFwic2V0Tm9EZWxheVwiLCBcInNldFNvY2tldEtlZXBBbGl2ZVwiLCBcInNldFRpbWVvdXRcIixcbl0uZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kKSB7XG4gIFJlZGlyZWN0YWJsZVJlcXVlc3QucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50UmVxdWVzdFttZXRob2RdKGEsIGIpO1xuICB9O1xufSk7XG5cbi8vIFByb3h5IGFsbCBwdWJsaWMgQ2xpZW50UmVxdWVzdCBwcm9wZXJ0aWVzXG5bXCJhYm9ydGVkXCIsIFwiY29ubmVjdGlvblwiLCBcInNvY2tldFwiXS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUmVkaXJlY3RhYmxlUmVxdWVzdC5wcm90b3R5cGUsIHByb3BlcnR5LCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLl9jdXJyZW50UmVxdWVzdFtwcm9wZXJ0eV07IH0sXG4gIH0pO1xufSk7XG5cbi8vIEV4ZWN1dGVzIHRoZSBuZXh0IG5hdGl2ZSByZXF1ZXN0IChpbml0aWFsIG9yIHJlZGlyZWN0KVxuUmVkaXJlY3RhYmxlUmVxdWVzdC5wcm90b3R5cGUuX3BlcmZvcm1SZXF1ZXN0ID0gZnVuY3Rpb24gKCkge1xuICAvLyBMb2FkIHRoZSBuYXRpdmUgcHJvdG9jb2xcbiAgdmFyIHByb3RvY29sID0gdGhpcy5fb3B0aW9ucy5wcm90b2NvbDtcbiAgdmFyIG5hdGl2ZVByb3RvY29sID0gdGhpcy5fb3B0aW9ucy5uYXRpdmVQcm90b2NvbHNbcHJvdG9jb2xdO1xuICBpZiAoIW5hdGl2ZVByb3RvY29sKSB7XG4gICAgdGhpcy5lbWl0KFwiZXJyb3JcIiwgbmV3IEVycm9yKFwiVW5zdXBwb3J0ZWQgcHJvdG9jb2wgXCIgKyBwcm90b2NvbCkpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIElmIHNwZWNpZmllZCwgdXNlIHRoZSBhZ2VudCBjb3JyZXNwb25kaW5nIHRvIHRoZSBwcm90b2NvbFxuICAvLyAoSFRUUCBhbmQgSFRUUFMgdXNlIGRpZmZlcmVudCB0eXBlcyBvZiBhZ2VudHMpXG4gIGlmICh0aGlzLl9vcHRpb25zLmFnZW50cykge1xuICAgIHZhciBzY2hlbWUgPSBwcm90b2NvbC5zdWJzdHIoMCwgcHJvdG9jb2wubGVuZ3RoIC0gMSk7XG4gICAgdGhpcy5fb3B0aW9ucy5hZ2VudCA9IHRoaXMuX29wdGlvbnMuYWdlbnRzW3NjaGVtZV07XG4gIH1cblxuICAvLyBDcmVhdGUgdGhlIG5hdGl2ZSByZXF1ZXN0XG4gIHZhciByZXF1ZXN0ID0gdGhpcy5fY3VycmVudFJlcXVlc3QgPVxuICAgICAgICBuYXRpdmVQcm90b2NvbC5yZXF1ZXN0KHRoaXMuX29wdGlvbnMsIHRoaXMuX29uTmF0aXZlUmVzcG9uc2UpO1xuICB0aGlzLl9jdXJyZW50VXJsID0gdXJsLmZvcm1hdCh0aGlzLl9vcHRpb25zKTtcblxuICAvLyBTZXQgdXAgZXZlbnQgaGFuZGxlcnNcbiAgcmVxdWVzdC5fcmVkaXJlY3RhYmxlID0gdGhpcztcbiAgZm9yICh2YXIgZXZlbnQgaW4gZXZlbnRIYW5kbGVycykge1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBlbHNlICovXG4gICAgaWYgKGV2ZW50KSB7XG4gICAgICByZXF1ZXN0Lm9uKGV2ZW50LCBldmVudEhhbmRsZXJzW2V2ZW50XSk7XG4gICAgfVxuICB9XG5cbiAgLy8gRW5kIGEgcmVkaXJlY3RlZCByZXF1ZXN0XG4gIC8vIChUaGUgZmlyc3QgcmVxdWVzdCBtdXN0IGJlIGVuZGVkIGV4cGxpY2l0bHkgd2l0aCBSZWRpcmVjdGFibGVSZXF1ZXN0I2VuZClcbiAgaWYgKHRoaXMuX2lzUmVkaXJlY3QpIHtcbiAgICAvLyBXcml0ZSB0aGUgcmVxdWVzdCBlbnRpdHkgYW5kIGVuZC5cbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIGJ1ZmZlcnMgPSB0aGlzLl9yZXF1ZXN0Qm9keUJ1ZmZlcnM7XG4gICAgKGZ1bmN0aW9uIHdyaXRlTmV4dCgpIHtcbiAgICAgIGlmIChpIDwgYnVmZmVycy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGJ1ZmZlciA9IGJ1ZmZlcnNbaSsrXTtcbiAgICAgICAgcmVxdWVzdC53cml0ZShidWZmZXIuZGF0YSwgYnVmZmVyLmVuY29kaW5nLCB3cml0ZU5leHQpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHJlcXVlc3QuZW5kKCk7XG4gICAgICB9XG4gICAgfSgpKTtcbiAgfVxufTtcblxuLy8gUHJvY2Vzc2VzIGEgcmVzcG9uc2UgZnJvbSB0aGUgY3VycmVudCBuYXRpdmUgcmVxdWVzdFxuUmVkaXJlY3RhYmxlUmVxdWVzdC5wcm90b3R5cGUuX3Byb2Nlc3NSZXNwb25zZSA9IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAvLyBTdG9yZSB0aGUgcmVkaXJlY3RlZCByZXNwb25zZVxuICBpZiAodGhpcy5fb3B0aW9ucy50cmFja1JlZGlyZWN0cykge1xuICAgIHRoaXMuX3JlZGlyZWN0cy5wdXNoKHtcbiAgICAgIHVybDogdGhpcy5fY3VycmVudFVybCxcbiAgICAgIGhlYWRlcnM6IHJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICBzdGF0dXNDb2RlOiByZXNwb25zZS5zdGF0dXNDb2RlLFxuICAgIH0pO1xuICB9XG5cbiAgLy8gUkZDNzIzMcKnNi40OiBUaGUgM3h4IChSZWRpcmVjdGlvbikgY2xhc3Mgb2Ygc3RhdHVzIGNvZGUgaW5kaWNhdGVzXG4gIC8vIHRoYXQgZnVydGhlciBhY3Rpb24gbmVlZHMgdG8gYmUgdGFrZW4gYnkgdGhlIHVzZXIgYWdlbnQgaW4gb3JkZXIgdG9cbiAgLy8gZnVsZmlsbCB0aGUgcmVxdWVzdC4gSWYgYSBMb2NhdGlvbiBoZWFkZXIgZmllbGQgaXMgcHJvdmlkZWQsXG4gIC8vIHRoZSB1c2VyIGFnZW50IE1BWSBhdXRvbWF0aWNhbGx5IHJlZGlyZWN0IGl0cyByZXF1ZXN0IHRvIHRoZSBVUklcbiAgLy8gcmVmZXJlbmNlZCBieSB0aGUgTG9jYXRpb24gZmllbGQgdmFsdWUsXG4gIC8vIGV2ZW4gaWYgdGhlIHNwZWNpZmljIHN0YXR1cyBjb2RlIGlzIG5vdCB1bmRlcnN0b29kLlxuICB2YXIgbG9jYXRpb24gPSByZXNwb25zZS5oZWFkZXJzLmxvY2F0aW9uO1xuICBpZiAobG9jYXRpb24gJiYgdGhpcy5fb3B0aW9ucy5mb2xsb3dSZWRpcmVjdHMgIT09IGZhbHNlICYmXG4gICAgICByZXNwb25zZS5zdGF0dXNDb2RlID49IDMwMCAmJiByZXNwb25zZS5zdGF0dXNDb2RlIDwgNDAwKSB7XG4gICAgLy8gUkZDNzIzMcKnNi40OiBBIGNsaWVudCBTSE9VTEQgZGV0ZWN0IGFuZCBpbnRlcnZlbmVcbiAgICAvLyBpbiBjeWNsaWNhbCByZWRpcmVjdGlvbnMgKGkuZS4sIFwiaW5maW5pdGVcIiByZWRpcmVjdGlvbiBsb29wcykuXG4gICAgaWYgKCsrdGhpcy5fcmVkaXJlY3RDb3VudCA+IHRoaXMuX29wdGlvbnMubWF4UmVkaXJlY3RzKSB7XG4gICAgICB0aGlzLmVtaXQoXCJlcnJvclwiLCBuZXcgRXJyb3IoXCJNYXggcmVkaXJlY3RzIGV4Y2VlZGVkLlwiKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gUkZDNzIzMcKnNi40OiBBdXRvbWF0aWMgcmVkaXJlY3Rpb24gbmVlZHMgdG8gZG9uZSB3aXRoXG4gICAgLy8gY2FyZSBmb3IgbWV0aG9kcyBub3Qga25vd24gdG8gYmUgc2FmZSBb4oCmXSxcbiAgICAvLyBzaW5jZSB0aGUgdXNlciBtaWdodCBub3Qgd2lzaCB0byByZWRpcmVjdCBhbiB1bnNhZmUgcmVxdWVzdC5cbiAgICAvLyBSRkM3MjMxwqc2LjQuNzogVGhlIDMwNyAoVGVtcG9yYXJ5IFJlZGlyZWN0KSBzdGF0dXMgY29kZSBpbmRpY2F0ZXNcbiAgICAvLyB0aGF0IHRoZSB0YXJnZXQgcmVzb3VyY2UgcmVzaWRlcyB0ZW1wb3JhcmlseSB1bmRlciBhIGRpZmZlcmVudCBVUklcbiAgICAvLyBhbmQgdGhlIHVzZXIgYWdlbnQgTVVTVCBOT1QgY2hhbmdlIHRoZSByZXF1ZXN0IG1ldGhvZFxuICAgIC8vIGlmIGl0IHBlcmZvcm1zIGFuIGF1dG9tYXRpYyByZWRpcmVjdGlvbiB0byB0aGF0IFVSSS5cbiAgICB2YXIgaGVhZGVyO1xuICAgIHZhciBoZWFkZXJzID0gdGhpcy5fb3B0aW9ucy5oZWFkZXJzO1xuICAgIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlICE9PSAzMDcgJiYgISh0aGlzLl9vcHRpb25zLm1ldGhvZCBpbiBTQUZFX01FVEhPRFMpKSB7XG4gICAgICB0aGlzLl9vcHRpb25zLm1ldGhvZCA9IFwiR0VUXCI7XG4gICAgICAvLyBEcm9wIGEgcG9zc2libGUgZW50aXR5IGFuZCBoZWFkZXJzIHJlbGF0ZWQgdG8gaXRcbiAgICAgIHRoaXMuX3JlcXVlc3RCb2R5QnVmZmVycyA9IFtdO1xuICAgICAgZm9yIChoZWFkZXIgaW4gaGVhZGVycykge1xuICAgICAgICBpZiAoL15jb250ZW50LS9pLnRlc3QoaGVhZGVyKSkge1xuICAgICAgICAgIGRlbGV0ZSBoZWFkZXJzW2hlYWRlcl07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBEcm9wIHRoZSBIb3N0IGhlYWRlciwgYXMgdGhlIHJlZGlyZWN0IG1pZ2h0IGxlYWQgdG8gYSBkaWZmZXJlbnQgaG9zdFxuICAgIGlmICghdGhpcy5faXNSZWRpcmVjdCkge1xuICAgICAgZm9yIChoZWFkZXIgaW4gaGVhZGVycykge1xuICAgICAgICBpZiAoL15ob3N0JC9pLnRlc3QoaGVhZGVyKSkge1xuICAgICAgICAgIGRlbGV0ZSBoZWFkZXJzW2hlYWRlcl07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBQZXJmb3JtIHRoZSByZWRpcmVjdGVkIHJlcXVlc3RcbiAgICB2YXIgcmVkaXJlY3RVcmwgPSB1cmwucmVzb2x2ZSh0aGlzLl9jdXJyZW50VXJsLCBsb2NhdGlvbik7XG4gICAgZGVidWcoXCJyZWRpcmVjdGluZyB0b1wiLCByZWRpcmVjdFVybCk7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLl9vcHRpb25zLCB1cmwucGFyc2UocmVkaXJlY3RVcmwpKTtcbiAgICB0aGlzLl9pc1JlZGlyZWN0ID0gdHJ1ZTtcbiAgICB0aGlzLl9wZXJmb3JtUmVxdWVzdCgpO1xuXG4gICAgLy8gRGlzY2FyZCB0aGUgcmVtYWluZGVyIG9mIHRoZSByZXNwb25zZSB0byBhdm9pZCB3YWl0aW5nIGZvciBkYXRhXG4gICAgcmVzcG9uc2UuZGVzdHJveSgpO1xuICB9XG4gIGVsc2Uge1xuICAgIC8vIFRoZSByZXNwb25zZSBpcyBub3QgYSByZWRpcmVjdDsgcmV0dXJuIGl0IGFzLWlzXG4gICAgcmVzcG9uc2UucmVzcG9uc2VVcmwgPSB0aGlzLl9jdXJyZW50VXJsO1xuICAgIHJlc3BvbnNlLnJlZGlyZWN0cyA9IHRoaXMuX3JlZGlyZWN0cztcbiAgICB0aGlzLmVtaXQoXCJyZXNwb25zZVwiLCByZXNwb25zZSk7XG5cbiAgICAvLyBDbGVhbiB1cFxuICAgIHRoaXMuX3JlcXVlc3RCb2R5QnVmZmVycyA9IFtdO1xuICB9XG59O1xuXG4vLyBXcmFwcyB0aGUga2V5L3ZhbHVlIG9iamVjdCBvZiBwcm90b2NvbHMgd2l0aCByZWRpcmVjdCBmdW5jdGlvbmFsaXR5XG5mdW5jdGlvbiB3cmFwKHByb3RvY29scykge1xuICAvLyBEZWZhdWx0IHNldHRpbmdzXG4gIHZhciBleHBvcnRzID0ge1xuICAgIG1heFJlZGlyZWN0czogMjEsXG4gICAgbWF4Qm9keUxlbmd0aDogMTAgKiAxMDI0ICogMTAyNCxcbiAgfTtcblxuICAvLyBXcmFwIGVhY2ggcHJvdG9jb2xcbiAgdmFyIG5hdGl2ZVByb3RvY29scyA9IHt9O1xuICBPYmplY3Qua2V5cyhwcm90b2NvbHMpLmZvckVhY2goZnVuY3Rpb24gKHNjaGVtZSkge1xuICAgIHZhciBwcm90b2NvbCA9IHNjaGVtZSArIFwiOlwiO1xuICAgIHZhciBuYXRpdmVQcm90b2NvbCA9IG5hdGl2ZVByb3RvY29sc1twcm90b2NvbF0gPSBwcm90b2NvbHNbc2NoZW1lXTtcbiAgICB2YXIgd3JhcHBlZFByb3RvY29sID0gZXhwb3J0c1tzY2hlbWVdID0gT2JqZWN0LmNyZWF0ZShuYXRpdmVQcm90b2NvbCk7XG5cbiAgICAvLyBFeGVjdXRlcyBhIHJlcXVlc3QsIGZvbGxvd2luZyByZWRpcmVjdHNcbiAgICB3cmFwcGVkUHJvdG9jb2wucmVxdWVzdCA9IGZ1bmN0aW9uIChvcHRpb25zLCBjYWxsYmFjaykge1xuICAgICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIG9wdGlvbnMgPSB1cmwucGFyc2Uob3B0aW9ucyk7XG4gICAgICAgIG9wdGlvbnMubWF4UmVkaXJlY3RzID0gZXhwb3J0cy5tYXhSZWRpcmVjdHM7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICAgIHByb3RvY29sOiBwcm90b2NvbCxcbiAgICAgICAgICBtYXhSZWRpcmVjdHM6IGV4cG9ydHMubWF4UmVkaXJlY3RzLFxuICAgICAgICAgIG1heEJvZHlMZW5ndGg6IGV4cG9ydHMubWF4Qm9keUxlbmd0aCxcbiAgICAgICAgfSwgb3B0aW9ucyk7XG4gICAgICB9XG4gICAgICBvcHRpb25zLm5hdGl2ZVByb3RvY29scyA9IG5hdGl2ZVByb3RvY29scztcbiAgICAgIGFzc2VydC5lcXVhbChvcHRpb25zLnByb3RvY29sLCBwcm90b2NvbCwgXCJwcm90b2NvbCBtaXNtYXRjaFwiKTtcbiAgICAgIGRlYnVnKFwib3B0aW9uc1wiLCBvcHRpb25zKTtcbiAgICAgIHJldHVybiBuZXcgUmVkaXJlY3RhYmxlUmVxdWVzdChvcHRpb25zLCBjYWxsYmFjayk7XG4gICAgfTtcblxuICAgIC8vIEV4ZWN1dGVzIGEgR0VUIHJlcXVlc3QsIGZvbGxvd2luZyByZWRpcmVjdHNcbiAgICB3cmFwcGVkUHJvdG9jb2wuZ2V0ID0gZnVuY3Rpb24gKG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gICAgICB2YXIgcmVxdWVzdCA9IHdyYXBwZWRQcm90b2NvbC5yZXF1ZXN0KG9wdGlvbnMsIGNhbGxiYWNrKTtcbiAgICAgIHJlcXVlc3QuZW5kKCk7XG4gICAgICByZXR1cm4gcmVxdWVzdDtcbiAgICB9O1xuICB9KTtcbiAgcmV0dXJuIGV4cG9ydHM7XG59XG5cbi8vIEV4cG9ydHNcbm1vZHVsZS5leHBvcnRzID0gd3JhcCh7IGh0dHA6IGh0dHAsIGh0dHBzOiBodHRwcyB9KTtcbm1vZHVsZS5leHBvcnRzLndyYXAgPSB3cmFwO1xuIiwiLyoqXG4gKiBUaGlzIGlzIHRoZSB3ZWIgYnJvd3NlciBpbXBsZW1lbnRhdGlvbiBvZiBgZGVidWcoKWAuXG4gKlxuICogRXhwb3NlIGBkZWJ1ZygpYCBhcyB0aGUgbW9kdWxlLlxuICovXG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZGVidWcnKTtcbmV4cG9ydHMubG9nID0gbG9nO1xuZXhwb3J0cy5mb3JtYXRBcmdzID0gZm9ybWF0QXJncztcbmV4cG9ydHMuc2F2ZSA9IHNhdmU7XG5leHBvcnRzLmxvYWQgPSBsb2FkO1xuZXhwb3J0cy51c2VDb2xvcnMgPSB1c2VDb2xvcnM7XG5leHBvcnRzLnN0b3JhZ2UgPSAndW5kZWZpbmVkJyAhPSB0eXBlb2YgY2hyb21lXG4gICAgICAgICAgICAgICAmJiAndW5kZWZpbmVkJyAhPSB0eXBlb2YgY2hyb21lLnN0b3JhZ2VcbiAgICAgICAgICAgICAgICAgID8gY2hyb21lLnN0b3JhZ2UubG9jYWxcbiAgICAgICAgICAgICAgICAgIDogbG9jYWxzdG9yYWdlKCk7XG5cbi8qKlxuICogQ29sb3JzLlxuICovXG5cbmV4cG9ydHMuY29sb3JzID0gW1xuICAnIzAwMDBDQycsICcjMDAwMEZGJywgJyMwMDMzQ0MnLCAnIzAwMzNGRicsICcjMDA2NkNDJywgJyMwMDY2RkYnLCAnIzAwOTlDQycsXG4gICcjMDA5OUZGJywgJyMwMENDMDAnLCAnIzAwQ0MzMycsICcjMDBDQzY2JywgJyMwMENDOTknLCAnIzAwQ0NDQycsICcjMDBDQ0ZGJyxcbiAgJyMzMzAwQ0MnLCAnIzMzMDBGRicsICcjMzMzM0NDJywgJyMzMzMzRkYnLCAnIzMzNjZDQycsICcjMzM2NkZGJywgJyMzMzk5Q0MnLFxuICAnIzMzOTlGRicsICcjMzNDQzAwJywgJyMzM0NDMzMnLCAnIzMzQ0M2NicsICcjMzNDQzk5JywgJyMzM0NDQ0MnLCAnIzMzQ0NGRicsXG4gICcjNjYwMENDJywgJyM2NjAwRkYnLCAnIzY2MzNDQycsICcjNjYzM0ZGJywgJyM2NkNDMDAnLCAnIzY2Q0MzMycsICcjOTkwMENDJyxcbiAgJyM5OTAwRkYnLCAnIzk5MzNDQycsICcjOTkzM0ZGJywgJyM5OUNDMDAnLCAnIzk5Q0MzMycsICcjQ0MwMDAwJywgJyNDQzAwMzMnLFxuICAnI0NDMDA2NicsICcjQ0MwMDk5JywgJyNDQzAwQ0MnLCAnI0NDMDBGRicsICcjQ0MzMzAwJywgJyNDQzMzMzMnLCAnI0NDMzM2NicsXG4gICcjQ0MzMzk5JywgJyNDQzMzQ0MnLCAnI0NDMzNGRicsICcjQ0M2NjAwJywgJyNDQzY2MzMnLCAnI0NDOTkwMCcsICcjQ0M5OTMzJyxcbiAgJyNDQ0NDMDAnLCAnI0NDQ0MzMycsICcjRkYwMDAwJywgJyNGRjAwMzMnLCAnI0ZGMDA2NicsICcjRkYwMDk5JywgJyNGRjAwQ0MnLFxuICAnI0ZGMDBGRicsICcjRkYzMzAwJywgJyNGRjMzMzMnLCAnI0ZGMzM2NicsICcjRkYzMzk5JywgJyNGRjMzQ0MnLCAnI0ZGMzNGRicsXG4gICcjRkY2NjAwJywgJyNGRjY2MzMnLCAnI0ZGOTkwMCcsICcjRkY5OTMzJywgJyNGRkNDMDAnLCAnI0ZGQ0MzMydcbl07XG5cbi8qKlxuICogQ3VycmVudGx5IG9ubHkgV2ViS2l0LWJhc2VkIFdlYiBJbnNwZWN0b3JzLCBGaXJlZm94ID49IHYzMSxcbiAqIGFuZCB0aGUgRmlyZWJ1ZyBleHRlbnNpb24gKGFueSBGaXJlZm94IHZlcnNpb24pIGFyZSBrbm93blxuICogdG8gc3VwcG9ydCBcIiVjXCIgQ1NTIGN1c3RvbWl6YXRpb25zLlxuICpcbiAqIFRPRE86IGFkZCBhIGBsb2NhbFN0b3JhZ2VgIHZhcmlhYmxlIHRvIGV4cGxpY2l0bHkgZW5hYmxlL2Rpc2FibGUgY29sb3JzXG4gKi9cblxuZnVuY3Rpb24gdXNlQ29sb3JzKCkge1xuICAvLyBOQjogSW4gYW4gRWxlY3Ryb24gcHJlbG9hZCBzY3JpcHQsIGRvY3VtZW50IHdpbGwgYmUgZGVmaW5lZCBidXQgbm90IGZ1bGx5XG4gIC8vIGluaXRpYWxpemVkLiBTaW5jZSB3ZSBrbm93IHdlJ3JlIGluIENocm9tZSwgd2UnbGwganVzdCBkZXRlY3QgdGhpcyBjYXNlXG4gIC8vIGV4cGxpY2l0bHlcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5wcm9jZXNzICYmIHdpbmRvdy5wcm9jZXNzLnR5cGUgPT09ICdyZW5kZXJlcicpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8vIEludGVybmV0IEV4cGxvcmVyIGFuZCBFZGdlIGRvIG5vdCBzdXBwb3J0IGNvbG9ycy5cbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci51c2VyQWdlbnQgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLm1hdGNoKC8oZWRnZXx0cmlkZW50KVxcLyhcXGQrKS8pKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gaXMgd2Via2l0PyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xNjQ1OTYwNi8zNzY3NzNcbiAgLy8gZG9jdW1lbnQgaXMgdW5kZWZpbmVkIGluIHJlYWN0LW5hdGl2ZTogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0LW5hdGl2ZS9wdWxsLzE2MzJcbiAgcmV0dXJuICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLldlYmtpdEFwcGVhcmFuY2UpIHx8XG4gICAgLy8gaXMgZmlyZWJ1Zz8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMzk4MTIwLzM3Njc3M1xuICAgICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuY29uc29sZSAmJiAod2luZG93LmNvbnNvbGUuZmlyZWJ1ZyB8fCAod2luZG93LmNvbnNvbGUuZXhjZXB0aW9uICYmIHdpbmRvdy5jb25zb2xlLnRhYmxlKSkpIHx8XG4gICAgLy8gaXMgZmlyZWZveCA+PSB2MzE/XG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9Ub29scy9XZWJfQ29uc29sZSNTdHlsaW5nX21lc3NhZ2VzXG4gICAgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci51c2VyQWdlbnQgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLm1hdGNoKC9maXJlZm94XFwvKFxcZCspLykgJiYgcGFyc2VJbnQoUmVnRXhwLiQxLCAxMCkgPj0gMzEpIHx8XG4gICAgLy8gZG91YmxlIGNoZWNrIHdlYmtpdCBpbiB1c2VyQWdlbnQganVzdCBpbiBjYXNlIHdlIGFyZSBpbiBhIHdvcmtlclxuICAgICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICYmIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5tYXRjaCgvYXBwbGV3ZWJraXRcXC8oXFxkKykvKSk7XG59XG5cbi8qKlxuICogTWFwICVqIHRvIGBKU09OLnN0cmluZ2lmeSgpYCwgc2luY2Ugbm8gV2ViIEluc3BlY3RvcnMgZG8gdGhhdCBieSBkZWZhdWx0LlxuICovXG5cbmV4cG9ydHMuZm9ybWF0dGVycy5qID0gZnVuY3Rpb24odikge1xuICB0cnkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh2KTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuICdbVW5leHBlY3RlZEpTT05QYXJzZUVycm9yXTogJyArIGVyci5tZXNzYWdlO1xuICB9XG59O1xuXG5cbi8qKlxuICogQ29sb3JpemUgbG9nIGFyZ3VtZW50cyBpZiBlbmFibGVkLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gZm9ybWF0QXJncyhhcmdzKSB7XG4gIHZhciB1c2VDb2xvcnMgPSB0aGlzLnVzZUNvbG9ycztcblxuICBhcmdzWzBdID0gKHVzZUNvbG9ycyA/ICclYycgOiAnJylcbiAgICArIHRoaXMubmFtZXNwYWNlXG4gICAgKyAodXNlQ29sb3JzID8gJyAlYycgOiAnICcpXG4gICAgKyBhcmdzWzBdXG4gICAgKyAodXNlQ29sb3JzID8gJyVjICcgOiAnICcpXG4gICAgKyAnKycgKyBleHBvcnRzLmh1bWFuaXplKHRoaXMuZGlmZik7XG5cbiAgaWYgKCF1c2VDb2xvcnMpIHJldHVybjtcblxuICB2YXIgYyA9ICdjb2xvcjogJyArIHRoaXMuY29sb3I7XG4gIGFyZ3Muc3BsaWNlKDEsIDAsIGMsICdjb2xvcjogaW5oZXJpdCcpXG5cbiAgLy8gdGhlIGZpbmFsIFwiJWNcIiBpcyBzb21ld2hhdCB0cmlja3ksIGJlY2F1c2UgdGhlcmUgY291bGQgYmUgb3RoZXJcbiAgLy8gYXJndW1lbnRzIHBhc3NlZCBlaXRoZXIgYmVmb3JlIG9yIGFmdGVyIHRoZSAlYywgc28gd2UgbmVlZCB0b1xuICAvLyBmaWd1cmUgb3V0IHRoZSBjb3JyZWN0IGluZGV4IHRvIGluc2VydCB0aGUgQ1NTIGludG9cbiAgdmFyIGluZGV4ID0gMDtcbiAgdmFyIGxhc3RDID0gMDtcbiAgYXJnc1swXS5yZXBsYWNlKC8lW2EtekEtWiVdL2csIGZ1bmN0aW9uKG1hdGNoKSB7XG4gICAgaWYgKCclJScgPT09IG1hdGNoKSByZXR1cm47XG4gICAgaW5kZXgrKztcbiAgICBpZiAoJyVjJyA9PT0gbWF0Y2gpIHtcbiAgICAgIC8vIHdlIG9ubHkgYXJlIGludGVyZXN0ZWQgaW4gdGhlICpsYXN0KiAlY1xuICAgICAgLy8gKHRoZSB1c2VyIG1heSBoYXZlIHByb3ZpZGVkIHRoZWlyIG93bilcbiAgICAgIGxhc3RDID0gaW5kZXg7XG4gICAgfVxuICB9KTtcblxuICBhcmdzLnNwbGljZShsYXN0QywgMCwgYyk7XG59XG5cbi8qKlxuICogSW52b2tlcyBgY29uc29sZS5sb2coKWAgd2hlbiBhdmFpbGFibGUuXG4gKiBOby1vcCB3aGVuIGBjb25zb2xlLmxvZ2AgaXMgbm90IGEgXCJmdW5jdGlvblwiLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gbG9nKCkge1xuICAvLyB0aGlzIGhhY2tlcnkgaXMgcmVxdWlyZWQgZm9yIElFOC85LCB3aGVyZVxuICAvLyB0aGUgYGNvbnNvbGUubG9nYCBmdW5jdGlvbiBkb2Vzbid0IGhhdmUgJ2FwcGx5J1xuICByZXR1cm4gJ29iamVjdCcgPT09IHR5cGVvZiBjb25zb2xlXG4gICAgJiYgY29uc29sZS5sb2dcbiAgICAmJiBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbChjb25zb2xlLmxvZywgY29uc29sZSwgYXJndW1lbnRzKTtcbn1cblxuLyoqXG4gKiBTYXZlIGBuYW1lc3BhY2VzYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gc2F2ZShuYW1lc3BhY2VzKSB7XG4gIHRyeSB7XG4gICAgaWYgKG51bGwgPT0gbmFtZXNwYWNlcykge1xuICAgICAgZXhwb3J0cy5zdG9yYWdlLnJlbW92ZUl0ZW0oJ2RlYnVnJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4cG9ydHMuc3RvcmFnZS5kZWJ1ZyA9IG5hbWVzcGFjZXM7XG4gICAgfVxuICB9IGNhdGNoKGUpIHt9XG59XG5cbi8qKlxuICogTG9hZCBgbmFtZXNwYWNlc2AuXG4gKlxuICogQHJldHVybiB7U3RyaW5nfSByZXR1cm5zIHRoZSBwcmV2aW91c2x5IHBlcnNpc3RlZCBkZWJ1ZyBtb2Rlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbG9hZCgpIHtcbiAgdmFyIHI7XG4gIHRyeSB7XG4gICAgciA9IGV4cG9ydHMuc3RvcmFnZS5kZWJ1ZztcbiAgfSBjYXRjaChlKSB7fVxuXG4gIC8vIElmIGRlYnVnIGlzbid0IHNldCBpbiBMUywgYW5kIHdlJ3JlIGluIEVsZWN0cm9uLCB0cnkgdG8gbG9hZCAkREVCVUdcbiAgaWYgKCFyICYmIHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiAnZW52JyBpbiBwcm9jZXNzKSB7XG4gICAgciA9IHByb2Nlc3MuZW52LkRFQlVHO1xuICB9XG5cbiAgcmV0dXJuIHI7XG59XG5cbi8qKlxuICogRW5hYmxlIG5hbWVzcGFjZXMgbGlzdGVkIGluIGBsb2NhbFN0b3JhZ2UuZGVidWdgIGluaXRpYWxseS5cbiAqL1xuXG5leHBvcnRzLmVuYWJsZShsb2FkKCkpO1xuXG4vKipcbiAqIExvY2Fsc3RvcmFnZSBhdHRlbXB0cyB0byByZXR1cm4gdGhlIGxvY2Fsc3RvcmFnZS5cbiAqXG4gKiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIHNhZmFyaSB0aHJvd3NcbiAqIHdoZW4gYSB1c2VyIGRpc2FibGVzIGNvb2tpZXMvbG9jYWxzdG9yYWdlXG4gKiBhbmQgeW91IGF0dGVtcHQgdG8gYWNjZXNzIGl0LlxuICpcbiAqIEByZXR1cm4ge0xvY2FsU3RvcmFnZX1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGxvY2Fsc3RvcmFnZSgpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gd2luZG93LmxvY2FsU3RvcmFnZTtcbiAgfSBjYXRjaCAoZSkge31cbn1cbiIsIlxuLyoqXG4gKiBUaGlzIGlzIHRoZSBjb21tb24gbG9naWMgZm9yIGJvdGggdGhlIE5vZGUuanMgYW5kIHdlYiBicm93c2VyXG4gKiBpbXBsZW1lbnRhdGlvbnMgb2YgYGRlYnVnKClgLlxuICpcbiAqIEV4cG9zZSBgZGVidWcoKWAgYXMgdGhlIG1vZHVsZS5cbiAqL1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVEZWJ1Zy5kZWJ1ZyA9IGNyZWF0ZURlYnVnWydkZWZhdWx0J10gPSBjcmVhdGVEZWJ1ZztcbmV4cG9ydHMuY29lcmNlID0gY29lcmNlO1xuZXhwb3J0cy5kaXNhYmxlID0gZGlzYWJsZTtcbmV4cG9ydHMuZW5hYmxlID0gZW5hYmxlO1xuZXhwb3J0cy5lbmFibGVkID0gZW5hYmxlZDtcbmV4cG9ydHMuaHVtYW5pemUgPSByZXF1aXJlKCdtcycpO1xuXG4vKipcbiAqIEFjdGl2ZSBgZGVidWdgIGluc3RhbmNlcy5cbiAqL1xuZXhwb3J0cy5pbnN0YW5jZXMgPSBbXTtcblxuLyoqXG4gKiBUaGUgY3VycmVudGx5IGFjdGl2ZSBkZWJ1ZyBtb2RlIG5hbWVzLCBhbmQgbmFtZXMgdG8gc2tpcC5cbiAqL1xuXG5leHBvcnRzLm5hbWVzID0gW107XG5leHBvcnRzLnNraXBzID0gW107XG5cbi8qKlxuICogTWFwIG9mIHNwZWNpYWwgXCIlblwiIGhhbmRsaW5nIGZ1bmN0aW9ucywgZm9yIHRoZSBkZWJ1ZyBcImZvcm1hdFwiIGFyZ3VtZW50LlxuICpcbiAqIFZhbGlkIGtleSBuYW1lcyBhcmUgYSBzaW5nbGUsIGxvd2VyIG9yIHVwcGVyLWNhc2UgbGV0dGVyLCBpLmUuIFwiblwiIGFuZCBcIk5cIi5cbiAqL1xuXG5leHBvcnRzLmZvcm1hdHRlcnMgPSB7fTtcblxuLyoqXG4gKiBTZWxlY3QgYSBjb2xvci5cbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VcbiAqIEByZXR1cm4ge051bWJlcn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHNlbGVjdENvbG9yKG5hbWVzcGFjZSkge1xuICB2YXIgaGFzaCA9IDAsIGk7XG5cbiAgZm9yIChpIGluIG5hbWVzcGFjZSkge1xuICAgIGhhc2ggID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgKyBuYW1lc3BhY2UuY2hhckNvZGVBdChpKTtcbiAgICBoYXNoIHw9IDA7IC8vIENvbnZlcnQgdG8gMzJiaXQgaW50ZWdlclxuICB9XG5cbiAgcmV0dXJuIGV4cG9ydHMuY29sb3JzW01hdGguYWJzKGhhc2gpICUgZXhwb3J0cy5jb2xvcnMubGVuZ3RoXTtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBkZWJ1Z2dlciB3aXRoIHRoZSBnaXZlbiBgbmFtZXNwYWNlYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gY3JlYXRlRGVidWcobmFtZXNwYWNlKSB7XG5cbiAgdmFyIHByZXZUaW1lO1xuXG4gIGZ1bmN0aW9uIGRlYnVnKCkge1xuICAgIC8vIGRpc2FibGVkP1xuICAgIGlmICghZGVidWcuZW5hYmxlZCkgcmV0dXJuO1xuXG4gICAgdmFyIHNlbGYgPSBkZWJ1ZztcblxuICAgIC8vIHNldCBgZGlmZmAgdGltZXN0YW1wXG4gICAgdmFyIGN1cnIgPSArbmV3IERhdGUoKTtcbiAgICB2YXIgbXMgPSBjdXJyIC0gKHByZXZUaW1lIHx8IGN1cnIpO1xuICAgIHNlbGYuZGlmZiA9IG1zO1xuICAgIHNlbGYucHJldiA9IHByZXZUaW1lO1xuICAgIHNlbGYuY3VyciA9IGN1cnI7XG4gICAgcHJldlRpbWUgPSBjdXJyO1xuXG4gICAgLy8gdHVybiB0aGUgYGFyZ3VtZW50c2AgaW50byBhIHByb3BlciBBcnJheVxuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG5cbiAgICBhcmdzWzBdID0gZXhwb3J0cy5jb2VyY2UoYXJnc1swXSk7XG5cbiAgICBpZiAoJ3N0cmluZycgIT09IHR5cGVvZiBhcmdzWzBdKSB7XG4gICAgICAvLyBhbnl0aGluZyBlbHNlIGxldCdzIGluc3BlY3Qgd2l0aCAlT1xuICAgICAgYXJncy51bnNoaWZ0KCclTycpO1xuICAgIH1cblxuICAgIC8vIGFwcGx5IGFueSBgZm9ybWF0dGVyc2AgdHJhbnNmb3JtYXRpb25zXG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICBhcmdzWzBdID0gYXJnc1swXS5yZXBsYWNlKC8lKFthLXpBLVolXSkvZywgZnVuY3Rpb24obWF0Y2gsIGZvcm1hdCkge1xuICAgICAgLy8gaWYgd2UgZW5jb3VudGVyIGFuIGVzY2FwZWQgJSB0aGVuIGRvbid0IGluY3JlYXNlIHRoZSBhcnJheSBpbmRleFxuICAgICAgaWYgKG1hdGNoID09PSAnJSUnKSByZXR1cm4gbWF0Y2g7XG4gICAgICBpbmRleCsrO1xuICAgICAgdmFyIGZvcm1hdHRlciA9IGV4cG9ydHMuZm9ybWF0dGVyc1tmb3JtYXRdO1xuICAgICAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBmb3JtYXR0ZXIpIHtcbiAgICAgICAgdmFyIHZhbCA9IGFyZ3NbaW5kZXhdO1xuICAgICAgICBtYXRjaCA9IGZvcm1hdHRlci5jYWxsKHNlbGYsIHZhbCk7XG5cbiAgICAgICAgLy8gbm93IHdlIG5lZWQgdG8gcmVtb3ZlIGBhcmdzW2luZGV4XWAgc2luY2UgaXQncyBpbmxpbmVkIGluIHRoZSBgZm9ybWF0YFxuICAgICAgICBhcmdzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIGluZGV4LS07XG4gICAgICB9XG4gICAgICByZXR1cm4gbWF0Y2g7XG4gICAgfSk7XG5cbiAgICAvLyBhcHBseSBlbnYtc3BlY2lmaWMgZm9ybWF0dGluZyAoY29sb3JzLCBldGMuKVxuICAgIGV4cG9ydHMuZm9ybWF0QXJncy5jYWxsKHNlbGYsIGFyZ3MpO1xuXG4gICAgdmFyIGxvZ0ZuID0gZGVidWcubG9nIHx8IGV4cG9ydHMubG9nIHx8IGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSk7XG4gICAgbG9nRm4uYXBwbHkoc2VsZiwgYXJncyk7XG4gIH1cblxuICBkZWJ1Zy5uYW1lc3BhY2UgPSBuYW1lc3BhY2U7XG4gIGRlYnVnLmVuYWJsZWQgPSBleHBvcnRzLmVuYWJsZWQobmFtZXNwYWNlKTtcbiAgZGVidWcudXNlQ29sb3JzID0gZXhwb3J0cy51c2VDb2xvcnMoKTtcbiAgZGVidWcuY29sb3IgPSBzZWxlY3RDb2xvcihuYW1lc3BhY2UpO1xuICBkZWJ1Zy5kZXN0cm95ID0gZGVzdHJveTtcblxuICAvLyBlbnYtc3BlY2lmaWMgaW5pdGlhbGl6YXRpb24gbG9naWMgZm9yIGRlYnVnIGluc3RhbmNlc1xuICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGV4cG9ydHMuaW5pdCkge1xuICAgIGV4cG9ydHMuaW5pdChkZWJ1Zyk7XG4gIH1cblxuICBleHBvcnRzLmluc3RhbmNlcy5wdXNoKGRlYnVnKTtcblxuICByZXR1cm4gZGVidWc7XG59XG5cbmZ1bmN0aW9uIGRlc3Ryb3kgKCkge1xuICB2YXIgaW5kZXggPSBleHBvcnRzLmluc3RhbmNlcy5pbmRleE9mKHRoaXMpO1xuICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgZXhwb3J0cy5pbnN0YW5jZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuLyoqXG4gKiBFbmFibGVzIGEgZGVidWcgbW9kZSBieSBuYW1lc3BhY2VzLiBUaGlzIGNhbiBpbmNsdWRlIG1vZGVzXG4gKiBzZXBhcmF0ZWQgYnkgYSBjb2xvbiBhbmQgd2lsZGNhcmRzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGVuYWJsZShuYW1lc3BhY2VzKSB7XG4gIGV4cG9ydHMuc2F2ZShuYW1lc3BhY2VzKTtcblxuICBleHBvcnRzLm5hbWVzID0gW107XG4gIGV4cG9ydHMuc2tpcHMgPSBbXTtcblxuICB2YXIgaTtcbiAgdmFyIHNwbGl0ID0gKHR5cGVvZiBuYW1lc3BhY2VzID09PSAnc3RyaW5nJyA/IG5hbWVzcGFjZXMgOiAnJykuc3BsaXQoL1tcXHMsXSsvKTtcbiAgdmFyIGxlbiA9IHNwbGl0Lmxlbmd0aDtcblxuICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBpZiAoIXNwbGl0W2ldKSBjb250aW51ZTsgLy8gaWdub3JlIGVtcHR5IHN0cmluZ3NcbiAgICBuYW1lc3BhY2VzID0gc3BsaXRbaV0ucmVwbGFjZSgvXFwqL2csICcuKj8nKTtcbiAgICBpZiAobmFtZXNwYWNlc1swXSA9PT0gJy0nKSB7XG4gICAgICBleHBvcnRzLnNraXBzLnB1c2gobmV3IFJlZ0V4cCgnXicgKyBuYW1lc3BhY2VzLnN1YnN0cigxKSArICckJykpO1xuICAgIH0gZWxzZSB7XG4gICAgICBleHBvcnRzLm5hbWVzLnB1c2gobmV3IFJlZ0V4cCgnXicgKyBuYW1lc3BhY2VzICsgJyQnKSk7XG4gICAgfVxuICB9XG5cbiAgZm9yIChpID0gMDsgaSA8IGV4cG9ydHMuaW5zdGFuY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGluc3RhbmNlID0gZXhwb3J0cy5pbnN0YW5jZXNbaV07XG4gICAgaW5zdGFuY2UuZW5hYmxlZCA9IGV4cG9ydHMuZW5hYmxlZChpbnN0YW5jZS5uYW1lc3BhY2UpO1xuICB9XG59XG5cbi8qKlxuICogRGlzYWJsZSBkZWJ1ZyBvdXRwdXQuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBkaXNhYmxlKCkge1xuICBleHBvcnRzLmVuYWJsZSgnJyk7XG59XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBtb2RlIG5hbWUgaXMgZW5hYmxlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBlbmFibGVkKG5hbWUpIHtcbiAgaWYgKG5hbWVbbmFtZS5sZW5ndGggLSAxXSA9PT0gJyonKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgdmFyIGksIGxlbjtcbiAgZm9yIChpID0gMCwgbGVuID0gZXhwb3J0cy5za2lwcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGlmIChleHBvcnRzLnNraXBzW2ldLnRlc3QobmFtZSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgZm9yIChpID0gMCwgbGVuID0gZXhwb3J0cy5uYW1lcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGlmIChleHBvcnRzLm5hbWVzW2ldLnRlc3QobmFtZSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogQ29lcmNlIGB2YWxgLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbFxuICogQHJldHVybiB7TWl4ZWR9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBjb2VyY2UodmFsKSB7XG4gIGlmICh2YWwgaW5zdGFuY2VvZiBFcnJvcikgcmV0dXJuIHZhbC5zdGFjayB8fCB2YWwubWVzc2FnZTtcbiAgcmV0dXJuIHZhbDtcbn1cbiIsIi8qKlxuICogRGV0ZWN0IEVsZWN0cm9uIHJlbmRlcmVyIHByb2Nlc3MsIHdoaWNoIGlzIG5vZGUsIGJ1dCB3ZSBzaG91bGRcbiAqIHRyZWF0IGFzIGEgYnJvd3Nlci5cbiAqL1xuXG5pZiAodHlwZW9mIHByb2Nlc3MgPT09ICd1bmRlZmluZWQnIHx8IHByb2Nlc3MudHlwZSA9PT0gJ3JlbmRlcmVyJykge1xuICBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vYnJvd3Nlci5qcycpO1xufSBlbHNlIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL25vZGUuanMnKTtcbn1cbiIsIi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIgdHR5ID0gcmVxdWlyZSgndHR5Jyk7XG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKTtcblxuLyoqXG4gKiBUaGlzIGlzIHRoZSBOb2RlLmpzIGltcGxlbWVudGF0aW9uIG9mIGBkZWJ1ZygpYC5cbiAqXG4gKiBFeHBvc2UgYGRlYnVnKClgIGFzIHRoZSBtb2R1bGUuXG4gKi9cblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9kZWJ1ZycpO1xuZXhwb3J0cy5pbml0ID0gaW5pdDtcbmV4cG9ydHMubG9nID0gbG9nO1xuZXhwb3J0cy5mb3JtYXRBcmdzID0gZm9ybWF0QXJncztcbmV4cG9ydHMuc2F2ZSA9IHNhdmU7XG5leHBvcnRzLmxvYWQgPSBsb2FkO1xuZXhwb3J0cy51c2VDb2xvcnMgPSB1c2VDb2xvcnM7XG5cbi8qKlxuICogQ29sb3JzLlxuICovXG5cbmV4cG9ydHMuY29sb3JzID0gWyA2LCAyLCAzLCA0LCA1LCAxIF07XG5cbnRyeSB7XG4gIHZhciBzdXBwb3J0c0NvbG9yID0gcmVxdWlyZSgnc3VwcG9ydHMtY29sb3InKTtcbiAgaWYgKHN1cHBvcnRzQ29sb3IgJiYgc3VwcG9ydHNDb2xvci5sZXZlbCA+PSAyKSB7XG4gICAgZXhwb3J0cy5jb2xvcnMgPSBbXG4gICAgICAyMCwgMjEsIDI2LCAyNywgMzIsIDMzLCAzOCwgMzksIDQwLCA0MSwgNDIsIDQzLCA0NCwgNDUsIDU2LCA1NywgNjIsIDYzLCA2OCxcbiAgICAgIDY5LCA3NCwgNzUsIDc2LCA3NywgNzgsIDc5LCA4MCwgODEsIDkyLCA5MywgOTgsIDk5LCAxMTIsIDExMywgMTI4LCAxMjksIDEzNCxcbiAgICAgIDEzNSwgMTQ4LCAxNDksIDE2MCwgMTYxLCAxNjIsIDE2MywgMTY0LCAxNjUsIDE2NiwgMTY3LCAxNjgsIDE2OSwgMTcwLCAxNzEsXG4gICAgICAxNzIsIDE3MywgMTc4LCAxNzksIDE4NCwgMTg1LCAxOTYsIDE5NywgMTk4LCAxOTksIDIwMCwgMjAxLCAyMDIsIDIwMywgMjA0LFxuICAgICAgMjA1LCAyMDYsIDIwNywgMjA4LCAyMDksIDIxNCwgMjE1LCAyMjAsIDIyMVxuICAgIF07XG4gIH1cbn0gY2F0Y2ggKGVycikge1xuICAvLyBzd2FsbG93IC0gd2Ugb25seSBjYXJlIGlmIGBzdXBwb3J0cy1jb2xvcmAgaXMgYXZhaWxhYmxlOyBpdCBkb2Vzbid0IGhhdmUgdG8gYmUuXG59XG5cbi8qKlxuICogQnVpbGQgdXAgdGhlIGRlZmF1bHQgYGluc3BlY3RPcHRzYCBvYmplY3QgZnJvbSB0aGUgZW52aXJvbm1lbnQgdmFyaWFibGVzLlxuICpcbiAqICAgJCBERUJVR19DT0xPUlM9bm8gREVCVUdfREVQVEg9MTAgREVCVUdfU0hPV19ISURERU49ZW5hYmxlZCBub2RlIHNjcmlwdC5qc1xuICovXG5cbmV4cG9ydHMuaW5zcGVjdE9wdHMgPSBPYmplY3Qua2V5cyhwcm9jZXNzLmVudikuZmlsdGVyKGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIC9eZGVidWdfL2kudGVzdChrZXkpO1xufSkucmVkdWNlKGZ1bmN0aW9uIChvYmosIGtleSkge1xuICAvLyBjYW1lbC1jYXNlXG4gIHZhciBwcm9wID0ga2V5XG4gICAgLnN1YnN0cmluZyg2KVxuICAgIC50b0xvd2VyQ2FzZSgpXG4gICAgLnJlcGxhY2UoL18oW2Etel0pL2csIGZ1bmN0aW9uIChfLCBrKSB7IHJldHVybiBrLnRvVXBwZXJDYXNlKCkgfSk7XG5cbiAgLy8gY29lcmNlIHN0cmluZyB2YWx1ZSBpbnRvIEpTIHZhbHVlXG4gIHZhciB2YWwgPSBwcm9jZXNzLmVudltrZXldO1xuICBpZiAoL14oeWVzfG9ufHRydWV8ZW5hYmxlZCkkL2kudGVzdCh2YWwpKSB2YWwgPSB0cnVlO1xuICBlbHNlIGlmICgvXihub3xvZmZ8ZmFsc2V8ZGlzYWJsZWQpJC9pLnRlc3QodmFsKSkgdmFsID0gZmFsc2U7XG4gIGVsc2UgaWYgKHZhbCA9PT0gJ251bGwnKSB2YWwgPSBudWxsO1xuICBlbHNlIHZhbCA9IE51bWJlcih2YWwpO1xuXG4gIG9ialtwcm9wXSA9IHZhbDtcbiAgcmV0dXJuIG9iajtcbn0sIHt9KTtcblxuLyoqXG4gKiBJcyBzdGRvdXQgYSBUVFk/IENvbG9yZWQgb3V0cHV0IGlzIGVuYWJsZWQgd2hlbiBgdHJ1ZWAuXG4gKi9cblxuZnVuY3Rpb24gdXNlQ29sb3JzKCkge1xuICByZXR1cm4gJ2NvbG9ycycgaW4gZXhwb3J0cy5pbnNwZWN0T3B0c1xuICAgID8gQm9vbGVhbihleHBvcnRzLmluc3BlY3RPcHRzLmNvbG9ycylcbiAgICA6IHR0eS5pc2F0dHkocHJvY2Vzcy5zdGRlcnIuZmQpO1xufVxuXG4vKipcbiAqIE1hcCAlbyB0byBgdXRpbC5pbnNwZWN0KClgLCBhbGwgb24gYSBzaW5nbGUgbGluZS5cbiAqL1xuXG5leHBvcnRzLmZvcm1hdHRlcnMubyA9IGZ1bmN0aW9uKHYpIHtcbiAgdGhpcy5pbnNwZWN0T3B0cy5jb2xvcnMgPSB0aGlzLnVzZUNvbG9ycztcbiAgcmV0dXJuIHV0aWwuaW5zcGVjdCh2LCB0aGlzLmluc3BlY3RPcHRzKVxuICAgIC5zcGxpdCgnXFxuJykubWFwKGZ1bmN0aW9uKHN0cikge1xuICAgICAgcmV0dXJuIHN0ci50cmltKClcbiAgICB9KS5qb2luKCcgJyk7XG59O1xuXG4vKipcbiAqIE1hcCAlbyB0byBgdXRpbC5pbnNwZWN0KClgLCBhbGxvd2luZyBtdWx0aXBsZSBsaW5lcyBpZiBuZWVkZWQuXG4gKi9cblxuZXhwb3J0cy5mb3JtYXR0ZXJzLk8gPSBmdW5jdGlvbih2KSB7XG4gIHRoaXMuaW5zcGVjdE9wdHMuY29sb3JzID0gdGhpcy51c2VDb2xvcnM7XG4gIHJldHVybiB1dGlsLmluc3BlY3QodiwgdGhpcy5pbnNwZWN0T3B0cyk7XG59O1xuXG4vKipcbiAqIEFkZHMgQU5TSSBjb2xvciBlc2NhcGUgY29kZXMgaWYgZW5hYmxlZC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGZvcm1hdEFyZ3MoYXJncykge1xuICB2YXIgbmFtZSA9IHRoaXMubmFtZXNwYWNlO1xuICB2YXIgdXNlQ29sb3JzID0gdGhpcy51c2VDb2xvcnM7XG5cbiAgaWYgKHVzZUNvbG9ycykge1xuICAgIHZhciBjID0gdGhpcy5jb2xvcjtcbiAgICB2YXIgY29sb3JDb2RlID0gJ1xcdTAwMWJbMycgKyAoYyA8IDggPyBjIDogJzg7NTsnICsgYyk7XG4gICAgdmFyIHByZWZpeCA9ICcgICcgKyBjb2xvckNvZGUgKyAnOzFtJyArIG5hbWUgKyAnICcgKyAnXFx1MDAxYlswbSc7XG5cbiAgICBhcmdzWzBdID0gcHJlZml4ICsgYXJnc1swXS5zcGxpdCgnXFxuJykuam9pbignXFxuJyArIHByZWZpeCk7XG4gICAgYXJncy5wdXNoKGNvbG9yQ29kZSArICdtKycgKyBleHBvcnRzLmh1bWFuaXplKHRoaXMuZGlmZikgKyAnXFx1MDAxYlswbScpO1xuICB9IGVsc2Uge1xuICAgIGFyZ3NbMF0gPSBnZXREYXRlKCkgKyBuYW1lICsgJyAnICsgYXJnc1swXTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXREYXRlKCkge1xuICBpZiAoZXhwb3J0cy5pbnNwZWN0T3B0cy5oaWRlRGF0ZSkge1xuICAgIHJldHVybiAnJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IERhdGUoKS50b0lTT1N0cmluZygpICsgJyAnO1xuICB9XG59XG5cbi8qKlxuICogSW52b2tlcyBgdXRpbC5mb3JtYXQoKWAgd2l0aCB0aGUgc3BlY2lmaWVkIGFyZ3VtZW50cyBhbmQgd3JpdGVzIHRvIHN0ZGVyci5cbiAqL1xuXG5mdW5jdGlvbiBsb2coKSB7XG4gIHJldHVybiBwcm9jZXNzLnN0ZGVyci53cml0ZSh1dGlsLmZvcm1hdC5hcHBseSh1dGlsLCBhcmd1bWVudHMpICsgJ1xcbicpO1xufVxuXG4vKipcbiAqIFNhdmUgYG5hbWVzcGFjZXNgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBzYXZlKG5hbWVzcGFjZXMpIHtcbiAgaWYgKG51bGwgPT0gbmFtZXNwYWNlcykge1xuICAgIC8vIElmIHlvdSBzZXQgYSBwcm9jZXNzLmVudiBmaWVsZCB0byBudWxsIG9yIHVuZGVmaW5lZCwgaXQgZ2V0cyBjYXN0IHRvIHRoZVxuICAgIC8vIHN0cmluZyAnbnVsbCcgb3IgJ3VuZGVmaW5lZCcuIEp1c3QgZGVsZXRlIGluc3RlYWQuXG4gICAgZGVsZXRlIHByb2Nlc3MuZW52LkRFQlVHO1xuICB9IGVsc2Uge1xuICAgIHByb2Nlc3MuZW52LkRFQlVHID0gbmFtZXNwYWNlcztcbiAgfVxufVxuXG4vKipcbiAqIExvYWQgYG5hbWVzcGFjZXNgLlxuICpcbiAqIEByZXR1cm4ge1N0cmluZ30gcmV0dXJucyB0aGUgcHJldmlvdXNseSBwZXJzaXN0ZWQgZGVidWcgbW9kZXNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGxvYWQoKSB7XG4gIHJldHVybiBwcm9jZXNzLmVudi5ERUJVRztcbn1cblxuLyoqXG4gKiBJbml0IGxvZ2ljIGZvciBgZGVidWdgIGluc3RhbmNlcy5cbiAqXG4gKiBDcmVhdGUgYSBuZXcgYGluc3BlY3RPcHRzYCBvYmplY3QgaW4gY2FzZSBgdXNlQ29sb3JzYCBpcyBzZXRcbiAqIGRpZmZlcmVudGx5IGZvciBhIHBhcnRpY3VsYXIgYGRlYnVnYCBpbnN0YW5jZS5cbiAqL1xuXG5mdW5jdGlvbiBpbml0IChkZWJ1Zykge1xuICBkZWJ1Zy5pbnNwZWN0T3B0cyA9IHt9O1xuXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMoZXhwb3J0cy5pbnNwZWN0T3B0cyk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgIGRlYnVnLmluc3BlY3RPcHRzW2tleXNbaV1dID0gZXhwb3J0cy5pbnNwZWN0T3B0c1trZXlzW2ldXTtcbiAgfVxufVxuXG4vKipcbiAqIEVuYWJsZSBuYW1lc3BhY2VzIGxpc3RlZCBpbiBgcHJvY2Vzcy5lbnYuREVCVUdgIGluaXRpYWxseS5cbiAqL1xuXG5leHBvcnRzLmVuYWJsZShsb2FkKCkpO1xuIiwiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSAoZmxhZywgYXJndikgPT4ge1xuXHRhcmd2ID0gYXJndiB8fCBwcm9jZXNzLmFyZ3Y7XG5cdGNvbnN0IHByZWZpeCA9IGZsYWcuc3RhcnRzV2l0aCgnLScpID8gJycgOiAoZmxhZy5sZW5ndGggPT09IDEgPyAnLScgOiAnLS0nKTtcblx0Y29uc3QgcG9zID0gYXJndi5pbmRleE9mKHByZWZpeCArIGZsYWcpO1xuXHRjb25zdCB0ZXJtaW5hdG9yUG9zID0gYXJndi5pbmRleE9mKCctLScpO1xuXHRyZXR1cm4gcG9zICE9PSAtMSAmJiAodGVybWluYXRvclBvcyA9PT0gLTEgPyB0cnVlIDogcG9zIDwgdGVybWluYXRvclBvcyk7XG59O1xuIiwiLyoqXG4gKiBIZWxwZXJzLlxuICovXG5cbnZhciBzID0gMTAwMDtcbnZhciBtID0gcyAqIDYwO1xudmFyIGggPSBtICogNjA7XG52YXIgZCA9IGggKiAyNDtcbnZhciB5ID0gZCAqIDM2NS4yNTtcblxuLyoqXG4gKiBQYXJzZSBvciBmb3JtYXQgdGhlIGdpdmVuIGB2YWxgLlxuICpcbiAqIE9wdGlvbnM6XG4gKlxuICogIC0gYGxvbmdgIHZlcmJvc2UgZm9ybWF0dGluZyBbZmFsc2VdXG4gKlxuICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSB2YWxcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc11cbiAqIEB0aHJvd3Mge0Vycm9yfSB0aHJvdyBhbiBlcnJvciBpZiB2YWwgaXMgbm90IGEgbm9uLWVtcHR5IHN0cmluZyBvciBhIG51bWJlclxuICogQHJldHVybiB7U3RyaW5nfE51bWJlcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih2YWwsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbDtcbiAgaWYgKHR5cGUgPT09ICdzdHJpbmcnICYmIHZhbC5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuIHBhcnNlKHZhbCk7XG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gJ251bWJlcicgJiYgaXNOYU4odmFsKSA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm4gb3B0aW9ucy5sb25nID8gZm10TG9uZyh2YWwpIDogZm10U2hvcnQodmFsKTtcbiAgfVxuICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgJ3ZhbCBpcyBub3QgYSBub24tZW1wdHkgc3RyaW5nIG9yIGEgdmFsaWQgbnVtYmVyLiB2YWw9JyArXG4gICAgICBKU09OLnN0cmluZ2lmeSh2YWwpXG4gICk7XG59O1xuXG4vKipcbiAqIFBhcnNlIHRoZSBnaXZlbiBgc3RyYCBhbmQgcmV0dXJuIG1pbGxpc2Vjb25kcy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBwYXJzZShzdHIpIHtcbiAgc3RyID0gU3RyaW5nKHN0cik7XG4gIGlmIChzdHIubGVuZ3RoID4gMTAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBtYXRjaCA9IC9eKCg/OlxcZCspP1xcLj9cXGQrKSAqKG1pbGxpc2Vjb25kcz98bXNlY3M/fG1zfHNlY29uZHM/fHNlY3M/fHN8bWludXRlcz98bWlucz98bXxob3Vycz98aHJzP3xofGRheXM/fGR8eWVhcnM/fHlycz98eSk/JC9pLmV4ZWMoXG4gICAgc3RyXG4gICk7XG4gIGlmICghbWF0Y2gpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIG4gPSBwYXJzZUZsb2F0KG1hdGNoWzFdKTtcbiAgdmFyIHR5cGUgPSAobWF0Y2hbMl0gfHwgJ21zJykudG9Mb3dlckNhc2UoKTtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAneWVhcnMnOlxuICAgIGNhc2UgJ3llYXInOlxuICAgIGNhc2UgJ3lycyc6XG4gICAgY2FzZSAneXInOlxuICAgIGNhc2UgJ3knOlxuICAgICAgcmV0dXJuIG4gKiB5O1xuICAgIGNhc2UgJ2RheXMnOlxuICAgIGNhc2UgJ2RheSc6XG4gICAgY2FzZSAnZCc6XG4gICAgICByZXR1cm4gbiAqIGQ7XG4gICAgY2FzZSAnaG91cnMnOlxuICAgIGNhc2UgJ2hvdXInOlxuICAgIGNhc2UgJ2hycyc6XG4gICAgY2FzZSAnaHInOlxuICAgIGNhc2UgJ2gnOlxuICAgICAgcmV0dXJuIG4gKiBoO1xuICAgIGNhc2UgJ21pbnV0ZXMnOlxuICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgY2FzZSAnbWlucyc6XG4gICAgY2FzZSAnbWluJzpcbiAgICBjYXNlICdtJzpcbiAgICAgIHJldHVybiBuICogbTtcbiAgICBjYXNlICdzZWNvbmRzJzpcbiAgICBjYXNlICdzZWNvbmQnOlxuICAgIGNhc2UgJ3NlY3MnOlxuICAgIGNhc2UgJ3NlYyc6XG4gICAgY2FzZSAncyc6XG4gICAgICByZXR1cm4gbiAqIHM7XG4gICAgY2FzZSAnbWlsbGlzZWNvbmRzJzpcbiAgICBjYXNlICdtaWxsaXNlY29uZCc6XG4gICAgY2FzZSAnbXNlY3MnOlxuICAgIGNhc2UgJ21zZWMnOlxuICAgIGNhc2UgJ21zJzpcbiAgICAgIHJldHVybiBuO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG5cbi8qKlxuICogU2hvcnQgZm9ybWF0IGZvciBgbXNgLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBtc1xuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gZm10U2hvcnQobXMpIHtcbiAgaWYgKG1zID49IGQpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIGQpICsgJ2QnO1xuICB9XG4gIGlmIChtcyA+PSBoKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBoKSArICdoJztcbiAgfVxuICBpZiAobXMgPj0gbSkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gbSkgKyAnbSc7XG4gIH1cbiAgaWYgKG1zID49IHMpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIHMpICsgJ3MnO1xuICB9XG4gIHJldHVybiBtcyArICdtcyc7XG59XG5cbi8qKlxuICogTG9uZyBmb3JtYXQgZm9yIGBtc2AuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG1zXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBmbXRMb25nKG1zKSB7XG4gIHJldHVybiBwbHVyYWwobXMsIGQsICdkYXknKSB8fFxuICAgIHBsdXJhbChtcywgaCwgJ2hvdXInKSB8fFxuICAgIHBsdXJhbChtcywgbSwgJ21pbnV0ZScpIHx8XG4gICAgcGx1cmFsKG1zLCBzLCAnc2Vjb25kJykgfHxcbiAgICBtcyArICcgbXMnO1xufVxuXG4vKipcbiAqIFBsdXJhbGl6YXRpb24gaGVscGVyLlxuICovXG5cbmZ1bmN0aW9uIHBsdXJhbChtcywgbiwgbmFtZSkge1xuICBpZiAobXMgPCBuKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChtcyA8IG4gKiAxLjUpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihtcyAvIG4pICsgJyAnICsgbmFtZTtcbiAgfVxuICByZXR1cm4gTWF0aC5jZWlsKG1zIC8gbikgKyAnICcgKyBuYW1lICsgJ3MnO1xufVxuIiwi77u/J3VzZSBzdHJpY3QnO1xuXG52YXIgX2RlZmF1bHQgPSByZXF1aXJlKCdmcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IF9kZWZhdWx0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3Qgb3MgPSByZXF1aXJlKCdvcycpO1xuY29uc3QgaGFzRmxhZyA9IHJlcXVpcmUoJ2hhcy1mbGFnJyk7XG5cbmNvbnN0IGVudiA9IHByb2Nlc3MuZW52O1xuXG5sZXQgZm9yY2VDb2xvcjtcbmlmIChoYXNGbGFnKCduby1jb2xvcicpIHx8XG5cdGhhc0ZsYWcoJ25vLWNvbG9ycycpIHx8XG5cdGhhc0ZsYWcoJ2NvbG9yPWZhbHNlJykpIHtcblx0Zm9yY2VDb2xvciA9IGZhbHNlO1xufSBlbHNlIGlmIChoYXNGbGFnKCdjb2xvcicpIHx8XG5cdGhhc0ZsYWcoJ2NvbG9ycycpIHx8XG5cdGhhc0ZsYWcoJ2NvbG9yPXRydWUnKSB8fFxuXHRoYXNGbGFnKCdjb2xvcj1hbHdheXMnKSkge1xuXHRmb3JjZUNvbG9yID0gdHJ1ZTtcbn1cbmlmICgnRk9SQ0VfQ09MT1InIGluIGVudikge1xuXHRmb3JjZUNvbG9yID0gZW52LkZPUkNFX0NPTE9SLmxlbmd0aCA9PT0gMCB8fCBwYXJzZUludChlbnYuRk9SQ0VfQ09MT1IsIDEwKSAhPT0gMDtcbn1cblxuZnVuY3Rpb24gdHJhbnNsYXRlTGV2ZWwobGV2ZWwpIHtcblx0aWYgKGxldmVsID09PSAwKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRsZXZlbCxcblx0XHRoYXNCYXNpYzogdHJ1ZSxcblx0XHRoYXMyNTY6IGxldmVsID49IDIsXG5cdFx0aGFzMTZtOiBsZXZlbCA+PSAzXG5cdH07XG59XG5cbmZ1bmN0aW9uIHN1cHBvcnRzQ29sb3Ioc3RyZWFtKSB7XG5cdGlmIChmb3JjZUNvbG9yID09PSBmYWxzZSkge1xuXHRcdHJldHVybiAwO1xuXHR9XG5cblx0aWYgKGhhc0ZsYWcoJ2NvbG9yPTE2bScpIHx8XG5cdFx0aGFzRmxhZygnY29sb3I9ZnVsbCcpIHx8XG5cdFx0aGFzRmxhZygnY29sb3I9dHJ1ZWNvbG9yJykpIHtcblx0XHRyZXR1cm4gMztcblx0fVxuXG5cdGlmIChoYXNGbGFnKCdjb2xvcj0yNTYnKSkge1xuXHRcdHJldHVybiAyO1xuXHR9XG5cblx0aWYgKHN0cmVhbSAmJiAhc3RyZWFtLmlzVFRZICYmIGZvcmNlQ29sb3IgIT09IHRydWUpIHtcblx0XHRyZXR1cm4gMDtcblx0fVxuXG5cdGNvbnN0IG1pbiA9IGZvcmNlQ29sb3IgPyAxIDogMDtcblxuXHRpZiAocHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJykge1xuXHRcdC8vIE5vZGUuanMgNy41LjAgaXMgdGhlIGZpcnN0IHZlcnNpb24gb2YgTm9kZS5qcyB0byBpbmNsdWRlIGEgcGF0Y2ggdG9cblx0XHQvLyBsaWJ1diB0aGF0IGVuYWJsZXMgMjU2IGNvbG9yIG91dHB1dCBvbiBXaW5kb3dzLiBBbnl0aGluZyBlYXJsaWVyIGFuZCBpdFxuXHRcdC8vIHdvbid0IHdvcmsuIEhvd2V2ZXIsIGhlcmUgd2UgdGFyZ2V0IE5vZGUuanMgOCBhdCBtaW5pbXVtIGFzIGl0IGlzIGFuIExUU1xuXHRcdC8vIHJlbGVhc2UsIGFuZCBOb2RlLmpzIDcgaXMgbm90LiBXaW5kb3dzIDEwIGJ1aWxkIDEwNTg2IGlzIHRoZSBmaXJzdCBXaW5kb3dzXG5cdFx0Ly8gcmVsZWFzZSB0aGF0IHN1cHBvcnRzIDI1NiBjb2xvcnMuIFdpbmRvd3MgMTAgYnVpbGQgMTQ5MzEgaXMgdGhlIGZpcnN0IHJlbGVhc2Vcblx0XHQvLyB0aGF0IHN1cHBvcnRzIDE2bS9UcnVlQ29sb3IuXG5cdFx0Y29uc3Qgb3NSZWxlYXNlID0gb3MucmVsZWFzZSgpLnNwbGl0KCcuJyk7XG5cdFx0aWYgKFxuXHRcdFx0TnVtYmVyKHByb2Nlc3MudmVyc2lvbnMubm9kZS5zcGxpdCgnLicpWzBdKSA+PSA4ICYmXG5cdFx0XHROdW1iZXIob3NSZWxlYXNlWzBdKSA+PSAxMCAmJlxuXHRcdFx0TnVtYmVyKG9zUmVsZWFzZVsyXSkgPj0gMTA1ODZcblx0XHQpIHtcblx0XHRcdHJldHVybiBOdW1iZXIob3NSZWxlYXNlWzJdKSA+PSAxNDkzMSA/IDMgOiAyO1xuXHRcdH1cblxuXHRcdHJldHVybiAxO1xuXHR9XG5cblx0aWYgKCdDSScgaW4gZW52KSB7XG5cdFx0aWYgKFsnVFJBVklTJywgJ0NJUkNMRUNJJywgJ0FQUFZFWU9SJywgJ0dJVExBQl9DSSddLnNvbWUoc2lnbiA9PiBzaWduIGluIGVudikgfHwgZW52LkNJX05BTUUgPT09ICdjb2Rlc2hpcCcpIHtcblx0XHRcdHJldHVybiAxO1xuXHRcdH1cblxuXHRcdHJldHVybiBtaW47XG5cdH1cblxuXHRpZiAoJ1RFQU1DSVRZX1ZFUlNJT04nIGluIGVudikge1xuXHRcdHJldHVybiAvXig5XFwuKDAqWzEtOV1cXGQqKVxcLnxcXGR7Mix9XFwuKS8udGVzdChlbnYuVEVBTUNJVFlfVkVSU0lPTikgPyAxIDogMDtcblx0fVxuXG5cdGlmIChlbnYuQ09MT1JURVJNID09PSAndHJ1ZWNvbG9yJykge1xuXHRcdHJldHVybiAzO1xuXHR9XG5cblx0aWYgKCdURVJNX1BST0dSQU0nIGluIGVudikge1xuXHRcdGNvbnN0IHZlcnNpb24gPSBwYXJzZUludCgoZW52LlRFUk1fUFJPR1JBTV9WRVJTSU9OIHx8ICcnKS5zcGxpdCgnLicpWzBdLCAxMCk7XG5cblx0XHRzd2l0Y2ggKGVudi5URVJNX1BST0dSQU0pIHtcblx0XHRcdGNhc2UgJ2lUZXJtLmFwcCc6XG5cdFx0XHRcdHJldHVybiB2ZXJzaW9uID49IDMgPyAzIDogMjtcblx0XHRcdGNhc2UgJ0FwcGxlX1Rlcm1pbmFsJzpcblx0XHRcdFx0cmV0dXJuIDI7XG5cdFx0XHQvLyBObyBkZWZhdWx0XG5cdFx0fVxuXHR9XG5cblx0aWYgKC8tMjU2KGNvbG9yKT8kL2kudGVzdChlbnYuVEVSTSkpIHtcblx0XHRyZXR1cm4gMjtcblx0fVxuXG5cdGlmICgvXnNjcmVlbnxeeHRlcm18XnZ0MTAwfF52dDIyMHxecnh2dHxjb2xvcnxhbnNpfGN5Z3dpbnxsaW51eC9pLnRlc3QoZW52LlRFUk0pKSB7XG5cdFx0cmV0dXJuIDE7XG5cdH1cblxuXHRpZiAoJ0NPTE9SVEVSTScgaW4gZW52KSB7XG5cdFx0cmV0dXJuIDE7XG5cdH1cblxuXHRpZiAoZW52LlRFUk0gPT09ICdkdW1iJykge1xuXHRcdHJldHVybiBtaW47XG5cdH1cblxuXHRyZXR1cm4gbWluO1xufVxuXG5mdW5jdGlvbiBnZXRTdXBwb3J0TGV2ZWwoc3RyZWFtKSB7XG5cdGNvbnN0IGxldmVsID0gc3VwcG9ydHNDb2xvcihzdHJlYW0pO1xuXHRyZXR1cm4gdHJhbnNsYXRlTGV2ZWwobGV2ZWwpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0c3VwcG9ydHNDb2xvcjogZ2V0U3VwcG9ydExldmVsLFxuXHRzdGRvdXQ6IGdldFN1cHBvcnRMZXZlbChwcm9jZXNzLnN0ZG91dCksXG5cdHN0ZGVycjogZ2V0U3VwcG9ydExldmVsKHByb2Nlc3Muc3RkZXJyKVxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xuICAgIHJlc3VsdFtcImRlZmF1bHRcIl0gPSBtb2Q7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBheGlvc18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJheGlvc1wiKSk7XG5jb25zdCBmc18xID0gcmVxdWlyZShcImZzXCIpO1xuY29uc3QgY29yZSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiQGFjdGlvbnMvY29yZVwiKSk7XG5jbGFzcyBEb3dubG9hZCB7XG4gICAgY29uc3RydWN0b3IodmVyc2lvbikge1xuICAgICAgICB0aGlzLnZlcnNpb24gPSB2ZXJzaW9uO1xuICAgICAgICB0aGlzLkJBU0VfVVJMID0gJ2h0dHBzOi8vZGwuZ29vZ2xlLmNvbS9kbC9jbG91ZHNkay9jaGFubmVscy9yYXBpZCc7XG4gICAgICAgIHRoaXMuc2RrVXJsID0gdGhpcy5CQVNFX1VSTDtcbiAgICAgICAgdGhpcy5jb21wcmVzc01vZGUgPSAndGFyLmd6JztcbiAgICAgICAgdGhpcy5zZXRTZGtEb3dubG9hZFVybCgpO1xuICAgIH1cbiAgICBkb3dubG9hZCgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gYGdvb2dsZS1jbG91ZC1zZGsuJHt0aGlzLmNvbXByZXNzTW9kZX1gO1xuICAgICAgICAgICAgY29yZS5kZWJ1ZyhgRG93bmxvYWRpbmcgJHt0aGlzLnNka1VybH1gKTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0geWllbGQgYXhpb3NfMS5kZWZhdWx0LmdldCh0aGlzLnNka1VybCwge1xuICAgICAgICAgICAgICAgIG9uRG93bmxvYWRQcm9ncmVzczogKGUpID0+IGNvbnNvbGUubG9nKGUpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHlpZWxkIGZzXzEucHJvbWlzZXMud3JpdGVGaWxlKGRlc3RpbmF0aW9uLCByZXNwb25zZS5kYXRhKTtcbiAgICAgICAgICAgIGNvcmUuZGVidWcoYERvd25sb2FkZWQgJHt0aGlzLnNka1VybH1gKTtcbiAgICAgICAgICAgIHJldHVybiBkZXN0aW5hdGlvbjtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNldFNka0Rvd25sb2FkVXJsKCkge1xuICAgICAgICBpZiAodGhpcy52ZXJzaW9uID09PSAnbGF0ZXN0Jykge1xuICAgICAgICAgICAgaWYgKHByb2Nlc3MucGxhdGZvcm0gPT09ICd3aW4zMicpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNka1VybCA9IGAke3RoaXMuQkFTRV9VUkx9L2dvb2dsZS1jbG91ZC1zZGsuemlwYDtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXByZXNzTW9kZSA9ICd6aXAnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZGtVcmwgPSBgJHt0aGlzLkJBU0VfVVJMfS9nb29nbGUtY2xvdWQtc2RrLnRhci5nemA7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21wcmVzc01vZGUgPSAndGFyLmd6JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChwcm9jZXNzLnBsYXRmb3JtID09PSAnd2luMzInKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZGtVcmwgPSBgJHt0aGlzLkJBU0VfVVJMfS9kb3dubG9hZHMvZ29vZ2xlLWNsb3VkLXNkay0ke3RoaXMudmVyc2lvbn0td2luZG93cy14ODZfNjQuemlwYDtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXByZXNzTW9kZSA9ICd6aXAnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ2RhcndpbicpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNka1VybCA9IGAke3RoaXMuQkFTRV9VUkx9L2Rvd25sb2Fkcy9nb29nbGUtY2xvdWQtc2RrLSR7dGhpcy52ZXJzaW9ufS1kYXJ3aW4teDg2XzY0LnRhci5nemA7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21wcmVzc01vZGUgPSAndGFyLmd6JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2RrVXJsID0gYCR7dGhpcy5CQVNFX1VSTH0vZG93bmxvYWRzL2dvb2dsZS1jbG91ZC1zZGstJHt0aGlzLnZlcnNpb259LWxpbnV4LXg4Nl82NC50YXIuZ3pgO1xuICAgICAgICAgICAgICAgIHRoaXMuY29tcHJlc3NNb2RlID0gJ3Rhci5neic7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLkRvd25sb2FkID0gRG93bmxvYWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcbiAgICByZXN1bHRbXCJkZWZhdWx0XCJdID0gbW9kO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgZG93bmxvYWRfMSA9IHJlcXVpcmUoXCIuL2Rvd25sb2FkXCIpO1xuY29uc3QgYWRtX3ppcF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJhZG0temlwXCIpKTtcbmNvbnN0IHBhdGhfMSA9IHJlcXVpcmUoXCJwYXRoXCIpO1xuY29uc3QgY29yZSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiQGFjdGlvbnMvY29yZVwiKSk7XG5mdW5jdGlvbiBpbnN0YWxsKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnN0IGRvd25sb2FkZXIgPSBuZXcgZG93bmxvYWRfMS5Eb3dubG9hZCgnbGF0ZXN0Jyk7XG4gICAgICAgIGNvbnN0IHNka0ZpbGUgPSB5aWVsZCBkb3dubG9hZGVyLmRvd25sb2FkKCk7XG4gICAgICAgIGlmIChzZGtGaWxlLmVuZHNXaXRoKCcuemlwJykpIHtcbiAgICAgICAgICAgIGNvcmUuZGVidWcoJ0Rvd25sb2FkZWQgZmlsZSBpcyBhIHppcCwgdW56aXBwaW5nLi4uJyk7XG4gICAgICAgICAgICBjb25zdCB6aXAgPSBuZXcgYWRtX3ppcF8xLmRlZmF1bHQocGF0aF8xLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgc2RrRmlsZSkpO1xuICAgICAgICAgICAgY29uc3QgZGVzdGluYXRpb25Gb2xkZXIgPSBwYXRoXzEucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAnZ29vZ2xlLWNsb3VkLXNkaycpO1xuICAgICAgICAgICAgemlwLmV4dHJhY3RBbGxUbyhkZXN0aW5hdGlvbkZvbGRlciwgdHJ1ZSk7XG4gICAgICAgICAgICBjb3JlLmRlYnVnKGBVbnppcHBlZCB0byAke2Rlc3RpbmF0aW9uRm9sZGVyfWApO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5leHBvcnRzLmluc3RhbGwgPSBpbnN0YWxsO1xuaW5zdGFsbCgpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXNzZXJ0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cHNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwib3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzdHJlYW1cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidHR5XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInVybFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1dGlsXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInpsaWJcIik7Il0sInNvdXJjZVJvb3QiOiIifQ==