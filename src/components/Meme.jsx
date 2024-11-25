import React from "react"
import { useState } from "react"
import { useEffect } from "react"


export default function Meme() {


    const [meme, setMeme] = useState({
        topText: '',
        bottomText: '',
        randomImage: 'http://i.imgflip.com/1bij.jpg'
    })

    const [allMemes, setAllMemes] = useState([])

    function getMeme() {
        const randIndex = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randIndex].url
        setMeme(prev => ({
            ...prev,
            randomImage: url
        }))

    }

    function handleChange(e) {
        const {name, value} = e.target
        setMeme(prev => ({
            ...prev,
            [name]: value
        }))
    }

    useEffect(() => {
        const url = 'https://api.imgflip.com/get_memes';

        fetch(url)
        .then(res => res.json())
        .then(data => {
            setAllMemes(data.data.memes)
        })
    }, [])

    return (
        <>
        <main>
            <div className="form--container">
                <input type="text" className="form--input" placeholder="Top text" value={meme.topText} name="topText" onChange={handleChange}></input>
                <input type="text" className="form--input" placeholder="Bottom text" value={meme.bottomText} name="bottomText" onChange={handleChange}></input>
                <button onClick={getMeme} className="generate-btn">Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} className="meme--image"></img>
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
                
        </main>
        </>
    )
}