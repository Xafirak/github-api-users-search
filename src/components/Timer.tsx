import React, { useEffect, useState } from "react";

type TimerProps = {
    seconds: number
    onChange: (actialSeconds: number) => void
    timerKey: string
}

export const Timer: React.FC<TimerProps> = (props) => {

    const [seconds, setSeconds] = useState<number>(props.seconds)

    useEffect(() => {
        setSeconds(props.seconds)
    }, [props.seconds])

    useEffect(() => {
        props.onChange(seconds)
    }, [seconds])

    useEffect(() => {
        const timer = setInterval(() => {
            setSeconds(seconds => seconds - 1)
        }, 1000);

        return () => {
            clearInterval(timer)
        }
    }, [props.timerKey])

    return (
        <div>
            Time left: {seconds}
        </div>
    )
}