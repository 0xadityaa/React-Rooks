"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ShineBorder from "@/components/magicui/shine-border";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BrainCircuitIcon,
  Clock,
  RocketIcon,
  Star,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface Stats {
  usersCount: number;
  gamesCount: number;
}

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: <RocketIcon />,
    title: "AI Opponent",
    description:
      "We offer a realtime AI opponent that plays against you whenever you want.",
  },
  {
    icon: <BrainCircuitIcon />,
    title: "Gameplay Analysis",
    description:
      "We provide gameplay analysis to help you improve your chess games.",
  },
  {
    icon: <UserIcon />,
    title: "Player Statistics",
    description:
      "See your gameplay stats and keep track of wins, losses & history.",
  },
  {
    icon: <Clock />,
    title: "Save games for later",
    description:
      "Cant finish your game? Replay it whenever you want. It starts where you left off.",
  },
];

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "Is this platform for beginners?",
    answer: "Yes. we offer easy mode against AI along with realtime analysis and moves undo features that are designed for beginners.",
    value: "item-1",
  },
  {
    question: "I am an advanced player. will this be too easy?",
    answer: "No. We offer advanced mode against AI that could think upto 26 move depth for every move made along with realtime position evaluation bar that are designed for advanced players.",
    value: "item-2",
  },
  {
    question:
      "Is React Rooks safe?",
    answer:
      "Yes, React Rooks is a completely safe and opensource project made entirely for the love of chess and the community. We have a strict code of conduct and we are committed to providing a safe and welcoming environment for players of all skill levels.",
    value: "item-3",
  },
  {
    question: "How can i contribute to React Rooks?",
    answer: "We have provided Github link to the project on our website, Feel free to request any features or report any bugs there. We are also open to any suggestions, ideas and contributions.",
    value: "item-4",
  },
];

export default function Home() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/");
        if (!response.ok) {
          throw new Error("Failed to fetch stats");
        }
        const data: Stats = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center sm:p-12 ">
      <ShineBorder
        className="flex flex-col border sm:flex-row justify-center items-center w-full max-w-screen-xl rounded-lg overflow-hidden transition transform"
        color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
      >
        <div className="flex flex-col sm:flex-row justify-center items-center w-full max-w-screen-xl rounded-lg overflow-hidden transition transform m-2">
          <div className="w-full sm:w-1/2 flex justify-center p-5 lg:p-8">
            <Image
              src="/chessboard.png"
              alt="Chess Game"
              width={500}
              height={500}
              className="rounded-lg shadow-md"
            />
          </div>
          <div className="w-full sm:w-1/2 flex flex-col justify-start p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-left">
              Join our chess platform and improve your chess.
            </h1>
            <p className="text-gray-600 mb-8   dark:text-gray-400">
              Play against <span className="font-bold">strongest</span> chess AI
              and get detailed analysis of your games
            </p>
            <div className="flex flex-row justify-start space-x-4 mb-8">
              {stats && (
                <>
                  <div className="text-center">
                    <p className="text-xl font-bold  ">
                      {stats.usersCount}{" "}
                      <span className="font-thin text-xl   text-gray-400">
                        Players Registered
                      </span>
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold  ">
                      {stats.gamesCount}{" "}
                      <span className="font-thin text-xl   text-gray-400">
                        Games Played
                      </span>
                    </p>
                  </div>
                </>
              )}
            </div>
            <form action={"/api/chess"} method="POST">
              <Button
                type="submit"
                className="p-5 text-2xl font-mono font-bold text-background bg-[#779952] hover:bg-slate-500"
              >
                <Image
                  src="/btn-icon.svg"
                  className="mr-3"
                  width={30}
                  height={30}
                  alt="React Rooks Logo"
                />
                Play now
              </Button>
            </form>
          </div>
        </div>
      </ShineBorder>
      <section id="howItWorks" className="container text-center py-24 sm:py-32">
        <h2 className="text-3xl md:text-4xl font-bold ">
          Why play on{" "}
          <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            React Rooks{" "}
          </span>
          ?
        </h2>
        <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
          React Rooks provides users with the excitement of competing against
          most advanced AI opponent, tailored to players level that challenge
          both beginners and grandmasters alike.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(({ icon, title, description }: FeatureProps) => (
            <Card key={title} className="bg-muted/50">
              <CardHeader>
                <CardTitle className="grid gap-4 place-items-center">
                  {icon}
                  {title}
                </CardTitle>
              </CardHeader>
              <CardContent>{description}</CardContent>
            </Card>
          ))}
        </div>
      </section>
      <section id="cta" className="bg-muted/50 py-16 my-24 sm:my-32">
        <div className="container lg:grid lg:grid-cols-2 place-items-center">
          <div className="lg:col-start-1">
            <h2 className="text-3xl md:text-4xl font-bold ">
              Play against AI
              <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                {" "}
                Free Forever{" "}
              </span>
              on our platform
            </h2>
            <p className="text-muted-foreground text-xl mt-4 mb-8 lg:mb-0">
              With the help of Webassembly, we ship the AI model right in your
              browser, so that you can enjoy playing chess seamlessly without
              any credits, purchases or limits.
            </p>
          </div>

          <div className="space-y-4 lg:col-start-2">
            <Button className="w-full md:mr-4 md:w-auto">
              <Link href="https://www.0xadityaa.xyz/blog/how-we-built-react-rooks">
                Read how we built it
              </Link>
            </Button>
            <Button variant="outline" className="w-full md:w-auto">
              <Link href="https://github.com/0xaditya/react-rooks">
                Give us a ⭐️ on Github
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <section
      id="faq"
      className="container py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Frequently Asked{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Questions
        </span>
      </h2>

      <Accordion
        type="single"
        collapsible
        className="w-full AccordionRoot"
      >
        {FAQList.map(({ question, answer, value }: FAQProps) => (
          <AccordionItem
            key={value}
            value={value}
          >
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h3 className="font-medium mt-4">
        Still have questions?{" "}
        <a
          rel="noreferrer noopener"
          href="https://github.com/0xaditya/react-rooks"
          className="text-primary transition-all border-primary hover:border-b-2"
        >
          Contact us
        </a>
      </h3>
    </section>
    </main>
  );
}
