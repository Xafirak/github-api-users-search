import React, { useEffect, useState } from "react";


type PropsType = {
    value: string
    onSubmit: (fixedValue: string) => void
}



// ДЗ. сделать кнопку Find не активной, если в строке поиска значение равное
//  значению в стейте

// UPD. сделал домашку


export const Search: React.FC<PropsType> = (props) => {

    const [tempSearch, setTempSearch] = useState('')

    useEffect(() => {
        setTempSearch(props.value)
    }, [props.value])

    const turnOnOrOff = () => {
        return tempSearch === props.value ? true : false
    }

    return (
        <div>
            <input
                type="text"
                placeholder="search"
                value={tempSearch}
                onChange={(e) => { setTempSearch(e.currentTarget.value) }}
            />
            <button
                disabled={turnOnOrOff()}
                onClick={() => props.onSubmit(tempSearch)}
            >
                Find
            </button>
        </div>
    )
}