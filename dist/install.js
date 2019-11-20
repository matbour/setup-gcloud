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

/***/ "./node_modules/@actions/io/lib/io-util.js":
/*!*************************************************!*\
  !*** ./node_modules/@actions/io/lib/io-util.js ***!
  \*************************************************/
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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __webpack_require__(/*! assert */ "assert");
const fs = __webpack_require__(/*! fs */ "fs");
const path = __webpack_require__(/*! path */ "path");
_a = fs.promises, exports.chmod = _a.chmod, exports.copyFile = _a.copyFile, exports.lstat = _a.lstat, exports.mkdir = _a.mkdir, exports.readdir = _a.readdir, exports.readlink = _a.readlink, exports.rename = _a.rename, exports.rmdir = _a.rmdir, exports.stat = _a.stat, exports.symlink = _a.symlink, exports.unlink = _a.unlink;
exports.IS_WINDOWS = process.platform === 'win32';
function exists(fsPath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield exports.stat(fsPath);
        }
        catch (err) {
            if (err.code === 'ENOENT') {
                return false;
            }
            throw err;
        }
        return true;
    });
}
exports.exists = exists;
function isDirectory(fsPath, useStat = false) {
    return __awaiter(this, void 0, void 0, function* () {
        const stats = useStat ? yield exports.stat(fsPath) : yield exports.lstat(fsPath);
        return stats.isDirectory();
    });
}
exports.isDirectory = isDirectory;
/**
 * On OSX/Linux, true if path starts with '/'. On Windows, true for paths like:
 * \, \hello, \\hello\share, C:, and C:\hello (and corresponding alternate separator cases).
 */
function isRooted(p) {
    p = normalizeSeparators(p);
    if (!p) {
        throw new Error('isRooted() parameter "p" cannot be empty');
    }
    if (exports.IS_WINDOWS) {
        return (p.startsWith('\\') || /^[A-Z]:/i.test(p) // e.g. \ or \hello or \\hello
        ); // e.g. C: or C:\hello
    }
    return p.startsWith('/');
}
exports.isRooted = isRooted;
/**
 * Recursively create a directory at `fsPath`.
 *
 * This implementation is optimistic, meaning it attempts to create the full
 * path first, and backs up the path stack from there.
 *
 * @param fsPath The path to create
 * @param maxDepth The maximum recursion depth
 * @param depth The current recursion depth
 */
function mkdirP(fsPath, maxDepth = 1000, depth = 1) {
    return __awaiter(this, void 0, void 0, function* () {
        assert_1.ok(fsPath, 'a path argument must be provided');
        fsPath = path.resolve(fsPath);
        if (depth >= maxDepth)
            return exports.mkdir(fsPath);
        try {
            yield exports.mkdir(fsPath);
            return;
        }
        catch (err) {
            switch (err.code) {
                case 'ENOENT': {
                    yield mkdirP(path.dirname(fsPath), maxDepth, depth + 1);
                    yield exports.mkdir(fsPath);
                    return;
                }
                default: {
                    let stats;
                    try {
                        stats = yield exports.stat(fsPath);
                    }
                    catch (err2) {
                        throw err;
                    }
                    if (!stats.isDirectory())
                        throw err;
                }
            }
        }
    });
}
exports.mkdirP = mkdirP;
/**
 * Best effort attempt to determine whether a file exists and is executable.
 * @param filePath    file path to check
 * @param extensions  additional file extensions to try
 * @return if file exists and is executable, returns the file path. otherwise empty string.
 */
function tryGetExecutablePath(filePath, extensions) {
    return __awaiter(this, void 0, void 0, function* () {
        let stats = undefined;
        try {
            // test file exists
            stats = yield exports.stat(filePath);
        }
        catch (err) {
            if (err.code !== 'ENOENT') {
                // eslint-disable-next-line no-console
                console.log(`Unexpected error attempting to determine if executable file exists '${filePath}': ${err}`);
            }
        }
        if (stats && stats.isFile()) {
            if (exports.IS_WINDOWS) {
                // on Windows, test for valid extension
                const upperExt = path.extname(filePath).toUpperCase();
                if (extensions.some(validExt => validExt.toUpperCase() === upperExt)) {
                    return filePath;
                }
            }
            else {
                if (isUnixExecutable(stats)) {
                    return filePath;
                }
            }
        }
        // try each extension
        const originalFilePath = filePath;
        for (const extension of extensions) {
            filePath = originalFilePath + extension;
            stats = undefined;
            try {
                stats = yield exports.stat(filePath);
            }
            catch (err) {
                if (err.code !== 'ENOENT') {
                    // eslint-disable-next-line no-console
                    console.log(`Unexpected error attempting to determine if executable file exists '${filePath}': ${err}`);
                }
            }
            if (stats && stats.isFile()) {
                if (exports.IS_WINDOWS) {
                    // preserve the case of the actual file (since an extension was appended)
                    try {
                        const directory = path.dirname(filePath);
                        const upperName = path.basename(filePath).toUpperCase();
                        for (const actualName of yield exports.readdir(directory)) {
                            if (upperName === actualName.toUpperCase()) {
                                filePath = path.join(directory, actualName);
                                break;
                            }
                        }
                    }
                    catch (err) {
                        // eslint-disable-next-line no-console
                        console.log(`Unexpected error attempting to determine the actual case of the file '${filePath}': ${err}`);
                    }
                    return filePath;
                }
                else {
                    if (isUnixExecutable(stats)) {
                        return filePath;
                    }
                }
            }
        }
        return '';
    });
}
exports.tryGetExecutablePath = tryGetExecutablePath;
function normalizeSeparators(p) {
    p = p || '';
    if (exports.IS_WINDOWS) {
        // convert slashes on Windows
        p = p.replace(/\//g, '\\');
        // remove redundant slashes
        return p.replace(/\\\\+/g, '\\');
    }
    // remove redundant slashes
    return p.replace(/\/\/+/g, '/');
}
// on Mac/Linux, test the execute bit
//     R   W  X  R  W X R W X
//   256 128 64 32 16 8 4 2 1
function isUnixExecutable(stats) {
    return ((stats.mode & 1) > 0 ||
        ((stats.mode & 8) > 0 && stats.gid === process.getgid()) ||
        ((stats.mode & 64) > 0 && stats.uid === process.getuid()));
}
//# sourceMappingURL=io-util.js.map

/***/ }),

/***/ "./node_modules/@actions/io/lib/io.js":
/*!********************************************!*\
  !*** ./node_modules/@actions/io/lib/io.js ***!
  \********************************************/
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
const childProcess = __webpack_require__(/*! child_process */ "child_process");
const path = __webpack_require__(/*! path */ "path");
const util_1 = __webpack_require__(/*! util */ "util");
const ioUtil = __webpack_require__(/*! ./io-util */ "./node_modules/@actions/io/lib/io-util.js");
const exec = util_1.promisify(childProcess.exec);
/**
 * Copies a file or folder.
 * Based off of shelljs - https://github.com/shelljs/shelljs/blob/9237f66c52e5daa40458f94f9565e18e8132f5a6/src/cp.js
 *
 * @param     source    source path
 * @param     dest      destination path
 * @param     options   optional. See CopyOptions.
 */
function cp(source, dest, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const { force, recursive } = readCopyOptions(options);
        const destStat = (yield ioUtil.exists(dest)) ? yield ioUtil.stat(dest) : null;
        // Dest is an existing file, but not forcing
        if (destStat && destStat.isFile() && !force) {
            return;
        }
        // If dest is an existing directory, should copy inside.
        const newDest = destStat && destStat.isDirectory()
            ? path.join(dest, path.basename(source))
            : dest;
        if (!(yield ioUtil.exists(source))) {
            throw new Error(`no such file or directory: ${source}`);
        }
        const sourceStat = yield ioUtil.stat(source);
        if (sourceStat.isDirectory()) {
            if (!recursive) {
                throw new Error(`Failed to copy. ${source} is a directory, but tried to copy without recursive flag.`);
            }
            else {
                yield cpDirRecursive(source, newDest, 0, force);
            }
        }
        else {
            if (path.relative(source, newDest) === '') {
                // a file cannot be copied to itself
                throw new Error(`'${newDest}' and '${source}' are the same file`);
            }
            yield copyFile(source, newDest, force);
        }
    });
}
exports.cp = cp;
/**
 * Moves a path.
 *
 * @param     source    source path
 * @param     dest      destination path
 * @param     options   optional. See MoveOptions.
 */
function mv(source, dest, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        if (yield ioUtil.exists(dest)) {
            let destExists = true;
            if (yield ioUtil.isDirectory(dest)) {
                // If dest is directory copy src into dest
                dest = path.join(dest, path.basename(source));
                destExists = yield ioUtil.exists(dest);
            }
            if (destExists) {
                if (options.force == null || options.force) {
                    yield rmRF(dest);
                }
                else {
                    throw new Error('Destination already exists');
                }
            }
        }
        yield mkdirP(path.dirname(dest));
        yield ioUtil.rename(source, dest);
    });
}
exports.mv = mv;
/**
 * Remove a path recursively with force
 *
 * @param inputPath path to remove
 */
function rmRF(inputPath) {
    return __awaiter(this, void 0, void 0, function* () {
        if (ioUtil.IS_WINDOWS) {
            // Node doesn't provide a delete operation, only an unlink function. This means that if the file is being used by another
            // program (e.g. antivirus), it won't be deleted. To address this, we shell out the work to rd/del.
            try {
                if (yield ioUtil.isDirectory(inputPath, true)) {
                    yield exec(`rd /s /q "${inputPath}"`);
                }
                else {
                    yield exec(`del /f /a "${inputPath}"`);
                }
            }
            catch (err) {
                // if you try to delete a file that doesn't exist, desired result is achieved
                // other errors are valid
                if (err.code !== 'ENOENT')
                    throw err;
            }
            // Shelling out fails to remove a symlink folder with missing source, this unlink catches that
            try {
                yield ioUtil.unlink(inputPath);
            }
            catch (err) {
                // if you try to delete a file that doesn't exist, desired result is achieved
                // other errors are valid
                if (err.code !== 'ENOENT')
                    throw err;
            }
        }
        else {
            let isDir = false;
            try {
                isDir = yield ioUtil.isDirectory(inputPath);
            }
            catch (err) {
                // if you try to delete a file that doesn't exist, desired result is achieved
                // other errors are valid
                if (err.code !== 'ENOENT')
                    throw err;
                return;
            }
            if (isDir) {
                yield exec(`rm -rf "${inputPath}"`);
            }
            else {
                yield ioUtil.unlink(inputPath);
            }
        }
    });
}
exports.rmRF = rmRF;
/**
 * Make a directory.  Creates the full path with folders in between
 * Will throw if it fails
 *
 * @param   fsPath        path to create
 * @returns Promise<void>
 */
function mkdirP(fsPath) {
    return __awaiter(this, void 0, void 0, function* () {
        yield ioUtil.mkdirP(fsPath);
    });
}
exports.mkdirP = mkdirP;
/**
 * Returns path of a tool had the tool actually been invoked.  Resolves via paths.
 * If you check and the tool does not exist, it will throw.
 *
 * @param     tool              name of the tool
 * @param     check             whether to check if tool exists
 * @returns   Promise<string>   path to tool
 */
function which(tool, check) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!tool) {
            throw new Error("parameter 'tool' is required");
        }
        // recursive when check=true
        if (check) {
            const result = yield which(tool, false);
            if (!result) {
                if (ioUtil.IS_WINDOWS) {
                    throw new Error(`Unable to locate executable file: ${tool}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also verify the file has a valid extension for an executable file.`);
                }
                else {
                    throw new Error(`Unable to locate executable file: ${tool}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also check the file mode to verify the file is executable.`);
                }
            }
        }
        try {
            // build the list of extensions to try
            const extensions = [];
            if (ioUtil.IS_WINDOWS && process.env.PATHEXT) {
                for (const extension of process.env.PATHEXT.split(path.delimiter)) {
                    if (extension) {
                        extensions.push(extension);
                    }
                }
            }
            // if it's rooted, return it if exists. otherwise return empty.
            if (ioUtil.isRooted(tool)) {
                const filePath = yield ioUtil.tryGetExecutablePath(tool, extensions);
                if (filePath) {
                    return filePath;
                }
                return '';
            }
            // if any path separators, return empty
            if (tool.includes('/') || (ioUtil.IS_WINDOWS && tool.includes('\\'))) {
                return '';
            }
            // build the list of directories
            //
            // Note, technically "where" checks the current directory on Windows. From a toolkit perspective,
            // it feels like we should not do this. Checking the current directory seems like more of a use
            // case of a shell, and the which() function exposed by the toolkit should strive for consistency
            // across platforms.
            const directories = [];
            if (process.env.PATH) {
                for (const p of process.env.PATH.split(path.delimiter)) {
                    if (p) {
                        directories.push(p);
                    }
                }
            }
            // return the first match
            for (const directory of directories) {
                const filePath = yield ioUtil.tryGetExecutablePath(directory + path.sep + tool, extensions);
                if (filePath) {
                    return filePath;
                }
            }
            return '';
        }
        catch (err) {
            throw new Error(`which failed with message ${err.message}`);
        }
    });
}
exports.which = which;
function readCopyOptions(options) {
    const force = options.force == null ? true : options.force;
    const recursive = Boolean(options.recursive);
    return { force, recursive };
}
function cpDirRecursive(sourceDir, destDir, currentDepth, force) {
    return __awaiter(this, void 0, void 0, function* () {
        // Ensure there is not a run away recursive copy
        if (currentDepth >= 255)
            return;
        currentDepth++;
        yield mkdirP(destDir);
        const files = yield ioUtil.readdir(sourceDir);
        for (const fileName of files) {
            const srcFile = `${sourceDir}/${fileName}`;
            const destFile = `${destDir}/${fileName}`;
            const srcFileStat = yield ioUtil.lstat(srcFile);
            if (srcFileStat.isDirectory()) {
                // Recurse
                yield cpDirRecursive(srcFile, destFile, currentDepth, force);
            }
            else {
                yield copyFile(srcFile, destFile, force);
            }
        }
        // Change the mode for the newly created directory
        yield ioUtil.chmod(destDir, (yield ioUtil.stat(sourceDir)).mode);
    });
}
// Buffered file copy
function copyFile(srcFile, destFile, force) {
    return __awaiter(this, void 0, void 0, function* () {
        if ((yield ioUtil.lstat(srcFile)).isSymbolicLink()) {
            // unlink/re-link it
            try {
                yield ioUtil.lstat(destFile);
                yield ioUtil.unlink(destFile);
            }
            catch (e) {
                // Try to override file permission
                if (e.code === 'EPERM') {
                    yield ioUtil.chmod(destFile, '0666');
                    yield ioUtil.unlink(destFile);
                }
                // other errors = it doesn't exist, no work to do
            }
            // Copy over symlink
            const symlinkFull = yield ioUtil.readlink(srcFile);
            yield ioUtil.symlink(symlinkFull, destFile, ioUtil.IS_WINDOWS ? 'junction' : null);
        }
        else if (!(yield ioUtil.exists(destFile)) || force) {
            yield ioUtil.copyFile(srcFile, destFile);
        }
    });
}
//# sourceMappingURL=io.js.map

/***/ }),

/***/ "./node_modules/@actions/tool-cache/lib/tool-cache.js":
/*!************************************************************!*\
  !*** ./node_modules/@actions/tool-cache/lib/tool-cache.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {
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
const core = __webpack_require__(/*! @actions/core */ "./node_modules/@actions/core/lib/core.js");
const io = __webpack_require__(/*! @actions/io */ "./node_modules/@actions/io/lib/io.js");
const fs = __webpack_require__(/*! fs */ "fs");
const os = __webpack_require__(/*! os */ "os");
const path = __webpack_require__(/*! path */ "path");
const httpm = __webpack_require__(/*! typed-rest-client/HttpClient */ "./node_modules/typed-rest-client/HttpClient.js");
const semver = __webpack_require__(/*! semver */ "./node_modules/semver/semver.js");
const uuidV4 = __webpack_require__(/*! uuid/v4 */ "./node_modules/uuid/v4.js");
const exec_1 = __webpack_require__(/*! @actions/exec/lib/exec */ "./node_modules/@actions/exec/lib/exec.js");
const assert_1 = __webpack_require__(/*! assert */ "assert");
class HTTPError extends Error {
    constructor(httpStatusCode) {
        super(`Unexpected HTTP response: ${httpStatusCode}`);
        this.httpStatusCode = httpStatusCode;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.HTTPError = HTTPError;
const IS_WINDOWS = process.platform === 'win32';
const userAgent = 'actions/tool-cache';
// On load grab temp directory and cache directory and remove them from env (currently don't want to expose this)
let tempDirectory = process.env['RUNNER_TEMP'] || '';
let cacheRoot = process.env['RUNNER_TOOL_CACHE'] || '';
// If directories not found, place them in common temp locations
if (!tempDirectory || !cacheRoot) {
    let baseLocation;
    if (IS_WINDOWS) {
        // On windows use the USERPROFILE env variable
        baseLocation = process.env['USERPROFILE'] || 'C:\\';
    }
    else {
        if (process.platform === 'darwin') {
            baseLocation = '/Users';
        }
        else {
            baseLocation = '/home';
        }
    }
    if (!tempDirectory) {
        tempDirectory = path.join(baseLocation, 'actions', 'temp');
    }
    if (!cacheRoot) {
        cacheRoot = path.join(baseLocation, 'actions', 'cache');
    }
}
/**
 * Download a tool from an url and stream it into a file
 *
 * @param url       url of tool to download
 * @returns         path to downloaded tool
 */
function downloadTool(url) {
    return __awaiter(this, void 0, void 0, function* () {
        // Wrap in a promise so that we can resolve from within stream callbacks
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const http = new httpm.HttpClient(userAgent, [], {
                    allowRetries: true,
                    maxRetries: 3
                });
                const destPath = path.join(tempDirectory, uuidV4());
                yield io.mkdirP(tempDirectory);
                core.debug(`Downloading ${url}`);
                core.debug(`Downloading ${destPath}`);
                if (fs.existsSync(destPath)) {
                    throw new Error(`Destination file path ${destPath} already exists`);
                }
                const response = yield http.get(url);
                if (response.message.statusCode !== 200) {
                    const err = new HTTPError(response.message.statusCode);
                    core.debug(`Failed to download from "${url}". Code(${response.message.statusCode}) Message(${response.message.statusMessage})`);
                    throw err;
                }
                const file = fs.createWriteStream(destPath);
                file.on('open', () => __awaiter(this, void 0, void 0, function* () {
                    try {
                        const stream = response.message.pipe(file);
                        stream.on('close', () => {
                            core.debug('download complete');
                            resolve(destPath);
                        });
                    }
                    catch (err) {
                        core.debug(`Failed to download from "${url}". Code(${response.message.statusCode}) Message(${response.message.statusMessage})`);
                        reject(err);
                    }
                }));
                file.on('error', err => {
                    file.end();
                    reject(err);
                });
            }
            catch (err) {
                reject(err);
            }
        }));
    });
}
exports.downloadTool = downloadTool;
/**
 * Extract a .7z file
 *
 * @param file     path to the .7z file
 * @param dest     destination directory. Optional.
 * @param _7zPath  path to 7zr.exe. Optional, for long path support. Most .7z archives do not have this
 * problem. If your .7z archive contains very long paths, you can pass the path to 7zr.exe which will
 * gracefully handle long paths. By default 7zdec.exe is used because it is a very small program and is
 * bundled with the tool lib. However it does not support long paths. 7zr.exe is the reduced command line
 * interface, it is smaller than the full command line interface, and it does support long paths. At the
 * time of this writing, it is freely available from the LZMA SDK that is available on the 7zip website.
 * Be sure to check the current license agreement. If 7zr.exe is bundled with your action, then the path
 * to 7zr.exe can be pass to this function.
 * @returns        path to the destination directory
 */
function extract7z(file, dest, _7zPath) {
    return __awaiter(this, void 0, void 0, function* () {
        assert_1.ok(IS_WINDOWS, 'extract7z() not supported on current OS');
        assert_1.ok(file, 'parameter "file" is required');
        dest = dest || (yield _createExtractFolder(dest));
        const originalCwd = process.cwd();
        process.chdir(dest);
        if (_7zPath) {
            try {
                const args = [
                    'x',
                    '-bb1',
                    '-bd',
                    '-sccUTF-8',
                    file
                ];
                const options = {
                    silent: true
                };
                yield exec_1.exec(`"${_7zPath}"`, args, options);
            }
            finally {
                process.chdir(originalCwd);
            }
        }
        else {
            const escapedScript = path
                .join(__dirname, '..', 'scripts', 'Invoke-7zdec.ps1')
                .replace(/'/g, "''")
                .replace(/"|\n|\r/g, ''); // double-up single quotes, remove double quotes and newlines
            const escapedFile = file.replace(/'/g, "''").replace(/"|\n|\r/g, '');
            const escapedTarget = dest.replace(/'/g, "''").replace(/"|\n|\r/g, '');
            const command = `& '${escapedScript}' -Source '${escapedFile}' -Target '${escapedTarget}'`;
            const args = [
                '-NoLogo',
                '-Sta',
                '-NoProfile',
                '-NonInteractive',
                '-ExecutionPolicy',
                'Unrestricted',
                '-Command',
                command
            ];
            const options = {
                silent: true
            };
            try {
                const powershellPath = yield io.which('powershell', true);
                yield exec_1.exec(`"${powershellPath}"`, args, options);
            }
            finally {
                process.chdir(originalCwd);
            }
        }
        return dest;
    });
}
exports.extract7z = extract7z;
/**
 * Extract a tar
 *
 * @param file     path to the tar
 * @param dest     destination directory. Optional.
 * @param flags    flags for the tar. Optional.
 * @returns        path to the destination directory
 */
function extractTar(file, dest, flags = 'xz') {
    return __awaiter(this, void 0, void 0, function* () {
        if (!file) {
            throw new Error("parameter 'file' is required");
        }
        dest = dest || (yield _createExtractFolder(dest));
        const tarPath = yield io.which('tar', true);
        yield exec_1.exec(`"${tarPath}"`, [flags, '-C', dest, '-f', file]);
        return dest;
    });
}
exports.extractTar = extractTar;
/**
 * Extract a zip
 *
 * @param file     path to the zip
 * @param dest     destination directory. Optional.
 * @returns        path to the destination directory
 */
function extractZip(file, dest) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!file) {
            throw new Error("parameter 'file' is required");
        }
        dest = dest || (yield _createExtractFolder(dest));
        if (IS_WINDOWS) {
            yield extractZipWin(file, dest);
        }
        else {
            yield extractZipNix(file, dest);
        }
        return dest;
    });
}
exports.extractZip = extractZip;
function extractZipWin(file, dest) {
    return __awaiter(this, void 0, void 0, function* () {
        // build the powershell command
        const escapedFile = file.replace(/'/g, "''").replace(/"|\n|\r/g, ''); // double-up single quotes, remove double quotes and newlines
        const escapedDest = dest.replace(/'/g, "''").replace(/"|\n|\r/g, '');
        const command = `$ErrorActionPreference = 'Stop' ; try { Add-Type -AssemblyName System.IO.Compression.FileSystem } catch { } ; [System.IO.Compression.ZipFile]::ExtractToDirectory('${escapedFile}', '${escapedDest}')`;
        // run powershell
        const powershellPath = yield io.which('powershell');
        const args = [
            '-NoLogo',
            '-Sta',
            '-NoProfile',
            '-NonInteractive',
            '-ExecutionPolicy',
            'Unrestricted',
            '-Command',
            command
        ];
        yield exec_1.exec(`"${powershellPath}"`, args);
    });
}
function extractZipNix(file, dest) {
    return __awaiter(this, void 0, void 0, function* () {
        const unzipPath = yield io.which('unzip');
        yield exec_1.exec(`"${unzipPath}"`, [file], { cwd: dest });
    });
}
/**
 * Caches a directory and installs it into the tool cacheDir
 *
 * @param sourceDir    the directory to cache into tools
 * @param tool          tool name
 * @param version       version of the tool.  semver format
 * @param arch          architecture of the tool.  Optional.  Defaults to machine architecture
 */
function cacheDir(sourceDir, tool, version, arch) {
    return __awaiter(this, void 0, void 0, function* () {
        version = semver.clean(version) || version;
        arch = arch || os.arch();
        core.debug(`Caching tool ${tool} ${version} ${arch}`);
        core.debug(`source dir: ${sourceDir}`);
        if (!fs.statSync(sourceDir).isDirectory()) {
            throw new Error('sourceDir is not a directory');
        }
        // Create the tool dir
        const destPath = yield _createToolPath(tool, version, arch);
        // copy each child item. do not move. move can fail on Windows
        // due to anti-virus software having an open handle on a file.
        for (const itemName of fs.readdirSync(sourceDir)) {
            const s = path.join(sourceDir, itemName);
            yield io.cp(s, destPath, { recursive: true });
        }
        // write .complete
        _completeToolPath(tool, version, arch);
        return destPath;
    });
}
exports.cacheDir = cacheDir;
/**
 * Caches a downloaded file (GUID) and installs it
 * into the tool cache with a given targetName
 *
 * @param sourceFile    the file to cache into tools.  Typically a result of downloadTool which is a guid.
 * @param targetFile    the name of the file name in the tools directory
 * @param tool          tool name
 * @param version       version of the tool.  semver format
 * @param arch          architecture of the tool.  Optional.  Defaults to machine architecture
 */
function cacheFile(sourceFile, targetFile, tool, version, arch) {
    return __awaiter(this, void 0, void 0, function* () {
        version = semver.clean(version) || version;
        arch = arch || os.arch();
        core.debug(`Caching tool ${tool} ${version} ${arch}`);
        core.debug(`source file: ${sourceFile}`);
        if (!fs.statSync(sourceFile).isFile()) {
            throw new Error('sourceFile is not a file');
        }
        // create the tool dir
        const destFolder = yield _createToolPath(tool, version, arch);
        // copy instead of move. move can fail on Windows due to
        // anti-virus software having an open handle on a file.
        const destPath = path.join(destFolder, targetFile);
        core.debug(`destination file ${destPath}`);
        yield io.cp(sourceFile, destPath);
        // write .complete
        _completeToolPath(tool, version, arch);
        return destFolder;
    });
}
exports.cacheFile = cacheFile;
/**
 * Finds the path to a tool version in the local installed tool cache
 *
 * @param toolName      name of the tool
 * @param versionSpec   version of the tool
 * @param arch          optional arch.  defaults to arch of computer
 */
function find(toolName, versionSpec, arch) {
    if (!toolName) {
        throw new Error('toolName parameter is required');
    }
    if (!versionSpec) {
        throw new Error('versionSpec parameter is required');
    }
    arch = arch || os.arch();
    // attempt to resolve an explicit version
    if (!_isExplicitVersion(versionSpec)) {
        const localVersions = findAllVersions(toolName, arch);
        const match = _evaluateVersions(localVersions, versionSpec);
        versionSpec = match;
    }
    // check for the explicit version in the cache
    let toolPath = '';
    if (versionSpec) {
        versionSpec = semver.clean(versionSpec) || '';
        const cachePath = path.join(cacheRoot, toolName, versionSpec, arch);
        core.debug(`checking cache: ${cachePath}`);
        if (fs.existsSync(cachePath) && fs.existsSync(`${cachePath}.complete`)) {
            core.debug(`Found tool in cache ${toolName} ${versionSpec} ${arch}`);
            toolPath = cachePath;
        }
        else {
            core.debug('not found');
        }
    }
    return toolPath;
}
exports.find = find;
/**
 * Finds the paths to all versions of a tool that are installed in the local tool cache
 *
 * @param toolName  name of the tool
 * @param arch      optional arch.  defaults to arch of computer
 */
function findAllVersions(toolName, arch) {
    const versions = [];
    arch = arch || os.arch();
    const toolPath = path.join(cacheRoot, toolName);
    if (fs.existsSync(toolPath)) {
        const children = fs.readdirSync(toolPath);
        for (const child of children) {
            if (_isExplicitVersion(child)) {
                const fullPath = path.join(toolPath, child, arch || '');
                if (fs.existsSync(fullPath) && fs.existsSync(`${fullPath}.complete`)) {
                    versions.push(child);
                }
            }
        }
    }
    return versions;
}
exports.findAllVersions = findAllVersions;
function _createExtractFolder(dest) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!dest) {
            // create a temp dir
            dest = path.join(tempDirectory, uuidV4());
        }
        yield io.mkdirP(dest);
        return dest;
    });
}
function _createToolPath(tool, version, arch) {
    return __awaiter(this, void 0, void 0, function* () {
        const folderPath = path.join(cacheRoot, tool, semver.clean(version) || version, arch || '');
        core.debug(`destination ${folderPath}`);
        const markerPath = `${folderPath}.complete`;
        yield io.rmRF(folderPath);
        yield io.rmRF(markerPath);
        yield io.mkdirP(folderPath);
        return folderPath;
    });
}
function _completeToolPath(tool, version, arch) {
    const folderPath = path.join(cacheRoot, tool, semver.clean(version) || version, arch || '');
    const markerPath = `${folderPath}.complete`;
    fs.writeFileSync(markerPath, '');
    core.debug('finished caching tool');
}
function _isExplicitVersion(versionSpec) {
    const c = semver.clean(versionSpec) || '';
    core.debug(`isExplicit: ${c}`);
    const valid = semver.valid(c) != null;
    core.debug(`explicit? ${valid}`);
    return valid;
}
function _evaluateVersions(versions, versionSpec) {
    let version = '';
    core.debug(`evaluating ${versions.length} versions`);
    versions = versions.sort((a, b) => {
        if (semver.gt(a, b)) {
            return 1;
        }
        return -1;
    });
    for (let i = versions.length - 1; i >= 0; i--) {
        const potential = versions[i];
        const satisfied = semver.satisfies(potential, versionSpec);
        if (satisfied) {
            version = potential;
            break;
        }
    }
    if (version) {
        core.debug(`matched: ${version}`);
    }
    else {
        core.debug('match not found');
    }
    return version;
}
//# sourceMappingURL=tool-cache.js.map
/* WEBPACK VAR INJECTION */}.call(this, "/"))

/***/ }),

/***/ "./node_modules/semver/semver.js":
/*!***************************************!*\
  !*** ./node_modules/semver/semver.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports = module.exports = SemVer

var debug
/* istanbul ignore next */
if (typeof process === 'object' &&
    process.env &&
    process.env.NODE_DEBUG &&
    /\bsemver\b/i.test(process.env.NODE_DEBUG)) {
  debug = function () {
    var args = Array.prototype.slice.call(arguments, 0)
    args.unshift('SEMVER')
    console.log.apply(console, args)
  }
} else {
  debug = function () {}
}

// Note: this is the semver.org version of the spec that it implements
// Not necessarily the package version of this code.
exports.SEMVER_SPEC_VERSION = '2.0.0'

var MAX_LENGTH = 256
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER ||
  /* istanbul ignore next */ 9007199254740991

// Max safe segment length for coercion.
var MAX_SAFE_COMPONENT_LENGTH = 16

// The actual regexps go on exports.re
var re = exports.re = []
var src = exports.src = []
var t = exports.tokens = {}
var R = 0

function tok (n) {
  t[n] = R++
}

// The following Regular Expressions can be used for tokenizing,
// validating, and parsing SemVer version strings.

// ## Numeric Identifier
// A single `0`, or a non-zero digit followed by zero or more digits.

tok('NUMERICIDENTIFIER')
src[t.NUMERICIDENTIFIER] = '0|[1-9]\\d*'
tok('NUMERICIDENTIFIERLOOSE')
src[t.NUMERICIDENTIFIERLOOSE] = '[0-9]+'

// ## Non-numeric Identifier
// Zero or more digits, followed by a letter or hyphen, and then zero or
// more letters, digits, or hyphens.

tok('NONNUMERICIDENTIFIER')
src[t.NONNUMERICIDENTIFIER] = '\\d*[a-zA-Z-][a-zA-Z0-9-]*'

// ## Main Version
// Three dot-separated numeric identifiers.

tok('MAINVERSION')
src[t.MAINVERSION] = '(' + src[t.NUMERICIDENTIFIER] + ')\\.' +
                   '(' + src[t.NUMERICIDENTIFIER] + ')\\.' +
                   '(' + src[t.NUMERICIDENTIFIER] + ')'

tok('MAINVERSIONLOOSE')
src[t.MAINVERSIONLOOSE] = '(' + src[t.NUMERICIDENTIFIERLOOSE] + ')\\.' +
                        '(' + src[t.NUMERICIDENTIFIERLOOSE] + ')\\.' +
                        '(' + src[t.NUMERICIDENTIFIERLOOSE] + ')'

// ## Pre-release Version Identifier
// A numeric identifier, or a non-numeric identifier.

tok('PRERELEASEIDENTIFIER')
src[t.PRERELEASEIDENTIFIER] = '(?:' + src[t.NUMERICIDENTIFIER] +
                            '|' + src[t.NONNUMERICIDENTIFIER] + ')'

tok('PRERELEASEIDENTIFIERLOOSE')
src[t.PRERELEASEIDENTIFIERLOOSE] = '(?:' + src[t.NUMERICIDENTIFIERLOOSE] +
                                 '|' + src[t.NONNUMERICIDENTIFIER] + ')'

// ## Pre-release Version
// Hyphen, followed by one or more dot-separated pre-release version
// identifiers.

tok('PRERELEASE')
src[t.PRERELEASE] = '(?:-(' + src[t.PRERELEASEIDENTIFIER] +
                  '(?:\\.' + src[t.PRERELEASEIDENTIFIER] + ')*))'

tok('PRERELEASELOOSE')
src[t.PRERELEASELOOSE] = '(?:-?(' + src[t.PRERELEASEIDENTIFIERLOOSE] +
                       '(?:\\.' + src[t.PRERELEASEIDENTIFIERLOOSE] + ')*))'

// ## Build Metadata Identifier
// Any combination of digits, letters, or hyphens.

tok('BUILDIDENTIFIER')
src[t.BUILDIDENTIFIER] = '[0-9A-Za-z-]+'

// ## Build Metadata
// Plus sign, followed by one or more period-separated build metadata
// identifiers.

tok('BUILD')
src[t.BUILD] = '(?:\\+(' + src[t.BUILDIDENTIFIER] +
             '(?:\\.' + src[t.BUILDIDENTIFIER] + ')*))'

// ## Full Version String
// A main version, followed optionally by a pre-release version and
// build metadata.

// Note that the only major, minor, patch, and pre-release sections of
// the version string are capturing groups.  The build metadata is not a
// capturing group, because it should not ever be used in version
// comparison.

tok('FULL')
tok('FULLPLAIN')
src[t.FULLPLAIN] = 'v?' + src[t.MAINVERSION] +
                  src[t.PRERELEASE] + '?' +
                  src[t.BUILD] + '?'

src[t.FULL] = '^' + src[t.FULLPLAIN] + '$'

// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
// common in the npm registry.
tok('LOOSEPLAIN')
src[t.LOOSEPLAIN] = '[v=\\s]*' + src[t.MAINVERSIONLOOSE] +
                  src[t.PRERELEASELOOSE] + '?' +
                  src[t.BUILD] + '?'

tok('LOOSE')
src[t.LOOSE] = '^' + src[t.LOOSEPLAIN] + '$'

tok('GTLT')
src[t.GTLT] = '((?:<|>)?=?)'

// Something like "2.*" or "1.2.x".
// Note that "x.x" is a valid xRange identifer, meaning "any version"
// Only the first item is strictly required.
tok('XRANGEIDENTIFIERLOOSE')
src[t.XRANGEIDENTIFIERLOOSE] = src[t.NUMERICIDENTIFIERLOOSE] + '|x|X|\\*'
tok('XRANGEIDENTIFIER')
src[t.XRANGEIDENTIFIER] = src[t.NUMERICIDENTIFIER] + '|x|X|\\*'

tok('XRANGEPLAIN')
src[t.XRANGEPLAIN] = '[v=\\s]*(' + src[t.XRANGEIDENTIFIER] + ')' +
                   '(?:\\.(' + src[t.XRANGEIDENTIFIER] + ')' +
                   '(?:\\.(' + src[t.XRANGEIDENTIFIER] + ')' +
                   '(?:' + src[t.PRERELEASE] + ')?' +
                   src[t.BUILD] + '?' +
                   ')?)?'

tok('XRANGEPLAINLOOSE')
src[t.XRANGEPLAINLOOSE] = '[v=\\s]*(' + src[t.XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:\\.(' + src[t.XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:\\.(' + src[t.XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:' + src[t.PRERELEASELOOSE] + ')?' +
                        src[t.BUILD] + '?' +
                        ')?)?'

tok('XRANGE')
src[t.XRANGE] = '^' + src[t.GTLT] + '\\s*' + src[t.XRANGEPLAIN] + '$'
tok('XRANGELOOSE')
src[t.XRANGELOOSE] = '^' + src[t.GTLT] + '\\s*' + src[t.XRANGEPLAINLOOSE] + '$'

// Coercion.
// Extract anything that could conceivably be a part of a valid semver
tok('COERCE')
src[t.COERCE] = '(^|[^\\d])' +
              '(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '})' +
              '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' +
              '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' +
              '(?:$|[^\\d])'
tok('COERCERTL')
re[t.COERCERTL] = new RegExp(src[t.COERCE], 'g')

// Tilde ranges.
// Meaning is "reasonably at or greater than"
tok('LONETILDE')
src[t.LONETILDE] = '(?:~>?)'

tok('TILDETRIM')
src[t.TILDETRIM] = '(\\s*)' + src[t.LONETILDE] + '\\s+'
re[t.TILDETRIM] = new RegExp(src[t.TILDETRIM], 'g')
var tildeTrimReplace = '$1~'

tok('TILDE')
src[t.TILDE] = '^' + src[t.LONETILDE] + src[t.XRANGEPLAIN] + '$'
tok('TILDELOOSE')
src[t.TILDELOOSE] = '^' + src[t.LONETILDE] + src[t.XRANGEPLAINLOOSE] + '$'

// Caret ranges.
// Meaning is "at least and backwards compatible with"
tok('LONECARET')
src[t.LONECARET] = '(?:\\^)'

tok('CARETTRIM')
src[t.CARETTRIM] = '(\\s*)' + src[t.LONECARET] + '\\s+'
re[t.CARETTRIM] = new RegExp(src[t.CARETTRIM], 'g')
var caretTrimReplace = '$1^'

tok('CARET')
src[t.CARET] = '^' + src[t.LONECARET] + src[t.XRANGEPLAIN] + '$'
tok('CARETLOOSE')
src[t.CARETLOOSE] = '^' + src[t.LONECARET] + src[t.XRANGEPLAINLOOSE] + '$'

// A simple gt/lt/eq thing, or just "" to indicate "any version"
tok('COMPARATORLOOSE')
src[t.COMPARATORLOOSE] = '^' + src[t.GTLT] + '\\s*(' + src[t.LOOSEPLAIN] + ')$|^$'
tok('COMPARATOR')
src[t.COMPARATOR] = '^' + src[t.GTLT] + '\\s*(' + src[t.FULLPLAIN] + ')$|^$'

// An expression to strip any whitespace between the gtlt and the thing
// it modifies, so that `> 1.2.3` ==> `>1.2.3`
tok('COMPARATORTRIM')
src[t.COMPARATORTRIM] = '(\\s*)' + src[t.GTLT] +
                      '\\s*(' + src[t.LOOSEPLAIN] + '|' + src[t.XRANGEPLAIN] + ')'

// this one has to use the /g flag
re[t.COMPARATORTRIM] = new RegExp(src[t.COMPARATORTRIM], 'g')
var comparatorTrimReplace = '$1$2$3'

// Something like `1.2.3 - 1.2.4`
// Note that these all use the loose form, because they'll be
// checked against either the strict or loose comparator form
// later.
tok('HYPHENRANGE')
src[t.HYPHENRANGE] = '^\\s*(' + src[t.XRANGEPLAIN] + ')' +
                   '\\s+-\\s+' +
                   '(' + src[t.XRANGEPLAIN] + ')' +
                   '\\s*$'

tok('HYPHENRANGELOOSE')
src[t.HYPHENRANGELOOSE] = '^\\s*(' + src[t.XRANGEPLAINLOOSE] + ')' +
                        '\\s+-\\s+' +
                        '(' + src[t.XRANGEPLAINLOOSE] + ')' +
                        '\\s*$'

// Star ranges basically just allow anything at all.
tok('STAR')
src[t.STAR] = '(<|>)?=?\\s*\\*'

// Compile to actual regexp objects.
// All are flag-free, unless they were created above with a flag.
for (var i = 0; i < R; i++) {
  debug(i, src[i])
  if (!re[i]) {
    re[i] = new RegExp(src[i])
  }
}

exports.parse = parse
function parse (version, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  if (version instanceof SemVer) {
    return version
  }

  if (typeof version !== 'string') {
    return null
  }

  if (version.length > MAX_LENGTH) {
    return null
  }

  var r = options.loose ? re[t.LOOSE] : re[t.FULL]
  if (!r.test(version)) {
    return null
  }

  try {
    return new SemVer(version, options)
  } catch (er) {
    return null
  }
}

exports.valid = valid
function valid (version, options) {
  var v = parse(version, options)
  return v ? v.version : null
}

exports.clean = clean
function clean (version, options) {
  var s = parse(version.trim().replace(/^[=v]+/, ''), options)
  return s ? s.version : null
}

exports.SemVer = SemVer

function SemVer (version, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }
  if (version instanceof SemVer) {
    if (version.loose === options.loose) {
      return version
    } else {
      version = version.version
    }
  } else if (typeof version !== 'string') {
    throw new TypeError('Invalid Version: ' + version)
  }

  if (version.length > MAX_LENGTH) {
    throw new TypeError('version is longer than ' + MAX_LENGTH + ' characters')
  }

  if (!(this instanceof SemVer)) {
    return new SemVer(version, options)
  }

  debug('SemVer', version, options)
  this.options = options
  this.loose = !!options.loose

  var m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL])

  if (!m) {
    throw new TypeError('Invalid Version: ' + version)
  }

  this.raw = version

  // these are actually numbers
  this.major = +m[1]
  this.minor = +m[2]
  this.patch = +m[3]

  if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
    throw new TypeError('Invalid major version')
  }

  if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
    throw new TypeError('Invalid minor version')
  }

  if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
    throw new TypeError('Invalid patch version')
  }

  // numberify any prerelease numeric ids
  if (!m[4]) {
    this.prerelease = []
  } else {
    this.prerelease = m[4].split('.').map(function (id) {
      if (/^[0-9]+$/.test(id)) {
        var num = +id
        if (num >= 0 && num < MAX_SAFE_INTEGER) {
          return num
        }
      }
      return id
    })
  }

  this.build = m[5] ? m[5].split('.') : []
  this.format()
}

SemVer.prototype.format = function () {
  this.version = this.major + '.' + this.minor + '.' + this.patch
  if (this.prerelease.length) {
    this.version += '-' + this.prerelease.join('.')
  }
  return this.version
}

SemVer.prototype.toString = function () {
  return this.version
}

SemVer.prototype.compare = function (other) {
  debug('SemVer.compare', this.version, this.options, other)
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options)
  }

  return this.compareMain(other) || this.comparePre(other)
}

SemVer.prototype.compareMain = function (other) {
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options)
  }

  return compareIdentifiers(this.major, other.major) ||
         compareIdentifiers(this.minor, other.minor) ||
         compareIdentifiers(this.patch, other.patch)
}

SemVer.prototype.comparePre = function (other) {
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options)
  }

  // NOT having a prerelease is > having one
  if (this.prerelease.length && !other.prerelease.length) {
    return -1
  } else if (!this.prerelease.length && other.prerelease.length) {
    return 1
  } else if (!this.prerelease.length && !other.prerelease.length) {
    return 0
  }

  var i = 0
  do {
    var a = this.prerelease[i]
    var b = other.prerelease[i]
    debug('prerelease compare', i, a, b)
    if (a === undefined && b === undefined) {
      return 0
    } else if (b === undefined) {
      return 1
    } else if (a === undefined) {
      return -1
    } else if (a === b) {
      continue
    } else {
      return compareIdentifiers(a, b)
    }
  } while (++i)
}

SemVer.prototype.compareBuild = function (other) {
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options)
  }

  var i = 0
  do {
    var a = this.build[i]
    var b = other.build[i]
    debug('prerelease compare', i, a, b)
    if (a === undefined && b === undefined) {
      return 0
    } else if (b === undefined) {
      return 1
    } else if (a === undefined) {
      return -1
    } else if (a === b) {
      continue
    } else {
      return compareIdentifiers(a, b)
    }
  } while (++i)
}

// preminor will bump the version up to the next minor release, and immediately
// down to pre-release. premajor and prepatch work the same way.
SemVer.prototype.inc = function (release, identifier) {
  switch (release) {
    case 'premajor':
      this.prerelease.length = 0
      this.patch = 0
      this.minor = 0
      this.major++
      this.inc('pre', identifier)
      break
    case 'preminor':
      this.prerelease.length = 0
      this.patch = 0
      this.minor++
      this.inc('pre', identifier)
      break
    case 'prepatch':
      // If this is already a prerelease, it will bump to the next version
      // drop any prereleases that might already exist, since they are not
      // relevant at this point.
      this.prerelease.length = 0
      this.inc('patch', identifier)
      this.inc('pre', identifier)
      break
    // If the input is a non-prerelease version, this acts the same as
    // prepatch.
    case 'prerelease':
      if (this.prerelease.length === 0) {
        this.inc('patch', identifier)
      }
      this.inc('pre', identifier)
      break

    case 'major':
      // If this is a pre-major version, bump up to the same major version.
      // Otherwise increment major.
      // 1.0.0-5 bumps to 1.0.0
      // 1.1.0 bumps to 2.0.0
      if (this.minor !== 0 ||
          this.patch !== 0 ||
          this.prerelease.length === 0) {
        this.major++
      }
      this.minor = 0
      this.patch = 0
      this.prerelease = []
      break
    case 'minor':
      // If this is a pre-minor version, bump up to the same minor version.
      // Otherwise increment minor.
      // 1.2.0-5 bumps to 1.2.0
      // 1.2.1 bumps to 1.3.0
      if (this.patch !== 0 || this.prerelease.length === 0) {
        this.minor++
      }
      this.patch = 0
      this.prerelease = []
      break
    case 'patch':
      // If this is not a pre-release version, it will increment the patch.
      // If it is a pre-release it will bump up to the same patch version.
      // 1.2.0-5 patches to 1.2.0
      // 1.2.0 patches to 1.2.1
      if (this.prerelease.length === 0) {
        this.patch++
      }
      this.prerelease = []
      break
    // This probably shouldn't be used publicly.
    // 1.0.0 "pre" would become 1.0.0-0 which is the wrong direction.
    case 'pre':
      if (this.prerelease.length === 0) {
        this.prerelease = [0]
      } else {
        var i = this.prerelease.length
        while (--i >= 0) {
          if (typeof this.prerelease[i] === 'number') {
            this.prerelease[i]++
            i = -2
          }
        }
        if (i === -1) {
          // didn't increment anything
          this.prerelease.push(0)
        }
      }
      if (identifier) {
        // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
        // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
        if (this.prerelease[0] === identifier) {
          if (isNaN(this.prerelease[1])) {
            this.prerelease = [identifier, 0]
          }
        } else {
          this.prerelease = [identifier, 0]
        }
      }
      break

    default:
      throw new Error('invalid increment argument: ' + release)
  }
  this.format()
  this.raw = this.version
  return this
}

exports.inc = inc
function inc (version, release, loose, identifier) {
  if (typeof (loose) === 'string') {
    identifier = loose
    loose = undefined
  }

  try {
    return new SemVer(version, loose).inc(release, identifier).version
  } catch (er) {
    return null
  }
}

exports.diff = diff
function diff (version1, version2) {
  if (eq(version1, version2)) {
    return null
  } else {
    var v1 = parse(version1)
    var v2 = parse(version2)
    var prefix = ''
    if (v1.prerelease.length || v2.prerelease.length) {
      prefix = 'pre'
      var defaultResult = 'prerelease'
    }
    for (var key in v1) {
      if (key === 'major' || key === 'minor' || key === 'patch') {
        if (v1[key] !== v2[key]) {
          return prefix + key
        }
      }
    }
    return defaultResult // may be undefined
  }
}

exports.compareIdentifiers = compareIdentifiers

var numeric = /^[0-9]+$/
function compareIdentifiers (a, b) {
  var anum = numeric.test(a)
  var bnum = numeric.test(b)

  if (anum && bnum) {
    a = +a
    b = +b
  }

  return a === b ? 0
    : (anum && !bnum) ? -1
    : (bnum && !anum) ? 1
    : a < b ? -1
    : 1
}

exports.rcompareIdentifiers = rcompareIdentifiers
function rcompareIdentifiers (a, b) {
  return compareIdentifiers(b, a)
}

exports.major = major
function major (a, loose) {
  return new SemVer(a, loose).major
}

exports.minor = minor
function minor (a, loose) {
  return new SemVer(a, loose).minor
}

exports.patch = patch
function patch (a, loose) {
  return new SemVer(a, loose).patch
}

exports.compare = compare
function compare (a, b, loose) {
  return new SemVer(a, loose).compare(new SemVer(b, loose))
}

exports.compareLoose = compareLoose
function compareLoose (a, b) {
  return compare(a, b, true)
}

exports.compareBuild = compareBuild
function compareBuild (a, b, loose) {
  var versionA = new SemVer(a, loose)
  var versionB = new SemVer(b, loose)
  return versionA.compare(versionB) || versionA.compareBuild(versionB)
}

exports.rcompare = rcompare
function rcompare (a, b, loose) {
  return compare(b, a, loose)
}

exports.sort = sort
function sort (list, loose) {
  return list.sort(function (a, b) {
    return exports.compareBuild(a, b, loose)
  })
}

exports.rsort = rsort
function rsort (list, loose) {
  return list.sort(function (a, b) {
    return exports.compareBuild(b, a, loose)
  })
}

exports.gt = gt
function gt (a, b, loose) {
  return compare(a, b, loose) > 0
}

exports.lt = lt
function lt (a, b, loose) {
  return compare(a, b, loose) < 0
}

exports.eq = eq
function eq (a, b, loose) {
  return compare(a, b, loose) === 0
}

exports.neq = neq
function neq (a, b, loose) {
  return compare(a, b, loose) !== 0
}

exports.gte = gte
function gte (a, b, loose) {
  return compare(a, b, loose) >= 0
}

exports.lte = lte
function lte (a, b, loose) {
  return compare(a, b, loose) <= 0
}

exports.cmp = cmp
function cmp (a, op, b, loose) {
  switch (op) {
    case '===':
      if (typeof a === 'object')
        a = a.version
      if (typeof b === 'object')
        b = b.version
      return a === b

    case '!==':
      if (typeof a === 'object')
        a = a.version
      if (typeof b === 'object')
        b = b.version
      return a !== b

    case '':
    case '=':
    case '==':
      return eq(a, b, loose)

    case '!=':
      return neq(a, b, loose)

    case '>':
      return gt(a, b, loose)

    case '>=':
      return gte(a, b, loose)

    case '<':
      return lt(a, b, loose)

    case '<=':
      return lte(a, b, loose)

    default:
      throw new TypeError('Invalid operator: ' + op)
  }
}

exports.Comparator = Comparator
function Comparator (comp, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  if (comp instanceof Comparator) {
    if (comp.loose === !!options.loose) {
      return comp
    } else {
      comp = comp.value
    }
  }

  if (!(this instanceof Comparator)) {
    return new Comparator(comp, options)
  }

  debug('comparator', comp, options)
  this.options = options
  this.loose = !!options.loose
  this.parse(comp)

  if (this.semver === ANY) {
    this.value = ''
  } else {
    this.value = this.operator + this.semver.version
  }

  debug('comp', this)
}

var ANY = {}
Comparator.prototype.parse = function (comp) {
  var r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR]
  var m = comp.match(r)

  if (!m) {
    throw new TypeError('Invalid comparator: ' + comp)
  }

  this.operator = m[1] !== undefined ? m[1] : ''
  if (this.operator === '=') {
    this.operator = ''
  }

  // if it literally is just '>' or '' then allow anything.
  if (!m[2]) {
    this.semver = ANY
  } else {
    this.semver = new SemVer(m[2], this.options.loose)
  }
}

Comparator.prototype.toString = function () {
  return this.value
}

Comparator.prototype.test = function (version) {
  debug('Comparator.test', version, this.options.loose)

  if (this.semver === ANY || version === ANY) {
    return true
  }

  if (typeof version === 'string') {
    try {
      version = new SemVer(version, this.options)
    } catch (er) {
      return false
    }
  }

  return cmp(version, this.operator, this.semver, this.options)
}

Comparator.prototype.intersects = function (comp, options) {
  if (!(comp instanceof Comparator)) {
    throw new TypeError('a Comparator is required')
  }

  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  var rangeTmp

  if (this.operator === '') {
    if (this.value === '') {
      return true
    }
    rangeTmp = new Range(comp.value, options)
    return satisfies(this.value, rangeTmp, options)
  } else if (comp.operator === '') {
    if (comp.value === '') {
      return true
    }
    rangeTmp = new Range(this.value, options)
    return satisfies(comp.semver, rangeTmp, options)
  }

  var sameDirectionIncreasing =
    (this.operator === '>=' || this.operator === '>') &&
    (comp.operator === '>=' || comp.operator === '>')
  var sameDirectionDecreasing =
    (this.operator === '<=' || this.operator === '<') &&
    (comp.operator === '<=' || comp.operator === '<')
  var sameSemVer = this.semver.version === comp.semver.version
  var differentDirectionsInclusive =
    (this.operator === '>=' || this.operator === '<=') &&
    (comp.operator === '>=' || comp.operator === '<=')
  var oppositeDirectionsLessThan =
    cmp(this.semver, '<', comp.semver, options) &&
    ((this.operator === '>=' || this.operator === '>') &&
    (comp.operator === '<=' || comp.operator === '<'))
  var oppositeDirectionsGreaterThan =
    cmp(this.semver, '>', comp.semver, options) &&
    ((this.operator === '<=' || this.operator === '<') &&
    (comp.operator === '>=' || comp.operator === '>'))

  return sameDirectionIncreasing || sameDirectionDecreasing ||
    (sameSemVer && differentDirectionsInclusive) ||
    oppositeDirectionsLessThan || oppositeDirectionsGreaterThan
}

exports.Range = Range
function Range (range, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  if (range instanceof Range) {
    if (range.loose === !!options.loose &&
        range.includePrerelease === !!options.includePrerelease) {
      return range
    } else {
      return new Range(range.raw, options)
    }
  }

  if (range instanceof Comparator) {
    return new Range(range.value, options)
  }

  if (!(this instanceof Range)) {
    return new Range(range, options)
  }

  this.options = options
  this.loose = !!options.loose
  this.includePrerelease = !!options.includePrerelease

  // First, split based on boolean or ||
  this.raw = range
  this.set = range.split(/\s*\|\|\s*/).map(function (range) {
    return this.parseRange(range.trim())
  }, this).filter(function (c) {
    // throw out any that are not relevant for whatever reason
    return c.length
  })

  if (!this.set.length) {
    throw new TypeError('Invalid SemVer Range: ' + range)
  }

  this.format()
}

Range.prototype.format = function () {
  this.range = this.set.map(function (comps) {
    return comps.join(' ').trim()
  }).join('||').trim()
  return this.range
}

Range.prototype.toString = function () {
  return this.range
}

Range.prototype.parseRange = function (range) {
  var loose = this.options.loose
  range = range.trim()
  // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
  var hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE]
  range = range.replace(hr, hyphenReplace)
  debug('hyphen replace', range)
  // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
  range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace)
  debug('comparator trim', range, re[t.COMPARATORTRIM])

  // `~ 1.2.3` => `~1.2.3`
  range = range.replace(re[t.TILDETRIM], tildeTrimReplace)

  // `^ 1.2.3` => `^1.2.3`
  range = range.replace(re[t.CARETTRIM], caretTrimReplace)

  // normalize spaces
  range = range.split(/\s+/).join(' ')

  // At this point, the range is completely trimmed and
  // ready to be split into comparators.

  var compRe = loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR]
  var set = range.split(' ').map(function (comp) {
    return parseComparator(comp, this.options)
  }, this).join(' ').split(/\s+/)
  if (this.options.loose) {
    // in loose mode, throw out any that are not valid comparators
    set = set.filter(function (comp) {
      return !!comp.match(compRe)
    })
  }
  set = set.map(function (comp) {
    return new Comparator(comp, this.options)
  }, this)

  return set
}

Range.prototype.intersects = function (range, options) {
  if (!(range instanceof Range)) {
    throw new TypeError('a Range is required')
  }

  return this.set.some(function (thisComparators) {
    return (
      isSatisfiable(thisComparators, options) &&
      range.set.some(function (rangeComparators) {
        return (
          isSatisfiable(rangeComparators, options) &&
          thisComparators.every(function (thisComparator) {
            return rangeComparators.every(function (rangeComparator) {
              return thisComparator.intersects(rangeComparator, options)
            })
          })
        )
      })
    )
  })
}

// take a set of comparators and determine whether there
// exists a version which can satisfy it
function isSatisfiable (comparators, options) {
  var result = true
  var remainingComparators = comparators.slice()
  var testComparator = remainingComparators.pop()

  while (result && remainingComparators.length) {
    result = remainingComparators.every(function (otherComparator) {
      return testComparator.intersects(otherComparator, options)
    })

    testComparator = remainingComparators.pop()
  }

  return result
}

// Mostly just for testing and legacy API reasons
exports.toComparators = toComparators
function toComparators (range, options) {
  return new Range(range, options).set.map(function (comp) {
    return comp.map(function (c) {
      return c.value
    }).join(' ').trim().split(' ')
  })
}

// comprised of xranges, tildes, stars, and gtlt's at this point.
// already replaced the hyphen ranges
// turn into a set of JUST comparators.
function parseComparator (comp, options) {
  debug('comp', comp, options)
  comp = replaceCarets(comp, options)
  debug('caret', comp)
  comp = replaceTildes(comp, options)
  debug('tildes', comp)
  comp = replaceXRanges(comp, options)
  debug('xrange', comp)
  comp = replaceStars(comp, options)
  debug('stars', comp)
  return comp
}

function isX (id) {
  return !id || id.toLowerCase() === 'x' || id === '*'
}

// ~, ~> --> * (any, kinda silly)
// ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0
// ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0
// ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0
// ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0
// ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0
function replaceTildes (comp, options) {
  return comp.trim().split(/\s+/).map(function (comp) {
    return replaceTilde(comp, options)
  }).join(' ')
}

function replaceTilde (comp, options) {
  var r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE]
  return comp.replace(r, function (_, M, m, p, pr) {
    debug('tilde', comp, _, M, m, p, pr)
    var ret

    if (isX(M)) {
      ret = ''
    } else if (isX(m)) {
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0'
    } else if (isX(p)) {
      // ~1.2 == >=1.2.0 <1.3.0
      ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0'
    } else if (pr) {
      debug('replaceTilde pr', pr)
      ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
            ' <' + M + '.' + (+m + 1) + '.0'
    } else {
      // ~1.2.3 == >=1.2.3 <1.3.0
      ret = '>=' + M + '.' + m + '.' + p +
            ' <' + M + '.' + (+m + 1) + '.0'
    }

    debug('tilde return', ret)
    return ret
  })
}

// ^ --> * (any, kinda silly)
// ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0
// ^2.0, ^2.0.x --> >=2.0.0 <3.0.0
// ^1.2, ^1.2.x --> >=1.2.0 <2.0.0
// ^1.2.3 --> >=1.2.3 <2.0.0
// ^1.2.0 --> >=1.2.0 <2.0.0
function replaceCarets (comp, options) {
  return comp.trim().split(/\s+/).map(function (comp) {
    return replaceCaret(comp, options)
  }).join(' ')
}

function replaceCaret (comp, options) {
  debug('caret', comp, options)
  var r = options.loose ? re[t.CARETLOOSE] : re[t.CARET]
  return comp.replace(r, function (_, M, m, p, pr) {
    debug('caret', comp, _, M, m, p, pr)
    var ret

    if (isX(M)) {
      ret = ''
    } else if (isX(m)) {
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0'
    } else if (isX(p)) {
      if (M === '0') {
        ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0'
      } else {
        ret = '>=' + M + '.' + m + '.0 <' + (+M + 1) + '.0.0'
      }
    } else if (pr) {
      debug('replaceCaret pr', pr)
      if (M === '0') {
        if (m === '0') {
          ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
                ' <' + M + '.' + m + '.' + (+p + 1)
        } else {
          ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
                ' <' + M + '.' + (+m + 1) + '.0'
        }
      } else {
        ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
              ' <' + (+M + 1) + '.0.0'
      }
    } else {
      debug('no pr')
      if (M === '0') {
        if (m === '0') {
          ret = '>=' + M + '.' + m + '.' + p +
                ' <' + M + '.' + m + '.' + (+p + 1)
        } else {
          ret = '>=' + M + '.' + m + '.' + p +
                ' <' + M + '.' + (+m + 1) + '.0'
        }
      } else {
        ret = '>=' + M + '.' + m + '.' + p +
              ' <' + (+M + 1) + '.0.0'
      }
    }

    debug('caret return', ret)
    return ret
  })
}

function replaceXRanges (comp, options) {
  debug('replaceXRanges', comp, options)
  return comp.split(/\s+/).map(function (comp) {
    return replaceXRange(comp, options)
  }).join(' ')
}

function replaceXRange (comp, options) {
  comp = comp.trim()
  var r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE]
  return comp.replace(r, function (ret, gtlt, M, m, p, pr) {
    debug('xRange', comp, ret, gtlt, M, m, p, pr)
    var xM = isX(M)
    var xm = xM || isX(m)
    var xp = xm || isX(p)
    var anyX = xp

    if (gtlt === '=' && anyX) {
      gtlt = ''
    }

    // if we're including prereleases in the match, then we need
    // to fix this to -0, the lowest possible prerelease value
    pr = options.includePrerelease ? '-0' : ''

    if (xM) {
      if (gtlt === '>' || gtlt === '<') {
        // nothing is allowed
        ret = '<0.0.0-0'
      } else {
        // nothing is forbidden
        ret = '*'
      }
    } else if (gtlt && anyX) {
      // we know patch is an x, because we have any x at all.
      // replace X with 0
      if (xm) {
        m = 0
      }
      p = 0

      if (gtlt === '>') {
        // >1 => >=2.0.0
        // >1.2 => >=1.3.0
        // >1.2.3 => >= 1.2.4
        gtlt = '>='
        if (xm) {
          M = +M + 1
          m = 0
          p = 0
        } else {
          m = +m + 1
          p = 0
        }
      } else if (gtlt === '<=') {
        // <=0.7.x is actually <0.8.0, since any 0.7.x should
        // pass.  Similarly, <=7.x is actually <8.0.0, etc.
        gtlt = '<'
        if (xm) {
          M = +M + 1
        } else {
          m = +m + 1
        }
      }

      ret = gtlt + M + '.' + m + '.' + p + pr
    } else if (xm) {
      ret = '>=' + M + '.0.0' + pr + ' <' + (+M + 1) + '.0.0' + pr
    } else if (xp) {
      ret = '>=' + M + '.' + m + '.0' + pr +
        ' <' + M + '.' + (+m + 1) + '.0' + pr
    }

    debug('xRange return', ret)

    return ret
  })
}

// Because * is AND-ed with everything else in the comparator,
// and '' means "any version", just remove the *s entirely.
function replaceStars (comp, options) {
  debug('replaceStars', comp, options)
  // Looseness is ignored here.  star is always as loose as it gets!
  return comp.trim().replace(re[t.STAR], '')
}

// This function is passed to string.replace(re[t.HYPHENRANGE])
// M, m, patch, prerelease, build
// 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
// 1.2.3 - 3.4 => >=1.2.0 <3.5.0 Any 3.4.x will do
// 1.2 - 3.4 => >=1.2.0 <3.5.0
function hyphenReplace ($0,
  from, fM, fm, fp, fpr, fb,
  to, tM, tm, tp, tpr, tb) {
  if (isX(fM)) {
    from = ''
  } else if (isX(fm)) {
    from = '>=' + fM + '.0.0'
  } else if (isX(fp)) {
    from = '>=' + fM + '.' + fm + '.0'
  } else {
    from = '>=' + from
  }

  if (isX(tM)) {
    to = ''
  } else if (isX(tm)) {
    to = '<' + (+tM + 1) + '.0.0'
  } else if (isX(tp)) {
    to = '<' + tM + '.' + (+tm + 1) + '.0'
  } else if (tpr) {
    to = '<=' + tM + '.' + tm + '.' + tp + '-' + tpr
  } else {
    to = '<=' + to
  }

  return (from + ' ' + to).trim()
}

// if ANY of the sets match ALL of its comparators, then pass
Range.prototype.test = function (version) {
  if (!version) {
    return false
  }

  if (typeof version === 'string') {
    try {
      version = new SemVer(version, this.options)
    } catch (er) {
      return false
    }
  }

  for (var i = 0; i < this.set.length; i++) {
    if (testSet(this.set[i], version, this.options)) {
      return true
    }
  }
  return false
}

function testSet (set, version, options) {
  for (var i = 0; i < set.length; i++) {
    if (!set[i].test(version)) {
      return false
    }
  }

  if (version.prerelease.length && !options.includePrerelease) {
    // Find the set of versions that are allowed to have prereleases
    // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
    // That should allow `1.2.3-pr.2` to pass.
    // However, `1.2.4-alpha.notready` should NOT be allowed,
    // even though it's within the range set by the comparators.
    for (i = 0; i < set.length; i++) {
      debug(set[i].semver)
      if (set[i].semver === ANY) {
        continue
      }

      if (set[i].semver.prerelease.length > 0) {
        var allowed = set[i].semver
        if (allowed.major === version.major &&
            allowed.minor === version.minor &&
            allowed.patch === version.patch) {
          return true
        }
      }
    }

    // Version has a -pre, but it's not one of the ones we like.
    return false
  }

  return true
}

exports.satisfies = satisfies
function satisfies (version, range, options) {
  try {
    range = new Range(range, options)
  } catch (er) {
    return false
  }
  return range.test(version)
}

exports.maxSatisfying = maxSatisfying
function maxSatisfying (versions, range, options) {
  var max = null
  var maxSV = null
  try {
    var rangeObj = new Range(range, options)
  } catch (er) {
    return null
  }
  versions.forEach(function (v) {
    if (rangeObj.test(v)) {
      // satisfies(v, range, options)
      if (!max || maxSV.compare(v) === -1) {
        // compare(max, v, true)
        max = v
        maxSV = new SemVer(max, options)
      }
    }
  })
  return max
}

exports.minSatisfying = minSatisfying
function minSatisfying (versions, range, options) {
  var min = null
  var minSV = null
  try {
    var rangeObj = new Range(range, options)
  } catch (er) {
    return null
  }
  versions.forEach(function (v) {
    if (rangeObj.test(v)) {
      // satisfies(v, range, options)
      if (!min || minSV.compare(v) === 1) {
        // compare(min, v, true)
        min = v
        minSV = new SemVer(min, options)
      }
    }
  })
  return min
}

exports.minVersion = minVersion
function minVersion (range, loose) {
  range = new Range(range, loose)

  var minver = new SemVer('0.0.0')
  if (range.test(minver)) {
    return minver
  }

  minver = new SemVer('0.0.0-0')
  if (range.test(minver)) {
    return minver
  }

  minver = null
  for (var i = 0; i < range.set.length; ++i) {
    var comparators = range.set[i]

    comparators.forEach(function (comparator) {
      // Clone to avoid manipulating the comparator's semver object.
      var compver = new SemVer(comparator.semver.version)
      switch (comparator.operator) {
        case '>':
          if (compver.prerelease.length === 0) {
            compver.patch++
          } else {
            compver.prerelease.push(0)
          }
          compver.raw = compver.format()
          /* fallthrough */
        case '':
        case '>=':
          if (!minver || gt(minver, compver)) {
            minver = compver
          }
          break
        case '<':
        case '<=':
          /* Ignore maximum versions */
          break
        /* istanbul ignore next */
        default:
          throw new Error('Unexpected operation: ' + comparator.operator)
      }
    })
  }

  if (minver && range.test(minver)) {
    return minver
  }

  return null
}

exports.validRange = validRange
function validRange (range, options) {
  try {
    // Return '*' instead of '' so that truthiness works.
    // This will throw if it's invalid anyway
    return new Range(range, options).range || '*'
  } catch (er) {
    return null
  }
}

// Determine if version is less than all the versions possible in the range
exports.ltr = ltr
function ltr (version, range, options) {
  return outside(version, range, '<', options)
}

// Determine if version is greater than all the versions possible in the range.
exports.gtr = gtr
function gtr (version, range, options) {
  return outside(version, range, '>', options)
}

exports.outside = outside
function outside (version, range, hilo, options) {
  version = new SemVer(version, options)
  range = new Range(range, options)

  var gtfn, ltefn, ltfn, comp, ecomp
  switch (hilo) {
    case '>':
      gtfn = gt
      ltefn = lte
      ltfn = lt
      comp = '>'
      ecomp = '>='
      break
    case '<':
      gtfn = lt
      ltefn = gte
      ltfn = gt
      comp = '<'
      ecomp = '<='
      break
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"')
  }

  // If it satisifes the range it is not outside
  if (satisfies(version, range, options)) {
    return false
  }

  // From now on, variable terms are as if we're in "gtr" mode.
  // but note that everything is flipped for the "ltr" function.

  for (var i = 0; i < range.set.length; ++i) {
    var comparators = range.set[i]

    var high = null
    var low = null

    comparators.forEach(function (comparator) {
      if (comparator.semver === ANY) {
        comparator = new Comparator('>=0.0.0')
      }
      high = high || comparator
      low = low || comparator
      if (gtfn(comparator.semver, high.semver, options)) {
        high = comparator
      } else if (ltfn(comparator.semver, low.semver, options)) {
        low = comparator
      }
    })

    // If the edge version comparator has a operator then our version
    // isn't outside it
    if (high.operator === comp || high.operator === ecomp) {
      return false
    }

    // If the lowest version comparator has an operator and our version
    // is less than it then it isn't higher than the range
    if ((!low.operator || low.operator === comp) &&
        ltefn(version, low.semver)) {
      return false
    } else if (low.operator === ecomp && ltfn(version, low.semver)) {
      return false
    }
  }
  return true
}

exports.prerelease = prerelease
function prerelease (version, options) {
  var parsed = parse(version, options)
  return (parsed && parsed.prerelease.length) ? parsed.prerelease : null
}

exports.intersects = intersects
function intersects (r1, r2, options) {
  r1 = new Range(r1, options)
  r2 = new Range(r2, options)
  return r1.intersects(r2)
}

exports.coerce = coerce
function coerce (version, options) {
  if (version instanceof SemVer) {
    return version
  }

  if (typeof version === 'number') {
    version = String(version)
  }

  if (typeof version !== 'string') {
    return null
  }

  options = options || {}

  var match = null
  if (!options.rtl) {
    match = version.match(re[t.COERCE])
  } else {
    // Find the right-most coercible string that does not share
    // a terminus with a more left-ward coercible string.
    // Eg, '1.2.3.4' wants to coerce '2.3.4', not '3.4' or '4'
    //
    // Walk through the string checking with a /g regexp
    // Manually set the index so as to pick up overlapping matches.
    // Stop when we get a match that ends at the string end, since no
    // coercible string can be more right-ward without the same terminus.
    var next
    while ((next = re[t.COERCERTL].exec(version)) &&
      (!match || match.index + match[0].length !== version.length)
    ) {
      if (!match ||
          next.index + next[0].length !== match.index + match[0].length) {
        match = next
      }
      re[t.COERCERTL].lastIndex = next.index + next[1].length + next[2].length
    }
    // leave it in a clean state
    re[t.COERCERTL].lastIndex = -1
  }

  if (match === null) {
    return null
  }

  return parse(match[2] +
    '.' + (match[3] || '0') +
    '.' + (match[4] || '0'), options)
}


/***/ }),

/***/ "./node_modules/tunnel/index.js":
/*!**************************************!*\
  !*** ./node_modules/tunnel/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/tunnel */ "./node_modules/tunnel/lib/tunnel.js");


/***/ }),

/***/ "./node_modules/tunnel/lib/tunnel.js":
/*!*******************************************!*\
  !*** ./node_modules/tunnel/lib/tunnel.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var net = __webpack_require__(/*! net */ "net");
var tls = __webpack_require__(/*! tls */ "tls");
var http = __webpack_require__(/*! http */ "http");
var https = __webpack_require__(/*! https */ "https");
var events = __webpack_require__(/*! events */ "events");
var assert = __webpack_require__(/*! assert */ "assert");
var util = __webpack_require__(/*! util */ "util");


exports.httpOverHttp = httpOverHttp;
exports.httpsOverHttp = httpsOverHttp;
exports.httpOverHttps = httpOverHttps;
exports.httpsOverHttps = httpsOverHttps;


function httpOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  return agent;
}

function httpsOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  agent.createSocket = createSecureSocket;
  return agent;
}

function httpOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  return agent;
}

function httpsOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  agent.createSocket = createSecureSocket;
  return agent;
}


function TunnelingAgent(options) {
  var self = this;
  self.options = options || {};
  self.proxyOptions = self.options.proxy || {};
  self.maxSockets = self.options.maxSockets || http.Agent.defaultMaxSockets;
  self.requests = [];
  self.sockets = [];

  self.on('free', function onFree(socket, host, port, localAddress) {
    var options = toOptions(host, port, localAddress);
    for (var i = 0, len = self.requests.length; i < len; ++i) {
      var pending = self.requests[i];
      if (pending.host === options.host && pending.port === options.port) {
        // Detect the request to connect same origin server,
        // reuse the connection.
        self.requests.splice(i, 1);
        pending.request.onSocket(socket);
        return;
      }
    }
    socket.destroy();
    self.removeSocket(socket);
  });
}
util.inherits(TunnelingAgent, events.EventEmitter);

TunnelingAgent.prototype.addRequest = function addRequest(req, host, port, localAddress) {
  var self = this;
  var options = mergeOptions({request: req}, self.options, toOptions(host, port, localAddress));

  if (self.sockets.length >= this.maxSockets) {
    // We are over limit so we'll add it to the queue.
    self.requests.push(options);
    return;
  }

  // If we are under maxSockets create a new one.
  self.createSocket(options, function(socket) {
    socket.on('free', onFree);
    socket.on('close', onCloseOrRemove);
    socket.on('agentRemove', onCloseOrRemove);
    req.onSocket(socket);

    function onFree() {
      self.emit('free', socket, options);
    }

    function onCloseOrRemove(err) {
      self.removeSocket(socket);
      socket.removeListener('free', onFree);
      socket.removeListener('close', onCloseOrRemove);
      socket.removeListener('agentRemove', onCloseOrRemove);
    }
  });
};

TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
  var self = this;
  var placeholder = {};
  self.sockets.push(placeholder);

  var connectOptions = mergeOptions({}, self.proxyOptions, {
    method: 'CONNECT',
    path: options.host + ':' + options.port,
    agent: false
  });
  if (connectOptions.proxyAuth) {
    connectOptions.headers = connectOptions.headers || {};
    connectOptions.headers['Proxy-Authorization'] = 'Basic ' +
        new Buffer(connectOptions.proxyAuth).toString('base64');
  }

  debug('making CONNECT request');
  var connectReq = self.request(connectOptions);
  connectReq.useChunkedEncodingByDefault = false; // for v0.6
  connectReq.once('response', onResponse); // for v0.6
  connectReq.once('upgrade', onUpgrade);   // for v0.6
  connectReq.once('connect', onConnect);   // for v0.7 or later
  connectReq.once('error', onError);
  connectReq.end();

  function onResponse(res) {
    // Very hacky. This is necessary to avoid http-parser leaks.
    res.upgrade = true;
  }

  function onUpgrade(res, socket, head) {
    // Hacky.
    process.nextTick(function() {
      onConnect(res, socket, head);
    });
  }

  function onConnect(res, socket, head) {
    connectReq.removeAllListeners();
    socket.removeAllListeners();

    if (res.statusCode === 200) {
      assert.equal(head.length, 0);
      debug('tunneling connection has established');
      self.sockets[self.sockets.indexOf(placeholder)] = socket;
      cb(socket);
    } else {
      debug('tunneling socket could not be established, statusCode=%d',
            res.statusCode);
      var error = new Error('tunneling socket could not be established, ' +
                            'statusCode=' + res.statusCode);
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
    }
  }

  function onError(cause) {
    connectReq.removeAllListeners();

    debug('tunneling socket could not be established, cause=%s\n',
          cause.message, cause.stack);
    var error = new Error('tunneling socket could not be established, ' +
                          'cause=' + cause.message);
    error.code = 'ECONNRESET';
    options.request.emit('error', error);
    self.removeSocket(placeholder);
  }
};

TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
  var pos = this.sockets.indexOf(socket)
  if (pos === -1) {
    return;
  }
  this.sockets.splice(pos, 1);

  var pending = this.requests.shift();
  if (pending) {
    // If we have pending requests and a socket gets closed a new one
    // needs to be created to take over in the pool for the one that closed.
    this.createSocket(pending, function(socket) {
      pending.request.onSocket(socket);
    });
  }
};

function createSecureSocket(options, cb) {
  var self = this;
  TunnelingAgent.prototype.createSocket.call(self, options, function(socket) {
    var hostHeader = options.request.getHeader('host');
    var tlsOptions = mergeOptions({}, self.options, {
      socket: socket,
      servername: hostHeader ? hostHeader.replace(/:.*$/, '') : options.host
    });

    // 0 is dummy port for v0.6
    var secureSocket = tls.connect(0, tlsOptions);
    self.sockets[self.sockets.indexOf(socket)] = secureSocket;
    cb(secureSocket);
  });
}


function toOptions(host, port, localAddress) {
  if (typeof host === 'string') { // since v0.10
    return {
      host: host,
      port: port,
      localAddress: localAddress
    };
  }
  return host; // for v0.11 or later
}

function mergeOptions(target) {
  for (var i = 1, len = arguments.length; i < len; ++i) {
    var overrides = arguments[i];
    if (typeof overrides === 'object') {
      var keys = Object.keys(overrides);
      for (var j = 0, keyLen = keys.length; j < keyLen; ++j) {
        var k = keys[j];
        if (overrides[k] !== undefined) {
          target[k] = overrides[k];
        }
      }
    }
  }
  return target;
}


var debug;
if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
  debug = function() {
    var args = Array.prototype.slice.call(arguments);
    if (typeof args[0] === 'string') {
      args[0] = 'TUNNEL: ' + args[0];
    } else {
      args.unshift('TUNNEL:');
    }
    console.error.apply(console, args);
  }
} else {
  debug = function() {};
}
exports.debug = debug; // for test


/***/ }),

/***/ "./node_modules/typed-rest-client/HttpClient.js":
/*!******************************************************!*\
  !*** ./node_modules/typed-rest-client/HttpClient.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const url = __webpack_require__(/*! url */ "url");
const http = __webpack_require__(/*! http */ "http");
const https = __webpack_require__(/*! https */ "https");
let fs;
let tunnel;
var HttpCodes;
(function (HttpCodes) {
    HttpCodes[HttpCodes["OK"] = 200] = "OK";
    HttpCodes[HttpCodes["MultipleChoices"] = 300] = "MultipleChoices";
    HttpCodes[HttpCodes["MovedPermanently"] = 301] = "MovedPermanently";
    HttpCodes[HttpCodes["ResourceMoved"] = 302] = "ResourceMoved";
    HttpCodes[HttpCodes["SeeOther"] = 303] = "SeeOther";
    HttpCodes[HttpCodes["NotModified"] = 304] = "NotModified";
    HttpCodes[HttpCodes["UseProxy"] = 305] = "UseProxy";
    HttpCodes[HttpCodes["SwitchProxy"] = 306] = "SwitchProxy";
    HttpCodes[HttpCodes["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    HttpCodes[HttpCodes["PermanentRedirect"] = 308] = "PermanentRedirect";
    HttpCodes[HttpCodes["BadRequest"] = 400] = "BadRequest";
    HttpCodes[HttpCodes["Unauthorized"] = 401] = "Unauthorized";
    HttpCodes[HttpCodes["PaymentRequired"] = 402] = "PaymentRequired";
    HttpCodes[HttpCodes["Forbidden"] = 403] = "Forbidden";
    HttpCodes[HttpCodes["NotFound"] = 404] = "NotFound";
    HttpCodes[HttpCodes["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    HttpCodes[HttpCodes["NotAcceptable"] = 406] = "NotAcceptable";
    HttpCodes[HttpCodes["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
    HttpCodes[HttpCodes["RequestTimeout"] = 408] = "RequestTimeout";
    HttpCodes[HttpCodes["Conflict"] = 409] = "Conflict";
    HttpCodes[HttpCodes["Gone"] = 410] = "Gone";
    HttpCodes[HttpCodes["InternalServerError"] = 500] = "InternalServerError";
    HttpCodes[HttpCodes["NotImplemented"] = 501] = "NotImplemented";
    HttpCodes[HttpCodes["BadGateway"] = 502] = "BadGateway";
    HttpCodes[HttpCodes["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    HttpCodes[HttpCodes["GatewayTimeout"] = 504] = "GatewayTimeout";
})(HttpCodes = exports.HttpCodes || (exports.HttpCodes = {}));
const HttpRedirectCodes = [HttpCodes.MovedPermanently, HttpCodes.ResourceMoved, HttpCodes.SeeOther, HttpCodes.TemporaryRedirect, HttpCodes.PermanentRedirect];
const HttpResponseRetryCodes = [HttpCodes.BadGateway, HttpCodes.ServiceUnavailable, HttpCodes.GatewayTimeout];
const RetryableHttpVerbs = ['OPTIONS', 'GET', 'DELETE', 'HEAD'];
const ExponentialBackoffCeiling = 10;
const ExponentialBackoffTimeSlice = 5;
class HttpClientResponse {
    constructor(message) {
        this.message = message;
    }
    readBody() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let output = '';
            this.message.on('data', (chunk) => {
                output += chunk;
            });
            this.message.on('end', () => {
                resolve(output);
            });
        }));
    }
}
exports.HttpClientResponse = HttpClientResponse;
function isHttps(requestUrl) {
    let parsedUrl = url.parse(requestUrl);
    return parsedUrl.protocol === 'https:';
}
exports.isHttps = isHttps;
var EnvironmentVariables;
(function (EnvironmentVariables) {
    EnvironmentVariables["HTTP_PROXY"] = "HTTP_PROXY";
    EnvironmentVariables["HTTPS_PROXY"] = "HTTPS_PROXY";
})(EnvironmentVariables || (EnvironmentVariables = {}));
class HttpClient {
    constructor(userAgent, handlers, requestOptions) {
        this._ignoreSslError = false;
        this._allowRedirects = true;
        this._maxRedirects = 50;
        this._allowRetries = false;
        this._maxRetries = 1;
        this._keepAlive = false;
        this._disposed = false;
        this.userAgent = userAgent;
        this.handlers = handlers || [];
        this.requestOptions = requestOptions;
        if (requestOptions) {
            if (requestOptions.ignoreSslError != null) {
                this._ignoreSslError = requestOptions.ignoreSslError;
            }
            this._socketTimeout = requestOptions.socketTimeout;
            this._httpProxy = requestOptions.proxy;
            if (requestOptions.proxy && requestOptions.proxy.proxyBypassHosts) {
                this._httpProxyBypassHosts = [];
                requestOptions.proxy.proxyBypassHosts.forEach(bypass => {
                    this._httpProxyBypassHosts.push(new RegExp(bypass, 'i'));
                });
            }
            this._certConfig = requestOptions.cert;
            if (this._certConfig) {
                // If using cert, need fs
                fs = __webpack_require__(/*! fs */ "fs");
                // cache the cert content into memory, so we don't have to read it from disk every time 
                if (this._certConfig.caFile && fs.existsSync(this._certConfig.caFile)) {
                    this._ca = fs.readFileSync(this._certConfig.caFile, 'utf8');
                }
                if (this._certConfig.certFile && fs.existsSync(this._certConfig.certFile)) {
                    this._cert = fs.readFileSync(this._certConfig.certFile, 'utf8');
                }
                if (this._certConfig.keyFile && fs.existsSync(this._certConfig.keyFile)) {
                    this._key = fs.readFileSync(this._certConfig.keyFile, 'utf8');
                }
            }
            if (requestOptions.allowRedirects != null) {
                this._allowRedirects = requestOptions.allowRedirects;
            }
            if (requestOptions.maxRedirects != null) {
                this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
            }
            if (requestOptions.keepAlive != null) {
                this._keepAlive = requestOptions.keepAlive;
            }
            if (requestOptions.allowRetries != null) {
                this._allowRetries = requestOptions.allowRetries;
            }
            if (requestOptions.maxRetries != null) {
                this._maxRetries = requestOptions.maxRetries;
            }
        }
    }
    options(requestUrl, additionalHeaders) {
        return this.request('OPTIONS', requestUrl, null, additionalHeaders || {});
    }
    get(requestUrl, additionalHeaders) {
        return this.request('GET', requestUrl, null, additionalHeaders || {});
    }
    del(requestUrl, additionalHeaders) {
        return this.request('DELETE', requestUrl, null, additionalHeaders || {});
    }
    post(requestUrl, data, additionalHeaders) {
        return this.request('POST', requestUrl, data, additionalHeaders || {});
    }
    patch(requestUrl, data, additionalHeaders) {
        return this.request('PATCH', requestUrl, data, additionalHeaders || {});
    }
    put(requestUrl, data, additionalHeaders) {
        return this.request('PUT', requestUrl, data, additionalHeaders || {});
    }
    head(requestUrl, additionalHeaders) {
        return this.request('HEAD', requestUrl, null, additionalHeaders || {});
    }
    sendStream(verb, requestUrl, stream, additionalHeaders) {
        return this.request(verb, requestUrl, stream, additionalHeaders);
    }
    /**
     * Makes a raw http request.
     * All other methods such as get, post, patch, and request ultimately call this.
     * Prefer get, del, post and patch
     */
    request(verb, requestUrl, data, headers) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._disposed) {
                throw new Error("Client has already been disposed.");
            }
            let info = this._prepareRequest(verb, requestUrl, headers);
            // Only perform retries on reads since writes may not be idempotent.
            let maxTries = (this._allowRetries && RetryableHttpVerbs.indexOf(verb) != -1) ? this._maxRetries + 1 : 1;
            let numTries = 0;
            let response;
            while (numTries < maxTries) {
                response = yield this.requestRaw(info, data);
                // Check if it's an authentication challenge
                if (response && response.message && response.message.statusCode === HttpCodes.Unauthorized) {
                    let authenticationHandler;
                    for (let i = 0; i < this.handlers.length; i++) {
                        if (this.handlers[i].canHandleAuthentication(response)) {
                            authenticationHandler = this.handlers[i];
                            break;
                        }
                    }
                    if (authenticationHandler) {
                        return authenticationHandler.handleAuthentication(this, info, data);
                    }
                    else {
                        // We have received an unauthorized response but have no handlers to handle it.
                        // Let the response return to the caller.
                        return response;
                    }
                }
                let redirectsRemaining = this._maxRedirects;
                while (HttpRedirectCodes.indexOf(response.message.statusCode) != -1
                    && this._allowRedirects
                    && redirectsRemaining > 0) {
                    const redirectUrl = response.message.headers["location"];
                    if (!redirectUrl) {
                        // if there's no location to redirect to, we won't
                        break;
                    }
                    // we need to finish reading the response before reassigning response
                    // which will leak the open socket.
                    yield response.readBody();
                    // let's make the request with the new redirectUrl
                    info = this._prepareRequest(verb, redirectUrl, headers);
                    response = yield this.requestRaw(info, data);
                    redirectsRemaining--;
                }
                if (HttpResponseRetryCodes.indexOf(response.message.statusCode) == -1) {
                    // If not a retry code, return immediately instead of retrying
                    return response;
                }
                numTries += 1;
                if (numTries < maxTries) {
                    yield response.readBody();
                    yield this._performExponentialBackoff(numTries);
                }
            }
            return response;
        });
    }
    /**
     * Needs to be called if keepAlive is set to true in request options.
     */
    dispose() {
        if (this._agent) {
            this._agent.destroy();
        }
        this._disposed = true;
    }
    /**
     * Raw request.
     * @param info
     * @param data
     */
    requestRaw(info, data) {
        return new Promise((resolve, reject) => {
            let callbackForResult = function (err, res) {
                if (err) {
                    reject(err);
                }
                resolve(res);
            };
            this.requestRawWithCallback(info, data, callbackForResult);
        });
    }
    /**
     * Raw request with callback.
     * @param info
     * @param data
     * @param onResult
     */
    requestRawWithCallback(info, data, onResult) {
        let socket;
        let isDataString = typeof (data) === 'string';
        if (typeof (data) === 'string') {
            info.options.headers["Content-Length"] = Buffer.byteLength(data, 'utf8');
        }
        let callbackCalled = false;
        let handleResult = (err, res) => {
            if (!callbackCalled) {
                callbackCalled = true;
                onResult(err, res);
            }
        };
        let req = info.httpModule.request(info.options, (msg) => {
            let res = new HttpClientResponse(msg);
            handleResult(null, res);
        });
        req.on('socket', (sock) => {
            socket = sock;
        });
        // If we ever get disconnected, we want the socket to timeout eventually
        req.setTimeout(this._socketTimeout || 3 * 60000, () => {
            if (socket) {
                socket.end();
            }
            handleResult(new Error('Request timeout: ' + info.options.path), null);
        });
        req.on('error', function (err) {
            // err has statusCode property
            // res should have headers
            handleResult(err, null);
        });
        if (data && typeof (data) === 'string') {
            req.write(data, 'utf8');
        }
        if (data && typeof (data) !== 'string') {
            data.on('close', function () {
                req.end();
            });
            data.pipe(req);
        }
        else {
            req.end();
        }
    }
    _prepareRequest(method, requestUrl, headers) {
        const info = {};
        info.parsedUrl = url.parse(requestUrl);
        const usingSsl = info.parsedUrl.protocol === 'https:';
        info.httpModule = usingSsl ? https : http;
        const defaultPort = usingSsl ? 443 : 80;
        info.options = {};
        info.options.host = info.parsedUrl.hostname;
        info.options.port = info.parsedUrl.port ? parseInt(info.parsedUrl.port) : defaultPort;
        info.options.path = (info.parsedUrl.pathname || '') + (info.parsedUrl.search || '');
        info.options.method = method;
        info.options.headers = this._mergeHeaders(headers);
        info.options.headers["user-agent"] = this.userAgent;
        info.options.agent = this._getAgent(requestUrl);
        // gives handlers an opportunity to participate
        if (this.handlers && !this._isPresigned(requestUrl)) {
            this.handlers.forEach((handler) => {
                handler.prepareRequest(info.options);
            });
        }
        return info;
    }
    _isPresigned(requestUrl) {
        if (this.requestOptions && this.requestOptions.presignedUrlPatterns) {
            const patterns = this.requestOptions.presignedUrlPatterns;
            for (let i = 0; i < patterns.length; i++) {
                if (requestUrl.match(patterns[i])) {
                    return true;
                }
            }
        }
        return false;
    }
    _mergeHeaders(headers) {
        const lowercaseKeys = obj => Object.keys(obj).reduce((c, k) => (c[k.toLowerCase()] = obj[k], c), {});
        if (this.requestOptions && this.requestOptions.headers) {
            return Object.assign({}, lowercaseKeys(this.requestOptions.headers), lowercaseKeys(headers));
        }
        return lowercaseKeys(headers || {});
    }
    _getAgent(requestUrl) {
        let agent;
        let proxy = this._getProxy(requestUrl);
        let useProxy = proxy.proxyUrl && proxy.proxyUrl.hostname && !this._isBypassProxy(requestUrl);
        if (this._keepAlive && useProxy) {
            agent = this._proxyAgent;
        }
        if (this._keepAlive && !useProxy) {
            agent = this._agent;
        }
        // if agent is already assigned use that agent.
        if (!!agent) {
            return agent;
        }
        let parsedUrl = url.parse(requestUrl);
        const usingSsl = parsedUrl.protocol === 'https:';
        let maxSockets = 100;
        if (!!this.requestOptions) {
            maxSockets = this.requestOptions.maxSockets || http.globalAgent.maxSockets;
        }
        if (useProxy) {
            // If using proxy, need tunnel
            if (!tunnel) {
                tunnel = __webpack_require__(/*! tunnel */ "./node_modules/tunnel/index.js");
            }
            const agentOptions = {
                maxSockets: maxSockets,
                keepAlive: this._keepAlive,
                proxy: {
                    proxyAuth: proxy.proxyAuth,
                    host: proxy.proxyUrl.hostname,
                    port: proxy.proxyUrl.port
                },
            };
            let tunnelAgent;
            const overHttps = proxy.proxyUrl.protocol === 'https:';
            if (usingSsl) {
                tunnelAgent = overHttps ? tunnel.httpsOverHttps : tunnel.httpsOverHttp;
            }
            else {
                tunnelAgent = overHttps ? tunnel.httpOverHttps : tunnel.httpOverHttp;
            }
            agent = tunnelAgent(agentOptions);
            this._proxyAgent = agent;
        }
        // if reusing agent across request and tunneling agent isn't assigned create a new agent
        if (this._keepAlive && !agent) {
            const options = { keepAlive: this._keepAlive, maxSockets: maxSockets };
            agent = usingSsl ? new https.Agent(options) : new http.Agent(options);
            this._agent = agent;
        }
        // if not using private agent and tunnel agent isn't setup then use global agent
        if (!agent) {
            agent = usingSsl ? https.globalAgent : http.globalAgent;
        }
        if (usingSsl && this._ignoreSslError) {
            // we don't want to set NODE_TLS_REJECT_UNAUTHORIZED=0 since that will affect request for entire process
            // http.RequestOptions doesn't expose a way to modify RequestOptions.agent.options
            // we have to cast it to any and change it directly
            agent.options = Object.assign(agent.options || {}, { rejectUnauthorized: false });
        }
        if (usingSsl && this._certConfig) {
            agent.options = Object.assign(agent.options || {}, { ca: this._ca, cert: this._cert, key: this._key, passphrase: this._certConfig.passphrase });
        }
        return agent;
    }
    _getProxy(requestUrl) {
        const parsedUrl = url.parse(requestUrl);
        let usingSsl = parsedUrl.protocol === 'https:';
        let proxyConfig = this._httpProxy;
        // fallback to http_proxy and https_proxy env
        let https_proxy = process.env[EnvironmentVariables.HTTPS_PROXY];
        let http_proxy = process.env[EnvironmentVariables.HTTP_PROXY];
        if (!proxyConfig) {
            if (https_proxy && usingSsl) {
                proxyConfig = {
                    proxyUrl: https_proxy
                };
            }
            else if (http_proxy) {
                proxyConfig = {
                    proxyUrl: http_proxy
                };
            }
        }
        let proxyUrl;
        let proxyAuth;
        if (proxyConfig) {
            if (proxyConfig.proxyUrl.length > 0) {
                proxyUrl = url.parse(proxyConfig.proxyUrl);
            }
            if (proxyConfig.proxyUsername || proxyConfig.proxyPassword) {
                proxyAuth = proxyConfig.proxyUsername + ":" + proxyConfig.proxyPassword;
            }
        }
        return { proxyUrl: proxyUrl, proxyAuth: proxyAuth };
    }
    _isBypassProxy(requestUrl) {
        if (!this._httpProxyBypassHosts) {
            return false;
        }
        let bypass = false;
        this._httpProxyBypassHosts.forEach(bypassHost => {
            if (bypassHost.test(requestUrl)) {
                bypass = true;
            }
        });
        return bypass;
    }
    _performExponentialBackoff(retryNumber) {
        retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber);
        const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
        return new Promise(resolve => setTimeout(() => resolve(), ms));
    }
}
exports.HttpClient = HttpClient;


/***/ }),

/***/ "./node_modules/uuid/lib/bytesToUuid.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/bytesToUuid.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return ([bth[buf[i++]], bth[buf[i++]], 
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]], '-',
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]],
	bth[buf[i++]], bth[buf[i++]]]).join('');
}

module.exports = bytesToUuid;


/***/ }),

/***/ "./node_modules/uuid/lib/rng.js":
/*!**************************************!*\
  !*** ./node_modules/uuid/lib/rng.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Unique ID creation requires a high quality random # generator.  In node.js
// this is pretty straight-forward - we use the crypto API.

var crypto = __webpack_require__(/*! crypto */ "crypto");

module.exports = function nodeRNG() {
  return crypto.randomBytes(16);
};


/***/ }),

/***/ "./node_modules/uuid/v4.js":
/*!*********************************!*\
  !*** ./node_modules/uuid/v4.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(/*! ./lib/rng */ "./node_modules/uuid/lib/rng.js");
var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ "./node_modules/uuid/lib/bytesToUuid.js");

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ }),

/***/ "./src/authenticate.ts":
/*!*****************************!*\
  !*** ./src/authenticate.ts ***!
  \*****************************/
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
const path_1 = __webpack_require__(/*! path */ "path");
const fs_1 = __webpack_require__(/*! fs */ "fs");
const core = __importStar(__webpack_require__(/*! @actions/core */ "./node_modules/@actions/core/lib/core.js"));
const exec = __importStar(__webpack_require__(/*! @actions/exec */ "./node_modules/@actions/exec/lib/exec.js"));
function authenticate() {
    return __awaiter(this, void 0, void 0, function* () {
        const serviceAccountKeyBase64 = core.getInput('service-account-key');
        const serviceAccountKeyJson = Buffer.from(serviceAccountKeyBase64, 'base64');
        const serviceAccountKeyPath = path_1.resolve(process.cwd(), 'gcloud.json');
        fs_1.writeFileSync(serviceAccountKeyPath, serviceAccountKeyJson);
        yield exec.exec('gcloud', [
            'auth',
            'activate-service-account',
            `--key-file=${serviceAccountKeyPath}`
        ]);
        fs_1.unlinkSync(serviceAccountKeyPath);
    });
}
exports.authenticate = authenticate;


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
const tc = __importStar(__webpack_require__(/*! @actions/tool-cache */ "./node_modules/@actions/tool-cache/lib/tool-cache.js"));
const utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
const fs_1 = __webpack_require__(/*! fs */ "fs");
const path_1 = __webpack_require__(/*! path */ "path");
function download() {
    return __awaiter(this, void 0, void 0, function* () {
        const downloadLink = utils_1.getDownloadLink();
        const downloadPath = yield tc.downloadTool(downloadLink);
        const extractionPath = path_1.resolve(utils_1.getCloudSDKFolder(), '..');
        fs_1.mkdirSync(utils_1.getCloudSDKFolder());
        if (downloadLink.endsWith('.zip')) {
            yield tc.extractZip(downloadPath, extractionPath);
        }
        else if (downloadLink.endsWith('.tar.gz')) {
            yield tc.extractTar(downloadPath, extractionPath);
        }
    });
}
exports.download = download;


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
const core = __importStar(__webpack_require__(/*! @actions/core */ "./node_modules/@actions/core/lib/core.js"));
const download_1 = __webpack_require__(/*! ./download */ "./src/download.ts");
const setup_1 = __webpack_require__(/*! ./setup */ "./src/setup.ts");
const authenticate_1 = __webpack_require__(/*! ./authenticate */ "./src/authenticate.ts");
function install() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield download_1.download();
            yield setup_1.setup();
            yield authenticate_1.authenticate();
        }
        catch (e) {
            core.error(e.message);
            process.exit(1);
        }
    });
}
exports.install = install;
install().then();


/***/ }),

/***/ "./src/setup.ts":
/*!**********************!*\
  !*** ./src/setup.ts ***!
  \**********************/
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
const utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
const path_1 = __webpack_require__(/*! path */ "path");
const core = __importStar(__webpack_require__(/*! @actions/core */ "./node_modules/@actions/core/lib/core.js"));
const exec = __importStar(__webpack_require__(/*! @actions/exec */ "./node_modules/@actions/exec/lib/exec.js"));
const child_process_1 = __webpack_require__(/*! child_process */ "child_process");
const fs_1 = __webpack_require__(/*! fs */ "fs");
function setup() {
    return __awaiter(this, void 0, void 0, function* () {
        const installScriptExtension = utils_1.isWindows() ? 'bat' : 'sh';
        const installScript = path_1.resolve(utils_1.getCloudSDKFolder(), `install.${installScriptExtension}`);
        const args = [
            '--usage-reporting=false',
            '--command-completion=false',
            '--path-update=true',
            '--usage-reporting=false',
            // '--additional-components',
            '--quiet'
        ];
        if (utils_1.isWindows()) {
            // @actions/exec does not exit on windows
            child_process_1.execSync(`"${installScript}" ${args.join(' ')}`, { stdio: 'inherit' });
            const ls = fs_1.readdirSync(path_1.resolve(utils_1.getCloudSDKFolder(), 'bin'));
            core.info(ls.join('\n'));
        }
        else {
            yield exec.exec(installScript, args);
        }
        const binPath = path_1.resolve(utils_1.getCloudSDKFolder(), 'bin');
        core.addPath(binPath);
    });
}
exports.setup = setup;


/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __webpack_require__(/*! path */ "path");
const core = __importStar(__webpack_require__(/*! @actions/core */ "./node_modules/@actions/core/lib/core.js"));
function isWindows() {
    return process.platform === 'win32';
}
exports.isWindows = isWindows;
function isMacOS() {
    return process.platform === 'darwin';
}
exports.isMacOS = isMacOS;
function isUbuntu() {
    return process.platform === 'linux';
}
exports.isUbuntu = isUbuntu;
function getCloudSDKFolder() {
    if (isWindows()) {
        return 'C:\\Program Files\\google-cloud-sdk';
    }
    else if (isUbuntu()) {
        return '/home/runner/google-cloud-sdk';
    }
    else {
        const home = process.env.HOME ? process.env.HOME : process.cwd();
        return path_1.resolve(home, 'google-cloud-sdk');
    }
}
exports.getCloudSDKFolder = getCloudSDKFolder;
function getDownloadLink() {
    const baseUrl = 'https://dl.google.com/dl/cloudsdk/channels/rapid';
    const version = core.getInput('version');
    if (version === 'latest') {
        if (isWindows()) {
            return `${baseUrl}/google-cloud-sdk.zip`;
        }
        else {
            return `${baseUrl}/google-cloud-sdk.tar.gz`;
        }
    }
    if (isWindows()) {
        return `${baseUrl}/downloads/google-cloud-sdk-${version}-windows-x86_64.zip`;
    }
    else if (isMacOS()) {
        return `${baseUrl}/downloads/google-cloud-sdk-${version}-darwin-x86_64.tar.gz`;
    }
    else {
        return `${baseUrl}/downloads/google-cloud-sdk-${version}-linux-x86_64.tar.gz`;
    }
}
exports.getDownloadLink = getDownloadLink;


/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("assert");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("crypto");

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

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("net");

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

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("tls");

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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhY3Rpb25zL2NvcmUvbGliL2NvbW1hbmQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhY3Rpb25zL2NvcmUvbGliL2NvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhY3Rpb25zL2V4ZWMvbGliL2V4ZWMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhY3Rpb25zL2V4ZWMvbGliL3Rvb2xydW5uZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhY3Rpb25zL2lvL2xpYi9pby11dGlsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYWN0aW9ucy9pby9saWIvaW8uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhY3Rpb25zL3Rvb2wtY2FjaGUvbGliL3Rvb2wtY2FjaGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NlbXZlci9zZW12ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3R1bm5lbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdHVubmVsL2xpYi90dW5uZWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3R5cGVkLXJlc3QtY2xpZW50L0h0dHBDbGllbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3V1aWQvbGliL2J5dGVzVG9VdWlkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91dWlkL2xpYi9ybmcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3V1aWQvdjQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2F1dGhlbnRpY2F0ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZG93bmxvYWQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luc3RhbGwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NldHVwLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJhc3NlcnRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjaGlsZF9wcm9jZXNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY3J5cHRvXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXZlbnRzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZnNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJodHRwXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaHR0cHNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJuZXRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJvc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInBhdGhcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bHNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ1cmxcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ1dGlsXCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNB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O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixvQ0FBb0M7QUFDeEQsMEJBQTBCLG9DQUFvQztBQUM5RCwwQkFBMEIsb0NBQW9DO0FBQzlEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixXQUFXO0FBQ1g7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixxQkFBcUI7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLGdCQUFnQjtBQUNqQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGdCQUFnQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQixzQkFBc0I7QUFDdkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsaUJBQWlCLHNCQUFzQjtBQUN2Qzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMzakRBLGlCQUFpQixtQkFBTyxDQUFDLHlEQUFjOzs7Ozs7Ozs7Ozs7O0FDQTFCOztBQUViLFVBQVUsbUJBQU8sQ0FBQyxnQkFBSztBQUN2QixVQUFVLG1CQUFPLENBQUMsZ0JBQUs7QUFDdkIsV0FBVyxtQkFBTyxDQUFDLGtCQUFNO0FBQ3pCLFlBQVksbUJBQU8sQ0FBQyxvQkFBTztBQUMzQixhQUFhLG1CQUFPLENBQUMsc0JBQVE7QUFDN0IsYUFBYSxtQkFBTyxDQUFDLHNCQUFRO0FBQzdCLFdBQVcsbUJBQU8sQ0FBQyxrQkFBTTs7O0FBR3pCO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLCtDQUErQyxTQUFTO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsOEJBQThCLGFBQWE7O0FBRTNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpREFBaUQ7QUFDakQsMENBQTBDO0FBQzFDLHdDQUF3QztBQUN4Qyx3Q0FBd0M7QUFDeEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7QUFHQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7O0FBRUE7QUFDQSx5Q0FBeUMsU0FBUztBQUNsRDtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsWUFBWTtBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0Esc0JBQXNCOzs7Ozs7Ozs7Ozs7O0FDdFBUO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsTUFBTSw2QkFBNkIsRUFBRSxZQUFZLFdBQVcsRUFBRTtBQUNqRyxrQ0FBa0MsTUFBTSxpQ0FBaUMsRUFBRSxZQUFZLFdBQVcsRUFBRTtBQUNwRywrQkFBK0IsaUVBQWlFLHVCQUF1QixFQUFFLDRCQUE0QjtBQUNySjtBQUNBLEtBQUs7QUFDTDtBQUNBLDhDQUE4QyxjQUFjO0FBQzVELFlBQVksbUJBQU8sQ0FBQyxnQkFBSztBQUN6QixhQUFhLG1CQUFPLENBQUMsa0JBQU07QUFDM0IsY0FBYyxtQkFBTyxDQUFDLG9CQUFPO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsMERBQTBEO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxvREFBb0Q7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsbUJBQU8sQ0FBQyxjQUFJO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnRkFBZ0Y7QUFDaEY7QUFDQTtBQUNBLDRFQUE0RTtBQUM1RTtBQUNBO0FBQ0EsK0VBQStFO0FBQy9FO0FBQ0E7QUFDQSw2RUFBNkU7QUFDN0U7QUFDQTtBQUNBLDhFQUE4RTtBQUM5RTtBQUNBO0FBQ0EsNEVBQTRFO0FBQzVFO0FBQ0E7QUFDQSw2RUFBNkU7QUFDN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLDBCQUEwQjtBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUFrQixRQUFRLDhCQUE4QixRQUFRO0FBQ2hFO0FBQ0E7QUFDQSxrQkFBa0IsUUFBUSw4QkFBOEIsUUFBUTtBQUNoRTtBQUNBO0FBQ0Esa0JBQWtCLFFBQVEsOEJBQThCLFFBQVE7QUFDaEU7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN6REEsbUM7Ozs7Ozs7Ozs7O0FDQUEsMEM7Ozs7Ozs7Ozs7O0FDQUEsbUM7Ozs7Ozs7Ozs7O0FDQUEsbUM7Ozs7Ozs7Ozs7O0FDQUEsK0I7Ozs7Ozs7Ozs7O0FDQUEsaUM7Ozs7Ozs7Ozs7O0FDQUEsa0M7Ozs7Ozs7Ozs7O0FDQUEsZ0M7Ozs7Ozs7Ozs7O0FDQUEsK0I7Ozs7Ozs7Ozs7O0FDQUEsaUM7Ozs7Ozs7Ozs7O0FDQUEsZ0M7Ozs7Ozs7Ozs7O0FDQUEsZ0M7Ozs7Ozs7Ozs7O0FDQUEsaUMiLCJmaWxlIjoiaW5zdGFsbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luc3RhbGwudHNcIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IG9zID0gcmVxdWlyZShcIm9zXCIpO1xuLyoqXG4gKiBDb21tYW5kc1xuICpcbiAqIENvbW1hbmQgRm9ybWF0OlxuICogICAjI1tuYW1lIGtleT12YWx1ZTtrZXk9dmFsdWVdbWVzc2FnZVxuICpcbiAqIEV4YW1wbGVzOlxuICogICAjI1t3YXJuaW5nXVRoaXMgaXMgdGhlIHVzZXIgd2FybmluZyBtZXNzYWdlXG4gKiAgICMjW3NldC1zZWNyZXQgbmFtZT1teXBhc3N3b3JkXWRlZmluaXRlbHlOb3RBUGFzc3dvcmQhXG4gKi9cbmZ1bmN0aW9uIGlzc3VlQ29tbWFuZChjb21tYW5kLCBwcm9wZXJ0aWVzLCBtZXNzYWdlKSB7XG4gICAgY29uc3QgY21kID0gbmV3IENvbW1hbmQoY29tbWFuZCwgcHJvcGVydGllcywgbWVzc2FnZSk7XG4gICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoY21kLnRvU3RyaW5nKCkgKyBvcy5FT0wpO1xufVxuZXhwb3J0cy5pc3N1ZUNvbW1hbmQgPSBpc3N1ZUNvbW1hbmQ7XG5mdW5jdGlvbiBpc3N1ZShuYW1lLCBtZXNzYWdlID0gJycpIHtcbiAgICBpc3N1ZUNvbW1hbmQobmFtZSwge30sIG1lc3NhZ2UpO1xufVxuZXhwb3J0cy5pc3N1ZSA9IGlzc3VlO1xuY29uc3QgQ01EX1NUUklORyA9ICc6Oic7XG5jbGFzcyBDb21tYW5kIHtcbiAgICBjb25zdHJ1Y3Rvcihjb21tYW5kLCBwcm9wZXJ0aWVzLCBtZXNzYWdlKSB7XG4gICAgICAgIGlmICghY29tbWFuZCkge1xuICAgICAgICAgICAgY29tbWFuZCA9ICdtaXNzaW5nLmNvbW1hbmQnO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29tbWFuZCA9IGNvbW1hbmQ7XG4gICAgICAgIHRoaXMucHJvcGVydGllcyA9IHByb3BlcnRpZXM7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgfVxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICBsZXQgY21kU3RyID0gQ01EX1NUUklORyArIHRoaXMuY29tbWFuZDtcbiAgICAgICAgaWYgKHRoaXMucHJvcGVydGllcyAmJiBPYmplY3Qua2V5cyh0aGlzLnByb3BlcnRpZXMpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNtZFN0ciArPSAnICc7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLnByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsID0gdGhpcy5wcm9wZXJ0aWVzW2tleV07XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNhZmVseSBhcHBlbmQgdGhlIHZhbCAtIGF2b2lkIGJsb3dpbmcgdXAgd2hlbiBhdHRlbXB0aW5nIHRvXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjYWxsIC5yZXBsYWNlKCkgaWYgbWVzc2FnZSBpcyBub3QgYSBzdHJpbmcgZm9yIHNvbWUgcmVhc29uXG4gICAgICAgICAgICAgICAgICAgICAgICBjbWRTdHIgKz0gYCR7a2V5fT0ke2VzY2FwZShgJHt2YWwgfHwgJyd9YCl9LGA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY21kU3RyICs9IENNRF9TVFJJTkc7XG4gICAgICAgIC8vIHNhZmVseSBhcHBlbmQgdGhlIG1lc3NhZ2UgLSBhdm9pZCBibG93aW5nIHVwIHdoZW4gYXR0ZW1wdGluZyB0b1xuICAgICAgICAvLyBjYWxsIC5yZXBsYWNlKCkgaWYgbWVzc2FnZSBpcyBub3QgYSBzdHJpbmcgZm9yIHNvbWUgcmVhc29uXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBgJHt0aGlzLm1lc3NhZ2UgfHwgJyd9YDtcbiAgICAgICAgY21kU3RyICs9IGVzY2FwZURhdGEobWVzc2FnZSk7XG4gICAgICAgIHJldHVybiBjbWRTdHI7XG4gICAgfVxufVxuZnVuY3Rpb24gZXNjYXBlRGF0YShzKSB7XG4gICAgcmV0dXJuIHMucmVwbGFjZSgvXFxyL2csICclMEQnKS5yZXBsYWNlKC9cXG4vZywgJyUwQScpO1xufVxuZnVuY3Rpb24gZXNjYXBlKHMpIHtcbiAgICByZXR1cm4gc1xuICAgICAgICAucmVwbGFjZSgvXFxyL2csICclMEQnKVxuICAgICAgICAucmVwbGFjZSgvXFxuL2csICclMEEnKVxuICAgICAgICAucmVwbGFjZSgvXS9nLCAnJTVEJylcbiAgICAgICAgLnJlcGxhY2UoLzsvZywgJyUzQicpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29tbWFuZC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY29tbWFuZF8xID0gcmVxdWlyZShcIi4vY29tbWFuZFwiKTtcbmNvbnN0IG9zID0gcmVxdWlyZShcIm9zXCIpO1xuY29uc3QgcGF0aCA9IHJlcXVpcmUoXCJwYXRoXCIpO1xuLyoqXG4gKiBUaGUgY29kZSB0byBleGl0IGFuIGFjdGlvblxuICovXG52YXIgRXhpdENvZGU7XG4oZnVuY3Rpb24gKEV4aXRDb2RlKSB7XG4gICAgLyoqXG4gICAgICogQSBjb2RlIGluZGljYXRpbmcgdGhhdCB0aGUgYWN0aW9uIHdhcyBzdWNjZXNzZnVsXG4gICAgICovXG4gICAgRXhpdENvZGVbRXhpdENvZGVbXCJTdWNjZXNzXCJdID0gMF0gPSBcIlN1Y2Nlc3NcIjtcbiAgICAvKipcbiAgICAgKiBBIGNvZGUgaW5kaWNhdGluZyB0aGF0IHRoZSBhY3Rpb24gd2FzIGEgZmFpbHVyZVxuICAgICAqL1xuICAgIEV4aXRDb2RlW0V4aXRDb2RlW1wiRmFpbHVyZVwiXSA9IDFdID0gXCJGYWlsdXJlXCI7XG59KShFeGl0Q29kZSA9IGV4cG9ydHMuRXhpdENvZGUgfHwgKGV4cG9ydHMuRXhpdENvZGUgPSB7fSkpO1xuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gVmFyaWFibGVzXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vKipcbiAqIFNldHMgZW52IHZhcmlhYmxlIGZvciB0aGlzIGFjdGlvbiBhbmQgZnV0dXJlIGFjdGlvbnMgaW4gdGhlIGpvYlxuICogQHBhcmFtIG5hbWUgdGhlIG5hbWUgb2YgdGhlIHZhcmlhYmxlIHRvIHNldFxuICogQHBhcmFtIHZhbCB0aGUgdmFsdWUgb2YgdGhlIHZhcmlhYmxlXG4gKi9cbmZ1bmN0aW9uIGV4cG9ydFZhcmlhYmxlKG5hbWUsIHZhbCkge1xuICAgIHByb2Nlc3MuZW52W25hbWVdID0gdmFsO1xuICAgIGNvbW1hbmRfMS5pc3N1ZUNvbW1hbmQoJ3NldC1lbnYnLCB7IG5hbWUgfSwgdmFsKTtcbn1cbmV4cG9ydHMuZXhwb3J0VmFyaWFibGUgPSBleHBvcnRWYXJpYWJsZTtcbi8qKlxuICogUmVnaXN0ZXJzIGEgc2VjcmV0IHdoaWNoIHdpbGwgZ2V0IG1hc2tlZCBmcm9tIGxvZ3NcbiAqIEBwYXJhbSBzZWNyZXQgdmFsdWUgb2YgdGhlIHNlY3JldFxuICovXG5mdW5jdGlvbiBzZXRTZWNyZXQoc2VjcmV0KSB7XG4gICAgY29tbWFuZF8xLmlzc3VlQ29tbWFuZCgnYWRkLW1hc2snLCB7fSwgc2VjcmV0KTtcbn1cbmV4cG9ydHMuc2V0U2VjcmV0ID0gc2V0U2VjcmV0O1xuLyoqXG4gKiBQcmVwZW5kcyBpbnB1dFBhdGggdG8gdGhlIFBBVEggKGZvciB0aGlzIGFjdGlvbiBhbmQgZnV0dXJlIGFjdGlvbnMpXG4gKiBAcGFyYW0gaW5wdXRQYXRoXG4gKi9cbmZ1bmN0aW9uIGFkZFBhdGgoaW5wdXRQYXRoKSB7XG4gICAgY29tbWFuZF8xLmlzc3VlQ29tbWFuZCgnYWRkLXBhdGgnLCB7fSwgaW5wdXRQYXRoKTtcbiAgICBwcm9jZXNzLmVudlsnUEFUSCddID0gYCR7aW5wdXRQYXRofSR7cGF0aC5kZWxpbWl0ZXJ9JHtwcm9jZXNzLmVudlsnUEFUSCddfWA7XG59XG5leHBvcnRzLmFkZFBhdGggPSBhZGRQYXRoO1xuLyoqXG4gKiBHZXRzIHRoZSB2YWx1ZSBvZiBhbiBpbnB1dC4gIFRoZSB2YWx1ZSBpcyBhbHNvIHRyaW1tZWQuXG4gKlxuICogQHBhcmFtICAgICBuYW1lICAgICBuYW1lIG9mIHRoZSBpbnB1dCB0byBnZXRcbiAqIEBwYXJhbSAgICAgb3B0aW9ucyAgb3B0aW9uYWwuIFNlZSBJbnB1dE9wdGlvbnMuXG4gKiBAcmV0dXJucyAgIHN0cmluZ1xuICovXG5mdW5jdGlvbiBnZXRJbnB1dChuYW1lLCBvcHRpb25zKSB7XG4gICAgY29uc3QgdmFsID0gcHJvY2Vzcy5lbnZbYElOUFVUXyR7bmFtZS5yZXBsYWNlKC8gL2csICdfJykudG9VcHBlckNhc2UoKX1gXSB8fCAnJztcbiAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnJlcXVpcmVkICYmICF2YWwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnB1dCByZXF1aXJlZCBhbmQgbm90IHN1cHBsaWVkOiAke25hbWV9YCk7XG4gICAgfVxuICAgIHJldHVybiB2YWwudHJpbSgpO1xufVxuZXhwb3J0cy5nZXRJbnB1dCA9IGdldElucHV0O1xuLyoqXG4gKiBTZXRzIHRoZSB2YWx1ZSBvZiBhbiBvdXRwdXQuXG4gKlxuICogQHBhcmFtICAgICBuYW1lICAgICBuYW1lIG9mIHRoZSBvdXRwdXQgdG8gc2V0XG4gKiBAcGFyYW0gICAgIHZhbHVlICAgIHZhbHVlIHRvIHN0b3JlXG4gKi9cbmZ1bmN0aW9uIHNldE91dHB1dChuYW1lLCB2YWx1ZSkge1xuICAgIGNvbW1hbmRfMS5pc3N1ZUNvbW1hbmQoJ3NldC1vdXRwdXQnLCB7IG5hbWUgfSwgdmFsdWUpO1xufVxuZXhwb3J0cy5zZXRPdXRwdXQgPSBzZXRPdXRwdXQ7XG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBSZXN1bHRzXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vKipcbiAqIFNldHMgdGhlIGFjdGlvbiBzdGF0dXMgdG8gZmFpbGVkLlxuICogV2hlbiB0aGUgYWN0aW9uIGV4aXRzIGl0IHdpbGwgYmUgd2l0aCBhbiBleGl0IGNvZGUgb2YgMVxuICogQHBhcmFtIG1lc3NhZ2UgYWRkIGVycm9yIGlzc3VlIG1lc3NhZ2VcbiAqL1xuZnVuY3Rpb24gc2V0RmFpbGVkKG1lc3NhZ2UpIHtcbiAgICBwcm9jZXNzLmV4aXRDb2RlID0gRXhpdENvZGUuRmFpbHVyZTtcbiAgICBlcnJvcihtZXNzYWdlKTtcbn1cbmV4cG9ydHMuc2V0RmFpbGVkID0gc2V0RmFpbGVkO1xuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gTG9nZ2luZyBDb21tYW5kc1xuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLyoqXG4gKiBXcml0ZXMgZGVidWcgbWVzc2FnZSB0byB1c2VyIGxvZ1xuICogQHBhcmFtIG1lc3NhZ2UgZGVidWcgbWVzc2FnZVxuICovXG5mdW5jdGlvbiBkZWJ1ZyhtZXNzYWdlKSB7XG4gICAgY29tbWFuZF8xLmlzc3VlQ29tbWFuZCgnZGVidWcnLCB7fSwgbWVzc2FnZSk7XG59XG5leHBvcnRzLmRlYnVnID0gZGVidWc7XG4vKipcbiAqIEFkZHMgYW4gZXJyb3IgaXNzdWVcbiAqIEBwYXJhbSBtZXNzYWdlIGVycm9yIGlzc3VlIG1lc3NhZ2VcbiAqL1xuZnVuY3Rpb24gZXJyb3IobWVzc2FnZSkge1xuICAgIGNvbW1hbmRfMS5pc3N1ZSgnZXJyb3InLCBtZXNzYWdlKTtcbn1cbmV4cG9ydHMuZXJyb3IgPSBlcnJvcjtcbi8qKlxuICogQWRkcyBhbiB3YXJuaW5nIGlzc3VlXG4gKiBAcGFyYW0gbWVzc2FnZSB3YXJuaW5nIGlzc3VlIG1lc3NhZ2VcbiAqL1xuZnVuY3Rpb24gd2FybmluZyhtZXNzYWdlKSB7XG4gICAgY29tbWFuZF8xLmlzc3VlKCd3YXJuaW5nJywgbWVzc2FnZSk7XG59XG5leHBvcnRzLndhcm5pbmcgPSB3YXJuaW5nO1xuLyoqXG4gKiBXcml0ZXMgaW5mbyB0byBsb2cgd2l0aCBjb25zb2xlLmxvZy5cbiAqIEBwYXJhbSBtZXNzYWdlIGluZm8gbWVzc2FnZVxuICovXG5mdW5jdGlvbiBpbmZvKG1lc3NhZ2UpIHtcbiAgICBwcm9jZXNzLnN0ZG91dC53cml0ZShtZXNzYWdlICsgb3MuRU9MKTtcbn1cbmV4cG9ydHMuaW5mbyA9IGluZm87XG4vKipcbiAqIEJlZ2luIGFuIG91dHB1dCBncm91cC5cbiAqXG4gKiBPdXRwdXQgdW50aWwgdGhlIG5leHQgYGdyb3VwRW5kYCB3aWxsIGJlIGZvbGRhYmxlIGluIHRoaXMgZ3JvdXBcbiAqXG4gKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgb3V0cHV0IGdyb3VwXG4gKi9cbmZ1bmN0aW9uIHN0YXJ0R3JvdXAobmFtZSkge1xuICAgIGNvbW1hbmRfMS5pc3N1ZSgnZ3JvdXAnLCBuYW1lKTtcbn1cbmV4cG9ydHMuc3RhcnRHcm91cCA9IHN0YXJ0R3JvdXA7XG4vKipcbiAqIEVuZCBhbiBvdXRwdXQgZ3JvdXAuXG4gKi9cbmZ1bmN0aW9uIGVuZEdyb3VwKCkge1xuICAgIGNvbW1hbmRfMS5pc3N1ZSgnZW5kZ3JvdXAnKTtcbn1cbmV4cG9ydHMuZW5kR3JvdXAgPSBlbmRHcm91cDtcbi8qKlxuICogV3JhcCBhbiBhc3luY2hyb25vdXMgZnVuY3Rpb24gY2FsbCBpbiBhIGdyb3VwLlxuICpcbiAqIFJldHVybnMgdGhlIHNhbWUgdHlwZSBhcyB0aGUgZnVuY3Rpb24gaXRzZWxmLlxuICpcbiAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBncm91cFxuICogQHBhcmFtIGZuIFRoZSBmdW5jdGlvbiB0byB3cmFwIGluIHRoZSBncm91cFxuICovXG5mdW5jdGlvbiBncm91cChuYW1lLCBmbikge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHN0YXJ0R3JvdXAobmFtZSk7XG4gICAgICAgIGxldCByZXN1bHQ7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXN1bHQgPSB5aWVsZCBmbigpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgZW5kR3JvdXAoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0pO1xufVxuZXhwb3J0cy5ncm91cCA9IGdyb3VwO1xuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gV3JhcHBlciBhY3Rpb24gc3RhdGVcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8qKlxuICogU2F2ZXMgc3RhdGUgZm9yIGN1cnJlbnQgYWN0aW9uLCB0aGUgc3RhdGUgY2FuIG9ubHkgYmUgcmV0cmlldmVkIGJ5IHRoaXMgYWN0aW9uJ3MgcG9zdCBqb2IgZXhlY3V0aW9uLlxuICpcbiAqIEBwYXJhbSAgICAgbmFtZSAgICAgbmFtZSBvZiB0aGUgc3RhdGUgdG8gc3RvcmVcbiAqIEBwYXJhbSAgICAgdmFsdWUgICAgdmFsdWUgdG8gc3RvcmVcbiAqL1xuZnVuY3Rpb24gc2F2ZVN0YXRlKG5hbWUsIHZhbHVlKSB7XG4gICAgY29tbWFuZF8xLmlzc3VlQ29tbWFuZCgnc2F2ZS1zdGF0ZScsIHsgbmFtZSB9LCB2YWx1ZSk7XG59XG5leHBvcnRzLnNhdmVTdGF0ZSA9IHNhdmVTdGF0ZTtcbi8qKlxuICogR2V0cyB0aGUgdmFsdWUgb2YgYW4gc3RhdGUgc2V0IGJ5IHRoaXMgYWN0aW9uJ3MgbWFpbiBleGVjdXRpb24uXG4gKlxuICogQHBhcmFtICAgICBuYW1lICAgICBuYW1lIG9mIHRoZSBzdGF0ZSB0byBnZXRcbiAqIEByZXR1cm5zICAgc3RyaW5nXG4gKi9cbmZ1bmN0aW9uIGdldFN0YXRlKG5hbWUpIHtcbiAgICByZXR1cm4gcHJvY2Vzcy5lbnZbYFNUQVRFXyR7bmFtZX1gXSB8fCAnJztcbn1cbmV4cG9ydHMuZ2V0U3RhdGUgPSBnZXRTdGF0ZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvcmUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHRyID0gcmVxdWlyZShcIi4vdG9vbHJ1bm5lclwiKTtcbi8qKlxuICogRXhlYyBhIGNvbW1hbmQuXG4gKiBPdXRwdXQgd2lsbCBiZSBzdHJlYW1lZCB0byB0aGUgbGl2ZSBjb25zb2xlLlxuICogUmV0dXJucyBwcm9taXNlIHdpdGggcmV0dXJuIGNvZGVcbiAqXG4gKiBAcGFyYW0gICAgIGNvbW1hbmRMaW5lICAgICAgICBjb21tYW5kIHRvIGV4ZWN1dGUgKGNhbiBpbmNsdWRlIGFkZGl0aW9uYWwgYXJncykuIE11c3QgYmUgY29ycmVjdGx5IGVzY2FwZWQuXG4gKiBAcGFyYW0gICAgIGFyZ3MgICAgICAgICAgICAgICBvcHRpb25hbCBhcmd1bWVudHMgZm9yIHRvb2wuIEVzY2FwaW5nIGlzIGhhbmRsZWQgYnkgdGhlIGxpYi5cbiAqIEBwYXJhbSAgICAgb3B0aW9ucyAgICAgICAgICAgIG9wdGlvbmFsIGV4ZWMgb3B0aW9ucy4gIFNlZSBFeGVjT3B0aW9uc1xuICogQHJldHVybnMgICBQcm9taXNlPG51bWJlcj4gICAgZXhpdCBjb2RlXG4gKi9cbmZ1bmN0aW9uIGV4ZWMoY29tbWFuZExpbmUsIGFyZ3MsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zdCBjb21tYW5kQXJncyA9IHRyLmFyZ1N0cmluZ1RvQXJyYXkoY29tbWFuZExpbmUpO1xuICAgICAgICBpZiAoY29tbWFuZEFyZ3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFBhcmFtZXRlciAnY29tbWFuZExpbmUnIGNhbm5vdCBiZSBudWxsIG9yIGVtcHR5LmApO1xuICAgICAgICB9XG4gICAgICAgIC8vIFBhdGggdG8gdG9vbCB0byBleGVjdXRlIHNob3VsZCBiZSBmaXJzdCBhcmdcbiAgICAgICAgY29uc3QgdG9vbFBhdGggPSBjb21tYW5kQXJnc1swXTtcbiAgICAgICAgYXJncyA9IGNvbW1hbmRBcmdzLnNsaWNlKDEpLmNvbmNhdChhcmdzIHx8IFtdKTtcbiAgICAgICAgY29uc3QgcnVubmVyID0gbmV3IHRyLlRvb2xSdW5uZXIodG9vbFBhdGgsIGFyZ3MsIG9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gcnVubmVyLmV4ZWMoKTtcbiAgICB9KTtcbn1cbmV4cG9ydHMuZXhlYyA9IGV4ZWM7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1leGVjLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBvcyA9IHJlcXVpcmUoXCJvc1wiKTtcbmNvbnN0IGV2ZW50cyA9IHJlcXVpcmUoXCJldmVudHNcIik7XG5jb25zdCBjaGlsZCA9IHJlcXVpcmUoXCJjaGlsZF9wcm9jZXNzXCIpO1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L3VuYm91bmQtbWV0aG9kICovXG5jb25zdCBJU19XSU5ET1dTID0gcHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJztcbi8qXG4gKiBDbGFzcyBmb3IgcnVubmluZyBjb21tYW5kIGxpbmUgdG9vbHMuIEhhbmRsZXMgcXVvdGluZyBhbmQgYXJnIHBhcnNpbmcgaW4gYSBwbGF0Zm9ybSBhZ25vc3RpYyB3YXkuXG4gKi9cbmNsYXNzIFRvb2xSdW5uZXIgZXh0ZW5kcyBldmVudHMuRXZlbnRFbWl0dGVyIHtcbiAgICBjb25zdHJ1Y3Rvcih0b29sUGF0aCwgYXJncywgb3B0aW9ucykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBpZiAoIXRvb2xQYXRoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQYXJhbWV0ZXIgJ3Rvb2xQYXRoJyBjYW5ub3QgYmUgbnVsbCBvciBlbXB0eS5cIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50b29sUGF0aCA9IHRvb2xQYXRoO1xuICAgICAgICB0aGlzLmFyZ3MgPSBhcmdzIHx8IFtdO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIH1cbiAgICBfZGVidWcobWVzc2FnZSkge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmxpc3RlbmVycyAmJiB0aGlzLm9wdGlvbnMubGlzdGVuZXJzLmRlYnVnKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMubGlzdGVuZXJzLmRlYnVnKG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9nZXRDb21tYW5kU3RyaW5nKG9wdGlvbnMsIG5vUHJlZml4KSB7XG4gICAgICAgIGNvbnN0IHRvb2xQYXRoID0gdGhpcy5fZ2V0U3Bhd25GaWxlTmFtZSgpO1xuICAgICAgICBjb25zdCBhcmdzID0gdGhpcy5fZ2V0U3Bhd25BcmdzKG9wdGlvbnMpO1xuICAgICAgICBsZXQgY21kID0gbm9QcmVmaXggPyAnJyA6ICdbY29tbWFuZF0nOyAvLyBvbWl0IHByZWZpeCB3aGVuIHBpcGVkIHRvIGEgc2Vjb25kIHRvb2xcbiAgICAgICAgaWYgKElTX1dJTkRPV1MpIHtcbiAgICAgICAgICAgIC8vIFdpbmRvd3MgKyBjbWQgZmlsZVxuICAgICAgICAgICAgaWYgKHRoaXMuX2lzQ21kRmlsZSgpKSB7XG4gICAgICAgICAgICAgICAgY21kICs9IHRvb2xQYXRoO1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgYSBvZiBhcmdzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNtZCArPSBgICR7YX1gO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFdpbmRvd3MgKyB2ZXJiYXRpbVxuICAgICAgICAgICAgZWxzZSBpZiAob3B0aW9ucy53aW5kb3dzVmVyYmF0aW1Bcmd1bWVudHMpIHtcbiAgICAgICAgICAgICAgICBjbWQgKz0gYFwiJHt0b29sUGF0aH1cImA7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBhIG9mIGFyZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgY21kICs9IGAgJHthfWA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gV2luZG93cyAocmVndWxhcilcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNtZCArPSB0aGlzLl93aW5kb3dzUXVvdGVDbWRBcmcodG9vbFBhdGgpO1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgYSBvZiBhcmdzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNtZCArPSBgICR7dGhpcy5fd2luZG93c1F1b3RlQ21kQXJnKGEpfWA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gT1NYL0xpbnV4IC0gdGhpcyBjYW4gbGlrZWx5IGJlIGltcHJvdmVkIHdpdGggc29tZSBmb3JtIG9mIHF1b3RpbmcuXG4gICAgICAgICAgICAvLyBjcmVhdGluZyBwcm9jZXNzZXMgb24gVW5peCBpcyBmdW5kYW1lbnRhbGx5IGRpZmZlcmVudCB0aGFuIFdpbmRvd3MuXG4gICAgICAgICAgICAvLyBvbiBVbml4LCBleGVjdnAoKSB0YWtlcyBhbiBhcmcgYXJyYXkuXG4gICAgICAgICAgICBjbWQgKz0gdG9vbFBhdGg7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGEgb2YgYXJncykge1xuICAgICAgICAgICAgICAgIGNtZCArPSBgICR7YX1gO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjbWQ7XG4gICAgfVxuICAgIF9wcm9jZXNzTGluZUJ1ZmZlcihkYXRhLCBzdHJCdWZmZXIsIG9uTGluZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IHMgPSBzdHJCdWZmZXIgKyBkYXRhLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBsZXQgbiA9IHMuaW5kZXhPZihvcy5FT0wpO1xuICAgICAgICAgICAgd2hpbGUgKG4gPiAtMSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmUgPSBzLnN1YnN0cmluZygwLCBuKTtcbiAgICAgICAgICAgICAgICBvbkxpbmUobGluZSk7XG4gICAgICAgICAgICAgICAgLy8gdGhlIHJlc3Qgb2YgdGhlIHN0cmluZyAuLi5cbiAgICAgICAgICAgICAgICBzID0gcy5zdWJzdHJpbmcobiArIG9zLkVPTC5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIG4gPSBzLmluZGV4T2Yob3MuRU9MKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0ckJ1ZmZlciA9IHM7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgLy8gc3RyZWFtaW5nIGxpbmVzIHRvIGNvbnNvbGUgaXMgYmVzdCBlZmZvcnQuICBEb24ndCBmYWlsIGEgYnVpbGQuXG4gICAgICAgICAgICB0aGlzLl9kZWJ1ZyhgZXJyb3IgcHJvY2Vzc2luZyBsaW5lLiBGYWlsZWQgd2l0aCBlcnJvciAke2Vycn1gKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfZ2V0U3Bhd25GaWxlTmFtZSgpIHtcbiAgICAgICAgaWYgKElTX1dJTkRPV1MpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9pc0NtZEZpbGUoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwcm9jZXNzLmVudlsnQ09NU1BFQyddIHx8ICdjbWQuZXhlJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy50b29sUGF0aDtcbiAgICB9XG4gICAgX2dldFNwYXduQXJncyhvcHRpb25zKSB7XG4gICAgICAgIGlmIChJU19XSU5ET1dTKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5faXNDbWRGaWxlKCkpIHtcbiAgICAgICAgICAgICAgICBsZXQgYXJnbGluZSA9IGAvRCAvUyAvQyBcIiR7dGhpcy5fd2luZG93c1F1b3RlQ21kQXJnKHRoaXMudG9vbFBhdGgpfWA7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBhIG9mIHRoaXMuYXJncykge1xuICAgICAgICAgICAgICAgICAgICBhcmdsaW5lICs9ICcgJztcbiAgICAgICAgICAgICAgICAgICAgYXJnbGluZSArPSBvcHRpb25zLndpbmRvd3NWZXJiYXRpbUFyZ3VtZW50c1xuICAgICAgICAgICAgICAgICAgICAgICAgPyBhXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHRoaXMuX3dpbmRvd3NRdW90ZUNtZEFyZyhhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYXJnbGluZSArPSAnXCInO1xuICAgICAgICAgICAgICAgIHJldHVybiBbYXJnbGluZV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuYXJncztcbiAgICB9XG4gICAgX2VuZHNXaXRoKHN0ciwgZW5kKSB7XG4gICAgICAgIHJldHVybiBzdHIuZW5kc1dpdGgoZW5kKTtcbiAgICB9XG4gICAgX2lzQ21kRmlsZSgpIHtcbiAgICAgICAgY29uc3QgdXBwZXJUb29sUGF0aCA9IHRoaXMudG9vbFBhdGgudG9VcHBlckNhc2UoKTtcbiAgICAgICAgcmV0dXJuICh0aGlzLl9lbmRzV2l0aCh1cHBlclRvb2xQYXRoLCAnLkNNRCcpIHx8XG4gICAgICAgICAgICB0aGlzLl9lbmRzV2l0aCh1cHBlclRvb2xQYXRoLCAnLkJBVCcpKTtcbiAgICB9XG4gICAgX3dpbmRvd3NRdW90ZUNtZEFyZyhhcmcpIHtcbiAgICAgICAgLy8gZm9yIC5leGUsIGFwcGx5IHRoZSBub3JtYWwgcXVvdGluZyBydWxlcyB0aGF0IGxpYnV2IGFwcGxpZXNcbiAgICAgICAgaWYgKCF0aGlzLl9pc0NtZEZpbGUoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3V2UXVvdGVDbWRBcmcoYXJnKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBvdGhlcndpc2UgYXBwbHkgcXVvdGluZyBydWxlcyBzcGVjaWZpYyB0byB0aGUgY21kLmV4ZSBjb21tYW5kIGxpbmUgcGFyc2VyLlxuICAgICAgICAvLyB0aGUgbGlidXYgcnVsZXMgYXJlIGdlbmVyaWMgYW5kIGFyZSBub3QgZGVzaWduZWQgc3BlY2lmaWNhbGx5IGZvciBjbWQuZXhlXG4gICAgICAgIC8vIGNvbW1hbmQgbGluZSBwYXJzZXIuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIGZvciBhIGRldGFpbGVkIGRlc2NyaXB0aW9uIG9mIHRoZSBjbWQuZXhlIGNvbW1hbmQgbGluZSBwYXJzZXIsIHJlZmVyIHRvXG4gICAgICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDA5NDY5OS9ob3ctZG9lcy10aGUtd2luZG93cy1jb21tYW5kLWludGVycHJldGVyLWNtZC1leGUtcGFyc2Utc2NyaXB0cy83OTcwOTEyIzc5NzA5MTJcbiAgICAgICAgLy8gbmVlZCBxdW90ZXMgZm9yIGVtcHR5IGFyZ1xuICAgICAgICBpZiAoIWFyZykge1xuICAgICAgICAgICAgcmV0dXJuICdcIlwiJztcbiAgICAgICAgfVxuICAgICAgICAvLyBkZXRlcm1pbmUgd2hldGhlciB0aGUgYXJnIG5lZWRzIHRvIGJlIHF1b3RlZFxuICAgICAgICBjb25zdCBjbWRTcGVjaWFsQ2hhcnMgPSBbXG4gICAgICAgICAgICAnICcsXG4gICAgICAgICAgICAnXFx0JyxcbiAgICAgICAgICAgICcmJyxcbiAgICAgICAgICAgICcoJyxcbiAgICAgICAgICAgICcpJyxcbiAgICAgICAgICAgICdbJyxcbiAgICAgICAgICAgICddJyxcbiAgICAgICAgICAgICd7JyxcbiAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICdeJyxcbiAgICAgICAgICAgICc9JyxcbiAgICAgICAgICAgICc7JyxcbiAgICAgICAgICAgICchJyxcbiAgICAgICAgICAgIFwiJ1wiLFxuICAgICAgICAgICAgJysnLFxuICAgICAgICAgICAgJywnLFxuICAgICAgICAgICAgJ2AnLFxuICAgICAgICAgICAgJ34nLFxuICAgICAgICAgICAgJ3wnLFxuICAgICAgICAgICAgJzwnLFxuICAgICAgICAgICAgJz4nLFxuICAgICAgICAgICAgJ1wiJ1xuICAgICAgICBdO1xuICAgICAgICBsZXQgbmVlZHNRdW90ZXMgPSBmYWxzZTtcbiAgICAgICAgZm9yIChjb25zdCBjaGFyIG9mIGFyZykge1xuICAgICAgICAgICAgaWYgKGNtZFNwZWNpYWxDaGFycy5zb21lKHggPT4geCA9PT0gY2hhcikpIHtcbiAgICAgICAgICAgICAgICBuZWVkc1F1b3RlcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gc2hvcnQtY2lyY3VpdCBpZiBxdW90ZXMgbm90IG5lZWRlZFxuICAgICAgICBpZiAoIW5lZWRzUXVvdGVzKSB7XG4gICAgICAgICAgICByZXR1cm4gYXJnO1xuICAgICAgICB9XG4gICAgICAgIC8vIHRoZSBmb2xsb3dpbmcgcXVvdGluZyBydWxlcyBhcmUgdmVyeSBzaW1pbGFyIHRvIHRoZSBydWxlcyB0aGF0IGJ5IGxpYnV2IGFwcGxpZXMuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIDEpIHdyYXAgdGhlIHN0cmluZyBpbiBxdW90ZXNcbiAgICAgICAgLy9cbiAgICAgICAgLy8gMikgZG91YmxlLXVwIHF1b3RlcyAtIGkuZS4gXCIgPT4gXCJcIlxuICAgICAgICAvL1xuICAgICAgICAvLyAgICB0aGlzIGlzIGRpZmZlcmVudCBmcm9tIHRoZSBsaWJ1diBxdW90aW5nIHJ1bGVzLiBsaWJ1diByZXBsYWNlcyBcIiB3aXRoIFxcXCIsIHdoaWNoIHVuZm9ydHVuYXRlbHlcbiAgICAgICAgLy8gICAgZG9lc24ndCB3b3JrIHdlbGwgd2l0aCBhIGNtZC5leGUgY29tbWFuZCBsaW5lLlxuICAgICAgICAvL1xuICAgICAgICAvLyAgICBub3RlLCByZXBsYWNpbmcgXCIgd2l0aCBcIlwiIGFsc28gd29ya3Mgd2VsbCBpZiB0aGUgYXJnIGlzIHBhc3NlZCB0byBhIGRvd25zdHJlYW0gLk5FVCBjb25zb2xlIGFwcC5cbiAgICAgICAgLy8gICAgZm9yIGV4YW1wbGUsIHRoZSBjb21tYW5kIGxpbmU6XG4gICAgICAgIC8vICAgICAgICAgIGZvby5leGUgXCJteWFyZzpcIlwibXkgdmFsXCJcIlwiXG4gICAgICAgIC8vICAgIGlzIHBhcnNlZCBieSBhIC5ORVQgY29uc29sZSBhcHAgaW50byBhbiBhcmcgYXJyYXk6XG4gICAgICAgIC8vICAgICAgICAgIFsgXCJteWFyZzpcXFwibXkgdmFsXFxcIlwiIF1cbiAgICAgICAgLy8gICAgd2hpY2ggaXMgdGhlIHNhbWUgZW5kIHJlc3VsdCB3aGVuIGFwcGx5aW5nIGxpYnV2IHF1b3RpbmcgcnVsZXMuIGFsdGhvdWdoIHRoZSBhY3R1YWxcbiAgICAgICAgLy8gICAgY29tbWFuZCBsaW5lIGZyb20gbGlidXYgcXVvdGluZyBydWxlcyB3b3VsZCBsb29rIGxpa2U6XG4gICAgICAgIC8vICAgICAgICAgIGZvby5leGUgXCJteWFyZzpcXFwibXkgdmFsXFxcIlwiXG4gICAgICAgIC8vXG4gICAgICAgIC8vIDMpIGRvdWJsZS11cCBzbGFzaGVzIHRoYXQgcHJlY2VkZSBhIHF1b3RlLFxuICAgICAgICAvLyAgICBlLmcuICBoZWxsbyBcXHdvcmxkICAgID0+IFwiaGVsbG8gXFx3b3JsZFwiXG4gICAgICAgIC8vICAgICAgICAgIGhlbGxvXFxcIndvcmxkICAgID0+IFwiaGVsbG9cXFxcXCJcIndvcmxkXCJcbiAgICAgICAgLy8gICAgICAgICAgaGVsbG9cXFxcXCJ3b3JsZCAgID0+IFwiaGVsbG9cXFxcXFxcXFwiXCJ3b3JsZFwiXG4gICAgICAgIC8vICAgICAgICAgIGhlbGxvIHdvcmxkXFwgICAgPT4gXCJoZWxsbyB3b3JsZFxcXFxcIlxuICAgICAgICAvL1xuICAgICAgICAvLyAgICB0ZWNobmljYWxseSB0aGlzIGlzIG5vdCByZXF1aXJlZCBmb3IgYSBjbWQuZXhlIGNvbW1hbmQgbGluZSwgb3IgdGhlIGJhdGNoIGFyZ3VtZW50IHBhcnNlci5cbiAgICAgICAgLy8gICAgdGhlIHJlYXNvbnMgZm9yIGluY2x1ZGluZyB0aGlzIGFzIGEgLmNtZCBxdW90aW5nIHJ1bGUgYXJlOlxuICAgICAgICAvL1xuICAgICAgICAvLyAgICBhKSB0aGlzIGlzIG9wdGltaXplZCBmb3IgdGhlIHNjZW5hcmlvIHdoZXJlIHRoZSBhcmd1bWVudCBpcyBwYXNzZWQgZnJvbSB0aGUgLmNtZCBmaWxlIHRvIGFuXG4gICAgICAgIC8vICAgICAgIGV4dGVybmFsIHByb2dyYW0uIG1hbnkgcHJvZ3JhbXMgKGUuZy4gLk5FVCBjb25zb2xlIGFwcHMpIHJlbHkgb24gdGhlIHNsYXNoLWRvdWJsaW5nIHJ1bGUuXG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgIGIpIGl0J3Mgd2hhdCB3ZSd2ZSBiZWVuIGRvaW5nIHByZXZpb3VzbHkgKGJ5IGRlZmVycmluZyB0byBub2RlIGRlZmF1bHQgYmVoYXZpb3IpIGFuZCB3ZVxuICAgICAgICAvLyAgICAgICBoYXZlbid0IGhlYXJkIGFueSBjb21wbGFpbnRzIGFib3V0IHRoYXQgYXNwZWN0LlxuICAgICAgICAvL1xuICAgICAgICAvLyBub3RlLCBhIHdlYWtuZXNzIG9mIHRoZSBxdW90aW5nIHJ1bGVzIGNob3NlbiBoZXJlLCBpcyB0aGF0ICUgaXMgbm90IGVzY2FwZWQuIGluIGZhY3QsICUgY2Fubm90IGJlXG4gICAgICAgIC8vIGVzY2FwZWQgd2hlbiB1c2VkIG9uIHRoZSBjb21tYW5kIGxpbmUgZGlyZWN0bHkgLSBldmVuIHRob3VnaCB3aXRoaW4gYSAuY21kIGZpbGUgJSBjYW4gYmUgZXNjYXBlZFxuICAgICAgICAvLyBieSB1c2luZyAlJS5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gdGhlIHNhdmluZyBncmFjZSBpcywgb24gdGhlIGNvbW1hbmQgbGluZSwgJXZhciUgaXMgbGVmdCBhcy1pcyBpZiB2YXIgaXMgbm90IGRlZmluZWQuIHRoaXMgY29udHJhc3RzXG4gICAgICAgIC8vIHRoZSBsaW5lIHBhcnNpbmcgcnVsZXMgd2l0aGluIGEgLmNtZCBmaWxlLCB3aGVyZSBpZiB2YXIgaXMgbm90IGRlZmluZWQgaXQgaXMgcmVwbGFjZWQgd2l0aCBub3RoaW5nLlxuICAgICAgICAvL1xuICAgICAgICAvLyBvbmUgb3B0aW9uIHRoYXQgd2FzIGV4cGxvcmVkIHdhcyByZXBsYWNpbmcgJSB3aXRoIF4lIC0gaS5lLiAldmFyJSA9PiBeJXZhcl4lLiB0aGlzIGhhY2sgd291bGRcbiAgICAgICAgLy8gb2Z0ZW4gd29yaywgc2luY2UgaXQgaXMgdW5saWtlbHkgdGhhdCB2YXJeIHdvdWxkIGV4aXN0LCBhbmQgdGhlIF4gY2hhcmFjdGVyIGlzIHJlbW92ZWQgd2hlbiB0aGVcbiAgICAgICAgLy8gdmFyaWFibGUgaXMgdXNlZC4gdGhlIHByb2JsZW0sIGhvd2V2ZXIsIGlzIHRoYXQgXiBpcyBub3QgcmVtb3ZlZCB3aGVuICUqIGlzIHVzZWQgdG8gcGFzcyB0aGUgYXJnc1xuICAgICAgICAvLyB0byBhbiBleHRlcm5hbCBwcm9ncmFtLlxuICAgICAgICAvL1xuICAgICAgICAvLyBhbiB1bmV4cGxvcmVkIHBvdGVudGlhbCBzb2x1dGlvbiBmb3IgdGhlICUgZXNjYXBpbmcgcHJvYmxlbSwgaXMgdG8gY3JlYXRlIGEgd3JhcHBlciAuY21kIGZpbGUuXG4gICAgICAgIC8vICUgY2FuIGJlIGVzY2FwZWQgd2l0aGluIGEgLmNtZCBmaWxlLlxuICAgICAgICBsZXQgcmV2ZXJzZSA9ICdcIic7XG4gICAgICAgIGxldCBxdW90ZUhpdCA9IHRydWU7XG4gICAgICAgIGZvciAobGV0IGkgPSBhcmcubGVuZ3RoOyBpID4gMDsgaS0tKSB7XG4gICAgICAgICAgICAvLyB3YWxrIHRoZSBzdHJpbmcgaW4gcmV2ZXJzZVxuICAgICAgICAgICAgcmV2ZXJzZSArPSBhcmdbaSAtIDFdO1xuICAgICAgICAgICAgaWYgKHF1b3RlSGl0ICYmIGFyZ1tpIC0gMV0gPT09ICdcXFxcJykge1xuICAgICAgICAgICAgICAgIHJldmVyc2UgKz0gJ1xcXFwnOyAvLyBkb3VibGUgdGhlIHNsYXNoXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChhcmdbaSAtIDFdID09PSAnXCInKSB7XG4gICAgICAgICAgICAgICAgcXVvdGVIaXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJldmVyc2UgKz0gJ1wiJzsgLy8gZG91YmxlIHRoZSBxdW90ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcXVvdGVIaXQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXZlcnNlICs9ICdcIic7XG4gICAgICAgIHJldHVybiByZXZlcnNlXG4gICAgICAgICAgICAuc3BsaXQoJycpXG4gICAgICAgICAgICAucmV2ZXJzZSgpXG4gICAgICAgICAgICAuam9pbignJyk7XG4gICAgfVxuICAgIF91dlF1b3RlQ21kQXJnKGFyZykge1xuICAgICAgICAvLyBUb29sIHJ1bm5lciB3cmFwcyBjaGlsZF9wcm9jZXNzLnNwYXduKCkgYW5kIG5lZWRzIHRvIGFwcGx5IHRoZSBzYW1lIHF1b3RpbmcgYXNcbiAgICAgICAgLy8gTm9kZSBpbiBjZXJ0YWluIGNhc2VzIHdoZXJlIHRoZSB1bmRvY3VtZW50ZWQgc3Bhd24gb3B0aW9uIHdpbmRvd3NWZXJiYXRpbUFyZ3VtZW50c1xuICAgICAgICAvLyBpcyB1c2VkLlxuICAgICAgICAvL1xuICAgICAgICAvLyBTaW5jZSB0aGlzIGZ1bmN0aW9uIGlzIGEgcG9ydCBvZiBxdW90ZV9jbWRfYXJnIGZyb20gTm9kZSA0LnggKHRlY2huaWNhbGx5LCBsaWIgVVYsXG4gICAgICAgIC8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vbm9kZWpzL25vZGUvYmxvYi92NC54L2RlcHMvdXYvc3JjL3dpbi9wcm9jZXNzLmMgZm9yIGRldGFpbHMpLFxuICAgICAgICAvLyBwYXN0aW5nIGNvcHlyaWdodCBub3RpY2UgZnJvbSBOb2RlIHdpdGhpbiB0aGlzIGZ1bmN0aW9uOlxuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAgICAgICAgLy8gICAgICBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0b1xuICAgICAgICAvLyAgICAgIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlXG4gICAgICAgIC8vICAgICAgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yXG4gICAgICAgIC8vICAgICAgc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAgICAgICAgLy8gICAgICBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gICAgICAgIC8vICAgICAgYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAgVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICAgICAgICAvLyAgICAgIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICAgICAgICAvLyAgICAgIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICAgICAgICAvLyAgICAgIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAgICAgICAgLy8gICAgICBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lOR1xuICAgICAgICAvLyAgICAgIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1NcbiAgICAgICAgLy8gICAgICBJTiBUSEUgU09GVFdBUkUuXG4gICAgICAgIGlmICghYXJnKSB7XG4gICAgICAgICAgICAvLyBOZWVkIGRvdWJsZSBxdW90YXRpb24gZm9yIGVtcHR5IGFyZ3VtZW50XG4gICAgICAgICAgICByZXR1cm4gJ1wiXCInO1xuICAgICAgICB9XG4gICAgICAgIGlmICghYXJnLmluY2x1ZGVzKCcgJykgJiYgIWFyZy5pbmNsdWRlcygnXFx0JykgJiYgIWFyZy5pbmNsdWRlcygnXCInKSkge1xuICAgICAgICAgICAgLy8gTm8gcXVvdGF0aW9uIG5lZWRlZFxuICAgICAgICAgICAgcmV0dXJuIGFyZztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWFyZy5pbmNsdWRlcygnXCInKSAmJiAhYXJnLmluY2x1ZGVzKCdcXFxcJykpIHtcbiAgICAgICAgICAgIC8vIE5vIGVtYmVkZGVkIGRvdWJsZSBxdW90ZXMgb3IgYmFja3NsYXNoZXMsIHNvIEkgY2FuIGp1c3Qgd3JhcFxuICAgICAgICAgICAgLy8gcXVvdGUgbWFya3MgYXJvdW5kIHRoZSB3aG9sZSB0aGluZy5cbiAgICAgICAgICAgIHJldHVybiBgXCIke2FyZ31cImA7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRXhwZWN0ZWQgaW5wdXQvb3V0cHV0OlxuICAgICAgICAvLyAgIGlucHV0IDogaGVsbG9cIndvcmxkXG4gICAgICAgIC8vICAgb3V0cHV0OiBcImhlbGxvXFxcIndvcmxkXCJcbiAgICAgICAgLy8gICBpbnB1dCA6IGhlbGxvXCJcIndvcmxkXG4gICAgICAgIC8vICAgb3V0cHV0OiBcImhlbGxvXFxcIlxcXCJ3b3JsZFwiXG4gICAgICAgIC8vICAgaW5wdXQgOiBoZWxsb1xcd29ybGRcbiAgICAgICAgLy8gICBvdXRwdXQ6IGhlbGxvXFx3b3JsZFxuICAgICAgICAvLyAgIGlucHV0IDogaGVsbG9cXFxcd29ybGRcbiAgICAgICAgLy8gICBvdXRwdXQ6IGhlbGxvXFxcXHdvcmxkXG4gICAgICAgIC8vICAgaW5wdXQgOiBoZWxsb1xcXCJ3b3JsZFxuICAgICAgICAvLyAgIG91dHB1dDogXCJoZWxsb1xcXFxcXFwid29ybGRcIlxuICAgICAgICAvLyAgIGlucHV0IDogaGVsbG9cXFxcXCJ3b3JsZFxuICAgICAgICAvLyAgIG91dHB1dDogXCJoZWxsb1xcXFxcXFxcXFxcIndvcmxkXCJcbiAgICAgICAgLy8gICBpbnB1dCA6IGhlbGxvIHdvcmxkXFxcbiAgICAgICAgLy8gICBvdXRwdXQ6IFwiaGVsbG8gd29ybGRcXFxcXCIgLSBub3RlIHRoZSBjb21tZW50IGluIGxpYnV2IGFjdHVhbGx5IHJlYWRzIFwiaGVsbG8gd29ybGRcXFwiXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidXQgaXQgYXBwZWFycyB0aGUgY29tbWVudCBpcyB3cm9uZywgaXQgc2hvdWxkIGJlIFwiaGVsbG8gd29ybGRcXFxcXCJcbiAgICAgICAgbGV0IHJldmVyc2UgPSAnXCInO1xuICAgICAgICBsZXQgcXVvdGVIaXQgPSB0cnVlO1xuICAgICAgICBmb3IgKGxldCBpID0gYXJnLmxlbmd0aDsgaSA+IDA7IGktLSkge1xuICAgICAgICAgICAgLy8gd2FsayB0aGUgc3RyaW5nIGluIHJldmVyc2VcbiAgICAgICAgICAgIHJldmVyc2UgKz0gYXJnW2kgLSAxXTtcbiAgICAgICAgICAgIGlmIChxdW90ZUhpdCAmJiBhcmdbaSAtIDFdID09PSAnXFxcXCcpIHtcbiAgICAgICAgICAgICAgICByZXZlcnNlICs9ICdcXFxcJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGFyZ1tpIC0gMV0gPT09ICdcIicpIHtcbiAgICAgICAgICAgICAgICBxdW90ZUhpdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmV2ZXJzZSArPSAnXFxcXCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBxdW90ZUhpdCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldmVyc2UgKz0gJ1wiJztcbiAgICAgICAgcmV0dXJuIHJldmVyc2VcbiAgICAgICAgICAgIC5zcGxpdCgnJylcbiAgICAgICAgICAgIC5yZXZlcnNlKClcbiAgICAgICAgICAgIC5qb2luKCcnKTtcbiAgICB9XG4gICAgX2Nsb25lRXhlY09wdGlvbnMob3B0aW9ucykge1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgICAgICAgY3dkOiBvcHRpb25zLmN3ZCB8fCBwcm9jZXNzLmN3ZCgpLFxuICAgICAgICAgICAgZW52OiBvcHRpb25zLmVudiB8fCBwcm9jZXNzLmVudixcbiAgICAgICAgICAgIHNpbGVudDogb3B0aW9ucy5zaWxlbnQgfHwgZmFsc2UsXG4gICAgICAgICAgICB3aW5kb3dzVmVyYmF0aW1Bcmd1bWVudHM6IG9wdGlvbnMud2luZG93c1ZlcmJhdGltQXJndW1lbnRzIHx8IGZhbHNlLFxuICAgICAgICAgICAgZmFpbE9uU3RkRXJyOiBvcHRpb25zLmZhaWxPblN0ZEVyciB8fCBmYWxzZSxcbiAgICAgICAgICAgIGlnbm9yZVJldHVybkNvZGU6IG9wdGlvbnMuaWdub3JlUmV0dXJuQ29kZSB8fCBmYWxzZSxcbiAgICAgICAgICAgIGRlbGF5OiBvcHRpb25zLmRlbGF5IHx8IDEwMDAwXG4gICAgICAgIH07XG4gICAgICAgIHJlc3VsdC5vdXRTdHJlYW0gPSBvcHRpb25zLm91dFN0cmVhbSB8fCBwcm9jZXNzLnN0ZG91dDtcbiAgICAgICAgcmVzdWx0LmVyclN0cmVhbSA9IG9wdGlvbnMuZXJyU3RyZWFtIHx8IHByb2Nlc3Muc3RkZXJyO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBfZ2V0U3Bhd25PcHRpb25zKG9wdGlvbnMsIHRvb2xQYXRoKSB7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICAgICAgcmVzdWx0LmN3ZCA9IG9wdGlvbnMuY3dkO1xuICAgICAgICByZXN1bHQuZW52ID0gb3B0aW9ucy5lbnY7XG4gICAgICAgIHJlc3VsdFsnd2luZG93c1ZlcmJhdGltQXJndW1lbnRzJ10gPVxuICAgICAgICAgICAgb3B0aW9ucy53aW5kb3dzVmVyYmF0aW1Bcmd1bWVudHMgfHwgdGhpcy5faXNDbWRGaWxlKCk7XG4gICAgICAgIGlmIChvcHRpb25zLndpbmRvd3NWZXJiYXRpbUFyZ3VtZW50cykge1xuICAgICAgICAgICAgcmVzdWx0LmFyZ3YwID0gYFwiJHt0b29sUGF0aH1cImA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRXhlYyBhIHRvb2wuXG4gICAgICogT3V0cHV0IHdpbGwgYmUgc3RyZWFtZWQgdG8gdGhlIGxpdmUgY29uc29sZS5cbiAgICAgKiBSZXR1cm5zIHByb21pc2Ugd2l0aCByZXR1cm4gY29kZVxuICAgICAqXG4gICAgICogQHBhcmFtICAgICB0b29sICAgICBwYXRoIHRvIHRvb2wgdG8gZXhlY1xuICAgICAqIEBwYXJhbSAgICAgb3B0aW9ucyAgb3B0aW9uYWwgZXhlYyBvcHRpb25zLiAgU2VlIEV4ZWNPcHRpb25zXG4gICAgICogQHJldHVybnMgICBudW1iZXJcbiAgICAgKi9cbiAgICBleGVjKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kZWJ1ZyhgZXhlYyB0b29sOiAke3RoaXMudG9vbFBhdGh9YCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGVidWcoJ2FyZ3VtZW50czonKTtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGFyZyBvZiB0aGlzLmFyZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGVidWcoYCAgICR7YXJnfWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpb25zTm9uTnVsbCA9IHRoaXMuX2Nsb25lRXhlY09wdGlvbnModGhpcy5vcHRpb25zKTtcbiAgICAgICAgICAgICAgICBpZiAoIW9wdGlvbnNOb25OdWxsLnNpbGVudCAmJiBvcHRpb25zTm9uTnVsbC5vdXRTdHJlYW0pIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc05vbk51bGwub3V0U3RyZWFtLndyaXRlKHRoaXMuX2dldENvbW1hbmRTdHJpbmcob3B0aW9uc05vbk51bGwpICsgb3MuRU9MKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhdGUgPSBuZXcgRXhlY1N0YXRlKG9wdGlvbnNOb25OdWxsLCB0aGlzLnRvb2xQYXRoKTtcbiAgICAgICAgICAgICAgICBzdGF0ZS5vbignZGVidWcnLCAobWVzc2FnZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kZWJ1ZyhtZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlTmFtZSA9IHRoaXMuX2dldFNwYXduRmlsZU5hbWUoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBjcCA9IGNoaWxkLnNwYXduKGZpbGVOYW1lLCB0aGlzLl9nZXRTcGF3bkFyZ3Mob3B0aW9uc05vbk51bGwpLCB0aGlzLl9nZXRTcGF3bk9wdGlvbnModGhpcy5vcHRpb25zLCBmaWxlTmFtZSkpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0ZGJ1ZmZlciA9ICcnO1xuICAgICAgICAgICAgICAgIGlmIChjcC5zdGRvdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgY3Auc3Rkb3V0Lm9uKCdkYXRhJywgKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMubGlzdGVuZXJzICYmIHRoaXMub3B0aW9ucy5saXN0ZW5lcnMuc3Rkb3V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmxpc3RlbmVycy5zdGRvdXQoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW9wdGlvbnNOb25OdWxsLnNpbGVudCAmJiBvcHRpb25zTm9uTnVsbC5vdXRTdHJlYW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zTm9uTnVsbC5vdXRTdHJlYW0ud3JpdGUoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9wcm9jZXNzTGluZUJ1ZmZlcihkYXRhLCBzdGRidWZmZXIsIChsaW5lKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5saXN0ZW5lcnMgJiYgdGhpcy5vcHRpb25zLmxpc3RlbmVycy5zdGRsaW5lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5saXN0ZW5lcnMuc3RkbGluZShsaW5lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGVycmJ1ZmZlciA9ICcnO1xuICAgICAgICAgICAgICAgIGlmIChjcC5zdGRlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY3Auc3RkZXJyLm9uKCdkYXRhJywgKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlLnByb2Nlc3NTdGRlcnIgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5saXN0ZW5lcnMgJiYgdGhpcy5vcHRpb25zLmxpc3RlbmVycy5zdGRlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMubGlzdGVuZXJzLnN0ZGVycihkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghb3B0aW9uc05vbk51bGwuc2lsZW50ICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uc05vbk51bGwuZXJyU3RyZWFtICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uc05vbk51bGwub3V0U3RyZWFtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcyA9IG9wdGlvbnNOb25OdWxsLmZhaWxPblN0ZEVyclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IG9wdGlvbnNOb25OdWxsLmVyclN0cmVhbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IG9wdGlvbnNOb25OdWxsLm91dFN0cmVhbTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLndyaXRlKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcHJvY2Vzc0xpbmVCdWZmZXIoZGF0YSwgZXJyYnVmZmVyLCAobGluZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMubGlzdGVuZXJzICYmIHRoaXMub3B0aW9ucy5saXN0ZW5lcnMuZXJybGluZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMubGlzdGVuZXJzLmVycmxpbmUobGluZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjcC5vbignZXJyb3InLCAoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLnByb2Nlc3NFcnJvciA9IGVyci5tZXNzYWdlO1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5wcm9jZXNzRXhpdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUucHJvY2Vzc0Nsb3NlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLkNoZWNrQ29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjcC5vbignZXhpdCcsIChjb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLnByb2Nlc3NFeGl0Q29kZSA9IGNvZGU7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLnByb2Nlc3NFeGl0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kZWJ1ZyhgRXhpdCBjb2RlICR7Y29kZX0gcmVjZWl2ZWQgZnJvbSB0b29sICcke3RoaXMudG9vbFBhdGh9J2ApO1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5DaGVja0NvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY3Aub24oJ2Nsb3NlJywgKGNvZGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUucHJvY2Vzc0V4aXRDb2RlID0gY29kZTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUucHJvY2Vzc0V4aXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLnByb2Nlc3NDbG9zZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kZWJ1ZyhgU1RESU8gc3RyZWFtcyBoYXZlIGNsb3NlZCBmb3IgdG9vbCAnJHt0aGlzLnRvb2xQYXRofSdgKTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUuQ2hlY2tDb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHN0YXRlLm9uKCdkb25lJywgKGVycm9yLCBleGl0Q29kZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RkYnVmZmVyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgnc3RkbGluZScsIHN0ZGJ1ZmZlcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycmJ1ZmZlci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2VycmxpbmUnLCBlcnJidWZmZXIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNwLnJlbW92ZUFsbExpc3RlbmVycygpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGV4aXRDb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydHMuVG9vbFJ1bm5lciA9IFRvb2xSdW5uZXI7XG4vKipcbiAqIENvbnZlcnQgYW4gYXJnIHN0cmluZyB0byBhbiBhcnJheSBvZiBhcmdzLiBIYW5kbGVzIGVzY2FwaW5nXG4gKlxuICogQHBhcmFtICAgIGFyZ1N0cmluZyAgIHN0cmluZyBvZiBhcmd1bWVudHNcbiAqIEByZXR1cm5zICBzdHJpbmdbXSAgICBhcnJheSBvZiBhcmd1bWVudHNcbiAqL1xuZnVuY3Rpb24gYXJnU3RyaW5nVG9BcnJheShhcmdTdHJpbmcpIHtcbiAgICBjb25zdCBhcmdzID0gW107XG4gICAgbGV0IGluUXVvdGVzID0gZmFsc2U7XG4gICAgbGV0IGVzY2FwZWQgPSBmYWxzZTtcbiAgICBsZXQgYXJnID0gJyc7XG4gICAgZnVuY3Rpb24gYXBwZW5kKGMpIHtcbiAgICAgICAgLy8gd2Ugb25seSBlc2NhcGUgZG91YmxlIHF1b3Rlcy5cbiAgICAgICAgaWYgKGVzY2FwZWQgJiYgYyAhPT0gJ1wiJykge1xuICAgICAgICAgICAgYXJnICs9ICdcXFxcJztcbiAgICAgICAgfVxuICAgICAgICBhcmcgKz0gYztcbiAgICAgICAgZXNjYXBlZCA9IGZhbHNlO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyZ1N0cmluZy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBjID0gYXJnU3RyaW5nLmNoYXJBdChpKTtcbiAgICAgICAgaWYgKGMgPT09ICdcIicpIHtcbiAgICAgICAgICAgIGlmICghZXNjYXBlZCkge1xuICAgICAgICAgICAgICAgIGluUXVvdGVzID0gIWluUXVvdGVzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYXBwZW5kKGMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGMgPT09ICdcXFxcJyAmJiBlc2NhcGVkKSB7XG4gICAgICAgICAgICBhcHBlbmQoYyk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYyA9PT0gJ1xcXFwnICYmIGluUXVvdGVzKSB7XG4gICAgICAgICAgICBlc2NhcGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjID09PSAnICcgJiYgIWluUXVvdGVzKSB7XG4gICAgICAgICAgICBpZiAoYXJnLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBhcmdzLnB1c2goYXJnKTtcbiAgICAgICAgICAgICAgICBhcmcgPSAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGFwcGVuZChjKTtcbiAgICB9XG4gICAgaWYgKGFyZy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGFyZ3MucHVzaChhcmcudHJpbSgpKTtcbiAgICB9XG4gICAgcmV0dXJuIGFyZ3M7XG59XG5leHBvcnRzLmFyZ1N0cmluZ1RvQXJyYXkgPSBhcmdTdHJpbmdUb0FycmF5O1xuY2xhc3MgRXhlY1N0YXRlIGV4dGVuZHMgZXZlbnRzLkV2ZW50RW1pdHRlciB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucywgdG9vbFBhdGgpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5wcm9jZXNzQ2xvc2VkID0gZmFsc2U7IC8vIHRyYWNrcyB3aGV0aGVyIHRoZSBwcm9jZXNzIGhhcyBleGl0ZWQgYW5kIHN0ZGlvIGlzIGNsb3NlZFxuICAgICAgICB0aGlzLnByb2Nlc3NFcnJvciA9ICcnO1xuICAgICAgICB0aGlzLnByb2Nlc3NFeGl0Q29kZSA9IDA7XG4gICAgICAgIHRoaXMucHJvY2Vzc0V4aXRlZCA9IGZhbHNlOyAvLyB0cmFja3Mgd2hldGhlciB0aGUgcHJvY2VzcyBoYXMgZXhpdGVkXG4gICAgICAgIHRoaXMucHJvY2Vzc1N0ZGVyciA9IGZhbHNlOyAvLyB0cmFja3Mgd2hldGhlciBzdGRlcnIgd2FzIHdyaXR0ZW4gdG9cbiAgICAgICAgdGhpcy5kZWxheSA9IDEwMDAwOyAvLyAxMCBzZWNvbmRzXG4gICAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRpbWVvdXQgPSBudWxsO1xuICAgICAgICBpZiAoIXRvb2xQYXRoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Rvb2xQYXRoIG11c3Qgbm90IGJlIGVtcHR5Jyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgdGhpcy50b29sUGF0aCA9IHRvb2xQYXRoO1xuICAgICAgICBpZiAob3B0aW9ucy5kZWxheSkge1xuICAgICAgICAgICAgdGhpcy5kZWxheSA9IG9wdGlvbnMuZGVsYXk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgQ2hlY2tDb21wbGV0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZG9uZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnByb2Nlc3NDbG9zZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3NldFJlc3VsdCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMucHJvY2Vzc0V4aXRlZCkge1xuICAgICAgICAgICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dChFeGVjU3RhdGUuSGFuZGxlVGltZW91dCwgdGhpcy5kZWxheSwgdGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2RlYnVnKG1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5lbWl0KCdkZWJ1ZycsIG1lc3NhZ2UpO1xuICAgIH1cbiAgICBfc2V0UmVzdWx0KCkge1xuICAgICAgICAvLyBkZXRlcm1pbmUgd2hldGhlciB0aGVyZSBpcyBhbiBlcnJvclxuICAgICAgICBsZXQgZXJyb3I7XG4gICAgICAgIGlmICh0aGlzLnByb2Nlc3NFeGl0ZWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb2Nlc3NFcnJvcikge1xuICAgICAgICAgICAgICAgIGVycm9yID0gbmV3IEVycm9yKGBUaGVyZSB3YXMgYW4gZXJyb3Igd2hlbiBhdHRlbXB0aW5nIHRvIGV4ZWN1dGUgdGhlIHByb2Nlc3MgJyR7dGhpcy50b29sUGF0aH0nLiBUaGlzIG1heSBpbmRpY2F0ZSB0aGUgcHJvY2VzcyBmYWlsZWQgdG8gc3RhcnQuIEVycm9yOiAke3RoaXMucHJvY2Vzc0Vycm9yfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5wcm9jZXNzRXhpdENvZGUgIT09IDAgJiYgIXRoaXMub3B0aW9ucy5pZ25vcmVSZXR1cm5Db2RlKSB7XG4gICAgICAgICAgICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoYFRoZSBwcm9jZXNzICcke3RoaXMudG9vbFBhdGh9JyBmYWlsZWQgd2l0aCBleGl0IGNvZGUgJHt0aGlzLnByb2Nlc3NFeGl0Q29kZX1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMucHJvY2Vzc1N0ZGVyciAmJiB0aGlzLm9wdGlvbnMuZmFpbE9uU3RkRXJyKSB7XG4gICAgICAgICAgICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoYFRoZSBwcm9jZXNzICcke3RoaXMudG9vbFBhdGh9JyBmYWlsZWQgYmVjYXVzZSBvbmUgb3IgbW9yZSBsaW5lcyB3ZXJlIHdyaXR0ZW4gdG8gdGhlIFNUREVSUiBzdHJlYW1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBjbGVhciB0aGUgdGltZW91dFxuICAgICAgICBpZiAodGhpcy50aW1lb3V0KSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcbiAgICAgICAgICAgIHRoaXMudGltZW91dCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5lbWl0KCdkb25lJywgZXJyb3IsIHRoaXMucHJvY2Vzc0V4aXRDb2RlKTtcbiAgICB9XG4gICAgc3RhdGljIEhhbmRsZVRpbWVvdXQoc3RhdGUpIHtcbiAgICAgICAgaWYgKHN0YXRlLmRvbmUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXN0YXRlLnByb2Nlc3NDbG9zZWQgJiYgc3RhdGUucHJvY2Vzc0V4aXRlZCkge1xuICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IGBUaGUgU1RESU8gc3RyZWFtcyBkaWQgbm90IGNsb3NlIHdpdGhpbiAke3N0YXRlLmRlbGF5IC9cbiAgICAgICAgICAgICAgICAxMDAwfSBzZWNvbmRzIG9mIHRoZSBleGl0IGV2ZW50IGZyb20gcHJvY2VzcyAnJHtzdGF0ZS50b29sUGF0aH0nLiBUaGlzIG1heSBpbmRpY2F0ZSBhIGNoaWxkIHByb2Nlc3MgaW5oZXJpdGVkIHRoZSBTVERJTyBzdHJlYW1zIGFuZCBoYXMgbm90IHlldCBleGl0ZWQuYDtcbiAgICAgICAgICAgIHN0YXRlLl9kZWJ1ZyhtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICBzdGF0ZS5fc2V0UmVzdWx0KCk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dG9vbHJ1bm5lci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9hO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgYXNzZXJ0XzEgPSByZXF1aXJlKFwiYXNzZXJ0XCIpO1xuY29uc3QgZnMgPSByZXF1aXJlKFwiZnNcIik7XG5jb25zdCBwYXRoID0gcmVxdWlyZShcInBhdGhcIik7XG5fYSA9IGZzLnByb21pc2VzLCBleHBvcnRzLmNobW9kID0gX2EuY2htb2QsIGV4cG9ydHMuY29weUZpbGUgPSBfYS5jb3B5RmlsZSwgZXhwb3J0cy5sc3RhdCA9IF9hLmxzdGF0LCBleHBvcnRzLm1rZGlyID0gX2EubWtkaXIsIGV4cG9ydHMucmVhZGRpciA9IF9hLnJlYWRkaXIsIGV4cG9ydHMucmVhZGxpbmsgPSBfYS5yZWFkbGluaywgZXhwb3J0cy5yZW5hbWUgPSBfYS5yZW5hbWUsIGV4cG9ydHMucm1kaXIgPSBfYS5ybWRpciwgZXhwb3J0cy5zdGF0ID0gX2Euc3RhdCwgZXhwb3J0cy5zeW1saW5rID0gX2Euc3ltbGluaywgZXhwb3J0cy51bmxpbmsgPSBfYS51bmxpbms7XG5leHBvcnRzLklTX1dJTkRPV1MgPSBwcm9jZXNzLnBsYXRmb3JtID09PSAnd2luMzInO1xuZnVuY3Rpb24gZXhpc3RzKGZzUGF0aCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB5aWVsZCBleHBvcnRzLnN0YXQoZnNQYXRoKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBpZiAoZXJyLmNvZGUgPT09ICdFTk9FTlQnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xufVxuZXhwb3J0cy5leGlzdHMgPSBleGlzdHM7XG5mdW5jdGlvbiBpc0RpcmVjdG9yeShmc1BhdGgsIHVzZVN0YXQgPSBmYWxzZSkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnN0IHN0YXRzID0gdXNlU3RhdCA/IHlpZWxkIGV4cG9ydHMuc3RhdChmc1BhdGgpIDogeWllbGQgZXhwb3J0cy5sc3RhdChmc1BhdGgpO1xuICAgICAgICByZXR1cm4gc3RhdHMuaXNEaXJlY3RvcnkoKTtcbiAgICB9KTtcbn1cbmV4cG9ydHMuaXNEaXJlY3RvcnkgPSBpc0RpcmVjdG9yeTtcbi8qKlxuICogT24gT1NYL0xpbnV4LCB0cnVlIGlmIHBhdGggc3RhcnRzIHdpdGggJy8nLiBPbiBXaW5kb3dzLCB0cnVlIGZvciBwYXRocyBsaWtlOlxuICogXFwsIFxcaGVsbG8sIFxcXFxoZWxsb1xcc2hhcmUsIEM6LCBhbmQgQzpcXGhlbGxvIChhbmQgY29ycmVzcG9uZGluZyBhbHRlcm5hdGUgc2VwYXJhdG9yIGNhc2VzKS5cbiAqL1xuZnVuY3Rpb24gaXNSb290ZWQocCkge1xuICAgIHAgPSBub3JtYWxpemVTZXBhcmF0b3JzKHApO1xuICAgIGlmICghcCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2lzUm9vdGVkKCkgcGFyYW1ldGVyIFwicFwiIGNhbm5vdCBiZSBlbXB0eScpO1xuICAgIH1cbiAgICBpZiAoZXhwb3J0cy5JU19XSU5ET1dTKSB7XG4gICAgICAgIHJldHVybiAocC5zdGFydHNXaXRoKCdcXFxcJykgfHwgL15bQS1aXTovaS50ZXN0KHApIC8vIGUuZy4gXFwgb3IgXFxoZWxsbyBvciBcXFxcaGVsbG9cbiAgICAgICAgKTsgLy8gZS5nLiBDOiBvciBDOlxcaGVsbG9cbiAgICB9XG4gICAgcmV0dXJuIHAuc3RhcnRzV2l0aCgnLycpO1xufVxuZXhwb3J0cy5pc1Jvb3RlZCA9IGlzUm9vdGVkO1xuLyoqXG4gKiBSZWN1cnNpdmVseSBjcmVhdGUgYSBkaXJlY3RvcnkgYXQgYGZzUGF0aGAuXG4gKlxuICogVGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBvcHRpbWlzdGljLCBtZWFuaW5nIGl0IGF0dGVtcHRzIHRvIGNyZWF0ZSB0aGUgZnVsbFxuICogcGF0aCBmaXJzdCwgYW5kIGJhY2tzIHVwIHRoZSBwYXRoIHN0YWNrIGZyb20gdGhlcmUuXG4gKlxuICogQHBhcmFtIGZzUGF0aCBUaGUgcGF0aCB0byBjcmVhdGVcbiAqIEBwYXJhbSBtYXhEZXB0aCBUaGUgbWF4aW11bSByZWN1cnNpb24gZGVwdGhcbiAqIEBwYXJhbSBkZXB0aCBUaGUgY3VycmVudCByZWN1cnNpb24gZGVwdGhcbiAqL1xuZnVuY3Rpb24gbWtkaXJQKGZzUGF0aCwgbWF4RGVwdGggPSAxMDAwLCBkZXB0aCA9IDEpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBhc3NlcnRfMS5vayhmc1BhdGgsICdhIHBhdGggYXJndW1lbnQgbXVzdCBiZSBwcm92aWRlZCcpO1xuICAgICAgICBmc1BhdGggPSBwYXRoLnJlc29sdmUoZnNQYXRoKTtcbiAgICAgICAgaWYgKGRlcHRoID49IG1heERlcHRoKVxuICAgICAgICAgICAgcmV0dXJuIGV4cG9ydHMubWtkaXIoZnNQYXRoKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHlpZWxkIGV4cG9ydHMubWtkaXIoZnNQYXRoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGVyci5jb2RlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnRU5PRU5UJzoge1xuICAgICAgICAgICAgICAgICAgICB5aWVsZCBta2RpclAocGF0aC5kaXJuYW1lKGZzUGF0aCksIG1heERlcHRoLCBkZXB0aCArIDEpO1xuICAgICAgICAgICAgICAgICAgICB5aWVsZCBleHBvcnRzLm1rZGlyKGZzUGF0aCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZGVmYXVsdDoge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc3RhdHM7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0cyA9IHlpZWxkIGV4cG9ydHMuc3RhdChmc1BhdGgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnIyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzdGF0cy5pc0RpcmVjdG9yeSgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufVxuZXhwb3J0cy5ta2RpclAgPSBta2RpclA7XG4vKipcbiAqIEJlc3QgZWZmb3J0IGF0dGVtcHQgdG8gZGV0ZXJtaW5lIHdoZXRoZXIgYSBmaWxlIGV4aXN0cyBhbmQgaXMgZXhlY3V0YWJsZS5cbiAqIEBwYXJhbSBmaWxlUGF0aCAgICBmaWxlIHBhdGggdG8gY2hlY2tcbiAqIEBwYXJhbSBleHRlbnNpb25zICBhZGRpdGlvbmFsIGZpbGUgZXh0ZW5zaW9ucyB0byB0cnlcbiAqIEByZXR1cm4gaWYgZmlsZSBleGlzdHMgYW5kIGlzIGV4ZWN1dGFibGUsIHJldHVybnMgdGhlIGZpbGUgcGF0aC4gb3RoZXJ3aXNlIGVtcHR5IHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gdHJ5R2V0RXhlY3V0YWJsZVBhdGgoZmlsZVBhdGgsIGV4dGVuc2lvbnMpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBsZXQgc3RhdHMgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyB0ZXN0IGZpbGUgZXhpc3RzXG4gICAgICAgICAgICBzdGF0cyA9IHlpZWxkIGV4cG9ydHMuc3RhdChmaWxlUGF0aCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgaWYgKGVyci5jb2RlICE9PSAnRU5PRU5UJykge1xuICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFVuZXhwZWN0ZWQgZXJyb3IgYXR0ZW1wdGluZyB0byBkZXRlcm1pbmUgaWYgZXhlY3V0YWJsZSBmaWxlIGV4aXN0cyAnJHtmaWxlUGF0aH0nOiAke2Vycn1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RhdHMgJiYgc3RhdHMuaXNGaWxlKCkpIHtcbiAgICAgICAgICAgIGlmIChleHBvcnRzLklTX1dJTkRPV1MpIHtcbiAgICAgICAgICAgICAgICAvLyBvbiBXaW5kb3dzLCB0ZXN0IGZvciB2YWxpZCBleHRlbnNpb25cbiAgICAgICAgICAgICAgICBjb25zdCB1cHBlckV4dCA9IHBhdGguZXh0bmFtZShmaWxlUGF0aCkudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgICAgICBpZiAoZXh0ZW5zaW9ucy5zb21lKHZhbGlkRXh0ID0+IHZhbGlkRXh0LnRvVXBwZXJDYXNlKCkgPT09IHVwcGVyRXh0KSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmlsZVBhdGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzVW5peEV4ZWN1dGFibGUoc3RhdHMpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmaWxlUGF0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gdHJ5IGVhY2ggZXh0ZW5zaW9uXG4gICAgICAgIGNvbnN0IG9yaWdpbmFsRmlsZVBhdGggPSBmaWxlUGF0aDtcbiAgICAgICAgZm9yIChjb25zdCBleHRlbnNpb24gb2YgZXh0ZW5zaW9ucykge1xuICAgICAgICAgICAgZmlsZVBhdGggPSBvcmlnaW5hbEZpbGVQYXRoICsgZXh0ZW5zaW9uO1xuICAgICAgICAgICAgc3RhdHMgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHN0YXRzID0geWllbGQgZXhwb3J0cy5zdGF0KGZpbGVQYXRoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyLmNvZGUgIT09ICdFTk9FTlQnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBVbmV4cGVjdGVkIGVycm9yIGF0dGVtcHRpbmcgdG8gZGV0ZXJtaW5lIGlmIGV4ZWN1dGFibGUgZmlsZSBleGlzdHMgJyR7ZmlsZVBhdGh9JzogJHtlcnJ9YCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHN0YXRzICYmIHN0YXRzLmlzRmlsZSgpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGV4cG9ydHMuSVNfV0lORE9XUykge1xuICAgICAgICAgICAgICAgICAgICAvLyBwcmVzZXJ2ZSB0aGUgY2FzZSBvZiB0aGUgYWN0dWFsIGZpbGUgKHNpbmNlIGFuIGV4dGVuc2lvbiB3YXMgYXBwZW5kZWQpXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkaXJlY3RvcnkgPSBwYXRoLmRpcm5hbWUoZmlsZVBhdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdXBwZXJOYW1lID0gcGF0aC5iYXNlbmFtZShmaWxlUGF0aCkudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgYWN0dWFsTmFtZSBvZiB5aWVsZCBleHBvcnRzLnJlYWRkaXIoZGlyZWN0b3J5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1cHBlck5hbWUgPT09IGFjdHVhbE5hbWUudG9VcHBlckNhc2UoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlUGF0aCA9IHBhdGguam9pbihkaXJlY3RvcnksIGFjdHVhbE5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBVbmV4cGVjdGVkIGVycm9yIGF0dGVtcHRpbmcgdG8gZGV0ZXJtaW5lIHRoZSBhY3R1YWwgY2FzZSBvZiB0aGUgZmlsZSAnJHtmaWxlUGF0aH0nOiAke2Vycn1gKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmlsZVBhdGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNVbml4RXhlY3V0YWJsZShzdGF0cykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmaWxlUGF0aDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJyc7XG4gICAgfSk7XG59XG5leHBvcnRzLnRyeUdldEV4ZWN1dGFibGVQYXRoID0gdHJ5R2V0RXhlY3V0YWJsZVBhdGg7XG5mdW5jdGlvbiBub3JtYWxpemVTZXBhcmF0b3JzKHApIHtcbiAgICBwID0gcCB8fCAnJztcbiAgICBpZiAoZXhwb3J0cy5JU19XSU5ET1dTKSB7XG4gICAgICAgIC8vIGNvbnZlcnQgc2xhc2hlcyBvbiBXaW5kb3dzXG4gICAgICAgIHAgPSBwLnJlcGxhY2UoL1xcLy9nLCAnXFxcXCcpO1xuICAgICAgICAvLyByZW1vdmUgcmVkdW5kYW50IHNsYXNoZXNcbiAgICAgICAgcmV0dXJuIHAucmVwbGFjZSgvXFxcXFxcXFwrL2csICdcXFxcJyk7XG4gICAgfVxuICAgIC8vIHJlbW92ZSByZWR1bmRhbnQgc2xhc2hlc1xuICAgIHJldHVybiBwLnJlcGxhY2UoL1xcL1xcLysvZywgJy8nKTtcbn1cbi8vIG9uIE1hYy9MaW51eCwgdGVzdCB0aGUgZXhlY3V0ZSBiaXRcbi8vICAgICBSICAgVyAgWCAgUiAgVyBYIFIgVyBYXG4vLyAgIDI1NiAxMjggNjQgMzIgMTYgOCA0IDIgMVxuZnVuY3Rpb24gaXNVbml4RXhlY3V0YWJsZShzdGF0cykge1xuICAgIHJldHVybiAoKHN0YXRzLm1vZGUgJiAxKSA+IDAgfHxcbiAgICAgICAgKChzdGF0cy5tb2RlICYgOCkgPiAwICYmIHN0YXRzLmdpZCA9PT0gcHJvY2Vzcy5nZXRnaWQoKSkgfHxcbiAgICAgICAgKChzdGF0cy5tb2RlICYgNjQpID4gMCAmJiBzdGF0cy51aWQgPT09IHByb2Nlc3MuZ2V0dWlkKCkpKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlvLXV0aWwuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNoaWxkUHJvY2VzcyA9IHJlcXVpcmUoXCJjaGlsZF9wcm9jZXNzXCIpO1xuY29uc3QgcGF0aCA9IHJlcXVpcmUoXCJwYXRoXCIpO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcInV0aWxcIik7XG5jb25zdCBpb1V0aWwgPSByZXF1aXJlKFwiLi9pby11dGlsXCIpO1xuY29uc3QgZXhlYyA9IHV0aWxfMS5wcm9taXNpZnkoY2hpbGRQcm9jZXNzLmV4ZWMpO1xuLyoqXG4gKiBDb3BpZXMgYSBmaWxlIG9yIGZvbGRlci5cbiAqIEJhc2VkIG9mZiBvZiBzaGVsbGpzIC0gaHR0cHM6Ly9naXRodWIuY29tL3NoZWxsanMvc2hlbGxqcy9ibG9iLzkyMzdmNjZjNTJlNWRhYTQwNDU4Zjk0Zjk1NjVlMThlODEzMmY1YTYvc3JjL2NwLmpzXG4gKlxuICogQHBhcmFtICAgICBzb3VyY2UgICAgc291cmNlIHBhdGhcbiAqIEBwYXJhbSAgICAgZGVzdCAgICAgIGRlc3RpbmF0aW9uIHBhdGhcbiAqIEBwYXJhbSAgICAgb3B0aW9ucyAgIG9wdGlvbmFsLiBTZWUgQ29weU9wdGlvbnMuXG4gKi9cbmZ1bmN0aW9uIGNwKHNvdXJjZSwgZGVzdCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc3QgeyBmb3JjZSwgcmVjdXJzaXZlIH0gPSByZWFkQ29weU9wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgIGNvbnN0IGRlc3RTdGF0ID0gKHlpZWxkIGlvVXRpbC5leGlzdHMoZGVzdCkpID8geWllbGQgaW9VdGlsLnN0YXQoZGVzdCkgOiBudWxsO1xuICAgICAgICAvLyBEZXN0IGlzIGFuIGV4aXN0aW5nIGZpbGUsIGJ1dCBub3QgZm9yY2luZ1xuICAgICAgICBpZiAoZGVzdFN0YXQgJiYgZGVzdFN0YXQuaXNGaWxlKCkgJiYgIWZvcmNlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgZGVzdCBpcyBhbiBleGlzdGluZyBkaXJlY3RvcnksIHNob3VsZCBjb3B5IGluc2lkZS5cbiAgICAgICAgY29uc3QgbmV3RGVzdCA9IGRlc3RTdGF0ICYmIGRlc3RTdGF0LmlzRGlyZWN0b3J5KClcbiAgICAgICAgICAgID8gcGF0aC5qb2luKGRlc3QsIHBhdGguYmFzZW5hbWUoc291cmNlKSlcbiAgICAgICAgICAgIDogZGVzdDtcbiAgICAgICAgaWYgKCEoeWllbGQgaW9VdGlsLmV4aXN0cyhzb3VyY2UpKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBubyBzdWNoIGZpbGUgb3IgZGlyZWN0b3J5OiAke3NvdXJjZX1gKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzb3VyY2VTdGF0ID0geWllbGQgaW9VdGlsLnN0YXQoc291cmNlKTtcbiAgICAgICAgaWYgKHNvdXJjZVN0YXQuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgICAgICAgaWYgKCFyZWN1cnNpdmUpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBjb3B5LiAke3NvdXJjZX0gaXMgYSBkaXJlY3RvcnksIGJ1dCB0cmllZCB0byBjb3B5IHdpdGhvdXQgcmVjdXJzaXZlIGZsYWcuYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB5aWVsZCBjcERpclJlY3Vyc2l2ZShzb3VyY2UsIG5ld0Rlc3QsIDAsIGZvcmNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChwYXRoLnJlbGF0aXZlKHNvdXJjZSwgbmV3RGVzdCkgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgLy8gYSBmaWxlIGNhbm5vdCBiZSBjb3BpZWQgdG8gaXRzZWxmXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGAnJHtuZXdEZXN0fScgYW5kICcke3NvdXJjZX0nIGFyZSB0aGUgc2FtZSBmaWxlYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB5aWVsZCBjb3B5RmlsZShzb3VyY2UsIG5ld0Rlc3QsIGZvcmNlKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZXhwb3J0cy5jcCA9IGNwO1xuLyoqXG4gKiBNb3ZlcyBhIHBhdGguXG4gKlxuICogQHBhcmFtICAgICBzb3VyY2UgICAgc291cmNlIHBhdGhcbiAqIEBwYXJhbSAgICAgZGVzdCAgICAgIGRlc3RpbmF0aW9uIHBhdGhcbiAqIEBwYXJhbSAgICAgb3B0aW9ucyAgIG9wdGlvbmFsLiBTZWUgTW92ZU9wdGlvbnMuXG4gKi9cbmZ1bmN0aW9uIG12KHNvdXJjZSwgZGVzdCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgaWYgKHlpZWxkIGlvVXRpbC5leGlzdHMoZGVzdCkpIHtcbiAgICAgICAgICAgIGxldCBkZXN0RXhpc3RzID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICh5aWVsZCBpb1V0aWwuaXNEaXJlY3RvcnkoZGVzdCkpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiBkZXN0IGlzIGRpcmVjdG9yeSBjb3B5IHNyYyBpbnRvIGRlc3RcbiAgICAgICAgICAgICAgICBkZXN0ID0gcGF0aC5qb2luKGRlc3QsIHBhdGguYmFzZW5hbWUoc291cmNlKSk7XG4gICAgICAgICAgICAgICAgZGVzdEV4aXN0cyA9IHlpZWxkIGlvVXRpbC5leGlzdHMoZGVzdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGVzdEV4aXN0cykge1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmZvcmNlID09IG51bGwgfHwgb3B0aW9ucy5mb3JjZSkge1xuICAgICAgICAgICAgICAgICAgICB5aWVsZCBybVJGKGRlc3QpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdEZXN0aW5hdGlvbiBhbHJlYWR5IGV4aXN0cycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB5aWVsZCBta2RpclAocGF0aC5kaXJuYW1lKGRlc3QpKTtcbiAgICAgICAgeWllbGQgaW9VdGlsLnJlbmFtZShzb3VyY2UsIGRlc3QpO1xuICAgIH0pO1xufVxuZXhwb3J0cy5tdiA9IG12O1xuLyoqXG4gKiBSZW1vdmUgYSBwYXRoIHJlY3Vyc2l2ZWx5IHdpdGggZm9yY2VcbiAqXG4gKiBAcGFyYW0gaW5wdXRQYXRoIHBhdGggdG8gcmVtb3ZlXG4gKi9cbmZ1bmN0aW9uIHJtUkYoaW5wdXRQYXRoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgaWYgKGlvVXRpbC5JU19XSU5ET1dTKSB7XG4gICAgICAgICAgICAvLyBOb2RlIGRvZXNuJ3QgcHJvdmlkZSBhIGRlbGV0ZSBvcGVyYXRpb24sIG9ubHkgYW4gdW5saW5rIGZ1bmN0aW9uLiBUaGlzIG1lYW5zIHRoYXQgaWYgdGhlIGZpbGUgaXMgYmVpbmcgdXNlZCBieSBhbm90aGVyXG4gICAgICAgICAgICAvLyBwcm9ncmFtIChlLmcuIGFudGl2aXJ1cyksIGl0IHdvbid0IGJlIGRlbGV0ZWQuIFRvIGFkZHJlc3MgdGhpcywgd2Ugc2hlbGwgb3V0IHRoZSB3b3JrIHRvIHJkL2RlbC5cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKHlpZWxkIGlvVXRpbC5pc0RpcmVjdG9yeShpbnB1dFBhdGgsIHRydWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHlpZWxkIGV4ZWMoYHJkIC9zIC9xIFwiJHtpbnB1dFBhdGh9XCJgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHlpZWxkIGV4ZWMoYGRlbCAvZiAvYSBcIiR7aW5wdXRQYXRofVwiYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIC8vIGlmIHlvdSB0cnkgdG8gZGVsZXRlIGEgZmlsZSB0aGF0IGRvZXNuJ3QgZXhpc3QsIGRlc2lyZWQgcmVzdWx0IGlzIGFjaGlldmVkXG4gICAgICAgICAgICAgICAgLy8gb3RoZXIgZXJyb3JzIGFyZSB2YWxpZFxuICAgICAgICAgICAgICAgIGlmIChlcnIuY29kZSAhPT0gJ0VOT0VOVCcpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFNoZWxsaW5nIG91dCBmYWlscyB0byByZW1vdmUgYSBzeW1saW5rIGZvbGRlciB3aXRoIG1pc3Npbmcgc291cmNlLCB0aGlzIHVubGluayBjYXRjaGVzIHRoYXRcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgeWllbGQgaW9VdGlsLnVubGluayhpbnB1dFBhdGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIC8vIGlmIHlvdSB0cnkgdG8gZGVsZXRlIGEgZmlsZSB0aGF0IGRvZXNuJ3QgZXhpc3QsIGRlc2lyZWQgcmVzdWx0IGlzIGFjaGlldmVkXG4gICAgICAgICAgICAgICAgLy8gb3RoZXIgZXJyb3JzIGFyZSB2YWxpZFxuICAgICAgICAgICAgICAgIGlmIChlcnIuY29kZSAhPT0gJ0VOT0VOVCcpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxldCBpc0RpciA9IGZhbHNlO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpc0RpciA9IHlpZWxkIGlvVXRpbC5pc0RpcmVjdG9yeShpbnB1dFBhdGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIC8vIGlmIHlvdSB0cnkgdG8gZGVsZXRlIGEgZmlsZSB0aGF0IGRvZXNuJ3QgZXhpc3QsIGRlc2lyZWQgcmVzdWx0IGlzIGFjaGlldmVkXG4gICAgICAgICAgICAgICAgLy8gb3RoZXIgZXJyb3JzIGFyZSB2YWxpZFxuICAgICAgICAgICAgICAgIGlmIChlcnIuY29kZSAhPT0gJ0VOT0VOVCcpXG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNEaXIpIHtcbiAgICAgICAgICAgICAgICB5aWVsZCBleGVjKGBybSAtcmYgXCIke2lucHV0UGF0aH1cImApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgeWllbGQgaW9VdGlsLnVubGluayhpbnB1dFBhdGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59XG5leHBvcnRzLnJtUkYgPSBybVJGO1xuLyoqXG4gKiBNYWtlIGEgZGlyZWN0b3J5LiAgQ3JlYXRlcyB0aGUgZnVsbCBwYXRoIHdpdGggZm9sZGVycyBpbiBiZXR3ZWVuXG4gKiBXaWxsIHRocm93IGlmIGl0IGZhaWxzXG4gKlxuICogQHBhcmFtICAgZnNQYXRoICAgICAgICBwYXRoIHRvIGNyZWF0ZVxuICogQHJldHVybnMgUHJvbWlzZTx2b2lkPlxuICovXG5mdW5jdGlvbiBta2RpclAoZnNQYXRoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgeWllbGQgaW9VdGlsLm1rZGlyUChmc1BhdGgpO1xuICAgIH0pO1xufVxuZXhwb3J0cy5ta2RpclAgPSBta2RpclA7XG4vKipcbiAqIFJldHVybnMgcGF0aCBvZiBhIHRvb2wgaGFkIHRoZSB0b29sIGFjdHVhbGx5IGJlZW4gaW52b2tlZC4gIFJlc29sdmVzIHZpYSBwYXRocy5cbiAqIElmIHlvdSBjaGVjayBhbmQgdGhlIHRvb2wgZG9lcyBub3QgZXhpc3QsIGl0IHdpbGwgdGhyb3cuXG4gKlxuICogQHBhcmFtICAgICB0b29sICAgICAgICAgICAgICBuYW1lIG9mIHRoZSB0b29sXG4gKiBAcGFyYW0gICAgIGNoZWNrICAgICAgICAgICAgIHdoZXRoZXIgdG8gY2hlY2sgaWYgdG9vbCBleGlzdHNcbiAqIEByZXR1cm5zICAgUHJvbWlzZTxzdHJpbmc+ICAgcGF0aCB0byB0b29sXG4gKi9cbmZ1bmN0aW9uIHdoaWNoKHRvb2wsIGNoZWNrKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgaWYgKCF0b29sKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJwYXJhbWV0ZXIgJ3Rvb2wnIGlzIHJlcXVpcmVkXCIpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHJlY3Vyc2l2ZSB3aGVuIGNoZWNrPXRydWVcbiAgICAgICAgaWYgKGNoZWNrKSB7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSB5aWVsZCB3aGljaCh0b29sLCBmYWxzZSk7XG4gICAgICAgICAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgICAgICAgICAgIGlmIChpb1V0aWwuSVNfV0lORE9XUykge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuYWJsZSB0byBsb2NhdGUgZXhlY3V0YWJsZSBmaWxlOiAke3Rvb2x9LiBQbGVhc2UgdmVyaWZ5IGVpdGhlciB0aGUgZmlsZSBwYXRoIGV4aXN0cyBvciB0aGUgZmlsZSBjYW4gYmUgZm91bmQgd2l0aGluIGEgZGlyZWN0b3J5IHNwZWNpZmllZCBieSB0aGUgUEFUSCBlbnZpcm9ubWVudCB2YXJpYWJsZS4gQWxzbyB2ZXJpZnkgdGhlIGZpbGUgaGFzIGEgdmFsaWQgZXh0ZW5zaW9uIGZvciBhbiBleGVjdXRhYmxlIGZpbGUuYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuYWJsZSB0byBsb2NhdGUgZXhlY3V0YWJsZSBmaWxlOiAke3Rvb2x9LiBQbGVhc2UgdmVyaWZ5IGVpdGhlciB0aGUgZmlsZSBwYXRoIGV4aXN0cyBvciB0aGUgZmlsZSBjYW4gYmUgZm91bmQgd2l0aGluIGEgZGlyZWN0b3J5IHNwZWNpZmllZCBieSB0aGUgUEFUSCBlbnZpcm9ubWVudCB2YXJpYWJsZS4gQWxzbyBjaGVjayB0aGUgZmlsZSBtb2RlIHRvIHZlcmlmeSB0aGUgZmlsZSBpcyBleGVjdXRhYmxlLmApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gYnVpbGQgdGhlIGxpc3Qgb2YgZXh0ZW5zaW9ucyB0byB0cnlcbiAgICAgICAgICAgIGNvbnN0IGV4dGVuc2lvbnMgPSBbXTtcbiAgICAgICAgICAgIGlmIChpb1V0aWwuSVNfV0lORE9XUyAmJiBwcm9jZXNzLmVudi5QQVRIRVhUKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBleHRlbnNpb24gb2YgcHJvY2Vzcy5lbnYuUEFUSEVYVC5zcGxpdChwYXRoLmRlbGltaXRlcikpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV4dGVuc2lvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXh0ZW5zaW9ucy5wdXNoKGV4dGVuc2lvbik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBpZiBpdCdzIHJvb3RlZCwgcmV0dXJuIGl0IGlmIGV4aXN0cy4gb3RoZXJ3aXNlIHJldHVybiBlbXB0eS5cbiAgICAgICAgICAgIGlmIChpb1V0aWwuaXNSb290ZWQodG9vbCkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlUGF0aCA9IHlpZWxkIGlvVXRpbC50cnlHZXRFeGVjdXRhYmxlUGF0aCh0b29sLCBleHRlbnNpb25zKTtcbiAgICAgICAgICAgICAgICBpZiAoZmlsZVBhdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZpbGVQYXRoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBpZiBhbnkgcGF0aCBzZXBhcmF0b3JzLCByZXR1cm4gZW1wdHlcbiAgICAgICAgICAgIGlmICh0b29sLmluY2x1ZGVzKCcvJykgfHwgKGlvVXRpbC5JU19XSU5ET1dTICYmIHRvb2wuaW5jbHVkZXMoJ1xcXFwnKSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBidWlsZCB0aGUgbGlzdCBvZiBkaXJlY3Rvcmllc1xuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIE5vdGUsIHRlY2huaWNhbGx5IFwid2hlcmVcIiBjaGVja3MgdGhlIGN1cnJlbnQgZGlyZWN0b3J5IG9uIFdpbmRvd3MuIEZyb20gYSB0b29sa2l0IHBlcnNwZWN0aXZlLFxuICAgICAgICAgICAgLy8gaXQgZmVlbHMgbGlrZSB3ZSBzaG91bGQgbm90IGRvIHRoaXMuIENoZWNraW5nIHRoZSBjdXJyZW50IGRpcmVjdG9yeSBzZWVtcyBsaWtlIG1vcmUgb2YgYSB1c2VcbiAgICAgICAgICAgIC8vIGNhc2Ugb2YgYSBzaGVsbCwgYW5kIHRoZSB3aGljaCgpIGZ1bmN0aW9uIGV4cG9zZWQgYnkgdGhlIHRvb2xraXQgc2hvdWxkIHN0cml2ZSBmb3IgY29uc2lzdGVuY3lcbiAgICAgICAgICAgIC8vIGFjcm9zcyBwbGF0Zm9ybXMuXG4gICAgICAgICAgICBjb25zdCBkaXJlY3RvcmllcyA9IFtdO1xuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52LlBBVEgpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IHAgb2YgcHJvY2Vzcy5lbnYuUEFUSC5zcGxpdChwYXRoLmRlbGltaXRlcikpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdG9yaWVzLnB1c2gocCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyByZXR1cm4gdGhlIGZpcnN0IG1hdGNoXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGRpcmVjdG9yeSBvZiBkaXJlY3Rvcmllcykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGVQYXRoID0geWllbGQgaW9VdGlsLnRyeUdldEV4ZWN1dGFibGVQYXRoKGRpcmVjdG9yeSArIHBhdGguc2VwICsgdG9vbCwgZXh0ZW5zaW9ucyk7XG4gICAgICAgICAgICAgICAgaWYgKGZpbGVQYXRoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmaWxlUGF0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGB3aGljaCBmYWlsZWQgd2l0aCBtZXNzYWdlICR7ZXJyLm1lc3NhZ2V9YCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmV4cG9ydHMud2hpY2ggPSB3aGljaDtcbmZ1bmN0aW9uIHJlYWRDb3B5T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgY29uc3QgZm9yY2UgPSBvcHRpb25zLmZvcmNlID09IG51bGwgPyB0cnVlIDogb3B0aW9ucy5mb3JjZTtcbiAgICBjb25zdCByZWN1cnNpdmUgPSBCb29sZWFuKG9wdGlvbnMucmVjdXJzaXZlKTtcbiAgICByZXR1cm4geyBmb3JjZSwgcmVjdXJzaXZlIH07XG59XG5mdW5jdGlvbiBjcERpclJlY3Vyc2l2ZShzb3VyY2VEaXIsIGRlc3REaXIsIGN1cnJlbnREZXB0aCwgZm9yY2UpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAvLyBFbnN1cmUgdGhlcmUgaXMgbm90IGEgcnVuIGF3YXkgcmVjdXJzaXZlIGNvcHlcbiAgICAgICAgaWYgKGN1cnJlbnREZXB0aCA+PSAyNTUpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGN1cnJlbnREZXB0aCsrO1xuICAgICAgICB5aWVsZCBta2RpclAoZGVzdERpcik7XG4gICAgICAgIGNvbnN0IGZpbGVzID0geWllbGQgaW9VdGlsLnJlYWRkaXIoc291cmNlRGlyKTtcbiAgICAgICAgZm9yIChjb25zdCBmaWxlTmFtZSBvZiBmaWxlcykge1xuICAgICAgICAgICAgY29uc3Qgc3JjRmlsZSA9IGAke3NvdXJjZURpcn0vJHtmaWxlTmFtZX1gO1xuICAgICAgICAgICAgY29uc3QgZGVzdEZpbGUgPSBgJHtkZXN0RGlyfS8ke2ZpbGVOYW1lfWA7XG4gICAgICAgICAgICBjb25zdCBzcmNGaWxlU3RhdCA9IHlpZWxkIGlvVXRpbC5sc3RhdChzcmNGaWxlKTtcbiAgICAgICAgICAgIGlmIChzcmNGaWxlU3RhdC5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgICAgICAgICAgLy8gUmVjdXJzZVxuICAgICAgICAgICAgICAgIHlpZWxkIGNwRGlyUmVjdXJzaXZlKHNyY0ZpbGUsIGRlc3RGaWxlLCBjdXJyZW50RGVwdGgsIGZvcmNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHlpZWxkIGNvcHlGaWxlKHNyY0ZpbGUsIGRlc3RGaWxlLCBmb3JjZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ2hhbmdlIHRoZSBtb2RlIGZvciB0aGUgbmV3bHkgY3JlYXRlZCBkaXJlY3RvcnlcbiAgICAgICAgeWllbGQgaW9VdGlsLmNobW9kKGRlc3REaXIsICh5aWVsZCBpb1V0aWwuc3RhdChzb3VyY2VEaXIpKS5tb2RlKTtcbiAgICB9KTtcbn1cbi8vIEJ1ZmZlcmVkIGZpbGUgY29weVxuZnVuY3Rpb24gY29weUZpbGUoc3JjRmlsZSwgZGVzdEZpbGUsIGZvcmNlKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgaWYgKCh5aWVsZCBpb1V0aWwubHN0YXQoc3JjRmlsZSkpLmlzU3ltYm9saWNMaW5rKCkpIHtcbiAgICAgICAgICAgIC8vIHVubGluay9yZS1saW5rIGl0XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHlpZWxkIGlvVXRpbC5sc3RhdChkZXN0RmlsZSk7XG4gICAgICAgICAgICAgICAgeWllbGQgaW9VdGlsLnVubGluayhkZXN0RmlsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIC8vIFRyeSB0byBvdmVycmlkZSBmaWxlIHBlcm1pc3Npb25cbiAgICAgICAgICAgICAgICBpZiAoZS5jb2RlID09PSAnRVBFUk0nKSB7XG4gICAgICAgICAgICAgICAgICAgIHlpZWxkIGlvVXRpbC5jaG1vZChkZXN0RmlsZSwgJzA2NjYnKTtcbiAgICAgICAgICAgICAgICAgICAgeWllbGQgaW9VdGlsLnVubGluayhkZXN0RmlsZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIG90aGVyIGVycm9ycyA9IGl0IGRvZXNuJ3QgZXhpc3QsIG5vIHdvcmsgdG8gZG9cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIENvcHkgb3ZlciBzeW1saW5rXG4gICAgICAgICAgICBjb25zdCBzeW1saW5rRnVsbCA9IHlpZWxkIGlvVXRpbC5yZWFkbGluayhzcmNGaWxlKTtcbiAgICAgICAgICAgIHlpZWxkIGlvVXRpbC5zeW1saW5rKHN5bWxpbmtGdWxsLCBkZXN0RmlsZSwgaW9VdGlsLklTX1dJTkRPV1MgPyAnanVuY3Rpb24nIDogbnVsbCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoISh5aWVsZCBpb1V0aWwuZXhpc3RzKGRlc3RGaWxlKSkgfHwgZm9yY2UpIHtcbiAgICAgICAgICAgIHlpZWxkIGlvVXRpbC5jb3B5RmlsZShzcmNGaWxlLCBkZXN0RmlsZSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlvLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjb3JlID0gcmVxdWlyZShcIkBhY3Rpb25zL2NvcmVcIik7XG5jb25zdCBpbyA9IHJlcXVpcmUoXCJAYWN0aW9ucy9pb1wiKTtcbmNvbnN0IGZzID0gcmVxdWlyZShcImZzXCIpO1xuY29uc3Qgb3MgPSByZXF1aXJlKFwib3NcIik7XG5jb25zdCBwYXRoID0gcmVxdWlyZShcInBhdGhcIik7XG5jb25zdCBodHRwbSA9IHJlcXVpcmUoXCJ0eXBlZC1yZXN0LWNsaWVudC9IdHRwQ2xpZW50XCIpO1xuY29uc3Qgc2VtdmVyID0gcmVxdWlyZShcInNlbXZlclwiKTtcbmNvbnN0IHV1aWRWNCA9IHJlcXVpcmUoXCJ1dWlkL3Y0XCIpO1xuY29uc3QgZXhlY18xID0gcmVxdWlyZShcIkBhY3Rpb25zL2V4ZWMvbGliL2V4ZWNcIik7XG5jb25zdCBhc3NlcnRfMSA9IHJlcXVpcmUoXCJhc3NlcnRcIik7XG5jbGFzcyBIVFRQRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAgY29uc3RydWN0b3IoaHR0cFN0YXR1c0NvZGUpIHtcbiAgICAgICAgc3VwZXIoYFVuZXhwZWN0ZWQgSFRUUCByZXNwb25zZTogJHtodHRwU3RhdHVzQ29kZX1gKTtcbiAgICAgICAgdGhpcy5odHRwU3RhdHVzQ29kZSA9IGh0dHBTdGF0dXNDb2RlO1xuICAgICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcywgbmV3LnRhcmdldC5wcm90b3R5cGUpO1xuICAgIH1cbn1cbmV4cG9ydHMuSFRUUEVycm9yID0gSFRUUEVycm9yO1xuY29uc3QgSVNfV0lORE9XUyA9IHByb2Nlc3MucGxhdGZvcm0gPT09ICd3aW4zMic7XG5jb25zdCB1c2VyQWdlbnQgPSAnYWN0aW9ucy90b29sLWNhY2hlJztcbi8vIE9uIGxvYWQgZ3JhYiB0ZW1wIGRpcmVjdG9yeSBhbmQgY2FjaGUgZGlyZWN0b3J5IGFuZCByZW1vdmUgdGhlbSBmcm9tIGVudiAoY3VycmVudGx5IGRvbid0IHdhbnQgdG8gZXhwb3NlIHRoaXMpXG5sZXQgdGVtcERpcmVjdG9yeSA9IHByb2Nlc3MuZW52WydSVU5ORVJfVEVNUCddIHx8ICcnO1xubGV0IGNhY2hlUm9vdCA9IHByb2Nlc3MuZW52WydSVU5ORVJfVE9PTF9DQUNIRSddIHx8ICcnO1xuLy8gSWYgZGlyZWN0b3JpZXMgbm90IGZvdW5kLCBwbGFjZSB0aGVtIGluIGNvbW1vbiB0ZW1wIGxvY2F0aW9uc1xuaWYgKCF0ZW1wRGlyZWN0b3J5IHx8ICFjYWNoZVJvb3QpIHtcbiAgICBsZXQgYmFzZUxvY2F0aW9uO1xuICAgIGlmIChJU19XSU5ET1dTKSB7XG4gICAgICAgIC8vIE9uIHdpbmRvd3MgdXNlIHRoZSBVU0VSUFJPRklMRSBlbnYgdmFyaWFibGVcbiAgICAgICAgYmFzZUxvY2F0aW9uID0gcHJvY2Vzcy5lbnZbJ1VTRVJQUk9GSUxFJ10gfHwgJ0M6XFxcXCc7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpZiAocHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ2RhcndpbicpIHtcbiAgICAgICAgICAgIGJhc2VMb2NhdGlvbiA9ICcvVXNlcnMnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYmFzZUxvY2F0aW9uID0gJy9ob21lJztcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoIXRlbXBEaXJlY3RvcnkpIHtcbiAgICAgICAgdGVtcERpcmVjdG9yeSA9IHBhdGguam9pbihiYXNlTG9jYXRpb24sICdhY3Rpb25zJywgJ3RlbXAnKTtcbiAgICB9XG4gICAgaWYgKCFjYWNoZVJvb3QpIHtcbiAgICAgICAgY2FjaGVSb290ID0gcGF0aC5qb2luKGJhc2VMb2NhdGlvbiwgJ2FjdGlvbnMnLCAnY2FjaGUnKTtcbiAgICB9XG59XG4vKipcbiAqIERvd25sb2FkIGEgdG9vbCBmcm9tIGFuIHVybCBhbmQgc3RyZWFtIGl0IGludG8gYSBmaWxlXG4gKlxuICogQHBhcmFtIHVybCAgICAgICB1cmwgb2YgdG9vbCB0byBkb3dubG9hZFxuICogQHJldHVybnMgICAgICAgICBwYXRoIHRvIGRvd25sb2FkZWQgdG9vbFxuICovXG5mdW5jdGlvbiBkb3dubG9hZFRvb2wodXJsKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgLy8gV3JhcCBpbiBhIHByb21pc2Ugc28gdGhhdCB3ZSBjYW4gcmVzb2x2ZSBmcm9tIHdpdGhpbiBzdHJlYW0gY2FsbGJhY2tzXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGh0dHAgPSBuZXcgaHR0cG0uSHR0cENsaWVudCh1c2VyQWdlbnQsIFtdLCB7XG4gICAgICAgICAgICAgICAgICAgIGFsbG93UmV0cmllczogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgbWF4UmV0cmllczogM1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRlc3RQYXRoID0gcGF0aC5qb2luKHRlbXBEaXJlY3RvcnksIHV1aWRWNCgpKTtcbiAgICAgICAgICAgICAgICB5aWVsZCBpby5ta2RpclAodGVtcERpcmVjdG9yeSk7XG4gICAgICAgICAgICAgICAgY29yZS5kZWJ1ZyhgRG93bmxvYWRpbmcgJHt1cmx9YCk7XG4gICAgICAgICAgICAgICAgY29yZS5kZWJ1ZyhgRG93bmxvYWRpbmcgJHtkZXN0UGF0aH1gKTtcbiAgICAgICAgICAgICAgICBpZiAoZnMuZXhpc3RzU3luYyhkZXN0UGF0aCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBEZXN0aW5hdGlvbiBmaWxlIHBhdGggJHtkZXN0UGF0aH0gYWxyZWFkeSBleGlzdHNgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSB5aWVsZCBodHRwLmdldCh1cmwpO1xuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5tZXNzYWdlLnN0YXR1c0NvZGUgIT09IDIwMCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBlcnIgPSBuZXcgSFRUUEVycm9yKHJlc3BvbnNlLm1lc3NhZ2Uuc3RhdHVzQ29kZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvcmUuZGVidWcoYEZhaWxlZCB0byBkb3dubG9hZCBmcm9tIFwiJHt1cmx9XCIuIENvZGUoJHtyZXNwb25zZS5tZXNzYWdlLnN0YXR1c0NvZGV9KSBNZXNzYWdlKCR7cmVzcG9uc2UubWVzc2FnZS5zdGF0dXNNZXNzYWdlfSlgKTtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlID0gZnMuY3JlYXRlV3JpdGVTdHJlYW0oZGVzdFBhdGgpO1xuICAgICAgICAgICAgICAgIGZpbGUub24oJ29wZW4nLCAoKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdHJlYW0gPSByZXNwb25zZS5tZXNzYWdlLnBpcGUoZmlsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJlYW0ub24oJ2Nsb3NlJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvcmUuZGVidWcoJ2Rvd25sb2FkIGNvbXBsZXRlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShkZXN0UGF0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb3JlLmRlYnVnKGBGYWlsZWQgdG8gZG93bmxvYWQgZnJvbSBcIiR7dXJsfVwiLiBDb2RlKCR7cmVzcG9uc2UubWVzc2FnZS5zdGF0dXNDb2RlfSkgTWVzc2FnZSgke3Jlc3BvbnNlLm1lc3NhZ2Uuc3RhdHVzTWVzc2FnZX0pYCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICBmaWxlLm9uKCdlcnJvcicsIGVyciA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGUuZW5kKCk7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSk7XG4gICAgfSk7XG59XG5leHBvcnRzLmRvd25sb2FkVG9vbCA9IGRvd25sb2FkVG9vbDtcbi8qKlxuICogRXh0cmFjdCBhIC43eiBmaWxlXG4gKlxuICogQHBhcmFtIGZpbGUgICAgIHBhdGggdG8gdGhlIC43eiBmaWxlXG4gKiBAcGFyYW0gZGVzdCAgICAgZGVzdGluYXRpb24gZGlyZWN0b3J5LiBPcHRpb25hbC5cbiAqIEBwYXJhbSBfN3pQYXRoICBwYXRoIHRvIDd6ci5leGUuIE9wdGlvbmFsLCBmb3IgbG9uZyBwYXRoIHN1cHBvcnQuIE1vc3QgLjd6IGFyY2hpdmVzIGRvIG5vdCBoYXZlIHRoaXNcbiAqIHByb2JsZW0uIElmIHlvdXIgLjd6IGFyY2hpdmUgY29udGFpbnMgdmVyeSBsb25nIHBhdGhzLCB5b3UgY2FuIHBhc3MgdGhlIHBhdGggdG8gN3pyLmV4ZSB3aGljaCB3aWxsXG4gKiBncmFjZWZ1bGx5IGhhbmRsZSBsb25nIHBhdGhzLiBCeSBkZWZhdWx0IDd6ZGVjLmV4ZSBpcyB1c2VkIGJlY2F1c2UgaXQgaXMgYSB2ZXJ5IHNtYWxsIHByb2dyYW0gYW5kIGlzXG4gKiBidW5kbGVkIHdpdGggdGhlIHRvb2wgbGliLiBIb3dldmVyIGl0IGRvZXMgbm90IHN1cHBvcnQgbG9uZyBwYXRocy4gN3pyLmV4ZSBpcyB0aGUgcmVkdWNlZCBjb21tYW5kIGxpbmVcbiAqIGludGVyZmFjZSwgaXQgaXMgc21hbGxlciB0aGFuIHRoZSBmdWxsIGNvbW1hbmQgbGluZSBpbnRlcmZhY2UsIGFuZCBpdCBkb2VzIHN1cHBvcnQgbG9uZyBwYXRocy4gQXQgdGhlXG4gKiB0aW1lIG9mIHRoaXMgd3JpdGluZywgaXQgaXMgZnJlZWx5IGF2YWlsYWJsZSBmcm9tIHRoZSBMWk1BIFNESyB0aGF0IGlzIGF2YWlsYWJsZSBvbiB0aGUgN3ppcCB3ZWJzaXRlLlxuICogQmUgc3VyZSB0byBjaGVjayB0aGUgY3VycmVudCBsaWNlbnNlIGFncmVlbWVudC4gSWYgN3pyLmV4ZSBpcyBidW5kbGVkIHdpdGggeW91ciBhY3Rpb24sIHRoZW4gdGhlIHBhdGhcbiAqIHRvIDd6ci5leGUgY2FuIGJlIHBhc3MgdG8gdGhpcyBmdW5jdGlvbi5cbiAqIEByZXR1cm5zICAgICAgICBwYXRoIHRvIHRoZSBkZXN0aW5hdGlvbiBkaXJlY3RvcnlcbiAqL1xuZnVuY3Rpb24gZXh0cmFjdDd6KGZpbGUsIGRlc3QsIF83elBhdGgpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBhc3NlcnRfMS5vayhJU19XSU5ET1dTLCAnZXh0cmFjdDd6KCkgbm90IHN1cHBvcnRlZCBvbiBjdXJyZW50IE9TJyk7XG4gICAgICAgIGFzc2VydF8xLm9rKGZpbGUsICdwYXJhbWV0ZXIgXCJmaWxlXCIgaXMgcmVxdWlyZWQnKTtcbiAgICAgICAgZGVzdCA9IGRlc3QgfHwgKHlpZWxkIF9jcmVhdGVFeHRyYWN0Rm9sZGVyKGRlc3QpKTtcbiAgICAgICAgY29uc3Qgb3JpZ2luYWxDd2QgPSBwcm9jZXNzLmN3ZCgpO1xuICAgICAgICBwcm9jZXNzLmNoZGlyKGRlc3QpO1xuICAgICAgICBpZiAoXzd6UGF0aCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCBhcmdzID0gW1xuICAgICAgICAgICAgICAgICAgICAneCcsXG4gICAgICAgICAgICAgICAgICAgICctYmIxJyxcbiAgICAgICAgICAgICAgICAgICAgJy1iZCcsXG4gICAgICAgICAgICAgICAgICAgICctc2NjVVRGLTgnLFxuICAgICAgICAgICAgICAgICAgICBmaWxlXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgICAgICBzaWxlbnQ6IHRydWVcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHlpZWxkIGV4ZWNfMS5leGVjKGBcIiR7Xzd6UGF0aH1cImAsIGFyZ3MsIG9wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgcHJvY2Vzcy5jaGRpcihvcmlnaW5hbEN3ZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBlc2NhcGVkU2NyaXB0ID0gcGF0aFxuICAgICAgICAgICAgICAgIC5qb2luKF9fZGlybmFtZSwgJy4uJywgJ3NjcmlwdHMnLCAnSW52b2tlLTd6ZGVjLnBzMScpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoLycvZywgXCInJ1wiKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cInxcXG58XFxyL2csICcnKTsgLy8gZG91YmxlLXVwIHNpbmdsZSBxdW90ZXMsIHJlbW92ZSBkb3VibGUgcXVvdGVzIGFuZCBuZXdsaW5lc1xuICAgICAgICAgICAgY29uc3QgZXNjYXBlZEZpbGUgPSBmaWxlLnJlcGxhY2UoLycvZywgXCInJ1wiKS5yZXBsYWNlKC9cInxcXG58XFxyL2csICcnKTtcbiAgICAgICAgICAgIGNvbnN0IGVzY2FwZWRUYXJnZXQgPSBkZXN0LnJlcGxhY2UoLycvZywgXCInJ1wiKS5yZXBsYWNlKC9cInxcXG58XFxyL2csICcnKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbW1hbmQgPSBgJiAnJHtlc2NhcGVkU2NyaXB0fScgLVNvdXJjZSAnJHtlc2NhcGVkRmlsZX0nIC1UYXJnZXQgJyR7ZXNjYXBlZFRhcmdldH0nYDtcbiAgICAgICAgICAgIGNvbnN0IGFyZ3MgPSBbXG4gICAgICAgICAgICAgICAgJy1Ob0xvZ28nLFxuICAgICAgICAgICAgICAgICctU3RhJyxcbiAgICAgICAgICAgICAgICAnLU5vUHJvZmlsZScsXG4gICAgICAgICAgICAgICAgJy1Ob25JbnRlcmFjdGl2ZScsXG4gICAgICAgICAgICAgICAgJy1FeGVjdXRpb25Qb2xpY3knLFxuICAgICAgICAgICAgICAgICdVbnJlc3RyaWN0ZWQnLFxuICAgICAgICAgICAgICAgICctQ29tbWFuZCcsXG4gICAgICAgICAgICAgICAgY29tbWFuZFxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgc2lsZW50OiB0cnVlXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwb3dlcnNoZWxsUGF0aCA9IHlpZWxkIGlvLndoaWNoKCdwb3dlcnNoZWxsJywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgeWllbGQgZXhlY18xLmV4ZWMoYFwiJHtwb3dlcnNoZWxsUGF0aH1cImAsIGFyZ3MsIG9wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgcHJvY2Vzcy5jaGRpcihvcmlnaW5hbEN3ZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRlc3Q7XG4gICAgfSk7XG59XG5leHBvcnRzLmV4dHJhY3Q3eiA9IGV4dHJhY3Q3ejtcbi8qKlxuICogRXh0cmFjdCBhIHRhclxuICpcbiAqIEBwYXJhbSBmaWxlICAgICBwYXRoIHRvIHRoZSB0YXJcbiAqIEBwYXJhbSBkZXN0ICAgICBkZXN0aW5hdGlvbiBkaXJlY3RvcnkuIE9wdGlvbmFsLlxuICogQHBhcmFtIGZsYWdzICAgIGZsYWdzIGZvciB0aGUgdGFyLiBPcHRpb25hbC5cbiAqIEByZXR1cm5zICAgICAgICBwYXRoIHRvIHRoZSBkZXN0aW5hdGlvbiBkaXJlY3RvcnlcbiAqL1xuZnVuY3Rpb24gZXh0cmFjdFRhcihmaWxlLCBkZXN0LCBmbGFncyA9ICd4eicpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBpZiAoIWZpbGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInBhcmFtZXRlciAnZmlsZScgaXMgcmVxdWlyZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgZGVzdCA9IGRlc3QgfHwgKHlpZWxkIF9jcmVhdGVFeHRyYWN0Rm9sZGVyKGRlc3QpKTtcbiAgICAgICAgY29uc3QgdGFyUGF0aCA9IHlpZWxkIGlvLndoaWNoKCd0YXInLCB0cnVlKTtcbiAgICAgICAgeWllbGQgZXhlY18xLmV4ZWMoYFwiJHt0YXJQYXRofVwiYCwgW2ZsYWdzLCAnLUMnLCBkZXN0LCAnLWYnLCBmaWxlXSk7XG4gICAgICAgIHJldHVybiBkZXN0O1xuICAgIH0pO1xufVxuZXhwb3J0cy5leHRyYWN0VGFyID0gZXh0cmFjdFRhcjtcbi8qKlxuICogRXh0cmFjdCBhIHppcFxuICpcbiAqIEBwYXJhbSBmaWxlICAgICBwYXRoIHRvIHRoZSB6aXBcbiAqIEBwYXJhbSBkZXN0ICAgICBkZXN0aW5hdGlvbiBkaXJlY3RvcnkuIE9wdGlvbmFsLlxuICogQHJldHVybnMgICAgICAgIHBhdGggdG8gdGhlIGRlc3RpbmF0aW9uIGRpcmVjdG9yeVxuICovXG5mdW5jdGlvbiBleHRyYWN0WmlwKGZpbGUsIGRlc3QpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBpZiAoIWZpbGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInBhcmFtZXRlciAnZmlsZScgaXMgcmVxdWlyZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgZGVzdCA9IGRlc3QgfHwgKHlpZWxkIF9jcmVhdGVFeHRyYWN0Rm9sZGVyKGRlc3QpKTtcbiAgICAgICAgaWYgKElTX1dJTkRPV1MpIHtcbiAgICAgICAgICAgIHlpZWxkIGV4dHJhY3RaaXBXaW4oZmlsZSwgZGVzdCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB5aWVsZCBleHRyYWN0WmlwTml4KGZpbGUsIGRlc3QpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkZXN0O1xuICAgIH0pO1xufVxuZXhwb3J0cy5leHRyYWN0WmlwID0gZXh0cmFjdFppcDtcbmZ1bmN0aW9uIGV4dHJhY3RaaXBXaW4oZmlsZSwgZGVzdCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIC8vIGJ1aWxkIHRoZSBwb3dlcnNoZWxsIGNvbW1hbmRcbiAgICAgICAgY29uc3QgZXNjYXBlZEZpbGUgPSBmaWxlLnJlcGxhY2UoLycvZywgXCInJ1wiKS5yZXBsYWNlKC9cInxcXG58XFxyL2csICcnKTsgLy8gZG91YmxlLXVwIHNpbmdsZSBxdW90ZXMsIHJlbW92ZSBkb3VibGUgcXVvdGVzIGFuZCBuZXdsaW5lc1xuICAgICAgICBjb25zdCBlc2NhcGVkRGVzdCA9IGRlc3QucmVwbGFjZSgvJy9nLCBcIicnXCIpLnJlcGxhY2UoL1wifFxcbnxcXHIvZywgJycpO1xuICAgICAgICBjb25zdCBjb21tYW5kID0gYCRFcnJvckFjdGlvblByZWZlcmVuY2UgPSAnU3RvcCcgOyB0cnkgeyBBZGQtVHlwZSAtQXNzZW1ibHlOYW1lIFN5c3RlbS5JTy5Db21wcmVzc2lvbi5GaWxlU3lzdGVtIH0gY2F0Y2ggeyB9IDsgW1N5c3RlbS5JTy5Db21wcmVzc2lvbi5aaXBGaWxlXTo6RXh0cmFjdFRvRGlyZWN0b3J5KCcke2VzY2FwZWRGaWxlfScsICcke2VzY2FwZWREZXN0fScpYDtcbiAgICAgICAgLy8gcnVuIHBvd2Vyc2hlbGxcbiAgICAgICAgY29uc3QgcG93ZXJzaGVsbFBhdGggPSB5aWVsZCBpby53aGljaCgncG93ZXJzaGVsbCcpO1xuICAgICAgICBjb25zdCBhcmdzID0gW1xuICAgICAgICAgICAgJy1Ob0xvZ28nLFxuICAgICAgICAgICAgJy1TdGEnLFxuICAgICAgICAgICAgJy1Ob1Byb2ZpbGUnLFxuICAgICAgICAgICAgJy1Ob25JbnRlcmFjdGl2ZScsXG4gICAgICAgICAgICAnLUV4ZWN1dGlvblBvbGljeScsXG4gICAgICAgICAgICAnVW5yZXN0cmljdGVkJyxcbiAgICAgICAgICAgICctQ29tbWFuZCcsXG4gICAgICAgICAgICBjb21tYW5kXG4gICAgICAgIF07XG4gICAgICAgIHlpZWxkIGV4ZWNfMS5leGVjKGBcIiR7cG93ZXJzaGVsbFBhdGh9XCJgLCBhcmdzKTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGV4dHJhY3RaaXBOaXgoZmlsZSwgZGVzdCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnN0IHVuemlwUGF0aCA9IHlpZWxkIGlvLndoaWNoKCd1bnppcCcpO1xuICAgICAgICB5aWVsZCBleGVjXzEuZXhlYyhgXCIke3VuemlwUGF0aH1cImAsIFtmaWxlXSwgeyBjd2Q6IGRlc3QgfSk7XG4gICAgfSk7XG59XG4vKipcbiAqIENhY2hlcyBhIGRpcmVjdG9yeSBhbmQgaW5zdGFsbHMgaXQgaW50byB0aGUgdG9vbCBjYWNoZURpclxuICpcbiAqIEBwYXJhbSBzb3VyY2VEaXIgICAgdGhlIGRpcmVjdG9yeSB0byBjYWNoZSBpbnRvIHRvb2xzXG4gKiBAcGFyYW0gdG9vbCAgICAgICAgICB0b29sIG5hbWVcbiAqIEBwYXJhbSB2ZXJzaW9uICAgICAgIHZlcnNpb24gb2YgdGhlIHRvb2wuICBzZW12ZXIgZm9ybWF0XG4gKiBAcGFyYW0gYXJjaCAgICAgICAgICBhcmNoaXRlY3R1cmUgb2YgdGhlIHRvb2wuICBPcHRpb25hbC4gIERlZmF1bHRzIHRvIG1hY2hpbmUgYXJjaGl0ZWN0dXJlXG4gKi9cbmZ1bmN0aW9uIGNhY2hlRGlyKHNvdXJjZURpciwgdG9vbCwgdmVyc2lvbiwgYXJjaCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHZlcnNpb24gPSBzZW12ZXIuY2xlYW4odmVyc2lvbikgfHwgdmVyc2lvbjtcbiAgICAgICAgYXJjaCA9IGFyY2ggfHwgb3MuYXJjaCgpO1xuICAgICAgICBjb3JlLmRlYnVnKGBDYWNoaW5nIHRvb2wgJHt0b29sfSAke3ZlcnNpb259ICR7YXJjaH1gKTtcbiAgICAgICAgY29yZS5kZWJ1Zyhgc291cmNlIGRpcjogJHtzb3VyY2VEaXJ9YCk7XG4gICAgICAgIGlmICghZnMuc3RhdFN5bmMoc291cmNlRGlyKS5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3NvdXJjZURpciBpcyBub3QgYSBkaXJlY3RvcnknKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBDcmVhdGUgdGhlIHRvb2wgZGlyXG4gICAgICAgIGNvbnN0IGRlc3RQYXRoID0geWllbGQgX2NyZWF0ZVRvb2xQYXRoKHRvb2wsIHZlcnNpb24sIGFyY2gpO1xuICAgICAgICAvLyBjb3B5IGVhY2ggY2hpbGQgaXRlbS4gZG8gbm90IG1vdmUuIG1vdmUgY2FuIGZhaWwgb24gV2luZG93c1xuICAgICAgICAvLyBkdWUgdG8gYW50aS12aXJ1cyBzb2Z0d2FyZSBoYXZpbmcgYW4gb3BlbiBoYW5kbGUgb24gYSBmaWxlLlxuICAgICAgICBmb3IgKGNvbnN0IGl0ZW1OYW1lIG9mIGZzLnJlYWRkaXJTeW5jKHNvdXJjZURpcikpIHtcbiAgICAgICAgICAgIGNvbnN0IHMgPSBwYXRoLmpvaW4oc291cmNlRGlyLCBpdGVtTmFtZSk7XG4gICAgICAgICAgICB5aWVsZCBpby5jcChzLCBkZXN0UGF0aCwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gd3JpdGUgLmNvbXBsZXRlXG4gICAgICAgIF9jb21wbGV0ZVRvb2xQYXRoKHRvb2wsIHZlcnNpb24sIGFyY2gpO1xuICAgICAgICByZXR1cm4gZGVzdFBhdGg7XG4gICAgfSk7XG59XG5leHBvcnRzLmNhY2hlRGlyID0gY2FjaGVEaXI7XG4vKipcbiAqIENhY2hlcyBhIGRvd25sb2FkZWQgZmlsZSAoR1VJRCkgYW5kIGluc3RhbGxzIGl0XG4gKiBpbnRvIHRoZSB0b29sIGNhY2hlIHdpdGggYSBnaXZlbiB0YXJnZXROYW1lXG4gKlxuICogQHBhcmFtIHNvdXJjZUZpbGUgICAgdGhlIGZpbGUgdG8gY2FjaGUgaW50byB0b29scy4gIFR5cGljYWxseSBhIHJlc3VsdCBvZiBkb3dubG9hZFRvb2wgd2hpY2ggaXMgYSBndWlkLlxuICogQHBhcmFtIHRhcmdldEZpbGUgICAgdGhlIG5hbWUgb2YgdGhlIGZpbGUgbmFtZSBpbiB0aGUgdG9vbHMgZGlyZWN0b3J5XG4gKiBAcGFyYW0gdG9vbCAgICAgICAgICB0b29sIG5hbWVcbiAqIEBwYXJhbSB2ZXJzaW9uICAgICAgIHZlcnNpb24gb2YgdGhlIHRvb2wuICBzZW12ZXIgZm9ybWF0XG4gKiBAcGFyYW0gYXJjaCAgICAgICAgICBhcmNoaXRlY3R1cmUgb2YgdGhlIHRvb2wuICBPcHRpb25hbC4gIERlZmF1bHRzIHRvIG1hY2hpbmUgYXJjaGl0ZWN0dXJlXG4gKi9cbmZ1bmN0aW9uIGNhY2hlRmlsZShzb3VyY2VGaWxlLCB0YXJnZXRGaWxlLCB0b29sLCB2ZXJzaW9uLCBhcmNoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgdmVyc2lvbiA9IHNlbXZlci5jbGVhbih2ZXJzaW9uKSB8fCB2ZXJzaW9uO1xuICAgICAgICBhcmNoID0gYXJjaCB8fCBvcy5hcmNoKCk7XG4gICAgICAgIGNvcmUuZGVidWcoYENhY2hpbmcgdG9vbCAke3Rvb2x9ICR7dmVyc2lvbn0gJHthcmNofWApO1xuICAgICAgICBjb3JlLmRlYnVnKGBzb3VyY2UgZmlsZTogJHtzb3VyY2VGaWxlfWApO1xuICAgICAgICBpZiAoIWZzLnN0YXRTeW5jKHNvdXJjZUZpbGUpLmlzRmlsZSgpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3NvdXJjZUZpbGUgaXMgbm90IGEgZmlsZScpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgdG9vbCBkaXJcbiAgICAgICAgY29uc3QgZGVzdEZvbGRlciA9IHlpZWxkIF9jcmVhdGVUb29sUGF0aCh0b29sLCB2ZXJzaW9uLCBhcmNoKTtcbiAgICAgICAgLy8gY29weSBpbnN0ZWFkIG9mIG1vdmUuIG1vdmUgY2FuIGZhaWwgb24gV2luZG93cyBkdWUgdG9cbiAgICAgICAgLy8gYW50aS12aXJ1cyBzb2Z0d2FyZSBoYXZpbmcgYW4gb3BlbiBoYW5kbGUgb24gYSBmaWxlLlxuICAgICAgICBjb25zdCBkZXN0UGF0aCA9IHBhdGguam9pbihkZXN0Rm9sZGVyLCB0YXJnZXRGaWxlKTtcbiAgICAgICAgY29yZS5kZWJ1ZyhgZGVzdGluYXRpb24gZmlsZSAke2Rlc3RQYXRofWApO1xuICAgICAgICB5aWVsZCBpby5jcChzb3VyY2VGaWxlLCBkZXN0UGF0aCk7XG4gICAgICAgIC8vIHdyaXRlIC5jb21wbGV0ZVxuICAgICAgICBfY29tcGxldGVUb29sUGF0aCh0b29sLCB2ZXJzaW9uLCBhcmNoKTtcbiAgICAgICAgcmV0dXJuIGRlc3RGb2xkZXI7XG4gICAgfSk7XG59XG5leHBvcnRzLmNhY2hlRmlsZSA9IGNhY2hlRmlsZTtcbi8qKlxuICogRmluZHMgdGhlIHBhdGggdG8gYSB0b29sIHZlcnNpb24gaW4gdGhlIGxvY2FsIGluc3RhbGxlZCB0b29sIGNhY2hlXG4gKlxuICogQHBhcmFtIHRvb2xOYW1lICAgICAgbmFtZSBvZiB0aGUgdG9vbFxuICogQHBhcmFtIHZlcnNpb25TcGVjICAgdmVyc2lvbiBvZiB0aGUgdG9vbFxuICogQHBhcmFtIGFyY2ggICAgICAgICAgb3B0aW9uYWwgYXJjaC4gIGRlZmF1bHRzIHRvIGFyY2ggb2YgY29tcHV0ZXJcbiAqL1xuZnVuY3Rpb24gZmluZCh0b29sTmFtZSwgdmVyc2lvblNwZWMsIGFyY2gpIHtcbiAgICBpZiAoIXRvb2xOYW1lKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndG9vbE5hbWUgcGFyYW1ldGVyIGlzIHJlcXVpcmVkJyk7XG4gICAgfVxuICAgIGlmICghdmVyc2lvblNwZWMpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd2ZXJzaW9uU3BlYyBwYXJhbWV0ZXIgaXMgcmVxdWlyZWQnKTtcbiAgICB9XG4gICAgYXJjaCA9IGFyY2ggfHwgb3MuYXJjaCgpO1xuICAgIC8vIGF0dGVtcHQgdG8gcmVzb2x2ZSBhbiBleHBsaWNpdCB2ZXJzaW9uXG4gICAgaWYgKCFfaXNFeHBsaWNpdFZlcnNpb24odmVyc2lvblNwZWMpKSB7XG4gICAgICAgIGNvbnN0IGxvY2FsVmVyc2lvbnMgPSBmaW5kQWxsVmVyc2lvbnModG9vbE5hbWUsIGFyY2gpO1xuICAgICAgICBjb25zdCBtYXRjaCA9IF9ldmFsdWF0ZVZlcnNpb25zKGxvY2FsVmVyc2lvbnMsIHZlcnNpb25TcGVjKTtcbiAgICAgICAgdmVyc2lvblNwZWMgPSBtYXRjaDtcbiAgICB9XG4gICAgLy8gY2hlY2sgZm9yIHRoZSBleHBsaWNpdCB2ZXJzaW9uIGluIHRoZSBjYWNoZVxuICAgIGxldCB0b29sUGF0aCA9ICcnO1xuICAgIGlmICh2ZXJzaW9uU3BlYykge1xuICAgICAgICB2ZXJzaW9uU3BlYyA9IHNlbXZlci5jbGVhbih2ZXJzaW9uU3BlYykgfHwgJyc7XG4gICAgICAgIGNvbnN0IGNhY2hlUGF0aCA9IHBhdGguam9pbihjYWNoZVJvb3QsIHRvb2xOYW1lLCB2ZXJzaW9uU3BlYywgYXJjaCk7XG4gICAgICAgIGNvcmUuZGVidWcoYGNoZWNraW5nIGNhY2hlOiAke2NhY2hlUGF0aH1gKTtcbiAgICAgICAgaWYgKGZzLmV4aXN0c1N5bmMoY2FjaGVQYXRoKSAmJiBmcy5leGlzdHNTeW5jKGAke2NhY2hlUGF0aH0uY29tcGxldGVgKSkge1xuICAgICAgICAgICAgY29yZS5kZWJ1ZyhgRm91bmQgdG9vbCBpbiBjYWNoZSAke3Rvb2xOYW1lfSAke3ZlcnNpb25TcGVjfSAke2FyY2h9YCk7XG4gICAgICAgICAgICB0b29sUGF0aCA9IGNhY2hlUGF0aDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvcmUuZGVidWcoJ25vdCBmb3VuZCcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0b29sUGF0aDtcbn1cbmV4cG9ydHMuZmluZCA9IGZpbmQ7XG4vKipcbiAqIEZpbmRzIHRoZSBwYXRocyB0byBhbGwgdmVyc2lvbnMgb2YgYSB0b29sIHRoYXQgYXJlIGluc3RhbGxlZCBpbiB0aGUgbG9jYWwgdG9vbCBjYWNoZVxuICpcbiAqIEBwYXJhbSB0b29sTmFtZSAgbmFtZSBvZiB0aGUgdG9vbFxuICogQHBhcmFtIGFyY2ggICAgICBvcHRpb25hbCBhcmNoLiAgZGVmYXVsdHMgdG8gYXJjaCBvZiBjb21wdXRlclxuICovXG5mdW5jdGlvbiBmaW5kQWxsVmVyc2lvbnModG9vbE5hbWUsIGFyY2gpIHtcbiAgICBjb25zdCB2ZXJzaW9ucyA9IFtdO1xuICAgIGFyY2ggPSBhcmNoIHx8IG9zLmFyY2goKTtcbiAgICBjb25zdCB0b29sUGF0aCA9IHBhdGguam9pbihjYWNoZVJvb3QsIHRvb2xOYW1lKTtcbiAgICBpZiAoZnMuZXhpc3RzU3luYyh0b29sUGF0aCkpIHtcbiAgICAgICAgY29uc3QgY2hpbGRyZW4gPSBmcy5yZWFkZGlyU3luYyh0b29sUGF0aCk7XG4gICAgICAgIGZvciAoY29uc3QgY2hpbGQgb2YgY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGlmIChfaXNFeHBsaWNpdFZlcnNpb24oY2hpbGQpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZnVsbFBhdGggPSBwYXRoLmpvaW4odG9vbFBhdGgsIGNoaWxkLCBhcmNoIHx8ICcnKTtcbiAgICAgICAgICAgICAgICBpZiAoZnMuZXhpc3RzU3luYyhmdWxsUGF0aCkgJiYgZnMuZXhpc3RzU3luYyhgJHtmdWxsUGF0aH0uY29tcGxldGVgKSkge1xuICAgICAgICAgICAgICAgICAgICB2ZXJzaW9ucy5wdXNoKGNoaWxkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHZlcnNpb25zO1xufVxuZXhwb3J0cy5maW5kQWxsVmVyc2lvbnMgPSBmaW5kQWxsVmVyc2lvbnM7XG5mdW5jdGlvbiBfY3JlYXRlRXh0cmFjdEZvbGRlcihkZXN0KSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgaWYgKCFkZXN0KSB7XG4gICAgICAgICAgICAvLyBjcmVhdGUgYSB0ZW1wIGRpclxuICAgICAgICAgICAgZGVzdCA9IHBhdGguam9pbih0ZW1wRGlyZWN0b3J5LCB1dWlkVjQoKSk7XG4gICAgICAgIH1cbiAgICAgICAgeWllbGQgaW8ubWtkaXJQKGRlc3QpO1xuICAgICAgICByZXR1cm4gZGVzdDtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIF9jcmVhdGVUb29sUGF0aCh0b29sLCB2ZXJzaW9uLCBhcmNoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc3QgZm9sZGVyUGF0aCA9IHBhdGguam9pbihjYWNoZVJvb3QsIHRvb2wsIHNlbXZlci5jbGVhbih2ZXJzaW9uKSB8fCB2ZXJzaW9uLCBhcmNoIHx8ICcnKTtcbiAgICAgICAgY29yZS5kZWJ1ZyhgZGVzdGluYXRpb24gJHtmb2xkZXJQYXRofWApO1xuICAgICAgICBjb25zdCBtYXJrZXJQYXRoID0gYCR7Zm9sZGVyUGF0aH0uY29tcGxldGVgO1xuICAgICAgICB5aWVsZCBpby5ybVJGKGZvbGRlclBhdGgpO1xuICAgICAgICB5aWVsZCBpby5ybVJGKG1hcmtlclBhdGgpO1xuICAgICAgICB5aWVsZCBpby5ta2RpclAoZm9sZGVyUGF0aCk7XG4gICAgICAgIHJldHVybiBmb2xkZXJQYXRoO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gX2NvbXBsZXRlVG9vbFBhdGgodG9vbCwgdmVyc2lvbiwgYXJjaCkge1xuICAgIGNvbnN0IGZvbGRlclBhdGggPSBwYXRoLmpvaW4oY2FjaGVSb290LCB0b29sLCBzZW12ZXIuY2xlYW4odmVyc2lvbikgfHwgdmVyc2lvbiwgYXJjaCB8fCAnJyk7XG4gICAgY29uc3QgbWFya2VyUGF0aCA9IGAke2ZvbGRlclBhdGh9LmNvbXBsZXRlYDtcbiAgICBmcy53cml0ZUZpbGVTeW5jKG1hcmtlclBhdGgsICcnKTtcbiAgICBjb3JlLmRlYnVnKCdmaW5pc2hlZCBjYWNoaW5nIHRvb2wnKTtcbn1cbmZ1bmN0aW9uIF9pc0V4cGxpY2l0VmVyc2lvbih2ZXJzaW9uU3BlYykge1xuICAgIGNvbnN0IGMgPSBzZW12ZXIuY2xlYW4odmVyc2lvblNwZWMpIHx8ICcnO1xuICAgIGNvcmUuZGVidWcoYGlzRXhwbGljaXQ6ICR7Y31gKTtcbiAgICBjb25zdCB2YWxpZCA9IHNlbXZlci52YWxpZChjKSAhPSBudWxsO1xuICAgIGNvcmUuZGVidWcoYGV4cGxpY2l0PyAke3ZhbGlkfWApO1xuICAgIHJldHVybiB2YWxpZDtcbn1cbmZ1bmN0aW9uIF9ldmFsdWF0ZVZlcnNpb25zKHZlcnNpb25zLCB2ZXJzaW9uU3BlYykge1xuICAgIGxldCB2ZXJzaW9uID0gJyc7XG4gICAgY29yZS5kZWJ1ZyhgZXZhbHVhdGluZyAke3ZlcnNpb25zLmxlbmd0aH0gdmVyc2lvbnNgKTtcbiAgICB2ZXJzaW9ucyA9IHZlcnNpb25zLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgaWYgKHNlbXZlci5ndChhLCBiKSkge1xuICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH0pO1xuICAgIGZvciAobGV0IGkgPSB2ZXJzaW9ucy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICBjb25zdCBwb3RlbnRpYWwgPSB2ZXJzaW9uc1tpXTtcbiAgICAgICAgY29uc3Qgc2F0aXNmaWVkID0gc2VtdmVyLnNhdGlzZmllcyhwb3RlbnRpYWwsIHZlcnNpb25TcGVjKTtcbiAgICAgICAgaWYgKHNhdGlzZmllZCkge1xuICAgICAgICAgICAgdmVyc2lvbiA9IHBvdGVudGlhbDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmICh2ZXJzaW9uKSB7XG4gICAgICAgIGNvcmUuZGVidWcoYG1hdGNoZWQ6ICR7dmVyc2lvbn1gKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvcmUuZGVidWcoJ21hdGNoIG5vdCBmb3VuZCcpO1xuICAgIH1cbiAgICByZXR1cm4gdmVyc2lvbjtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRvb2wtY2FjaGUuanMubWFwIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gU2VtVmVyXG5cbnZhciBkZWJ1Z1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbmlmICh0eXBlb2YgcHJvY2VzcyA9PT0gJ29iamVjdCcgJiZcbiAgICBwcm9jZXNzLmVudiAmJlxuICAgIHByb2Nlc3MuZW52Lk5PREVfREVCVUcgJiZcbiAgICAvXFxic2VtdmVyXFxiL2kudGVzdChwcm9jZXNzLmVudi5OT0RFX0RFQlVHKSkge1xuICBkZWJ1ZyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMClcbiAgICBhcmdzLnVuc2hpZnQoJ1NFTVZFUicpXG4gICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgYXJncylcbiAgfVxufSBlbHNlIHtcbiAgZGVidWcgPSBmdW5jdGlvbiAoKSB7fVxufVxuXG4vLyBOb3RlOiB0aGlzIGlzIHRoZSBzZW12ZXIub3JnIHZlcnNpb24gb2YgdGhlIHNwZWMgdGhhdCBpdCBpbXBsZW1lbnRzXG4vLyBOb3QgbmVjZXNzYXJpbHkgdGhlIHBhY2thZ2UgdmVyc2lvbiBvZiB0aGlzIGNvZGUuXG5leHBvcnRzLlNFTVZFUl9TUEVDX1ZFUlNJT04gPSAnMi4wLjAnXG5cbnZhciBNQVhfTEVOR1RIID0gMjU2XG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSIHx8XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovIDkwMDcxOTkyNTQ3NDA5OTFcblxuLy8gTWF4IHNhZmUgc2VnbWVudCBsZW5ndGggZm9yIGNvZXJjaW9uLlxudmFyIE1BWF9TQUZFX0NPTVBPTkVOVF9MRU5HVEggPSAxNlxuXG4vLyBUaGUgYWN0dWFsIHJlZ2V4cHMgZ28gb24gZXhwb3J0cy5yZVxudmFyIHJlID0gZXhwb3J0cy5yZSA9IFtdXG52YXIgc3JjID0gZXhwb3J0cy5zcmMgPSBbXVxudmFyIHQgPSBleHBvcnRzLnRva2VucyA9IHt9XG52YXIgUiA9IDBcblxuZnVuY3Rpb24gdG9rIChuKSB7XG4gIHRbbl0gPSBSKytcbn1cblxuLy8gVGhlIGZvbGxvd2luZyBSZWd1bGFyIEV4cHJlc3Npb25zIGNhbiBiZSB1c2VkIGZvciB0b2tlbml6aW5nLFxuLy8gdmFsaWRhdGluZywgYW5kIHBhcnNpbmcgU2VtVmVyIHZlcnNpb24gc3RyaW5ncy5cblxuLy8gIyMgTnVtZXJpYyBJZGVudGlmaWVyXG4vLyBBIHNpbmdsZSBgMGAsIG9yIGEgbm9uLXplcm8gZGlnaXQgZm9sbG93ZWQgYnkgemVybyBvciBtb3JlIGRpZ2l0cy5cblxudG9rKCdOVU1FUklDSURFTlRJRklFUicpXG5zcmNbdC5OVU1FUklDSURFTlRJRklFUl0gPSAnMHxbMS05XVxcXFxkKidcbnRvaygnTlVNRVJJQ0lERU5USUZJRVJMT09TRScpXG5zcmNbdC5OVU1FUklDSURFTlRJRklFUkxPT1NFXSA9ICdbMC05XSsnXG5cbi8vICMjIE5vbi1udW1lcmljIElkZW50aWZpZXJcbi8vIFplcm8gb3IgbW9yZSBkaWdpdHMsIGZvbGxvd2VkIGJ5IGEgbGV0dGVyIG9yIGh5cGhlbiwgYW5kIHRoZW4gemVybyBvclxuLy8gbW9yZSBsZXR0ZXJzLCBkaWdpdHMsIG9yIGh5cGhlbnMuXG5cbnRvaygnTk9OTlVNRVJJQ0lERU5USUZJRVInKVxuc3JjW3QuTk9OTlVNRVJJQ0lERU5USUZJRVJdID0gJ1xcXFxkKlthLXpBLVotXVthLXpBLVowLTktXSonXG5cbi8vICMjIE1haW4gVmVyc2lvblxuLy8gVGhyZWUgZG90LXNlcGFyYXRlZCBudW1lcmljIGlkZW50aWZpZXJzLlxuXG50b2soJ01BSU5WRVJTSU9OJylcbnNyY1t0Lk1BSU5WRVJTSU9OXSA9ICcoJyArIHNyY1t0Lk5VTUVSSUNJREVOVElGSUVSXSArICcpXFxcXC4nICtcbiAgICAgICAgICAgICAgICAgICAnKCcgKyBzcmNbdC5OVU1FUklDSURFTlRJRklFUl0gKyAnKVxcXFwuJyArXG4gICAgICAgICAgICAgICAgICAgJygnICsgc3JjW3QuTlVNRVJJQ0lERU5USUZJRVJdICsgJyknXG5cbnRvaygnTUFJTlZFUlNJT05MT09TRScpXG5zcmNbdC5NQUlOVkVSU0lPTkxPT1NFXSA9ICcoJyArIHNyY1t0Lk5VTUVSSUNJREVOVElGSUVSTE9PU0VdICsgJylcXFxcLicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJygnICsgc3JjW3QuTlVNRVJJQ0lERU5USUZJRVJMT09TRV0gKyAnKVxcXFwuJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnKCcgKyBzcmNbdC5OVU1FUklDSURFTlRJRklFUkxPT1NFXSArICcpJ1xuXG4vLyAjIyBQcmUtcmVsZWFzZSBWZXJzaW9uIElkZW50aWZpZXJcbi8vIEEgbnVtZXJpYyBpZGVudGlmaWVyLCBvciBhIG5vbi1udW1lcmljIGlkZW50aWZpZXIuXG5cbnRvaygnUFJFUkVMRUFTRUlERU5USUZJRVInKVxuc3JjW3QuUFJFUkVMRUFTRUlERU5USUZJRVJdID0gJyg/OicgKyBzcmNbdC5OVU1FUklDSURFTlRJRklFUl0gK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd8JyArIHNyY1t0Lk5PTk5VTUVSSUNJREVOVElGSUVSXSArICcpJ1xuXG50b2soJ1BSRVJFTEVBU0VJREVOVElGSUVSTE9PU0UnKVxuc3JjW3QuUFJFUkVMRUFTRUlERU5USUZJRVJMT09TRV0gPSAnKD86JyArIHNyY1t0Lk5VTUVSSUNJREVOVElGSUVSTE9PU0VdICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICd8JyArIHNyY1t0Lk5PTk5VTUVSSUNJREVOVElGSUVSXSArICcpJ1xuXG4vLyAjIyBQcmUtcmVsZWFzZSBWZXJzaW9uXG4vLyBIeXBoZW4sIGZvbGxvd2VkIGJ5IG9uZSBvciBtb3JlIGRvdC1zZXBhcmF0ZWQgcHJlLXJlbGVhc2UgdmVyc2lvblxuLy8gaWRlbnRpZmllcnMuXG5cbnRvaygnUFJFUkVMRUFTRScpXG5zcmNbdC5QUkVSRUxFQVNFXSA9ICcoPzotKCcgKyBzcmNbdC5QUkVSRUxFQVNFSURFTlRJRklFUl0gK1xuICAgICAgICAgICAgICAgICAgJyg/OlxcXFwuJyArIHNyY1t0LlBSRVJFTEVBU0VJREVOVElGSUVSXSArICcpKikpJ1xuXG50b2soJ1BSRVJFTEVBU0VMT09TRScpXG5zcmNbdC5QUkVSRUxFQVNFTE9PU0VdID0gJyg/Oi0/KCcgKyBzcmNbdC5QUkVSRUxFQVNFSURFTlRJRklFUkxPT1NFXSArXG4gICAgICAgICAgICAgICAgICAgICAgICcoPzpcXFxcLicgKyBzcmNbdC5QUkVSRUxFQVNFSURFTlRJRklFUkxPT1NFXSArICcpKikpJ1xuXG4vLyAjIyBCdWlsZCBNZXRhZGF0YSBJZGVudGlmaWVyXG4vLyBBbnkgY29tYmluYXRpb24gb2YgZGlnaXRzLCBsZXR0ZXJzLCBvciBoeXBoZW5zLlxuXG50b2soJ0JVSUxESURFTlRJRklFUicpXG5zcmNbdC5CVUlMRElERU5USUZJRVJdID0gJ1swLTlBLVphLXotXSsnXG5cbi8vICMjIEJ1aWxkIE1ldGFkYXRhXG4vLyBQbHVzIHNpZ24sIGZvbGxvd2VkIGJ5IG9uZSBvciBtb3JlIHBlcmlvZC1zZXBhcmF0ZWQgYnVpbGQgbWV0YWRhdGFcbi8vIGlkZW50aWZpZXJzLlxuXG50b2soJ0JVSUxEJylcbnNyY1t0LkJVSUxEXSA9ICcoPzpcXFxcKygnICsgc3JjW3QuQlVJTERJREVOVElGSUVSXSArXG4gICAgICAgICAgICAgJyg/OlxcXFwuJyArIHNyY1t0LkJVSUxESURFTlRJRklFUl0gKyAnKSopKSdcblxuLy8gIyMgRnVsbCBWZXJzaW9uIFN0cmluZ1xuLy8gQSBtYWluIHZlcnNpb24sIGZvbGxvd2VkIG9wdGlvbmFsbHkgYnkgYSBwcmUtcmVsZWFzZSB2ZXJzaW9uIGFuZFxuLy8gYnVpbGQgbWV0YWRhdGEuXG5cbi8vIE5vdGUgdGhhdCB0aGUgb25seSBtYWpvciwgbWlub3IsIHBhdGNoLCBhbmQgcHJlLXJlbGVhc2Ugc2VjdGlvbnMgb2Zcbi8vIHRoZSB2ZXJzaW9uIHN0cmluZyBhcmUgY2FwdHVyaW5nIGdyb3Vwcy4gIFRoZSBidWlsZCBtZXRhZGF0YSBpcyBub3QgYVxuLy8gY2FwdHVyaW5nIGdyb3VwLCBiZWNhdXNlIGl0IHNob3VsZCBub3QgZXZlciBiZSB1c2VkIGluIHZlcnNpb25cbi8vIGNvbXBhcmlzb24uXG5cbnRvaygnRlVMTCcpXG50b2soJ0ZVTExQTEFJTicpXG5zcmNbdC5GVUxMUExBSU5dID0gJ3Y/JyArIHNyY1t0Lk1BSU5WRVJTSU9OXSArXG4gICAgICAgICAgICAgICAgICBzcmNbdC5QUkVSRUxFQVNFXSArICc/JyArXG4gICAgICAgICAgICAgICAgICBzcmNbdC5CVUlMRF0gKyAnPydcblxuc3JjW3QuRlVMTF0gPSAnXicgKyBzcmNbdC5GVUxMUExBSU5dICsgJyQnXG5cbi8vIGxpa2UgZnVsbCwgYnV0IGFsbG93cyB2MS4yLjMgYW5kID0xLjIuMywgd2hpY2ggcGVvcGxlIGRvIHNvbWV0aW1lcy5cbi8vIGFsc28sIDEuMC4wYWxwaGExIChwcmVyZWxlYXNlIHdpdGhvdXQgdGhlIGh5cGhlbikgd2hpY2ggaXMgcHJldHR5XG4vLyBjb21tb24gaW4gdGhlIG5wbSByZWdpc3RyeS5cbnRvaygnTE9PU0VQTEFJTicpXG5zcmNbdC5MT09TRVBMQUlOXSA9ICdbdj1cXFxcc10qJyArIHNyY1t0Lk1BSU5WRVJTSU9OTE9PU0VdICtcbiAgICAgICAgICAgICAgICAgIHNyY1t0LlBSRVJFTEVBU0VMT09TRV0gKyAnPycgK1xuICAgICAgICAgICAgICAgICAgc3JjW3QuQlVJTERdICsgJz8nXG5cbnRvaygnTE9PU0UnKVxuc3JjW3QuTE9PU0VdID0gJ14nICsgc3JjW3QuTE9PU0VQTEFJTl0gKyAnJCdcblxudG9rKCdHVExUJylcbnNyY1t0LkdUTFRdID0gJygoPzo8fD4pPz0/KSdcblxuLy8gU29tZXRoaW5nIGxpa2UgXCIyLipcIiBvciBcIjEuMi54XCIuXG4vLyBOb3RlIHRoYXQgXCJ4LnhcIiBpcyBhIHZhbGlkIHhSYW5nZSBpZGVudGlmZXIsIG1lYW5pbmcgXCJhbnkgdmVyc2lvblwiXG4vLyBPbmx5IHRoZSBmaXJzdCBpdGVtIGlzIHN0cmljdGx5IHJlcXVpcmVkLlxudG9rKCdYUkFOR0VJREVOVElGSUVSTE9PU0UnKVxuc3JjW3QuWFJBTkdFSURFTlRJRklFUkxPT1NFXSA9IHNyY1t0Lk5VTUVSSUNJREVOVElGSUVSTE9PU0VdICsgJ3x4fFh8XFxcXConXG50b2soJ1hSQU5HRUlERU5USUZJRVInKVxuc3JjW3QuWFJBTkdFSURFTlRJRklFUl0gPSBzcmNbdC5OVU1FUklDSURFTlRJRklFUl0gKyAnfHh8WHxcXFxcKidcblxudG9rKCdYUkFOR0VQTEFJTicpXG5zcmNbdC5YUkFOR0VQTEFJTl0gPSAnW3Y9XFxcXHNdKignICsgc3JjW3QuWFJBTkdFSURFTlRJRklFUl0gKyAnKScgK1xuICAgICAgICAgICAgICAgICAgICcoPzpcXFxcLignICsgc3JjW3QuWFJBTkdFSURFTlRJRklFUl0gKyAnKScgK1xuICAgICAgICAgICAgICAgICAgICcoPzpcXFxcLignICsgc3JjW3QuWFJBTkdFSURFTlRJRklFUl0gKyAnKScgK1xuICAgICAgICAgICAgICAgICAgICcoPzonICsgc3JjW3QuUFJFUkVMRUFTRV0gKyAnKT8nICtcbiAgICAgICAgICAgICAgICAgICBzcmNbdC5CVUlMRF0gKyAnPycgK1xuICAgICAgICAgICAgICAgICAgICcpPyk/J1xuXG50b2soJ1hSQU5HRVBMQUlOTE9PU0UnKVxuc3JjW3QuWFJBTkdFUExBSU5MT09TRV0gPSAnW3Y9XFxcXHNdKignICsgc3JjW3QuWFJBTkdFSURFTlRJRklFUkxPT1NFXSArICcpJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnKD86XFxcXC4oJyArIHNyY1t0LlhSQU5HRUlERU5USUZJRVJMT09TRV0gKyAnKScgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJyg/OlxcXFwuKCcgKyBzcmNbdC5YUkFOR0VJREVOVElGSUVSTE9PU0VdICsgJyknICtcbiAgICAgICAgICAgICAgICAgICAgICAgICcoPzonICsgc3JjW3QuUFJFUkVMRUFTRUxPT1NFXSArICcpPycgK1xuICAgICAgICAgICAgICAgICAgICAgICAgc3JjW3QuQlVJTERdICsgJz8nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICcpPyk/J1xuXG50b2soJ1hSQU5HRScpXG5zcmNbdC5YUkFOR0VdID0gJ14nICsgc3JjW3QuR1RMVF0gKyAnXFxcXHMqJyArIHNyY1t0LlhSQU5HRVBMQUlOXSArICckJ1xudG9rKCdYUkFOR0VMT09TRScpXG5zcmNbdC5YUkFOR0VMT09TRV0gPSAnXicgKyBzcmNbdC5HVExUXSArICdcXFxccyonICsgc3JjW3QuWFJBTkdFUExBSU5MT09TRV0gKyAnJCdcblxuLy8gQ29lcmNpb24uXG4vLyBFeHRyYWN0IGFueXRoaW5nIHRoYXQgY291bGQgY29uY2VpdmFibHkgYmUgYSBwYXJ0IG9mIGEgdmFsaWQgc2VtdmVyXG50b2soJ0NPRVJDRScpXG5zcmNbdC5DT0VSQ0VdID0gJyhefFteXFxcXGRdKScgK1xuICAgICAgICAgICAgICAnKFxcXFxkezEsJyArIE1BWF9TQUZFX0NPTVBPTkVOVF9MRU5HVEggKyAnfSknICtcbiAgICAgICAgICAgICAgJyg/OlxcXFwuKFxcXFxkezEsJyArIE1BWF9TQUZFX0NPTVBPTkVOVF9MRU5HVEggKyAnfSkpPycgK1xuICAgICAgICAgICAgICAnKD86XFxcXC4oXFxcXGR7MSwnICsgTUFYX1NBRkVfQ09NUE9ORU5UX0xFTkdUSCArICd9KSk/JyArXG4gICAgICAgICAgICAgICcoPzokfFteXFxcXGRdKSdcbnRvaygnQ09FUkNFUlRMJylcbnJlW3QuQ09FUkNFUlRMXSA9IG5ldyBSZWdFeHAoc3JjW3QuQ09FUkNFXSwgJ2cnKVxuXG4vLyBUaWxkZSByYW5nZXMuXG4vLyBNZWFuaW5nIGlzIFwicmVhc29uYWJseSBhdCBvciBncmVhdGVyIHRoYW5cIlxudG9rKCdMT05FVElMREUnKVxuc3JjW3QuTE9ORVRJTERFXSA9ICcoPzp+Pj8pJ1xuXG50b2soJ1RJTERFVFJJTScpXG5zcmNbdC5USUxERVRSSU1dID0gJyhcXFxccyopJyArIHNyY1t0LkxPTkVUSUxERV0gKyAnXFxcXHMrJ1xucmVbdC5USUxERVRSSU1dID0gbmV3IFJlZ0V4cChzcmNbdC5USUxERVRSSU1dLCAnZycpXG52YXIgdGlsZGVUcmltUmVwbGFjZSA9ICckMX4nXG5cbnRvaygnVElMREUnKVxuc3JjW3QuVElMREVdID0gJ14nICsgc3JjW3QuTE9ORVRJTERFXSArIHNyY1t0LlhSQU5HRVBMQUlOXSArICckJ1xudG9rKCdUSUxERUxPT1NFJylcbnNyY1t0LlRJTERFTE9PU0VdID0gJ14nICsgc3JjW3QuTE9ORVRJTERFXSArIHNyY1t0LlhSQU5HRVBMQUlOTE9PU0VdICsgJyQnXG5cbi8vIENhcmV0IHJhbmdlcy5cbi8vIE1lYW5pbmcgaXMgXCJhdCBsZWFzdCBhbmQgYmFja3dhcmRzIGNvbXBhdGlibGUgd2l0aFwiXG50b2soJ0xPTkVDQVJFVCcpXG5zcmNbdC5MT05FQ0FSRVRdID0gJyg/OlxcXFxeKSdcblxudG9rKCdDQVJFVFRSSU0nKVxuc3JjW3QuQ0FSRVRUUklNXSA9ICcoXFxcXHMqKScgKyBzcmNbdC5MT05FQ0FSRVRdICsgJ1xcXFxzKydcbnJlW3QuQ0FSRVRUUklNXSA9IG5ldyBSZWdFeHAoc3JjW3QuQ0FSRVRUUklNXSwgJ2cnKVxudmFyIGNhcmV0VHJpbVJlcGxhY2UgPSAnJDFeJ1xuXG50b2soJ0NBUkVUJylcbnNyY1t0LkNBUkVUXSA9ICdeJyArIHNyY1t0LkxPTkVDQVJFVF0gKyBzcmNbdC5YUkFOR0VQTEFJTl0gKyAnJCdcbnRvaygnQ0FSRVRMT09TRScpXG5zcmNbdC5DQVJFVExPT1NFXSA9ICdeJyArIHNyY1t0LkxPTkVDQVJFVF0gKyBzcmNbdC5YUkFOR0VQTEFJTkxPT1NFXSArICckJ1xuXG4vLyBBIHNpbXBsZSBndC9sdC9lcSB0aGluZywgb3IganVzdCBcIlwiIHRvIGluZGljYXRlIFwiYW55IHZlcnNpb25cIlxudG9rKCdDT01QQVJBVE9STE9PU0UnKVxuc3JjW3QuQ09NUEFSQVRPUkxPT1NFXSA9ICdeJyArIHNyY1t0LkdUTFRdICsgJ1xcXFxzKignICsgc3JjW3QuTE9PU0VQTEFJTl0gKyAnKSR8XiQnXG50b2soJ0NPTVBBUkFUT1InKVxuc3JjW3QuQ09NUEFSQVRPUl0gPSAnXicgKyBzcmNbdC5HVExUXSArICdcXFxccyooJyArIHNyY1t0LkZVTExQTEFJTl0gKyAnKSR8XiQnXG5cbi8vIEFuIGV4cHJlc3Npb24gdG8gc3RyaXAgYW55IHdoaXRlc3BhY2UgYmV0d2VlbiB0aGUgZ3RsdCBhbmQgdGhlIHRoaW5nXG4vLyBpdCBtb2RpZmllcywgc28gdGhhdCBgPiAxLjIuM2AgPT0+IGA+MS4yLjNgXG50b2soJ0NPTVBBUkFUT1JUUklNJylcbnNyY1t0LkNPTVBBUkFUT1JUUklNXSA9ICcoXFxcXHMqKScgKyBzcmNbdC5HVExUXSArXG4gICAgICAgICAgICAgICAgICAgICAgJ1xcXFxzKignICsgc3JjW3QuTE9PU0VQTEFJTl0gKyAnfCcgKyBzcmNbdC5YUkFOR0VQTEFJTl0gKyAnKSdcblxuLy8gdGhpcyBvbmUgaGFzIHRvIHVzZSB0aGUgL2cgZmxhZ1xucmVbdC5DT01QQVJBVE9SVFJJTV0gPSBuZXcgUmVnRXhwKHNyY1t0LkNPTVBBUkFUT1JUUklNXSwgJ2cnKVxudmFyIGNvbXBhcmF0b3JUcmltUmVwbGFjZSA9ICckMSQyJDMnXG5cbi8vIFNvbWV0aGluZyBsaWtlIGAxLjIuMyAtIDEuMi40YFxuLy8gTm90ZSB0aGF0IHRoZXNlIGFsbCB1c2UgdGhlIGxvb3NlIGZvcm0sIGJlY2F1c2UgdGhleSdsbCBiZVxuLy8gY2hlY2tlZCBhZ2FpbnN0IGVpdGhlciB0aGUgc3RyaWN0IG9yIGxvb3NlIGNvbXBhcmF0b3IgZm9ybVxuLy8gbGF0ZXIuXG50b2soJ0hZUEhFTlJBTkdFJylcbnNyY1t0LkhZUEhFTlJBTkdFXSA9ICdeXFxcXHMqKCcgKyBzcmNbdC5YUkFOR0VQTEFJTl0gKyAnKScgK1xuICAgICAgICAgICAgICAgICAgICdcXFxccystXFxcXHMrJyArXG4gICAgICAgICAgICAgICAgICAgJygnICsgc3JjW3QuWFJBTkdFUExBSU5dICsgJyknICtcbiAgICAgICAgICAgICAgICAgICAnXFxcXHMqJCdcblxudG9rKCdIWVBIRU5SQU5HRUxPT1NFJylcbnNyY1t0LkhZUEhFTlJBTkdFTE9PU0VdID0gJ15cXFxccyooJyArIHNyY1t0LlhSQU5HRVBMQUlOTE9PU0VdICsgJyknICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdcXFxccystXFxcXHMrJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnKCcgKyBzcmNbdC5YUkFOR0VQTEFJTkxPT1NFXSArICcpJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnXFxcXHMqJCdcblxuLy8gU3RhciByYW5nZXMgYmFzaWNhbGx5IGp1c3QgYWxsb3cgYW55dGhpbmcgYXQgYWxsLlxudG9rKCdTVEFSJylcbnNyY1t0LlNUQVJdID0gJyg8fD4pPz0/XFxcXHMqXFxcXConXG5cbi8vIENvbXBpbGUgdG8gYWN0dWFsIHJlZ2V4cCBvYmplY3RzLlxuLy8gQWxsIGFyZSBmbGFnLWZyZWUsIHVubGVzcyB0aGV5IHdlcmUgY3JlYXRlZCBhYm92ZSB3aXRoIGEgZmxhZy5cbmZvciAodmFyIGkgPSAwOyBpIDwgUjsgaSsrKSB7XG4gIGRlYnVnKGksIHNyY1tpXSlcbiAgaWYgKCFyZVtpXSkge1xuICAgIHJlW2ldID0gbmV3IFJlZ0V4cChzcmNbaV0pXG4gIH1cbn1cblxuZXhwb3J0cy5wYXJzZSA9IHBhcnNlXG5mdW5jdGlvbiBwYXJzZSAodmVyc2lvbiwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMgfHwgdHlwZW9mIG9wdGlvbnMgIT09ICdvYmplY3QnKSB7XG4gICAgb3B0aW9ucyA9IHtcbiAgICAgIGxvb3NlOiAhIW9wdGlvbnMsXG4gICAgICBpbmNsdWRlUHJlcmVsZWFzZTogZmFsc2VcbiAgICB9XG4gIH1cblxuICBpZiAodmVyc2lvbiBpbnN0YW5jZW9mIFNlbVZlcikge1xuICAgIHJldHVybiB2ZXJzaW9uXG4gIH1cblxuICBpZiAodHlwZW9mIHZlcnNpb24gIT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIGlmICh2ZXJzaW9uLmxlbmd0aCA+IE1BWF9MRU5HVEgpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgdmFyIHIgPSBvcHRpb25zLmxvb3NlID8gcmVbdC5MT09TRV0gOiByZVt0LkZVTExdXG4gIGlmICghci50ZXN0KHZlcnNpb24pKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIHRyeSB7XG4gICAgcmV0dXJuIG5ldyBTZW1WZXIodmVyc2lvbiwgb3B0aW9ucylcbiAgfSBjYXRjaCAoZXIpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG59XG5cbmV4cG9ydHMudmFsaWQgPSB2YWxpZFxuZnVuY3Rpb24gdmFsaWQgKHZlcnNpb24sIG9wdGlvbnMpIHtcbiAgdmFyIHYgPSBwYXJzZSh2ZXJzaW9uLCBvcHRpb25zKVxuICByZXR1cm4gdiA/IHYudmVyc2lvbiA6IG51bGxcbn1cblxuZXhwb3J0cy5jbGVhbiA9IGNsZWFuXG5mdW5jdGlvbiBjbGVhbiAodmVyc2lvbiwgb3B0aW9ucykge1xuICB2YXIgcyA9IHBhcnNlKHZlcnNpb24udHJpbSgpLnJlcGxhY2UoL15bPXZdKy8sICcnKSwgb3B0aW9ucylcbiAgcmV0dXJuIHMgPyBzLnZlcnNpb24gOiBudWxsXG59XG5cbmV4cG9ydHMuU2VtVmVyID0gU2VtVmVyXG5cbmZ1bmN0aW9uIFNlbVZlciAodmVyc2lvbiwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMgfHwgdHlwZW9mIG9wdGlvbnMgIT09ICdvYmplY3QnKSB7XG4gICAgb3B0aW9ucyA9IHtcbiAgICAgIGxvb3NlOiAhIW9wdGlvbnMsXG4gICAgICBpbmNsdWRlUHJlcmVsZWFzZTogZmFsc2VcbiAgICB9XG4gIH1cbiAgaWYgKHZlcnNpb24gaW5zdGFuY2VvZiBTZW1WZXIpIHtcbiAgICBpZiAodmVyc2lvbi5sb29zZSA9PT0gb3B0aW9ucy5sb29zZSkge1xuICAgICAgcmV0dXJuIHZlcnNpb25cbiAgICB9IGVsc2Uge1xuICAgICAgdmVyc2lvbiA9IHZlcnNpb24udmVyc2lvblxuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2YgdmVyc2lvbiAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIFZlcnNpb246ICcgKyB2ZXJzaW9uKVxuICB9XG5cbiAgaWYgKHZlcnNpb24ubGVuZ3RoID4gTUFYX0xFTkdUSCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3ZlcnNpb24gaXMgbG9uZ2VyIHRoYW4gJyArIE1BWF9MRU5HVEggKyAnIGNoYXJhY3RlcnMnKVxuICB9XG5cbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFNlbVZlcikpIHtcbiAgICByZXR1cm4gbmV3IFNlbVZlcih2ZXJzaW9uLCBvcHRpb25zKVxuICB9XG5cbiAgZGVidWcoJ1NlbVZlcicsIHZlcnNpb24sIG9wdGlvbnMpXG4gIHRoaXMub3B0aW9ucyA9IG9wdGlvbnNcbiAgdGhpcy5sb29zZSA9ICEhb3B0aW9ucy5sb29zZVxuXG4gIHZhciBtID0gdmVyc2lvbi50cmltKCkubWF0Y2gob3B0aW9ucy5sb29zZSA/IHJlW3QuTE9PU0VdIDogcmVbdC5GVUxMXSlcblxuICBpZiAoIW0pIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIFZlcnNpb246ICcgKyB2ZXJzaW9uKVxuICB9XG5cbiAgdGhpcy5yYXcgPSB2ZXJzaW9uXG5cbiAgLy8gdGhlc2UgYXJlIGFjdHVhbGx5IG51bWJlcnNcbiAgdGhpcy5tYWpvciA9ICttWzFdXG4gIHRoaXMubWlub3IgPSArbVsyXVxuICB0aGlzLnBhdGNoID0gK21bM11cblxuICBpZiAodGhpcy5tYWpvciA+IE1BWF9TQUZFX0lOVEVHRVIgfHwgdGhpcy5tYWpvciA8IDApIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIG1ham9yIHZlcnNpb24nKVxuICB9XG5cbiAgaWYgKHRoaXMubWlub3IgPiBNQVhfU0FGRV9JTlRFR0VSIHx8IHRoaXMubWlub3IgPCAwKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBtaW5vciB2ZXJzaW9uJylcbiAgfVxuXG4gIGlmICh0aGlzLnBhdGNoID4gTUFYX1NBRkVfSU5URUdFUiB8fCB0aGlzLnBhdGNoIDwgMCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgcGF0Y2ggdmVyc2lvbicpXG4gIH1cblxuICAvLyBudW1iZXJpZnkgYW55IHByZXJlbGVhc2UgbnVtZXJpYyBpZHNcbiAgaWYgKCFtWzRdKSB7XG4gICAgdGhpcy5wcmVyZWxlYXNlID0gW11cbiAgfSBlbHNlIHtcbiAgICB0aGlzLnByZXJlbGVhc2UgPSBtWzRdLnNwbGl0KCcuJykubWFwKGZ1bmN0aW9uIChpZCkge1xuICAgICAgaWYgKC9eWzAtOV0rJC8udGVzdChpZCkpIHtcbiAgICAgICAgdmFyIG51bSA9ICtpZFxuICAgICAgICBpZiAobnVtID49IDAgJiYgbnVtIDwgTUFYX1NBRkVfSU5URUdFUikge1xuICAgICAgICAgIHJldHVybiBudW1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGlkXG4gICAgfSlcbiAgfVxuXG4gIHRoaXMuYnVpbGQgPSBtWzVdID8gbVs1XS5zcGxpdCgnLicpIDogW11cbiAgdGhpcy5mb3JtYXQoKVxufVxuXG5TZW1WZXIucHJvdG90eXBlLmZvcm1hdCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy52ZXJzaW9uID0gdGhpcy5tYWpvciArICcuJyArIHRoaXMubWlub3IgKyAnLicgKyB0aGlzLnBhdGNoXG4gIGlmICh0aGlzLnByZXJlbGVhc2UubGVuZ3RoKSB7XG4gICAgdGhpcy52ZXJzaW9uICs9ICctJyArIHRoaXMucHJlcmVsZWFzZS5qb2luKCcuJylcbiAgfVxuICByZXR1cm4gdGhpcy52ZXJzaW9uXG59XG5cblNlbVZlci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLnZlcnNpb25cbn1cblxuU2VtVmVyLnByb3RvdHlwZS5jb21wYXJlID0gZnVuY3Rpb24gKG90aGVyKSB7XG4gIGRlYnVnKCdTZW1WZXIuY29tcGFyZScsIHRoaXMudmVyc2lvbiwgdGhpcy5vcHRpb25zLCBvdGhlcilcbiAgaWYgKCEob3RoZXIgaW5zdGFuY2VvZiBTZW1WZXIpKSB7XG4gICAgb3RoZXIgPSBuZXcgU2VtVmVyKG90aGVyLCB0aGlzLm9wdGlvbnMpXG4gIH1cblxuICByZXR1cm4gdGhpcy5jb21wYXJlTWFpbihvdGhlcikgfHwgdGhpcy5jb21wYXJlUHJlKG90aGVyKVxufVxuXG5TZW1WZXIucHJvdG90eXBlLmNvbXBhcmVNYWluID0gZnVuY3Rpb24gKG90aGVyKSB7XG4gIGlmICghKG90aGVyIGluc3RhbmNlb2YgU2VtVmVyKSkge1xuICAgIG90aGVyID0gbmV3IFNlbVZlcihvdGhlciwgdGhpcy5vcHRpb25zKVxuICB9XG5cbiAgcmV0dXJuIGNvbXBhcmVJZGVudGlmaWVycyh0aGlzLm1ham9yLCBvdGhlci5tYWpvcikgfHxcbiAgICAgICAgIGNvbXBhcmVJZGVudGlmaWVycyh0aGlzLm1pbm9yLCBvdGhlci5taW5vcikgfHxcbiAgICAgICAgIGNvbXBhcmVJZGVudGlmaWVycyh0aGlzLnBhdGNoLCBvdGhlci5wYXRjaClcbn1cblxuU2VtVmVyLnByb3RvdHlwZS5jb21wYXJlUHJlID0gZnVuY3Rpb24gKG90aGVyKSB7XG4gIGlmICghKG90aGVyIGluc3RhbmNlb2YgU2VtVmVyKSkge1xuICAgIG90aGVyID0gbmV3IFNlbVZlcihvdGhlciwgdGhpcy5vcHRpb25zKVxuICB9XG5cbiAgLy8gTk9UIGhhdmluZyBhIHByZXJlbGVhc2UgaXMgPiBoYXZpbmcgb25lXG4gIGlmICh0aGlzLnByZXJlbGVhc2UubGVuZ3RoICYmICFvdGhlci5wcmVyZWxlYXNlLmxlbmd0aCkge1xuICAgIHJldHVybiAtMVxuICB9IGVsc2UgaWYgKCF0aGlzLnByZXJlbGVhc2UubGVuZ3RoICYmIG90aGVyLnByZXJlbGVhc2UubGVuZ3RoKSB7XG4gICAgcmV0dXJuIDFcbiAgfSBlbHNlIGlmICghdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCAmJiAhb3RoZXIucHJlcmVsZWFzZS5sZW5ndGgpIHtcbiAgICByZXR1cm4gMFxuICB9XG5cbiAgdmFyIGkgPSAwXG4gIGRvIHtcbiAgICB2YXIgYSA9IHRoaXMucHJlcmVsZWFzZVtpXVxuICAgIHZhciBiID0gb3RoZXIucHJlcmVsZWFzZVtpXVxuICAgIGRlYnVnKCdwcmVyZWxlYXNlIGNvbXBhcmUnLCBpLCBhLCBiKVxuICAgIGlmIChhID09PSB1bmRlZmluZWQgJiYgYiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gMFxuICAgIH0gZWxzZSBpZiAoYiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gMVxuICAgIH0gZWxzZSBpZiAoYSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gLTFcbiAgICB9IGVsc2UgaWYgKGEgPT09IGIpIHtcbiAgICAgIGNvbnRpbnVlXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjb21wYXJlSWRlbnRpZmllcnMoYSwgYilcbiAgICB9XG4gIH0gd2hpbGUgKCsraSlcbn1cblxuU2VtVmVyLnByb3RvdHlwZS5jb21wYXJlQnVpbGQgPSBmdW5jdGlvbiAob3RoZXIpIHtcbiAgaWYgKCEob3RoZXIgaW5zdGFuY2VvZiBTZW1WZXIpKSB7XG4gICAgb3RoZXIgPSBuZXcgU2VtVmVyKG90aGVyLCB0aGlzLm9wdGlvbnMpXG4gIH1cblxuICB2YXIgaSA9IDBcbiAgZG8ge1xuICAgIHZhciBhID0gdGhpcy5idWlsZFtpXVxuICAgIHZhciBiID0gb3RoZXIuYnVpbGRbaV1cbiAgICBkZWJ1ZygncHJlcmVsZWFzZSBjb21wYXJlJywgaSwgYSwgYilcbiAgICBpZiAoYSA9PT0gdW5kZWZpbmVkICYmIGIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIDBcbiAgICB9IGVsc2UgaWYgKGIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIDFcbiAgICB9IGVsc2UgaWYgKGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIC0xXG4gICAgfSBlbHNlIGlmIChhID09PSBiKSB7XG4gICAgICBjb250aW51ZVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY29tcGFyZUlkZW50aWZpZXJzKGEsIGIpXG4gICAgfVxuICB9IHdoaWxlICgrK2kpXG59XG5cbi8vIHByZW1pbm9yIHdpbGwgYnVtcCB0aGUgdmVyc2lvbiB1cCB0byB0aGUgbmV4dCBtaW5vciByZWxlYXNlLCBhbmQgaW1tZWRpYXRlbHlcbi8vIGRvd24gdG8gcHJlLXJlbGVhc2UuIHByZW1ham9yIGFuZCBwcmVwYXRjaCB3b3JrIHRoZSBzYW1lIHdheS5cblNlbVZlci5wcm90b3R5cGUuaW5jID0gZnVuY3Rpb24gKHJlbGVhc2UsIGlkZW50aWZpZXIpIHtcbiAgc3dpdGNoIChyZWxlYXNlKSB7XG4gICAgY2FzZSAncHJlbWFqb3InOlxuICAgICAgdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9IDBcbiAgICAgIHRoaXMucGF0Y2ggPSAwXG4gICAgICB0aGlzLm1pbm9yID0gMFxuICAgICAgdGhpcy5tYWpvcisrXG4gICAgICB0aGlzLmluYygncHJlJywgaWRlbnRpZmllcilcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAncHJlbWlub3InOlxuICAgICAgdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9IDBcbiAgICAgIHRoaXMucGF0Y2ggPSAwXG4gICAgICB0aGlzLm1pbm9yKytcbiAgICAgIHRoaXMuaW5jKCdwcmUnLCBpZGVudGlmaWVyKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdwcmVwYXRjaCc6XG4gICAgICAvLyBJZiB0aGlzIGlzIGFscmVhZHkgYSBwcmVyZWxlYXNlLCBpdCB3aWxsIGJ1bXAgdG8gdGhlIG5leHQgdmVyc2lvblxuICAgICAgLy8gZHJvcCBhbnkgcHJlcmVsZWFzZXMgdGhhdCBtaWdodCBhbHJlYWR5IGV4aXN0LCBzaW5jZSB0aGV5IGFyZSBub3RcbiAgICAgIC8vIHJlbGV2YW50IGF0IHRoaXMgcG9pbnQuXG4gICAgICB0aGlzLnByZXJlbGVhc2UubGVuZ3RoID0gMFxuICAgICAgdGhpcy5pbmMoJ3BhdGNoJywgaWRlbnRpZmllcilcbiAgICAgIHRoaXMuaW5jKCdwcmUnLCBpZGVudGlmaWVyKVxuICAgICAgYnJlYWtcbiAgICAvLyBJZiB0aGUgaW5wdXQgaXMgYSBub24tcHJlcmVsZWFzZSB2ZXJzaW9uLCB0aGlzIGFjdHMgdGhlIHNhbWUgYXNcbiAgICAvLyBwcmVwYXRjaC5cbiAgICBjYXNlICdwcmVyZWxlYXNlJzpcbiAgICAgIGlmICh0aGlzLnByZXJlbGVhc2UubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRoaXMuaW5jKCdwYXRjaCcsIGlkZW50aWZpZXIpXG4gICAgICB9XG4gICAgICB0aGlzLmluYygncHJlJywgaWRlbnRpZmllcilcbiAgICAgIGJyZWFrXG5cbiAgICBjYXNlICdtYWpvcic6XG4gICAgICAvLyBJZiB0aGlzIGlzIGEgcHJlLW1ham9yIHZlcnNpb24sIGJ1bXAgdXAgdG8gdGhlIHNhbWUgbWFqb3IgdmVyc2lvbi5cbiAgICAgIC8vIE90aGVyd2lzZSBpbmNyZW1lbnQgbWFqb3IuXG4gICAgICAvLyAxLjAuMC01IGJ1bXBzIHRvIDEuMC4wXG4gICAgICAvLyAxLjEuMCBidW1wcyB0byAyLjAuMFxuICAgICAgaWYgKHRoaXMubWlub3IgIT09IDAgfHxcbiAgICAgICAgICB0aGlzLnBhdGNoICE9PSAwIHx8XG4gICAgICAgICAgdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aGlzLm1ham9yKytcbiAgICAgIH1cbiAgICAgIHRoaXMubWlub3IgPSAwXG4gICAgICB0aGlzLnBhdGNoID0gMFxuICAgICAgdGhpcy5wcmVyZWxlYXNlID0gW11cbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnbWlub3InOlxuICAgICAgLy8gSWYgdGhpcyBpcyBhIHByZS1taW5vciB2ZXJzaW9uLCBidW1wIHVwIHRvIHRoZSBzYW1lIG1pbm9yIHZlcnNpb24uXG4gICAgICAvLyBPdGhlcndpc2UgaW5jcmVtZW50IG1pbm9yLlxuICAgICAgLy8gMS4yLjAtNSBidW1wcyB0byAxLjIuMFxuICAgICAgLy8gMS4yLjEgYnVtcHMgdG8gMS4zLjBcbiAgICAgIGlmICh0aGlzLnBhdGNoICE9PSAwIHx8IHRoaXMucHJlcmVsZWFzZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhpcy5taW5vcisrXG4gICAgICB9XG4gICAgICB0aGlzLnBhdGNoID0gMFxuICAgICAgdGhpcy5wcmVyZWxlYXNlID0gW11cbiAgICAgIGJyZWFrXG4gICAgY2FzZSAncGF0Y2gnOlxuICAgICAgLy8gSWYgdGhpcyBpcyBub3QgYSBwcmUtcmVsZWFzZSB2ZXJzaW9uLCBpdCB3aWxsIGluY3JlbWVudCB0aGUgcGF0Y2guXG4gICAgICAvLyBJZiBpdCBpcyBhIHByZS1yZWxlYXNlIGl0IHdpbGwgYnVtcCB1cCB0byB0aGUgc2FtZSBwYXRjaCB2ZXJzaW9uLlxuICAgICAgLy8gMS4yLjAtNSBwYXRjaGVzIHRvIDEuMi4wXG4gICAgICAvLyAxLjIuMCBwYXRjaGVzIHRvIDEuMi4xXG4gICAgICBpZiAodGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aGlzLnBhdGNoKytcbiAgICAgIH1cbiAgICAgIHRoaXMucHJlcmVsZWFzZSA9IFtdXG4gICAgICBicmVha1xuICAgIC8vIFRoaXMgcHJvYmFibHkgc2hvdWxkbid0IGJlIHVzZWQgcHVibGljbHkuXG4gICAgLy8gMS4wLjAgXCJwcmVcIiB3b3VsZCBiZWNvbWUgMS4wLjAtMCB3aGljaCBpcyB0aGUgd3JvbmcgZGlyZWN0aW9uLlxuICAgIGNhc2UgJ3ByZSc6XG4gICAgICBpZiAodGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aGlzLnByZXJlbGVhc2UgPSBbMF1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBpID0gdGhpcy5wcmVyZWxlYXNlLmxlbmd0aFxuICAgICAgICB3aGlsZSAoLS1pID49IDApIHtcbiAgICAgICAgICBpZiAodHlwZW9mIHRoaXMucHJlcmVsZWFzZVtpXSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRoaXMucHJlcmVsZWFzZVtpXSsrXG4gICAgICAgICAgICBpID0gLTJcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGkgPT09IC0xKSB7XG4gICAgICAgICAgLy8gZGlkbid0IGluY3JlbWVudCBhbnl0aGluZ1xuICAgICAgICAgIHRoaXMucHJlcmVsZWFzZS5wdXNoKDApXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChpZGVudGlmaWVyKSB7XG4gICAgICAgIC8vIDEuMi4wLWJldGEuMSBidW1wcyB0byAxLjIuMC1iZXRhLjIsXG4gICAgICAgIC8vIDEuMi4wLWJldGEuZm9vYmx6IG9yIDEuMi4wLWJldGEgYnVtcHMgdG8gMS4yLjAtYmV0YS4wXG4gICAgICAgIGlmICh0aGlzLnByZXJlbGVhc2VbMF0gPT09IGlkZW50aWZpZXIpIHtcbiAgICAgICAgICBpZiAoaXNOYU4odGhpcy5wcmVyZWxlYXNlWzFdKSkge1xuICAgICAgICAgICAgdGhpcy5wcmVyZWxlYXNlID0gW2lkZW50aWZpZXIsIDBdXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucHJlcmVsZWFzZSA9IFtpZGVudGlmaWVyLCAwXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBicmVha1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBpbmNyZW1lbnQgYXJndW1lbnQ6ICcgKyByZWxlYXNlKVxuICB9XG4gIHRoaXMuZm9ybWF0KClcbiAgdGhpcy5yYXcgPSB0aGlzLnZlcnNpb25cbiAgcmV0dXJuIHRoaXNcbn1cblxuZXhwb3J0cy5pbmMgPSBpbmNcbmZ1bmN0aW9uIGluYyAodmVyc2lvbiwgcmVsZWFzZSwgbG9vc2UsIGlkZW50aWZpZXIpIHtcbiAgaWYgKHR5cGVvZiAobG9vc2UpID09PSAnc3RyaW5nJykge1xuICAgIGlkZW50aWZpZXIgPSBsb29zZVxuICAgIGxvb3NlID0gdW5kZWZpbmVkXG4gIH1cblxuICB0cnkge1xuICAgIHJldHVybiBuZXcgU2VtVmVyKHZlcnNpb24sIGxvb3NlKS5pbmMocmVsZWFzZSwgaWRlbnRpZmllcikudmVyc2lvblxuICB9IGNhdGNoIChlcikge1xuICAgIHJldHVybiBudWxsXG4gIH1cbn1cblxuZXhwb3J0cy5kaWZmID0gZGlmZlxuZnVuY3Rpb24gZGlmZiAodmVyc2lvbjEsIHZlcnNpb24yKSB7XG4gIGlmIChlcSh2ZXJzaW9uMSwgdmVyc2lvbjIpKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfSBlbHNlIHtcbiAgICB2YXIgdjEgPSBwYXJzZSh2ZXJzaW9uMSlcbiAgICB2YXIgdjIgPSBwYXJzZSh2ZXJzaW9uMilcbiAgICB2YXIgcHJlZml4ID0gJydcbiAgICBpZiAodjEucHJlcmVsZWFzZS5sZW5ndGggfHwgdjIucHJlcmVsZWFzZS5sZW5ndGgpIHtcbiAgICAgIHByZWZpeCA9ICdwcmUnXG4gICAgICB2YXIgZGVmYXVsdFJlc3VsdCA9ICdwcmVyZWxlYXNlJ1xuICAgIH1cbiAgICBmb3IgKHZhciBrZXkgaW4gdjEpIHtcbiAgICAgIGlmIChrZXkgPT09ICdtYWpvcicgfHwga2V5ID09PSAnbWlub3InIHx8IGtleSA9PT0gJ3BhdGNoJykge1xuICAgICAgICBpZiAodjFba2V5XSAhPT0gdjJba2V5XSkge1xuICAgICAgICAgIHJldHVybiBwcmVmaXggKyBrZXlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZGVmYXVsdFJlc3VsdCAvLyBtYXkgYmUgdW5kZWZpbmVkXG4gIH1cbn1cblxuZXhwb3J0cy5jb21wYXJlSWRlbnRpZmllcnMgPSBjb21wYXJlSWRlbnRpZmllcnNcblxudmFyIG51bWVyaWMgPSAvXlswLTldKyQvXG5mdW5jdGlvbiBjb21wYXJlSWRlbnRpZmllcnMgKGEsIGIpIHtcbiAgdmFyIGFudW0gPSBudW1lcmljLnRlc3QoYSlcbiAgdmFyIGJudW0gPSBudW1lcmljLnRlc3QoYilcblxuICBpZiAoYW51bSAmJiBibnVtKSB7XG4gICAgYSA9ICthXG4gICAgYiA9ICtiXG4gIH1cblxuICByZXR1cm4gYSA9PT0gYiA/IDBcbiAgICA6IChhbnVtICYmICFibnVtKSA/IC0xXG4gICAgOiAoYm51bSAmJiAhYW51bSkgPyAxXG4gICAgOiBhIDwgYiA/IC0xXG4gICAgOiAxXG59XG5cbmV4cG9ydHMucmNvbXBhcmVJZGVudGlmaWVycyA9IHJjb21wYXJlSWRlbnRpZmllcnNcbmZ1bmN0aW9uIHJjb21wYXJlSWRlbnRpZmllcnMgKGEsIGIpIHtcbiAgcmV0dXJuIGNvbXBhcmVJZGVudGlmaWVycyhiLCBhKVxufVxuXG5leHBvcnRzLm1ham9yID0gbWFqb3JcbmZ1bmN0aW9uIG1ham9yIChhLCBsb29zZSkge1xuICByZXR1cm4gbmV3IFNlbVZlcihhLCBsb29zZSkubWFqb3Jcbn1cblxuZXhwb3J0cy5taW5vciA9IG1pbm9yXG5mdW5jdGlvbiBtaW5vciAoYSwgbG9vc2UpIHtcbiAgcmV0dXJuIG5ldyBTZW1WZXIoYSwgbG9vc2UpLm1pbm9yXG59XG5cbmV4cG9ydHMucGF0Y2ggPSBwYXRjaFxuZnVuY3Rpb24gcGF0Y2ggKGEsIGxvb3NlKSB7XG4gIHJldHVybiBuZXcgU2VtVmVyKGEsIGxvb3NlKS5wYXRjaFxufVxuXG5leHBvcnRzLmNvbXBhcmUgPSBjb21wYXJlXG5mdW5jdGlvbiBjb21wYXJlIChhLCBiLCBsb29zZSkge1xuICByZXR1cm4gbmV3IFNlbVZlcihhLCBsb29zZSkuY29tcGFyZShuZXcgU2VtVmVyKGIsIGxvb3NlKSlcbn1cblxuZXhwb3J0cy5jb21wYXJlTG9vc2UgPSBjb21wYXJlTG9vc2VcbmZ1bmN0aW9uIGNvbXBhcmVMb29zZSAoYSwgYikge1xuICByZXR1cm4gY29tcGFyZShhLCBiLCB0cnVlKVxufVxuXG5leHBvcnRzLmNvbXBhcmVCdWlsZCA9IGNvbXBhcmVCdWlsZFxuZnVuY3Rpb24gY29tcGFyZUJ1aWxkIChhLCBiLCBsb29zZSkge1xuICB2YXIgdmVyc2lvbkEgPSBuZXcgU2VtVmVyKGEsIGxvb3NlKVxuICB2YXIgdmVyc2lvbkIgPSBuZXcgU2VtVmVyKGIsIGxvb3NlKVxuICByZXR1cm4gdmVyc2lvbkEuY29tcGFyZSh2ZXJzaW9uQikgfHwgdmVyc2lvbkEuY29tcGFyZUJ1aWxkKHZlcnNpb25CKVxufVxuXG5leHBvcnRzLnJjb21wYXJlID0gcmNvbXBhcmVcbmZ1bmN0aW9uIHJjb21wYXJlIChhLCBiLCBsb29zZSkge1xuICByZXR1cm4gY29tcGFyZShiLCBhLCBsb29zZSlcbn1cblxuZXhwb3J0cy5zb3J0ID0gc29ydFxuZnVuY3Rpb24gc29ydCAobGlzdCwgbG9vc2UpIHtcbiAgcmV0dXJuIGxpc3Quc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiBleHBvcnRzLmNvbXBhcmVCdWlsZChhLCBiLCBsb29zZSlcbiAgfSlcbn1cblxuZXhwb3J0cy5yc29ydCA9IHJzb3J0XG5mdW5jdGlvbiByc29ydCAobGlzdCwgbG9vc2UpIHtcbiAgcmV0dXJuIGxpc3Quc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiBleHBvcnRzLmNvbXBhcmVCdWlsZChiLCBhLCBsb29zZSlcbiAgfSlcbn1cblxuZXhwb3J0cy5ndCA9IGd0XG5mdW5jdGlvbiBndCAoYSwgYiwgbG9vc2UpIHtcbiAgcmV0dXJuIGNvbXBhcmUoYSwgYiwgbG9vc2UpID4gMFxufVxuXG5leHBvcnRzLmx0ID0gbHRcbmZ1bmN0aW9uIGx0IChhLCBiLCBsb29zZSkge1xuICByZXR1cm4gY29tcGFyZShhLCBiLCBsb29zZSkgPCAwXG59XG5cbmV4cG9ydHMuZXEgPSBlcVxuZnVuY3Rpb24gZXEgKGEsIGIsIGxvb3NlKSB7XG4gIHJldHVybiBjb21wYXJlKGEsIGIsIGxvb3NlKSA9PT0gMFxufVxuXG5leHBvcnRzLm5lcSA9IG5lcVxuZnVuY3Rpb24gbmVxIChhLCBiLCBsb29zZSkge1xuICByZXR1cm4gY29tcGFyZShhLCBiLCBsb29zZSkgIT09IDBcbn1cblxuZXhwb3J0cy5ndGUgPSBndGVcbmZ1bmN0aW9uIGd0ZSAoYSwgYiwgbG9vc2UpIHtcbiAgcmV0dXJuIGNvbXBhcmUoYSwgYiwgbG9vc2UpID49IDBcbn1cblxuZXhwb3J0cy5sdGUgPSBsdGVcbmZ1bmN0aW9uIGx0ZSAoYSwgYiwgbG9vc2UpIHtcbiAgcmV0dXJuIGNvbXBhcmUoYSwgYiwgbG9vc2UpIDw9IDBcbn1cblxuZXhwb3J0cy5jbXAgPSBjbXBcbmZ1bmN0aW9uIGNtcCAoYSwgb3AsIGIsIGxvb3NlKSB7XG4gIHN3aXRjaCAob3ApIHtcbiAgICBjYXNlICc9PT0nOlxuICAgICAgaWYgKHR5cGVvZiBhID09PSAnb2JqZWN0JylcbiAgICAgICAgYSA9IGEudmVyc2lvblxuICAgICAgaWYgKHR5cGVvZiBiID09PSAnb2JqZWN0JylcbiAgICAgICAgYiA9IGIudmVyc2lvblxuICAgICAgcmV0dXJuIGEgPT09IGJcblxuICAgIGNhc2UgJyE9PSc6XG4gICAgICBpZiAodHlwZW9mIGEgPT09ICdvYmplY3QnKVxuICAgICAgICBhID0gYS52ZXJzaW9uXG4gICAgICBpZiAodHlwZW9mIGIgPT09ICdvYmplY3QnKVxuICAgICAgICBiID0gYi52ZXJzaW9uXG4gICAgICByZXR1cm4gYSAhPT0gYlxuXG4gICAgY2FzZSAnJzpcbiAgICBjYXNlICc9JzpcbiAgICBjYXNlICc9PSc6XG4gICAgICByZXR1cm4gZXEoYSwgYiwgbG9vc2UpXG5cbiAgICBjYXNlICchPSc6XG4gICAgICByZXR1cm4gbmVxKGEsIGIsIGxvb3NlKVxuXG4gICAgY2FzZSAnPic6XG4gICAgICByZXR1cm4gZ3QoYSwgYiwgbG9vc2UpXG5cbiAgICBjYXNlICc+PSc6XG4gICAgICByZXR1cm4gZ3RlKGEsIGIsIGxvb3NlKVxuXG4gICAgY2FzZSAnPCc6XG4gICAgICByZXR1cm4gbHQoYSwgYiwgbG9vc2UpXG5cbiAgICBjYXNlICc8PSc6XG4gICAgICByZXR1cm4gbHRlKGEsIGIsIGxvb3NlKVxuXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgb3BlcmF0b3I6ICcgKyBvcClcbiAgfVxufVxuXG5leHBvcnRzLkNvbXBhcmF0b3IgPSBDb21wYXJhdG9yXG5mdW5jdGlvbiBDb21wYXJhdG9yIChjb21wLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucyB8fCB0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcbiAgICBvcHRpb25zID0ge1xuICAgICAgbG9vc2U6ICEhb3B0aW9ucyxcbiAgICAgIGluY2x1ZGVQcmVyZWxlYXNlOiBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIGlmIChjb21wIGluc3RhbmNlb2YgQ29tcGFyYXRvcikge1xuICAgIGlmIChjb21wLmxvb3NlID09PSAhIW9wdGlvbnMubG9vc2UpIHtcbiAgICAgIHJldHVybiBjb21wXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbXAgPSBjb21wLnZhbHVlXG4gICAgfVxuICB9XG5cbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIENvbXBhcmF0b3IpKSB7XG4gICAgcmV0dXJuIG5ldyBDb21wYXJhdG9yKGNvbXAsIG9wdGlvbnMpXG4gIH1cblxuICBkZWJ1ZygnY29tcGFyYXRvcicsIGNvbXAsIG9wdGlvbnMpXG4gIHRoaXMub3B0aW9ucyA9IG9wdGlvbnNcbiAgdGhpcy5sb29zZSA9ICEhb3B0aW9ucy5sb29zZVxuICB0aGlzLnBhcnNlKGNvbXApXG5cbiAgaWYgKHRoaXMuc2VtdmVyID09PSBBTlkpIHtcbiAgICB0aGlzLnZhbHVlID0gJydcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnZhbHVlID0gdGhpcy5vcGVyYXRvciArIHRoaXMuc2VtdmVyLnZlcnNpb25cbiAgfVxuXG4gIGRlYnVnKCdjb21wJywgdGhpcylcbn1cblxudmFyIEFOWSA9IHt9XG5Db21wYXJhdG9yLnByb3RvdHlwZS5wYXJzZSA9IGZ1bmN0aW9uIChjb21wKSB7XG4gIHZhciByID0gdGhpcy5vcHRpb25zLmxvb3NlID8gcmVbdC5DT01QQVJBVE9STE9PU0VdIDogcmVbdC5DT01QQVJBVE9SXVxuICB2YXIgbSA9IGNvbXAubWF0Y2gocilcblxuICBpZiAoIW0pIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGNvbXBhcmF0b3I6ICcgKyBjb21wKVxuICB9XG5cbiAgdGhpcy5vcGVyYXRvciA9IG1bMV0gIT09IHVuZGVmaW5lZCA/IG1bMV0gOiAnJ1xuICBpZiAodGhpcy5vcGVyYXRvciA9PT0gJz0nKSB7XG4gICAgdGhpcy5vcGVyYXRvciA9ICcnXG4gIH1cblxuICAvLyBpZiBpdCBsaXRlcmFsbHkgaXMganVzdCAnPicgb3IgJycgdGhlbiBhbGxvdyBhbnl0aGluZy5cbiAgaWYgKCFtWzJdKSB7XG4gICAgdGhpcy5zZW12ZXIgPSBBTllcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnNlbXZlciA9IG5ldyBTZW1WZXIobVsyXSwgdGhpcy5vcHRpb25zLmxvb3NlKVxuICB9XG59XG5cbkNvbXBhcmF0b3IucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy52YWx1ZVxufVxuXG5Db21wYXJhdG9yLnByb3RvdHlwZS50ZXN0ID0gZnVuY3Rpb24gKHZlcnNpb24pIHtcbiAgZGVidWcoJ0NvbXBhcmF0b3IudGVzdCcsIHZlcnNpb24sIHRoaXMub3B0aW9ucy5sb29zZSlcblxuICBpZiAodGhpcy5zZW12ZXIgPT09IEFOWSB8fCB2ZXJzaW9uID09PSBBTlkpIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgaWYgKHR5cGVvZiB2ZXJzaW9uID09PSAnc3RyaW5nJykge1xuICAgIHRyeSB7XG4gICAgICB2ZXJzaW9uID0gbmV3IFNlbVZlcih2ZXJzaW9uLCB0aGlzLm9wdGlvbnMpXG4gICAgfSBjYXRjaCAoZXIpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjbXAodmVyc2lvbiwgdGhpcy5vcGVyYXRvciwgdGhpcy5zZW12ZXIsIHRoaXMub3B0aW9ucylcbn1cblxuQ29tcGFyYXRvci5wcm90b3R5cGUuaW50ZXJzZWN0cyA9IGZ1bmN0aW9uIChjb21wLCBvcHRpb25zKSB7XG4gIGlmICghKGNvbXAgaW5zdGFuY2VvZiBDb21wYXJhdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2EgQ29tcGFyYXRvciBpcyByZXF1aXJlZCcpXG4gIH1cblxuICBpZiAoIW9wdGlvbnMgfHwgdHlwZW9mIG9wdGlvbnMgIT09ICdvYmplY3QnKSB7XG4gICAgb3B0aW9ucyA9IHtcbiAgICAgIGxvb3NlOiAhIW9wdGlvbnMsXG4gICAgICBpbmNsdWRlUHJlcmVsZWFzZTogZmFsc2VcbiAgICB9XG4gIH1cblxuICB2YXIgcmFuZ2VUbXBcblxuICBpZiAodGhpcy5vcGVyYXRvciA9PT0gJycpIHtcbiAgICBpZiAodGhpcy52YWx1ZSA9PT0gJycpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIHJhbmdlVG1wID0gbmV3IFJhbmdlKGNvbXAudmFsdWUsIG9wdGlvbnMpXG4gICAgcmV0dXJuIHNhdGlzZmllcyh0aGlzLnZhbHVlLCByYW5nZVRtcCwgb3B0aW9ucylcbiAgfSBlbHNlIGlmIChjb21wLm9wZXJhdG9yID09PSAnJykge1xuICAgIGlmIChjb21wLnZhbHVlID09PSAnJykge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgcmFuZ2VUbXAgPSBuZXcgUmFuZ2UodGhpcy52YWx1ZSwgb3B0aW9ucylcbiAgICByZXR1cm4gc2F0aXNmaWVzKGNvbXAuc2VtdmVyLCByYW5nZVRtcCwgb3B0aW9ucylcbiAgfVxuXG4gIHZhciBzYW1lRGlyZWN0aW9uSW5jcmVhc2luZyA9XG4gICAgKHRoaXMub3BlcmF0b3IgPT09ICc+PScgfHwgdGhpcy5vcGVyYXRvciA9PT0gJz4nKSAmJlxuICAgIChjb21wLm9wZXJhdG9yID09PSAnPj0nIHx8IGNvbXAub3BlcmF0b3IgPT09ICc+JylcbiAgdmFyIHNhbWVEaXJlY3Rpb25EZWNyZWFzaW5nID1cbiAgICAodGhpcy5vcGVyYXRvciA9PT0gJzw9JyB8fCB0aGlzLm9wZXJhdG9yID09PSAnPCcpICYmXG4gICAgKGNvbXAub3BlcmF0b3IgPT09ICc8PScgfHwgY29tcC5vcGVyYXRvciA9PT0gJzwnKVxuICB2YXIgc2FtZVNlbVZlciA9IHRoaXMuc2VtdmVyLnZlcnNpb24gPT09IGNvbXAuc2VtdmVyLnZlcnNpb25cbiAgdmFyIGRpZmZlcmVudERpcmVjdGlvbnNJbmNsdXNpdmUgPVxuICAgICh0aGlzLm9wZXJhdG9yID09PSAnPj0nIHx8IHRoaXMub3BlcmF0b3IgPT09ICc8PScpICYmXG4gICAgKGNvbXAub3BlcmF0b3IgPT09ICc+PScgfHwgY29tcC5vcGVyYXRvciA9PT0gJzw9JylcbiAgdmFyIG9wcG9zaXRlRGlyZWN0aW9uc0xlc3NUaGFuID1cbiAgICBjbXAodGhpcy5zZW12ZXIsICc8JywgY29tcC5zZW12ZXIsIG9wdGlvbnMpICYmXG4gICAgKCh0aGlzLm9wZXJhdG9yID09PSAnPj0nIHx8IHRoaXMub3BlcmF0b3IgPT09ICc+JykgJiZcbiAgICAoY29tcC5vcGVyYXRvciA9PT0gJzw9JyB8fCBjb21wLm9wZXJhdG9yID09PSAnPCcpKVxuICB2YXIgb3Bwb3NpdGVEaXJlY3Rpb25zR3JlYXRlclRoYW4gPVxuICAgIGNtcCh0aGlzLnNlbXZlciwgJz4nLCBjb21wLnNlbXZlciwgb3B0aW9ucykgJiZcbiAgICAoKHRoaXMub3BlcmF0b3IgPT09ICc8PScgfHwgdGhpcy5vcGVyYXRvciA9PT0gJzwnKSAmJlxuICAgIChjb21wLm9wZXJhdG9yID09PSAnPj0nIHx8IGNvbXAub3BlcmF0b3IgPT09ICc+JykpXG5cbiAgcmV0dXJuIHNhbWVEaXJlY3Rpb25JbmNyZWFzaW5nIHx8IHNhbWVEaXJlY3Rpb25EZWNyZWFzaW5nIHx8XG4gICAgKHNhbWVTZW1WZXIgJiYgZGlmZmVyZW50RGlyZWN0aW9uc0luY2x1c2l2ZSkgfHxcbiAgICBvcHBvc2l0ZURpcmVjdGlvbnNMZXNzVGhhbiB8fCBvcHBvc2l0ZURpcmVjdGlvbnNHcmVhdGVyVGhhblxufVxuXG5leHBvcnRzLlJhbmdlID0gUmFuZ2VcbmZ1bmN0aW9uIFJhbmdlIChyYW5nZSwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMgfHwgdHlwZW9mIG9wdGlvbnMgIT09ICdvYmplY3QnKSB7XG4gICAgb3B0aW9ucyA9IHtcbiAgICAgIGxvb3NlOiAhIW9wdGlvbnMsXG4gICAgICBpbmNsdWRlUHJlcmVsZWFzZTogZmFsc2VcbiAgICB9XG4gIH1cblxuICBpZiAocmFuZ2UgaW5zdGFuY2VvZiBSYW5nZSkge1xuICAgIGlmIChyYW5nZS5sb29zZSA9PT0gISFvcHRpb25zLmxvb3NlICYmXG4gICAgICAgIHJhbmdlLmluY2x1ZGVQcmVyZWxlYXNlID09PSAhIW9wdGlvbnMuaW5jbHVkZVByZXJlbGVhc2UpIHtcbiAgICAgIHJldHVybiByYW5nZVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IFJhbmdlKHJhbmdlLnJhdywgb3B0aW9ucylcbiAgICB9XG4gIH1cblxuICBpZiAocmFuZ2UgaW5zdGFuY2VvZiBDb21wYXJhdG9yKSB7XG4gICAgcmV0dXJuIG5ldyBSYW5nZShyYW5nZS52YWx1ZSwgb3B0aW9ucylcbiAgfVxuXG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBSYW5nZSkpIHtcbiAgICByZXR1cm4gbmV3IFJhbmdlKHJhbmdlLCBvcHRpb25zKVxuICB9XG5cbiAgdGhpcy5vcHRpb25zID0gb3B0aW9uc1xuICB0aGlzLmxvb3NlID0gISFvcHRpb25zLmxvb3NlXG4gIHRoaXMuaW5jbHVkZVByZXJlbGVhc2UgPSAhIW9wdGlvbnMuaW5jbHVkZVByZXJlbGVhc2VcblxuICAvLyBGaXJzdCwgc3BsaXQgYmFzZWQgb24gYm9vbGVhbiBvciB8fFxuICB0aGlzLnJhdyA9IHJhbmdlXG4gIHRoaXMuc2V0ID0gcmFuZ2Uuc3BsaXQoL1xccypcXHxcXHxcXHMqLykubWFwKGZ1bmN0aW9uIChyYW5nZSkge1xuICAgIHJldHVybiB0aGlzLnBhcnNlUmFuZ2UocmFuZ2UudHJpbSgpKVxuICB9LCB0aGlzKS5maWx0ZXIoZnVuY3Rpb24gKGMpIHtcbiAgICAvLyB0aHJvdyBvdXQgYW55IHRoYXQgYXJlIG5vdCByZWxldmFudCBmb3Igd2hhdGV2ZXIgcmVhc29uXG4gICAgcmV0dXJuIGMubGVuZ3RoXG4gIH0pXG5cbiAgaWYgKCF0aGlzLnNldC5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIFNlbVZlciBSYW5nZTogJyArIHJhbmdlKVxuICB9XG5cbiAgdGhpcy5mb3JtYXQoKVxufVxuXG5SYW5nZS5wcm90b3R5cGUuZm9ybWF0ID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLnJhbmdlID0gdGhpcy5zZXQubWFwKGZ1bmN0aW9uIChjb21wcykge1xuICAgIHJldHVybiBjb21wcy5qb2luKCcgJykudHJpbSgpXG4gIH0pLmpvaW4oJ3x8JykudHJpbSgpXG4gIHJldHVybiB0aGlzLnJhbmdlXG59XG5cblJhbmdlLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMucmFuZ2Vcbn1cblxuUmFuZ2UucHJvdG90eXBlLnBhcnNlUmFuZ2UgPSBmdW5jdGlvbiAocmFuZ2UpIHtcbiAgdmFyIGxvb3NlID0gdGhpcy5vcHRpb25zLmxvb3NlXG4gIHJhbmdlID0gcmFuZ2UudHJpbSgpXG4gIC8vIGAxLjIuMyAtIDEuMi40YCA9PiBgPj0xLjIuMyA8PTEuMi40YFxuICB2YXIgaHIgPSBsb29zZSA/IHJlW3QuSFlQSEVOUkFOR0VMT09TRV0gOiByZVt0LkhZUEhFTlJBTkdFXVxuICByYW5nZSA9IHJhbmdlLnJlcGxhY2UoaHIsIGh5cGhlblJlcGxhY2UpXG4gIGRlYnVnKCdoeXBoZW4gcmVwbGFjZScsIHJhbmdlKVxuICAvLyBgPiAxLjIuMyA8IDEuMi41YCA9PiBgPjEuMi4zIDwxLjIuNWBcbiAgcmFuZ2UgPSByYW5nZS5yZXBsYWNlKHJlW3QuQ09NUEFSQVRPUlRSSU1dLCBjb21wYXJhdG9yVHJpbVJlcGxhY2UpXG4gIGRlYnVnKCdjb21wYXJhdG9yIHRyaW0nLCByYW5nZSwgcmVbdC5DT01QQVJBVE9SVFJJTV0pXG5cbiAgLy8gYH4gMS4yLjNgID0+IGB+MS4yLjNgXG4gIHJhbmdlID0gcmFuZ2UucmVwbGFjZShyZVt0LlRJTERFVFJJTV0sIHRpbGRlVHJpbVJlcGxhY2UpXG5cbiAgLy8gYF4gMS4yLjNgID0+IGBeMS4yLjNgXG4gIHJhbmdlID0gcmFuZ2UucmVwbGFjZShyZVt0LkNBUkVUVFJJTV0sIGNhcmV0VHJpbVJlcGxhY2UpXG5cbiAgLy8gbm9ybWFsaXplIHNwYWNlc1xuICByYW5nZSA9IHJhbmdlLnNwbGl0KC9cXHMrLykuam9pbignICcpXG5cbiAgLy8gQXQgdGhpcyBwb2ludCwgdGhlIHJhbmdlIGlzIGNvbXBsZXRlbHkgdHJpbW1lZCBhbmRcbiAgLy8gcmVhZHkgdG8gYmUgc3BsaXQgaW50byBjb21wYXJhdG9ycy5cblxuICB2YXIgY29tcFJlID0gbG9vc2UgPyByZVt0LkNPTVBBUkFUT1JMT09TRV0gOiByZVt0LkNPTVBBUkFUT1JdXG4gIHZhciBzZXQgPSByYW5nZS5zcGxpdCgnICcpLm1hcChmdW5jdGlvbiAoY29tcCkge1xuICAgIHJldHVybiBwYXJzZUNvbXBhcmF0b3IoY29tcCwgdGhpcy5vcHRpb25zKVxuICB9LCB0aGlzKS5qb2luKCcgJykuc3BsaXQoL1xccysvKVxuICBpZiAodGhpcy5vcHRpb25zLmxvb3NlKSB7XG4gICAgLy8gaW4gbG9vc2UgbW9kZSwgdGhyb3cgb3V0IGFueSB0aGF0IGFyZSBub3QgdmFsaWQgY29tcGFyYXRvcnNcbiAgICBzZXQgPSBzZXQuZmlsdGVyKGZ1bmN0aW9uIChjb21wKSB7XG4gICAgICByZXR1cm4gISFjb21wLm1hdGNoKGNvbXBSZSlcbiAgICB9KVxuICB9XG4gIHNldCA9IHNldC5tYXAoZnVuY3Rpb24gKGNvbXApIHtcbiAgICByZXR1cm4gbmV3IENvbXBhcmF0b3IoY29tcCwgdGhpcy5vcHRpb25zKVxuICB9LCB0aGlzKVxuXG4gIHJldHVybiBzZXRcbn1cblxuUmFuZ2UucHJvdG90eXBlLmludGVyc2VjdHMgPSBmdW5jdGlvbiAocmFuZ2UsIG9wdGlvbnMpIHtcbiAgaWYgKCEocmFuZ2UgaW5zdGFuY2VvZiBSYW5nZSkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdhIFJhbmdlIGlzIHJlcXVpcmVkJylcbiAgfVxuXG4gIHJldHVybiB0aGlzLnNldC5zb21lKGZ1bmN0aW9uICh0aGlzQ29tcGFyYXRvcnMpIHtcbiAgICByZXR1cm4gKFxuICAgICAgaXNTYXRpc2ZpYWJsZSh0aGlzQ29tcGFyYXRvcnMsIG9wdGlvbnMpICYmXG4gICAgICByYW5nZS5zZXQuc29tZShmdW5jdGlvbiAocmFuZ2VDb21wYXJhdG9ycykge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIGlzU2F0aXNmaWFibGUocmFuZ2VDb21wYXJhdG9ycywgb3B0aW9ucykgJiZcbiAgICAgICAgICB0aGlzQ29tcGFyYXRvcnMuZXZlcnkoZnVuY3Rpb24gKHRoaXNDb21wYXJhdG9yKSB7XG4gICAgICAgICAgICByZXR1cm4gcmFuZ2VDb21wYXJhdG9ycy5ldmVyeShmdW5jdGlvbiAocmFuZ2VDb21wYXJhdG9yKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzQ29tcGFyYXRvci5pbnRlcnNlY3RzKHJhbmdlQ29tcGFyYXRvciwgb3B0aW9ucylcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgfSlcbiAgICApXG4gIH0pXG59XG5cbi8vIHRha2UgYSBzZXQgb2YgY29tcGFyYXRvcnMgYW5kIGRldGVybWluZSB3aGV0aGVyIHRoZXJlXG4vLyBleGlzdHMgYSB2ZXJzaW9uIHdoaWNoIGNhbiBzYXRpc2Z5IGl0XG5mdW5jdGlvbiBpc1NhdGlzZmlhYmxlIChjb21wYXJhdG9ycywgb3B0aW9ucykge1xuICB2YXIgcmVzdWx0ID0gdHJ1ZVxuICB2YXIgcmVtYWluaW5nQ29tcGFyYXRvcnMgPSBjb21wYXJhdG9ycy5zbGljZSgpXG4gIHZhciB0ZXN0Q29tcGFyYXRvciA9IHJlbWFpbmluZ0NvbXBhcmF0b3JzLnBvcCgpXG5cbiAgd2hpbGUgKHJlc3VsdCAmJiByZW1haW5pbmdDb21wYXJhdG9ycy5sZW5ndGgpIHtcbiAgICByZXN1bHQgPSByZW1haW5pbmdDb21wYXJhdG9ycy5ldmVyeShmdW5jdGlvbiAob3RoZXJDb21wYXJhdG9yKSB7XG4gICAgICByZXR1cm4gdGVzdENvbXBhcmF0b3IuaW50ZXJzZWN0cyhvdGhlckNvbXBhcmF0b3IsIG9wdGlvbnMpXG4gICAgfSlcblxuICAgIHRlc3RDb21wYXJhdG9yID0gcmVtYWluaW5nQ29tcGFyYXRvcnMucG9wKClcbiAgfVxuXG4gIHJldHVybiByZXN1bHRcbn1cblxuLy8gTW9zdGx5IGp1c3QgZm9yIHRlc3RpbmcgYW5kIGxlZ2FjeSBBUEkgcmVhc29uc1xuZXhwb3J0cy50b0NvbXBhcmF0b3JzID0gdG9Db21wYXJhdG9yc1xuZnVuY3Rpb24gdG9Db21wYXJhdG9ycyAocmFuZ2UsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBSYW5nZShyYW5nZSwgb3B0aW9ucykuc2V0Lm1hcChmdW5jdGlvbiAoY29tcCkge1xuICAgIHJldHVybiBjb21wLm1hcChmdW5jdGlvbiAoYykge1xuICAgICAgcmV0dXJuIGMudmFsdWVcbiAgICB9KS5qb2luKCcgJykudHJpbSgpLnNwbGl0KCcgJylcbiAgfSlcbn1cblxuLy8gY29tcHJpc2VkIG9mIHhyYW5nZXMsIHRpbGRlcywgc3RhcnMsIGFuZCBndGx0J3MgYXQgdGhpcyBwb2ludC5cbi8vIGFscmVhZHkgcmVwbGFjZWQgdGhlIGh5cGhlbiByYW5nZXNcbi8vIHR1cm4gaW50byBhIHNldCBvZiBKVVNUIGNvbXBhcmF0b3JzLlxuZnVuY3Rpb24gcGFyc2VDb21wYXJhdG9yIChjb21wLCBvcHRpb25zKSB7XG4gIGRlYnVnKCdjb21wJywgY29tcCwgb3B0aW9ucylcbiAgY29tcCA9IHJlcGxhY2VDYXJldHMoY29tcCwgb3B0aW9ucylcbiAgZGVidWcoJ2NhcmV0JywgY29tcClcbiAgY29tcCA9IHJlcGxhY2VUaWxkZXMoY29tcCwgb3B0aW9ucylcbiAgZGVidWcoJ3RpbGRlcycsIGNvbXApXG4gIGNvbXAgPSByZXBsYWNlWFJhbmdlcyhjb21wLCBvcHRpb25zKVxuICBkZWJ1ZygneHJhbmdlJywgY29tcClcbiAgY29tcCA9IHJlcGxhY2VTdGFycyhjb21wLCBvcHRpb25zKVxuICBkZWJ1Zygnc3RhcnMnLCBjb21wKVxuICByZXR1cm4gY29tcFxufVxuXG5mdW5jdGlvbiBpc1ggKGlkKSB7XG4gIHJldHVybiAhaWQgfHwgaWQudG9Mb3dlckNhc2UoKSA9PT0gJ3gnIHx8IGlkID09PSAnKidcbn1cblxuLy8gfiwgfj4gLS0+ICogKGFueSwga2luZGEgc2lsbHkpXG4vLyB+MiwgfjIueCwgfjIueC54LCB+PjIsIH4+Mi54IH4+Mi54LnggLS0+ID49Mi4wLjAgPDMuMC4wXG4vLyB+Mi4wLCB+Mi4wLngsIH4+Mi4wLCB+PjIuMC54IC0tPiA+PTIuMC4wIDwyLjEuMFxuLy8gfjEuMiwgfjEuMi54LCB+PjEuMiwgfj4xLjIueCAtLT4gPj0xLjIuMCA8MS4zLjBcbi8vIH4xLjIuMywgfj4xLjIuMyAtLT4gPj0xLjIuMyA8MS4zLjBcbi8vIH4xLjIuMCwgfj4xLjIuMCAtLT4gPj0xLjIuMCA8MS4zLjBcbmZ1bmN0aW9uIHJlcGxhY2VUaWxkZXMgKGNvbXAsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIGNvbXAudHJpbSgpLnNwbGl0KC9cXHMrLykubWFwKGZ1bmN0aW9uIChjb21wKSB7XG4gICAgcmV0dXJuIHJlcGxhY2VUaWxkZShjb21wLCBvcHRpb25zKVxuICB9KS5qb2luKCcgJylcbn1cblxuZnVuY3Rpb24gcmVwbGFjZVRpbGRlIChjb21wLCBvcHRpb25zKSB7XG4gIHZhciByID0gb3B0aW9ucy5sb29zZSA/IHJlW3QuVElMREVMT09TRV0gOiByZVt0LlRJTERFXVxuICByZXR1cm4gY29tcC5yZXBsYWNlKHIsIGZ1bmN0aW9uIChfLCBNLCBtLCBwLCBwcikge1xuICAgIGRlYnVnKCd0aWxkZScsIGNvbXAsIF8sIE0sIG0sIHAsIHByKVxuICAgIHZhciByZXRcblxuICAgIGlmIChpc1goTSkpIHtcbiAgICAgIHJldCA9ICcnXG4gICAgfSBlbHNlIGlmIChpc1gobSkpIHtcbiAgICAgIHJldCA9ICc+PScgKyBNICsgJy4wLjAgPCcgKyAoK00gKyAxKSArICcuMC4wJ1xuICAgIH0gZWxzZSBpZiAoaXNYKHApKSB7XG4gICAgICAvLyB+MS4yID09ID49MS4yLjAgPDEuMy4wXG4gICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLjAgPCcgKyBNICsgJy4nICsgKCttICsgMSkgKyAnLjAnXG4gICAgfSBlbHNlIGlmIChwcikge1xuICAgICAgZGVidWcoJ3JlcGxhY2VUaWxkZSBwcicsIHByKVxuICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4nICsgcCArICctJyArIHByICtcbiAgICAgICAgICAgICcgPCcgKyBNICsgJy4nICsgKCttICsgMSkgKyAnLjAnXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIH4xLjIuMyA9PSA+PTEuMi4zIDwxLjMuMFxuICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4nICsgcCArXG4gICAgICAgICAgICAnIDwnICsgTSArICcuJyArICgrbSArIDEpICsgJy4wJ1xuICAgIH1cblxuICAgIGRlYnVnKCd0aWxkZSByZXR1cm4nLCByZXQpXG4gICAgcmV0dXJuIHJldFxuICB9KVxufVxuXG4vLyBeIC0tPiAqIChhbnksIGtpbmRhIHNpbGx5KVxuLy8gXjIsIF4yLngsIF4yLngueCAtLT4gPj0yLjAuMCA8My4wLjBcbi8vIF4yLjAsIF4yLjAueCAtLT4gPj0yLjAuMCA8My4wLjBcbi8vIF4xLjIsIF4xLjIueCAtLT4gPj0xLjIuMCA8Mi4wLjBcbi8vIF4xLjIuMyAtLT4gPj0xLjIuMyA8Mi4wLjBcbi8vIF4xLjIuMCAtLT4gPj0xLjIuMCA8Mi4wLjBcbmZ1bmN0aW9uIHJlcGxhY2VDYXJldHMgKGNvbXAsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIGNvbXAudHJpbSgpLnNwbGl0KC9cXHMrLykubWFwKGZ1bmN0aW9uIChjb21wKSB7XG4gICAgcmV0dXJuIHJlcGxhY2VDYXJldChjb21wLCBvcHRpb25zKVxuICB9KS5qb2luKCcgJylcbn1cblxuZnVuY3Rpb24gcmVwbGFjZUNhcmV0IChjb21wLCBvcHRpb25zKSB7XG4gIGRlYnVnKCdjYXJldCcsIGNvbXAsIG9wdGlvbnMpXG4gIHZhciByID0gb3B0aW9ucy5sb29zZSA/IHJlW3QuQ0FSRVRMT09TRV0gOiByZVt0LkNBUkVUXVxuICByZXR1cm4gY29tcC5yZXBsYWNlKHIsIGZ1bmN0aW9uIChfLCBNLCBtLCBwLCBwcikge1xuICAgIGRlYnVnKCdjYXJldCcsIGNvbXAsIF8sIE0sIG0sIHAsIHByKVxuICAgIHZhciByZXRcblxuICAgIGlmIChpc1goTSkpIHtcbiAgICAgIHJldCA9ICcnXG4gICAgfSBlbHNlIGlmIChpc1gobSkpIHtcbiAgICAgIHJldCA9ICc+PScgKyBNICsgJy4wLjAgPCcgKyAoK00gKyAxKSArICcuMC4wJ1xuICAgIH0gZWxzZSBpZiAoaXNYKHApKSB7XG4gICAgICBpZiAoTSA9PT0gJzAnKSB7XG4gICAgICAgIHJldCA9ICc+PScgKyBNICsgJy4nICsgbSArICcuMCA8JyArIE0gKyAnLicgKyAoK20gKyAxKSArICcuMCdcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldCA9ICc+PScgKyBNICsgJy4nICsgbSArICcuMCA8JyArICgrTSArIDEpICsgJy4wLjAnXG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChwcikge1xuICAgICAgZGVidWcoJ3JlcGxhY2VDYXJldCBwcicsIHByKVxuICAgICAgaWYgKE0gPT09ICcwJykge1xuICAgICAgICBpZiAobSA9PT0gJzAnKSB7XG4gICAgICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4nICsgcCArICctJyArIHByICtcbiAgICAgICAgICAgICAgICAnIDwnICsgTSArICcuJyArIG0gKyAnLicgKyAoK3AgKyAxKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldCA9ICc+PScgKyBNICsgJy4nICsgbSArICcuJyArIHAgKyAnLScgKyBwciArXG4gICAgICAgICAgICAgICAgJyA8JyArIE0gKyAnLicgKyAoK20gKyAxKSArICcuMCdcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4nICsgcCArICctJyArIHByICtcbiAgICAgICAgICAgICAgJyA8JyArICgrTSArIDEpICsgJy4wLjAnXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlYnVnKCdubyBwcicpXG4gICAgICBpZiAoTSA9PT0gJzAnKSB7XG4gICAgICAgIGlmIChtID09PSAnMCcpIHtcbiAgICAgICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLicgKyBwICtcbiAgICAgICAgICAgICAgICAnIDwnICsgTSArICcuJyArIG0gKyAnLicgKyAoK3AgKyAxKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldCA9ICc+PScgKyBNICsgJy4nICsgbSArICcuJyArIHAgK1xuICAgICAgICAgICAgICAgICcgPCcgKyBNICsgJy4nICsgKCttICsgMSkgKyAnLjAnXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldCA9ICc+PScgKyBNICsgJy4nICsgbSArICcuJyArIHAgK1xuICAgICAgICAgICAgICAnIDwnICsgKCtNICsgMSkgKyAnLjAuMCdcbiAgICAgIH1cbiAgICB9XG5cbiAgICBkZWJ1ZygnY2FyZXQgcmV0dXJuJywgcmV0KVxuICAgIHJldHVybiByZXRcbiAgfSlcbn1cblxuZnVuY3Rpb24gcmVwbGFjZVhSYW5nZXMgKGNvbXAsIG9wdGlvbnMpIHtcbiAgZGVidWcoJ3JlcGxhY2VYUmFuZ2VzJywgY29tcCwgb3B0aW9ucylcbiAgcmV0dXJuIGNvbXAuc3BsaXQoL1xccysvKS5tYXAoZnVuY3Rpb24gKGNvbXApIHtcbiAgICByZXR1cm4gcmVwbGFjZVhSYW5nZShjb21wLCBvcHRpb25zKVxuICB9KS5qb2luKCcgJylcbn1cblxuZnVuY3Rpb24gcmVwbGFjZVhSYW5nZSAoY29tcCwgb3B0aW9ucykge1xuICBjb21wID0gY29tcC50cmltKClcbiAgdmFyIHIgPSBvcHRpb25zLmxvb3NlID8gcmVbdC5YUkFOR0VMT09TRV0gOiByZVt0LlhSQU5HRV1cbiAgcmV0dXJuIGNvbXAucmVwbGFjZShyLCBmdW5jdGlvbiAocmV0LCBndGx0LCBNLCBtLCBwLCBwcikge1xuICAgIGRlYnVnKCd4UmFuZ2UnLCBjb21wLCByZXQsIGd0bHQsIE0sIG0sIHAsIHByKVxuICAgIHZhciB4TSA9IGlzWChNKVxuICAgIHZhciB4bSA9IHhNIHx8IGlzWChtKVxuICAgIHZhciB4cCA9IHhtIHx8IGlzWChwKVxuICAgIHZhciBhbnlYID0geHBcblxuICAgIGlmIChndGx0ID09PSAnPScgJiYgYW55WCkge1xuICAgICAgZ3RsdCA9ICcnXG4gICAgfVxuXG4gICAgLy8gaWYgd2UncmUgaW5jbHVkaW5nIHByZXJlbGVhc2VzIGluIHRoZSBtYXRjaCwgdGhlbiB3ZSBuZWVkXG4gICAgLy8gdG8gZml4IHRoaXMgdG8gLTAsIHRoZSBsb3dlc3QgcG9zc2libGUgcHJlcmVsZWFzZSB2YWx1ZVxuICAgIHByID0gb3B0aW9ucy5pbmNsdWRlUHJlcmVsZWFzZSA/ICctMCcgOiAnJ1xuXG4gICAgaWYgKHhNKSB7XG4gICAgICBpZiAoZ3RsdCA9PT0gJz4nIHx8IGd0bHQgPT09ICc8Jykge1xuICAgICAgICAvLyBub3RoaW5nIGlzIGFsbG93ZWRcbiAgICAgICAgcmV0ID0gJzwwLjAuMC0wJ1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gbm90aGluZyBpcyBmb3JiaWRkZW5cbiAgICAgICAgcmV0ID0gJyonXG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChndGx0ICYmIGFueVgpIHtcbiAgICAgIC8vIHdlIGtub3cgcGF0Y2ggaXMgYW4geCwgYmVjYXVzZSB3ZSBoYXZlIGFueSB4IGF0IGFsbC5cbiAgICAgIC8vIHJlcGxhY2UgWCB3aXRoIDBcbiAgICAgIGlmICh4bSkge1xuICAgICAgICBtID0gMFxuICAgICAgfVxuICAgICAgcCA9IDBcblxuICAgICAgaWYgKGd0bHQgPT09ICc+Jykge1xuICAgICAgICAvLyA+MSA9PiA+PTIuMC4wXG4gICAgICAgIC8vID4xLjIgPT4gPj0xLjMuMFxuICAgICAgICAvLyA+MS4yLjMgPT4gPj0gMS4yLjRcbiAgICAgICAgZ3RsdCA9ICc+PSdcbiAgICAgICAgaWYgKHhtKSB7XG4gICAgICAgICAgTSA9ICtNICsgMVxuICAgICAgICAgIG0gPSAwXG4gICAgICAgICAgcCA9IDBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtID0gK20gKyAxXG4gICAgICAgICAgcCA9IDBcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChndGx0ID09PSAnPD0nKSB7XG4gICAgICAgIC8vIDw9MC43LnggaXMgYWN0dWFsbHkgPDAuOC4wLCBzaW5jZSBhbnkgMC43Lnggc2hvdWxkXG4gICAgICAgIC8vIHBhc3MuICBTaW1pbGFybHksIDw9Ny54IGlzIGFjdHVhbGx5IDw4LjAuMCwgZXRjLlxuICAgICAgICBndGx0ID0gJzwnXG4gICAgICAgIGlmICh4bSkge1xuICAgICAgICAgIE0gPSArTSArIDFcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtID0gK20gKyAxXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0ID0gZ3RsdCArIE0gKyAnLicgKyBtICsgJy4nICsgcCArIHByXG4gICAgfSBlbHNlIGlmICh4bSkge1xuICAgICAgcmV0ID0gJz49JyArIE0gKyAnLjAuMCcgKyBwciArICcgPCcgKyAoK00gKyAxKSArICcuMC4wJyArIHByXG4gICAgfSBlbHNlIGlmICh4cCkge1xuICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4wJyArIHByICtcbiAgICAgICAgJyA8JyArIE0gKyAnLicgKyAoK20gKyAxKSArICcuMCcgKyBwclxuICAgIH1cblxuICAgIGRlYnVnKCd4UmFuZ2UgcmV0dXJuJywgcmV0KVxuXG4gICAgcmV0dXJuIHJldFxuICB9KVxufVxuXG4vLyBCZWNhdXNlICogaXMgQU5ELWVkIHdpdGggZXZlcnl0aGluZyBlbHNlIGluIHRoZSBjb21wYXJhdG9yLFxuLy8gYW5kICcnIG1lYW5zIFwiYW55IHZlcnNpb25cIiwganVzdCByZW1vdmUgdGhlICpzIGVudGlyZWx5LlxuZnVuY3Rpb24gcmVwbGFjZVN0YXJzIChjb21wLCBvcHRpb25zKSB7XG4gIGRlYnVnKCdyZXBsYWNlU3RhcnMnLCBjb21wLCBvcHRpb25zKVxuICAvLyBMb29zZW5lc3MgaXMgaWdub3JlZCBoZXJlLiAgc3RhciBpcyBhbHdheXMgYXMgbG9vc2UgYXMgaXQgZ2V0cyFcbiAgcmV0dXJuIGNvbXAudHJpbSgpLnJlcGxhY2UocmVbdC5TVEFSXSwgJycpXG59XG5cbi8vIFRoaXMgZnVuY3Rpb24gaXMgcGFzc2VkIHRvIHN0cmluZy5yZXBsYWNlKHJlW3QuSFlQSEVOUkFOR0VdKVxuLy8gTSwgbSwgcGF0Y2gsIHByZXJlbGVhc2UsIGJ1aWxkXG4vLyAxLjIgLSAzLjQuNSA9PiA+PTEuMi4wIDw9My40LjVcbi8vIDEuMi4zIC0gMy40ID0+ID49MS4yLjAgPDMuNS4wIEFueSAzLjQueCB3aWxsIGRvXG4vLyAxLjIgLSAzLjQgPT4gPj0xLjIuMCA8My41LjBcbmZ1bmN0aW9uIGh5cGhlblJlcGxhY2UgKCQwLFxuICBmcm9tLCBmTSwgZm0sIGZwLCBmcHIsIGZiLFxuICB0bywgdE0sIHRtLCB0cCwgdHByLCB0Yikge1xuICBpZiAoaXNYKGZNKSkge1xuICAgIGZyb20gPSAnJ1xuICB9IGVsc2UgaWYgKGlzWChmbSkpIHtcbiAgICBmcm9tID0gJz49JyArIGZNICsgJy4wLjAnXG4gIH0gZWxzZSBpZiAoaXNYKGZwKSkge1xuICAgIGZyb20gPSAnPj0nICsgZk0gKyAnLicgKyBmbSArICcuMCdcbiAgfSBlbHNlIHtcbiAgICBmcm9tID0gJz49JyArIGZyb21cbiAgfVxuXG4gIGlmIChpc1godE0pKSB7XG4gICAgdG8gPSAnJ1xuICB9IGVsc2UgaWYgKGlzWCh0bSkpIHtcbiAgICB0byA9ICc8JyArICgrdE0gKyAxKSArICcuMC4wJ1xuICB9IGVsc2UgaWYgKGlzWCh0cCkpIHtcbiAgICB0byA9ICc8JyArIHRNICsgJy4nICsgKCt0bSArIDEpICsgJy4wJ1xuICB9IGVsc2UgaWYgKHRwcikge1xuICAgIHRvID0gJzw9JyArIHRNICsgJy4nICsgdG0gKyAnLicgKyB0cCArICctJyArIHRwclxuICB9IGVsc2Uge1xuICAgIHRvID0gJzw9JyArIHRvXG4gIH1cblxuICByZXR1cm4gKGZyb20gKyAnICcgKyB0bykudHJpbSgpXG59XG5cbi8vIGlmIEFOWSBvZiB0aGUgc2V0cyBtYXRjaCBBTEwgb2YgaXRzIGNvbXBhcmF0b3JzLCB0aGVuIHBhc3NcblJhbmdlLnByb3RvdHlwZS50ZXN0ID0gZnVuY3Rpb24gKHZlcnNpb24pIHtcbiAgaWYgKCF2ZXJzaW9uKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBpZiAodHlwZW9mIHZlcnNpb24gPT09ICdzdHJpbmcnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHZlcnNpb24gPSBuZXcgU2VtVmVyKHZlcnNpb24sIHRoaXMub3B0aW9ucylcbiAgICB9IGNhdGNoIChlcikge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnNldC5sZW5ndGg7IGkrKykge1xuICAgIGlmICh0ZXN0U2V0KHRoaXMuc2V0W2ldLCB2ZXJzaW9uLCB0aGlzLm9wdGlvbnMpKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2Vcbn1cblxuZnVuY3Rpb24gdGVzdFNldCAoc2V0LCB2ZXJzaW9uLCBvcHRpb25zKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc2V0Lmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKCFzZXRbaV0udGVzdCh2ZXJzaW9uKSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG5cbiAgaWYgKHZlcnNpb24ucHJlcmVsZWFzZS5sZW5ndGggJiYgIW9wdGlvbnMuaW5jbHVkZVByZXJlbGVhc2UpIHtcbiAgICAvLyBGaW5kIHRoZSBzZXQgb2YgdmVyc2lvbnMgdGhhdCBhcmUgYWxsb3dlZCB0byBoYXZlIHByZXJlbGVhc2VzXG4gICAgLy8gRm9yIGV4YW1wbGUsIF4xLjIuMy1wci4xIGRlc3VnYXJzIHRvID49MS4yLjMtcHIuMSA8Mi4wLjBcbiAgICAvLyBUaGF0IHNob3VsZCBhbGxvdyBgMS4yLjMtcHIuMmAgdG8gcGFzcy5cbiAgICAvLyBIb3dldmVyLCBgMS4yLjQtYWxwaGEubm90cmVhZHlgIHNob3VsZCBOT1QgYmUgYWxsb3dlZCxcbiAgICAvLyBldmVuIHRob3VnaCBpdCdzIHdpdGhpbiB0aGUgcmFuZ2Ugc2V0IGJ5IHRoZSBjb21wYXJhdG9ycy5cbiAgICBmb3IgKGkgPSAwOyBpIDwgc2V0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBkZWJ1ZyhzZXRbaV0uc2VtdmVyKVxuICAgICAgaWYgKHNldFtpXS5zZW12ZXIgPT09IEFOWSkge1xuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICBpZiAoc2V0W2ldLnNlbXZlci5wcmVyZWxlYXNlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFyIGFsbG93ZWQgPSBzZXRbaV0uc2VtdmVyXG4gICAgICAgIGlmIChhbGxvd2VkLm1ham9yID09PSB2ZXJzaW9uLm1ham9yICYmXG4gICAgICAgICAgICBhbGxvd2VkLm1pbm9yID09PSB2ZXJzaW9uLm1pbm9yICYmXG4gICAgICAgICAgICBhbGxvd2VkLnBhdGNoID09PSB2ZXJzaW9uLnBhdGNoKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFZlcnNpb24gaGFzIGEgLXByZSwgYnV0IGl0J3Mgbm90IG9uZSBvZiB0aGUgb25lcyB3ZSBsaWtlLlxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgcmV0dXJuIHRydWVcbn1cblxuZXhwb3J0cy5zYXRpc2ZpZXMgPSBzYXRpc2ZpZXNcbmZ1bmN0aW9uIHNhdGlzZmllcyAodmVyc2lvbiwgcmFuZ2UsIG9wdGlvbnMpIHtcbiAgdHJ5IHtcbiAgICByYW5nZSA9IG5ldyBSYW5nZShyYW5nZSwgb3B0aW9ucylcbiAgfSBjYXRjaCAoZXIpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuICByZXR1cm4gcmFuZ2UudGVzdCh2ZXJzaW9uKVxufVxuXG5leHBvcnRzLm1heFNhdGlzZnlpbmcgPSBtYXhTYXRpc2Z5aW5nXG5mdW5jdGlvbiBtYXhTYXRpc2Z5aW5nICh2ZXJzaW9ucywgcmFuZ2UsIG9wdGlvbnMpIHtcbiAgdmFyIG1heCA9IG51bGxcbiAgdmFyIG1heFNWID0gbnVsbFxuICB0cnkge1xuICAgIHZhciByYW5nZU9iaiA9IG5ldyBSYW5nZShyYW5nZSwgb3B0aW9ucylcbiAgfSBjYXRjaCAoZXIpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG4gIHZlcnNpb25zLmZvckVhY2goZnVuY3Rpb24gKHYpIHtcbiAgICBpZiAocmFuZ2VPYmoudGVzdCh2KSkge1xuICAgICAgLy8gc2F0aXNmaWVzKHYsIHJhbmdlLCBvcHRpb25zKVxuICAgICAgaWYgKCFtYXggfHwgbWF4U1YuY29tcGFyZSh2KSA9PT0gLTEpIHtcbiAgICAgICAgLy8gY29tcGFyZShtYXgsIHYsIHRydWUpXG4gICAgICAgIG1heCA9IHZcbiAgICAgICAgbWF4U1YgPSBuZXcgU2VtVmVyKG1heCwgb3B0aW9ucylcbiAgICAgIH1cbiAgICB9XG4gIH0pXG4gIHJldHVybiBtYXhcbn1cblxuZXhwb3J0cy5taW5TYXRpc2Z5aW5nID0gbWluU2F0aXNmeWluZ1xuZnVuY3Rpb24gbWluU2F0aXNmeWluZyAodmVyc2lvbnMsIHJhbmdlLCBvcHRpb25zKSB7XG4gIHZhciBtaW4gPSBudWxsXG4gIHZhciBtaW5TViA9IG51bGxcbiAgdHJ5IHtcbiAgICB2YXIgcmFuZ2VPYmogPSBuZXcgUmFuZ2UocmFuZ2UsIG9wdGlvbnMpXG4gIH0gY2F0Y2ggKGVyKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuICB2ZXJzaW9ucy5mb3JFYWNoKGZ1bmN0aW9uICh2KSB7XG4gICAgaWYgKHJhbmdlT2JqLnRlc3QodikpIHtcbiAgICAgIC8vIHNhdGlzZmllcyh2LCByYW5nZSwgb3B0aW9ucylcbiAgICAgIGlmICghbWluIHx8IG1pblNWLmNvbXBhcmUodikgPT09IDEpIHtcbiAgICAgICAgLy8gY29tcGFyZShtaW4sIHYsIHRydWUpXG4gICAgICAgIG1pbiA9IHZcbiAgICAgICAgbWluU1YgPSBuZXcgU2VtVmVyKG1pbiwgb3B0aW9ucylcbiAgICAgIH1cbiAgICB9XG4gIH0pXG4gIHJldHVybiBtaW5cbn1cblxuZXhwb3J0cy5taW5WZXJzaW9uID0gbWluVmVyc2lvblxuZnVuY3Rpb24gbWluVmVyc2lvbiAocmFuZ2UsIGxvb3NlKSB7XG4gIHJhbmdlID0gbmV3IFJhbmdlKHJhbmdlLCBsb29zZSlcblxuICB2YXIgbWludmVyID0gbmV3IFNlbVZlcignMC4wLjAnKVxuICBpZiAocmFuZ2UudGVzdChtaW52ZXIpKSB7XG4gICAgcmV0dXJuIG1pbnZlclxuICB9XG5cbiAgbWludmVyID0gbmV3IFNlbVZlcignMC4wLjAtMCcpXG4gIGlmIChyYW5nZS50ZXN0KG1pbnZlcikpIHtcbiAgICByZXR1cm4gbWludmVyXG4gIH1cblxuICBtaW52ZXIgPSBudWxsXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmFuZ2Uuc2V0Lmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIGNvbXBhcmF0b3JzID0gcmFuZ2Uuc2V0W2ldXG5cbiAgICBjb21wYXJhdG9ycy5mb3JFYWNoKGZ1bmN0aW9uIChjb21wYXJhdG9yKSB7XG4gICAgICAvLyBDbG9uZSB0byBhdm9pZCBtYW5pcHVsYXRpbmcgdGhlIGNvbXBhcmF0b3IncyBzZW12ZXIgb2JqZWN0LlxuICAgICAgdmFyIGNvbXB2ZXIgPSBuZXcgU2VtVmVyKGNvbXBhcmF0b3Iuc2VtdmVyLnZlcnNpb24pXG4gICAgICBzd2l0Y2ggKGNvbXBhcmF0b3Iub3BlcmF0b3IpIHtcbiAgICAgICAgY2FzZSAnPic6XG4gICAgICAgICAgaWYgKGNvbXB2ZXIucHJlcmVsZWFzZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGNvbXB2ZXIucGF0Y2grK1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb21wdmVyLnByZXJlbGVhc2UucHVzaCgwKVxuICAgICAgICAgIH1cbiAgICAgICAgICBjb21wdmVyLnJhdyA9IGNvbXB2ZXIuZm9ybWF0KClcbiAgICAgICAgICAvKiBmYWxsdGhyb3VnaCAqL1xuICAgICAgICBjYXNlICcnOlxuICAgICAgICBjYXNlICc+PSc6XG4gICAgICAgICAgaWYgKCFtaW52ZXIgfHwgZ3QobWludmVyLCBjb21wdmVyKSkge1xuICAgICAgICAgICAgbWludmVyID0gY29tcHZlclxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlICc8JzpcbiAgICAgICAgY2FzZSAnPD0nOlxuICAgICAgICAgIC8qIElnbm9yZSBtYXhpbXVtIHZlcnNpb25zICovXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuZXhwZWN0ZWQgb3BlcmF0aW9uOiAnICsgY29tcGFyYXRvci5vcGVyYXRvcilcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgaWYgKG1pbnZlciAmJiByYW5nZS50ZXN0KG1pbnZlcikpIHtcbiAgICByZXR1cm4gbWludmVyXG4gIH1cblxuICByZXR1cm4gbnVsbFxufVxuXG5leHBvcnRzLnZhbGlkUmFuZ2UgPSB2YWxpZFJhbmdlXG5mdW5jdGlvbiB2YWxpZFJhbmdlIChyYW5nZSwgb3B0aW9ucykge1xuICB0cnkge1xuICAgIC8vIFJldHVybiAnKicgaW5zdGVhZCBvZiAnJyBzbyB0aGF0IHRydXRoaW5lc3Mgd29ya3MuXG4gICAgLy8gVGhpcyB3aWxsIHRocm93IGlmIGl0J3MgaW52YWxpZCBhbnl3YXlcbiAgICByZXR1cm4gbmV3IFJhbmdlKHJhbmdlLCBvcHRpb25zKS5yYW5nZSB8fCAnKidcbiAgfSBjYXRjaCAoZXIpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG59XG5cbi8vIERldGVybWluZSBpZiB2ZXJzaW9uIGlzIGxlc3MgdGhhbiBhbGwgdGhlIHZlcnNpb25zIHBvc3NpYmxlIGluIHRoZSByYW5nZVxuZXhwb3J0cy5sdHIgPSBsdHJcbmZ1bmN0aW9uIGx0ciAodmVyc2lvbiwgcmFuZ2UsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIG91dHNpZGUodmVyc2lvbiwgcmFuZ2UsICc8Jywgb3B0aW9ucylcbn1cblxuLy8gRGV0ZXJtaW5lIGlmIHZlcnNpb24gaXMgZ3JlYXRlciB0aGFuIGFsbCB0aGUgdmVyc2lvbnMgcG9zc2libGUgaW4gdGhlIHJhbmdlLlxuZXhwb3J0cy5ndHIgPSBndHJcbmZ1bmN0aW9uIGd0ciAodmVyc2lvbiwgcmFuZ2UsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIG91dHNpZGUodmVyc2lvbiwgcmFuZ2UsICc+Jywgb3B0aW9ucylcbn1cblxuZXhwb3J0cy5vdXRzaWRlID0gb3V0c2lkZVxuZnVuY3Rpb24gb3V0c2lkZSAodmVyc2lvbiwgcmFuZ2UsIGhpbG8sIG9wdGlvbnMpIHtcbiAgdmVyc2lvbiA9IG5ldyBTZW1WZXIodmVyc2lvbiwgb3B0aW9ucylcbiAgcmFuZ2UgPSBuZXcgUmFuZ2UocmFuZ2UsIG9wdGlvbnMpXG5cbiAgdmFyIGd0Zm4sIGx0ZWZuLCBsdGZuLCBjb21wLCBlY29tcFxuICBzd2l0Y2ggKGhpbG8pIHtcbiAgICBjYXNlICc+JzpcbiAgICAgIGd0Zm4gPSBndFxuICAgICAgbHRlZm4gPSBsdGVcbiAgICAgIGx0Zm4gPSBsdFxuICAgICAgY29tcCA9ICc+J1xuICAgICAgZWNvbXAgPSAnPj0nXG4gICAgICBicmVha1xuICAgIGNhc2UgJzwnOlxuICAgICAgZ3RmbiA9IGx0XG4gICAgICBsdGVmbiA9IGd0ZVxuICAgICAgbHRmbiA9IGd0XG4gICAgICBjb21wID0gJzwnXG4gICAgICBlY29tcCA9ICc8PSdcbiAgICAgIGJyZWFrXG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ011c3QgcHJvdmlkZSBhIGhpbG8gdmFsIG9mIFwiPFwiIG9yIFwiPlwiJylcbiAgfVxuXG4gIC8vIElmIGl0IHNhdGlzaWZlcyB0aGUgcmFuZ2UgaXQgaXMgbm90IG91dHNpZGVcbiAgaWYgKHNhdGlzZmllcyh2ZXJzaW9uLCByYW5nZSwgb3B0aW9ucykpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIC8vIEZyb20gbm93IG9uLCB2YXJpYWJsZSB0ZXJtcyBhcmUgYXMgaWYgd2UncmUgaW4gXCJndHJcIiBtb2RlLlxuICAvLyBidXQgbm90ZSB0aGF0IGV2ZXJ5dGhpbmcgaXMgZmxpcHBlZCBmb3IgdGhlIFwibHRyXCIgZnVuY3Rpb24uXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByYW5nZS5zZXQubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgY29tcGFyYXRvcnMgPSByYW5nZS5zZXRbaV1cblxuICAgIHZhciBoaWdoID0gbnVsbFxuICAgIHZhciBsb3cgPSBudWxsXG5cbiAgICBjb21wYXJhdG9ycy5mb3JFYWNoKGZ1bmN0aW9uIChjb21wYXJhdG9yKSB7XG4gICAgICBpZiAoY29tcGFyYXRvci5zZW12ZXIgPT09IEFOWSkge1xuICAgICAgICBjb21wYXJhdG9yID0gbmV3IENvbXBhcmF0b3IoJz49MC4wLjAnKVxuICAgICAgfVxuICAgICAgaGlnaCA9IGhpZ2ggfHwgY29tcGFyYXRvclxuICAgICAgbG93ID0gbG93IHx8IGNvbXBhcmF0b3JcbiAgICAgIGlmIChndGZuKGNvbXBhcmF0b3Iuc2VtdmVyLCBoaWdoLnNlbXZlciwgb3B0aW9ucykpIHtcbiAgICAgICAgaGlnaCA9IGNvbXBhcmF0b3JcbiAgICAgIH0gZWxzZSBpZiAobHRmbihjb21wYXJhdG9yLnNlbXZlciwgbG93LnNlbXZlciwgb3B0aW9ucykpIHtcbiAgICAgICAgbG93ID0gY29tcGFyYXRvclxuICAgICAgfVxuICAgIH0pXG5cbiAgICAvLyBJZiB0aGUgZWRnZSB2ZXJzaW9uIGNvbXBhcmF0b3IgaGFzIGEgb3BlcmF0b3IgdGhlbiBvdXIgdmVyc2lvblxuICAgIC8vIGlzbid0IG91dHNpZGUgaXRcbiAgICBpZiAoaGlnaC5vcGVyYXRvciA9PT0gY29tcCB8fCBoaWdoLm9wZXJhdG9yID09PSBlY29tcCkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgLy8gSWYgdGhlIGxvd2VzdCB2ZXJzaW9uIGNvbXBhcmF0b3IgaGFzIGFuIG9wZXJhdG9yIGFuZCBvdXIgdmVyc2lvblxuICAgIC8vIGlzIGxlc3MgdGhhbiBpdCB0aGVuIGl0IGlzbid0IGhpZ2hlciB0aGFuIHRoZSByYW5nZVxuICAgIGlmICgoIWxvdy5vcGVyYXRvciB8fCBsb3cub3BlcmF0b3IgPT09IGNvbXApICYmXG4gICAgICAgIGx0ZWZuKHZlcnNpb24sIGxvdy5zZW12ZXIpKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9IGVsc2UgaWYgKGxvdy5vcGVyYXRvciA9PT0gZWNvbXAgJiYgbHRmbih2ZXJzaW9uLCBsb3cuc2VtdmVyKSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlXG59XG5cbmV4cG9ydHMucHJlcmVsZWFzZSA9IHByZXJlbGVhc2VcbmZ1bmN0aW9uIHByZXJlbGVhc2UgKHZlcnNpb24sIG9wdGlvbnMpIHtcbiAgdmFyIHBhcnNlZCA9IHBhcnNlKHZlcnNpb24sIG9wdGlvbnMpXG4gIHJldHVybiAocGFyc2VkICYmIHBhcnNlZC5wcmVyZWxlYXNlLmxlbmd0aCkgPyBwYXJzZWQucHJlcmVsZWFzZSA6IG51bGxcbn1cblxuZXhwb3J0cy5pbnRlcnNlY3RzID0gaW50ZXJzZWN0c1xuZnVuY3Rpb24gaW50ZXJzZWN0cyAocjEsIHIyLCBvcHRpb25zKSB7XG4gIHIxID0gbmV3IFJhbmdlKHIxLCBvcHRpb25zKVxuICByMiA9IG5ldyBSYW5nZShyMiwgb3B0aW9ucylcbiAgcmV0dXJuIHIxLmludGVyc2VjdHMocjIpXG59XG5cbmV4cG9ydHMuY29lcmNlID0gY29lcmNlXG5mdW5jdGlvbiBjb2VyY2UgKHZlcnNpb24sIG9wdGlvbnMpIHtcbiAgaWYgKHZlcnNpb24gaW5zdGFuY2VvZiBTZW1WZXIpIHtcbiAgICByZXR1cm4gdmVyc2lvblxuICB9XG5cbiAgaWYgKHR5cGVvZiB2ZXJzaW9uID09PSAnbnVtYmVyJykge1xuICAgIHZlcnNpb24gPSBTdHJpbmcodmVyc2lvbilcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmVyc2lvbiAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cblxuICB2YXIgbWF0Y2ggPSBudWxsXG4gIGlmICghb3B0aW9ucy5ydGwpIHtcbiAgICBtYXRjaCA9IHZlcnNpb24ubWF0Y2gocmVbdC5DT0VSQ0VdKVxuICB9IGVsc2Uge1xuICAgIC8vIEZpbmQgdGhlIHJpZ2h0LW1vc3QgY29lcmNpYmxlIHN0cmluZyB0aGF0IGRvZXMgbm90IHNoYXJlXG4gICAgLy8gYSB0ZXJtaW51cyB3aXRoIGEgbW9yZSBsZWZ0LXdhcmQgY29lcmNpYmxlIHN0cmluZy5cbiAgICAvLyBFZywgJzEuMi4zLjQnIHdhbnRzIHRvIGNvZXJjZSAnMi4zLjQnLCBub3QgJzMuNCcgb3IgJzQnXG4gICAgLy9cbiAgICAvLyBXYWxrIHRocm91Z2ggdGhlIHN0cmluZyBjaGVja2luZyB3aXRoIGEgL2cgcmVnZXhwXG4gICAgLy8gTWFudWFsbHkgc2V0IHRoZSBpbmRleCBzbyBhcyB0byBwaWNrIHVwIG92ZXJsYXBwaW5nIG1hdGNoZXMuXG4gICAgLy8gU3RvcCB3aGVuIHdlIGdldCBhIG1hdGNoIHRoYXQgZW5kcyBhdCB0aGUgc3RyaW5nIGVuZCwgc2luY2Ugbm9cbiAgICAvLyBjb2VyY2libGUgc3RyaW5nIGNhbiBiZSBtb3JlIHJpZ2h0LXdhcmQgd2l0aG91dCB0aGUgc2FtZSB0ZXJtaW51cy5cbiAgICB2YXIgbmV4dFxuICAgIHdoaWxlICgobmV4dCA9IHJlW3QuQ09FUkNFUlRMXS5leGVjKHZlcnNpb24pKSAmJlxuICAgICAgKCFtYXRjaCB8fCBtYXRjaC5pbmRleCArIG1hdGNoWzBdLmxlbmd0aCAhPT0gdmVyc2lvbi5sZW5ndGgpXG4gICAgKSB7XG4gICAgICBpZiAoIW1hdGNoIHx8XG4gICAgICAgICAgbmV4dC5pbmRleCArIG5leHRbMF0ubGVuZ3RoICE9PSBtYXRjaC5pbmRleCArIG1hdGNoWzBdLmxlbmd0aCkge1xuICAgICAgICBtYXRjaCA9IG5leHRcbiAgICAgIH1cbiAgICAgIHJlW3QuQ09FUkNFUlRMXS5sYXN0SW5kZXggPSBuZXh0LmluZGV4ICsgbmV4dFsxXS5sZW5ndGggKyBuZXh0WzJdLmxlbmd0aFxuICAgIH1cbiAgICAvLyBsZWF2ZSBpdCBpbiBhIGNsZWFuIHN0YXRlXG4gICAgcmVbdC5DT0VSQ0VSVExdLmxhc3RJbmRleCA9IC0xXG4gIH1cblxuICBpZiAobWF0Y2ggPT09IG51bGwpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgcmV0dXJuIHBhcnNlKG1hdGNoWzJdICtcbiAgICAnLicgKyAobWF0Y2hbM10gfHwgJzAnKSArXG4gICAgJy4nICsgKG1hdGNoWzRdIHx8ICcwJyksIG9wdGlvbnMpXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL3R1bm5lbCcpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgbmV0ID0gcmVxdWlyZSgnbmV0Jyk7XG52YXIgdGxzID0gcmVxdWlyZSgndGxzJyk7XG52YXIgaHR0cCA9IHJlcXVpcmUoJ2h0dHAnKTtcbnZhciBodHRwcyA9IHJlcXVpcmUoJ2h0dHBzJyk7XG52YXIgZXZlbnRzID0gcmVxdWlyZSgnZXZlbnRzJyk7XG52YXIgYXNzZXJ0ID0gcmVxdWlyZSgnYXNzZXJ0Jyk7XG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKTtcblxuXG5leHBvcnRzLmh0dHBPdmVySHR0cCA9IGh0dHBPdmVySHR0cDtcbmV4cG9ydHMuaHR0cHNPdmVySHR0cCA9IGh0dHBzT3Zlckh0dHA7XG5leHBvcnRzLmh0dHBPdmVySHR0cHMgPSBodHRwT3Zlckh0dHBzO1xuZXhwb3J0cy5odHRwc092ZXJIdHRwcyA9IGh0dHBzT3Zlckh0dHBzO1xuXG5cbmZ1bmN0aW9uIGh0dHBPdmVySHR0cChvcHRpb25zKSB7XG4gIHZhciBhZ2VudCA9IG5ldyBUdW5uZWxpbmdBZ2VudChvcHRpb25zKTtcbiAgYWdlbnQucmVxdWVzdCA9IGh0dHAucmVxdWVzdDtcbiAgcmV0dXJuIGFnZW50O1xufVxuXG5mdW5jdGlvbiBodHRwc092ZXJIdHRwKG9wdGlvbnMpIHtcbiAgdmFyIGFnZW50ID0gbmV3IFR1bm5lbGluZ0FnZW50KG9wdGlvbnMpO1xuICBhZ2VudC5yZXF1ZXN0ID0gaHR0cC5yZXF1ZXN0O1xuICBhZ2VudC5jcmVhdGVTb2NrZXQgPSBjcmVhdGVTZWN1cmVTb2NrZXQ7XG4gIHJldHVybiBhZ2VudDtcbn1cblxuZnVuY3Rpb24gaHR0cE92ZXJIdHRwcyhvcHRpb25zKSB7XG4gIHZhciBhZ2VudCA9IG5ldyBUdW5uZWxpbmdBZ2VudChvcHRpb25zKTtcbiAgYWdlbnQucmVxdWVzdCA9IGh0dHBzLnJlcXVlc3Q7XG4gIHJldHVybiBhZ2VudDtcbn1cblxuZnVuY3Rpb24gaHR0cHNPdmVySHR0cHMob3B0aW9ucykge1xuICB2YXIgYWdlbnQgPSBuZXcgVHVubmVsaW5nQWdlbnQob3B0aW9ucyk7XG4gIGFnZW50LnJlcXVlc3QgPSBodHRwcy5yZXF1ZXN0O1xuICBhZ2VudC5jcmVhdGVTb2NrZXQgPSBjcmVhdGVTZWN1cmVTb2NrZXQ7XG4gIHJldHVybiBhZ2VudDtcbn1cblxuXG5mdW5jdGlvbiBUdW5uZWxpbmdBZ2VudChvcHRpb25zKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgc2VsZi5vcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgc2VsZi5wcm94eU9wdGlvbnMgPSBzZWxmLm9wdGlvbnMucHJveHkgfHwge307XG4gIHNlbGYubWF4U29ja2V0cyA9IHNlbGYub3B0aW9ucy5tYXhTb2NrZXRzIHx8IGh0dHAuQWdlbnQuZGVmYXVsdE1heFNvY2tldHM7XG4gIHNlbGYucmVxdWVzdHMgPSBbXTtcbiAgc2VsZi5zb2NrZXRzID0gW107XG5cbiAgc2VsZi5vbignZnJlZScsIGZ1bmN0aW9uIG9uRnJlZShzb2NrZXQsIGhvc3QsIHBvcnQsIGxvY2FsQWRkcmVzcykge1xuICAgIHZhciBvcHRpb25zID0gdG9PcHRpb25zKGhvc3QsIHBvcnQsIGxvY2FsQWRkcmVzcyk7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHNlbGYucmVxdWVzdHMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgIHZhciBwZW5kaW5nID0gc2VsZi5yZXF1ZXN0c1tpXTtcbiAgICAgIGlmIChwZW5kaW5nLmhvc3QgPT09IG9wdGlvbnMuaG9zdCAmJiBwZW5kaW5nLnBvcnQgPT09IG9wdGlvbnMucG9ydCkge1xuICAgICAgICAvLyBEZXRlY3QgdGhlIHJlcXVlc3QgdG8gY29ubmVjdCBzYW1lIG9yaWdpbiBzZXJ2ZXIsXG4gICAgICAgIC8vIHJldXNlIHRoZSBjb25uZWN0aW9uLlxuICAgICAgICBzZWxmLnJlcXVlc3RzLnNwbGljZShpLCAxKTtcbiAgICAgICAgcGVuZGluZy5yZXF1ZXN0Lm9uU29ja2V0KHNvY2tldCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgc29ja2V0LmRlc3Ryb3koKTtcbiAgICBzZWxmLnJlbW92ZVNvY2tldChzb2NrZXQpO1xuICB9KTtcbn1cbnV0aWwuaW5oZXJpdHMoVHVubmVsaW5nQWdlbnQsIGV2ZW50cy5FdmVudEVtaXR0ZXIpO1xuXG5UdW5uZWxpbmdBZ2VudC5wcm90b3R5cGUuYWRkUmVxdWVzdCA9IGZ1bmN0aW9uIGFkZFJlcXVlc3QocmVxLCBob3N0LCBwb3J0LCBsb2NhbEFkZHJlc3MpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgb3B0aW9ucyA9IG1lcmdlT3B0aW9ucyh7cmVxdWVzdDogcmVxfSwgc2VsZi5vcHRpb25zLCB0b09wdGlvbnMoaG9zdCwgcG9ydCwgbG9jYWxBZGRyZXNzKSk7XG5cbiAgaWYgKHNlbGYuc29ja2V0cy5sZW5ndGggPj0gdGhpcy5tYXhTb2NrZXRzKSB7XG4gICAgLy8gV2UgYXJlIG92ZXIgbGltaXQgc28gd2UnbGwgYWRkIGl0IHRvIHRoZSBxdWV1ZS5cbiAgICBzZWxmLnJlcXVlc3RzLnB1c2gob3B0aW9ucyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gSWYgd2UgYXJlIHVuZGVyIG1heFNvY2tldHMgY3JlYXRlIGEgbmV3IG9uZS5cbiAgc2VsZi5jcmVhdGVTb2NrZXQob3B0aW9ucywgZnVuY3Rpb24oc29ja2V0KSB7XG4gICAgc29ja2V0Lm9uKCdmcmVlJywgb25GcmVlKTtcbiAgICBzb2NrZXQub24oJ2Nsb3NlJywgb25DbG9zZU9yUmVtb3ZlKTtcbiAgICBzb2NrZXQub24oJ2FnZW50UmVtb3ZlJywgb25DbG9zZU9yUmVtb3ZlKTtcbiAgICByZXEub25Tb2NrZXQoc29ja2V0KTtcblxuICAgIGZ1bmN0aW9uIG9uRnJlZSgpIHtcbiAgICAgIHNlbGYuZW1pdCgnZnJlZScsIHNvY2tldCwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25DbG9zZU9yUmVtb3ZlKGVycikge1xuICAgICAgc2VsZi5yZW1vdmVTb2NrZXQoc29ja2V0KTtcbiAgICAgIHNvY2tldC5yZW1vdmVMaXN0ZW5lcignZnJlZScsIG9uRnJlZSk7XG4gICAgICBzb2NrZXQucmVtb3ZlTGlzdGVuZXIoJ2Nsb3NlJywgb25DbG9zZU9yUmVtb3ZlKTtcbiAgICAgIHNvY2tldC5yZW1vdmVMaXN0ZW5lcignYWdlbnRSZW1vdmUnLCBvbkNsb3NlT3JSZW1vdmUpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5UdW5uZWxpbmdBZ2VudC5wcm90b3R5cGUuY3JlYXRlU29ja2V0ID0gZnVuY3Rpb24gY3JlYXRlU29ja2V0KG9wdGlvbnMsIGNiKSB7XG4gIHZhciBzZWxmID0gdGhpcztcbiAgdmFyIHBsYWNlaG9sZGVyID0ge307XG4gIHNlbGYuc29ja2V0cy5wdXNoKHBsYWNlaG9sZGVyKTtcblxuICB2YXIgY29ubmVjdE9wdGlvbnMgPSBtZXJnZU9wdGlvbnMoe30sIHNlbGYucHJveHlPcHRpb25zLCB7XG4gICAgbWV0aG9kOiAnQ09OTkVDVCcsXG4gICAgcGF0aDogb3B0aW9ucy5ob3N0ICsgJzonICsgb3B0aW9ucy5wb3J0LFxuICAgIGFnZW50OiBmYWxzZVxuICB9KTtcbiAgaWYgKGNvbm5lY3RPcHRpb25zLnByb3h5QXV0aCkge1xuICAgIGNvbm5lY3RPcHRpb25zLmhlYWRlcnMgPSBjb25uZWN0T3B0aW9ucy5oZWFkZXJzIHx8IHt9O1xuICAgIGNvbm5lY3RPcHRpb25zLmhlYWRlcnNbJ1Byb3h5LUF1dGhvcml6YXRpb24nXSA9ICdCYXNpYyAnICtcbiAgICAgICAgbmV3IEJ1ZmZlcihjb25uZWN0T3B0aW9ucy5wcm94eUF1dGgpLnRvU3RyaW5nKCdiYXNlNjQnKTtcbiAgfVxuXG4gIGRlYnVnKCdtYWtpbmcgQ09OTkVDVCByZXF1ZXN0Jyk7XG4gIHZhciBjb25uZWN0UmVxID0gc2VsZi5yZXF1ZXN0KGNvbm5lY3RPcHRpb25zKTtcbiAgY29ubmVjdFJlcS51c2VDaHVua2VkRW5jb2RpbmdCeURlZmF1bHQgPSBmYWxzZTsgLy8gZm9yIHYwLjZcbiAgY29ubmVjdFJlcS5vbmNlKCdyZXNwb25zZScsIG9uUmVzcG9uc2UpOyAvLyBmb3IgdjAuNlxuICBjb25uZWN0UmVxLm9uY2UoJ3VwZ3JhZGUnLCBvblVwZ3JhZGUpOyAgIC8vIGZvciB2MC42XG4gIGNvbm5lY3RSZXEub25jZSgnY29ubmVjdCcsIG9uQ29ubmVjdCk7ICAgLy8gZm9yIHYwLjcgb3IgbGF0ZXJcbiAgY29ubmVjdFJlcS5vbmNlKCdlcnJvcicsIG9uRXJyb3IpO1xuICBjb25uZWN0UmVxLmVuZCgpO1xuXG4gIGZ1bmN0aW9uIG9uUmVzcG9uc2UocmVzKSB7XG4gICAgLy8gVmVyeSBoYWNreS4gVGhpcyBpcyBuZWNlc3NhcnkgdG8gYXZvaWQgaHR0cC1wYXJzZXIgbGVha3MuXG4gICAgcmVzLnVwZ3JhZGUgPSB0cnVlO1xuICB9XG5cbiAgZnVuY3Rpb24gb25VcGdyYWRlKHJlcywgc29ja2V0LCBoZWFkKSB7XG4gICAgLy8gSGFja3kuXG4gICAgcHJvY2Vzcy5uZXh0VGljayhmdW5jdGlvbigpIHtcbiAgICAgIG9uQ29ubmVjdChyZXMsIHNvY2tldCwgaGVhZCk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBvbkNvbm5lY3QocmVzLCBzb2NrZXQsIGhlYWQpIHtcbiAgICBjb25uZWN0UmVxLnJlbW92ZUFsbExpc3RlbmVycygpO1xuICAgIHNvY2tldC5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcblxuICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PT0gMjAwKSB7XG4gICAgICBhc3NlcnQuZXF1YWwoaGVhZC5sZW5ndGgsIDApO1xuICAgICAgZGVidWcoJ3R1bm5lbGluZyBjb25uZWN0aW9uIGhhcyBlc3RhYmxpc2hlZCcpO1xuICAgICAgc2VsZi5zb2NrZXRzW3NlbGYuc29ja2V0cy5pbmRleE9mKHBsYWNlaG9sZGVyKV0gPSBzb2NrZXQ7XG4gICAgICBjYihzb2NrZXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWJ1ZygndHVubmVsaW5nIHNvY2tldCBjb3VsZCBub3QgYmUgZXN0YWJsaXNoZWQsIHN0YXR1c0NvZGU9JWQnLFxuICAgICAgICAgICAgcmVzLnN0YXR1c0NvZGUpO1xuICAgICAgdmFyIGVycm9yID0gbmV3IEVycm9yKCd0dW5uZWxpbmcgc29ja2V0IGNvdWxkIG5vdCBiZSBlc3RhYmxpc2hlZCwgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3N0YXR1c0NvZGU9JyArIHJlcy5zdGF0dXNDb2RlKTtcbiAgICAgIGVycm9yLmNvZGUgPSAnRUNPTk5SRVNFVCc7XG4gICAgICBvcHRpb25zLnJlcXVlc3QuZW1pdCgnZXJyb3InLCBlcnJvcik7XG4gICAgICBzZWxmLnJlbW92ZVNvY2tldChwbGFjZWhvbGRlcik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb25FcnJvcihjYXVzZSkge1xuICAgIGNvbm5lY3RSZXEucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG5cbiAgICBkZWJ1ZygndHVubmVsaW5nIHNvY2tldCBjb3VsZCBub3QgYmUgZXN0YWJsaXNoZWQsIGNhdXNlPSVzXFxuJyxcbiAgICAgICAgICBjYXVzZS5tZXNzYWdlLCBjYXVzZS5zdGFjayk7XG4gICAgdmFyIGVycm9yID0gbmV3IEVycm9yKCd0dW5uZWxpbmcgc29ja2V0IGNvdWxkIG5vdCBiZSBlc3RhYmxpc2hlZCwgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdjYXVzZT0nICsgY2F1c2UubWVzc2FnZSk7XG4gICAgZXJyb3IuY29kZSA9ICdFQ09OTlJFU0VUJztcbiAgICBvcHRpb25zLnJlcXVlc3QuZW1pdCgnZXJyb3InLCBlcnJvcik7XG4gICAgc2VsZi5yZW1vdmVTb2NrZXQocGxhY2Vob2xkZXIpO1xuICB9XG59O1xuXG5UdW5uZWxpbmdBZ2VudC5wcm90b3R5cGUucmVtb3ZlU29ja2V0ID0gZnVuY3Rpb24gcmVtb3ZlU29ja2V0KHNvY2tldCkge1xuICB2YXIgcG9zID0gdGhpcy5zb2NrZXRzLmluZGV4T2Yoc29ja2V0KVxuICBpZiAocG9zID09PSAtMSkge1xuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLnNvY2tldHMuc3BsaWNlKHBvcywgMSk7XG5cbiAgdmFyIHBlbmRpbmcgPSB0aGlzLnJlcXVlc3RzLnNoaWZ0KCk7XG4gIGlmIChwZW5kaW5nKSB7XG4gICAgLy8gSWYgd2UgaGF2ZSBwZW5kaW5nIHJlcXVlc3RzIGFuZCBhIHNvY2tldCBnZXRzIGNsb3NlZCBhIG5ldyBvbmVcbiAgICAvLyBuZWVkcyB0byBiZSBjcmVhdGVkIHRvIHRha2Ugb3ZlciBpbiB0aGUgcG9vbCBmb3IgdGhlIG9uZSB0aGF0IGNsb3NlZC5cbiAgICB0aGlzLmNyZWF0ZVNvY2tldChwZW5kaW5nLCBmdW5jdGlvbihzb2NrZXQpIHtcbiAgICAgIHBlbmRpbmcucmVxdWVzdC5vblNvY2tldChzb2NrZXQpO1xuICAgIH0pO1xuICB9XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVTZWN1cmVTb2NrZXQob3B0aW9ucywgY2IpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICBUdW5uZWxpbmdBZ2VudC5wcm90b3R5cGUuY3JlYXRlU29ja2V0LmNhbGwoc2VsZiwgb3B0aW9ucywgZnVuY3Rpb24oc29ja2V0KSB7XG4gICAgdmFyIGhvc3RIZWFkZXIgPSBvcHRpb25zLnJlcXVlc3QuZ2V0SGVhZGVyKCdob3N0Jyk7XG4gICAgdmFyIHRsc09wdGlvbnMgPSBtZXJnZU9wdGlvbnMoe30sIHNlbGYub3B0aW9ucywge1xuICAgICAgc29ja2V0OiBzb2NrZXQsXG4gICAgICBzZXJ2ZXJuYW1lOiBob3N0SGVhZGVyID8gaG9zdEhlYWRlci5yZXBsYWNlKC86LiokLywgJycpIDogb3B0aW9ucy5ob3N0XG4gICAgfSk7XG5cbiAgICAvLyAwIGlzIGR1bW15IHBvcnQgZm9yIHYwLjZcbiAgICB2YXIgc2VjdXJlU29ja2V0ID0gdGxzLmNvbm5lY3QoMCwgdGxzT3B0aW9ucyk7XG4gICAgc2VsZi5zb2NrZXRzW3NlbGYuc29ja2V0cy5pbmRleE9mKHNvY2tldCldID0gc2VjdXJlU29ja2V0O1xuICAgIGNiKHNlY3VyZVNvY2tldCk7XG4gIH0pO1xufVxuXG5cbmZ1bmN0aW9uIHRvT3B0aW9ucyhob3N0LCBwb3J0LCBsb2NhbEFkZHJlc3MpIHtcbiAgaWYgKHR5cGVvZiBob3N0ID09PSAnc3RyaW5nJykgeyAvLyBzaW5jZSB2MC4xMFxuICAgIHJldHVybiB7XG4gICAgICBob3N0OiBob3N0LFxuICAgICAgcG9ydDogcG9ydCxcbiAgICAgIGxvY2FsQWRkcmVzczogbG9jYWxBZGRyZXNzXG4gICAgfTtcbiAgfVxuICByZXR1cm4gaG9zdDsgLy8gZm9yIHYwLjExIG9yIGxhdGVyXG59XG5cbmZ1bmN0aW9uIG1lcmdlT3B0aW9ucyh0YXJnZXQpIHtcbiAgZm9yICh2YXIgaSA9IDEsIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgIHZhciBvdmVycmlkZXMgPSBhcmd1bWVudHNbaV07XG4gICAgaWYgKHR5cGVvZiBvdmVycmlkZXMgPT09ICdvYmplY3QnKSB7XG4gICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG92ZXJyaWRlcyk7XG4gICAgICBmb3IgKHZhciBqID0gMCwga2V5TGVuID0ga2V5cy5sZW5ndGg7IGogPCBrZXlMZW47ICsraikge1xuICAgICAgICB2YXIgayA9IGtleXNbal07XG4gICAgICAgIGlmIChvdmVycmlkZXNba10gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRhcmdldFtrXSA9IG92ZXJyaWRlc1trXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG5cbnZhciBkZWJ1ZztcbmlmIChwcm9jZXNzLmVudi5OT0RFX0RFQlVHICYmIC9cXGJ0dW5uZWxcXGIvLnRlc3QocHJvY2Vzcy5lbnYuTk9ERV9ERUJVRykpIHtcbiAgZGVidWcgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgaWYgKHR5cGVvZiBhcmdzWzBdID09PSAnc3RyaW5nJykge1xuICAgICAgYXJnc1swXSA9ICdUVU5ORUw6ICcgKyBhcmdzWzBdO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcmdzLnVuc2hpZnQoJ1RVTk5FTDonKTtcbiAgICB9XG4gICAgY29uc29sZS5lcnJvci5hcHBseShjb25zb2xlLCBhcmdzKTtcbiAgfVxufSBlbHNlIHtcbiAgZGVidWcgPSBmdW5jdGlvbigpIHt9O1xufVxuZXhwb3J0cy5kZWJ1ZyA9IGRlYnVnOyAvLyBmb3IgdGVzdFxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdC4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcHJvamVjdCByb290IGZvciBmdWxsIGxpY2Vuc2UgaW5mb3JtYXRpb24uXG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHJlc3VsdC52YWx1ZSk7IH0pLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHVybCA9IHJlcXVpcmUoXCJ1cmxcIik7XG5jb25zdCBodHRwID0gcmVxdWlyZShcImh0dHBcIik7XG5jb25zdCBodHRwcyA9IHJlcXVpcmUoXCJodHRwc1wiKTtcbmxldCBmcztcbmxldCB0dW5uZWw7XG52YXIgSHR0cENvZGVzO1xuKGZ1bmN0aW9uIChIdHRwQ29kZXMpIHtcbiAgICBIdHRwQ29kZXNbSHR0cENvZGVzW1wiT0tcIl0gPSAyMDBdID0gXCJPS1wiO1xuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJNdWx0aXBsZUNob2ljZXNcIl0gPSAzMDBdID0gXCJNdWx0aXBsZUNob2ljZXNcIjtcbiAgICBIdHRwQ29kZXNbSHR0cENvZGVzW1wiTW92ZWRQZXJtYW5lbnRseVwiXSA9IDMwMV0gPSBcIk1vdmVkUGVybWFuZW50bHlcIjtcbiAgICBIdHRwQ29kZXNbSHR0cENvZGVzW1wiUmVzb3VyY2VNb3ZlZFwiXSA9IDMwMl0gPSBcIlJlc291cmNlTW92ZWRcIjtcbiAgICBIdHRwQ29kZXNbSHR0cENvZGVzW1wiU2VlT3RoZXJcIl0gPSAzMDNdID0gXCJTZWVPdGhlclwiO1xuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJOb3RNb2RpZmllZFwiXSA9IDMwNF0gPSBcIk5vdE1vZGlmaWVkXCI7XG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIlVzZVByb3h5XCJdID0gMzA1XSA9IFwiVXNlUHJveHlcIjtcbiAgICBIdHRwQ29kZXNbSHR0cENvZGVzW1wiU3dpdGNoUHJveHlcIl0gPSAzMDZdID0gXCJTd2l0Y2hQcm94eVwiO1xuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJUZW1wb3JhcnlSZWRpcmVjdFwiXSA9IDMwN10gPSBcIlRlbXBvcmFyeVJlZGlyZWN0XCI7XG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIlBlcm1hbmVudFJlZGlyZWN0XCJdID0gMzA4XSA9IFwiUGVybWFuZW50UmVkaXJlY3RcIjtcbiAgICBIdHRwQ29kZXNbSHR0cENvZGVzW1wiQmFkUmVxdWVzdFwiXSA9IDQwMF0gPSBcIkJhZFJlcXVlc3RcIjtcbiAgICBIdHRwQ29kZXNbSHR0cENvZGVzW1wiVW5hdXRob3JpemVkXCJdID0gNDAxXSA9IFwiVW5hdXRob3JpemVkXCI7XG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIlBheW1lbnRSZXF1aXJlZFwiXSA9IDQwMl0gPSBcIlBheW1lbnRSZXF1aXJlZFwiO1xuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJGb3JiaWRkZW5cIl0gPSA0MDNdID0gXCJGb3JiaWRkZW5cIjtcbiAgICBIdHRwQ29kZXNbSHR0cENvZGVzW1wiTm90Rm91bmRcIl0gPSA0MDRdID0gXCJOb3RGb3VuZFwiO1xuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJNZXRob2ROb3RBbGxvd2VkXCJdID0gNDA1XSA9IFwiTWV0aG9kTm90QWxsb3dlZFwiO1xuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJOb3RBY2NlcHRhYmxlXCJdID0gNDA2XSA9IFwiTm90QWNjZXB0YWJsZVwiO1xuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJQcm94eUF1dGhlbnRpY2F0aW9uUmVxdWlyZWRcIl0gPSA0MDddID0gXCJQcm94eUF1dGhlbnRpY2F0aW9uUmVxdWlyZWRcIjtcbiAgICBIdHRwQ29kZXNbSHR0cENvZGVzW1wiUmVxdWVzdFRpbWVvdXRcIl0gPSA0MDhdID0gXCJSZXF1ZXN0VGltZW91dFwiO1xuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJDb25mbGljdFwiXSA9IDQwOV0gPSBcIkNvbmZsaWN0XCI7XG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIkdvbmVcIl0gPSA0MTBdID0gXCJHb25lXCI7XG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIkludGVybmFsU2VydmVyRXJyb3JcIl0gPSA1MDBdID0gXCJJbnRlcm5hbFNlcnZlckVycm9yXCI7XG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIk5vdEltcGxlbWVudGVkXCJdID0gNTAxXSA9IFwiTm90SW1wbGVtZW50ZWRcIjtcbiAgICBIdHRwQ29kZXNbSHR0cENvZGVzW1wiQmFkR2F0ZXdheVwiXSA9IDUwMl0gPSBcIkJhZEdhdGV3YXlcIjtcbiAgICBIdHRwQ29kZXNbSHR0cENvZGVzW1wiU2VydmljZVVuYXZhaWxhYmxlXCJdID0gNTAzXSA9IFwiU2VydmljZVVuYXZhaWxhYmxlXCI7XG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIkdhdGV3YXlUaW1lb3V0XCJdID0gNTA0XSA9IFwiR2F0ZXdheVRpbWVvdXRcIjtcbn0pKEh0dHBDb2RlcyA9IGV4cG9ydHMuSHR0cENvZGVzIHx8IChleHBvcnRzLkh0dHBDb2RlcyA9IHt9KSk7XG5jb25zdCBIdHRwUmVkaXJlY3RDb2RlcyA9IFtIdHRwQ29kZXMuTW92ZWRQZXJtYW5lbnRseSwgSHR0cENvZGVzLlJlc291cmNlTW92ZWQsIEh0dHBDb2Rlcy5TZWVPdGhlciwgSHR0cENvZGVzLlRlbXBvcmFyeVJlZGlyZWN0LCBIdHRwQ29kZXMuUGVybWFuZW50UmVkaXJlY3RdO1xuY29uc3QgSHR0cFJlc3BvbnNlUmV0cnlDb2RlcyA9IFtIdHRwQ29kZXMuQmFkR2F0ZXdheSwgSHR0cENvZGVzLlNlcnZpY2VVbmF2YWlsYWJsZSwgSHR0cENvZGVzLkdhdGV3YXlUaW1lb3V0XTtcbmNvbnN0IFJldHJ5YWJsZUh0dHBWZXJicyA9IFsnT1BUSU9OUycsICdHRVQnLCAnREVMRVRFJywgJ0hFQUQnXTtcbmNvbnN0IEV4cG9uZW50aWFsQmFja29mZkNlaWxpbmcgPSAxMDtcbmNvbnN0IEV4cG9uZW50aWFsQmFja29mZlRpbWVTbGljZSA9IDU7XG5jbGFzcyBIdHRwQ2xpZW50UmVzcG9uc2Uge1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICB9XG4gICAgcmVhZEJvZHkoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBsZXQgb3V0cHV0ID0gJyc7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2Uub24oJ2RhdGEnLCAoY2h1bmspID0+IHtcbiAgICAgICAgICAgICAgICBvdXRwdXQgKz0gY2h1bms7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZS5vbignZW5kJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUob3V0cHV0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KSk7XG4gICAgfVxufVxuZXhwb3J0cy5IdHRwQ2xpZW50UmVzcG9uc2UgPSBIdHRwQ2xpZW50UmVzcG9uc2U7XG5mdW5jdGlvbiBpc0h0dHBzKHJlcXVlc3RVcmwpIHtcbiAgICBsZXQgcGFyc2VkVXJsID0gdXJsLnBhcnNlKHJlcXVlc3RVcmwpO1xuICAgIHJldHVybiBwYXJzZWRVcmwucHJvdG9jb2wgPT09ICdodHRwczonO1xufVxuZXhwb3J0cy5pc0h0dHBzID0gaXNIdHRwcztcbnZhciBFbnZpcm9ubWVudFZhcmlhYmxlcztcbihmdW5jdGlvbiAoRW52aXJvbm1lbnRWYXJpYWJsZXMpIHtcbiAgICBFbnZpcm9ubWVudFZhcmlhYmxlc1tcIkhUVFBfUFJPWFlcIl0gPSBcIkhUVFBfUFJPWFlcIjtcbiAgICBFbnZpcm9ubWVudFZhcmlhYmxlc1tcIkhUVFBTX1BST1hZXCJdID0gXCJIVFRQU19QUk9YWVwiO1xufSkoRW52aXJvbm1lbnRWYXJpYWJsZXMgfHwgKEVudmlyb25tZW50VmFyaWFibGVzID0ge30pKTtcbmNsYXNzIEh0dHBDbGllbnQge1xuICAgIGNvbnN0cnVjdG9yKHVzZXJBZ2VudCwgaGFuZGxlcnMsIHJlcXVlc3RPcHRpb25zKSB7XG4gICAgICAgIHRoaXMuX2lnbm9yZVNzbEVycm9yID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2FsbG93UmVkaXJlY3RzID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fbWF4UmVkaXJlY3RzID0gNTA7XG4gICAgICAgIHRoaXMuX2FsbG93UmV0cmllcyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9tYXhSZXRyaWVzID0gMTtcbiAgICAgICAgdGhpcy5fa2VlcEFsaXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2Rpc3Bvc2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMudXNlckFnZW50ID0gdXNlckFnZW50O1xuICAgICAgICB0aGlzLmhhbmRsZXJzID0gaGFuZGxlcnMgfHwgW107XG4gICAgICAgIHRoaXMucmVxdWVzdE9wdGlvbnMgPSByZXF1ZXN0T3B0aW9ucztcbiAgICAgICAgaWYgKHJlcXVlc3RPcHRpb25zKSB7XG4gICAgICAgICAgICBpZiAocmVxdWVzdE9wdGlvbnMuaWdub3JlU3NsRXJyb3IgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2lnbm9yZVNzbEVycm9yID0gcmVxdWVzdE9wdGlvbnMuaWdub3JlU3NsRXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9zb2NrZXRUaW1lb3V0ID0gcmVxdWVzdE9wdGlvbnMuc29ja2V0VGltZW91dDtcbiAgICAgICAgICAgIHRoaXMuX2h0dHBQcm94eSA9IHJlcXVlc3RPcHRpb25zLnByb3h5O1xuICAgICAgICAgICAgaWYgKHJlcXVlc3RPcHRpb25zLnByb3h5ICYmIHJlcXVlc3RPcHRpb25zLnByb3h5LnByb3h5QnlwYXNzSG9zdHMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9odHRwUHJveHlCeXBhc3NIb3N0cyA9IFtdO1xuICAgICAgICAgICAgICAgIHJlcXVlc3RPcHRpb25zLnByb3h5LnByb3h5QnlwYXNzSG9zdHMuZm9yRWFjaChieXBhc3MgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9odHRwUHJveHlCeXBhc3NIb3N0cy5wdXNoKG5ldyBSZWdFeHAoYnlwYXNzLCAnaScpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2NlcnRDb25maWcgPSByZXF1ZXN0T3B0aW9ucy5jZXJ0O1xuICAgICAgICAgICAgaWYgKHRoaXMuX2NlcnRDb25maWcpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiB1c2luZyBjZXJ0LCBuZWVkIGZzXG4gICAgICAgICAgICAgICAgZnMgPSByZXF1aXJlKCdmcycpO1xuICAgICAgICAgICAgICAgIC8vIGNhY2hlIHRoZSBjZXJ0IGNvbnRlbnQgaW50byBtZW1vcnksIHNvIHdlIGRvbid0IGhhdmUgdG8gcmVhZCBpdCBmcm9tIGRpc2sgZXZlcnkgdGltZSBcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fY2VydENvbmZpZy5jYUZpbGUgJiYgZnMuZXhpc3RzU3luYyh0aGlzLl9jZXJ0Q29uZmlnLmNhRmlsZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2EgPSBmcy5yZWFkRmlsZVN5bmModGhpcy5fY2VydENvbmZpZy5jYUZpbGUsICd1dGY4Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jZXJ0Q29uZmlnLmNlcnRGaWxlICYmIGZzLmV4aXN0c1N5bmModGhpcy5fY2VydENvbmZpZy5jZXJ0RmlsZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2VydCA9IGZzLnJlYWRGaWxlU3luYyh0aGlzLl9jZXJ0Q29uZmlnLmNlcnRGaWxlLCAndXRmOCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fY2VydENvbmZpZy5rZXlGaWxlICYmIGZzLmV4aXN0c1N5bmModGhpcy5fY2VydENvbmZpZy5rZXlGaWxlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9rZXkgPSBmcy5yZWFkRmlsZVN5bmModGhpcy5fY2VydENvbmZpZy5rZXlGaWxlLCAndXRmOCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZXF1ZXN0T3B0aW9ucy5hbGxvd1JlZGlyZWN0cyAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWxsb3dSZWRpcmVjdHMgPSByZXF1ZXN0T3B0aW9ucy5hbGxvd1JlZGlyZWN0cztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZXF1ZXN0T3B0aW9ucy5tYXhSZWRpcmVjdHMgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX21heFJlZGlyZWN0cyA9IE1hdGgubWF4KHJlcXVlc3RPcHRpb25zLm1heFJlZGlyZWN0cywgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmVxdWVzdE9wdGlvbnMua2VlcEFsaXZlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9rZWVwQWxpdmUgPSByZXF1ZXN0T3B0aW9ucy5rZWVwQWxpdmU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmVxdWVzdE9wdGlvbnMuYWxsb3dSZXRyaWVzICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hbGxvd1JldHJpZXMgPSByZXF1ZXN0T3B0aW9ucy5hbGxvd1JldHJpZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmVxdWVzdE9wdGlvbnMubWF4UmV0cmllcyAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWF4UmV0cmllcyA9IHJlcXVlc3RPcHRpb25zLm1heFJldHJpZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgb3B0aW9ucyhyZXF1ZXN0VXJsLCBhZGRpdGlvbmFsSGVhZGVycykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdPUFRJT05TJywgcmVxdWVzdFVybCwgbnVsbCwgYWRkaXRpb25hbEhlYWRlcnMgfHwge30pO1xuICAgIH1cbiAgICBnZXQocmVxdWVzdFVybCwgYWRkaXRpb25hbEhlYWRlcnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnR0VUJywgcmVxdWVzdFVybCwgbnVsbCwgYWRkaXRpb25hbEhlYWRlcnMgfHwge30pO1xuICAgIH1cbiAgICBkZWwocmVxdWVzdFVybCwgYWRkaXRpb25hbEhlYWRlcnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnREVMRVRFJywgcmVxdWVzdFVybCwgbnVsbCwgYWRkaXRpb25hbEhlYWRlcnMgfHwge30pO1xuICAgIH1cbiAgICBwb3N0KHJlcXVlc3RVcmwsIGRhdGEsIGFkZGl0aW9uYWxIZWFkZXJzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ1BPU1QnLCByZXF1ZXN0VXJsLCBkYXRhLCBhZGRpdGlvbmFsSGVhZGVycyB8fCB7fSk7XG4gICAgfVxuICAgIHBhdGNoKHJlcXVlc3RVcmwsIGRhdGEsIGFkZGl0aW9uYWxIZWFkZXJzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ1BBVENIJywgcmVxdWVzdFVybCwgZGF0YSwgYWRkaXRpb25hbEhlYWRlcnMgfHwge30pO1xuICAgIH1cbiAgICBwdXQocmVxdWVzdFVybCwgZGF0YSwgYWRkaXRpb25hbEhlYWRlcnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnUFVUJywgcmVxdWVzdFVybCwgZGF0YSwgYWRkaXRpb25hbEhlYWRlcnMgfHwge30pO1xuICAgIH1cbiAgICBoZWFkKHJlcXVlc3RVcmwsIGFkZGl0aW9uYWxIZWFkZXJzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ0hFQUQnLCByZXF1ZXN0VXJsLCBudWxsLCBhZGRpdGlvbmFsSGVhZGVycyB8fCB7fSk7XG4gICAgfVxuICAgIHNlbmRTdHJlYW0odmVyYiwgcmVxdWVzdFVybCwgc3RyZWFtLCBhZGRpdGlvbmFsSGVhZGVycykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHZlcmIsIHJlcXVlc3RVcmwsIHN0cmVhbSwgYWRkaXRpb25hbEhlYWRlcnMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNYWtlcyBhIHJhdyBodHRwIHJlcXVlc3QuXG4gICAgICogQWxsIG90aGVyIG1ldGhvZHMgc3VjaCBhcyBnZXQsIHBvc3QsIHBhdGNoLCBhbmQgcmVxdWVzdCB1bHRpbWF0ZWx5IGNhbGwgdGhpcy5cbiAgICAgKiBQcmVmZXIgZ2V0LCBkZWwsIHBvc3QgYW5kIHBhdGNoXG4gICAgICovXG4gICAgcmVxdWVzdCh2ZXJiLCByZXF1ZXN0VXJsLCBkYXRhLCBoZWFkZXJzKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fZGlzcG9zZWQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDbGllbnQgaGFzIGFscmVhZHkgYmVlbiBkaXNwb3NlZC5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgaW5mbyA9IHRoaXMuX3ByZXBhcmVSZXF1ZXN0KHZlcmIsIHJlcXVlc3RVcmwsIGhlYWRlcnMpO1xuICAgICAgICAgICAgLy8gT25seSBwZXJmb3JtIHJldHJpZXMgb24gcmVhZHMgc2luY2Ugd3JpdGVzIG1heSBub3QgYmUgaWRlbXBvdGVudC5cbiAgICAgICAgICAgIGxldCBtYXhUcmllcyA9ICh0aGlzLl9hbGxvd1JldHJpZXMgJiYgUmV0cnlhYmxlSHR0cFZlcmJzLmluZGV4T2YodmVyYikgIT0gLTEpID8gdGhpcy5fbWF4UmV0cmllcyArIDEgOiAxO1xuICAgICAgICAgICAgbGV0IG51bVRyaWVzID0gMDtcbiAgICAgICAgICAgIGxldCByZXNwb25zZTtcbiAgICAgICAgICAgIHdoaWxlIChudW1UcmllcyA8IG1heFRyaWVzKSB7XG4gICAgICAgICAgICAgICAgcmVzcG9uc2UgPSB5aWVsZCB0aGlzLnJlcXVlc3RSYXcoaW5mbywgZGF0YSk7XG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgaXQncyBhbiBhdXRoZW50aWNhdGlvbiBjaGFsbGVuZ2VcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UgJiYgcmVzcG9uc2UubWVzc2FnZSAmJiByZXNwb25zZS5tZXNzYWdlLnN0YXR1c0NvZGUgPT09IEh0dHBDb2Rlcy5VbmF1dGhvcml6ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGF1dGhlbnRpY2F0aW9uSGFuZGxlcjtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmhhbmRsZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5oYW5kbGVyc1tpXS5jYW5IYW5kbGVBdXRoZW50aWNhdGlvbihyZXNwb25zZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRoZW50aWNhdGlvbkhhbmRsZXIgPSB0aGlzLmhhbmRsZXJzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChhdXRoZW50aWNhdGlvbkhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhdXRoZW50aWNhdGlvbkhhbmRsZXIuaGFuZGxlQXV0aGVudGljYXRpb24odGhpcywgaW5mbywgZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSBoYXZlIHJlY2VpdmVkIGFuIHVuYXV0aG9yaXplZCByZXNwb25zZSBidXQgaGF2ZSBubyBoYW5kbGVycyB0byBoYW5kbGUgaXQuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBMZXQgdGhlIHJlc3BvbnNlIHJldHVybiB0byB0aGUgY2FsbGVyLlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCByZWRpcmVjdHNSZW1haW5pbmcgPSB0aGlzLl9tYXhSZWRpcmVjdHM7XG4gICAgICAgICAgICAgICAgd2hpbGUgKEh0dHBSZWRpcmVjdENvZGVzLmluZGV4T2YocmVzcG9uc2UubWVzc2FnZS5zdGF0dXNDb2RlKSAhPSAtMVxuICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLl9hbGxvd1JlZGlyZWN0c1xuICAgICAgICAgICAgICAgICAgICAmJiByZWRpcmVjdHNSZW1haW5pbmcgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZGlyZWN0VXJsID0gcmVzcG9uc2UubWVzc2FnZS5oZWFkZXJzW1wibG9jYXRpb25cIl07XG4gICAgICAgICAgICAgICAgICAgIGlmICghcmVkaXJlY3RVcmwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZXJlJ3Mgbm8gbG9jYXRpb24gdG8gcmVkaXJlY3QgdG8sIHdlIHdvbid0XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyB3ZSBuZWVkIHRvIGZpbmlzaCByZWFkaW5nIHRoZSByZXNwb25zZSBiZWZvcmUgcmVhc3NpZ25pbmcgcmVzcG9uc2VcbiAgICAgICAgICAgICAgICAgICAgLy8gd2hpY2ggd2lsbCBsZWFrIHRoZSBvcGVuIHNvY2tldC5cbiAgICAgICAgICAgICAgICAgICAgeWllbGQgcmVzcG9uc2UucmVhZEJvZHkoKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gbGV0J3MgbWFrZSB0aGUgcmVxdWVzdCB3aXRoIHRoZSBuZXcgcmVkaXJlY3RVcmxcbiAgICAgICAgICAgICAgICAgICAgaW5mbyA9IHRoaXMuX3ByZXBhcmVSZXF1ZXN0KHZlcmIsIHJlZGlyZWN0VXJsLCBoZWFkZXJzKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSB5aWVsZCB0aGlzLnJlcXVlc3RSYXcoaW5mbywgZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIHJlZGlyZWN0c1JlbWFpbmluZy0tO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoSHR0cFJlc3BvbnNlUmV0cnlDb2Rlcy5pbmRleE9mKHJlc3BvbnNlLm1lc3NhZ2Uuc3RhdHVzQ29kZSkgPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgbm90IGEgcmV0cnkgY29kZSwgcmV0dXJuIGltbWVkaWF0ZWx5IGluc3RlYWQgb2YgcmV0cnlpbmdcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBudW1UcmllcyArPSAxO1xuICAgICAgICAgICAgICAgIGlmIChudW1UcmllcyA8IG1heFRyaWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHlpZWxkIHJlc3BvbnNlLnJlYWRCb2R5KCk7XG4gICAgICAgICAgICAgICAgICAgIHlpZWxkIHRoaXMuX3BlcmZvcm1FeHBvbmVudGlhbEJhY2tvZmYobnVtVHJpZXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE5lZWRzIHRvIGJlIGNhbGxlZCBpZiBrZWVwQWxpdmUgaXMgc2V0IHRvIHRydWUgaW4gcmVxdWVzdCBvcHRpb25zLlxuICAgICAqL1xuICAgIGRpc3Bvc2UoKSB7XG4gICAgICAgIGlmICh0aGlzLl9hZ2VudCkge1xuICAgICAgICAgICAgdGhpcy5fYWdlbnQuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2Rpc3Bvc2VkID0gdHJ1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmF3IHJlcXVlc3QuXG4gICAgICogQHBhcmFtIGluZm9cbiAgICAgKiBAcGFyYW0gZGF0YVxuICAgICAqL1xuICAgIHJlcXVlc3RSYXcoaW5mbywgZGF0YSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgbGV0IGNhbGxiYWNrRm9yUmVzdWx0ID0gZnVuY3Rpb24gKGVyciwgcmVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdFJhd1dpdGhDYWxsYmFjayhpbmZvLCBkYXRhLCBjYWxsYmFja0ZvclJlc3VsdCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSYXcgcmVxdWVzdCB3aXRoIGNhbGxiYWNrLlxuICAgICAqIEBwYXJhbSBpbmZvXG4gICAgICogQHBhcmFtIGRhdGFcbiAgICAgKiBAcGFyYW0gb25SZXN1bHRcbiAgICAgKi9cbiAgICByZXF1ZXN0UmF3V2l0aENhbGxiYWNrKGluZm8sIGRhdGEsIG9uUmVzdWx0KSB7XG4gICAgICAgIGxldCBzb2NrZXQ7XG4gICAgICAgIGxldCBpc0RhdGFTdHJpbmcgPSB0eXBlb2YgKGRhdGEpID09PSAnc3RyaW5nJztcbiAgICAgICAgaWYgKHR5cGVvZiAoZGF0YSkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpbmZvLm9wdGlvbnMuaGVhZGVyc1tcIkNvbnRlbnQtTGVuZ3RoXCJdID0gQnVmZmVyLmJ5dGVMZW5ndGgoZGF0YSwgJ3V0ZjgnKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY2FsbGJhY2tDYWxsZWQgPSBmYWxzZTtcbiAgICAgICAgbGV0IGhhbmRsZVJlc3VsdCA9IChlcnIsIHJlcykgPT4ge1xuICAgICAgICAgICAgaWYgKCFjYWxsYmFja0NhbGxlZCkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrQ2FsbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBvblJlc3VsdChlcnIsIHJlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGxldCByZXEgPSBpbmZvLmh0dHBNb2R1bGUucmVxdWVzdChpbmZvLm9wdGlvbnMsIChtc2cpID0+IHtcbiAgICAgICAgICAgIGxldCByZXMgPSBuZXcgSHR0cENsaWVudFJlc3BvbnNlKG1zZyk7XG4gICAgICAgICAgICBoYW5kbGVSZXN1bHQobnVsbCwgcmVzKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJlcS5vbignc29ja2V0JywgKHNvY2spID0+IHtcbiAgICAgICAgICAgIHNvY2tldCA9IHNvY2s7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBJZiB3ZSBldmVyIGdldCBkaXNjb25uZWN0ZWQsIHdlIHdhbnQgdGhlIHNvY2tldCB0byB0aW1lb3V0IGV2ZW50dWFsbHlcbiAgICAgICAgcmVxLnNldFRpbWVvdXQodGhpcy5fc29ja2V0VGltZW91dCB8fCAzICogNjAwMDAsICgpID0+IHtcbiAgICAgICAgICAgIGlmIChzb2NrZXQpIHtcbiAgICAgICAgICAgICAgICBzb2NrZXQuZW5kKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBoYW5kbGVSZXN1bHQobmV3IEVycm9yKCdSZXF1ZXN0IHRpbWVvdXQ6ICcgKyBpbmZvLm9wdGlvbnMucGF0aCksIG51bGwpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmVxLm9uKCdlcnJvcicsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIC8vIGVyciBoYXMgc3RhdHVzQ29kZSBwcm9wZXJ0eVxuICAgICAgICAgICAgLy8gcmVzIHNob3VsZCBoYXZlIGhlYWRlcnNcbiAgICAgICAgICAgIGhhbmRsZVJlc3VsdChlcnIsIG51bGwpO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGRhdGEgJiYgdHlwZW9mIChkYXRhKSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJlcS53cml0ZShkYXRhLCAndXRmOCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhICYmIHR5cGVvZiAoZGF0YSkgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBkYXRhLm9uKCdjbG9zZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXEuZW5kKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGRhdGEucGlwZShyZXEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmVxLmVuZCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9wcmVwYXJlUmVxdWVzdChtZXRob2QsIHJlcXVlc3RVcmwsIGhlYWRlcnMpIHtcbiAgICAgICAgY29uc3QgaW5mbyA9IHt9O1xuICAgICAgICBpbmZvLnBhcnNlZFVybCA9IHVybC5wYXJzZShyZXF1ZXN0VXJsKTtcbiAgICAgICAgY29uc3QgdXNpbmdTc2wgPSBpbmZvLnBhcnNlZFVybC5wcm90b2NvbCA9PT0gJ2h0dHBzOic7XG4gICAgICAgIGluZm8uaHR0cE1vZHVsZSA9IHVzaW5nU3NsID8gaHR0cHMgOiBodHRwO1xuICAgICAgICBjb25zdCBkZWZhdWx0UG9ydCA9IHVzaW5nU3NsID8gNDQzIDogODA7XG4gICAgICAgIGluZm8ub3B0aW9ucyA9IHt9O1xuICAgICAgICBpbmZvLm9wdGlvbnMuaG9zdCA9IGluZm8ucGFyc2VkVXJsLmhvc3RuYW1lO1xuICAgICAgICBpbmZvLm9wdGlvbnMucG9ydCA9IGluZm8ucGFyc2VkVXJsLnBvcnQgPyBwYXJzZUludChpbmZvLnBhcnNlZFVybC5wb3J0KSA6IGRlZmF1bHRQb3J0O1xuICAgICAgICBpbmZvLm9wdGlvbnMucGF0aCA9IChpbmZvLnBhcnNlZFVybC5wYXRobmFtZSB8fCAnJykgKyAoaW5mby5wYXJzZWRVcmwuc2VhcmNoIHx8ICcnKTtcbiAgICAgICAgaW5mby5vcHRpb25zLm1ldGhvZCA9IG1ldGhvZDtcbiAgICAgICAgaW5mby5vcHRpb25zLmhlYWRlcnMgPSB0aGlzLl9tZXJnZUhlYWRlcnMoaGVhZGVycyk7XG4gICAgICAgIGluZm8ub3B0aW9ucy5oZWFkZXJzW1widXNlci1hZ2VudFwiXSA9IHRoaXMudXNlckFnZW50O1xuICAgICAgICBpbmZvLm9wdGlvbnMuYWdlbnQgPSB0aGlzLl9nZXRBZ2VudChyZXF1ZXN0VXJsKTtcbiAgICAgICAgLy8gZ2l2ZXMgaGFuZGxlcnMgYW4gb3Bwb3J0dW5pdHkgdG8gcGFydGljaXBhdGVcbiAgICAgICAgaWYgKHRoaXMuaGFuZGxlcnMgJiYgIXRoaXMuX2lzUHJlc2lnbmVkKHJlcXVlc3RVcmwpKSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZXJzLmZvckVhY2goKGhhbmRsZXIpID0+IHtcbiAgICAgICAgICAgICAgICBoYW5kbGVyLnByZXBhcmVSZXF1ZXN0KGluZm8ub3B0aW9ucyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW5mbztcbiAgICB9XG4gICAgX2lzUHJlc2lnbmVkKHJlcXVlc3RVcmwpIHtcbiAgICAgICAgaWYgKHRoaXMucmVxdWVzdE9wdGlvbnMgJiYgdGhpcy5yZXF1ZXN0T3B0aW9ucy5wcmVzaWduZWRVcmxQYXR0ZXJucykge1xuICAgICAgICAgICAgY29uc3QgcGF0dGVybnMgPSB0aGlzLnJlcXVlc3RPcHRpb25zLnByZXNpZ25lZFVybFBhdHRlcm5zO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXR0ZXJucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0VXJsLm1hdGNoKHBhdHRlcm5zW2ldKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBfbWVyZ2VIZWFkZXJzKGhlYWRlcnMpIHtcbiAgICAgICAgY29uc3QgbG93ZXJjYXNlS2V5cyA9IG9iaiA9PiBPYmplY3Qua2V5cyhvYmopLnJlZHVjZSgoYywgaykgPT4gKGNbay50b0xvd2VyQ2FzZSgpXSA9IG9ialtrXSwgYyksIHt9KTtcbiAgICAgICAgaWYgKHRoaXMucmVxdWVzdE9wdGlvbnMgJiYgdGhpcy5yZXF1ZXN0T3B0aW9ucy5oZWFkZXJzKSB7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgbG93ZXJjYXNlS2V5cyh0aGlzLnJlcXVlc3RPcHRpb25zLmhlYWRlcnMpLCBsb3dlcmNhc2VLZXlzKGhlYWRlcnMpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbG93ZXJjYXNlS2V5cyhoZWFkZXJzIHx8IHt9KTtcbiAgICB9XG4gICAgX2dldEFnZW50KHJlcXVlc3RVcmwpIHtcbiAgICAgICAgbGV0IGFnZW50O1xuICAgICAgICBsZXQgcHJveHkgPSB0aGlzLl9nZXRQcm94eShyZXF1ZXN0VXJsKTtcbiAgICAgICAgbGV0IHVzZVByb3h5ID0gcHJveHkucHJveHlVcmwgJiYgcHJveHkucHJveHlVcmwuaG9zdG5hbWUgJiYgIXRoaXMuX2lzQnlwYXNzUHJveHkocmVxdWVzdFVybCk7XG4gICAgICAgIGlmICh0aGlzLl9rZWVwQWxpdmUgJiYgdXNlUHJveHkpIHtcbiAgICAgICAgICAgIGFnZW50ID0gdGhpcy5fcHJveHlBZ2VudDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fa2VlcEFsaXZlICYmICF1c2VQcm94eSkge1xuICAgICAgICAgICAgYWdlbnQgPSB0aGlzLl9hZ2VudDtcbiAgICAgICAgfVxuICAgICAgICAvLyBpZiBhZ2VudCBpcyBhbHJlYWR5IGFzc2lnbmVkIHVzZSB0aGF0IGFnZW50LlxuICAgICAgICBpZiAoISFhZ2VudCkge1xuICAgICAgICAgICAgcmV0dXJuIGFnZW50O1xuICAgICAgICB9XG4gICAgICAgIGxldCBwYXJzZWRVcmwgPSB1cmwucGFyc2UocmVxdWVzdFVybCk7XG4gICAgICAgIGNvbnN0IHVzaW5nU3NsID0gcGFyc2VkVXJsLnByb3RvY29sID09PSAnaHR0cHM6JztcbiAgICAgICAgbGV0IG1heFNvY2tldHMgPSAxMDA7XG4gICAgICAgIGlmICghIXRoaXMucmVxdWVzdE9wdGlvbnMpIHtcbiAgICAgICAgICAgIG1heFNvY2tldHMgPSB0aGlzLnJlcXVlc3RPcHRpb25zLm1heFNvY2tldHMgfHwgaHR0cC5nbG9iYWxBZ2VudC5tYXhTb2NrZXRzO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1c2VQcm94eSkge1xuICAgICAgICAgICAgLy8gSWYgdXNpbmcgcHJveHksIG5lZWQgdHVubmVsXG4gICAgICAgICAgICBpZiAoIXR1bm5lbCkge1xuICAgICAgICAgICAgICAgIHR1bm5lbCA9IHJlcXVpcmUoJ3R1bm5lbCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgYWdlbnRPcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIG1heFNvY2tldHM6IG1heFNvY2tldHMsXG4gICAgICAgICAgICAgICAga2VlcEFsaXZlOiB0aGlzLl9rZWVwQWxpdmUsXG4gICAgICAgICAgICAgICAgcHJveHk6IHtcbiAgICAgICAgICAgICAgICAgICAgcHJveHlBdXRoOiBwcm94eS5wcm94eUF1dGgsXG4gICAgICAgICAgICAgICAgICAgIGhvc3Q6IHByb3h5LnByb3h5VXJsLmhvc3RuYW1lLFxuICAgICAgICAgICAgICAgICAgICBwb3J0OiBwcm94eS5wcm94eVVybC5wb3J0XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBsZXQgdHVubmVsQWdlbnQ7XG4gICAgICAgICAgICBjb25zdCBvdmVySHR0cHMgPSBwcm94eS5wcm94eVVybC5wcm90b2NvbCA9PT0gJ2h0dHBzOic7XG4gICAgICAgICAgICBpZiAodXNpbmdTc2wpIHtcbiAgICAgICAgICAgICAgICB0dW5uZWxBZ2VudCA9IG92ZXJIdHRwcyA/IHR1bm5lbC5odHRwc092ZXJIdHRwcyA6IHR1bm5lbC5odHRwc092ZXJIdHRwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdHVubmVsQWdlbnQgPSBvdmVySHR0cHMgPyB0dW5uZWwuaHR0cE92ZXJIdHRwcyA6IHR1bm5lbC5odHRwT3Zlckh0dHA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhZ2VudCA9IHR1bm5lbEFnZW50KGFnZW50T3B0aW9ucyk7XG4gICAgICAgICAgICB0aGlzLl9wcm94eUFnZW50ID0gYWdlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgcmV1c2luZyBhZ2VudCBhY3Jvc3MgcmVxdWVzdCBhbmQgdHVubmVsaW5nIGFnZW50IGlzbid0IGFzc2lnbmVkIGNyZWF0ZSBhIG5ldyBhZ2VudFxuICAgICAgICBpZiAodGhpcy5fa2VlcEFsaXZlICYmICFhZ2VudCkge1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHsga2VlcEFsaXZlOiB0aGlzLl9rZWVwQWxpdmUsIG1heFNvY2tldHM6IG1heFNvY2tldHMgfTtcbiAgICAgICAgICAgIGFnZW50ID0gdXNpbmdTc2wgPyBuZXcgaHR0cHMuQWdlbnQob3B0aW9ucykgOiBuZXcgaHR0cC5BZ2VudChvcHRpb25zKTtcbiAgICAgICAgICAgIHRoaXMuX2FnZW50ID0gYWdlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgbm90IHVzaW5nIHByaXZhdGUgYWdlbnQgYW5kIHR1bm5lbCBhZ2VudCBpc24ndCBzZXR1cCB0aGVuIHVzZSBnbG9iYWwgYWdlbnRcbiAgICAgICAgaWYgKCFhZ2VudCkge1xuICAgICAgICAgICAgYWdlbnQgPSB1c2luZ1NzbCA/IGh0dHBzLmdsb2JhbEFnZW50IDogaHR0cC5nbG9iYWxBZ2VudDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodXNpbmdTc2wgJiYgdGhpcy5faWdub3JlU3NsRXJyb3IpIHtcbiAgICAgICAgICAgIC8vIHdlIGRvbid0IHdhbnQgdG8gc2V0IE5PREVfVExTX1JFSkVDVF9VTkFVVEhPUklaRUQ9MCBzaW5jZSB0aGF0IHdpbGwgYWZmZWN0IHJlcXVlc3QgZm9yIGVudGlyZSBwcm9jZXNzXG4gICAgICAgICAgICAvLyBodHRwLlJlcXVlc3RPcHRpb25zIGRvZXNuJ3QgZXhwb3NlIGEgd2F5IHRvIG1vZGlmeSBSZXF1ZXN0T3B0aW9ucy5hZ2VudC5vcHRpb25zXG4gICAgICAgICAgICAvLyB3ZSBoYXZlIHRvIGNhc3QgaXQgdG8gYW55IGFuZCBjaGFuZ2UgaXQgZGlyZWN0bHlcbiAgICAgICAgICAgIGFnZW50Lm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKGFnZW50Lm9wdGlvbnMgfHwge30sIHsgcmVqZWN0VW5hdXRob3JpemVkOiBmYWxzZSB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodXNpbmdTc2wgJiYgdGhpcy5fY2VydENvbmZpZykge1xuICAgICAgICAgICAgYWdlbnQub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oYWdlbnQub3B0aW9ucyB8fCB7fSwgeyBjYTogdGhpcy5fY2EsIGNlcnQ6IHRoaXMuX2NlcnQsIGtleTogdGhpcy5fa2V5LCBwYXNzcGhyYXNlOiB0aGlzLl9jZXJ0Q29uZmlnLnBhc3NwaHJhc2UgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFnZW50O1xuICAgIH1cbiAgICBfZ2V0UHJveHkocmVxdWVzdFVybCkge1xuICAgICAgICBjb25zdCBwYXJzZWRVcmwgPSB1cmwucGFyc2UocmVxdWVzdFVybCk7XG4gICAgICAgIGxldCB1c2luZ1NzbCA9IHBhcnNlZFVybC5wcm90b2NvbCA9PT0gJ2h0dHBzOic7XG4gICAgICAgIGxldCBwcm94eUNvbmZpZyA9IHRoaXMuX2h0dHBQcm94eTtcbiAgICAgICAgLy8gZmFsbGJhY2sgdG8gaHR0cF9wcm94eSBhbmQgaHR0cHNfcHJveHkgZW52XG4gICAgICAgIGxldCBodHRwc19wcm94eSA9IHByb2Nlc3MuZW52W0Vudmlyb25tZW50VmFyaWFibGVzLkhUVFBTX1BST1hZXTtcbiAgICAgICAgbGV0IGh0dHBfcHJveHkgPSBwcm9jZXNzLmVudltFbnZpcm9ubWVudFZhcmlhYmxlcy5IVFRQX1BST1hZXTtcbiAgICAgICAgaWYgKCFwcm94eUNvbmZpZykge1xuICAgICAgICAgICAgaWYgKGh0dHBzX3Byb3h5ICYmIHVzaW5nU3NsKSB7XG4gICAgICAgICAgICAgICAgcHJveHlDb25maWcgPSB7XG4gICAgICAgICAgICAgICAgICAgIHByb3h5VXJsOiBodHRwc19wcm94eVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChodHRwX3Byb3h5KSB7XG4gICAgICAgICAgICAgICAgcHJveHlDb25maWcgPSB7XG4gICAgICAgICAgICAgICAgICAgIHByb3h5VXJsOiBodHRwX3Byb3h5XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgcHJveHlVcmw7XG4gICAgICAgIGxldCBwcm94eUF1dGg7XG4gICAgICAgIGlmIChwcm94eUNvbmZpZykge1xuICAgICAgICAgICAgaWYgKHByb3h5Q29uZmlnLnByb3h5VXJsLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBwcm94eVVybCA9IHVybC5wYXJzZShwcm94eUNvbmZpZy5wcm94eVVybCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocHJveHlDb25maWcucHJveHlVc2VybmFtZSB8fCBwcm94eUNvbmZpZy5wcm94eVBhc3N3b3JkKSB7XG4gICAgICAgICAgICAgICAgcHJveHlBdXRoID0gcHJveHlDb25maWcucHJveHlVc2VybmFtZSArIFwiOlwiICsgcHJveHlDb25maWcucHJveHlQYXNzd29yZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBwcm94eVVybDogcHJveHlVcmwsIHByb3h5QXV0aDogcHJveHlBdXRoIH07XG4gICAgfVxuICAgIF9pc0J5cGFzc1Byb3h5KHJlcXVlc3RVcmwpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9odHRwUHJveHlCeXBhc3NIb3N0cykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGxldCBieXBhc3MgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faHR0cFByb3h5QnlwYXNzSG9zdHMuZm9yRWFjaChieXBhc3NIb3N0ID0+IHtcbiAgICAgICAgICAgIGlmIChieXBhc3NIb3N0LnRlc3QocmVxdWVzdFVybCkpIHtcbiAgICAgICAgICAgICAgICBieXBhc3MgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGJ5cGFzcztcbiAgICB9XG4gICAgX3BlcmZvcm1FeHBvbmVudGlhbEJhY2tvZmYocmV0cnlOdW1iZXIpIHtcbiAgICAgICAgcmV0cnlOdW1iZXIgPSBNYXRoLm1pbihFeHBvbmVudGlhbEJhY2tvZmZDZWlsaW5nLCByZXRyeU51bWJlcik7XG4gICAgICAgIGNvbnN0IG1zID0gRXhwb25lbnRpYWxCYWNrb2ZmVGltZVNsaWNlICogTWF0aC5wb3coMiwgcmV0cnlOdW1iZXIpO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KCgpID0+IHJlc29sdmUoKSwgbXMpKTtcbiAgICB9XG59XG5leHBvcnRzLkh0dHBDbGllbnQgPSBIdHRwQ2xpZW50O1xuIiwiLyoqXG4gKiBDb252ZXJ0IGFycmF5IG9mIDE2IGJ5dGUgdmFsdWVzIHRvIFVVSUQgc3RyaW5nIGZvcm1hdCBvZiB0aGUgZm9ybTpcbiAqIFhYWFhYWFhYLVhYWFgtWFhYWC1YWFhYLVhYWFhYWFhYWFhYWFxuICovXG52YXIgYnl0ZVRvSGV4ID0gW107XG5mb3IgKHZhciBpID0gMDsgaSA8IDI1NjsgKytpKSB7XG4gIGJ5dGVUb0hleFtpXSA9IChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zdWJzdHIoMSk7XG59XG5cbmZ1bmN0aW9uIGJ5dGVzVG9VdWlkKGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciBpID0gb2Zmc2V0IHx8IDA7XG4gIHZhciBidGggPSBieXRlVG9IZXg7XG4gIC8vIGpvaW4gdXNlZCB0byBmaXggbWVtb3J5IGlzc3VlIGNhdXNlZCBieSBjb25jYXRlbmF0aW9uOiBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMTc1I2M0XG4gIHJldHVybiAoW2J0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sIFxuXHRidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLCAnLScsXG5cdGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sICctJyxcblx0YnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSwgJy0nLFxuXHRidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLCAnLScsXG5cdGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sXG5cdGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sXG5cdGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV1dKS5qb2luKCcnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBieXRlc1RvVXVpZDtcbiIsIi8vIFVuaXF1ZSBJRCBjcmVhdGlvbiByZXF1aXJlcyBhIGhpZ2ggcXVhbGl0eSByYW5kb20gIyBnZW5lcmF0b3IuICBJbiBub2RlLmpzXG4vLyB0aGlzIGlzIHByZXR0eSBzdHJhaWdodC1mb3J3YXJkIC0gd2UgdXNlIHRoZSBjcnlwdG8gQVBJLlxuXG52YXIgY3J5cHRvID0gcmVxdWlyZSgnY3J5cHRvJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbm9kZVJORygpIHtcbiAgcmV0dXJuIGNyeXB0by5yYW5kb21CeXRlcygxNik7XG59O1xuIiwidmFyIHJuZyA9IHJlcXVpcmUoJy4vbGliL3JuZycpO1xudmFyIGJ5dGVzVG9VdWlkID0gcmVxdWlyZSgnLi9saWIvYnl0ZXNUb1V1aWQnKTtcblxuZnVuY3Rpb24gdjQob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgdmFyIGkgPSBidWYgJiYgb2Zmc2V0IHx8IDA7XG5cbiAgaWYgKHR5cGVvZihvcHRpb25zKSA9PSAnc3RyaW5nJykge1xuICAgIGJ1ZiA9IG9wdGlvbnMgPT09ICdiaW5hcnknID8gbmV3IEFycmF5KDE2KSA6IG51bGw7XG4gICAgb3B0aW9ucyA9IG51bGw7XG4gIH1cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgdmFyIHJuZHMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgcm5nKSgpO1xuXG4gIC8vIFBlciA0LjQsIHNldCBiaXRzIGZvciB2ZXJzaW9uIGFuZCBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGBcbiAgcm5kc1s2XSA9IChybmRzWzZdICYgMHgwZikgfCAweDQwO1xuICBybmRzWzhdID0gKHJuZHNbOF0gJiAweDNmKSB8IDB4ODA7XG5cbiAgLy8gQ29weSBieXRlcyB0byBidWZmZXIsIGlmIHByb3ZpZGVkXG4gIGlmIChidWYpIHtcbiAgICBmb3IgKHZhciBpaSA9IDA7IGlpIDwgMTY7ICsraWkpIHtcbiAgICAgIGJ1ZltpICsgaWldID0gcm5kc1tpaV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ1ZiB8fCBieXRlc1RvVXVpZChybmRzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB2NDtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xuICAgIHJlc3VsdFtcImRlZmF1bHRcIl0gPSBtb2Q7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBwYXRoXzEgPSByZXF1aXJlKFwicGF0aFwiKTtcbmNvbnN0IGZzXzEgPSByZXF1aXJlKFwiZnNcIik7XG5jb25zdCBjb3JlID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJAYWN0aW9ucy9jb3JlXCIpKTtcbmNvbnN0IGV4ZWMgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcIkBhY3Rpb25zL2V4ZWNcIikpO1xuZnVuY3Rpb24gYXV0aGVudGljYXRlKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnN0IHNlcnZpY2VBY2NvdW50S2V5QmFzZTY0ID0gY29yZS5nZXRJbnB1dCgnc2VydmljZS1hY2NvdW50LWtleScpO1xuICAgICAgICBjb25zdCBzZXJ2aWNlQWNjb3VudEtleUpzb24gPSBCdWZmZXIuZnJvbShzZXJ2aWNlQWNjb3VudEtleUJhc2U2NCwgJ2Jhc2U2NCcpO1xuICAgICAgICBjb25zdCBzZXJ2aWNlQWNjb3VudEtleVBhdGggPSBwYXRoXzEucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAnZ2Nsb3VkLmpzb24nKTtcbiAgICAgICAgZnNfMS53cml0ZUZpbGVTeW5jKHNlcnZpY2VBY2NvdW50S2V5UGF0aCwgc2VydmljZUFjY291bnRLZXlKc29uKTtcbiAgICAgICAgeWllbGQgZXhlYy5leGVjKCdnY2xvdWQnLCBbXG4gICAgICAgICAgICAnYXV0aCcsXG4gICAgICAgICAgICAnYWN0aXZhdGUtc2VydmljZS1hY2NvdW50JyxcbiAgICAgICAgICAgIGAtLWtleS1maWxlPSR7c2VydmljZUFjY291bnRLZXlQYXRofWBcbiAgICAgICAgXSk7XG4gICAgICAgIGZzXzEudW5saW5rU3luYyhzZXJ2aWNlQWNjb3VudEtleVBhdGgpO1xuICAgIH0pO1xufVxuZXhwb3J0cy5hdXRoZW50aWNhdGUgPSBhdXRoZW50aWNhdGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcbiAgICByZXN1bHRbXCJkZWZhdWx0XCJdID0gbW9kO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgdGMgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcIkBhY3Rpb25zL3Rvb2wtY2FjaGVcIikpO1xuY29uc3QgdXRpbHNfMSA9IHJlcXVpcmUoXCIuL3V0aWxzXCIpO1xuY29uc3QgZnNfMSA9IHJlcXVpcmUoXCJmc1wiKTtcbmNvbnN0IHBhdGhfMSA9IHJlcXVpcmUoXCJwYXRoXCIpO1xuZnVuY3Rpb24gZG93bmxvYWQoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc3QgZG93bmxvYWRMaW5rID0gdXRpbHNfMS5nZXREb3dubG9hZExpbmsoKTtcbiAgICAgICAgY29uc3QgZG93bmxvYWRQYXRoID0geWllbGQgdGMuZG93bmxvYWRUb29sKGRvd25sb2FkTGluayk7XG4gICAgICAgIGNvbnN0IGV4dHJhY3Rpb25QYXRoID0gcGF0aF8xLnJlc29sdmUodXRpbHNfMS5nZXRDbG91ZFNES0ZvbGRlcigpLCAnLi4nKTtcbiAgICAgICAgZnNfMS5ta2RpclN5bmModXRpbHNfMS5nZXRDbG91ZFNES0ZvbGRlcigpKTtcbiAgICAgICAgaWYgKGRvd25sb2FkTGluay5lbmRzV2l0aCgnLnppcCcpKSB7XG4gICAgICAgICAgICB5aWVsZCB0Yy5leHRyYWN0WmlwKGRvd25sb2FkUGF0aCwgZXh0cmFjdGlvblBhdGgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRvd25sb2FkTGluay5lbmRzV2l0aCgnLnRhci5neicpKSB7XG4gICAgICAgICAgICB5aWVsZCB0Yy5leHRyYWN0VGFyKGRvd25sb2FkUGF0aCwgZXh0cmFjdGlvblBhdGgpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5leHBvcnRzLmRvd25sb2FkID0gZG93bmxvYWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcbiAgICByZXN1bHRbXCJkZWZhdWx0XCJdID0gbW9kO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY29yZSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiQGFjdGlvbnMvY29yZVwiKSk7XG5jb25zdCBkb3dubG9hZF8xID0gcmVxdWlyZShcIi4vZG93bmxvYWRcIik7XG5jb25zdCBzZXR1cF8xID0gcmVxdWlyZShcIi4vc2V0dXBcIik7XG5jb25zdCBhdXRoZW50aWNhdGVfMSA9IHJlcXVpcmUoXCIuL2F1dGhlbnRpY2F0ZVwiKTtcbmZ1bmN0aW9uIGluc3RhbGwoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHlpZWxkIGRvd25sb2FkXzEuZG93bmxvYWQoKTtcbiAgICAgICAgICAgIHlpZWxkIHNldHVwXzEuc2V0dXAoKTtcbiAgICAgICAgICAgIHlpZWxkIGF1dGhlbnRpY2F0ZV8xLmF1dGhlbnRpY2F0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBjb3JlLmVycm9yKGUubWVzc2FnZSk7XG4gICAgICAgICAgICBwcm9jZXNzLmV4aXQoMSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmV4cG9ydHMuaW5zdGFsbCA9IGluc3RhbGw7XG5pbnN0YWxsKCkudGhlbigpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XG4gICAgcmVzdWx0W1wiZGVmYXVsdFwiXSA9IG1vZDtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHV0aWxzXzEgPSByZXF1aXJlKFwiLi91dGlsc1wiKTtcbmNvbnN0IHBhdGhfMSA9IHJlcXVpcmUoXCJwYXRoXCIpO1xuY29uc3QgY29yZSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiQGFjdGlvbnMvY29yZVwiKSk7XG5jb25zdCBleGVjID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJAYWN0aW9ucy9leGVjXCIpKTtcbmNvbnN0IGNoaWxkX3Byb2Nlc3NfMSA9IHJlcXVpcmUoXCJjaGlsZF9wcm9jZXNzXCIpO1xuY29uc3QgZnNfMSA9IHJlcXVpcmUoXCJmc1wiKTtcbmZ1bmN0aW9uIHNldHVwKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnN0IGluc3RhbGxTY3JpcHRFeHRlbnNpb24gPSB1dGlsc18xLmlzV2luZG93cygpID8gJ2JhdCcgOiAnc2gnO1xuICAgICAgICBjb25zdCBpbnN0YWxsU2NyaXB0ID0gcGF0aF8xLnJlc29sdmUodXRpbHNfMS5nZXRDbG91ZFNES0ZvbGRlcigpLCBgaW5zdGFsbC4ke2luc3RhbGxTY3JpcHRFeHRlbnNpb259YCk7XG4gICAgICAgIGNvbnN0IGFyZ3MgPSBbXG4gICAgICAgICAgICAnLS11c2FnZS1yZXBvcnRpbmc9ZmFsc2UnLFxuICAgICAgICAgICAgJy0tY29tbWFuZC1jb21wbGV0aW9uPWZhbHNlJyxcbiAgICAgICAgICAgICctLXBhdGgtdXBkYXRlPXRydWUnLFxuICAgICAgICAgICAgJy0tdXNhZ2UtcmVwb3J0aW5nPWZhbHNlJyxcbiAgICAgICAgICAgIC8vICctLWFkZGl0aW9uYWwtY29tcG9uZW50cycsXG4gICAgICAgICAgICAnLS1xdWlldCdcbiAgICAgICAgXTtcbiAgICAgICAgaWYgKHV0aWxzXzEuaXNXaW5kb3dzKCkpIHtcbiAgICAgICAgICAgIC8vIEBhY3Rpb25zL2V4ZWMgZG9lcyBub3QgZXhpdCBvbiB3aW5kb3dzXG4gICAgICAgICAgICBjaGlsZF9wcm9jZXNzXzEuZXhlY1N5bmMoYFwiJHtpbnN0YWxsU2NyaXB0fVwiICR7YXJncy5qb2luKCcgJyl9YCwgeyBzdGRpbzogJ2luaGVyaXQnIH0pO1xuICAgICAgICAgICAgY29uc3QgbHMgPSBmc18xLnJlYWRkaXJTeW5jKHBhdGhfMS5yZXNvbHZlKHV0aWxzXzEuZ2V0Q2xvdWRTREtGb2xkZXIoKSwgJ2JpbicpKTtcbiAgICAgICAgICAgIGNvcmUuaW5mbyhscy5qb2luKCdcXG4nKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB5aWVsZCBleGVjLmV4ZWMoaW5zdGFsbFNjcmlwdCwgYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYmluUGF0aCA9IHBhdGhfMS5yZXNvbHZlKHV0aWxzXzEuZ2V0Q2xvdWRTREtGb2xkZXIoKSwgJ2JpbicpO1xuICAgICAgICBjb3JlLmFkZFBhdGgoYmluUGF0aCk7XG4gICAgfSk7XG59XG5leHBvcnRzLnNldHVwID0gc2V0dXA7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XG4gICAgcmVzdWx0W1wiZGVmYXVsdFwiXSA9IG1vZDtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHBhdGhfMSA9IHJlcXVpcmUoXCJwYXRoXCIpO1xuY29uc3QgY29yZSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiQGFjdGlvbnMvY29yZVwiKSk7XG5mdW5jdGlvbiBpc1dpbmRvd3MoKSB7XG4gICAgcmV0dXJuIHByb2Nlc3MucGxhdGZvcm0gPT09ICd3aW4zMic7XG59XG5leHBvcnRzLmlzV2luZG93cyA9IGlzV2luZG93cztcbmZ1bmN0aW9uIGlzTWFjT1MoKSB7XG4gICAgcmV0dXJuIHByb2Nlc3MucGxhdGZvcm0gPT09ICdkYXJ3aW4nO1xufVxuZXhwb3J0cy5pc01hY09TID0gaXNNYWNPUztcbmZ1bmN0aW9uIGlzVWJ1bnR1KCkge1xuICAgIHJldHVybiBwcm9jZXNzLnBsYXRmb3JtID09PSAnbGludXgnO1xufVxuZXhwb3J0cy5pc1VidW50dSA9IGlzVWJ1bnR1O1xuZnVuY3Rpb24gZ2V0Q2xvdWRTREtGb2xkZXIoKSB7XG4gICAgaWYgKGlzV2luZG93cygpKSB7XG4gICAgICAgIHJldHVybiAnQzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxnb29nbGUtY2xvdWQtc2RrJztcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNVYnVudHUoKSkge1xuICAgICAgICByZXR1cm4gJy9ob21lL3J1bm5lci9nb29nbGUtY2xvdWQtc2RrJztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnN0IGhvbWUgPSBwcm9jZXNzLmVudi5IT01FID8gcHJvY2Vzcy5lbnYuSE9NRSA6IHByb2Nlc3MuY3dkKCk7XG4gICAgICAgIHJldHVybiBwYXRoXzEucmVzb2x2ZShob21lLCAnZ29vZ2xlLWNsb3VkLXNkaycpO1xuICAgIH1cbn1cbmV4cG9ydHMuZ2V0Q2xvdWRTREtGb2xkZXIgPSBnZXRDbG91ZFNES0ZvbGRlcjtcbmZ1bmN0aW9uIGdldERvd25sb2FkTGluaygpIHtcbiAgICBjb25zdCBiYXNlVXJsID0gJ2h0dHBzOi8vZGwuZ29vZ2xlLmNvbS9kbC9jbG91ZHNkay9jaGFubmVscy9yYXBpZCc7XG4gICAgY29uc3QgdmVyc2lvbiA9IGNvcmUuZ2V0SW5wdXQoJ3ZlcnNpb24nKTtcbiAgICBpZiAodmVyc2lvbiA9PT0gJ2xhdGVzdCcpIHtcbiAgICAgICAgaWYgKGlzV2luZG93cygpKSB7XG4gICAgICAgICAgICByZXR1cm4gYCR7YmFzZVVybH0vZ29vZ2xlLWNsb3VkLXNkay56aXBgO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGAke2Jhc2VVcmx9L2dvb2dsZS1jbG91ZC1zZGsudGFyLmd6YDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoaXNXaW5kb3dzKCkpIHtcbiAgICAgICAgcmV0dXJuIGAke2Jhc2VVcmx9L2Rvd25sb2Fkcy9nb29nbGUtY2xvdWQtc2RrLSR7dmVyc2lvbn0td2luZG93cy14ODZfNjQuemlwYDtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNNYWNPUygpKSB7XG4gICAgICAgIHJldHVybiBgJHtiYXNlVXJsfS9kb3dubG9hZHMvZ29vZ2xlLWNsb3VkLXNkay0ke3ZlcnNpb259LWRhcndpbi14ODZfNjQudGFyLmd6YDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBgJHtiYXNlVXJsfS9kb3dubG9hZHMvZ29vZ2xlLWNsb3VkLXNkay0ke3ZlcnNpb259LWxpbnV4LXg4Nl82NC50YXIuZ3pgO1xuICAgIH1cbn1cbmV4cG9ydHMuZ2V0RG93bmxvYWRMaW5rID0gZ2V0RG93bmxvYWRMaW5rO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXNzZXJ0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNoaWxkX3Byb2Nlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY3J5cHRvXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV2ZW50c1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJodHRwXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5ldFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJvc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRsc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1cmxcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXRpbFwiKTsiXSwic291cmNlUm9vdCI6IiJ9