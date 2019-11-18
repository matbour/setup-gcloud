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

/***/ "./node_modules/@actions/exec/lib/exec.js":
/*!************************************************!*\
  !*** ./node_modules/@actions/exec/lib/exec.js ***!
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
const tr = __webpack_require__(/*! ./toolrunner */ "./node_modules/@actions/exec/lib/toolrunner.js");
/**
 * Exec a command.
 * Output will be streamed to the live console.
 * Returns promise with return code
 *
 * @param     commandLine        command to execute (can include additional args). Must be correctly escaped.
 * @param     args               optional arguments for tool. Escaping is handled by the lib.
 * @param     options            optional exec options.  See ExecOptions
 * @returns   Promise<number>    exit code
 */
function exec(commandLine, args, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const commandArgs = tr.argStringToArray(commandLine);
        if (commandArgs.length === 0) {
            throw new Error(`Parameter 'commandLine' cannot be null or empty.`);
        }
        // Path to tool to execute should be first arg
        const toolPath = commandArgs[0];
        args = commandArgs.slice(1).concat(args || []);
        const runner = new tr.ToolRunner(toolPath, args, options);
        return runner.exec();
    });
}
exports.exec = exec;
//# sourceMappingURL=exec.js.map

/***/ }),

/***/ "./node_modules/@actions/exec/lib/toolrunner.js":
/*!******************************************************!*\
  !*** ./node_modules/@actions/exec/lib/toolrunner.js ***!
  \******************************************************/
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
const os = __webpack_require__(/*! os */ "os");
const events = __webpack_require__(/*! events */ "events");
const child = __webpack_require__(/*! child_process */ "child_process");
/* eslint-disable @typescript-eslint/unbound-method */
const IS_WINDOWS = process.platform === 'win32';
/*
 * Class for running command line tools. Handles quoting and arg parsing in a platform agnostic way.
 */
class ToolRunner extends events.EventEmitter {
    constructor(toolPath, args, options) {
        super();
        if (!toolPath) {
            throw new Error("Parameter 'toolPath' cannot be null or empty.");
        }
        this.toolPath = toolPath;
        this.args = args || [];
        this.options = options || {};
    }
    _debug(message) {
        if (this.options.listeners && this.options.listeners.debug) {
            this.options.listeners.debug(message);
        }
    }
    _getCommandString(options, noPrefix) {
        const toolPath = this._getSpawnFileName();
        const args = this._getSpawnArgs(options);
        let cmd = noPrefix ? '' : '[command]'; // omit prefix when piped to a second tool
        if (IS_WINDOWS) {
            // Windows + cmd file
            if (this._isCmdFile()) {
                cmd += toolPath;
                for (const a of args) {
                    cmd += ` ${a}`;
                }
            }
            // Windows + verbatim
            else if (options.windowsVerbatimArguments) {
                cmd += `"${toolPath}"`;
                for (const a of args) {
                    cmd += ` ${a}`;
                }
            }
            // Windows (regular)
            else {
                cmd += this._windowsQuoteCmdArg(toolPath);
                for (const a of args) {
                    cmd += ` ${this._windowsQuoteCmdArg(a)}`;
                }
            }
        }
        else {
            // OSX/Linux - this can likely be improved with some form of quoting.
            // creating processes on Unix is fundamentally different than Windows.
            // on Unix, execvp() takes an arg array.
            cmd += toolPath;
            for (const a of args) {
                cmd += ` ${a}`;
            }
        }
        return cmd;
    }
    _processLineBuffer(data, strBuffer, onLine) {
        try {
            let s = strBuffer + data.toString();
            let n = s.indexOf(os.EOL);
            while (n > -1) {
                const line = s.substring(0, n);
                onLine(line);
                // the rest of the string ...
                s = s.substring(n + os.EOL.length);
                n = s.indexOf(os.EOL);
            }
            strBuffer = s;
        }
        catch (err) {
            // streaming lines to console is best effort.  Don't fail a build.
            this._debug(`error processing line. Failed with error ${err}`);
        }
    }
    _getSpawnFileName() {
        if (IS_WINDOWS) {
            if (this._isCmdFile()) {
                return process.env['COMSPEC'] || 'cmd.exe';
            }
        }
        return this.toolPath;
    }
    _getSpawnArgs(options) {
        if (IS_WINDOWS) {
            if (this._isCmdFile()) {
                let argline = `/D /S /C "${this._windowsQuoteCmdArg(this.toolPath)}`;
                for (const a of this.args) {
                    argline += ' ';
                    argline += options.windowsVerbatimArguments
                        ? a
                        : this._windowsQuoteCmdArg(a);
                }
                argline += '"';
                return [argline];
            }
        }
        return this.args;
    }
    _endsWith(str, end) {
        return str.endsWith(end);
    }
    _isCmdFile() {
        const upperToolPath = this.toolPath.toUpperCase();
        return (this._endsWith(upperToolPath, '.CMD') ||
            this._endsWith(upperToolPath, '.BAT'));
    }
    _windowsQuoteCmdArg(arg) {
        // for .exe, apply the normal quoting rules that libuv applies
        if (!this._isCmdFile()) {
            return this._uvQuoteCmdArg(arg);
        }
        // otherwise apply quoting rules specific to the cmd.exe command line parser.
        // the libuv rules are generic and are not designed specifically for cmd.exe
        // command line parser.
        //
        // for a detailed description of the cmd.exe command line parser, refer to
        // http://stackoverflow.com/questions/4094699/how-does-the-windows-command-interpreter-cmd-exe-parse-scripts/7970912#7970912
        // need quotes for empty arg
        if (!arg) {
            return '""';
        }
        // determine whether the arg needs to be quoted
        const cmdSpecialChars = [
            ' ',
            '\t',
            '&',
            '(',
            ')',
            '[',
            ']',
            '{',
            '}',
            '^',
            '=',
            ';',
            '!',
            "'",
            '+',
            ',',
            '`',
            '~',
            '|',
            '<',
            '>',
            '"'
        ];
        let needsQuotes = false;
        for (const char of arg) {
            if (cmdSpecialChars.some(x => x === char)) {
                needsQuotes = true;
                break;
            }
        }
        // short-circuit if quotes not needed
        if (!needsQuotes) {
            return arg;
        }
        // the following quoting rules are very similar to the rules that by libuv applies.
        //
        // 1) wrap the string in quotes
        //
        // 2) double-up quotes - i.e. " => ""
        //
        //    this is different from the libuv quoting rules. libuv replaces " with \", which unfortunately
        //    doesn't work well with a cmd.exe command line.
        //
        //    note, replacing " with "" also works well if the arg is passed to a downstream .NET console app.
        //    for example, the command line:
        //          foo.exe "myarg:""my val"""
        //    is parsed by a .NET console app into an arg array:
        //          [ "myarg:\"my val\"" ]
        //    which is the same end result when applying libuv quoting rules. although the actual
        //    command line from libuv quoting rules would look like:
        //          foo.exe "myarg:\"my val\""
        //
        // 3) double-up slashes that precede a quote,
        //    e.g.  hello \world    => "hello \world"
        //          hello\"world    => "hello\\""world"
        //          hello\\"world   => "hello\\\\""world"
        //          hello world\    => "hello world\\"
        //
        //    technically this is not required for a cmd.exe command line, or the batch argument parser.
        //    the reasons for including this as a .cmd quoting rule are:
        //
        //    a) this is optimized for the scenario where the argument is passed from the .cmd file to an
        //       external program. many programs (e.g. .NET console apps) rely on the slash-doubling rule.
        //
        //    b) it's what we've been doing previously (by deferring to node default behavior) and we
        //       haven't heard any complaints about that aspect.
        //
        // note, a weakness of the quoting rules chosen here, is that % is not escaped. in fact, % cannot be
        // escaped when used on the command line directly - even though within a .cmd file % can be escaped
        // by using %%.
        //
        // the saving grace is, on the command line, %var% is left as-is if var is not defined. this contrasts
        // the line parsing rules within a .cmd file, where if var is not defined it is replaced with nothing.
        //
        // one option that was explored was replacing % with ^% - i.e. %var% => ^%var^%. this hack would
        // often work, since it is unlikely that var^ would exist, and the ^ character is removed when the
        // variable is used. the problem, however, is that ^ is not removed when %* is used to pass the args
        // to an external program.
        //
        // an unexplored potential solution for the % escaping problem, is to create a wrapper .cmd file.
        // % can be escaped within a .cmd file.
        let reverse = '"';
        let quoteHit = true;
        for (let i = arg.length; i > 0; i--) {
            // walk the string in reverse
            reverse += arg[i - 1];
            if (quoteHit && arg[i - 1] === '\\') {
                reverse += '\\'; // double the slash
            }
            else if (arg[i - 1] === '"') {
                quoteHit = true;
                reverse += '"'; // double the quote
            }
            else {
                quoteHit = false;
            }
        }
        reverse += '"';
        return reverse
            .split('')
            .reverse()
            .join('');
    }
    _uvQuoteCmdArg(arg) {
        // Tool runner wraps child_process.spawn() and needs to apply the same quoting as
        // Node in certain cases where the undocumented spawn option windowsVerbatimArguments
        // is used.
        //
        // Since this function is a port of quote_cmd_arg from Node 4.x (technically, lib UV,
        // see https://github.com/nodejs/node/blob/v4.x/deps/uv/src/win/process.c for details),
        // pasting copyright notice from Node within this function:
        //
        //      Copyright Joyent, Inc. and other Node contributors. All rights reserved.
        //
        //      Permission is hereby granted, free of charge, to any person obtaining a copy
        //      of this software and associated documentation files (the "Software"), to
        //      deal in the Software without restriction, including without limitation the
        //      rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
        //      sell copies of the Software, and to permit persons to whom the Software is
        //      furnished to do so, subject to the following conditions:
        //
        //      The above copyright notice and this permission notice shall be included in
        //      all copies or substantial portions of the Software.
        //
        //      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
        //      IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
        //      FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
        //      AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
        //      LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
        //      FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
        //      IN THE SOFTWARE.
        if (!arg) {
            // Need double quotation for empty argument
            return '""';
        }
        if (!arg.includes(' ') && !arg.includes('\t') && !arg.includes('"')) {
            // No quotation needed
            return arg;
        }
        if (!arg.includes('"') && !arg.includes('\\')) {
            // No embedded double quotes or backslashes, so I can just wrap
            // quote marks around the whole thing.
            return `"${arg}"`;
        }
        // Expected input/output:
        //   input : hello"world
        //   output: "hello\"world"
        //   input : hello""world
        //   output: "hello\"\"world"
        //   input : hello\world
        //   output: hello\world
        //   input : hello\\world
        //   output: hello\\world
        //   input : hello\"world
        //   output: "hello\\\"world"
        //   input : hello\\"world
        //   output: "hello\\\\\"world"
        //   input : hello world\
        //   output: "hello world\\" - note the comment in libuv actually reads "hello world\"
        //                             but it appears the comment is wrong, it should be "hello world\\"
        let reverse = '"';
        let quoteHit = true;
        for (let i = arg.length; i > 0; i--) {
            // walk the string in reverse
            reverse += arg[i - 1];
            if (quoteHit && arg[i - 1] === '\\') {
                reverse += '\\';
            }
            else if (arg[i - 1] === '"') {
                quoteHit = true;
                reverse += '\\';
            }
            else {
                quoteHit = false;
            }
        }
        reverse += '"';
        return reverse
            .split('')
            .reverse()
            .join('');
    }
    _cloneExecOptions(options) {
        options = options || {};
        const result = {
            cwd: options.cwd || process.cwd(),
            env: options.env || process.env,
            silent: options.silent || false,
            windowsVerbatimArguments: options.windowsVerbatimArguments || false,
            failOnStdErr: options.failOnStdErr || false,
            ignoreReturnCode: options.ignoreReturnCode || false,
            delay: options.delay || 10000
        };
        result.outStream = options.outStream || process.stdout;
        result.errStream = options.errStream || process.stderr;
        return result;
    }
    _getSpawnOptions(options, toolPath) {
        options = options || {};
        const result = {};
        result.cwd = options.cwd;
        result.env = options.env;
        result['windowsVerbatimArguments'] =
            options.windowsVerbatimArguments || this._isCmdFile();
        if (options.windowsVerbatimArguments) {
            result.argv0 = `"${toolPath}"`;
        }
        return result;
    }
    /**
     * Exec a tool.
     * Output will be streamed to the live console.
     * Returns promise with return code
     *
     * @param     tool     path to tool to exec
     * @param     options  optional exec options.  See ExecOptions
     * @returns   number
     */
    exec() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this._debug(`exec tool: ${this.toolPath}`);
                this._debug('arguments:');
                for (const arg of this.args) {
                    this._debug(`   ${arg}`);
                }
                const optionsNonNull = this._cloneExecOptions(this.options);
                if (!optionsNonNull.silent && optionsNonNull.outStream) {
                    optionsNonNull.outStream.write(this._getCommandString(optionsNonNull) + os.EOL);
                }
                const state = new ExecState(optionsNonNull, this.toolPath);
                state.on('debug', (message) => {
                    this._debug(message);
                });
                const fileName = this._getSpawnFileName();
                const cp = child.spawn(fileName, this._getSpawnArgs(optionsNonNull), this._getSpawnOptions(this.options, fileName));
                const stdbuffer = '';
                if (cp.stdout) {
                    cp.stdout.on('data', (data) => {
                        if (this.options.listeners && this.options.listeners.stdout) {
                            this.options.listeners.stdout(data);
                        }
                        if (!optionsNonNull.silent && optionsNonNull.outStream) {
                            optionsNonNull.outStream.write(data);
                        }
                        this._processLineBuffer(data, stdbuffer, (line) => {
                            if (this.options.listeners && this.options.listeners.stdline) {
                                this.options.listeners.stdline(line);
                            }
                        });
                    });
                }
                const errbuffer = '';
                if (cp.stderr) {
                    cp.stderr.on('data', (data) => {
                        state.processStderr = true;
                        if (this.options.listeners && this.options.listeners.stderr) {
                            this.options.listeners.stderr(data);
                        }
                        if (!optionsNonNull.silent &&
                            optionsNonNull.errStream &&
                            optionsNonNull.outStream) {
                            const s = optionsNonNull.failOnStdErr
                                ? optionsNonNull.errStream
                                : optionsNonNull.outStream;
                            s.write(data);
                        }
                        this._processLineBuffer(data, errbuffer, (line) => {
                            if (this.options.listeners && this.options.listeners.errline) {
                                this.options.listeners.errline(line);
                            }
                        });
                    });
                }
                cp.on('error', (err) => {
                    state.processError = err.message;
                    state.processExited = true;
                    state.processClosed = true;
                    state.CheckComplete();
                });
                cp.on('exit', (code) => {
                    state.processExitCode = code;
                    state.processExited = true;
                    this._debug(`Exit code ${code} received from tool '${this.toolPath}'`);
                    state.CheckComplete();
                });
                cp.on('close', (code) => {
                    state.processExitCode = code;
                    state.processExited = true;
                    state.processClosed = true;
                    this._debug(`STDIO streams have closed for tool '${this.toolPath}'`);
                    state.CheckComplete();
                });
                state.on('done', (error, exitCode) => {
                    if (stdbuffer.length > 0) {
                        this.emit('stdline', stdbuffer);
                    }
                    if (errbuffer.length > 0) {
                        this.emit('errline', errbuffer);
                    }
                    cp.removeAllListeners();
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(exitCode);
                    }
                });
            });
        });
    }
}
exports.ToolRunner = ToolRunner;
/**
 * Convert an arg string to an array of args. Handles escaping
 *
 * @param    argString   string of arguments
 * @returns  string[]    array of arguments
 */
function argStringToArray(argString) {
    const args = [];
    let inQuotes = false;
    let escaped = false;
    let arg = '';
    function append(c) {
        // we only escape double quotes.
        if (escaped && c !== '"') {
            arg += '\\';
        }
        arg += c;
        escaped = false;
    }
    for (let i = 0; i < argString.length; i++) {
        const c = argString.charAt(i);
        if (c === '"') {
            if (!escaped) {
                inQuotes = !inQuotes;
            }
            else {
                append(c);
            }
            continue;
        }
        if (c === '\\' && escaped) {
            append(c);
            continue;
        }
        if (c === '\\' && inQuotes) {
            escaped = true;
            continue;
        }
        if (c === ' ' && !inQuotes) {
            if (arg.length > 0) {
                args.push(arg);
                arg = '';
            }
            continue;
        }
        append(c);
    }
    if (arg.length > 0) {
        args.push(arg.trim());
    }
    return args;
}
exports.argStringToArray = argStringToArray;
class ExecState extends events.EventEmitter {
    constructor(options, toolPath) {
        super();
        this.processClosed = false; // tracks whether the process has exited and stdio is closed
        this.processError = '';
        this.processExitCode = 0;
        this.processExited = false; // tracks whether the process has exited
        this.processStderr = false; // tracks whether stderr was written to
        this.delay = 10000; // 10 seconds
        this.done = false;
        this.timeout = null;
        if (!toolPath) {
            throw new Error('toolPath must not be empty');
        }
        this.options = options;
        this.toolPath = toolPath;
        if (options.delay) {
            this.delay = options.delay;
        }
    }
    CheckComplete() {
        if (this.done) {
            return;
        }
        if (this.processClosed) {
            this._setResult();
        }
        else if (this.processExited) {
            this.timeout = setTimeout(ExecState.HandleTimeout, this.delay, this);
        }
    }
    _debug(message) {
        this.emit('debug', message);
    }
    _setResult() {
        // determine whether there is an error
        let error;
        if (this.processExited) {
            if (this.processError) {
                error = new Error(`There was an error when attempting to execute the process '${this.toolPath}'. This may indicate the process failed to start. Error: ${this.processError}`);
            }
            else if (this.processExitCode !== 0 && !this.options.ignoreReturnCode) {
                error = new Error(`The process '${this.toolPath}' failed with exit code ${this.processExitCode}`);
            }
            else if (this.processStderr && this.options.failOnStdErr) {
                error = new Error(`The process '${this.toolPath}' failed because one or more lines were written to the STDERR stream`);
            }
        }
        // clear the timeout
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
        this.done = true;
        this.emit('done', error, this.processExitCode);
    }
    static HandleTimeout(state) {
        if (state.done) {
            return;
        }
        if (!state.processClosed && state.processExited) {
            const message = `The STDIO streams did not close within ${state.delay /
                1000} seconds of the exit event from process '${state.toolPath}'. This may indicate a child process inherited the STDIO streams and has not yet exited.`;
            state._debug(message);
        }
        state._setResult();
    }
}
//# sourceMappingURL=toolrunner.js.map

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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __webpack_require__(/*! fs */ "fs");
const core = __importStar(__webpack_require__(/*! @actions/core */ "./node_modules/@actions/core/lib/core.js"));
const path_1 = __webpack_require__(/*! path */ "path");
const exec = __importStar(__webpack_require__(/*! @actions/exec */ "./node_modules/@actions/exec/lib/exec.js"));
class Download {
    constructor(version) {
        this.version = version;
        this.BASE_URL = 'https://dl.google.com/dl/cloudsdk/channels/rapid';
        this.sdkUrl = this.BASE_URL;
        this.setSdkDownloadUrl();
    }
    download() {
        return __awaiter(this, void 0, void 0, function* () {
            const extension = this.sdkUrl.endsWith('.zip') ? 'zip' : 'tar.gz';
            const destination = path_1.resolve(process.cwd(), `google-cloud-sdk.${extension}`);
            if (fs_1.existsSync(destination)) {
                return destination;
            }
            core.debug(`Downloading ${this.sdkUrl}`);
            yield exec.exec(`curl -s -o ${destination} ${this.sdkUrl}`);
            core.debug(`Downloaded ${this.sdkUrl}`);
            return destination;
        });
    }
    setSdkDownloadUrl() {
        if (this.version === 'latest') {
            if (process.platform === 'win32') {
                this.sdkUrl = `${this.BASE_URL}/google-cloud-sdk.zip`;
            }
            else {
                this.sdkUrl = `${this.BASE_URL}/google-cloud-sdk.tar.gz`;
            }
        }
        else {
            if (process.platform === 'win32') {
                this.sdkUrl = `${this.BASE_URL}/downloads/google-cloud-sdk-${this.version}-windows-x86_64.zip`;
            }
            else if (process.platform === 'darwin') {
                this.sdkUrl = `${this.BASE_URL}/downloads/google-cloud-sdk-${this.version}-darwin-x86_64.tar.gz`;
            }
            else {
                this.sdkUrl = `${this.BASE_URL}/downloads/google-cloud-sdk-${this.version}-linux-x86_64.tar.gz`;
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const download_1 = __webpack_require__(/*! ./download */ "./src/download.ts");
const path_1 = __webpack_require__(/*! path */ "path");
const core = __importStar(__webpack_require__(/*! @actions/core */ "./node_modules/@actions/core/lib/core.js"));
const exec = __importStar(__webpack_require__(/*! @actions/exec */ "./node_modules/@actions/exec/lib/exec.js"));
const fs_1 = __webpack_require__(/*! fs */ "fs");
function install() {
    return __awaiter(this, void 0, void 0, function* () {
        const downloader = new download_1.Download('latest');
        const sdkFile = yield downloader.download();
        const destinationFolder = path_1.resolve(process.cwd(), 'google-cloud-sdk');
        if (sdkFile.endsWith('.zip')) {
            yield exec.exec(`7z e -y ${sdkFile} -o${destinationFolder}`);
        }
        else {
            yield exec.exec(`tar -xf ${sdkFile}`);
        }
        try {
            if (process.platform === 'win32') {
                yield exec.exec(path_1.resolve(destinationFolder, 'CLOUDSDK_CORE_DISABLE_PROMPTS=1 install.bat'));
            }
            else if (process.platform === 'darwin') {
                yield exec.exec(path_1.resolve(destinationFolder, 'CLOUDSDK_CORE_DISABLE_PROMPTS=1 install.sh'));
            }
            else {
                yield exec.exec(path_1.resolve(destinationFolder, 'install.sh --disable-prompts'));
            }
        }
        catch (error) {
            core.setFailed(error.message);
        }
        const serviceAccountKeyBase64 = core.getInput('service-account-key');
        const serviceAccountKeyJson = Buffer.from(serviceAccountKeyBase64, 'base64');
        const serviceAccountKeyPath = path_1.resolve(process.cwd(), 'gcloud.json');
        fs_1.writeFileSync(serviceAccountKeyPath, serviceAccountKeyJson);
        yield exec.exec(`gcloud auth activate-service-account --key-file=${serviceAccountKeyPath}`);
    });
}
exports.install = install;
install();


/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhY3Rpb25zL2NvcmUvbGliL2NvbW1hbmQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhY3Rpb25zL2NvcmUvbGliL2NvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhY3Rpb25zL2V4ZWMvbGliL2V4ZWMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhY3Rpb25zL2V4ZWMvbGliL3Rvb2xydW5uZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Rvd25sb2FkLnRzIiwid2VicGFjazovLy8uL3NyYy9pbnN0YWxsLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImNoaWxkX3Byb2Nlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJldmVudHNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJmc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm9zXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGF0aFwiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FB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QkFBc0I7QUFDakcsS0FBSztBQUNMO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDeERBLDBDOzs7Ozs7Ozs7OztBQ0FBLG1DOzs7Ozs7Ozs7OztBQ0FBLCtCOzs7Ozs7Ozs7OztBQ0FBLCtCOzs7Ozs7Ozs7OztBQ0FBLGlDIiwiZmlsZSI6Imluc3RhbGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbnN0YWxsLnRzXCIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBvcyA9IHJlcXVpcmUoXCJvc1wiKTtcbi8qKlxuICogQ29tbWFuZHNcbiAqXG4gKiBDb21tYW5kIEZvcm1hdDpcbiAqICAgIyNbbmFtZSBrZXk9dmFsdWU7a2V5PXZhbHVlXW1lc3NhZ2VcbiAqXG4gKiBFeGFtcGxlczpcbiAqICAgIyNbd2FybmluZ11UaGlzIGlzIHRoZSB1c2VyIHdhcm5pbmcgbWVzc2FnZVxuICogICAjI1tzZXQtc2VjcmV0IG5hbWU9bXlwYXNzd29yZF1kZWZpbml0ZWx5Tm90QVBhc3N3b3JkIVxuICovXG5mdW5jdGlvbiBpc3N1ZUNvbW1hbmQoY29tbWFuZCwgcHJvcGVydGllcywgbWVzc2FnZSkge1xuICAgIGNvbnN0IGNtZCA9IG5ldyBDb21tYW5kKGNvbW1hbmQsIHByb3BlcnRpZXMsIG1lc3NhZ2UpO1xuICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKGNtZC50b1N0cmluZygpICsgb3MuRU9MKTtcbn1cbmV4cG9ydHMuaXNzdWVDb21tYW5kID0gaXNzdWVDb21tYW5kO1xuZnVuY3Rpb24gaXNzdWUobmFtZSwgbWVzc2FnZSA9ICcnKSB7XG4gICAgaXNzdWVDb21tYW5kKG5hbWUsIHt9LCBtZXNzYWdlKTtcbn1cbmV4cG9ydHMuaXNzdWUgPSBpc3N1ZTtcbmNvbnN0IENNRF9TVFJJTkcgPSAnOjonO1xuY2xhc3MgQ29tbWFuZCB7XG4gICAgY29uc3RydWN0b3IoY29tbWFuZCwgcHJvcGVydGllcywgbWVzc2FnZSkge1xuICAgICAgICBpZiAoIWNvbW1hbmQpIHtcbiAgICAgICAgICAgIGNvbW1hbmQgPSAnbWlzc2luZy5jb21tYW5kJztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbW1hbmQgPSBjb21tYW5kO1xuICAgICAgICB0aGlzLnByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIH1cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgbGV0IGNtZFN0ciA9IENNRF9TVFJJTkcgKyB0aGlzLmNvbW1hbmQ7XG4gICAgICAgIGlmICh0aGlzLnByb3BlcnRpZXMgJiYgT2JqZWN0LmtleXModGhpcy5wcm9wZXJ0aWVzKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjbWRTdHIgKz0gJyAnO1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5wcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbCA9IHRoaXMucHJvcGVydGllc1trZXldO1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzYWZlbHkgYXBwZW5kIHRoZSB2YWwgLSBhdm9pZCBibG93aW5nIHVwIHdoZW4gYXR0ZW1wdGluZyB0b1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2FsbCAucmVwbGFjZSgpIGlmIG1lc3NhZ2UgaXMgbm90IGEgc3RyaW5nIGZvciBzb21lIHJlYXNvblxuICAgICAgICAgICAgICAgICAgICAgICAgY21kU3RyICs9IGAke2tleX09JHtlc2NhcGUoYCR7dmFsIHx8ICcnfWApfSxgO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNtZFN0ciArPSBDTURfU1RSSU5HO1xuICAgICAgICAvLyBzYWZlbHkgYXBwZW5kIHRoZSBtZXNzYWdlIC0gYXZvaWQgYmxvd2luZyB1cCB3aGVuIGF0dGVtcHRpbmcgdG9cbiAgICAgICAgLy8gY2FsbCAucmVwbGFjZSgpIGlmIG1lc3NhZ2UgaXMgbm90IGEgc3RyaW5nIGZvciBzb21lIHJlYXNvblxuICAgICAgICBjb25zdCBtZXNzYWdlID0gYCR7dGhpcy5tZXNzYWdlIHx8ICcnfWA7XG4gICAgICAgIGNtZFN0ciArPSBlc2NhcGVEYXRhKG1lc3NhZ2UpO1xuICAgICAgICByZXR1cm4gY21kU3RyO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGVzY2FwZURhdGEocykge1xuICAgIHJldHVybiBzLnJlcGxhY2UoL1xcci9nLCAnJTBEJykucmVwbGFjZSgvXFxuL2csICclMEEnKTtcbn1cbmZ1bmN0aW9uIGVzY2FwZShzKSB7XG4gICAgcmV0dXJuIHNcbiAgICAgICAgLnJlcGxhY2UoL1xcci9nLCAnJTBEJylcbiAgICAgICAgLnJlcGxhY2UoL1xcbi9nLCAnJTBBJylcbiAgICAgICAgLnJlcGxhY2UoL10vZywgJyU1RCcpXG4gICAgICAgIC5yZXBsYWNlKC87L2csICclM0InKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbW1hbmQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvbW1hbmRfMSA9IHJlcXVpcmUoXCIuL2NvbW1hbmRcIik7XG5jb25zdCBvcyA9IHJlcXVpcmUoXCJvc1wiKTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKFwicGF0aFwiKTtcbi8qKlxuICogVGhlIGNvZGUgdG8gZXhpdCBhbiBhY3Rpb25cbiAqL1xudmFyIEV4aXRDb2RlO1xuKGZ1bmN0aW9uIChFeGl0Q29kZSkge1xuICAgIC8qKlxuICAgICAqIEEgY29kZSBpbmRpY2F0aW5nIHRoYXQgdGhlIGFjdGlvbiB3YXMgc3VjY2Vzc2Z1bFxuICAgICAqL1xuICAgIEV4aXRDb2RlW0V4aXRDb2RlW1wiU3VjY2Vzc1wiXSA9IDBdID0gXCJTdWNjZXNzXCI7XG4gICAgLyoqXG4gICAgICogQSBjb2RlIGluZGljYXRpbmcgdGhhdCB0aGUgYWN0aW9uIHdhcyBhIGZhaWx1cmVcbiAgICAgKi9cbiAgICBFeGl0Q29kZVtFeGl0Q29kZVtcIkZhaWx1cmVcIl0gPSAxXSA9IFwiRmFpbHVyZVwiO1xufSkoRXhpdENvZGUgPSBleHBvcnRzLkV4aXRDb2RlIHx8IChleHBvcnRzLkV4aXRDb2RlID0ge30pKTtcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFZhcmlhYmxlc1xuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLyoqXG4gKiBTZXRzIGVudiB2YXJpYWJsZSBmb3IgdGhpcyBhY3Rpb24gYW5kIGZ1dHVyZSBhY3Rpb25zIGluIHRoZSBqb2JcbiAqIEBwYXJhbSBuYW1lIHRoZSBuYW1lIG9mIHRoZSB2YXJpYWJsZSB0byBzZXRcbiAqIEBwYXJhbSB2YWwgdGhlIHZhbHVlIG9mIHRoZSB2YXJpYWJsZVxuICovXG5mdW5jdGlvbiBleHBvcnRWYXJpYWJsZShuYW1lLCB2YWwpIHtcbiAgICBwcm9jZXNzLmVudltuYW1lXSA9IHZhbDtcbiAgICBjb21tYW5kXzEuaXNzdWVDb21tYW5kKCdzZXQtZW52JywgeyBuYW1lIH0sIHZhbCk7XG59XG5leHBvcnRzLmV4cG9ydFZhcmlhYmxlID0gZXhwb3J0VmFyaWFibGU7XG4vKipcbiAqIFJlZ2lzdGVycyBhIHNlY3JldCB3aGljaCB3aWxsIGdldCBtYXNrZWQgZnJvbSBsb2dzXG4gKiBAcGFyYW0gc2VjcmV0IHZhbHVlIG9mIHRoZSBzZWNyZXRcbiAqL1xuZnVuY3Rpb24gc2V0U2VjcmV0KHNlY3JldCkge1xuICAgIGNvbW1hbmRfMS5pc3N1ZUNvbW1hbmQoJ2FkZC1tYXNrJywge30sIHNlY3JldCk7XG59XG5leHBvcnRzLnNldFNlY3JldCA9IHNldFNlY3JldDtcbi8qKlxuICogUHJlcGVuZHMgaW5wdXRQYXRoIHRvIHRoZSBQQVRIIChmb3IgdGhpcyBhY3Rpb24gYW5kIGZ1dHVyZSBhY3Rpb25zKVxuICogQHBhcmFtIGlucHV0UGF0aFxuICovXG5mdW5jdGlvbiBhZGRQYXRoKGlucHV0UGF0aCkge1xuICAgIGNvbW1hbmRfMS5pc3N1ZUNvbW1hbmQoJ2FkZC1wYXRoJywge30sIGlucHV0UGF0aCk7XG4gICAgcHJvY2Vzcy5lbnZbJ1BBVEgnXSA9IGAke2lucHV0UGF0aH0ke3BhdGguZGVsaW1pdGVyfSR7cHJvY2Vzcy5lbnZbJ1BBVEgnXX1gO1xufVxuZXhwb3J0cy5hZGRQYXRoID0gYWRkUGF0aDtcbi8qKlxuICogR2V0cyB0aGUgdmFsdWUgb2YgYW4gaW5wdXQuICBUaGUgdmFsdWUgaXMgYWxzbyB0cmltbWVkLlxuICpcbiAqIEBwYXJhbSAgICAgbmFtZSAgICAgbmFtZSBvZiB0aGUgaW5wdXQgdG8gZ2V0XG4gKiBAcGFyYW0gICAgIG9wdGlvbnMgIG9wdGlvbmFsLiBTZWUgSW5wdXRPcHRpb25zLlxuICogQHJldHVybnMgICBzdHJpbmdcbiAqL1xuZnVuY3Rpb24gZ2V0SW5wdXQobmFtZSwgb3B0aW9ucykge1xuICAgIGNvbnN0IHZhbCA9IHByb2Nlc3MuZW52W2BJTlBVVF8ke25hbWUucmVwbGFjZSgvIC9nLCAnXycpLnRvVXBwZXJDYXNlKCl9YF0gfHwgJyc7XG4gICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5yZXF1aXJlZCAmJiAhdmFsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgSW5wdXQgcmVxdWlyZWQgYW5kIG5vdCBzdXBwbGllZDogJHtuYW1lfWApO1xuICAgIH1cbiAgICByZXR1cm4gdmFsLnRyaW0oKTtcbn1cbmV4cG9ydHMuZ2V0SW5wdXQgPSBnZXRJbnB1dDtcbi8qKlxuICogU2V0cyB0aGUgdmFsdWUgb2YgYW4gb3V0cHV0LlxuICpcbiAqIEBwYXJhbSAgICAgbmFtZSAgICAgbmFtZSBvZiB0aGUgb3V0cHV0IHRvIHNldFxuICogQHBhcmFtICAgICB2YWx1ZSAgICB2YWx1ZSB0byBzdG9yZVxuICovXG5mdW5jdGlvbiBzZXRPdXRwdXQobmFtZSwgdmFsdWUpIHtcbiAgICBjb21tYW5kXzEuaXNzdWVDb21tYW5kKCdzZXQtb3V0cHV0JywgeyBuYW1lIH0sIHZhbHVlKTtcbn1cbmV4cG9ydHMuc2V0T3V0cHV0ID0gc2V0T3V0cHV0O1xuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUmVzdWx0c1xuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLyoqXG4gKiBTZXRzIHRoZSBhY3Rpb24gc3RhdHVzIHRvIGZhaWxlZC5cbiAqIFdoZW4gdGhlIGFjdGlvbiBleGl0cyBpdCB3aWxsIGJlIHdpdGggYW4gZXhpdCBjb2RlIG9mIDFcbiAqIEBwYXJhbSBtZXNzYWdlIGFkZCBlcnJvciBpc3N1ZSBtZXNzYWdlXG4gKi9cbmZ1bmN0aW9uIHNldEZhaWxlZChtZXNzYWdlKSB7XG4gICAgcHJvY2Vzcy5leGl0Q29kZSA9IEV4aXRDb2RlLkZhaWx1cmU7XG4gICAgZXJyb3IobWVzc2FnZSk7XG59XG5leHBvcnRzLnNldEZhaWxlZCA9IHNldEZhaWxlZDtcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIExvZ2dpbmcgQ29tbWFuZHNcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8qKlxuICogV3JpdGVzIGRlYnVnIG1lc3NhZ2UgdG8gdXNlciBsb2dcbiAqIEBwYXJhbSBtZXNzYWdlIGRlYnVnIG1lc3NhZ2VcbiAqL1xuZnVuY3Rpb24gZGVidWcobWVzc2FnZSkge1xuICAgIGNvbW1hbmRfMS5pc3N1ZUNvbW1hbmQoJ2RlYnVnJywge30sIG1lc3NhZ2UpO1xufVxuZXhwb3J0cy5kZWJ1ZyA9IGRlYnVnO1xuLyoqXG4gKiBBZGRzIGFuIGVycm9yIGlzc3VlXG4gKiBAcGFyYW0gbWVzc2FnZSBlcnJvciBpc3N1ZSBtZXNzYWdlXG4gKi9cbmZ1bmN0aW9uIGVycm9yKG1lc3NhZ2UpIHtcbiAgICBjb21tYW5kXzEuaXNzdWUoJ2Vycm9yJywgbWVzc2FnZSk7XG59XG5leHBvcnRzLmVycm9yID0gZXJyb3I7XG4vKipcbiAqIEFkZHMgYW4gd2FybmluZyBpc3N1ZVxuICogQHBhcmFtIG1lc3NhZ2Ugd2FybmluZyBpc3N1ZSBtZXNzYWdlXG4gKi9cbmZ1bmN0aW9uIHdhcm5pbmcobWVzc2FnZSkge1xuICAgIGNvbW1hbmRfMS5pc3N1ZSgnd2FybmluZycsIG1lc3NhZ2UpO1xufVxuZXhwb3J0cy53YXJuaW5nID0gd2FybmluZztcbi8qKlxuICogV3JpdGVzIGluZm8gdG8gbG9nIHdpdGggY29uc29sZS5sb2cuXG4gKiBAcGFyYW0gbWVzc2FnZSBpbmZvIG1lc3NhZ2VcbiAqL1xuZnVuY3Rpb24gaW5mbyhtZXNzYWdlKSB7XG4gICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUobWVzc2FnZSArIG9zLkVPTCk7XG59XG5leHBvcnRzLmluZm8gPSBpbmZvO1xuLyoqXG4gKiBCZWdpbiBhbiBvdXRwdXQgZ3JvdXAuXG4gKlxuICogT3V0cHV0IHVudGlsIHRoZSBuZXh0IGBncm91cEVuZGAgd2lsbCBiZSBmb2xkYWJsZSBpbiB0aGlzIGdyb3VwXG4gKlxuICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIG91dHB1dCBncm91cFxuICovXG5mdW5jdGlvbiBzdGFydEdyb3VwKG5hbWUpIHtcbiAgICBjb21tYW5kXzEuaXNzdWUoJ2dyb3VwJywgbmFtZSk7XG59XG5leHBvcnRzLnN0YXJ0R3JvdXAgPSBzdGFydEdyb3VwO1xuLyoqXG4gKiBFbmQgYW4gb3V0cHV0IGdyb3VwLlxuICovXG5mdW5jdGlvbiBlbmRHcm91cCgpIHtcbiAgICBjb21tYW5kXzEuaXNzdWUoJ2VuZGdyb3VwJyk7XG59XG5leHBvcnRzLmVuZEdyb3VwID0gZW5kR3JvdXA7XG4vKipcbiAqIFdyYXAgYW4gYXN5bmNocm9ub3VzIGZ1bmN0aW9uIGNhbGwgaW4gYSBncm91cC5cbiAqXG4gKiBSZXR1cm5zIHRoZSBzYW1lIHR5cGUgYXMgdGhlIGZ1bmN0aW9uIGl0c2VsZi5cbiAqXG4gKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgZ3JvdXBcbiAqIEBwYXJhbSBmbiBUaGUgZnVuY3Rpb24gdG8gd3JhcCBpbiB0aGUgZ3JvdXBcbiAqL1xuZnVuY3Rpb24gZ3JvdXAobmFtZSwgZm4pIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBzdGFydEdyb3VwKG5hbWUpO1xuICAgICAgICBsZXQgcmVzdWx0O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVzdWx0ID0geWllbGQgZm4oKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIGVuZEdyb3VwKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9KTtcbn1cbmV4cG9ydHMuZ3JvdXAgPSBncm91cDtcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFdyYXBwZXIgYWN0aW9uIHN0YXRlXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vKipcbiAqIFNhdmVzIHN0YXRlIGZvciBjdXJyZW50IGFjdGlvbiwgdGhlIHN0YXRlIGNhbiBvbmx5IGJlIHJldHJpZXZlZCBieSB0aGlzIGFjdGlvbidzIHBvc3Qgam9iIGV4ZWN1dGlvbi5cbiAqXG4gKiBAcGFyYW0gICAgIG5hbWUgICAgIG5hbWUgb2YgdGhlIHN0YXRlIHRvIHN0b3JlXG4gKiBAcGFyYW0gICAgIHZhbHVlICAgIHZhbHVlIHRvIHN0b3JlXG4gKi9cbmZ1bmN0aW9uIHNhdmVTdGF0ZShuYW1lLCB2YWx1ZSkge1xuICAgIGNvbW1hbmRfMS5pc3N1ZUNvbW1hbmQoJ3NhdmUtc3RhdGUnLCB7IG5hbWUgfSwgdmFsdWUpO1xufVxuZXhwb3J0cy5zYXZlU3RhdGUgPSBzYXZlU3RhdGU7XG4vKipcbiAqIEdldHMgdGhlIHZhbHVlIG9mIGFuIHN0YXRlIHNldCBieSB0aGlzIGFjdGlvbidzIG1haW4gZXhlY3V0aW9uLlxuICpcbiAqIEBwYXJhbSAgICAgbmFtZSAgICAgbmFtZSBvZiB0aGUgc3RhdGUgdG8gZ2V0XG4gKiBAcmV0dXJucyAgIHN0cmluZ1xuICovXG5mdW5jdGlvbiBnZXRTdGF0ZShuYW1lKSB7XG4gICAgcmV0dXJuIHByb2Nlc3MuZW52W2BTVEFURV8ke25hbWV9YF0gfHwgJyc7XG59XG5leHBvcnRzLmdldFN0YXRlID0gZ2V0U3RhdGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb3JlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCB0ciA9IHJlcXVpcmUoXCIuL3Rvb2xydW5uZXJcIik7XG4vKipcbiAqIEV4ZWMgYSBjb21tYW5kLlxuICogT3V0cHV0IHdpbGwgYmUgc3RyZWFtZWQgdG8gdGhlIGxpdmUgY29uc29sZS5cbiAqIFJldHVybnMgcHJvbWlzZSB3aXRoIHJldHVybiBjb2RlXG4gKlxuICogQHBhcmFtICAgICBjb21tYW5kTGluZSAgICAgICAgY29tbWFuZCB0byBleGVjdXRlIChjYW4gaW5jbHVkZSBhZGRpdGlvbmFsIGFyZ3MpLiBNdXN0IGJlIGNvcnJlY3RseSBlc2NhcGVkLlxuICogQHBhcmFtICAgICBhcmdzICAgICAgICAgICAgICAgb3B0aW9uYWwgYXJndW1lbnRzIGZvciB0b29sLiBFc2NhcGluZyBpcyBoYW5kbGVkIGJ5IHRoZSBsaWIuXG4gKiBAcGFyYW0gICAgIG9wdGlvbnMgICAgICAgICAgICBvcHRpb25hbCBleGVjIG9wdGlvbnMuICBTZWUgRXhlY09wdGlvbnNcbiAqIEByZXR1cm5zICAgUHJvbWlzZTxudW1iZXI+ICAgIGV4aXQgY29kZVxuICovXG5mdW5jdGlvbiBleGVjKGNvbW1hbmRMaW5lLCBhcmdzLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc3QgY29tbWFuZEFyZ3MgPSB0ci5hcmdTdHJpbmdUb0FycmF5KGNvbW1hbmRMaW5lKTtcbiAgICAgICAgaWYgKGNvbW1hbmRBcmdzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBQYXJhbWV0ZXIgJ2NvbW1hbmRMaW5lJyBjYW5ub3QgYmUgbnVsbCBvciBlbXB0eS5gKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBQYXRoIHRvIHRvb2wgdG8gZXhlY3V0ZSBzaG91bGQgYmUgZmlyc3QgYXJnXG4gICAgICAgIGNvbnN0IHRvb2xQYXRoID0gY29tbWFuZEFyZ3NbMF07XG4gICAgICAgIGFyZ3MgPSBjb21tYW5kQXJncy5zbGljZSgxKS5jb25jYXQoYXJncyB8fCBbXSk7XG4gICAgICAgIGNvbnN0IHJ1bm5lciA9IG5ldyB0ci5Ub29sUnVubmVyKHRvb2xQYXRoLCBhcmdzLCBvcHRpb25zKTtcbiAgICAgICAgcmV0dXJuIHJ1bm5lci5leGVjKCk7XG4gICAgfSk7XG59XG5leHBvcnRzLmV4ZWMgPSBleGVjO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZXhlYy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3Qgb3MgPSByZXF1aXJlKFwib3NcIik7XG5jb25zdCBldmVudHMgPSByZXF1aXJlKFwiZXZlbnRzXCIpO1xuY29uc3QgY2hpbGQgPSByZXF1aXJlKFwiY2hpbGRfcHJvY2Vzc1wiKTtcbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC91bmJvdW5kLW1ldGhvZCAqL1xuY29uc3QgSVNfV0lORE9XUyA9IHByb2Nlc3MucGxhdGZvcm0gPT09ICd3aW4zMic7XG4vKlxuICogQ2xhc3MgZm9yIHJ1bm5pbmcgY29tbWFuZCBsaW5lIHRvb2xzLiBIYW5kbGVzIHF1b3RpbmcgYW5kIGFyZyBwYXJzaW5nIGluIGEgcGxhdGZvcm0gYWdub3N0aWMgd2F5LlxuICovXG5jbGFzcyBUb29sUnVubmVyIGV4dGVuZHMgZXZlbnRzLkV2ZW50RW1pdHRlciB7XG4gICAgY29uc3RydWN0b3IodG9vbFBhdGgsIGFyZ3MsIG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgaWYgKCF0b29sUGF0aCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiUGFyYW1ldGVyICd0b29sUGF0aCcgY2Fubm90IGJlIG51bGwgb3IgZW1wdHkuXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudG9vbFBhdGggPSB0b29sUGF0aDtcbiAgICAgICAgdGhpcy5hcmdzID0gYXJncyB8fCBbXTtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICB9XG4gICAgX2RlYnVnKG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5saXN0ZW5lcnMgJiYgdGhpcy5vcHRpb25zLmxpc3RlbmVycy5kZWJ1Zykge1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmxpc3RlbmVycy5kZWJ1ZyhtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfZ2V0Q29tbWFuZFN0cmluZyhvcHRpb25zLCBub1ByZWZpeCkge1xuICAgICAgICBjb25zdCB0b29sUGF0aCA9IHRoaXMuX2dldFNwYXduRmlsZU5hbWUoKTtcbiAgICAgICAgY29uc3QgYXJncyA9IHRoaXMuX2dldFNwYXduQXJncyhvcHRpb25zKTtcbiAgICAgICAgbGV0IGNtZCA9IG5vUHJlZml4ID8gJycgOiAnW2NvbW1hbmRdJzsgLy8gb21pdCBwcmVmaXggd2hlbiBwaXBlZCB0byBhIHNlY29uZCB0b29sXG4gICAgICAgIGlmIChJU19XSU5ET1dTKSB7XG4gICAgICAgICAgICAvLyBXaW5kb3dzICsgY21kIGZpbGVcbiAgICAgICAgICAgIGlmICh0aGlzLl9pc0NtZEZpbGUoKSkge1xuICAgICAgICAgICAgICAgIGNtZCArPSB0b29sUGF0aDtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGEgb2YgYXJncykge1xuICAgICAgICAgICAgICAgICAgICBjbWQgKz0gYCAke2F9YDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBXaW5kb3dzICsgdmVyYmF0aW1cbiAgICAgICAgICAgIGVsc2UgaWYgKG9wdGlvbnMud2luZG93c1ZlcmJhdGltQXJndW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgY21kICs9IGBcIiR7dG9vbFBhdGh9XCJgO1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgYSBvZiBhcmdzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNtZCArPSBgICR7YX1gO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFdpbmRvd3MgKHJlZ3VsYXIpXG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjbWQgKz0gdGhpcy5fd2luZG93c1F1b3RlQ21kQXJnKHRvb2xQYXRoKTtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGEgb2YgYXJncykge1xuICAgICAgICAgICAgICAgICAgICBjbWQgKz0gYCAke3RoaXMuX3dpbmRvd3NRdW90ZUNtZEFyZyhhKX1gO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIE9TWC9MaW51eCAtIHRoaXMgY2FuIGxpa2VseSBiZSBpbXByb3ZlZCB3aXRoIHNvbWUgZm9ybSBvZiBxdW90aW5nLlxuICAgICAgICAgICAgLy8gY3JlYXRpbmcgcHJvY2Vzc2VzIG9uIFVuaXggaXMgZnVuZGFtZW50YWxseSBkaWZmZXJlbnQgdGhhbiBXaW5kb3dzLlxuICAgICAgICAgICAgLy8gb24gVW5peCwgZXhlY3ZwKCkgdGFrZXMgYW4gYXJnIGFycmF5LlxuICAgICAgICAgICAgY21kICs9IHRvb2xQYXRoO1xuICAgICAgICAgICAgZm9yIChjb25zdCBhIG9mIGFyZ3MpIHtcbiAgICAgICAgICAgICAgICBjbWQgKz0gYCAke2F9YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY21kO1xuICAgIH1cbiAgICBfcHJvY2Vzc0xpbmVCdWZmZXIoZGF0YSwgc3RyQnVmZmVyLCBvbkxpbmUpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCBzID0gc3RyQnVmZmVyICsgZGF0YS50b1N0cmluZygpO1xuICAgICAgICAgICAgbGV0IG4gPSBzLmluZGV4T2Yob3MuRU9MKTtcbiAgICAgICAgICAgIHdoaWxlIChuID4gLTEpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBsaW5lID0gcy5zdWJzdHJpbmcoMCwgbik7XG4gICAgICAgICAgICAgICAgb25MaW5lKGxpbmUpO1xuICAgICAgICAgICAgICAgIC8vIHRoZSByZXN0IG9mIHRoZSBzdHJpbmcgLi4uXG4gICAgICAgICAgICAgICAgcyA9IHMuc3Vic3RyaW5nKG4gKyBvcy5FT0wubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBuID0gcy5pbmRleE9mKG9zLkVPTCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdHJCdWZmZXIgPSBzO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIC8vIHN0cmVhbWluZyBsaW5lcyB0byBjb25zb2xlIGlzIGJlc3QgZWZmb3J0LiAgRG9uJ3QgZmFpbCBhIGJ1aWxkLlxuICAgICAgICAgICAgdGhpcy5fZGVidWcoYGVycm9yIHByb2Nlc3NpbmcgbGluZS4gRmFpbGVkIHdpdGggZXJyb3IgJHtlcnJ9YCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2dldFNwYXduRmlsZU5hbWUoKSB7XG4gICAgICAgIGlmIChJU19XSU5ET1dTKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5faXNDbWRGaWxlKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvY2Vzcy5lbnZbJ0NPTVNQRUMnXSB8fCAnY21kLmV4ZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMudG9vbFBhdGg7XG4gICAgfVxuICAgIF9nZXRTcGF3bkFyZ3Mob3B0aW9ucykge1xuICAgICAgICBpZiAoSVNfV0lORE9XUykge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2lzQ21kRmlsZSgpKSB7XG4gICAgICAgICAgICAgICAgbGV0IGFyZ2xpbmUgPSBgL0QgL1MgL0MgXCIke3RoaXMuX3dpbmRvd3NRdW90ZUNtZEFyZyh0aGlzLnRvb2xQYXRoKX1gO1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgYSBvZiB0aGlzLmFyZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgYXJnbGluZSArPSAnICc7XG4gICAgICAgICAgICAgICAgICAgIGFyZ2xpbmUgKz0gb3B0aW9ucy53aW5kb3dzVmVyYmF0aW1Bcmd1bWVudHNcbiAgICAgICAgICAgICAgICAgICAgICAgID8gYVxuICAgICAgICAgICAgICAgICAgICAgICAgOiB0aGlzLl93aW5kb3dzUXVvdGVDbWRBcmcoYSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGFyZ2xpbmUgKz0gJ1wiJztcbiAgICAgICAgICAgICAgICByZXR1cm4gW2FyZ2xpbmVdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmFyZ3M7XG4gICAgfVxuICAgIF9lbmRzV2l0aChzdHIsIGVuZCkge1xuICAgICAgICByZXR1cm4gc3RyLmVuZHNXaXRoKGVuZCk7XG4gICAgfVxuICAgIF9pc0NtZEZpbGUoKSB7XG4gICAgICAgIGNvbnN0IHVwcGVyVG9vbFBhdGggPSB0aGlzLnRvb2xQYXRoLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgIHJldHVybiAodGhpcy5fZW5kc1dpdGgodXBwZXJUb29sUGF0aCwgJy5DTUQnKSB8fFxuICAgICAgICAgICAgdGhpcy5fZW5kc1dpdGgodXBwZXJUb29sUGF0aCwgJy5CQVQnKSk7XG4gICAgfVxuICAgIF93aW5kb3dzUXVvdGVDbWRBcmcoYXJnKSB7XG4gICAgICAgIC8vIGZvciAuZXhlLCBhcHBseSB0aGUgbm9ybWFsIHF1b3RpbmcgcnVsZXMgdGhhdCBsaWJ1diBhcHBsaWVzXG4gICAgICAgIGlmICghdGhpcy5faXNDbWRGaWxlKCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl91dlF1b3RlQ21kQXJnKGFyZyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gb3RoZXJ3aXNlIGFwcGx5IHF1b3RpbmcgcnVsZXMgc3BlY2lmaWMgdG8gdGhlIGNtZC5leGUgY29tbWFuZCBsaW5lIHBhcnNlci5cbiAgICAgICAgLy8gdGhlIGxpYnV2IHJ1bGVzIGFyZSBnZW5lcmljIGFuZCBhcmUgbm90IGRlc2lnbmVkIHNwZWNpZmljYWxseSBmb3IgY21kLmV4ZVxuICAgICAgICAvLyBjb21tYW5kIGxpbmUgcGFyc2VyLlxuICAgICAgICAvL1xuICAgICAgICAvLyBmb3IgYSBkZXRhaWxlZCBkZXNjcmlwdGlvbiBvZiB0aGUgY21kLmV4ZSBjb21tYW5kIGxpbmUgcGFyc2VyLCByZWZlciB0b1xuICAgICAgICAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzQwOTQ2OTkvaG93LWRvZXMtdGhlLXdpbmRvd3MtY29tbWFuZC1pbnRlcnByZXRlci1jbWQtZXhlLXBhcnNlLXNjcmlwdHMvNzk3MDkxMiM3OTcwOTEyXG4gICAgICAgIC8vIG5lZWQgcXVvdGVzIGZvciBlbXB0eSBhcmdcbiAgICAgICAgaWYgKCFhcmcpIHtcbiAgICAgICAgICAgIHJldHVybiAnXCJcIic7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZGV0ZXJtaW5lIHdoZXRoZXIgdGhlIGFyZyBuZWVkcyB0byBiZSBxdW90ZWRcbiAgICAgICAgY29uc3QgY21kU3BlY2lhbENoYXJzID0gW1xuICAgICAgICAgICAgJyAnLFxuICAgICAgICAgICAgJ1xcdCcsXG4gICAgICAgICAgICAnJicsXG4gICAgICAgICAgICAnKCcsXG4gICAgICAgICAgICAnKScsXG4gICAgICAgICAgICAnWycsXG4gICAgICAgICAgICAnXScsXG4gICAgICAgICAgICAneycsXG4gICAgICAgICAgICAnfScsXG4gICAgICAgICAgICAnXicsXG4gICAgICAgICAgICAnPScsXG4gICAgICAgICAgICAnOycsXG4gICAgICAgICAgICAnIScsXG4gICAgICAgICAgICBcIidcIixcbiAgICAgICAgICAgICcrJyxcbiAgICAgICAgICAgICcsJyxcbiAgICAgICAgICAgICdgJyxcbiAgICAgICAgICAgICd+JyxcbiAgICAgICAgICAgICd8JyxcbiAgICAgICAgICAgICc8JyxcbiAgICAgICAgICAgICc+JyxcbiAgICAgICAgICAgICdcIidcbiAgICAgICAgXTtcbiAgICAgICAgbGV0IG5lZWRzUXVvdGVzID0gZmFsc2U7XG4gICAgICAgIGZvciAoY29uc3QgY2hhciBvZiBhcmcpIHtcbiAgICAgICAgICAgIGlmIChjbWRTcGVjaWFsQ2hhcnMuc29tZSh4ID0+IHggPT09IGNoYXIpKSB7XG4gICAgICAgICAgICAgICAgbmVlZHNRdW90ZXMgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHNob3J0LWNpcmN1aXQgaWYgcXVvdGVzIG5vdCBuZWVkZWRcbiAgICAgICAgaWYgKCFuZWVkc1F1b3Rlcykge1xuICAgICAgICAgICAgcmV0dXJuIGFyZztcbiAgICAgICAgfVxuICAgICAgICAvLyB0aGUgZm9sbG93aW5nIHF1b3RpbmcgcnVsZXMgYXJlIHZlcnkgc2ltaWxhciB0byB0aGUgcnVsZXMgdGhhdCBieSBsaWJ1diBhcHBsaWVzLlxuICAgICAgICAvL1xuICAgICAgICAvLyAxKSB3cmFwIHRoZSBzdHJpbmcgaW4gcXVvdGVzXG4gICAgICAgIC8vXG4gICAgICAgIC8vIDIpIGRvdWJsZS11cCBxdW90ZXMgLSBpLmUuIFwiID0+IFwiXCJcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgdGhpcyBpcyBkaWZmZXJlbnQgZnJvbSB0aGUgbGlidXYgcXVvdGluZyBydWxlcy4gbGlidXYgcmVwbGFjZXMgXCIgd2l0aCBcXFwiLCB3aGljaCB1bmZvcnR1bmF0ZWx5XG4gICAgICAgIC8vICAgIGRvZXNuJ3Qgd29yayB3ZWxsIHdpdGggYSBjbWQuZXhlIGNvbW1hbmQgbGluZS5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgbm90ZSwgcmVwbGFjaW5nIFwiIHdpdGggXCJcIiBhbHNvIHdvcmtzIHdlbGwgaWYgdGhlIGFyZyBpcyBwYXNzZWQgdG8gYSBkb3duc3RyZWFtIC5ORVQgY29uc29sZSBhcHAuXG4gICAgICAgIC8vICAgIGZvciBleGFtcGxlLCB0aGUgY29tbWFuZCBsaW5lOlxuICAgICAgICAvLyAgICAgICAgICBmb28uZXhlIFwibXlhcmc6XCJcIm15IHZhbFwiXCJcIlxuICAgICAgICAvLyAgICBpcyBwYXJzZWQgYnkgYSAuTkVUIGNvbnNvbGUgYXBwIGludG8gYW4gYXJnIGFycmF5OlxuICAgICAgICAvLyAgICAgICAgICBbIFwibXlhcmc6XFxcIm15IHZhbFxcXCJcIiBdXG4gICAgICAgIC8vICAgIHdoaWNoIGlzIHRoZSBzYW1lIGVuZCByZXN1bHQgd2hlbiBhcHBseWluZyBsaWJ1diBxdW90aW5nIHJ1bGVzLiBhbHRob3VnaCB0aGUgYWN0dWFsXG4gICAgICAgIC8vICAgIGNvbW1hbmQgbGluZSBmcm9tIGxpYnV2IHF1b3RpbmcgcnVsZXMgd291bGQgbG9vayBsaWtlOlxuICAgICAgICAvLyAgICAgICAgICBmb28uZXhlIFwibXlhcmc6XFxcIm15IHZhbFxcXCJcIlxuICAgICAgICAvL1xuICAgICAgICAvLyAzKSBkb3VibGUtdXAgc2xhc2hlcyB0aGF0IHByZWNlZGUgYSBxdW90ZSxcbiAgICAgICAgLy8gICAgZS5nLiAgaGVsbG8gXFx3b3JsZCAgICA9PiBcImhlbGxvIFxcd29ybGRcIlxuICAgICAgICAvLyAgICAgICAgICBoZWxsb1xcXCJ3b3JsZCAgICA9PiBcImhlbGxvXFxcXFwiXCJ3b3JsZFwiXG4gICAgICAgIC8vICAgICAgICAgIGhlbGxvXFxcXFwid29ybGQgICA9PiBcImhlbGxvXFxcXFxcXFxcIlwid29ybGRcIlxuICAgICAgICAvLyAgICAgICAgICBoZWxsbyB3b3JsZFxcICAgID0+IFwiaGVsbG8gd29ybGRcXFxcXCJcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgdGVjaG5pY2FsbHkgdGhpcyBpcyBub3QgcmVxdWlyZWQgZm9yIGEgY21kLmV4ZSBjb21tYW5kIGxpbmUsIG9yIHRoZSBiYXRjaCBhcmd1bWVudCBwYXJzZXIuXG4gICAgICAgIC8vICAgIHRoZSByZWFzb25zIGZvciBpbmNsdWRpbmcgdGhpcyBhcyBhIC5jbWQgcXVvdGluZyBydWxlIGFyZTpcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgYSkgdGhpcyBpcyBvcHRpbWl6ZWQgZm9yIHRoZSBzY2VuYXJpbyB3aGVyZSB0aGUgYXJndW1lbnQgaXMgcGFzc2VkIGZyb20gdGhlIC5jbWQgZmlsZSB0byBhblxuICAgICAgICAvLyAgICAgICBleHRlcm5hbCBwcm9ncmFtLiBtYW55IHByb2dyYW1zIChlLmcuIC5ORVQgY29uc29sZSBhcHBzKSByZWx5IG9uIHRoZSBzbGFzaC1kb3VibGluZyBydWxlLlxuICAgICAgICAvL1xuICAgICAgICAvLyAgICBiKSBpdCdzIHdoYXQgd2UndmUgYmVlbiBkb2luZyBwcmV2aW91c2x5IChieSBkZWZlcnJpbmcgdG8gbm9kZSBkZWZhdWx0IGJlaGF2aW9yKSBhbmQgd2VcbiAgICAgICAgLy8gICAgICAgaGF2ZW4ndCBoZWFyZCBhbnkgY29tcGxhaW50cyBhYm91dCB0aGF0IGFzcGVjdC5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gbm90ZSwgYSB3ZWFrbmVzcyBvZiB0aGUgcXVvdGluZyBydWxlcyBjaG9zZW4gaGVyZSwgaXMgdGhhdCAlIGlzIG5vdCBlc2NhcGVkLiBpbiBmYWN0LCAlIGNhbm5vdCBiZVxuICAgICAgICAvLyBlc2NhcGVkIHdoZW4gdXNlZCBvbiB0aGUgY29tbWFuZCBsaW5lIGRpcmVjdGx5IC0gZXZlbiB0aG91Z2ggd2l0aGluIGEgLmNtZCBmaWxlICUgY2FuIGJlIGVzY2FwZWRcbiAgICAgICAgLy8gYnkgdXNpbmcgJSUuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIHRoZSBzYXZpbmcgZ3JhY2UgaXMsIG9uIHRoZSBjb21tYW5kIGxpbmUsICV2YXIlIGlzIGxlZnQgYXMtaXMgaWYgdmFyIGlzIG5vdCBkZWZpbmVkLiB0aGlzIGNvbnRyYXN0c1xuICAgICAgICAvLyB0aGUgbGluZSBwYXJzaW5nIHJ1bGVzIHdpdGhpbiBhIC5jbWQgZmlsZSwgd2hlcmUgaWYgdmFyIGlzIG5vdCBkZWZpbmVkIGl0IGlzIHJlcGxhY2VkIHdpdGggbm90aGluZy5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gb25lIG9wdGlvbiB0aGF0IHdhcyBleHBsb3JlZCB3YXMgcmVwbGFjaW5nICUgd2l0aCBeJSAtIGkuZS4gJXZhciUgPT4gXiV2YXJeJS4gdGhpcyBoYWNrIHdvdWxkXG4gICAgICAgIC8vIG9mdGVuIHdvcmssIHNpbmNlIGl0IGlzIHVubGlrZWx5IHRoYXQgdmFyXiB3b3VsZCBleGlzdCwgYW5kIHRoZSBeIGNoYXJhY3RlciBpcyByZW1vdmVkIHdoZW4gdGhlXG4gICAgICAgIC8vIHZhcmlhYmxlIGlzIHVzZWQuIHRoZSBwcm9ibGVtLCBob3dldmVyLCBpcyB0aGF0IF4gaXMgbm90IHJlbW92ZWQgd2hlbiAlKiBpcyB1c2VkIHRvIHBhc3MgdGhlIGFyZ3NcbiAgICAgICAgLy8gdG8gYW4gZXh0ZXJuYWwgcHJvZ3JhbS5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gYW4gdW5leHBsb3JlZCBwb3RlbnRpYWwgc29sdXRpb24gZm9yIHRoZSAlIGVzY2FwaW5nIHByb2JsZW0sIGlzIHRvIGNyZWF0ZSBhIHdyYXBwZXIgLmNtZCBmaWxlLlxuICAgICAgICAvLyAlIGNhbiBiZSBlc2NhcGVkIHdpdGhpbiBhIC5jbWQgZmlsZS5cbiAgICAgICAgbGV0IHJldmVyc2UgPSAnXCInO1xuICAgICAgICBsZXQgcXVvdGVIaXQgPSB0cnVlO1xuICAgICAgICBmb3IgKGxldCBpID0gYXJnLmxlbmd0aDsgaSA+IDA7IGktLSkge1xuICAgICAgICAgICAgLy8gd2FsayB0aGUgc3RyaW5nIGluIHJldmVyc2VcbiAgICAgICAgICAgIHJldmVyc2UgKz0gYXJnW2kgLSAxXTtcbiAgICAgICAgICAgIGlmIChxdW90ZUhpdCAmJiBhcmdbaSAtIDFdID09PSAnXFxcXCcpIHtcbiAgICAgICAgICAgICAgICByZXZlcnNlICs9ICdcXFxcJzsgLy8gZG91YmxlIHRoZSBzbGFzaFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYXJnW2kgLSAxXSA9PT0gJ1wiJykge1xuICAgICAgICAgICAgICAgIHF1b3RlSGl0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXZlcnNlICs9ICdcIic7IC8vIGRvdWJsZSB0aGUgcXVvdGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHF1b3RlSGl0ID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV2ZXJzZSArPSAnXCInO1xuICAgICAgICByZXR1cm4gcmV2ZXJzZVxuICAgICAgICAgICAgLnNwbGl0KCcnKVxuICAgICAgICAgICAgLnJldmVyc2UoKVxuICAgICAgICAgICAgLmpvaW4oJycpO1xuICAgIH1cbiAgICBfdXZRdW90ZUNtZEFyZyhhcmcpIHtcbiAgICAgICAgLy8gVG9vbCBydW5uZXIgd3JhcHMgY2hpbGRfcHJvY2Vzcy5zcGF3bigpIGFuZCBuZWVkcyB0byBhcHBseSB0aGUgc2FtZSBxdW90aW5nIGFzXG4gICAgICAgIC8vIE5vZGUgaW4gY2VydGFpbiBjYXNlcyB3aGVyZSB0aGUgdW5kb2N1bWVudGVkIHNwYXduIG9wdGlvbiB3aW5kb3dzVmVyYmF0aW1Bcmd1bWVudHNcbiAgICAgICAgLy8gaXMgdXNlZC5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gU2luY2UgdGhpcyBmdW5jdGlvbiBpcyBhIHBvcnQgb2YgcXVvdGVfY21kX2FyZyBmcm9tIE5vZGUgNC54ICh0ZWNobmljYWxseSwgbGliIFVWLFxuICAgICAgICAvLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL25vZGVqcy9ub2RlL2Jsb2IvdjQueC9kZXBzL3V2L3NyYy93aW4vcHJvY2Vzcy5jIGZvciBkZXRhaWxzKSxcbiAgICAgICAgLy8gcGFzdGluZyBjb3B5cmlnaHQgbm90aWNlIGZyb20gTm9kZSB3aXRoaW4gdGhpcyBmdW5jdGlvbjpcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgICBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgICBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gICAgICAgIC8vICAgICAgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG9cbiAgICAgICAgLy8gICAgICBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZVxuICAgICAgICAvLyAgICAgIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vclxuICAgICAgICAvLyAgICAgIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gICAgICAgIC8vICAgICAgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgICBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuICAgICAgICAvLyAgICAgIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAgICAgICAgLy8gICAgICBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAgICAgICAgLy8gICAgICBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAgICAgICAgLy8gICAgICBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gICAgICAgIC8vICAgICAgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkdcbiAgICAgICAgLy8gICAgICBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTXG4gICAgICAgIC8vICAgICAgSU4gVEhFIFNPRlRXQVJFLlxuICAgICAgICBpZiAoIWFyZykge1xuICAgICAgICAgICAgLy8gTmVlZCBkb3VibGUgcXVvdGF0aW9uIGZvciBlbXB0eSBhcmd1bWVudFxuICAgICAgICAgICAgcmV0dXJuICdcIlwiJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWFyZy5pbmNsdWRlcygnICcpICYmICFhcmcuaW5jbHVkZXMoJ1xcdCcpICYmICFhcmcuaW5jbHVkZXMoJ1wiJykpIHtcbiAgICAgICAgICAgIC8vIE5vIHF1b3RhdGlvbiBuZWVkZWRcbiAgICAgICAgICAgIHJldHVybiBhcmc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFhcmcuaW5jbHVkZXMoJ1wiJykgJiYgIWFyZy5pbmNsdWRlcygnXFxcXCcpKSB7XG4gICAgICAgICAgICAvLyBObyBlbWJlZGRlZCBkb3VibGUgcXVvdGVzIG9yIGJhY2tzbGFzaGVzLCBzbyBJIGNhbiBqdXN0IHdyYXBcbiAgICAgICAgICAgIC8vIHF1b3RlIG1hcmtzIGFyb3VuZCB0aGUgd2hvbGUgdGhpbmcuXG4gICAgICAgICAgICByZXR1cm4gYFwiJHthcmd9XCJgO1xuICAgICAgICB9XG4gICAgICAgIC8vIEV4cGVjdGVkIGlucHV0L291dHB1dDpcbiAgICAgICAgLy8gICBpbnB1dCA6IGhlbGxvXCJ3b3JsZFxuICAgICAgICAvLyAgIG91dHB1dDogXCJoZWxsb1xcXCJ3b3JsZFwiXG4gICAgICAgIC8vICAgaW5wdXQgOiBoZWxsb1wiXCJ3b3JsZFxuICAgICAgICAvLyAgIG91dHB1dDogXCJoZWxsb1xcXCJcXFwid29ybGRcIlxuICAgICAgICAvLyAgIGlucHV0IDogaGVsbG9cXHdvcmxkXG4gICAgICAgIC8vICAgb3V0cHV0OiBoZWxsb1xcd29ybGRcbiAgICAgICAgLy8gICBpbnB1dCA6IGhlbGxvXFxcXHdvcmxkXG4gICAgICAgIC8vICAgb3V0cHV0OiBoZWxsb1xcXFx3b3JsZFxuICAgICAgICAvLyAgIGlucHV0IDogaGVsbG9cXFwid29ybGRcbiAgICAgICAgLy8gICBvdXRwdXQ6IFwiaGVsbG9cXFxcXFxcIndvcmxkXCJcbiAgICAgICAgLy8gICBpbnB1dCA6IGhlbGxvXFxcXFwid29ybGRcbiAgICAgICAgLy8gICBvdXRwdXQ6IFwiaGVsbG9cXFxcXFxcXFxcXCJ3b3JsZFwiXG4gICAgICAgIC8vICAgaW5wdXQgOiBoZWxsbyB3b3JsZFxcXG4gICAgICAgIC8vICAgb3V0cHV0OiBcImhlbGxvIHdvcmxkXFxcXFwiIC0gbm90ZSB0aGUgY29tbWVudCBpbiBsaWJ1diBhY3R1YWxseSByZWFkcyBcImhlbGxvIHdvcmxkXFxcIlxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnV0IGl0IGFwcGVhcnMgdGhlIGNvbW1lbnQgaXMgd3JvbmcsIGl0IHNob3VsZCBiZSBcImhlbGxvIHdvcmxkXFxcXFwiXG4gICAgICAgIGxldCByZXZlcnNlID0gJ1wiJztcbiAgICAgICAgbGV0IHF1b3RlSGl0ID0gdHJ1ZTtcbiAgICAgICAgZm9yIChsZXQgaSA9IGFyZy5sZW5ndGg7IGkgPiAwOyBpLS0pIHtcbiAgICAgICAgICAgIC8vIHdhbGsgdGhlIHN0cmluZyBpbiByZXZlcnNlXG4gICAgICAgICAgICByZXZlcnNlICs9IGFyZ1tpIC0gMV07XG4gICAgICAgICAgICBpZiAocXVvdGVIaXQgJiYgYXJnW2kgLSAxXSA9PT0gJ1xcXFwnKSB7XG4gICAgICAgICAgICAgICAgcmV2ZXJzZSArPSAnXFxcXCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChhcmdbaSAtIDFdID09PSAnXCInKSB7XG4gICAgICAgICAgICAgICAgcXVvdGVIaXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJldmVyc2UgKz0gJ1xcXFwnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcXVvdGVIaXQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXZlcnNlICs9ICdcIic7XG4gICAgICAgIHJldHVybiByZXZlcnNlXG4gICAgICAgICAgICAuc3BsaXQoJycpXG4gICAgICAgICAgICAucmV2ZXJzZSgpXG4gICAgICAgICAgICAuam9pbignJyk7XG4gICAgfVxuICAgIF9jbG9uZUV4ZWNPcHRpb25zKG9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHtcbiAgICAgICAgICAgIGN3ZDogb3B0aW9ucy5jd2QgfHwgcHJvY2Vzcy5jd2QoKSxcbiAgICAgICAgICAgIGVudjogb3B0aW9ucy5lbnYgfHwgcHJvY2Vzcy5lbnYsXG4gICAgICAgICAgICBzaWxlbnQ6IG9wdGlvbnMuc2lsZW50IHx8IGZhbHNlLFxuICAgICAgICAgICAgd2luZG93c1ZlcmJhdGltQXJndW1lbnRzOiBvcHRpb25zLndpbmRvd3NWZXJiYXRpbUFyZ3VtZW50cyB8fCBmYWxzZSxcbiAgICAgICAgICAgIGZhaWxPblN0ZEVycjogb3B0aW9ucy5mYWlsT25TdGRFcnIgfHwgZmFsc2UsXG4gICAgICAgICAgICBpZ25vcmVSZXR1cm5Db2RlOiBvcHRpb25zLmlnbm9yZVJldHVybkNvZGUgfHwgZmFsc2UsXG4gICAgICAgICAgICBkZWxheTogb3B0aW9ucy5kZWxheSB8fCAxMDAwMFxuICAgICAgICB9O1xuICAgICAgICByZXN1bHQub3V0U3RyZWFtID0gb3B0aW9ucy5vdXRTdHJlYW0gfHwgcHJvY2Vzcy5zdGRvdXQ7XG4gICAgICAgIHJlc3VsdC5lcnJTdHJlYW0gPSBvcHRpb25zLmVyclN0cmVhbSB8fCBwcm9jZXNzLnN0ZGVycjtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgX2dldFNwYXduT3B0aW9ucyhvcHRpb25zLCB0b29sUGF0aCkge1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgICAgIHJlc3VsdC5jd2QgPSBvcHRpb25zLmN3ZDtcbiAgICAgICAgcmVzdWx0LmVudiA9IG9wdGlvbnMuZW52O1xuICAgICAgICByZXN1bHRbJ3dpbmRvd3NWZXJiYXRpbUFyZ3VtZW50cyddID1cbiAgICAgICAgICAgIG9wdGlvbnMud2luZG93c1ZlcmJhdGltQXJndW1lbnRzIHx8IHRoaXMuX2lzQ21kRmlsZSgpO1xuICAgICAgICBpZiAob3B0aW9ucy53aW5kb3dzVmVyYmF0aW1Bcmd1bWVudHMpIHtcbiAgICAgICAgICAgIHJlc3VsdC5hcmd2MCA9IGBcIiR7dG9vbFBhdGh9XCJgO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEV4ZWMgYSB0b29sLlxuICAgICAqIE91dHB1dCB3aWxsIGJlIHN0cmVhbWVkIHRvIHRoZSBsaXZlIGNvbnNvbGUuXG4gICAgICogUmV0dXJucyBwcm9taXNlIHdpdGggcmV0dXJuIGNvZGVcbiAgICAgKlxuICAgICAqIEBwYXJhbSAgICAgdG9vbCAgICAgcGF0aCB0byB0b29sIHRvIGV4ZWNcbiAgICAgKiBAcGFyYW0gICAgIG9wdGlvbnMgIG9wdGlvbmFsIGV4ZWMgb3B0aW9ucy4gIFNlZSBFeGVjT3B0aW9uc1xuICAgICAqIEByZXR1cm5zICAgbnVtYmVyXG4gICAgICovXG4gICAgZXhlYygpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGVidWcoYGV4ZWMgdG9vbDogJHt0aGlzLnRvb2xQYXRofWApO1xuICAgICAgICAgICAgICAgIHRoaXMuX2RlYnVnKCdhcmd1bWVudHM6Jyk7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBhcmcgb2YgdGhpcy5hcmdzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RlYnVnKGAgICAke2FyZ31gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9uc05vbk51bGwgPSB0aGlzLl9jbG9uZUV4ZWNPcHRpb25zKHRoaXMub3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgaWYgKCFvcHRpb25zTm9uTnVsbC5zaWxlbnQgJiYgb3B0aW9uc05vbk51bGwub3V0U3RyZWFtKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnNOb25OdWxsLm91dFN0cmVhbS53cml0ZSh0aGlzLl9nZXRDb21tYW5kU3RyaW5nKG9wdGlvbnNOb25OdWxsKSArIG9zLkVPTCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXRlID0gbmV3IEV4ZWNTdGF0ZShvcHRpb25zTm9uTnVsbCwgdGhpcy50b29sUGF0aCk7XG4gICAgICAgICAgICAgICAgc3RhdGUub24oJ2RlYnVnJywgKG1lc3NhZ2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGVidWcobWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZU5hbWUgPSB0aGlzLl9nZXRTcGF3bkZpbGVOYW1lKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgY3AgPSBjaGlsZC5zcGF3bihmaWxlTmFtZSwgdGhpcy5fZ2V0U3Bhd25BcmdzKG9wdGlvbnNOb25OdWxsKSwgdGhpcy5fZ2V0U3Bhd25PcHRpb25zKHRoaXMub3B0aW9ucywgZmlsZU5hbWUpKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGRidWZmZXIgPSAnJztcbiAgICAgICAgICAgICAgICBpZiAoY3Auc3Rkb3V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNwLnN0ZG91dC5vbignZGF0YScsIChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmxpc3RlbmVycyAmJiB0aGlzLm9wdGlvbnMubGlzdGVuZXJzLnN0ZG91dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5saXN0ZW5lcnMuc3Rkb3V0KGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFvcHRpb25zTm9uTnVsbC5zaWxlbnQgJiYgb3B0aW9uc05vbk51bGwub3V0U3RyZWFtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uc05vbk51bGwub3V0U3RyZWFtLndyaXRlKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcHJvY2Vzc0xpbmVCdWZmZXIoZGF0YSwgc3RkYnVmZmVyLCAobGluZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMubGlzdGVuZXJzICYmIHRoaXMub3B0aW9ucy5saXN0ZW5lcnMuc3RkbGluZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMubGlzdGVuZXJzLnN0ZGxpbmUobGluZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBlcnJidWZmZXIgPSAnJztcbiAgICAgICAgICAgICAgICBpZiAoY3Auc3RkZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNwLnN0ZGVyci5vbignZGF0YScsIChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZS5wcm9jZXNzU3RkZXJyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMubGlzdGVuZXJzICYmIHRoaXMub3B0aW9ucy5saXN0ZW5lcnMuc3RkZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmxpc3RlbmVycy5zdGRlcnIoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW9wdGlvbnNOb25OdWxsLnNpbGVudCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnNOb25OdWxsLmVyclN0cmVhbSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnNOb25OdWxsLm91dFN0cmVhbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHMgPSBvcHRpb25zTm9uTnVsbC5mYWlsT25TdGRFcnJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBvcHRpb25zTm9uTnVsbC5lcnJTdHJlYW1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBvcHRpb25zTm9uTnVsbC5vdXRTdHJlYW07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcy53cml0ZShkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Byb2Nlc3NMaW5lQnVmZmVyKGRhdGEsIGVycmJ1ZmZlciwgKGxpbmUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmxpc3RlbmVycyAmJiB0aGlzLm9wdGlvbnMubGlzdGVuZXJzLmVycmxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmxpc3RlbmVycy5lcnJsaW5lKGxpbmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY3Aub24oJ2Vycm9yJywgKGVycikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5wcm9jZXNzRXJyb3IgPSBlcnIubWVzc2FnZTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUucHJvY2Vzc0V4aXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLnByb2Nlc3NDbG9zZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5DaGVja0NvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY3Aub24oJ2V4aXQnLCAoY29kZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5wcm9jZXNzRXhpdENvZGUgPSBjb2RlO1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5wcm9jZXNzRXhpdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGVidWcoYEV4aXQgY29kZSAke2NvZGV9IHJlY2VpdmVkIGZyb20gdG9vbCAnJHt0aGlzLnRvb2xQYXRofSdgKTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUuQ2hlY2tDb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNwLm9uKCdjbG9zZScsIChjb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLnByb2Nlc3NFeGl0Q29kZSA9IGNvZGU7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLnByb2Nlc3NFeGl0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5wcm9jZXNzQ2xvc2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGVidWcoYFNURElPIHN0cmVhbXMgaGF2ZSBjbG9zZWQgZm9yIHRvb2wgJyR7dGhpcy50b29sUGF0aH0nYCk7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLkNoZWNrQ29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBzdGF0ZS5vbignZG9uZScsIChlcnJvciwgZXhpdENvZGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0ZGJ1ZmZlci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ3N0ZGxpbmUnLCBzdGRidWZmZXIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJidWZmZXIubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdlcnJsaW5lJywgZXJyYnVmZmVyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjcC5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShleGl0Q29kZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnRzLlRvb2xSdW5uZXIgPSBUb29sUnVubmVyO1xuLyoqXG4gKiBDb252ZXJ0IGFuIGFyZyBzdHJpbmcgdG8gYW4gYXJyYXkgb2YgYXJncy4gSGFuZGxlcyBlc2NhcGluZ1xuICpcbiAqIEBwYXJhbSAgICBhcmdTdHJpbmcgICBzdHJpbmcgb2YgYXJndW1lbnRzXG4gKiBAcmV0dXJucyAgc3RyaW5nW10gICAgYXJyYXkgb2YgYXJndW1lbnRzXG4gKi9cbmZ1bmN0aW9uIGFyZ1N0cmluZ1RvQXJyYXkoYXJnU3RyaW5nKSB7XG4gICAgY29uc3QgYXJncyA9IFtdO1xuICAgIGxldCBpblF1b3RlcyA9IGZhbHNlO1xuICAgIGxldCBlc2NhcGVkID0gZmFsc2U7XG4gICAgbGV0IGFyZyA9ICcnO1xuICAgIGZ1bmN0aW9uIGFwcGVuZChjKSB7XG4gICAgICAgIC8vIHdlIG9ubHkgZXNjYXBlIGRvdWJsZSBxdW90ZXMuXG4gICAgICAgIGlmIChlc2NhcGVkICYmIGMgIT09ICdcIicpIHtcbiAgICAgICAgICAgIGFyZyArPSAnXFxcXCc7XG4gICAgICAgIH1cbiAgICAgICAgYXJnICs9IGM7XG4gICAgICAgIGVzY2FwZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcmdTdHJpbmcubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgYyA9IGFyZ1N0cmluZy5jaGFyQXQoaSk7XG4gICAgICAgIGlmIChjID09PSAnXCInKSB7XG4gICAgICAgICAgICBpZiAoIWVzY2FwZWQpIHtcbiAgICAgICAgICAgICAgICBpblF1b3RlcyA9ICFpblF1b3RlcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGFwcGVuZChjKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjID09PSAnXFxcXCcgJiYgZXNjYXBlZCkge1xuICAgICAgICAgICAgYXBwZW5kKGMpO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGMgPT09ICdcXFxcJyAmJiBpblF1b3Rlcykge1xuICAgICAgICAgICAgZXNjYXBlZCA9IHRydWU7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYyA9PT0gJyAnICYmICFpblF1b3Rlcykge1xuICAgICAgICAgICAgaWYgKGFyZy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgYXJncy5wdXNoKGFyZyk7XG4gICAgICAgICAgICAgICAgYXJnID0gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBhcHBlbmQoYyk7XG4gICAgfVxuICAgIGlmIChhcmcubGVuZ3RoID4gMCkge1xuICAgICAgICBhcmdzLnB1c2goYXJnLnRyaW0oKSk7XG4gICAgfVxuICAgIHJldHVybiBhcmdzO1xufVxuZXhwb3J0cy5hcmdTdHJpbmdUb0FycmF5ID0gYXJnU3RyaW5nVG9BcnJheTtcbmNsYXNzIEV4ZWNTdGF0ZSBleHRlbmRzIGV2ZW50cy5FdmVudEVtaXR0ZXIge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMsIHRvb2xQYXRoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMucHJvY2Vzc0Nsb3NlZCA9IGZhbHNlOyAvLyB0cmFja3Mgd2hldGhlciB0aGUgcHJvY2VzcyBoYXMgZXhpdGVkIGFuZCBzdGRpbyBpcyBjbG9zZWRcbiAgICAgICAgdGhpcy5wcm9jZXNzRXJyb3IgPSAnJztcbiAgICAgICAgdGhpcy5wcm9jZXNzRXhpdENvZGUgPSAwO1xuICAgICAgICB0aGlzLnByb2Nlc3NFeGl0ZWQgPSBmYWxzZTsgLy8gdHJhY2tzIHdoZXRoZXIgdGhlIHByb2Nlc3MgaGFzIGV4aXRlZFxuICAgICAgICB0aGlzLnByb2Nlc3NTdGRlcnIgPSBmYWxzZTsgLy8gdHJhY2tzIHdoZXRoZXIgc3RkZXJyIHdhcyB3cml0dGVuIHRvXG4gICAgICAgIHRoaXMuZGVsYXkgPSAxMDAwMDsgLy8gMTAgc2Vjb25kc1xuICAgICAgICB0aGlzLmRvbmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgaWYgKCF0b29sUGF0aCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd0b29sUGF0aCBtdXN0IG5vdCBiZSBlbXB0eScpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgICAgIHRoaXMudG9vbFBhdGggPSB0b29sUGF0aDtcbiAgICAgICAgaWYgKG9wdGlvbnMuZGVsYXkpIHtcbiAgICAgICAgICAgIHRoaXMuZGVsYXkgPSBvcHRpb25zLmRlbGF5O1xuICAgICAgICB9XG4gICAgfVxuICAgIENoZWNrQ29tcGxldGUoKSB7XG4gICAgICAgIGlmICh0aGlzLmRvbmUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wcm9jZXNzQ2xvc2VkKSB7XG4gICAgICAgICAgICB0aGlzLl9zZXRSZXN1bHQoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnByb2Nlc3NFeGl0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoRXhlY1N0YXRlLkhhbmRsZVRpbWVvdXQsIHRoaXMuZGVsYXksIHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9kZWJ1ZyhtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMuZW1pdCgnZGVidWcnLCBtZXNzYWdlKTtcbiAgICB9XG4gICAgX3NldFJlc3VsdCgpIHtcbiAgICAgICAgLy8gZGV0ZXJtaW5lIHdoZXRoZXIgdGhlcmUgaXMgYW4gZXJyb3JcbiAgICAgICAgbGV0IGVycm9yO1xuICAgICAgICBpZiAodGhpcy5wcm9jZXNzRXhpdGVkKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9jZXNzRXJyb3IpIHtcbiAgICAgICAgICAgICAgICBlcnJvciA9IG5ldyBFcnJvcihgVGhlcmUgd2FzIGFuIGVycm9yIHdoZW4gYXR0ZW1wdGluZyB0byBleGVjdXRlIHRoZSBwcm9jZXNzICcke3RoaXMudG9vbFBhdGh9Jy4gVGhpcyBtYXkgaW5kaWNhdGUgdGhlIHByb2Nlc3MgZmFpbGVkIHRvIHN0YXJ0LiBFcnJvcjogJHt0aGlzLnByb2Nlc3NFcnJvcn1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMucHJvY2Vzc0V4aXRDb2RlICE9PSAwICYmICF0aGlzLm9wdGlvbnMuaWdub3JlUmV0dXJuQ29kZSkge1xuICAgICAgICAgICAgICAgIGVycm9yID0gbmV3IEVycm9yKGBUaGUgcHJvY2VzcyAnJHt0aGlzLnRvb2xQYXRofScgZmFpbGVkIHdpdGggZXhpdCBjb2RlICR7dGhpcy5wcm9jZXNzRXhpdENvZGV9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLnByb2Nlc3NTdGRlcnIgJiYgdGhpcy5vcHRpb25zLmZhaWxPblN0ZEVycikge1xuICAgICAgICAgICAgICAgIGVycm9yID0gbmV3IEVycm9yKGBUaGUgcHJvY2VzcyAnJHt0aGlzLnRvb2xQYXRofScgZmFpbGVkIGJlY2F1c2Ugb25lIG9yIG1vcmUgbGluZXMgd2VyZSB3cml0dGVuIHRvIHRoZSBTVERFUlIgc3RyZWFtYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gY2xlYXIgdGhlIHRpbWVvdXRcbiAgICAgICAgaWYgKHRoaXMudGltZW91dCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gICAgICAgICAgICB0aGlzLnRpbWVvdXQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG4gICAgICAgIHRoaXMuZW1pdCgnZG9uZScsIGVycm9yLCB0aGlzLnByb2Nlc3NFeGl0Q29kZSk7XG4gICAgfVxuICAgIHN0YXRpYyBIYW5kbGVUaW1lb3V0KHN0YXRlKSB7XG4gICAgICAgIGlmIChzdGF0ZS5kb25lKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFzdGF0ZS5wcm9jZXNzQ2xvc2VkICYmIHN0YXRlLnByb2Nlc3NFeGl0ZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBgVGhlIFNURElPIHN0cmVhbXMgZGlkIG5vdCBjbG9zZSB3aXRoaW4gJHtzdGF0ZS5kZWxheSAvXG4gICAgICAgICAgICAgICAgMTAwMH0gc2Vjb25kcyBvZiB0aGUgZXhpdCBldmVudCBmcm9tIHByb2Nlc3MgJyR7c3RhdGUudG9vbFBhdGh9Jy4gVGhpcyBtYXkgaW5kaWNhdGUgYSBjaGlsZCBwcm9jZXNzIGluaGVyaXRlZCB0aGUgU1RESU8gc3RyZWFtcyBhbmQgaGFzIG5vdCB5ZXQgZXhpdGVkLmA7XG4gICAgICAgICAgICBzdGF0ZS5fZGVidWcobWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgc3RhdGUuX3NldFJlc3VsdCgpO1xuICAgIH1cbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRvb2xydW5uZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XG4gICAgcmVzdWx0W1wiZGVmYXVsdFwiXSA9IG1vZDtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGZzXzEgPSByZXF1aXJlKFwiZnNcIik7XG5jb25zdCBjb3JlID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJAYWN0aW9ucy9jb3JlXCIpKTtcbmNvbnN0IHBhdGhfMSA9IHJlcXVpcmUoXCJwYXRoXCIpO1xuY29uc3QgZXhlYyA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiQGFjdGlvbnMvZXhlY1wiKSk7XG5jbGFzcyBEb3dubG9hZCB7XG4gICAgY29uc3RydWN0b3IodmVyc2lvbikge1xuICAgICAgICB0aGlzLnZlcnNpb24gPSB2ZXJzaW9uO1xuICAgICAgICB0aGlzLkJBU0VfVVJMID0gJ2h0dHBzOi8vZGwuZ29vZ2xlLmNvbS9kbC9jbG91ZHNkay9jaGFubmVscy9yYXBpZCc7XG4gICAgICAgIHRoaXMuc2RrVXJsID0gdGhpcy5CQVNFX1VSTDtcbiAgICAgICAgdGhpcy5zZXRTZGtEb3dubG9hZFVybCgpO1xuICAgIH1cbiAgICBkb3dubG9hZCgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGNvbnN0IGV4dGVuc2lvbiA9IHRoaXMuc2RrVXJsLmVuZHNXaXRoKCcuemlwJykgPyAnemlwJyA6ICd0YXIuZ3onO1xuICAgICAgICAgICAgY29uc3QgZGVzdGluYXRpb24gPSBwYXRoXzEucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBgZ29vZ2xlLWNsb3VkLXNkay4ke2V4dGVuc2lvbn1gKTtcbiAgICAgICAgICAgIGlmIChmc18xLmV4aXN0c1N5bmMoZGVzdGluYXRpb24pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlc3RpbmF0aW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29yZS5kZWJ1ZyhgRG93bmxvYWRpbmcgJHt0aGlzLnNka1VybH1gKTtcbiAgICAgICAgICAgIHlpZWxkIGV4ZWMuZXhlYyhgY3VybCAtcyAtbyAke2Rlc3RpbmF0aW9ufSAke3RoaXMuc2RrVXJsfWApO1xuICAgICAgICAgICAgY29yZS5kZWJ1ZyhgRG93bmxvYWRlZCAke3RoaXMuc2RrVXJsfWApO1xuICAgICAgICAgICAgcmV0dXJuIGRlc3RpbmF0aW9uO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgc2V0U2RrRG93bmxvYWRVcmwoKSB7XG4gICAgICAgIGlmICh0aGlzLnZlcnNpb24gPT09ICdsYXRlc3QnKSB7XG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2RrVXJsID0gYCR7dGhpcy5CQVNFX1VSTH0vZ29vZ2xlLWNsb3VkLXNkay56aXBgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZGtVcmwgPSBgJHt0aGlzLkJBU0VfVVJMfS9nb29nbGUtY2xvdWQtc2RrLnRhci5nemA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2RrVXJsID0gYCR7dGhpcy5CQVNFX1VSTH0vZG93bmxvYWRzL2dvb2dsZS1jbG91ZC1zZGstJHt0aGlzLnZlcnNpb259LXdpbmRvd3MteDg2XzY0LnppcGA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChwcm9jZXNzLnBsYXRmb3JtID09PSAnZGFyd2luJykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2RrVXJsID0gYCR7dGhpcy5CQVNFX1VSTH0vZG93bmxvYWRzL2dvb2dsZS1jbG91ZC1zZGstJHt0aGlzLnZlcnNpb259LWRhcndpbi14ODZfNjQudGFyLmd6YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2RrVXJsID0gYCR7dGhpcy5CQVNFX1VSTH0vZG93bmxvYWRzL2dvb2dsZS1jbG91ZC1zZGstJHt0aGlzLnZlcnNpb259LWxpbnV4LXg4Nl82NC50YXIuZ3pgO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5Eb3dubG9hZCA9IERvd25sb2FkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XG4gICAgcmVzdWx0W1wiZGVmYXVsdFwiXSA9IG1vZDtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGRvd25sb2FkXzEgPSByZXF1aXJlKFwiLi9kb3dubG9hZFwiKTtcbmNvbnN0IHBhdGhfMSA9IHJlcXVpcmUoXCJwYXRoXCIpO1xuY29uc3QgY29yZSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiQGFjdGlvbnMvY29yZVwiKSk7XG5jb25zdCBleGVjID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJAYWN0aW9ucy9leGVjXCIpKTtcbmNvbnN0IGZzXzEgPSByZXF1aXJlKFwiZnNcIik7XG5mdW5jdGlvbiBpbnN0YWxsKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnN0IGRvd25sb2FkZXIgPSBuZXcgZG93bmxvYWRfMS5Eb3dubG9hZCgnbGF0ZXN0Jyk7XG4gICAgICAgIGNvbnN0IHNka0ZpbGUgPSB5aWVsZCBkb3dubG9hZGVyLmRvd25sb2FkKCk7XG4gICAgICAgIGNvbnN0IGRlc3RpbmF0aW9uRm9sZGVyID0gcGF0aF8xLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJ2dvb2dsZS1jbG91ZC1zZGsnKTtcbiAgICAgICAgaWYgKHNka0ZpbGUuZW5kc1dpdGgoJy56aXAnKSkge1xuICAgICAgICAgICAgeWllbGQgZXhlYy5leGVjKGA3eiBlIC15ICR7c2RrRmlsZX0gLW8ke2Rlc3RpbmF0aW9uRm9sZGVyfWApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgeWllbGQgZXhlYy5leGVjKGB0YXIgLXhmICR7c2RrRmlsZX1gKTtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKHByb2Nlc3MucGxhdGZvcm0gPT09ICd3aW4zMicpIHtcbiAgICAgICAgICAgICAgICB5aWVsZCBleGVjLmV4ZWMocGF0aF8xLnJlc29sdmUoZGVzdGluYXRpb25Gb2xkZXIsICdDTE9VRFNES19DT1JFX0RJU0FCTEVfUFJPTVBUUz0xIGluc3RhbGwuYmF0JykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ2RhcndpbicpIHtcbiAgICAgICAgICAgICAgICB5aWVsZCBleGVjLmV4ZWMocGF0aF8xLnJlc29sdmUoZGVzdGluYXRpb25Gb2xkZXIsICdDTE9VRFNES19DT1JFX0RJU0FCTEVfUFJPTVBUUz0xIGluc3RhbGwuc2gnKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB5aWVsZCBleGVjLmV4ZWMocGF0aF8xLnJlc29sdmUoZGVzdGluYXRpb25Gb2xkZXIsICdpbnN0YWxsLnNoIC0tZGlzYWJsZS1wcm9tcHRzJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29yZS5zZXRGYWlsZWQoZXJyb3IubWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2VydmljZUFjY291bnRLZXlCYXNlNjQgPSBjb3JlLmdldElucHV0KCdzZXJ2aWNlLWFjY291bnQta2V5Jyk7XG4gICAgICAgIGNvbnN0IHNlcnZpY2VBY2NvdW50S2V5SnNvbiA9IEJ1ZmZlci5mcm9tKHNlcnZpY2VBY2NvdW50S2V5QmFzZTY0LCAnYmFzZTY0Jyk7XG4gICAgICAgIGNvbnN0IHNlcnZpY2VBY2NvdW50S2V5UGF0aCA9IHBhdGhfMS5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICdnY2xvdWQuanNvbicpO1xuICAgICAgICBmc18xLndyaXRlRmlsZVN5bmMoc2VydmljZUFjY291bnRLZXlQYXRoLCBzZXJ2aWNlQWNjb3VudEtleUpzb24pO1xuICAgICAgICB5aWVsZCBleGVjLmV4ZWMoYGdjbG91ZCBhdXRoIGFjdGl2YXRlLXNlcnZpY2UtYWNjb3VudCAtLWtleS1maWxlPSR7c2VydmljZUFjY291bnRLZXlQYXRofWApO1xuICAgIH0pO1xufVxuZXhwb3J0cy5pbnN0YWxsID0gaW5zdGFsbDtcbmluc3RhbGwoKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNoaWxkX3Byb2Nlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXZlbnRzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm9zXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7Il0sInNvdXJjZVJvb3QiOiIifQ==