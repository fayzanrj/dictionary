let label = document.getElementById('label')
let search = document.getElementById('search')
let searchBtn = document.getElementById('search-btn')
let word = document.getElementById('word')
let meaning = document.getElementById('meaning')
let explainBox1 = document.getElementById('explain-box1')
let wordToTranslate;

const labeltransition = () => {
    label.style.top = '.5rem'
    label.style.left = "-.1rem"
    label.style.fontSize = ".7rem"
}

search.addEventListener('focusout', () => {
    label.style.top = '1.7rem'
    label.style.left = ".7rem"
    label.style.fontSize = "1rem"
})

searchBtn.addEventListener('click', () => {
    if (search.value != "") {
        meaning.innerHTML = ""
        word.innerHTML = ""
        explainBox1.innerHTML = ""
        wordToTranslate = search.value
        getMeaning(wordToTranslate)
        setTimeout(() => {
            word.innerHTML = wordToTranslate
        }, 1000)
        getExplanation(wordToTranslate)
        search.value = ""
    } else {
        console.log("a")
    }
})

const getMeaning = (word) => {
    const encodedParams = new URLSearchParams();
    encodedParams.append("q", `${word}`);
    encodedParams.append("target", "ur");
    encodedParams.append("source", "en");

    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept-Encoding': 'application/gzip',
            'X-RapidAPI-Key': 'cd5be48b38msh804c03773c683c9p1dce6bjsn494b46d75180',
            'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
        },
        body: encodedParams
    };

    fetch('https://google-translate1.p.rapidapi.com/language/translate/v2', options)
        .then(response => response.json())
        .then((response) => {
            meaning.innerHTML = response.data.translations[0].translatedText
        })
        .catch(err => console.error(err));
}


const getExplanation = (word)=>{
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'cd5be48b38msh804c03773c683c9p1dce6bjsn494b46d75180',
            'X-RapidAPI-Host': 'dictionary-by-api-ninjas.p.rapidapi.com'
        }
    };
    
    fetch(`https://dictionary-by-api-ninjas.p.rapidapi.com/v1/dictionary?word=${word}`, options)
        .then(response => response.json())
        .then((response) => {
            // console.log(response)
            let array = response.definition.split('.')
            explainBox1.innerHTML = `${array[1]}.`
            // explainBox3.innerHTML = array[2]
            // explainBox2.innerHTML = array[3]
        })
        .catch((err) => {
            // console.error(err)
            explainBox1.innerHTML = ""
        });
}