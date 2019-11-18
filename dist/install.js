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
            yield exec.exec(`7z e -y ${sdkFile} -oc:${destinationFolder}`);
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
try {
    install();
}
catch (error) {
    core.setFailed(error.message);
}


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhY3Rpb25zL2NvcmUvbGliL2NvbW1hbmQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhY3Rpb25zL2NvcmUvbGliL2NvcmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhY3Rpb25zL2V4ZWMvbGliL2V4ZWMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BhY3Rpb25zL2V4ZWMvbGliL3Rvb2xydW5uZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Rvd25sb2FkLnRzIiwid2VicGFjazovLy8uL3NyYy9pbnN0YWxsLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImNoaWxkX3Byb2Nlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJldmVudHNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJmc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIm9zXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGF0aFwiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FB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TDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN6REEsMEM7Ozs7Ozs7Ozs7O0FDQUEsbUM7Ozs7Ozs7Ozs7O0FDQUEsK0I7Ozs7Ozs7Ozs7O0FDQUEsK0I7Ozs7Ozs7Ozs7O0FDQUEsaUMiLCJmaWxlIjoiaW5zdGFsbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2luc3RhbGwudHNcIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IG9zID0gcmVxdWlyZShcIm9zXCIpO1xuLyoqXG4gKiBDb21tYW5kc1xuICpcbiAqIENvbW1hbmQgRm9ybWF0OlxuICogICAjI1tuYW1lIGtleT12YWx1ZTtrZXk9dmFsdWVdbWVzc2FnZVxuICpcbiAqIEV4YW1wbGVzOlxuICogICAjI1t3YXJuaW5nXVRoaXMgaXMgdGhlIHVzZXIgd2FybmluZyBtZXNzYWdlXG4gKiAgICMjW3NldC1zZWNyZXQgbmFtZT1teXBhc3N3b3JkXWRlZmluaXRlbHlOb3RBUGFzc3dvcmQhXG4gKi9cbmZ1bmN0aW9uIGlzc3VlQ29tbWFuZChjb21tYW5kLCBwcm9wZXJ0aWVzLCBtZXNzYWdlKSB7XG4gICAgY29uc3QgY21kID0gbmV3IENvbW1hbmQoY29tbWFuZCwgcHJvcGVydGllcywgbWVzc2FnZSk7XG4gICAgcHJvY2Vzcy5zdGRvdXQud3JpdGUoY21kLnRvU3RyaW5nKCkgKyBvcy5FT0wpO1xufVxuZXhwb3J0cy5pc3N1ZUNvbW1hbmQgPSBpc3N1ZUNvbW1hbmQ7XG5mdW5jdGlvbiBpc3N1ZShuYW1lLCBtZXNzYWdlID0gJycpIHtcbiAgICBpc3N1ZUNvbW1hbmQobmFtZSwge30sIG1lc3NhZ2UpO1xufVxuZXhwb3J0cy5pc3N1ZSA9IGlzc3VlO1xuY29uc3QgQ01EX1NUUklORyA9ICc6Oic7XG5jbGFzcyBDb21tYW5kIHtcbiAgICBjb25zdHJ1Y3Rvcihjb21tYW5kLCBwcm9wZXJ0aWVzLCBtZXNzYWdlKSB7XG4gICAgICAgIGlmICghY29tbWFuZCkge1xuICAgICAgICAgICAgY29tbWFuZCA9ICdtaXNzaW5nLmNvbW1hbmQnO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29tbWFuZCA9IGNvbW1hbmQ7XG4gICAgICAgIHRoaXMucHJvcGVydGllcyA9IHByb3BlcnRpZXM7XG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgfVxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICBsZXQgY21kU3RyID0gQ01EX1NUUklORyArIHRoaXMuY29tbWFuZDtcbiAgICAgICAgaWYgKHRoaXMucHJvcGVydGllcyAmJiBPYmplY3Qua2V5cyh0aGlzLnByb3BlcnRpZXMpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNtZFN0ciArPSAnICc7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLnByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsID0gdGhpcy5wcm9wZXJ0aWVzW2tleV07XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNhZmVseSBhcHBlbmQgdGhlIHZhbCAtIGF2b2lkIGJsb3dpbmcgdXAgd2hlbiBhdHRlbXB0aW5nIHRvXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjYWxsIC5yZXBsYWNlKCkgaWYgbWVzc2FnZSBpcyBub3QgYSBzdHJpbmcgZm9yIHNvbWUgcmVhc29uXG4gICAgICAgICAgICAgICAgICAgICAgICBjbWRTdHIgKz0gYCR7a2V5fT0ke2VzY2FwZShgJHt2YWwgfHwgJyd9YCl9LGA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY21kU3RyICs9IENNRF9TVFJJTkc7XG4gICAgICAgIC8vIHNhZmVseSBhcHBlbmQgdGhlIG1lc3NhZ2UgLSBhdm9pZCBibG93aW5nIHVwIHdoZW4gYXR0ZW1wdGluZyB0b1xuICAgICAgICAvLyBjYWxsIC5yZXBsYWNlKCkgaWYgbWVzc2FnZSBpcyBub3QgYSBzdHJpbmcgZm9yIHNvbWUgcmVhc29uXG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBgJHt0aGlzLm1lc3NhZ2UgfHwgJyd9YDtcbiAgICAgICAgY21kU3RyICs9IGVzY2FwZURhdGEobWVzc2FnZSk7XG4gICAgICAgIHJldHVybiBjbWRTdHI7XG4gICAgfVxufVxuZnVuY3Rpb24gZXNjYXBlRGF0YShzKSB7XG4gICAgcmV0dXJuIHMucmVwbGFjZSgvXFxyL2csICclMEQnKS5yZXBsYWNlKC9cXG4vZywgJyUwQScpO1xufVxuZnVuY3Rpb24gZXNjYXBlKHMpIHtcbiAgICByZXR1cm4gc1xuICAgICAgICAucmVwbGFjZSgvXFxyL2csICclMEQnKVxuICAgICAgICAucmVwbGFjZSgvXFxuL2csICclMEEnKVxuICAgICAgICAucmVwbGFjZSgvXS9nLCAnJTVEJylcbiAgICAgICAgLnJlcGxhY2UoLzsvZywgJyUzQicpO1xufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29tbWFuZC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgY29tbWFuZF8xID0gcmVxdWlyZShcIi4vY29tbWFuZFwiKTtcbmNvbnN0IG9zID0gcmVxdWlyZShcIm9zXCIpO1xuY29uc3QgcGF0aCA9IHJlcXVpcmUoXCJwYXRoXCIpO1xuLyoqXG4gKiBUaGUgY29kZSB0byBleGl0IGFuIGFjdGlvblxuICovXG52YXIgRXhpdENvZGU7XG4oZnVuY3Rpb24gKEV4aXRDb2RlKSB7XG4gICAgLyoqXG4gICAgICogQSBjb2RlIGluZGljYXRpbmcgdGhhdCB0aGUgYWN0aW9uIHdhcyBzdWNjZXNzZnVsXG4gICAgICovXG4gICAgRXhpdENvZGVbRXhpdENvZGVbXCJTdWNjZXNzXCJdID0gMF0gPSBcIlN1Y2Nlc3NcIjtcbiAgICAvKipcbiAgICAgKiBBIGNvZGUgaW5kaWNhdGluZyB0aGF0IHRoZSBhY3Rpb24gd2FzIGEgZmFpbHVyZVxuICAgICAqL1xuICAgIEV4aXRDb2RlW0V4aXRDb2RlW1wiRmFpbHVyZVwiXSA9IDFdID0gXCJGYWlsdXJlXCI7XG59KShFeGl0Q29kZSA9IGV4cG9ydHMuRXhpdENvZGUgfHwgKGV4cG9ydHMuRXhpdENvZGUgPSB7fSkpO1xuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gVmFyaWFibGVzXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vKipcbiAqIFNldHMgZW52IHZhcmlhYmxlIGZvciB0aGlzIGFjdGlvbiBhbmQgZnV0dXJlIGFjdGlvbnMgaW4gdGhlIGpvYlxuICogQHBhcmFtIG5hbWUgdGhlIG5hbWUgb2YgdGhlIHZhcmlhYmxlIHRvIHNldFxuICogQHBhcmFtIHZhbCB0aGUgdmFsdWUgb2YgdGhlIHZhcmlhYmxlXG4gKi9cbmZ1bmN0aW9uIGV4cG9ydFZhcmlhYmxlKG5hbWUsIHZhbCkge1xuICAgIHByb2Nlc3MuZW52W25hbWVdID0gdmFsO1xuICAgIGNvbW1hbmRfMS5pc3N1ZUNvbW1hbmQoJ3NldC1lbnYnLCB7IG5hbWUgfSwgdmFsKTtcbn1cbmV4cG9ydHMuZXhwb3J0VmFyaWFibGUgPSBleHBvcnRWYXJpYWJsZTtcbi8qKlxuICogUmVnaXN0ZXJzIGEgc2VjcmV0IHdoaWNoIHdpbGwgZ2V0IG1hc2tlZCBmcm9tIGxvZ3NcbiAqIEBwYXJhbSBzZWNyZXQgdmFsdWUgb2YgdGhlIHNlY3JldFxuICovXG5mdW5jdGlvbiBzZXRTZWNyZXQoc2VjcmV0KSB7XG4gICAgY29tbWFuZF8xLmlzc3VlQ29tbWFuZCgnYWRkLW1hc2snLCB7fSwgc2VjcmV0KTtcbn1cbmV4cG9ydHMuc2V0U2VjcmV0ID0gc2V0U2VjcmV0O1xuLyoqXG4gKiBQcmVwZW5kcyBpbnB1dFBhdGggdG8gdGhlIFBBVEggKGZvciB0aGlzIGFjdGlvbiBhbmQgZnV0dXJlIGFjdGlvbnMpXG4gKiBAcGFyYW0gaW5wdXRQYXRoXG4gKi9cbmZ1bmN0aW9uIGFkZFBhdGgoaW5wdXRQYXRoKSB7XG4gICAgY29tbWFuZF8xLmlzc3VlQ29tbWFuZCgnYWRkLXBhdGgnLCB7fSwgaW5wdXRQYXRoKTtcbiAgICBwcm9jZXNzLmVudlsnUEFUSCddID0gYCR7aW5wdXRQYXRofSR7cGF0aC5kZWxpbWl0ZXJ9JHtwcm9jZXNzLmVudlsnUEFUSCddfWA7XG59XG5leHBvcnRzLmFkZFBhdGggPSBhZGRQYXRoO1xuLyoqXG4gKiBHZXRzIHRoZSB2YWx1ZSBvZiBhbiBpbnB1dC4gIFRoZSB2YWx1ZSBpcyBhbHNvIHRyaW1tZWQuXG4gKlxuICogQHBhcmFtICAgICBuYW1lICAgICBuYW1lIG9mIHRoZSBpbnB1dCB0byBnZXRcbiAqIEBwYXJhbSAgICAgb3B0aW9ucyAgb3B0aW9uYWwuIFNlZSBJbnB1dE9wdGlvbnMuXG4gKiBAcmV0dXJucyAgIHN0cmluZ1xuICovXG5mdW5jdGlvbiBnZXRJbnB1dChuYW1lLCBvcHRpb25zKSB7XG4gICAgY29uc3QgdmFsID0gcHJvY2Vzcy5lbnZbYElOUFVUXyR7bmFtZS5yZXBsYWNlKC8gL2csICdfJykudG9VcHBlckNhc2UoKX1gXSB8fCAnJztcbiAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLnJlcXVpcmVkICYmICF2YWwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnB1dCByZXF1aXJlZCBhbmQgbm90IHN1cHBsaWVkOiAke25hbWV9YCk7XG4gICAgfVxuICAgIHJldHVybiB2YWwudHJpbSgpO1xufVxuZXhwb3J0cy5nZXRJbnB1dCA9IGdldElucHV0O1xuLyoqXG4gKiBTZXRzIHRoZSB2YWx1ZSBvZiBhbiBvdXRwdXQuXG4gKlxuICogQHBhcmFtICAgICBuYW1lICAgICBuYW1lIG9mIHRoZSBvdXRwdXQgdG8gc2V0XG4gKiBAcGFyYW0gICAgIHZhbHVlICAgIHZhbHVlIHRvIHN0b3JlXG4gKi9cbmZ1bmN0aW9uIHNldE91dHB1dChuYW1lLCB2YWx1ZSkge1xuICAgIGNvbW1hbmRfMS5pc3N1ZUNvbW1hbmQoJ3NldC1vdXRwdXQnLCB7IG5hbWUgfSwgdmFsdWUpO1xufVxuZXhwb3J0cy5zZXRPdXRwdXQgPSBzZXRPdXRwdXQ7XG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBSZXN1bHRzXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vKipcbiAqIFNldHMgdGhlIGFjdGlvbiBzdGF0dXMgdG8gZmFpbGVkLlxuICogV2hlbiB0aGUgYWN0aW9uIGV4aXRzIGl0IHdpbGwgYmUgd2l0aCBhbiBleGl0IGNvZGUgb2YgMVxuICogQHBhcmFtIG1lc3NhZ2UgYWRkIGVycm9yIGlzc3VlIG1lc3NhZ2VcbiAqL1xuZnVuY3Rpb24gc2V0RmFpbGVkKG1lc3NhZ2UpIHtcbiAgICBwcm9jZXNzLmV4aXRDb2RlID0gRXhpdENvZGUuRmFpbHVyZTtcbiAgICBlcnJvcihtZXNzYWdlKTtcbn1cbmV4cG9ydHMuc2V0RmFpbGVkID0gc2V0RmFpbGVkO1xuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gTG9nZ2luZyBDb21tYW5kc1xuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLyoqXG4gKiBXcml0ZXMgZGVidWcgbWVzc2FnZSB0byB1c2VyIGxvZ1xuICogQHBhcmFtIG1lc3NhZ2UgZGVidWcgbWVzc2FnZVxuICovXG5mdW5jdGlvbiBkZWJ1ZyhtZXNzYWdlKSB7XG4gICAgY29tbWFuZF8xLmlzc3VlQ29tbWFuZCgnZGVidWcnLCB7fSwgbWVzc2FnZSk7XG59XG5leHBvcnRzLmRlYnVnID0gZGVidWc7XG4vKipcbiAqIEFkZHMgYW4gZXJyb3IgaXNzdWVcbiAqIEBwYXJhbSBtZXNzYWdlIGVycm9yIGlzc3VlIG1lc3NhZ2VcbiAqL1xuZnVuY3Rpb24gZXJyb3IobWVzc2FnZSkge1xuICAgIGNvbW1hbmRfMS5pc3N1ZSgnZXJyb3InLCBtZXNzYWdlKTtcbn1cbmV4cG9ydHMuZXJyb3IgPSBlcnJvcjtcbi8qKlxuICogQWRkcyBhbiB3YXJuaW5nIGlzc3VlXG4gKiBAcGFyYW0gbWVzc2FnZSB3YXJuaW5nIGlzc3VlIG1lc3NhZ2VcbiAqL1xuZnVuY3Rpb24gd2FybmluZyhtZXNzYWdlKSB7XG4gICAgY29tbWFuZF8xLmlzc3VlKCd3YXJuaW5nJywgbWVzc2FnZSk7XG59XG5leHBvcnRzLndhcm5pbmcgPSB3YXJuaW5nO1xuLyoqXG4gKiBXcml0ZXMgaW5mbyB0byBsb2cgd2l0aCBjb25zb2xlLmxvZy5cbiAqIEBwYXJhbSBtZXNzYWdlIGluZm8gbWVzc2FnZVxuICovXG5mdW5jdGlvbiBpbmZvKG1lc3NhZ2UpIHtcbiAgICBwcm9jZXNzLnN0ZG91dC53cml0ZShtZXNzYWdlICsgb3MuRU9MKTtcbn1cbmV4cG9ydHMuaW5mbyA9IGluZm87XG4vKipcbiAqIEJlZ2luIGFuIG91dHB1dCBncm91cC5cbiAqXG4gKiBPdXRwdXQgdW50aWwgdGhlIG5leHQgYGdyb3VwRW5kYCB3aWxsIGJlIGZvbGRhYmxlIGluIHRoaXMgZ3JvdXBcbiAqXG4gKiBAcGFyYW0gbmFtZSBUaGUgbmFtZSBvZiB0aGUgb3V0cHV0IGdyb3VwXG4gKi9cbmZ1bmN0aW9uIHN0YXJ0R3JvdXAobmFtZSkge1xuICAgIGNvbW1hbmRfMS5pc3N1ZSgnZ3JvdXAnLCBuYW1lKTtcbn1cbmV4cG9ydHMuc3RhcnRHcm91cCA9IHN0YXJ0R3JvdXA7XG4vKipcbiAqIEVuZCBhbiBvdXRwdXQgZ3JvdXAuXG4gKi9cbmZ1bmN0aW9uIGVuZEdyb3VwKCkge1xuICAgIGNvbW1hbmRfMS5pc3N1ZSgnZW5kZ3JvdXAnKTtcbn1cbmV4cG9ydHMuZW5kR3JvdXAgPSBlbmRHcm91cDtcbi8qKlxuICogV3JhcCBhbiBhc3luY2hyb25vdXMgZnVuY3Rpb24gY2FsbCBpbiBhIGdyb3VwLlxuICpcbiAqIFJldHVybnMgdGhlIHNhbWUgdHlwZSBhcyB0aGUgZnVuY3Rpb24gaXRzZWxmLlxuICpcbiAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBncm91cFxuICogQHBhcmFtIGZuIFRoZSBmdW5jdGlvbiB0byB3cmFwIGluIHRoZSBncm91cFxuICovXG5mdW5jdGlvbiBncm91cChuYW1lLCBmbikge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIHN0YXJ0R3JvdXAobmFtZSk7XG4gICAgICAgIGxldCByZXN1bHQ7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXN1bHQgPSB5aWVsZCBmbigpO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgZW5kR3JvdXAoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0pO1xufVxuZXhwb3J0cy5ncm91cCA9IGdyb3VwO1xuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gV3JhcHBlciBhY3Rpb24gc3RhdGVcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8qKlxuICogU2F2ZXMgc3RhdGUgZm9yIGN1cnJlbnQgYWN0aW9uLCB0aGUgc3RhdGUgY2FuIG9ubHkgYmUgcmV0cmlldmVkIGJ5IHRoaXMgYWN0aW9uJ3MgcG9zdCBqb2IgZXhlY3V0aW9uLlxuICpcbiAqIEBwYXJhbSAgICAgbmFtZSAgICAgbmFtZSBvZiB0aGUgc3RhdGUgdG8gc3RvcmVcbiAqIEBwYXJhbSAgICAgdmFsdWUgICAgdmFsdWUgdG8gc3RvcmVcbiAqL1xuZnVuY3Rpb24gc2F2ZVN0YXRlKG5hbWUsIHZhbHVlKSB7XG4gICAgY29tbWFuZF8xLmlzc3VlQ29tbWFuZCgnc2F2ZS1zdGF0ZScsIHsgbmFtZSB9LCB2YWx1ZSk7XG59XG5leHBvcnRzLnNhdmVTdGF0ZSA9IHNhdmVTdGF0ZTtcbi8qKlxuICogR2V0cyB0aGUgdmFsdWUgb2YgYW4gc3RhdGUgc2V0IGJ5IHRoaXMgYWN0aW9uJ3MgbWFpbiBleGVjdXRpb24uXG4gKlxuICogQHBhcmFtICAgICBuYW1lICAgICBuYW1lIG9mIHRoZSBzdGF0ZSB0byBnZXRcbiAqIEByZXR1cm5zICAgc3RyaW5nXG4gKi9cbmZ1bmN0aW9uIGdldFN0YXRlKG5hbWUpIHtcbiAgICByZXR1cm4gcHJvY2Vzcy5lbnZbYFNUQVRFXyR7bmFtZX1gXSB8fCAnJztcbn1cbmV4cG9ydHMuZ2V0U3RhdGUgPSBnZXRTdGF0ZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvcmUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHRyID0gcmVxdWlyZShcIi4vdG9vbHJ1bm5lclwiKTtcbi8qKlxuICogRXhlYyBhIGNvbW1hbmQuXG4gKiBPdXRwdXQgd2lsbCBiZSBzdHJlYW1lZCB0byB0aGUgbGl2ZSBjb25zb2xlLlxuICogUmV0dXJucyBwcm9taXNlIHdpdGggcmV0dXJuIGNvZGVcbiAqXG4gKiBAcGFyYW0gICAgIGNvbW1hbmRMaW5lICAgICAgICBjb21tYW5kIHRvIGV4ZWN1dGUgKGNhbiBpbmNsdWRlIGFkZGl0aW9uYWwgYXJncykuIE11c3QgYmUgY29ycmVjdGx5IGVzY2FwZWQuXG4gKiBAcGFyYW0gICAgIGFyZ3MgICAgICAgICAgICAgICBvcHRpb25hbCBhcmd1bWVudHMgZm9yIHRvb2wuIEVzY2FwaW5nIGlzIGhhbmRsZWQgYnkgdGhlIGxpYi5cbiAqIEBwYXJhbSAgICAgb3B0aW9ucyAgICAgICAgICAgIG9wdGlvbmFsIGV4ZWMgb3B0aW9ucy4gIFNlZSBFeGVjT3B0aW9uc1xuICogQHJldHVybnMgICBQcm9taXNlPG51bWJlcj4gICAgZXhpdCBjb2RlXG4gKi9cbmZ1bmN0aW9uIGV4ZWMoY29tbWFuZExpbmUsIGFyZ3MsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zdCBjb21tYW5kQXJncyA9IHRyLmFyZ1N0cmluZ1RvQXJyYXkoY29tbWFuZExpbmUpO1xuICAgICAgICBpZiAoY29tbWFuZEFyZ3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFBhcmFtZXRlciAnY29tbWFuZExpbmUnIGNhbm5vdCBiZSBudWxsIG9yIGVtcHR5LmApO1xuICAgICAgICB9XG4gICAgICAgIC8vIFBhdGggdG8gdG9vbCB0byBleGVjdXRlIHNob3VsZCBiZSBmaXJzdCBhcmdcbiAgICAgICAgY29uc3QgdG9vbFBhdGggPSBjb21tYW5kQXJnc1swXTtcbiAgICAgICAgYXJncyA9IGNvbW1hbmRBcmdzLnNsaWNlKDEpLmNvbmNhdChhcmdzIHx8IFtdKTtcbiAgICAgICAgY29uc3QgcnVubmVyID0gbmV3IHRyLlRvb2xSdW5uZXIodG9vbFBhdGgsIGFyZ3MsIG9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gcnVubmVyLmV4ZWMoKTtcbiAgICB9KTtcbn1cbmV4cG9ydHMuZXhlYyA9IGV4ZWM7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1leGVjLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBvcyA9IHJlcXVpcmUoXCJvc1wiKTtcbmNvbnN0IGV2ZW50cyA9IHJlcXVpcmUoXCJldmVudHNcIik7XG5jb25zdCBjaGlsZCA9IHJlcXVpcmUoXCJjaGlsZF9wcm9jZXNzXCIpO1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L3VuYm91bmQtbWV0aG9kICovXG5jb25zdCBJU19XSU5ET1dTID0gcHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJztcbi8qXG4gKiBDbGFzcyBmb3IgcnVubmluZyBjb21tYW5kIGxpbmUgdG9vbHMuIEhhbmRsZXMgcXVvdGluZyBhbmQgYXJnIHBhcnNpbmcgaW4gYSBwbGF0Zm9ybSBhZ25vc3RpYyB3YXkuXG4gKi9cbmNsYXNzIFRvb2xSdW5uZXIgZXh0ZW5kcyBldmVudHMuRXZlbnRFbWl0dGVyIHtcbiAgICBjb25zdHJ1Y3Rvcih0b29sUGF0aCwgYXJncywgb3B0aW9ucykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBpZiAoIXRvb2xQYXRoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJQYXJhbWV0ZXIgJ3Rvb2xQYXRoJyBjYW5ub3QgYmUgbnVsbCBvciBlbXB0eS5cIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50b29sUGF0aCA9IHRvb2xQYXRoO1xuICAgICAgICB0aGlzLmFyZ3MgPSBhcmdzIHx8IFtdO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIH1cbiAgICBfZGVidWcobWVzc2FnZSkge1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmxpc3RlbmVycyAmJiB0aGlzLm9wdGlvbnMubGlzdGVuZXJzLmRlYnVnKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMubGlzdGVuZXJzLmRlYnVnKG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9nZXRDb21tYW5kU3RyaW5nKG9wdGlvbnMsIG5vUHJlZml4KSB7XG4gICAgICAgIGNvbnN0IHRvb2xQYXRoID0gdGhpcy5fZ2V0U3Bhd25GaWxlTmFtZSgpO1xuICAgICAgICBjb25zdCBhcmdzID0gdGhpcy5fZ2V0U3Bhd25BcmdzKG9wdGlvbnMpO1xuICAgICAgICBsZXQgY21kID0gbm9QcmVmaXggPyAnJyA6ICdbY29tbWFuZF0nOyAvLyBvbWl0IHByZWZpeCB3aGVuIHBpcGVkIHRvIGEgc2Vjb25kIHRvb2xcbiAgICAgICAgaWYgKElTX1dJTkRPV1MpIHtcbiAgICAgICAgICAgIC8vIFdpbmRvd3MgKyBjbWQgZmlsZVxuICAgICAgICAgICAgaWYgKHRoaXMuX2lzQ21kRmlsZSgpKSB7XG4gICAgICAgICAgICAgICAgY21kICs9IHRvb2xQYXRoO1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgYSBvZiBhcmdzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNtZCArPSBgICR7YX1gO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFdpbmRvd3MgKyB2ZXJiYXRpbVxuICAgICAgICAgICAgZWxzZSBpZiAob3B0aW9ucy53aW5kb3dzVmVyYmF0aW1Bcmd1bWVudHMpIHtcbiAgICAgICAgICAgICAgICBjbWQgKz0gYFwiJHt0b29sUGF0aH1cImA7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBhIG9mIGFyZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgY21kICs9IGAgJHthfWA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gV2luZG93cyAocmVndWxhcilcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNtZCArPSB0aGlzLl93aW5kb3dzUXVvdGVDbWRBcmcodG9vbFBhdGgpO1xuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgYSBvZiBhcmdzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNtZCArPSBgICR7dGhpcy5fd2luZG93c1F1b3RlQ21kQXJnKGEpfWA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gT1NYL0xpbnV4IC0gdGhpcyBjYW4gbGlrZWx5IGJlIGltcHJvdmVkIHdpdGggc29tZSBmb3JtIG9mIHF1b3RpbmcuXG4gICAgICAgICAgICAvLyBjcmVhdGluZyBwcm9jZXNzZXMgb24gVW5peCBpcyBmdW5kYW1lbnRhbGx5IGRpZmZlcmVudCB0aGFuIFdpbmRvd3MuXG4gICAgICAgICAgICAvLyBvbiBVbml4LCBleGVjdnAoKSB0YWtlcyBhbiBhcmcgYXJyYXkuXG4gICAgICAgICAgICBjbWQgKz0gdG9vbFBhdGg7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGEgb2YgYXJncykge1xuICAgICAgICAgICAgICAgIGNtZCArPSBgICR7YX1gO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjbWQ7XG4gICAgfVxuICAgIF9wcm9jZXNzTGluZUJ1ZmZlcihkYXRhLCBzdHJCdWZmZXIsIG9uTGluZSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IHMgPSBzdHJCdWZmZXIgKyBkYXRhLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBsZXQgbiA9IHMuaW5kZXhPZihvcy5FT0wpO1xuICAgICAgICAgICAgd2hpbGUgKG4gPiAtMSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGxpbmUgPSBzLnN1YnN0cmluZygwLCBuKTtcbiAgICAgICAgICAgICAgICBvbkxpbmUobGluZSk7XG4gICAgICAgICAgICAgICAgLy8gdGhlIHJlc3Qgb2YgdGhlIHN0cmluZyAuLi5cbiAgICAgICAgICAgICAgICBzID0gcy5zdWJzdHJpbmcobiArIG9zLkVPTC5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIG4gPSBzLmluZGV4T2Yob3MuRU9MKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0ckJ1ZmZlciA9IHM7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgLy8gc3RyZWFtaW5nIGxpbmVzIHRvIGNvbnNvbGUgaXMgYmVzdCBlZmZvcnQuICBEb24ndCBmYWlsIGEgYnVpbGQuXG4gICAgICAgICAgICB0aGlzLl9kZWJ1ZyhgZXJyb3IgcHJvY2Vzc2luZyBsaW5lLiBGYWlsZWQgd2l0aCBlcnJvciAke2Vycn1gKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfZ2V0U3Bhd25GaWxlTmFtZSgpIHtcbiAgICAgICAgaWYgKElTX1dJTkRPV1MpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9pc0NtZEZpbGUoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwcm9jZXNzLmVudlsnQ09NU1BFQyddIHx8ICdjbWQuZXhlJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy50b29sUGF0aDtcbiAgICB9XG4gICAgX2dldFNwYXduQXJncyhvcHRpb25zKSB7XG4gICAgICAgIGlmIChJU19XSU5ET1dTKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5faXNDbWRGaWxlKCkpIHtcbiAgICAgICAgICAgICAgICBsZXQgYXJnbGluZSA9IGAvRCAvUyAvQyBcIiR7dGhpcy5fd2luZG93c1F1b3RlQ21kQXJnKHRoaXMudG9vbFBhdGgpfWA7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBhIG9mIHRoaXMuYXJncykge1xuICAgICAgICAgICAgICAgICAgICBhcmdsaW5lICs9ICcgJztcbiAgICAgICAgICAgICAgICAgICAgYXJnbGluZSArPSBvcHRpb25zLndpbmRvd3NWZXJiYXRpbUFyZ3VtZW50c1xuICAgICAgICAgICAgICAgICAgICAgICAgPyBhXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHRoaXMuX3dpbmRvd3NRdW90ZUNtZEFyZyhhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYXJnbGluZSArPSAnXCInO1xuICAgICAgICAgICAgICAgIHJldHVybiBbYXJnbGluZV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuYXJncztcbiAgICB9XG4gICAgX2VuZHNXaXRoKHN0ciwgZW5kKSB7XG4gICAgICAgIHJldHVybiBzdHIuZW5kc1dpdGgoZW5kKTtcbiAgICB9XG4gICAgX2lzQ21kRmlsZSgpIHtcbiAgICAgICAgY29uc3QgdXBwZXJUb29sUGF0aCA9IHRoaXMudG9vbFBhdGgudG9VcHBlckNhc2UoKTtcbiAgICAgICAgcmV0dXJuICh0aGlzLl9lbmRzV2l0aCh1cHBlclRvb2xQYXRoLCAnLkNNRCcpIHx8XG4gICAgICAgICAgICB0aGlzLl9lbmRzV2l0aCh1cHBlclRvb2xQYXRoLCAnLkJBVCcpKTtcbiAgICB9XG4gICAgX3dpbmRvd3NRdW90ZUNtZEFyZyhhcmcpIHtcbiAgICAgICAgLy8gZm9yIC5leGUsIGFwcGx5IHRoZSBub3JtYWwgcXVvdGluZyBydWxlcyB0aGF0IGxpYnV2IGFwcGxpZXNcbiAgICAgICAgaWYgKCF0aGlzLl9pc0NtZEZpbGUoKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3V2UXVvdGVDbWRBcmcoYXJnKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBvdGhlcndpc2UgYXBwbHkgcXVvdGluZyBydWxlcyBzcGVjaWZpYyB0byB0aGUgY21kLmV4ZSBjb21tYW5kIGxpbmUgcGFyc2VyLlxuICAgICAgICAvLyB0aGUgbGlidXYgcnVsZXMgYXJlIGdlbmVyaWMgYW5kIGFyZSBub3QgZGVzaWduZWQgc3BlY2lmaWNhbGx5IGZvciBjbWQuZXhlXG4gICAgICAgIC8vIGNvbW1hbmQgbGluZSBwYXJzZXIuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIGZvciBhIGRldGFpbGVkIGRlc2NyaXB0aW9uIG9mIHRoZSBjbWQuZXhlIGNvbW1hbmQgbGluZSBwYXJzZXIsIHJlZmVyIHRvXG4gICAgICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDA5NDY5OS9ob3ctZG9lcy10aGUtd2luZG93cy1jb21tYW5kLWludGVycHJldGVyLWNtZC1leGUtcGFyc2Utc2NyaXB0cy83OTcwOTEyIzc5NzA5MTJcbiAgICAgICAgLy8gbmVlZCBxdW90ZXMgZm9yIGVtcHR5IGFyZ1xuICAgICAgICBpZiAoIWFyZykge1xuICAgICAgICAgICAgcmV0dXJuICdcIlwiJztcbiAgICAgICAgfVxuICAgICAgICAvLyBkZXRlcm1pbmUgd2hldGhlciB0aGUgYXJnIG5lZWRzIHRvIGJlIHF1b3RlZFxuICAgICAgICBjb25zdCBjbWRTcGVjaWFsQ2hhcnMgPSBbXG4gICAgICAgICAgICAnICcsXG4gICAgICAgICAgICAnXFx0JyxcbiAgICAgICAgICAgICcmJyxcbiAgICAgICAgICAgICcoJyxcbiAgICAgICAgICAgICcpJyxcbiAgICAgICAgICAgICdbJyxcbiAgICAgICAgICAgICddJyxcbiAgICAgICAgICAgICd7JyxcbiAgICAgICAgICAgICd9JyxcbiAgICAgICAgICAgICdeJyxcbiAgICAgICAgICAgICc9JyxcbiAgICAgICAgICAgICc7JyxcbiAgICAgICAgICAgICchJyxcbiAgICAgICAgICAgIFwiJ1wiLFxuICAgICAgICAgICAgJysnLFxuICAgICAgICAgICAgJywnLFxuICAgICAgICAgICAgJ2AnLFxuICAgICAgICAgICAgJ34nLFxuICAgICAgICAgICAgJ3wnLFxuICAgICAgICAgICAgJzwnLFxuICAgICAgICAgICAgJz4nLFxuICAgICAgICAgICAgJ1wiJ1xuICAgICAgICBdO1xuICAgICAgICBsZXQgbmVlZHNRdW90ZXMgPSBmYWxzZTtcbiAgICAgICAgZm9yIChjb25zdCBjaGFyIG9mIGFyZykge1xuICAgICAgICAgICAgaWYgKGNtZFNwZWNpYWxDaGFycy5zb21lKHggPT4geCA9PT0gY2hhcikpIHtcbiAgICAgICAgICAgICAgICBuZWVkc1F1b3RlcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gc2hvcnQtY2lyY3VpdCBpZiBxdW90ZXMgbm90IG5lZWRlZFxuICAgICAgICBpZiAoIW5lZWRzUXVvdGVzKSB7XG4gICAgICAgICAgICByZXR1cm4gYXJnO1xuICAgICAgICB9XG4gICAgICAgIC8vIHRoZSBmb2xsb3dpbmcgcXVvdGluZyBydWxlcyBhcmUgdmVyeSBzaW1pbGFyIHRvIHRoZSBydWxlcyB0aGF0IGJ5IGxpYnV2IGFwcGxpZXMuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIDEpIHdyYXAgdGhlIHN0cmluZyBpbiBxdW90ZXNcbiAgICAgICAgLy9cbiAgICAgICAgLy8gMikgZG91YmxlLXVwIHF1b3RlcyAtIGkuZS4gXCIgPT4gXCJcIlxuICAgICAgICAvL1xuICAgICAgICAvLyAgICB0aGlzIGlzIGRpZmZlcmVudCBmcm9tIHRoZSBsaWJ1diBxdW90aW5nIHJ1bGVzLiBsaWJ1diByZXBsYWNlcyBcIiB3aXRoIFxcXCIsIHdoaWNoIHVuZm9ydHVuYXRlbHlcbiAgICAgICAgLy8gICAgZG9lc24ndCB3b3JrIHdlbGwgd2l0aCBhIGNtZC5leGUgY29tbWFuZCBsaW5lLlxuICAgICAgICAvL1xuICAgICAgICAvLyAgICBub3RlLCByZXBsYWNpbmcgXCIgd2l0aCBcIlwiIGFsc28gd29ya3Mgd2VsbCBpZiB0aGUgYXJnIGlzIHBhc3NlZCB0byBhIGRvd25zdHJlYW0gLk5FVCBjb25zb2xlIGFwcC5cbiAgICAgICAgLy8gICAgZm9yIGV4YW1wbGUsIHRoZSBjb21tYW5kIGxpbmU6XG4gICAgICAgIC8vICAgICAgICAgIGZvby5leGUgXCJteWFyZzpcIlwibXkgdmFsXCJcIlwiXG4gICAgICAgIC8vICAgIGlzIHBhcnNlZCBieSBhIC5ORVQgY29uc29sZSBhcHAgaW50byBhbiBhcmcgYXJyYXk6XG4gICAgICAgIC8vICAgICAgICAgIFsgXCJteWFyZzpcXFwibXkgdmFsXFxcIlwiIF1cbiAgICAgICAgLy8gICAgd2hpY2ggaXMgdGhlIHNhbWUgZW5kIHJlc3VsdCB3aGVuIGFwcGx5aW5nIGxpYnV2IHF1b3RpbmcgcnVsZXMuIGFsdGhvdWdoIHRoZSBhY3R1YWxcbiAgICAgICAgLy8gICAgY29tbWFuZCBsaW5lIGZyb20gbGlidXYgcXVvdGluZyBydWxlcyB3b3VsZCBsb29rIGxpa2U6XG4gICAgICAgIC8vICAgICAgICAgIGZvby5leGUgXCJteWFyZzpcXFwibXkgdmFsXFxcIlwiXG4gICAgICAgIC8vXG4gICAgICAgIC8vIDMpIGRvdWJsZS11cCBzbGFzaGVzIHRoYXQgcHJlY2VkZSBhIHF1b3RlLFxuICAgICAgICAvLyAgICBlLmcuICBoZWxsbyBcXHdvcmxkICAgID0+IFwiaGVsbG8gXFx3b3JsZFwiXG4gICAgICAgIC8vICAgICAgICAgIGhlbGxvXFxcIndvcmxkICAgID0+IFwiaGVsbG9cXFxcXCJcIndvcmxkXCJcbiAgICAgICAgLy8gICAgICAgICAgaGVsbG9cXFxcXCJ3b3JsZCAgID0+IFwiaGVsbG9cXFxcXFxcXFwiXCJ3b3JsZFwiXG4gICAgICAgIC8vICAgICAgICAgIGhlbGxvIHdvcmxkXFwgICAgPT4gXCJoZWxsbyB3b3JsZFxcXFxcIlxuICAgICAgICAvL1xuICAgICAgICAvLyAgICB0ZWNobmljYWxseSB0aGlzIGlzIG5vdCByZXF1aXJlZCBmb3IgYSBjbWQuZXhlIGNvbW1hbmQgbGluZSwgb3IgdGhlIGJhdGNoIGFyZ3VtZW50IHBhcnNlci5cbiAgICAgICAgLy8gICAgdGhlIHJlYXNvbnMgZm9yIGluY2x1ZGluZyB0aGlzIGFzIGEgLmNtZCBxdW90aW5nIHJ1bGUgYXJlOlxuICAgICAgICAvL1xuICAgICAgICAvLyAgICBhKSB0aGlzIGlzIG9wdGltaXplZCBmb3IgdGhlIHNjZW5hcmlvIHdoZXJlIHRoZSBhcmd1bWVudCBpcyBwYXNzZWQgZnJvbSB0aGUgLmNtZCBmaWxlIHRvIGFuXG4gICAgICAgIC8vICAgICAgIGV4dGVybmFsIHByb2dyYW0uIG1hbnkgcHJvZ3JhbXMgKGUuZy4gLk5FVCBjb25zb2xlIGFwcHMpIHJlbHkgb24gdGhlIHNsYXNoLWRvdWJsaW5nIHJ1bGUuXG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgIGIpIGl0J3Mgd2hhdCB3ZSd2ZSBiZWVuIGRvaW5nIHByZXZpb3VzbHkgKGJ5IGRlZmVycmluZyB0byBub2RlIGRlZmF1bHQgYmVoYXZpb3IpIGFuZCB3ZVxuICAgICAgICAvLyAgICAgICBoYXZlbid0IGhlYXJkIGFueSBjb21wbGFpbnRzIGFib3V0IHRoYXQgYXNwZWN0LlxuICAgICAgICAvL1xuICAgICAgICAvLyBub3RlLCBhIHdlYWtuZXNzIG9mIHRoZSBxdW90aW5nIHJ1bGVzIGNob3NlbiBoZXJlLCBpcyB0aGF0ICUgaXMgbm90IGVzY2FwZWQuIGluIGZhY3QsICUgY2Fubm90IGJlXG4gICAgICAgIC8vIGVzY2FwZWQgd2hlbiB1c2VkIG9uIHRoZSBjb21tYW5kIGxpbmUgZGlyZWN0bHkgLSBldmVuIHRob3VnaCB3aXRoaW4gYSAuY21kIGZpbGUgJSBjYW4gYmUgZXNjYXBlZFxuICAgICAgICAvLyBieSB1c2luZyAlJS5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gdGhlIHNhdmluZyBncmFjZSBpcywgb24gdGhlIGNvbW1hbmQgbGluZSwgJXZhciUgaXMgbGVmdCBhcy1pcyBpZiB2YXIgaXMgbm90IGRlZmluZWQuIHRoaXMgY29udHJhc3RzXG4gICAgICAgIC8vIHRoZSBsaW5lIHBhcnNpbmcgcnVsZXMgd2l0aGluIGEgLmNtZCBmaWxlLCB3aGVyZSBpZiB2YXIgaXMgbm90IGRlZmluZWQgaXQgaXMgcmVwbGFjZWQgd2l0aCBub3RoaW5nLlxuICAgICAgICAvL1xuICAgICAgICAvLyBvbmUgb3B0aW9uIHRoYXQgd2FzIGV4cGxvcmVkIHdhcyByZXBsYWNpbmcgJSB3aXRoIF4lIC0gaS5lLiAldmFyJSA9PiBeJXZhcl4lLiB0aGlzIGhhY2sgd291bGRcbiAgICAgICAgLy8gb2Z0ZW4gd29yaywgc2luY2UgaXQgaXMgdW5saWtlbHkgdGhhdCB2YXJeIHdvdWxkIGV4aXN0LCBhbmQgdGhlIF4gY2hhcmFjdGVyIGlzIHJlbW92ZWQgd2hlbiB0aGVcbiAgICAgICAgLy8gdmFyaWFibGUgaXMgdXNlZC4gdGhlIHByb2JsZW0sIGhvd2V2ZXIsIGlzIHRoYXQgXiBpcyBub3QgcmVtb3ZlZCB3aGVuICUqIGlzIHVzZWQgdG8gcGFzcyB0aGUgYXJnc1xuICAgICAgICAvLyB0byBhbiBleHRlcm5hbCBwcm9ncmFtLlxuICAgICAgICAvL1xuICAgICAgICAvLyBhbiB1bmV4cGxvcmVkIHBvdGVudGlhbCBzb2x1dGlvbiBmb3IgdGhlICUgZXNjYXBpbmcgcHJvYmxlbSwgaXMgdG8gY3JlYXRlIGEgd3JhcHBlciAuY21kIGZpbGUuXG4gICAgICAgIC8vICUgY2FuIGJlIGVzY2FwZWQgd2l0aGluIGEgLmNtZCBmaWxlLlxuICAgICAgICBsZXQgcmV2ZXJzZSA9ICdcIic7XG4gICAgICAgIGxldCBxdW90ZUhpdCA9IHRydWU7XG4gICAgICAgIGZvciAobGV0IGkgPSBhcmcubGVuZ3RoOyBpID4gMDsgaS0tKSB7XG4gICAgICAgICAgICAvLyB3YWxrIHRoZSBzdHJpbmcgaW4gcmV2ZXJzZVxuICAgICAgICAgICAgcmV2ZXJzZSArPSBhcmdbaSAtIDFdO1xuICAgICAgICAgICAgaWYgKHF1b3RlSGl0ICYmIGFyZ1tpIC0gMV0gPT09ICdcXFxcJykge1xuICAgICAgICAgICAgICAgIHJldmVyc2UgKz0gJ1xcXFwnOyAvLyBkb3VibGUgdGhlIHNsYXNoXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChhcmdbaSAtIDFdID09PSAnXCInKSB7XG4gICAgICAgICAgICAgICAgcXVvdGVIaXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJldmVyc2UgKz0gJ1wiJzsgLy8gZG91YmxlIHRoZSBxdW90ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcXVvdGVIaXQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXZlcnNlICs9ICdcIic7XG4gICAgICAgIHJldHVybiByZXZlcnNlXG4gICAgICAgICAgICAuc3BsaXQoJycpXG4gICAgICAgICAgICAucmV2ZXJzZSgpXG4gICAgICAgICAgICAuam9pbignJyk7XG4gICAgfVxuICAgIF91dlF1b3RlQ21kQXJnKGFyZykge1xuICAgICAgICAvLyBUb29sIHJ1bm5lciB3cmFwcyBjaGlsZF9wcm9jZXNzLnNwYXduKCkgYW5kIG5lZWRzIHRvIGFwcGx5IHRoZSBzYW1lIHF1b3RpbmcgYXNcbiAgICAgICAgLy8gTm9kZSBpbiBjZXJ0YWluIGNhc2VzIHdoZXJlIHRoZSB1bmRvY3VtZW50ZWQgc3Bhd24gb3B0aW9uIHdpbmRvd3NWZXJiYXRpbUFyZ3VtZW50c1xuICAgICAgICAvLyBpcyB1c2VkLlxuICAgICAgICAvL1xuICAgICAgICAvLyBTaW5jZSB0aGlzIGZ1bmN0aW9uIGlzIGEgcG9ydCBvZiBxdW90ZV9jbWRfYXJnIGZyb20gTm9kZSA0LnggKHRlY2huaWNhbGx5LCBsaWIgVVYsXG4gICAgICAgIC8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vbm9kZWpzL25vZGUvYmxvYi92NC54L2RlcHMvdXYvc3JjL3dpbi9wcm9jZXNzLmMgZm9yIGRldGFpbHMpLFxuICAgICAgICAvLyBwYXN0aW5nIGNvcHlyaWdodCBub3RpY2UgZnJvbSBOb2RlIHdpdGhpbiB0aGlzIGZ1bmN0aW9uOlxuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAgICAgICAgLy8gICAgICBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0b1xuICAgICAgICAvLyAgICAgIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlXG4gICAgICAgIC8vICAgICAgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yXG4gICAgICAgIC8vICAgICAgc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAgICAgICAgLy8gICAgICBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICAgICAgICAvL1xuICAgICAgICAvLyAgICAgIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gICAgICAgIC8vICAgICAgYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gICAgICAgIC8vXG4gICAgICAgIC8vICAgICAgVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICAgICAgICAvLyAgICAgIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICAgICAgICAvLyAgICAgIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICAgICAgICAvLyAgICAgIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAgICAgICAgLy8gICAgICBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lOR1xuICAgICAgICAvLyAgICAgIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1NcbiAgICAgICAgLy8gICAgICBJTiBUSEUgU09GVFdBUkUuXG4gICAgICAgIGlmICghYXJnKSB7XG4gICAgICAgICAgICAvLyBOZWVkIGRvdWJsZSBxdW90YXRpb24gZm9yIGVtcHR5IGFyZ3VtZW50XG4gICAgICAgICAgICByZXR1cm4gJ1wiXCInO1xuICAgICAgICB9XG4gICAgICAgIGlmICghYXJnLmluY2x1ZGVzKCcgJykgJiYgIWFyZy5pbmNsdWRlcygnXFx0JykgJiYgIWFyZy5pbmNsdWRlcygnXCInKSkge1xuICAgICAgICAgICAgLy8gTm8gcXVvdGF0aW9uIG5lZWRlZFxuICAgICAgICAgICAgcmV0dXJuIGFyZztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWFyZy5pbmNsdWRlcygnXCInKSAmJiAhYXJnLmluY2x1ZGVzKCdcXFxcJykpIHtcbiAgICAgICAgICAgIC8vIE5vIGVtYmVkZGVkIGRvdWJsZSBxdW90ZXMgb3IgYmFja3NsYXNoZXMsIHNvIEkgY2FuIGp1c3Qgd3JhcFxuICAgICAgICAgICAgLy8gcXVvdGUgbWFya3MgYXJvdW5kIHRoZSB3aG9sZSB0aGluZy5cbiAgICAgICAgICAgIHJldHVybiBgXCIke2FyZ31cImA7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRXhwZWN0ZWQgaW5wdXQvb3V0cHV0OlxuICAgICAgICAvLyAgIGlucHV0IDogaGVsbG9cIndvcmxkXG4gICAgICAgIC8vICAgb3V0cHV0OiBcImhlbGxvXFxcIndvcmxkXCJcbiAgICAgICAgLy8gICBpbnB1dCA6IGhlbGxvXCJcIndvcmxkXG4gICAgICAgIC8vICAgb3V0cHV0OiBcImhlbGxvXFxcIlxcXCJ3b3JsZFwiXG4gICAgICAgIC8vICAgaW5wdXQgOiBoZWxsb1xcd29ybGRcbiAgICAgICAgLy8gICBvdXRwdXQ6IGhlbGxvXFx3b3JsZFxuICAgICAgICAvLyAgIGlucHV0IDogaGVsbG9cXFxcd29ybGRcbiAgICAgICAgLy8gICBvdXRwdXQ6IGhlbGxvXFxcXHdvcmxkXG4gICAgICAgIC8vICAgaW5wdXQgOiBoZWxsb1xcXCJ3b3JsZFxuICAgICAgICAvLyAgIG91dHB1dDogXCJoZWxsb1xcXFxcXFwid29ybGRcIlxuICAgICAgICAvLyAgIGlucHV0IDogaGVsbG9cXFxcXCJ3b3JsZFxuICAgICAgICAvLyAgIG91dHB1dDogXCJoZWxsb1xcXFxcXFxcXFxcIndvcmxkXCJcbiAgICAgICAgLy8gICBpbnB1dCA6IGhlbGxvIHdvcmxkXFxcbiAgICAgICAgLy8gICBvdXRwdXQ6IFwiaGVsbG8gd29ybGRcXFxcXCIgLSBub3RlIHRoZSBjb21tZW50IGluIGxpYnV2IGFjdHVhbGx5IHJlYWRzIFwiaGVsbG8gd29ybGRcXFwiXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidXQgaXQgYXBwZWFycyB0aGUgY29tbWVudCBpcyB3cm9uZywgaXQgc2hvdWxkIGJlIFwiaGVsbG8gd29ybGRcXFxcXCJcbiAgICAgICAgbGV0IHJldmVyc2UgPSAnXCInO1xuICAgICAgICBsZXQgcXVvdGVIaXQgPSB0cnVlO1xuICAgICAgICBmb3IgKGxldCBpID0gYXJnLmxlbmd0aDsgaSA+IDA7IGktLSkge1xuICAgICAgICAgICAgLy8gd2FsayB0aGUgc3RyaW5nIGluIHJldmVyc2VcbiAgICAgICAgICAgIHJldmVyc2UgKz0gYXJnW2kgLSAxXTtcbiAgICAgICAgICAgIGlmIChxdW90ZUhpdCAmJiBhcmdbaSAtIDFdID09PSAnXFxcXCcpIHtcbiAgICAgICAgICAgICAgICByZXZlcnNlICs9ICdcXFxcJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGFyZ1tpIC0gMV0gPT09ICdcIicpIHtcbiAgICAgICAgICAgICAgICBxdW90ZUhpdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmV2ZXJzZSArPSAnXFxcXCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBxdW90ZUhpdCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldmVyc2UgKz0gJ1wiJztcbiAgICAgICAgcmV0dXJuIHJldmVyc2VcbiAgICAgICAgICAgIC5zcGxpdCgnJylcbiAgICAgICAgICAgIC5yZXZlcnNlKClcbiAgICAgICAgICAgIC5qb2luKCcnKTtcbiAgICB9XG4gICAgX2Nsb25lRXhlY09wdGlvbnMob3B0aW9ucykge1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgICAgICAgY3dkOiBvcHRpb25zLmN3ZCB8fCBwcm9jZXNzLmN3ZCgpLFxuICAgICAgICAgICAgZW52OiBvcHRpb25zLmVudiB8fCBwcm9jZXNzLmVudixcbiAgICAgICAgICAgIHNpbGVudDogb3B0aW9ucy5zaWxlbnQgfHwgZmFsc2UsXG4gICAgICAgICAgICB3aW5kb3dzVmVyYmF0aW1Bcmd1bWVudHM6IG9wdGlvbnMud2luZG93c1ZlcmJhdGltQXJndW1lbnRzIHx8IGZhbHNlLFxuICAgICAgICAgICAgZmFpbE9uU3RkRXJyOiBvcHRpb25zLmZhaWxPblN0ZEVyciB8fCBmYWxzZSxcbiAgICAgICAgICAgIGlnbm9yZVJldHVybkNvZGU6IG9wdGlvbnMuaWdub3JlUmV0dXJuQ29kZSB8fCBmYWxzZSxcbiAgICAgICAgICAgIGRlbGF5OiBvcHRpb25zLmRlbGF5IHx8IDEwMDAwXG4gICAgICAgIH07XG4gICAgICAgIHJlc3VsdC5vdXRTdHJlYW0gPSBvcHRpb25zLm91dFN0cmVhbSB8fCBwcm9jZXNzLnN0ZG91dDtcbiAgICAgICAgcmVzdWx0LmVyclN0cmVhbSA9IG9wdGlvbnMuZXJyU3RyZWFtIHx8IHByb2Nlc3Muc3RkZXJyO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBfZ2V0U3Bhd25PcHRpb25zKG9wdGlvbnMsIHRvb2xQYXRoKSB7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICAgICAgcmVzdWx0LmN3ZCA9IG9wdGlvbnMuY3dkO1xuICAgICAgICByZXN1bHQuZW52ID0gb3B0aW9ucy5lbnY7XG4gICAgICAgIHJlc3VsdFsnd2luZG93c1ZlcmJhdGltQXJndW1lbnRzJ10gPVxuICAgICAgICAgICAgb3B0aW9ucy53aW5kb3dzVmVyYmF0aW1Bcmd1bWVudHMgfHwgdGhpcy5faXNDbWRGaWxlKCk7XG4gICAgICAgIGlmIChvcHRpb25zLndpbmRvd3NWZXJiYXRpbUFyZ3VtZW50cykge1xuICAgICAgICAgICAgcmVzdWx0LmFyZ3YwID0gYFwiJHt0b29sUGF0aH1cImA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRXhlYyBhIHRvb2wuXG4gICAgICogT3V0cHV0IHdpbGwgYmUgc3RyZWFtZWQgdG8gdGhlIGxpdmUgY29uc29sZS5cbiAgICAgKiBSZXR1cm5zIHByb21pc2Ugd2l0aCByZXR1cm4gY29kZVxuICAgICAqXG4gICAgICogQHBhcmFtICAgICB0b29sICAgICBwYXRoIHRvIHRvb2wgdG8gZXhlY1xuICAgICAqIEBwYXJhbSAgICAgb3B0aW9ucyAgb3B0aW9uYWwgZXhlYyBvcHRpb25zLiAgU2VlIEV4ZWNPcHRpb25zXG4gICAgICogQHJldHVybnMgICBudW1iZXJcbiAgICAgKi9cbiAgICBleGVjKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kZWJ1ZyhgZXhlYyB0b29sOiAke3RoaXMudG9vbFBhdGh9YCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGVidWcoJ2FyZ3VtZW50czonKTtcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGFyZyBvZiB0aGlzLmFyZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGVidWcoYCAgICR7YXJnfWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpb25zTm9uTnVsbCA9IHRoaXMuX2Nsb25lRXhlY09wdGlvbnModGhpcy5vcHRpb25zKTtcbiAgICAgICAgICAgICAgICBpZiAoIW9wdGlvbnNOb25OdWxsLnNpbGVudCAmJiBvcHRpb25zTm9uTnVsbC5vdXRTdHJlYW0pIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uc05vbk51bGwub3V0U3RyZWFtLndyaXRlKHRoaXMuX2dldENvbW1hbmRTdHJpbmcob3B0aW9uc05vbk51bGwpICsgb3MuRU9MKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhdGUgPSBuZXcgRXhlY1N0YXRlKG9wdGlvbnNOb25OdWxsLCB0aGlzLnRvb2xQYXRoKTtcbiAgICAgICAgICAgICAgICBzdGF0ZS5vbignZGVidWcnLCAobWVzc2FnZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kZWJ1ZyhtZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlTmFtZSA9IHRoaXMuX2dldFNwYXduRmlsZU5hbWUoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBjcCA9IGNoaWxkLnNwYXduKGZpbGVOYW1lLCB0aGlzLl9nZXRTcGF3bkFyZ3Mob3B0aW9uc05vbk51bGwpLCB0aGlzLl9nZXRTcGF3bk9wdGlvbnModGhpcy5vcHRpb25zLCBmaWxlTmFtZSkpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0ZGJ1ZmZlciA9ICcnO1xuICAgICAgICAgICAgICAgIGlmIChjcC5zdGRvdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgY3Auc3Rkb3V0Lm9uKCdkYXRhJywgKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMubGlzdGVuZXJzICYmIHRoaXMub3B0aW9ucy5saXN0ZW5lcnMuc3Rkb3V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcHRpb25zLmxpc3RlbmVycy5zdGRvdXQoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW9wdGlvbnNOb25OdWxsLnNpbGVudCAmJiBvcHRpb25zTm9uTnVsbC5vdXRTdHJlYW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zTm9uTnVsbC5vdXRTdHJlYW0ud3JpdGUoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9wcm9jZXNzTGluZUJ1ZmZlcihkYXRhLCBzdGRidWZmZXIsIChsaW5lKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5saXN0ZW5lcnMgJiYgdGhpcy5vcHRpb25zLmxpc3RlbmVycy5zdGRsaW5lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5saXN0ZW5lcnMuc3RkbGluZShsaW5lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnN0IGVycmJ1ZmZlciA9ICcnO1xuICAgICAgICAgICAgICAgIGlmIChjcC5zdGRlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY3Auc3RkZXJyLm9uKCdkYXRhJywgKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlLnByb2Nlc3NTdGRlcnIgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5saXN0ZW5lcnMgJiYgdGhpcy5vcHRpb25zLmxpc3RlbmVycy5zdGRlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMubGlzdGVuZXJzLnN0ZGVycihkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghb3B0aW9uc05vbk51bGwuc2lsZW50ICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uc05vbk51bGwuZXJyU3RyZWFtICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uc05vbk51bGwub3V0U3RyZWFtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcyA9IG9wdGlvbnNOb25OdWxsLmZhaWxPblN0ZEVyclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IG9wdGlvbnNOb25OdWxsLmVyclN0cmVhbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IG9wdGlvbnNOb25OdWxsLm91dFN0cmVhbTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLndyaXRlKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcHJvY2Vzc0xpbmVCdWZmZXIoZGF0YSwgZXJyYnVmZmVyLCAobGluZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMubGlzdGVuZXJzICYmIHRoaXMub3B0aW9ucy5saXN0ZW5lcnMuZXJybGluZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMubGlzdGVuZXJzLmVycmxpbmUobGluZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjcC5vbignZXJyb3InLCAoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLnByb2Nlc3NFcnJvciA9IGVyci5tZXNzYWdlO1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5wcm9jZXNzRXhpdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUucHJvY2Vzc0Nsb3NlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLkNoZWNrQ29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjcC5vbignZXhpdCcsIChjb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLnByb2Nlc3NFeGl0Q29kZSA9IGNvZGU7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLnByb2Nlc3NFeGl0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kZWJ1ZyhgRXhpdCBjb2RlICR7Y29kZX0gcmVjZWl2ZWQgZnJvbSB0b29sICcke3RoaXMudG9vbFBhdGh9J2ApO1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZS5DaGVja0NvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY3Aub24oJ2Nsb3NlJywgKGNvZGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUucHJvY2Vzc0V4aXRDb2RlID0gY29kZTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUucHJvY2Vzc0V4aXRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLnByb2Nlc3NDbG9zZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kZWJ1ZyhgU1RESU8gc3RyZWFtcyBoYXZlIGNsb3NlZCBmb3IgdG9vbCAnJHt0aGlzLnRvb2xQYXRofSdgKTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUuQ2hlY2tDb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHN0YXRlLm9uKCdkb25lJywgKGVycm9yLCBleGl0Q29kZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RkYnVmZmVyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgnc3RkbGluZScsIHN0ZGJ1ZmZlcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycmJ1ZmZlci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2VycmxpbmUnLCBlcnJidWZmZXIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNwLnJlbW92ZUFsbExpc3RlbmVycygpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGV4aXRDb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydHMuVG9vbFJ1bm5lciA9IFRvb2xSdW5uZXI7XG4vKipcbiAqIENvbnZlcnQgYW4gYXJnIHN0cmluZyB0byBhbiBhcnJheSBvZiBhcmdzLiBIYW5kbGVzIGVzY2FwaW5nXG4gKlxuICogQHBhcmFtICAgIGFyZ1N0cmluZyAgIHN0cmluZyBvZiBhcmd1bWVudHNcbiAqIEByZXR1cm5zICBzdHJpbmdbXSAgICBhcnJheSBvZiBhcmd1bWVudHNcbiAqL1xuZnVuY3Rpb24gYXJnU3RyaW5nVG9BcnJheShhcmdTdHJpbmcpIHtcbiAgICBjb25zdCBhcmdzID0gW107XG4gICAgbGV0IGluUXVvdGVzID0gZmFsc2U7XG4gICAgbGV0IGVzY2FwZWQgPSBmYWxzZTtcbiAgICBsZXQgYXJnID0gJyc7XG4gICAgZnVuY3Rpb24gYXBwZW5kKGMpIHtcbiAgICAgICAgLy8gd2Ugb25seSBlc2NhcGUgZG91YmxlIHF1b3Rlcy5cbiAgICAgICAgaWYgKGVzY2FwZWQgJiYgYyAhPT0gJ1wiJykge1xuICAgICAgICAgICAgYXJnICs9ICdcXFxcJztcbiAgICAgICAgfVxuICAgICAgICBhcmcgKz0gYztcbiAgICAgICAgZXNjYXBlZCA9IGZhbHNlO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyZ1N0cmluZy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBjID0gYXJnU3RyaW5nLmNoYXJBdChpKTtcbiAgICAgICAgaWYgKGMgPT09ICdcIicpIHtcbiAgICAgICAgICAgIGlmICghZXNjYXBlZCkge1xuICAgICAgICAgICAgICAgIGluUXVvdGVzID0gIWluUXVvdGVzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYXBwZW5kKGMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGMgPT09ICdcXFxcJyAmJiBlc2NhcGVkKSB7XG4gICAgICAgICAgICBhcHBlbmQoYyk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYyA9PT0gJ1xcXFwnICYmIGluUXVvdGVzKSB7XG4gICAgICAgICAgICBlc2NhcGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjID09PSAnICcgJiYgIWluUXVvdGVzKSB7XG4gICAgICAgICAgICBpZiAoYXJnLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBhcmdzLnB1c2goYXJnKTtcbiAgICAgICAgICAgICAgICBhcmcgPSAnJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGFwcGVuZChjKTtcbiAgICB9XG4gICAgaWYgKGFyZy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGFyZ3MucHVzaChhcmcudHJpbSgpKTtcbiAgICB9XG4gICAgcmV0dXJuIGFyZ3M7XG59XG5leHBvcnRzLmFyZ1N0cmluZ1RvQXJyYXkgPSBhcmdTdHJpbmdUb0FycmF5O1xuY2xhc3MgRXhlY1N0YXRlIGV4dGVuZHMgZXZlbnRzLkV2ZW50RW1pdHRlciB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucywgdG9vbFBhdGgpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5wcm9jZXNzQ2xvc2VkID0gZmFsc2U7IC8vIHRyYWNrcyB3aGV0aGVyIHRoZSBwcm9jZXNzIGhhcyBleGl0ZWQgYW5kIHN0ZGlvIGlzIGNsb3NlZFxuICAgICAgICB0aGlzLnByb2Nlc3NFcnJvciA9ICcnO1xuICAgICAgICB0aGlzLnByb2Nlc3NFeGl0Q29kZSA9IDA7XG4gICAgICAgIHRoaXMucHJvY2Vzc0V4aXRlZCA9IGZhbHNlOyAvLyB0cmFja3Mgd2hldGhlciB0aGUgcHJvY2VzcyBoYXMgZXhpdGVkXG4gICAgICAgIHRoaXMucHJvY2Vzc1N0ZGVyciA9IGZhbHNlOyAvLyB0cmFja3Mgd2hldGhlciBzdGRlcnIgd2FzIHdyaXR0ZW4gdG9cbiAgICAgICAgdGhpcy5kZWxheSA9IDEwMDAwOyAvLyAxMCBzZWNvbmRzXG4gICAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRpbWVvdXQgPSBudWxsO1xuICAgICAgICBpZiAoIXRvb2xQYXRoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Rvb2xQYXRoIG11c3Qgbm90IGJlIGVtcHR5Jyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgdGhpcy50b29sUGF0aCA9IHRvb2xQYXRoO1xuICAgICAgICBpZiAob3B0aW9ucy5kZWxheSkge1xuICAgICAgICAgICAgdGhpcy5kZWxheSA9IG9wdGlvbnMuZGVsYXk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgQ2hlY2tDb21wbGV0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZG9uZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnByb2Nlc3NDbG9zZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3NldFJlc3VsdCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMucHJvY2Vzc0V4aXRlZCkge1xuICAgICAgICAgICAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dChFeGVjU3RhdGUuSGFuZGxlVGltZW91dCwgdGhpcy5kZWxheSwgdGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2RlYnVnKG1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5lbWl0KCdkZWJ1ZycsIG1lc3NhZ2UpO1xuICAgIH1cbiAgICBfc2V0UmVzdWx0KCkge1xuICAgICAgICAvLyBkZXRlcm1pbmUgd2hldGhlciB0aGVyZSBpcyBhbiBlcnJvclxuICAgICAgICBsZXQgZXJyb3I7XG4gICAgICAgIGlmICh0aGlzLnByb2Nlc3NFeGl0ZWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb2Nlc3NFcnJvcikge1xuICAgICAgICAgICAgICAgIGVycm9yID0gbmV3IEVycm9yKGBUaGVyZSB3YXMgYW4gZXJyb3Igd2hlbiBhdHRlbXB0aW5nIHRvIGV4ZWN1dGUgdGhlIHByb2Nlc3MgJyR7dGhpcy50b29sUGF0aH0nLiBUaGlzIG1heSBpbmRpY2F0ZSB0aGUgcHJvY2VzcyBmYWlsZWQgdG8gc3RhcnQuIEVycm9yOiAke3RoaXMucHJvY2Vzc0Vycm9yfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5wcm9jZXNzRXhpdENvZGUgIT09IDAgJiYgIXRoaXMub3B0aW9ucy5pZ25vcmVSZXR1cm5Db2RlKSB7XG4gICAgICAgICAgICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoYFRoZSBwcm9jZXNzICcke3RoaXMudG9vbFBhdGh9JyBmYWlsZWQgd2l0aCBleGl0IGNvZGUgJHt0aGlzLnByb2Nlc3NFeGl0Q29kZX1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMucHJvY2Vzc1N0ZGVyciAmJiB0aGlzLm9wdGlvbnMuZmFpbE9uU3RkRXJyKSB7XG4gICAgICAgICAgICAgICAgZXJyb3IgPSBuZXcgRXJyb3IoYFRoZSBwcm9jZXNzICcke3RoaXMudG9vbFBhdGh9JyBmYWlsZWQgYmVjYXVzZSBvbmUgb3IgbW9yZSBsaW5lcyB3ZXJlIHdyaXR0ZW4gdG8gdGhlIFNUREVSUiBzdHJlYW1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBjbGVhciB0aGUgdGltZW91dFxuICAgICAgICBpZiAodGhpcy50aW1lb3V0KSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcbiAgICAgICAgICAgIHRoaXMudGltZW91dCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5lbWl0KCdkb25lJywgZXJyb3IsIHRoaXMucHJvY2Vzc0V4aXRDb2RlKTtcbiAgICB9XG4gICAgc3RhdGljIEhhbmRsZVRpbWVvdXQoc3RhdGUpIHtcbiAgICAgICAgaWYgKHN0YXRlLmRvbmUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXN0YXRlLnByb2Nlc3NDbG9zZWQgJiYgc3RhdGUucHJvY2Vzc0V4aXRlZCkge1xuICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IGBUaGUgU1RESU8gc3RyZWFtcyBkaWQgbm90IGNsb3NlIHdpdGhpbiAke3N0YXRlLmRlbGF5IC9cbiAgICAgICAgICAgICAgICAxMDAwfSBzZWNvbmRzIG9mIHRoZSBleGl0IGV2ZW50IGZyb20gcHJvY2VzcyAnJHtzdGF0ZS50b29sUGF0aH0nLiBUaGlzIG1heSBpbmRpY2F0ZSBhIGNoaWxkIHByb2Nlc3MgaW5oZXJpdGVkIHRoZSBTVERJTyBzdHJlYW1zIGFuZCBoYXMgbm90IHlldCBleGl0ZWQuYDtcbiAgICAgICAgICAgIHN0YXRlLl9kZWJ1ZyhtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICBzdGF0ZS5fc2V0UmVzdWx0KCk7XG4gICAgfVxufVxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dG9vbHJ1bm5lci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcbiAgICByZXN1bHRbXCJkZWZhdWx0XCJdID0gbW9kO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgZnNfMSA9IHJlcXVpcmUoXCJmc1wiKTtcbmNvbnN0IGNvcmUgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcIkBhY3Rpb25zL2NvcmVcIikpO1xuY29uc3QgcGF0aF8xID0gcmVxdWlyZShcInBhdGhcIik7XG5jb25zdCBleGVjID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJAYWN0aW9ucy9leGVjXCIpKTtcbmNsYXNzIERvd25sb2FkIHtcbiAgICBjb25zdHJ1Y3Rvcih2ZXJzaW9uKSB7XG4gICAgICAgIHRoaXMudmVyc2lvbiA9IHZlcnNpb247XG4gICAgICAgIHRoaXMuQkFTRV9VUkwgPSAnaHR0cHM6Ly9kbC5nb29nbGUuY29tL2RsL2Nsb3Vkc2RrL2NoYW5uZWxzL3JhcGlkJztcbiAgICAgICAgdGhpcy5zZGtVcmwgPSB0aGlzLkJBU0VfVVJMO1xuICAgICAgICB0aGlzLnNldFNka0Rvd25sb2FkVXJsKCk7XG4gICAgfVxuICAgIGRvd25sb2FkKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICAgICAgY29uc3QgZXh0ZW5zaW9uID0gdGhpcy5zZGtVcmwuZW5kc1dpdGgoJy56aXAnKSA/ICd6aXAnIDogJ3Rhci5neic7XG4gICAgICAgICAgICBjb25zdCBkZXN0aW5hdGlvbiA9IHBhdGhfMS5yZXNvbHZlKHByb2Nlc3MuY3dkKCksIGBnb29nbGUtY2xvdWQtc2RrLiR7ZXh0ZW5zaW9ufWApO1xuICAgICAgICAgICAgaWYgKGZzXzEuZXhpc3RzU3luYyhkZXN0aW5hdGlvbikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGVzdGluYXRpb247XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb3JlLmRlYnVnKGBEb3dubG9hZGluZyAke3RoaXMuc2RrVXJsfWApO1xuICAgICAgICAgICAgeWllbGQgZXhlYy5leGVjKGBjdXJsIC1zIC1vICR7ZGVzdGluYXRpb259ICR7dGhpcy5zZGtVcmx9YCk7XG4gICAgICAgICAgICBjb3JlLmRlYnVnKGBEb3dubG9hZGVkICR7dGhpcy5zZGtVcmx9YCk7XG4gICAgICAgICAgICByZXR1cm4gZGVzdGluYXRpb247XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzZXRTZGtEb3dubG9hZFVybCgpIHtcbiAgICAgICAgaWYgKHRoaXMudmVyc2lvbiA9PT0gJ2xhdGVzdCcpIHtcbiAgICAgICAgICAgIGlmIChwcm9jZXNzLnBsYXRmb3JtID09PSAnd2luMzInKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZGtVcmwgPSBgJHt0aGlzLkJBU0VfVVJMfS9nb29nbGUtY2xvdWQtc2RrLnppcGA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNka1VybCA9IGAke3RoaXMuQkFTRV9VUkx9L2dvb2dsZS1jbG91ZC1zZGsudGFyLmd6YDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChwcm9jZXNzLnBsYXRmb3JtID09PSAnd2luMzInKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZGtVcmwgPSBgJHt0aGlzLkJBU0VfVVJMfS9kb3dubG9hZHMvZ29vZ2xlLWNsb3VkLXNkay0ke3RoaXMudmVyc2lvbn0td2luZG93cy14ODZfNjQuemlwYDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHByb2Nlc3MucGxhdGZvcm0gPT09ICdkYXJ3aW4nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZGtVcmwgPSBgJHt0aGlzLkJBU0VfVVJMfS9kb3dubG9hZHMvZ29vZ2xlLWNsb3VkLXNkay0ke3RoaXMudmVyc2lvbn0tZGFyd2luLXg4Nl82NC50YXIuZ3pgO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZGtVcmwgPSBgJHt0aGlzLkJBU0VfVVJMfS9kb3dubG9hZHMvZ29vZ2xlLWNsb3VkLXNkay0ke3RoaXMudmVyc2lvbn0tbGludXgteDg2XzY0LnRhci5nemA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLkRvd25sb2FkID0gRG93bmxvYWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcbiAgICByZXN1bHRbXCJkZWZhdWx0XCJdID0gbW9kO1xuICAgIHJldHVybiByZXN1bHQ7XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgZG93bmxvYWRfMSA9IHJlcXVpcmUoXCIuL2Rvd25sb2FkXCIpO1xuY29uc3QgcGF0aF8xID0gcmVxdWlyZShcInBhdGhcIik7XG5jb25zdCBjb3JlID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJAYWN0aW9ucy9jb3JlXCIpKTtcbmNvbnN0IGV4ZWMgPSBfX2ltcG9ydFN0YXIocmVxdWlyZShcIkBhY3Rpb25zL2V4ZWNcIikpO1xuY29uc3QgZnNfMSA9IHJlcXVpcmUoXCJmc1wiKTtcbmZ1bmN0aW9uIGluc3RhbGwoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc3QgZG93bmxvYWRlciA9IG5ldyBkb3dubG9hZF8xLkRvd25sb2FkKCdsYXRlc3QnKTtcbiAgICAgICAgY29uc3Qgc2RrRmlsZSA9IHlpZWxkIGRvd25sb2FkZXIuZG93bmxvYWQoKTtcbiAgICAgICAgY29uc3QgZGVzdGluYXRpb25Gb2xkZXIgPSBwYXRoXzEucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAnZ29vZ2xlLWNsb3VkLXNkaycpO1xuICAgICAgICBpZiAoc2RrRmlsZS5lbmRzV2l0aCgnLnppcCcpKSB7XG4gICAgICAgICAgICB5aWVsZCBleGVjLmV4ZWMoYDd6IGUgLXkgJHtzZGtGaWxlfSAtb2M6JHtkZXN0aW5hdGlvbkZvbGRlcn1gKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHlpZWxkIGV4ZWMuZXhlYyhgdGFyIC14ZiAke3Nka0ZpbGV9YCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb2Nlc3MucGxhdGZvcm0gPT09ICd3aW4zMicpIHtcbiAgICAgICAgICAgIHlpZWxkIGV4ZWMuZXhlYygnZGlyJyk7XG4gICAgICAgICAgICB5aWVsZCBleGVjLmV4ZWMocGF0aF8xLnJlc29sdmUoZGVzdGluYXRpb25Gb2xkZXIsICdpbnN0YWxsLmJhdCAtLWRpc2FibGUtcHJvbXB0cycpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChwcm9jZXNzLnBsYXRmb3JtID09ICdkYXJ3aW4nKSB7XG4gICAgICAgICAgICB5aWVsZCBleGVjLmV4ZWMocGF0aF8xLnJlc29sdmUoZGVzdGluYXRpb25Gb2xkZXIsICdpbnN0YWxsLnNoJykpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgeWllbGQgZXhlYy5leGVjKHBhdGhfMS5yZXNvbHZlKGRlc3RpbmF0aW9uRm9sZGVyLCAnaW5zdGFsbC5zaCAtLWRpc2FibGUtcHJvbXB0cycpKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzZXJ2aWNlQWNjb3VudEtleUJhc2U2NCA9IGNvcmUuZ2V0SW5wdXQoJ3NlcnZpY2UtYWNjb3VudC1rZXknKTtcbiAgICAgICAgY29uc3Qgc2VydmljZUFjY291bnRLZXlKc29uID0gQnVmZmVyLmZyb20oc2VydmljZUFjY291bnRLZXlCYXNlNjQsICdiYXNlNjQnKTtcbiAgICAgICAgY29uc3Qgc2VydmljZUFjY291bnRLZXlQYXRoID0gcGF0aF8xLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJ2djbG91ZC5qc29uJyk7XG4gICAgICAgIGZzXzEud3JpdGVGaWxlU3luYyhzZXJ2aWNlQWNjb3VudEtleVBhdGgsIHNlcnZpY2VBY2NvdW50S2V5SnNvbik7XG4gICAgICAgIHlpZWxkIGV4ZWMuZXhlYyhgZ2Nsb3VkIGF1dGggYWN0aXZhdGUtc2VydmljZS1hY2NvdW50IC0ta2V5LWZpbGU9JHtzZXJ2aWNlQWNjb3VudEtleVBhdGh9YCk7XG4gICAgfSk7XG59XG5leHBvcnRzLmluc3RhbGwgPSBpbnN0YWxsO1xudHJ5IHtcbiAgICBpbnN0YWxsKCk7XG59XG5jYXRjaCAoZXJyb3IpIHtcbiAgICBjb3JlLnNldEZhaWxlZChlcnJvci5tZXNzYWdlKTtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNoaWxkX3Byb2Nlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXZlbnRzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm9zXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7Il0sInNvdXJjZVJvb3QiOiIifQ==