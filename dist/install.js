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
const utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
function authenticate() {
    return __awaiter(this, void 0, void 0, function* () {
        const serviceAccountKeyBase64 = core.getInput('service-account-key');
        const serviceAccountKeyJson = Buffer.from(serviceAccountKeyBase64, 'base64');
        const serviceAccountKeyPath = path_1.resolve(process.cwd(), 'gcloud.json');
        const gcloud = path_1.resolve(utils_1.getCloudSDKFolder(), 'bin', 'gcloud');
        fs_1.writeFileSync(serviceAccountKeyPath, serviceAccountKeyJson);
        yield exec.exec(`${gcloud} auth activate-service-account --key-file=${serviceAccountKeyPath}`);
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
Object.defineProperty(exports, "__esModule", { value: true });
const download_1 = __webpack_require__(/*! ./download */ "./src/download.ts");
const setup_1 = __webpack_require__(/*! ./setup */ "./src/setup.ts");
const authenticate_1 = __webpack_require__(/*! ./authenticate */ "./src/authenticate.ts");
function install() {
    return __awaiter(this, void 0, void 0, function* () {
        yield download_1.download();
        yield setup_1.setup();
        yield authenticate_1.authenticate();
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
const fs_1 = __webpack_require__(/*! fs */ "fs");
function setup() {
    return __awaiter(this, void 0, void 0, function* () {
        const installScriptExtension = utils_1.isWindows() ? 'bat' : 'sh';
        const installScript = path_1.resolve(utils_1.getCloudSDKFolder(), `install.${installScriptExtension}`);
        let args;
        if (utils_1.isWindows()) {
            // args = ['/S', `/D=${getCloudSDKFolder()}`, '/singleuser', '/noreporting', '/nostartmenu', '/nodesktop'];
            args = [
                '--usage-reporting=false',
                '--command-completion=false',
                '--path-update=false',
                '--usage-reporting=false',
                // '--additional-components',
                '--quiet'
            ];
        }
        else {
            args = [
                '--usage-reporting=false',
                '--command-completion=false',
                '--path-update=false',
                '--usage-reporting=false',
                // '--additional-components',
                '--quiet'
            ];
        }
        try {
            const ls = fs_1.readdirSync(utils_1.getCloudSDKFolder());
            core.info(ls.join('\n'));
            yield exec.exec(installScript, args);
        }
        catch (e) {
            core.error(e.message);
            process.exit(1);
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
    const home = process.env.HOME ? process.env.HOME : process.cwd();
    return path_1.resolve(home, 'google-cloud-sdk');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhY3Rpb25zL2NvcmUvbGliL2NvbW1hbmQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhY3Rpb25zL2NvcmUvbGliL2NvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhY3Rpb25zL2V4ZWMvbGliL2V4ZWMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhY3Rpb25zL2V4ZWMvbGliL3Rvb2xydW5uZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhY3Rpb25zL2lvL2xpYi9pby11dGlsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYWN0aW9ucy9pby9saWIvaW8uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhY3Rpb25zL3Rvb2wtY2FjaGUvbGliL3Rvb2wtY2FjaGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NlbXZlci9zZW12ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3R1bm5lbC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdHVubmVsL2xpYi90dW5uZWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3R5cGVkLXJlc3QtY2xpZW50L0h0dHBDbGllbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3V1aWQvbGliL2J5dGVzVG9VdWlkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91dWlkL2xpYi9ybmcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3V1aWQvdjQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2F1dGhlbnRpY2F0ZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZG93bmxvYWQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luc3RhbGwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NldHVwLnRzIiwid2VicGFjazovLy8uL3NyYy91dGlscy50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJhc3NlcnRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjaGlsZF9wcm9jZXNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY3J5cHRvXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZXZlbnRzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZnNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJodHRwXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiaHR0cHNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJuZXRcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJvc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInBhdGhcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ0bHNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ1cmxcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ1dGlsXCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNB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O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixvQ0FBb0M7QUFDeEQsMEJBQTBCLG9DQUFvQztBQUM5RCwwQkFBMEIsb0NBQW9DO0FBQzlEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixXQUFXO0FBQ1g7QUFDQSxPQUFPO0FBQ1A7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFD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QUNBO0FBQ0EsK0VBQStFO0FBQy9FO0FBQ0E7QUFDQSw2RUFBNkU7QUFDN0U7QUFDQTtBQUNBLDhFQUE4RTtBQUM5RTtBQUNBO0FBQ0EsNEVBQTRFO0FBQzVFO0FBQ0E7QUFDQSw2RUFBNkU7QUFDN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLDBCQUEwQjtBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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USw4QkFBOEIsUUFBUTtBQUNoRTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2pEQSxtQzs7Ozs7Ozs7Ozs7QUNBQSwwQzs7Ozs7Ozs7Ozs7QUNBQSxtQzs7Ozs7Ozs7Ozs7QUNBQSxtQzs7Ozs7Ozs7Ozs7QUNBQSwrQjs7Ozs7Ozs7Ozs7QUNBQSxpQzs7Ozs7Ozs7Ozs7QUNBQSxrQzs7Ozs7Ozs7Ozs7QUNBQSxnQzs7Ozs7Ozs7Ozs7QUNBQSwrQjs7Ozs7Ozs7Ozs7QUNBQSxpQzs7Ozs7Ozs7Ozs7QUNBQSxnQzs7Ozs7Ozs7Ozs7QUNBQSxnQzs7Ozs7Ozs7Ozs7QUNBQSxpQyIsImZpbGUiOiJpbnN0YWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5zdGFsbC50c1wiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3Qgb3MgPSByZXF1aXJlKFwib3NcIik7XG4vKipcbiAqIENvbW1hbmRzXG4gKlxuICogQ29tbWFuZCBGb3JtYXQ6XG4gKiAgICMjW25hbWUga2V5PXZhbHVlO2tleT12YWx1ZV1tZXNzYWdlXG4gKlxuICogRXhhbXBsZXM6XG4gKiAgICMjW3dhcm5pbmddVGhpcyBpcyB0aGUgdXNlciB3YXJuaW5nIG1lc3NhZ2VcbiAqICAgIyNbc2V0LXNlY3JldCBuYW1lPW15cGFzc3dvcmRdZGVmaW5pdGVseU5vdEFQYXNzd29yZCFcbiAqL1xuZnVuY3Rpb24gaXNzdWVDb21tYW5kKGNvbW1hbmQsIHByb3BlcnRpZXMsIG1lc3NhZ2UpIHtcbiAgICBjb25zdCBjbWQgPSBuZXcgQ29tbWFuZChjb21tYW5kLCBwcm9wZXJ0aWVzLCBtZXNzYWdlKTtcbiAgICBwcm9jZXNzLnN0ZG91dC53cml0ZShjbWQudG9TdHJpbmcoKSArIG9zLkVPTCk7XG59XG5leHBvcnRzLmlzc3VlQ29tbWFuZCA9IGlzc3VlQ29tbWFuZDtcbmZ1bmN0aW9uIGlzc3VlKG5hbWUsIG1lc3NhZ2UgPSAnJykge1xuICAgIGlzc3VlQ29tbWFuZChuYW1lLCB7fSwgbWVzc2FnZSk7XG59XG5leHBvcnRzLmlzc3VlID0gaXNzdWU7XG5jb25zdCBDTURfU1RSSU5HID0gJzo6JztcbmNsYXNzIENvbW1hbmQge1xuICAgIGNvbnN0cnVjdG9yKGNvbW1hbmQsIHByb3BlcnRpZXMsIG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKCFjb21tYW5kKSB7XG4gICAgICAgICAgICBjb21tYW5kID0gJ21pc3NpbmcuY29tbWFuZCc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb21tYW5kID0gY29tbWFuZDtcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzID0gcHJvcGVydGllcztcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICB9XG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIGxldCBjbWRTdHIgPSBDTURfU1RSSU5HICsgdGhpcy5jb21tYW5kO1xuICAgICAgICBpZiAodGhpcy5wcm9wZXJ0aWVzICYmIE9iamVjdC5rZXlzKHRoaXMucHJvcGVydGllcykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY21kU3RyICs9ICcgJztcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMucHJvcGVydGllcykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWwgPSB0aGlzLnByb3BlcnRpZXNba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2FmZWx5IGFwcGVuZCB0aGUgdmFsIC0gYXZvaWQgYmxvd2luZyB1cCB3aGVuIGF0dGVtcHRpbmcgdG9cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNhbGwgLnJlcGxhY2UoKSBpZiBtZXNzYWdlIGlzIG5vdCBhIHN0cmluZyBmb3Igc29tZSByZWFzb25cbiAgICAgICAgICAgICAgICAgICAgICAgIGNtZFN0ciArPSBgJHtrZXl9PSR7ZXNjYXBlKGAke3ZhbCB8fCAnJ31gKX0sYDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjbWRTdHIgKz0gQ01EX1NUUklORztcbiAgICAgICAgLy8gc2FmZWx5IGFwcGVuZCB0aGUgbWVzc2FnZSAtIGF2b2lkIGJsb3dpbmcgdXAgd2hlbiBhdHRlbXB0aW5nIHRvXG4gICAgICAgIC8vIGNhbGwgLnJlcGxhY2UoKSBpZiBtZXNzYWdlIGlzIG5vdCBhIHN0cmluZyBmb3Igc29tZSByZWFzb25cbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGAke3RoaXMubWVzc2FnZSB8fCAnJ31gO1xuICAgICAgICBjbWRTdHIgKz0gZXNjYXBlRGF0YShtZXNzYWdlKTtcbiAgICAgICAgcmV0dXJuIGNtZFN0cjtcbiAgICB9XG59XG5mdW5jdGlvbiBlc2NhcGVEYXRhKHMpIHtcbiAgICByZXR1cm4gcy5yZXBsYWNlKC9cXHIvZywgJyUwRCcpLnJlcGxhY2UoL1xcbi9nLCAnJTBBJyk7XG59XG5mdW5jdGlvbiBlc2NhcGUocykge1xuICAgIHJldHVybiBzXG4gICAgICAgIC5yZXBsYWNlKC9cXHIvZywgJyUwRCcpXG4gICAgICAgIC5yZXBsYWNlKC9cXG4vZywgJyUwQScpXG4gICAgICAgIC5yZXBsYWNlKC9dL2csICclNUQnKVxuICAgICAgICAucmVwbGFjZSgvOy9nLCAnJTNCJyk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb21tYW5kLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjb21tYW5kXzEgPSByZXF1aXJlKFwiLi9jb21tYW5kXCIpO1xuY29uc3Qgb3MgPSByZXF1aXJlKFwib3NcIik7XG5jb25zdCBwYXRoID0gcmVxdWlyZShcInBhdGhcIik7XG4vKipcbiAqIFRoZSBjb2RlIHRvIGV4aXQgYW4gYWN0aW9uXG4gKi9cbnZhciBFeGl0Q29kZTtcbihmdW5jdGlvbiAoRXhpdENvZGUpIHtcbiAgICAvKipcbiAgICAgKiBBIGNvZGUgaW5kaWNhdGluZyB0aGF0IHRoZSBhY3Rpb24gd2FzIHN1Y2Nlc3NmdWxcbiAgICAgKi9cbiAgICBFeGl0Q29kZVtFeGl0Q29kZVtcIlN1Y2Nlc3NcIl0gPSAwXSA9IFwiU3VjY2Vzc1wiO1xuICAgIC8qKlxuICAgICAqIEEgY29kZSBpbmRpY2F0aW5nIHRoYXQgdGhlIGFjdGlvbiB3YXMgYSBmYWlsdXJlXG4gICAgICovXG4gICAgRXhpdENvZGVbRXhpdENvZGVbXCJGYWlsdXJlXCJdID0gMV0gPSBcIkZhaWx1cmVcIjtcbn0pKEV4aXRDb2RlID0gZXhwb3J0cy5FeGl0Q29kZSB8fCAoZXhwb3J0cy5FeGl0Q29kZSA9IHt9KSk7XG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBWYXJpYWJsZXNcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8qKlxuICogU2V0cyBlbnYgdmFyaWFibGUgZm9yIHRoaXMgYWN0aW9uIGFuZCBmdXR1cmUgYWN0aW9ucyBpbiB0aGUgam9iXG4gKiBAcGFyYW0gbmFtZSB0aGUgbmFtZSBvZiB0aGUgdmFyaWFibGUgdG8gc2V0XG4gKiBAcGFyYW0gdmFsIHRoZSB2YWx1ZSBvZiB0aGUgdmFyaWFibGVcbiAqL1xuZnVuY3Rpb24gZXhwb3J0VmFyaWFibGUobmFtZSwgdmFsKSB7XG4gICAgcHJvY2Vzcy5lbnZbbmFtZV0gPSB2YWw7XG4gICAgY29tbWFuZF8xLmlzc3VlQ29tbWFuZCgnc2V0LWVudicsIHsgbmFtZSB9LCB2YWwpO1xufVxuZXhwb3J0cy5leHBvcnRWYXJpYWJsZSA9IGV4cG9ydFZhcmlhYmxlO1xuLyoqXG4gKiBSZWdpc3RlcnMgYSBzZWNyZXQgd2hpY2ggd2lsbCBnZXQgbWFza2VkIGZyb20gbG9nc1xuICogQHBhcmFtIHNlY3JldCB2YWx1ZSBvZiB0aGUgc2VjcmV0XG4gKi9cbmZ1bmN0aW9uIHNldFNlY3JldChzZWNyZXQpIHtcbiAgICBjb21tYW5kXzEuaXNzdWVDb21tYW5kKCdhZGQtbWFzaycsIHt9LCBzZWNyZXQpO1xufVxuZXhwb3J0cy5zZXRTZWNyZXQgPSBzZXRTZWNyZXQ7XG4vKipcbiAqIFByZXBlbmRzIGlucHV0UGF0aCB0byB0aGUgUEFUSCAoZm9yIHRoaXMgYWN0aW9uIGFuZCBmdXR1cmUgYWN0aW9ucylcbiAqIEBwYXJhbSBpbnB1dFBhdGhcbiAqL1xuZnVuY3Rpb24gYWRkUGF0aChpbnB1dFBhdGgpIHtcbiAgICBjb21tYW5kXzEuaXNzdWVDb21tYW5kKCdhZGQtcGF0aCcsIHt9LCBpbnB1dFBhdGgpO1xuICAgIHByb2Nlc3MuZW52WydQQVRIJ10gPSBgJHtpbnB1dFBhdGh9JHtwYXRoLmRlbGltaXRlcn0ke3Byb2Nlc3MuZW52WydQQVRIJ119YDtcbn1cbmV4cG9ydHMuYWRkUGF0aCA9IGFkZFBhdGg7XG4vKipcbiAqIEdldHMgdGhlIHZhbHVlIG9mIGFuIGlucHV0LiAgVGhlIHZhbHVlIGlzIGFsc28gdHJpbW1lZC5cbiAqXG4gKiBAcGFyYW0gICAgIG5hbWUgICAgIG5hbWUgb2YgdGhlIGlucHV0IHRvIGdldFxuICogQHBhcmFtICAgICBvcHRpb25zICBvcHRpb25hbC4gU2VlIElucHV0T3B0aW9ucy5cbiAqIEByZXR1cm5zICAgc3RyaW5nXG4gKi9cbmZ1bmN0aW9uIGdldElucHV0KG5hbWUsIG9wdGlvbnMpIHtcbiAgICBjb25zdCB2YWwgPSBwcm9jZXNzLmVudltgSU5QVVRfJHtuYW1lLnJlcGxhY2UoLyAvZywgJ18nKS50b1VwcGVyQ2FzZSgpfWBdIHx8ICcnO1xuICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMucmVxdWlyZWQgJiYgIXZhbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYElucHV0IHJlcXVpcmVkIGFuZCBub3Qgc3VwcGxpZWQ6ICR7bmFtZX1gKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbC50cmltKCk7XG59XG5leHBvcnRzLmdldElucHV0ID0gZ2V0SW5wdXQ7XG4vKipcbiAqIFNldHMgdGhlIHZhbHVlIG9mIGFuIG91dHB1dC5cbiAqXG4gKiBAcGFyYW0gICAgIG5hbWUgICAgIG5hbWUgb2YgdGhlIG91dHB1dCB0byBzZXRcbiAqIEBwYXJhbSAgICAgdmFsdWUgICAgdmFsdWUgdG8gc3RvcmVcbiAqL1xuZnVuY3Rpb24gc2V0T3V0cHV0KG5hbWUsIHZhbHVlKSB7XG4gICAgY29tbWFuZF8xLmlzc3VlQ29tbWFuZCgnc2V0LW91dHB1dCcsIHsgbmFtZSB9LCB2YWx1ZSk7XG59XG5leHBvcnRzLnNldE91dHB1dCA9IHNldE91dHB1dDtcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFJlc3VsdHNcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8qKlxuICogU2V0cyB0aGUgYWN0aW9uIHN0YXR1cyB0byBmYWlsZWQuXG4gKiBXaGVuIHRoZSBhY3Rpb24gZXhpdHMgaXQgd2lsbCBiZSB3aXRoIGFuIGV4aXQgY29kZSBvZiAxXG4gKiBAcGFyYW0gbWVzc2FnZSBhZGQgZXJyb3IgaXNzdWUgbWVzc2FnZVxuICovXG5mdW5jdGlvbiBzZXRGYWlsZWQobWVzc2FnZSkge1xuICAgIHByb2Nlc3MuZXhpdENvZGUgPSBFeGl0Q29kZS5GYWlsdXJlO1xuICAgIGVycm9yKG1lc3NhZ2UpO1xufVxuZXhwb3J0cy5zZXRGYWlsZWQgPSBzZXRGYWlsZWQ7XG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBMb2dnaW5nIENvbW1hbmRzXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vKipcbiAqIFdyaXRlcyBkZWJ1ZyBtZXNzYWdlIHRvIHVzZXIgbG9nXG4gKiBAcGFyYW0gbWVzc2FnZSBkZWJ1ZyBtZXNzYWdlXG4gKi9cbmZ1bmN0aW9uIGRlYnVnKG1lc3NhZ2UpIHtcbiAgICBjb21tYW5kXzEuaXNzdWVDb21tYW5kKCdkZWJ1ZycsIHt9LCBtZXNzYWdlKTtcbn1cbmV4cG9ydHMuZGVidWcgPSBkZWJ1Zztcbi8qKlxuICogQWRkcyBhbiBlcnJvciBpc3N1ZVxuICogQHBhcmFtIG1lc3NhZ2UgZXJyb3IgaXNzdWUgbWVzc2FnZVxuICovXG5mdW5jdGlvbiBlcnJvcihtZXNzYWdlKSB7XG4gICAgY29tbWFuZF8xLmlzc3VlKCdlcnJvcicsIG1lc3NhZ2UpO1xufVxuZXhwb3J0cy5lcnJvciA9IGVycm9yO1xuLyoqXG4gKiBBZGRzIGFuIHdhcm5pbmcgaXNzdWVcbiAqIEBwYXJhbSBtZXNzYWdlIHdhcm5pbmcgaXNzdWUgbWVzc2FnZVxuICovXG5mdW5jdGlvbiB3YXJuaW5nKG1lc3NhZ2UpIHtcbiAgICBjb21tYW5kXzEuaXNzdWUoJ3dhcm5pbmcnLCBtZXNzYWdlKTtcbn1cbmV4cG9ydHMud2FybmluZyA9IHdhcm5pbmc7XG4vKipcbiAqIFdyaXRlcyBpbmZvIHRvIGxvZyB3aXRoIGNvbnNvbGUubG9nLlxuICogQHBhcmFtIG1lc3NhZ2UgaW5mbyBtZXNzYWdlXG4gKi9cbmZ1bmN0aW9uIGluZm8obWVzc2FnZSkge1xuICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKG1lc3NhZ2UgKyBvcy5FT0wpO1xufVxuZXhwb3J0cy5pbmZvID0gaW5mbztcbi8qKlxuICogQmVnaW4gYW4gb3V0cHV0IGdyb3VwLlxuICpcbiAqIE91dHB1dCB1bnRpbCB0aGUgbmV4dCBgZ3JvdXBFbmRgIHdpbGwgYmUgZm9sZGFibGUgaW4gdGhpcyBncm91cFxuICpcbiAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBvdXRwdXQgZ3JvdXBcbiAqL1xuZnVuY3Rpb24gc3RhcnRHcm91cChuYW1lKSB7XG4gICAgY29tbWFuZF8xLmlzc3VlKCdncm91cCcsIG5hbWUpO1xufVxuZXhwb3J0cy5zdGFydEdyb3VwID0gc3RhcnRHcm91cDtcbi8qKlxuICogRW5kIGFuIG91dHB1dCBncm91cC5cbiAqL1xuZnVuY3Rpb24gZW5kR3JvdXAoKSB7XG4gICAgY29tbWFuZF8xLmlzc3VlKCdlbmRncm91cCcpO1xufVxuZXhwb3J0cy5lbmRHcm91cCA9IGVuZEdyb3VwO1xuLyoqXG4gKiBXcmFwIGFuIGFzeW5jaHJvbm91cyBmdW5jdGlvbiBjYWxsIGluIGEgZ3JvdXAuXG4gKlxuICogUmV0dXJucyB0aGUgc2FtZSB0eXBlIGFzIHRoZSBmdW5jdGlvbiBpdHNlbGYuXG4gKlxuICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIGdyb3VwXG4gKiBAcGFyYW0gZm4gVGhlIGZ1bmN0aW9uIHRvIHdyYXAgaW4gdGhlIGdyb3VwXG4gKi9cbmZ1bmN0aW9uIGdyb3VwKG5hbWUsIGZuKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgc3RhcnRHcm91cChuYW1lKTtcbiAgICAgICAgbGV0IHJlc3VsdDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHlpZWxkIGZuKCk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBlbmRHcm91cCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSk7XG59XG5leHBvcnRzLmdyb3VwID0gZ3JvdXA7XG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBXcmFwcGVyIGFjdGlvbiBzdGF0ZVxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLyoqXG4gKiBTYXZlcyBzdGF0ZSBmb3IgY3VycmVudCBhY3Rpb24sIHRoZSBzdGF0ZSBjYW4gb25seSBiZSByZXRyaWV2ZWQgYnkgdGhpcyBhY3Rpb24ncyBwb3N0IGpvYiBleGVjdXRpb24uXG4gKlxuICogQHBhcmFtICAgICBuYW1lICAgICBuYW1lIG9mIHRoZSBzdGF0ZSB0byBzdG9yZVxuICogQHBhcmFtICAgICB2YWx1ZSAgICB2YWx1ZSB0byBzdG9yZVxuICovXG5mdW5jdGlvbiBzYXZlU3RhdGUobmFtZSwgdmFsdWUpIHtcbiAgICBjb21tYW5kXzEuaXNzdWVDb21tYW5kKCdzYXZlLXN0YXRlJywgeyBuYW1lIH0sIHZhbHVlKTtcbn1cbmV4cG9ydHMuc2F2ZVN0YXRlID0gc2F2ZVN0YXRlO1xuLyoqXG4gKiBHZXRzIHRoZSB2YWx1ZSBvZiBhbiBzdGF0ZSBzZXQgYnkgdGhpcyBhY3Rpb24ncyBtYWluIGV4ZWN1dGlvbi5cbiAqXG4gKiBAcGFyYW0gICAgIG5hbWUgICAgIG5hbWUgb2YgdGhlIHN0YXRlIHRvIGdldFxuICogQHJldHVybnMgICBzdHJpbmdcbiAqL1xuZnVuY3Rpb24gZ2V0U3RhdGUobmFtZSkge1xuICAgIHJldHVybiBwcm9jZXNzLmVudltgU1RBVEVfJHtuYW1lfWBdIHx8ICcnO1xufVxuZXhwb3J0cy5nZXRTdGF0ZSA9IGdldFN0YXRlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29yZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgdHIgPSByZXF1aXJlKFwiLi90b29scnVubmVyXCIpO1xuLyoqXG4gKiBFeGVjIGEgY29tbWFuZC5cbiAqIE91dHB1dCB3aWxsIGJlIHN0cmVhbWVkIHRvIHRoZSBsaXZlIGNvbnNvbGUuXG4gKiBSZXR1cm5zIHByb21pc2Ugd2l0aCByZXR1cm4gY29kZVxuICpcbiAqIEBwYXJhbSAgICAgY29tbWFuZExpbmUgICAgICAgIGNvbW1hbmQgdG8gZXhlY3V0ZSAoY2FuIGluY2x1ZGUgYWRkaXRpb25hbCBhcmdzKS4gTXVzdCBiZSBjb3JyZWN0bHkgZXNjYXBlZC5cbiAqIEBwYXJhbSAgICAgYXJncyAgICAgICAgICAgICAgIG9wdGlvbmFsIGFyZ3VtZW50cyBmb3IgdG9vbC4gRXNjYXBpbmcgaXMgaGFuZGxlZCBieSB0aGUgbGliLlxuICogQHBhcmFtICAgICBvcHRpb25zICAgICAgICAgICAgb3B0aW9uYWwgZXhlYyBvcHRpb25zLiAgU2VlIEV4ZWNPcHRpb25zXG4gKiBAcmV0dXJucyAgIFByb21pc2U8bnVtYmVyPiAgICBleGl0IGNvZGVcbiAqL1xuZnVuY3Rpb24gZXhlYyhjb21tYW5kTGluZSwgYXJncywgb3B0aW9ucykge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnN0IGNvbW1hbmRBcmdzID0gdHIuYXJnU3RyaW5nVG9BcnJheShjb21tYW5kTGluZSk7XG4gICAgICAgIGlmIChjb21tYW5kQXJncy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgUGFyYW1ldGVyICdjb21tYW5kTGluZScgY2Fubm90IGJlIG51bGwgb3IgZW1wdHkuYCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gUGF0aCB0byB0b29sIHRvIGV4ZWN1dGUgc2hvdWxkIGJlIGZpcnN0IGFyZ1xuICAgICAgICBjb25zdCB0b29sUGF0aCA9IGNvbW1hbmRBcmdzWzBdO1xuICAgICAgICBhcmdzID0gY29tbWFuZEFyZ3Muc2xpY2UoMSkuY29uY2F0KGFyZ3MgfHwgW10pO1xuICAgICAgICBjb25zdCBydW5uZXIgPSBuZXcgdHIuVG9vbFJ1bm5lcih0b29sUGF0aCwgYXJncywgb3B0aW9ucyk7XG4gICAgICAgIHJldHVybiBydW5uZXIuZXhlYygpO1xuICAgIH0pO1xufVxuZXhwb3J0cy5leGVjID0gZXhlYztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWV4ZWMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IG9zID0gcmVxdWlyZShcIm9zXCIpO1xuY29uc3QgZXZlbnRzID0gcmVxdWlyZShcImV2ZW50c1wiKTtcbmNvbnN0IGNoaWxkID0gcmVxdWlyZShcImNoaWxkX3Byb2Nlc3NcIik7XG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvdW5ib3VuZC1tZXRob2QgKi9cbmNvbnN0IElTX1dJTkRPV1MgPSBwcm9jZXNzLnBsYXRmb3JtID09PSAnd2luMzInO1xuLypcbiAqIENsYXNzIGZvciBydW5uaW5nIGNvbW1hbmQgbGluZSB0b29scy4gSGFuZGxlcyBxdW90aW5nIGFuZCBhcmcgcGFyc2luZyBpbiBhIHBsYXRmb3JtIGFnbm9zdGljIHdheS5cbiAqL1xuY2xhc3MgVG9vbFJ1bm5lciBleHRlbmRzIGV2ZW50cy5FdmVudEVtaXR0ZXIge1xuICAgIGNvbnN0cnVjdG9yKHRvb2xQYXRoLCBhcmdzLCBvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIGlmICghdG9vbFBhdGgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBhcmFtZXRlciAndG9vbFBhdGgnIGNhbm5vdCBiZSBudWxsIG9yIGVtcHR5LlwiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRvb2xQYXRoID0gdG9vbFBhdGg7XG4gICAgICAgIHRoaXMuYXJncyA9IGFyZ3MgfHwgW107XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgfVxuICAgIF9kZWJ1ZyhtZXNzYWdlKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMubGlzdGVuZXJzICYmIHRoaXMub3B0aW9ucy5saXN0ZW5lcnMuZGVidWcpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5saXN0ZW5lcnMuZGVidWcobWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2dldENvbW1hbmRTdHJpbmcob3B0aW9ucywgbm9QcmVmaXgpIHtcbiAgICAgICAgY29uc3QgdG9vbFBhdGggPSB0aGlzLl9nZXRTcGF3bkZpbGVOYW1lKCk7XG4gICAgICAgIGNvbnN0IGFyZ3MgPSB0aGlzLl9nZXRTcGF3bkFyZ3Mob3B0aW9ucyk7XG4gICAgICAgIGxldCBjbWQgPSBub1ByZWZpeCA/ICcnIDogJ1tjb21tYW5kXSc7IC8vIG9taXQgcHJlZml4IHdoZW4gcGlwZWQgdG8gYSBzZWNvbmQgdG9vbFxuICAgICAgICBpZiAoSVNfV0lORE9XUykge1xuICAgICAgICAgICAgLy8gV2luZG93cyArIGNtZCBmaWxlXG4gICAgICAgICAgICBpZiAodGhpcy5faXNDbWRGaWxlKCkpIHtcbiAgICAgICAgICAgICAgICBjbWQgKz0gdG9vbFBhdGg7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBhIG9mIGFyZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgY21kICs9IGAgJHthfWA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gV2luZG93cyArIHZlcmJhdGltXG4gICAgICAgICAgICBlbHNlIGlmIChvcHRpb25zLndpbmRvd3NWZXJiYXRpbUFyZ3VtZW50cykge1xuICAgICAgICAgICAgICAgIGNtZCArPSBgXCIke3Rvb2xQYXRofVwiYDtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGEgb2YgYXJncykge1xuICAgICAgICAgICAgICAgICAgICBjbWQgKz0gYCAke2F9YDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBXaW5kb3dzIChyZWd1bGFyKVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY21kICs9IHRoaXMuX3dpbmRvd3NRdW90ZUNtZEFyZyh0b29sUGF0aCk7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBhIG9mIGFyZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgY21kICs9IGAgJHt0aGlzLl93aW5kb3dzUXVvdGVDbWRBcmcoYSl9YDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBPU1gvTGludXggLSB0aGlzIGNhbiBsaWtlbHkgYmUgaW1wcm92ZWQgd2l0aCBzb21lIGZvcm0gb2YgcXVvdGluZy5cbiAgICAgICAgICAgIC8vIGNyZWF0aW5nIHByb2Nlc3NlcyBvbiBVbml4IGlzIGZ1bmRhbWVudGFsbHkgZGlmZmVyZW50IHRoYW4gV2luZG93cy5cbiAgICAgICAgICAgIC8vIG9uIFVuaXgsIGV4ZWN2cCgpIHRha2VzIGFuIGFyZyBhcnJheS5cbiAgICAgICAgICAgIGNtZCArPSB0b29sUGF0aDtcbiAgICAgICAgICAgIGZvciAoY29uc3QgYSBvZiBhcmdzKSB7XG4gICAgICAgICAgICAgICAgY21kICs9IGAgJHthfWA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNtZDtcbiAgICB9XG4gICAgX3Byb2Nlc3NMaW5lQnVmZmVyKGRhdGEsIHN0ckJ1ZmZlciwgb25MaW5lKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgcyA9IHN0ckJ1ZmZlciArIGRhdGEudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIGxldCBuID0gcy5pbmRleE9mKG9zLkVPTCk7XG4gICAgICAgICAgICB3aGlsZSAobiA+IC0xKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbGluZSA9IHMuc3Vic3RyaW5nKDAsIG4pO1xuICAgICAgICAgICAgICAgIG9uTGluZShsaW5lKTtcbiAgICAgICAgICAgICAgICAvLyB0aGUgcmVzdCBvZiB0aGUgc3RyaW5nIC4uLlxuICAgICAgICAgICAgICAgIHMgPSBzLnN1YnN0cmluZyhuICsgb3MuRU9MLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgbiA9IHMuaW5kZXhPZihvcy5FT0wpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3RyQnVmZmVyID0gcztcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAvLyBzdHJlYW1pbmcgbGluZXMgdG8gY29uc29sZSBpcyBiZXN0IGVmZm9ydC4gIERvbid0IGZhaWwgYSBidWlsZC5cbiAgICAgICAgICAgIHRoaXMuX2RlYnVnKGBlcnJvciBwcm9jZXNzaW5nIGxpbmUuIEZhaWxlZCB3aXRoIGVycm9yICR7ZXJyfWApO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9nZXRTcGF3bkZpbGVOYW1lKCkge1xuICAgICAgICBpZiAoSVNfV0lORE9XUykge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2lzQ21kRmlsZSgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb2Nlc3MuZW52WydDT01TUEVDJ10gfHwgJ2NtZC5leGUnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnRvb2xQYXRoO1xuICAgIH1cbiAgICBfZ2V0U3Bhd25BcmdzKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKElTX1dJTkRPV1MpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9pc0NtZEZpbGUoKSkge1xuICAgICAgICAgICAgICAgIGxldCBhcmdsaW5lID0gYC9EIC9TIC9DIFwiJHt0aGlzLl93aW5kb3dzUXVvdGVDbWRBcmcodGhpcy50b29sUGF0aCl9YDtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGEgb2YgdGhpcy5hcmdzKSB7XG4gICAgICAgICAgICAgICAgICAgIGFyZ2xpbmUgKz0gJyAnO1xuICAgICAgICAgICAgICAgICAgICBhcmdsaW5lICs9IG9wdGlvbnMud2luZG93c1ZlcmJhdGltQXJndW1lbnRzXG4gICAgICAgICAgICAgICAgICAgICAgICA/IGFcbiAgICAgICAgICAgICAgICAgICAgICAgIDogdGhpcy5fd2luZG93c1F1b3RlQ21kQXJnKGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhcmdsaW5lICs9ICdcIic7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFthcmdsaW5lXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5hcmdzO1xuICAgIH1cbiAgICBfZW5kc1dpdGgoc3RyLCBlbmQpIHtcbiAgICAgICAgcmV0dXJuIHN0ci5lbmRzV2l0aChlbmQpO1xuICAgIH1cbiAgICBfaXNDbWRGaWxlKCkge1xuICAgICAgICBjb25zdCB1cHBlclRvb2xQYXRoID0gdGhpcy50b29sUGF0aC50b1VwcGVyQ2FzZSgpO1xuICAgICAgICByZXR1cm4gKHRoaXMuX2VuZHNXaXRoKHVwcGVyVG9vbFBhdGgsICcuQ01EJykgfHxcbiAgICAgICAgICAgIHRoaXMuX2VuZHNXaXRoKHVwcGVyVG9vbFBhdGgsICcuQkFUJykpO1xuICAgIH1cbiAgICBfd2luZG93c1F1b3RlQ21kQXJnKGFyZykge1xuICAgICAgICAvLyBmb3IgLmV4ZSwgYXBwbHkgdGhlIG5vcm1hbCBxdW90aW5nIHJ1bGVzIHRoYXQgbGlidXYgYXBwbGllc1xuICAgICAgICBpZiAoIXRoaXMuX2lzQ21kRmlsZSgpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdXZRdW90ZUNtZEFyZyhhcmcpO1xuICAgICAgICB9XG4gICAgICAgIC8vIG90aGVyd2lzZSBhcHBseSBxdW90aW5nIHJ1bGVzIHNwZWNpZmljIHRvIHRoZSBjbWQuZXhlIGNvbW1hbmQgbGluZSBwYXJzZXIuXG4gICAgICAgIC8vIHRoZSBsaWJ1diBydWxlcyBhcmUgZ2VuZXJpYyBhbmQgYXJlIG5vdCBkZXNpZ25lZCBzcGVjaWZpY2FsbHkgZm9yIGNtZC5leGVcbiAgICAgICAgLy8gY29tbWFuZCBsaW5lIHBhcnNlci5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gZm9yIGEgZGV0YWlsZWQgZGVzY3JpcHRpb24gb2YgdGhlIGNtZC5leGUgY29tbWFuZCBsaW5lIHBhcnNlciwgcmVmZXIgdG9cbiAgICAgICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy80MDk0Njk5L2hvdy1kb2VzLXRoZS13aW5kb3dzLWNvbW1hbmQtaW50ZXJwcmV0ZXItY21kLWV4ZS1wYXJzZS1zY3JpcHRzLzc5NzA5MTIjNzk3MDkxMlxuICAgICAgICAvLyBuZWVkIHF1b3RlcyBmb3IgZW1wdHkgYXJnXG4gICAgICAgIGlmICghYXJnKSB7XG4gICAgICAgICAgICByZXR1cm4gJ1wiXCInO1xuICAgICAgICB9XG4gICAgICAgIC8vIGRldGVybWluZSB3aGV0aGVyIHRoZSBhcmcgbmVlZHMgdG8gYmUgcXVvdGVkXG4gICAgICAgIGNvbnN0IGNtZFNwZWNpYWxDaGFycyA9IFtcbiAgICAgICAgICAgICcgJyxcbiAgICAgICAgICAgICdcXHQnLFxuICAgICAgICAgICAgJyYnLFxuICAgICAgICAgICAgJygnLFxuICAgICAgICAgICAgJyknLFxuICAgICAgICAgICAgJ1snLFxuICAgICAgICAgICAgJ10nLFxuICAgICAgICAgICAgJ3snLFxuICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgJ14nLFxuICAgICAgICAgICAgJz0nLFxuICAgICAgICAgICAgJzsnLFxuICAgICAgICAgICAgJyEnLFxuICAgICAgICAgICAgXCInXCIsXG4gICAgICAgICAgICAnKycsXG4gICAgICAgICAgICAnLCcsXG4gICAgICAgICAgICAnYCcsXG4gICAgICAgICAgICAnficsXG4gICAgICAgICAgICAnfCcsXG4gICAgICAgICAgICAnPCcsXG4gICAgICAgICAgICAnPicsXG4gICAgICAgICAgICAnXCInXG4gICAgICAgIF07XG4gICAgICAgIGxldCBuZWVkc1F1b3RlcyA9IGZhbHNlO1xuICAgICAgICBmb3IgKGNvbnN0IGNoYXIgb2YgYXJnKSB7XG4gICAgICAgICAgICBpZiAoY21kU3BlY2lhbENoYXJzLnNvbWUoeCA9PiB4ID09PSBjaGFyKSkge1xuICAgICAgICAgICAgICAgIG5lZWRzUXVvdGVzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBzaG9ydC1jaXJjdWl0IGlmIHF1b3RlcyBub3QgbmVlZGVkXG4gICAgICAgIGlmICghbmVlZHNRdW90ZXMpIHtcbiAgICAgICAgICAgIHJldHVybiBhcmc7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdGhlIGZvbGxvd2luZyBxdW90aW5nIHJ1bGVzIGFyZSB2ZXJ5IHNpbWlsYXIgdG8gdGhlIHJ1bGVzIHRoYXQgYnkgbGlidXYgYXBwbGllcy5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gMSkgd3JhcCB0aGUgc3RyaW5nIGluIHF1b3Rlc1xuICAgICAgICAvL1xuICAgICAgICAvLyAyKSBkb3VibGUtdXAgcXVvdGVzIC0gaS5lLiBcIiA9PiBcIlwiXG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgIHRoaXMgaXMgZGlmZmVyZW50IGZyb20gdGhlIGxpYnV2IHF1b3RpbmcgcnVsZXMuIGxpYnV2IHJlcGxhY2VzIFwiIHdpdGggXFxcIiwgd2hpY2ggdW5mb3J0dW5hdGVseVxuICAgICAgICAvLyAgICBkb2Vzbid0IHdvcmsgd2VsbCB3aXRoIGEgY21kLmV4ZSBjb21tYW5kIGxpbmUuXG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgIG5vdGUsIHJlcGxhY2luZyBcIiB3aXRoIFwiXCIgYWxzbyB3b3JrcyB3ZWxsIGlmIHRoZSBhcmcgaXMgcGFzc2VkIHRvIGEgZG93bnN0cmVhbSAuTkVUIGNvbnNvbGUgYXBwLlxuICAgICAgICAvLyAgICBmb3IgZXhhbXBsZSwgdGhlIGNvbW1hbmQgbGluZTpcbiAgICAgICAgLy8gICAgICAgICAgZm9vLmV4ZSBcIm15YXJnOlwiXCJteSB2YWxcIlwiXCJcbiAgICAgICAgLy8gICAgaXMgcGFyc2VkIGJ5IGEgLk5FVCBjb25zb2xlIGFwcCBpbnRvIGFuIGFyZyBhcnJheTpcbiAgICAgICAgLy8gICAgICAgICAgWyBcIm15YXJnOlxcXCJteSB2YWxcXFwiXCIgXVxuICAgICAgICAvLyAgICB3aGljaCBpcyB0aGUgc2FtZSBlbmQgcmVzdWx0IHdoZW4gYXBwbHlpbmcgbGlidXYgcXVvdGluZyBydWxlcy4gYWx0aG91Z2ggdGhlIGFjdHVhbFxuICAgICAgICAvLyAgICBjb21tYW5kIGxpbmUgZnJvbSBsaWJ1diBxdW90aW5nIHJ1bGVzIHdvdWxkIGxvb2sgbGlrZTpcbiAgICAgICAgLy8gICAgICAgICAgZm9vLmV4ZSBcIm15YXJnOlxcXCJteSB2YWxcXFwiXCJcbiAgICAgICAgLy9cbiAgICAgICAgLy8gMykgZG91YmxlLXVwIHNsYXNoZXMgdGhhdCBwcmVjZWRlIGEgcXVvdGUsXG4gICAgICAgIC8vICAgIGUuZy4gIGhlbGxvIFxcd29ybGQgICAgPT4gXCJoZWxsbyBcXHdvcmxkXCJcbiAgICAgICAgLy8gICAgICAgICAgaGVsbG9cXFwid29ybGQgICAgPT4gXCJoZWxsb1xcXFxcIlwid29ybGRcIlxuICAgICAgICAvLyAgICAgICAgICBoZWxsb1xcXFxcIndvcmxkICAgPT4gXCJoZWxsb1xcXFxcXFxcXCJcIndvcmxkXCJcbiAgICAgICAgLy8gICAgICAgICAgaGVsbG8gd29ybGRcXCAgICA9PiBcImhlbGxvIHdvcmxkXFxcXFwiXG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgIHRlY2huaWNhbGx5IHRoaXMgaXMgbm90IHJlcXVpcmVkIGZvciBhIGNtZC5leGUgY29tbWFuZCBsaW5lLCBvciB0aGUgYmF0Y2ggYXJndW1lbnQgcGFyc2VyLlxuICAgICAgICAvLyAgICB0aGUgcmVhc29ucyBmb3IgaW5jbHVkaW5nIHRoaXMgYXMgYSAuY21kIHF1b3RpbmcgcnVsZSBhcmU6XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgIGEpIHRoaXMgaXMgb3B0aW1pemVkIGZvciB0aGUgc2NlbmFyaW8gd2hlcmUgdGhlIGFyZ3VtZW50IGlzIHBhc3NlZCBmcm9tIHRoZSAuY21kIGZpbGUgdG8gYW5cbiAgICAgICAgLy8gICAgICAgZXh0ZXJuYWwgcHJvZ3JhbS4gbWFueSBwcm9ncmFtcyAoZS5nLiAuTkVUIGNvbnNvbGUgYXBwcykgcmVseSBvbiB0aGUgc2xhc2gtZG91YmxpbmcgcnVsZS5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgYikgaXQncyB3aGF0IHdlJ3ZlIGJlZW4gZG9pbmcgcHJldmlvdXNseSAoYnkgZGVmZXJyaW5nIHRvIG5vZGUgZGVmYXVsdCBiZWhhdmlvcikgYW5kIHdlXG4gICAgICAgIC8vICAgICAgIGhhdmVuJ3QgaGVhcmQgYW55IGNvbXBsYWludHMgYWJvdXQgdGhhdCBhc3BlY3QuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIG5vdGUsIGEgd2Vha25lc3Mgb2YgdGhlIHF1b3RpbmcgcnVsZXMgY2hvc2VuIGhlcmUsIGlzIHRoYXQgJSBpcyBub3QgZXNjYXBlZC4gaW4gZmFjdCwgJSBjYW5ub3QgYmVcbiAgICAgICAgLy8gZXNjYXBlZCB3aGVuIHVzZWQgb24gdGhlIGNvbW1hbmQgbGluZSBkaXJlY3RseSAtIGV2ZW4gdGhvdWdoIHdpdGhpbiBhIC5jbWQgZmlsZSAlIGNhbiBiZSBlc2NhcGVkXG4gICAgICAgIC8vIGJ5IHVzaW5nICUlLlxuICAgICAgICAvL1xuICAgICAgICAvLyB0aGUgc2F2aW5nIGdyYWNlIGlzLCBvbiB0aGUgY29tbWFuZCBsaW5lLCAldmFyJSBpcyBsZWZ0IGFzLWlzIGlmIHZhciBpcyBub3QgZGVmaW5lZC4gdGhpcyBjb250cmFzdHNcbiAgICAgICAgLy8gdGhlIGxpbmUgcGFyc2luZyBydWxlcyB3aXRoaW4gYSAuY21kIGZpbGUsIHdoZXJlIGlmIHZhciBpcyBub3QgZGVmaW5lZCBpdCBpcyByZXBsYWNlZCB3aXRoIG5vdGhpbmcuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIG9uZSBvcHRpb24gdGhhdCB3YXMgZXhwbG9yZWQgd2FzIHJlcGxhY2luZyAlIHdpdGggXiUgLSBpLmUuICV2YXIlID0+IF4ldmFyXiUuIHRoaXMgaGFjayB3b3VsZFxuICAgICAgICAvLyBvZnRlbiB3b3JrLCBzaW5jZSBpdCBpcyB1bmxpa2VseSB0aGF0IHZhcl4gd291bGQgZXhpc3QsIGFuZCB0aGUgXiBjaGFyYWN0ZXIgaXMgcmVtb3ZlZCB3aGVuIHRoZVxuICAgICAgICAvLyB2YXJpYWJsZSBpcyB1c2VkLiB0aGUgcHJvYmxlbSwgaG93ZXZlciwgaXMgdGhhdCBeIGlzIG5vdCByZW1vdmVkIHdoZW4gJSogaXMgdXNlZCB0byBwYXNzIHRoZSBhcmdzXG4gICAgICAgIC8vIHRvIGFuIGV4dGVybmFsIHByb2dyYW0uXG4gICAgICAgIC8vXG4gICAgICAgIC8vIGFuIHVuZXhwbG9yZWQgcG90ZW50aWFsIHNvbHV0aW9uIGZvciB0aGUgJSBlc2NhcGluZyBwcm9ibGVtLCBpcyB0byBjcmVhdGUgYSB3cmFwcGVyIC5jbWQgZmlsZS5cbiAgICAgICAgLy8gJSBjYW4gYmUgZXNjYXBlZCB3aXRoaW4gYSAuY21kIGZpbGUuXG4gICAgICAgIGxldCByZXZlcnNlID0gJ1wiJztcbiAgICAgICAgbGV0IHF1b3RlSGl0ID0gdHJ1ZTtcbiAgICAgICAgZm9yIChsZXQgaSA9IGFyZy5sZW5ndGg7IGkgPiAwOyBpLS0pIHtcbiAgICAgICAgICAgIC8vIHdhbGsgdGhlIHN0cmluZyBpbiByZXZlcnNlXG4gICAgICAgICAgICByZXZlcnNlICs9IGFyZ1tpIC0gMV07XG4gICAgICAgICAgICBpZiAocXVvdGVIaXQgJiYgYXJnW2kgLSAxXSA9PT0gJ1xcXFwnKSB7XG4gICAgICAgICAgICAgICAgcmV2ZXJzZSArPSAnXFxcXCc7IC8vIGRvdWJsZSB0aGUgc2xhc2hcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGFyZ1tpIC0gMV0gPT09ICdcIicpIHtcbiAgICAgICAgICAgICAgICBxdW90ZUhpdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmV2ZXJzZSArPSAnXCInOyAvLyBkb3VibGUgdGhlIHF1b3RlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBxdW90ZUhpdCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldmVyc2UgKz0gJ1wiJztcbiAgICAgICAgcmV0dXJuIHJldmVyc2VcbiAgICAgICAgICAgIC5zcGxpdCgnJylcbiAgICAgICAgICAgIC5yZXZlcnNlKClcbiAgICAgICAgICAgIC5qb2luKCcnKTtcbiAgICB9XG4gICAgX3V2UXVvdGVDbWRBcmcoYXJnKSB7XG4gICAgICAgIC8vIFRvb2wgcnVubmVyIHdyYXBzIGNoaWxkX3Byb2Nlc3Muc3Bhd24oKSBhbmQgbmVlZHMgdG8gYXBwbHkgdGhlIHNhbWUgcXVvdGluZyBhc1xuICAgICAgICAvLyBOb2RlIGluIGNlcnRhaW4gY2FzZXMgd2hlcmUgdGhlIHVuZG9jdW1lbnRlZCBzcGF3biBvcHRpb24gd2luZG93c1ZlcmJhdGltQXJndW1lbnRzXG4gICAgICAgIC8vIGlzIHVzZWQuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFNpbmNlIHRoaXMgZnVuY3Rpb24gaXMgYSBwb3J0IG9mIHF1b3RlX2NtZF9hcmcgZnJvbSBOb2RlIDQueCAodGVjaG5pY2FsbHksIGxpYiBVVixcbiAgICAgICAgLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9ub2RlanMvbm9kZS9ibG9iL3Y0LngvZGVwcy91di9zcmMvd2luL3Byb2Nlc3MuYyBmb3IgZGV0YWlscyksXG4gICAgICAgIC8vIHBhc3RpbmcgY29weXJpZ2h0IG5vdGljZSBmcm9tIE5vZGUgd2l0aGluIHRoaXMgZnVuY3Rpb246XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAgQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAgUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICAgICAgICAvLyAgICAgIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvXG4gICAgICAgIC8vICAgICAgZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGVcbiAgICAgICAgLy8gICAgICByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3JcbiAgICAgICAgLy8gICAgICBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICAgICAgICAvLyAgICAgIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAgVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAgICAgICAgLy8gICAgICBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgICBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gICAgICAgIC8vICAgICAgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gICAgICAgIC8vICAgICAgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gICAgICAgIC8vICAgICAgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICAgICAgICAvLyAgICAgIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HXG4gICAgICAgIC8vICAgICAgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HU1xuICAgICAgICAvLyAgICAgIElOIFRIRSBTT0ZUV0FSRS5cbiAgICAgICAgaWYgKCFhcmcpIHtcbiAgICAgICAgICAgIC8vIE5lZWQgZG91YmxlIHF1b3RhdGlvbiBmb3IgZW1wdHkgYXJndW1lbnRcbiAgICAgICAgICAgIHJldHVybiAnXCJcIic7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFhcmcuaW5jbHVkZXMoJyAnKSAmJiAhYXJnLmluY2x1ZGVzKCdcXHQnKSAmJiAhYXJnLmluY2x1ZGVzKCdcIicpKSB7XG4gICAgICAgICAgICAvLyBObyBxdW90YXRpb24gbmVlZGVkXG4gICAgICAgICAgICByZXR1cm4gYXJnO1xuICAgICAgICB9XG4gICAgICAgIGlmICghYXJnLmluY2x1ZGVzKCdcIicpICYmICFhcmcuaW5jbHVkZXMoJ1xcXFwnKSkge1xuICAgICAgICAgICAgLy8gTm8gZW1iZWRkZWQgZG91YmxlIHF1b3RlcyBvciBiYWNrc2xhc2hlcywgc28gSSBjYW4ganVzdCB3cmFwXG4gICAgICAgICAgICAvLyBxdW90ZSBtYXJrcyBhcm91bmQgdGhlIHdob2xlIHRoaW5nLlxuICAgICAgICAgICAgcmV0dXJuIGBcIiR7YXJnfVwiYDtcbiAgICAgICAgfVxuICAgICAgICAvLyBFeHBlY3RlZCBpbnB1dC9vdXRwdXQ6XG4gICAgICAgIC8vICAgaW5wdXQgOiBoZWxsb1wid29ybGRcbiAgICAgICAgLy8gICBvdXRwdXQ6IFwiaGVsbG9cXFwid29ybGRcIlxuICAgICAgICAvLyAgIGlucHV0IDogaGVsbG9cIlwid29ybGRcbiAgICAgICAgLy8gICBvdXRwdXQ6IFwiaGVsbG9cXFwiXFxcIndvcmxkXCJcbiAgICAgICAgLy8gICBpbnB1dCA6IGhlbGxvXFx3b3JsZFxuICAgICAgICAvLyAgIG91dHB1dDogaGVsbG9cXHdvcmxkXG4gICAgICAgIC8vICAgaW5wdXQgOiBoZWxsb1xcXFx3b3JsZFxuICAgICAgICAvLyAgIG91dHB1dDogaGVsbG9cXFxcd29ybGRcbiAgICAgICAgLy8gICBpbnB1dCA6IGhlbGxvXFxcIndvcmxkXG4gICAgICAgIC8vICAgb3V0cHV0OiBcImhlbGxvXFxcXFxcXCJ3b3JsZFwiXG4gICAgICAgIC8vICAgaW5wdXQgOiBoZWxsb1xcXFxcIndvcmxkXG4gICAgICAgIC8vICAgb3V0cHV0OiBcImhlbGxvXFxcXFxcXFxcXFwid29ybGRcIlxuICAgICAgICAvLyAgIGlucHV0IDogaGVsbG8gd29ybGRcXFxuICAgICAgICAvLyAgIG91dHB1dDogXCJoZWxsbyB3b3JsZFxcXFxcIiAtIG5vdGUgdGhlIGNvbW1lbnQgaW4gbGlidXYgYWN0dWFsbHkgcmVhZHMgXCJoZWxsbyB3b3JsZFxcXCJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1dCBpdCBhcHBlYXJzIHRoZSBjb21tZW50IGlzIHdyb25nLCBpdCBzaG91bGQgYmUgXCJoZWxsbyB3b3JsZFxcXFxcIlxuICAgICAgICBsZXQgcmV2ZXJzZSA9ICdcIic7XG4gICAgICAgIGxldCBxdW90ZUhpdCA9IHRydWU7XG4gICAgICAgIGZvciAobGV0IGkgPSBhcmcubGVuZ3RoOyBpID4gMDsgaS0tKSB7XG4gICAgICAgICAgICAvLyB3YWxrIHRoZSBzdHJpbmcgaW4gcmV2ZXJzZVxuICAgICAgICAgICAgcmV2ZXJzZSArPSBhcmdbaSAtIDFdO1xuICAgICAgICAgICAgaWYgKHF1b3RlSGl0ICYmIGFyZ1tpIC0gMV0gPT09ICdcXFxcJykge1xuICAgICAgICAgICAgICAgIHJldmVyc2UgKz0gJ1xcXFwnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYXJnW2kgLSAxXSA9PT0gJ1wiJykge1xuICAgICAgICAgICAgICAgIHF1b3RlSGl0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXZlcnNlICs9ICdcXFxcJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHF1b3RlSGl0ID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV2ZXJzZSArPSAnXCInO1xuICAgICAgICByZXR1cm4gcmV2ZXJzZVxuICAgICAgICAgICAgLnNwbGl0KCcnKVxuICAgICAgICAgICAgLnJldmVyc2UoKVxuICAgICAgICAgICAgLmpvaW4oJycpO1xuICAgIH1cbiAgICBfY2xvbmVFeGVjT3B0aW9ucyhvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICBjb25zdCByZXN1bHQgPSB7XG4gICAgICAgICAgICBjd2Q6IG9wdGlvbnMuY3dkIHx8IHByb2Nlc3MuY3dkKCksXG4gICAgICAgICAgICBlbnY6IG9wdGlvbnMuZW52IHx8IHByb2Nlc3MuZW52LFxuICAgICAgICAgICAgc2lsZW50OiBvcHRpb25zLnNpbGVudCB8fCBmYWxzZSxcbiAgICAgICAgICAgIHdpbmRvd3NWZXJiYXRpbUFyZ3VtZW50czogb3B0aW9ucy53aW5kb3dzVmVyYmF0aW1Bcmd1bWVudHMgfHwgZmFsc2UsXG4gICAgICAgICAgICBmYWlsT25TdGRFcnI6IG9wdGlvbnMuZmFpbE9uU3RkRXJyIHx8IGZhbHNlLFxuICAgICAgICAgICAgaWdub3JlUmV0dXJuQ29kZTogb3B0aW9ucy5pZ25vcmVSZXR1cm5Db2RlIHx8IGZhbHNlLFxuICAgICAgICAgICAgZGVsYXk6IG9wdGlvbnMuZGVsYXkgfHwgMTAwMDBcbiAgICAgICAgfTtcbiAgICAgICAgcmVzdWx0Lm91dFN0cmVhbSA9IG9wdGlvbnMub3V0U3RyZWFtIHx8IHByb2Nlc3Muc3Rkb3V0O1xuICAgICAgICByZXN1bHQuZXJyU3RyZWFtID0gb3B0aW9ucy5lcnJTdHJlYW0gfHwgcHJvY2Vzcy5zdGRlcnI7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIF9nZXRTcGF3bk9wdGlvbnMob3B0aW9ucywgdG9vbFBhdGgpIHtcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgICAgICByZXN1bHQuY3dkID0gb3B0aW9ucy5jd2Q7XG4gICAgICAgIHJlc3VsdC5lbnYgPSBvcHRpb25zLmVudjtcbiAgICAgICAgcmVzdWx0Wyd3aW5kb3dzVmVyYmF0aW1Bcmd1bWVudHMnXSA9XG4gICAgICAgICAgICBvcHRpb25zLndpbmRvd3NWZXJiYXRpbUFyZ3VtZW50cyB8fCB0aGlzLl9pc0NtZEZpbGUoKTtcbiAgICAgICAgaWYgKG9wdGlvbnMud2luZG93c1ZlcmJhdGltQXJndW1lbnRzKSB7XG4gICAgICAgICAgICByZXN1bHQuYXJndjAgPSBgXCIke3Rvb2xQYXRofVwiYDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFeGVjIGEgdG9vbC5cbiAgICAgKiBPdXRwdXQgd2lsbCBiZSBzdHJlYW1lZCB0byB0aGUgbGl2ZSBjb25zb2xlLlxuICAgICAqIFJldHVybnMgcHJvbWlzZSB3aXRoIHJldHVybiBjb2RlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gICAgIHRvb2wgICAgIHBhdGggdG8gdG9vbCB0byBleGVjXG4gICAgICogQHBhcmFtICAgICBvcHRpb25zICBvcHRpb25hbCBleGVjIG9wdGlvbnMuICBTZWUgRXhlY09wdGlvbnNcbiAgICAgKiBAcmV0dXJucyAgIG51bWJlclxuICAgICAqL1xuICAgIGV4ZWMoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RlYnVnKGBleGVjIHRvb2w6ICR7dGhpcy50b29sUGF0aH1gKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9kZWJ1ZygnYXJndW1lbnRzOicpO1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgYXJnIG9mIHRoaXMuYXJncykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kZWJ1ZyhgICAgJHthcmd9YCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IG9wdGlvbnNOb25OdWxsID0gdGhpcy5fY2xvbmVFeGVjT3B0aW9ucyh0aGlzLm9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIGlmICghb3B0aW9uc05vbk51bGwuc2lsZW50ICYmIG9wdGlvbnNOb25OdWxsLm91dFN0cmVhbSkge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zTm9uTnVsbC5vdXRTdHJlYW0ud3JpdGUodGhpcy5fZ2V0Q29tbWFuZFN0cmluZyhvcHRpb25zTm9uTnVsbCkgKyBvcy5FT0wpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBzdGF0ZSA9IG5ldyBFeGVjU3RhdGUob3B0aW9uc05vbk51bGwsIHRoaXMudG9vbFBhdGgpO1xuICAgICAgICAgICAgICAgIHN0YXRlLm9uKCdkZWJ1ZycsIChtZXNzYWdlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RlYnVnKG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGVOYW1lID0gdGhpcy5fZ2V0U3Bhd25GaWxlTmFtZSgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNwID0gY2hpbGQuc3Bhd24oZmlsZU5hbWUsIHRoaXMuX2dldFNwYXduQXJncyhvcHRpb25zTm9uTnVsbCksIHRoaXMuX2dldFNwYXduT3B0aW9ucyh0aGlzLm9wdGlvbnMsIGZpbGVOYW1lKSk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RkYnVmZmVyID0gJyc7XG4gICAgICAgICAgICAgICAgaWYgKGNwLnN0ZG91dCkge1xuICAgICAgICAgICAgICAgICAgICBjcC5zdGRvdXQub24oJ2RhdGEnLCAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5saXN0ZW5lcnMgJiYgdGhpcy5vcHRpb25zLmxpc3RlbmVycy5zdGRvdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMubGlzdGVuZXJzLnN0ZG91dChkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghb3B0aW9uc05vbk51bGwuc2lsZW50ICYmIG9wdGlvbnNOb25OdWxsLm91dFN0cmVhbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnNOb25OdWxsLm91dFN0cmVhbS53cml0ZShkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Byb2Nlc3NMaW5lQnVmZmVyKGRhdGEsIHN0ZGJ1ZmZlciwgKGxpbmUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmxpc3RlbmVycyAmJiB0aGlzLm9wdGlvbnMubGlzdGVuZXJzLnN0ZGxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmxpc3RlbmVycy5zdGRsaW5lKGxpbmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgZXJyYnVmZmVyID0gJyc7XG4gICAgICAgICAgICAgICAgaWYgKGNwLnN0ZGVycikge1xuICAgICAgICAgICAgICAgICAgICBjcC5zdGRlcnIub24oJ2RhdGEnLCAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUucHJvY2Vzc1N0ZGVyciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmxpc3RlbmVycyAmJiB0aGlzLm9wdGlvbnMubGlzdGVuZXJzLnN0ZGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5saXN0ZW5lcnMuc3RkZXJyKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFvcHRpb25zTm9uTnVsbC5zaWxlbnQgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zTm9uTnVsbC5lcnJTdHJlYW0gJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zTm9uTnVsbC5vdXRTdHJlYW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzID0gb3B0aW9uc05vbk51bGwuZmFpbE9uU3RkRXJyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gb3B0aW9uc05vbk51bGwuZXJyU3RyZWFtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogb3B0aW9uc05vbk51bGwub3V0U3RyZWFtO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMud3JpdGUoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9wcm9jZXNzTGluZUJ1ZmZlcihkYXRhLCBlcnJidWZmZXIsIChsaW5lKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5saXN0ZW5lcnMgJiYgdGhpcy5vcHRpb25zLmxpc3RlbmVycy5lcnJsaW5lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5saXN0ZW5lcnMuZXJybGluZShsaW5lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNwLm9uKCdlcnJvcicsIChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUucHJvY2Vzc0Vycm9yID0gZXJyLm1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLnByb2Nlc3NFeGl0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5wcm9jZXNzQ2xvc2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUuQ2hlY2tDb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNwLm9uKCdleGl0JywgKGNvZGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUucHJvY2Vzc0V4aXRDb2RlID0gY29kZTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUucHJvY2Vzc0V4aXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RlYnVnKGBFeGl0IGNvZGUgJHtjb2RlfSByZWNlaXZlZCBmcm9tIHRvb2wgJyR7dGhpcy50b29sUGF0aH0nYCk7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLkNoZWNrQ29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjcC5vbignY2xvc2UnLCAoY29kZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5wcm9jZXNzRXhpdENvZGUgPSBjb2RlO1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5wcm9jZXNzRXhpdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUucHJvY2Vzc0Nsb3NlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RlYnVnKGBTVERJTyBzdHJlYW1zIGhhdmUgY2xvc2VkIGZvciB0b29sICcke3RoaXMudG9vbFBhdGh9J2ApO1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5DaGVja0NvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgc3RhdGUub24oJ2RvbmUnLCAoZXJyb3IsIGV4aXRDb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGRidWZmZXIubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdzdGRsaW5lJywgc3RkYnVmZmVyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyYnVmZmVyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgnZXJybGluZScsIGVycmJ1ZmZlcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY3AucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZXhpdENvZGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZXhwb3J0cy5Ub29sUnVubmVyID0gVG9vbFJ1bm5lcjtcbi8qKlxuICogQ29udmVydCBhbiBhcmcgc3RyaW5nIHRvIGFuIGFycmF5IG9mIGFyZ3MuIEhhbmRsZXMgZXNjYXBpbmdcbiAqXG4gKiBAcGFyYW0gICAgYXJnU3RyaW5nICAgc3RyaW5nIG9mIGFyZ3VtZW50c1xuICogQHJldHVybnMgIHN0cmluZ1tdICAgIGFycmF5IG9mIGFyZ3VtZW50c1xuICovXG5mdW5jdGlvbiBhcmdTdHJpbmdUb0FycmF5KGFyZ1N0cmluZykge1xuICAgIGNvbnN0IGFyZ3MgPSBbXTtcbiAgICBsZXQgaW5RdW90ZXMgPSBmYWxzZTtcbiAgICBsZXQgZXNjYXBlZCA9IGZhbHNlO1xuICAgIGxldCBhcmcgPSAnJztcbiAgICBmdW5jdGlvbiBhcHBlbmQoYykge1xuICAgICAgICAvLyB3ZSBvbmx5IGVzY2FwZSBkb3VibGUgcXVvdGVzLlxuICAgICAgICBpZiAoZXNjYXBlZCAmJiBjICE9PSAnXCInKSB7XG4gICAgICAgICAgICBhcmcgKz0gJ1xcXFwnO1xuICAgICAgICB9XG4gICAgICAgIGFyZyArPSBjO1xuICAgICAgICBlc2NhcGVkID0gZmFsc2U7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJnU3RyaW5nLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGMgPSBhcmdTdHJpbmcuY2hhckF0KGkpO1xuICAgICAgICBpZiAoYyA9PT0gJ1wiJykge1xuICAgICAgICAgICAgaWYgKCFlc2NhcGVkKSB7XG4gICAgICAgICAgICAgICAgaW5RdW90ZXMgPSAhaW5RdW90ZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBhcHBlbmQoYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYyA9PT0gJ1xcXFwnICYmIGVzY2FwZWQpIHtcbiAgICAgICAgICAgIGFwcGVuZChjKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjID09PSAnXFxcXCcgJiYgaW5RdW90ZXMpIHtcbiAgICAgICAgICAgIGVzY2FwZWQgPSB0cnVlO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGMgPT09ICcgJyAmJiAhaW5RdW90ZXMpIHtcbiAgICAgICAgICAgIGlmIChhcmcubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGFyZ3MucHVzaChhcmcpO1xuICAgICAgICAgICAgICAgIGFyZyA9ICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgYXBwZW5kKGMpO1xuICAgIH1cbiAgICBpZiAoYXJnLmxlbmd0aCA+IDApIHtcbiAgICAgICAgYXJncy5wdXNoKGFyZy50cmltKCkpO1xuICAgIH1cbiAgICByZXR1cm4gYXJncztcbn1cbmV4cG9ydHMuYXJnU3RyaW5nVG9BcnJheSA9IGFyZ1N0cmluZ1RvQXJyYXk7XG5jbGFzcyBFeGVjU3RhdGUgZXh0ZW5kcyBldmVudHMuRXZlbnRFbWl0dGVyIHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zLCB0b29sUGF0aCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnByb2Nlc3NDbG9zZWQgPSBmYWxzZTsgLy8gdHJhY2tzIHdoZXRoZXIgdGhlIHByb2Nlc3MgaGFzIGV4aXRlZCBhbmQgc3RkaW8gaXMgY2xvc2VkXG4gICAgICAgIHRoaXMucHJvY2Vzc0Vycm9yID0gJyc7XG4gICAgICAgIHRoaXMucHJvY2Vzc0V4aXRDb2RlID0gMDtcbiAgICAgICAgdGhpcy5wcm9jZXNzRXhpdGVkID0gZmFsc2U7IC8vIHRyYWNrcyB3aGV0aGVyIHRoZSBwcm9jZXNzIGhhcyBleGl0ZWRcbiAgICAgICAgdGhpcy5wcm9jZXNzU3RkZXJyID0gZmFsc2U7IC8vIHRyYWNrcyB3aGV0aGVyIHN0ZGVyciB3YXMgd3JpdHRlbiB0b1xuICAgICAgICB0aGlzLmRlbGF5ID0gMTAwMDA7IC8vIDEwIHNlY29uZHNcbiAgICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGltZW91dCA9IG51bGw7XG4gICAgICAgIGlmICghdG9vbFBhdGgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndG9vbFBhdGggbXVzdCBub3QgYmUgZW1wdHknKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICB0aGlzLnRvb2xQYXRoID0gdG9vbFBhdGg7XG4gICAgICAgIGlmIChvcHRpb25zLmRlbGF5KSB7XG4gICAgICAgICAgICB0aGlzLmRlbGF5ID0gb3B0aW9ucy5kZWxheTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBDaGVja0NvbXBsZXRlKCkge1xuICAgICAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucHJvY2Vzc0Nsb3NlZCkge1xuICAgICAgICAgICAgdGhpcy5fc2V0UmVzdWx0KCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5wcm9jZXNzRXhpdGVkKSB7XG4gICAgICAgICAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KEV4ZWNTdGF0ZS5IYW5kbGVUaW1lb3V0LCB0aGlzLmRlbGF5LCB0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfZGVidWcobWVzc2FnZSkge1xuICAgICAgICB0aGlzLmVtaXQoJ2RlYnVnJywgbWVzc2FnZSk7XG4gICAgfVxuICAgIF9zZXRSZXN1bHQoKSB7XG4gICAgICAgIC8vIGRldGVybWluZSB3aGV0aGVyIHRoZXJlIGlzIGFuIGVycm9yXG4gICAgICAgIGxldCBlcnJvcjtcbiAgICAgICAgaWYgKHRoaXMucHJvY2Vzc0V4aXRlZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvY2Vzc0Vycm9yKSB7XG4gICAgICAgICAgICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoYFRoZXJlIHdhcyBhbiBlcnJvciB3aGVuIGF0dGVtcHRpbmcgdG8gZXhlY3V0ZSB0aGUgcHJvY2VzcyAnJHt0aGlzLnRvb2xQYXRofScuIFRoaXMgbWF5IGluZGljYXRlIHRoZSBwcm9jZXNzIGZhaWxlZCB0byBzdGFydC4gRXJyb3I6ICR7dGhpcy5wcm9jZXNzRXJyb3J9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLnByb2Nlc3NFeGl0Q29kZSAhPT0gMCAmJiAhdGhpcy5vcHRpb25zLmlnbm9yZVJldHVybkNvZGUpIHtcbiAgICAgICAgICAgICAgICBlcnJvciA9IG5ldyBFcnJvcihgVGhlIHByb2Nlc3MgJyR7dGhpcy50b29sUGF0aH0nIGZhaWxlZCB3aXRoIGV4aXQgY29kZSAke3RoaXMucHJvY2Vzc0V4aXRDb2RlfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5wcm9jZXNzU3RkZXJyICYmIHRoaXMub3B0aW9ucy5mYWlsT25TdGRFcnIpIHtcbiAgICAgICAgICAgICAgICBlcnJvciA9IG5ldyBFcnJvcihgVGhlIHByb2Nlc3MgJyR7dGhpcy50b29sUGF0aH0nIGZhaWxlZCBiZWNhdXNlIG9uZSBvciBtb3JlIGxpbmVzIHdlcmUgd3JpdHRlbiB0byB0aGUgU1RERVJSIHN0cmVhbWApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIGNsZWFyIHRoZSB0aW1lb3V0XG4gICAgICAgIGlmICh0aGlzLnRpbWVvdXQpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuICAgICAgICAgICAgdGhpcy50aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuICAgICAgICB0aGlzLmVtaXQoJ2RvbmUnLCBlcnJvciwgdGhpcy5wcm9jZXNzRXhpdENvZGUpO1xuICAgIH1cbiAgICBzdGF0aWMgSGFuZGxlVGltZW91dChzdGF0ZSkge1xuICAgICAgICBpZiAoc3RhdGUuZG9uZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghc3RhdGUucHJvY2Vzc0Nsb3NlZCAmJiBzdGF0ZS5wcm9jZXNzRXhpdGVkKSB7XG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gYFRoZSBTVERJTyBzdHJlYW1zIGRpZCBub3QgY2xvc2Ugd2l0aGluICR7c3RhdGUuZGVsYXkgL1xuICAgICAgICAgICAgICAgIDEwMDB9IHNlY29uZHMgb2YgdGhlIGV4aXQgZXZlbnQgZnJvbSBwcm9jZXNzICcke3N0YXRlLnRvb2xQYXRofScuIFRoaXMgbWF5IGluZGljYXRlIGEgY2hpbGQgcHJvY2VzcyBpbmhlcml0ZWQgdGhlIFNURElPIHN0cmVhbXMgYW5kIGhhcyBub3QgeWV0IGV4aXRlZC5gO1xuICAgICAgICAgICAgc3RhdGUuX2RlYnVnKG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIHN0YXRlLl9zZXRSZXN1bHQoKTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD10b29scnVubmVyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX2E7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBhc3NlcnRfMSA9IHJlcXVpcmUoXCJhc3NlcnRcIik7XG5jb25zdCBmcyA9IHJlcXVpcmUoXCJmc1wiKTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKFwicGF0aFwiKTtcbl9hID0gZnMucHJvbWlzZXMsIGV4cG9ydHMuY2htb2QgPSBfYS5jaG1vZCwgZXhwb3J0cy5jb3B5RmlsZSA9IF9hLmNvcHlGaWxlLCBleHBvcnRzLmxzdGF0ID0gX2EubHN0YXQsIGV4cG9ydHMubWtkaXIgPSBfYS5ta2RpciwgZXhwb3J0cy5yZWFkZGlyID0gX2EucmVhZGRpciwgZXhwb3J0cy5yZWFkbGluayA9IF9hLnJlYWRsaW5rLCBleHBvcnRzLnJlbmFtZSA9IF9hLnJlbmFtZSwgZXhwb3J0cy5ybWRpciA9IF9hLnJtZGlyLCBleHBvcnRzLnN0YXQgPSBfYS5zdGF0LCBleHBvcnRzLnN5bWxpbmsgPSBfYS5zeW1saW5rLCBleHBvcnRzLnVubGluayA9IF9hLnVubGluaztcbmV4cG9ydHMuSVNfV0lORE9XUyA9IHByb2Nlc3MucGxhdGZvcm0gPT09ICd3aW4zMic7XG5mdW5jdGlvbiBleGlzdHMoZnNQYXRoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHlpZWxkIGV4cG9ydHMuc3RhdChmc1BhdGgpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGlmIChlcnIuY29kZSA9PT0gJ0VOT0VOVCcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG59XG5leHBvcnRzLmV4aXN0cyA9IGV4aXN0cztcbmZ1bmN0aW9uIGlzRGlyZWN0b3J5KGZzUGF0aCwgdXNlU3RhdCA9IGZhbHNlKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc3Qgc3RhdHMgPSB1c2VTdGF0ID8geWllbGQgZXhwb3J0cy5zdGF0KGZzUGF0aCkgOiB5aWVsZCBleHBvcnRzLmxzdGF0KGZzUGF0aCk7XG4gICAgICAgIHJldHVybiBzdGF0cy5pc0RpcmVjdG9yeSgpO1xuICAgIH0pO1xufVxuZXhwb3J0cy5pc0RpcmVjdG9yeSA9IGlzRGlyZWN0b3J5O1xuLyoqXG4gKiBPbiBPU1gvTGludXgsIHRydWUgaWYgcGF0aCBzdGFydHMgd2l0aCAnLycuIE9uIFdpbmRvd3MsIHRydWUgZm9yIHBhdGhzIGxpa2U6XG4gKiBcXCwgXFxoZWxsbywgXFxcXGhlbGxvXFxzaGFyZSwgQzosIGFuZCBDOlxcaGVsbG8gKGFuZCBjb3JyZXNwb25kaW5nIGFsdGVybmF0ZSBzZXBhcmF0b3IgY2FzZXMpLlxuICovXG5mdW5jdGlvbiBpc1Jvb3RlZChwKSB7XG4gICAgcCA9IG5vcm1hbGl6ZVNlcGFyYXRvcnMocCk7XG4gICAgaWYgKCFwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignaXNSb290ZWQoKSBwYXJhbWV0ZXIgXCJwXCIgY2Fubm90IGJlIGVtcHR5Jyk7XG4gICAgfVxuICAgIGlmIChleHBvcnRzLklTX1dJTkRPV1MpIHtcbiAgICAgICAgcmV0dXJuIChwLnN0YXJ0c1dpdGgoJ1xcXFwnKSB8fCAvXltBLVpdOi9pLnRlc3QocCkgLy8gZS5nLiBcXCBvciBcXGhlbGxvIG9yIFxcXFxoZWxsb1xuICAgICAgICApOyAvLyBlLmcuIEM6IG9yIEM6XFxoZWxsb1xuICAgIH1cbiAgICByZXR1cm4gcC5zdGFydHNXaXRoKCcvJyk7XG59XG5leHBvcnRzLmlzUm9vdGVkID0gaXNSb290ZWQ7XG4vKipcbiAqIFJlY3Vyc2l2ZWx5IGNyZWF0ZSBhIGRpcmVjdG9yeSBhdCBgZnNQYXRoYC5cbiAqXG4gKiBUaGlzIGltcGxlbWVudGF0aW9uIGlzIG9wdGltaXN0aWMsIG1lYW5pbmcgaXQgYXR0ZW1wdHMgdG8gY3JlYXRlIHRoZSBmdWxsXG4gKiBwYXRoIGZpcnN0LCBhbmQgYmFja3MgdXAgdGhlIHBhdGggc3RhY2sgZnJvbSB0aGVyZS5cbiAqXG4gKiBAcGFyYW0gZnNQYXRoIFRoZSBwYXRoIHRvIGNyZWF0ZVxuICogQHBhcmFtIG1heERlcHRoIFRoZSBtYXhpbXVtIHJlY3Vyc2lvbiBkZXB0aFxuICogQHBhcmFtIGRlcHRoIFRoZSBjdXJyZW50IHJlY3Vyc2lvbiBkZXB0aFxuICovXG5mdW5jdGlvbiBta2RpclAoZnNQYXRoLCBtYXhEZXB0aCA9IDEwMDAsIGRlcHRoID0gMSkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGFzc2VydF8xLm9rKGZzUGF0aCwgJ2EgcGF0aCBhcmd1bWVudCBtdXN0IGJlIHByb3ZpZGVkJyk7XG4gICAgICAgIGZzUGF0aCA9IHBhdGgucmVzb2x2ZShmc1BhdGgpO1xuICAgICAgICBpZiAoZGVwdGggPj0gbWF4RGVwdGgpXG4gICAgICAgICAgICByZXR1cm4gZXhwb3J0cy5ta2Rpcihmc1BhdGgpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgeWllbGQgZXhwb3J0cy5ta2Rpcihmc1BhdGgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoZXJyLmNvZGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdFTk9FTlQnOiB7XG4gICAgICAgICAgICAgICAgICAgIHlpZWxkIG1rZGlyUChwYXRoLmRpcm5hbWUoZnNQYXRoKSwgbWF4RGVwdGgsIGRlcHRoICsgMSk7XG4gICAgICAgICAgICAgICAgICAgIHlpZWxkIGV4cG9ydHMubWtkaXIoZnNQYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzdGF0cztcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRzID0geWllbGQgZXhwb3J0cy5zdGF0KGZzUGF0aCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGVycjIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIXN0YXRzLmlzRGlyZWN0b3J5KCkpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59XG5leHBvcnRzLm1rZGlyUCA9IG1rZGlyUDtcbi8qKlxuICogQmVzdCBlZmZvcnQgYXR0ZW1wdCB0byBkZXRlcm1pbmUgd2hldGhlciBhIGZpbGUgZXhpc3RzIGFuZCBpcyBleGVjdXRhYmxlLlxuICogQHBhcmFtIGZpbGVQYXRoICAgIGZpbGUgcGF0aCB0byBjaGVja1xuICogQHBhcmFtIGV4dGVuc2lvbnMgIGFkZGl0aW9uYWwgZmlsZSBleHRlbnNpb25zIHRvIHRyeVxuICogQHJldHVybiBpZiBmaWxlIGV4aXN0cyBhbmQgaXMgZXhlY3V0YWJsZSwgcmV0dXJucyB0aGUgZmlsZSBwYXRoLiBvdGhlcndpc2UgZW1wdHkgc3RyaW5nLlxuICovXG5mdW5jdGlvbiB0cnlHZXRFeGVjdXRhYmxlUGF0aChmaWxlUGF0aCwgZXh0ZW5zaW9ucykge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGxldCBzdGF0cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIHRlc3QgZmlsZSBleGlzdHNcbiAgICAgICAgICAgIHN0YXRzID0geWllbGQgZXhwb3J0cy5zdGF0KGZpbGVQYXRoKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBpZiAoZXJyLmNvZGUgIT09ICdFTk9FTlQnKSB7XG4gICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgVW5leHBlY3RlZCBlcnJvciBhdHRlbXB0aW5nIHRvIGRldGVybWluZSBpZiBleGVjdXRhYmxlIGZpbGUgZXhpc3RzICcke2ZpbGVQYXRofSc6ICR7ZXJyfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChzdGF0cyAmJiBzdGF0cy5pc0ZpbGUoKSkge1xuICAgICAgICAgICAgaWYgKGV4cG9ydHMuSVNfV0lORE9XUykge1xuICAgICAgICAgICAgICAgIC8vIG9uIFdpbmRvd3MsIHRlc3QgZm9yIHZhbGlkIGV4dGVuc2lvblxuICAgICAgICAgICAgICAgIGNvbnN0IHVwcGVyRXh0ID0gcGF0aC5leHRuYW1lKGZpbGVQYXRoKS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgICAgIGlmIChleHRlbnNpb25zLnNvbWUodmFsaWRFeHQgPT4gdmFsaWRFeHQudG9VcHBlckNhc2UoKSA9PT0gdXBwZXJFeHQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmaWxlUGF0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNVbml4RXhlY3V0YWJsZShzdGF0cykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZpbGVQYXRoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyB0cnkgZWFjaCBleHRlbnNpb25cbiAgICAgICAgY29uc3Qgb3JpZ2luYWxGaWxlUGF0aCA9IGZpbGVQYXRoO1xuICAgICAgICBmb3IgKGNvbnN0IGV4dGVuc2lvbiBvZiBleHRlbnNpb25zKSB7XG4gICAgICAgICAgICBmaWxlUGF0aCA9IG9yaWdpbmFsRmlsZVBhdGggKyBleHRlbnNpb247XG4gICAgICAgICAgICBzdGF0cyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgc3RhdHMgPSB5aWVsZCBleHBvcnRzLnN0YXQoZmlsZVBhdGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIGlmIChlcnIuY29kZSAhPT0gJ0VOT0VOVCcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFVuZXhwZWN0ZWQgZXJyb3IgYXR0ZW1wdGluZyB0byBkZXRlcm1pbmUgaWYgZXhlY3V0YWJsZSBmaWxlIGV4aXN0cyAnJHtmaWxlUGF0aH0nOiAke2Vycn1gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3RhdHMgJiYgc3RhdHMuaXNGaWxlKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXhwb3J0cy5JU19XSU5ET1dTKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHByZXNlcnZlIHRoZSBjYXNlIG9mIHRoZSBhY3R1YWwgZmlsZSAoc2luY2UgYW4gZXh0ZW5zaW9uIHdhcyBhcHBlbmRlZClcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpcmVjdG9yeSA9IHBhdGguZGlybmFtZShmaWxlUGF0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB1cHBlck5hbWUgPSBwYXRoLmJhc2VuYW1lKGZpbGVQYXRoKS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChjb25zdCBhY3R1YWxOYW1lIG9mIHlpZWxkIGV4cG9ydHMucmVhZGRpcihkaXJlY3RvcnkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVwcGVyTmFtZSA9PT0gYWN0dWFsTmFtZS50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVQYXRoID0gcGF0aC5qb2luKGRpcmVjdG9yeSwgYWN0dWFsTmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFVuZXhwZWN0ZWQgZXJyb3IgYXR0ZW1wdGluZyB0byBkZXRlcm1pbmUgdGhlIGFjdHVhbCBjYXNlIG9mIHRoZSBmaWxlICcke2ZpbGVQYXRofSc6ICR7ZXJyfWApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmaWxlUGF0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc1VuaXhFeGVjdXRhYmxlKHN0YXRzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZpbGVQYXRoO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9KTtcbn1cbmV4cG9ydHMudHJ5R2V0RXhlY3V0YWJsZVBhdGggPSB0cnlHZXRFeGVjdXRhYmxlUGF0aDtcbmZ1bmN0aW9uIG5vcm1hbGl6ZVNlcGFyYXRvcnMocCkge1xuICAgIHAgPSBwIHx8ICcnO1xuICAgIGlmIChleHBvcnRzLklTX1dJTkRPV1MpIHtcbiAgICAgICAgLy8gY29udmVydCBzbGFzaGVzIG9uIFdpbmRvd3NcbiAgICAgICAgcCA9IHAucmVwbGFjZSgvXFwvL2csICdcXFxcJyk7XG4gICAgICAgIC8vIHJlbW92ZSByZWR1bmRhbnQgc2xhc2hlc1xuICAgICAgICByZXR1cm4gcC5yZXBsYWNlKC9cXFxcXFxcXCsvZywgJ1xcXFwnKTtcbiAgICB9XG4gICAgLy8gcmVtb3ZlIHJlZHVuZGFudCBzbGFzaGVzXG4gICAgcmV0dXJuIHAucmVwbGFjZSgvXFwvXFwvKy9nLCAnLycpO1xufVxuLy8gb24gTWFjL0xpbnV4LCB0ZXN0IHRoZSBleGVjdXRlIGJpdFxuLy8gICAgIFIgICBXICBYICBSICBXIFggUiBXIFhcbi8vICAgMjU2IDEyOCA2NCAzMiAxNiA4IDQgMiAxXG5mdW5jdGlvbiBpc1VuaXhFeGVjdXRhYmxlKHN0YXRzKSB7XG4gICAgcmV0dXJuICgoc3RhdHMubW9kZSAmIDEpID4gMCB8fFxuICAgICAgICAoKHN0YXRzLm1vZGUgJiA4KSA+IDAgJiYgc3RhdHMuZ2lkID09PSBwcm9jZXNzLmdldGdpZCgpKSB8fFxuICAgICAgICAoKHN0YXRzLm1vZGUgJiA2NCkgPiAwICYmIHN0YXRzLnVpZCA9PT0gcHJvY2Vzcy5nZXR1aWQoKSkpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW8tdXRpbC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY2hpbGRQcm9jZXNzID0gcmVxdWlyZShcImNoaWxkX3Byb2Nlc3NcIik7XG5jb25zdCBwYXRoID0gcmVxdWlyZShcInBhdGhcIik7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwidXRpbFwiKTtcbmNvbnN0IGlvVXRpbCA9IHJlcXVpcmUoXCIuL2lvLXV0aWxcIik7XG5jb25zdCBleGVjID0gdXRpbF8xLnByb21pc2lmeShjaGlsZFByb2Nlc3MuZXhlYyk7XG4vKipcbiAqIENvcGllcyBhIGZpbGUgb3IgZm9sZGVyLlxuICogQmFzZWQgb2ZmIG9mIHNoZWxsanMgLSBodHRwczovL2dpdGh1Yi5jb20vc2hlbGxqcy9zaGVsbGpzL2Jsb2IvOTIzN2Y2NmM1MmU1ZGFhNDA0NThmOTRmOTU2NWUxOGU4MTMyZjVhNi9zcmMvY3AuanNcbiAqXG4gKiBAcGFyYW0gICAgIHNvdXJjZSAgICBzb3VyY2UgcGF0aFxuICogQHBhcmFtICAgICBkZXN0ICAgICAgZGVzdGluYXRpb24gcGF0aFxuICogQHBhcmFtICAgICBvcHRpb25zICAgb3B0aW9uYWwuIFNlZSBDb3B5T3B0aW9ucy5cbiAqL1xuZnVuY3Rpb24gY3Aoc291cmNlLCBkZXN0LCBvcHRpb25zID0ge30pIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zdCB7IGZvcmNlLCByZWN1cnNpdmUgfSA9IHJlYWRDb3B5T3B0aW9ucyhvcHRpb25zKTtcbiAgICAgICAgY29uc3QgZGVzdFN0YXQgPSAoeWllbGQgaW9VdGlsLmV4aXN0cyhkZXN0KSkgPyB5aWVsZCBpb1V0aWwuc3RhdChkZXN0KSA6IG51bGw7XG4gICAgICAgIC8vIERlc3QgaXMgYW4gZXhpc3RpbmcgZmlsZSwgYnV0IG5vdCBmb3JjaW5nXG4gICAgICAgIGlmIChkZXN0U3RhdCAmJiBkZXN0U3RhdC5pc0ZpbGUoKSAmJiAhZm9yY2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiBkZXN0IGlzIGFuIGV4aXN0aW5nIGRpcmVjdG9yeSwgc2hvdWxkIGNvcHkgaW5zaWRlLlxuICAgICAgICBjb25zdCBuZXdEZXN0ID0gZGVzdFN0YXQgJiYgZGVzdFN0YXQuaXNEaXJlY3RvcnkoKVxuICAgICAgICAgICAgPyBwYXRoLmpvaW4oZGVzdCwgcGF0aC5iYXNlbmFtZShzb3VyY2UpKVxuICAgICAgICAgICAgOiBkZXN0O1xuICAgICAgICBpZiAoISh5aWVsZCBpb1V0aWwuZXhpc3RzKHNvdXJjZSkpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYG5vIHN1Y2ggZmlsZSBvciBkaXJlY3Rvcnk6ICR7c291cmNlfWApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNvdXJjZVN0YXQgPSB5aWVsZCBpb1V0aWwuc3RhdChzb3VyY2UpO1xuICAgICAgICBpZiAoc291cmNlU3RhdC5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgICAgICBpZiAoIXJlY3Vyc2l2ZSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGNvcHkuICR7c291cmNlfSBpcyBhIGRpcmVjdG9yeSwgYnV0IHRyaWVkIHRvIGNvcHkgd2l0aG91dCByZWN1cnNpdmUgZmxhZy5gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHlpZWxkIGNwRGlyUmVjdXJzaXZlKHNvdXJjZSwgbmV3RGVzdCwgMCwgZm9yY2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHBhdGgucmVsYXRpdmUoc291cmNlLCBuZXdEZXN0KSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICAvLyBhIGZpbGUgY2Fubm90IGJlIGNvcGllZCB0byBpdHNlbGZcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCcke25ld0Rlc3R9JyBhbmQgJyR7c291cmNlfScgYXJlIHRoZSBzYW1lIGZpbGVgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHlpZWxkIGNvcHlGaWxlKHNvdXJjZSwgbmV3RGVzdCwgZm9yY2UpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5leHBvcnRzLmNwID0gY3A7XG4vKipcbiAqIE1vdmVzIGEgcGF0aC5cbiAqXG4gKiBAcGFyYW0gICAgIHNvdXJjZSAgICBzb3VyY2UgcGF0aFxuICogQHBhcmFtICAgICBkZXN0ICAgICAgZGVzdGluYXRpb24gcGF0aFxuICogQHBhcmFtICAgICBvcHRpb25zICAgb3B0aW9uYWwuIFNlZSBNb3ZlT3B0aW9ucy5cbiAqL1xuZnVuY3Rpb24gbXYoc291cmNlLCBkZXN0LCBvcHRpb25zID0ge30pIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBpZiAoeWllbGQgaW9VdGlsLmV4aXN0cyhkZXN0KSkge1xuICAgICAgICAgICAgbGV0IGRlc3RFeGlzdHMgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHlpZWxkIGlvVXRpbC5pc0RpcmVjdG9yeShkZXN0KSkge1xuICAgICAgICAgICAgICAgIC8vIElmIGRlc3QgaXMgZGlyZWN0b3J5IGNvcHkgc3JjIGludG8gZGVzdFxuICAgICAgICAgICAgICAgIGRlc3QgPSBwYXRoLmpvaW4oZGVzdCwgcGF0aC5iYXNlbmFtZShzb3VyY2UpKTtcbiAgICAgICAgICAgICAgICBkZXN0RXhpc3RzID0geWllbGQgaW9VdGlsLmV4aXN0cyhkZXN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkZXN0RXhpc3RzKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuZm9yY2UgPT0gbnVsbCB8fCBvcHRpb25zLmZvcmNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHlpZWxkIHJtUkYoZGVzdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Rlc3RpbmF0aW9uIGFscmVhZHkgZXhpc3RzJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHlpZWxkIG1rZGlyUChwYXRoLmRpcm5hbWUoZGVzdCkpO1xuICAgICAgICB5aWVsZCBpb1V0aWwucmVuYW1lKHNvdXJjZSwgZGVzdCk7XG4gICAgfSk7XG59XG5leHBvcnRzLm12ID0gbXY7XG4vKipcbiAqIFJlbW92ZSBhIHBhdGggcmVjdXJzaXZlbHkgd2l0aCBmb3JjZVxuICpcbiAqIEBwYXJhbSBpbnB1dFBhdGggcGF0aCB0byByZW1vdmVcbiAqL1xuZnVuY3Rpb24gcm1SRihpbnB1dFBhdGgpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBpZiAoaW9VdGlsLklTX1dJTkRPV1MpIHtcbiAgICAgICAgICAgIC8vIE5vZGUgZG9lc24ndCBwcm92aWRlIGEgZGVsZXRlIG9wZXJhdGlvbiwgb25seSBhbiB1bmxpbmsgZnVuY3Rpb24uIFRoaXMgbWVhbnMgdGhhdCBpZiB0aGUgZmlsZSBpcyBiZWluZyB1c2VkIGJ5IGFub3RoZXJcbiAgICAgICAgICAgIC8vIHByb2dyYW0gKGUuZy4gYW50aXZpcnVzKSwgaXQgd29uJ3QgYmUgZGVsZXRlZC4gVG8gYWRkcmVzcyB0aGlzLCB3ZSBzaGVsbCBvdXQgdGhlIHdvcmsgdG8gcmQvZGVsLlxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAoeWllbGQgaW9VdGlsLmlzRGlyZWN0b3J5KGlucHV0UGF0aCwgdHJ1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgeWllbGQgZXhlYyhgcmQgL3MgL3EgXCIke2lucHV0UGF0aH1cImApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgeWllbGQgZXhlYyhgZGVsIC9mIC9hIFwiJHtpbnB1dFBhdGh9XCJgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgeW91IHRyeSB0byBkZWxldGUgYSBmaWxlIHRoYXQgZG9lc24ndCBleGlzdCwgZGVzaXJlZCByZXN1bHQgaXMgYWNoaWV2ZWRcbiAgICAgICAgICAgICAgICAvLyBvdGhlciBlcnJvcnMgYXJlIHZhbGlkXG4gICAgICAgICAgICAgICAgaWYgKGVyci5jb2RlICE9PSAnRU5PRU5UJylcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gU2hlbGxpbmcgb3V0IGZhaWxzIHRvIHJlbW92ZSBhIHN5bWxpbmsgZm9sZGVyIHdpdGggbWlzc2luZyBzb3VyY2UsIHRoaXMgdW5saW5rIGNhdGNoZXMgdGhhdFxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB5aWVsZCBpb1V0aWwudW5saW5rKGlucHV0UGF0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgeW91IHRyeSB0byBkZWxldGUgYSBmaWxlIHRoYXQgZG9lc24ndCBleGlzdCwgZGVzaXJlZCByZXN1bHQgaXMgYWNoaWV2ZWRcbiAgICAgICAgICAgICAgICAvLyBvdGhlciBlcnJvcnMgYXJlIHZhbGlkXG4gICAgICAgICAgICAgICAgaWYgKGVyci5jb2RlICE9PSAnRU5PRU5UJylcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGV0IGlzRGlyID0gZmFsc2U7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlzRGlyID0geWllbGQgaW9VdGlsLmlzRGlyZWN0b3J5KGlucHV0UGF0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgeW91IHRyeSB0byBkZWxldGUgYSBmaWxlIHRoYXQgZG9lc24ndCBleGlzdCwgZGVzaXJlZCByZXN1bHQgaXMgYWNoaWV2ZWRcbiAgICAgICAgICAgICAgICAvLyBvdGhlciBlcnJvcnMgYXJlIHZhbGlkXG4gICAgICAgICAgICAgICAgaWYgKGVyci5jb2RlICE9PSAnRU5PRU5UJylcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc0Rpcikge1xuICAgICAgICAgICAgICAgIHlpZWxkIGV4ZWMoYHJtIC1yZiBcIiR7aW5wdXRQYXRofVwiYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB5aWVsZCBpb1V0aWwudW5saW5rKGlucHV0UGF0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmV4cG9ydHMucm1SRiA9IHJtUkY7XG4vKipcbiAqIE1ha2UgYSBkaXJlY3RvcnkuICBDcmVhdGVzIHRoZSBmdWxsIHBhdGggd2l0aCBmb2xkZXJzIGluIGJldHdlZW5cbiAqIFdpbGwgdGhyb3cgaWYgaXQgZmFpbHNcbiAqXG4gKiBAcGFyYW0gICBmc1BhdGggICAgICAgIHBhdGggdG8gY3JlYXRlXG4gKiBAcmV0dXJucyBQcm9taXNlPHZvaWQ+XG4gKi9cbmZ1bmN0aW9uIG1rZGlyUChmc1BhdGgpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICB5aWVsZCBpb1V0aWwubWtkaXJQKGZzUGF0aCk7XG4gICAgfSk7XG59XG5leHBvcnRzLm1rZGlyUCA9IG1rZGlyUDtcbi8qKlxuICogUmV0dXJucyBwYXRoIG9mIGEgdG9vbCBoYWQgdGhlIHRvb2wgYWN0dWFsbHkgYmVlbiBpbnZva2VkLiAgUmVzb2x2ZXMgdmlhIHBhdGhzLlxuICogSWYgeW91IGNoZWNrIGFuZCB0aGUgdG9vbCBkb2VzIG5vdCBleGlzdCwgaXQgd2lsbCB0aHJvdy5cbiAqXG4gKiBAcGFyYW0gICAgIHRvb2wgICAgICAgICAgICAgIG5hbWUgb2YgdGhlIHRvb2xcbiAqIEBwYXJhbSAgICAgY2hlY2sgICAgICAgICAgICAgd2hldGhlciB0byBjaGVjayBpZiB0b29sIGV4aXN0c1xuICogQHJldHVybnMgICBQcm9taXNlPHN0cmluZz4gICBwYXRoIHRvIHRvb2xcbiAqL1xuZnVuY3Rpb24gd2hpY2godG9vbCwgY2hlY2spIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBpZiAoIXRvb2wpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInBhcmFtZXRlciAndG9vbCcgaXMgcmVxdWlyZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcmVjdXJzaXZlIHdoZW4gY2hlY2s9dHJ1ZVxuICAgICAgICBpZiAoY2hlY2spIHtcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHlpZWxkIHdoaWNoKHRvb2wsIGZhbHNlKTtcbiAgICAgICAgICAgIGlmICghcmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgaWYgKGlvVXRpbC5JU19XSU5ET1dTKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5hYmxlIHRvIGxvY2F0ZSBleGVjdXRhYmxlIGZpbGU6ICR7dG9vbH0uIFBsZWFzZSB2ZXJpZnkgZWl0aGVyIHRoZSBmaWxlIHBhdGggZXhpc3RzIG9yIHRoZSBmaWxlIGNhbiBiZSBmb3VuZCB3aXRoaW4gYSBkaXJlY3Rvcnkgc3BlY2lmaWVkIGJ5IHRoZSBQQVRIIGVudmlyb25tZW50IHZhcmlhYmxlLiBBbHNvIHZlcmlmeSB0aGUgZmlsZSBoYXMgYSB2YWxpZCBleHRlbnNpb24gZm9yIGFuIGV4ZWN1dGFibGUgZmlsZS5gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5hYmxlIHRvIGxvY2F0ZSBleGVjdXRhYmxlIGZpbGU6ICR7dG9vbH0uIFBsZWFzZSB2ZXJpZnkgZWl0aGVyIHRoZSBmaWxlIHBhdGggZXhpc3RzIG9yIHRoZSBmaWxlIGNhbiBiZSBmb3VuZCB3aXRoaW4gYSBkaXJlY3Rvcnkgc3BlY2lmaWVkIGJ5IHRoZSBQQVRIIGVudmlyb25tZW50IHZhcmlhYmxlLiBBbHNvIGNoZWNrIHRoZSBmaWxlIG1vZGUgdG8gdmVyaWZ5IHRoZSBmaWxlIGlzIGV4ZWN1dGFibGUuYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBidWlsZCB0aGUgbGlzdCBvZiBleHRlbnNpb25zIHRvIHRyeVxuICAgICAgICAgICAgY29uc3QgZXh0ZW5zaW9ucyA9IFtdO1xuICAgICAgICAgICAgaWYgKGlvVXRpbC5JU19XSU5ET1dTICYmIHByb2Nlc3MuZW52LlBBVEhFWFQpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGV4dGVuc2lvbiBvZiBwcm9jZXNzLmVudi5QQVRIRVhULnNwbGl0KHBhdGguZGVsaW1pdGVyKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXh0ZW5zaW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBleHRlbnNpb25zLnB1c2goZXh0ZW5zaW9uKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGlmIGl0J3Mgcm9vdGVkLCByZXR1cm4gaXQgaWYgZXhpc3RzLiBvdGhlcndpc2UgcmV0dXJuIGVtcHR5LlxuICAgICAgICAgICAgaWYgKGlvVXRpbC5pc1Jvb3RlZCh0b29sKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGVQYXRoID0geWllbGQgaW9VdGlsLnRyeUdldEV4ZWN1dGFibGVQYXRoKHRvb2wsIGV4dGVuc2lvbnMpO1xuICAgICAgICAgICAgICAgIGlmIChmaWxlUGF0aCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmlsZVBhdGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGlmIGFueSBwYXRoIHNlcGFyYXRvcnMsIHJldHVybiBlbXB0eVxuICAgICAgICAgICAgaWYgKHRvb2wuaW5jbHVkZXMoJy8nKSB8fCAoaW9VdGlsLklTX1dJTkRPV1MgJiYgdG9vbC5pbmNsdWRlcygnXFxcXCcpKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGJ1aWxkIHRoZSBsaXN0IG9mIGRpcmVjdG9yaWVzXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gTm90ZSwgdGVjaG5pY2FsbHkgXCJ3aGVyZVwiIGNoZWNrcyB0aGUgY3VycmVudCBkaXJlY3Rvcnkgb24gV2luZG93cy4gRnJvbSBhIHRvb2xraXQgcGVyc3BlY3RpdmUsXG4gICAgICAgICAgICAvLyBpdCBmZWVscyBsaWtlIHdlIHNob3VsZCBub3QgZG8gdGhpcy4gQ2hlY2tpbmcgdGhlIGN1cnJlbnQgZGlyZWN0b3J5IHNlZW1zIGxpa2UgbW9yZSBvZiBhIHVzZVxuICAgICAgICAgICAgLy8gY2FzZSBvZiBhIHNoZWxsLCBhbmQgdGhlIHdoaWNoKCkgZnVuY3Rpb24gZXhwb3NlZCBieSB0aGUgdG9vbGtpdCBzaG91bGQgc3RyaXZlIGZvciBjb25zaXN0ZW5jeVxuICAgICAgICAgICAgLy8gYWNyb3NzIHBsYXRmb3Jtcy5cbiAgICAgICAgICAgIGNvbnN0IGRpcmVjdG9yaWVzID0gW107XG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuUEFUSCkge1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgcCBvZiBwcm9jZXNzLmVudi5QQVRILnNwbGl0KHBhdGguZGVsaW1pdGVyKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0b3JpZXMucHVzaChwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHJldHVybiB0aGUgZmlyc3QgbWF0Y2hcbiAgICAgICAgICAgIGZvciAoY29uc3QgZGlyZWN0b3J5IG9mIGRpcmVjdG9yaWVzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZVBhdGggPSB5aWVsZCBpb1V0aWwudHJ5R2V0RXhlY3V0YWJsZVBhdGgoZGlyZWN0b3J5ICsgcGF0aC5zZXAgKyB0b29sLCBleHRlbnNpb25zKTtcbiAgICAgICAgICAgICAgICBpZiAoZmlsZVBhdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZpbGVQYXRoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYHdoaWNoIGZhaWxlZCB3aXRoIG1lc3NhZ2UgJHtlcnIubWVzc2FnZX1gKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZXhwb3J0cy53aGljaCA9IHdoaWNoO1xuZnVuY3Rpb24gcmVhZENvcHlPcHRpb25zKG9wdGlvbnMpIHtcbiAgICBjb25zdCBmb3JjZSA9IG9wdGlvbnMuZm9yY2UgPT0gbnVsbCA/IHRydWUgOiBvcHRpb25zLmZvcmNlO1xuICAgIGNvbnN0IHJlY3Vyc2l2ZSA9IEJvb2xlYW4ob3B0aW9ucy5yZWN1cnNpdmUpO1xuICAgIHJldHVybiB7IGZvcmNlLCByZWN1cnNpdmUgfTtcbn1cbmZ1bmN0aW9uIGNwRGlyUmVjdXJzaXZlKHNvdXJjZURpciwgZGVzdERpciwgY3VycmVudERlcHRoLCBmb3JjZSkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIC8vIEVuc3VyZSB0aGVyZSBpcyBub3QgYSBydW4gYXdheSByZWN1cnNpdmUgY29weVxuICAgICAgICBpZiAoY3VycmVudERlcHRoID49IDI1NSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY3VycmVudERlcHRoKys7XG4gICAgICAgIHlpZWxkIG1rZGlyUChkZXN0RGlyKTtcbiAgICAgICAgY29uc3QgZmlsZXMgPSB5aWVsZCBpb1V0aWwucmVhZGRpcihzb3VyY2VEaXIpO1xuICAgICAgICBmb3IgKGNvbnN0IGZpbGVOYW1lIG9mIGZpbGVzKSB7XG4gICAgICAgICAgICBjb25zdCBzcmNGaWxlID0gYCR7c291cmNlRGlyfS8ke2ZpbGVOYW1lfWA7XG4gICAgICAgICAgICBjb25zdCBkZXN0RmlsZSA9IGAke2Rlc3REaXJ9LyR7ZmlsZU5hbWV9YDtcbiAgICAgICAgICAgIGNvbnN0IHNyY0ZpbGVTdGF0ID0geWllbGQgaW9VdGlsLmxzdGF0KHNyY0ZpbGUpO1xuICAgICAgICAgICAgaWYgKHNyY0ZpbGVTdGF0LmlzRGlyZWN0b3J5KCkpIHtcbiAgICAgICAgICAgICAgICAvLyBSZWN1cnNlXG4gICAgICAgICAgICAgICAgeWllbGQgY3BEaXJSZWN1cnNpdmUoc3JjRmlsZSwgZGVzdEZpbGUsIGN1cnJlbnREZXB0aCwgZm9yY2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgeWllbGQgY29weUZpbGUoc3JjRmlsZSwgZGVzdEZpbGUsIGZvcmNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBDaGFuZ2UgdGhlIG1vZGUgZm9yIHRoZSBuZXdseSBjcmVhdGVkIGRpcmVjdG9yeVxuICAgICAgICB5aWVsZCBpb1V0aWwuY2htb2QoZGVzdERpciwgKHlpZWxkIGlvVXRpbC5zdGF0KHNvdXJjZURpcikpLm1vZGUpO1xuICAgIH0pO1xufVxuLy8gQnVmZmVyZWQgZmlsZSBjb3B5XG5mdW5jdGlvbiBjb3B5RmlsZShzcmNGaWxlLCBkZXN0RmlsZSwgZm9yY2UpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBpZiAoKHlpZWxkIGlvVXRpbC5sc3RhdChzcmNGaWxlKSkuaXNTeW1ib2xpY0xpbmsoKSkge1xuICAgICAgICAgICAgLy8gdW5saW5rL3JlLWxpbmsgaXRcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgeWllbGQgaW9VdGlsLmxzdGF0KGRlc3RGaWxlKTtcbiAgICAgICAgICAgICAgICB5aWVsZCBpb1V0aWwudW5saW5rKGRlc3RGaWxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgLy8gVHJ5IHRvIG92ZXJyaWRlIGZpbGUgcGVybWlzc2lvblxuICAgICAgICAgICAgICAgIGlmIChlLmNvZGUgPT09ICdFUEVSTScpIHtcbiAgICAgICAgICAgICAgICAgICAgeWllbGQgaW9VdGlsLmNobW9kKGRlc3RGaWxlLCAnMDY2NicpO1xuICAgICAgICAgICAgICAgICAgICB5aWVsZCBpb1V0aWwudW5saW5rKGRlc3RGaWxlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gb3RoZXIgZXJyb3JzID0gaXQgZG9lc24ndCBleGlzdCwgbm8gd29yayB0byBkb1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gQ29weSBvdmVyIHN5bWxpbmtcbiAgICAgICAgICAgIGNvbnN0IHN5bWxpbmtGdWxsID0geWllbGQgaW9VdGlsLnJlYWRsaW5rKHNyY0ZpbGUpO1xuICAgICAgICAgICAgeWllbGQgaW9VdGlsLnN5bWxpbmsoc3ltbGlua0Z1bGwsIGRlc3RGaWxlLCBpb1V0aWwuSVNfV0lORE9XUyA/ICdqdW5jdGlvbicgOiBudWxsKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghKHlpZWxkIGlvVXRpbC5leGlzdHMoZGVzdEZpbGUpKSB8fCBmb3JjZSkge1xuICAgICAgICAgICAgeWllbGQgaW9VdGlsLmNvcHlGaWxlKHNyY0ZpbGUsIGRlc3RGaWxlKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW8uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGNvcmUgPSByZXF1aXJlKFwiQGFjdGlvbnMvY29yZVwiKTtcbmNvbnN0IGlvID0gcmVxdWlyZShcIkBhY3Rpb25zL2lvXCIpO1xuY29uc3QgZnMgPSByZXF1aXJlKFwiZnNcIik7XG5jb25zdCBvcyA9IHJlcXVpcmUoXCJvc1wiKTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKFwicGF0aFwiKTtcbmNvbnN0IGh0dHBtID0gcmVxdWlyZShcInR5cGVkLXJlc3QtY2xpZW50L0h0dHBDbGllbnRcIik7XG5jb25zdCBzZW12ZXIgPSByZXF1aXJlKFwic2VtdmVyXCIpO1xuY29uc3QgdXVpZFY0ID0gcmVxdWlyZShcInV1aWQvdjRcIik7XG5jb25zdCBleGVjXzEgPSByZXF1aXJlKFwiQGFjdGlvbnMvZXhlYy9saWIvZXhlY1wiKTtcbmNvbnN0IGFzc2VydF8xID0gcmVxdWlyZShcImFzc2VydFwiKTtcbmNsYXNzIEhUVFBFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihodHRwU3RhdHVzQ29kZSkge1xuICAgICAgICBzdXBlcihgVW5leHBlY3RlZCBIVFRQIHJlc3BvbnNlOiAke2h0dHBTdGF0dXNDb2RlfWApO1xuICAgICAgICB0aGlzLmh0dHBTdGF0dXNDb2RlID0gaHR0cFN0YXR1c0NvZGU7XG4gICAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZih0aGlzLCBuZXcudGFyZ2V0LnByb3RvdHlwZSk7XG4gICAgfVxufVxuZXhwb3J0cy5IVFRQRXJyb3IgPSBIVFRQRXJyb3I7XG5jb25zdCBJU19XSU5ET1dTID0gcHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJztcbmNvbnN0IHVzZXJBZ2VudCA9ICdhY3Rpb25zL3Rvb2wtY2FjaGUnO1xuLy8gT24gbG9hZCBncmFiIHRlbXAgZGlyZWN0b3J5IGFuZCBjYWNoZSBkaXJlY3RvcnkgYW5kIHJlbW92ZSB0aGVtIGZyb20gZW52IChjdXJyZW50bHkgZG9uJ3Qgd2FudCB0byBleHBvc2UgdGhpcylcbmxldCB0ZW1wRGlyZWN0b3J5ID0gcHJvY2Vzcy5lbnZbJ1JVTk5FUl9URU1QJ10gfHwgJyc7XG5sZXQgY2FjaGVSb290ID0gcHJvY2Vzcy5lbnZbJ1JVTk5FUl9UT09MX0NBQ0hFJ10gfHwgJyc7XG4vLyBJZiBkaXJlY3RvcmllcyBub3QgZm91bmQsIHBsYWNlIHRoZW0gaW4gY29tbW9uIHRlbXAgbG9jYXRpb25zXG5pZiAoIXRlbXBEaXJlY3RvcnkgfHwgIWNhY2hlUm9vdCkge1xuICAgIGxldCBiYXNlTG9jYXRpb247XG4gICAgaWYgKElTX1dJTkRPV1MpIHtcbiAgICAgICAgLy8gT24gd2luZG93cyB1c2UgdGhlIFVTRVJQUk9GSUxFIGVudiB2YXJpYWJsZVxuICAgICAgICBiYXNlTG9jYXRpb24gPSBwcm9jZXNzLmVudlsnVVNFUlBST0ZJTEUnXSB8fCAnQzpcXFxcJztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGlmIChwcm9jZXNzLnBsYXRmb3JtID09PSAnZGFyd2luJykge1xuICAgICAgICAgICAgYmFzZUxvY2F0aW9uID0gJy9Vc2Vycyc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBiYXNlTG9jYXRpb24gPSAnL2hvbWUnO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmICghdGVtcERpcmVjdG9yeSkge1xuICAgICAgICB0ZW1wRGlyZWN0b3J5ID0gcGF0aC5qb2luKGJhc2VMb2NhdGlvbiwgJ2FjdGlvbnMnLCAndGVtcCcpO1xuICAgIH1cbiAgICBpZiAoIWNhY2hlUm9vdCkge1xuICAgICAgICBjYWNoZVJvb3QgPSBwYXRoLmpvaW4oYmFzZUxvY2F0aW9uLCAnYWN0aW9ucycsICdjYWNoZScpO1xuICAgIH1cbn1cbi8qKlxuICogRG93bmxvYWQgYSB0b29sIGZyb20gYW4gdXJsIGFuZCBzdHJlYW0gaXQgaW50byBhIGZpbGVcbiAqXG4gKiBAcGFyYW0gdXJsICAgICAgIHVybCBvZiB0b29sIHRvIGRvd25sb2FkXG4gKiBAcmV0dXJucyAgICAgICAgIHBhdGggdG8gZG93bmxvYWRlZCB0b29sXG4gKi9cbmZ1bmN0aW9uIGRvd25sb2FkVG9vbCh1cmwpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAvLyBXcmFwIGluIGEgcHJvbWlzZSBzbyB0aGF0IHdlIGNhbiByZXNvbHZlIGZyb20gd2l0aGluIHN0cmVhbSBjYWxsYmFja3NcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaHR0cCA9IG5ldyBodHRwbS5IdHRwQ2xpZW50KHVzZXJBZ2VudCwgW10sIHtcbiAgICAgICAgICAgICAgICAgICAgYWxsb3dSZXRyaWVzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBtYXhSZXRyaWVzOiAzXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY29uc3QgZGVzdFBhdGggPSBwYXRoLmpvaW4odGVtcERpcmVjdG9yeSwgdXVpZFY0KCkpO1xuICAgICAgICAgICAgICAgIHlpZWxkIGlvLm1rZGlyUCh0ZW1wRGlyZWN0b3J5KTtcbiAgICAgICAgICAgICAgICBjb3JlLmRlYnVnKGBEb3dubG9hZGluZyAke3VybH1gKTtcbiAgICAgICAgICAgICAgICBjb3JlLmRlYnVnKGBEb3dubG9hZGluZyAke2Rlc3RQYXRofWApO1xuICAgICAgICAgICAgICAgIGlmIChmcy5leGlzdHNTeW5jKGRlc3RQYXRoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYERlc3RpbmF0aW9uIGZpbGUgcGF0aCAke2Rlc3RQYXRofSBhbHJlYWR5IGV4aXN0c2ApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IHlpZWxkIGh0dHAuZ2V0KHVybCk7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLm1lc3NhZ2Uuc3RhdHVzQ29kZSAhPT0gMjAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVyciA9IG5ldyBIVFRQRXJyb3IocmVzcG9uc2UubWVzc2FnZS5zdGF0dXNDb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgY29yZS5kZWJ1ZyhgRmFpbGVkIHRvIGRvd25sb2FkIGZyb20gXCIke3VybH1cIi4gQ29kZSgke3Jlc3BvbnNlLm1lc3NhZ2Uuc3RhdHVzQ29kZX0pIE1lc3NhZ2UoJHtyZXNwb25zZS5tZXNzYWdlLnN0YXR1c01lc3NhZ2V9KWApO1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGUgPSBmcy5jcmVhdGVXcml0ZVN0cmVhbShkZXN0UGF0aCk7XG4gICAgICAgICAgICAgICAgZmlsZS5vbignb3BlbicsICgpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0cmVhbSA9IHJlc3BvbnNlLm1lc3NhZ2UucGlwZShmaWxlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmVhbS5vbignY2xvc2UnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29yZS5kZWJ1ZygnZG93bmxvYWQgY29tcGxldGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGRlc3RQYXRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvcmUuZGVidWcoYEZhaWxlZCB0byBkb3dubG9hZCBmcm9tIFwiJHt1cmx9XCIuIENvZGUoJHtyZXNwb25zZS5tZXNzYWdlLnN0YXR1c0NvZGV9KSBNZXNzYWdlKCR7cmVzcG9uc2UubWVzc2FnZS5zdGF0dXNNZXNzYWdlfSlgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIGZpbGUub24oJ2Vycm9yJywgZXJyID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZS5lbmQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICB9KTtcbn1cbmV4cG9ydHMuZG93bmxvYWRUb29sID0gZG93bmxvYWRUb29sO1xuLyoqXG4gKiBFeHRyYWN0IGEgLjd6IGZpbGVcbiAqXG4gKiBAcGFyYW0gZmlsZSAgICAgcGF0aCB0byB0aGUgLjd6IGZpbGVcbiAqIEBwYXJhbSBkZXN0ICAgICBkZXN0aW5hdGlvbiBkaXJlY3RvcnkuIE9wdGlvbmFsLlxuICogQHBhcmFtIF83elBhdGggIHBhdGggdG8gN3pyLmV4ZS4gT3B0aW9uYWwsIGZvciBsb25nIHBhdGggc3VwcG9ydC4gTW9zdCAuN3ogYXJjaGl2ZXMgZG8gbm90IGhhdmUgdGhpc1xuICogcHJvYmxlbS4gSWYgeW91ciAuN3ogYXJjaGl2ZSBjb250YWlucyB2ZXJ5IGxvbmcgcGF0aHMsIHlvdSBjYW4gcGFzcyB0aGUgcGF0aCB0byA3enIuZXhlIHdoaWNoIHdpbGxcbiAqIGdyYWNlZnVsbHkgaGFuZGxlIGxvbmcgcGF0aHMuIEJ5IGRlZmF1bHQgN3pkZWMuZXhlIGlzIHVzZWQgYmVjYXVzZSBpdCBpcyBhIHZlcnkgc21hbGwgcHJvZ3JhbSBhbmQgaXNcbiAqIGJ1bmRsZWQgd2l0aCB0aGUgdG9vbCBsaWIuIEhvd2V2ZXIgaXQgZG9lcyBub3Qgc3VwcG9ydCBsb25nIHBhdGhzLiA3enIuZXhlIGlzIHRoZSByZWR1Y2VkIGNvbW1hbmQgbGluZVxuICogaW50ZXJmYWNlLCBpdCBpcyBzbWFsbGVyIHRoYW4gdGhlIGZ1bGwgY29tbWFuZCBsaW5lIGludGVyZmFjZSwgYW5kIGl0IGRvZXMgc3VwcG9ydCBsb25nIHBhdGhzLiBBdCB0aGVcbiAqIHRpbWUgb2YgdGhpcyB3cml0aW5nLCBpdCBpcyBmcmVlbHkgYXZhaWxhYmxlIGZyb20gdGhlIExaTUEgU0RLIHRoYXQgaXMgYXZhaWxhYmxlIG9uIHRoZSA3emlwIHdlYnNpdGUuXG4gKiBCZSBzdXJlIHRvIGNoZWNrIHRoZSBjdXJyZW50IGxpY2Vuc2UgYWdyZWVtZW50LiBJZiA3enIuZXhlIGlzIGJ1bmRsZWQgd2l0aCB5b3VyIGFjdGlvbiwgdGhlbiB0aGUgcGF0aFxuICogdG8gN3pyLmV4ZSBjYW4gYmUgcGFzcyB0byB0aGlzIGZ1bmN0aW9uLlxuICogQHJldHVybnMgICAgICAgIHBhdGggdG8gdGhlIGRlc3RpbmF0aW9uIGRpcmVjdG9yeVxuICovXG5mdW5jdGlvbiBleHRyYWN0N3ooZmlsZSwgZGVzdCwgXzd6UGF0aCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGFzc2VydF8xLm9rKElTX1dJTkRPV1MsICdleHRyYWN0N3ooKSBub3Qgc3VwcG9ydGVkIG9uIGN1cnJlbnQgT1MnKTtcbiAgICAgICAgYXNzZXJ0XzEub2soZmlsZSwgJ3BhcmFtZXRlciBcImZpbGVcIiBpcyByZXF1aXJlZCcpO1xuICAgICAgICBkZXN0ID0gZGVzdCB8fCAoeWllbGQgX2NyZWF0ZUV4dHJhY3RGb2xkZXIoZGVzdCkpO1xuICAgICAgICBjb25zdCBvcmlnaW5hbEN3ZCA9IHByb2Nlc3MuY3dkKCk7XG4gICAgICAgIHByb2Nlc3MuY2hkaXIoZGVzdCk7XG4gICAgICAgIGlmIChfN3pQYXRoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFyZ3MgPSBbXG4gICAgICAgICAgICAgICAgICAgICd4JyxcbiAgICAgICAgICAgICAgICAgICAgJy1iYjEnLFxuICAgICAgICAgICAgICAgICAgICAnLWJkJyxcbiAgICAgICAgICAgICAgICAgICAgJy1zY2NVVEYtOCcsXG4gICAgICAgICAgICAgICAgICAgIGZpbGVcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgICAgIHNpbGVudDogdHJ1ZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgeWllbGQgZXhlY18xLmV4ZWMoYFwiJHtfN3pQYXRofVwiYCwgYXJncywgb3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICBwcm9jZXNzLmNoZGlyKG9yaWdpbmFsQ3dkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGVzY2FwZWRTY3JpcHQgPSBwYXRoXG4gICAgICAgICAgICAgICAgLmpvaW4oX19kaXJuYW1lLCAnLi4nLCAnc2NyaXB0cycsICdJbnZva2UtN3pkZWMucHMxJylcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvJy9nLCBcIicnXCIpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL1wifFxcbnxcXHIvZywgJycpOyAvLyBkb3VibGUtdXAgc2luZ2xlIHF1b3RlcywgcmVtb3ZlIGRvdWJsZSBxdW90ZXMgYW5kIG5ld2xpbmVzXG4gICAgICAgICAgICBjb25zdCBlc2NhcGVkRmlsZSA9IGZpbGUucmVwbGFjZSgvJy9nLCBcIicnXCIpLnJlcGxhY2UoL1wifFxcbnxcXHIvZywgJycpO1xuICAgICAgICAgICAgY29uc3QgZXNjYXBlZFRhcmdldCA9IGRlc3QucmVwbGFjZSgvJy9nLCBcIicnXCIpLnJlcGxhY2UoL1wifFxcbnxcXHIvZywgJycpO1xuICAgICAgICAgICAgY29uc3QgY29tbWFuZCA9IGAmICcke2VzY2FwZWRTY3JpcHR9JyAtU291cmNlICcke2VzY2FwZWRGaWxlfScgLVRhcmdldCAnJHtlc2NhcGVkVGFyZ2V0fSdgO1xuICAgICAgICAgICAgY29uc3QgYXJncyA9IFtcbiAgICAgICAgICAgICAgICAnLU5vTG9nbycsXG4gICAgICAgICAgICAgICAgJy1TdGEnLFxuICAgICAgICAgICAgICAgICctTm9Qcm9maWxlJyxcbiAgICAgICAgICAgICAgICAnLU5vbkludGVyYWN0aXZlJyxcbiAgICAgICAgICAgICAgICAnLUV4ZWN1dGlvblBvbGljeScsXG4gICAgICAgICAgICAgICAgJ1VucmVzdHJpY3RlZCcsXG4gICAgICAgICAgICAgICAgJy1Db21tYW5kJyxcbiAgICAgICAgICAgICAgICBjb21tYW5kXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICBzaWxlbnQ6IHRydWVcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBvd2Vyc2hlbGxQYXRoID0geWllbGQgaW8ud2hpY2goJ3Bvd2Vyc2hlbGwnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB5aWVsZCBleGVjXzEuZXhlYyhgXCIke3Bvd2Vyc2hlbGxQYXRofVwiYCwgYXJncywgb3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICBwcm9jZXNzLmNoZGlyKG9yaWdpbmFsQ3dkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGVzdDtcbiAgICB9KTtcbn1cbmV4cG9ydHMuZXh0cmFjdDd6ID0gZXh0cmFjdDd6O1xuLyoqXG4gKiBFeHRyYWN0IGEgdGFyXG4gKlxuICogQHBhcmFtIGZpbGUgICAgIHBhdGggdG8gdGhlIHRhclxuICogQHBhcmFtIGRlc3QgICAgIGRlc3RpbmF0aW9uIGRpcmVjdG9yeS4gT3B0aW9uYWwuXG4gKiBAcGFyYW0gZmxhZ3MgICAgZmxhZ3MgZm9yIHRoZSB0YXIuIE9wdGlvbmFsLlxuICogQHJldHVybnMgICAgICAgIHBhdGggdG8gdGhlIGRlc3RpbmF0aW9uIGRpcmVjdG9yeVxuICovXG5mdW5jdGlvbiBleHRyYWN0VGFyKGZpbGUsIGRlc3QsIGZsYWdzID0gJ3h6Jykge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGlmICghZmlsZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwicGFyYW1ldGVyICdmaWxlJyBpcyByZXF1aXJlZFwiKTtcbiAgICAgICAgfVxuICAgICAgICBkZXN0ID0gZGVzdCB8fCAoeWllbGQgX2NyZWF0ZUV4dHJhY3RGb2xkZXIoZGVzdCkpO1xuICAgICAgICBjb25zdCB0YXJQYXRoID0geWllbGQgaW8ud2hpY2goJ3RhcicsIHRydWUpO1xuICAgICAgICB5aWVsZCBleGVjXzEuZXhlYyhgXCIke3RhclBhdGh9XCJgLCBbZmxhZ3MsICctQycsIGRlc3QsICctZicsIGZpbGVdKTtcbiAgICAgICAgcmV0dXJuIGRlc3Q7XG4gICAgfSk7XG59XG5leHBvcnRzLmV4dHJhY3RUYXIgPSBleHRyYWN0VGFyO1xuLyoqXG4gKiBFeHRyYWN0IGEgemlwXG4gKlxuICogQHBhcmFtIGZpbGUgICAgIHBhdGggdG8gdGhlIHppcFxuICogQHBhcmFtIGRlc3QgICAgIGRlc3RpbmF0aW9uIGRpcmVjdG9yeS4gT3B0aW9uYWwuXG4gKiBAcmV0dXJucyAgICAgICAgcGF0aCB0byB0aGUgZGVzdGluYXRpb24gZGlyZWN0b3J5XG4gKi9cbmZ1bmN0aW9uIGV4dHJhY3RaaXAoZmlsZSwgZGVzdCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGlmICghZmlsZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwicGFyYW1ldGVyICdmaWxlJyBpcyByZXF1aXJlZFwiKTtcbiAgICAgICAgfVxuICAgICAgICBkZXN0ID0gZGVzdCB8fCAoeWllbGQgX2NyZWF0ZUV4dHJhY3RGb2xkZXIoZGVzdCkpO1xuICAgICAgICBpZiAoSVNfV0lORE9XUykge1xuICAgICAgICAgICAgeWllbGQgZXh0cmFjdFppcFdpbihmaWxlLCBkZXN0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHlpZWxkIGV4dHJhY3RaaXBOaXgoZmlsZSwgZGVzdCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRlc3Q7XG4gICAgfSk7XG59XG5leHBvcnRzLmV4dHJhY3RaaXAgPSBleHRyYWN0WmlwO1xuZnVuY3Rpb24gZXh0cmFjdFppcFdpbihmaWxlLCBkZXN0KSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgLy8gYnVpbGQgdGhlIHBvd2Vyc2hlbGwgY29tbWFuZFxuICAgICAgICBjb25zdCBlc2NhcGVkRmlsZSA9IGZpbGUucmVwbGFjZSgvJy9nLCBcIicnXCIpLnJlcGxhY2UoL1wifFxcbnxcXHIvZywgJycpOyAvLyBkb3VibGUtdXAgc2luZ2xlIHF1b3RlcywgcmVtb3ZlIGRvdWJsZSBxdW90ZXMgYW5kIG5ld2xpbmVzXG4gICAgICAgIGNvbnN0IGVzY2FwZWREZXN0ID0gZGVzdC5yZXBsYWNlKC8nL2csIFwiJydcIikucmVwbGFjZSgvXCJ8XFxufFxcci9nLCAnJyk7XG4gICAgICAgIGNvbnN0IGNvbW1hbmQgPSBgJEVycm9yQWN0aW9uUHJlZmVyZW5jZSA9ICdTdG9wJyA7IHRyeSB7IEFkZC1UeXBlIC1Bc3NlbWJseU5hbWUgU3lzdGVtLklPLkNvbXByZXNzaW9uLkZpbGVTeXN0ZW0gfSBjYXRjaCB7IH0gOyBbU3lzdGVtLklPLkNvbXByZXNzaW9uLlppcEZpbGVdOjpFeHRyYWN0VG9EaXJlY3RvcnkoJyR7ZXNjYXBlZEZpbGV9JywgJyR7ZXNjYXBlZERlc3R9JylgO1xuICAgICAgICAvLyBydW4gcG93ZXJzaGVsbFxuICAgICAgICBjb25zdCBwb3dlcnNoZWxsUGF0aCA9IHlpZWxkIGlvLndoaWNoKCdwb3dlcnNoZWxsJyk7XG4gICAgICAgIGNvbnN0IGFyZ3MgPSBbXG4gICAgICAgICAgICAnLU5vTG9nbycsXG4gICAgICAgICAgICAnLVN0YScsXG4gICAgICAgICAgICAnLU5vUHJvZmlsZScsXG4gICAgICAgICAgICAnLU5vbkludGVyYWN0aXZlJyxcbiAgICAgICAgICAgICctRXhlY3V0aW9uUG9saWN5JyxcbiAgICAgICAgICAgICdVbnJlc3RyaWN0ZWQnLFxuICAgICAgICAgICAgJy1Db21tYW5kJyxcbiAgICAgICAgICAgIGNvbW1hbmRcbiAgICAgICAgXTtcbiAgICAgICAgeWllbGQgZXhlY18xLmV4ZWMoYFwiJHtwb3dlcnNoZWxsUGF0aH1cImAsIGFyZ3MpO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gZXh0cmFjdFppcE5peChmaWxlLCBkZXN0KSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc3QgdW56aXBQYXRoID0geWllbGQgaW8ud2hpY2goJ3VuemlwJyk7XG4gICAgICAgIHlpZWxkIGV4ZWNfMS5leGVjKGBcIiR7dW56aXBQYXRofVwiYCwgW2ZpbGVdLCB7IGN3ZDogZGVzdCB9KTtcbiAgICB9KTtcbn1cbi8qKlxuICogQ2FjaGVzIGEgZGlyZWN0b3J5IGFuZCBpbnN0YWxscyBpdCBpbnRvIHRoZSB0b29sIGNhY2hlRGlyXG4gKlxuICogQHBhcmFtIHNvdXJjZURpciAgICB0aGUgZGlyZWN0b3J5IHRvIGNhY2hlIGludG8gdG9vbHNcbiAqIEBwYXJhbSB0b29sICAgICAgICAgIHRvb2wgbmFtZVxuICogQHBhcmFtIHZlcnNpb24gICAgICAgdmVyc2lvbiBvZiB0aGUgdG9vbC4gIHNlbXZlciBmb3JtYXRcbiAqIEBwYXJhbSBhcmNoICAgICAgICAgIGFyY2hpdGVjdHVyZSBvZiB0aGUgdG9vbC4gIE9wdGlvbmFsLiAgRGVmYXVsdHMgdG8gbWFjaGluZSBhcmNoaXRlY3R1cmVcbiAqL1xuZnVuY3Rpb24gY2FjaGVEaXIoc291cmNlRGlyLCB0b29sLCB2ZXJzaW9uLCBhcmNoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgdmVyc2lvbiA9IHNlbXZlci5jbGVhbih2ZXJzaW9uKSB8fCB2ZXJzaW9uO1xuICAgICAgICBhcmNoID0gYXJjaCB8fCBvcy5hcmNoKCk7XG4gICAgICAgIGNvcmUuZGVidWcoYENhY2hpbmcgdG9vbCAke3Rvb2x9ICR7dmVyc2lvbn0gJHthcmNofWApO1xuICAgICAgICBjb3JlLmRlYnVnKGBzb3VyY2UgZGlyOiAke3NvdXJjZURpcn1gKTtcbiAgICAgICAgaWYgKCFmcy5zdGF0U3luYyhzb3VyY2VEaXIpLmlzRGlyZWN0b3J5KCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignc291cmNlRGlyIGlzIG5vdCBhIGRpcmVjdG9yeScpO1xuICAgICAgICB9XG4gICAgICAgIC8vIENyZWF0ZSB0aGUgdG9vbCBkaXJcbiAgICAgICAgY29uc3QgZGVzdFBhdGggPSB5aWVsZCBfY3JlYXRlVG9vbFBhdGgodG9vbCwgdmVyc2lvbiwgYXJjaCk7XG4gICAgICAgIC8vIGNvcHkgZWFjaCBjaGlsZCBpdGVtLiBkbyBub3QgbW92ZS4gbW92ZSBjYW4gZmFpbCBvbiBXaW5kb3dzXG4gICAgICAgIC8vIGR1ZSB0byBhbnRpLXZpcnVzIHNvZnR3YXJlIGhhdmluZyBhbiBvcGVuIGhhbmRsZSBvbiBhIGZpbGUuXG4gICAgICAgIGZvciAoY29uc3QgaXRlbU5hbWUgb2YgZnMucmVhZGRpclN5bmMoc291cmNlRGlyKSkge1xuICAgICAgICAgICAgY29uc3QgcyA9IHBhdGguam9pbihzb3VyY2VEaXIsIGl0ZW1OYW1lKTtcbiAgICAgICAgICAgIHlpZWxkIGlvLmNwKHMsIGRlc3RQYXRoLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyB3cml0ZSAuY29tcGxldGVcbiAgICAgICAgX2NvbXBsZXRlVG9vbFBhdGgodG9vbCwgdmVyc2lvbiwgYXJjaCk7XG4gICAgICAgIHJldHVybiBkZXN0UGF0aDtcbiAgICB9KTtcbn1cbmV4cG9ydHMuY2FjaGVEaXIgPSBjYWNoZURpcjtcbi8qKlxuICogQ2FjaGVzIGEgZG93bmxvYWRlZCBmaWxlIChHVUlEKSBhbmQgaW5zdGFsbHMgaXRcbiAqIGludG8gdGhlIHRvb2wgY2FjaGUgd2l0aCBhIGdpdmVuIHRhcmdldE5hbWVcbiAqXG4gKiBAcGFyYW0gc291cmNlRmlsZSAgICB0aGUgZmlsZSB0byBjYWNoZSBpbnRvIHRvb2xzLiAgVHlwaWNhbGx5IGEgcmVzdWx0IG9mIGRvd25sb2FkVG9vbCB3aGljaCBpcyBhIGd1aWQuXG4gKiBAcGFyYW0gdGFyZ2V0RmlsZSAgICB0aGUgbmFtZSBvZiB0aGUgZmlsZSBuYW1lIGluIHRoZSB0b29scyBkaXJlY3RvcnlcbiAqIEBwYXJhbSB0b29sICAgICAgICAgIHRvb2wgbmFtZVxuICogQHBhcmFtIHZlcnNpb24gICAgICAgdmVyc2lvbiBvZiB0aGUgdG9vbC4gIHNlbXZlciBmb3JtYXRcbiAqIEBwYXJhbSBhcmNoICAgICAgICAgIGFyY2hpdGVjdHVyZSBvZiB0aGUgdG9vbC4gIE9wdGlvbmFsLiAgRGVmYXVsdHMgdG8gbWFjaGluZSBhcmNoaXRlY3R1cmVcbiAqL1xuZnVuY3Rpb24gY2FjaGVGaWxlKHNvdXJjZUZpbGUsIHRhcmdldEZpbGUsIHRvb2wsIHZlcnNpb24sIGFyY2gpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICB2ZXJzaW9uID0gc2VtdmVyLmNsZWFuKHZlcnNpb24pIHx8IHZlcnNpb247XG4gICAgICAgIGFyY2ggPSBhcmNoIHx8IG9zLmFyY2goKTtcbiAgICAgICAgY29yZS5kZWJ1ZyhgQ2FjaGluZyB0b29sICR7dG9vbH0gJHt2ZXJzaW9ufSAke2FyY2h9YCk7XG4gICAgICAgIGNvcmUuZGVidWcoYHNvdXJjZSBmaWxlOiAke3NvdXJjZUZpbGV9YCk7XG4gICAgICAgIGlmICghZnMuc3RhdFN5bmMoc291cmNlRmlsZSkuaXNGaWxlKCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignc291cmNlRmlsZSBpcyBub3QgYSBmaWxlJyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY3JlYXRlIHRoZSB0b29sIGRpclxuICAgICAgICBjb25zdCBkZXN0Rm9sZGVyID0geWllbGQgX2NyZWF0ZVRvb2xQYXRoKHRvb2wsIHZlcnNpb24sIGFyY2gpO1xuICAgICAgICAvLyBjb3B5IGluc3RlYWQgb2YgbW92ZS4gbW92ZSBjYW4gZmFpbCBvbiBXaW5kb3dzIGR1ZSB0b1xuICAgICAgICAvLyBhbnRpLXZpcnVzIHNvZnR3YXJlIGhhdmluZyBhbiBvcGVuIGhhbmRsZSBvbiBhIGZpbGUuXG4gICAgICAgIGNvbnN0IGRlc3RQYXRoID0gcGF0aC5qb2luKGRlc3RGb2xkZXIsIHRhcmdldEZpbGUpO1xuICAgICAgICBjb3JlLmRlYnVnKGBkZXN0aW5hdGlvbiBmaWxlICR7ZGVzdFBhdGh9YCk7XG4gICAgICAgIHlpZWxkIGlvLmNwKHNvdXJjZUZpbGUsIGRlc3RQYXRoKTtcbiAgICAgICAgLy8gd3JpdGUgLmNvbXBsZXRlXG4gICAgICAgIF9jb21wbGV0ZVRvb2xQYXRoKHRvb2wsIHZlcnNpb24sIGFyY2gpO1xuICAgICAgICByZXR1cm4gZGVzdEZvbGRlcjtcbiAgICB9KTtcbn1cbmV4cG9ydHMuY2FjaGVGaWxlID0gY2FjaGVGaWxlO1xuLyoqXG4gKiBGaW5kcyB0aGUgcGF0aCB0byBhIHRvb2wgdmVyc2lvbiBpbiB0aGUgbG9jYWwgaW5zdGFsbGVkIHRvb2wgY2FjaGVcbiAqXG4gKiBAcGFyYW0gdG9vbE5hbWUgICAgICBuYW1lIG9mIHRoZSB0b29sXG4gKiBAcGFyYW0gdmVyc2lvblNwZWMgICB2ZXJzaW9uIG9mIHRoZSB0b29sXG4gKiBAcGFyYW0gYXJjaCAgICAgICAgICBvcHRpb25hbCBhcmNoLiAgZGVmYXVsdHMgdG8gYXJjaCBvZiBjb21wdXRlclxuICovXG5mdW5jdGlvbiBmaW5kKHRvb2xOYW1lLCB2ZXJzaW9uU3BlYywgYXJjaCkge1xuICAgIGlmICghdG9vbE5hbWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd0b29sTmFtZSBwYXJhbWV0ZXIgaXMgcmVxdWlyZWQnKTtcbiAgICB9XG4gICAgaWYgKCF2ZXJzaW9uU3BlYykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3ZlcnNpb25TcGVjIHBhcmFtZXRlciBpcyByZXF1aXJlZCcpO1xuICAgIH1cbiAgICBhcmNoID0gYXJjaCB8fCBvcy5hcmNoKCk7XG4gICAgLy8gYXR0ZW1wdCB0byByZXNvbHZlIGFuIGV4cGxpY2l0IHZlcnNpb25cbiAgICBpZiAoIV9pc0V4cGxpY2l0VmVyc2lvbih2ZXJzaW9uU3BlYykpIHtcbiAgICAgICAgY29uc3QgbG9jYWxWZXJzaW9ucyA9IGZpbmRBbGxWZXJzaW9ucyh0b29sTmFtZSwgYXJjaCk7XG4gICAgICAgIGNvbnN0IG1hdGNoID0gX2V2YWx1YXRlVmVyc2lvbnMobG9jYWxWZXJzaW9ucywgdmVyc2lvblNwZWMpO1xuICAgICAgICB2ZXJzaW9uU3BlYyA9IG1hdGNoO1xuICAgIH1cbiAgICAvLyBjaGVjayBmb3IgdGhlIGV4cGxpY2l0IHZlcnNpb24gaW4gdGhlIGNhY2hlXG4gICAgbGV0IHRvb2xQYXRoID0gJyc7XG4gICAgaWYgKHZlcnNpb25TcGVjKSB7XG4gICAgICAgIHZlcnNpb25TcGVjID0gc2VtdmVyLmNsZWFuKHZlcnNpb25TcGVjKSB8fCAnJztcbiAgICAgICAgY29uc3QgY2FjaGVQYXRoID0gcGF0aC5qb2luKGNhY2hlUm9vdCwgdG9vbE5hbWUsIHZlcnNpb25TcGVjLCBhcmNoKTtcbiAgICAgICAgY29yZS5kZWJ1ZyhgY2hlY2tpbmcgY2FjaGU6ICR7Y2FjaGVQYXRofWApO1xuICAgICAgICBpZiAoZnMuZXhpc3RzU3luYyhjYWNoZVBhdGgpICYmIGZzLmV4aXN0c1N5bmMoYCR7Y2FjaGVQYXRofS5jb21wbGV0ZWApKSB7XG4gICAgICAgICAgICBjb3JlLmRlYnVnKGBGb3VuZCB0b29sIGluIGNhY2hlICR7dG9vbE5hbWV9ICR7dmVyc2lvblNwZWN9ICR7YXJjaH1gKTtcbiAgICAgICAgICAgIHRvb2xQYXRoID0gY2FjaGVQYXRoO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29yZS5kZWJ1Zygnbm90IGZvdW5kJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRvb2xQYXRoO1xufVxuZXhwb3J0cy5maW5kID0gZmluZDtcbi8qKlxuICogRmluZHMgdGhlIHBhdGhzIHRvIGFsbCB2ZXJzaW9ucyBvZiBhIHRvb2wgdGhhdCBhcmUgaW5zdGFsbGVkIGluIHRoZSBsb2NhbCB0b29sIGNhY2hlXG4gKlxuICogQHBhcmFtIHRvb2xOYW1lICBuYW1lIG9mIHRoZSB0b29sXG4gKiBAcGFyYW0gYXJjaCAgICAgIG9wdGlvbmFsIGFyY2guICBkZWZhdWx0cyB0byBhcmNoIG9mIGNvbXB1dGVyXG4gKi9cbmZ1bmN0aW9uIGZpbmRBbGxWZXJzaW9ucyh0b29sTmFtZSwgYXJjaCkge1xuICAgIGNvbnN0IHZlcnNpb25zID0gW107XG4gICAgYXJjaCA9IGFyY2ggfHwgb3MuYXJjaCgpO1xuICAgIGNvbnN0IHRvb2xQYXRoID0gcGF0aC5qb2luKGNhY2hlUm9vdCwgdG9vbE5hbWUpO1xuICAgIGlmIChmcy5leGlzdHNTeW5jKHRvb2xQYXRoKSkge1xuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IGZzLnJlYWRkaXJTeW5jKHRvb2xQYXRoKTtcbiAgICAgICAgZm9yIChjb25zdCBjaGlsZCBvZiBjaGlsZHJlbikge1xuICAgICAgICAgICAgaWYgKF9pc0V4cGxpY2l0VmVyc2lvbihjaGlsZCkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmdWxsUGF0aCA9IHBhdGguam9pbih0b29sUGF0aCwgY2hpbGQsIGFyY2ggfHwgJycpO1xuICAgICAgICAgICAgICAgIGlmIChmcy5leGlzdHNTeW5jKGZ1bGxQYXRoKSAmJiBmcy5leGlzdHNTeW5jKGAke2Z1bGxQYXRofS5jb21wbGV0ZWApKSB7XG4gICAgICAgICAgICAgICAgICAgIHZlcnNpb25zLnB1c2goY2hpbGQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdmVyc2lvbnM7XG59XG5leHBvcnRzLmZpbmRBbGxWZXJzaW9ucyA9IGZpbmRBbGxWZXJzaW9ucztcbmZ1bmN0aW9uIF9jcmVhdGVFeHRyYWN0Rm9sZGVyKGRlc3QpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBpZiAoIWRlc3QpIHtcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBhIHRlbXAgZGlyXG4gICAgICAgICAgICBkZXN0ID0gcGF0aC5qb2luKHRlbXBEaXJlY3RvcnksIHV1aWRWNCgpKTtcbiAgICAgICAgfVxuICAgICAgICB5aWVsZCBpby5ta2RpclAoZGVzdCk7XG4gICAgICAgIHJldHVybiBkZXN0O1xuICAgIH0pO1xufVxuZnVuY3Rpb24gX2NyZWF0ZVRvb2xQYXRoKHRvb2wsIHZlcnNpb24sIGFyY2gpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zdCBmb2xkZXJQYXRoID0gcGF0aC5qb2luKGNhY2hlUm9vdCwgdG9vbCwgc2VtdmVyLmNsZWFuKHZlcnNpb24pIHx8IHZlcnNpb24sIGFyY2ggfHwgJycpO1xuICAgICAgICBjb3JlLmRlYnVnKGBkZXN0aW5hdGlvbiAke2ZvbGRlclBhdGh9YCk7XG4gICAgICAgIGNvbnN0IG1hcmtlclBhdGggPSBgJHtmb2xkZXJQYXRofS5jb21wbGV0ZWA7XG4gICAgICAgIHlpZWxkIGlvLnJtUkYoZm9sZGVyUGF0aCk7XG4gICAgICAgIHlpZWxkIGlvLnJtUkYobWFya2VyUGF0aCk7XG4gICAgICAgIHlpZWxkIGlvLm1rZGlyUChmb2xkZXJQYXRoKTtcbiAgICAgICAgcmV0dXJuIGZvbGRlclBhdGg7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBfY29tcGxldGVUb29sUGF0aCh0b29sLCB2ZXJzaW9uLCBhcmNoKSB7XG4gICAgY29uc3QgZm9sZGVyUGF0aCA9IHBhdGguam9pbihjYWNoZVJvb3QsIHRvb2wsIHNlbXZlci5jbGVhbih2ZXJzaW9uKSB8fCB2ZXJzaW9uLCBhcmNoIHx8ICcnKTtcbiAgICBjb25zdCBtYXJrZXJQYXRoID0gYCR7Zm9sZGVyUGF0aH0uY29tcGxldGVgO1xuICAgIGZzLndyaXRlRmlsZVN5bmMobWFya2VyUGF0aCwgJycpO1xuICAgIGNvcmUuZGVidWcoJ2ZpbmlzaGVkIGNhY2hpbmcgdG9vbCcpO1xufVxuZnVuY3Rpb24gX2lzRXhwbGljaXRWZXJzaW9uKHZlcnNpb25TcGVjKSB7XG4gICAgY29uc3QgYyA9IHNlbXZlci5jbGVhbih2ZXJzaW9uU3BlYykgfHwgJyc7XG4gICAgY29yZS5kZWJ1ZyhgaXNFeHBsaWNpdDogJHtjfWApO1xuICAgIGNvbnN0IHZhbGlkID0gc2VtdmVyLnZhbGlkKGMpICE9IG51bGw7XG4gICAgY29yZS5kZWJ1ZyhgZXhwbGljaXQ/ICR7dmFsaWR9YCk7XG4gICAgcmV0dXJuIHZhbGlkO1xufVxuZnVuY3Rpb24gX2V2YWx1YXRlVmVyc2lvbnModmVyc2lvbnMsIHZlcnNpb25TcGVjKSB7XG4gICAgbGV0IHZlcnNpb24gPSAnJztcbiAgICBjb3JlLmRlYnVnKGBldmFsdWF0aW5nICR7dmVyc2lvbnMubGVuZ3RofSB2ZXJzaW9uc2ApO1xuICAgIHZlcnNpb25zID0gdmVyc2lvbnMuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICBpZiAoc2VtdmVyLmd0KGEsIGIpKSB7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfSk7XG4gICAgZm9yIChsZXQgaSA9IHZlcnNpb25zLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGNvbnN0IHBvdGVudGlhbCA9IHZlcnNpb25zW2ldO1xuICAgICAgICBjb25zdCBzYXRpc2ZpZWQgPSBzZW12ZXIuc2F0aXNmaWVzKHBvdGVudGlhbCwgdmVyc2lvblNwZWMpO1xuICAgICAgICBpZiAoc2F0aXNmaWVkKSB7XG4gICAgICAgICAgICB2ZXJzaW9uID0gcG90ZW50aWFsO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHZlcnNpb24pIHtcbiAgICAgICAgY29yZS5kZWJ1ZyhgbWF0Y2hlZDogJHt2ZXJzaW9ufWApO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29yZS5kZWJ1ZygnbWF0Y2ggbm90IGZvdW5kJyk7XG4gICAgfVxuICAgIHJldHVybiB2ZXJzaW9uO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dG9vbC1jYWNoZS5qcy5tYXAiLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBTZW1WZXJcblxudmFyIGRlYnVnXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuaWYgKHR5cGVvZiBwcm9jZXNzID09PSAnb2JqZWN0JyAmJlxuICAgIHByb2Nlc3MuZW52ICYmXG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9ERUJVRyAmJlxuICAgIC9cXGJzZW12ZXJcXGIvaS50ZXN0KHByb2Nlc3MuZW52Lk5PREVfREVCVUcpKSB7XG4gIGRlYnVnID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKVxuICAgIGFyZ3MudW5zaGlmdCgnU0VNVkVSJylcbiAgICBjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBhcmdzKVxuICB9XG59IGVsc2Uge1xuICBkZWJ1ZyA9IGZ1bmN0aW9uICgpIHt9XG59XG5cbi8vIE5vdGU6IHRoaXMgaXMgdGhlIHNlbXZlci5vcmcgdmVyc2lvbiBvZiB0aGUgc3BlYyB0aGF0IGl0IGltcGxlbWVudHNcbi8vIE5vdCBuZWNlc3NhcmlseSB0aGUgcGFja2FnZSB2ZXJzaW9uIG9mIHRoaXMgY29kZS5cbmV4cG9ydHMuU0VNVkVSX1NQRUNfVkVSU0lPTiA9ICcyLjAuMCdcblxudmFyIE1BWF9MRU5HVEggPSAyNTZcbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIgfHxcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi8gOTAwNzE5OTI1NDc0MDk5MVxuXG4vLyBNYXggc2FmZSBzZWdtZW50IGxlbmd0aCBmb3IgY29lcmNpb24uXG52YXIgTUFYX1NBRkVfQ09NUE9ORU5UX0xFTkdUSCA9IDE2XG5cbi8vIFRoZSBhY3R1YWwgcmVnZXhwcyBnbyBvbiBleHBvcnRzLnJlXG52YXIgcmUgPSBleHBvcnRzLnJlID0gW11cbnZhciBzcmMgPSBleHBvcnRzLnNyYyA9IFtdXG52YXIgdCA9IGV4cG9ydHMudG9rZW5zID0ge31cbnZhciBSID0gMFxuXG5mdW5jdGlvbiB0b2sgKG4pIHtcbiAgdFtuXSA9IFIrK1xufVxuXG4vLyBUaGUgZm9sbG93aW5nIFJlZ3VsYXIgRXhwcmVzc2lvbnMgY2FuIGJlIHVzZWQgZm9yIHRva2VuaXppbmcsXG4vLyB2YWxpZGF0aW5nLCBhbmQgcGFyc2luZyBTZW1WZXIgdmVyc2lvbiBzdHJpbmdzLlxuXG4vLyAjIyBOdW1lcmljIElkZW50aWZpZXJcbi8vIEEgc2luZ2xlIGAwYCwgb3IgYSBub24temVybyBkaWdpdCBmb2xsb3dlZCBieSB6ZXJvIG9yIG1vcmUgZGlnaXRzLlxuXG50b2soJ05VTUVSSUNJREVOVElGSUVSJylcbnNyY1t0Lk5VTUVSSUNJREVOVElGSUVSXSA9ICcwfFsxLTldXFxcXGQqJ1xudG9rKCdOVU1FUklDSURFTlRJRklFUkxPT1NFJylcbnNyY1t0Lk5VTUVSSUNJREVOVElGSUVSTE9PU0VdID0gJ1swLTldKydcblxuLy8gIyMgTm9uLW51bWVyaWMgSWRlbnRpZmllclxuLy8gWmVybyBvciBtb3JlIGRpZ2l0cywgZm9sbG93ZWQgYnkgYSBsZXR0ZXIgb3IgaHlwaGVuLCBhbmQgdGhlbiB6ZXJvIG9yXG4vLyBtb3JlIGxldHRlcnMsIGRpZ2l0cywgb3IgaHlwaGVucy5cblxudG9rKCdOT05OVU1FUklDSURFTlRJRklFUicpXG5zcmNbdC5OT05OVU1FUklDSURFTlRJRklFUl0gPSAnXFxcXGQqW2EtekEtWi1dW2EtekEtWjAtOS1dKidcblxuLy8gIyMgTWFpbiBWZXJzaW9uXG4vLyBUaHJlZSBkb3Qtc2VwYXJhdGVkIG51bWVyaWMgaWRlbnRpZmllcnMuXG5cbnRvaygnTUFJTlZFUlNJT04nKVxuc3JjW3QuTUFJTlZFUlNJT05dID0gJygnICsgc3JjW3QuTlVNRVJJQ0lERU5USUZJRVJdICsgJylcXFxcLicgK1xuICAgICAgICAgICAgICAgICAgICcoJyArIHNyY1t0Lk5VTUVSSUNJREVOVElGSUVSXSArICcpXFxcXC4nICtcbiAgICAgICAgICAgICAgICAgICAnKCcgKyBzcmNbdC5OVU1FUklDSURFTlRJRklFUl0gKyAnKSdcblxudG9rKCdNQUlOVkVSU0lPTkxPT1NFJylcbnNyY1t0Lk1BSU5WRVJTSU9OTE9PU0VdID0gJygnICsgc3JjW3QuTlVNRVJJQ0lERU5USUZJRVJMT09TRV0gKyAnKVxcXFwuJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnKCcgKyBzcmNbdC5OVU1FUklDSURFTlRJRklFUkxPT1NFXSArICcpXFxcXC4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICcoJyArIHNyY1t0Lk5VTUVSSUNJREVOVElGSUVSTE9PU0VdICsgJyknXG5cbi8vICMjIFByZS1yZWxlYXNlIFZlcnNpb24gSWRlbnRpZmllclxuLy8gQSBudW1lcmljIGlkZW50aWZpZXIsIG9yIGEgbm9uLW51bWVyaWMgaWRlbnRpZmllci5cblxudG9rKCdQUkVSRUxFQVNFSURFTlRJRklFUicpXG5zcmNbdC5QUkVSRUxFQVNFSURFTlRJRklFUl0gPSAnKD86JyArIHNyY1t0Lk5VTUVSSUNJREVOVElGSUVSXSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3wnICsgc3JjW3QuTk9OTlVNRVJJQ0lERU5USUZJRVJdICsgJyknXG5cbnRvaygnUFJFUkVMRUFTRUlERU5USUZJRVJMT09TRScpXG5zcmNbdC5QUkVSRUxFQVNFSURFTlRJRklFUkxPT1NFXSA9ICcoPzonICsgc3JjW3QuTlVNRVJJQ0lERU5USUZJRVJMT09TRV0gK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3wnICsgc3JjW3QuTk9OTlVNRVJJQ0lERU5USUZJRVJdICsgJyknXG5cbi8vICMjIFByZS1yZWxlYXNlIFZlcnNpb25cbi8vIEh5cGhlbiwgZm9sbG93ZWQgYnkgb25lIG9yIG1vcmUgZG90LXNlcGFyYXRlZCBwcmUtcmVsZWFzZSB2ZXJzaW9uXG4vLyBpZGVudGlmaWVycy5cblxudG9rKCdQUkVSRUxFQVNFJylcbnNyY1t0LlBSRVJFTEVBU0VdID0gJyg/Oi0oJyArIHNyY1t0LlBSRVJFTEVBU0VJREVOVElGSUVSXSArXG4gICAgICAgICAgICAgICAgICAnKD86XFxcXC4nICsgc3JjW3QuUFJFUkVMRUFTRUlERU5USUZJRVJdICsgJykqKSknXG5cbnRvaygnUFJFUkVMRUFTRUxPT1NFJylcbnNyY1t0LlBSRVJFTEVBU0VMT09TRV0gPSAnKD86LT8oJyArIHNyY1t0LlBSRVJFTEVBU0VJREVOVElGSUVSTE9PU0VdICtcbiAgICAgICAgICAgICAgICAgICAgICAgJyg/OlxcXFwuJyArIHNyY1t0LlBSRVJFTEVBU0VJREVOVElGSUVSTE9PU0VdICsgJykqKSknXG5cbi8vICMjIEJ1aWxkIE1ldGFkYXRhIElkZW50aWZpZXJcbi8vIEFueSBjb21iaW5hdGlvbiBvZiBkaWdpdHMsIGxldHRlcnMsIG9yIGh5cGhlbnMuXG5cbnRvaygnQlVJTERJREVOVElGSUVSJylcbnNyY1t0LkJVSUxESURFTlRJRklFUl0gPSAnWzAtOUEtWmEtei1dKydcblxuLy8gIyMgQnVpbGQgTWV0YWRhdGFcbi8vIFBsdXMgc2lnbiwgZm9sbG93ZWQgYnkgb25lIG9yIG1vcmUgcGVyaW9kLXNlcGFyYXRlZCBidWlsZCBtZXRhZGF0YVxuLy8gaWRlbnRpZmllcnMuXG5cbnRvaygnQlVJTEQnKVxuc3JjW3QuQlVJTERdID0gJyg/OlxcXFwrKCcgKyBzcmNbdC5CVUlMRElERU5USUZJRVJdICtcbiAgICAgICAgICAgICAnKD86XFxcXC4nICsgc3JjW3QuQlVJTERJREVOVElGSUVSXSArICcpKikpJ1xuXG4vLyAjIyBGdWxsIFZlcnNpb24gU3RyaW5nXG4vLyBBIG1haW4gdmVyc2lvbiwgZm9sbG93ZWQgb3B0aW9uYWxseSBieSBhIHByZS1yZWxlYXNlIHZlcnNpb24gYW5kXG4vLyBidWlsZCBtZXRhZGF0YS5cblxuLy8gTm90ZSB0aGF0IHRoZSBvbmx5IG1ham9yLCBtaW5vciwgcGF0Y2gsIGFuZCBwcmUtcmVsZWFzZSBzZWN0aW9ucyBvZlxuLy8gdGhlIHZlcnNpb24gc3RyaW5nIGFyZSBjYXB0dXJpbmcgZ3JvdXBzLiAgVGhlIGJ1aWxkIG1ldGFkYXRhIGlzIG5vdCBhXG4vLyBjYXB0dXJpbmcgZ3JvdXAsIGJlY2F1c2UgaXQgc2hvdWxkIG5vdCBldmVyIGJlIHVzZWQgaW4gdmVyc2lvblxuLy8gY29tcGFyaXNvbi5cblxudG9rKCdGVUxMJylcbnRvaygnRlVMTFBMQUlOJylcbnNyY1t0LkZVTExQTEFJTl0gPSAndj8nICsgc3JjW3QuTUFJTlZFUlNJT05dICtcbiAgICAgICAgICAgICAgICAgIHNyY1t0LlBSRVJFTEVBU0VdICsgJz8nICtcbiAgICAgICAgICAgICAgICAgIHNyY1t0LkJVSUxEXSArICc/J1xuXG5zcmNbdC5GVUxMXSA9ICdeJyArIHNyY1t0LkZVTExQTEFJTl0gKyAnJCdcblxuLy8gbGlrZSBmdWxsLCBidXQgYWxsb3dzIHYxLjIuMyBhbmQgPTEuMi4zLCB3aGljaCBwZW9wbGUgZG8gc29tZXRpbWVzLlxuLy8gYWxzbywgMS4wLjBhbHBoYTEgKHByZXJlbGVhc2Ugd2l0aG91dCB0aGUgaHlwaGVuKSB3aGljaCBpcyBwcmV0dHlcbi8vIGNvbW1vbiBpbiB0aGUgbnBtIHJlZ2lzdHJ5LlxudG9rKCdMT09TRVBMQUlOJylcbnNyY1t0LkxPT1NFUExBSU5dID0gJ1t2PVxcXFxzXSonICsgc3JjW3QuTUFJTlZFUlNJT05MT09TRV0gK1xuICAgICAgICAgICAgICAgICAgc3JjW3QuUFJFUkVMRUFTRUxPT1NFXSArICc/JyArXG4gICAgICAgICAgICAgICAgICBzcmNbdC5CVUlMRF0gKyAnPydcblxudG9rKCdMT09TRScpXG5zcmNbdC5MT09TRV0gPSAnXicgKyBzcmNbdC5MT09TRVBMQUlOXSArICckJ1xuXG50b2soJ0dUTFQnKVxuc3JjW3QuR1RMVF0gPSAnKCg/Ojx8Pik/PT8pJ1xuXG4vLyBTb21ldGhpbmcgbGlrZSBcIjIuKlwiIG9yIFwiMS4yLnhcIi5cbi8vIE5vdGUgdGhhdCBcIngueFwiIGlzIGEgdmFsaWQgeFJhbmdlIGlkZW50aWZlciwgbWVhbmluZyBcImFueSB2ZXJzaW9uXCJcbi8vIE9ubHkgdGhlIGZpcnN0IGl0ZW0gaXMgc3RyaWN0bHkgcmVxdWlyZWQuXG50b2soJ1hSQU5HRUlERU5USUZJRVJMT09TRScpXG5zcmNbdC5YUkFOR0VJREVOVElGSUVSTE9PU0VdID0gc3JjW3QuTlVNRVJJQ0lERU5USUZJRVJMT09TRV0gKyAnfHh8WHxcXFxcKidcbnRvaygnWFJBTkdFSURFTlRJRklFUicpXG5zcmNbdC5YUkFOR0VJREVOVElGSUVSXSA9IHNyY1t0Lk5VTUVSSUNJREVOVElGSUVSXSArICd8eHxYfFxcXFwqJ1xuXG50b2soJ1hSQU5HRVBMQUlOJylcbnNyY1t0LlhSQU5HRVBMQUlOXSA9ICdbdj1cXFxcc10qKCcgKyBzcmNbdC5YUkFOR0VJREVOVElGSUVSXSArICcpJyArXG4gICAgICAgICAgICAgICAgICAgJyg/OlxcXFwuKCcgKyBzcmNbdC5YUkFOR0VJREVOVElGSUVSXSArICcpJyArXG4gICAgICAgICAgICAgICAgICAgJyg/OlxcXFwuKCcgKyBzcmNbdC5YUkFOR0VJREVOVElGSUVSXSArICcpJyArXG4gICAgICAgICAgICAgICAgICAgJyg/OicgKyBzcmNbdC5QUkVSRUxFQVNFXSArICcpPycgK1xuICAgICAgICAgICAgICAgICAgIHNyY1t0LkJVSUxEXSArICc/JyArXG4gICAgICAgICAgICAgICAgICAgJyk/KT8nXG5cbnRvaygnWFJBTkdFUExBSU5MT09TRScpXG5zcmNbdC5YUkFOR0VQTEFJTkxPT1NFXSA9ICdbdj1cXFxcc10qKCcgKyBzcmNbdC5YUkFOR0VJREVOVElGSUVSTE9PU0VdICsgJyknICtcbiAgICAgICAgICAgICAgICAgICAgICAgICcoPzpcXFxcLignICsgc3JjW3QuWFJBTkdFSURFTlRJRklFUkxPT1NFXSArICcpJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnKD86XFxcXC4oJyArIHNyY1t0LlhSQU5HRUlERU5USUZJRVJMT09TRV0gKyAnKScgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJyg/OicgKyBzcmNbdC5QUkVSRUxFQVNFTE9PU0VdICsgJyk/JyArXG4gICAgICAgICAgICAgICAgICAgICAgICBzcmNbdC5CVUlMRF0gKyAnPycgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJyk/KT8nXG5cbnRvaygnWFJBTkdFJylcbnNyY1t0LlhSQU5HRV0gPSAnXicgKyBzcmNbdC5HVExUXSArICdcXFxccyonICsgc3JjW3QuWFJBTkdFUExBSU5dICsgJyQnXG50b2soJ1hSQU5HRUxPT1NFJylcbnNyY1t0LlhSQU5HRUxPT1NFXSA9ICdeJyArIHNyY1t0LkdUTFRdICsgJ1xcXFxzKicgKyBzcmNbdC5YUkFOR0VQTEFJTkxPT1NFXSArICckJ1xuXG4vLyBDb2VyY2lvbi5cbi8vIEV4dHJhY3QgYW55dGhpbmcgdGhhdCBjb3VsZCBjb25jZWl2YWJseSBiZSBhIHBhcnQgb2YgYSB2YWxpZCBzZW12ZXJcbnRvaygnQ09FUkNFJylcbnNyY1t0LkNPRVJDRV0gPSAnKF58W15cXFxcZF0pJyArXG4gICAgICAgICAgICAgICcoXFxcXGR7MSwnICsgTUFYX1NBRkVfQ09NUE9ORU5UX0xFTkdUSCArICd9KScgK1xuICAgICAgICAgICAgICAnKD86XFxcXC4oXFxcXGR7MSwnICsgTUFYX1NBRkVfQ09NUE9ORU5UX0xFTkdUSCArICd9KSk/JyArXG4gICAgICAgICAgICAgICcoPzpcXFxcLihcXFxcZHsxLCcgKyBNQVhfU0FGRV9DT01QT05FTlRfTEVOR1RIICsgJ30pKT8nICtcbiAgICAgICAgICAgICAgJyg/OiR8W15cXFxcZF0pJ1xudG9rKCdDT0VSQ0VSVEwnKVxucmVbdC5DT0VSQ0VSVExdID0gbmV3IFJlZ0V4cChzcmNbdC5DT0VSQ0VdLCAnZycpXG5cbi8vIFRpbGRlIHJhbmdlcy5cbi8vIE1lYW5pbmcgaXMgXCJyZWFzb25hYmx5IGF0IG9yIGdyZWF0ZXIgdGhhblwiXG50b2soJ0xPTkVUSUxERScpXG5zcmNbdC5MT05FVElMREVdID0gJyg/On4+PyknXG5cbnRvaygnVElMREVUUklNJylcbnNyY1t0LlRJTERFVFJJTV0gPSAnKFxcXFxzKiknICsgc3JjW3QuTE9ORVRJTERFXSArICdcXFxccysnXG5yZVt0LlRJTERFVFJJTV0gPSBuZXcgUmVnRXhwKHNyY1t0LlRJTERFVFJJTV0sICdnJylcbnZhciB0aWxkZVRyaW1SZXBsYWNlID0gJyQxfidcblxudG9rKCdUSUxERScpXG5zcmNbdC5USUxERV0gPSAnXicgKyBzcmNbdC5MT05FVElMREVdICsgc3JjW3QuWFJBTkdFUExBSU5dICsgJyQnXG50b2soJ1RJTERFTE9PU0UnKVxuc3JjW3QuVElMREVMT09TRV0gPSAnXicgKyBzcmNbdC5MT05FVElMREVdICsgc3JjW3QuWFJBTkdFUExBSU5MT09TRV0gKyAnJCdcblxuLy8gQ2FyZXQgcmFuZ2VzLlxuLy8gTWVhbmluZyBpcyBcImF0IGxlYXN0IGFuZCBiYWNrd2FyZHMgY29tcGF0aWJsZSB3aXRoXCJcbnRvaygnTE9ORUNBUkVUJylcbnNyY1t0LkxPTkVDQVJFVF0gPSAnKD86XFxcXF4pJ1xuXG50b2soJ0NBUkVUVFJJTScpXG5zcmNbdC5DQVJFVFRSSU1dID0gJyhcXFxccyopJyArIHNyY1t0LkxPTkVDQVJFVF0gKyAnXFxcXHMrJ1xucmVbdC5DQVJFVFRSSU1dID0gbmV3IFJlZ0V4cChzcmNbdC5DQVJFVFRSSU1dLCAnZycpXG52YXIgY2FyZXRUcmltUmVwbGFjZSA9ICckMV4nXG5cbnRvaygnQ0FSRVQnKVxuc3JjW3QuQ0FSRVRdID0gJ14nICsgc3JjW3QuTE9ORUNBUkVUXSArIHNyY1t0LlhSQU5HRVBMQUlOXSArICckJ1xudG9rKCdDQVJFVExPT1NFJylcbnNyY1t0LkNBUkVUTE9PU0VdID0gJ14nICsgc3JjW3QuTE9ORUNBUkVUXSArIHNyY1t0LlhSQU5HRVBMQUlOTE9PU0VdICsgJyQnXG5cbi8vIEEgc2ltcGxlIGd0L2x0L2VxIHRoaW5nLCBvciBqdXN0IFwiXCIgdG8gaW5kaWNhdGUgXCJhbnkgdmVyc2lvblwiXG50b2soJ0NPTVBBUkFUT1JMT09TRScpXG5zcmNbdC5DT01QQVJBVE9STE9PU0VdID0gJ14nICsgc3JjW3QuR1RMVF0gKyAnXFxcXHMqKCcgKyBzcmNbdC5MT09TRVBMQUlOXSArICcpJHxeJCdcbnRvaygnQ09NUEFSQVRPUicpXG5zcmNbdC5DT01QQVJBVE9SXSA9ICdeJyArIHNyY1t0LkdUTFRdICsgJ1xcXFxzKignICsgc3JjW3QuRlVMTFBMQUlOXSArICcpJHxeJCdcblxuLy8gQW4gZXhwcmVzc2lvbiB0byBzdHJpcCBhbnkgd2hpdGVzcGFjZSBiZXR3ZWVuIHRoZSBndGx0IGFuZCB0aGUgdGhpbmdcbi8vIGl0IG1vZGlmaWVzLCBzbyB0aGF0IGA+IDEuMi4zYCA9PT4gYD4xLjIuM2BcbnRvaygnQ09NUEFSQVRPUlRSSU0nKVxuc3JjW3QuQ09NUEFSQVRPUlRSSU1dID0gJyhcXFxccyopJyArIHNyY1t0LkdUTFRdICtcbiAgICAgICAgICAgICAgICAgICAgICAnXFxcXHMqKCcgKyBzcmNbdC5MT09TRVBMQUlOXSArICd8JyArIHNyY1t0LlhSQU5HRVBMQUlOXSArICcpJ1xuXG4vLyB0aGlzIG9uZSBoYXMgdG8gdXNlIHRoZSAvZyBmbGFnXG5yZVt0LkNPTVBBUkFUT1JUUklNXSA9IG5ldyBSZWdFeHAoc3JjW3QuQ09NUEFSQVRPUlRSSU1dLCAnZycpXG52YXIgY29tcGFyYXRvclRyaW1SZXBsYWNlID0gJyQxJDIkMydcblxuLy8gU29tZXRoaW5nIGxpa2UgYDEuMi4zIC0gMS4yLjRgXG4vLyBOb3RlIHRoYXQgdGhlc2UgYWxsIHVzZSB0aGUgbG9vc2UgZm9ybSwgYmVjYXVzZSB0aGV5J2xsIGJlXG4vLyBjaGVja2VkIGFnYWluc3QgZWl0aGVyIHRoZSBzdHJpY3Qgb3IgbG9vc2UgY29tcGFyYXRvciBmb3JtXG4vLyBsYXRlci5cbnRvaygnSFlQSEVOUkFOR0UnKVxuc3JjW3QuSFlQSEVOUkFOR0VdID0gJ15cXFxccyooJyArIHNyY1t0LlhSQU5HRVBMQUlOXSArICcpJyArXG4gICAgICAgICAgICAgICAgICAgJ1xcXFxzKy1cXFxccysnICtcbiAgICAgICAgICAgICAgICAgICAnKCcgKyBzcmNbdC5YUkFOR0VQTEFJTl0gKyAnKScgK1xuICAgICAgICAgICAgICAgICAgICdcXFxccyokJ1xuXG50b2soJ0hZUEhFTlJBTkdFTE9PU0UnKVxuc3JjW3QuSFlQSEVOUkFOR0VMT09TRV0gPSAnXlxcXFxzKignICsgc3JjW3QuWFJBTkdFUExBSU5MT09TRV0gKyAnKScgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1xcXFxzKy1cXFxccysnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICcoJyArIHNyY1t0LlhSQU5HRVBMQUlOTE9PU0VdICsgJyknICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdcXFxccyokJ1xuXG4vLyBTdGFyIHJhbmdlcyBiYXNpY2FsbHkganVzdCBhbGxvdyBhbnl0aGluZyBhdCBhbGwuXG50b2soJ1NUQVInKVxuc3JjW3QuU1RBUl0gPSAnKDx8Pik/PT9cXFxccypcXFxcKidcblxuLy8gQ29tcGlsZSB0byBhY3R1YWwgcmVnZXhwIG9iamVjdHMuXG4vLyBBbGwgYXJlIGZsYWctZnJlZSwgdW5sZXNzIHRoZXkgd2VyZSBjcmVhdGVkIGFib3ZlIHdpdGggYSBmbGFnLlxuZm9yICh2YXIgaSA9IDA7IGkgPCBSOyBpKyspIHtcbiAgZGVidWcoaSwgc3JjW2ldKVxuICBpZiAoIXJlW2ldKSB7XG4gICAgcmVbaV0gPSBuZXcgUmVnRXhwKHNyY1tpXSlcbiAgfVxufVxuXG5leHBvcnRzLnBhcnNlID0gcGFyc2VcbmZ1bmN0aW9uIHBhcnNlICh2ZXJzaW9uLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucyB8fCB0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcbiAgICBvcHRpb25zID0ge1xuICAgICAgbG9vc2U6ICEhb3B0aW9ucyxcbiAgICAgIGluY2x1ZGVQcmVyZWxlYXNlOiBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIGlmICh2ZXJzaW9uIGluc3RhbmNlb2YgU2VtVmVyKSB7XG4gICAgcmV0dXJuIHZlcnNpb25cbiAgfVxuXG4gIGlmICh0eXBlb2YgdmVyc2lvbiAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgaWYgKHZlcnNpb24ubGVuZ3RoID4gTUFYX0xFTkdUSCkge1xuICAgIHJldHVybiBudWxsXG4gIH1cblxuICB2YXIgciA9IG9wdGlvbnMubG9vc2UgPyByZVt0LkxPT1NFXSA6IHJlW3QuRlVMTF1cbiAgaWYgKCFyLnRlc3QodmVyc2lvbikpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gbmV3IFNlbVZlcih2ZXJzaW9uLCBvcHRpb25zKVxuICB9IGNhdGNoIChlcikge1xuICAgIHJldHVybiBudWxsXG4gIH1cbn1cblxuZXhwb3J0cy52YWxpZCA9IHZhbGlkXG5mdW5jdGlvbiB2YWxpZCAodmVyc2lvbiwgb3B0aW9ucykge1xuICB2YXIgdiA9IHBhcnNlKHZlcnNpb24sIG9wdGlvbnMpXG4gIHJldHVybiB2ID8gdi52ZXJzaW9uIDogbnVsbFxufVxuXG5leHBvcnRzLmNsZWFuID0gY2xlYW5cbmZ1bmN0aW9uIGNsZWFuICh2ZXJzaW9uLCBvcHRpb25zKSB7XG4gIHZhciBzID0gcGFyc2UodmVyc2lvbi50cmltKCkucmVwbGFjZSgvXls9dl0rLywgJycpLCBvcHRpb25zKVxuICByZXR1cm4gcyA/IHMudmVyc2lvbiA6IG51bGxcbn1cblxuZXhwb3J0cy5TZW1WZXIgPSBTZW1WZXJcblxuZnVuY3Rpb24gU2VtVmVyICh2ZXJzaW9uLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucyB8fCB0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcbiAgICBvcHRpb25zID0ge1xuICAgICAgbG9vc2U6ICEhb3B0aW9ucyxcbiAgICAgIGluY2x1ZGVQcmVyZWxlYXNlOiBmYWxzZVxuICAgIH1cbiAgfVxuICBpZiAodmVyc2lvbiBpbnN0YW5jZW9mIFNlbVZlcikge1xuICAgIGlmICh2ZXJzaW9uLmxvb3NlID09PSBvcHRpb25zLmxvb3NlKSB7XG4gICAgICByZXR1cm4gdmVyc2lvblxuICAgIH0gZWxzZSB7XG4gICAgICB2ZXJzaW9uID0gdmVyc2lvbi52ZXJzaW9uXG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiB2ZXJzaW9uICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgVmVyc2lvbjogJyArIHZlcnNpb24pXG4gIH1cblxuICBpZiAodmVyc2lvbi5sZW5ndGggPiBNQVhfTEVOR1RIKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcigndmVyc2lvbiBpcyBsb25nZXIgdGhhbiAnICsgTUFYX0xFTkdUSCArICcgY2hhcmFjdGVycycpXG4gIH1cblxuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgU2VtVmVyKSkge1xuICAgIHJldHVybiBuZXcgU2VtVmVyKHZlcnNpb24sIG9wdGlvbnMpXG4gIH1cblxuICBkZWJ1ZygnU2VtVmVyJywgdmVyc2lvbiwgb3B0aW9ucylcbiAgdGhpcy5vcHRpb25zID0gb3B0aW9uc1xuICB0aGlzLmxvb3NlID0gISFvcHRpb25zLmxvb3NlXG5cbiAgdmFyIG0gPSB2ZXJzaW9uLnRyaW0oKS5tYXRjaChvcHRpb25zLmxvb3NlID8gcmVbdC5MT09TRV0gOiByZVt0LkZVTExdKVxuXG4gIGlmICghbSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgVmVyc2lvbjogJyArIHZlcnNpb24pXG4gIH1cblxuICB0aGlzLnJhdyA9IHZlcnNpb25cblxuICAvLyB0aGVzZSBhcmUgYWN0dWFsbHkgbnVtYmVyc1xuICB0aGlzLm1ham9yID0gK21bMV1cbiAgdGhpcy5taW5vciA9ICttWzJdXG4gIHRoaXMucGF0Y2ggPSArbVszXVxuXG4gIGlmICh0aGlzLm1ham9yID4gTUFYX1NBRkVfSU5URUdFUiB8fCB0aGlzLm1ham9yIDwgMCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgbWFqb3IgdmVyc2lvbicpXG4gIH1cblxuICBpZiAodGhpcy5taW5vciA+IE1BWF9TQUZFX0lOVEVHRVIgfHwgdGhpcy5taW5vciA8IDApIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIG1pbm9yIHZlcnNpb24nKVxuICB9XG5cbiAgaWYgKHRoaXMucGF0Y2ggPiBNQVhfU0FGRV9JTlRFR0VSIHx8IHRoaXMucGF0Y2ggPCAwKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBwYXRjaCB2ZXJzaW9uJylcbiAgfVxuXG4gIC8vIG51bWJlcmlmeSBhbnkgcHJlcmVsZWFzZSBudW1lcmljIGlkc1xuICBpZiAoIW1bNF0pIHtcbiAgICB0aGlzLnByZXJlbGVhc2UgPSBbXVxuICB9IGVsc2Uge1xuICAgIHRoaXMucHJlcmVsZWFzZSA9IG1bNF0uc3BsaXQoJy4nKS5tYXAoZnVuY3Rpb24gKGlkKSB7XG4gICAgICBpZiAoL15bMC05XSskLy50ZXN0KGlkKSkge1xuICAgICAgICB2YXIgbnVtID0gK2lkXG4gICAgICAgIGlmIChudW0gPj0gMCAmJiBudW0gPCBNQVhfU0FGRV9JTlRFR0VSKSB7XG4gICAgICAgICAgcmV0dXJuIG51bVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gaWRcbiAgICB9KVxuICB9XG5cbiAgdGhpcy5idWlsZCA9IG1bNV0gPyBtWzVdLnNwbGl0KCcuJykgOiBbXVxuICB0aGlzLmZvcm1hdCgpXG59XG5cblNlbVZlci5wcm90b3R5cGUuZm9ybWF0ID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLnZlcnNpb24gPSB0aGlzLm1ham9yICsgJy4nICsgdGhpcy5taW5vciArICcuJyArIHRoaXMucGF0Y2hcbiAgaWYgKHRoaXMucHJlcmVsZWFzZS5sZW5ndGgpIHtcbiAgICB0aGlzLnZlcnNpb24gKz0gJy0nICsgdGhpcy5wcmVyZWxlYXNlLmpvaW4oJy4nKVxuICB9XG4gIHJldHVybiB0aGlzLnZlcnNpb25cbn1cblxuU2VtVmVyLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMudmVyc2lvblxufVxuXG5TZW1WZXIucHJvdG90eXBlLmNvbXBhcmUgPSBmdW5jdGlvbiAob3RoZXIpIHtcbiAgZGVidWcoJ1NlbVZlci5jb21wYXJlJywgdGhpcy52ZXJzaW9uLCB0aGlzLm9wdGlvbnMsIG90aGVyKVxuICBpZiAoIShvdGhlciBpbnN0YW5jZW9mIFNlbVZlcikpIHtcbiAgICBvdGhlciA9IG5ldyBTZW1WZXIob3RoZXIsIHRoaXMub3B0aW9ucylcbiAgfVxuXG4gIHJldHVybiB0aGlzLmNvbXBhcmVNYWluKG90aGVyKSB8fCB0aGlzLmNvbXBhcmVQcmUob3RoZXIpXG59XG5cblNlbVZlci5wcm90b3R5cGUuY29tcGFyZU1haW4gPSBmdW5jdGlvbiAob3RoZXIpIHtcbiAgaWYgKCEob3RoZXIgaW5zdGFuY2VvZiBTZW1WZXIpKSB7XG4gICAgb3RoZXIgPSBuZXcgU2VtVmVyKG90aGVyLCB0aGlzLm9wdGlvbnMpXG4gIH1cblxuICByZXR1cm4gY29tcGFyZUlkZW50aWZpZXJzKHRoaXMubWFqb3IsIG90aGVyLm1ham9yKSB8fFxuICAgICAgICAgY29tcGFyZUlkZW50aWZpZXJzKHRoaXMubWlub3IsIG90aGVyLm1pbm9yKSB8fFxuICAgICAgICAgY29tcGFyZUlkZW50aWZpZXJzKHRoaXMucGF0Y2gsIG90aGVyLnBhdGNoKVxufVxuXG5TZW1WZXIucHJvdG90eXBlLmNvbXBhcmVQcmUgPSBmdW5jdGlvbiAob3RoZXIpIHtcbiAgaWYgKCEob3RoZXIgaW5zdGFuY2VvZiBTZW1WZXIpKSB7XG4gICAgb3RoZXIgPSBuZXcgU2VtVmVyKG90aGVyLCB0aGlzLm9wdGlvbnMpXG4gIH1cblxuICAvLyBOT1QgaGF2aW5nIGEgcHJlcmVsZWFzZSBpcyA+IGhhdmluZyBvbmVcbiAgaWYgKHRoaXMucHJlcmVsZWFzZS5sZW5ndGggJiYgIW90aGVyLnByZXJlbGVhc2UubGVuZ3RoKSB7XG4gICAgcmV0dXJuIC0xXG4gIH0gZWxzZSBpZiAoIXRoaXMucHJlcmVsZWFzZS5sZW5ndGggJiYgb3RoZXIucHJlcmVsZWFzZS5sZW5ndGgpIHtcbiAgICByZXR1cm4gMVxuICB9IGVsc2UgaWYgKCF0aGlzLnByZXJlbGVhc2UubGVuZ3RoICYmICFvdGhlci5wcmVyZWxlYXNlLmxlbmd0aCkge1xuICAgIHJldHVybiAwXG4gIH1cblxuICB2YXIgaSA9IDBcbiAgZG8ge1xuICAgIHZhciBhID0gdGhpcy5wcmVyZWxlYXNlW2ldXG4gICAgdmFyIGIgPSBvdGhlci5wcmVyZWxlYXNlW2ldXG4gICAgZGVidWcoJ3ByZXJlbGVhc2UgY29tcGFyZScsIGksIGEsIGIpXG4gICAgaWYgKGEgPT09IHVuZGVmaW5lZCAmJiBiID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiAwXG4gICAgfSBlbHNlIGlmIChiID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiAxXG4gICAgfSBlbHNlIGlmIChhID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiAtMVxuICAgIH0gZWxzZSBpZiAoYSA9PT0gYikge1xuICAgICAgY29udGludWVcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGNvbXBhcmVJZGVudGlmaWVycyhhLCBiKVxuICAgIH1cbiAgfSB3aGlsZSAoKytpKVxufVxuXG5TZW1WZXIucHJvdG90eXBlLmNvbXBhcmVCdWlsZCA9IGZ1bmN0aW9uIChvdGhlcikge1xuICBpZiAoIShvdGhlciBpbnN0YW5jZW9mIFNlbVZlcikpIHtcbiAgICBvdGhlciA9IG5ldyBTZW1WZXIob3RoZXIsIHRoaXMub3B0aW9ucylcbiAgfVxuXG4gIHZhciBpID0gMFxuICBkbyB7XG4gICAgdmFyIGEgPSB0aGlzLmJ1aWxkW2ldXG4gICAgdmFyIGIgPSBvdGhlci5idWlsZFtpXVxuICAgIGRlYnVnKCdwcmVyZWxlYXNlIGNvbXBhcmUnLCBpLCBhLCBiKVxuICAgIGlmIChhID09PSB1bmRlZmluZWQgJiYgYiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gMFxuICAgIH0gZWxzZSBpZiAoYiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gMVxuICAgIH0gZWxzZSBpZiAoYSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gLTFcbiAgICB9IGVsc2UgaWYgKGEgPT09IGIpIHtcbiAgICAgIGNvbnRpbnVlXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjb21wYXJlSWRlbnRpZmllcnMoYSwgYilcbiAgICB9XG4gIH0gd2hpbGUgKCsraSlcbn1cblxuLy8gcHJlbWlub3Igd2lsbCBidW1wIHRoZSB2ZXJzaW9uIHVwIHRvIHRoZSBuZXh0IG1pbm9yIHJlbGVhc2UsIGFuZCBpbW1lZGlhdGVseVxuLy8gZG93biB0byBwcmUtcmVsZWFzZS4gcHJlbWFqb3IgYW5kIHByZXBhdGNoIHdvcmsgdGhlIHNhbWUgd2F5LlxuU2VtVmVyLnByb3RvdHlwZS5pbmMgPSBmdW5jdGlvbiAocmVsZWFzZSwgaWRlbnRpZmllcikge1xuICBzd2l0Y2ggKHJlbGVhc2UpIHtcbiAgICBjYXNlICdwcmVtYWpvcic6XG4gICAgICB0aGlzLnByZXJlbGVhc2UubGVuZ3RoID0gMFxuICAgICAgdGhpcy5wYXRjaCA9IDBcbiAgICAgIHRoaXMubWlub3IgPSAwXG4gICAgICB0aGlzLm1ham9yKytcbiAgICAgIHRoaXMuaW5jKCdwcmUnLCBpZGVudGlmaWVyKVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdwcmVtaW5vcic6XG4gICAgICB0aGlzLnByZXJlbGVhc2UubGVuZ3RoID0gMFxuICAgICAgdGhpcy5wYXRjaCA9IDBcbiAgICAgIHRoaXMubWlub3IrK1xuICAgICAgdGhpcy5pbmMoJ3ByZScsIGlkZW50aWZpZXIpXG4gICAgICBicmVha1xuICAgIGNhc2UgJ3ByZXBhdGNoJzpcbiAgICAgIC8vIElmIHRoaXMgaXMgYWxyZWFkeSBhIHByZXJlbGVhc2UsIGl0IHdpbGwgYnVtcCB0byB0aGUgbmV4dCB2ZXJzaW9uXG4gICAgICAvLyBkcm9wIGFueSBwcmVyZWxlYXNlcyB0aGF0IG1pZ2h0IGFscmVhZHkgZXhpc3QsIHNpbmNlIHRoZXkgYXJlIG5vdFxuICAgICAgLy8gcmVsZXZhbnQgYXQgdGhpcyBwb2ludC5cbiAgICAgIHRoaXMucHJlcmVsZWFzZS5sZW5ndGggPSAwXG4gICAgICB0aGlzLmluYygncGF0Y2gnLCBpZGVudGlmaWVyKVxuICAgICAgdGhpcy5pbmMoJ3ByZScsIGlkZW50aWZpZXIpXG4gICAgICBicmVha1xuICAgIC8vIElmIHRoZSBpbnB1dCBpcyBhIG5vbi1wcmVyZWxlYXNlIHZlcnNpb24sIHRoaXMgYWN0cyB0aGUgc2FtZSBhc1xuICAgIC8vIHByZXBhdGNoLlxuICAgIGNhc2UgJ3ByZXJlbGVhc2UnOlxuICAgICAgaWYgKHRoaXMucHJlcmVsZWFzZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhpcy5pbmMoJ3BhdGNoJywgaWRlbnRpZmllcilcbiAgICAgIH1cbiAgICAgIHRoaXMuaW5jKCdwcmUnLCBpZGVudGlmaWVyKVxuICAgICAgYnJlYWtcblxuICAgIGNhc2UgJ21ham9yJzpcbiAgICAgIC8vIElmIHRoaXMgaXMgYSBwcmUtbWFqb3IgdmVyc2lvbiwgYnVtcCB1cCB0byB0aGUgc2FtZSBtYWpvciB2ZXJzaW9uLlxuICAgICAgLy8gT3RoZXJ3aXNlIGluY3JlbWVudCBtYWpvci5cbiAgICAgIC8vIDEuMC4wLTUgYnVtcHMgdG8gMS4wLjBcbiAgICAgIC8vIDEuMS4wIGJ1bXBzIHRvIDIuMC4wXG4gICAgICBpZiAodGhpcy5taW5vciAhPT0gMCB8fFxuICAgICAgICAgIHRoaXMucGF0Y2ggIT09IDAgfHxcbiAgICAgICAgICB0aGlzLnByZXJlbGVhc2UubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRoaXMubWFqb3IrK1xuICAgICAgfVxuICAgICAgdGhpcy5taW5vciA9IDBcbiAgICAgIHRoaXMucGF0Y2ggPSAwXG4gICAgICB0aGlzLnByZXJlbGVhc2UgPSBbXVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdtaW5vcic6XG4gICAgICAvLyBJZiB0aGlzIGlzIGEgcHJlLW1pbm9yIHZlcnNpb24sIGJ1bXAgdXAgdG8gdGhlIHNhbWUgbWlub3IgdmVyc2lvbi5cbiAgICAgIC8vIE90aGVyd2lzZSBpbmNyZW1lbnQgbWlub3IuXG4gICAgICAvLyAxLjIuMC01IGJ1bXBzIHRvIDEuMi4wXG4gICAgICAvLyAxLjIuMSBidW1wcyB0byAxLjMuMFxuICAgICAgaWYgKHRoaXMucGF0Y2ggIT09IDAgfHwgdGhpcy5wcmVyZWxlYXNlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aGlzLm1pbm9yKytcbiAgICAgIH1cbiAgICAgIHRoaXMucGF0Y2ggPSAwXG4gICAgICB0aGlzLnByZXJlbGVhc2UgPSBbXVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdwYXRjaCc6XG4gICAgICAvLyBJZiB0aGlzIGlzIG5vdCBhIHByZS1yZWxlYXNlIHZlcnNpb24sIGl0IHdpbGwgaW5jcmVtZW50IHRoZSBwYXRjaC5cbiAgICAgIC8vIElmIGl0IGlzIGEgcHJlLXJlbGVhc2UgaXQgd2lsbCBidW1wIHVwIHRvIHRoZSBzYW1lIHBhdGNoIHZlcnNpb24uXG4gICAgICAvLyAxLjIuMC01IHBhdGNoZXMgdG8gMS4yLjBcbiAgICAgIC8vIDEuMi4wIHBhdGNoZXMgdG8gMS4yLjFcbiAgICAgIGlmICh0aGlzLnByZXJlbGVhc2UubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRoaXMucGF0Y2grK1xuICAgICAgfVxuICAgICAgdGhpcy5wcmVyZWxlYXNlID0gW11cbiAgICAgIGJyZWFrXG4gICAgLy8gVGhpcyBwcm9iYWJseSBzaG91bGRuJ3QgYmUgdXNlZCBwdWJsaWNseS5cbiAgICAvLyAxLjAuMCBcInByZVwiIHdvdWxkIGJlY29tZSAxLjAuMC0wIHdoaWNoIGlzIHRoZSB3cm9uZyBkaXJlY3Rpb24uXG4gICAgY2FzZSAncHJlJzpcbiAgICAgIGlmICh0aGlzLnByZXJlbGVhc2UubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRoaXMucHJlcmVsZWFzZSA9IFswXVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGkgPSB0aGlzLnByZXJlbGVhc2UubGVuZ3RoXG4gICAgICAgIHdoaWxlICgtLWkgPj0gMCkge1xuICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcmVyZWxlYXNlW2ldID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgdGhpcy5wcmVyZWxlYXNlW2ldKytcbiAgICAgICAgICAgIGkgPSAtMlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaSA9PT0gLTEpIHtcbiAgICAgICAgICAvLyBkaWRuJ3QgaW5jcmVtZW50IGFueXRoaW5nXG4gICAgICAgICAgdGhpcy5wcmVyZWxlYXNlLnB1c2goMClcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGlkZW50aWZpZXIpIHtcbiAgICAgICAgLy8gMS4yLjAtYmV0YS4xIGJ1bXBzIHRvIDEuMi4wLWJldGEuMixcbiAgICAgICAgLy8gMS4yLjAtYmV0YS5mb29ibHogb3IgMS4yLjAtYmV0YSBidW1wcyB0byAxLjIuMC1iZXRhLjBcbiAgICAgICAgaWYgKHRoaXMucHJlcmVsZWFzZVswXSA9PT0gaWRlbnRpZmllcikge1xuICAgICAgICAgIGlmIChpc05hTih0aGlzLnByZXJlbGVhc2VbMV0pKSB7XG4gICAgICAgICAgICB0aGlzLnByZXJlbGVhc2UgPSBbaWRlbnRpZmllciwgMF1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5wcmVyZWxlYXNlID0gW2lkZW50aWZpZXIsIDBdXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGJyZWFrXG5cbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGluY3JlbWVudCBhcmd1bWVudDogJyArIHJlbGVhc2UpXG4gIH1cbiAgdGhpcy5mb3JtYXQoKVxuICB0aGlzLnJhdyA9IHRoaXMudmVyc2lvblxuICByZXR1cm4gdGhpc1xufVxuXG5leHBvcnRzLmluYyA9IGluY1xuZnVuY3Rpb24gaW5jICh2ZXJzaW9uLCByZWxlYXNlLCBsb29zZSwgaWRlbnRpZmllcikge1xuICBpZiAodHlwZW9mIChsb29zZSkgPT09ICdzdHJpbmcnKSB7XG4gICAgaWRlbnRpZmllciA9IGxvb3NlXG4gICAgbG9vc2UgPSB1bmRlZmluZWRcbiAgfVxuXG4gIHRyeSB7XG4gICAgcmV0dXJuIG5ldyBTZW1WZXIodmVyc2lvbiwgbG9vc2UpLmluYyhyZWxlYXNlLCBpZGVudGlmaWVyKS52ZXJzaW9uXG4gIH0gY2F0Y2ggKGVyKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxufVxuXG5leHBvcnRzLmRpZmYgPSBkaWZmXG5mdW5jdGlvbiBkaWZmICh2ZXJzaW9uMSwgdmVyc2lvbjIpIHtcbiAgaWYgKGVxKHZlcnNpb24xLCB2ZXJzaW9uMikpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9IGVsc2Uge1xuICAgIHZhciB2MSA9IHBhcnNlKHZlcnNpb24xKVxuICAgIHZhciB2MiA9IHBhcnNlKHZlcnNpb24yKVxuICAgIHZhciBwcmVmaXggPSAnJ1xuICAgIGlmICh2MS5wcmVyZWxlYXNlLmxlbmd0aCB8fCB2Mi5wcmVyZWxlYXNlLmxlbmd0aCkge1xuICAgICAgcHJlZml4ID0gJ3ByZSdcbiAgICAgIHZhciBkZWZhdWx0UmVzdWx0ID0gJ3ByZXJlbGVhc2UnXG4gICAgfVxuICAgIGZvciAodmFyIGtleSBpbiB2MSkge1xuICAgICAgaWYgKGtleSA9PT0gJ21ham9yJyB8fCBrZXkgPT09ICdtaW5vcicgfHwga2V5ID09PSAncGF0Y2gnKSB7XG4gICAgICAgIGlmICh2MVtrZXldICE9PSB2MltrZXldKSB7XG4gICAgICAgICAgcmV0dXJuIHByZWZpeCArIGtleVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBkZWZhdWx0UmVzdWx0IC8vIG1heSBiZSB1bmRlZmluZWRcbiAgfVxufVxuXG5leHBvcnRzLmNvbXBhcmVJZGVudGlmaWVycyA9IGNvbXBhcmVJZGVudGlmaWVyc1xuXG52YXIgbnVtZXJpYyA9IC9eWzAtOV0rJC9cbmZ1bmN0aW9uIGNvbXBhcmVJZGVudGlmaWVycyAoYSwgYikge1xuICB2YXIgYW51bSA9IG51bWVyaWMudGVzdChhKVxuICB2YXIgYm51bSA9IG51bWVyaWMudGVzdChiKVxuXG4gIGlmIChhbnVtICYmIGJudW0pIHtcbiAgICBhID0gK2FcbiAgICBiID0gK2JcbiAgfVxuXG4gIHJldHVybiBhID09PSBiID8gMFxuICAgIDogKGFudW0gJiYgIWJudW0pID8gLTFcbiAgICA6IChibnVtICYmICFhbnVtKSA/IDFcbiAgICA6IGEgPCBiID8gLTFcbiAgICA6IDFcbn1cblxuZXhwb3J0cy5yY29tcGFyZUlkZW50aWZpZXJzID0gcmNvbXBhcmVJZGVudGlmaWVyc1xuZnVuY3Rpb24gcmNvbXBhcmVJZGVudGlmaWVycyAoYSwgYikge1xuICByZXR1cm4gY29tcGFyZUlkZW50aWZpZXJzKGIsIGEpXG59XG5cbmV4cG9ydHMubWFqb3IgPSBtYWpvclxuZnVuY3Rpb24gbWFqb3IgKGEsIGxvb3NlKSB7XG4gIHJldHVybiBuZXcgU2VtVmVyKGEsIGxvb3NlKS5tYWpvclxufVxuXG5leHBvcnRzLm1pbm9yID0gbWlub3JcbmZ1bmN0aW9uIG1pbm9yIChhLCBsb29zZSkge1xuICByZXR1cm4gbmV3IFNlbVZlcihhLCBsb29zZSkubWlub3Jcbn1cblxuZXhwb3J0cy5wYXRjaCA9IHBhdGNoXG5mdW5jdGlvbiBwYXRjaCAoYSwgbG9vc2UpIHtcbiAgcmV0dXJuIG5ldyBTZW1WZXIoYSwgbG9vc2UpLnBhdGNoXG59XG5cbmV4cG9ydHMuY29tcGFyZSA9IGNvbXBhcmVcbmZ1bmN0aW9uIGNvbXBhcmUgKGEsIGIsIGxvb3NlKSB7XG4gIHJldHVybiBuZXcgU2VtVmVyKGEsIGxvb3NlKS5jb21wYXJlKG5ldyBTZW1WZXIoYiwgbG9vc2UpKVxufVxuXG5leHBvcnRzLmNvbXBhcmVMb29zZSA9IGNvbXBhcmVMb29zZVxuZnVuY3Rpb24gY29tcGFyZUxvb3NlIChhLCBiKSB7XG4gIHJldHVybiBjb21wYXJlKGEsIGIsIHRydWUpXG59XG5cbmV4cG9ydHMuY29tcGFyZUJ1aWxkID0gY29tcGFyZUJ1aWxkXG5mdW5jdGlvbiBjb21wYXJlQnVpbGQgKGEsIGIsIGxvb3NlKSB7XG4gIHZhciB2ZXJzaW9uQSA9IG5ldyBTZW1WZXIoYSwgbG9vc2UpXG4gIHZhciB2ZXJzaW9uQiA9IG5ldyBTZW1WZXIoYiwgbG9vc2UpXG4gIHJldHVybiB2ZXJzaW9uQS5jb21wYXJlKHZlcnNpb25CKSB8fCB2ZXJzaW9uQS5jb21wYXJlQnVpbGQodmVyc2lvbkIpXG59XG5cbmV4cG9ydHMucmNvbXBhcmUgPSByY29tcGFyZVxuZnVuY3Rpb24gcmNvbXBhcmUgKGEsIGIsIGxvb3NlKSB7XG4gIHJldHVybiBjb21wYXJlKGIsIGEsIGxvb3NlKVxufVxuXG5leHBvcnRzLnNvcnQgPSBzb3J0XG5mdW5jdGlvbiBzb3J0IChsaXN0LCBsb29zZSkge1xuICByZXR1cm4gbGlzdC5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgcmV0dXJuIGV4cG9ydHMuY29tcGFyZUJ1aWxkKGEsIGIsIGxvb3NlKVxuICB9KVxufVxuXG5leHBvcnRzLnJzb3J0ID0gcnNvcnRcbmZ1bmN0aW9uIHJzb3J0IChsaXN0LCBsb29zZSkge1xuICByZXR1cm4gbGlzdC5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgcmV0dXJuIGV4cG9ydHMuY29tcGFyZUJ1aWxkKGIsIGEsIGxvb3NlKVxuICB9KVxufVxuXG5leHBvcnRzLmd0ID0gZ3RcbmZ1bmN0aW9uIGd0IChhLCBiLCBsb29zZSkge1xuICByZXR1cm4gY29tcGFyZShhLCBiLCBsb29zZSkgPiAwXG59XG5cbmV4cG9ydHMubHQgPSBsdFxuZnVuY3Rpb24gbHQgKGEsIGIsIGxvb3NlKSB7XG4gIHJldHVybiBjb21wYXJlKGEsIGIsIGxvb3NlKSA8IDBcbn1cblxuZXhwb3J0cy5lcSA9IGVxXG5mdW5jdGlvbiBlcSAoYSwgYiwgbG9vc2UpIHtcbiAgcmV0dXJuIGNvbXBhcmUoYSwgYiwgbG9vc2UpID09PSAwXG59XG5cbmV4cG9ydHMubmVxID0gbmVxXG5mdW5jdGlvbiBuZXEgKGEsIGIsIGxvb3NlKSB7XG4gIHJldHVybiBjb21wYXJlKGEsIGIsIGxvb3NlKSAhPT0gMFxufVxuXG5leHBvcnRzLmd0ZSA9IGd0ZVxuZnVuY3Rpb24gZ3RlIChhLCBiLCBsb29zZSkge1xuICByZXR1cm4gY29tcGFyZShhLCBiLCBsb29zZSkgPj0gMFxufVxuXG5leHBvcnRzLmx0ZSA9IGx0ZVxuZnVuY3Rpb24gbHRlIChhLCBiLCBsb29zZSkge1xuICByZXR1cm4gY29tcGFyZShhLCBiLCBsb29zZSkgPD0gMFxufVxuXG5leHBvcnRzLmNtcCA9IGNtcFxuZnVuY3Rpb24gY21wIChhLCBvcCwgYiwgbG9vc2UpIHtcbiAgc3dpdGNoIChvcCkge1xuICAgIGNhc2UgJz09PSc6XG4gICAgICBpZiAodHlwZW9mIGEgPT09ICdvYmplY3QnKVxuICAgICAgICBhID0gYS52ZXJzaW9uXG4gICAgICBpZiAodHlwZW9mIGIgPT09ICdvYmplY3QnKVxuICAgICAgICBiID0gYi52ZXJzaW9uXG4gICAgICByZXR1cm4gYSA9PT0gYlxuXG4gICAgY2FzZSAnIT09JzpcbiAgICAgIGlmICh0eXBlb2YgYSA9PT0gJ29iamVjdCcpXG4gICAgICAgIGEgPSBhLnZlcnNpb25cbiAgICAgIGlmICh0eXBlb2YgYiA9PT0gJ29iamVjdCcpXG4gICAgICAgIGIgPSBiLnZlcnNpb25cbiAgICAgIHJldHVybiBhICE9PSBiXG5cbiAgICBjYXNlICcnOlxuICAgIGNhc2UgJz0nOlxuICAgIGNhc2UgJz09JzpcbiAgICAgIHJldHVybiBlcShhLCBiLCBsb29zZSlcblxuICAgIGNhc2UgJyE9JzpcbiAgICAgIHJldHVybiBuZXEoYSwgYiwgbG9vc2UpXG5cbiAgICBjYXNlICc+JzpcbiAgICAgIHJldHVybiBndChhLCBiLCBsb29zZSlcblxuICAgIGNhc2UgJz49JzpcbiAgICAgIHJldHVybiBndGUoYSwgYiwgbG9vc2UpXG5cbiAgICBjYXNlICc8JzpcbiAgICAgIHJldHVybiBsdChhLCBiLCBsb29zZSlcblxuICAgIGNhc2UgJzw9JzpcbiAgICAgIHJldHVybiBsdGUoYSwgYiwgbG9vc2UpXG5cbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBvcGVyYXRvcjogJyArIG9wKVxuICB9XG59XG5cbmV4cG9ydHMuQ29tcGFyYXRvciA9IENvbXBhcmF0b3JcbmZ1bmN0aW9uIENvbXBhcmF0b3IgKGNvbXAsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zIHx8IHR5cGVvZiBvcHRpb25zICE9PSAnb2JqZWN0Jykge1xuICAgIG9wdGlvbnMgPSB7XG4gICAgICBsb29zZTogISFvcHRpb25zLFxuICAgICAgaW5jbHVkZVByZXJlbGVhc2U6IGZhbHNlXG4gICAgfVxuICB9XG5cbiAgaWYgKGNvbXAgaW5zdGFuY2VvZiBDb21wYXJhdG9yKSB7XG4gICAgaWYgKGNvbXAubG9vc2UgPT09ICEhb3B0aW9ucy5sb29zZSkge1xuICAgICAgcmV0dXJuIGNvbXBcbiAgICB9IGVsc2Uge1xuICAgICAgY29tcCA9IGNvbXAudmFsdWVcbiAgICB9XG4gIH1cblxuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgQ29tcGFyYXRvcikpIHtcbiAgICByZXR1cm4gbmV3IENvbXBhcmF0b3IoY29tcCwgb3B0aW9ucylcbiAgfVxuXG4gIGRlYnVnKCdjb21wYXJhdG9yJywgY29tcCwgb3B0aW9ucylcbiAgdGhpcy5vcHRpb25zID0gb3B0aW9uc1xuICB0aGlzLmxvb3NlID0gISFvcHRpb25zLmxvb3NlXG4gIHRoaXMucGFyc2UoY29tcClcblxuICBpZiAodGhpcy5zZW12ZXIgPT09IEFOWSkge1xuICAgIHRoaXMudmFsdWUgPSAnJ1xuICB9IGVsc2Uge1xuICAgIHRoaXMudmFsdWUgPSB0aGlzLm9wZXJhdG9yICsgdGhpcy5zZW12ZXIudmVyc2lvblxuICB9XG5cbiAgZGVidWcoJ2NvbXAnLCB0aGlzKVxufVxuXG52YXIgQU5ZID0ge31cbkNvbXBhcmF0b3IucHJvdG90eXBlLnBhcnNlID0gZnVuY3Rpb24gKGNvbXApIHtcbiAgdmFyIHIgPSB0aGlzLm9wdGlvbnMubG9vc2UgPyByZVt0LkNPTVBBUkFUT1JMT09TRV0gOiByZVt0LkNPTVBBUkFUT1JdXG4gIHZhciBtID0gY29tcC5tYXRjaChyKVxuXG4gIGlmICghbSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgY29tcGFyYXRvcjogJyArIGNvbXApXG4gIH1cblxuICB0aGlzLm9wZXJhdG9yID0gbVsxXSAhPT0gdW5kZWZpbmVkID8gbVsxXSA6ICcnXG4gIGlmICh0aGlzLm9wZXJhdG9yID09PSAnPScpIHtcbiAgICB0aGlzLm9wZXJhdG9yID0gJydcbiAgfVxuXG4gIC8vIGlmIGl0IGxpdGVyYWxseSBpcyBqdXN0ICc+JyBvciAnJyB0aGVuIGFsbG93IGFueXRoaW5nLlxuICBpZiAoIW1bMl0pIHtcbiAgICB0aGlzLnNlbXZlciA9IEFOWVxuICB9IGVsc2Uge1xuICAgIHRoaXMuc2VtdmVyID0gbmV3IFNlbVZlcihtWzJdLCB0aGlzLm9wdGlvbnMubG9vc2UpXG4gIH1cbn1cblxuQ29tcGFyYXRvci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzLnZhbHVlXG59XG5cbkNvbXBhcmF0b3IucHJvdG90eXBlLnRlc3QgPSBmdW5jdGlvbiAodmVyc2lvbikge1xuICBkZWJ1ZygnQ29tcGFyYXRvci50ZXN0JywgdmVyc2lvbiwgdGhpcy5vcHRpb25zLmxvb3NlKVxuXG4gIGlmICh0aGlzLnNlbXZlciA9PT0gQU5ZIHx8IHZlcnNpb24gPT09IEFOWSkge1xuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBpZiAodHlwZW9mIHZlcnNpb24gPT09ICdzdHJpbmcnKSB7XG4gICAgdHJ5IHtcbiAgICAgIHZlcnNpb24gPSBuZXcgU2VtVmVyKHZlcnNpb24sIHRoaXMub3B0aW9ucylcbiAgICB9IGNhdGNoIChlcikge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGNtcCh2ZXJzaW9uLCB0aGlzLm9wZXJhdG9yLCB0aGlzLnNlbXZlciwgdGhpcy5vcHRpb25zKVxufVxuXG5Db21wYXJhdG9yLnByb3RvdHlwZS5pbnRlcnNlY3RzID0gZnVuY3Rpb24gKGNvbXAsIG9wdGlvbnMpIHtcbiAgaWYgKCEoY29tcCBpbnN0YW5jZW9mIENvbXBhcmF0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignYSBDb21wYXJhdG9yIGlzIHJlcXVpcmVkJylcbiAgfVxuXG4gIGlmICghb3B0aW9ucyB8fCB0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcbiAgICBvcHRpb25zID0ge1xuICAgICAgbG9vc2U6ICEhb3B0aW9ucyxcbiAgICAgIGluY2x1ZGVQcmVyZWxlYXNlOiBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIHZhciByYW5nZVRtcFxuXG4gIGlmICh0aGlzLm9wZXJhdG9yID09PSAnJykge1xuICAgIGlmICh0aGlzLnZhbHVlID09PSAnJykge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgcmFuZ2VUbXAgPSBuZXcgUmFuZ2UoY29tcC52YWx1ZSwgb3B0aW9ucylcbiAgICByZXR1cm4gc2F0aXNmaWVzKHRoaXMudmFsdWUsIHJhbmdlVG1wLCBvcHRpb25zKVxuICB9IGVsc2UgaWYgKGNvbXAub3BlcmF0b3IgPT09ICcnKSB7XG4gICAgaWYgKGNvbXAudmFsdWUgPT09ICcnKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgICByYW5nZVRtcCA9IG5ldyBSYW5nZSh0aGlzLnZhbHVlLCBvcHRpb25zKVxuICAgIHJldHVybiBzYXRpc2ZpZXMoY29tcC5zZW12ZXIsIHJhbmdlVG1wLCBvcHRpb25zKVxuICB9XG5cbiAgdmFyIHNhbWVEaXJlY3Rpb25JbmNyZWFzaW5nID1cbiAgICAodGhpcy5vcGVyYXRvciA9PT0gJz49JyB8fCB0aGlzLm9wZXJhdG9yID09PSAnPicpICYmXG4gICAgKGNvbXAub3BlcmF0b3IgPT09ICc+PScgfHwgY29tcC5vcGVyYXRvciA9PT0gJz4nKVxuICB2YXIgc2FtZURpcmVjdGlvbkRlY3JlYXNpbmcgPVxuICAgICh0aGlzLm9wZXJhdG9yID09PSAnPD0nIHx8IHRoaXMub3BlcmF0b3IgPT09ICc8JykgJiZcbiAgICAoY29tcC5vcGVyYXRvciA9PT0gJzw9JyB8fCBjb21wLm9wZXJhdG9yID09PSAnPCcpXG4gIHZhciBzYW1lU2VtVmVyID0gdGhpcy5zZW12ZXIudmVyc2lvbiA9PT0gY29tcC5zZW12ZXIudmVyc2lvblxuICB2YXIgZGlmZmVyZW50RGlyZWN0aW9uc0luY2x1c2l2ZSA9XG4gICAgKHRoaXMub3BlcmF0b3IgPT09ICc+PScgfHwgdGhpcy5vcGVyYXRvciA9PT0gJzw9JykgJiZcbiAgICAoY29tcC5vcGVyYXRvciA9PT0gJz49JyB8fCBjb21wLm9wZXJhdG9yID09PSAnPD0nKVxuICB2YXIgb3Bwb3NpdGVEaXJlY3Rpb25zTGVzc1RoYW4gPVxuICAgIGNtcCh0aGlzLnNlbXZlciwgJzwnLCBjb21wLnNlbXZlciwgb3B0aW9ucykgJiZcbiAgICAoKHRoaXMub3BlcmF0b3IgPT09ICc+PScgfHwgdGhpcy5vcGVyYXRvciA9PT0gJz4nKSAmJlxuICAgIChjb21wLm9wZXJhdG9yID09PSAnPD0nIHx8IGNvbXAub3BlcmF0b3IgPT09ICc8JykpXG4gIHZhciBvcHBvc2l0ZURpcmVjdGlvbnNHcmVhdGVyVGhhbiA9XG4gICAgY21wKHRoaXMuc2VtdmVyLCAnPicsIGNvbXAuc2VtdmVyLCBvcHRpb25zKSAmJlxuICAgICgodGhpcy5vcGVyYXRvciA9PT0gJzw9JyB8fCB0aGlzLm9wZXJhdG9yID09PSAnPCcpICYmXG4gICAgKGNvbXAub3BlcmF0b3IgPT09ICc+PScgfHwgY29tcC5vcGVyYXRvciA9PT0gJz4nKSlcblxuICByZXR1cm4gc2FtZURpcmVjdGlvbkluY3JlYXNpbmcgfHwgc2FtZURpcmVjdGlvbkRlY3JlYXNpbmcgfHxcbiAgICAoc2FtZVNlbVZlciAmJiBkaWZmZXJlbnREaXJlY3Rpb25zSW5jbHVzaXZlKSB8fFxuICAgIG9wcG9zaXRlRGlyZWN0aW9uc0xlc3NUaGFuIHx8IG9wcG9zaXRlRGlyZWN0aW9uc0dyZWF0ZXJUaGFuXG59XG5cbmV4cG9ydHMuUmFuZ2UgPSBSYW5nZVxuZnVuY3Rpb24gUmFuZ2UgKHJhbmdlLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucyB8fCB0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcbiAgICBvcHRpb25zID0ge1xuICAgICAgbG9vc2U6ICEhb3B0aW9ucyxcbiAgICAgIGluY2x1ZGVQcmVyZWxlYXNlOiBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIGlmIChyYW5nZSBpbnN0YW5jZW9mIFJhbmdlKSB7XG4gICAgaWYgKHJhbmdlLmxvb3NlID09PSAhIW9wdGlvbnMubG9vc2UgJiZcbiAgICAgICAgcmFuZ2UuaW5jbHVkZVByZXJlbGVhc2UgPT09ICEhb3B0aW9ucy5pbmNsdWRlUHJlcmVsZWFzZSkge1xuICAgICAgcmV0dXJuIHJhbmdlXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgUmFuZ2UocmFuZ2UucmF3LCBvcHRpb25zKVxuICAgIH1cbiAgfVxuXG4gIGlmIChyYW5nZSBpbnN0YW5jZW9mIENvbXBhcmF0b3IpIHtcbiAgICByZXR1cm4gbmV3IFJhbmdlKHJhbmdlLnZhbHVlLCBvcHRpb25zKVxuICB9XG5cbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFJhbmdlKSkge1xuICAgIHJldHVybiBuZXcgUmFuZ2UocmFuZ2UsIG9wdGlvbnMpXG4gIH1cblxuICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zXG4gIHRoaXMubG9vc2UgPSAhIW9wdGlvbnMubG9vc2VcbiAgdGhpcy5pbmNsdWRlUHJlcmVsZWFzZSA9ICEhb3B0aW9ucy5pbmNsdWRlUHJlcmVsZWFzZVxuXG4gIC8vIEZpcnN0LCBzcGxpdCBiYXNlZCBvbiBib29sZWFuIG9yIHx8XG4gIHRoaXMucmF3ID0gcmFuZ2VcbiAgdGhpcy5zZXQgPSByYW5nZS5zcGxpdCgvXFxzKlxcfFxcfFxccyovKS5tYXAoZnVuY3Rpb24gKHJhbmdlKSB7XG4gICAgcmV0dXJuIHRoaXMucGFyc2VSYW5nZShyYW5nZS50cmltKCkpXG4gIH0sIHRoaXMpLmZpbHRlcihmdW5jdGlvbiAoYykge1xuICAgIC8vIHRocm93IG91dCBhbnkgdGhhdCBhcmUgbm90IHJlbGV2YW50IGZvciB3aGF0ZXZlciByZWFzb25cbiAgICByZXR1cm4gYy5sZW5ndGhcbiAgfSlcblxuICBpZiAoIXRoaXMuc2V0Lmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgU2VtVmVyIFJhbmdlOiAnICsgcmFuZ2UpXG4gIH1cblxuICB0aGlzLmZvcm1hdCgpXG59XG5cblJhbmdlLnByb3RvdHlwZS5mb3JtYXQgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMucmFuZ2UgPSB0aGlzLnNldC5tYXAoZnVuY3Rpb24gKGNvbXBzKSB7XG4gICAgcmV0dXJuIGNvbXBzLmpvaW4oJyAnKS50cmltKClcbiAgfSkuam9pbignfHwnKS50cmltKClcbiAgcmV0dXJuIHRoaXMucmFuZ2Vcbn1cblxuUmFuZ2UucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcy5yYW5nZVxufVxuXG5SYW5nZS5wcm90b3R5cGUucGFyc2VSYW5nZSA9IGZ1bmN0aW9uIChyYW5nZSkge1xuICB2YXIgbG9vc2UgPSB0aGlzLm9wdGlvbnMubG9vc2VcbiAgcmFuZ2UgPSByYW5nZS50cmltKClcbiAgLy8gYDEuMi4zIC0gMS4yLjRgID0+IGA+PTEuMi4zIDw9MS4yLjRgXG4gIHZhciBociA9IGxvb3NlID8gcmVbdC5IWVBIRU5SQU5HRUxPT1NFXSA6IHJlW3QuSFlQSEVOUkFOR0VdXG4gIHJhbmdlID0gcmFuZ2UucmVwbGFjZShociwgaHlwaGVuUmVwbGFjZSlcbiAgZGVidWcoJ2h5cGhlbiByZXBsYWNlJywgcmFuZ2UpXG4gIC8vIGA+IDEuMi4zIDwgMS4yLjVgID0+IGA+MS4yLjMgPDEuMi41YFxuICByYW5nZSA9IHJhbmdlLnJlcGxhY2UocmVbdC5DT01QQVJBVE9SVFJJTV0sIGNvbXBhcmF0b3JUcmltUmVwbGFjZSlcbiAgZGVidWcoJ2NvbXBhcmF0b3IgdHJpbScsIHJhbmdlLCByZVt0LkNPTVBBUkFUT1JUUklNXSlcblxuICAvLyBgfiAxLjIuM2AgPT4gYH4xLjIuM2BcbiAgcmFuZ2UgPSByYW5nZS5yZXBsYWNlKHJlW3QuVElMREVUUklNXSwgdGlsZGVUcmltUmVwbGFjZSlcblxuICAvLyBgXiAxLjIuM2AgPT4gYF4xLjIuM2BcbiAgcmFuZ2UgPSByYW5nZS5yZXBsYWNlKHJlW3QuQ0FSRVRUUklNXSwgY2FyZXRUcmltUmVwbGFjZSlcblxuICAvLyBub3JtYWxpemUgc3BhY2VzXG4gIHJhbmdlID0gcmFuZ2Uuc3BsaXQoL1xccysvKS5qb2luKCcgJylcblxuICAvLyBBdCB0aGlzIHBvaW50LCB0aGUgcmFuZ2UgaXMgY29tcGxldGVseSB0cmltbWVkIGFuZFxuICAvLyByZWFkeSB0byBiZSBzcGxpdCBpbnRvIGNvbXBhcmF0b3JzLlxuXG4gIHZhciBjb21wUmUgPSBsb29zZSA/IHJlW3QuQ09NUEFSQVRPUkxPT1NFXSA6IHJlW3QuQ09NUEFSQVRPUl1cbiAgdmFyIHNldCA9IHJhbmdlLnNwbGl0KCcgJykubWFwKGZ1bmN0aW9uIChjb21wKSB7XG4gICAgcmV0dXJuIHBhcnNlQ29tcGFyYXRvcihjb21wLCB0aGlzLm9wdGlvbnMpXG4gIH0sIHRoaXMpLmpvaW4oJyAnKS5zcGxpdCgvXFxzKy8pXG4gIGlmICh0aGlzLm9wdGlvbnMubG9vc2UpIHtcbiAgICAvLyBpbiBsb29zZSBtb2RlLCB0aHJvdyBvdXQgYW55IHRoYXQgYXJlIG5vdCB2YWxpZCBjb21wYXJhdG9yc1xuICAgIHNldCA9IHNldC5maWx0ZXIoZnVuY3Rpb24gKGNvbXApIHtcbiAgICAgIHJldHVybiAhIWNvbXAubWF0Y2goY29tcFJlKVxuICAgIH0pXG4gIH1cbiAgc2V0ID0gc2V0Lm1hcChmdW5jdGlvbiAoY29tcCkge1xuICAgIHJldHVybiBuZXcgQ29tcGFyYXRvcihjb21wLCB0aGlzLm9wdGlvbnMpXG4gIH0sIHRoaXMpXG5cbiAgcmV0dXJuIHNldFxufVxuXG5SYW5nZS5wcm90b3R5cGUuaW50ZXJzZWN0cyA9IGZ1bmN0aW9uIChyYW5nZSwgb3B0aW9ucykge1xuICBpZiAoIShyYW5nZSBpbnN0YW5jZW9mIFJhbmdlKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2EgUmFuZ2UgaXMgcmVxdWlyZWQnKVxuICB9XG5cbiAgcmV0dXJuIHRoaXMuc2V0LnNvbWUoZnVuY3Rpb24gKHRoaXNDb21wYXJhdG9ycykge1xuICAgIHJldHVybiAoXG4gICAgICBpc1NhdGlzZmlhYmxlKHRoaXNDb21wYXJhdG9ycywgb3B0aW9ucykgJiZcbiAgICAgIHJhbmdlLnNldC5zb21lKGZ1bmN0aW9uIChyYW5nZUNvbXBhcmF0b3JzKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgaXNTYXRpc2ZpYWJsZShyYW5nZUNvbXBhcmF0b3JzLCBvcHRpb25zKSAmJlxuICAgICAgICAgIHRoaXNDb21wYXJhdG9ycy5ldmVyeShmdW5jdGlvbiAodGhpc0NvbXBhcmF0b3IpIHtcbiAgICAgICAgICAgIHJldHVybiByYW5nZUNvbXBhcmF0b3JzLmV2ZXJ5KGZ1bmN0aW9uIChyYW5nZUNvbXBhcmF0b3IpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXNDb21wYXJhdG9yLmludGVyc2VjdHMocmFuZ2VDb21wYXJhdG9yLCBvcHRpb25zKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICB9KVxuICAgIClcbiAgfSlcbn1cblxuLy8gdGFrZSBhIHNldCBvZiBjb21wYXJhdG9ycyBhbmQgZGV0ZXJtaW5lIHdoZXRoZXIgdGhlcmVcbi8vIGV4aXN0cyBhIHZlcnNpb24gd2hpY2ggY2FuIHNhdGlzZnkgaXRcbmZ1bmN0aW9uIGlzU2F0aXNmaWFibGUgKGNvbXBhcmF0b3JzLCBvcHRpb25zKSB7XG4gIHZhciByZXN1bHQgPSB0cnVlXG4gIHZhciByZW1haW5pbmdDb21wYXJhdG9ycyA9IGNvbXBhcmF0b3JzLnNsaWNlKClcbiAgdmFyIHRlc3RDb21wYXJhdG9yID0gcmVtYWluaW5nQ29tcGFyYXRvcnMucG9wKClcblxuICB3aGlsZSAocmVzdWx0ICYmIHJlbWFpbmluZ0NvbXBhcmF0b3JzLmxlbmd0aCkge1xuICAgIHJlc3VsdCA9IHJlbWFpbmluZ0NvbXBhcmF0b3JzLmV2ZXJ5KGZ1bmN0aW9uIChvdGhlckNvbXBhcmF0b3IpIHtcbiAgICAgIHJldHVybiB0ZXN0Q29tcGFyYXRvci5pbnRlcnNlY3RzKG90aGVyQ29tcGFyYXRvciwgb3B0aW9ucylcbiAgICB9KVxuXG4gICAgdGVzdENvbXBhcmF0b3IgPSByZW1haW5pbmdDb21wYXJhdG9ycy5wb3AoKVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG4vLyBNb3N0bHkganVzdCBmb3IgdGVzdGluZyBhbmQgbGVnYWN5IEFQSSByZWFzb25zXG5leHBvcnRzLnRvQ29tcGFyYXRvcnMgPSB0b0NvbXBhcmF0b3JzXG5mdW5jdGlvbiB0b0NvbXBhcmF0b3JzIChyYW5nZSwgb3B0aW9ucykge1xuICByZXR1cm4gbmV3IFJhbmdlKHJhbmdlLCBvcHRpb25zKS5zZXQubWFwKGZ1bmN0aW9uIChjb21wKSB7XG4gICAgcmV0dXJuIGNvbXAubWFwKGZ1bmN0aW9uIChjKSB7XG4gICAgICByZXR1cm4gYy52YWx1ZVxuICAgIH0pLmpvaW4oJyAnKS50cmltKCkuc3BsaXQoJyAnKVxuICB9KVxufVxuXG4vLyBjb21wcmlzZWQgb2YgeHJhbmdlcywgdGlsZGVzLCBzdGFycywgYW5kIGd0bHQncyBhdCB0aGlzIHBvaW50LlxuLy8gYWxyZWFkeSByZXBsYWNlZCB0aGUgaHlwaGVuIHJhbmdlc1xuLy8gdHVybiBpbnRvIGEgc2V0IG9mIEpVU1QgY29tcGFyYXRvcnMuXG5mdW5jdGlvbiBwYXJzZUNvbXBhcmF0b3IgKGNvbXAsIG9wdGlvbnMpIHtcbiAgZGVidWcoJ2NvbXAnLCBjb21wLCBvcHRpb25zKVxuICBjb21wID0gcmVwbGFjZUNhcmV0cyhjb21wLCBvcHRpb25zKVxuICBkZWJ1ZygnY2FyZXQnLCBjb21wKVxuICBjb21wID0gcmVwbGFjZVRpbGRlcyhjb21wLCBvcHRpb25zKVxuICBkZWJ1ZygndGlsZGVzJywgY29tcClcbiAgY29tcCA9IHJlcGxhY2VYUmFuZ2VzKGNvbXAsIG9wdGlvbnMpXG4gIGRlYnVnKCd4cmFuZ2UnLCBjb21wKVxuICBjb21wID0gcmVwbGFjZVN0YXJzKGNvbXAsIG9wdGlvbnMpXG4gIGRlYnVnKCdzdGFycycsIGNvbXApXG4gIHJldHVybiBjb21wXG59XG5cbmZ1bmN0aW9uIGlzWCAoaWQpIHtcbiAgcmV0dXJuICFpZCB8fCBpZC50b0xvd2VyQ2FzZSgpID09PSAneCcgfHwgaWQgPT09ICcqJ1xufVxuXG4vLyB+LCB+PiAtLT4gKiAoYW55LCBraW5kYSBzaWxseSlcbi8vIH4yLCB+Mi54LCB+Mi54LngsIH4+Miwgfj4yLnggfj4yLngueCAtLT4gPj0yLjAuMCA8My4wLjBcbi8vIH4yLjAsIH4yLjAueCwgfj4yLjAsIH4+Mi4wLnggLS0+ID49Mi4wLjAgPDIuMS4wXG4vLyB+MS4yLCB+MS4yLngsIH4+MS4yLCB+PjEuMi54IC0tPiA+PTEuMi4wIDwxLjMuMFxuLy8gfjEuMi4zLCB+PjEuMi4zIC0tPiA+PTEuMi4zIDwxLjMuMFxuLy8gfjEuMi4wLCB+PjEuMi4wIC0tPiA+PTEuMi4wIDwxLjMuMFxuZnVuY3Rpb24gcmVwbGFjZVRpbGRlcyAoY29tcCwgb3B0aW9ucykge1xuICByZXR1cm4gY29tcC50cmltKCkuc3BsaXQoL1xccysvKS5tYXAoZnVuY3Rpb24gKGNvbXApIHtcbiAgICByZXR1cm4gcmVwbGFjZVRpbGRlKGNvbXAsIG9wdGlvbnMpXG4gIH0pLmpvaW4oJyAnKVxufVxuXG5mdW5jdGlvbiByZXBsYWNlVGlsZGUgKGNvbXAsIG9wdGlvbnMpIHtcbiAgdmFyIHIgPSBvcHRpb25zLmxvb3NlID8gcmVbdC5USUxERUxPT1NFXSA6IHJlW3QuVElMREVdXG4gIHJldHVybiBjb21wLnJlcGxhY2UociwgZnVuY3Rpb24gKF8sIE0sIG0sIHAsIHByKSB7XG4gICAgZGVidWcoJ3RpbGRlJywgY29tcCwgXywgTSwgbSwgcCwgcHIpXG4gICAgdmFyIHJldFxuXG4gICAgaWYgKGlzWChNKSkge1xuICAgICAgcmV0ID0gJydcbiAgICB9IGVsc2UgaWYgKGlzWChtKSkge1xuICAgICAgcmV0ID0gJz49JyArIE0gKyAnLjAuMCA8JyArICgrTSArIDEpICsgJy4wLjAnXG4gICAgfSBlbHNlIGlmIChpc1gocCkpIHtcbiAgICAgIC8vIH4xLjIgPT0gPj0xLjIuMCA8MS4zLjBcbiAgICAgIHJldCA9ICc+PScgKyBNICsgJy4nICsgbSArICcuMCA8JyArIE0gKyAnLicgKyAoK20gKyAxKSArICcuMCdcbiAgICB9IGVsc2UgaWYgKHByKSB7XG4gICAgICBkZWJ1ZygncmVwbGFjZVRpbGRlIHByJywgcHIpXG4gICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLicgKyBwICsgJy0nICsgcHIgK1xuICAgICAgICAgICAgJyA8JyArIE0gKyAnLicgKyAoK20gKyAxKSArICcuMCdcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gfjEuMi4zID09ID49MS4yLjMgPDEuMy4wXG4gICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLicgKyBwICtcbiAgICAgICAgICAgICcgPCcgKyBNICsgJy4nICsgKCttICsgMSkgKyAnLjAnXG4gICAgfVxuXG4gICAgZGVidWcoJ3RpbGRlIHJldHVybicsIHJldClcbiAgICByZXR1cm4gcmV0XG4gIH0pXG59XG5cbi8vIF4gLS0+ICogKGFueSwga2luZGEgc2lsbHkpXG4vLyBeMiwgXjIueCwgXjIueC54IC0tPiA+PTIuMC4wIDwzLjAuMFxuLy8gXjIuMCwgXjIuMC54IC0tPiA+PTIuMC4wIDwzLjAuMFxuLy8gXjEuMiwgXjEuMi54IC0tPiA+PTEuMi4wIDwyLjAuMFxuLy8gXjEuMi4zIC0tPiA+PTEuMi4zIDwyLjAuMFxuLy8gXjEuMi4wIC0tPiA+PTEuMi4wIDwyLjAuMFxuZnVuY3Rpb24gcmVwbGFjZUNhcmV0cyAoY29tcCwgb3B0aW9ucykge1xuICByZXR1cm4gY29tcC50cmltKCkuc3BsaXQoL1xccysvKS5tYXAoZnVuY3Rpb24gKGNvbXApIHtcbiAgICByZXR1cm4gcmVwbGFjZUNhcmV0KGNvbXAsIG9wdGlvbnMpXG4gIH0pLmpvaW4oJyAnKVxufVxuXG5mdW5jdGlvbiByZXBsYWNlQ2FyZXQgKGNvbXAsIG9wdGlvbnMpIHtcbiAgZGVidWcoJ2NhcmV0JywgY29tcCwgb3B0aW9ucylcbiAgdmFyIHIgPSBvcHRpb25zLmxvb3NlID8gcmVbdC5DQVJFVExPT1NFXSA6IHJlW3QuQ0FSRVRdXG4gIHJldHVybiBjb21wLnJlcGxhY2UociwgZnVuY3Rpb24gKF8sIE0sIG0sIHAsIHByKSB7XG4gICAgZGVidWcoJ2NhcmV0JywgY29tcCwgXywgTSwgbSwgcCwgcHIpXG4gICAgdmFyIHJldFxuXG4gICAgaWYgKGlzWChNKSkge1xuICAgICAgcmV0ID0gJydcbiAgICB9IGVsc2UgaWYgKGlzWChtKSkge1xuICAgICAgcmV0ID0gJz49JyArIE0gKyAnLjAuMCA8JyArICgrTSArIDEpICsgJy4wLjAnXG4gICAgfSBlbHNlIGlmIChpc1gocCkpIHtcbiAgICAgIGlmIChNID09PSAnMCcpIHtcbiAgICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4wIDwnICsgTSArICcuJyArICgrbSArIDEpICsgJy4wJ1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4wIDwnICsgKCtNICsgMSkgKyAnLjAuMCdcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHByKSB7XG4gICAgICBkZWJ1ZygncmVwbGFjZUNhcmV0IHByJywgcHIpXG4gICAgICBpZiAoTSA9PT0gJzAnKSB7XG4gICAgICAgIGlmIChtID09PSAnMCcpIHtcbiAgICAgICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLicgKyBwICsgJy0nICsgcHIgK1xuICAgICAgICAgICAgICAgICcgPCcgKyBNICsgJy4nICsgbSArICcuJyArICgrcCArIDEpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4nICsgcCArICctJyArIHByICtcbiAgICAgICAgICAgICAgICAnIDwnICsgTSArICcuJyArICgrbSArIDEpICsgJy4wJ1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLicgKyBwICsgJy0nICsgcHIgK1xuICAgICAgICAgICAgICAnIDwnICsgKCtNICsgMSkgKyAnLjAuMCdcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZGVidWcoJ25vIHByJylcbiAgICAgIGlmIChNID09PSAnMCcpIHtcbiAgICAgICAgaWYgKG0gPT09ICcwJykge1xuICAgICAgICAgIHJldCA9ICc+PScgKyBNICsgJy4nICsgbSArICcuJyArIHAgK1xuICAgICAgICAgICAgICAgICcgPCcgKyBNICsgJy4nICsgbSArICcuJyArICgrcCArIDEpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4nICsgcCArXG4gICAgICAgICAgICAgICAgJyA8JyArIE0gKyAnLicgKyAoK20gKyAxKSArICcuMCdcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0ID0gJz49JyArIE0gKyAnLicgKyBtICsgJy4nICsgcCArXG4gICAgICAgICAgICAgICcgPCcgKyAoK00gKyAxKSArICcuMC4wJ1xuICAgICAgfVxuICAgIH1cblxuICAgIGRlYnVnKCdjYXJldCByZXR1cm4nLCByZXQpXG4gICAgcmV0dXJuIHJldFxuICB9KVxufVxuXG5mdW5jdGlvbiByZXBsYWNlWFJhbmdlcyAoY29tcCwgb3B0aW9ucykge1xuICBkZWJ1ZygncmVwbGFjZVhSYW5nZXMnLCBjb21wLCBvcHRpb25zKVxuICByZXR1cm4gY29tcC5zcGxpdCgvXFxzKy8pLm1hcChmdW5jdGlvbiAoY29tcCkge1xuICAgIHJldHVybiByZXBsYWNlWFJhbmdlKGNvbXAsIG9wdGlvbnMpXG4gIH0pLmpvaW4oJyAnKVxufVxuXG5mdW5jdGlvbiByZXBsYWNlWFJhbmdlIChjb21wLCBvcHRpb25zKSB7XG4gIGNvbXAgPSBjb21wLnRyaW0oKVxuICB2YXIgciA9IG9wdGlvbnMubG9vc2UgPyByZVt0LlhSQU5HRUxPT1NFXSA6IHJlW3QuWFJBTkdFXVxuICByZXR1cm4gY29tcC5yZXBsYWNlKHIsIGZ1bmN0aW9uIChyZXQsIGd0bHQsIE0sIG0sIHAsIHByKSB7XG4gICAgZGVidWcoJ3hSYW5nZScsIGNvbXAsIHJldCwgZ3RsdCwgTSwgbSwgcCwgcHIpXG4gICAgdmFyIHhNID0gaXNYKE0pXG4gICAgdmFyIHhtID0geE0gfHwgaXNYKG0pXG4gICAgdmFyIHhwID0geG0gfHwgaXNYKHApXG4gICAgdmFyIGFueVggPSB4cFxuXG4gICAgaWYgKGd0bHQgPT09ICc9JyAmJiBhbnlYKSB7XG4gICAgICBndGx0ID0gJydcbiAgICB9XG5cbiAgICAvLyBpZiB3ZSdyZSBpbmNsdWRpbmcgcHJlcmVsZWFzZXMgaW4gdGhlIG1hdGNoLCB0aGVuIHdlIG5lZWRcbiAgICAvLyB0byBmaXggdGhpcyB0byAtMCwgdGhlIGxvd2VzdCBwb3NzaWJsZSBwcmVyZWxlYXNlIHZhbHVlXG4gICAgcHIgPSBvcHRpb25zLmluY2x1ZGVQcmVyZWxlYXNlID8gJy0wJyA6ICcnXG5cbiAgICBpZiAoeE0pIHtcbiAgICAgIGlmIChndGx0ID09PSAnPicgfHwgZ3RsdCA9PT0gJzwnKSB7XG4gICAgICAgIC8vIG5vdGhpbmcgaXMgYWxsb3dlZFxuICAgICAgICByZXQgPSAnPDAuMC4wLTAnXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBub3RoaW5nIGlzIGZvcmJpZGRlblxuICAgICAgICByZXQgPSAnKidcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGd0bHQgJiYgYW55WCkge1xuICAgICAgLy8gd2Uga25vdyBwYXRjaCBpcyBhbiB4LCBiZWNhdXNlIHdlIGhhdmUgYW55IHggYXQgYWxsLlxuICAgICAgLy8gcmVwbGFjZSBYIHdpdGggMFxuICAgICAgaWYgKHhtKSB7XG4gICAgICAgIG0gPSAwXG4gICAgICB9XG4gICAgICBwID0gMFxuXG4gICAgICBpZiAoZ3RsdCA9PT0gJz4nKSB7XG4gICAgICAgIC8vID4xID0+ID49Mi4wLjBcbiAgICAgICAgLy8gPjEuMiA9PiA+PTEuMy4wXG4gICAgICAgIC8vID4xLjIuMyA9PiA+PSAxLjIuNFxuICAgICAgICBndGx0ID0gJz49J1xuICAgICAgICBpZiAoeG0pIHtcbiAgICAgICAgICBNID0gK00gKyAxXG4gICAgICAgICAgbSA9IDBcbiAgICAgICAgICBwID0gMFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG0gPSArbSArIDFcbiAgICAgICAgICBwID0gMFxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGd0bHQgPT09ICc8PScpIHtcbiAgICAgICAgLy8gPD0wLjcueCBpcyBhY3R1YWxseSA8MC44LjAsIHNpbmNlIGFueSAwLjcueCBzaG91bGRcbiAgICAgICAgLy8gcGFzcy4gIFNpbWlsYXJseSwgPD03LnggaXMgYWN0dWFsbHkgPDguMC4wLCBldGMuXG4gICAgICAgIGd0bHQgPSAnPCdcbiAgICAgICAgaWYgKHhtKSB7XG4gICAgICAgICAgTSA9ICtNICsgMVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG0gPSArbSArIDFcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXQgPSBndGx0ICsgTSArICcuJyArIG0gKyAnLicgKyBwICsgcHJcbiAgICB9IGVsc2UgaWYgKHhtKSB7XG4gICAgICByZXQgPSAnPj0nICsgTSArICcuMC4wJyArIHByICsgJyA8JyArICgrTSArIDEpICsgJy4wLjAnICsgcHJcbiAgICB9IGVsc2UgaWYgKHhwKSB7XG4gICAgICByZXQgPSAnPj0nICsgTSArICcuJyArIG0gKyAnLjAnICsgcHIgK1xuICAgICAgICAnIDwnICsgTSArICcuJyArICgrbSArIDEpICsgJy4wJyArIHByXG4gICAgfVxuXG4gICAgZGVidWcoJ3hSYW5nZSByZXR1cm4nLCByZXQpXG5cbiAgICByZXR1cm4gcmV0XG4gIH0pXG59XG5cbi8vIEJlY2F1c2UgKiBpcyBBTkQtZWQgd2l0aCBldmVyeXRoaW5nIGVsc2UgaW4gdGhlIGNvbXBhcmF0b3IsXG4vLyBhbmQgJycgbWVhbnMgXCJhbnkgdmVyc2lvblwiLCBqdXN0IHJlbW92ZSB0aGUgKnMgZW50aXJlbHkuXG5mdW5jdGlvbiByZXBsYWNlU3RhcnMgKGNvbXAsIG9wdGlvbnMpIHtcbiAgZGVidWcoJ3JlcGxhY2VTdGFycycsIGNvbXAsIG9wdGlvbnMpXG4gIC8vIExvb3NlbmVzcyBpcyBpZ25vcmVkIGhlcmUuICBzdGFyIGlzIGFsd2F5cyBhcyBsb29zZSBhcyBpdCBnZXRzIVxuICByZXR1cm4gY29tcC50cmltKCkucmVwbGFjZShyZVt0LlNUQVJdLCAnJylcbn1cblxuLy8gVGhpcyBmdW5jdGlvbiBpcyBwYXNzZWQgdG8gc3RyaW5nLnJlcGxhY2UocmVbdC5IWVBIRU5SQU5HRV0pXG4vLyBNLCBtLCBwYXRjaCwgcHJlcmVsZWFzZSwgYnVpbGRcbi8vIDEuMiAtIDMuNC41ID0+ID49MS4yLjAgPD0zLjQuNVxuLy8gMS4yLjMgLSAzLjQgPT4gPj0xLjIuMCA8My41LjAgQW55IDMuNC54IHdpbGwgZG9cbi8vIDEuMiAtIDMuNCA9PiA+PTEuMi4wIDwzLjUuMFxuZnVuY3Rpb24gaHlwaGVuUmVwbGFjZSAoJDAsXG4gIGZyb20sIGZNLCBmbSwgZnAsIGZwciwgZmIsXG4gIHRvLCB0TSwgdG0sIHRwLCB0cHIsIHRiKSB7XG4gIGlmIChpc1goZk0pKSB7XG4gICAgZnJvbSA9ICcnXG4gIH0gZWxzZSBpZiAoaXNYKGZtKSkge1xuICAgIGZyb20gPSAnPj0nICsgZk0gKyAnLjAuMCdcbiAgfSBlbHNlIGlmIChpc1goZnApKSB7XG4gICAgZnJvbSA9ICc+PScgKyBmTSArICcuJyArIGZtICsgJy4wJ1xuICB9IGVsc2Uge1xuICAgIGZyb20gPSAnPj0nICsgZnJvbVxuICB9XG5cbiAgaWYgKGlzWCh0TSkpIHtcbiAgICB0byA9ICcnXG4gIH0gZWxzZSBpZiAoaXNYKHRtKSkge1xuICAgIHRvID0gJzwnICsgKCt0TSArIDEpICsgJy4wLjAnXG4gIH0gZWxzZSBpZiAoaXNYKHRwKSkge1xuICAgIHRvID0gJzwnICsgdE0gKyAnLicgKyAoK3RtICsgMSkgKyAnLjAnXG4gIH0gZWxzZSBpZiAodHByKSB7XG4gICAgdG8gPSAnPD0nICsgdE0gKyAnLicgKyB0bSArICcuJyArIHRwICsgJy0nICsgdHByXG4gIH0gZWxzZSB7XG4gICAgdG8gPSAnPD0nICsgdG9cbiAgfVxuXG4gIHJldHVybiAoZnJvbSArICcgJyArIHRvKS50cmltKClcbn1cblxuLy8gaWYgQU5ZIG9mIHRoZSBzZXRzIG1hdGNoIEFMTCBvZiBpdHMgY29tcGFyYXRvcnMsIHRoZW4gcGFzc1xuUmFuZ2UucHJvdG90eXBlLnRlc3QgPSBmdW5jdGlvbiAodmVyc2lvbikge1xuICBpZiAoIXZlcnNpb24pIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmVyc2lvbiA9PT0gJ3N0cmluZycpIHtcbiAgICB0cnkge1xuICAgICAgdmVyc2lvbiA9IG5ldyBTZW1WZXIodmVyc2lvbiwgdGhpcy5vcHRpb25zKVxuICAgIH0gY2F0Y2ggKGVyKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc2V0Lmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHRlc3RTZXQodGhpcy5zZXRbaV0sIHZlcnNpb24sIHRoaXMub3B0aW9ucykpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZVxufVxuXG5mdW5jdGlvbiB0ZXN0U2V0IChzZXQsIHZlcnNpb24sIG9wdGlvbnMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZXQubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoIXNldFtpXS50ZXN0KHZlcnNpb24pKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cblxuICBpZiAodmVyc2lvbi5wcmVyZWxlYXNlLmxlbmd0aCAmJiAhb3B0aW9ucy5pbmNsdWRlUHJlcmVsZWFzZSkge1xuICAgIC8vIEZpbmQgdGhlIHNldCBvZiB2ZXJzaW9ucyB0aGF0IGFyZSBhbGxvd2VkIHRvIGhhdmUgcHJlcmVsZWFzZXNcbiAgICAvLyBGb3IgZXhhbXBsZSwgXjEuMi4zLXByLjEgZGVzdWdhcnMgdG8gPj0xLjIuMy1wci4xIDwyLjAuMFxuICAgIC8vIFRoYXQgc2hvdWxkIGFsbG93IGAxLjIuMy1wci4yYCB0byBwYXNzLlxuICAgIC8vIEhvd2V2ZXIsIGAxLjIuNC1hbHBoYS5ub3RyZWFkeWAgc2hvdWxkIE5PVCBiZSBhbGxvd2VkLFxuICAgIC8vIGV2ZW4gdGhvdWdoIGl0J3Mgd2l0aGluIHRoZSByYW5nZSBzZXQgYnkgdGhlIGNvbXBhcmF0b3JzLlxuICAgIGZvciAoaSA9IDA7IGkgPCBzZXQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGRlYnVnKHNldFtpXS5zZW12ZXIpXG4gICAgICBpZiAoc2V0W2ldLnNlbXZlciA9PT0gQU5ZKSB7XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIGlmIChzZXRbaV0uc2VtdmVyLnByZXJlbGVhc2UubGVuZ3RoID4gMCkge1xuICAgICAgICB2YXIgYWxsb3dlZCA9IHNldFtpXS5zZW12ZXJcbiAgICAgICAgaWYgKGFsbG93ZWQubWFqb3IgPT09IHZlcnNpb24ubWFqb3IgJiZcbiAgICAgICAgICAgIGFsbG93ZWQubWlub3IgPT09IHZlcnNpb24ubWlub3IgJiZcbiAgICAgICAgICAgIGFsbG93ZWQucGF0Y2ggPT09IHZlcnNpb24ucGF0Y2gpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gVmVyc2lvbiBoYXMgYSAtcHJlLCBidXQgaXQncyBub3Qgb25lIG9mIHRoZSBvbmVzIHdlIGxpa2UuXG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICByZXR1cm4gdHJ1ZVxufVxuXG5leHBvcnRzLnNhdGlzZmllcyA9IHNhdGlzZmllc1xuZnVuY3Rpb24gc2F0aXNmaWVzICh2ZXJzaW9uLCByYW5nZSwgb3B0aW9ucykge1xuICB0cnkge1xuICAgIHJhbmdlID0gbmV3IFJhbmdlKHJhbmdlLCBvcHRpb25zKVxuICB9IGNhdGNoIChlcikge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIHJldHVybiByYW5nZS50ZXN0KHZlcnNpb24pXG59XG5cbmV4cG9ydHMubWF4U2F0aXNmeWluZyA9IG1heFNhdGlzZnlpbmdcbmZ1bmN0aW9uIG1heFNhdGlzZnlpbmcgKHZlcnNpb25zLCByYW5nZSwgb3B0aW9ucykge1xuICB2YXIgbWF4ID0gbnVsbFxuICB2YXIgbWF4U1YgPSBudWxsXG4gIHRyeSB7XG4gICAgdmFyIHJhbmdlT2JqID0gbmV3IFJhbmdlKHJhbmdlLCBvcHRpb25zKVxuICB9IGNhdGNoIChlcikge1xuICAgIHJldHVybiBudWxsXG4gIH1cbiAgdmVyc2lvbnMuZm9yRWFjaChmdW5jdGlvbiAodikge1xuICAgIGlmIChyYW5nZU9iai50ZXN0KHYpKSB7XG4gICAgICAvLyBzYXRpc2ZpZXModiwgcmFuZ2UsIG9wdGlvbnMpXG4gICAgICBpZiAoIW1heCB8fCBtYXhTVi5jb21wYXJlKHYpID09PSAtMSkge1xuICAgICAgICAvLyBjb21wYXJlKG1heCwgdiwgdHJ1ZSlcbiAgICAgICAgbWF4ID0gdlxuICAgICAgICBtYXhTViA9IG5ldyBTZW1WZXIobWF4LCBvcHRpb25zKVxuICAgICAgfVxuICAgIH1cbiAgfSlcbiAgcmV0dXJuIG1heFxufVxuXG5leHBvcnRzLm1pblNhdGlzZnlpbmcgPSBtaW5TYXRpc2Z5aW5nXG5mdW5jdGlvbiBtaW5TYXRpc2Z5aW5nICh2ZXJzaW9ucywgcmFuZ2UsIG9wdGlvbnMpIHtcbiAgdmFyIG1pbiA9IG51bGxcbiAgdmFyIG1pblNWID0gbnVsbFxuICB0cnkge1xuICAgIHZhciByYW5nZU9iaiA9IG5ldyBSYW5nZShyYW5nZSwgb3B0aW9ucylcbiAgfSBjYXRjaCAoZXIpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG4gIHZlcnNpb25zLmZvckVhY2goZnVuY3Rpb24gKHYpIHtcbiAgICBpZiAocmFuZ2VPYmoudGVzdCh2KSkge1xuICAgICAgLy8gc2F0aXNmaWVzKHYsIHJhbmdlLCBvcHRpb25zKVxuICAgICAgaWYgKCFtaW4gfHwgbWluU1YuY29tcGFyZSh2KSA9PT0gMSkge1xuICAgICAgICAvLyBjb21wYXJlKG1pbiwgdiwgdHJ1ZSlcbiAgICAgICAgbWluID0gdlxuICAgICAgICBtaW5TViA9IG5ldyBTZW1WZXIobWluLCBvcHRpb25zKVxuICAgICAgfVxuICAgIH1cbiAgfSlcbiAgcmV0dXJuIG1pblxufVxuXG5leHBvcnRzLm1pblZlcnNpb24gPSBtaW5WZXJzaW9uXG5mdW5jdGlvbiBtaW5WZXJzaW9uIChyYW5nZSwgbG9vc2UpIHtcbiAgcmFuZ2UgPSBuZXcgUmFuZ2UocmFuZ2UsIGxvb3NlKVxuXG4gIHZhciBtaW52ZXIgPSBuZXcgU2VtVmVyKCcwLjAuMCcpXG4gIGlmIChyYW5nZS50ZXN0KG1pbnZlcikpIHtcbiAgICByZXR1cm4gbWludmVyXG4gIH1cblxuICBtaW52ZXIgPSBuZXcgU2VtVmVyKCcwLjAuMC0wJylcbiAgaWYgKHJhbmdlLnRlc3QobWludmVyKSkge1xuICAgIHJldHVybiBtaW52ZXJcbiAgfVxuXG4gIG1pbnZlciA9IG51bGxcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCByYW5nZS5zZXQubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgY29tcGFyYXRvcnMgPSByYW5nZS5zZXRbaV1cblxuICAgIGNvbXBhcmF0b3JzLmZvckVhY2goZnVuY3Rpb24gKGNvbXBhcmF0b3IpIHtcbiAgICAgIC8vIENsb25lIHRvIGF2b2lkIG1hbmlwdWxhdGluZyB0aGUgY29tcGFyYXRvcidzIHNlbXZlciBvYmplY3QuXG4gICAgICB2YXIgY29tcHZlciA9IG5ldyBTZW1WZXIoY29tcGFyYXRvci5zZW12ZXIudmVyc2lvbilcbiAgICAgIHN3aXRjaCAoY29tcGFyYXRvci5vcGVyYXRvcikge1xuICAgICAgICBjYXNlICc+JzpcbiAgICAgICAgICBpZiAoY29tcHZlci5wcmVyZWxlYXNlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgY29tcHZlci5wYXRjaCsrXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbXB2ZXIucHJlcmVsZWFzZS5wdXNoKDApXG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbXB2ZXIucmF3ID0gY29tcHZlci5mb3JtYXQoKVxuICAgICAgICAgIC8qIGZhbGx0aHJvdWdoICovXG4gICAgICAgIGNhc2UgJyc6XG4gICAgICAgIGNhc2UgJz49JzpcbiAgICAgICAgICBpZiAoIW1pbnZlciB8fCBndChtaW52ZXIsIGNvbXB2ZXIpKSB7XG4gICAgICAgICAgICBtaW52ZXIgPSBjb21wdmVyXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgJzwnOlxuICAgICAgICBjYXNlICc8PSc6XG4gICAgICAgICAgLyogSWdub3JlIG1heGltdW0gdmVyc2lvbnMgKi9cbiAgICAgICAgICBicmVha1xuICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5leHBlY3RlZCBvcGVyYXRpb246ICcgKyBjb21wYXJhdG9yLm9wZXJhdG9yKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBpZiAobWludmVyICYmIHJhbmdlLnRlc3QobWludmVyKSkge1xuICAgIHJldHVybiBtaW52ZXJcbiAgfVxuXG4gIHJldHVybiBudWxsXG59XG5cbmV4cG9ydHMudmFsaWRSYW5nZSA9IHZhbGlkUmFuZ2VcbmZ1bmN0aW9uIHZhbGlkUmFuZ2UgKHJhbmdlLCBvcHRpb25zKSB7XG4gIHRyeSB7XG4gICAgLy8gUmV0dXJuICcqJyBpbnN0ZWFkIG9mICcnIHNvIHRoYXQgdHJ1dGhpbmVzcyB3b3Jrcy5cbiAgICAvLyBUaGlzIHdpbGwgdGhyb3cgaWYgaXQncyBpbnZhbGlkIGFueXdheVxuICAgIHJldHVybiBuZXcgUmFuZ2UocmFuZ2UsIG9wdGlvbnMpLnJhbmdlIHx8ICcqJ1xuICB9IGNhdGNoIChlcikge1xuICAgIHJldHVybiBudWxsXG4gIH1cbn1cblxuLy8gRGV0ZXJtaW5lIGlmIHZlcnNpb24gaXMgbGVzcyB0aGFuIGFsbCB0aGUgdmVyc2lvbnMgcG9zc2libGUgaW4gdGhlIHJhbmdlXG5leHBvcnRzLmx0ciA9IGx0clxuZnVuY3Rpb24gbHRyICh2ZXJzaW9uLCByYW5nZSwgb3B0aW9ucykge1xuICByZXR1cm4gb3V0c2lkZSh2ZXJzaW9uLCByYW5nZSwgJzwnLCBvcHRpb25zKVxufVxuXG4vLyBEZXRlcm1pbmUgaWYgdmVyc2lvbiBpcyBncmVhdGVyIHRoYW4gYWxsIHRoZSB2ZXJzaW9ucyBwb3NzaWJsZSBpbiB0aGUgcmFuZ2UuXG5leHBvcnRzLmd0ciA9IGd0clxuZnVuY3Rpb24gZ3RyICh2ZXJzaW9uLCByYW5nZSwgb3B0aW9ucykge1xuICByZXR1cm4gb3V0c2lkZSh2ZXJzaW9uLCByYW5nZSwgJz4nLCBvcHRpb25zKVxufVxuXG5leHBvcnRzLm91dHNpZGUgPSBvdXRzaWRlXG5mdW5jdGlvbiBvdXRzaWRlICh2ZXJzaW9uLCByYW5nZSwgaGlsbywgb3B0aW9ucykge1xuICB2ZXJzaW9uID0gbmV3IFNlbVZlcih2ZXJzaW9uLCBvcHRpb25zKVxuICByYW5nZSA9IG5ldyBSYW5nZShyYW5nZSwgb3B0aW9ucylcblxuICB2YXIgZ3RmbiwgbHRlZm4sIGx0Zm4sIGNvbXAsIGVjb21wXG4gIHN3aXRjaCAoaGlsbykge1xuICAgIGNhc2UgJz4nOlxuICAgICAgZ3RmbiA9IGd0XG4gICAgICBsdGVmbiA9IGx0ZVxuICAgICAgbHRmbiA9IGx0XG4gICAgICBjb21wID0gJz4nXG4gICAgICBlY29tcCA9ICc+PSdcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnPCc6XG4gICAgICBndGZuID0gbHRcbiAgICAgIGx0ZWZuID0gZ3RlXG4gICAgICBsdGZuID0gZ3RcbiAgICAgIGNvbXAgPSAnPCdcbiAgICAgIGVjb21wID0gJzw9J1xuICAgICAgYnJlYWtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignTXVzdCBwcm92aWRlIGEgaGlsbyB2YWwgb2YgXCI8XCIgb3IgXCI+XCInKVxuICB9XG5cbiAgLy8gSWYgaXQgc2F0aXNpZmVzIHRoZSByYW5nZSBpdCBpcyBub3Qgb3V0c2lkZVxuICBpZiAoc2F0aXNmaWVzKHZlcnNpb24sIHJhbmdlLCBvcHRpb25zKSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgLy8gRnJvbSBub3cgb24sIHZhcmlhYmxlIHRlcm1zIGFyZSBhcyBpZiB3ZSdyZSBpbiBcImd0clwiIG1vZGUuXG4gIC8vIGJ1dCBub3RlIHRoYXQgZXZlcnl0aGluZyBpcyBmbGlwcGVkIGZvciB0aGUgXCJsdHJcIiBmdW5jdGlvbi5cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHJhbmdlLnNldC5sZW5ndGg7ICsraSkge1xuICAgIHZhciBjb21wYXJhdG9ycyA9IHJhbmdlLnNldFtpXVxuXG4gICAgdmFyIGhpZ2ggPSBudWxsXG4gICAgdmFyIGxvdyA9IG51bGxcblxuICAgIGNvbXBhcmF0b3JzLmZvckVhY2goZnVuY3Rpb24gKGNvbXBhcmF0b3IpIHtcbiAgICAgIGlmIChjb21wYXJhdG9yLnNlbXZlciA9PT0gQU5ZKSB7XG4gICAgICAgIGNvbXBhcmF0b3IgPSBuZXcgQ29tcGFyYXRvcignPj0wLjAuMCcpXG4gICAgICB9XG4gICAgICBoaWdoID0gaGlnaCB8fCBjb21wYXJhdG9yXG4gICAgICBsb3cgPSBsb3cgfHwgY29tcGFyYXRvclxuICAgICAgaWYgKGd0Zm4oY29tcGFyYXRvci5zZW12ZXIsIGhpZ2guc2VtdmVyLCBvcHRpb25zKSkge1xuICAgICAgICBoaWdoID0gY29tcGFyYXRvclxuICAgICAgfSBlbHNlIGlmIChsdGZuKGNvbXBhcmF0b3Iuc2VtdmVyLCBsb3cuc2VtdmVyLCBvcHRpb25zKSkge1xuICAgICAgICBsb3cgPSBjb21wYXJhdG9yXG4gICAgICB9XG4gICAgfSlcblxuICAgIC8vIElmIHRoZSBlZGdlIHZlcnNpb24gY29tcGFyYXRvciBoYXMgYSBvcGVyYXRvciB0aGVuIG91ciB2ZXJzaW9uXG4gICAgLy8gaXNuJ3Qgb3V0c2lkZSBpdFxuICAgIGlmIChoaWdoLm9wZXJhdG9yID09PSBjb21wIHx8IGhpZ2gub3BlcmF0b3IgPT09IGVjb21wKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgbG93ZXN0IHZlcnNpb24gY29tcGFyYXRvciBoYXMgYW4gb3BlcmF0b3IgYW5kIG91ciB2ZXJzaW9uXG4gICAgLy8gaXMgbGVzcyB0aGFuIGl0IHRoZW4gaXQgaXNuJ3QgaGlnaGVyIHRoYW4gdGhlIHJhbmdlXG4gICAgaWYgKCghbG93Lm9wZXJhdG9yIHx8IGxvdy5vcGVyYXRvciA9PT0gY29tcCkgJiZcbiAgICAgICAgbHRlZm4odmVyc2lvbiwgbG93LnNlbXZlcikpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH0gZWxzZSBpZiAobG93Lm9wZXJhdG9yID09PSBlY29tcCAmJiBsdGZuKHZlcnNpb24sIGxvdy5zZW12ZXIpKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWVcbn1cblxuZXhwb3J0cy5wcmVyZWxlYXNlID0gcHJlcmVsZWFzZVxuZnVuY3Rpb24gcHJlcmVsZWFzZSAodmVyc2lvbiwgb3B0aW9ucykge1xuICB2YXIgcGFyc2VkID0gcGFyc2UodmVyc2lvbiwgb3B0aW9ucylcbiAgcmV0dXJuIChwYXJzZWQgJiYgcGFyc2VkLnByZXJlbGVhc2UubGVuZ3RoKSA/IHBhcnNlZC5wcmVyZWxlYXNlIDogbnVsbFxufVxuXG5leHBvcnRzLmludGVyc2VjdHMgPSBpbnRlcnNlY3RzXG5mdW5jdGlvbiBpbnRlcnNlY3RzIChyMSwgcjIsIG9wdGlvbnMpIHtcbiAgcjEgPSBuZXcgUmFuZ2UocjEsIG9wdGlvbnMpXG4gIHIyID0gbmV3IFJhbmdlKHIyLCBvcHRpb25zKVxuICByZXR1cm4gcjEuaW50ZXJzZWN0cyhyMilcbn1cblxuZXhwb3J0cy5jb2VyY2UgPSBjb2VyY2VcbmZ1bmN0aW9uIGNvZXJjZSAodmVyc2lvbiwgb3B0aW9ucykge1xuICBpZiAodmVyc2lvbiBpbnN0YW5jZW9mIFNlbVZlcikge1xuICAgIHJldHVybiB2ZXJzaW9uXG4gIH1cblxuICBpZiAodHlwZW9mIHZlcnNpb24gPT09ICdudW1iZXInKSB7XG4gICAgdmVyc2lvbiA9IFN0cmluZyh2ZXJzaW9uKVxuICB9XG5cbiAgaWYgKHR5cGVvZiB2ZXJzaW9uICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBudWxsXG4gIH1cblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuXG4gIHZhciBtYXRjaCA9IG51bGxcbiAgaWYgKCFvcHRpb25zLnJ0bCkge1xuICAgIG1hdGNoID0gdmVyc2lvbi5tYXRjaChyZVt0LkNPRVJDRV0pXG4gIH0gZWxzZSB7XG4gICAgLy8gRmluZCB0aGUgcmlnaHQtbW9zdCBjb2VyY2libGUgc3RyaW5nIHRoYXQgZG9lcyBub3Qgc2hhcmVcbiAgICAvLyBhIHRlcm1pbnVzIHdpdGggYSBtb3JlIGxlZnQtd2FyZCBjb2VyY2libGUgc3RyaW5nLlxuICAgIC8vIEVnLCAnMS4yLjMuNCcgd2FudHMgdG8gY29lcmNlICcyLjMuNCcsIG5vdCAnMy40JyBvciAnNCdcbiAgICAvL1xuICAgIC8vIFdhbGsgdGhyb3VnaCB0aGUgc3RyaW5nIGNoZWNraW5nIHdpdGggYSAvZyByZWdleHBcbiAgICAvLyBNYW51YWxseSBzZXQgdGhlIGluZGV4IHNvIGFzIHRvIHBpY2sgdXAgb3ZlcmxhcHBpbmcgbWF0Y2hlcy5cbiAgICAvLyBTdG9wIHdoZW4gd2UgZ2V0IGEgbWF0Y2ggdGhhdCBlbmRzIGF0IHRoZSBzdHJpbmcgZW5kLCBzaW5jZSBub1xuICAgIC8vIGNvZXJjaWJsZSBzdHJpbmcgY2FuIGJlIG1vcmUgcmlnaHQtd2FyZCB3aXRob3V0IHRoZSBzYW1lIHRlcm1pbnVzLlxuICAgIHZhciBuZXh0XG4gICAgd2hpbGUgKChuZXh0ID0gcmVbdC5DT0VSQ0VSVExdLmV4ZWModmVyc2lvbikpICYmXG4gICAgICAoIW1hdGNoIHx8IG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoICE9PSB2ZXJzaW9uLmxlbmd0aClcbiAgICApIHtcbiAgICAgIGlmICghbWF0Y2ggfHxcbiAgICAgICAgICBuZXh0LmluZGV4ICsgbmV4dFswXS5sZW5ndGggIT09IG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoKSB7XG4gICAgICAgIG1hdGNoID0gbmV4dFxuICAgICAgfVxuICAgICAgcmVbdC5DT0VSQ0VSVExdLmxhc3RJbmRleCA9IG5leHQuaW5kZXggKyBuZXh0WzFdLmxlbmd0aCArIG5leHRbMl0ubGVuZ3RoXG4gICAgfVxuICAgIC8vIGxlYXZlIGl0IGluIGEgY2xlYW4gc3RhdGVcbiAgICByZVt0LkNPRVJDRVJUTF0ubGFzdEluZGV4ID0gLTFcbiAgfVxuXG4gIGlmIChtYXRjaCA9PT0gbnVsbCkge1xuICAgIHJldHVybiBudWxsXG4gIH1cblxuICByZXR1cm4gcGFyc2UobWF0Y2hbMl0gK1xuICAgICcuJyArIChtYXRjaFszXSB8fCAnMCcpICtcbiAgICAnLicgKyAobWF0Y2hbNF0gfHwgJzAnKSwgb3B0aW9ucylcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvdHVubmVsJyk7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBuZXQgPSByZXF1aXJlKCduZXQnKTtcbnZhciB0bHMgPSByZXF1aXJlKCd0bHMnKTtcbnZhciBodHRwID0gcmVxdWlyZSgnaHR0cCcpO1xudmFyIGh0dHBzID0gcmVxdWlyZSgnaHR0cHMnKTtcbnZhciBldmVudHMgPSByZXF1aXJlKCdldmVudHMnKTtcbnZhciBhc3NlcnQgPSByZXF1aXJlKCdhc3NlcnQnKTtcbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbCcpO1xuXG5cbmV4cG9ydHMuaHR0cE92ZXJIdHRwID0gaHR0cE92ZXJIdHRwO1xuZXhwb3J0cy5odHRwc092ZXJIdHRwID0gaHR0cHNPdmVySHR0cDtcbmV4cG9ydHMuaHR0cE92ZXJIdHRwcyA9IGh0dHBPdmVySHR0cHM7XG5leHBvcnRzLmh0dHBzT3Zlckh0dHBzID0gaHR0cHNPdmVySHR0cHM7XG5cblxuZnVuY3Rpb24gaHR0cE92ZXJIdHRwKG9wdGlvbnMpIHtcbiAgdmFyIGFnZW50ID0gbmV3IFR1bm5lbGluZ0FnZW50KG9wdGlvbnMpO1xuICBhZ2VudC5yZXF1ZXN0ID0gaHR0cC5yZXF1ZXN0O1xuICByZXR1cm4gYWdlbnQ7XG59XG5cbmZ1bmN0aW9uIGh0dHBzT3Zlckh0dHAob3B0aW9ucykge1xuICB2YXIgYWdlbnQgPSBuZXcgVHVubmVsaW5nQWdlbnQob3B0aW9ucyk7XG4gIGFnZW50LnJlcXVlc3QgPSBodHRwLnJlcXVlc3Q7XG4gIGFnZW50LmNyZWF0ZVNvY2tldCA9IGNyZWF0ZVNlY3VyZVNvY2tldDtcbiAgcmV0dXJuIGFnZW50O1xufVxuXG5mdW5jdGlvbiBodHRwT3Zlckh0dHBzKG9wdGlvbnMpIHtcbiAgdmFyIGFnZW50ID0gbmV3IFR1bm5lbGluZ0FnZW50KG9wdGlvbnMpO1xuICBhZ2VudC5yZXF1ZXN0ID0gaHR0cHMucmVxdWVzdDtcbiAgcmV0dXJuIGFnZW50O1xufVxuXG5mdW5jdGlvbiBodHRwc092ZXJIdHRwcyhvcHRpb25zKSB7XG4gIHZhciBhZ2VudCA9IG5ldyBUdW5uZWxpbmdBZ2VudChvcHRpb25zKTtcbiAgYWdlbnQucmVxdWVzdCA9IGh0dHBzLnJlcXVlc3Q7XG4gIGFnZW50LmNyZWF0ZVNvY2tldCA9IGNyZWF0ZVNlY3VyZVNvY2tldDtcbiAgcmV0dXJuIGFnZW50O1xufVxuXG5cbmZ1bmN0aW9uIFR1bm5lbGluZ0FnZW50KG9wdGlvbnMpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICBzZWxmLm9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBzZWxmLnByb3h5T3B0aW9ucyA9IHNlbGYub3B0aW9ucy5wcm94eSB8fCB7fTtcbiAgc2VsZi5tYXhTb2NrZXRzID0gc2VsZi5vcHRpb25zLm1heFNvY2tldHMgfHwgaHR0cC5BZ2VudC5kZWZhdWx0TWF4U29ja2V0cztcbiAgc2VsZi5yZXF1ZXN0cyA9IFtdO1xuICBzZWxmLnNvY2tldHMgPSBbXTtcblxuICBzZWxmLm9uKCdmcmVlJywgZnVuY3Rpb24gb25GcmVlKHNvY2tldCwgaG9zdCwgcG9ydCwgbG9jYWxBZGRyZXNzKSB7XG4gICAgdmFyIG9wdGlvbnMgPSB0b09wdGlvbnMoaG9zdCwgcG9ydCwgbG9jYWxBZGRyZXNzKTtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gc2VsZi5yZXF1ZXN0cy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgICAgdmFyIHBlbmRpbmcgPSBzZWxmLnJlcXVlc3RzW2ldO1xuICAgICAgaWYgKHBlbmRpbmcuaG9zdCA9PT0gb3B0aW9ucy5ob3N0ICYmIHBlbmRpbmcucG9ydCA9PT0gb3B0aW9ucy5wb3J0KSB7XG4gICAgICAgIC8vIERldGVjdCB0aGUgcmVxdWVzdCB0byBjb25uZWN0IHNhbWUgb3JpZ2luIHNlcnZlcixcbiAgICAgICAgLy8gcmV1c2UgdGhlIGNvbm5lY3Rpb24uXG4gICAgICAgIHNlbGYucmVxdWVzdHMuc3BsaWNlKGksIDEpO1xuICAgICAgICBwZW5kaW5nLnJlcXVlc3Qub25Tb2NrZXQoc29ja2V0KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgICBzb2NrZXQuZGVzdHJveSgpO1xuICAgIHNlbGYucmVtb3ZlU29ja2V0KHNvY2tldCk7XG4gIH0pO1xufVxudXRpbC5pbmhlcml0cyhUdW5uZWxpbmdBZ2VudCwgZXZlbnRzLkV2ZW50RW1pdHRlcik7XG5cblR1bm5lbGluZ0FnZW50LnByb3RvdHlwZS5hZGRSZXF1ZXN0ID0gZnVuY3Rpb24gYWRkUmVxdWVzdChyZXEsIGhvc3QsIHBvcnQsIGxvY2FsQWRkcmVzcykge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIHZhciBvcHRpb25zID0gbWVyZ2VPcHRpb25zKHtyZXF1ZXN0OiByZXF9LCBzZWxmLm9wdGlvbnMsIHRvT3B0aW9ucyhob3N0LCBwb3J0LCBsb2NhbEFkZHJlc3MpKTtcblxuICBpZiAoc2VsZi5zb2NrZXRzLmxlbmd0aCA+PSB0aGlzLm1heFNvY2tldHMpIHtcbiAgICAvLyBXZSBhcmUgb3ZlciBsaW1pdCBzbyB3ZSdsbCBhZGQgaXQgdG8gdGhlIHF1ZXVlLlxuICAgIHNlbGYucmVxdWVzdHMucHVzaChvcHRpb25zKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBJZiB3ZSBhcmUgdW5kZXIgbWF4U29ja2V0cyBjcmVhdGUgYSBuZXcgb25lLlxuICBzZWxmLmNyZWF0ZVNvY2tldChvcHRpb25zLCBmdW5jdGlvbihzb2NrZXQpIHtcbiAgICBzb2NrZXQub24oJ2ZyZWUnLCBvbkZyZWUpO1xuICAgIHNvY2tldC5vbignY2xvc2UnLCBvbkNsb3NlT3JSZW1vdmUpO1xuICAgIHNvY2tldC5vbignYWdlbnRSZW1vdmUnLCBvbkNsb3NlT3JSZW1vdmUpO1xuICAgIHJlcS5vblNvY2tldChzb2NrZXQpO1xuXG4gICAgZnVuY3Rpb24gb25GcmVlKCkge1xuICAgICAgc2VsZi5lbWl0KCdmcmVlJywgc29ja2V0LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbkNsb3NlT3JSZW1vdmUoZXJyKSB7XG4gICAgICBzZWxmLnJlbW92ZVNvY2tldChzb2NrZXQpO1xuICAgICAgc29ja2V0LnJlbW92ZUxpc3RlbmVyKCdmcmVlJywgb25GcmVlKTtcbiAgICAgIHNvY2tldC5yZW1vdmVMaXN0ZW5lcignY2xvc2UnLCBvbkNsb3NlT3JSZW1vdmUpO1xuICAgICAgc29ja2V0LnJlbW92ZUxpc3RlbmVyKCdhZ2VudFJlbW92ZScsIG9uQ2xvc2VPclJlbW92ZSk7XG4gICAgfVxuICB9KTtcbn07XG5cblR1bm5lbGluZ0FnZW50LnByb3RvdHlwZS5jcmVhdGVTb2NrZXQgPSBmdW5jdGlvbiBjcmVhdGVTb2NrZXQob3B0aW9ucywgY2IpIHtcbiAgdmFyIHNlbGYgPSB0aGlzO1xuICB2YXIgcGxhY2Vob2xkZXIgPSB7fTtcbiAgc2VsZi5zb2NrZXRzLnB1c2gocGxhY2Vob2xkZXIpO1xuXG4gIHZhciBjb25uZWN0T3B0aW9ucyA9IG1lcmdlT3B0aW9ucyh7fSwgc2VsZi5wcm94eU9wdGlvbnMsIHtcbiAgICBtZXRob2Q6ICdDT05ORUNUJyxcbiAgICBwYXRoOiBvcHRpb25zLmhvc3QgKyAnOicgKyBvcHRpb25zLnBvcnQsXG4gICAgYWdlbnQ6IGZhbHNlXG4gIH0pO1xuICBpZiAoY29ubmVjdE9wdGlvbnMucHJveHlBdXRoKSB7XG4gICAgY29ubmVjdE9wdGlvbnMuaGVhZGVycyA9IGNvbm5lY3RPcHRpb25zLmhlYWRlcnMgfHwge307XG4gICAgY29ubmVjdE9wdGlvbnMuaGVhZGVyc1snUHJveHktQXV0aG9yaXphdGlvbiddID0gJ0Jhc2ljICcgK1xuICAgICAgICBuZXcgQnVmZmVyKGNvbm5lY3RPcHRpb25zLnByb3h5QXV0aCkudG9TdHJpbmcoJ2Jhc2U2NCcpO1xuICB9XG5cbiAgZGVidWcoJ21ha2luZyBDT05ORUNUIHJlcXVlc3QnKTtcbiAgdmFyIGNvbm5lY3RSZXEgPSBzZWxmLnJlcXVlc3QoY29ubmVjdE9wdGlvbnMpO1xuICBjb25uZWN0UmVxLnVzZUNodW5rZWRFbmNvZGluZ0J5RGVmYXVsdCA9IGZhbHNlOyAvLyBmb3IgdjAuNlxuICBjb25uZWN0UmVxLm9uY2UoJ3Jlc3BvbnNlJywgb25SZXNwb25zZSk7IC8vIGZvciB2MC42XG4gIGNvbm5lY3RSZXEub25jZSgndXBncmFkZScsIG9uVXBncmFkZSk7ICAgLy8gZm9yIHYwLjZcbiAgY29ubmVjdFJlcS5vbmNlKCdjb25uZWN0Jywgb25Db25uZWN0KTsgICAvLyBmb3IgdjAuNyBvciBsYXRlclxuICBjb25uZWN0UmVxLm9uY2UoJ2Vycm9yJywgb25FcnJvcik7XG4gIGNvbm5lY3RSZXEuZW5kKCk7XG5cbiAgZnVuY3Rpb24gb25SZXNwb25zZShyZXMpIHtcbiAgICAvLyBWZXJ5IGhhY2t5LiBUaGlzIGlzIG5lY2Vzc2FyeSB0byBhdm9pZCBodHRwLXBhcnNlciBsZWFrcy5cbiAgICByZXMudXBncmFkZSA9IHRydWU7XG4gIH1cblxuICBmdW5jdGlvbiBvblVwZ3JhZGUocmVzLCBzb2NrZXQsIGhlYWQpIHtcbiAgICAvLyBIYWNreS5cbiAgICBwcm9jZXNzLm5leHRUaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgb25Db25uZWN0KHJlcywgc29ja2V0LCBoZWFkKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uQ29ubmVjdChyZXMsIHNvY2tldCwgaGVhZCkge1xuICAgIGNvbm5lY3RSZXEucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG4gICAgc29ja2V0LnJlbW92ZUFsbExpc3RlbmVycygpO1xuXG4gICAgaWYgKHJlcy5zdGF0dXNDb2RlID09PSAyMDApIHtcbiAgICAgIGFzc2VydC5lcXVhbChoZWFkLmxlbmd0aCwgMCk7XG4gICAgICBkZWJ1ZygndHVubmVsaW5nIGNvbm5lY3Rpb24gaGFzIGVzdGFibGlzaGVkJyk7XG4gICAgICBzZWxmLnNvY2tldHNbc2VsZi5zb2NrZXRzLmluZGV4T2YocGxhY2Vob2xkZXIpXSA9IHNvY2tldDtcbiAgICAgIGNiKHNvY2tldCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlYnVnKCd0dW5uZWxpbmcgc29ja2V0IGNvdWxkIG5vdCBiZSBlc3RhYmxpc2hlZCwgc3RhdHVzQ29kZT0lZCcsXG4gICAgICAgICAgICByZXMuc3RhdHVzQ29kZSk7XG4gICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IoJ3R1bm5lbGluZyBzb2NrZXQgY291bGQgbm90IGJlIGVzdGFibGlzaGVkLCAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc3RhdHVzQ29kZT0nICsgcmVzLnN0YXR1c0NvZGUpO1xuICAgICAgZXJyb3IuY29kZSA9ICdFQ09OTlJFU0VUJztcbiAgICAgIG9wdGlvbnMucmVxdWVzdC5lbWl0KCdlcnJvcicsIGVycm9yKTtcbiAgICAgIHNlbGYucmVtb3ZlU29ja2V0KHBsYWNlaG9sZGVyKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvbkVycm9yKGNhdXNlKSB7XG4gICAgY29ubmVjdFJlcS5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcblxuICAgIGRlYnVnKCd0dW5uZWxpbmcgc29ja2V0IGNvdWxkIG5vdCBiZSBlc3RhYmxpc2hlZCwgY2F1c2U9JXNcXG4nLFxuICAgICAgICAgIGNhdXNlLm1lc3NhZ2UsIGNhdXNlLnN0YWNrKTtcbiAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IoJ3R1bm5lbGluZyBzb2NrZXQgY291bGQgbm90IGJlIGVzdGFibGlzaGVkLCAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ2NhdXNlPScgKyBjYXVzZS5tZXNzYWdlKTtcbiAgICBlcnJvci5jb2RlID0gJ0VDT05OUkVTRVQnO1xuICAgIG9wdGlvbnMucmVxdWVzdC5lbWl0KCdlcnJvcicsIGVycm9yKTtcbiAgICBzZWxmLnJlbW92ZVNvY2tldChwbGFjZWhvbGRlcik7XG4gIH1cbn07XG5cblR1bm5lbGluZ0FnZW50LnByb3RvdHlwZS5yZW1vdmVTb2NrZXQgPSBmdW5jdGlvbiByZW1vdmVTb2NrZXQoc29ja2V0KSB7XG4gIHZhciBwb3MgPSB0aGlzLnNvY2tldHMuaW5kZXhPZihzb2NrZXQpXG4gIGlmIChwb3MgPT09IC0xKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMuc29ja2V0cy5zcGxpY2UocG9zLCAxKTtcblxuICB2YXIgcGVuZGluZyA9IHRoaXMucmVxdWVzdHMuc2hpZnQoKTtcbiAgaWYgKHBlbmRpbmcpIHtcbiAgICAvLyBJZiB3ZSBoYXZlIHBlbmRpbmcgcmVxdWVzdHMgYW5kIGEgc29ja2V0IGdldHMgY2xvc2VkIGEgbmV3IG9uZVxuICAgIC8vIG5lZWRzIHRvIGJlIGNyZWF0ZWQgdG8gdGFrZSBvdmVyIGluIHRoZSBwb29sIGZvciB0aGUgb25lIHRoYXQgY2xvc2VkLlxuICAgIHRoaXMuY3JlYXRlU29ja2V0KHBlbmRpbmcsIGZ1bmN0aW9uKHNvY2tldCkge1xuICAgICAgcGVuZGluZy5yZXF1ZXN0Lm9uU29ja2V0KHNvY2tldCk7XG4gICAgfSk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZVNlY3VyZVNvY2tldChvcHRpb25zLCBjYikge1xuICB2YXIgc2VsZiA9IHRoaXM7XG4gIFR1bm5lbGluZ0FnZW50LnByb3RvdHlwZS5jcmVhdGVTb2NrZXQuY2FsbChzZWxmLCBvcHRpb25zLCBmdW5jdGlvbihzb2NrZXQpIHtcbiAgICB2YXIgaG9zdEhlYWRlciA9IG9wdGlvbnMucmVxdWVzdC5nZXRIZWFkZXIoJ2hvc3QnKTtcbiAgICB2YXIgdGxzT3B0aW9ucyA9IG1lcmdlT3B0aW9ucyh7fSwgc2VsZi5vcHRpb25zLCB7XG4gICAgICBzb2NrZXQ6IHNvY2tldCxcbiAgICAgIHNlcnZlcm5hbWU6IGhvc3RIZWFkZXIgPyBob3N0SGVhZGVyLnJlcGxhY2UoLzouKiQvLCAnJykgOiBvcHRpb25zLmhvc3RcbiAgICB9KTtcblxuICAgIC8vIDAgaXMgZHVtbXkgcG9ydCBmb3IgdjAuNlxuICAgIHZhciBzZWN1cmVTb2NrZXQgPSB0bHMuY29ubmVjdCgwLCB0bHNPcHRpb25zKTtcbiAgICBzZWxmLnNvY2tldHNbc2VsZi5zb2NrZXRzLmluZGV4T2Yoc29ja2V0KV0gPSBzZWN1cmVTb2NrZXQ7XG4gICAgY2Ioc2VjdXJlU29ja2V0KTtcbiAgfSk7XG59XG5cblxuZnVuY3Rpb24gdG9PcHRpb25zKGhvc3QsIHBvcnQsIGxvY2FsQWRkcmVzcykge1xuICBpZiAodHlwZW9mIGhvc3QgPT09ICdzdHJpbmcnKSB7IC8vIHNpbmNlIHYwLjEwXG4gICAgcmV0dXJuIHtcbiAgICAgIGhvc3Q6IGhvc3QsXG4gICAgICBwb3J0OiBwb3J0LFxuICAgICAgbG9jYWxBZGRyZXNzOiBsb2NhbEFkZHJlc3NcbiAgICB9O1xuICB9XG4gIHJldHVybiBob3N0OyAvLyBmb3IgdjAuMTEgb3IgbGF0ZXJcbn1cblxuZnVuY3Rpb24gbWVyZ2VPcHRpb25zKHRhcmdldCkge1xuICBmb3IgKHZhciBpID0gMSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgdmFyIG92ZXJyaWRlcyA9IGFyZ3VtZW50c1tpXTtcbiAgICBpZiAodHlwZW9mIG92ZXJyaWRlcyA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMob3ZlcnJpZGVzKTtcbiAgICAgIGZvciAodmFyIGogPSAwLCBrZXlMZW4gPSBrZXlzLmxlbmd0aDsgaiA8IGtleUxlbjsgKytqKSB7XG4gICAgICAgIHZhciBrID0ga2V5c1tqXTtcbiAgICAgICAgaWYgKG92ZXJyaWRlc1trXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGFyZ2V0W2tdID0gb3ZlcnJpZGVzW2tdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB0YXJnZXQ7XG59XG5cblxudmFyIGRlYnVnO1xuaWYgKHByb2Nlc3MuZW52Lk5PREVfREVCVUcgJiYgL1xcYnR1bm5lbFxcYi8udGVzdChwcm9jZXNzLmVudi5OT0RFX0RFQlVHKSkge1xuICBkZWJ1ZyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICBpZiAodHlwZW9mIGFyZ3NbMF0gPT09ICdzdHJpbmcnKSB7XG4gICAgICBhcmdzWzBdID0gJ1RVTk5FTDogJyArIGFyZ3NbMF07XG4gICAgfSBlbHNlIHtcbiAgICAgIGFyZ3MudW5zaGlmdCgnVFVOTkVMOicpO1xuICAgIH1cbiAgICBjb25zb2xlLmVycm9yLmFwcGx5KGNvbnNvbGUsIGFyZ3MpO1xuICB9XG59IGVsc2Uge1xuICBkZWJ1ZyA9IGZ1bmN0aW9uKCkge307XG59XG5leHBvcnRzLmRlYnVnID0gZGVidWc7IC8vIGZvciB0ZXN0XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0LiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlIGluIHRoZSBwcm9qZWN0IHJvb3QgZm9yIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbi5cbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUocmVzdWx0LnZhbHVlKTsgfSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgdXJsID0gcmVxdWlyZShcInVybFwiKTtcbmNvbnN0IGh0dHAgPSByZXF1aXJlKFwiaHR0cFwiKTtcbmNvbnN0IGh0dHBzID0gcmVxdWlyZShcImh0dHBzXCIpO1xubGV0IGZzO1xubGV0IHR1bm5lbDtcbnZhciBIdHRwQ29kZXM7XG4oZnVuY3Rpb24gKEh0dHBDb2Rlcykge1xuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJPS1wiXSA9IDIwMF0gPSBcIk9LXCI7XG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIk11bHRpcGxlQ2hvaWNlc1wiXSA9IDMwMF0gPSBcIk11bHRpcGxlQ2hvaWNlc1wiO1xuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJNb3ZlZFBlcm1hbmVudGx5XCJdID0gMzAxXSA9IFwiTW92ZWRQZXJtYW5lbnRseVwiO1xuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJSZXNvdXJjZU1vdmVkXCJdID0gMzAyXSA9IFwiUmVzb3VyY2VNb3ZlZFwiO1xuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJTZWVPdGhlclwiXSA9IDMwM10gPSBcIlNlZU90aGVyXCI7XG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIk5vdE1vZGlmaWVkXCJdID0gMzA0XSA9IFwiTm90TW9kaWZpZWRcIjtcbiAgICBIdHRwQ29kZXNbSHR0cENvZGVzW1wiVXNlUHJveHlcIl0gPSAzMDVdID0gXCJVc2VQcm94eVwiO1xuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJTd2l0Y2hQcm94eVwiXSA9IDMwNl0gPSBcIlN3aXRjaFByb3h5XCI7XG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIlRlbXBvcmFyeVJlZGlyZWN0XCJdID0gMzA3XSA9IFwiVGVtcG9yYXJ5UmVkaXJlY3RcIjtcbiAgICBIdHRwQ29kZXNbSHR0cENvZGVzW1wiUGVybWFuZW50UmVkaXJlY3RcIl0gPSAzMDhdID0gXCJQZXJtYW5lbnRSZWRpcmVjdFwiO1xuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJCYWRSZXF1ZXN0XCJdID0gNDAwXSA9IFwiQmFkUmVxdWVzdFwiO1xuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJVbmF1dGhvcml6ZWRcIl0gPSA0MDFdID0gXCJVbmF1dGhvcml6ZWRcIjtcbiAgICBIdHRwQ29kZXNbSHR0cENvZGVzW1wiUGF5bWVudFJlcXVpcmVkXCJdID0gNDAyXSA9IFwiUGF5bWVudFJlcXVpcmVkXCI7XG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIkZvcmJpZGRlblwiXSA9IDQwM10gPSBcIkZvcmJpZGRlblwiO1xuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJOb3RGb3VuZFwiXSA9IDQwNF0gPSBcIk5vdEZvdW5kXCI7XG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIk1ldGhvZE5vdEFsbG93ZWRcIl0gPSA0MDVdID0gXCJNZXRob2ROb3RBbGxvd2VkXCI7XG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIk5vdEFjY2VwdGFibGVcIl0gPSA0MDZdID0gXCJOb3RBY2NlcHRhYmxlXCI7XG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIlByb3h5QXV0aGVudGljYXRpb25SZXF1aXJlZFwiXSA9IDQwN10gPSBcIlByb3h5QXV0aGVudGljYXRpb25SZXF1aXJlZFwiO1xuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJSZXF1ZXN0VGltZW91dFwiXSA9IDQwOF0gPSBcIlJlcXVlc3RUaW1lb3V0XCI7XG4gICAgSHR0cENvZGVzW0h0dHBDb2Rlc1tcIkNvbmZsaWN0XCJdID0gNDA5XSA9IFwiQ29uZmxpY3RcIjtcbiAgICBIdHRwQ29kZXNbSHR0cENvZGVzW1wiR29uZVwiXSA9IDQxMF0gPSBcIkdvbmVcIjtcbiAgICBIdHRwQ29kZXNbSHR0cENvZGVzW1wiSW50ZXJuYWxTZXJ2ZXJFcnJvclwiXSA9IDUwMF0gPSBcIkludGVybmFsU2VydmVyRXJyb3JcIjtcbiAgICBIdHRwQ29kZXNbSHR0cENvZGVzW1wiTm90SW1wbGVtZW50ZWRcIl0gPSA1MDFdID0gXCJOb3RJbXBsZW1lbnRlZFwiO1xuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJCYWRHYXRld2F5XCJdID0gNTAyXSA9IFwiQmFkR2F0ZXdheVwiO1xuICAgIEh0dHBDb2Rlc1tIdHRwQ29kZXNbXCJTZXJ2aWNlVW5hdmFpbGFibGVcIl0gPSA1MDNdID0gXCJTZXJ2aWNlVW5hdmFpbGFibGVcIjtcbiAgICBIdHRwQ29kZXNbSHR0cENvZGVzW1wiR2F0ZXdheVRpbWVvdXRcIl0gPSA1MDRdID0gXCJHYXRld2F5VGltZW91dFwiO1xufSkoSHR0cENvZGVzID0gZXhwb3J0cy5IdHRwQ29kZXMgfHwgKGV4cG9ydHMuSHR0cENvZGVzID0ge30pKTtcbmNvbnN0IEh0dHBSZWRpcmVjdENvZGVzID0gW0h0dHBDb2Rlcy5Nb3ZlZFBlcm1hbmVudGx5LCBIdHRwQ29kZXMuUmVzb3VyY2VNb3ZlZCwgSHR0cENvZGVzLlNlZU90aGVyLCBIdHRwQ29kZXMuVGVtcG9yYXJ5UmVkaXJlY3QsIEh0dHBDb2Rlcy5QZXJtYW5lbnRSZWRpcmVjdF07XG5jb25zdCBIdHRwUmVzcG9uc2VSZXRyeUNvZGVzID0gW0h0dHBDb2Rlcy5CYWRHYXRld2F5LCBIdHRwQ29kZXMuU2VydmljZVVuYXZhaWxhYmxlLCBIdHRwQ29kZXMuR2F0ZXdheVRpbWVvdXRdO1xuY29uc3QgUmV0cnlhYmxlSHR0cFZlcmJzID0gWydPUFRJT05TJywgJ0dFVCcsICdERUxFVEUnLCAnSEVBRCddO1xuY29uc3QgRXhwb25lbnRpYWxCYWNrb2ZmQ2VpbGluZyA9IDEwO1xuY29uc3QgRXhwb25lbnRpYWxCYWNrb2ZmVGltZVNsaWNlID0gNTtcbmNsYXNzIEh0dHBDbGllbnRSZXNwb25zZSB7XG4gICAgY29uc3RydWN0b3IobWVzc2FnZSkge1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIH1cbiAgICByZWFkQm9keSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGxldCBvdXRwdXQgPSAnJztcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZS5vbignZGF0YScsIChjaHVuaykgPT4ge1xuICAgICAgICAgICAgICAgIG91dHB1dCArPSBjaHVuaztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlLm9uKCdlbmQnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShvdXRwdXQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pKTtcbiAgICB9XG59XG5leHBvcnRzLkh0dHBDbGllbnRSZXNwb25zZSA9IEh0dHBDbGllbnRSZXNwb25zZTtcbmZ1bmN0aW9uIGlzSHR0cHMocmVxdWVzdFVybCkge1xuICAgIGxldCBwYXJzZWRVcmwgPSB1cmwucGFyc2UocmVxdWVzdFVybCk7XG4gICAgcmV0dXJuIHBhcnNlZFVybC5wcm90b2NvbCA9PT0gJ2h0dHBzOic7XG59XG5leHBvcnRzLmlzSHR0cHMgPSBpc0h0dHBzO1xudmFyIEVudmlyb25tZW50VmFyaWFibGVzO1xuKGZ1bmN0aW9uIChFbnZpcm9ubWVudFZhcmlhYmxlcykge1xuICAgIEVudmlyb25tZW50VmFyaWFibGVzW1wiSFRUUF9QUk9YWVwiXSA9IFwiSFRUUF9QUk9YWVwiO1xuICAgIEVudmlyb25tZW50VmFyaWFibGVzW1wiSFRUUFNfUFJPWFlcIl0gPSBcIkhUVFBTX1BST1hZXCI7XG59KShFbnZpcm9ubWVudFZhcmlhYmxlcyB8fCAoRW52aXJvbm1lbnRWYXJpYWJsZXMgPSB7fSkpO1xuY2xhc3MgSHR0cENsaWVudCB7XG4gICAgY29uc3RydWN0b3IodXNlckFnZW50LCBoYW5kbGVycywgcmVxdWVzdE9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5faWdub3JlU3NsRXJyb3IgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fYWxsb3dSZWRpcmVjdHMgPSB0cnVlO1xuICAgICAgICB0aGlzLl9tYXhSZWRpcmVjdHMgPSA1MDtcbiAgICAgICAgdGhpcy5fYWxsb3dSZXRyaWVzID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX21heFJldHJpZXMgPSAxO1xuICAgICAgICB0aGlzLl9rZWVwQWxpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZGlzcG9zZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy51c2VyQWdlbnQgPSB1c2VyQWdlbnQ7XG4gICAgICAgIHRoaXMuaGFuZGxlcnMgPSBoYW5kbGVycyB8fCBbXTtcbiAgICAgICAgdGhpcy5yZXF1ZXN0T3B0aW9ucyA9IHJlcXVlc3RPcHRpb25zO1xuICAgICAgICBpZiAocmVxdWVzdE9wdGlvbnMpIHtcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0T3B0aW9ucy5pZ25vcmVTc2xFcnJvciAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faWdub3JlU3NsRXJyb3IgPSByZXF1ZXN0T3B0aW9ucy5pZ25vcmVTc2xFcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3NvY2tldFRpbWVvdXQgPSByZXF1ZXN0T3B0aW9ucy5zb2NrZXRUaW1lb3V0O1xuICAgICAgICAgICAgdGhpcy5faHR0cFByb3h5ID0gcmVxdWVzdE9wdGlvbnMucHJveHk7XG4gICAgICAgICAgICBpZiAocmVxdWVzdE9wdGlvbnMucHJveHkgJiYgcmVxdWVzdE9wdGlvbnMucHJveHkucHJveHlCeXBhc3NIb3N0cykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2h0dHBQcm94eUJ5cGFzc0hvc3RzID0gW107XG4gICAgICAgICAgICAgICAgcmVxdWVzdE9wdGlvbnMucHJveHkucHJveHlCeXBhc3NIb3N0cy5mb3JFYWNoKGJ5cGFzcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2h0dHBQcm94eUJ5cGFzc0hvc3RzLnB1c2gobmV3IFJlZ0V4cChieXBhc3MsICdpJykpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fY2VydENvbmZpZyA9IHJlcXVlc3RPcHRpb25zLmNlcnQ7XG4gICAgICAgICAgICBpZiAodGhpcy5fY2VydENvbmZpZykge1xuICAgICAgICAgICAgICAgIC8vIElmIHVzaW5nIGNlcnQsIG5lZWQgZnNcbiAgICAgICAgICAgICAgICBmcyA9IHJlcXVpcmUoJ2ZzJyk7XG4gICAgICAgICAgICAgICAgLy8gY2FjaGUgdGhlIGNlcnQgY29udGVudCBpbnRvIG1lbW9yeSwgc28gd2UgZG9uJ3QgaGF2ZSB0byByZWFkIGl0IGZyb20gZGlzayBldmVyeSB0aW1lIFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jZXJ0Q29uZmlnLmNhRmlsZSAmJiBmcy5leGlzdHNTeW5jKHRoaXMuX2NlcnRDb25maWcuY2FGaWxlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jYSA9IGZzLnJlYWRGaWxlU3luYyh0aGlzLl9jZXJ0Q29uZmlnLmNhRmlsZSwgJ3V0ZjgnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2NlcnRDb25maWcuY2VydEZpbGUgJiYgZnMuZXhpc3RzU3luYyh0aGlzLl9jZXJ0Q29uZmlnLmNlcnRGaWxlKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jZXJ0ID0gZnMucmVhZEZpbGVTeW5jKHRoaXMuX2NlcnRDb25maWcuY2VydEZpbGUsICd1dGY4Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jZXJ0Q29uZmlnLmtleUZpbGUgJiYgZnMuZXhpc3RzU3luYyh0aGlzLl9jZXJ0Q29uZmlnLmtleUZpbGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2tleSA9IGZzLnJlYWRGaWxlU3luYyh0aGlzLl9jZXJ0Q29uZmlnLmtleUZpbGUsICd1dGY4Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJlcXVlc3RPcHRpb25zLmFsbG93UmVkaXJlY3RzICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hbGxvd1JlZGlyZWN0cyA9IHJlcXVlc3RPcHRpb25zLmFsbG93UmVkaXJlY3RzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJlcXVlc3RPcHRpb25zLm1heFJlZGlyZWN0cyAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWF4UmVkaXJlY3RzID0gTWF0aC5tYXgocmVxdWVzdE9wdGlvbnMubWF4UmVkaXJlY3RzLCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZXF1ZXN0T3B0aW9ucy5rZWVwQWxpdmUgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2tlZXBBbGl2ZSA9IHJlcXVlc3RPcHRpb25zLmtlZXBBbGl2ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZXF1ZXN0T3B0aW9ucy5hbGxvd1JldHJpZXMgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2FsbG93UmV0cmllcyA9IHJlcXVlc3RPcHRpb25zLmFsbG93UmV0cmllcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZXF1ZXN0T3B0aW9ucy5tYXhSZXRyaWVzICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXhSZXRyaWVzID0gcmVxdWVzdE9wdGlvbnMubWF4UmV0cmllcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBvcHRpb25zKHJlcXVlc3RVcmwsIGFkZGl0aW9uYWxIZWFkZXJzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QoJ09QVElPTlMnLCByZXF1ZXN0VXJsLCBudWxsLCBhZGRpdGlvbmFsSGVhZGVycyB8fCB7fSk7XG4gICAgfVxuICAgIGdldChyZXF1ZXN0VXJsLCBhZGRpdGlvbmFsSGVhZGVycykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdHRVQnLCByZXF1ZXN0VXJsLCBudWxsLCBhZGRpdGlvbmFsSGVhZGVycyB8fCB7fSk7XG4gICAgfVxuICAgIGRlbChyZXF1ZXN0VXJsLCBhZGRpdGlvbmFsSGVhZGVycykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdERUxFVEUnLCByZXF1ZXN0VXJsLCBudWxsLCBhZGRpdGlvbmFsSGVhZGVycyB8fCB7fSk7XG4gICAgfVxuICAgIHBvc3QocmVxdWVzdFVybCwgZGF0YSwgYWRkaXRpb25hbEhlYWRlcnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnUE9TVCcsIHJlcXVlc3RVcmwsIGRhdGEsIGFkZGl0aW9uYWxIZWFkZXJzIHx8IHt9KTtcbiAgICB9XG4gICAgcGF0Y2gocmVxdWVzdFVybCwgZGF0YSwgYWRkaXRpb25hbEhlYWRlcnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnUEFUQ0gnLCByZXF1ZXN0VXJsLCBkYXRhLCBhZGRpdGlvbmFsSGVhZGVycyB8fCB7fSk7XG4gICAgfVxuICAgIHB1dChyZXF1ZXN0VXJsLCBkYXRhLCBhZGRpdGlvbmFsSGVhZGVycykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KCdQVVQnLCByZXF1ZXN0VXJsLCBkYXRhLCBhZGRpdGlvbmFsSGVhZGVycyB8fCB7fSk7XG4gICAgfVxuICAgIGhlYWQocmVxdWVzdFVybCwgYWRkaXRpb25hbEhlYWRlcnMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdCgnSEVBRCcsIHJlcXVlc3RVcmwsIG51bGwsIGFkZGl0aW9uYWxIZWFkZXJzIHx8IHt9KTtcbiAgICB9XG4gICAgc2VuZFN0cmVhbSh2ZXJiLCByZXF1ZXN0VXJsLCBzdHJlYW0sIGFkZGl0aW9uYWxIZWFkZXJzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3QodmVyYiwgcmVxdWVzdFVybCwgc3RyZWFtLCBhZGRpdGlvbmFsSGVhZGVycyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1ha2VzIGEgcmF3IGh0dHAgcmVxdWVzdC5cbiAgICAgKiBBbGwgb3RoZXIgbWV0aG9kcyBzdWNoIGFzIGdldCwgcG9zdCwgcGF0Y2gsIGFuZCByZXF1ZXN0IHVsdGltYXRlbHkgY2FsbCB0aGlzLlxuICAgICAqIFByZWZlciBnZXQsIGRlbCwgcG9zdCBhbmQgcGF0Y2hcbiAgICAgKi9cbiAgICByZXF1ZXN0KHZlcmIsIHJlcXVlc3RVcmwsIGRhdGEsIGhlYWRlcnMpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9kaXNwb3NlZCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNsaWVudCBoYXMgYWxyZWFkeSBiZWVuIGRpc3Bvc2VkLlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBpbmZvID0gdGhpcy5fcHJlcGFyZVJlcXVlc3QodmVyYiwgcmVxdWVzdFVybCwgaGVhZGVycyk7XG4gICAgICAgICAgICAvLyBPbmx5IHBlcmZvcm0gcmV0cmllcyBvbiByZWFkcyBzaW5jZSB3cml0ZXMgbWF5IG5vdCBiZSBpZGVtcG90ZW50LlxuICAgICAgICAgICAgbGV0IG1heFRyaWVzID0gKHRoaXMuX2FsbG93UmV0cmllcyAmJiBSZXRyeWFibGVIdHRwVmVyYnMuaW5kZXhPZih2ZXJiKSAhPSAtMSkgPyB0aGlzLl9tYXhSZXRyaWVzICsgMSA6IDE7XG4gICAgICAgICAgICBsZXQgbnVtVHJpZXMgPSAwO1xuICAgICAgICAgICAgbGV0IHJlc3BvbnNlO1xuICAgICAgICAgICAgd2hpbGUgKG51bVRyaWVzIDwgbWF4VHJpZXMpIHtcbiAgICAgICAgICAgICAgICByZXNwb25zZSA9IHlpZWxkIHRoaXMucmVxdWVzdFJhdyhpbmZvLCBkYXRhKTtcbiAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiBpdCdzIGFuIGF1dGhlbnRpY2F0aW9uIGNoYWxsZW5nZVxuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZSAmJiByZXNwb25zZS5tZXNzYWdlICYmIHJlc3BvbnNlLm1lc3NhZ2Uuc3RhdHVzQ29kZSA9PT0gSHR0cENvZGVzLlVuYXV0aG9yaXplZCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgYXV0aGVudGljYXRpb25IYW5kbGVyO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuaGFuZGxlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmhhbmRsZXJzW2ldLmNhbkhhbmRsZUF1dGhlbnRpY2F0aW9uKHJlc3BvbnNlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dGhlbnRpY2F0aW9uSGFuZGxlciA9IHRoaXMuaGFuZGxlcnNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGF1dGhlbnRpY2F0aW9uSGFuZGxlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGF1dGhlbnRpY2F0aW9uSGFuZGxlci5oYW5kbGVBdXRoZW50aWNhdGlvbih0aGlzLCBpbmZvLCBkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdlIGhhdmUgcmVjZWl2ZWQgYW4gdW5hdXRob3JpemVkIHJlc3BvbnNlIGJ1dCBoYXZlIG5vIGhhbmRsZXJzIHRvIGhhbmRsZSBpdC5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIExldCB0aGUgcmVzcG9uc2UgcmV0dXJuIHRvIHRoZSBjYWxsZXIuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IHJlZGlyZWN0c1JlbWFpbmluZyA9IHRoaXMuX21heFJlZGlyZWN0cztcbiAgICAgICAgICAgICAgICB3aGlsZSAoSHR0cFJlZGlyZWN0Q29kZXMuaW5kZXhPZihyZXNwb25zZS5tZXNzYWdlLnN0YXR1c0NvZGUpICE9IC0xXG4gICAgICAgICAgICAgICAgICAgICYmIHRoaXMuX2FsbG93UmVkaXJlY3RzXG4gICAgICAgICAgICAgICAgICAgICYmIHJlZGlyZWN0c1JlbWFpbmluZyA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVkaXJlY3RVcmwgPSByZXNwb25zZS5tZXNzYWdlLmhlYWRlcnNbXCJsb2NhdGlvblwiXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFyZWRpcmVjdFVybCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgdGhlcmUncyBubyBsb2NhdGlvbiB0byByZWRpcmVjdCB0bywgd2Ugd29uJ3RcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIHdlIG5lZWQgdG8gZmluaXNoIHJlYWRpbmcgdGhlIHJlc3BvbnNlIGJlZm9yZSByZWFzc2lnbmluZyByZXNwb25zZVxuICAgICAgICAgICAgICAgICAgICAvLyB3aGljaCB3aWxsIGxlYWsgdGhlIG9wZW4gc29ja2V0LlxuICAgICAgICAgICAgICAgICAgICB5aWVsZCByZXNwb25zZS5yZWFkQm9keSgpO1xuICAgICAgICAgICAgICAgICAgICAvLyBsZXQncyBtYWtlIHRoZSByZXF1ZXN0IHdpdGggdGhlIG5ldyByZWRpcmVjdFVybFxuICAgICAgICAgICAgICAgICAgICBpbmZvID0gdGhpcy5fcHJlcGFyZVJlcXVlc3QodmVyYiwgcmVkaXJlY3RVcmwsIGhlYWRlcnMpO1xuICAgICAgICAgICAgICAgICAgICByZXNwb25zZSA9IHlpZWxkIHRoaXMucmVxdWVzdFJhdyhpbmZvLCBkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgcmVkaXJlY3RzUmVtYWluaW5nLS07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChIdHRwUmVzcG9uc2VSZXRyeUNvZGVzLmluZGV4T2YocmVzcG9uc2UubWVzc2FnZS5zdGF0dXNDb2RlKSA9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBJZiBub3QgYSByZXRyeSBjb2RlLCByZXR1cm4gaW1tZWRpYXRlbHkgaW5zdGVhZCBvZiByZXRyeWluZ1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG51bVRyaWVzICs9IDE7XG4gICAgICAgICAgICAgICAgaWYgKG51bVRyaWVzIDwgbWF4VHJpZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgeWllbGQgcmVzcG9uc2UucmVhZEJvZHkoKTtcbiAgICAgICAgICAgICAgICAgICAgeWllbGQgdGhpcy5fcGVyZm9ybUV4cG9uZW50aWFsQmFja29mZihudW1Ucmllcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTmVlZHMgdG8gYmUgY2FsbGVkIGlmIGtlZXBBbGl2ZSBpcyBzZXQgdG8gdHJ1ZSBpbiByZXF1ZXN0IG9wdGlvbnMuXG4gICAgICovXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2FnZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9hZ2VudC5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZGlzcG9zZWQgPSB0cnVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSYXcgcmVxdWVzdC5cbiAgICAgKiBAcGFyYW0gaW5mb1xuICAgICAqIEBwYXJhbSBkYXRhXG4gICAgICovXG4gICAgcmVxdWVzdFJhdyhpbmZvLCBkYXRhKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBsZXQgY2FsbGJhY2tGb3JSZXN1bHQgPSBmdW5jdGlvbiAoZXJyLCByZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlcyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0UmF3V2l0aENhbGxiYWNrKGluZm8sIGRhdGEsIGNhbGxiYWNrRm9yUmVzdWx0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJhdyByZXF1ZXN0IHdpdGggY2FsbGJhY2suXG4gICAgICogQHBhcmFtIGluZm9cbiAgICAgKiBAcGFyYW0gZGF0YVxuICAgICAqIEBwYXJhbSBvblJlc3VsdFxuICAgICAqL1xuICAgIHJlcXVlc3RSYXdXaXRoQ2FsbGJhY2soaW5mbywgZGF0YSwgb25SZXN1bHQpIHtcbiAgICAgICAgbGV0IHNvY2tldDtcbiAgICAgICAgbGV0IGlzRGF0YVN0cmluZyA9IHR5cGVvZiAoZGF0YSkgPT09ICdzdHJpbmcnO1xuICAgICAgICBpZiAodHlwZW9mIChkYXRhKSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGluZm8ub3B0aW9ucy5oZWFkZXJzW1wiQ29udGVudC1MZW5ndGhcIl0gPSBCdWZmZXIuYnl0ZUxlbmd0aChkYXRhLCAndXRmOCcpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBjYWxsYmFja0NhbGxlZCA9IGZhbHNlO1xuICAgICAgICBsZXQgaGFuZGxlUmVzdWx0ID0gKGVyciwgcmVzKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWNhbGxiYWNrQ2FsbGVkKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2tDYWxsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIG9uUmVzdWx0KGVyciwgcmVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgbGV0IHJlcSA9IGluZm8uaHR0cE1vZHVsZS5yZXF1ZXN0KGluZm8ub3B0aW9ucywgKG1zZykgPT4ge1xuICAgICAgICAgICAgbGV0IHJlcyA9IG5ldyBIdHRwQ2xpZW50UmVzcG9uc2UobXNnKTtcbiAgICAgICAgICAgIGhhbmRsZVJlc3VsdChudWxsLCByZXMpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmVxLm9uKCdzb2NrZXQnLCAoc29jaykgPT4ge1xuICAgICAgICAgICAgc29ja2V0ID0gc29jaztcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIElmIHdlIGV2ZXIgZ2V0IGRpc2Nvbm5lY3RlZCwgd2Ugd2FudCB0aGUgc29ja2V0IHRvIHRpbWVvdXQgZXZlbnR1YWxseVxuICAgICAgICByZXEuc2V0VGltZW91dCh0aGlzLl9zb2NrZXRUaW1lb3V0IHx8IDMgKiA2MDAwMCwgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHNvY2tldCkge1xuICAgICAgICAgICAgICAgIHNvY2tldC5lbmQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGhhbmRsZVJlc3VsdChuZXcgRXJyb3IoJ1JlcXVlc3QgdGltZW91dDogJyArIGluZm8ub3B0aW9ucy5wYXRoKSwgbnVsbCk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXEub24oJ2Vycm9yJywgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgLy8gZXJyIGhhcyBzdGF0dXNDb2RlIHByb3BlcnR5XG4gICAgICAgICAgICAvLyByZXMgc2hvdWxkIGhhdmUgaGVhZGVyc1xuICAgICAgICAgICAgaGFuZGxlUmVzdWx0KGVyciwgbnVsbCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoZGF0YSAmJiB0eXBlb2YgKGRhdGEpID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmVxLndyaXRlKGRhdGEsICd1dGY4Jyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEgJiYgdHlwZW9mIChkYXRhKSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGRhdGEub24oJ2Nsb3NlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJlcS5lbmQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZGF0YS5waXBlKHJlcSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXEuZW5kKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX3ByZXBhcmVSZXF1ZXN0KG1ldGhvZCwgcmVxdWVzdFVybCwgaGVhZGVycykge1xuICAgICAgICBjb25zdCBpbmZvID0ge307XG4gICAgICAgIGluZm8ucGFyc2VkVXJsID0gdXJsLnBhcnNlKHJlcXVlc3RVcmwpO1xuICAgICAgICBjb25zdCB1c2luZ1NzbCA9IGluZm8ucGFyc2VkVXJsLnByb3RvY29sID09PSAnaHR0cHM6JztcbiAgICAgICAgaW5mby5odHRwTW9kdWxlID0gdXNpbmdTc2wgPyBodHRwcyA6IGh0dHA7XG4gICAgICAgIGNvbnN0IGRlZmF1bHRQb3J0ID0gdXNpbmdTc2wgPyA0NDMgOiA4MDtcbiAgICAgICAgaW5mby5vcHRpb25zID0ge307XG4gICAgICAgIGluZm8ub3B0aW9ucy5ob3N0ID0gaW5mby5wYXJzZWRVcmwuaG9zdG5hbWU7XG4gICAgICAgIGluZm8ub3B0aW9ucy5wb3J0ID0gaW5mby5wYXJzZWRVcmwucG9ydCA/IHBhcnNlSW50KGluZm8ucGFyc2VkVXJsLnBvcnQpIDogZGVmYXVsdFBvcnQ7XG4gICAgICAgIGluZm8ub3B0aW9ucy5wYXRoID0gKGluZm8ucGFyc2VkVXJsLnBhdGhuYW1lIHx8ICcnKSArIChpbmZvLnBhcnNlZFVybC5zZWFyY2ggfHwgJycpO1xuICAgICAgICBpbmZvLm9wdGlvbnMubWV0aG9kID0gbWV0aG9kO1xuICAgICAgICBpbmZvLm9wdGlvbnMuaGVhZGVycyA9IHRoaXMuX21lcmdlSGVhZGVycyhoZWFkZXJzKTtcbiAgICAgICAgaW5mby5vcHRpb25zLmhlYWRlcnNbXCJ1c2VyLWFnZW50XCJdID0gdGhpcy51c2VyQWdlbnQ7XG4gICAgICAgIGluZm8ub3B0aW9ucy5hZ2VudCA9IHRoaXMuX2dldEFnZW50KHJlcXVlc3RVcmwpO1xuICAgICAgICAvLyBnaXZlcyBoYW5kbGVycyBhbiBvcHBvcnR1bml0eSB0byBwYXJ0aWNpcGF0ZVxuICAgICAgICBpZiAodGhpcy5oYW5kbGVycyAmJiAhdGhpcy5faXNQcmVzaWduZWQocmVxdWVzdFVybCkpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlcnMuZm9yRWFjaCgoaGFuZGxlcikgPT4ge1xuICAgICAgICAgICAgICAgIGhhbmRsZXIucHJlcGFyZVJlcXVlc3QoaW5mby5vcHRpb25zKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbmZvO1xuICAgIH1cbiAgICBfaXNQcmVzaWduZWQocmVxdWVzdFVybCkge1xuICAgICAgICBpZiAodGhpcy5yZXF1ZXN0T3B0aW9ucyAmJiB0aGlzLnJlcXVlc3RPcHRpb25zLnByZXNpZ25lZFVybFBhdHRlcm5zKSB7XG4gICAgICAgICAgICBjb25zdCBwYXR0ZXJucyA9IHRoaXMucmVxdWVzdE9wdGlvbnMucHJlc2lnbmVkVXJsUGF0dGVybnM7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhdHRlcm5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHJlcXVlc3RVcmwubWF0Y2gocGF0dGVybnNbaV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIF9tZXJnZUhlYWRlcnMoaGVhZGVycykge1xuICAgICAgICBjb25zdCBsb3dlcmNhc2VLZXlzID0gb2JqID0+IE9iamVjdC5rZXlzKG9iaikucmVkdWNlKChjLCBrKSA9PiAoY1trLnRvTG93ZXJDYXNlKCldID0gb2JqW2tdLCBjKSwge30pO1xuICAgICAgICBpZiAodGhpcy5yZXF1ZXN0T3B0aW9ucyAmJiB0aGlzLnJlcXVlc3RPcHRpb25zLmhlYWRlcnMpIHtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBsb3dlcmNhc2VLZXlzKHRoaXMucmVxdWVzdE9wdGlvbnMuaGVhZGVycyksIGxvd2VyY2FzZUtleXMoaGVhZGVycykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsb3dlcmNhc2VLZXlzKGhlYWRlcnMgfHwge30pO1xuICAgIH1cbiAgICBfZ2V0QWdlbnQocmVxdWVzdFVybCkge1xuICAgICAgICBsZXQgYWdlbnQ7XG4gICAgICAgIGxldCBwcm94eSA9IHRoaXMuX2dldFByb3h5KHJlcXVlc3RVcmwpO1xuICAgICAgICBsZXQgdXNlUHJveHkgPSBwcm94eS5wcm94eVVybCAmJiBwcm94eS5wcm94eVVybC5ob3N0bmFtZSAmJiAhdGhpcy5faXNCeXBhc3NQcm94eShyZXF1ZXN0VXJsKTtcbiAgICAgICAgaWYgKHRoaXMuX2tlZXBBbGl2ZSAmJiB1c2VQcm94eSkge1xuICAgICAgICAgICAgYWdlbnQgPSB0aGlzLl9wcm94eUFnZW50O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9rZWVwQWxpdmUgJiYgIXVzZVByb3h5KSB7XG4gICAgICAgICAgICBhZ2VudCA9IHRoaXMuX2FnZW50O1xuICAgICAgICB9XG4gICAgICAgIC8vIGlmIGFnZW50IGlzIGFscmVhZHkgYXNzaWduZWQgdXNlIHRoYXQgYWdlbnQuXG4gICAgICAgIGlmICghIWFnZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gYWdlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHBhcnNlZFVybCA9IHVybC5wYXJzZShyZXF1ZXN0VXJsKTtcbiAgICAgICAgY29uc3QgdXNpbmdTc2wgPSBwYXJzZWRVcmwucHJvdG9jb2wgPT09ICdodHRwczonO1xuICAgICAgICBsZXQgbWF4U29ja2V0cyA9IDEwMDtcbiAgICAgICAgaWYgKCEhdGhpcy5yZXF1ZXN0T3B0aW9ucykge1xuICAgICAgICAgICAgbWF4U29ja2V0cyA9IHRoaXMucmVxdWVzdE9wdGlvbnMubWF4U29ja2V0cyB8fCBodHRwLmdsb2JhbEFnZW50Lm1heFNvY2tldHM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVzZVByb3h5KSB7XG4gICAgICAgICAgICAvLyBJZiB1c2luZyBwcm94eSwgbmVlZCB0dW5uZWxcbiAgICAgICAgICAgIGlmICghdHVubmVsKSB7XG4gICAgICAgICAgICAgICAgdHVubmVsID0gcmVxdWlyZSgndHVubmVsJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBhZ2VudE9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgbWF4U29ja2V0czogbWF4U29ja2V0cyxcbiAgICAgICAgICAgICAgICBrZWVwQWxpdmU6IHRoaXMuX2tlZXBBbGl2ZSxcbiAgICAgICAgICAgICAgICBwcm94eToge1xuICAgICAgICAgICAgICAgICAgICBwcm94eUF1dGg6IHByb3h5LnByb3h5QXV0aCxcbiAgICAgICAgICAgICAgICAgICAgaG9zdDogcHJveHkucHJveHlVcmwuaG9zdG5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHBvcnQ6IHByb3h5LnByb3h5VXJsLnBvcnRcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGxldCB0dW5uZWxBZ2VudDtcbiAgICAgICAgICAgIGNvbnN0IG92ZXJIdHRwcyA9IHByb3h5LnByb3h5VXJsLnByb3RvY29sID09PSAnaHR0cHM6JztcbiAgICAgICAgICAgIGlmICh1c2luZ1NzbCkge1xuICAgICAgICAgICAgICAgIHR1bm5lbEFnZW50ID0gb3Zlckh0dHBzID8gdHVubmVsLmh0dHBzT3Zlckh0dHBzIDogdHVubmVsLmh0dHBzT3Zlckh0dHA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0dW5uZWxBZ2VudCA9IG92ZXJIdHRwcyA/IHR1bm5lbC5odHRwT3Zlckh0dHBzIDogdHVubmVsLmh0dHBPdmVySHR0cDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFnZW50ID0gdHVubmVsQWdlbnQoYWdlbnRPcHRpb25zKTtcbiAgICAgICAgICAgIHRoaXMuX3Byb3h5QWdlbnQgPSBhZ2VudDtcbiAgICAgICAgfVxuICAgICAgICAvLyBpZiByZXVzaW5nIGFnZW50IGFjcm9zcyByZXF1ZXN0IGFuZCB0dW5uZWxpbmcgYWdlbnQgaXNuJ3QgYXNzaWduZWQgY3JlYXRlIGEgbmV3IGFnZW50XG4gICAgICAgIGlmICh0aGlzLl9rZWVwQWxpdmUgJiYgIWFnZW50KSB7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0geyBrZWVwQWxpdmU6IHRoaXMuX2tlZXBBbGl2ZSwgbWF4U29ja2V0czogbWF4U29ja2V0cyB9O1xuICAgICAgICAgICAgYWdlbnQgPSB1c2luZ1NzbCA/IG5ldyBodHRwcy5BZ2VudChvcHRpb25zKSA6IG5ldyBodHRwLkFnZW50KG9wdGlvbnMpO1xuICAgICAgICAgICAgdGhpcy5fYWdlbnQgPSBhZ2VudDtcbiAgICAgICAgfVxuICAgICAgICAvLyBpZiBub3QgdXNpbmcgcHJpdmF0ZSBhZ2VudCBhbmQgdHVubmVsIGFnZW50IGlzbid0IHNldHVwIHRoZW4gdXNlIGdsb2JhbCBhZ2VudFxuICAgICAgICBpZiAoIWFnZW50KSB7XG4gICAgICAgICAgICBhZ2VudCA9IHVzaW5nU3NsID8gaHR0cHMuZ2xvYmFsQWdlbnQgOiBodHRwLmdsb2JhbEFnZW50O1xuICAgICAgICB9XG4gICAgICAgIGlmICh1c2luZ1NzbCAmJiB0aGlzLl9pZ25vcmVTc2xFcnJvcikge1xuICAgICAgICAgICAgLy8gd2UgZG9uJ3Qgd2FudCB0byBzZXQgTk9ERV9UTFNfUkVKRUNUX1VOQVVUSE9SSVpFRD0wIHNpbmNlIHRoYXQgd2lsbCBhZmZlY3QgcmVxdWVzdCBmb3IgZW50aXJlIHByb2Nlc3NcbiAgICAgICAgICAgIC8vIGh0dHAuUmVxdWVzdE9wdGlvbnMgZG9lc24ndCBleHBvc2UgYSB3YXkgdG8gbW9kaWZ5IFJlcXVlc3RPcHRpb25zLmFnZW50Lm9wdGlvbnNcbiAgICAgICAgICAgIC8vIHdlIGhhdmUgdG8gY2FzdCBpdCB0byBhbnkgYW5kIGNoYW5nZSBpdCBkaXJlY3RseVxuICAgICAgICAgICAgYWdlbnQub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oYWdlbnQub3B0aW9ucyB8fCB7fSwgeyByZWplY3RVbmF1dGhvcml6ZWQ6IGZhbHNlIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1c2luZ1NzbCAmJiB0aGlzLl9jZXJ0Q29uZmlnKSB7XG4gICAgICAgICAgICBhZ2VudC5vcHRpb25zID0gT2JqZWN0LmFzc2lnbihhZ2VudC5vcHRpb25zIHx8IHt9LCB7IGNhOiB0aGlzLl9jYSwgY2VydDogdGhpcy5fY2VydCwga2V5OiB0aGlzLl9rZXksIHBhc3NwaHJhc2U6IHRoaXMuX2NlcnRDb25maWcucGFzc3BocmFzZSB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWdlbnQ7XG4gICAgfVxuICAgIF9nZXRQcm94eShyZXF1ZXN0VXJsKSB7XG4gICAgICAgIGNvbnN0IHBhcnNlZFVybCA9IHVybC5wYXJzZShyZXF1ZXN0VXJsKTtcbiAgICAgICAgbGV0IHVzaW5nU3NsID0gcGFyc2VkVXJsLnByb3RvY29sID09PSAnaHR0cHM6JztcbiAgICAgICAgbGV0IHByb3h5Q29uZmlnID0gdGhpcy5faHR0cFByb3h5O1xuICAgICAgICAvLyBmYWxsYmFjayB0byBodHRwX3Byb3h5IGFuZCBodHRwc19wcm94eSBlbnZcbiAgICAgICAgbGV0IGh0dHBzX3Byb3h5ID0gcHJvY2Vzcy5lbnZbRW52aXJvbm1lbnRWYXJpYWJsZXMuSFRUUFNfUFJPWFldO1xuICAgICAgICBsZXQgaHR0cF9wcm94eSA9IHByb2Nlc3MuZW52W0Vudmlyb25tZW50VmFyaWFibGVzLkhUVFBfUFJPWFldO1xuICAgICAgICBpZiAoIXByb3h5Q29uZmlnKSB7XG4gICAgICAgICAgICBpZiAoaHR0cHNfcHJveHkgJiYgdXNpbmdTc2wpIHtcbiAgICAgICAgICAgICAgICBwcm94eUNvbmZpZyA9IHtcbiAgICAgICAgICAgICAgICAgICAgcHJveHlVcmw6IGh0dHBzX3Byb3h5XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGh0dHBfcHJveHkpIHtcbiAgICAgICAgICAgICAgICBwcm94eUNvbmZpZyA9IHtcbiAgICAgICAgICAgICAgICAgICAgcHJveHlVcmw6IGh0dHBfcHJveHlcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCBwcm94eVVybDtcbiAgICAgICAgbGV0IHByb3h5QXV0aDtcbiAgICAgICAgaWYgKHByb3h5Q29uZmlnKSB7XG4gICAgICAgICAgICBpZiAocHJveHlDb25maWcucHJveHlVcmwubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHByb3h5VXJsID0gdXJsLnBhcnNlKHByb3h5Q29uZmlnLnByb3h5VXJsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwcm94eUNvbmZpZy5wcm94eVVzZXJuYW1lIHx8IHByb3h5Q29uZmlnLnByb3h5UGFzc3dvcmQpIHtcbiAgICAgICAgICAgICAgICBwcm94eUF1dGggPSBwcm94eUNvbmZpZy5wcm94eVVzZXJuYW1lICsgXCI6XCIgKyBwcm94eUNvbmZpZy5wcm94eVBhc3N3b3JkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IHByb3h5VXJsOiBwcm94eVVybCwgcHJveHlBdXRoOiBwcm94eUF1dGggfTtcbiAgICB9XG4gICAgX2lzQnlwYXNzUHJveHkocmVxdWVzdFVybCkge1xuICAgICAgICBpZiAoIXRoaXMuX2h0dHBQcm94eUJ5cGFzc0hvc3RzKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGJ5cGFzcyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9odHRwUHJveHlCeXBhc3NIb3N0cy5mb3JFYWNoKGJ5cGFzc0hvc3QgPT4ge1xuICAgICAgICAgICAgaWYgKGJ5cGFzc0hvc3QudGVzdChyZXF1ZXN0VXJsKSkge1xuICAgICAgICAgICAgICAgIGJ5cGFzcyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gYnlwYXNzO1xuICAgIH1cbiAgICBfcGVyZm9ybUV4cG9uZW50aWFsQmFja29mZihyZXRyeU51bWJlcikge1xuICAgICAgICByZXRyeU51bWJlciA9IE1hdGgubWluKEV4cG9uZW50aWFsQmFja29mZkNlaWxpbmcsIHJldHJ5TnVtYmVyKTtcbiAgICAgICAgY29uc3QgbXMgPSBFeHBvbmVudGlhbEJhY2tvZmZUaW1lU2xpY2UgKiBNYXRoLnBvdygyLCByZXRyeU51bWJlcik7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQoKCkgPT4gcmVzb2x2ZSgpLCBtcykpO1xuICAgIH1cbn1cbmV4cG9ydHMuSHR0cENsaWVudCA9IEh0dHBDbGllbnQ7XG4iLCIvKipcbiAqIENvbnZlcnQgYXJyYXkgb2YgMTYgYnl0ZSB2YWx1ZXMgdG8gVVVJRCBzdHJpbmcgZm9ybWF0IG9mIHRoZSBmb3JtOlxuICogWFhYWFhYWFgtWFhYWC1YWFhYLVhYWFgtWFhYWFhYWFhYWFhYXG4gKi9cbnZhciBieXRlVG9IZXggPSBbXTtcbmZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyArK2kpIHtcbiAgYnl0ZVRvSGV4W2ldID0gKGkgKyAweDEwMCkudG9TdHJpbmcoMTYpLnN1YnN0cigxKTtcbn1cblxuZnVuY3Rpb24gYnl0ZXNUb1V1aWQoYnVmLCBvZmZzZXQpIHtcbiAgdmFyIGkgPSBvZmZzZXQgfHwgMDtcbiAgdmFyIGJ0aCA9IGJ5dGVUb0hleDtcbiAgLy8gam9pbiB1c2VkIHRvIGZpeCBtZW1vcnkgaXNzdWUgY2F1c2VkIGJ5IGNvbmNhdGVuYXRpb246IGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMxNzUjYzRcbiAgcmV0dXJuIChbYnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSwgXG5cdGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sICctJyxcblx0YnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSwgJy0nLFxuXHRidGhbYnVmW2krK11dLCBidGhbYnVmW2krK11dLCAnLScsXG5cdGJ0aFtidWZbaSsrXV0sIGJ0aFtidWZbaSsrXV0sICctJyxcblx0YnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSxcblx0YnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXSxcblx0YnRoW2J1ZltpKytdXSwgYnRoW2J1ZltpKytdXV0pLmpvaW4oJycpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJ5dGVzVG9VdWlkO1xuIiwiLy8gVW5pcXVlIElEIGNyZWF0aW9uIHJlcXVpcmVzIGEgaGlnaCBxdWFsaXR5IHJhbmRvbSAjIGdlbmVyYXRvci4gIEluIG5vZGUuanNcbi8vIHRoaXMgaXMgcHJldHR5IHN0cmFpZ2h0LWZvcndhcmQgLSB3ZSB1c2UgdGhlIGNyeXB0byBBUEkuXG5cbnZhciBjcnlwdG8gPSByZXF1aXJlKCdjcnlwdG8nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBub2RlUk5HKCkge1xuICByZXR1cm4gY3J5cHRvLnJhbmRvbUJ5dGVzKDE2KTtcbn07XG4iLCJ2YXIgcm5nID0gcmVxdWlyZSgnLi9saWIvcm5nJyk7XG52YXIgYnl0ZXNUb1V1aWQgPSByZXF1aXJlKCcuL2xpYi9ieXRlc1RvVXVpZCcpO1xuXG5mdW5jdGlvbiB2NChvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICB2YXIgaSA9IGJ1ZiAmJiBvZmZzZXQgfHwgMDtcblxuICBpZiAodHlwZW9mKG9wdGlvbnMpID09ICdzdHJpbmcnKSB7XG4gICAgYnVmID0gb3B0aW9ucyA9PT0gJ2JpbmFyeScgPyBuZXcgQXJyYXkoMTYpIDogbnVsbDtcbiAgICBvcHRpb25zID0gbnVsbDtcbiAgfVxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICB2YXIgcm5kcyA9IG9wdGlvbnMucmFuZG9tIHx8IChvcHRpb25zLnJuZyB8fCBybmcpKCk7XG5cbiAgLy8gUGVyIDQuNCwgc2V0IGJpdHMgZm9yIHZlcnNpb24gYW5kIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYFxuICBybmRzWzZdID0gKHJuZHNbNl0gJiAweDBmKSB8IDB4NDA7XG4gIHJuZHNbOF0gPSAocm5kc1s4XSAmIDB4M2YpIHwgMHg4MDtcblxuICAvLyBDb3B5IGJ5dGVzIHRvIGJ1ZmZlciwgaWYgcHJvdmlkZWRcbiAgaWYgKGJ1Zikge1xuICAgIGZvciAodmFyIGlpID0gMDsgaWkgPCAxNjsgKytpaSkge1xuICAgICAgYnVmW2kgKyBpaV0gPSBybmRzW2lpXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnVmIHx8IGJ5dGVzVG9VdWlkKHJuZHMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHY0O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XG4gICAgcmVzdWx0W1wiZGVmYXVsdFwiXSA9IG1vZDtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHBhdGhfMSA9IHJlcXVpcmUoXCJwYXRoXCIpO1xuY29uc3QgZnNfMSA9IHJlcXVpcmUoXCJmc1wiKTtcbmNvbnN0IGNvcmUgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcIkBhY3Rpb25zL2NvcmVcIikpO1xuY29uc3QgZXhlYyA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiQGFjdGlvbnMvZXhlY1wiKSk7XG5jb25zdCB1dGlsc18xID0gcmVxdWlyZShcIi4vdXRpbHNcIik7XG5mdW5jdGlvbiBhdXRoZW50aWNhdGUoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc3Qgc2VydmljZUFjY291bnRLZXlCYXNlNjQgPSBjb3JlLmdldElucHV0KCdzZXJ2aWNlLWFjY291bnQta2V5Jyk7XG4gICAgICAgIGNvbnN0IHNlcnZpY2VBY2NvdW50S2V5SnNvbiA9IEJ1ZmZlci5mcm9tKHNlcnZpY2VBY2NvdW50S2V5QmFzZTY0LCAnYmFzZTY0Jyk7XG4gICAgICAgIGNvbnN0IHNlcnZpY2VBY2NvdW50S2V5UGF0aCA9IHBhdGhfMS5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICdnY2xvdWQuanNvbicpO1xuICAgICAgICBjb25zdCBnY2xvdWQgPSBwYXRoXzEucmVzb2x2ZSh1dGlsc18xLmdldENsb3VkU0RLRm9sZGVyKCksICdiaW4nLCAnZ2Nsb3VkJyk7XG4gICAgICAgIGZzXzEud3JpdGVGaWxlU3luYyhzZXJ2aWNlQWNjb3VudEtleVBhdGgsIHNlcnZpY2VBY2NvdW50S2V5SnNvbik7XG4gICAgICAgIHlpZWxkIGV4ZWMuZXhlYyhgJHtnY2xvdWR9IGF1dGggYWN0aXZhdGUtc2VydmljZS1hY2NvdW50IC0ta2V5LWZpbGU9JHtzZXJ2aWNlQWNjb3VudEtleVBhdGh9YCk7XG4gICAgICAgIGZzXzEudW5saW5rU3luYyhzZXJ2aWNlQWNjb3VudEtleVBhdGgpO1xuICAgIH0pO1xufVxuZXhwb3J0cy5hdXRoZW50aWNhdGUgPSBhdXRoZW50aWNhdGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcbiAgICByZXN1bHRbXCJkZWZhdWx0XCJdID0gbW9kO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgdGMgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcIkBhY3Rpb25zL3Rvb2wtY2FjaGVcIikpO1xuY29uc3QgdXRpbHNfMSA9IHJlcXVpcmUoXCIuL3V0aWxzXCIpO1xuY29uc3QgZnNfMSA9IHJlcXVpcmUoXCJmc1wiKTtcbmNvbnN0IHBhdGhfMSA9IHJlcXVpcmUoXCJwYXRoXCIpO1xuZnVuY3Rpb24gZG93bmxvYWQoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc3QgZG93bmxvYWRMaW5rID0gdXRpbHNfMS5nZXREb3dubG9hZExpbmsoKTtcbiAgICAgICAgY29uc3QgZG93bmxvYWRQYXRoID0geWllbGQgdGMuZG93bmxvYWRUb29sKGRvd25sb2FkTGluayk7XG4gICAgICAgIGNvbnN0IGV4dHJhY3Rpb25QYXRoID0gcGF0aF8xLnJlc29sdmUodXRpbHNfMS5nZXRDbG91ZFNES0ZvbGRlcigpLCAnLi4nKTtcbiAgICAgICAgZnNfMS5ta2RpclN5bmModXRpbHNfMS5nZXRDbG91ZFNES0ZvbGRlcigpKTtcbiAgICAgICAgaWYgKGRvd25sb2FkTGluay5lbmRzV2l0aCgnLnppcCcpKSB7XG4gICAgICAgICAgICB5aWVsZCB0Yy5leHRyYWN0WmlwKGRvd25sb2FkUGF0aCwgZXh0cmFjdGlvblBhdGgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRvd25sb2FkTGluay5lbmRzV2l0aCgnLnRhci5neicpKSB7XG4gICAgICAgICAgICB5aWVsZCB0Yy5leHRyYWN0VGFyKGRvd25sb2FkUGF0aCwgZXh0cmFjdGlvblBhdGgpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5leHBvcnRzLmRvd25sb2FkID0gZG93bmxvYWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgZG93bmxvYWRfMSA9IHJlcXVpcmUoXCIuL2Rvd25sb2FkXCIpO1xuY29uc3Qgc2V0dXBfMSA9IHJlcXVpcmUoXCIuL3NldHVwXCIpO1xuY29uc3QgYXV0aGVudGljYXRlXzEgPSByZXF1aXJlKFwiLi9hdXRoZW50aWNhdGVcIik7XG5mdW5jdGlvbiBpbnN0YWxsKCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHlpZWxkIGRvd25sb2FkXzEuZG93bmxvYWQoKTtcbiAgICAgICAgeWllbGQgc2V0dXBfMS5zZXR1cCgpO1xuICAgICAgICB5aWVsZCBhdXRoZW50aWNhdGVfMS5hdXRoZW50aWNhdGUoKTtcbiAgICB9KTtcbn1cbmV4cG9ydHMuaW5zdGFsbCA9IGluc3RhbGw7XG5pbnN0YWxsKCkudGhlbigpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2ltcG9ydFN0YXIgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0U3RhcikgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIGlmIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpIHJldHVybiBtb2Q7XG4gICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSByZXN1bHRba10gPSBtb2Rba107XG4gICAgcmVzdWx0W1wiZGVmYXVsdFwiXSA9IG1vZDtcbiAgICByZXR1cm4gcmVzdWx0O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHV0aWxzXzEgPSByZXF1aXJlKFwiLi91dGlsc1wiKTtcbmNvbnN0IHBhdGhfMSA9IHJlcXVpcmUoXCJwYXRoXCIpO1xuY29uc3QgY29yZSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiQGFjdGlvbnMvY29yZVwiKSk7XG5jb25zdCBleGVjID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJAYWN0aW9ucy9leGVjXCIpKTtcbmNvbnN0IGZzXzEgPSByZXF1aXJlKFwiZnNcIik7XG5mdW5jdGlvbiBzZXR1cCgpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zdCBpbnN0YWxsU2NyaXB0RXh0ZW5zaW9uID0gdXRpbHNfMS5pc1dpbmRvd3MoKSA/ICdiYXQnIDogJ3NoJztcbiAgICAgICAgY29uc3QgaW5zdGFsbFNjcmlwdCA9IHBhdGhfMS5yZXNvbHZlKHV0aWxzXzEuZ2V0Q2xvdWRTREtGb2xkZXIoKSwgYGluc3RhbGwuJHtpbnN0YWxsU2NyaXB0RXh0ZW5zaW9ufWApO1xuICAgICAgICBsZXQgYXJncztcbiAgICAgICAgaWYgKHV0aWxzXzEuaXNXaW5kb3dzKCkpIHtcbiAgICAgICAgICAgIC8vIGFyZ3MgPSBbJy9TJywgYC9EPSR7Z2V0Q2xvdWRTREtGb2xkZXIoKX1gLCAnL3NpbmdsZXVzZXInLCAnL25vcmVwb3J0aW5nJywgJy9ub3N0YXJ0bWVudScsICcvbm9kZXNrdG9wJ107XG4gICAgICAgICAgICBhcmdzID0gW1xuICAgICAgICAgICAgICAgICctLXVzYWdlLXJlcG9ydGluZz1mYWxzZScsXG4gICAgICAgICAgICAgICAgJy0tY29tbWFuZC1jb21wbGV0aW9uPWZhbHNlJyxcbiAgICAgICAgICAgICAgICAnLS1wYXRoLXVwZGF0ZT1mYWxzZScsXG4gICAgICAgICAgICAgICAgJy0tdXNhZ2UtcmVwb3J0aW5nPWZhbHNlJyxcbiAgICAgICAgICAgICAgICAvLyAnLS1hZGRpdGlvbmFsLWNvbXBvbmVudHMnLFxuICAgICAgICAgICAgICAgICctLXF1aWV0J1xuICAgICAgICAgICAgXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGFyZ3MgPSBbXG4gICAgICAgICAgICAgICAgJy0tdXNhZ2UtcmVwb3J0aW5nPWZhbHNlJyxcbiAgICAgICAgICAgICAgICAnLS1jb21tYW5kLWNvbXBsZXRpb249ZmFsc2UnLFxuICAgICAgICAgICAgICAgICctLXBhdGgtdXBkYXRlPWZhbHNlJyxcbiAgICAgICAgICAgICAgICAnLS11c2FnZS1yZXBvcnRpbmc9ZmFsc2UnLFxuICAgICAgICAgICAgICAgIC8vICctLWFkZGl0aW9uYWwtY29tcG9uZW50cycsXG4gICAgICAgICAgICAgICAgJy0tcXVpZXQnXG4gICAgICAgICAgICBdO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBscyA9IGZzXzEucmVhZGRpclN5bmModXRpbHNfMS5nZXRDbG91ZFNES0ZvbGRlcigpKTtcbiAgICAgICAgICAgIGNvcmUuaW5mbyhscy5qb2luKCdcXG4nKSk7XG4gICAgICAgICAgICB5aWVsZCBleGVjLmV4ZWMoaW5zdGFsbFNjcmlwdCwgYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvcmUuZXJyb3IoZS5tZXNzYWdlKTtcbiAgICAgICAgICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBiaW5QYXRoID0gcGF0aF8xLnJlc29sdmUodXRpbHNfMS5nZXRDbG91ZFNES0ZvbGRlcigpLCAnYmluJyk7XG4gICAgICAgIGNvcmUuYWRkUGF0aChiaW5QYXRoKTtcbiAgICB9KTtcbn1cbmV4cG9ydHMuc2V0dXAgPSBzZXR1cDtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcbiAgICByZXN1bHRbXCJkZWZhdWx0XCJdID0gbW9kO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgcGF0aF8xID0gcmVxdWlyZShcInBhdGhcIik7XG5jb25zdCBjb3JlID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJAYWN0aW9ucy9jb3JlXCIpKTtcbmZ1bmN0aW9uIGlzV2luZG93cygpIHtcbiAgICByZXR1cm4gcHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJztcbn1cbmV4cG9ydHMuaXNXaW5kb3dzID0gaXNXaW5kb3dzO1xuZnVuY3Rpb24gaXNNYWNPUygpIHtcbiAgICByZXR1cm4gcHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ2Rhcndpbic7XG59XG5leHBvcnRzLmlzTWFjT1MgPSBpc01hY09TO1xuZnVuY3Rpb24gaXNVYnVudHUoKSB7XG4gICAgcmV0dXJuIHByb2Nlc3MucGxhdGZvcm0gPT09ICdsaW51eCc7XG59XG5leHBvcnRzLmlzVWJ1bnR1ID0gaXNVYnVudHU7XG5mdW5jdGlvbiBnZXRDbG91ZFNES0ZvbGRlcigpIHtcbiAgICBjb25zdCBob21lID0gcHJvY2Vzcy5lbnYuSE9NRSA/IHByb2Nlc3MuZW52LkhPTUUgOiBwcm9jZXNzLmN3ZCgpO1xuICAgIHJldHVybiBwYXRoXzEucmVzb2x2ZShob21lLCAnZ29vZ2xlLWNsb3VkLXNkaycpO1xufVxuZXhwb3J0cy5nZXRDbG91ZFNES0ZvbGRlciA9IGdldENsb3VkU0RLRm9sZGVyO1xuZnVuY3Rpb24gZ2V0RG93bmxvYWRMaW5rKCkge1xuICAgIGNvbnN0IGJhc2VVcmwgPSAnaHR0cHM6Ly9kbC5nb29nbGUuY29tL2RsL2Nsb3Vkc2RrL2NoYW5uZWxzL3JhcGlkJztcbiAgICBjb25zdCB2ZXJzaW9uID0gY29yZS5nZXRJbnB1dCgndmVyc2lvbicpO1xuICAgIGlmICh2ZXJzaW9uID09PSAnbGF0ZXN0Jykge1xuICAgICAgICBpZiAoaXNXaW5kb3dzKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBgJHtiYXNlVXJsfS9nb29nbGUtY2xvdWQtc2RrLnppcGA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gYCR7YmFzZVVybH0vZ29vZ2xlLWNsb3VkLXNkay50YXIuZ3pgO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChpc1dpbmRvd3MoKSkge1xuICAgICAgICByZXR1cm4gYCR7YmFzZVVybH0vZG93bmxvYWRzL2dvb2dsZS1jbG91ZC1zZGstJHt2ZXJzaW9ufS13aW5kb3dzLXg4Nl82NC56aXBgO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc01hY09TKCkpIHtcbiAgICAgICAgcmV0dXJuIGAke2Jhc2VVcmx9L2Rvd25sb2Fkcy9nb29nbGUtY2xvdWQtc2RrLSR7dmVyc2lvbn0tZGFyd2luLXg4Nl82NC50YXIuZ3pgO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGAke2Jhc2VVcmx9L2Rvd25sb2Fkcy9nb29nbGUtY2xvdWQtc2RrLSR7dmVyc2lvbn0tbGludXgteDg2XzY0LnRhci5nemA7XG4gICAgfVxufVxuZXhwb3J0cy5nZXREb3dubG9hZExpbmsgPSBnZXREb3dubG9hZExpbms7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJhc3NlcnRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2hpbGRfcHJvY2Vzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjcnlwdG9cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXZlbnRzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cHNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm9zXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidGxzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInVybFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1dGlsXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=