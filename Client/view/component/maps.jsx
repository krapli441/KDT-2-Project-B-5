import React, {Component,useState, useEffect} from "react";
// const [mapdata,setMaps] = useState(null)

function Maps(){
    useEffect(()=>{
        fetch('//dapi.kakao.com/v2/maps/sdk.js?appkey=b3da2e1025f79e2251178086a01fa93b').then(res=>res).then(data=>console(data))
    })
    return (
        <div>a</div>
        )
}

export default Maps