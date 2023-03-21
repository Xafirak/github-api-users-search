import axios from "axios";
import React, { useEffect, useState } from "react";
import { SearchUserType, UserType } from "../Github";
import { Preloader } from "./Preloader";
import { Timer } from "./Timer";


type PropsType = {
    user: SearchUserType | null
}

const startTimerSeconds: number = 10
export const UserDetails: React.FC<PropsType> = ({ user }) => {

    const [userDetails, setUserDetails] = useState<UserType | null>(null)
    const [seconds, setSeconds] = useState<number>(startTimerSeconds)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // Отображение деталей юзера 
    useEffect(() => {            

        if (!!user) {
            setIsLoading(true)
            axios
                .get<UserType>(`https://api.github.com/users/${user.login}`)
                .then(res => {
                    setSeconds(startTimerSeconds)
                    setUserDetails(res.data)
                    setIsLoading(false)
                })
        }
        
    }, [user])

    useEffect(() => {
        if (seconds < 1) setUserDetails(null)
    })

    return (
        <div>
            {isLoading ? <Preloader /> : userDetails ?
                <div>

                    <Timer
                        timerKey={userDetails.id.toString()}
                        onChange={setSeconds}
                        seconds={seconds}
                    />
                    <h2>{userDetails.login}</h2>
                    <img src={userDetails.avatar_url} alt="" />
                    <br />
                    {userDetails.login} followed: {userDetails.followers}
                </div> : ''}
        </div>
    )
}

//=========

