import React, {Component, useState} from 'react';

function App(){
    // fetch('https://openapi.its.go.kr:9443/vdsInfo?apiKey=6c0ba5b5a21845f1b2b9090f31af33a3&getType=json').then(res=>res).then(data=>console.log(data))
    var url = 'https://openapi.its.go.kr:9443/vdsInfo?apiKey=6c0ba5b5a21845f1b2b9090f31af33a3&getType=json'
    // var params = "apiKey=" + encodeURIComponent("test") + "&getType=" + encodeURIComponent("xml");
fetch(url  ,{
  method: "GET",
  headers: {
    "Content-type": "text/xml;charset=UTF-8"
  }
})
.then(function(response) {
  if (response.ok) {
    console.log("Response code: " + response.status);
    return response.text();
  } else {
    throw new Error("Error: " + response.status);
  }
})
.then(function(data) {
  console.log(data);
})
.catch(function(error) {
  console.log(error);
});

    return (
        <div>
            <p>hello 포람페!</p>
        </div>
    )
}

export default App