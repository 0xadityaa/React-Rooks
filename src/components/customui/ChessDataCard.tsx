"use client";

type ChessData = {
  depth: string;
  seldepth: string;
  multipv: string;
  score: number;
  nodes: string;
  nps: string;
  tbhits: string;
  time: string;
  pv: string;
};

const ChessDataComponent: React.FC<{ data: ChessData }> = ({ data }) => {
  return (
    <div className="p-4 bg-background rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Chess Analysis Data</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <strong>Depth:</strong> {data.depth}
        </div>
        <div>
          <strong>Selective Depth:</strong> {data.seldepth}
        </div>
        <div>
          <strong>Multi PV:</strong> {data.multipv}
        </div>
        <div>
          <strong>Score:</strong> {data.score}
        </div>
        <div>
          <strong>Nodes:</strong> {data.nodes}
        </div>
        <div>
          <strong>NPS:</strong> {data.nps}
        </div>
        <div>
          <strong>TB Hits:</strong> {data.tbhits}
        </div>
        <div>
          <strong>Time:</strong> {data.time}
        </div>
      </div>
      <div className="mt-4">
        <strong>PV:</strong>
        <div className="mt-2 p-2 border rounded bg-card overflow-auto overflow-y-auto">
          <pre className="whitespace-pre-wrap max-w-xs">{data.pv}</pre>
        </div>
      </div>
    </div>
  );
};

export default ChessDataComponent;
