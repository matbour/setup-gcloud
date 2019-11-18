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
            yield exec.exec(`Expand-Archive ${sdkFile} ${destinationFolder}`);
        }
        else {
            yield exec.exec(`tar -xf ${sdkFile}`);
        }
        if (process.platform === 'win32') {
            yield exec.exec('dir');
            yield exec.exec(path_1.resolve(destinationFolder, 'install.bat --disable-prompts'));
        }
        else if (process.platform == 'darwin') {
            yield exec.exec(path_1.resolve(destinationFolder, 'install.sh'));
        }
        else {
            yield exec.exec(path_1.resolve(destinationFolder, 'install.sh --disable-prompts'));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhY3Rpb25zL2NvcmUvbGliL2NvbW1hbmQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhY3Rpb25zL2NvcmUvbGliL2NvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhY3Rpb25zL2V4ZWMvbGliL2V4ZWMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhY3Rpb25zL2V4ZWMvbGliL3Rvb2xydW5uZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Rvd25sb2FkLnRzIiwid2VicGFjazovLy8uL3NyYy9pbnN0YWxsLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImNoaWxkX3Byb2Nlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJldmVudHNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJmc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm9zXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGF0aFwiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FB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TDtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3BEQSwwQzs7Ozs7Ozs7Ozs7QUNBQSxtQzs7Ozs7Ozs7Ozs7QUNBQSwrQjs7Ozs7Ozs7Ozs7QUNBQSwrQjs7Ozs7Ozs7Ozs7QUNBQSxpQyIsImZpbGUiOiJpbnN0YWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5zdGFsbC50c1wiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3Qgb3MgPSByZXF1aXJlKFwib3NcIik7XG4vKipcbiAqIENvbW1hbmRzXG4gKlxuICogQ29tbWFuZCBGb3JtYXQ6XG4gKiAgICMjW25hbWUga2V5PXZhbHVlO2tleT12YWx1ZV1tZXNzYWdlXG4gKlxuICogRXhhbXBsZXM6XG4gKiAgICMjW3dhcm5pbmddVGhpcyBpcyB0aGUgdXNlciB3YXJuaW5nIG1lc3NhZ2VcbiAqICAgIyNbc2V0LXNlY3JldCBuYW1lPW15cGFzc3dvcmRdZGVmaW5pdGVseU5vdEFQYXNzd29yZCFcbiAqL1xuZnVuY3Rpb24gaXNzdWVDb21tYW5kKGNvbW1hbmQsIHByb3BlcnRpZXMsIG1lc3NhZ2UpIHtcbiAgICBjb25zdCBjbWQgPSBuZXcgQ29tbWFuZChjb21tYW5kLCBwcm9wZXJ0aWVzLCBtZXNzYWdlKTtcbiAgICBwcm9jZXNzLnN0ZG91dC53cml0ZShjbWQudG9TdHJpbmcoKSArIG9zLkVPTCk7XG59XG5leHBvcnRzLmlzc3VlQ29tbWFuZCA9IGlzc3VlQ29tbWFuZDtcbmZ1bmN0aW9uIGlzc3VlKG5hbWUsIG1lc3NhZ2UgPSAnJykge1xuICAgIGlzc3VlQ29tbWFuZChuYW1lLCB7fSwgbWVzc2FnZSk7XG59XG5leHBvcnRzLmlzc3VlID0gaXNzdWU7XG5jb25zdCBDTURfU1RSSU5HID0gJzo6JztcbmNsYXNzIENvbW1hbmQge1xuICAgIGNvbnN0cnVjdG9yKGNvbW1hbmQsIHByb3BlcnRpZXMsIG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKCFjb21tYW5kKSB7XG4gICAgICAgICAgICBjb21tYW5kID0gJ21pc3NpbmcuY29tbWFuZCc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb21tYW5kID0gY29tbWFuZDtcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzID0gcHJvcGVydGllcztcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICB9XG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIGxldCBjbWRTdHIgPSBDTURfU1RSSU5HICsgdGhpcy5jb21tYW5kO1xuICAgICAgICBpZiAodGhpcy5wcm9wZXJ0aWVzICYmIE9iamVjdC5rZXlzKHRoaXMucHJvcGVydGllcykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY21kU3RyICs9ICcgJztcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMucHJvcGVydGllcykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWwgPSB0aGlzLnByb3BlcnRpZXNba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2FmZWx5IGFwcGVuZCB0aGUgdmFsIC0gYXZvaWQgYmxvd2luZyB1cCB3aGVuIGF0dGVtcHRpbmcgdG9cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNhbGwgLnJlcGxhY2UoKSBpZiBtZXNzYWdlIGlzIG5vdCBhIHN0cmluZyBmb3Igc29tZSByZWFzb25cbiAgICAgICAgICAgICAgICAgICAgICAgIGNtZFN0ciArPSBgJHtrZXl9PSR7ZXNjYXBlKGAke3ZhbCB8fCAnJ31gKX0sYDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjbWRTdHIgKz0gQ01EX1NUUklORztcbiAgICAgICAgLy8gc2FmZWx5IGFwcGVuZCB0aGUgbWVzc2FnZSAtIGF2b2lkIGJsb3dpbmcgdXAgd2hlbiBhdHRlbXB0aW5nIHRvXG4gICAgICAgIC8vIGNhbGwgLnJlcGxhY2UoKSBpZiBtZXNzYWdlIGlzIG5vdCBhIHN0cmluZyBmb3Igc29tZSByZWFzb25cbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGAke3RoaXMubWVzc2FnZSB8fCAnJ31gO1xuICAgICAgICBjbWRTdHIgKz0gZXNjYXBlRGF0YShtZXNzYWdlKTtcbiAgICAgICAgcmV0dXJuIGNtZFN0cjtcbiAgICB9XG59XG5mdW5jdGlvbiBlc2NhcGVEYXRhKHMpIHtcbiAgICByZXR1cm4gcy5yZXBsYWNlKC9cXHIvZywgJyUwRCcpLnJlcGxhY2UoL1xcbi9nLCAnJTBBJyk7XG59XG5mdW5jdGlvbiBlc2NhcGUocykge1xuICAgIHJldHVybiBzXG4gICAgICAgIC5yZXBsYWNlKC9cXHIvZywgJyUwRCcpXG4gICAgICAgIC5yZXBsYWNlKC9cXG4vZywgJyUwQScpXG4gICAgICAgIC5yZXBsYWNlKC9dL2csICclNUQnKVxuICAgICAgICAucmVwbGFjZSgvOy9nLCAnJTNCJyk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb21tYW5kLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjb21tYW5kXzEgPSByZXF1aXJlKFwiLi9jb21tYW5kXCIpO1xuY29uc3Qgb3MgPSByZXF1aXJlKFwib3NcIik7XG5jb25zdCBwYXRoID0gcmVxdWlyZShcInBhdGhcIik7XG4vKipcbiAqIFRoZSBjb2RlIHRvIGV4aXQgYW4gYWN0aW9uXG4gKi9cbnZhciBFeGl0Q29kZTtcbihmdW5jdGlvbiAoRXhpdENvZGUpIHtcbiAgICAvKipcbiAgICAgKiBBIGNvZGUgaW5kaWNhdGluZyB0aGF0IHRoZSBhY3Rpb24gd2FzIHN1Y2Nlc3NmdWxcbiAgICAgKi9cbiAgICBFeGl0Q29kZVtFeGl0Q29kZVtcIlN1Y2Nlc3NcIl0gPSAwXSA9IFwiU3VjY2Vzc1wiO1xuICAgIC8qKlxuICAgICAqIEEgY29kZSBpbmRpY2F0aW5nIHRoYXQgdGhlIGFjdGlvbiB3YXMgYSBmYWlsdXJlXG4gICAgICovXG4gICAgRXhpdENvZGVbRXhpdENvZGVbXCJGYWlsdXJlXCJdID0gMV0gPSBcIkZhaWx1cmVcIjtcbn0pKEV4aXRDb2RlID0gZXhwb3J0cy5FeGl0Q29kZSB8fCAoZXhwb3J0cy5FeGl0Q29kZSA9IHt9KSk7XG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBWYXJpYWJsZXNcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8qKlxuICogU2V0cyBlbnYgdmFyaWFibGUgZm9yIHRoaXMgYWN0aW9uIGFuZCBmdXR1cmUgYWN0aW9ucyBpbiB0aGUgam9iXG4gKiBAcGFyYW0gbmFtZSB0aGUgbmFtZSBvZiB0aGUgdmFyaWFibGUgdG8gc2V0XG4gKiBAcGFyYW0gdmFsIHRoZSB2YWx1ZSBvZiB0aGUgdmFyaWFibGVcbiAqL1xuZnVuY3Rpb24gZXhwb3J0VmFyaWFibGUobmFtZSwgdmFsKSB7XG4gICAgcHJvY2Vzcy5lbnZbbmFtZV0gPSB2YWw7XG4gICAgY29tbWFuZF8xLmlzc3VlQ29tbWFuZCgnc2V0LWVudicsIHsgbmFtZSB9LCB2YWwpO1xufVxuZXhwb3J0cy5leHBvcnRWYXJpYWJsZSA9IGV4cG9ydFZhcmlhYmxlO1xuLyoqXG4gKiBSZWdpc3RlcnMgYSBzZWNyZXQgd2hpY2ggd2lsbCBnZXQgbWFza2VkIGZyb20gbG9nc1xuICogQHBhcmFtIHNlY3JldCB2YWx1ZSBvZiB0aGUgc2VjcmV0XG4gKi9cbmZ1bmN0aW9uIHNldFNlY3JldChzZWNyZXQpIHtcbiAgICBjb21tYW5kXzEuaXNzdWVDb21tYW5kKCdhZGQtbWFzaycsIHt9LCBzZWNyZXQpO1xufVxuZXhwb3J0cy5zZXRTZWNyZXQgPSBzZXRTZWNyZXQ7XG4vKipcbiAqIFByZXBlbmRzIGlucHV0UGF0aCB0byB0aGUgUEFUSCAoZm9yIHRoaXMgYWN0aW9uIGFuZCBmdXR1cmUgYWN0aW9ucylcbiAqIEBwYXJhbSBpbnB1dFBhdGhcbiAqL1xuZnVuY3Rpb24gYWRkUGF0aChpbnB1dFBhdGgpIHtcbiAgICBjb21tYW5kXzEuaXNzdWVDb21tYW5kKCdhZGQtcGF0aCcsIHt9LCBpbnB1dFBhdGgpO1xuICAgIHByb2Nlc3MuZW52WydQQVRIJ10gPSBgJHtpbnB1dFBhdGh9JHtwYXRoLmRlbGltaXRlcn0ke3Byb2Nlc3MuZW52WydQQVRIJ119YDtcbn1cbmV4cG9ydHMuYWRkUGF0aCA9IGFkZFBhdGg7XG4vKipcbiAqIEdldHMgdGhlIHZhbHVlIG9mIGFuIGlucHV0LiAgVGhlIHZhbHVlIGlzIGFsc28gdHJpbW1lZC5cbiAqXG4gKiBAcGFyYW0gICAgIG5hbWUgICAgIG5hbWUgb2YgdGhlIGlucHV0IHRvIGdldFxuICogQHBhcmFtICAgICBvcHRpb25zICBvcHRpb25hbC4gU2VlIElucHV0T3B0aW9ucy5cbiAqIEByZXR1cm5zICAgc3RyaW5nXG4gKi9cbmZ1bmN0aW9uIGdldElucHV0KG5hbWUsIG9wdGlvbnMpIHtcbiAgICBjb25zdCB2YWwgPSBwcm9jZXNzLmVudltgSU5QVVRfJHtuYW1lLnJlcGxhY2UoLyAvZywgJ18nKS50b1VwcGVyQ2FzZSgpfWBdIHx8ICcnO1xuICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMucmVxdWlyZWQgJiYgIXZhbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYElucHV0IHJlcXVpcmVkIGFuZCBub3Qgc3VwcGxpZWQ6ICR7bmFtZX1gKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbC50cmltKCk7XG59XG5leHBvcnRzLmdldElucHV0ID0gZ2V0SW5wdXQ7XG4vKipcbiAqIFNldHMgdGhlIHZhbHVlIG9mIGFuIG91dHB1dC5cbiAqXG4gKiBAcGFyYW0gICAgIG5hbWUgICAgIG5hbWUgb2YgdGhlIG91dHB1dCB0byBzZXRcbiAqIEBwYXJhbSAgICAgdmFsdWUgICAgdmFsdWUgdG8gc3RvcmVcbiAqL1xuZnVuY3Rpb24gc2V0T3V0cHV0KG5hbWUsIHZhbHVlKSB7XG4gICAgY29tbWFuZF8xLmlzc3VlQ29tbWFuZCgnc2V0LW91dHB1dCcsIHsgbmFtZSB9LCB2YWx1ZSk7XG59XG5leHBvcnRzLnNldE91dHB1dCA9IHNldE91dHB1dDtcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFJlc3VsdHNcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8qKlxuICogU2V0cyB0aGUgYWN0aW9uIHN0YXR1cyB0byBmYWlsZWQuXG4gKiBXaGVuIHRoZSBhY3Rpb24gZXhpdHMgaXQgd2lsbCBiZSB3aXRoIGFuIGV4aXQgY29kZSBvZiAxXG4gKiBAcGFyYW0gbWVzc2FnZSBhZGQgZXJyb3IgaXNzdWUgbWVzc2FnZVxuICovXG5mdW5jdGlvbiBzZXRGYWlsZWQobWVzc2FnZSkge1xuICAgIHByb2Nlc3MuZXhpdENvZGUgPSBFeGl0Q29kZS5GYWlsdXJlO1xuICAgIGVycm9yKG1lc3NhZ2UpO1xufVxuZXhwb3J0cy5zZXRGYWlsZWQgPSBzZXRGYWlsZWQ7XG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBMb2dnaW5nIENvbW1hbmRzXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vKipcbiAqIFdyaXRlcyBkZWJ1ZyBtZXNzYWdlIHRvIHVzZXIgbG9nXG4gKiBAcGFyYW0gbWVzc2FnZSBkZWJ1ZyBtZXNzYWdlXG4gKi9cbmZ1bmN0aW9uIGRlYnVnKG1lc3NhZ2UpIHtcbiAgICBjb21tYW5kXzEuaXNzdWVDb21tYW5kKCdkZWJ1ZycsIHt9LCBtZXNzYWdlKTtcbn1cbmV4cG9ydHMuZGVidWcgPSBkZWJ1Zztcbi8qKlxuICogQWRkcyBhbiBlcnJvciBpc3N1ZVxuICogQHBhcmFtIG1lc3NhZ2UgZXJyb3IgaXNzdWUgbWVzc2FnZVxuICovXG5mdW5jdGlvbiBlcnJvcihtZXNzYWdlKSB7XG4gICAgY29tbWFuZF8xLmlzc3VlKCdlcnJvcicsIG1lc3NhZ2UpO1xufVxuZXhwb3J0cy5lcnJvciA9IGVycm9yO1xuLyoqXG4gKiBBZGRzIGFuIHdhcm5pbmcgaXNzdWVcbiAqIEBwYXJhbSBtZXNzYWdlIHdhcm5pbmcgaXNzdWUgbWVzc2FnZVxuICovXG5mdW5jdGlvbiB3YXJuaW5nKG1lc3NhZ2UpIHtcbiAgICBjb21tYW5kXzEuaXNzdWUoJ3dhcm5pbmcnLCBtZXNzYWdlKTtcbn1cbmV4cG9ydHMud2FybmluZyA9IHdhcm5pbmc7XG4vKipcbiAqIFdyaXRlcyBpbmZvIHRvIGxvZyB3aXRoIGNvbnNvbGUubG9nLlxuICogQHBhcmFtIG1lc3NhZ2UgaW5mbyBtZXNzYWdlXG4gKi9cbmZ1bmN0aW9uIGluZm8obWVzc2FnZSkge1xuICAgIHByb2Nlc3Muc3Rkb3V0LndyaXRlKG1lc3NhZ2UgKyBvcy5FT0wpO1xufVxuZXhwb3J0cy5pbmZvID0gaW5mbztcbi8qKlxuICogQmVnaW4gYW4gb3V0cHV0IGdyb3VwLlxuICpcbiAqIE91dHB1dCB1bnRpbCB0aGUgbmV4dCBgZ3JvdXBFbmRgIHdpbGwgYmUgZm9sZGFibGUgaW4gdGhpcyBncm91cFxuICpcbiAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBvdXRwdXQgZ3JvdXBcbiAqL1xuZnVuY3Rpb24gc3RhcnRHcm91cChuYW1lKSB7XG4gICAgY29tbWFuZF8xLmlzc3VlKCdncm91cCcsIG5hbWUpO1xufVxuZXhwb3J0cy5zdGFydEdyb3VwID0gc3RhcnRHcm91cDtcbi8qKlxuICogRW5kIGFuIG91dHB1dCBncm91cC5cbiAqL1xuZnVuY3Rpb24gZW5kR3JvdXAoKSB7XG4gICAgY29tbWFuZF8xLmlzc3VlKCdlbmRncm91cCcpO1xufVxuZXhwb3J0cy5lbmRHcm91cCA9IGVuZEdyb3VwO1xuLyoqXG4gKiBXcmFwIGFuIGFzeW5jaHJvbm91cyBmdW5jdGlvbiBjYWxsIGluIGEgZ3JvdXAuXG4gKlxuICogUmV0dXJucyB0aGUgc2FtZSB0eXBlIGFzIHRoZSBmdW5jdGlvbiBpdHNlbGYuXG4gKlxuICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIGdyb3VwXG4gKiBAcGFyYW0gZm4gVGhlIGZ1bmN0aW9uIHRvIHdyYXAgaW4gdGhlIGdyb3VwXG4gKi9cbmZ1bmN0aW9uIGdyb3VwKG5hbWUsIGZuKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgc3RhcnRHcm91cChuYW1lKTtcbiAgICAgICAgbGV0IHJlc3VsdDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHlpZWxkIGZuKCk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBlbmRHcm91cCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSk7XG59XG5leHBvcnRzLmdyb3VwID0gZ3JvdXA7XG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBXcmFwcGVyIGFjdGlvbiBzdGF0ZVxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLyoqXG4gKiBTYXZlcyBzdGF0ZSBmb3IgY3VycmVudCBhY3Rpb24sIHRoZSBzdGF0ZSBjYW4gb25seSBiZSByZXRyaWV2ZWQgYnkgdGhpcyBhY3Rpb24ncyBwb3N0IGpvYiBleGVjdXRpb24uXG4gKlxuICogQHBhcmFtICAgICBuYW1lICAgICBuYW1lIG9mIHRoZSBzdGF0ZSB0byBzdG9yZVxuICogQHBhcmFtICAgICB2YWx1ZSAgICB2YWx1ZSB0byBzdG9yZVxuICovXG5mdW5jdGlvbiBzYXZlU3RhdGUobmFtZSwgdmFsdWUpIHtcbiAgICBjb21tYW5kXzEuaXNzdWVDb21tYW5kKCdzYXZlLXN0YXRlJywgeyBuYW1lIH0sIHZhbHVlKTtcbn1cbmV4cG9ydHMuc2F2ZVN0YXRlID0gc2F2ZVN0YXRlO1xuLyoqXG4gKiBHZXRzIHRoZSB2YWx1ZSBvZiBhbiBzdGF0ZSBzZXQgYnkgdGhpcyBhY3Rpb24ncyBtYWluIGV4ZWN1dGlvbi5cbiAqXG4gKiBAcGFyYW0gICAgIG5hbWUgICAgIG5hbWUgb2YgdGhlIHN0YXRlIHRvIGdldFxuICogQHJldHVybnMgICBzdHJpbmdcbiAqL1xuZnVuY3Rpb24gZ2V0U3RhdGUobmFtZSkge1xuICAgIHJldHVybiBwcm9jZXNzLmVudltgU1RBVEVfJHtuYW1lfWBdIHx8ICcnO1xufVxuZXhwb3J0cy5nZXRTdGF0ZSA9IGdldFN0YXRlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29yZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgdHIgPSByZXF1aXJlKFwiLi90b29scnVubmVyXCIpO1xuLyoqXG4gKiBFeGVjIGEgY29tbWFuZC5cbiAqIE91dHB1dCB3aWxsIGJlIHN0cmVhbWVkIHRvIHRoZSBsaXZlIGNvbnNvbGUuXG4gKiBSZXR1cm5zIHByb21pc2Ugd2l0aCByZXR1cm4gY29kZVxuICpcbiAqIEBwYXJhbSAgICAgY29tbWFuZExpbmUgICAgICAgIGNvbW1hbmQgdG8gZXhlY3V0ZSAoY2FuIGluY2x1ZGUgYWRkaXRpb25hbCBhcmdzKS4gTXVzdCBiZSBjb3JyZWN0bHkgZXNjYXBlZC5cbiAqIEBwYXJhbSAgICAgYXJncyAgICAgICAgICAgICAgIG9wdGlvbmFsIGFyZ3VtZW50cyBmb3IgdG9vbC4gRXNjYXBpbmcgaXMgaGFuZGxlZCBieSB0aGUgbGliLlxuICogQHBhcmFtICAgICBvcHRpb25zICAgICAgICAgICAgb3B0aW9uYWwgZXhlYyBvcHRpb25zLiAgU2VlIEV4ZWNPcHRpb25zXG4gKiBAcmV0dXJucyAgIFByb21pc2U8bnVtYmVyPiAgICBleGl0IGNvZGVcbiAqL1xuZnVuY3Rpb24gZXhlYyhjb21tYW5kTGluZSwgYXJncywgb3B0aW9ucykge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGNvbnN0IGNvbW1hbmRBcmdzID0gdHIuYXJnU3RyaW5nVG9BcnJheShjb21tYW5kTGluZSk7XG4gICAgICAgIGlmIChjb21tYW5kQXJncy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgUGFyYW1ldGVyICdjb21tYW5kTGluZScgY2Fubm90IGJlIG51bGwgb3IgZW1wdHkuYCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gUGF0aCB0byB0b29sIHRvIGV4ZWN1dGUgc2hvdWxkIGJlIGZpcnN0IGFyZ1xuICAgICAgICBjb25zdCB0b29sUGF0aCA9IGNvbW1hbmRBcmdzWzBdO1xuICAgICAgICBhcmdzID0gY29tbWFuZEFyZ3Muc2xpY2UoMSkuY29uY2F0KGFyZ3MgfHwgW10pO1xuICAgICAgICBjb25zdCBydW5uZXIgPSBuZXcgdHIuVG9vbFJ1bm5lcih0b29sUGF0aCwgYXJncywgb3B0aW9ucyk7XG4gICAgICAgIHJldHVybiBydW5uZXIuZXhlYygpO1xuICAgIH0pO1xufVxuZXhwb3J0cy5leGVjID0gZXhlYztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWV4ZWMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IG9zID0gcmVxdWlyZShcIm9zXCIpO1xuY29uc3QgZXZlbnRzID0gcmVxdWlyZShcImV2ZW50c1wiKTtcbmNvbnN0IGNoaWxkID0gcmVxdWlyZShcImNoaWxkX3Byb2Nlc3NcIik7XG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvdW5ib3VuZC1tZXRob2QgKi9cbmNvbnN0IElTX1dJTkRPV1MgPSBwcm9jZXNzLnBsYXRmb3JtID09PSAnd2luMzInO1xuLypcbiAqIENsYXNzIGZvciBydW5uaW5nIGNvbW1hbmQgbGluZSB0b29scy4gSGFuZGxlcyBxdW90aW5nIGFuZCBhcmcgcGFyc2luZyBpbiBhIHBsYXRmb3JtIGFnbm9zdGljIHdheS5cbiAqL1xuY2xhc3MgVG9vbFJ1bm5lciBleHRlbmRzIGV2ZW50cy5FdmVudEVtaXR0ZXIge1xuICAgIGNvbnN0cnVjdG9yKHRvb2xQYXRoLCBhcmdzLCBvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIGlmICghdG9vbFBhdGgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlBhcmFtZXRlciAndG9vbFBhdGgnIGNhbm5vdCBiZSBudWxsIG9yIGVtcHR5LlwiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRvb2xQYXRoID0gdG9vbFBhdGg7XG4gICAgICAgIHRoaXMuYXJncyA9IGFyZ3MgfHwgW107XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgfVxuICAgIF9kZWJ1ZyhtZXNzYWdlKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMubGlzdGVuZXJzICYmIHRoaXMub3B0aW9ucy5saXN0ZW5lcnMuZGVidWcpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5saXN0ZW5lcnMuZGVidWcobWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2dldENvbW1hbmRTdHJpbmcob3B0aW9ucywgbm9QcmVmaXgpIHtcbiAgICAgICAgY29uc3QgdG9vbFBhdGggPSB0aGlzLl9nZXRTcGF3bkZpbGVOYW1lKCk7XG4gICAgICAgIGNvbnN0IGFyZ3MgPSB0aGlzLl9nZXRTcGF3bkFyZ3Mob3B0aW9ucyk7XG4gICAgICAgIGxldCBjbWQgPSBub1ByZWZpeCA/ICcnIDogJ1tjb21tYW5kXSc7IC8vIG9taXQgcHJlZml4IHdoZW4gcGlwZWQgdG8gYSBzZWNvbmQgdG9vbFxuICAgICAgICBpZiAoSVNfV0lORE9XUykge1xuICAgICAgICAgICAgLy8gV2luZG93cyArIGNtZCBmaWxlXG4gICAgICAgICAgICBpZiAodGhpcy5faXNDbWRGaWxlKCkpIHtcbiAgICAgICAgICAgICAgICBjbWQgKz0gdG9vbFBhdGg7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBhIG9mIGFyZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgY21kICs9IGAgJHthfWA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gV2luZG93cyArIHZlcmJhdGltXG4gICAgICAgICAgICBlbHNlIGlmIChvcHRpb25zLndpbmRvd3NWZXJiYXRpbUFyZ3VtZW50cykge1xuICAgICAgICAgICAgICAgIGNtZCArPSBgXCIke3Rvb2xQYXRofVwiYDtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGEgb2YgYXJncykge1xuICAgICAgICAgICAgICAgICAgICBjbWQgKz0gYCAke2F9YDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBXaW5kb3dzIChyZWd1bGFyKVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY21kICs9IHRoaXMuX3dpbmRvd3NRdW90ZUNtZEFyZyh0b29sUGF0aCk7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBhIG9mIGFyZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgY21kICs9IGAgJHt0aGlzLl93aW5kb3dzUXVvdGVDbWRBcmcoYSl9YDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBPU1gvTGludXggLSB0aGlzIGNhbiBsaWtlbHkgYmUgaW1wcm92ZWQgd2l0aCBzb21lIGZvcm0gb2YgcXVvdGluZy5cbiAgICAgICAgICAgIC8vIGNyZWF0aW5nIHByb2Nlc3NlcyBvbiBVbml4IGlzIGZ1bmRhbWVudGFsbHkgZGlmZmVyZW50IHRoYW4gV2luZG93cy5cbiAgICAgICAgICAgIC8vIG9uIFVuaXgsIGV4ZWN2cCgpIHRha2VzIGFuIGFyZyBhcnJheS5cbiAgICAgICAgICAgIGNtZCArPSB0b29sUGF0aDtcbiAgICAgICAgICAgIGZvciAoY29uc3QgYSBvZiBhcmdzKSB7XG4gICAgICAgICAgICAgICAgY21kICs9IGAgJHthfWA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNtZDtcbiAgICB9XG4gICAgX3Byb2Nlc3NMaW5lQnVmZmVyKGRhdGEsIHN0ckJ1ZmZlciwgb25MaW5lKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgcyA9IHN0ckJ1ZmZlciArIGRhdGEudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIGxldCBuID0gcy5pbmRleE9mKG9zLkVPTCk7XG4gICAgICAgICAgICB3aGlsZSAobiA+IC0xKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbGluZSA9IHMuc3Vic3RyaW5nKDAsIG4pO1xuICAgICAgICAgICAgICAgIG9uTGluZShsaW5lKTtcbiAgICAgICAgICAgICAgICAvLyB0aGUgcmVzdCBvZiB0aGUgc3RyaW5nIC4uLlxuICAgICAgICAgICAgICAgIHMgPSBzLnN1YnN0cmluZyhuICsgb3MuRU9MLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgbiA9IHMuaW5kZXhPZihvcy5FT0wpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3RyQnVmZmVyID0gcztcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAvLyBzdHJlYW1pbmcgbGluZXMgdG8gY29uc29sZSBpcyBiZXN0IGVmZm9ydC4gIERvbid0IGZhaWwgYSBidWlsZC5cbiAgICAgICAgICAgIHRoaXMuX2RlYnVnKGBlcnJvciBwcm9jZXNzaW5nIGxpbmUuIEZhaWxlZCB3aXRoIGVycm9yICR7ZXJyfWApO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9nZXRTcGF3bkZpbGVOYW1lKCkge1xuICAgICAgICBpZiAoSVNfV0lORE9XUykge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2lzQ21kRmlsZSgpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb2Nlc3MuZW52WydDT01TUEVDJ10gfHwgJ2NtZC5leGUnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnRvb2xQYXRoO1xuICAgIH1cbiAgICBfZ2V0U3Bhd25BcmdzKG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKElTX1dJTkRPV1MpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9pc0NtZEZpbGUoKSkge1xuICAgICAgICAgICAgICAgIGxldCBhcmdsaW5lID0gYC9EIC9TIC9DIFwiJHt0aGlzLl93aW5kb3dzUXVvdGVDbWRBcmcodGhpcy50b29sUGF0aCl9YDtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGEgb2YgdGhpcy5hcmdzKSB7XG4gICAgICAgICAgICAgICAgICAgIGFyZ2xpbmUgKz0gJyAnO1xuICAgICAgICAgICAgICAgICAgICBhcmdsaW5lICs9IG9wdGlvbnMud2luZG93c1ZlcmJhdGltQXJndW1lbnRzXG4gICAgICAgICAgICAgICAgICAgICAgICA/IGFcbiAgICAgICAgICAgICAgICAgICAgICAgIDogdGhpcy5fd2luZG93c1F1b3RlQ21kQXJnKGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhcmdsaW5lICs9ICdcIic7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFthcmdsaW5lXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5hcmdzO1xuICAgIH1cbiAgICBfZW5kc1dpdGgoc3RyLCBlbmQpIHtcbiAgICAgICAgcmV0dXJuIHN0ci5lbmRzV2l0aChlbmQpO1xuICAgIH1cbiAgICBfaXNDbWRGaWxlKCkge1xuICAgICAgICBjb25zdCB1cHBlclRvb2xQYXRoID0gdGhpcy50b29sUGF0aC50b1VwcGVyQ2FzZSgpO1xuICAgICAgICByZXR1cm4gKHRoaXMuX2VuZHNXaXRoKHVwcGVyVG9vbFBhdGgsICcuQ01EJykgfHxcbiAgICAgICAgICAgIHRoaXMuX2VuZHNXaXRoKHVwcGVyVG9vbFBhdGgsICcuQkFUJykpO1xuICAgIH1cbiAgICBfd2luZG93c1F1b3RlQ21kQXJnKGFyZykge1xuICAgICAgICAvLyBmb3IgLmV4ZSwgYXBwbHkgdGhlIG5vcm1hbCBxdW90aW5nIHJ1bGVzIHRoYXQgbGlidXYgYXBwbGllc1xuICAgICAgICBpZiAoIXRoaXMuX2lzQ21kRmlsZSgpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdXZRdW90ZUNtZEFyZyhhcmcpO1xuICAgICAgICB9XG4gICAgICAgIC8vIG90aGVyd2lzZSBhcHBseSBxdW90aW5nIHJ1bGVzIHNwZWNpZmljIHRvIHRoZSBjbWQuZXhlIGNvbW1hbmQgbGluZSBwYXJzZXIuXG4gICAgICAgIC8vIHRoZSBsaWJ1diBydWxlcyBhcmUgZ2VuZXJpYyBhbmQgYXJlIG5vdCBkZXNpZ25lZCBzcGVjaWZpY2FsbHkgZm9yIGNtZC5leGVcbiAgICAgICAgLy8gY29tbWFuZCBsaW5lIHBhcnNlci5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gZm9yIGEgZGV0YWlsZWQgZGVzY3JpcHRpb24gb2YgdGhlIGNtZC5leGUgY29tbWFuZCBsaW5lIHBhcnNlciwgcmVmZXIgdG9cbiAgICAgICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy80MDk0Njk5L2hvdy1kb2VzLXRoZS13aW5kb3dzLWNvbW1hbmQtaW50ZXJwcmV0ZXItY21kLWV4ZS1wYXJzZS1zY3JpcHRzLzc5NzA5MTIjNzk3MDkxMlxuICAgICAgICAvLyBuZWVkIHF1b3RlcyBmb3IgZW1wdHkgYXJnXG4gICAgICAgIGlmICghYXJnKSB7XG4gICAgICAgICAgICByZXR1cm4gJ1wiXCInO1xuICAgICAgICB9XG4gICAgICAgIC8vIGRldGVybWluZSB3aGV0aGVyIHRoZSBhcmcgbmVlZHMgdG8gYmUgcXVvdGVkXG4gICAgICAgIGNvbnN0IGNtZFNwZWNpYWxDaGFycyA9IFtcbiAgICAgICAgICAgICcgJyxcbiAgICAgICAgICAgICdcXHQnLFxuICAgICAgICAgICAgJyYnLFxuICAgICAgICAgICAgJygnLFxuICAgICAgICAgICAgJyknLFxuICAgICAgICAgICAgJ1snLFxuICAgICAgICAgICAgJ10nLFxuICAgICAgICAgICAgJ3snLFxuICAgICAgICAgICAgJ30nLFxuICAgICAgICAgICAgJ14nLFxuICAgICAgICAgICAgJz0nLFxuICAgICAgICAgICAgJzsnLFxuICAgICAgICAgICAgJyEnLFxuICAgICAgICAgICAgXCInXCIsXG4gICAgICAgICAgICAnKycsXG4gICAgICAgICAgICAnLCcsXG4gICAgICAgICAgICAnYCcsXG4gICAgICAgICAgICAnficsXG4gICAgICAgICAgICAnfCcsXG4gICAgICAgICAgICAnPCcsXG4gICAgICAgICAgICAnPicsXG4gICAgICAgICAgICAnXCInXG4gICAgICAgIF07XG4gICAgICAgIGxldCBuZWVkc1F1b3RlcyA9IGZhbHNlO1xuICAgICAgICBmb3IgKGNvbnN0IGNoYXIgb2YgYXJnKSB7XG4gICAgICAgICAgICBpZiAoY21kU3BlY2lhbENoYXJzLnNvbWUoeCA9PiB4ID09PSBjaGFyKSkge1xuICAgICAgICAgICAgICAgIG5lZWRzUXVvdGVzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBzaG9ydC1jaXJjdWl0IGlmIHF1b3RlcyBub3QgbmVlZGVkXG4gICAgICAgIGlmICghbmVlZHNRdW90ZXMpIHtcbiAgICAgICAgICAgIHJldHVybiBhcmc7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdGhlIGZvbGxvd2luZyBxdW90aW5nIHJ1bGVzIGFyZSB2ZXJ5IHNpbWlsYXIgdG8gdGhlIHJ1bGVzIHRoYXQgYnkgbGlidXYgYXBwbGllcy5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gMSkgd3JhcCB0aGUgc3RyaW5nIGluIHF1b3Rlc1xuICAgICAgICAvL1xuICAgICAgICAvLyAyKSBkb3VibGUtdXAgcXVvdGVzIC0gaS5lLiBcIiA9PiBcIlwiXG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgIHRoaXMgaXMgZGlmZmVyZW50IGZyb20gdGhlIGxpYnV2IHF1b3RpbmcgcnVsZXMuIGxpYnV2IHJlcGxhY2VzIFwiIHdpdGggXFxcIiwgd2hpY2ggdW5mb3J0dW5hdGVseVxuICAgICAgICAvLyAgICBkb2Vzbid0IHdvcmsgd2VsbCB3aXRoIGEgY21kLmV4ZSBjb21tYW5kIGxpbmUuXG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgIG5vdGUsIHJlcGxhY2luZyBcIiB3aXRoIFwiXCIgYWxzbyB3b3JrcyB3ZWxsIGlmIHRoZSBhcmcgaXMgcGFzc2VkIHRvIGEgZG93bnN0cmVhbSAuTkVUIGNvbnNvbGUgYXBwLlxuICAgICAgICAvLyAgICBmb3IgZXhhbXBsZSwgdGhlIGNvbW1hbmQgbGluZTpcbiAgICAgICAgLy8gICAgICAgICAgZm9vLmV4ZSBcIm15YXJnOlwiXCJteSB2YWxcIlwiXCJcbiAgICAgICAgLy8gICAgaXMgcGFyc2VkIGJ5IGEgLk5FVCBjb25zb2xlIGFwcCBpbnRvIGFuIGFyZyBhcnJheTpcbiAgICAgICAgLy8gICAgICAgICAgWyBcIm15YXJnOlxcXCJteSB2YWxcXFwiXCIgXVxuICAgICAgICAvLyAgICB3aGljaCBpcyB0aGUgc2FtZSBlbmQgcmVzdWx0IHdoZW4gYXBwbHlpbmcgbGlidXYgcXVvdGluZyBydWxlcy4gYWx0aG91Z2ggdGhlIGFjdHVhbFxuICAgICAgICAvLyAgICBjb21tYW5kIGxpbmUgZnJvbSBsaWJ1diBxdW90aW5nIHJ1bGVzIHdvdWxkIGxvb2sgbGlrZTpcbiAgICAgICAgLy8gICAgICAgICAgZm9vLmV4ZSBcIm15YXJnOlxcXCJteSB2YWxcXFwiXCJcbiAgICAgICAgLy9cbiAgICAgICAgLy8gMykgZG91YmxlLXVwIHNsYXNoZXMgdGhhdCBwcmVjZWRlIGEgcXVvdGUsXG4gICAgICAgIC8vICAgIGUuZy4gIGhlbGxvIFxcd29ybGQgICAgPT4gXCJoZWxsbyBcXHdvcmxkXCJcbiAgICAgICAgLy8gICAgICAgICAgaGVsbG9cXFwid29ybGQgICAgPT4gXCJoZWxsb1xcXFxcIlwid29ybGRcIlxuICAgICAgICAvLyAgICAgICAgICBoZWxsb1xcXFxcIndvcmxkICAgPT4gXCJoZWxsb1xcXFxcXFxcXCJcIndvcmxkXCJcbiAgICAgICAgLy8gICAgICAgICAgaGVsbG8gd29ybGRcXCAgICA9PiBcImhlbGxvIHdvcmxkXFxcXFwiXG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgIHRlY2huaWNhbGx5IHRoaXMgaXMgbm90IHJlcXVpcmVkIGZvciBhIGNtZC5leGUgY29tbWFuZCBsaW5lLCBvciB0aGUgYmF0Y2ggYXJndW1lbnQgcGFyc2VyLlxuICAgICAgICAvLyAgICB0aGUgcmVhc29ucyBmb3IgaW5jbHVkaW5nIHRoaXMgYXMgYSAuY21kIHF1b3RpbmcgcnVsZSBhcmU6XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgIGEpIHRoaXMgaXMgb3B0aW1pemVkIGZvciB0aGUgc2NlbmFyaW8gd2hlcmUgdGhlIGFyZ3VtZW50IGlzIHBhc3NlZCBmcm9tIHRoZSAuY21kIGZpbGUgdG8gYW5cbiAgICAgICAgLy8gICAgICAgZXh0ZXJuYWwgcHJvZ3JhbS4gbWFueSBwcm9ncmFtcyAoZS5nLiAuTkVUIGNvbnNvbGUgYXBwcykgcmVseSBvbiB0aGUgc2xhc2gtZG91YmxpbmcgcnVsZS5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgYikgaXQncyB3aGF0IHdlJ3ZlIGJlZW4gZG9pbmcgcHJldmlvdXNseSAoYnkgZGVmZXJyaW5nIHRvIG5vZGUgZGVmYXVsdCBiZWhhdmlvcikgYW5kIHdlXG4gICAgICAgIC8vICAgICAgIGhhdmVuJ3QgaGVhcmQgYW55IGNvbXBsYWludHMgYWJvdXQgdGhhdCBhc3BlY3QuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIG5vdGUsIGEgd2Vha25lc3Mgb2YgdGhlIHF1b3RpbmcgcnVsZXMgY2hvc2VuIGhlcmUsIGlzIHRoYXQgJSBpcyBub3QgZXNjYXBlZC4gaW4gZmFjdCwgJSBjYW5ub3QgYmVcbiAgICAgICAgLy8gZXNjYXBlZCB3aGVuIHVzZWQgb24gdGhlIGNvbW1hbmQgbGluZSBkaXJlY3RseSAtIGV2ZW4gdGhvdWdoIHdpdGhpbiBhIC5jbWQgZmlsZSAlIGNhbiBiZSBlc2NhcGVkXG4gICAgICAgIC8vIGJ5IHVzaW5nICUlLlxuICAgICAgICAvL1xuICAgICAgICAvLyB0aGUgc2F2aW5nIGdyYWNlIGlzLCBvbiB0aGUgY29tbWFuZCBsaW5lLCAldmFyJSBpcyBsZWZ0IGFzLWlzIGlmIHZhciBpcyBub3QgZGVmaW5lZC4gdGhpcyBjb250cmFzdHNcbiAgICAgICAgLy8gdGhlIGxpbmUgcGFyc2luZyBydWxlcyB3aXRoaW4gYSAuY21kIGZpbGUsIHdoZXJlIGlmIHZhciBpcyBub3QgZGVmaW5lZCBpdCBpcyByZXBsYWNlZCB3aXRoIG5vdGhpbmcuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIG9uZSBvcHRpb24gdGhhdCB3YXMgZXhwbG9yZWQgd2FzIHJlcGxhY2luZyAlIHdpdGggXiUgLSBpLmUuICV2YXIlID0+IF4ldmFyXiUuIHRoaXMgaGFjayB3b3VsZFxuICAgICAgICAvLyBvZnRlbiB3b3JrLCBzaW5jZSBpdCBpcyB1bmxpa2VseSB0aGF0IHZhcl4gd291bGQgZXhpc3QsIGFuZCB0aGUgXiBjaGFyYWN0ZXIgaXMgcmVtb3ZlZCB3aGVuIHRoZVxuICAgICAgICAvLyB2YXJpYWJsZSBpcyB1c2VkLiB0aGUgcHJvYmxlbSwgaG93ZXZlciwgaXMgdGhhdCBeIGlzIG5vdCByZW1vdmVkIHdoZW4gJSogaXMgdXNlZCB0byBwYXNzIHRoZSBhcmdzXG4gICAgICAgIC8vIHRvIGFuIGV4dGVybmFsIHByb2dyYW0uXG4gICAgICAgIC8vXG4gICAgICAgIC8vIGFuIHVuZXhwbG9yZWQgcG90ZW50aWFsIHNvbHV0aW9uIGZvciB0aGUgJSBlc2NhcGluZyBwcm9ibGVtLCBpcyB0byBjcmVhdGUgYSB3cmFwcGVyIC5jbWQgZmlsZS5cbiAgICAgICAgLy8gJSBjYW4gYmUgZXNjYXBlZCB3aXRoaW4gYSAuY21kIGZpbGUuXG4gICAgICAgIGxldCByZXZlcnNlID0gJ1wiJztcbiAgICAgICAgbGV0IHF1b3RlSGl0ID0gdHJ1ZTtcbiAgICAgICAgZm9yIChsZXQgaSA9IGFyZy5sZW5ndGg7IGkgPiAwOyBpLS0pIHtcbiAgICAgICAgICAgIC8vIHdhbGsgdGhlIHN0cmluZyBpbiByZXZlcnNlXG4gICAgICAgICAgICByZXZlcnNlICs9IGFyZ1tpIC0gMV07XG4gICAgICAgICAgICBpZiAocXVvdGVIaXQgJiYgYXJnW2kgLSAxXSA9PT0gJ1xcXFwnKSB7XG4gICAgICAgICAgICAgICAgcmV2ZXJzZSArPSAnXFxcXCc7IC8vIGRvdWJsZSB0aGUgc2xhc2hcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGFyZ1tpIC0gMV0gPT09ICdcIicpIHtcbiAgICAgICAgICAgICAgICBxdW90ZUhpdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmV2ZXJzZSArPSAnXCInOyAvLyBkb3VibGUgdGhlIHF1b3RlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBxdW90ZUhpdCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldmVyc2UgKz0gJ1wiJztcbiAgICAgICAgcmV0dXJuIHJldmVyc2VcbiAgICAgICAgICAgIC5zcGxpdCgnJylcbiAgICAgICAgICAgIC5yZXZlcnNlKClcbiAgICAgICAgICAgIC5qb2luKCcnKTtcbiAgICB9XG4gICAgX3V2UXVvdGVDbWRBcmcoYXJnKSB7XG4gICAgICAgIC8vIFRvb2wgcnVubmVyIHdyYXBzIGNoaWxkX3Byb2Nlc3Muc3Bhd24oKSBhbmQgbmVlZHMgdG8gYXBwbHkgdGhlIHNhbWUgcXVvdGluZyBhc1xuICAgICAgICAvLyBOb2RlIGluIGNlcnRhaW4gY2FzZXMgd2hlcmUgdGhlIHVuZG9jdW1lbnRlZCBzcGF3biBvcHRpb24gd2luZG93c1ZlcmJhdGltQXJndW1lbnRzXG4gICAgICAgIC8vIGlzIHVzZWQuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFNpbmNlIHRoaXMgZnVuY3Rpb24gaXMgYSBwb3J0IG9mIHF1b3RlX2NtZF9hcmcgZnJvbSBOb2RlIDQueCAodGVjaG5pY2FsbHksIGxpYiBVVixcbiAgICAgICAgLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9ub2RlanMvbm9kZS9ibG9iL3Y0LngvZGVwcy91di9zcmMvd2luL3Byb2Nlc3MuYyBmb3IgZGV0YWlscyksXG4gICAgICAgIC8vIHBhc3RpbmcgY29weXJpZ2h0IG5vdGljZSBmcm9tIE5vZGUgd2l0aGluIHRoaXMgZnVuY3Rpb246XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAgQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAgUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICAgICAgICAvLyAgICAgIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvXG4gICAgICAgIC8vICAgICAgZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGVcbiAgICAgICAgLy8gICAgICByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3JcbiAgICAgICAgLy8gICAgICBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICAgICAgICAvLyAgICAgIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAgVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAgICAgICAgLy8gICAgICBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgICBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gICAgICAgIC8vICAgICAgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gICAgICAgIC8vICAgICAgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gICAgICAgIC8vICAgICAgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICAgICAgICAvLyAgICAgIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HXG4gICAgICAgIC8vICAgICAgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HU1xuICAgICAgICAvLyAgICAgIElOIFRIRSBTT0ZUV0FSRS5cbiAgICAgICAgaWYgKCFhcmcpIHtcbiAgICAgICAgICAgIC8vIE5lZWQgZG91YmxlIHF1b3RhdGlvbiBmb3IgZW1wdHkgYXJndW1lbnRcbiAgICAgICAgICAgIHJldHVybiAnXCJcIic7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFhcmcuaW5jbHVkZXMoJyAnKSAmJiAhYXJnLmluY2x1ZGVzKCdcXHQnKSAmJiAhYXJnLmluY2x1ZGVzKCdcIicpKSB7XG4gICAgICAgICAgICAvLyBObyBxdW90YXRpb24gbmVlZGVkXG4gICAgICAgICAgICByZXR1cm4gYXJnO1xuICAgICAgICB9XG4gICAgICAgIGlmICghYXJnLmluY2x1ZGVzKCdcIicpICYmICFhcmcuaW5jbHVkZXMoJ1xcXFwnKSkge1xuICAgICAgICAgICAgLy8gTm8gZW1iZWRkZWQgZG91YmxlIHF1b3RlcyBvciBiYWNrc2xhc2hlcywgc28gSSBjYW4ganVzdCB3cmFwXG4gICAgICAgICAgICAvLyBxdW90ZSBtYXJrcyBhcm91bmQgdGhlIHdob2xlIHRoaW5nLlxuICAgICAgICAgICAgcmV0dXJuIGBcIiR7YXJnfVwiYDtcbiAgICAgICAgfVxuICAgICAgICAvLyBFeHBlY3RlZCBpbnB1dC9vdXRwdXQ6XG4gICAgICAgIC8vICAgaW5wdXQgOiBoZWxsb1wid29ybGRcbiAgICAgICAgLy8gICBvdXRwdXQ6IFwiaGVsbG9cXFwid29ybGRcIlxuICAgICAgICAvLyAgIGlucHV0IDogaGVsbG9cIlwid29ybGRcbiAgICAgICAgLy8gICBvdXRwdXQ6IFwiaGVsbG9cXFwiXFxcIndvcmxkXCJcbiAgICAgICAgLy8gICBpbnB1dCA6IGhlbGxvXFx3b3JsZFxuICAgICAgICAvLyAgIG91dHB1dDogaGVsbG9cXHdvcmxkXG4gICAgICAgIC8vICAgaW5wdXQgOiBoZWxsb1xcXFx3b3JsZFxuICAgICAgICAvLyAgIG91dHB1dDogaGVsbG9cXFxcd29ybGRcbiAgICAgICAgLy8gICBpbnB1dCA6IGhlbGxvXFxcIndvcmxkXG4gICAgICAgIC8vICAgb3V0cHV0OiBcImhlbGxvXFxcXFxcXCJ3b3JsZFwiXG4gICAgICAgIC8vICAgaW5wdXQgOiBoZWxsb1xcXFxcIndvcmxkXG4gICAgICAgIC8vICAgb3V0cHV0OiBcImhlbGxvXFxcXFxcXFxcXFwid29ybGRcIlxuICAgICAgICAvLyAgIGlucHV0IDogaGVsbG8gd29ybGRcXFxuICAgICAgICAvLyAgIG91dHB1dDogXCJoZWxsbyB3b3JsZFxcXFxcIiAtIG5vdGUgdGhlIGNvbW1lbnQgaW4gbGlidXYgYWN0dWFsbHkgcmVhZHMgXCJoZWxsbyB3b3JsZFxcXCJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1dCBpdCBhcHBlYXJzIHRoZSBjb21tZW50IGlzIHdyb25nLCBpdCBzaG91bGQgYmUgXCJoZWxsbyB3b3JsZFxcXFxcIlxuICAgICAgICBsZXQgcmV2ZXJzZSA9ICdcIic7XG4gICAgICAgIGxldCBxdW90ZUhpdCA9IHRydWU7XG4gICAgICAgIGZvciAobGV0IGkgPSBhcmcubGVuZ3RoOyBpID4gMDsgaS0tKSB7XG4gICAgICAgICAgICAvLyB3YWxrIHRoZSBzdHJpbmcgaW4gcmV2ZXJzZVxuICAgICAgICAgICAgcmV2ZXJzZSArPSBhcmdbaSAtIDFdO1xuICAgICAgICAgICAgaWYgKHF1b3RlSGl0ICYmIGFyZ1tpIC0gMV0gPT09ICdcXFxcJykge1xuICAgICAgICAgICAgICAgIHJldmVyc2UgKz0gJ1xcXFwnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoYXJnW2kgLSAxXSA9PT0gJ1wiJykge1xuICAgICAgICAgICAgICAgIHF1b3RlSGl0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXZlcnNlICs9ICdcXFxcJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHF1b3RlSGl0ID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV2ZXJzZSArPSAnXCInO1xuICAgICAgICByZXR1cm4gcmV2ZXJzZVxuICAgICAgICAgICAgLnNwbGl0KCcnKVxuICAgICAgICAgICAgLnJldmVyc2UoKVxuICAgICAgICAgICAgLmpvaW4oJycpO1xuICAgIH1cbiAgICBfY2xvbmVFeGVjT3B0aW9ucyhvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICBjb25zdCByZXN1bHQgPSB7XG4gICAgICAgICAgICBjd2Q6IG9wdGlvbnMuY3dkIHx8IHByb2Nlc3MuY3dkKCksXG4gICAgICAgICAgICBlbnY6IG9wdGlvbnMuZW52IHx8IHByb2Nlc3MuZW52LFxuICAgICAgICAgICAgc2lsZW50OiBvcHRpb25zLnNpbGVudCB8fCBmYWxzZSxcbiAgICAgICAgICAgIHdpbmRvd3NWZXJiYXRpbUFyZ3VtZW50czogb3B0aW9ucy53aW5kb3dzVmVyYmF0aW1Bcmd1bWVudHMgfHwgZmFsc2UsXG4gICAgICAgICAgICBmYWlsT25TdGRFcnI6IG9wdGlvbnMuZmFpbE9uU3RkRXJyIHx8IGZhbHNlLFxuICAgICAgICAgICAgaWdub3JlUmV0dXJuQ29kZTogb3B0aW9ucy5pZ25vcmVSZXR1cm5Db2RlIHx8IGZhbHNlLFxuICAgICAgICAgICAgZGVsYXk6IG9wdGlvbnMuZGVsYXkgfHwgMTAwMDBcbiAgICAgICAgfTtcbiAgICAgICAgcmVzdWx0Lm91dFN0cmVhbSA9IG9wdGlvbnMub3V0U3RyZWFtIHx8IHByb2Nlc3Muc3Rkb3V0O1xuICAgICAgICByZXN1bHQuZXJyU3RyZWFtID0gb3B0aW9ucy5lcnJTdHJlYW0gfHwgcHJvY2Vzcy5zdGRlcnI7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIF9nZXRTcGF3bk9wdGlvbnMob3B0aW9ucywgdG9vbFBhdGgpIHtcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHt9O1xuICAgICAgICByZXN1bHQuY3dkID0gb3B0aW9ucy5jd2Q7XG4gICAgICAgIHJlc3VsdC5lbnYgPSBvcHRpb25zLmVudjtcbiAgICAgICAgcmVzdWx0Wyd3aW5kb3dzVmVyYmF0aW1Bcmd1bWVudHMnXSA9XG4gICAgICAgICAgICBvcHRpb25zLndpbmRvd3NWZXJiYXRpbUFyZ3VtZW50cyB8fCB0aGlzLl9pc0NtZEZpbGUoKTtcbiAgICAgICAgaWYgKG9wdGlvbnMud2luZG93c1ZlcmJhdGltQXJndW1lbnRzKSB7XG4gICAgICAgICAgICByZXN1bHQuYXJndjAgPSBgXCIke3Rvb2xQYXRofVwiYDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFeGVjIGEgdG9vbC5cbiAgICAgKiBPdXRwdXQgd2lsbCBiZSBzdHJlYW1lZCB0byB0aGUgbGl2ZSBjb25zb2xlLlxuICAgICAqIFJldHVybnMgcHJvbWlzZSB3aXRoIHJldHVybiBjb2RlXG4gICAgICpcbiAgICAgKiBAcGFyYW0gICAgIHRvb2wgICAgIHBhdGggdG8gdG9vbCB0byBleGVjXG4gICAgICogQHBhcmFtICAgICBvcHRpb25zICBvcHRpb25hbCBleGVjIG9wdGlvbnMuICBTZWUgRXhlY09wdGlvbnNcbiAgICAgKiBAcmV0dXJucyAgIG51bWJlclxuICAgICAqL1xuICAgIGV4ZWMoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RlYnVnKGBleGVjIHRvb2w6ICR7dGhpcy50b29sUGF0aH1gKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9kZWJ1ZygnYXJndW1lbnRzOicpO1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgYXJnIG9mIHRoaXMuYXJncykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kZWJ1ZyhgICAgJHthcmd9YCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IG9wdGlvbnNOb25OdWxsID0gdGhpcy5fY2xvbmVFeGVjT3B0aW9ucyh0aGlzLm9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIGlmICghb3B0aW9uc05vbk51bGwuc2lsZW50ICYmIG9wdGlvbnNOb25OdWxsLm91dFN0cmVhbSkge1xuICAgICAgICAgICAgICAgICAgICBvcHRpb25zTm9uTnVsbC5vdXRTdHJlYW0ud3JpdGUodGhpcy5fZ2V0Q29tbWFuZFN0cmluZyhvcHRpb25zTm9uTnVsbCkgKyBvcy5FT0wpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBzdGF0ZSA9IG5ldyBFeGVjU3RhdGUob3B0aW9uc05vbk51bGwsIHRoaXMudG9vbFBhdGgpO1xuICAgICAgICAgICAgICAgIHN0YXRlLm9uKCdkZWJ1ZycsIChtZXNzYWdlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RlYnVnKG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGVOYW1lID0gdGhpcy5fZ2V0U3Bhd25GaWxlTmFtZSgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGNwID0gY2hpbGQuc3Bhd24oZmlsZU5hbWUsIHRoaXMuX2dldFNwYXduQXJncyhvcHRpb25zTm9uTnVsbCksIHRoaXMuX2dldFNwYXduT3B0aW9ucyh0aGlzLm9wdGlvbnMsIGZpbGVOYW1lKSk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RkYnVmZmVyID0gJyc7XG4gICAgICAgICAgICAgICAgaWYgKGNwLnN0ZG91dCkge1xuICAgICAgICAgICAgICAgICAgICBjcC5zdGRvdXQub24oJ2RhdGEnLCAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5saXN0ZW5lcnMgJiYgdGhpcy5vcHRpb25zLmxpc3RlbmVycy5zdGRvdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMubGlzdGVuZXJzLnN0ZG91dChkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghb3B0aW9uc05vbk51bGwuc2lsZW50ICYmIG9wdGlvbnNOb25OdWxsLm91dFN0cmVhbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnNOb25OdWxsLm91dFN0cmVhbS53cml0ZShkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Byb2Nlc3NMaW5lQnVmZmVyKGRhdGEsIHN0ZGJ1ZmZlciwgKGxpbmUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmxpc3RlbmVycyAmJiB0aGlzLm9wdGlvbnMubGlzdGVuZXJzLnN0ZGxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmxpc3RlbmVycy5zdGRsaW5lKGxpbmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgZXJyYnVmZmVyID0gJyc7XG4gICAgICAgICAgICAgICAgaWYgKGNwLnN0ZGVycikge1xuICAgICAgICAgICAgICAgICAgICBjcC5zdGRlcnIub24oJ2RhdGEnLCAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUucHJvY2Vzc1N0ZGVyciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmxpc3RlbmVycyAmJiB0aGlzLm9wdGlvbnMubGlzdGVuZXJzLnN0ZGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5saXN0ZW5lcnMuc3RkZXJyKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFvcHRpb25zTm9uTnVsbC5zaWxlbnQgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zTm9uTnVsbC5lcnJTdHJlYW0gJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zTm9uTnVsbC5vdXRTdHJlYW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzID0gb3B0aW9uc05vbk51bGwuZmFpbE9uU3RkRXJyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gb3B0aW9uc05vbk51bGwuZXJyU3RyZWFtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogb3B0aW9uc05vbk51bGwub3V0U3RyZWFtO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMud3JpdGUoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9wcm9jZXNzTGluZUJ1ZmZlcihkYXRhLCBlcnJidWZmZXIsIChsaW5lKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5saXN0ZW5lcnMgJiYgdGhpcy5vcHRpb25zLmxpc3RlbmVycy5lcnJsaW5lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5saXN0ZW5lcnMuZXJybGluZShsaW5lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNwLm9uKCdlcnJvcicsIChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUucHJvY2Vzc0Vycm9yID0gZXJyLm1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLnByb2Nlc3NFeGl0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5wcm9jZXNzQ2xvc2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUuQ2hlY2tDb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNwLm9uKCdleGl0JywgKGNvZGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUucHJvY2Vzc0V4aXRDb2RlID0gY29kZTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUucHJvY2Vzc0V4aXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RlYnVnKGBFeGl0IGNvZGUgJHtjb2RlfSByZWNlaXZlZCBmcm9tIHRvb2wgJyR7dGhpcy50b29sUGF0aH0nYCk7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLkNoZWNrQ29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjcC5vbignY2xvc2UnLCAoY29kZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5wcm9jZXNzRXhpdENvZGUgPSBjb2RlO1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5wcm9jZXNzRXhpdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUucHJvY2Vzc0Nsb3NlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RlYnVnKGBTVERJTyBzdHJlYW1zIGhhdmUgY2xvc2VkIGZvciB0b29sICcke3RoaXMudG9vbFBhdGh9J2ApO1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5DaGVja0NvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgc3RhdGUub24oJ2RvbmUnLCAoZXJyb3IsIGV4aXRDb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGRidWZmZXIubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdzdGRsaW5lJywgc3RkYnVmZmVyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyYnVmZmVyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgnZXJybGluZScsIGVycmJ1ZmZlcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY3AucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZXhpdENvZGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZXhwb3J0cy5Ub29sUnVubmVyID0gVG9vbFJ1bm5lcjtcbi8qKlxuICogQ29udmVydCBhbiBhcmcgc3RyaW5nIHRvIGFuIGFycmF5IG9mIGFyZ3MuIEhhbmRsZXMgZXNjYXBpbmdcbiAqXG4gKiBAcGFyYW0gICAgYXJnU3RyaW5nICAgc3RyaW5nIG9mIGFyZ3VtZW50c1xuICogQHJldHVybnMgIHN0cmluZ1tdICAgIGFycmF5IG9mIGFyZ3VtZW50c1xuICovXG5mdW5jdGlvbiBhcmdTdHJpbmdUb0FycmF5KGFyZ1N0cmluZykge1xuICAgIGNvbnN0IGFyZ3MgPSBbXTtcbiAgICBsZXQgaW5RdW90ZXMgPSBmYWxzZTtcbiAgICBsZXQgZXNjYXBlZCA9IGZhbHNlO1xuICAgIGxldCBhcmcgPSAnJztcbiAgICBmdW5jdGlvbiBhcHBlbmQoYykge1xuICAgICAgICAvLyB3ZSBvbmx5IGVzY2FwZSBkb3VibGUgcXVvdGVzLlxuICAgICAgICBpZiAoZXNjYXBlZCAmJiBjICE9PSAnXCInKSB7XG4gICAgICAgICAgICBhcmcgKz0gJ1xcXFwnO1xuICAgICAgICB9XG4gICAgICAgIGFyZyArPSBjO1xuICAgICAgICBlc2NhcGVkID0gZmFsc2U7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJnU3RyaW5nLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGMgPSBhcmdTdHJpbmcuY2hhckF0KGkpO1xuICAgICAgICBpZiAoYyA9PT0gJ1wiJykge1xuICAgICAgICAgICAgaWYgKCFlc2NhcGVkKSB7XG4gICAgICAgICAgICAgICAgaW5RdW90ZXMgPSAhaW5RdW90ZXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBhcHBlbmQoYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYyA9PT0gJ1xcXFwnICYmIGVzY2FwZWQpIHtcbiAgICAgICAgICAgIGFwcGVuZChjKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjID09PSAnXFxcXCcgJiYgaW5RdW90ZXMpIHtcbiAgICAgICAgICAgIGVzY2FwZWQgPSB0cnVlO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGMgPT09ICcgJyAmJiAhaW5RdW90ZXMpIHtcbiAgICAgICAgICAgIGlmIChhcmcubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGFyZ3MucHVzaChhcmcpO1xuICAgICAgICAgICAgICAgIGFyZyA9ICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgYXBwZW5kKGMpO1xuICAgIH1cbiAgICBpZiAoYXJnLmxlbmd0aCA+IDApIHtcbiAgICAgICAgYXJncy5wdXNoKGFyZy50cmltKCkpO1xuICAgIH1cbiAgICByZXR1cm4gYXJncztcbn1cbmV4cG9ydHMuYXJnU3RyaW5nVG9BcnJheSA9IGFyZ1N0cmluZ1RvQXJyYXk7XG5jbGFzcyBFeGVjU3RhdGUgZXh0ZW5kcyBldmVudHMuRXZlbnRFbWl0dGVyIHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zLCB0b29sUGF0aCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnByb2Nlc3NDbG9zZWQgPSBmYWxzZTsgLy8gdHJhY2tzIHdoZXRoZXIgdGhlIHByb2Nlc3MgaGFzIGV4aXRlZCBhbmQgc3RkaW8gaXMgY2xvc2VkXG4gICAgICAgIHRoaXMucHJvY2Vzc0Vycm9yID0gJyc7XG4gICAgICAgIHRoaXMucHJvY2Vzc0V4aXRDb2RlID0gMDtcbiAgICAgICAgdGhpcy5wcm9jZXNzRXhpdGVkID0gZmFsc2U7IC8vIHRyYWNrcyB3aGV0aGVyIHRoZSBwcm9jZXNzIGhhcyBleGl0ZWRcbiAgICAgICAgdGhpcy5wcm9jZXNzU3RkZXJyID0gZmFsc2U7IC8vIHRyYWNrcyB3aGV0aGVyIHN0ZGVyciB3YXMgd3JpdHRlbiB0b1xuICAgICAgICB0aGlzLmRlbGF5ID0gMTAwMDA7IC8vIDEwIHNlY29uZHNcbiAgICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgICAgIHRoaXMudGltZW91dCA9IG51bGw7XG4gICAgICAgIGlmICghdG9vbFBhdGgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigndG9vbFBhdGggbXVzdCBub3QgYmUgZW1wdHknKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICB0aGlzLnRvb2xQYXRoID0gdG9vbFBhdGg7XG4gICAgICAgIGlmIChvcHRpb25zLmRlbGF5KSB7XG4gICAgICAgICAgICB0aGlzLmRlbGF5ID0gb3B0aW9ucy5kZWxheTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBDaGVja0NvbXBsZXRlKCkge1xuICAgICAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucHJvY2Vzc0Nsb3NlZCkge1xuICAgICAgICAgICAgdGhpcy5fc2V0UmVzdWx0KCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5wcm9jZXNzRXhpdGVkKSB7XG4gICAgICAgICAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KEV4ZWNTdGF0ZS5IYW5kbGVUaW1lb3V0LCB0aGlzLmRlbGF5LCB0aGlzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfZGVidWcobWVzc2FnZSkge1xuICAgICAgICB0aGlzLmVtaXQoJ2RlYnVnJywgbWVzc2FnZSk7XG4gICAgfVxuICAgIF9zZXRSZXN1bHQoKSB7XG4gICAgICAgIC8vIGRldGVybWluZSB3aGV0aGVyIHRoZXJlIGlzIGFuIGVycm9yXG4gICAgICAgIGxldCBlcnJvcjtcbiAgICAgICAgaWYgKHRoaXMucHJvY2Vzc0V4aXRlZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJvY2Vzc0Vycm9yKSB7XG4gICAgICAgICAgICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoYFRoZXJlIHdhcyBhbiBlcnJvciB3aGVuIGF0dGVtcHRpbmcgdG8gZXhlY3V0ZSB0aGUgcHJvY2VzcyAnJHt0aGlzLnRvb2xQYXRofScuIFRoaXMgbWF5IGluZGljYXRlIHRoZSBwcm9jZXNzIGZhaWxlZCB0byBzdGFydC4gRXJyb3I6ICR7dGhpcy5wcm9jZXNzRXJyb3J9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLnByb2Nlc3NFeGl0Q29kZSAhPT0gMCAmJiAhdGhpcy5vcHRpb25zLmlnbm9yZVJldHVybkNvZGUpIHtcbiAgICAgICAgICAgICAgICBlcnJvciA9IG5ldyBFcnJvcihgVGhlIHByb2Nlc3MgJyR7dGhpcy50b29sUGF0aH0nIGZhaWxlZCB3aXRoIGV4aXQgY29kZSAke3RoaXMucHJvY2Vzc0V4aXRDb2RlfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5wcm9jZXNzU3RkZXJyICYmIHRoaXMub3B0aW9ucy5mYWlsT25TdGRFcnIpIHtcbiAgICAgICAgICAgICAgICBlcnJvciA9IG5ldyBFcnJvcihgVGhlIHByb2Nlc3MgJyR7dGhpcy50b29sUGF0aH0nIGZhaWxlZCBiZWNhdXNlIG9uZSBvciBtb3JlIGxpbmVzIHdlcmUgd3JpdHRlbiB0byB0aGUgU1RERVJSIHN0cmVhbWApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIGNsZWFyIHRoZSB0aW1lb3V0XG4gICAgICAgIGlmICh0aGlzLnRpbWVvdXQpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuICAgICAgICAgICAgdGhpcy50aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuICAgICAgICB0aGlzLmVtaXQoJ2RvbmUnLCBlcnJvciwgdGhpcy5wcm9jZXNzRXhpdENvZGUpO1xuICAgIH1cbiAgICBzdGF0aWMgSGFuZGxlVGltZW91dChzdGF0ZSkge1xuICAgICAgICBpZiAoc3RhdGUuZG9uZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghc3RhdGUucHJvY2Vzc0Nsb3NlZCAmJiBzdGF0ZS5wcm9jZXNzRXhpdGVkKSB7XG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gYFRoZSBTVERJTyBzdHJlYW1zIGRpZCBub3QgY2xvc2Ugd2l0aGluICR7c3RhdGUuZGVsYXkgL1xuICAgICAgICAgICAgICAgIDEwMDB9IHNlY29uZHMgb2YgdGhlIGV4aXQgZXZlbnQgZnJvbSBwcm9jZXNzICcke3N0YXRlLnRvb2xQYXRofScuIFRoaXMgbWF5IGluZGljYXRlIGEgY2hpbGQgcHJvY2VzcyBpbmhlcml0ZWQgdGhlIFNURElPIHN0cmVhbXMgYW5kIGhhcyBub3QgeWV0IGV4aXRlZC5gO1xuICAgICAgICAgICAgc3RhdGUuX2RlYnVnKG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIHN0YXRlLl9zZXRSZXN1bHQoKTtcbiAgICB9XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD10b29scnVubmVyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xuICAgIHJlc3VsdFtcImRlZmF1bHRcIl0gPSBtb2Q7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBmc18xID0gcmVxdWlyZShcImZzXCIpO1xuY29uc3QgY29yZSA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiQGFjdGlvbnMvY29yZVwiKSk7XG5jb25zdCBwYXRoXzEgPSByZXF1aXJlKFwicGF0aFwiKTtcbmNvbnN0IGV4ZWMgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcIkBhY3Rpb25zL2V4ZWNcIikpO1xuY2xhc3MgRG93bmxvYWQge1xuICAgIGNvbnN0cnVjdG9yKHZlcnNpb24pIHtcbiAgICAgICAgdGhpcy52ZXJzaW9uID0gdmVyc2lvbjtcbiAgICAgICAgdGhpcy5CQVNFX1VSTCA9ICdodHRwczovL2RsLmdvb2dsZS5jb20vZGwvY2xvdWRzZGsvY2hhbm5lbHMvcmFwaWQnO1xuICAgICAgICB0aGlzLnNka1VybCA9IHRoaXMuQkFTRV9VUkw7XG4gICAgICAgIHRoaXMuc2V0U2RrRG93bmxvYWRVcmwoKTtcbiAgICB9XG4gICAgZG93bmxvYWQoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICBjb25zdCBleHRlbnNpb24gPSB0aGlzLnNka1VybC5lbmRzV2l0aCgnLnppcCcpID8gJ3ppcCcgOiAndGFyLmd6JztcbiAgICAgICAgICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gcGF0aF8xLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgYGdvb2dsZS1jbG91ZC1zZGsuJHtleHRlbnNpb259YCk7XG4gICAgICAgICAgICBpZiAoZnNfMS5leGlzdHNTeW5jKGRlc3RpbmF0aW9uKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkZXN0aW5hdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvcmUuZGVidWcoYERvd25sb2FkaW5nICR7dGhpcy5zZGtVcmx9YCk7XG4gICAgICAgICAgICB5aWVsZCBleGVjLmV4ZWMoYGN1cmwgLXMgLW8gJHtkZXN0aW5hdGlvbn0gJHt0aGlzLnNka1VybH1gKTtcbiAgICAgICAgICAgIGNvcmUuZGVidWcoYERvd25sb2FkZWQgJHt0aGlzLnNka1VybH1gKTtcbiAgICAgICAgICAgIHJldHVybiBkZXN0aW5hdGlvbjtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNldFNka0Rvd25sb2FkVXJsKCkge1xuICAgICAgICBpZiAodGhpcy52ZXJzaW9uID09PSAnbGF0ZXN0Jykge1xuICAgICAgICAgICAgaWYgKHByb2Nlc3MucGxhdGZvcm0gPT09ICd3aW4zMicpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNka1VybCA9IGAke3RoaXMuQkFTRV9VUkx9L2dvb2dsZS1jbG91ZC1zZGsuemlwYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2RrVXJsID0gYCR7dGhpcy5CQVNFX1VSTH0vZ29vZ2xlLWNsb3VkLXNkay50YXIuZ3pgO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHByb2Nlc3MucGxhdGZvcm0gPT09ICd3aW4zMicpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNka1VybCA9IGAke3RoaXMuQkFTRV9VUkx9L2Rvd25sb2Fkcy9nb29nbGUtY2xvdWQtc2RrLSR7dGhpcy52ZXJzaW9ufS13aW5kb3dzLXg4Nl82NC56aXBgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ2RhcndpbicpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNka1VybCA9IGAke3RoaXMuQkFTRV9VUkx9L2Rvd25sb2Fkcy9nb29nbGUtY2xvdWQtc2RrLSR7dGhpcy52ZXJzaW9ufS1kYXJ3aW4teDg2XzY0LnRhci5nemA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNka1VybCA9IGAke3RoaXMuQkFTRV9VUkx9L2Rvd25sb2Fkcy9nb29nbGUtY2xvdWQtc2RrLSR7dGhpcy52ZXJzaW9ufS1saW51eC14ODZfNjQudGFyLmd6YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuRG93bmxvYWQgPSBEb3dubG9hZDtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19pbXBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydFN0YXIpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBpZiAobW9kICE9IG51bGwpIGZvciAodmFyIGsgaW4gbW9kKSBpZiAoT2JqZWN0Lmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgcmVzdWx0W2tdID0gbW9kW2tdO1xuICAgIHJlc3VsdFtcImRlZmF1bHRcIl0gPSBtb2Q7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBkb3dubG9hZF8xID0gcmVxdWlyZShcIi4vZG93bmxvYWRcIik7XG5jb25zdCBwYXRoXzEgPSByZXF1aXJlKFwicGF0aFwiKTtcbmNvbnN0IGNvcmUgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcIkBhY3Rpb25zL2NvcmVcIikpO1xuY29uc3QgZXhlYyA9IF9faW1wb3J0U3RhcihyZXF1aXJlKFwiQGFjdGlvbnMvZXhlY1wiKSk7XG5jb25zdCBmc18xID0gcmVxdWlyZShcImZzXCIpO1xuZnVuY3Rpb24gaW5zdGFsbCgpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zdCBkb3dubG9hZGVyID0gbmV3IGRvd25sb2FkXzEuRG93bmxvYWQoJ2xhdGVzdCcpO1xuICAgICAgICBjb25zdCBzZGtGaWxlID0geWllbGQgZG93bmxvYWRlci5kb3dubG9hZCgpO1xuICAgICAgICBjb25zdCBkZXN0aW5hdGlvbkZvbGRlciA9IHBhdGhfMS5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICdnb29nbGUtY2xvdWQtc2RrJyk7XG4gICAgICAgIGlmIChzZGtGaWxlLmVuZHNXaXRoKCcuemlwJykpIHtcbiAgICAgICAgICAgIHlpZWxkIGV4ZWMuZXhlYyhgRXhwYW5kLUFyY2hpdmUgJHtzZGtGaWxlfSAke2Rlc3RpbmF0aW9uRm9sZGVyfWApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgeWllbGQgZXhlYy5leGVjKGB0YXIgLXhmICR7c2RrRmlsZX1gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJykge1xuICAgICAgICAgICAgeWllbGQgZXhlYy5leGVjKCdkaXInKTtcbiAgICAgICAgICAgIHlpZWxkIGV4ZWMuZXhlYyhwYXRoXzEucmVzb2x2ZShkZXN0aW5hdGlvbkZvbGRlciwgJ2luc3RhbGwuYmF0IC0tZGlzYWJsZS1wcm9tcHRzJykpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHByb2Nlc3MucGxhdGZvcm0gPT0gJ2RhcndpbicpIHtcbiAgICAgICAgICAgIHlpZWxkIGV4ZWMuZXhlYyhwYXRoXzEucmVzb2x2ZShkZXN0aW5hdGlvbkZvbGRlciwgJ2luc3RhbGwuc2gnKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB5aWVsZCBleGVjLmV4ZWMocGF0aF8xLnJlc29sdmUoZGVzdGluYXRpb25Gb2xkZXIsICdpbnN0YWxsLnNoIC0tZGlzYWJsZS1wcm9tcHRzJykpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNlcnZpY2VBY2NvdW50S2V5QmFzZTY0ID0gY29yZS5nZXRJbnB1dCgnc2VydmljZS1hY2NvdW50LWtleScpO1xuICAgICAgICBjb25zdCBzZXJ2aWNlQWNjb3VudEtleUpzb24gPSBCdWZmZXIuZnJvbShzZXJ2aWNlQWNjb3VudEtleUJhc2U2NCwgJ2Jhc2U2NCcpO1xuICAgICAgICBjb25zdCBzZXJ2aWNlQWNjb3VudEtleVBhdGggPSBwYXRoXzEucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAnZ2Nsb3VkLmpzb24nKTtcbiAgICAgICAgZnNfMS53cml0ZUZpbGVTeW5jKHNlcnZpY2VBY2NvdW50S2V5UGF0aCwgc2VydmljZUFjY291bnRLZXlKc29uKTtcbiAgICAgICAgeWllbGQgZXhlYy5leGVjKGBnY2xvdWQgYXV0aCBhY3RpdmF0ZS1zZXJ2aWNlLWFjY291bnQgLS1rZXktZmlsZT0ke3NlcnZpY2VBY2NvdW50S2V5UGF0aH1gKTtcbiAgICB9KTtcbn1cbmV4cG9ydHMuaW5zdGFsbCA9IGluc3RhbGw7XG5pbnN0YWxsKCk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjaGlsZF9wcm9jZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV2ZW50c1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJvc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=