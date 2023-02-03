let label = document.getElementById('label')
let search = document.getElementById('search')
let searchBtn = document.getElementById('search-btn')
let word = document.getElementById('word')
let meaning = document.getElementById('meaning')
let explainBox1 = document.getElementById('explain-box1')
let explainbox = document.getElementById('explainbox')
let wordToTranslate;

const labeltransition = () => {
    label.style.top = '.5rem'
    label.style.left = "-.1rem"
    label.style.fontSize = ".7rem"
}

search.addEventListener('focusout', () => {
    if (search.value == "") {
        label.style.top = '1.7rem'
        label.style.left = ".7rem"
        label.style.fontSize = "1rem"
    }
})

// const getMeaning = (word) => {
//     const encodedParams = new URLSearchParams();
//     encodedParams.append("q", `${word}`);
//     encodedParams.append("target", "ur");
//     encodedParams.append("source", "en");

//     const options = {
//         method: 'POST',
//         headers: {
//             'content-type': 'application/x-www-form-urlencoded',
//             'Accept-Encoding': 'application/gzip',
//             'X-RapidAPI-Key': 'cd5be48b38msh804c03773c683c9p1dce6bjsn494b46d75180',
//             'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
//         },
//         body: encodedParams
//     };

//     fetch('https://google-translate1.p.rapidapi.com/language/translate/v2', options)
//         .then(response => response.json())
//         .then((response) => {
//             console.log(response)
//             meaning.innerHTML = response.data.translations[0].translatedText
//         })
//         .catch(err => console.error(err));
// }


const getExplanation = (word) => {

    let searchExplain = fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    searchExplain.then((response) => {
        return response.json()
    }).then((value) => {
        // console.log(value)
        console.log(value[0])
        for (let i = 0; i < value[0].meanings.length; i++) {
            if (i == value[0].meanings.length - 1) {
                explainbox.innerHTML +=
                    `${value[0].meanings[i].partOfSpeech.toUpperCase()} : ${value[0].meanings[i].definitions[0].definition} <br>`
            } else {
                explainbox.innerHTML +=
                    `${value[0].meanings[i].partOfSpeech.toUpperCase()} : ${value[0].meanings[i].definitions[0].definition} <br><br>`
            }
        }
    }).catch((err) => {
        explainbox.innerHTML = "Couldn't find the entered word in the database"
    })
}

searchBtn.addEventListener('click', () => {
    if (search.value != "") {
        wordToTranslate = search.value
        getExplanation(wordToTranslate)
        meaning.innerHTML = ""
        word.innerHTML = firstLetterCapital(wordToTranslate)
        explainbox.innerHTML = ""
        if (search.value != "") {
            search.value = ""
            label.style.top = '1.7rem'
            label.style.left = ".7rem"
            label.style.fontSize = "1rem"
        }

    } else {
        word.innerHTML= " "
        explainbox.innerHTML = "<b>Write something before pressing Search</b>"
    }
})

const firstLetterCapital = (word)=>{
    let fLetter = word[0]
    let lLetters = word.slice(1)
     return (fLetter.toUpperCase() + lLetters)
}
