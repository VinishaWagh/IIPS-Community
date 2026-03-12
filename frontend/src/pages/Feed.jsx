import {useEffect, useState} from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

function Feed(){
    const navigate = useNavigate();

    useEffect(()=>{
        const token = localStorage.getItem("token");

        if(!token){
            navigate("/login");
        }
    }, []);

    return <h1>Community Feed</h1>
}

export default Feed;