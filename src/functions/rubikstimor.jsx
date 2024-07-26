export const ao = (a) => {
    const n = a.length;
    let sum = 0;
    let min = Number.MAX_SAFE_INTEGER;
    let max = Number.MIN_SAFE_INTEGER;
    for (let i = 0; i < n; i++) {
        min = Math.min(a[i].time, min);
        max = Math.max(a[i].time, max);
        sum += a[i].time;
    }
    return (sum - min - max) / (n - 2) / 1000;
}

export const cstimerWorker = (function() {
	var worker = new Worker('cstimer_module.js');

	var callbacks = {};
	var msgid = 0;

	worker.onmessage = function(e) {
		var data = e.data; //data: [msgid, type, ret]
		var callback = callbacks[data[0]];
		delete callbacks[data[0]];
		callback && callback(data[2]);
	}

	function callWorkerAsync(type, details) {
		return new Promise(function(type, details, resolve) {
			++msgid;
			callbacks[msgid] = resolve;
			worker.postMessage([msgid, type, details]);
		}.bind(null, type, details));
	}

	return {
		getScrambleTypes: function() {
			return callWorkerAsync('scrtype');
		},
		getScramble: function() {
			return callWorkerAsync('scramble', Array.prototype.slice.apply(arguments));
		},
		setSeed: function(seed) {
			return callWorkerAsync('seed', [seed]);
		},
		setGlobal: function(key, value) {
			return callWorkerAsync('set', [key, value]);
		},
		getImage: function(scramble, type) {
			return callWorkerAsync('image', [scramble, type]);
		}
	}
})();

export const wca_events = [
	["3x3x3", "333", 0],
	["2x2x2", "222so", 0],
	["4x4x4", "444wca", 0],
	["5x5x5", "555wca", 60],
	["6x6x6", "666wca", 80],
	["7x7x7", "777wca", 100],
	["3x3 bld", "333ni", 0],
	["3x3 fm", "333fm", 0],
	["3x3 oh", "333", 0],
	["clock", "clkwca", 0],
	["megaminx", "mgmp", 70],
	["pyraminx", "pyrso", 10],
	["skewb", "skbso", 0],
	["sq1", "sqrs", 0],
	["4x4 bld", "444bld", 40],
	["5x5 bld", "555bld", 60],
	["3x3 mbld", "r3ni", 5]
];