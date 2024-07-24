"use client";
import { useState, useMemo, useEffect, JSX, SVGProps } from "react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

type Player = {
  _id: string;
  Title: string;
  Player: string;
  "Rating | Ranking": string;
  Federation: string;
  Rating: number;
  Ranking: string;
};

interface ArrowUpDownIconProps {
  className: string;
}

export default function Component() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Ranking"); // Rating or Ranking
  const [sortOrder, setSortOrder] = useState("Ascending"); // Ascending or Descending
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await fetch(
          "https://chessplayersapi.p.rapidapi.com/players/findAll?limit=500",
          {
            headers: {
              "X-Rapidapi-Key":
                "b843755b78msh869e67e8867b84cp1b7f2cjsn311cd3b5459e",
              "X-Rapidapi-Host": "chessplayersapi.p.rapidapi.com",
            },
          }
        );
        const data: Player[] = await response.json();
        setPlayers(data);
        console.log("Fetched players:", data);
      } catch (error) {
        console.error("Failed to fetch players:", error);
        setPlayers([]);
      }
    };

    fetchData();
  }, []);

  const filteredPlayers = useMemo<Player[]>(() => {
    return players
      .filter((player: Player) => {
        return (
          player.Player.toLowerCase().includes(searchTerm.toLowerCase()) ||
          player.Federation.toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
      .sort((a: Player, b: Player) => {
        if (sortBy === "rating") {
          return sortOrder === "desc"
            ? a.Rating - b.Rating
            : b.Rating - a.Rating;
        } else {
          // For ranking, we need to convert the string to a number
          const aRank = parseInt(a.Ranking.replace("#", ""));
          const bRank = parseInt(b.Ranking.replace("#", ""));
          return sortOrder === "asc" ? aRank - bRank : bRank - aRank;
        }
      });
  }, [players, searchTerm, sortBy, sortOrder]);

  return (
    <>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Top Chess Players in the 🌏</h1>
      <div className="flex items-center mb-6">
        <Input
          type="text"
          placeholder="Search by name, federation, or rating"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 mr-4 bg-white dark:bg-gray-950"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="shrink-0">
              <ArrowUpDownIcon className="w-4 h-4 mr-2" />
              Sort by
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[200px]" align="end">
            <DropdownMenuRadioGroup value={sortBy}>
              <DropdownMenuRadioItem
                value="rating"
                onSelect={() => setSortBy("rating")}
              >
                Rating
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                value="ranking"
                onSelect={() => setSortBy("ranking")}
              >
                Ranking
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={sortOrder}>
              <DropdownMenuRadioItem
                value="asc"
                onSelect={() => setSortOrder("asc")}
              >
                Ascending
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem
                value="desc"
                onSelect={() => setSortOrder("desc")}
              >
                Descending
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Ranking</TableHead>
              <TableHead>Federation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPlayers.map((player, index) => (
              <TableRow key={player._id}>
                <TableCell>{player.Title}</TableCell>
                <TableCell>{player.Player}</TableCell>
                <TableCell>{player.Rating}</TableCell>
                <TableCell>{player.Ranking}</TableCell>
                <TableCell>{player.Federation}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
    </>
  );
}

function ArrowUpDownIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21 16-4 4-4-4" />
      <path d="M17 20V4" />
      <path d="m3 8 4-4 4 4" />
      <path d="M7 4v16" />
    </svg>
  );
}
