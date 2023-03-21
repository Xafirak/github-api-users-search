import React from "react";
import preloader from './../svg/preloader.svg'

type PreloaderPropsType = {

}

export const Preloader: React.FC<PreloaderPropsType> = () => {
    return (
        <div>
            <img src={preloader} alt="" />
        </div>
    )
}