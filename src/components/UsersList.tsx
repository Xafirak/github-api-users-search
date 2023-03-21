import React, { useEffect, useState } from "react";
import { SearchResult, SearchUserType, } from "../Github";
import s from './../Github.module.css'
import axios from 'axios';
import { Preloader } from "./Preloader";

type PropsType = {
    term: string
    // users: SearchUserType[]
    // setUserDetails: (a: UserType) => void
    selectedUser: SearchUserType | null
    onUserSelect: (user: SearchUserType) => void
}

// ДЗ. сделать прелоадер

//  UPD. прелоадер имплементирован =)






export const UsersList: React.FC<PropsType> = (props) => {
    const [users, setUsers] = useState<SearchUserType[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // Поиск юзера 
    useEffect(() => {

        setIsLoading(true)
        
        axios
            .get<SearchResult>('https://api.github.com/search/users?q=' + props.term)
            .then(res => {
                setUsers(res.data.items)
                setIsLoading(false)
            })
    }, [props.term])




    return (
        <div>
            <ul>
                {isLoading ? <Preloader/> : users.map(u =>
                    <li
                        key={u.id}
                        className={props.selectedUser === u ? s.selected : ''}
                        onClick={() => props.onUserSelect(u)}
                    >
                        {u.login}
                    </li>
                )}
            </ul>
        </div>
    )
}