importScripts("./Stockfish.js");

const stockfish = new Worker("Stockfish.js");

stockfish.onmessage = function (event) {
  postMessage(event.data);
};

onmessage = function (event) {
  stockfish.postMessage(event.data);
};
