import axios from "axios";
import React, { useEffect, useState } from "react";
import { Search } from "./components/Search";
import { UserDetails } from "./components/UserDetails";
import { UsersList } from "./components/UsersList";
import s from './Github.module.css'

export type SearchUserType = {
    login: string
    id: number
}

export type SearchResult = {
    items: SearchUserType[]
}

export type UserType = {
    login: string
    id: number
    avatar_url: string
    followers: number
}



export const Github = () => {

    const initialSearchState = 'it-kamasutra'

    const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null)
    const [searchTerm, setsearchTerm] = useState(initialSearchState)

    // Изменение имени вкладки (tab title)
    useEffect(() => {
        
        if (selectedUser) {
            document.title = selectedUser.login
        }
    }, [selectedUser])



    return (
        <div className={s.container}>
            <div>
                <Search
                    value={searchTerm}
                    onSubmit={setsearchTerm}
                />
                <button
                    onClick={() => setsearchTerm(initialSearchState)}
                >
                    Reset
                </button>
                <UsersList
                    term={searchTerm}
                    selectedUser={selectedUser}
                    onUserSelect={setSelectedUser}
                />
            </div>
            
            <UserDetails
                user={selectedUser}
            />

        </div>

    )
}
