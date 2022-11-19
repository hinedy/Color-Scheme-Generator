const seedColor = document.getElementById('seed-color')
const form = document.getElementById('form')
const schemes = document.getElementById('schemes')
const colorsDiv = document.getElementById('colors')

/* Click to copy to clipboard */
colorsDiv.addEventListener('click',(e)=>{
      
    navigator.clipboard.writeText(e.target.innerText);

})


form.addEventListener('submit',(e)=>{
    e.preventDefault()
    
    // construct request URL from seed color and scheme mode
    // visit https://www.thecolorapi.com/docs#schemes-generate-scheme-get

    let requestUrl = `
        https://www.thecolorapi.com/scheme?hex=${seedColor.value.slice(1)}&mode=${schemes.value}&count=5
    `
    
    fetch(requestUrl)
        .then(res => res.json())
        .then(data => {
            // create an iteratable array of length 5 and fill with hex values returned by API call
            let colors = Array.from({length: 5}, (v, i) => data.colors[i].hex.value)
            // for every hex value => update its correspondent div
            colors.forEach((color, i) => {
                updateColor(color, i)
                updateColorHtml(color, i)
            })
        })
})


function updateColorHtml(color, item){
    document.querySelectorAll(`.color`)[item].innerHTML = `
        <div class="hex">${color}</div>
    `
}

function updateColor(color, item){
    document.querySelectorAll(`.color`)[item].style.background = color
}

