const baseUrl = "https://www.thecolorapi.com/scheme"
const colorSpace = document.getElementById('colour-space')
const defaultColor = ['#000000','#1A1919','#343232','#4F4A4A','#6A6262']

async function returnColor(url){
    const response = await fetch(url)
    const data = await response.json()
    getbaseColor(data.colors)
}

function startFunc(){
    let colorHtml = ""
    for (let colors of defaultColor){
        colorHtml += 
        `
        <div id="colour-id" class="colour-id" style="background-color: ${colors}">
            <button class="copy-button" id="${colors}">${colors}</button>
        </div>
        `
        colorSpace.innerHTML = colorHtml
    }
    copyFunction()
}

function copyFunction(){
    const copyButton = document.querySelectorAll('.copy-button')
    for (let copy of copyButton){
        copy.addEventListener('click',function(){
            navigator.clipboard.writeText(copy.id);
            copy.textContent = "copied"
            setTimeout(function(){
                copy.textContent = copy.id
            },1500)
        })
    }   
}

startFunc()

function getbaseColor(color){
    let colorHtml = ""
    for (let colors of color){
        colorHtml += 
        `
        <div id="colour-id" class="colour-id" style="background-color: ${colors.hex.value}">
            <button class="copy-button" id="${colors.hex.value}">${colors.hex.value}</button>
        </div>
        `
        colorSpace.innerHTML = colorHtml
    }
    copyFunction()
}

document.getElementById('form-btn').addEventListener('submit',(e)=>{
    e.preventDefault()
    let color = document.getElementById('color-tag').value
    const select = document.getElementById('select-tag').value
    color = color.replace("#","")
    let newurl = baseUrl + `?hex=${color}&mode=${select}`
    returnColor(newurl)
})