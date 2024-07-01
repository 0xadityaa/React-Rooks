// public/stockfishWorker.js
importScripts("stockfish.js");

const stockfish = new Worker("stockfish.js");

stockfish.onmessage = function (event) {
  postMessage(event.data);
};

onmessage = function (event) {
  stockfish.postMessage(event.data);
};
