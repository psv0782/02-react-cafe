import css from './App.module.css';
import CafeInfo from "../CafeInfo/CafeInfo.tsx";
import {useState} from "react";
import VoteOptions from "../VoteOptions/VoteOptions.tsx";
import type {Votes} from "../../types/votes.ts";
import VoteStats from "../VoteStats/VoteStats.tsx";
import Notification from "../Notification/Notification.tsx";

export default function App() {
    const [votes, setVotes] = useState<Votes>({
        good: 0,
        neutral: 0,
        bad: 0,
    });

    const handleVote = (key: keyof Votes) => {
        setVotes({
            ...votes,
            [key]: votes[key] + 1,
        });
    };
    const resetVotes = () => {
        setVotes({
            good: 0,
            neutral: 0,
            bad: 0,
        });
    };

    const totalVotes = votes.good + votes.neutral + votes.bad;
    const positiveRate = totalVotes ? Math.round((votes.good / totalVotes) * 100) : 0;

    return (
        <div className={css.app}>
            <CafeInfo/>
            <VoteOptions onVote={handleVote} onReset={resetVotes} canReset={totalVotes > 0 ? true : false}/>
            {totalVotes > 0 ?
                (<VoteStats votes={votes} totalVotes={totalVotes} positiveRate={positiveRate}/>) :
                (<Notification/>)
            }
        </div>
    );
}