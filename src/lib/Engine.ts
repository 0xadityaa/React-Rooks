
import { Info } from "./Info";

class Engine {
  private worker: Worker;

  constructor() {
    this.worker = new Worker("/stockfishWorker.js");
  }

  evaluatePosition(fen: string, level: number) {
    this.worker.postMessage(`position fen ${fen}`);
    this.worker.postMessage(`setoption name Skill Level value ${level}`);
    this.worker.postMessage("go depth 15");
  }

  onMessage(callback: (message: { bestMove?: string, info?: Info }) => void) {
    this.worker.onmessage = (event) => {
      const message = event.data;
      console.log(message);
      const bestMoveMatch = message.match(/bestmove\s(\w+)/);
      if (bestMoveMatch) {
        callback({ bestMove: bestMoveMatch[1] });
      }

      const infoMatch = message.match(/info\s([\w\s]+)/);
      if (infoMatch) {
        let dataArray = message.split(" ");

        // Create an object to store the parsed information
        const infoObject: Info = {
          depth: "",
          seldepth: "",
          multipv: "",
          score: 0,
          nodes: "",
          nps: "",
          tbhits: "",
          time: "",
          pv: ""
        };

        // Iterate over the array and parse the information
        for (let i = 0; i < dataArray.length; i++) {
          if (dataArray[i] === "depth") {
            infoObject.depth = dataArray[i + 1];
          } else if (dataArray[i] === "seldepth") {
            infoObject.seldepth = dataArray[i + 1];
          } else if (dataArray[i] === "multipv") {
            infoObject.multipv = dataArray[i + 1];
          } else if (dataArray[i] === "score") {
            infoObject.score = parseFloat(dataArray[i + 2]);
          } else if (dataArray[i] === "nodes") {
            infoObject.nodes = dataArray[i + 1];
          } else if (dataArray[i] === "nps") {
            infoObject.nps = dataArray[i + 1];
          } else if (dataArray[i] === "tbhits") {
            infoObject.tbhits = dataArray[i + 1];
          } else if (dataArray[i] === "time") {
            infoObject.time = dataArray[i + 1];
          } else if (dataArray[i] === "pv") {
            infoObject.pv = dataArray.slice(i + 1).join(" ");
            break;
          }
        }
        callback({ info: infoObject });
      }
    };
  }
}

export default Engine;
