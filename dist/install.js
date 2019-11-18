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
        this.compressMode = 'tar.gz';
        this.setSdkDownloadUrl();
    }
    download() {
        return __awaiter(this, void 0, void 0, function* () {
            const destination = path_1.resolve(process.cwd(), `google-cloud-sdk.${this.compressMode}`);
            if (fs_1.existsSync(destination)) {
                return destination;
            }
            core.debug(`Downloading ${this.sdkUrl}`);
            yield exec.exec(`curl -o ${destination} ${this.sdkUrl}`);
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
const exec = __importStar(__webpack_require__(/*! @actions/exec */ "./node_modules/@actions/exec/lib/exec.js"));
const fs_1 = __webpack_require__(/*! fs */ "fs");
function install() {
    return __awaiter(this, void 0, void 0, function* () {
        const downloader = new download_1.Download('latest');
        const sdkFile = yield downloader.download();
        const destinationFolder = path_1.resolve(process.cwd(), 'google-cloud-sdk');
        if (sdkFile.endsWith('.zip')) {
            core.debug('Downloaded file is a zip, unzipping...');
            const zip = new adm_zip_1.default(path_1.resolve(process.cwd(), sdkFile));
            zip.extractAllTo(destinationFolder, true);
            core.debug(`Unzipped to ${destinationFolder}`);
        }
        else {
            exec.exec('tar -xvf ' + sdkFile);
        }
        if (process.platform === 'win32') {
        }
        else {
            yield exec.exec(path_1.resolve(destinationFolder, 'install.sh'));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhY3Rpb25zL2NvcmUvbGliL2NvbW1hbmQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhY3Rpb25zL2NvcmUvbGliL2NvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhY3Rpb25zL2V4ZWMvbGliL2V4ZWMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhY3Rpb25zL2V4ZWMvbGliL3Rvb2xydW5uZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FkbS16aXAvYWRtLXppcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYWRtLXppcC9oZWFkZXJzL2VudHJ5SGVhZGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hZG0temlwL2hlYWRlcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FkbS16aXAvaGVhZGVycy9tYWluSGVhZGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hZG0temlwL21ldGhvZHMvZGVmbGF0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FkbS16aXAvbWV0aG9kcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYWRtLXppcC9tZXRob2RzL2luZmxhdGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hZG0temlwL3V0aWwvY29uc3RhbnRzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hZG0temlwL3V0aWwvZXJyb3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hZG0temlwL3V0aWwvZmF0dHIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FkbS16aXAvdXRpbC9maWxlU3lzdGVtLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hZG0temlwL3V0aWwvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FkbS16aXAvdXRpbC91dGlscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYWRtLXppcC96aXBFbnRyeS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYWRtLXppcC96aXBGaWxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9vcmlnaW5hbC1mcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZG93bmxvYWQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luc3RhbGwudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY2hpbGRfcHJvY2Vzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV2ZW50c1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImZzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwib3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXRoXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiemxpYlwiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFp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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJO0FBQ0o7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQztBQUMvQztBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQztBQUMvQztBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDZHQUE2RztBQUM3RztBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1DQUFtQztBQUNuQyxLQUFLO0FBQ0wsd0JBQXdCO0FBQ3hCO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7O0FBRXZCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLEtBQUs7QUFDTCxJQUFJO0FBQ0osR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3hpQkEsWUFBWSxtQkFBTyxDQUFDLHFEQUFTO0FBQzdCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DO0FB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QTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7OztBQ2xDQSxTQUFTLG1CQUFPLENBQUMsK0RBQWM7QUFDL0IsVUFBVSxtQkFBTyxDQUFDLGtCQUFNOztBQUV4Qjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDckVhO0FBQ2I7QUFDQSwyQkFBMkIsK0RBQStELGdCQUFnQixFQUFFLEVBQUU7QUFDOUc7QUFDQSxtQ0FBbUMsTUFBTSw2QkFBNkIsRUFBRSxZQUFZLFdBQVcsRUFBRTtBQUNqRyxrQ0FBa0MsTUFBTSxpQ0FBaUMsRUFBRSxZQUFZLFdBQVcsRUFBRTtBQUNwRywrQkFBK0IscUZBQXFGO0FBQ3BIO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVELG1CQUFtQixtQkFBTyxDQUFDLHFDQUFZO0FBQ3ZDLGtDQUFrQyxtQkFBTyxDQUFDLGtEQUFTO0FBQ25ELGVBQWUsbUJBQU8sQ0FBQyxrQkFBTTtBQUM3QiwwQkFBMEIsbUJBQU8sQ0FBQywrREFBZTtBQUNqRCwwQkFBMEIsbUJBQU8sQ0FBQywrREFBZTtBQUNqRCxhQUFhLG1CQUFPLENBQUMsY0FBSTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0Msa0JBQWtCO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkVBQTJFLHNCQUFzQjtBQUNqRyxLQUFLO0FBQ0w7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN0REEsMEM7Ozs7Ozs7Ozs7O0FDQUEsbUM7Ozs7Ozs7Ozs7O0FDQUEsK0I7Ozs7Ozs7Ozs7O0FDQUEsK0I7Ozs7Ozs7Ozs7O0FDQUEsaUM7Ozs7Ozs7Ozs7O0FDQUEsaUMiLCJmaWxlIjoiaW5zdGFsbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luc3RhbGwudHNcIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IG9zID0gcmVxdWlyZShcIm9zXCIpO1xuLyoqXG4gKiBDb21tYW5kc1xuICpcbiAqIENvbW1hbmQgRm9ybWF0OlxuICogICAjI1tuYW1lIGtleT12YWx1ZTtrZXk9dmFsdWVdbWVzc2FnZVxuICpcbiAqIEV4YW1wbGVzOlxuICogICAjI1t3YXJuaW5nXVRoaXMgaXMgdGhlIHVzZXIgd2FybmluZyBtZXNzYWdlXG4gKiAgICMjW3NldC1zZWNyZXQgbmFtZT1teXBhc3N3b3JkXWRlZmluaXRlbHlOb3RBUGFzc3dvcmQhXG4gKi9cbmZ1bmN0aW9uIGlzc3VlQ29tbWFuZChjb21tYW5kLCBwcm9wZXJ0aWVzLCBtZXNzYWdlKSB7XG4gICAgY29uc3QgY21kID0gbmV3IENvbW1hbmQoY29tbWFuZCwgcHJvcGVydGllcywgbWVzc2FnZSk7XG4gICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoY21kLnRvU3RyaW5nKCkgKyBvcy5FT0wpO1xufVxuZXhwb3J0cy5pc3N1ZUNvbW1hbmQgPSBpc3N1ZUNvbW1hbmQ7XG5mdW5jdGlvbiBpc3N1ZShuYW1lLCBtZXNzYWdlID0gJycpIHtcbiAgICBpc3N1ZUNvbW1hbmQobmFtZSwge30sIG1lc3NhZ2UpO1xufVxuZXhwb3J0cy5pc3N1ZSA9IGlzc3VlO1xuY29uc3QgQ01EX1NUUklORyA9ICc6Oic7XG5jbGFzcyBDb21tYW5kIHtcbiAgICBjb25zdHJ1Y3Rvcihjb21tYW5kLCBwcm9wZXJ0aWVzLCBtZXNzYWdlKSB7XG4gICAgICAgIGlmICghY29tbWFuZCkge1xuICAgICAgICAgICAgY29tbWFuZCA9ICdtaXNzaW5nLmNvbW1hbmQnO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29tbWFuZCA9IGNvbW1hbmQ7XG4gICAgICAgIHRoaXMucHJvcGVydGllcyA9IHByb3BlcnRpZXM7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgfVxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICBsZXQgY21kU3RyID0gQ01EX1NUUklORyArIHRoaXMuY29tbWFuZDtcbiAgICAgICAgaWYgKHRoaXMucHJvcGVydGllcyAmJiBPYmplY3Qua2V5cyh0aGlzLnByb3BlcnRpZXMpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNtZFN0ciArPSAnICc7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLnByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsID0gdGhpcy5wcm9wZXJ0aWVzW2tleV07XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNhZmVseSBhcHBlbmQgdGhlIHZhbCAtIGF2b2lkIGJsb3dpbmcgdXAgd2hlbiBhdHRlbXB0aW5nIHRvXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjYWxsIC5yZXBsYWNlKCkgaWYgbWVzc2FnZSBpcyBub3QgYSBzdHJpbmcgZm9yIHNvbWUgcmVhc29uXG4gICAgICAgICAgICAgICAgICAgICAgICBjbWRTdHIgKz0gYCR7a2V5fT0ke2VzY2FwZShgJHt2YWwgfHwgJyd9YCl9LGA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY21kU3RyICs9IENNRF9TVFJJTkc7XG4gICAgICAgIC8vIHNhZmVseSBhcHBlbmQgdGhlIG1lc3NhZ2UgLSBhdm9pZCBibG93aW5nIHVwIHdoZW4gYXR0ZW1wdGluZyB0b1xuICAgICAgICAvLyBjYWxsIC5yZXBsYWNlKCkgaWYgbWVzc2FnZSBpcyBub3QgYSBzdHJpbmcgZm9yIHNvbWUgcmVhc29uXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBgJHt0aGlzLm1lc3NhZ2UgfHwgJyd9YDtcbiAgICAgICAgY21kU3RyICs9IGVzY2FwZURhdGEobWVzc2FnZSk7XG4gICAgICAgIHJldHVybiBjbWRTdHI7XG4gICAgfVxufVxuZnVuY3Rpb24gZXNjYXBlRGF0YShzKSB7XG4gICAgcmV0dXJuIHMucmVwbGFjZSgvXFxyL2csICclMEQnKS5yZXBsYWNlKC9cXG4vZywgJyUwQScpO1xufVxuZnVuY3Rpb24gZXNjYXBlKHMpIHtcbiAgICByZXR1cm4gc1xuICAgICAgICAucmVwbGFjZSgvXFxyL2csICclMEQnKVxuICAgICAgICAucmVwbGFjZSgvXFxuL2csICclMEEnKVxuICAgICAgICAucmVwbGFjZSgvXS9nLCAnJTVEJylcbiAgICAgICAgLnJlcGxhY2UoLzsvZywgJyUzQicpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29tbWFuZC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY29tbWFuZF8xID0gcmVxdWlyZShcIi4vY29tbWFuZFwiKTtcbmNvbnN0IG9zID0gcmVxdWlyZShcIm9zXCIpO1xuY29uc3QgcGF0aCA9IHJlcXVpcmUoXCJwYXRoXCIpO1xuLyoqXG4gKiBUaGUgY29kZSB0byBleGl0IGFuIGFjdGlvblxuICovXG52YXIgRXhpdENvZGU7XG4oZnVuY3Rpb24gKEV4aXRDb2RlKSB7XG4gICAgLyoqXG4gICAgICogQSBjb2RlIGluZGljYXRpbmcgdGhhdCB0aGUgYWN0aW9uIHdhcyBzdWNjZXNzZnVsXG4gICAgICovXG4gICAgRXhpdENvZGVbRXhpdENvZGVbXCJTdWNjZXNzXCJdID0gMF0gPSBcIlN1Y2Nlc3NcIjtcbiAgICAvKipcbiAgICAgKiBBIGNvZGUgaW5kaWNhdGluZyB0aGF0IHRoZSBhY3Rpb24gd2FzIGEgZmFpbHVyZVxuICAgICAqL1xuICAgIEV4aXRDb2RlW0V4aXRDb2RlW1wiRmFpbHVyZVwiXSA9IDFdID0gXCJGYWlsdXJlXCI7XG59KShFeGl0Q29kZSA9IGV4cG9ydHMuRXhpdENvZGUgfHwgKGV4cG9ydHMuRXhpdENvZGUgPSB7fSkpO1xuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gVmFyaWFibGVzXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vKipcbiAqIFNldHMgZW52IHZhcmlhYmxlIGZvciB0aGlzIGFjdGlvbiBhbmQgZnV0dXJlIGFjdGlvbnMgaW4gdGhlIGpvYlxuICogQHBhcmFtIG5hbWUgdGhlIG5hbWUgb2YgdGhlIHZhcmlhYmxlIHRvIHNldFxuICogQHBhcmFtIHZhbCB0aGUgdmFsdWUgb2YgdGhlIHZhcmlhYmxlXG4gKi9cbmZ1bmN0aW9uIGV4cG9ydFZhcmlhYmxlKG5hbWUsIHZhbCkge1xuICAgIHByb2Nlc3MuZW52W25hbWVdID0gdmFsO1xuICAgIGNvbW1hbmRfMS5pc3N1ZUNvbW1hbmQoJ3NldC1lbnYnLCB7IG5hbWUgfSwgdmFsKTtcbn1cbmV4cG9ydHMuZXhwb3J0VmFyaWFibGUgPSBleHBvcnRWYXJpYWJsZTtcbi8qKlxuICogUmVnaXN0ZXJzIGEgc2VjcmV0IHdoaWNoIHdpbGwgZ2V0IG1hc2tlZCBmcm9tIGxvZ3NcbiAqIEBwYXJhbSBzZWNyZXQgdmFsdWUgb2YgdGhlIHNlY3JldFxuICovXG5mdW5jdGlvbiBzZXRTZWNyZXQoc2VjcmV0KSB7XG4gICAgY29tbWFuZF8xLmlzc3VlQ29tbWFuZCgnYWRkLW1hc2snLCB7fSwgc2VjcmV0KTtcbn1cbmV4cG9ydHMuc2V0U2VjcmV0ID0gc2V0U2VjcmV0O1xuLyoqXG4gKiBQcmVwZW5kcyBpbnB1dFBhdGggdG8gdGhlIFBBVEggKGZvciB0aGlzIGFjdGlvbiBhbmQgZnV0dXJlIGFjdGlvbnMpXG4gKiBAcGFyYW0gaW5wdXRQYXRoXG4gKi9cbmZ1bmN0aW9uIGFkZFBhdGgoaW5wdXRQYXRoKSB7XG4gICAgY29tbWFuZF8xLmlzc3VlQ29tbWFuZCgnYWRkLXBhdGgnLCB7fSwgaW5wdXRQYXRoKTtcbiAgICBwcm9jZXNzLmVudlsnUEFUSCddID0gYCR7aW5wdXRQYXRofSR7cGF0aC5kZWxpbWl0ZXJ9JHtwcm9jZXNzLmVudlsnUEFUSCddfWA7XG59XG5leHBvcnRzLmFkZFBhdGggPSBhZGRQYXRoO1xuLyoqXG4gKiBHZXRzIHRoZSB2YWx1ZSBvZiBhbiBpbnB1dC4gIFRoZSB2YWx1ZSBpcyBhbHNvIHRyaW1tZWQuXG4gKlxuICogQHBhcmFtICAgICBuYW1lICAgICBuYW1lIG9mIHRoZSBpbnB1dCB0byBnZXRcbiAqIEBwYXJhbSAgICAgb3B0aW9ucyAgb3B0aW9uYWwuIFNlZSBJbnB1dE9wdGlvbnMuXG4gKiBAcmV0dXJucyAgIHN0cmluZ1xuICovXG5mdW5jdGlvbiBnZXRJbnB1dChuYW1lLCBvcHRpb25zKSB7XG4gICAgY29uc3QgdmFsID0gcHJvY2Vzcy5lbnZbYElOUFVUXyR7bmFtZS5yZXBsYWNlKC8gL2csICdfJykudG9VcHBlckNhc2UoKX1gXSB8fCAnJztcbiAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnJlcXVpcmVkICYmICF2YWwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnB1dCByZXF1aXJlZCBhbmQgbm90IHN1cHBsaWVkOiAke25hbWV9YCk7XG4gICAgfVxuICAgIHJldHVybiB2YWwudHJpbSgpO1xufVxuZXhwb3J0cy5nZXRJbnB1dCA9IGdldElucHV0O1xuLyoqXG4gKiBTZXRzIHRoZSB2YWx1ZSBvZiBhbiBvdXRwdXQuXG4gKlxuICogQHBhcmFtICAgICBuYW1lICAgICBuYW1lIG9mIHRoZSBvdXRwdXQgdG8gc2V0XG4gKiBAcGFyYW0gICAgIHZhbHVlICAgIHZhbHVlIHRvIHN0b3JlXG4gKi9cbmZ1bmN0aW9uIHNldE91dHB1dChuYW1lLCB2YWx1ZSkge1xuICAgIGNvbW1hbmRfMS5pc3N1ZUNvbW1hbmQoJ3NldC1vdXRwdXQnLCB7IG5hbWUgfSwgdmFsdWUpO1xufVxuZXhwb3J0cy5zZXRPdXRwdXQgPSBzZXRPdXRwdXQ7XG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBSZXN1bHRzXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vKipcbiAqIFNldHMgdGhlIGFjdGlvbiBzdGF0dXMgdG8gZmFpbGVkLlxuICogV2hlbiB0aGUgYWN0aW9uIGV4aXRzIGl0IHdpbGwgYmUgd2l0aCBhbiBleGl0IGNvZGUgb2YgMVxuICogQHBhcmFtIG1lc3NhZ2UgYWRkIGVycm9yIGlzc3VlIG1lc3NhZ2VcbiAqL1xuZnVuY3Rpb24gc2V0RmFpbGVkKG1lc3NhZ2UpIHtcbiAgICBwcm9jZXNzLmV4aXRDb2RlID0gRXhpdENvZGUuRmFpbHVyZTtcbiAgICBlcnJvcihtZXNzYWdlKTtcbn1cbmV4cG9ydHMuc2V0RmFpbGVkID0gc2V0RmFpbGVkO1xuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gTG9nZ2luZyBDb21tYW5kc1xuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLyoqXG4gKiBXcml0ZXMgZGVidWcgbWVzc2FnZSB0byB1c2VyIGxvZ1xuICogQHBhcmFtIG1lc3NhZ2UgZGVidWcgbWVzc2FnZVxuICovXG5mdW5jdGlvbiBkZWJ1ZyhtZXNzYWdlKSB7XG4gICAgY29tbWFuZF8xLmlzc3VlQ29tbWFuZCgnZGVidWcnLCB7fSwgbWVzc2FnZSk7XG59XG5leHBvcnRzLmRlYnVnID0gZGVidWc7XG4vKipcbiAqIEFkZHMgYW4gZXJyb3IgaXNzdWVcbiAqIEBwYXJhbSBtZXNzYWdlIGVycm9yIGlzc3VlIG1lc3NhZ2VcbiAqL1xuZnVuY3Rpb24gZXJyb3IobWVzc2FnZSkge1xuICAgIGNvbW1hbmRfMS5pc3N1ZSgnZXJyb3InLCBtZXNzYWdlKTtcbn1cbmV4cG9ydHMuZXJyb3IgPSBlcnJvcjtcbi8qKlxuICogQWRkcyBhbiB3YXJuaW5nIGlzc3VlXG4gKiBAcGFyYW0gbWVzc2FnZSB3YXJuaW5nIGlzc3VlIG1lc3NhZ2VcbiAqL1xuZnVuY3Rpb24gd2FybmluZyhtZXNzYWdlKSB7XG4gICAgY29tbWFuZF8xLmlzc3VlKCd3YXJuaW5nJywgbWVzc2FnZSk7XG59XG5leHBvcnRzLndhcm5pbmcgPSB3YXJuaW5nO1xuLyoqXG4gKiBXcml0ZXMgaW5mbyB0byBsb2cgd2l0aCBjb25zb2xlLmxvZy5cbiAqIEBwYXJhbSBtZXNzYWdlIGluZm8gbWVzc2FnZVxuICovXG5mdW5jdGlvbiBpbmZvKG1lc3NhZ2UpIHtcbiAgICBwcm9jZXNzLnN0ZG91dC53cml0ZShtZXNzYWdlICsgb3MuRU9MKTtcbn1cbmV4cG9ydHMuaW5mbyA9IGluZm87XG4vKipcbiAqIEJlZ2luIGFuIG91dHB1dCBncm91cC5cbiAqXG4gKiBPdXRwdXQgdW50aWwgdGhlIG5leHQgYGdyb3VwRW5kYCB3aWxsIGJlIGZvbGRhYmxlIGluIHRoaXMgZ3JvdXBcbiAqXG4gKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgb3V0cHV0IGdyb3VwXG4gKi9cbmZ1bmN0aW9uIHN0YXJ0R3JvdXAobmFtZSkge1xuICAgIGNvbW1hbmRfMS5pc3N1ZSgnZ3JvdXAnLCBuYW1lKTtcbn1cbmV4cG9ydHMuc3RhcnRHcm91cCA9IHN0YXJ0R3JvdXA7XG4vKipcbiAqIEVuZCBhbiBvdXRwdXQgZ3JvdXAuXG4gKi9cbmZ1bmN0aW9uIGVuZEdyb3VwKCkge1xuICAgIGNvbW1hbmRfMS5pc3N1ZSgnZW5kZ3JvdXAnKTtcbn1cbmV4cG9ydHMuZW5kR3JvdXAgPSBlbmRHcm91cDtcbi8qKlxuICogV3JhcCBhbiBhc3luY2hyb25vdXMgZnVuY3Rpb24gY2FsbCBpbiBhIGdyb3VwLlxuICpcbiAqIFJldHVybnMgdGhlIHNhbWUgdHlwZSBhcyB0aGUgZnVuY3Rpb24gaXRzZWxmLlxuICpcbiAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBncm91cFxuICogQHBhcmFtIGZuIFRoZSBmdW5jdGlvbiB0byB3cmFwIGluIHRoZSBncm91cFxuICovXG5mdW5jdGlvbiBncm91cChuYW1lLCBmbikge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHN0YXJ0R3JvdXAobmFtZSk7XG4gICAgICAgIGxldCByZXN1bHQ7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXN1bHQgPSB5aWVsZCBmbigpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgZW5kR3JvdXAoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0pO1xufVxuZXhwb3J0cy5ncm91cCA9IGdyb3VwO1xuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gV3JhcHBlciBhY3Rpb24gc3RhdGVcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8qKlxuICogU2F2ZXMgc3RhdGUgZm9yIGN1cnJlbnQgYWN0aW9uLCB0aGUgc3RhdGUgY2FuIG9ubHkgYmUgcmV0cmlldmVkIGJ5IHRoaXMgYWN0aW9uJ3MgcG9zdCBqb2IgZXhlY3V0aW9uLlxuICpcbiAqIEBwYXJhbSAgICAgbmFtZSAgICAgbmFtZSBvZiB0aGUgc3RhdGUgdG8gc3RvcmVcbiAqIEBwYXJhbSAgICAgdmFsdWUgICAgdmFsdWUgdG8gc3RvcmVcbiAqL1xuZnVuY3Rpb24gc2F2ZVN0YXRlKG5hbWUsIHZhbHVlKSB7XG4gICAgY29tbWFuZF8xLmlzc3VlQ29tbWFuZCgnc2F2ZS1zdGF0ZScsIHsgbmFtZSB9LCB2YWx1ZSk7XG59XG5leHBvcnRzLnNhdmVTdGF0ZSA9IHNhdmVTdGF0ZTtcbi8qKlxuICogR2V0cyB0aGUgdmFsdWUgb2YgYW4gc3RhdGUgc2V0IGJ5IHRoaXMgYWN0aW9uJ3MgbWFpbiBleGVjdXRpb24uXG4gKlxuICogQHBhcmFtICAgICBuYW1lICAgICBuYW1lIG9mIHRoZSBzdGF0ZSB0byBnZXRcbiAqIEByZXR1cm5zICAgc3RyaW5nXG4gKi9cbmZ1bmN0aW9uIGdldFN0YXRlKG5hbWUpIHtcbiAgICByZXR1cm4gcHJvY2Vzcy5lbnZbYFNUQVRFXyR7bmFtZX1gXSB8fCAnJztcbn1cbmV4cG9ydHMuZ2V0U3RhdGUgPSBnZXRTdGF0ZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvcmUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHRyID0gcmVxdWlyZShcIi4vdG9vbHJ1bm5lclwiKTtcbi8qKlxuICogRXhlYyBhIGNvbW1hbmQuXG4gKiBPdXRwdXQgd2lsbCBiZSBzdHJlYW1lZCB0byB0aGUgbGl2ZSBjb25zb2xlLlxuICogUmV0dXJucyBwcm9taXNlIHdpdGggcmV0dXJuIGNvZGVcbiAqXG4gKiBAcGFyYW0gICAgIGNvbW1hbmRMaW5lICAgICAgICBjb21tYW5kIHRvIGV4ZWN1dGUgKGNhbiBpbmNsdWRlIGFkZGl0aW9uYWwgYXJncykuIE11c3QgYmUgY29ycmVjdGx5IGVzY2FwZWQuXG4gKiBAcGFyYW0gICAgIGFyZ3MgICAgICAgICAgICAgICBvcHRpb25hbCBhcmd1bWVudHMgZm9yIHRvb2wuIEVzY2FwaW5nIGlzIGhhbmRsZWQgYnkgdGhlIGxpYi5cbiAqIEBwYXJhbSAgICAgb3B0aW9ucyAgICAgICAgICAgIG9wdGlvbmFsIGV4ZWMgb3B0aW9ucy4gIFNlZSBFeGVjT3B0aW9uc1xuICogQHJldHVybnMgICBQcm9taXNlPG51bWJlcj4gICAgZXhpdCBjb2RlXG4gKi9cbmZ1bmN0aW9uIGV4ZWMoY29tbWFuZExpbmUsIGFyZ3MsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zdCBjb21tYW5kQXJncyA9IHRyLmFyZ1N0cmluZ1RvQXJyYXkoY29tbWFuZExpbmUpO1xuICAgICAgICBpZiAoY29tbWFuZEFyZ3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFBhcmFtZXRlciAnY29tbWFuZExpbmUnIGNhbm5vdCBiZSBudWxsIG9yIGVtcHR5LmApO1xuICAgICAgICB9XG4gICAgICAgIC8vIFBhdGggdG8gdG9vbCB0byBleGVjdXRlIHNob3VsZCBiZSBmaXJzdCBhcmdcbiAgICAgICAgY29uc3QgdG9vbFBhdGggPSBjb21tYW5kQXJnc1swXTtcbiAgICAgICAgYXJncyA9IGNvbW1hbmRBcmdzLnNsaWNlKDEpLmNvbmNhdChhcmdzIHx8IFtdKTtcbiAgICAgICAgY29uc3QgcnVubmVyID0gbmV3IHRyLlRvb2xSdW5uZXIodG9vbFBhdGgsIGFyZ3MsIG9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gcnVubmVyLmV4ZWMoKTtcbiAgICB9KTtcbn1cbmV4cG9ydHMuZXhlYyA9IGV4ZWM7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1leGVjLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBvcyA9IHJlcXVpcmUoXCJvc1wiKTtcbmNvbnN0IGV2ZW50cyA9IHJlcXVpcmUoXCJldmVudHNcIik7XG5jb25zdCBjaGlsZCA9IHJlcXVpcmUoXCJjaGlsZF9wcm9jZXNzXCIpO1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L3VuYm91bmQtbWV0aG9kICovXG5jb25zdCBJU19XSU5ET1dTID0gcHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJztcbi8qXG4gKiBDbGFzcyBmb3IgcnVubmluZyBjb21tYW5kIGxpbmUgdG9vbHMuIEhhbmRsZXMgcXVvdGluZyBhbmQgYXJnIHBhcnNpbmcgaW4gYSBwbGF0Zm9ybSBhZ25vc3RpYyB3YXkuXG4gKi9cbmNsYXNzIFRvb2xSdW5uZXIgZXh0ZW5kcyBldmVudHMuRXZlbnRFbWl0dGVyIHtcbiAgICBjb25zdHJ1Y3Rvcih0b29sUGF0aCwgYXJncywgb3B0aW9ucykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBpZiAoIXRvb2xQYXRoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQYXJhbWV0ZXIgJ3Rvb2xQYXRoJyBjYW5ub3QgYmUgbnVsbCBvciBlbXB0eS5cIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50b29sUGF0aCA9IHRvb2xQYXRoO1xuICAgICAgICB0aGlzLmFyZ3MgPSBhcmdzIHx8IFtdO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIH1cbiAgICBfZGVidWcobWVzc2FnZSkge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmxpc3RlbmVycyAmJiB0aGlzLm9wdGlvbnMubGlzdGVuZXJzLmRlYnVnKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMubGlzdGVuZXJzLmRlYnVnKG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9nZXRDb21tYW5kU3RyaW5nKG9wdGlvbnMsIG5vUHJlZml4KSB7XG4gICAgICAgIGNvbnN0IHRvb2xQYXRoID0gdGhpcy5fZ2V0U3Bhd25GaWxlTmFtZSgpO1xuICAgICAgICBjb25zdCBhcmdzID0gdGhpcy5fZ2V0U3Bhd25BcmdzKG9wdGlvbnMpO1xuICAgICAgICBsZXQgY21kID0gbm9QcmVmaXggPyAnJyA6ICdbY29tbWFuZF0nOyAvLyBvbWl0IHByZWZpeCB3aGVuIHBpcGVkIHRvIGEgc2Vjb25kIHRvb2xcbiAgICAgICAgaWYgKElTX1dJTkRPV1MpIHtcbiAgICAgICAgICAgIC8vIFdpbmRvd3MgKyBjbWQgZmlsZVxuICAgICAgICAgICAgaWYgKHRoaXMuX2lzQ21kRmlsZSgpKSB7XG4gICAgICAgICAgICAgICAgY21kICs9IHRvb2xQYXRoO1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgYSBvZiBhcmdzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNtZCArPSBgICR7YX1gO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFdpbmRvd3MgKyB2ZXJiYXRpbVxuICAgICAgICAgICAgZWxzZSBpZiAob3B0aW9ucy53aW5kb3dzVmVyYmF0aW1Bcmd1bWVudHMpIHtcbiAgICAgICAgICAgICAgICBjbWQgKz0gYFwiJHt0b29sUGF0aH1cImA7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBhIG9mIGFyZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgY21kICs9IGAgJHthfWA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gV2luZG93cyAocmVndWxhcilcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNtZCArPSB0aGlzLl93aW5kb3dzUXVvdGVDbWRBcmcodG9vbFBhdGgpO1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgYSBvZiBhcmdzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNtZCArPSBgICR7dGhpcy5fd2luZG93c1F1b3RlQ21kQXJnKGEpfWA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gT1NYL0xpbnV4IC0gdGhpcyBjYW4gbGlrZWx5IGJlIGltcHJvdmVkIHdpdGggc29tZSBmb3JtIG9mIHF1b3RpbmcuXG4gICAgICAgICAgICAvLyBjcmVhdGluZyBwcm9jZXNzZXMgb24gVW5peCBpcyBmdW5kYW1lbnRhbGx5IGRpZmZlcmVudCB0aGFuIFdpbmRvd3MuXG4gICAgICAgICAgICAvLyBvbiBVbml4LCBleGVjdnAoKSB0YWtlcyBhbiBhcmcgYXJyYXkuXG4gICAgICAgICAgICBjbWQgKz0gdG9vbFBhdGg7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGEgb2YgYXJncykge1xuICAgICAgICAgICAgICAgIGNtZCArPSBgICR7YX1gO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjbWQ7XG4gICAgfVxuICAgIF9wcm9jZXNzTGluZUJ1ZmZlcihkYXRhLCBzdHJCdWZmZXIsIG9uTGluZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IHMgPSBzdHJCdWZmZXIgKyBkYXRhLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBsZXQgbiA9IHMuaW5kZXhPZihvcy5FT0wpO1xuICAgICAgICAgICAgd2hpbGUgKG4gPiAtMSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmUgPSBzLnN1YnN0cmluZygwLCBuKTtcbiAgICAgICAgICAgICAgICBvbkxpbmUobGluZSk7XG4gICAgICAgICAgICAgICAgLy8gdGhlIHJlc3Qgb2YgdGhlIHN0cmluZyAuLi5cbiAgICAgICAgICAgICAgICBzID0gcy5zdWJzdHJpbmcobiArIG9zLkVPTC5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIG4gPSBzLmluZGV4T2Yob3MuRU9MKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0ckJ1ZmZlciA9IHM7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgLy8gc3RyZWFtaW5nIGxpbmVzIHRvIGNvbnNvbGUgaXMgYmVzdCBlZmZvcnQuICBEb24ndCBmYWlsIGEgYnVpbGQuXG4gICAgICAgICAgICB0aGlzLl9kZWJ1ZyhgZXJyb3IgcHJvY2Vzc2luZyBsaW5lLiBGYWlsZWQgd2l0aCBlcnJvciAke2Vycn1gKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfZ2V0U3Bhd25GaWxlTmFtZSgpIHtcbiAgICAgICAgaWYgKElTX1dJTkRPV1MpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9pc0NtZEZpbGUoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwcm9jZXNzLmVudlsnQ09NU1BFQyddIHx8ICdjbWQuZXhlJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy50b29sUGF0aDtcbiAgICB9XG4gICAgX2dldFNwYXduQXJncyhvcHRpb25zKSB7XG4gICAgICAgIGlmIChJU19XSU5ET1dTKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5faXNDbWRGaWxlKCkpIHtcbiAgICAgICAgICAgICAgICBsZXQgYXJnbGluZSA9IGAvRCAvUyAvQyBcIiR7dGhpcy5fd2luZG93c1F1b3RlQ21kQXJnKHRoaXMudG9vbFBhdGgpfWA7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBhIG9mIHRoaXMuYXJncykge1xuICAgICAgICAgICAgICAgICAgICBhcmdsaW5lICs9ICcgJztcbiAgICAgICAgICAgICAgICAgICAgYXJnbGluZSArPSBvcHRpb25zLndpbmRvd3NWZXJiYXRpbUFyZ3VtZW50c1xuICAgICAgICAgICAgICAgICAgICAgICAgPyBhXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHRoaXMuX3dpbmRvd3NRdW90ZUNtZEFyZyhhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYXJnbGluZSArPSAnXCInO1xuICAgICAgICAgICAgICAgIHJldHVybiBbYXJnbGluZV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuYXJncztcbiAgICB9XG4gICAgX2VuZHNXaXRoKHN0ciwgZW5kKSB7XG4gICAgICAgIHJldHVybiBzdHIuZW5kc1dpdGgoZW5kKTtcbiAgICB9XG4gICAgX2lzQ21kRmlsZSgpIHtcbiAgICAgICAgY29uc3QgdXBwZXJUb29sUGF0aCA9IHRoaXMudG9vbFBhdGgudG9VcHBlckNhc2UoKTtcbiAgICAgICAgcmV0dXJuICh0aGlzLl9lbmRzV2l0aCh1cHBlclRvb2xQYXRoLCAnLkNNRCcpIHx8XG4gICAgICAgICAgICB0aGlzLl9lbmRzV2l0aCh1cHBlclRvb2xQYXRoLCAnLkJBVCcpKTtcbiAgICB9XG4gICAgX3dpbmRvd3NRdW90ZUNtZEFyZyhhcmcpIHtcbiAgICAgICAgLy8gZm9yIC5leGUsIGFwcGx5IHRoZSBub3JtYWwgcXVvdGluZyBydWxlcyB0aGF0IGxpYnV2IGFwcGxpZXNcbiAgICAgICAgaWYgKCF0aGlzLl9pc0NtZEZpbGUoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3V2UXVvdGVDbWRBcmcoYXJnKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBvdGhlcndpc2UgYXBwbHkgcXVvdGluZyBydWxlcyBzcGVjaWZpYyB0byB0aGUgY21kLmV4ZSBjb21tYW5kIGxpbmUgcGFyc2VyLlxuICAgICAgICAvLyB0aGUgbGlidXYgcnVsZXMgYXJlIGdlbmVyaWMgYW5kIGFyZSBub3QgZGVzaWduZWQgc3BlY2lmaWNhbGx5IGZvciBjbWQuZXhlXG4gICAgICAgIC8vIGNvbW1hbmQgbGluZSBwYXJzZXIuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIGZvciBhIGRldGFpbGVkIGRlc2NyaXB0aW9uIG9mIHRoZSBjbWQuZXhlIGNvbW1hbmQgbGluZSBwYXJzZXIsIHJlZmVyIHRvXG4gICAgICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDA5NDY5OS9ob3ctZG9lcy10aGUtd2luZG93cy1jb21tYW5kLWludGVycHJldGVyLWNtZC1leGUtcGFyc2Utc2NyaXB0cy83OTcwOTEyIzc5NzA5MTJcbiAgICAgICAgLy8gbmVlZCBxdW90ZXMgZm9yIGVtcHR5IGFyZ1xuICAgICAgICBpZiAoIWFyZykge1xuICAgICAgICAgICAgcmV0dXJuICdcIlwiJztcbiAgICAgICAgfVxuICAgICAgICAvLyBkZXRlcm1pbmUgd2hldGhlciB0aGUgYXJnIG5lZWRzIHRvIGJlIHF1b3RlZFxuICAgICAgICBjb25zdCBjbWRTcGVjaWFsQ2hhcnMgPSBbXG4gICAgICAgICAgICAnICcsXG4gICAgICAgICAgICAnXFx0JyxcbiAgICAgICAgICAgICcmJyxcbiAgICAgICAgICAgICcoJyxcbiAgICAgICAgICAgICcpJyxcbiAgICAgICAgICAgICdbJyxcbiAgICAgICAgICAgICddJyxcbiAgICAgICAgICAgICd7JyxcbiAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICdeJyxcbiAgICAgICAgICAgICc9JyxcbiAgICAgICAgICAgICc7JyxcbiAgICAgICAgICAgICchJyxcbiAgICAgICAgICAgIFwiJ1wiLFxuICAgICAgICAgICAgJysnLFxuICAgICAgICAgICAgJywnLFxuICAgICAgICAgICAgJ2AnLFxuICAgICAgICAgICAgJ34nLFxuICAgICAgICAgICAgJ3wnLFxuICAgICAgICAgICAgJzwnLFxuICAgICAgICAgICAgJz4nLFxuICAgICAgICAgICAgJ1wiJ1xuICAgICAgICBdO1xuICAgICAgICBsZXQgbmVlZHNRdW90ZXMgPSBmYWxzZTtcbiAgICAgICAgZm9yIChjb25zdCBjaGFyIG9mIGFyZykge1xuICAgICAgICAgICAgaWYgKGNtZFNwZWNpYWxDaGFycy5zb21lKHggPT4geCA9PT0gY2hhcikpIHtcbiAgICAgICAgICAgICAgICBuZWVkc1F1b3RlcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gc2hvcnQtY2lyY3VpdCBpZiBxdW90ZXMgbm90IG5lZWRlZFxuICAgICAgICBpZiAoIW5lZWRzUXVvdGVzKSB7XG4gICAgICAgICAgICByZXR1cm4gYXJnO1xuICAgICAgICB9XG4gICAgICAgIC8vIHRoZSBmb2xsb3dpbmcgcXVvdGluZyBydWxlcyBhcmUgdmVyeSBzaW1pbGFyIHRvIHRoZSBydWxlcyB0aGF0IGJ5IGxpYnV2IGFwcGxpZXMuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIDEpIHdyYXAgdGhlIHN0cmluZyBpbiBxdW90ZXNcbiAgICAgICAgLy9cbiAgICAgICAgLy8gMikgZG91YmxlLXVwIHF1b3RlcyAtIGkuZS4gXCIgPT4gXCJcIlxuICAgICAgICAvL1xuICAgICAgICAvLyAgICB0aGlzIGlzIGRpZmZlcmVudCBmcm9tIHRoZSBsaWJ1diBxdW90aW5nIHJ1bGVzLiBsaWJ1diByZXBsYWNlcyBcIiB3aXRoIFxcXCIsIHdoaWNoIHVuZm9ydHVuYXRlbHlcbiAgICAgICAgLy8gICAgZG9lc24ndCB3b3JrIHdlbGwgd2l0aCBhIGNtZC5leGUgY29tbWFuZCBsaW5lLlxuICAgICAgICAvL1xuICAgICAgICAvLyAgICBub3RlLCByZXBsYWNpbmcgXCIgd2l0aCBcIlwiIGFsc28gd29ya3Mgd2VsbCBpZiB0aGUgYXJnIGlzIHBhc3NlZCB0byBhIGRvd25zdHJlYW0gLk5FVCBjb25zb2xlIGFwcC5cbiAgICAgICAgLy8gICAgZm9yIGV4YW1wbGUsIHRoZSBjb21tYW5kIGxpbmU6XG4gICAgICAgIC8vICAgICAgICAgIGZvby5leGUgXCJteWFyZzpcIlwibXkgdmFsXCJcIlwiXG4gICAgICAgIC8vICAgIGlzIHBhcnNlZCBieSBhIC5ORVQgY29uc29sZSBhcHAgaW50byBhbiBhcmcgYXJyYXk6XG4gICAgICAgIC8vICAgICAgICAgIFsgXCJteWFyZzpcXFwibXkgdmFsXFxcIlwiIF1cbiAgICAgICAgLy8gICAgd2hpY2ggaXMgdGhlIHNhbWUgZW5kIHJlc3VsdCB3aGVuIGFwcGx5aW5nIGxpYnV2IHF1b3RpbmcgcnVsZXMuIGFsdGhvdWdoIHRoZSBhY3R1YWxcbiAgICAgICAgLy8gICAgY29tbWFuZCBsaW5lIGZyb20gbGlidXYgcXVvdGluZyBydWxlcyB3b3VsZCBsb29rIGxpa2U6XG4gICAgICAgIC8vICAgICAgICAgIGZvby5leGUgXCJteWFyZzpcXFwibXkgdmFsXFxcIlwiXG4gICAgICAgIC8vXG4gICAgICAgIC8vIDMpIGRvdWJsZS11cCBzbGFzaGVzIHRoYXQgcHJlY2VkZSBhIHF1b3RlLFxuICAgICAgICAvLyAgICBlLmcuICBoZWxsbyBcXHdvcmxkICAgID0+IFwiaGVsbG8gXFx3b3JsZFwiXG4gICAgICAgIC8vICAgICAgICAgIGhlbGxvXFxcIndvcmxkICAgID0+IFwiaGVsbG9cXFxcXCJcIndvcmxkXCJcbiAgICAgICAgLy8gICAgICAgICAgaGVsbG9cXFxcXCJ3b3JsZCAgID0+IFwiaGVsbG9cXFxcXFxcXFwiXCJ3b3JsZFwiXG4gICAgICAgIC8vICAgICAgICAgIGhlbGxvIHdvcmxkXFwgICAgPT4gXCJoZWxsbyB3b3JsZFxcXFxcIlxuICAgICAgICAvL1xuICAgICAgICAvLyAgICB0ZWNobmljYWxseSB0aGlzIGlzIG5vdCByZXF1aXJlZCBmb3IgYSBjbWQuZXhlIGNvbW1hbmQgbGluZSwgb3IgdGhlIGJhdGNoIGFyZ3VtZW50IHBhcnNlci5cbiAgICAgICAgLy8gICAgdGhlIHJlYXNvbnMgZm9yIGluY2x1ZGluZyB0aGlzIGFzIGEgLmNtZCBxdW90aW5nIHJ1bGUgYXJlOlxuICAgICAgICAvL1xuICAgICAgICAvLyAgICBhKSB0aGlzIGlzIG9wdGltaXplZCBmb3IgdGhlIHNjZW5hcmlvIHdoZXJlIHRoZSBhcmd1bWVudCBpcyBwYXNzZWQgZnJvbSB0aGUgLmNtZCBmaWxlIHRvIGFuXG4gICAgICAgIC8vICAgICAgIGV4dGVybmFsIHByb2dyYW0uIG1hbnkgcHJvZ3JhbXMgKGUuZy4gLk5FVCBjb25zb2xlIGFwcHMpIHJlbHkgb24gdGhlIHNsYXNoLWRvdWJsaW5nIHJ1bGUuXG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgIGIpIGl0J3Mgd2hhdCB3ZSd2ZSBiZWVuIGRvaW5nIHByZXZpb3VzbHkgKGJ5IGRlZmVycmluZyB0byBub2RlIGRlZmF1bHQgYmVoYXZpb3IpIGFuZCB3ZVxuICAgICAgICAvLyAgICAgICBoYXZlbid0IGhlYXJkIGFueSBjb21wbGFpbnRzIGFib3V0IHRoYXQgYXNwZWN0LlxuICAgICAgICAvL1xuICAgICAgICAvLyBub3RlLCBhIHdlYWtuZXNzIG9mIHRoZSBxdW90aW5nIHJ1bGVzIGNob3NlbiBoZXJlLCBpcyB0aGF0ICUgaXMgbm90IGVzY2FwZWQuIGluIGZhY3QsICUgY2Fubm90IGJlXG4gICAgICAgIC8vIGVzY2FwZWQgd2hlbiB1c2VkIG9uIHRoZSBjb21tYW5kIGxpbmUgZGlyZWN0bHkgLSBldmVuIHRob3VnaCB3aXRoaW4gYSAuY21kIGZpbGUgJSBjYW4gYmUgZXNjYXBlZFxuICAgICAgICAvLyBieSB1c2luZyAlJS5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gdGhlIHNhdmluZyBncmFjZSBpcywgb24gdGhlIGNvbW1hbmQgbGluZSwgJXZhciUgaXMgbGVmdCBhcy1pcyBpZiB2YXIgaXMgbm90IGRlZmluZWQuIHRoaXMgY29udHJhc3RzXG4gICAgICAgIC8vIHRoZSBsaW5lIHBhcnNpbmcgcnVsZXMgd2l0aGluIGEgLmNtZCBmaWxlLCB3aGVyZSBpZiB2YXIgaXMgbm90IGRlZmluZWQgaXQgaXMgcmVwbGFjZWQgd2l0aCBub3RoaW5nLlxuICAgICAgICAvL1xuICAgICAgICAvLyBvbmUgb3B0aW9uIHRoYXQgd2FzIGV4cGxvcmVkIHdhcyByZXBsYWNpbmcgJSB3aXRoIF4lIC0gaS5lLiAldmFyJSA9PiBeJXZhcl4lLiB0aGlzIGhhY2sgd291bGRcbiAgICAgICAgLy8gb2Z0ZW4gd29yaywgc2luY2UgaXQgaXMgdW5saWtlbHkgdGhhdCB2YXJeIHdvdWxkIGV4aXN0LCBhbmQgdGhlIF4gY2hhcmFjdGVyIGlzIHJlbW92ZWQgd2hlbiB0aGVcbiAgICAgICAgLy8gdmFyaWFibGUgaXMgdXNlZC4gdGhlIHByb2JsZW0sIGhvd2V2ZXIsIGlzIHRoYXQgXiBpcyBub3QgcmVtb3ZlZCB3aGVuICUqIGlzIHVzZWQgdG8gcGFzcyB0aGUgYXJnc1xuICAgICAgICAvLyB0byBhbiBleHRlcm5hbCBwcm9ncmFtLlxuICAgICAgICAvL1xuICAgICAgICAvLyBhbiB1bmV4cGxvcmVkIHBvdGVudGlhbCBzb2x1dGlvbiBmb3IgdGhlICUgZXNjYXBpbmcgcHJvYmxlbSwgaXMgdG8gY3JlYXRlIGEgd3JhcHBlciAuY21kIGZpbGUuXG4gICAgICAgIC8vICUgY2FuIGJlIGVzY2FwZWQgd2l0aGluIGEgLmNtZCBmaWxlLlxuICAgICAgICBsZXQgcmV2ZXJzZSA9ICdcIic7XG4gICAgICAgIGxldCBxdW90ZUhpdCA9IHRydWU7XG4gICAgICAgIGZvciAobGV0IGkgPSBhcmcubGVuZ3RoOyBpID4gMDsgaS0tKSB7XG4gICAgICAgICAgICAvLyB3YWxrIHRoZSBzdHJpbmcgaW4gcmV2ZXJzZVxuICAgICAgICAgICAgcmV2ZXJzZSArPSBhcmdbaSAtIDFdO1xuICAgICAgICAgICAgaWYgKHF1b3RlSGl0ICYmIGFyZ1tpIC0gMV0gPT09ICdcXFxcJykge1xuICAgICAgICAgICAgICAgIHJldmVyc2UgKz0gJ1xcXFwnOyAvLyBkb3VibGUgdGhlIHNsYXNoXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChhcmdbaSAtIDFdID09PSAnXCInKSB7XG4gICAgICAgICAgICAgICAgcXVvdGVIaXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJldmVyc2UgKz0gJ1wiJzsgLy8gZG91YmxlIHRoZSBxdW90ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcXVvdGVIaXQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXZlcnNlICs9ICdcIic7XG4gICAgICAgIHJldHVybiByZXZlcnNlXG4gICAgICAgICAgICAuc3BsaXQoJycpXG4gICAgICAgICAgICAucmV2ZXJzZSgpXG4gICAgICAgICAgICAuam9pbignJyk7XG4gICAgfVxuICAgIF91dlF1b3RlQ21kQXJnKGFyZykge1xuICAgICAgICAvLyBUb29sIHJ1bm5lciB3cmFwcyBjaGlsZF9wcm9jZXNzLnNwYXduKCkgYW5kIG5lZWRzIHRvIGFwcGx5IHRoZSBzYW1lIHF1b3RpbmcgYXNcbiAgICAgICAgLy8gTm9kZSBpbiBjZXJ0YWluIGNhc2VzIHdoZXJlIHRoZSB1bmRvY3VtZW50ZWQgc3Bhd24gb3B0aW9uIHdpbmRvd3NWZXJiYXRpbUFyZ3VtZW50c1xuICAgICAgICAvLyBpcyB1c2VkLlxuICAgICAgICAvL1xuICAgICAgICAvLyBTaW5jZSB0aGlzIGZ1bmN0aW9uIGlzIGEgcG9ydCBvZiBxdW90ZV9jbWRfYXJnIGZyb20gTm9kZSA0LnggKHRlY2huaWNhbGx5LCBsaWIgVVYsXG4gICAgICAgIC8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vbm9kZWpzL25vZGUvYmxvYi92NC54L2RlcHMvdXYvc3JjL3dpbi9wcm9jZXNzLmMgZm9yIGRldGFpbHMpLFxuICAgICAgICAvLyBwYXN0aW5nIGNvcHlyaWdodCBub3RpY2UgZnJvbSBOb2RlIHdpdGhpbiB0aGlzIGZ1bmN0aW9uOlxuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAgICAgICAgLy8gICAgICBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0b1xuICAgICAgICAvLyAgICAgIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlXG4gICAgICAgIC8vICAgICAgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yXG4gICAgICAgIC8vICAgICAgc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAgICAgICAgLy8gICAgICBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gICAgICAgIC8vICAgICAgYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAgVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICAgICAgICAvLyAgICAgIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICAgICAgICAvLyAgICAgIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICAgICAgICAvLyAgICAgIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAgICAgICAgLy8gICAgICBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lOR1xuICAgICAgICAvLyAgICAgIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1NcbiAgICAgICAgLy8gICAgICBJTiBUSEUgU09GVFdBUkUuXG4gICAgICAgIGlmICghYXJnKSB7XG4gICAgICAgICAgICAvLyBOZWVkIGRvdWJsZSBxdW90YXRpb24gZm9yIGVtcHR5IGFyZ3VtZW50XG4gICAgICAgICAgICByZXR1cm4gJ1wiXCInO1xuICAgICAgICB9XG4gICAgICAgIGlmICghYXJnLmluY2x1ZGVzKCcgJykgJiYgIWFyZy5pbmNsdWRlcygnXFx0JykgJiYgIWFyZy5pbmNsdWRlcygnXCInKSkge1xuICAgICAgICAgICAgLy8gTm8gcXVvdGF0aW9uIG5lZWRlZFxuICAgICAgICAgICAgcmV0dXJuIGFyZztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWFyZy5pbmNsdWRlcygnXCInKSAmJiAhYXJnLmluY2x1ZGVzKCdcXFxcJykpIHtcbiAgICAgICAgICAgIC8vIE5vIGVtYmVkZGVkIGRvdWJsZSBxdW90ZXMgb3IgYmFja3NsYXNoZXMsIHNvIEkgY2FuIGp1c3Qgd3JhcFxuICAgICAgICAgICAgLy8gcXVvdGUgbWFya3MgYXJvdW5kIHRoZSB3aG9sZSB0aGluZy5cbiAgICAgICAgICAgIHJldHVybiBgXCIke2FyZ31cImA7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRXhwZWN0ZWQgaW5wdXQvb3V0cHV0OlxuICAgICAgICAvLyAgIGlucHV0IDogaGVsbG9cIndvcmxkXG4gICAgICAgIC8vICAgb3V0cHV0OiBcImhlbGxvXFxcIndvcmxkXCJcbiAgICAgICAgLy8gICBpbnB1dCA6IGhlbGxvXCJcIndvcmxkXG4gICAgICAgIC8vICAgb3V0cHV0OiBcImhlbGxvXFxcIlxcXCJ3b3JsZFwiXG4gICAgICAgIC8vICAgaW5wdXQgOiBoZWxsb1xcd29ybGRcbiAgICAgICAgLy8gICBvdXRwdXQ6IGhlbGxvXFx3b3JsZFxuICAgICAgICAvLyAgIGlucHV0IDogaGVsbG9cXFxcd29ybGRcbiAgICAgICAgLy8gICBvdXRwdXQ6IGhlbGxvXFxcXHdvcmxkXG4gICAgICAgIC8vICAgaW5wdXQgOiBoZWxsb1xcXCJ3b3JsZFxuICAgICAgICAvLyAgIG91dHB1dDogXCJoZWxsb1xcXFxcXFwid29ybGRcIlxuICAgICAgICAvLyAgIGlucHV0IDogaGVsbG9cXFxcXCJ3b3JsZFxuICAgICAgICAvLyAgIG91dHB1dDogXCJoZWxsb1xcXFxcXFxcXFxcIndvcmxkXCJcbiAgICAgICAgLy8gICBpbnB1dCA6IGhlbGxvIHdvcmxkXFxcbiAgICAgICAgLy8gICBvdXRwdXQ6IFwiaGVsbG8gd29ybGRcXFxcXCIgLSBub3RlIHRoZSBjb21tZW50IGluIGxpYnV2IGFjdHVhbGx5IHJlYWRzIFwiaGVsbG8gd29ybGRcXFwiXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidXQgaXQgYXBwZWFycyB0aGUgY29tbWVudCBpcyB3cm9uZywgaXQgc2hvdWxkIGJlIFwiaGVsbG8gd29ybGRcXFxcXCJcbiAgICAgICAgbGV0IHJldmVyc2UgPSAnXCInO1xuICAgICAgICBsZXQgcXVvdGVIaXQgPSB0cnVlO1xuICAgICAgICBmb3IgKGxldCBpID0gYXJnLmxlbmd0aDsgaSA+IDA7IGktLSkge1xuICAgICAgICAgICAgLy8gd2FsayB0aGUgc3RyaW5nIGluIHJldmVyc2VcbiAgICAgICAgICAgIHJldmVyc2UgKz0gYXJnW2kgLSAxXTtcbiAgICAgICAgICAgIGlmIChxdW90ZUhpdCAmJiBhcmdbaSAtIDFdID09PSAnXFxcXCcpIHtcbiAgICAgICAgICAgICAgICByZXZlcnNlICs9ICdcXFxcJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGFyZ1tpIC0gMV0gPT09ICdcIicpIHtcbiAgICAgICAgICAgICAgICBxdW90ZUhpdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmV2ZXJzZSArPSAnXFxcXCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBxdW90ZUhpdCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldmVyc2UgKz0gJ1wiJztcbiAgICAgICAgcmV0dXJuIHJldmVyc2VcbiAgICAgICAgICAgIC5zcGxpdCgnJylcbiAgICAgICAgICAgIC5yZXZlcnNlKClcbiAgICAgICAgICAgIC5qb2luKCcnKTtcbiAgICB9XG4gICAgX2Nsb25lRXhlY09wdGlvbnMob3B0aW9ucykge1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgICAgICAgY3dkOiBvcHRpb25zLmN3ZCB8fCBwcm9jZXNzLmN3ZCgpLFxuICAgICAgICAgICAgZW52OiBvcHRpb25zLmVudiB8fCBwcm9jZXNzLmVudixcbiAgICAgICAgICAgIHNpbGVudDogb3B0aW9ucy5zaWxlbnQgfHwgZmFsc2UsXG4gICAgICAgICAgICB3aW5kb3dzVmVyYmF0aW1Bcmd1bWVudHM6IG9wdGlvbnMud2luZG93c1ZlcmJhdGltQXJndW1lbnRzIHx8IGZhbHNlLFxuICAgICAgICAgICAgZmFpbE9uU3RkRXJyOiBvcHRpb25zLmZhaWxPblN0ZEVyciB8fCBmYWxzZSxcbiAgICAgICAgICAgIGlnbm9yZVJldHVybkNvZGU6IG9wdGlvbnMuaWdub3JlUmV0dXJuQ29kZSB8fCBmYWxzZSxcbiAgICAgICAgICAgIGRlbGF5OiBvcHRpb25zLmRlbGF5IHx8IDEwMDAwXG4gICAgICAgIH07XG4gICAgICAgIHJlc3VsdC5vdXRTdHJlYW0gPSBvcHRpb25zLm91dFN0cmVhbSB8fCBwcm9jZXNzLnN0ZG91dDtcbiAgICAgICAgcmVzdWx0LmVyclN0cmVhbSA9IG9wdGlvbnMuZXJyU3RyZWFtIHx8IHByb2Nlc3Muc3RkZXJyO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBfZ2V0U3Bhd25PcHRpb25zKG9wdGlvbnMsIHRvb2xQYXRoKSB7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICAgICAgcmVzdWx0LmN3ZCA9IG9wdGlvbnMuY3dkO1xuICAgICAgICByZXN1bHQuZW52ID0gb3B0aW9ucy5lbnY7XG4gICAgICAgIHJlc3VsdFsnd2luZG93c1ZlcmJhdGltQXJndW1lbnRzJ10gPVxuICAgICAgICAgICAgb3B0aW9ucy53aW5kb3dzVmVyYmF0aW1Bcmd1bWVudHMgfHwgdGhpcy5faXNDbWRGaWxlKCk7XG4gICAgICAgIGlmIChvcHRpb25zLndpbmRvd3NWZXJiYXRpbUFyZ3VtZW50cykge1xuICAgICAgICAgICAgcmVzdWx0LmFyZ3YwID0gYFwiJHt0b29sUGF0aH1cImA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRXhlYyBhIHRvb2wuXG4gICAgICogT3V0cHV0IHdpbGwgYmUgc3RyZWFtZWQgdG8gdGhlIGxpdmUgY29uc29sZS5cbiAgICAgKiBSZXR1cm5zIHByb21pc2Ugd2l0aCByZXR1cm4gY29kZVxuICAgICAqXG4gICAgICogQHBhcmFtICAgICB0b29sICAgICBwYXRoIHRvIHRvb2wgdG8gZXhlY1xuICAgICAqIEBwYXJhbSAgICAgb3B0aW9ucyAgb3B0aW9uYWwgZXhlYyBvcHRpb25zLiAgU2VlIEV4ZWNPcHRpb25zXG4gICAgICogQHJldHVybnMgICBudW1iZXJcbiAgICAgKi9cbiAgICBleGVjKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kZWJ1ZyhgZXhlYyB0b29sOiAke3RoaXMudG9vbFBhdGh9YCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGVidWcoJ2FyZ3VtZW50czonKTtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGFyZyBvZiB0aGlzLmFyZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGVidWcoYCAgICR7YXJnfWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpb25zTm9uTnVsbCA9IHRoaXMuX2Nsb25lRXhlY09wdGlvbnModGhpcy5vcHRpb25zKTtcbiAgICAgICAgICAgICAgICBpZiAoIW9wdGlvbnNOb25OdWxsLnNpbGVudCAmJiBvcHRpb25zTm9uTnVsbC5vdXRTdHJlYW0pIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc05vbk51bGwub3V0U3RyZWFtLndyaXRlKHRoaXMuX2dldENvbW1hbmRTdHJpbmcob3B0aW9uc05vbk51bGwpICsgb3MuRU9MKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhdGUgPSBuZXcgRXhlY1N0YXRlKG9wdGlvbnNOb25OdWxsLCB0aGlzLnRvb2xQYXRoKTtcbiAgICAgICAgICAgICAgICBzdGF0ZS5vbignZGVidWcnLCAobWVzc2FnZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kZWJ1ZyhtZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlTmFtZSA9IHRoaXMuX2dldFNwYXduRmlsZU5hbWUoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBjcCA9IGNoaWxkLnNwYXduKGZpbGVOYW1lLCB0aGlzLl9nZXRTcGF3bkFyZ3Mob3B0aW9uc05vbk51bGwpLCB0aGlzLl9nZXRTcGF3bk9wdGlvbnModGhpcy5vcHRpb25zLCBmaWxlTmFtZSkpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0ZGJ1ZmZlciA9ICcnO1xuICAgICAgICAgICAgICAgIGlmIChjcC5zdGRvdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgY3Auc3Rkb3V0Lm9uKCdkYXRhJywgKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMubGlzdGVuZXJzICYmIHRoaXMub3B0aW9ucy5saXN0ZW5lcnMuc3Rkb3V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmxpc3RlbmVycy5zdGRvdXQoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW9wdGlvbnNOb25OdWxsLnNpbGVudCAmJiBvcHRpb25zTm9uTnVsbC5vdXRTdHJlYW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zTm9uTnVsbC5vdXRTdHJlYW0ud3JpdGUoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9wcm9jZXNzTGluZUJ1ZmZlcihkYXRhLCBzdGRidWZmZXIsIChsaW5lKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5saXN0ZW5lcnMgJiYgdGhpcy5vcHRpb25zLmxpc3RlbmVycy5zdGRsaW5lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5saXN0ZW5lcnMuc3RkbGluZShsaW5lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGVycmJ1ZmZlciA9ICcnO1xuICAgICAgICAgICAgICAgIGlmIChjcC5zdGRlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY3Auc3RkZXJyLm9uKCdkYXRhJywgKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlLnByb2Nlc3NTdGRlcnIgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5saXN0ZW5lcnMgJiYgdGhpcy5vcHRpb25zLmxpc3RlbmVycy5zdGRlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMubGlzdGVuZXJzLnN0ZGVycihkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghb3B0aW9uc05vbk51bGwuc2lsZW50ICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uc05vbk51bGwuZXJyU3RyZWFtICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uc05vbk51bGwub3V0U3RyZWFtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcyA9IG9wdGlvbnNOb25OdWxsLmZhaWxPblN0ZEVyclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IG9wdGlvbnNOb25OdWxsLmVyclN0cmVhbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IG9wdGlvbnNOb25OdWxsLm91dFN0cmVhbTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLndyaXRlKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcHJvY2Vzc0xpbmVCdWZmZXIoZGF0YSwgZXJyYnVmZmVyLCAobGluZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMubGlzdGVuZXJzICYmIHRoaXMub3B0aW9ucy5saXN0ZW5lcnMuZXJybGluZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMubGlzdGVuZXJzLmVycmxpbmUobGluZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjcC5vbignZXJyb3InLCAoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLnByb2Nlc3NFcnJvciA9IGVyci5tZXNzYWdlO1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5wcm9jZXNzRXhpdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUucHJvY2Vzc0Nsb3NlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLkNoZWNrQ29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjcC5vbignZXhpdCcsIChjb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLnByb2Nlc3NFeGl0Q29kZSA9IGNvZGU7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLnByb2Nlc3NFeGl0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kZWJ1ZyhgRXhpdCBjb2RlICR7Y29kZX0gcmVjZWl2ZWQgZnJvbSB0b29sICcke3RoaXMudG9vbFBhdGh9J2ApO1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5DaGVja0NvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY3Aub24oJ2Nsb3NlJywgKGNvZGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUucHJvY2Vzc0V4aXRDb2RlID0gY29kZTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUucHJvY2Vzc0V4aXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLnByb2Nlc3NDbG9zZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kZWJ1ZyhgU1RESU8gc3RyZWFtcyBoYXZlIGNsb3NlZCBmb3IgdG9vbCAnJHt0aGlzLnRvb2xQYXRofSdgKTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUuQ2hlY2tDb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHN0YXRlLm9uKCdkb25lJywgKGVycm9yLCBleGl0Q29kZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RkYnVmZmVyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgnc3RkbGluZScsIHN0ZGJ1ZmZlcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycmJ1ZmZlci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2VycmxpbmUnLCBlcnJidWZmZXIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNwLnJlbW92ZUFsbExpc3RlbmVycygpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGV4aXRDb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydHMuVG9vbFJ1bm5lciA9IFRvb2xSdW5uZXI7XG4vKipcbiAqIENvbnZlcnQgYW4gYXJnIHN0cmluZyB0byBhbiBhcnJheSBvZiBhcmdzLiBIYW5kbGVzIGVzY2FwaW5nXG4gKlxuICogQHBhcmFtICAgIGFyZ1N0cmluZyAgIHN0cmluZyBvZiBhcmd1bWVudHNcbiAqIEByZXR1cm5zICBzdHJpbmdbXSAgICBhcnJheSBvZiBhcmd1bWVudHNcbiAqL1xuZnVuY3Rpb24gYXJnU3RyaW5nVG9BcnJheShhcmdTdHJpbmcpIHtcbiAgICBjb25zdCBhcmdzID0gW107XG4gICAgbGV0IGluUXVvdGVzID0gZmFsc2U7XG4gICAgbGV0IGVzY2FwZWQgPSBmYWxzZTtcbiAgICBsZXQgYXJnID0gJyc7XG4gICAgZnVuY3Rpb24gYXBwZW5kKGMpIHtcbiAgICAgICAgLy8gd2Ugb25seSBlc2NhcGUgZG91YmxlIHF1b3Rlcy5cbiAgICAgICAgaWYgKGVzY2FwZWQgJiYgYyAhPT0gJ1wiJykge1xuICAgICAgICAgICAgYXJnICs9ICdcXFxcJztcbiAgICAgICAgfVxuICAgICAgICBhcmcgKz0gYztcbiAgICAgICAgZXNjYXBlZCA9IGZhbHNlO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyZ1N0cmluZy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBjID0gYXJnU3RyaW5nLmNoYXJBdChpKTtcbiAgICAgICAgaWYgKGMgPT09ICdcIicpIHtcbiAgICAgICAgICAgIGlmICghZXNjYXBlZCkge1xuICAgICAgICAgICAgICAgIGluUXVvdGVzID0gIWluUXVvdGVzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYXBwZW5kKGMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGMgPT09ICdcXFxcJyAmJiBlc2NhcGVkKSB7XG4gICAgICAgICAgICBhcHBlbmQoYyk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYyA9PT0gJ1xcXFwnICYmIGluUXVvdGVzKSB7XG4gICAgICAgICAgICBlc2NhcGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjID09PSAnICcgJiYgIWluUXVvdGVzKSB7XG4gICAgICAgICAgICBpZiAoYXJnLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBhcmdzLnB1c2goYXJnKTtcbiAgICAgICAgICAgICAgICBhcmcgPSAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGFwcGVuZChjKTtcbiAgICB9XG4gICAgaWYgKGFyZy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGFyZ3MucHVzaChhcmcudHJpbSgpKTtcbiAgICB9XG4gICAgcmV0dXJuIGFyZ3M7XG59XG5leHBvcnRzLmFyZ1N0cmluZ1RvQXJyYXkgPSBhcmdTdHJpbmdUb0FycmF5O1xuY2xhc3MgRXhlY1N0YXRlIGV4dGVuZHMgZXZlbnRzLkV2ZW50RW1pdHRlciB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucywgdG9vbFBhdGgpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5wcm9jZXNzQ2xvc2VkID0gZmFsc2U7IC8vIHRyYWNrcyB3aGV0aGVyIHRoZSBwcm9jZXNzIGhhcyBleGl0ZWQgYW5kIHN0ZGlvIGlzIGNsb3NlZFxuICAgICAgICB0aGlzLnByb2Nlc3NFcnJvciA9ICcnO1xuICAgICAgICB0aGlzLnByb2Nlc3NFeGl0Q29kZSA9IDA7XG4gICAgICAgIHRoaXMucHJvY2Vzc0V4aXRlZCA9IGZhbHNlOyAvLyB0cmFja3Mgd2hldGhlciB0aGUgcHJvY2VzcyBoYXMgZXhpdGVkXG4gICAgICAgIHRoaXMucHJvY2Vzc1N0ZGVyciA9IGZhbHNlOyAvLyB0cmFja3Mgd2hldGhlciBzdGRlcnIgd2FzIHdyaXR0ZW4gdG9cbiAgICAgICAgdGhpcy5kZWxheSA9IDEwMDAwOyAvLyAxMCBzZWNvbmRzXG4gICAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRpbWVvdXQgPSBudWxsO1xuICAgICAgICBpZiAoIXRvb2xQYXRoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Rvb2xQYXRoIG11c3Qgbm90IGJlIGVtcHR5Jyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgdGhpcy50b29sUGF0aCA9IHRvb2xQYXRoO1xuICAgICAgICBpZiAob3B0aW9ucy5kZWxheSkge1xuICAgICAgICAgICAgdGhpcy5kZWxheSA9IG9wdGlvbnMuZGVsYXk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgQ2hlY2tDb21wbGV0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZG9uZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnByb2Nlc3NDbG9zZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3NldFJlc3VsdCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMucHJvY2Vzc0V4aXRlZCkge1xuICAgICAgICAgICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dChFeGVjU3RhdGUuSGFuZGxlVGltZW91dCwgdGhpcy5kZWxheSwgdGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2RlYnVnKG1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5lbWl0KCdkZWJ1ZycsIG1lc3NhZ2UpO1xuICAgIH1cbiAgICBfc2V0UmVzdWx0KCkge1xuICAgICAgICAvLyBkZXRlcm1pbmUgd2hldGhlciB0aGVyZSBpcyBhbiBlcnJvclxuICAgICAgICBsZXQgZXJyb3I7XG4gICAgICAgIGlmICh0aGlzLnByb2Nlc3NFeGl0ZWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb2Nlc3NFcnJvcikge1xuICAgICAgICAgICAgICAgIGVycm9yID0gbmV3IEVycm9yKGBUaGVyZSB3YXMgYW4gZXJyb3Igd2hlbiBhdHRlbXB0aW5nIHRvIGV4ZWN1dGUgdGhlIHByb2Nlc3MgJyR7dGhpcy50b29sUGF0aH0nLiBUaGlzIG1heSBpbmRpY2F0ZSB0aGUgcHJvY2VzcyBmYWlsZWQgdG8gc3RhcnQuIEVycm9yOiAke3RoaXMucHJvY2Vzc0Vycm9yfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5wcm9jZXNzRXhpdENvZGUgIT09IDAgJiYgIXRoaXMub3B0aW9ucy5pZ25vcmVSZXR1cm5Db2RlKSB7XG4gICAgICAgICAgICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoYFRoZSBwcm9jZXNzICcke3RoaXMudG9vbFBhdGh9JyBmYWlsZWQgd2l0aCBleGl0IGNvZGUgJHt0aGlzLnByb2Nlc3NFeGl0Q29kZX1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMucHJvY2Vzc1N0ZGVyciAmJiB0aGlzLm9wdGlvbnMuZmFpbE9uU3RkRXJyKSB7XG4gICAgICAgICAgICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoYFRoZSBwcm9jZXNzICcke3RoaXMudG9vbFBhdGh9JyBmYWlsZWQgYmVjYXVzZSBvbmUgb3IgbW9yZSBsaW5lcyB3ZXJlIHdyaXR0ZW4gdG8gdGhlIFNUREVSUiBzdHJlYW1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBjbGVhciB0aGUgdGltZW91dFxuICAgICAgICBpZiAodGhpcy50aW1lb3V0KSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcbiAgICAgICAgICAgIHRoaXMudGltZW91dCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5lbWl0KCdkb25lJywgZXJyb3IsIHRoaXMucHJvY2Vzc0V4aXRDb2RlKTtcbiAgICB9XG4gICAgc3RhdGljIEhhbmRsZVRpbWVvdXQoc3RhdGUpIHtcbiAgICAgICAgaWYgKHN0YXRlLmRvbmUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXN0YXRlLnByb2Nlc3NDbG9zZWQgJiYgc3RhdGUucHJvY2Vzc0V4aXRlZCkge1xuICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IGBUaGUgU1RESU8gc3RyZWFtcyBkaWQgbm90IGNsb3NlIHdpdGhpbiAke3N0YXRlLmRlbGF5IC9cbiAgICAgICAgICAgICAgICAxMDAwfSBzZWNvbmRzIG9mIHRoZSBleGl0IGV2ZW50IGZyb20gcHJvY2VzcyAnJHtzdGF0ZS50b29sUGF0aH0nLiBUaGlzIG1heSBpbmRpY2F0ZSBhIGNoaWxkIHByb2Nlc3MgaW5oZXJpdGVkIHRoZSBTVERJTyBzdHJlYW1zIGFuZCBoYXMgbm90IHlldCBleGl0ZWQuYDtcbiAgICAgICAgICAgIHN0YXRlLl9kZWJ1ZyhtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICBzdGF0ZS5fc2V0UmVzdWx0KCk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dG9vbHJ1bm5lci5qcy5tYXAiLCJ2YXIgVXRpbHMgPSByZXF1aXJlKFwiLi91dGlsXCIpO1xyXG52YXIgZnMgPSBVdGlscy5GaWxlU3lzdGVtLnJlcXVpcmUoKSxcclxuXHRwdGggPSByZXF1aXJlKFwicGF0aFwiKTtcclxuXHJcbmZzLmV4aXN0c1N5bmMgPSBmcy5leGlzdHNTeW5jIHx8IHB0aC5leGlzdHNTeW5jO1xyXG5cclxudmFyIFppcEVudHJ5ID0gcmVxdWlyZShcIi4vemlwRW50cnlcIiksXHJcblx0WmlwRmlsZSA9IHJlcXVpcmUoXCIuL3ppcEZpbGVcIik7XHJcblxyXG52YXIgaXNXaW4gPSAvXndpbi8udGVzdChwcm9jZXNzLnBsYXRmb3JtKTtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgvKlN0cmluZyovaW5wdXQpIHtcclxuXHR2YXIgX3ppcCA9IHVuZGVmaW5lZCxcclxuXHRcdF9maWxlbmFtZSA9IFwiXCI7XHJcblxyXG5cdGlmIChpbnB1dCAmJiB0eXBlb2YgaW5wdXQgPT09IFwic3RyaW5nXCIpIHsgLy8gbG9hZCB6aXAgZmlsZVxyXG5cdFx0aWYgKGZzLmV4aXN0c1N5bmMoaW5wdXQpKSB7XHJcblx0XHRcdF9maWxlbmFtZSA9IGlucHV0O1xyXG5cdFx0XHRfemlwID0gbmV3IFppcEZpbGUoaW5wdXQsIFV0aWxzLkNvbnN0YW50cy5GSUxFKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRocm93IFV0aWxzLkVycm9ycy5JTlZBTElEX0ZJTEVOQU1FO1xyXG5cdFx0fVxyXG5cdH0gZWxzZSBpZiAoaW5wdXQgJiYgQnVmZmVyLmlzQnVmZmVyKGlucHV0KSkgeyAvLyBsb2FkIGJ1ZmZlclxyXG5cdFx0X3ppcCA9IG5ldyBaaXBGaWxlKGlucHV0LCBVdGlscy5Db25zdGFudHMuQlVGRkVSKTtcclxuXHR9IGVsc2UgeyAvLyBjcmVhdGUgbmV3IHppcCBmaWxlXHJcblx0XHRfemlwID0gbmV3IFppcEZpbGUobnVsbCwgVXRpbHMuQ29uc3RhbnRzLk5PTkUpO1xyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gc2FuaXRpemUocHJlZml4LCBuYW1lKSB7XHJcblx0XHRwcmVmaXggPSBwdGgucmVzb2x2ZShwdGgubm9ybWFsaXplKHByZWZpeCkpO1xyXG5cdFx0dmFyIHBhcnRzID0gbmFtZS5zcGxpdCgnLycpO1xyXG5cdFx0Zm9yICh2YXIgaSA9IDAsIGwgPSBwYXJ0cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuXHRcdFx0dmFyIHBhdGggPSBwdGgubm9ybWFsaXplKHB0aC5qb2luKHByZWZpeCwgcGFydHMuc2xpY2UoaSwgbCkuam9pbihwdGguc2VwKSkpO1xyXG5cdFx0XHRpZiAocGF0aC5pbmRleE9mKHByZWZpeCkgPT09IDApIHtcclxuXHRcdFx0XHRyZXR1cm4gcGF0aDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHB0aC5ub3JtYWxpemUocHRoLmpvaW4ocHJlZml4LCBwdGguYmFzZW5hbWUobmFtZSkpKTtcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGdldEVudHJ5KC8qT2JqZWN0Ki9lbnRyeSkge1xyXG5cdFx0aWYgKGVudHJ5ICYmIF96aXApIHtcclxuXHRcdFx0dmFyIGl0ZW07XHJcblx0XHRcdC8vIElmIGVudHJ5IHdhcyBnaXZlbiBhcyBhIGZpbGUgbmFtZVxyXG5cdFx0XHRpZiAodHlwZW9mIGVudHJ5ID09PSBcInN0cmluZ1wiKVxyXG5cdFx0XHRcdGl0ZW0gPSBfemlwLmdldEVudHJ5KGVudHJ5KTtcclxuXHRcdFx0Ly8gaWYgZW50cnkgd2FzIGdpdmVuIGFzIGEgWmlwRW50cnkgb2JqZWN0XHJcblx0XHRcdGlmICh0eXBlb2YgZW50cnkgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIGVudHJ5LmVudHJ5TmFtZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgZW50cnkuaGVhZGVyICE9PSBcInVuZGVmaW5lZFwiKVxyXG5cdFx0XHRcdGl0ZW0gPSBfemlwLmdldEVudHJ5KGVudHJ5LmVudHJ5TmFtZSk7XHJcblxyXG5cdFx0XHRpZiAoaXRlbSkge1xyXG5cdFx0XHRcdHJldHVybiBpdGVtO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcblxyXG5cdHJldHVybiB7XHJcblx0XHQvKipcclxuXHRcdCAqIEV4dHJhY3RzIHRoZSBnaXZlbiBlbnRyeSBmcm9tIHRoZSBhcmNoaXZlIGFuZCByZXR1cm5zIHRoZSBjb250ZW50IGFzIGEgQnVmZmVyIG9iamVjdFxyXG5cdFx0ICogQHBhcmFtIGVudHJ5IFppcEVudHJ5IG9iamVjdCBvciBTdHJpbmcgd2l0aCB0aGUgZnVsbCBwYXRoIG9mIHRoZSBlbnRyeVxyXG5cdFx0ICpcclxuXHRcdCAqIEByZXR1cm4gQnVmZmVyIG9yIE51bGwgaW4gY2FzZSBvZiBlcnJvclxyXG5cdFx0ICovXHJcblx0XHRyZWFkRmlsZTogZnVuY3Rpb24gKC8qT2JqZWN0Ki9lbnRyeSkge1xyXG5cdFx0XHR2YXIgaXRlbSA9IGdldEVudHJ5KGVudHJ5KTtcclxuXHRcdFx0cmV0dXJuIGl0ZW0gJiYgaXRlbS5nZXREYXRhKCkgfHwgbnVsbDtcclxuXHRcdH0sXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBc3luY2hyb25vdXMgcmVhZEZpbGVcclxuXHRcdCAqIEBwYXJhbSBlbnRyeSBaaXBFbnRyeSBvYmplY3Qgb3IgU3RyaW5nIHdpdGggdGhlIGZ1bGwgcGF0aCBvZiB0aGUgZW50cnlcclxuXHRcdCAqIEBwYXJhbSBjYWxsYmFja1xyXG5cdFx0ICpcclxuXHRcdCAqIEByZXR1cm4gQnVmZmVyIG9yIE51bGwgaW4gY2FzZSBvZiBlcnJvclxyXG5cdFx0ICovXHJcblx0XHRyZWFkRmlsZUFzeW5jOiBmdW5jdGlvbiAoLypPYmplY3QqL2VudHJ5LCAvKkZ1bmN0aW9uKi9jYWxsYmFjaykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IGdldEVudHJ5KGVudHJ5KTtcclxuXHRcdFx0aWYgKGl0ZW0pIHtcclxuXHRcdFx0XHRpdGVtLmdldERhdGFBc3luYyhjYWxsYmFjayk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Y2FsbGJhY2sobnVsbCwgXCJnZXRFbnRyeSBmYWlsZWQgZm9yOlwiICsgZW50cnkpXHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBFeHRyYWN0cyB0aGUgZ2l2ZW4gZW50cnkgZnJvbSB0aGUgYXJjaGl2ZSBhbmQgcmV0dXJucyB0aGUgY29udGVudCBhcyBwbGFpbiB0ZXh0IGluIHRoZSBnaXZlbiBlbmNvZGluZ1xyXG5cdFx0ICogQHBhcmFtIGVudHJ5IFppcEVudHJ5IG9iamVjdCBvciBTdHJpbmcgd2l0aCB0aGUgZnVsbCBwYXRoIG9mIHRoZSBlbnRyeVxyXG5cdFx0ICogQHBhcmFtIGVuY29kaW5nIE9wdGlvbmFsLiBJZiBubyBlbmNvZGluZyBpcyBzcGVjaWZpZWQgdXRmOCBpcyB1c2VkXHJcblx0XHQgKlxyXG5cdFx0ICogQHJldHVybiBTdHJpbmdcclxuXHRcdCAqL1xyXG5cdFx0cmVhZEFzVGV4dDogZnVuY3Rpb24gKC8qT2JqZWN0Ki9lbnRyeSwgLypTdHJpbmcgLSBPcHRpb25hbCovZW5jb2RpbmcpIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSBnZXRFbnRyeShlbnRyeSk7XHJcblx0XHRcdGlmIChpdGVtKSB7XHJcblx0XHRcdFx0dmFyIGRhdGEgPSBpdGVtLmdldERhdGEoKTtcclxuXHRcdFx0XHRpZiAoZGF0YSAmJiBkYXRhLmxlbmd0aCkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGRhdGEudG9TdHJpbmcoZW5jb2RpbmcgfHwgXCJ1dGY4XCIpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gXCJcIjtcclxuXHRcdH0sXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBc3luY2hyb25vdXMgcmVhZEFzVGV4dFxyXG5cdFx0ICogQHBhcmFtIGVudHJ5IFppcEVudHJ5IG9iamVjdCBvciBTdHJpbmcgd2l0aCB0aGUgZnVsbCBwYXRoIG9mIHRoZSBlbnRyeVxyXG5cdFx0ICogQHBhcmFtIGNhbGxiYWNrXHJcblx0XHQgKiBAcGFyYW0gZW5jb2RpbmcgT3B0aW9uYWwuIElmIG5vIGVuY29kaW5nIGlzIHNwZWNpZmllZCB1dGY4IGlzIHVzZWRcclxuXHRcdCAqXHJcblx0XHQgKiBAcmV0dXJuIFN0cmluZ1xyXG5cdFx0ICovXHJcblx0XHRyZWFkQXNUZXh0QXN5bmM6IGZ1bmN0aW9uICgvKk9iamVjdCovZW50cnksIC8qRnVuY3Rpb24qL2NhbGxiYWNrLCAvKlN0cmluZyAtIE9wdGlvbmFsKi9lbmNvZGluZykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IGdldEVudHJ5KGVudHJ5KTtcclxuXHRcdFx0aWYgKGl0ZW0pIHtcclxuXHRcdFx0XHRpdGVtLmdldERhdGFBc3luYyhmdW5jdGlvbiAoZGF0YSwgZXJyKSB7XHJcblx0XHRcdFx0XHRpZiAoZXJyKSB7XHJcblx0XHRcdFx0XHRcdGNhbGxiYWNrKGRhdGEsIGVycik7XHJcblx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRpZiAoZGF0YSAmJiBkYXRhLmxlbmd0aCkge1xyXG5cdFx0XHRcdFx0XHRjYWxsYmFjayhkYXRhLnRvU3RyaW5nKGVuY29kaW5nIHx8IFwidXRmOFwiKSk7XHJcblx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRjYWxsYmFjayhcIlwiKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdGNhbGxiYWNrKFwiXCIpO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogUmVtb3ZlIHRoZSBlbnRyeSBmcm9tIHRoZSBmaWxlIG9yIHRoZSBlbnRyeSBhbmQgYWxsIGl0J3MgbmVzdGVkIGRpcmVjdG9yaWVzIGFuZCBmaWxlcyBpZiB0aGUgZ2l2ZW4gZW50cnkgaXMgYSBkaXJlY3RvcnlcclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0gZW50cnlcclxuXHRcdCAqL1xyXG5cdFx0ZGVsZXRlRmlsZTogZnVuY3Rpb24gKC8qT2JqZWN0Ki9lbnRyeSkgeyAvLyBAVE9ETzogdGVzdCBkZWxldGVGaWxlXHJcblx0XHRcdHZhciBpdGVtID0gZ2V0RW50cnkoZW50cnkpO1xyXG5cdFx0XHRpZiAoaXRlbSkge1xyXG5cdFx0XHRcdF96aXAuZGVsZXRlRW50cnkoaXRlbS5lbnRyeU5hbWUpO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQWRkcyBhIGNvbW1lbnQgdG8gdGhlIHppcC4gVGhlIHppcCBtdXN0IGJlIHJld3JpdHRlbiBhZnRlciBhZGRpbmcgdGhlIGNvbW1lbnQuXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIGNvbW1lbnRcclxuXHRcdCAqL1xyXG5cdFx0YWRkWmlwQ29tbWVudDogZnVuY3Rpb24gKC8qU3RyaW5nKi9jb21tZW50KSB7IC8vIEBUT0RPOiB0ZXN0IGFkZFppcENvbW1lbnRcclxuXHRcdFx0X3ppcC5jb21tZW50ID0gY29tbWVudDtcclxuXHRcdH0sXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBSZXR1cm5zIHRoZSB6aXAgY29tbWVudFxyXG5cdFx0ICpcclxuXHRcdCAqIEByZXR1cm4gU3RyaW5nXHJcblx0XHQgKi9cclxuXHRcdGdldFppcENvbW1lbnQ6IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0cmV0dXJuIF96aXAuY29tbWVudCB8fCAnJztcclxuXHRcdH0sXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBZGRzIGEgY29tbWVudCB0byBhIHNwZWNpZmllZCB6aXBFbnRyeS4gVGhlIHppcCBtdXN0IGJlIHJld3JpdHRlbiBhZnRlciBhZGRpbmcgdGhlIGNvbW1lbnRcclxuXHRcdCAqIFRoZSBjb21tZW50IGNhbm5vdCBleGNlZWQgNjU1MzUgY2hhcmFjdGVycyBpbiBsZW5ndGhcclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0gZW50cnlcclxuXHRcdCAqIEBwYXJhbSBjb21tZW50XHJcblx0XHQgKi9cclxuXHRcdGFkZFppcEVudHJ5Q29tbWVudDogZnVuY3Rpb24gKC8qT2JqZWN0Ki9lbnRyeSwgLypTdHJpbmcqL2NvbW1lbnQpIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSBnZXRFbnRyeShlbnRyeSk7XHJcblx0XHRcdGlmIChpdGVtKSB7XHJcblx0XHRcdFx0aXRlbS5jb21tZW50ID0gY29tbWVudDtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIFJldHVybnMgdGhlIGNvbW1lbnQgb2YgdGhlIHNwZWNpZmllZCBlbnRyeVxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSBlbnRyeVxyXG5cdFx0ICogQHJldHVybiBTdHJpbmdcclxuXHRcdCAqL1xyXG5cdFx0Z2V0WmlwRW50cnlDb21tZW50OiBmdW5jdGlvbiAoLypPYmplY3QqL2VudHJ5KSB7XHJcblx0XHRcdHZhciBpdGVtID0gZ2V0RW50cnkoZW50cnkpO1xyXG5cdFx0XHRpZiAoaXRlbSkge1xyXG5cdFx0XHRcdHJldHVybiBpdGVtLmNvbW1lbnQgfHwgJyc7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuICcnXHJcblx0XHR9LFxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVXBkYXRlcyB0aGUgY29udGVudCBvZiBhbiBleGlzdGluZyBlbnRyeSBpbnNpZGUgdGhlIGFyY2hpdmUuIFRoZSB6aXAgbXVzdCBiZSByZXdyaXR0ZW4gYWZ0ZXIgdXBkYXRpbmcgdGhlIGNvbnRlbnRcclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0gZW50cnlcclxuXHRcdCAqIEBwYXJhbSBjb250ZW50XHJcblx0XHQgKi9cclxuXHRcdHVwZGF0ZUZpbGU6IGZ1bmN0aW9uICgvKk9iamVjdCovZW50cnksIC8qQnVmZmVyKi9jb250ZW50KSB7XHJcblx0XHRcdHZhciBpdGVtID0gZ2V0RW50cnkoZW50cnkpO1xyXG5cdFx0XHRpZiAoaXRlbSkge1xyXG5cdFx0XHRcdGl0ZW0uc2V0RGF0YShjb250ZW50KTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEFkZHMgYSBmaWxlIGZyb20gdGhlIGRpc2sgdG8gdGhlIGFyY2hpdmVcclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0gbG9jYWxQYXRoIEZpbGUgdG8gYWRkIHRvIHppcFxyXG5cdFx0ICogQHBhcmFtIHppcFBhdGggT3B0aW9uYWwgcGF0aCBpbnNpZGUgdGhlIHppcFxyXG5cdFx0ICogQHBhcmFtIHppcE5hbWUgT3B0aW9uYWwgbmFtZSBmb3IgdGhlIGZpbGVcclxuXHRcdCAqL1xyXG5cdFx0YWRkTG9jYWxGaWxlOiBmdW5jdGlvbiAoLypTdHJpbmcqL2xvY2FsUGF0aCwgLypTdHJpbmcqL3ppcFBhdGgsIC8qU3RyaW5nKi96aXBOYW1lKSB7XHJcblx0XHRcdGlmIChmcy5leGlzdHNTeW5jKGxvY2FsUGF0aCkpIHtcclxuXHRcdFx0XHRpZiAoemlwUGF0aCkge1xyXG5cdFx0XHRcdFx0emlwUGF0aCA9IHppcFBhdGguc3BsaXQoXCJcXFxcXCIpLmpvaW4oXCIvXCIpO1xyXG5cdFx0XHRcdFx0aWYgKHppcFBhdGguY2hhckF0KHppcFBhdGgubGVuZ3RoIC0gMSkgIT09IFwiL1wiKSB7XHJcblx0XHRcdFx0XHRcdHppcFBhdGggKz0gXCIvXCI7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdHppcFBhdGggPSBcIlwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHR2YXIgcCA9IGxvY2FsUGF0aC5zcGxpdChcIlxcXFxcIikuam9pbihcIi9cIikuc3BsaXQoXCIvXCIpLnBvcCgpO1xyXG5cclxuXHRcdFx0XHRpZiAoemlwTmFtZSkge1xyXG5cdFx0XHRcdFx0dGhpcy5hZGRGaWxlKHppcFBhdGggKyB6aXBOYW1lLCBmcy5yZWFkRmlsZVN5bmMobG9jYWxQYXRoKSwgXCJcIiwgMClcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0dGhpcy5hZGRGaWxlKHppcFBhdGggKyBwLCBmcy5yZWFkRmlsZVN5bmMobG9jYWxQYXRoKSwgXCJcIiwgMClcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhyb3cgVXRpbHMuRXJyb3JzLkZJTEVfTk9UX0ZPVU5ELnJlcGxhY2UoXCIlc1wiLCBsb2NhbFBhdGgpO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQWRkcyBhIGxvY2FsIGRpcmVjdG9yeSBhbmQgYWxsIGl0cyBuZXN0ZWQgZmlsZXMgYW5kIGRpcmVjdG9yaWVzIHRvIHRoZSBhcmNoaXZlXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIGxvY2FsUGF0aFxyXG5cdFx0ICogQHBhcmFtIHppcFBhdGggb3B0aW9uYWwgcGF0aCBpbnNpZGUgemlwXHJcblx0XHQgKiBAcGFyYW0gZmlsdGVyIG9wdGlvbmFsIFJlZ0V4cCBvciBGdW5jdGlvbiBpZiBmaWxlcyBtYXRjaCB3aWxsXHJcblx0XHQgKiAgICAgICAgICAgICAgIGJlIGluY2x1ZGVkLlxyXG5cdFx0ICovXHJcblx0XHRhZGRMb2NhbEZvbGRlcjogZnVuY3Rpb24gKC8qU3RyaW5nKi9sb2NhbFBhdGgsIC8qU3RyaW5nKi96aXBQYXRoLCAvKlJlZ0V4cHxGdW5jdGlvbiovZmlsdGVyKSB7XHJcblx0XHRcdGlmIChmaWx0ZXIgPT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdGZpbHRlciA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHRcdH07XHJcblx0XHRcdH0gZWxzZSBpZiAoZmlsdGVyIGluc3RhbmNlb2YgUmVnRXhwKSB7XHJcblx0XHRcdFx0ZmlsdGVyID0gZnVuY3Rpb24gKGZpbHRlcikge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGZ1bmN0aW9uIChmaWxlbmFtZSkge1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gZmlsdGVyLnRlc3QoZmlsZW5hbWUpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0oZmlsdGVyKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHppcFBhdGgpIHtcclxuXHRcdFx0XHR6aXBQYXRoID0gemlwUGF0aC5zcGxpdChcIlxcXFxcIikuam9pbihcIi9cIik7XHJcblx0XHRcdFx0aWYgKHppcFBhdGguY2hhckF0KHppcFBhdGgubGVuZ3RoIC0gMSkgIT09IFwiL1wiKSB7XHJcblx0XHRcdFx0XHR6aXBQYXRoICs9IFwiL1wiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHR6aXBQYXRoID0gXCJcIjtcclxuXHRcdFx0fVxyXG5cdFx0XHQvLyBub3JtYWxpemUgdGhlIHBhdGggZmlyc3RcclxuXHRcdFx0bG9jYWxQYXRoID0gcHRoLm5vcm1hbGl6ZShsb2NhbFBhdGgpO1xyXG5cdFx0XHRsb2NhbFBhdGggPSBsb2NhbFBhdGguc3BsaXQoXCJcXFxcXCIpLmpvaW4oXCIvXCIpOyAvL3dpbmRvd3MgZml4XHJcblx0XHRcdGlmIChsb2NhbFBhdGguY2hhckF0KGxvY2FsUGF0aC5sZW5ndGggLSAxKSAhPT0gXCIvXCIpXHJcblx0XHRcdFx0bG9jYWxQYXRoICs9IFwiL1wiO1xyXG5cclxuXHRcdFx0aWYgKGZzLmV4aXN0c1N5bmMobG9jYWxQYXRoKSkge1xyXG5cclxuXHRcdFx0XHR2YXIgaXRlbXMgPSBVdGlscy5maW5kRmlsZXMobG9jYWxQYXRoKSxcclxuXHRcdFx0XHRcdHNlbGYgPSB0aGlzO1xyXG5cclxuXHRcdFx0XHRpZiAoaXRlbXMubGVuZ3RoKSB7XHJcblx0XHRcdFx0XHRpdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChwYXRoKSB7XHJcblx0XHRcdFx0XHRcdHZhciBwID0gcGF0aC5zcGxpdChcIlxcXFxcIikuam9pbihcIi9cIikucmVwbGFjZShuZXcgUmVnRXhwKGxvY2FsUGF0aC5yZXBsYWNlKC8oXFwofFxcKSkvZywgJ1xcXFwkMScpLCAnaScpLCBcIlwiKTsgLy93aW5kb3dzIGZpeFxyXG5cdFx0XHRcdFx0XHRpZiAoZmlsdGVyKHApKSB7XHJcblx0XHRcdFx0XHRcdFx0aWYgKHAuY2hhckF0KHAubGVuZ3RoIC0gMSkgIT09IFwiL1wiKSB7XHJcblx0XHRcdFx0XHRcdFx0XHRzZWxmLmFkZEZpbGUoemlwUGF0aCArIHAsIGZzLnJlYWRGaWxlU3luYyhwYXRoKSwgXCJcIiwgMClcclxuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0XHRcdFx0c2VsZi5hZGRGaWxlKHppcFBhdGggKyBwLCBCdWZmZXIuYWxsb2MoMCksIFwiXCIsIDApXHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0dGhyb3cgVXRpbHMuRXJyb3JzLkZJTEVfTk9UX0ZPVU5ELnJlcGxhY2UoXCIlc1wiLCBsb2NhbFBhdGgpO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogQWxsb3dzIHlvdSB0byBjcmVhdGUgYSBlbnRyeSAoZmlsZSBvciBkaXJlY3RvcnkpIGluIHRoZSB6aXAgZmlsZS5cclxuXHRcdCAqIElmIHlvdSB3YW50IHRvIGNyZWF0ZSBhIGRpcmVjdG9yeSB0aGUgZW50cnlOYW1lIG11c3QgZW5kIGluIC8gYW5kIGEgbnVsbCBidWZmZXIgc2hvdWxkIGJlIHByb3ZpZGVkLlxyXG5cdFx0ICogQ29tbWVudCBhbmQgYXR0cmlidXRlcyBhcmUgb3B0aW9uYWxcclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0gZW50cnlOYW1lXHJcblx0XHQgKiBAcGFyYW0gY29udGVudFxyXG5cdFx0ICogQHBhcmFtIGNvbW1lbnRcclxuXHRcdCAqIEBwYXJhbSBhdHRyXHJcblx0XHQgKi9cclxuXHRcdGFkZEZpbGU6IGZ1bmN0aW9uICgvKlN0cmluZyovZW50cnlOYW1lLCAvKkJ1ZmZlciovY29udGVudCwgLypTdHJpbmcqL2NvbW1lbnQsIC8qTnVtYmVyKi9hdHRyKSB7XHJcblx0XHRcdHZhciBlbnRyeSA9IG5ldyBaaXBFbnRyeSgpO1xyXG5cdFx0XHRlbnRyeS5lbnRyeU5hbWUgPSBlbnRyeU5hbWU7XHJcblx0XHRcdGVudHJ5LmNvbW1lbnQgPSBjb21tZW50IHx8IFwiXCI7XHJcblxyXG5cdFx0XHRpZiAoIWF0dHIpIHtcclxuXHRcdFx0XHRpZiAoZW50cnkuaXNEaXJlY3RvcnkpIHtcclxuXHRcdFx0XHRcdGF0dHIgPSAoMG80MDc1NSA8PCAxNikgfCAweDEwOyAvLyAocGVybWlzc2lvbnMgZHJ3eHIteHIteCkgKyAoTVMtRE9TIGRpcmVjdG9yeSBmbGFnKVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRhdHRyID0gMG82NDQgPDwgMTY7IC8vIHBlcm1pc3Npb25zIC1yLXdyLS1yLS1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGVudHJ5LmF0dHIgPSBhdHRyO1xyXG5cclxuXHRcdFx0ZW50cnkuc2V0RGF0YShjb250ZW50KTtcclxuXHRcdFx0X3ppcC5zZXRFbnRyeShlbnRyeSk7XHJcblx0XHR9LFxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogUmV0dXJucyBhbiBhcnJheSBvZiBaaXBFbnRyeSBvYmplY3RzIHJlcHJlc2VudGluZyB0aGUgZmlsZXMgYW5kIGZvbGRlcnMgaW5zaWRlIHRoZSBhcmNoaXZlXHJcblx0XHQgKlxyXG5cdFx0ICogQHJldHVybiBBcnJheVxyXG5cdFx0ICovXHJcblx0XHRnZXRFbnRyaWVzOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGlmIChfemlwKSB7XHJcblx0XHRcdFx0cmV0dXJuIF96aXAuZW50cmllcztcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXR1cm4gW107XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBSZXR1cm5zIGEgWmlwRW50cnkgb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgZmlsZSBvciBmb2xkZXIgc3BlY2lmaWVkIGJ5IGBgbmFtZWBgLlxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSBuYW1lXHJcblx0XHQgKiBAcmV0dXJuIFppcEVudHJ5XHJcblx0XHQgKi9cclxuXHRcdGdldEVudHJ5OiBmdW5jdGlvbiAoLypTdHJpbmcqL25hbWUpIHtcclxuXHRcdFx0cmV0dXJuIGdldEVudHJ5KG5hbWUpO1xyXG5cdFx0fSxcclxuXHJcblx0XHQvKipcclxuXHRcdCAqIEV4dHJhY3RzIHRoZSBnaXZlbiBlbnRyeSB0byB0aGUgZ2l2ZW4gdGFyZ2V0UGF0aFxyXG5cdFx0ICogSWYgdGhlIGVudHJ5IGlzIGEgZGlyZWN0b3J5IGluc2lkZSB0aGUgYXJjaGl2ZSwgdGhlIGVudGlyZSBkaXJlY3RvcnkgYW5kIGl0J3Mgc3ViZGlyZWN0b3JpZXMgd2lsbCBiZSBleHRyYWN0ZWRcclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0gZW50cnkgWmlwRW50cnkgb2JqZWN0IG9yIFN0cmluZyB3aXRoIHRoZSBmdWxsIHBhdGggb2YgdGhlIGVudHJ5XHJcblx0XHQgKiBAcGFyYW0gdGFyZ2V0UGF0aCBUYXJnZXQgZm9sZGVyIHdoZXJlIHRvIHdyaXRlIHRoZSBmaWxlXHJcblx0XHQgKiBAcGFyYW0gbWFpbnRhaW5FbnRyeVBhdGggSWYgbWFpbnRhaW5FbnRyeVBhdGggaXMgdHJ1ZSBhbmQgdGhlIGVudHJ5IGlzIGluc2lkZSBhIGZvbGRlciwgdGhlIGVudHJ5IGZvbGRlclxyXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgIHdpbGwgYmUgY3JlYXRlZCBpbiB0YXJnZXRQYXRoIGFzIHdlbGwuIERlZmF1bHQgaXMgVFJVRVxyXG5cdFx0ICogQHBhcmFtIG92ZXJ3cml0ZSBJZiB0aGUgZmlsZSBhbHJlYWR5IGV4aXN0cyBhdCB0aGUgdGFyZ2V0IHBhdGgsIHRoZSBmaWxlIHdpbGwgYmUgb3ZlcndyaXRlbiBpZiB0aGlzIGlzIHRydWUuXHJcblx0XHQgKiAgICAgICAgICAgICAgICAgIERlZmF1bHQgaXMgRkFMU0VcclxuXHRcdCAqXHJcblx0XHQgKiBAcmV0dXJuIEJvb2xlYW5cclxuXHRcdCAqL1xyXG5cdFx0ZXh0cmFjdEVudHJ5VG86IGZ1bmN0aW9uICgvKk9iamVjdCovZW50cnksIC8qU3RyaW5nKi90YXJnZXRQYXRoLCAvKkJvb2xlYW4qL21haW50YWluRW50cnlQYXRoLCAvKkJvb2xlYW4qL292ZXJ3cml0ZSkge1xyXG5cdFx0XHRvdmVyd3JpdGUgPSBvdmVyd3JpdGUgfHwgZmFsc2U7XHJcblx0XHRcdG1haW50YWluRW50cnlQYXRoID0gdHlwZW9mIG1haW50YWluRW50cnlQYXRoID09PSBcInVuZGVmaW5lZFwiID8gdHJ1ZSA6IG1haW50YWluRW50cnlQYXRoO1xyXG5cclxuXHRcdFx0dmFyIGl0ZW0gPSBnZXRFbnRyeShlbnRyeSk7XHJcblx0XHRcdGlmICghaXRlbSkge1xyXG5cdFx0XHRcdHRocm93IFV0aWxzLkVycm9ycy5OT19FTlRSWTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIGVudHJ5TmFtZSA9IGl0ZW0uZW50cnlOYW1lO1xyXG5cclxuXHRcdFx0dmFyIHRhcmdldCA9IHNhbml0aXplKHRhcmdldFBhdGgsIG1haW50YWluRW50cnlQYXRoID8gZW50cnlOYW1lIDogcHRoLmJhc2VuYW1lKGVudHJ5TmFtZSkpO1xyXG5cclxuXHRcdFx0aWYgKGl0ZW0uaXNEaXJlY3RvcnkpIHtcclxuXHRcdFx0XHR0YXJnZXQgPSBwdGgucmVzb2x2ZSh0YXJnZXQsIFwiLi5cIik7XHJcblx0XHRcdFx0dmFyIGNoaWxkcmVuID0gX3ppcC5nZXRFbnRyeUNoaWxkcmVuKGl0ZW0pO1xyXG5cdFx0XHRcdGNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24gKGNoaWxkKSB7XHJcblx0XHRcdFx0XHRpZiAoY2hpbGQuaXNEaXJlY3RvcnkpIHJldHVybjtcclxuXHRcdFx0XHRcdHZhciBjb250ZW50ID0gY2hpbGQuZ2V0RGF0YSgpO1xyXG5cdFx0XHRcdFx0aWYgKCFjb250ZW50KSB7XHJcblx0XHRcdFx0XHRcdHRocm93IFV0aWxzLkVycm9ycy5DQU5UX0VYVFJBQ1RfRklMRTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHZhciBjaGlsZE5hbWUgPSBzYW5pdGl6ZSh0YXJnZXRQYXRoLCBtYWludGFpbkVudHJ5UGF0aCA/IGNoaWxkLmVudHJ5TmFtZSA6IHB0aC5iYXNlbmFtZShjaGlsZC5lbnRyeU5hbWUpKTtcclxuXHJcblx0XHRcdFx0XHRVdGlscy53cml0ZUZpbGVUbyhjaGlsZE5hbWUsIGNvbnRlbnQsIG92ZXJ3cml0ZSk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBjb250ZW50ID0gaXRlbS5nZXREYXRhKCk7XHJcblx0XHRcdGlmICghY29udGVudCkgdGhyb3cgVXRpbHMuRXJyb3JzLkNBTlRfRVhUUkFDVF9GSUxFO1xyXG5cclxuXHRcdFx0aWYgKGZzLmV4aXN0c1N5bmModGFyZ2V0KSAmJiAhb3ZlcndyaXRlKSB7XHJcblx0XHRcdFx0dGhyb3cgVXRpbHMuRXJyb3JzLkNBTlRfT1ZFUlJJREU7XHJcblx0XHRcdH1cclxuXHRcdFx0VXRpbHMud3JpdGVGaWxlVG8odGFyZ2V0LCBjb250ZW50LCBvdmVyd3JpdGUpO1xyXG5cclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9LFxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogVGVzdCB0aGUgYXJjaGl2ZVxyXG5cdFx0ICpcclxuXHRcdCAqL1xyXG5cdFx0dGVzdDogZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAoIV96aXApIHtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGZvciAodmFyIGVudHJ5IGluIF96aXAuZW50cmllcykge1xyXG5cdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRpZiAoZW50cnkuaXNEaXJlY3RvcnkpIHtcclxuXHRcdFx0XHRcdFx0Y29udGludWU7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR2YXIgY29udGVudCA9IF96aXAuZW50cmllc1tlbnRyeV0uZ2V0RGF0YSgpO1xyXG5cdFx0XHRcdFx0aWYgKCFjb250ZW50KSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHR9LFxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogRXh0cmFjdHMgdGhlIGVudGlyZSBhcmNoaXZlIHRvIHRoZSBnaXZlbiBsb2NhdGlvblxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSB0YXJnZXRQYXRoIFRhcmdldCBsb2NhdGlvblxyXG5cdFx0ICogQHBhcmFtIG92ZXJ3cml0ZSBJZiB0aGUgZmlsZSBhbHJlYWR5IGV4aXN0cyBhdCB0aGUgdGFyZ2V0IHBhdGgsIHRoZSBmaWxlIHdpbGwgYmUgb3ZlcndyaXRlbiBpZiB0aGlzIGlzIHRydWUuXHJcblx0XHQgKiAgICAgICAgICAgICAgICAgIERlZmF1bHQgaXMgRkFMU0VcclxuXHRcdCAqL1xyXG5cdFx0ZXh0cmFjdEFsbFRvOiBmdW5jdGlvbiAoLypTdHJpbmcqL3RhcmdldFBhdGgsIC8qQm9vbGVhbiovb3ZlcndyaXRlKSB7XHJcblx0XHRcdG92ZXJ3cml0ZSA9IG92ZXJ3cml0ZSB8fCBmYWxzZTtcclxuXHRcdFx0aWYgKCFfemlwKSB7XHJcblx0XHRcdFx0dGhyb3cgVXRpbHMuRXJyb3JzLk5PX1pJUDtcclxuXHRcdFx0fVxyXG5cdFx0XHRfemlwLmVudHJpZXMuZm9yRWFjaChmdW5jdGlvbiAoZW50cnkpIHtcclxuXHRcdFx0XHR2YXIgZW50cnlOYW1lID0gc2FuaXRpemUodGFyZ2V0UGF0aCwgZW50cnkuZW50cnlOYW1lLnRvU3RyaW5nKCkpO1xyXG5cdFx0XHRcdGlmIChlbnRyeS5pc0RpcmVjdG9yeSkge1xyXG5cdFx0XHRcdFx0VXRpbHMubWFrZURpcihlbnRyeU5hbWUpO1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHR2YXIgY29udGVudCA9IGVudHJ5LmdldERhdGEoKTtcclxuXHRcdFx0XHRpZiAoIWNvbnRlbnQpIHtcclxuXHRcdFx0XHRcdHRocm93IFV0aWxzLkVycm9ycy5DQU5UX0VYVFJBQ1RfRklMRTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0VXRpbHMud3JpdGVGaWxlVG8oZW50cnlOYW1lLCBjb250ZW50LCBvdmVyd3JpdGUpO1xyXG5cdFx0XHRcdHRyeSB7XHJcblx0XHRcdFx0XHRmcy51dGltZXNTeW5jKGVudHJ5TmFtZSwgZW50cnkuaGVhZGVyLnRpbWUsIGVudHJ5LmhlYWRlci50aW1lKVxyXG5cdFx0XHRcdH0gY2F0Y2ggKGVycikge1xyXG5cdFx0XHRcdFx0dGhyb3cgVXRpbHMuRXJyb3JzLkNBTlRfRVhUUkFDVF9GSUxFO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHRcdH0sXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBc3luY2hyb25vdXMgZXh0cmFjdEFsbFRvXHJcblx0XHQgKlxyXG5cdFx0ICogQHBhcmFtIHRhcmdldFBhdGggVGFyZ2V0IGxvY2F0aW9uXHJcblx0XHQgKiBAcGFyYW0gb3ZlcndyaXRlIElmIHRoZSBmaWxlIGFscmVhZHkgZXhpc3RzIGF0IHRoZSB0YXJnZXQgcGF0aCwgdGhlIGZpbGUgd2lsbCBiZSBvdmVyd3JpdGVuIGlmIHRoaXMgaXMgdHJ1ZS5cclxuXHRcdCAqICAgICAgICAgICAgICAgICAgRGVmYXVsdCBpcyBGQUxTRVxyXG5cdFx0ICogQHBhcmFtIGNhbGxiYWNrXHJcblx0XHQgKi9cclxuXHRcdGV4dHJhY3RBbGxUb0FzeW5jOiBmdW5jdGlvbiAoLypTdHJpbmcqL3RhcmdldFBhdGgsIC8qQm9vbGVhbiovb3ZlcndyaXRlLCAvKkZ1bmN0aW9uKi9jYWxsYmFjaykge1xyXG5cdFx0XHRpZiAoIWNhbGxiYWNrKSB7XHJcblx0XHRcdFx0Y2FsbGJhY2sgPSBmdW5jdGlvbigpIHt9XHJcblx0XHRcdH1cclxuXHRcdFx0b3ZlcndyaXRlID0gb3ZlcndyaXRlIHx8IGZhbHNlO1xyXG5cdFx0XHRpZiAoIV96aXApIHtcclxuXHRcdFx0XHRjYWxsYmFjayhuZXcgRXJyb3IoVXRpbHMuRXJyb3JzLk5PX1pJUCkpO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIGVudHJpZXMgPSBfemlwLmVudHJpZXM7XHJcblx0XHRcdHZhciBpID0gZW50cmllcy5sZW5ndGg7XHJcblx0XHRcdGVudHJpZXMuZm9yRWFjaChmdW5jdGlvbiAoZW50cnkpIHtcclxuXHRcdFx0XHRpZiAoaSA8PSAwKSByZXR1cm47IC8vIEhhZCBhbiBlcnJvciBhbHJlYWR5XHJcblxyXG5cdFx0XHRcdHZhciBlbnRyeU5hbWUgPSBwdGgubm9ybWFsaXplKGVudHJ5LmVudHJ5TmFtZS50b1N0cmluZygpKTtcclxuXHJcblx0XHRcdFx0aWYgKGVudHJ5LmlzRGlyZWN0b3J5KSB7XHJcblx0XHRcdFx0XHRVdGlscy5tYWtlRGlyKHNhbml0aXplKHRhcmdldFBhdGgsIGVudHJ5TmFtZSkpO1xyXG5cdFx0XHRcdFx0aWYgKC0taSA9PT0gMClcclxuXHRcdFx0XHRcdFx0Y2FsbGJhY2sodW5kZWZpbmVkKTtcclxuXHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0ZW50cnkuZ2V0RGF0YUFzeW5jKGZ1bmN0aW9uIChjb250ZW50LCBlcnIpIHtcclxuXHRcdFx0XHRcdGlmIChpIDw9IDApIHJldHVybjtcclxuXHRcdFx0XHRcdGlmIChlcnIpIHtcclxuXHRcdFx0XHRcdFx0Y2FsbGJhY2sobmV3IEVycm9yKGVycikpO1xyXG5cdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRpZiAoIWNvbnRlbnQpIHtcclxuXHRcdFx0XHRcdFx0aSA9IDA7XHJcblx0XHRcdFx0XHRcdGNhbGxiYWNrKG5ldyBFcnJvcihVdGlscy5FcnJvcnMuQ0FOVF9FWFRSQUNUX0ZJTEUpKTtcclxuXHRcdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFV0aWxzLndyaXRlRmlsZVRvQXN5bmMoc2FuaXRpemUodGFyZ2V0UGF0aCwgZW50cnlOYW1lKSwgY29udGVudCwgb3ZlcndyaXRlLCBmdW5jdGlvbiAoc3VjYykge1xyXG5cdFx0XHRcdFx0XHR0cnkge1xyXG5cdFx0XHRcdFx0XHRcdGZzLnV0aW1lc1N5bmMocHRoLnJlc29sdmUodGFyZ2V0UGF0aCwgZW50cnlOYW1lKSwgZW50cnkuaGVhZGVyLnRpbWUsIGVudHJ5LmhlYWRlci50aW1lKTtcclxuXHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XHJcblx0XHRcdFx0XHRcdFx0Y2FsbGJhY2sobmV3IEVycm9yKCdVbmFibGUgdG8gc2V0IHV0aW1lcycpKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRpZiAoaSA8PSAwKSByZXR1cm47XHJcblx0XHRcdFx0XHRcdGlmICghc3VjYykge1xyXG5cdFx0XHRcdFx0XHRcdGkgPSAwO1xyXG5cdFx0XHRcdFx0XHRcdGNhbGxiYWNrKG5ldyBFcnJvcignVW5hYmxlIHRvIHdyaXRlJykpO1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRpZiAoLS1pID09PSAwKVxyXG5cdFx0XHRcdFx0XHRcdGNhbGxiYWNrKHVuZGVmaW5lZCk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSlcclxuXHRcdH0sXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBXcml0ZXMgdGhlIG5ld2x5IGNyZWF0ZWQgemlwIGZpbGUgdG8gZGlzayBhdCB0aGUgc3BlY2lmaWVkIGxvY2F0aW9uIG9yIGlmIGEgemlwIHdhcyBvcGVuZWQgYW5kIG5vIGBgdGFyZ2V0RmlsZU5hbWVgYCBpcyBwcm92aWRlZCwgaXQgd2lsbCBvdmVyd3JpdGUgdGhlIG9wZW5lZCB6aXBcclxuXHRcdCAqXHJcblx0XHQgKiBAcGFyYW0gdGFyZ2V0RmlsZU5hbWVcclxuXHRcdCAqIEBwYXJhbSBjYWxsYmFja1xyXG5cdFx0ICovXHJcblx0XHR3cml0ZVppcDogZnVuY3Rpb24gKC8qU3RyaW5nKi90YXJnZXRGaWxlTmFtZSwgLypGdW5jdGlvbiovY2FsbGJhY2spIHtcclxuXHRcdFx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcclxuXHRcdFx0XHRpZiAodHlwZW9mIHRhcmdldEZpbGVOYW1lID09PSBcImZ1bmN0aW9uXCIpIHtcclxuXHRcdFx0XHRcdGNhbGxiYWNrID0gdGFyZ2V0RmlsZU5hbWU7XHJcblx0XHRcdFx0XHR0YXJnZXRGaWxlTmFtZSA9IFwiXCI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIXRhcmdldEZpbGVOYW1lICYmIF9maWxlbmFtZSkge1xyXG5cdFx0XHRcdHRhcmdldEZpbGVOYW1lID0gX2ZpbGVuYW1lO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmICghdGFyZ2V0RmlsZU5hbWUpIHJldHVybjtcclxuXHJcblx0XHRcdHZhciB6aXBEYXRhID0gX3ppcC5jb21wcmVzc1RvQnVmZmVyKCk7XHJcblx0XHRcdGlmICh6aXBEYXRhKSB7XHJcblx0XHRcdFx0dmFyIG9rID0gVXRpbHMud3JpdGVGaWxlVG8odGFyZ2V0RmlsZU5hbWUsIHppcERhdGEsIHRydWUpO1xyXG5cdFx0XHRcdGlmICh0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicpIGNhbGxiYWNrKCFvayA/IG5ldyBFcnJvcihcImZhaWxlZFwiKSA6IG51bGwsIFwiXCIpO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogUmV0dXJucyB0aGUgY29udGVudCBvZiB0aGUgZW50aXJlIHppcCBmaWxlIGFzIGEgQnVmZmVyIG9iamVjdFxyXG5cdFx0ICpcclxuXHRcdCAqIEByZXR1cm4gQnVmZmVyXHJcblx0XHQgKi9cclxuXHRcdHRvQnVmZmVyOiBmdW5jdGlvbiAoLypGdW5jdGlvbiovb25TdWNjZXNzLCAvKkZ1bmN0aW9uKi9vbkZhaWwsIC8qRnVuY3Rpb24qL29uSXRlbVN0YXJ0LCAvKkZ1bmN0aW9uKi9vbkl0ZW1FbmQpIHtcclxuXHRcdFx0dGhpcy52YWx1ZU9mID0gMjtcclxuXHRcdFx0aWYgKHR5cGVvZiBvblN1Y2Nlc3MgPT09IFwiZnVuY3Rpb25cIikge1xyXG5cdFx0XHRcdF96aXAudG9Bc3luY0J1ZmZlcihvblN1Y2Nlc3MsIG9uRmFpbCwgb25JdGVtU3RhcnQsIG9uSXRlbUVuZCk7XHJcblx0XHRcdFx0cmV0dXJuIG51bGw7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIF96aXAuY29tcHJlc3NUb0J1ZmZlcigpXHJcblx0XHR9XHJcblx0fVxyXG59O1xyXG4iLCJ2YXIgVXRpbHMgPSByZXF1aXJlKFwiLi4vdXRpbFwiKSxcclxuICAgIENvbnN0YW50cyA9IFV0aWxzLkNvbnN0YW50cztcclxuXHJcbi8qIFRoZSBjZW50cmFsIGRpcmVjdG9yeSBmaWxlIGhlYWRlciAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBfdmVyTWFkZSA9IDB4MEEsXHJcbiAgICAgICAgX3ZlcnNpb24gPSAweDBBLFxyXG4gICAgICAgIF9mbGFncyA9IDAsXHJcbiAgICAgICAgX21ldGhvZCA9IDAsXHJcbiAgICAgICAgX3RpbWUgPSAwLFxyXG4gICAgICAgIF9jcmMgPSAwLFxyXG4gICAgICAgIF9jb21wcmVzc2VkU2l6ZSA9IDAsXHJcbiAgICAgICAgX3NpemUgPSAwLFxyXG4gICAgICAgIF9mbmFtZUxlbiA9IDAsXHJcbiAgICAgICAgX2V4dHJhTGVuID0gMCxcclxuXHJcbiAgICAgICAgX2NvbUxlbiA9IDAsXHJcbiAgICAgICAgX2Rpc2tTdGFydCA9IDAsXHJcbiAgICAgICAgX2luYXR0ciA9IDAsXHJcbiAgICAgICAgX2F0dHIgPSAwLFxyXG4gICAgICAgIF9vZmZzZXQgPSAwO1xyXG5cclxuICAgIHZhciBfZGF0YUhlYWRlciA9IHt9O1xyXG5cclxuICAgIGZ1bmN0aW9uIHNldFRpbWUodmFsKSB7XHJcbiAgICAgICAgdmFsID0gbmV3IERhdGUodmFsKTtcclxuICAgICAgICBfdGltZSA9ICh2YWwuZ2V0RnVsbFllYXIoKSAtIDE5ODAgJiAweDdmKSA8PCAyNSAgLy8gYjA5LTE2IHllYXJzIGZyb20gMTk4MFxyXG4gICAgICAgICAgICB8ICh2YWwuZ2V0TW9udGgoKSArIDEpIDw8IDIxICAgICAgICAgICAgICAgICAvLyBiMDUtMDggbW9udGhcclxuICAgICAgICAgICAgfCB2YWwuZ2V0RGF0ZSgpIDw8IDE2ICAgICAgICAgICAgICAgICAgICAgICAgLy8gYjAwLTA0IGhvdXJcclxuXHJcbiAgICAgICAgICAgIC8vIDIgYnl0ZXMgdGltZVxyXG4gICAgICAgICAgICB8IHZhbC5nZXRIb3VycygpIDw8IDExICAgIC8vIGIxMS0xNSBob3VyXHJcbiAgICAgICAgICAgIHwgdmFsLmdldE1pbnV0ZXMoKSA8PCA1ICAgLy8gYjA1LTEwIG1pbnV0ZVxyXG4gICAgICAgICAgICB8IHZhbC5nZXRTZWNvbmRzKCkgPj4gMTsgIC8vIGIwMC0wNCBzZWNvbmRzIGRpdmlkZWQgYnkgMlxyXG4gICAgfVxyXG5cclxuICAgIHNldFRpbWUoK25ldyBEYXRlKCkpO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZ2V0IG1hZGUgKCkgeyByZXR1cm4gX3Zlck1hZGU7IH0sXHJcbiAgICAgICAgc2V0IG1hZGUgKHZhbCkgeyBfdmVyTWFkZSA9IHZhbDsgfSxcclxuXHJcbiAgICAgICAgZ2V0IHZlcnNpb24gKCkgeyByZXR1cm4gX3ZlcnNpb247IH0sXHJcbiAgICAgICAgc2V0IHZlcnNpb24gKHZhbCkgeyBfdmVyc2lvbiA9IHZhbCB9LFxyXG5cclxuICAgICAgICBnZXQgZmxhZ3MgKCkgeyByZXR1cm4gX2ZsYWdzIH0sXHJcbiAgICAgICAgc2V0IGZsYWdzICh2YWwpIHsgX2ZsYWdzID0gdmFsOyB9LFxyXG5cclxuICAgICAgICBnZXQgbWV0aG9kICgpIHsgcmV0dXJuIF9tZXRob2Q7IH0sXHJcbiAgICAgICAgc2V0IG1ldGhvZCAodmFsKSB7IF9tZXRob2QgPSB2YWw7IH0sXHJcblxyXG4gICAgICAgIGdldCB0aW1lICgpIHsgcmV0dXJuIG5ldyBEYXRlKFxyXG4gICAgICAgICAgICAoKF90aW1lID4+IDI1KSAmIDB4N2YpICsgMTk4MCxcclxuICAgICAgICAgICAgKChfdGltZSA+PiAyMSkgJiAweDBmKSAtIDEsXHJcbiAgICAgICAgICAgIChfdGltZSA+PiAxNikgJiAweDFmLFxyXG4gICAgICAgICAgICAoX3RpbWUgPj4gMTEpICYgMHgxZixcclxuICAgICAgICAgICAgKF90aW1lID4+IDUpICYgMHgzZixcclxuICAgICAgICAgICAgKF90aW1lICYgMHgxZikgPDwgMVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzZXQgdGltZSAodmFsKSB7XHJcbiAgICAgICAgICAgIHNldFRpbWUodmFsKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBnZXQgY3JjICgpIHsgcmV0dXJuIF9jcmM7IH0sXHJcbiAgICAgICAgc2V0IGNyYyAodmFsKSB7IF9jcmMgPSB2YWw7IH0sXHJcblxyXG4gICAgICAgIGdldCBjb21wcmVzc2VkU2l6ZSAoKSB7IHJldHVybiBfY29tcHJlc3NlZFNpemU7IH0sXHJcbiAgICAgICAgc2V0IGNvbXByZXNzZWRTaXplICh2YWwpIHsgX2NvbXByZXNzZWRTaXplID0gdmFsOyB9LFxyXG5cclxuICAgICAgICBnZXQgc2l6ZSAoKSB7IHJldHVybiBfc2l6ZTsgfSxcclxuICAgICAgICBzZXQgc2l6ZSAodmFsKSB7IF9zaXplID0gdmFsOyB9LFxyXG5cclxuICAgICAgICBnZXQgZmlsZU5hbWVMZW5ndGggKCkgeyByZXR1cm4gX2ZuYW1lTGVuOyB9LFxyXG4gICAgICAgIHNldCBmaWxlTmFtZUxlbmd0aCAodmFsKSB7IF9mbmFtZUxlbiA9IHZhbDsgfSxcclxuXHJcbiAgICAgICAgZ2V0IGV4dHJhTGVuZ3RoICgpIHsgcmV0dXJuIF9leHRyYUxlbiB9LFxyXG4gICAgICAgIHNldCBleHRyYUxlbmd0aCAodmFsKSB7IF9leHRyYUxlbiA9IHZhbDsgfSxcclxuXHJcbiAgICAgICAgZ2V0IGNvbW1lbnRMZW5ndGggKCkgeyByZXR1cm4gX2NvbUxlbiB9LFxyXG4gICAgICAgIHNldCBjb21tZW50TGVuZ3RoICh2YWwpIHsgX2NvbUxlbiA9IHZhbCB9LFxyXG5cclxuICAgICAgICBnZXQgZGlza051bVN0YXJ0ICgpIHsgcmV0dXJuIF9kaXNrU3RhcnQgfSxcclxuICAgICAgICBzZXQgZGlza051bVN0YXJ0ICh2YWwpIHsgX2Rpc2tTdGFydCA9IHZhbCB9LFxyXG5cclxuICAgICAgICBnZXQgaW5BdHRyICgpIHsgcmV0dXJuIF9pbmF0dHIgfSxcclxuICAgICAgICBzZXQgaW5BdHRyICh2YWwpIHsgX2luYXR0ciA9IHZhbCB9LFxyXG5cclxuICAgICAgICBnZXQgYXR0ciAoKSB7IHJldHVybiBfYXR0ciB9LFxyXG4gICAgICAgIHNldCBhdHRyICh2YWwpIHsgX2F0dHIgPSB2YWwgfSxcclxuXHJcbiAgICAgICAgZ2V0IG9mZnNldCAoKSB7IHJldHVybiBfb2Zmc2V0IH0sXHJcbiAgICAgICAgc2V0IG9mZnNldCAodmFsKSB7IF9vZmZzZXQgPSB2YWwgfSxcclxuXHJcbiAgICAgICAgZ2V0IGVuY3JpcHRlZCAoKSB7IHJldHVybiAoX2ZsYWdzICYgMSkgPT09IDEgfSxcclxuXHJcbiAgICAgICAgZ2V0IGVudHJ5SGVhZGVyU2l6ZSAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBDb25zdGFudHMuQ0VOSERSICsgX2ZuYW1lTGVuICsgX2V4dHJhTGVuICsgX2NvbUxlbjtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBnZXQgcmVhbERhdGFPZmZzZXQgKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX29mZnNldCArIENvbnN0YW50cy5MT0NIRFIgKyBfZGF0YUhlYWRlci5mbmFtZUxlbiArIF9kYXRhSGVhZGVyLmV4dHJhTGVuO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGdldCBkYXRhSGVhZGVyICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9kYXRhSGVhZGVyO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGxvYWREYXRhSGVhZGVyRnJvbUJpbmFyeSA6IGZ1bmN0aW9uKC8qQnVmZmVyKi9pbnB1dCkge1xyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IGlucHV0LnNsaWNlKF9vZmZzZXQsIF9vZmZzZXQgKyBDb25zdGFudHMuTE9DSERSKTtcclxuICAgICAgICAgICAgLy8gMzAgYnl0ZXMgYW5kIHNob3VsZCBzdGFydCB3aXRoIFwiUEtcXDAwM1xcMDA0XCJcclxuICAgICAgICAgICAgaWYgKGRhdGEucmVhZFVJbnQzMkxFKDApICE9PSBDb25zdGFudHMuTE9DU0lHKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBVdGlscy5FcnJvcnMuSU5WQUxJRF9MT0M7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgX2RhdGFIZWFkZXIgPSB7XHJcbiAgICAgICAgICAgICAgICAvLyB2ZXJzaW9uIG5lZWRlZCB0byBleHRyYWN0XHJcbiAgICAgICAgICAgICAgICB2ZXJzaW9uIDogZGF0YS5yZWFkVUludDE2TEUoQ29uc3RhbnRzLkxPQ1ZFUiksXHJcbiAgICAgICAgICAgICAgICAvLyBnZW5lcmFsIHB1cnBvc2UgYml0IGZsYWdcclxuICAgICAgICAgICAgICAgIGZsYWdzIDogZGF0YS5yZWFkVUludDE2TEUoQ29uc3RhbnRzLkxPQ0ZMRyksXHJcbiAgICAgICAgICAgICAgICAvLyBjb21wcmVzc2lvbiBtZXRob2RcclxuICAgICAgICAgICAgICAgIG1ldGhvZCA6IGRhdGEucmVhZFVJbnQxNkxFKENvbnN0YW50cy5MT0NIT1cpLFxyXG4gICAgICAgICAgICAgICAgLy8gbW9kaWZpY2F0aW9uIHRpbWUgKDIgYnl0ZXMgdGltZSwgMiBieXRlcyBkYXRlKVxyXG4gICAgICAgICAgICAgICAgdGltZSA6IGRhdGEucmVhZFVJbnQzMkxFKENvbnN0YW50cy5MT0NUSU0pLFxyXG4gICAgICAgICAgICAgICAgLy8gdW5jb21wcmVzc2VkIGZpbGUgY3JjLTMyIHZhbHVlXHJcbiAgICAgICAgICAgICAgICBjcmMgOiBkYXRhLnJlYWRVSW50MzJMRShDb25zdGFudHMuTE9DQ1JDKSxcclxuICAgICAgICAgICAgICAgIC8vIGNvbXByZXNzZWQgc2l6ZVxyXG4gICAgICAgICAgICAgICAgY29tcHJlc3NlZFNpemUgOiBkYXRhLnJlYWRVSW50MzJMRShDb25zdGFudHMuTE9DU0laKSxcclxuICAgICAgICAgICAgICAgIC8vIHVuY29tcHJlc3NlZCBzaXplXHJcbiAgICAgICAgICAgICAgICBzaXplIDogZGF0YS5yZWFkVUludDMyTEUoQ29uc3RhbnRzLkxPQ0xFTiksXHJcbiAgICAgICAgICAgICAgICAvLyBmaWxlbmFtZSBsZW5ndGhcclxuICAgICAgICAgICAgICAgIGZuYW1lTGVuIDogZGF0YS5yZWFkVUludDE2TEUoQ29uc3RhbnRzLkxPQ05BTSksXHJcbiAgICAgICAgICAgICAgICAvLyBleHRyYSBmaWVsZCBsZW5ndGhcclxuICAgICAgICAgICAgICAgIGV4dHJhTGVuIDogZGF0YS5yZWFkVUludDE2TEUoQ29uc3RhbnRzLkxPQ0VYVClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGxvYWRGcm9tQmluYXJ5IDogZnVuY3Rpb24oLypCdWZmZXIqL2RhdGEpIHtcclxuICAgICAgICAgICAgLy8gZGF0YSBzaG91bGQgYmUgNDYgYnl0ZXMgYW5kIHN0YXJ0IHdpdGggXCJQSyAwMSAwMlwiXHJcbiAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCAhPT0gQ29uc3RhbnRzLkNFTkhEUiB8fCBkYXRhLnJlYWRVSW50MzJMRSgwKSAhPT0gQ29uc3RhbnRzLkNFTlNJRykge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgVXRpbHMuRXJyb3JzLklOVkFMSURfQ0VOO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIHZlcnNpb24gbWFkZSBieVxyXG4gICAgICAgICAgICBfdmVyTWFkZSA9IGRhdGEucmVhZFVJbnQxNkxFKENvbnN0YW50cy5DRU5WRU0pO1xyXG4gICAgICAgICAgICAvLyB2ZXJzaW9uIG5lZWRlZCB0byBleHRyYWN0XHJcbiAgICAgICAgICAgIF92ZXJzaW9uID0gZGF0YS5yZWFkVUludDE2TEUoQ29uc3RhbnRzLkNFTlZFUik7XHJcbiAgICAgICAgICAgIC8vIGVuY3J5cHQsIGRlY3J5cHQgZmxhZ3NcclxuICAgICAgICAgICAgX2ZsYWdzID0gZGF0YS5yZWFkVUludDE2TEUoQ29uc3RhbnRzLkNFTkZMRyk7XHJcbiAgICAgICAgICAgIC8vIGNvbXByZXNzaW9uIG1ldGhvZFxyXG4gICAgICAgICAgICBfbWV0aG9kID0gZGF0YS5yZWFkVUludDE2TEUoQ29uc3RhbnRzLkNFTkhPVyk7XHJcbiAgICAgICAgICAgIC8vIG1vZGlmaWNhdGlvbiB0aW1lICgyIGJ5dGVzIHRpbWUsIDIgYnl0ZXMgZGF0ZSlcclxuICAgICAgICAgICAgX3RpbWUgPSBkYXRhLnJlYWRVSW50MzJMRShDb25zdGFudHMuQ0VOVElNKTtcclxuICAgICAgICAgICAgLy8gdW5jb21wcmVzc2VkIGZpbGUgY3JjLTMyIHZhbHVlXHJcbiAgICAgICAgICAgIF9jcmMgPSBkYXRhLnJlYWRVSW50MzJMRShDb25zdGFudHMuQ0VOQ1JDKTtcclxuICAgICAgICAgICAgLy8gY29tcHJlc3NlZCBzaXplXHJcbiAgICAgICAgICAgIF9jb21wcmVzc2VkU2l6ZSA9IGRhdGEucmVhZFVJbnQzMkxFKENvbnN0YW50cy5DRU5TSVopO1xyXG4gICAgICAgICAgICAvLyB1bmNvbXByZXNzZWQgc2l6ZVxyXG4gICAgICAgICAgICBfc2l6ZSA9IGRhdGEucmVhZFVJbnQzMkxFKENvbnN0YW50cy5DRU5MRU4pO1xyXG4gICAgICAgICAgICAvLyBmaWxlbmFtZSBsZW5ndGhcclxuICAgICAgICAgICAgX2ZuYW1lTGVuID0gZGF0YS5yZWFkVUludDE2TEUoQ29uc3RhbnRzLkNFTk5BTSk7XHJcbiAgICAgICAgICAgIC8vIGV4dHJhIGZpZWxkIGxlbmd0aFxyXG4gICAgICAgICAgICBfZXh0cmFMZW4gPSBkYXRhLnJlYWRVSW50MTZMRShDb25zdGFudHMuQ0VORVhUKTtcclxuICAgICAgICAgICAgLy8gZmlsZSBjb21tZW50IGxlbmd0aFxyXG4gICAgICAgICAgICBfY29tTGVuID0gZGF0YS5yZWFkVUludDE2TEUoQ29uc3RhbnRzLkNFTkNPTSk7XHJcbiAgICAgICAgICAgIC8vIHZvbHVtZSBudW1iZXIgc3RhcnRcclxuICAgICAgICAgICAgX2Rpc2tTdGFydCA9IGRhdGEucmVhZFVJbnQxNkxFKENvbnN0YW50cy5DRU5EU0spO1xyXG4gICAgICAgICAgICAvLyBpbnRlcm5hbCBmaWxlIGF0dHJpYnV0ZXNcclxuICAgICAgICAgICAgX2luYXR0ciA9IGRhdGEucmVhZFVJbnQxNkxFKENvbnN0YW50cy5DRU5BVFQpO1xyXG4gICAgICAgICAgICAvLyBleHRlcm5hbCBmaWxlIGF0dHJpYnV0ZXNcclxuICAgICAgICAgICAgX2F0dHIgPSBkYXRhLnJlYWRVSW50MzJMRShDb25zdGFudHMuQ0VOQVRYKTtcclxuICAgICAgICAgICAgLy8gTE9DIGhlYWRlciBvZmZzZXRcclxuICAgICAgICAgICAgX29mZnNldCA9IGRhdGEucmVhZFVJbnQzMkxFKENvbnN0YW50cy5DRU5PRkYpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGRhdGFIZWFkZXJUb0JpbmFyeSA6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAvLyBMT0MgaGVhZGVyIHNpemUgKDMwIGJ5dGVzKVxyXG4gICAgICAgICAgICB2YXIgZGF0YSA9IEJ1ZmZlci5hbGxvYyhDb25zdGFudHMuTE9DSERSKTtcclxuICAgICAgICAgICAgLy8gXCJQS1xcMDAzXFwwMDRcIlxyXG4gICAgICAgICAgICBkYXRhLndyaXRlVUludDMyTEUoQ29uc3RhbnRzLkxPQ1NJRywgMCk7XHJcbiAgICAgICAgICAgIC8vIHZlcnNpb24gbmVlZGVkIHRvIGV4dHJhY3RcclxuICAgICAgICAgICAgZGF0YS53cml0ZVVJbnQxNkxFKF92ZXJzaW9uLCBDb25zdGFudHMuTE9DVkVSKTtcclxuICAgICAgICAgICAgLy8gZ2VuZXJhbCBwdXJwb3NlIGJpdCBmbGFnXHJcbiAgICAgICAgICAgIGRhdGEud3JpdGVVSW50MTZMRShfZmxhZ3MsIENvbnN0YW50cy5MT0NGTEcpO1xyXG4gICAgICAgICAgICAvLyBjb21wcmVzc2lvbiBtZXRob2RcclxuICAgICAgICAgICAgZGF0YS53cml0ZVVJbnQxNkxFKF9tZXRob2QsIENvbnN0YW50cy5MT0NIT1cpO1xyXG4gICAgICAgICAgICAvLyBtb2RpZmljYXRpb24gdGltZSAoMiBieXRlcyB0aW1lLCAyIGJ5dGVzIGRhdGUpXHJcbiAgICAgICAgICAgIGRhdGEud3JpdGVVSW50MzJMRShfdGltZSwgQ29uc3RhbnRzLkxPQ1RJTSk7XHJcbiAgICAgICAgICAgIC8vIHVuY29tcHJlc3NlZCBmaWxlIGNyYy0zMiB2YWx1ZVxyXG4gICAgICAgICAgICBkYXRhLndyaXRlVUludDMyTEUoX2NyYywgQ29uc3RhbnRzLkxPQ0NSQyk7XHJcbiAgICAgICAgICAgIC8vIGNvbXByZXNzZWQgc2l6ZVxyXG4gICAgICAgICAgICBkYXRhLndyaXRlVUludDMyTEUoX2NvbXByZXNzZWRTaXplLCBDb25zdGFudHMuTE9DU0laKTtcclxuICAgICAgICAgICAgLy8gdW5jb21wcmVzc2VkIHNpemVcclxuICAgICAgICAgICAgZGF0YS53cml0ZVVJbnQzMkxFKF9zaXplLCBDb25zdGFudHMuTE9DTEVOKTtcclxuICAgICAgICAgICAgLy8gZmlsZW5hbWUgbGVuZ3RoXHJcbiAgICAgICAgICAgIGRhdGEud3JpdGVVSW50MTZMRShfZm5hbWVMZW4sIENvbnN0YW50cy5MT0NOQU0pO1xyXG4gICAgICAgICAgICAvLyBleHRyYSBmaWVsZCBsZW5ndGhcclxuICAgICAgICAgICAgZGF0YS53cml0ZVVJbnQxNkxFKF9leHRyYUxlbiwgQ29uc3RhbnRzLkxPQ0VYVCk7XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGVudHJ5SGVhZGVyVG9CaW5hcnkgOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgLy8gQ0VOIGhlYWRlciBzaXplICg0NiBieXRlcylcclxuICAgICAgICAgICAgdmFyIGRhdGEgPSBCdWZmZXIuYWxsb2MoQ29uc3RhbnRzLkNFTkhEUiArIF9mbmFtZUxlbiArIF9leHRyYUxlbiArIF9jb21MZW4pO1xyXG4gICAgICAgICAgICAvLyBcIlBLXFwwMDFcXDAwMlwiXHJcbiAgICAgICAgICAgIGRhdGEud3JpdGVVSW50MzJMRShDb25zdGFudHMuQ0VOU0lHLCAwKTtcclxuICAgICAgICAgICAgLy8gdmVyc2lvbiBtYWRlIGJ5XHJcbiAgICAgICAgICAgIGRhdGEud3JpdGVVSW50MTZMRShfdmVyTWFkZSwgQ29uc3RhbnRzLkNFTlZFTSk7XHJcbiAgICAgICAgICAgIC8vIHZlcnNpb24gbmVlZGVkIHRvIGV4dHJhY3RcclxuICAgICAgICAgICAgZGF0YS53cml0ZVVJbnQxNkxFKF92ZXJzaW9uLCBDb25zdGFudHMuQ0VOVkVSKTtcclxuICAgICAgICAgICAgLy8gZW5jcnlwdCwgZGVjcnlwdCBmbGFnc1xyXG4gICAgICAgICAgICBkYXRhLndyaXRlVUludDE2TEUoX2ZsYWdzLCBDb25zdGFudHMuQ0VORkxHKTtcclxuICAgICAgICAgICAgLy8gY29tcHJlc3Npb24gbWV0aG9kXHJcbiAgICAgICAgICAgIGRhdGEud3JpdGVVSW50MTZMRShfbWV0aG9kLCBDb25zdGFudHMuQ0VOSE9XKTtcclxuICAgICAgICAgICAgLy8gbW9kaWZpY2F0aW9uIHRpbWUgKDIgYnl0ZXMgdGltZSwgMiBieXRlcyBkYXRlKVxyXG4gICAgICAgICAgICBkYXRhLndyaXRlVUludDMyTEUoX3RpbWUsIENvbnN0YW50cy5DRU5USU0pO1xyXG4gICAgICAgICAgICAvLyB1bmNvbXByZXNzZWQgZmlsZSBjcmMtMzIgdmFsdWVcclxuICAgICAgICAgICAgZGF0YS53cml0ZUludDMyTEUoX2NyYyAmIDB4RkZGRiwgQ29uc3RhbnRzLkNFTkNSQywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIC8vIGNvbXByZXNzZWQgc2l6ZVxyXG4gICAgICAgICAgICBkYXRhLndyaXRlVUludDMyTEUoX2NvbXByZXNzZWRTaXplLCBDb25zdGFudHMuQ0VOU0laKTtcclxuICAgICAgICAgICAgLy8gdW5jb21wcmVzc2VkIHNpemVcclxuICAgICAgICAgICAgZGF0YS53cml0ZVVJbnQzMkxFKF9zaXplLCBDb25zdGFudHMuQ0VOTEVOKTtcclxuICAgICAgICAgICAgLy8gZmlsZW5hbWUgbGVuZ3RoXHJcbiAgICAgICAgICAgIGRhdGEud3JpdGVVSW50MTZMRShfZm5hbWVMZW4sIENvbnN0YW50cy5DRU5OQU0pO1xyXG4gICAgICAgICAgICAvLyBleHRyYSBmaWVsZCBsZW5ndGhcclxuICAgICAgICAgICAgZGF0YS53cml0ZVVJbnQxNkxFKF9leHRyYUxlbiwgQ29uc3RhbnRzLkNFTkVYVCk7XHJcbiAgICAgICAgICAgIC8vIGZpbGUgY29tbWVudCBsZW5ndGhcclxuICAgICAgICAgICAgZGF0YS53cml0ZVVJbnQxNkxFKF9jb21MZW4sIENvbnN0YW50cy5DRU5DT00pO1xyXG4gICAgICAgICAgICAvLyB2b2x1bWUgbnVtYmVyIHN0YXJ0XHJcbiAgICAgICAgICAgIGRhdGEud3JpdGVVSW50MTZMRShfZGlza1N0YXJ0LCBDb25zdGFudHMuQ0VORFNLKTtcclxuICAgICAgICAgICAgLy8gaW50ZXJuYWwgZmlsZSBhdHRyaWJ1dGVzXHJcbiAgICAgICAgICAgIGRhdGEud3JpdGVVSW50MTZMRShfaW5hdHRyLCBDb25zdGFudHMuQ0VOQVRUKTtcclxuICAgICAgICAgICAgLy8gZXh0ZXJuYWwgZmlsZSBhdHRyaWJ1dGVzXHJcbiAgICAgICAgICAgIGRhdGEud3JpdGVVSW50MzJMRShfYXR0ciwgQ29uc3RhbnRzLkNFTkFUWCk7XHJcbiAgICAgICAgICAgIC8vIExPQyBoZWFkZXIgb2Zmc2V0XHJcbiAgICAgICAgICAgIGRhdGEud3JpdGVVSW50MzJMRShfb2Zmc2V0LCBDb25zdGFudHMuQ0VOT0ZGKTtcclxuICAgICAgICAgICAgLy8gZmlsbCBhbGwgd2l0aFxyXG4gICAgICAgICAgICBkYXRhLmZpbGwoMHgwMCwgQ29uc3RhbnRzLkNFTkhEUik7XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHRvU3RyaW5nIDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAne1xcbicgK1xyXG4gICAgICAgICAgICAgICAgJ1xcdFwibWFkZVwiIDogJyArIF92ZXJNYWRlICsgXCIsXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgJ1xcdFwidmVyc2lvblwiIDogJyArIF92ZXJzaW9uICsgXCIsXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgJ1xcdFwiZmxhZ3NcIiA6ICcgKyBfZmxhZ3MgKyBcIixcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAnXFx0XCJtZXRob2RcIiA6ICcgKyBVdGlscy5tZXRob2RUb1N0cmluZyhfbWV0aG9kKSArIFwiLFxcblwiICtcclxuICAgICAgICAgICAgICAgICdcXHRcInRpbWVcIiA6ICcgKyB0aGlzLnRpbWUgKyBcIixcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAnXFx0XCJjcmNcIiA6IDB4JyArIF9jcmMudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCkgKyBcIixcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAnXFx0XCJjb21wcmVzc2VkU2l6ZVwiIDogJyArIF9jb21wcmVzc2VkU2l6ZSArIFwiIGJ5dGVzLFxcblwiICtcclxuICAgICAgICAgICAgICAgICdcXHRcInNpemVcIiA6ICcgKyBfc2l6ZSArIFwiIGJ5dGVzLFxcblwiICtcclxuICAgICAgICAgICAgICAgICdcXHRcImZpbGVOYW1lTGVuZ3RoXCIgOiAnICsgX2ZuYW1lTGVuICsgXCIsXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgJ1xcdFwiZXh0cmFMZW5ndGhcIiA6ICcgKyBfZXh0cmFMZW4gKyBcIiBieXRlcyxcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAnXFx0XCJjb21tZW50TGVuZ3RoXCIgOiAnICsgX2NvbUxlbiArIFwiIGJ5dGVzLFxcblwiICtcclxuICAgICAgICAgICAgICAgICdcXHRcImRpc2tOdW1TdGFydFwiIDogJyArIF9kaXNrU3RhcnQgKyBcIixcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAnXFx0XCJpbkF0dHJcIiA6ICcgKyBfaW5hdHRyICsgXCIsXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgJ1xcdFwiYXR0clwiIDogJyArIF9hdHRyICsgXCIsXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgJ1xcdFwib2Zmc2V0XCIgOiAnICsgX29mZnNldCArIFwiLFxcblwiICtcclxuICAgICAgICAgICAgICAgICdcXHRcImVudHJ5SGVhZGVyU2l6ZVwiIDogJyArIChDb25zdGFudHMuQ0VOSERSICsgX2ZuYW1lTGVuICsgX2V4dHJhTGVuICsgX2NvbUxlbikgKyBcIiBieXRlc1xcblwiICtcclxuICAgICAgICAgICAgICAgICd9JztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcbiIsImV4cG9ydHMuRW50cnlIZWFkZXIgPSByZXF1aXJlKFwiLi9lbnRyeUhlYWRlclwiKTtcclxuZXhwb3J0cy5NYWluSGVhZGVyID0gcmVxdWlyZShcIi4vbWFpbkhlYWRlclwiKTtcclxuIiwidmFyIFV0aWxzID0gcmVxdWlyZShcIi4uL3V0aWxcIiksXHJcbiAgICBDb25zdGFudHMgPSBVdGlscy5Db25zdGFudHM7XHJcblxyXG4vKiBUaGUgZW50cmllcyBpbiB0aGUgZW5kIG9mIGNlbnRyYWwgZGlyZWN0b3J5ICovXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIF92b2x1bWVFbnRyaWVzID0gMCxcclxuICAgICAgICBfdG90YWxFbnRyaWVzID0gMCxcclxuICAgICAgICBfc2l6ZSA9IDAsXHJcbiAgICAgICAgX29mZnNldCA9IDAsXHJcbiAgICAgICAgX2NvbW1lbnRMZW5ndGggPSAwO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZ2V0IGRpc2tFbnRyaWVzICgpIHsgcmV0dXJuIF92b2x1bWVFbnRyaWVzIH0sXHJcbiAgICAgICAgc2V0IGRpc2tFbnRyaWVzICgvKk51bWJlciovdmFsKSB7IF92b2x1bWVFbnRyaWVzID0gX3RvdGFsRW50cmllcyA9IHZhbDsgfSxcclxuXHJcbiAgICAgICAgZ2V0IHRvdGFsRW50cmllcyAoKSB7IHJldHVybiBfdG90YWxFbnRyaWVzIH0sXHJcbiAgICAgICAgc2V0IHRvdGFsRW50cmllcyAoLypOdW1iZXIqL3ZhbCkgeyBfdG90YWxFbnRyaWVzID0gX3ZvbHVtZUVudHJpZXMgPSB2YWw7IH0sXHJcblxyXG4gICAgICAgIGdldCBzaXplICgpIHsgcmV0dXJuIF9zaXplIH0sXHJcbiAgICAgICAgc2V0IHNpemUgKC8qTnVtYmVyKi92YWwpIHsgX3NpemUgPSB2YWw7IH0sXHJcblxyXG4gICAgICAgIGdldCBvZmZzZXQgKCkgeyByZXR1cm4gX29mZnNldCB9LFxyXG4gICAgICAgIHNldCBvZmZzZXQgKC8qTnVtYmVyKi92YWwpIHsgX29mZnNldCA9IHZhbDsgfSxcclxuXHJcbiAgICAgICAgZ2V0IGNvbW1lbnRMZW5ndGggKCkgeyByZXR1cm4gX2NvbW1lbnRMZW5ndGggfSxcclxuICAgICAgICBzZXQgY29tbWVudExlbmd0aCAoLypOdW1iZXIqL3ZhbCkgeyBfY29tbWVudExlbmd0aCA9IHZhbDsgfSxcclxuXHJcbiAgICAgICAgZ2V0IG1haW5IZWFkZXJTaXplICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIENvbnN0YW50cy5FTkRIRFIgKyBfY29tbWVudExlbmd0aDtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBsb2FkRnJvbUJpbmFyeSA6IGZ1bmN0aW9uKC8qQnVmZmVyKi9kYXRhKSB7XHJcbiAgICAgICAgICAgIC8vIGRhdGEgc2hvdWxkIGJlIDIyIGJ5dGVzIGFuZCBzdGFydCB3aXRoIFwiUEsgMDUgMDZcIlxyXG4gICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggIT09IENvbnN0YW50cy5FTkRIRFIgfHwgZGF0YS5yZWFkVUludDMyTEUoMCkgIT09IENvbnN0YW50cy5FTkRTSUcpXHJcbiAgICAgICAgICAgICAgICB0aHJvdyBVdGlscy5FcnJvcnMuSU5WQUxJRF9FTkQ7XHJcblxyXG4gICAgICAgICAgICAvLyBudW1iZXIgb2YgZW50cmllcyBvbiB0aGlzIHZvbHVtZVxyXG4gICAgICAgICAgICBfdm9sdW1lRW50cmllcyA9IGRhdGEucmVhZFVJbnQxNkxFKENvbnN0YW50cy5FTkRTVUIpO1xyXG4gICAgICAgICAgICAvLyB0b3RhbCBudW1iZXIgb2YgZW50cmllc1xyXG4gICAgICAgICAgICBfdG90YWxFbnRyaWVzID0gZGF0YS5yZWFkVUludDE2TEUoQ29uc3RhbnRzLkVORFRPVCk7XHJcbiAgICAgICAgICAgIC8vIGNlbnRyYWwgZGlyZWN0b3J5IHNpemUgaW4gYnl0ZXNcclxuICAgICAgICAgICAgX3NpemUgPSBkYXRhLnJlYWRVSW50MzJMRShDb25zdGFudHMuRU5EU0laKTtcclxuICAgICAgICAgICAgLy8gb2Zmc2V0IG9mIGZpcnN0IENFTiBoZWFkZXJcclxuICAgICAgICAgICAgX29mZnNldCA9IGRhdGEucmVhZFVJbnQzMkxFKENvbnN0YW50cy5FTkRPRkYpO1xyXG4gICAgICAgICAgICAvLyB6aXAgZmlsZSBjb21tZW50IGxlbmd0aFxyXG4gICAgICAgICAgICBfY29tbWVudExlbmd0aCA9IGRhdGEucmVhZFVJbnQxNkxFKENvbnN0YW50cy5FTkRDT00pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHRvQmluYXJ5IDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgdmFyIGIgPSBCdWZmZXIuYWxsb2MoQ29uc3RhbnRzLkVOREhEUiArIF9jb21tZW50TGVuZ3RoKTtcclxuICAgICAgICAgICAgLy8gXCJQSyAwNSAwNlwiIHNpZ25hdHVyZVxyXG4gICAgICAgICAgICBiLndyaXRlVUludDMyTEUoQ29uc3RhbnRzLkVORFNJRywgMCk7XHJcbiAgICAgICAgICAgIGIud3JpdGVVSW50MzJMRSgwLCA0KTtcclxuICAgICAgICAgICAgLy8gbnVtYmVyIG9mIGVudHJpZXMgb24gdGhpcyB2b2x1bWVcclxuICAgICAgICAgICAgYi53cml0ZVVJbnQxNkxFKF92b2x1bWVFbnRyaWVzLCBDb25zdGFudHMuRU5EU1VCKTtcclxuICAgICAgICAgICAgLy8gdG90YWwgbnVtYmVyIG9mIGVudHJpZXNcclxuICAgICAgICAgICAgYi53cml0ZVVJbnQxNkxFKF90b3RhbEVudHJpZXMsIENvbnN0YW50cy5FTkRUT1QpO1xyXG4gICAgICAgICAgICAvLyBjZW50cmFsIGRpcmVjdG9yeSBzaXplIGluIGJ5dGVzXHJcbiAgICAgICAgICAgIGIud3JpdGVVSW50MzJMRShfc2l6ZSwgQ29uc3RhbnRzLkVORFNJWik7XHJcbiAgICAgICAgICAgIC8vIG9mZnNldCBvZiBmaXJzdCBDRU4gaGVhZGVyXHJcbiAgICAgICAgICAgIGIud3JpdGVVSW50MzJMRShfb2Zmc2V0LCBDb25zdGFudHMuRU5ET0ZGKTtcclxuICAgICAgICAgICAgLy8gemlwIGZpbGUgY29tbWVudCBsZW5ndGhcclxuICAgICAgICAgICAgYi53cml0ZVVJbnQxNkxFKF9jb21tZW50TGVuZ3RoLCBDb25zdGFudHMuRU5EQ09NKTtcclxuICAgICAgICAgICAgLy8gZmlsbCBjb21tZW50IG1lbW9yeSB3aXRoIHNwYWNlcyBzbyBubyBnYXJiYWdlIGlzIGxlZnQgdGhlcmVcclxuICAgICAgICAgICAgYi5maWxsKFwiIFwiLCBDb25zdGFudHMuRU5ESERSKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBiO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHRvU3RyaW5nIDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAne1xcbicgK1xyXG4gICAgICAgICAgICAgICAgJ1xcdFwiZGlza0VudHJpZXNcIiA6ICcgKyBfdm9sdW1lRW50cmllcyArIFwiLFxcblwiICtcclxuICAgICAgICAgICAgICAgICdcXHRcInRvdGFsRW50cmllc1wiIDogJyArIF90b3RhbEVudHJpZXMgKyBcIixcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAnXFx0XCJzaXplXCIgOiAnICsgX3NpemUgKyBcIiBieXRlcyxcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAnXFx0XCJvZmZzZXRcIiA6IDB4JyArIF9vZmZzZXQudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCkgKyBcIixcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAnXFx0XCJjb21tZW50TGVuZ3RoXCIgOiAweCcgKyBfY29tbWVudExlbmd0aCArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAnfSc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKC8qQnVmZmVyKi9pbmJ1Zikge1xyXG5cclxuICB2YXIgemxpYiA9IHJlcXVpcmUoXCJ6bGliXCIpO1xyXG4gIFxyXG4gIHZhciBvcHRzID0ge2NodW5rU2l6ZTogKHBhcnNlSW50KGluYnVmLmxlbmd0aCAvIDEwMjQpICsgMSkgKiAxMDI0fTtcclxuICBcclxuICByZXR1cm4ge1xyXG4gICAgZGVmbGF0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gemxpYi5kZWZsYXRlUmF3U3luYyhpbmJ1Ziwgb3B0cyk7XHJcbiAgICB9LFxyXG5cclxuICAgIGRlZmxhdGVBc3luYzogZnVuY3Rpb24gKC8qRnVuY3Rpb24qL2NhbGxiYWNrKSB7XHJcbiAgICAgIHZhciB0bXAgPSB6bGliLmNyZWF0ZURlZmxhdGVSYXcob3B0cyksIHBhcnRzID0gW10sIHRvdGFsID0gMDtcclxuICAgICAgdG1wLm9uKCdkYXRhJywgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICBwYXJ0cy5wdXNoKGRhdGEpO1xyXG4gICAgICAgIHRvdGFsICs9IGRhdGEubGVuZ3RoO1xyXG4gICAgICB9KTtcclxuICAgICAgdG1wLm9uKCdlbmQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGJ1ZiA9IEJ1ZmZlci5hbGxvYyh0b3RhbCksIHdyaXR0ZW4gPSAwO1xyXG4gICAgICAgIGJ1Zi5maWxsKDApO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgIHZhciBwYXJ0ID0gcGFydHNbaV07XHJcbiAgICAgICAgICBwYXJ0LmNvcHkoYnVmLCB3cml0dGVuKTtcclxuICAgICAgICAgIHdyaXR0ZW4gKz0gcGFydC5sZW5ndGg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKGJ1Zik7XHJcbiAgICAgIH0pO1xyXG4gICAgICB0bXAuZW5kKGluYnVmKTtcclxuICAgIH1cclxuICB9XHJcbn07XHJcbiIsImV4cG9ydHMuRGVmbGF0ZXIgPSByZXF1aXJlKFwiLi9kZWZsYXRlclwiKTtcclxuZXhwb3J0cy5JbmZsYXRlciA9IHJlcXVpcmUoXCIuL2luZmxhdGVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKC8qQnVmZmVyKi9pbmJ1Zikge1xyXG5cclxuICB2YXIgemxpYiA9IHJlcXVpcmUoXCJ6bGliXCIpO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgaW5mbGF0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gemxpYi5pbmZsYXRlUmF3U3luYyhpbmJ1Zik7XHJcbiAgICB9LFxyXG5cclxuICAgIGluZmxhdGVBc3luYzogZnVuY3Rpb24gKC8qRnVuY3Rpb24qL2NhbGxiYWNrKSB7XHJcbiAgICAgIHZhciB0bXAgPSB6bGliLmNyZWF0ZUluZmxhdGVSYXcoKSwgcGFydHMgPSBbXSwgdG90YWwgPSAwO1xyXG4gICAgICB0bXAub24oJ2RhdGEnLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIHBhcnRzLnB1c2goZGF0YSk7XHJcbiAgICAgICAgdG90YWwgKz0gZGF0YS5sZW5ndGg7XHJcbiAgICAgIH0pO1xyXG4gICAgICB0bXAub24oJ2VuZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgYnVmID0gQnVmZmVyLmFsbG9jKHRvdGFsKSwgd3JpdHRlbiA9IDA7XHJcbiAgICAgICAgYnVmLmZpbGwoMCk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgdmFyIHBhcnQgPSBwYXJ0c1tpXTtcclxuICAgICAgICAgIHBhcnQuY29weShidWYsIHdyaXR0ZW4pO1xyXG4gICAgICAgICAgd3JpdHRlbiArPSBwYXJ0Lmxlbmd0aDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soYnVmKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHRtcC5lbmQoaW5idWYpO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICAvKiBUaGUgbG9jYWwgZmlsZSBoZWFkZXIgKi9cclxuICAgIExPQ0hEUiAgICAgICAgICAgOiAzMCwgLy8gTE9DIGhlYWRlciBzaXplXHJcbiAgICBMT0NTSUcgICAgICAgICAgIDogMHgwNDAzNGI1MCwgLy8gXCJQS1xcMDAzXFwwMDRcIlxyXG4gICAgTE9DVkVSICAgICAgICAgICA6IDQsXHQvLyB2ZXJzaW9uIG5lZWRlZCB0byBleHRyYWN0XHJcbiAgICBMT0NGTEcgICAgICAgICAgIDogNiwgLy8gZ2VuZXJhbCBwdXJwb3NlIGJpdCBmbGFnXHJcbiAgICBMT0NIT1cgICAgICAgICAgIDogOCwgLy8gY29tcHJlc3Npb24gbWV0aG9kXHJcbiAgICBMT0NUSU0gICAgICAgICAgIDogMTAsIC8vIG1vZGlmaWNhdGlvbiB0aW1lICgyIGJ5dGVzIHRpbWUsIDIgYnl0ZXMgZGF0ZSlcclxuICAgIExPQ0NSQyAgICAgICAgICAgOiAxNCwgLy8gdW5jb21wcmVzc2VkIGZpbGUgY3JjLTMyIHZhbHVlXHJcbiAgICBMT0NTSVogICAgICAgICAgIDogMTgsIC8vIGNvbXByZXNzZWQgc2l6ZVxyXG4gICAgTE9DTEVOICAgICAgICAgICA6IDIyLCAvLyB1bmNvbXByZXNzZWQgc2l6ZVxyXG4gICAgTE9DTkFNICAgICAgICAgICA6IDI2LCAvLyBmaWxlbmFtZSBsZW5ndGhcclxuICAgIExPQ0VYVCAgICAgICAgICAgOiAyOCwgLy8gZXh0cmEgZmllbGQgbGVuZ3RoXHJcblxyXG4gICAgLyogVGhlIERhdGEgZGVzY3JpcHRvciAqL1xyXG4gICAgRVhUU0lHICAgICAgICAgICA6IDB4MDgwNzRiNTAsIC8vIFwiUEtcXDAwN1xcMDA4XCJcclxuICAgIEVYVEhEUiAgICAgICAgICAgOiAxNiwgLy8gRVhUIGhlYWRlciBzaXplXHJcbiAgICBFWFRDUkMgICAgICAgICAgIDogNCwgLy8gdW5jb21wcmVzc2VkIGZpbGUgY3JjLTMyIHZhbHVlXHJcbiAgICBFWFRTSVogICAgICAgICAgIDogOCwgLy8gY29tcHJlc3NlZCBzaXplXHJcbiAgICBFWFRMRU4gICAgICAgICAgIDogMTIsIC8vIHVuY29tcHJlc3NlZCBzaXplXHJcblxyXG4gICAgLyogVGhlIGNlbnRyYWwgZGlyZWN0b3J5IGZpbGUgaGVhZGVyICovXHJcbiAgICBDRU5IRFIgICAgICAgICAgIDogNDYsIC8vIENFTiBoZWFkZXIgc2l6ZVxyXG4gICAgQ0VOU0lHICAgICAgICAgICA6IDB4MDIwMTRiNTAsIC8vIFwiUEtcXDAwMVxcMDAyXCJcclxuICAgIENFTlZFTSAgICAgICAgICAgOiA0LCAvLyB2ZXJzaW9uIG1hZGUgYnlcclxuICAgIENFTlZFUiAgICAgICAgICAgOiA2LCAvLyB2ZXJzaW9uIG5lZWRlZCB0byBleHRyYWN0XHJcbiAgICBDRU5GTEcgICAgICAgICAgIDogOCwgLy8gZW5jcnlwdCwgZGVjcnlwdCBmbGFnc1xyXG4gICAgQ0VOSE9XICAgICAgICAgICA6IDEwLCAvLyBjb21wcmVzc2lvbiBtZXRob2RcclxuICAgIENFTlRJTSAgICAgICAgICAgOiAxMiwgLy8gbW9kaWZpY2F0aW9uIHRpbWUgKDIgYnl0ZXMgdGltZSwgMiBieXRlcyBkYXRlKVxyXG4gICAgQ0VOQ1JDICAgICAgICAgICA6IDE2LCAvLyB1bmNvbXByZXNzZWQgZmlsZSBjcmMtMzIgdmFsdWVcclxuICAgIENFTlNJWiAgICAgICAgICAgOiAyMCwgLy8gY29tcHJlc3NlZCBzaXplXHJcbiAgICBDRU5MRU4gICAgICAgICAgIDogMjQsIC8vIHVuY29tcHJlc3NlZCBzaXplXHJcbiAgICBDRU5OQU0gICAgICAgICAgIDogMjgsIC8vIGZpbGVuYW1lIGxlbmd0aFxyXG4gICAgQ0VORVhUICAgICAgICAgICA6IDMwLCAvLyBleHRyYSBmaWVsZCBsZW5ndGhcclxuICAgIENFTkNPTSAgICAgICAgICAgOiAzMiwgLy8gZmlsZSBjb21tZW50IGxlbmd0aFxyXG4gICAgQ0VORFNLICAgICAgICAgICA6IDM0LCAvLyB2b2x1bWUgbnVtYmVyIHN0YXJ0XHJcbiAgICBDRU5BVFQgICAgICAgICAgIDogMzYsIC8vIGludGVybmFsIGZpbGUgYXR0cmlidXRlc1xyXG4gICAgQ0VOQVRYICAgICAgICAgICA6IDM4LCAvLyBleHRlcm5hbCBmaWxlIGF0dHJpYnV0ZXMgKGhvc3Qgc3lzdGVtIGRlcGVuZGVudClcclxuICAgIENFTk9GRiAgICAgICAgICAgOiA0MiwgLy8gTE9DIGhlYWRlciBvZmZzZXRcclxuXHJcbiAgICAvKiBUaGUgZW50cmllcyBpbiB0aGUgZW5kIG9mIGNlbnRyYWwgZGlyZWN0b3J5ICovXHJcbiAgICBFTkRIRFIgICAgICAgICAgIDogMjIsIC8vIEVORCBoZWFkZXIgc2l6ZVxyXG4gICAgRU5EU0lHICAgICAgICAgICA6IDB4MDYwNTRiNTAsIC8vIFwiUEtcXDAwNVxcMDA2XCJcclxuICAgIEVORFNVQiAgICAgICAgICAgOiA4LCAvLyBudW1iZXIgb2YgZW50cmllcyBvbiB0aGlzIGRpc2tcclxuICAgIEVORFRPVCAgICAgICAgICAgOiAxMCwgLy8gdG90YWwgbnVtYmVyIG9mIGVudHJpZXNcclxuICAgIEVORFNJWiAgICAgICAgICAgOiAxMiwgLy8gY2VudHJhbCBkaXJlY3Rvcnkgc2l6ZSBpbiBieXRlc1xyXG4gICAgRU5ET0ZGICAgICAgICAgICA6IDE2LCAvLyBvZmZzZXQgb2YgZmlyc3QgQ0VOIGhlYWRlclxyXG4gICAgRU5EQ09NICAgICAgICAgICA6IDIwLCAvLyB6aXAgZmlsZSBjb21tZW50IGxlbmd0aFxyXG5cclxuICAgIC8qIENvbXByZXNzaW9uIG1ldGhvZHMgKi9cclxuICAgIFNUT1JFRCAgICAgICAgICAgOiAwLCAvLyBubyBjb21wcmVzc2lvblxyXG4gICAgU0hSVU5LICAgICAgICAgICA6IDEsIC8vIHNocnVua1xyXG4gICAgUkVEVUNFRDEgICAgICAgICA6IDIsIC8vIHJlZHVjZWQgd2l0aCBjb21wcmVzc2lvbiBmYWN0b3IgMVxyXG4gICAgUkVEVUNFRDIgICAgICAgICA6IDMsIC8vIHJlZHVjZWQgd2l0aCBjb21wcmVzc2lvbiBmYWN0b3IgMlxyXG4gICAgUkVEVUNFRDMgICAgICAgICA6IDQsIC8vIHJlZHVjZWQgd2l0aCBjb21wcmVzc2lvbiBmYWN0b3IgM1xyXG4gICAgUkVEVUNFRDQgICAgICAgICA6IDUsIC8vIHJlZHVjZWQgd2l0aCBjb21wcmVzc2lvbiBmYWN0b3IgNFxyXG4gICAgSU1QTE9ERUQgICAgICAgICA6IDYsIC8vIGltcGxvZGVkXHJcbiAgICAvLyA3IHJlc2VydmVkXHJcbiAgICBERUZMQVRFRCAgICAgICAgIDogOCwgLy8gZGVmbGF0ZWRcclxuICAgIEVOSEFOQ0VEX0RFRkxBVEVEOiA5LCAvLyBlbmhhbmNlZCBkZWZsYXRlZFxyXG4gICAgUEtXQVJFICAgICAgICAgICA6IDEwLC8vIFBLV2FyZSBEQ0wgaW1wbG9kZWRcclxuICAgIC8vIDExIHJlc2VydmVkXHJcbiAgICBCWklQMiAgICAgICAgICAgIDogMTIsIC8vICBjb21wcmVzc2VkIHVzaW5nIEJaSVAyXHJcbiAgICAvLyAxMyByZXNlcnZlZFxyXG4gICAgTFpNQSAgICAgICAgICAgICA6IDE0LCAvLyBMWk1BXHJcbiAgICAvLyAxNS0xNyByZXNlcnZlZFxyXG4gICAgSUJNX1RFUlNFICAgICAgICA6IDE4LCAvLyBjb21wcmVzc2VkIHVzaW5nIElCTSBURVJTRVxyXG4gICAgSUJNX0xaNzcgICAgICAgICA6IDE5LCAvL0lCTSBMWjc3IHpcclxuXHJcbiAgICAvKiBHZW5lcmFsIHB1cnBvc2UgYml0IGZsYWcgKi9cclxuICAgIEZMR19FTkMgICAgICAgICAgOiAwLCAgLy8gZW5jcmlwdGVkIGZpbGVcclxuICAgIEZMR19DT01QMSAgICAgICAgOiAxLCAgLy8gY29tcHJlc3Npb24gb3B0aW9uXHJcbiAgICBGTEdfQ09NUDIgICAgICAgIDogMiwgIC8vIGNvbXByZXNzaW9uIG9wdGlvblxyXG4gICAgRkxHX0RFU0MgICAgICAgICA6IDQsICAvLyBkYXRhIGRlc2NyaXB0b3JcclxuICAgIEZMR19FTkggICAgICAgICAgOiA4LCAgLy8gZW5oYW5jZWQgZGVmbGF0aW9uXHJcbiAgICBGTEdfU1RSICAgICAgICAgIDogMTYsIC8vIHN0cm9uZyBlbmNyeXB0aW9uXHJcbiAgICBGTEdfTE5HICAgICAgICAgIDogMTAyNCwgLy8gbGFuZ3VhZ2UgZW5jb2RpbmdcclxuICAgIEZMR19NU0sgICAgICAgICAgOiA0MDk2LCAvLyBtYXNrIGhlYWRlciB2YWx1ZXNcclxuXHJcbiAgICAvKiBMb2FkIHR5cGUgKi9cclxuICAgIEZJTEUgICAgICAgICAgICAgOiAwLFxyXG4gICAgQlVGRkVSICAgICAgICAgICA6IDEsXHJcbiAgICBOT05FICAgICAgICAgICAgIDogMixcclxuXHJcbiAgICAvKiA0LjUgRXh0ZW5zaWJsZSBkYXRhIGZpZWxkcyAqL1xyXG4gICAgRUZfSUQgICAgICAgICAgICA6IDAsXHJcbiAgICBFRl9TSVpFICAgICAgICAgIDogMixcclxuXHJcbiAgICAvKiBIZWFkZXIgSURzICovXHJcbiAgICBJRF9aSVA2NCAgICAgICAgIDogMHgwMDAxLFxyXG4gICAgSURfQVZJTkZPICAgICAgICA6IDB4MDAwNyxcclxuICAgIElEX1BGUyAgICAgICAgICAgOiAweDAwMDgsXHJcbiAgICBJRF9PUzIgICAgICAgICAgIDogMHgwMDA5LFxyXG4gICAgSURfTlRGUyAgICAgICAgICA6IDB4MDAwYSxcclxuICAgIElEX09QRU5WTVMgICAgICAgOiAweDAwMGMsXHJcbiAgICBJRF9VTklYICAgICAgICAgIDogMHgwMDBkLFxyXG4gICAgSURfRk9SSyAgICAgICAgICA6IDB4MDAwZSxcclxuICAgIElEX1BBVENIICAgICAgICAgOiAweDAwMGYsXHJcbiAgICBJRF9YNTA5X1BLQ1M3ICAgIDogMHgwMDE0LFxyXG4gICAgSURfWDUwOV9DRVJUSURfRiA6IDB4MDAxNSxcclxuICAgIElEX1g1MDlfQ0VSVElEX0MgOiAweDAwMTYsXHJcbiAgICBJRF9TVFJPTkdFTkMgICAgIDogMHgwMDE3LFxyXG4gICAgSURfUkVDT1JEX01HVCAgICA6IDB4MDAxOCxcclxuICAgIElEX1g1MDlfUEtDUzdfUkwgOiAweDAwMTksXHJcbiAgICBJRF9JQk0xICAgICAgICAgIDogMHgwMDY1LFxyXG4gICAgSURfSUJNMiAgICAgICAgICA6IDB4MDA2NixcclxuICAgIElEX1BPU1pJUCAgICAgICAgOiAweDQ2OTAsXHJcblxyXG4gICAgRUZfWklQNjRfT1JfMzIgICA6IDB4ZmZmZmZmZmYsXHJcbiAgICBFRl9aSVA2NF9PUl8xNiAgIDogMHhmZmZmLFxyXG4gICAgRUZfWklQNjRfU1VOQ09NUCA6IDAsXHJcbiAgICBFRl9aSVA2NF9TQ09NUCAgIDogOCxcclxuICAgIEVGX1pJUDY0X1JITyAgICAgOiAxNixcclxuICAgIEVGX1pJUDY0X0RTTiAgICAgOiAyNFxyXG59O1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIC8qIEhlYWRlciBlcnJvciBtZXNzYWdlcyAqL1xyXG4gICAgXCJJTlZBTElEX0xPQ1wiIDogXCJJbnZhbGlkIExPQyBoZWFkZXIgKGJhZCBzaWduYXR1cmUpXCIsXHJcbiAgICBcIklOVkFMSURfQ0VOXCIgOiBcIkludmFsaWQgQ0VOIGhlYWRlciAoYmFkIHNpZ25hdHVyZSlcIixcclxuICAgIFwiSU5WQUxJRF9FTkRcIiA6IFwiSW52YWxpZCBFTkQgaGVhZGVyIChiYWQgc2lnbmF0dXJlKVwiLFxyXG5cclxuICAgIC8qIFppcEVudHJ5IGVycm9yIG1lc3NhZ2VzKi9cclxuICAgIFwiTk9fREFUQVwiIDogXCJOb3RoaW5nIHRvIGRlY29tcHJlc3NcIixcclxuICAgIFwiQkFEX0NSQ1wiIDogXCJDUkMzMiBjaGVja3N1bSBmYWlsZWRcIixcclxuICAgIFwiRklMRV9JTl9USEVfV0FZXCIgOiBcIlRoZXJlIGlzIGEgZmlsZSBpbiB0aGUgd2F5OiAlc1wiLFxyXG4gICAgXCJVTktOT1dOX01FVEhPRFwiIDogXCJJbnZhbGlkL3Vuc3VwcG9ydGVkIGNvbXByZXNzaW9uIG1ldGhvZFwiLFxyXG5cclxuICAgIC8qIEluZmxhdGVyIGVycm9yIG1lc3NhZ2VzICovXHJcbiAgICBcIkFWQUlMX0RBVEFcIiA6IFwiaW5mbGF0ZTo6QXZhaWxhYmxlIGluZmxhdGUgZGF0YSBkaWQgbm90IHRlcm1pbmF0ZVwiLFxyXG4gICAgXCJJTlZBTElEX0RJU1RBTkNFXCIgOiBcImluZmxhdGU6OkludmFsaWQgbGl0ZXJhbC9sZW5ndGggb3IgZGlzdGFuY2UgY29kZSBpbiBmaXhlZCBvciBkeW5hbWljIGJsb2NrXCIsXHJcbiAgICBcIlRPX01BTllfQ09ERVNcIiA6IFwiaW5mbGF0ZTo6RHluYW1pYyBibG9jayBjb2RlIGRlc2NyaXB0aW9uOiB0b28gbWFueSBsZW5ndGggb3IgZGlzdGFuY2UgY29kZXNcIixcclxuICAgIFwiSU5WQUxJRF9SRVBFQVRfTEVOXCIgOiBcImluZmxhdGU6OkR5bmFtaWMgYmxvY2sgY29kZSBkZXNjcmlwdGlvbjogcmVwZWF0IG1vcmUgdGhhbiBzcGVjaWZpZWQgbGVuZ3Roc1wiLFxyXG4gICAgXCJJTlZBTElEX1JFUEVBVF9GSVJTVFwiIDogXCJpbmZsYXRlOjpEeW5hbWljIGJsb2NrIGNvZGUgZGVzY3JpcHRpb246IHJlcGVhdCBsZW5ndGhzIHdpdGggbm8gZmlyc3QgbGVuZ3RoXCIsXHJcbiAgICBcIklOQ09NUExFVEVfQ09ERVNcIiA6IFwiaW5mbGF0ZTo6RHluYW1pYyBibG9jayBjb2RlIGRlc2NyaXB0aW9uOiBjb2RlIGxlbmd0aHMgY29kZXMgaW5jb21wbGV0ZVwiLFxyXG4gICAgXCJJTlZBTElEX0RZTl9ESVNUQU5DRVwiOiBcImluZmxhdGU6OkR5bmFtaWMgYmxvY2sgY29kZSBkZXNjcmlwdGlvbjogaW52YWxpZCBkaXN0YW5jZSBjb2RlIGxlbmd0aHNcIixcclxuICAgIFwiSU5WQUxJRF9DT0RFU19MRU5cIjogXCJpbmZsYXRlOjpEeW5hbWljIGJsb2NrIGNvZGUgZGVzY3JpcHRpb246IGludmFsaWQgbGl0ZXJhbC9sZW5ndGggY29kZSBsZW5ndGhzXCIsXHJcbiAgICBcIklOVkFMSURfU1RPUkVfQkxPQ0tcIiA6IFwiaW5mbGF0ZTo6U3RvcmVkIGJsb2NrIGxlbmd0aCBkaWQgbm90IG1hdGNoIG9uZSdzIGNvbXBsZW1lbnRcIixcclxuICAgIFwiSU5WQUxJRF9CTE9DS19UWVBFXCIgOiBcImluZmxhdGU6OkludmFsaWQgYmxvY2sgdHlwZSAodHlwZSA9PSAzKVwiLFxyXG5cclxuICAgIC8qIEFETS1aSVAgZXJyb3IgbWVzc2FnZXMgKi9cclxuICAgIFwiQ0FOVF9FWFRSQUNUX0ZJTEVcIiA6IFwiQ291bGQgbm90IGV4dHJhY3QgdGhlIGZpbGVcIixcclxuICAgIFwiQ0FOVF9PVkVSUklERVwiIDogXCJUYXJnZXQgZmlsZSBhbHJlYWR5IGV4aXN0c1wiLFxyXG4gICAgXCJOT19aSVBcIiA6IFwiTm8gemlwIGZpbGUgd2FzIGxvYWRlZFwiLFxyXG4gICAgXCJOT19FTlRSWVwiIDogXCJFbnRyeSBkb2Vzbid0IGV4aXN0XCIsXHJcbiAgICBcIkRJUkVDVE9SWV9DT05URU5UX0VSUk9SXCIgOiBcIkEgZGlyZWN0b3J5IGNhbm5vdCBoYXZlIGNvbnRlbnRcIixcclxuICAgIFwiRklMRV9OT1RfRk9VTkRcIiA6IFwiRmlsZSBub3QgZm91bmQ6ICVzXCIsXHJcbiAgICBcIk5PVF9JTVBMRU1FTlRFRFwiIDogXCJOb3QgaW1wbGVtZW50ZWRcIixcclxuICAgIFwiSU5WQUxJRF9GSUxFTkFNRVwiIDogXCJJbnZhbGlkIGZpbGVuYW1lXCIsXHJcbiAgICBcIklOVkFMSURfRk9STUFUXCIgOiBcIkludmFsaWQgb3IgdW5zdXBwb3J0ZWQgemlwIGZvcm1hdC4gTm8gRU5EIGhlYWRlciBmb3VuZFwiXHJcbn07IiwidmFyIGZzID0gcmVxdWlyZShcIi4vZmlsZVN5c3RlbVwiKS5yZXF1aXJlKCksXHJcbiAgICBwdGggPSByZXF1aXJlKFwicGF0aFwiKTtcclxuXHRcclxuZnMuZXhpc3RzU3luYyA9IGZzLmV4aXN0c1N5bmMgfHwgcHRoLmV4aXN0c1N5bmM7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKC8qU3RyaW5nKi9wYXRoKSB7XHJcblxyXG4gICAgdmFyIF9wYXRoID0gcGF0aCB8fCBcIlwiLFxyXG4gICAgICAgIF9wZXJtaXNzaW9ucyA9IDAsXHJcbiAgICAgICAgX29iaiA9IG5ld0F0dHIoKSxcclxuICAgICAgICBfc3RhdCA9IG51bGw7XHJcblxyXG4gICAgZnVuY3Rpb24gbmV3QXR0cigpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBkaXJlY3RvcnkgOiBmYWxzZSxcclxuICAgICAgICAgICAgcmVhZG9ubHkgOiBmYWxzZSxcclxuICAgICAgICAgICAgaGlkZGVuIDogZmFsc2UsXHJcbiAgICAgICAgICAgIGV4ZWN1dGFibGUgOiBmYWxzZSxcclxuICAgICAgICAgICAgbXRpbWUgOiAwLFxyXG4gICAgICAgICAgICBhdGltZSA6IDBcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKF9wYXRoICYmIGZzLmV4aXN0c1N5bmMoX3BhdGgpKSB7XHJcbiAgICAgICAgX3N0YXQgPSBmcy5zdGF0U3luYyhfcGF0aCk7XHJcbiAgICAgICAgX29iai5kaXJlY3RvcnkgPSBfc3RhdC5pc0RpcmVjdG9yeSgpO1xyXG4gICAgICAgIF9vYmoubXRpbWUgPSBfc3RhdC5tdGltZTtcclxuICAgICAgICBfb2JqLmF0aW1lID0gX3N0YXQuYXRpbWU7XHJcbiAgICAgICAgX29iai5leGVjdXRhYmxlID0gISEoMSAmIHBhcnNlSW50ICgoX3N0YXQubW9kZSAmIHBhcnNlSW50IChcIjc3N1wiLCA4KSkudG9TdHJpbmcgKDgpWzBdKSk7XHJcbiAgICAgICAgX29iai5yZWFkb25seSA9ICEhKDIgJiBwYXJzZUludCAoKF9zdGF0Lm1vZGUgJiBwYXJzZUludCAoXCI3NzdcIiwgOCkpLnRvU3RyaW5nICg4KVswXSkpO1xyXG4gICAgICAgIF9vYmouaGlkZGVuID0gcHRoLmJhc2VuYW1lKF9wYXRoKVswXSA9PT0gXCIuXCI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUud2FybihcIkludmFsaWQgcGF0aDogXCIgKyBfcGF0aClcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG5cclxuICAgICAgICBnZXQgZGlyZWN0b3J5ICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9vYmouZGlyZWN0b3J5O1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGdldCByZWFkT25seSAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfb2JqLnJlYWRvbmx5O1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGdldCBoaWRkZW4gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX29iai5oaWRkZW47XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZ2V0IG10aW1lICgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9vYmoubXRpbWU7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZ2V0IGF0aW1lICgpIHtcclxuICAgICAgICAgICByZXR1cm4gX29iai5hdGltZTtcclxuICAgICAgICB9LFxyXG5cclxuXHJcbiAgICAgICAgZ2V0IGV4ZWN1dGFibGUgKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX29iai5leGVjdXRhYmxlO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGRlY29kZUF0dHJpYnV0ZXMgOiBmdW5jdGlvbih2YWwpIHtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZW5jb2RlQXR0cmlidXRlcyA6IGZ1bmN0aW9uICh2YWwpIHtcclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgdG9TdHJpbmcgOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICByZXR1cm4gJ3tcXG4nICtcclxuICAgICAgICAgICAgICAgJ1xcdFwicGF0aFwiIDogXCInICsgX3BhdGggKyBcIixcXG5cIiArXHJcbiAgICAgICAgICAgICAgICdcXHRcImlzRGlyZWN0b3J5XCIgOiAnICsgX29iai5kaXJlY3RvcnkgKyBcIixcXG5cIiArXHJcbiAgICAgICAgICAgICAgICdcXHRcImlzUmVhZE9ubHlcIiA6ICcgKyBfb2JqLnJlYWRvbmx5ICsgXCIsXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAnXFx0XCJpc0hpZGRlblwiIDogJyArIF9vYmouaGlkZGVuICsgXCIsXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAnXFx0XCJpc0V4ZWN1dGFibGVcIiA6ICcgKyBfb2JqLmV4ZWN1dGFibGUgKyBcIixcXG5cIiArXHJcbiAgICAgICAgICAgICAgICdcXHRcIm1UaW1lXCIgOiAnICsgX29iai5tdGltZSArIFwiXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAnXFx0XCJhVGltZVwiIDogJyArIF9vYmouYXRpbWUgKyBcIlxcblwiICtcclxuICAgICAgICAgICAnfSc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufTtcclxuIiwiZXhwb3J0cy5yZXF1aXJlID0gZnVuY3Rpb24oKSB7XHJcbiAgdmFyIGZzID0gcmVxdWlyZShcImZzXCIpO1xyXG4gIGlmIChwcm9jZXNzLnZlcnNpb25zWydlbGVjdHJvbiddKSB7XHJcblx0ICB0cnkge1xyXG5cdCAgICBvcmlnaW5hbEZzID0gcmVxdWlyZShcIm9yaWdpbmFsLWZzXCIpO1xyXG5cdCAgICBpZiAoT2JqZWN0LmtleXMob3JpZ2luYWxGcykubGVuZ3RoID4gMCkge1xyXG5cdCAgICAgIGZzID0gb3JpZ2luYWxGcztcclxuICAgICAgfVxyXG5cdCAgfSBjYXRjaCAoZSkge31cclxuICB9XHJcbiAgcmV0dXJuIGZzXHJcbn07XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vdXRpbHNcIik7XHJcbm1vZHVsZS5leHBvcnRzLkZpbGVTeXN0ZW0gPSByZXF1aXJlKFwiLi9maWxlU3lzdGVtXCIpO1xyXG5tb2R1bGUuZXhwb3J0cy5Db25zdGFudHMgPSByZXF1aXJlKFwiLi9jb25zdGFudHNcIik7XHJcbm1vZHVsZS5leHBvcnRzLkVycm9ycyA9IHJlcXVpcmUoXCIuL2Vycm9yc1wiKTtcclxubW9kdWxlLmV4cG9ydHMuRmlsZUF0dHIgPSByZXF1aXJlKFwiLi9mYXR0clwiKTsiLCJ2YXIgZnMgPSByZXF1aXJlKFwiLi9maWxlU3lzdGVtXCIpLnJlcXVpcmUoKSxcclxuICAgIHB0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcclxuXHJcbmZzLmV4aXN0c1N5bmMgPSBmcy5leGlzdHNTeW5jIHx8IHB0aC5leGlzdHNTeW5jO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdmFyIGNyY1RhYmxlID0gW10sXHJcbiAgICAgICAgQ29uc3RhbnRzID0gcmVxdWlyZSgnLi9jb25zdGFudHMnKSxcclxuICAgICAgICBFcnJvcnMgPSByZXF1aXJlKCcuL2Vycm9ycycpLFxyXG5cclxuICAgICAgICBQQVRIX1NFUEFSQVRPUiA9IHB0aC5zZXA7XHJcblxyXG5cclxuICAgIGZ1bmN0aW9uIG1rZGlyU3luYygvKlN0cmluZyovcGF0aCkge1xyXG4gICAgICAgIHZhciByZXNvbHZlZFBhdGggPSBwYXRoLnNwbGl0KFBBVEhfU0VQQVJBVE9SKVswXTtcclxuICAgICAgICBwYXRoLnNwbGl0KFBBVEhfU0VQQVJBVE9SKS5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgICAgICAgICAgaWYgKCFuYW1lIHx8IG5hbWUuc3Vic3RyKC0xLDEpID09PSBcIjpcIikgcmV0dXJuO1xyXG4gICAgICAgICAgICByZXNvbHZlZFBhdGggKz0gUEFUSF9TRVBBUkFUT1IgKyBuYW1lO1xyXG4gICAgICAgICAgICB2YXIgc3RhdDtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHN0YXQgPSBmcy5zdGF0U3luYyhyZXNvbHZlZFBhdGgpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBmcy5ta2RpclN5bmMocmVzb2x2ZWRQYXRoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc3RhdCAmJiBzdGF0LmlzRmlsZSgpKVxyXG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3JzLkZJTEVfSU5fVEhFX1dBWS5yZXBsYWNlKFwiJXNcIiwgcmVzb2x2ZWRQYXRoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBmaW5kU3luYygvKlN0cmluZyovZGlyLCAvKlJlZ0V4cCovcGF0dGVybiwgLypCb29sZWFuKi9yZWNvdXJzaXZlKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBwYXR0ZXJuID09PSAnYm9vbGVhbicpIHtcclxuICAgICAgICAgICAgcmVjb3Vyc2l2ZSA9IHBhdHRlcm47XHJcbiAgICAgICAgICAgIHBhdHRlcm4gPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBmaWxlcyA9IFtdO1xyXG4gICAgICAgIGZzLnJlYWRkaXJTeW5jKGRpcikuZm9yRWFjaChmdW5jdGlvbihmaWxlKSB7XHJcbiAgICAgICAgICAgIHZhciBwYXRoID0gcHRoLmpvaW4oZGlyLCBmaWxlKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChmcy5zdGF0U3luYyhwYXRoKS5pc0RpcmVjdG9yeSgpICYmIHJlY291cnNpdmUpXHJcbiAgICAgICAgICAgICAgICBmaWxlcyA9IGZpbGVzLmNvbmNhdChmaW5kU3luYyhwYXRoLCBwYXR0ZXJuLCByZWNvdXJzaXZlKSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXBhdHRlcm4gfHwgcGF0dGVybi50ZXN0KHBhdGgpKSB7XHJcbiAgICAgICAgICAgICAgICBmaWxlcy5wdXNoKHB0aC5ub3JtYWxpemUocGF0aCkgKyAoZnMuc3RhdFN5bmMocGF0aCkuaXNEaXJlY3RvcnkoKSA/IFBBVEhfU0VQQVJBVE9SIDogXCJcIikpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBmaWxlcztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG1ha2VEaXIgOiBmdW5jdGlvbigvKlN0cmluZyovcGF0aCkge1xyXG4gICAgICAgICAgICBta2RpclN5bmMocGF0aCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgY3JjMzIgOiBmdW5jdGlvbihidWYpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBidWYgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgICAgICBidWYgPSBCdWZmZXIuYWxsb2MoYnVmLmxlbmd0aCwgYnVmKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgYiA9IEJ1ZmZlci5hbGxvYyg0KTtcclxuICAgICAgICAgICAgaWYgKCFjcmNUYWJsZS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIG4gPSAwOyBuIDwgMjU2OyBuKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYyA9IG47XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgayA9IDg7IC0tayA+PSAwOykgIC8vXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoYyAmIDEpICE9PSAwKSAgeyBjID0gMHhlZGI4ODMyMCBeIChjID4+PiAxKTsgfSBlbHNlIHsgYyA9IGMgPj4+IDE7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoYyA8IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYi53cml0ZUludDMyTEUoYywgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGMgPSBiLnJlYWRVSW50MzJMRSgwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY3JjVGFibGVbbl0gPSBjO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBjcmMgPSAwLCBvZmYgPSAwLCBsZW4gPSBidWYubGVuZ3RoLCBjMSA9IH5jcmM7XHJcbiAgICAgICAgICAgIHdoaWxlKC0tbGVuID49IDApIGMxID0gY3JjVGFibGVbKGMxIF4gYnVmW29mZisrXSkgJiAweGZmXSBeIChjMSA+Pj4gOCk7XHJcbiAgICAgICAgICAgIGNyYyA9IH5jMTtcclxuICAgICAgICAgICAgYi53cml0ZUludDMyTEUoY3JjICYgMHhmZmZmZmZmZiwgMCk7XHJcbiAgICAgICAgICAgIHJldHVybiBiLnJlYWRVSW50MzJMRSgwKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBtZXRob2RUb1N0cmluZyA6IGZ1bmN0aW9uKC8qTnVtYmVyKi9tZXRob2QpIHtcclxuICAgICAgICAgICAgc3dpdGNoIChtZXRob2QpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgQ29uc3RhbnRzLlNUT1JFRDpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ1NUT1JFRCAoJyArIG1ldGhvZCArICcpJztcclxuICAgICAgICAgICAgICAgIGNhc2UgQ29uc3RhbnRzLkRFRkxBVEVEOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnREVGTEFURUQgKCcgKyBtZXRob2QgKyAnKSc7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnVU5TVVBQT1JURUQgKCcgKyBtZXRob2QgKyAnKSc7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgd3JpdGVGaWxlVG8gOiBmdW5jdGlvbigvKlN0cmluZyovcGF0aCwgLypCdWZmZXIqL2NvbnRlbnQsIC8qQm9vbGVhbiovb3ZlcndyaXRlLCAvKk51bWJlciovYXR0cikge1xyXG4gICAgICAgICAgICBpZiAoZnMuZXhpc3RzU3luYyhwYXRoKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFvdmVyd3JpdGUpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBjYW5ub3Qgb3ZlcndyaXRlXHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHN0YXQgPSBmcy5zdGF0U3luYyhwYXRoKTtcclxuICAgICAgICAgICAgICAgIGlmIChzdGF0LmlzRGlyZWN0b3J5KCkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGZvbGRlciA9IHB0aC5kaXJuYW1lKHBhdGgpO1xyXG4gICAgICAgICAgICBpZiAoIWZzLmV4aXN0c1N5bmMoZm9sZGVyKSkge1xyXG4gICAgICAgICAgICAgICAgbWtkaXJTeW5jKGZvbGRlcik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBmZDtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGZkID0gZnMub3BlblN5bmMocGF0aCwgJ3cnLCA0MzgpOyAvLyAwNjY2XHJcbiAgICAgICAgICAgIH0gY2F0Y2goZSkge1xyXG4gICAgICAgICAgICAgICAgZnMuY2htb2RTeW5jKHBhdGgsIDQzOCk7XHJcbiAgICAgICAgICAgICAgICBmZCA9IGZzLm9wZW5TeW5jKHBhdGgsICd3JywgNDM4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoZmQpIHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZnMud3JpdGVTeW5jKGZkLCBjb250ZW50LCAwLCBjb250ZW50Lmxlbmd0aCwgMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjYXRjaCAoZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZpbmFsbHkge1xyXG4gICAgICAgICAgICAgICAgICAgIGZzLmNsb3NlU3luYyhmZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZnMuY2htb2RTeW5jKHBhdGgsIGF0dHIgfHwgNDM4KTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgd3JpdGVGaWxlVG9Bc3luYyA6IGZ1bmN0aW9uKC8qU3RyaW5nKi9wYXRoLCAvKkJ1ZmZlciovY29udGVudCwgLypCb29sZWFuKi9vdmVyd3JpdGUsIC8qTnVtYmVyKi9hdHRyLCAvKkZ1bmN0aW9uKi9jYWxsYmFjaykge1xyXG4gICAgICAgICAgICBpZih0eXBlb2YgYXR0ciA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgPSBhdHRyO1xyXG4gICAgICAgICAgICAgICAgYXR0ciA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnMuZXhpc3RzKHBhdGgsIGZ1bmN0aW9uKGV4aXN0cykge1xyXG4gICAgICAgICAgICAgICAgaWYoZXhpc3RzICYmICFvdmVyd3JpdGUpXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgICAgICBmcy5zdGF0KHBhdGgsIGZ1bmN0aW9uKGVyciwgc3RhdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGV4aXN0cyAmJnN0YXQuaXNEaXJlY3RvcnkoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZvbGRlciA9IHB0aC5kaXJuYW1lKHBhdGgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZzLmV4aXN0cyhmb2xkZXIsIGZ1bmN0aW9uKGV4aXN0cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZighZXhpc3RzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWtkaXJTeW5jKGZvbGRlcik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmcy5vcGVuKHBhdGgsICd3JywgNDM4LCBmdW5jdGlvbihlcnIsIGZkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcy5jaG1vZChwYXRoLCA0MzgsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcy5vcGVuKHBhdGgsICd3JywgNDM4LCBmdW5jdGlvbihlcnIsIGZkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcy53cml0ZShmZCwgY29udGVudCwgMCwgY29udGVudC5sZW5ndGgsIDAsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZzLmNsb3NlKGZkLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnMuY2htb2QocGF0aCwgYXR0ciB8fCA0MzgsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZmQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnMud3JpdGUoZmQsIGNvbnRlbnQsIDAsIGNvbnRlbnQubGVuZ3RoLCAwLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZzLmNsb3NlKGZkLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcy5jaG1vZChwYXRoLCBhdHRyIHx8IDQzOCwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnMuY2htb2QocGF0aCwgYXR0ciB8fCA0MzgsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBmaW5kRmlsZXMgOiBmdW5jdGlvbigvKlN0cmluZyovcGF0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmluZFN5bmMocGF0aCwgdHJ1ZSk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZ2V0QXR0cmlidXRlcyA6IGZ1bmN0aW9uKC8qU3RyaW5nKi9wYXRoKSB7XHJcblxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNldEF0dHJpYnV0ZXMgOiBmdW5jdGlvbigvKlN0cmluZyovcGF0aCkge1xyXG5cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB0b0J1ZmZlciA6IGZ1bmN0aW9uKGlucHV0KSB7XHJcbiAgICAgICAgICAgIGlmIChCdWZmZXIuaXNCdWZmZXIoaW5wdXQpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5wdXQ7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW5wdXQubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEJ1ZmZlci5hbGxvYygwKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEJ1ZmZlci5mcm9tKGlucHV0LCAndXRmOCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgQ29uc3RhbnRzIDogQ29uc3RhbnRzLFxyXG4gICAgICAgIEVycm9ycyA6IEVycm9yc1xyXG4gICAgfVxyXG59KSgpO1xyXG4iLCJ2YXIgVXRpbHMgPSByZXF1aXJlKFwiLi91dGlsXCIpLFxyXG4gICAgSGVhZGVycyA9IHJlcXVpcmUoXCIuL2hlYWRlcnNcIiksXHJcbiAgICBDb25zdGFudHMgPSBVdGlscy5Db25zdGFudHMsXHJcbiAgICBNZXRob2RzID0gcmVxdWlyZShcIi4vbWV0aG9kc1wiKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKC8qQnVmZmVyKi9pbnB1dCkge1xyXG5cclxuICAgIHZhciBfZW50cnlIZWFkZXIgPSBuZXcgSGVhZGVycy5FbnRyeUhlYWRlcigpLFxyXG4gICAgICAgIF9lbnRyeU5hbWUgPSBCdWZmZXIuYWxsb2MoMCksXHJcbiAgICAgICAgX2NvbW1lbnQgPSBCdWZmZXIuYWxsb2MoMCksXHJcbiAgICAgICAgX2lzRGlyZWN0b3J5ID0gZmFsc2UsXHJcbiAgICAgICAgdW5jb21wcmVzc2VkRGF0YSA9IG51bGwsXHJcbiAgICAgICAgX2V4dHJhID0gQnVmZmVyLmFsbG9jKDApO1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldENvbXByZXNzZWREYXRhRnJvbVppcCgpIHtcclxuICAgICAgICBpZiAoIWlucHV0IHx8ICFCdWZmZXIuaXNCdWZmZXIoaW5wdXQpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBCdWZmZXIuYWxsb2MoMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIF9lbnRyeUhlYWRlci5sb2FkRGF0YUhlYWRlckZyb21CaW5hcnkoaW5wdXQpO1xyXG4gICAgICAgIHJldHVybiBpbnB1dC5zbGljZShfZW50cnlIZWFkZXIucmVhbERhdGFPZmZzZXQsIF9lbnRyeUhlYWRlci5yZWFsRGF0YU9mZnNldCArIF9lbnRyeUhlYWRlci5jb21wcmVzc2VkU2l6ZSlcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjcmMzMk9LKGRhdGEpIHtcclxuICAgICAgICAvLyBpZiBiaXQgMyAoMHgwOCkgb2YgdGhlIGdlbmVyYWwtcHVycG9zZSBmbGFncyBmaWVsZCBpcyBzZXQsIHRoZW4gdGhlIENSQy0zMiBhbmQgZmlsZSBzaXplcyBhcmUgbm90IGtub3duIHdoZW4gdGhlIGhlYWRlciBpcyB3cml0dGVuXHJcbiAgICAgICAgaWYgKChfZW50cnlIZWFkZXIuZmxhZ3MgJiAweDgpICE9PSAweDgpIHtcclxuICAgICAgICAgICBpZiAoVXRpbHMuY3JjMzIoZGF0YSkgIT09IF9lbnRyeUhlYWRlci5kYXRhSGVhZGVyLmNyYykge1xyXG4gICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIEBUT0RPOiBsb2FkIGFuZCBjaGVjayBkYXRhIGRlc2NyaXB0b3IgaGVhZGVyXHJcbiAgICAgICAgICAgIC8vIFRoZSBmaWVsZHMgaW4gdGhlIGxvY2FsIGhlYWRlciBhcmUgZmlsbGVkIHdpdGggemVybywgYW5kIHRoZSBDUkMtMzIgYW5kIHNpemUgYXJlIGFwcGVuZGVkIGluIGEgMTItYnl0ZSBzdHJ1Y3R1cmVcclxuICAgICAgICAgICAgLy8gKG9wdGlvbmFsbHkgcHJlY2VkZWQgYnkgYSA0LWJ5dGUgc2lnbmF0dXJlKSBpbW1lZGlhdGVseSBhZnRlciB0aGUgY29tcHJlc3NlZCBkYXRhOlxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBkZWNvbXByZXNzKC8qQm9vbGVhbiovYXN5bmMsIC8qRnVuY3Rpb24qL2NhbGxiYWNrLCAvKlN0cmluZyovcGFzcykge1xyXG4gICAgICAgIGlmKHR5cGVvZiBjYWxsYmFjayA9PT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGFzeW5jID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICBwYXNzPWFzeW5jO1xyXG4gICAgICAgICAgICBhc3luYz12b2lkIDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChfaXNEaXJlY3RvcnkpIHtcclxuICAgICAgICAgICAgaWYgKGFzeW5jICYmIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhCdWZmZXIuYWxsb2MoMCksIFV0aWxzLkVycm9ycy5ESVJFQ1RPUllfQ09OVEVOVF9FUlJPUik7IC8vc2kgYWRkZWQgZXJyb3IuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIEJ1ZmZlci5hbGxvYygwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZhciBjb21wcmVzc2VkRGF0YSA9IGdldENvbXByZXNzZWREYXRhRnJvbVppcCgpO1xyXG4gICAgICAgXHJcbiAgICAgICAgaWYgKGNvbXByZXNzZWREYXRhLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICBpZiAoYXN5bmMgJiYgY2FsbGJhY2spIGNhbGxiYWNrKGNvbXByZXNzZWREYXRhLCBVdGlscy5FcnJvcnMuTk9fREFUQSk7Ly9zaSBhZGRlZCBlcnJvci5cclxuICAgICAgICAgICAgcmV0dXJuIGNvbXByZXNzZWREYXRhO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGRhdGEgPSBCdWZmZXIuYWxsb2MoX2VudHJ5SGVhZGVyLnNpemUpO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKF9lbnRyeUhlYWRlci5tZXRob2QpIHtcclxuICAgICAgICAgICAgY2FzZSBVdGlscy5Db25zdGFudHMuU1RPUkVEOlxyXG4gICAgICAgICAgICAgICAgY29tcHJlc3NlZERhdGEuY29weShkYXRhKTtcclxuICAgICAgICAgICAgICAgIGlmICghY3JjMzJPSyhkYXRhKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhc3luYyAmJiBjYWxsYmFjaykgY2FsbGJhY2soZGF0YSwgVXRpbHMuRXJyb3JzLkJBRF9DUkMpOy8vc2kgYWRkZWQgZXJyb3JcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gVXRpbHMuRXJyb3JzLkJBRF9DUkM7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Ugey8vc2kgYWRkZWQgb3RoZXJ3aXNlIGRpZCBub3Qgc2VlbSB0byByZXR1cm4gZGF0YS5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXN5bmMgJiYgY2FsbGJhY2spIGNhbGxiYWNrKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIFV0aWxzLkNvbnN0YW50cy5ERUZMQVRFRDpcclxuICAgICAgICAgICAgICAgIHZhciBpbmZsYXRlciA9IG5ldyBNZXRob2RzLkluZmxhdGVyKGNvbXByZXNzZWREYXRhKTtcclxuICAgICAgICAgICAgICAgIGlmICghYXN5bmMpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gaW5mbGF0ZXIuaW5mbGF0ZShkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQuY29weShkYXRhLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWNyYzMyT0soZGF0YSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFV0aWxzLkVycm9ycy5CQURfQ1JDICsgXCIgXCIgKyBfZW50cnlOYW1lLnRvU3RyaW5nKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpbmZsYXRlci5pbmZsYXRlQXN5bmMoZnVuY3Rpb24ocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5jb3B5KGRhdGEsIDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWNyYzMyT0soZGF0YSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soZGF0YSwgVXRpbHMuRXJyb3JzLkJBRF9DUkMpOyAvL3NpIGFkZGVkIGVycm9yXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7IC8vc2kgYWRkZWQgb3RoZXJ3aXNlIGRpZCBub3Qgc2VlbSB0byByZXR1cm4gZGF0YS5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBpZiAoYXN5bmMgJiYgY2FsbGJhY2spIGNhbGxiYWNrKEJ1ZmZlci5hbGxvYygwKSwgVXRpbHMuRXJyb3JzLlVOS05PV05fTUVUSE9EKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBVdGlscy5FcnJvcnMuVU5LTk9XTl9NRVRIT0Q7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNvbXByZXNzKC8qQm9vbGVhbiovYXN5bmMsIC8qRnVuY3Rpb24qL2NhbGxiYWNrKSB7XHJcbiAgICAgICAgaWYgKCghdW5jb21wcmVzc2VkRGF0YSB8fCAhdW5jb21wcmVzc2VkRGF0YS5sZW5ndGgpICYmIEJ1ZmZlci5pc0J1ZmZlcihpbnB1dCkpIHtcclxuICAgICAgICAgICAgLy8gbm8gZGF0YSBzZXQgb3IgdGhlIGRhdGEgd2Fzbid0IGNoYW5nZWQgdG8gcmVxdWlyZSByZWNvbXByZXNzaW9uXHJcbiAgICAgICAgICAgIGlmIChhc3luYyAmJiBjYWxsYmFjaykgY2FsbGJhY2soZ2V0Q29tcHJlc3NlZERhdGFGcm9tWmlwKCkpO1xyXG4gICAgICAgICAgICByZXR1cm4gZ2V0Q29tcHJlc3NlZERhdGFGcm9tWmlwKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodW5jb21wcmVzc2VkRGF0YS5sZW5ndGggJiYgIV9pc0RpcmVjdG9yeSkge1xyXG4gICAgICAgICAgICB2YXIgY29tcHJlc3NlZERhdGE7XHJcbiAgICAgICAgICAgIC8vIExvY2FsIGZpbGUgaGVhZGVyXHJcbiAgICAgICAgICAgIHN3aXRjaCAoX2VudHJ5SGVhZGVyLm1ldGhvZCkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBVdGlscy5Db25zdGFudHMuU1RPUkVEOlxyXG4gICAgICAgICAgICAgICAgICAgIF9lbnRyeUhlYWRlci5jb21wcmVzc2VkU2l6ZSA9IF9lbnRyeUhlYWRlci5zaXplO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb21wcmVzc2VkRGF0YSA9IEJ1ZmZlci5hbGxvYyh1bmNvbXByZXNzZWREYXRhLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdW5jb21wcmVzc2VkRGF0YS5jb3B5KGNvbXByZXNzZWREYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFzeW5jICYmIGNhbGxiYWNrKSBjYWxsYmFjayhjb21wcmVzc2VkRGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbXByZXNzZWREYXRhO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGNhc2UgVXRpbHMuQ29uc3RhbnRzLkRFRkxBVEVEOlxyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGVmbGF0ZXIgPSBuZXcgTWV0aG9kcy5EZWZsYXRlcih1bmNvbXByZXNzZWREYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWFzeW5jKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZWZsYXRlZCA9IGRlZmxhdGVyLmRlZmxhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgX2VudHJ5SGVhZGVyLmNvbXByZXNzZWRTaXplID0gZGVmbGF0ZWQubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGVmbGF0ZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVmbGF0ZXIuZGVmbGF0ZUFzeW5jKGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXByZXNzZWREYXRhID0gQnVmZmVyLmFsbG9jKGRhdGEubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9lbnRyeUhlYWRlci5jb21wcmVzc2VkU2l6ZSA9IGRhdGEubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5jb3B5KGNvbXByZXNzZWREYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKGNvbXByZXNzZWREYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmbGF0ZXIgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGFzeW5jICYmIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhCdWZmZXIuYWxsb2MoMCkpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEJ1ZmZlci5hbGxvYygwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZWFkVUludDY0TEUoYnVmZmVyLCBvZmZzZXQpIHtcclxuICAgICAgICByZXR1cm4gKGJ1ZmZlci5yZWFkVUludDMyTEUob2Zmc2V0ICsgNCkgPDwgNCkgKyBidWZmZXIucmVhZFVJbnQzMkxFKG9mZnNldCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcGFyc2VFeHRyYShkYXRhKSB7XHJcbiAgICAgICAgdmFyIG9mZnNldCA9IDA7XHJcbiAgICAgICAgdmFyIHNpZ25hdHVyZSwgc2l6ZSwgcGFydDtcclxuICAgICAgICB3aGlsZShvZmZzZXQ8ZGF0YS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgc2lnbmF0dXJlID0gZGF0YS5yZWFkVUludDE2TEUob2Zmc2V0KTtcclxuICAgICAgICAgICAgb2Zmc2V0ICs9IDI7XHJcbiAgICAgICAgICAgIHNpemUgPSBkYXRhLnJlYWRVSW50MTZMRShvZmZzZXQpO1xyXG4gICAgICAgICAgICBvZmZzZXQgKz0gMjtcclxuICAgICAgICAgICAgcGFydCA9IGRhdGEuc2xpY2Uob2Zmc2V0LCBvZmZzZXQrc2l6ZSk7XHJcbiAgICAgICAgICAgIG9mZnNldCArPSBzaXplO1xyXG4gICAgICAgICAgICBpZihDb25zdGFudHMuSURfWklQNjQgPT09IHNpZ25hdHVyZSkge1xyXG4gICAgICAgICAgICAgICAgcGFyc2VaaXA2NEV4dGVuZGVkSW5mb3JtYXRpb24ocGFydCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy9PdmVycmlkZSBoZWFkZXIgZmllbGQgdmFsdWVzIHdpdGggdmFsdWVzIGZyb20gdGhlIFpJUDY0IGV4dHJhIGZpZWxkXHJcbiAgICBmdW5jdGlvbiBwYXJzZVppcDY0RXh0ZW5kZWRJbmZvcm1hdGlvbihkYXRhKSB7XHJcbiAgICAgICAgdmFyIHNpemUsIGNvbXByZXNzZWRTaXplLCBvZmZzZXQsIGRpc2tOdW1TdGFydDtcclxuXHJcbiAgICAgICAgaWYoZGF0YS5sZW5ndGggPj0gQ29uc3RhbnRzLkVGX1pJUDY0X1NDT01QKSB7XHJcbiAgICAgICAgICAgIHNpemUgPSByZWFkVUludDY0TEUoZGF0YSwgQ29uc3RhbnRzLkVGX1pJUDY0X1NVTkNPTVApO1xyXG4gICAgICAgICAgICBpZihfZW50cnlIZWFkZXIuc2l6ZSA9PT0gQ29uc3RhbnRzLkVGX1pJUDY0X09SXzMyKSB7XHJcbiAgICAgICAgICAgICAgICBfZW50cnlIZWFkZXIuc2l6ZSA9IHNpemU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZGF0YS5sZW5ndGggPj0gQ29uc3RhbnRzLkVGX1pJUDY0X1JITykge1xyXG4gICAgICAgICAgICBjb21wcmVzc2VkU2l6ZSA9IHJlYWRVSW50NjRMRShkYXRhLCBDb25zdGFudHMuRUZfWklQNjRfU0NPTVApO1xyXG4gICAgICAgICAgICBpZihfZW50cnlIZWFkZXIuY29tcHJlc3NlZFNpemUgPT09IENvbnN0YW50cy5FRl9aSVA2NF9PUl8zMikge1xyXG4gICAgICAgICAgICAgICAgX2VudHJ5SGVhZGVyLmNvbXByZXNzZWRTaXplID0gY29tcHJlc3NlZFNpemU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoZGF0YS5sZW5ndGggPj0gQ29uc3RhbnRzLkVGX1pJUDY0X0RTTikge1xyXG4gICAgICAgICAgICBvZmZzZXQgPSByZWFkVUludDY0TEUoZGF0YSwgQ29uc3RhbnRzLkVGX1pJUDY0X1JITyk7XHJcbiAgICAgICAgICAgIGlmKF9lbnRyeUhlYWRlci5vZmZzZXQgPT09IENvbnN0YW50cy5FRl9aSVA2NF9PUl8zMikge1xyXG4gICAgICAgICAgICAgICAgX2VudHJ5SGVhZGVyLm9mZnNldCA9IG9mZnNldDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZihkYXRhLmxlbmd0aCA+PSBDb25zdGFudHMuRUZfWklQNjRfRFNOKzQpIHtcclxuICAgICAgICAgICAgZGlza051bVN0YXJ0ID0gZGF0YS5yZWFkVUludDMyTEUoQ29uc3RhbnRzLkVGX1pJUDY0X0RTTik7XHJcbiAgICAgICAgICAgIGlmKF9lbnRyeUhlYWRlci5kaXNrTnVtU3RhcnQgPT09IENvbnN0YW50cy5FRl9aSVA2NF9PUl8xNikge1xyXG4gICAgICAgICAgICAgICAgX2VudHJ5SGVhZGVyLmRpc2tOdW1TdGFydCA9IGRpc2tOdW1TdGFydDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBnZXQgZW50cnlOYW1lICgpIHsgcmV0dXJuIF9lbnRyeU5hbWUudG9TdHJpbmcoKTsgfSxcclxuICAgICAgICBnZXQgcmF3RW50cnlOYW1lKCkgeyByZXR1cm4gX2VudHJ5TmFtZTsgfSxcclxuICAgICAgICBzZXQgZW50cnlOYW1lICh2YWwpIHtcclxuICAgICAgICAgICAgX2VudHJ5TmFtZSA9IFV0aWxzLnRvQnVmZmVyKHZhbCk7XHJcbiAgICAgICAgICAgIHZhciBsYXN0Q2hhciA9IF9lbnRyeU5hbWVbX2VudHJ5TmFtZS5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgX2lzRGlyZWN0b3J5ID0gKGxhc3RDaGFyID09PSA0NykgfHwgKGxhc3RDaGFyID09PSA5Mik7XHJcbiAgICAgICAgICAgIF9lbnRyeUhlYWRlci5maWxlTmFtZUxlbmd0aCA9IF9lbnRyeU5hbWUubGVuZ3RoO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGdldCBleHRyYSAoKSB7IHJldHVybiBfZXh0cmE7IH0sXHJcbiAgICAgICAgc2V0IGV4dHJhICh2YWwpIHtcclxuICAgICAgICAgICAgX2V4dHJhID0gdmFsO1xyXG4gICAgICAgICAgICBfZW50cnlIZWFkZXIuZXh0cmFMZW5ndGggPSB2YWwubGVuZ3RoO1xyXG4gICAgICAgICAgICBwYXJzZUV4dHJhKHZhbCk7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZ2V0IGNvbW1lbnQgKCkgeyByZXR1cm4gX2NvbW1lbnQudG9TdHJpbmcoKTsgfSxcclxuICAgICAgICBzZXQgY29tbWVudCAodmFsKSB7XHJcbiAgICAgICAgICAgIF9jb21tZW50ID0gVXRpbHMudG9CdWZmZXIodmFsKTtcclxuICAgICAgICAgICAgX2VudHJ5SGVhZGVyLmNvbW1lbnRMZW5ndGggPSBfY29tbWVudC5sZW5ndGg7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZ2V0IG5hbWUgKCkgeyB2YXIgbiA9IF9lbnRyeU5hbWUudG9TdHJpbmcoKTsgcmV0dXJuIF9pc0RpcmVjdG9yeSA/IG4uc3Vic3RyKG4ubGVuZ3RoIC0gMSkuc3BsaXQoXCIvXCIpLnBvcCgpIDogbi5zcGxpdChcIi9cIikucG9wKCk7IH0sXHJcbiAgICAgICAgZ2V0IGlzRGlyZWN0b3J5ICgpIHsgcmV0dXJuIF9pc0RpcmVjdG9yeSB9LFxyXG5cclxuICAgICAgICBnZXRDb21wcmVzc2VkRGF0YSA6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gY29tcHJlc3MoZmFsc2UsIG51bGwpXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZ2V0Q29tcHJlc3NlZERhdGFBc3luYyA6IGZ1bmN0aW9uKC8qRnVuY3Rpb24qL2NhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIGNvbXByZXNzKHRydWUsIGNhbGxiYWNrKVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNldERhdGEgOiBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICB1bmNvbXByZXNzZWREYXRhID0gVXRpbHMudG9CdWZmZXIodmFsdWUpO1xyXG4gICAgICAgICAgICBpZiAoIV9pc0RpcmVjdG9yeSAmJiB1bmNvbXByZXNzZWREYXRhLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgX2VudHJ5SGVhZGVyLnNpemUgPSB1bmNvbXByZXNzZWREYXRhLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIF9lbnRyeUhlYWRlci5tZXRob2QgPSBVdGlscy5Db25zdGFudHMuREVGTEFURUQ7XHJcbiAgICAgICAgICAgICAgICBfZW50cnlIZWFkZXIuY3JjID0gVXRpbHMuY3JjMzIodmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgX2VudHJ5SGVhZGVyLmNoYW5nZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2UgeyAvLyBmb2xkZXJzIGFuZCBibGFuayBmaWxlcyBzaG91bGQgYmUgc3RvcmVkXHJcbiAgICAgICAgICAgICAgICBfZW50cnlIZWFkZXIubWV0aG9kID0gVXRpbHMuQ29uc3RhbnRzLlNUT1JFRDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGdldERhdGEgOiBmdW5jdGlvbihwYXNzKSB7XHJcbiAgICAgICAgICAgIGlmIChfZW50cnlIZWFkZXIuY2hhbmdlZCkge1xyXG5cdFx0XHRcdHJldHVybiB1bmNvbXByZXNzZWREYXRhO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJldHVybiBkZWNvbXByZXNzKGZhbHNlLCBudWxsLCBwYXNzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGdldERhdGFBc3luYyA6IGZ1bmN0aW9uKC8qRnVuY3Rpb24qL2NhbGxiYWNrLCBwYXNzKSB7XHJcblx0XHRcdGlmIChfZW50cnlIZWFkZXIuY2hhbmdlZCkge1xyXG5cdFx0XHRcdGNhbGxiYWNrKHVuY29tcHJlc3NlZERhdGEpXHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0ZGVjb21wcmVzcyh0cnVlLCBjYWxsYmFjaywgcGFzcylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNldCBhdHRyKGF0dHIpIHsgX2VudHJ5SGVhZGVyLmF0dHIgPSBhdHRyOyB9LFxyXG4gICAgICAgIGdldCBhdHRyKCkgeyByZXR1cm4gX2VudHJ5SGVhZGVyLmF0dHI7IH0sXHJcblxyXG4gICAgICAgIHNldCBoZWFkZXIoLypCdWZmZXIqL2RhdGEpIHtcclxuICAgICAgICAgICAgX2VudHJ5SGVhZGVyLmxvYWRGcm9tQmluYXJ5KGRhdGEpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGdldCBoZWFkZXIoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfZW50cnlIZWFkZXI7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgcGFja0hlYWRlciA6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgaGVhZGVyID0gX2VudHJ5SGVhZGVyLmVudHJ5SGVhZGVyVG9CaW5hcnkoKTtcclxuICAgICAgICAgICAgLy8gYWRkXHJcbiAgICAgICAgICAgIF9lbnRyeU5hbWUuY29weShoZWFkZXIsIFV0aWxzLkNvbnN0YW50cy5DRU5IRFIpO1xyXG4gICAgICAgICAgICBpZiAoX2VudHJ5SGVhZGVyLmV4dHJhTGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBfZXh0cmEuY29weShoZWFkZXIsIFV0aWxzLkNvbnN0YW50cy5DRU5IRFIgKyBfZW50cnlOYW1lLmxlbmd0aClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoX2VudHJ5SGVhZGVyLmNvbW1lbnRMZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIF9jb21tZW50LmNvcHkoaGVhZGVyLCBVdGlscy5Db25zdGFudHMuQ0VOSERSICsgX2VudHJ5TmFtZS5sZW5ndGggKyBfZW50cnlIZWFkZXIuZXh0cmFMZW5ndGgsIF9jb21tZW50Lmxlbmd0aCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGhlYWRlcjtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICB0b1N0cmluZyA6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gJ3tcXG4nICtcclxuICAgICAgICAgICAgICAgICdcXHRcImVudHJ5TmFtZVwiIDogXCInICsgX2VudHJ5TmFtZS50b1N0cmluZygpICsgXCJcXFwiLFxcblwiICtcclxuICAgICAgICAgICAgICAgICdcXHRcIm5hbWVcIiA6IFwiJyArIChfaXNEaXJlY3RvcnkgPyBfZW50cnlOYW1lLnRvU3RyaW5nKCkucmVwbGFjZSgvXFwvJC8sICcnKS5zcGxpdChcIi9cIikucG9wKCkgOiBfZW50cnlOYW1lLnRvU3RyaW5nKCkuc3BsaXQoXCIvXCIpLnBvcCgpKSArIFwiXFxcIixcXG5cIiArXHJcbiAgICAgICAgICAgICAgICAnXFx0XCJjb21tZW50XCIgOiBcIicgKyBfY29tbWVudC50b1N0cmluZygpICsgXCJcXFwiLFxcblwiICtcclxuICAgICAgICAgICAgICAgICdcXHRcImlzRGlyZWN0b3J5XCIgOiAnICsgX2lzRGlyZWN0b3J5ICsgXCIsXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgJ1xcdFwiaGVhZGVyXCIgOiAnICsgX2VudHJ5SGVhZGVyLnRvU3RyaW5nKCkucmVwbGFjZSgvXFx0L21nLCBcIlxcdFxcdFwiKS5yZXBsYWNlKC99L21nLCBcIlxcdH1cIikgICsgXCIsXFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgJ1xcdFwiY29tcHJlc3NlZERhdGFcIiA6IDwnICsgKGlucHV0ICYmIGlucHV0Lmxlbmd0aCAgKyBcIiBieXRlcyBidWZmZXJcIiB8fCBcIm51bGxcIikgKyBcIj5cXG5cIiArXHJcbiAgICAgICAgICAgICAgICAnXFx0XCJkYXRhXCIgOiA8JyArICh1bmNvbXByZXNzZWREYXRhICYmIHVuY29tcHJlc3NlZERhdGEubGVuZ3RoICArIFwiIGJ5dGVzIGJ1ZmZlclwiIHx8IFwibnVsbFwiKSArIFwiPlxcblwiICtcclxuICAgICAgICAgICAgICAgICd9JztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcbiIsInZhciBaaXBFbnRyeSA9IHJlcXVpcmUoXCIuL3ppcEVudHJ5XCIpLFxyXG5cdEhlYWRlcnMgPSByZXF1aXJlKFwiLi9oZWFkZXJzXCIpLFxyXG5cdFV0aWxzID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKC8qU3RyaW5nfEJ1ZmZlciovaW5wdXQsIC8qTnVtYmVyKi9pbnB1dFR5cGUpIHtcclxuXHR2YXIgZW50cnlMaXN0ID0gW10sXHJcblx0XHRlbnRyeVRhYmxlID0ge30sXHJcblx0XHRfY29tbWVudCA9IEJ1ZmZlci5hbGxvYygwKSxcclxuXHRcdGZpbGVuYW1lID0gXCJcIixcclxuXHRcdGZzID0gVXRpbHMuRmlsZVN5c3RlbS5yZXF1aXJlKCksXHJcblx0XHRpbkJ1ZmZlciA9IG51bGwsXHJcblx0XHRtYWluSGVhZGVyID0gbmV3IEhlYWRlcnMuTWFpbkhlYWRlcigpO1xyXG5cclxuXHRpZiAoaW5wdXRUeXBlID09PSBVdGlscy5Db25zdGFudHMuRklMRSkge1xyXG5cdFx0Ly8gaXMgYSBmaWxlbmFtZVxyXG5cdFx0ZmlsZW5hbWUgPSBpbnB1dDtcclxuXHRcdGluQnVmZmVyID0gZnMucmVhZEZpbGVTeW5jKGZpbGVuYW1lKTtcclxuXHRcdHJlYWRNYWluSGVhZGVyKCk7XHJcblx0fSBlbHNlIGlmIChpbnB1dFR5cGUgPT09IFV0aWxzLkNvbnN0YW50cy5CVUZGRVIpIHtcclxuXHRcdC8vIGlzIGEgbWVtb3J5IGJ1ZmZlclxyXG5cdFx0aW5CdWZmZXIgPSBpbnB1dDtcclxuXHRcdHJlYWRNYWluSGVhZGVyKCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdC8vIG5vbmUuIGlzIGEgbmV3IGZpbGVcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIHJlYWRFbnRyaWVzKCkge1xyXG5cdFx0ZW50cnlUYWJsZSA9IHt9O1xyXG5cdFx0ZW50cnlMaXN0ID0gbmV3IEFycmF5KG1haW5IZWFkZXIuZGlza0VudHJpZXMpOyAgLy8gdG90YWwgbnVtYmVyIG9mIGVudHJpZXNcclxuXHRcdHZhciBpbmRleCA9IG1haW5IZWFkZXIub2Zmc2V0OyAgLy8gb2Zmc2V0IG9mIGZpcnN0IENFTiBoZWFkZXJcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZW50cnlMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcblxyXG5cdFx0XHR2YXIgdG1wID0gaW5kZXgsXHJcblx0XHRcdFx0ZW50cnkgPSBuZXcgWmlwRW50cnkoaW5CdWZmZXIpO1xyXG5cdFx0XHRlbnRyeS5oZWFkZXIgPSBpbkJ1ZmZlci5zbGljZSh0bXAsIHRtcCArPSBVdGlscy5Db25zdGFudHMuQ0VOSERSKTtcclxuXHJcblx0XHRcdGVudHJ5LmVudHJ5TmFtZSA9IGluQnVmZmVyLnNsaWNlKHRtcCwgdG1wICs9IGVudHJ5LmhlYWRlci5maWxlTmFtZUxlbmd0aCk7XHJcblxyXG5cdFx0XHRpZiAoZW50cnkuaGVhZGVyLmV4dHJhTGVuZ3RoKSB7XHJcblx0XHRcdFx0ZW50cnkuZXh0cmEgPSBpbkJ1ZmZlci5zbGljZSh0bXAsIHRtcCArPSBlbnRyeS5oZWFkZXIuZXh0cmFMZW5ndGgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoZW50cnkuaGVhZGVyLmNvbW1lbnRMZW5ndGgpXHJcblx0XHRcdFx0ZW50cnkuY29tbWVudCA9IGluQnVmZmVyLnNsaWNlKHRtcCwgdG1wICsgZW50cnkuaGVhZGVyLmNvbW1lbnRMZW5ndGgpO1xyXG5cclxuXHRcdFx0aW5kZXggKz0gZW50cnkuaGVhZGVyLmVudHJ5SGVhZGVyU2l6ZTtcclxuXHJcblx0XHRcdGVudHJ5TGlzdFtpXSA9IGVudHJ5O1xyXG5cdFx0XHRlbnRyeVRhYmxlW2VudHJ5LmVudHJ5TmFtZV0gPSBlbnRyeTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIHJlYWRNYWluSGVhZGVyKCkge1xyXG5cdFx0dmFyIGkgPSBpbkJ1ZmZlci5sZW5ndGggLSBVdGlscy5Db25zdGFudHMuRU5ESERSLCAvLyBFTkQgaGVhZGVyIHNpemVcclxuXHRcdFx0biA9IE1hdGgubWF4KDAsIGkgLSAweEZGRkYpLCAvLyAweEZGRkYgaXMgdGhlIG1heCB6aXAgZmlsZSBjb21tZW50IGxlbmd0aFxyXG5cdFx0XHRlbmRPZmZzZXQgPSAtMTsgLy8gU3RhcnQgb2Zmc2V0IG9mIHRoZSBFTkQgaGVhZGVyXHJcblxyXG5cdFx0Zm9yIChpOyBpID49IG47IGktLSkge1xyXG5cdFx0XHRpZiAoaW5CdWZmZXJbaV0gIT09IDB4NTApIGNvbnRpbnVlOyAvLyBxdWljayBjaGVjayB0aGF0IHRoZSBieXRlIGlzICdQJ1xyXG5cdFx0XHRpZiAoaW5CdWZmZXIucmVhZFVJbnQzMkxFKGkpID09PSBVdGlscy5Db25zdGFudHMuRU5EU0lHKSB7IC8vIFwiUEtcXDAwNVxcMDA2XCJcclxuXHRcdFx0XHRlbmRPZmZzZXQgPSBpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRpZiAoIX5lbmRPZmZzZXQpXHJcblx0XHRcdHRocm93IFV0aWxzLkVycm9ycy5JTlZBTElEX0ZPUk1BVDtcclxuXHJcblx0XHRtYWluSGVhZGVyLmxvYWRGcm9tQmluYXJ5KGluQnVmZmVyLnNsaWNlKGVuZE9mZnNldCwgZW5kT2Zmc2V0ICsgVXRpbHMuQ29uc3RhbnRzLkVOREhEUikpO1xyXG5cdFx0aWYgKG1haW5IZWFkZXIuY29tbWVudExlbmd0aCkge1xyXG5cdFx0XHRfY29tbWVudCA9IGluQnVmZmVyLnNsaWNlKGVuZE9mZnNldCArIFV0aWxzLkNvbnN0YW50cy5FTkRIRFIpO1xyXG5cdFx0fVxyXG5cdFx0cmVhZEVudHJpZXMoKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiB7XHJcblx0XHQvKipcclxuXHRcdCAqIFJldHVybnMgYW4gYXJyYXkgb2YgWmlwRW50cnkgb2JqZWN0cyBleGlzdGVudCBpbiB0aGUgY3VycmVudCBvcGVuZWQgYXJjaGl2ZVxyXG5cdFx0ICogQHJldHVybiBBcnJheVxyXG5cdFx0ICovXHJcblx0XHRnZXQgZW50cmllcygpIHtcclxuXHRcdFx0cmV0dXJuIGVudHJ5TGlzdDtcclxuXHRcdH0sXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBcmNoaXZlIGNvbW1lbnRcclxuXHRcdCAqIEByZXR1cm4ge1N0cmluZ31cclxuXHRcdCAqL1xyXG5cdFx0Z2V0IGNvbW1lbnQoKSB7XHJcblx0XHRcdHJldHVybiBfY29tbWVudC50b1N0cmluZygpO1xyXG5cdFx0fSxcclxuXHRcdHNldCBjb21tZW50KHZhbCkge1xyXG5cdFx0XHRtYWluSGVhZGVyLmNvbW1lbnRMZW5ndGggPSB2YWwubGVuZ3RoO1xyXG5cdFx0XHRfY29tbWVudCA9IHZhbDtcclxuXHRcdH0sXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBSZXR1cm5zIGEgcmVmZXJlbmNlIHRvIHRoZSBlbnRyeSB3aXRoIHRoZSBnaXZlbiBuYW1lIG9yIG51bGwgaWYgZW50cnkgaXMgaW5leGlzdGVudFxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSBlbnRyeU5hbWVcclxuXHRcdCAqIEByZXR1cm4gWmlwRW50cnlcclxuXHRcdCAqL1xyXG5cdFx0Z2V0RW50cnk6IGZ1bmN0aW9uICgvKlN0cmluZyovZW50cnlOYW1lKSB7XHJcblx0XHRcdHJldHVybiBlbnRyeVRhYmxlW2VudHJ5TmFtZV0gfHwgbnVsbDtcclxuXHRcdH0sXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBBZGRzIHRoZSBnaXZlbiBlbnRyeSB0byB0aGUgZW50cnkgbGlzdFxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSBlbnRyeVxyXG5cdFx0ICovXHJcblx0XHRzZXRFbnRyeTogZnVuY3Rpb24gKC8qWmlwRW50cnkqL2VudHJ5KSB7XHJcblx0XHRcdGVudHJ5TGlzdC5wdXNoKGVudHJ5KTtcclxuXHRcdFx0ZW50cnlUYWJsZVtlbnRyeS5lbnRyeU5hbWVdID0gZW50cnk7XHJcblx0XHRcdG1haW5IZWFkZXIudG90YWxFbnRyaWVzID0gZW50cnlMaXN0Lmxlbmd0aDtcclxuXHRcdH0sXHJcblxyXG5cdFx0LyoqXHJcblx0XHQgKiBSZW1vdmVzIHRoZSBlbnRyeSB3aXRoIHRoZSBnaXZlbiBuYW1lIGZyb20gdGhlIGVudHJ5IGxpc3QuXHJcblx0XHQgKlxyXG5cdFx0ICogSWYgdGhlIGVudHJ5IGlzIGEgZGlyZWN0b3J5LCB0aGVuIGFsbCBuZXN0ZWQgZmlsZXMgYW5kIGRpcmVjdG9yaWVzIHdpbGwgYmUgcmVtb3ZlZFxyXG5cdFx0ICogQHBhcmFtIGVudHJ5TmFtZVxyXG5cdFx0ICovXHJcblx0XHRkZWxldGVFbnRyeTogZnVuY3Rpb24gKC8qU3RyaW5nKi9lbnRyeU5hbWUpIHtcclxuXHRcdFx0dmFyIGVudHJ5ID0gZW50cnlUYWJsZVtlbnRyeU5hbWVdO1xyXG5cdFx0XHRpZiAoZW50cnkgJiYgZW50cnkuaXNEaXJlY3RvcnkpIHtcclxuXHRcdFx0XHR2YXIgX3NlbGYgPSB0aGlzO1xyXG5cdFx0XHRcdHRoaXMuZ2V0RW50cnlDaGlsZHJlbihlbnRyeSkuZm9yRWFjaChmdW5jdGlvbiAoY2hpbGQpIHtcclxuXHRcdFx0XHRcdGlmIChjaGlsZC5lbnRyeU5hbWUgIT09IGVudHJ5TmFtZSkge1xyXG5cdFx0XHRcdFx0XHRfc2VsZi5kZWxldGVFbnRyeShjaGlsZC5lbnRyeU5hbWUpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fVxyXG5cdFx0XHRlbnRyeUxpc3Quc3BsaWNlKGVudHJ5TGlzdC5pbmRleE9mKGVudHJ5KSwgMSk7XHJcblx0XHRcdGRlbGV0ZShlbnRyeVRhYmxlW2VudHJ5TmFtZV0pO1xyXG5cdFx0XHRtYWluSGVhZGVyLnRvdGFsRW50cmllcyA9IGVudHJ5TGlzdC5sZW5ndGg7XHJcblx0XHR9LFxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogIEl0ZXJhdGVzIGFuZCByZXR1cm5zIGFsbCBuZXN0ZWQgZmlsZXMgYW5kIGRpcmVjdG9yaWVzIG9mIHRoZSBnaXZlbiBlbnRyeVxyXG5cdFx0ICpcclxuXHRcdCAqIEBwYXJhbSBlbnRyeVxyXG5cdFx0ICogQHJldHVybiBBcnJheVxyXG5cdFx0ICovXHJcblx0XHRnZXRFbnRyeUNoaWxkcmVuOiBmdW5jdGlvbiAoLypaaXBFbnRyeSovZW50cnkpIHtcclxuXHRcdFx0aWYgKGVudHJ5LmlzRGlyZWN0b3J5KSB7XHJcblx0XHRcdFx0dmFyIGxpc3QgPSBbXSxcclxuXHRcdFx0XHRcdG5hbWUgPSBlbnRyeS5lbnRyeU5hbWUsXHJcblx0XHRcdFx0XHRsZW4gPSBuYW1lLmxlbmd0aDtcclxuXHJcblx0XHRcdFx0ZW50cnlMaXN0LmZvckVhY2goZnVuY3Rpb24gKHppcEVudHJ5KSB7XHJcblx0XHRcdFx0XHRpZiAoemlwRW50cnkuZW50cnlOYW1lLnN1YnN0cigwLCBsZW4pID09PSBuYW1lKSB7XHJcblx0XHRcdFx0XHRcdGxpc3QucHVzaCh6aXBFbnRyeSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0cmV0dXJuIGxpc3Q7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIFtdXHJcblx0XHR9LFxyXG5cclxuXHRcdC8qKlxyXG5cdFx0ICogUmV0dXJucyB0aGUgemlwIGZpbGVcclxuXHRcdCAqXHJcblx0XHQgKiBAcmV0dXJuIEJ1ZmZlclxyXG5cdFx0ICovXHJcblx0XHRjb21wcmVzc1RvQnVmZmVyOiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGlmIChlbnRyeUxpc3QubGVuZ3RoID4gMSkge1xyXG5cdFx0XHRcdGVudHJ5TGlzdC5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XHJcblx0XHRcdFx0XHR2YXIgbmFtZUEgPSBhLmVudHJ5TmFtZS50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0XHRcdFx0dmFyIG5hbWVCID0gYi5lbnRyeU5hbWUudG9Mb3dlckNhc2UoKTtcclxuXHRcdFx0XHRcdGlmIChuYW1lQSA8IG5hbWVCKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiAtMVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0aWYgKG5hbWVBID4gbmFtZUIpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDFcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHJldHVybiAwO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgdG90YWxTaXplID0gMCxcclxuXHRcdFx0XHRkYXRhQmxvY2sgPSBbXSxcclxuXHRcdFx0XHRlbnRyeUhlYWRlcnMgPSBbXSxcclxuXHRcdFx0XHRkaW5kZXggPSAwO1xyXG5cclxuXHRcdFx0bWFpbkhlYWRlci5zaXplID0gMDtcclxuXHRcdFx0bWFpbkhlYWRlci5vZmZzZXQgPSAwO1xyXG5cclxuXHRcdFx0ZW50cnlMaXN0LmZvckVhY2goZnVuY3Rpb24gKGVudHJ5KSB7XHJcblx0XHRcdFx0Ly8gY29tcHJlc3MgZGF0YSBhbmQgc2V0IGxvY2FsIGFuZCBlbnRyeSBoZWFkZXIgYWNjb3JkaW5nbHkuIFJlYXNvbiB3aHkgaXMgY2FsbGVkIGZpcnN0XHJcblx0XHRcdFx0dmFyIGNvbXByZXNzZWREYXRhID0gZW50cnkuZ2V0Q29tcHJlc3NlZERhdGEoKTtcclxuXHRcdFx0XHQvLyBkYXRhIGhlYWRlclxyXG5cdFx0XHRcdGVudHJ5LmhlYWRlci5vZmZzZXQgPSBkaW5kZXg7XHJcblx0XHRcdFx0dmFyIGRhdGFIZWFkZXIgPSBlbnRyeS5oZWFkZXIuZGF0YUhlYWRlclRvQmluYXJ5KCk7XHJcblx0XHRcdFx0dmFyIGVudHJ5TmFtZUxlbiA9IGVudHJ5LnJhd0VudHJ5TmFtZS5sZW5ndGg7XHJcblx0XHRcdFx0dmFyIGV4dHJhID0gZW50cnkuZXh0cmEudG9TdHJpbmcoKTtcclxuXHRcdFx0XHR2YXIgcG9zdEhlYWRlciA9IEJ1ZmZlci5hbGxvYyhlbnRyeU5hbWVMZW4gKyBleHRyYS5sZW5ndGgpO1xyXG5cdFx0XHRcdGVudHJ5LnJhd0VudHJ5TmFtZS5jb3B5KHBvc3RIZWFkZXIsIDApO1xyXG5cdFx0XHRcdHBvc3RIZWFkZXIuZmlsbChleHRyYSwgZW50cnlOYW1lTGVuKTtcclxuXHJcblx0XHRcdFx0dmFyIGRhdGFMZW5ndGggPSBkYXRhSGVhZGVyLmxlbmd0aCArIHBvc3RIZWFkZXIubGVuZ3RoICsgY29tcHJlc3NlZERhdGEubGVuZ3RoO1xyXG5cclxuXHRcdFx0XHRkaW5kZXggKz0gZGF0YUxlbmd0aDtcclxuXHJcblx0XHRcdFx0ZGF0YUJsb2NrLnB1c2goZGF0YUhlYWRlcik7XHJcblx0XHRcdFx0ZGF0YUJsb2NrLnB1c2gocG9zdEhlYWRlcik7XHJcblx0XHRcdFx0ZGF0YUJsb2NrLnB1c2goY29tcHJlc3NlZERhdGEpO1xyXG5cclxuXHRcdFx0XHR2YXIgZW50cnlIZWFkZXIgPSBlbnRyeS5wYWNrSGVhZGVyKCk7XHJcblx0XHRcdFx0ZW50cnlIZWFkZXJzLnB1c2goZW50cnlIZWFkZXIpO1xyXG5cdFx0XHRcdG1haW5IZWFkZXIuc2l6ZSArPSBlbnRyeUhlYWRlci5sZW5ndGg7XHJcblx0XHRcdFx0dG90YWxTaXplICs9IChkYXRhTGVuZ3RoICsgZW50cnlIZWFkZXIubGVuZ3RoKTtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHR0b3RhbFNpemUgKz0gbWFpbkhlYWRlci5tYWluSGVhZGVyU2l6ZTsgLy8gYWxzbyBpbmNsdWRlcyB6aXAgZmlsZSBjb21tZW50IGxlbmd0aFxyXG5cdFx0XHQvLyBwb2ludCB0byBlbmQgb2YgZGF0YSBhbmQgYmVnaW5uaW5nIG9mIGNlbnRyYWwgZGlyZWN0b3J5IGZpcnN0IHJlY29yZFxyXG5cdFx0XHRtYWluSGVhZGVyLm9mZnNldCA9IGRpbmRleDtcclxuXHJcblx0XHRcdGRpbmRleCA9IDA7XHJcblx0XHRcdHZhciBvdXRCdWZmZXIgPSBCdWZmZXIuYWxsb2ModG90YWxTaXplKTtcclxuXHRcdFx0ZGF0YUJsb2NrLmZvckVhY2goZnVuY3Rpb24gKGNvbnRlbnQpIHtcclxuXHRcdFx0XHRjb250ZW50LmNvcHkob3V0QnVmZmVyLCBkaW5kZXgpOyAvLyB3cml0ZSBkYXRhIGJsb2Nrc1xyXG5cdFx0XHRcdGRpbmRleCArPSBjb250ZW50Lmxlbmd0aDtcclxuXHRcdFx0fSk7XHJcblx0XHRcdGVudHJ5SGVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uIChjb250ZW50KSB7XHJcblx0XHRcdFx0Y29udGVudC5jb3B5KG91dEJ1ZmZlciwgZGluZGV4KTsgLy8gd3JpdGUgY2VudHJhbCBkaXJlY3RvcnkgZW50cmllc1xyXG5cdFx0XHRcdGRpbmRleCArPSBjb250ZW50Lmxlbmd0aDtcclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHR2YXIgbWggPSBtYWluSGVhZGVyLnRvQmluYXJ5KCk7XHJcblx0XHRcdGlmIChfY29tbWVudCkge1xyXG5cdFx0XHRcdF9jb21tZW50LmNvcHkobWgsIFV0aWxzLkNvbnN0YW50cy5FTkRIRFIpOyAvLyBhZGQgemlwIGZpbGUgY29tbWVudFxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRtaC5jb3B5KG91dEJ1ZmZlciwgZGluZGV4KTsgLy8gd3JpdGUgbWFpbiBoZWFkZXJcclxuXHJcblx0XHRcdHJldHVybiBvdXRCdWZmZXJcclxuXHRcdH0sXHJcblxyXG5cdFx0dG9Bc3luY0J1ZmZlcjogZnVuY3Rpb24gKC8qRnVuY3Rpb24qL29uU3VjY2VzcywgLypGdW5jdGlvbiovb25GYWlsLCAvKkZ1bmN0aW9uKi9vbkl0ZW1TdGFydCwgLypGdW5jdGlvbiovb25JdGVtRW5kKSB7XHJcblx0XHRcdGlmIChlbnRyeUxpc3QubGVuZ3RoID4gMSkge1xyXG5cdFx0XHRcdGVudHJ5TGlzdC5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XHJcblx0XHRcdFx0XHR2YXIgbmFtZUEgPSBhLmVudHJ5TmFtZS50b0xvd2VyQ2FzZSgpO1xyXG5cdFx0XHRcdFx0dmFyIG5hbWVCID0gYi5lbnRyeU5hbWUudG9Mb3dlckNhc2UoKTtcclxuXHRcdFx0XHRcdGlmIChuYW1lQSA+IG5hbWVCKSB7XHJcblx0XHRcdFx0XHRcdHJldHVybiAtMVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0aWYgKG5hbWVBIDwgbmFtZUIpIHtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIDFcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHJldHVybiAwO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgdG90YWxTaXplID0gMCxcclxuXHRcdFx0XHRkYXRhQmxvY2sgPSBbXSxcclxuXHRcdFx0XHRlbnRyeUhlYWRlcnMgPSBbXSxcclxuXHRcdFx0XHRkaW5kZXggPSAwO1xyXG5cclxuXHRcdFx0bWFpbkhlYWRlci5zaXplID0gMDtcclxuXHRcdFx0bWFpbkhlYWRlci5vZmZzZXQgPSAwO1xyXG5cclxuXHRcdFx0dmFyIGNvbXByZXNzID0gZnVuY3Rpb24gKGVudHJ5TGlzdCkge1xyXG5cdFx0XHRcdHZhciBzZWxmID0gYXJndW1lbnRzLmNhbGxlZTtcclxuXHRcdFx0XHRpZiAoZW50cnlMaXN0Lmxlbmd0aCkge1xyXG5cdFx0XHRcdFx0dmFyIGVudHJ5ID0gZW50cnlMaXN0LnBvcCgpO1xyXG5cdFx0XHRcdFx0dmFyIG5hbWUgPSBlbnRyeS5lbnRyeU5hbWUgKyBlbnRyeS5leHRyYS50b1N0cmluZygpO1xyXG5cdFx0XHRcdFx0aWYgKG9uSXRlbVN0YXJ0KSBvbkl0ZW1TdGFydChuYW1lKTtcclxuXHRcdFx0XHRcdGVudHJ5LmdldENvbXByZXNzZWREYXRhQXN5bmMoZnVuY3Rpb24gKGNvbXByZXNzZWREYXRhKSB7XHJcblx0XHRcdFx0XHRcdGlmIChvbkl0ZW1FbmQpIG9uSXRlbUVuZChuYW1lKTtcclxuXHJcblx0XHRcdFx0XHRcdGVudHJ5LmhlYWRlci5vZmZzZXQgPSBkaW5kZXg7XHJcblx0XHRcdFx0XHRcdC8vIGRhdGEgaGVhZGVyXHJcblx0XHRcdFx0XHRcdHZhciBkYXRhSGVhZGVyID0gZW50cnkuaGVhZGVyLmRhdGFIZWFkZXJUb0JpbmFyeSgpO1xyXG5cdFx0XHRcdFx0XHR2YXIgcG9zdEhlYWRlcjtcclxuXHRcdFx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdFx0XHRwb3N0SGVhZGVyID0gQnVmZmVyLmFsbG9jKG5hbWUubGVuZ3RoLCBuYW1lKTsgIC8vIHVzaW5nIGFsbG9jIHdpbGwgd29yayBvbiBub2RlICA1LngrXHJcblx0XHRcdFx0XHRcdH0gY2F0Y2goZSl7XHJcblx0XHRcdFx0XHRcdFx0cG9zdEhlYWRlciA9IG5ldyBCdWZmZXIobmFtZSk7IC8vIHVzZSBkZXByZWNhdGVkIG1ldGhvZCBpZiBhbGxvYyBmYWlscy4uLlxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdHZhciBkYXRhTGVuZ3RoID0gZGF0YUhlYWRlci5sZW5ndGggKyBwb3N0SGVhZGVyLmxlbmd0aCArIGNvbXByZXNzZWREYXRhLmxlbmd0aDtcclxuXHJcblx0XHRcdFx0XHRcdGRpbmRleCArPSBkYXRhTGVuZ3RoO1xyXG5cclxuXHRcdFx0XHRcdFx0ZGF0YUJsb2NrLnB1c2goZGF0YUhlYWRlcik7XHJcblx0XHRcdFx0XHRcdGRhdGFCbG9jay5wdXNoKHBvc3RIZWFkZXIpO1xyXG5cdFx0XHRcdFx0XHRkYXRhQmxvY2sucHVzaChjb21wcmVzc2VkRGF0YSk7XHJcblxyXG5cdFx0XHRcdFx0XHR2YXIgZW50cnlIZWFkZXIgPSBlbnRyeS5wYWNrSGVhZGVyKCk7XHJcblx0XHRcdFx0XHRcdGVudHJ5SGVhZGVycy5wdXNoKGVudHJ5SGVhZGVyKTtcclxuXHRcdFx0XHRcdFx0bWFpbkhlYWRlci5zaXplICs9IGVudHJ5SGVhZGVyLmxlbmd0aDtcclxuXHRcdFx0XHRcdFx0dG90YWxTaXplICs9IChkYXRhTGVuZ3RoICsgZW50cnlIZWFkZXIubGVuZ3RoKTtcclxuXHJcblx0XHRcdFx0XHRcdGlmIChlbnRyeUxpc3QubGVuZ3RoKSB7XHJcblx0XHRcdFx0XHRcdFx0c2VsZihlbnRyeUxpc3QpO1xyXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xyXG5cclxuXHJcblx0XHRcdFx0XHRcdFx0dG90YWxTaXplICs9IG1haW5IZWFkZXIubWFpbkhlYWRlclNpemU7IC8vIGFsc28gaW5jbHVkZXMgemlwIGZpbGUgY29tbWVudCBsZW5ndGhcclxuXHRcdFx0XHRcdFx0XHQvLyBwb2ludCB0byBlbmQgb2YgZGF0YSBhbmQgYmVnaW5uaW5nIG9mIGNlbnRyYWwgZGlyZWN0b3J5IGZpcnN0IHJlY29yZFxyXG5cdFx0XHRcdFx0XHRcdG1haW5IZWFkZXIub2Zmc2V0ID0gZGluZGV4O1xyXG5cclxuXHRcdFx0XHRcdFx0XHRkaW5kZXggPSAwO1xyXG5cdFx0XHRcdFx0XHRcdHZhciBvdXRCdWZmZXIgPSBCdWZmZXIuYWxsb2ModG90YWxTaXplKTtcclxuXHRcdFx0XHRcdFx0XHRkYXRhQmxvY2suZm9yRWFjaChmdW5jdGlvbiAoY29udGVudCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0Y29udGVudC5jb3B5KG91dEJ1ZmZlciwgZGluZGV4KTsgLy8gd3JpdGUgZGF0YSBibG9ja3NcclxuXHRcdFx0XHRcdFx0XHRcdGRpbmRleCArPSBjb250ZW50Lmxlbmd0aDtcclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0XHRlbnRyeUhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbiAoY29udGVudCkge1xyXG5cdFx0XHRcdFx0XHRcdFx0Y29udGVudC5jb3B5KG91dEJ1ZmZlciwgZGluZGV4KTsgLy8gd3JpdGUgY2VudHJhbCBkaXJlY3RvcnkgZW50cmllc1xyXG5cdFx0XHRcdFx0XHRcdFx0ZGluZGV4ICs9IGNvbnRlbnQubGVuZ3RoO1xyXG5cdFx0XHRcdFx0XHRcdH0pO1xyXG5cclxuXHRcdFx0XHRcdFx0XHR2YXIgbWggPSBtYWluSGVhZGVyLnRvQmluYXJ5KCk7XHJcblx0XHRcdFx0XHRcdFx0aWYgKF9jb21tZW50KSB7XHJcblx0XHRcdFx0XHRcdFx0XHRfY29tbWVudC5jb3B5KG1oLCBVdGlscy5Db25zdGFudHMuRU5ESERSKTsgLy8gYWRkIHppcCBmaWxlIGNvbW1lbnRcclxuXHRcdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRcdG1oLmNvcHkob3V0QnVmZmVyLCBkaW5kZXgpOyAvLyB3cml0ZSBtYWluIGhlYWRlclxyXG5cclxuXHRcdFx0XHRcdFx0XHRvblN1Y2Nlc3Mob3V0QnVmZmVyKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9O1xyXG5cclxuXHRcdFx0Y29tcHJlc3MoZW50cnlMaXN0KTtcclxuXHRcdH1cclxuXHR9XHJcbn07XHJcbiIsIu+7vyd1c2Ugc3RyaWN0JztcblxudmFyIF9kZWZhdWx0ID0gcmVxdWlyZSgnZnMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBfZGVmYXVsdDtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xuICAgIHJlc3VsdFtcImRlZmF1bHRcIl0gPSBtb2Q7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBmc18xID0gcmVxdWlyZShcImZzXCIpO1xuY29uc3QgY29yZSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiQGFjdGlvbnMvY29yZVwiKSk7XG5jb25zdCBwYXRoXzEgPSByZXF1aXJlKFwicGF0aFwiKTtcbmNvbnN0IGV4ZWMgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcIkBhY3Rpb25zL2V4ZWNcIikpO1xuY2xhc3MgRG93bmxvYWQge1xuICAgIGNvbnN0cnVjdG9yKHZlcnNpb24pIHtcbiAgICAgICAgdGhpcy52ZXJzaW9uID0gdmVyc2lvbjtcbiAgICAgICAgdGhpcy5CQVNFX1VSTCA9ICdodHRwczovL2RsLmdvb2dsZS5jb20vZGwvY2xvdWRzZGsvY2hhbm5lbHMvcmFwaWQnO1xuICAgICAgICB0aGlzLnNka1VybCA9IHRoaXMuQkFTRV9VUkw7XG4gICAgICAgIHRoaXMuY29tcHJlc3NNb2RlID0gJ3Rhci5neic7XG4gICAgICAgIHRoaXMuc2V0U2RrRG93bmxvYWRVcmwoKTtcbiAgICB9XG4gICAgZG93bmxvYWQoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCBkZXN0aW5hdGlvbiA9IHBhdGhfMS5yZXNvbHZlKHByb2Nlc3MuY3dkKCksIGBnb29nbGUtY2xvdWQtc2RrLiR7dGhpcy5jb21wcmVzc01vZGV9YCk7XG4gICAgICAgICAgICBpZiAoZnNfMS5leGlzdHNTeW5jKGRlc3RpbmF0aW9uKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkZXN0aW5hdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvcmUuZGVidWcoYERvd25sb2FkaW5nICR7dGhpcy5zZGtVcmx9YCk7XG4gICAgICAgICAgICB5aWVsZCBleGVjLmV4ZWMoYGN1cmwgLW8gJHtkZXN0aW5hdGlvbn0gJHt0aGlzLnNka1VybH1gKTtcbiAgICAgICAgICAgIGNvcmUuZGVidWcoYERvd25sb2FkZWQgJHt0aGlzLnNka1VybH1gKTtcbiAgICAgICAgICAgIHJldHVybiBkZXN0aW5hdGlvbjtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNldFNka0Rvd25sb2FkVXJsKCkge1xuICAgICAgICBpZiAodGhpcy52ZXJzaW9uID09PSAnbGF0ZXN0Jykge1xuICAgICAgICAgICAgaWYgKHByb2Nlc3MucGxhdGZvcm0gPT09ICd3aW4zMicpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNka1VybCA9IGAke3RoaXMuQkFTRV9VUkx9L2dvb2dsZS1jbG91ZC1zZGsuemlwYDtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXByZXNzTW9kZSA9ICd6aXAnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZGtVcmwgPSBgJHt0aGlzLkJBU0VfVVJMfS9nb29nbGUtY2xvdWQtc2RrLnRhci5nemA7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21wcmVzc01vZGUgPSAndGFyLmd6JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChwcm9jZXNzLnBsYXRmb3JtID09PSAnd2luMzInKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZGtVcmwgPSBgJHt0aGlzLkJBU0VfVVJMfS9kb3dubG9hZHMvZ29vZ2xlLWNsb3VkLXNkay0ke3RoaXMudmVyc2lvbn0td2luZG93cy14ODZfNjQuemlwYDtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbXByZXNzTW9kZSA9ICd6aXAnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ2RhcndpbicpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNka1VybCA9IGAke3RoaXMuQkFTRV9VUkx9L2Rvd25sb2Fkcy9nb29nbGUtY2xvdWQtc2RrLSR7dGhpcy52ZXJzaW9ufS1kYXJ3aW4teDg2XzY0LnRhci5nemA7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21wcmVzc01vZGUgPSAndGFyLmd6JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2RrVXJsID0gYCR7dGhpcy5CQVNFX1VSTH0vZG93bmxvYWRzL2dvb2dsZS1jbG91ZC1zZGstJHt0aGlzLnZlcnNpb259LWxpbnV4LXg4Nl82NC50YXIuZ3pgO1xuICAgICAgICAgICAgICAgIHRoaXMuY29tcHJlc3NNb2RlID0gJ3Rhci5neic7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLkRvd25sb2FkID0gRG93bmxvYWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcbiAgICByZXN1bHRbXCJkZWZhdWx0XCJdID0gbW9kO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgZG93bmxvYWRfMSA9IHJlcXVpcmUoXCIuL2Rvd25sb2FkXCIpO1xuY29uc3QgYWRtX3ppcF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJhZG0temlwXCIpKTtcbmNvbnN0IHBhdGhfMSA9IHJlcXVpcmUoXCJwYXRoXCIpO1xuY29uc3QgY29yZSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiQGFjdGlvbnMvY29yZVwiKSk7XG5jb25zdCBleGVjID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJAYWN0aW9ucy9leGVjXCIpKTtcbmNvbnN0IGZzXzEgPSByZXF1aXJlKFwiZnNcIik7XG5mdW5jdGlvbiBpbnN0YWxsKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnN0IGRvd25sb2FkZXIgPSBuZXcgZG93bmxvYWRfMS5Eb3dubG9hZCgnbGF0ZXN0Jyk7XG4gICAgICAgIGNvbnN0IHNka0ZpbGUgPSB5aWVsZCBkb3dubG9hZGVyLmRvd25sb2FkKCk7XG4gICAgICAgIGNvbnN0IGRlc3RpbmF0aW9uRm9sZGVyID0gcGF0aF8xLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJ2dvb2dsZS1jbG91ZC1zZGsnKTtcbiAgICAgICAgaWYgKHNka0ZpbGUuZW5kc1dpdGgoJy56aXAnKSkge1xuICAgICAgICAgICAgY29yZS5kZWJ1ZygnRG93bmxvYWRlZCBmaWxlIGlzIGEgemlwLCB1bnppcHBpbmcuLi4nKTtcbiAgICAgICAgICAgIGNvbnN0IHppcCA9IG5ldyBhZG1femlwXzEuZGVmYXVsdChwYXRoXzEucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBzZGtGaWxlKSk7XG4gICAgICAgICAgICB6aXAuZXh0cmFjdEFsbFRvKGRlc3RpbmF0aW9uRm9sZGVyLCB0cnVlKTtcbiAgICAgICAgICAgIGNvcmUuZGVidWcoYFVuemlwcGVkIHRvICR7ZGVzdGluYXRpb25Gb2xkZXJ9YCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBleGVjLmV4ZWMoJ3RhciAteHZmICcgKyBzZGtGaWxlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJykge1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgeWllbGQgZXhlYy5leGVjKHBhdGhfMS5yZXNvbHZlKGRlc3RpbmF0aW9uRm9sZGVyLCAnaW5zdGFsbC5zaCcpKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzZXJ2aWNlQWNjb3VudEtleUJhc2U2NCA9IGNvcmUuZ2V0SW5wdXQoJ3NlcnZpY2UtYWNjb3VudC1rZXknKTtcbiAgICAgICAgY29uc3Qgc2VydmljZUFjY291bnRLZXlKc29uID0gQnVmZmVyLmZyb20oc2VydmljZUFjY291bnRLZXlCYXNlNjQsICdiYXNlNjQnKTtcbiAgICAgICAgY29uc3Qgc2VydmljZUFjY291bnRLZXlQYXRoID0gcGF0aF8xLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJ2djbG91ZC5qc29uJyk7XG4gICAgICAgIGZzXzEud3JpdGVGaWxlU3luYyhzZXJ2aWNlQWNjb3VudEtleVBhdGgsIHNlcnZpY2VBY2NvdW50S2V5SnNvbik7XG4gICAgICAgIHlpZWxkIGV4ZWMuZXhlYyhgZ2Nsb3VkIGF1dGggYWN0aXZhdGUtc2VydmljZS1hY2NvdW50IC0ta2V5LWZpbGU9JHtzZXJ2aWNlQWNjb3VudEtleVBhdGh9YCk7XG4gICAgfSk7XG59XG5leHBvcnRzLmluc3RhbGwgPSBpbnN0YWxsO1xuaW5zdGFsbCgpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2hpbGRfcHJvY2Vzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJldmVudHNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwib3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ6bGliXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=