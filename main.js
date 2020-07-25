var wordlist = document.getElementById('wordlist')
var downloadBtn = document.getElementById('download')
var clearBtn = document.getElementById('clear')
var btnChanger = document.getElementById('btnChanger')

function generateEventListener(){
    document.getElementById('generate').addEventListener("click",function(){
        document.querySelectorAll('.inputs').forEach(function(element){
            element.disabled=true
        })
        document.getElementById('generate').remove()
        btnChanger.innerHTML='<button id="pauseResume" type="button" class="btn btn-warning">Pause</button>'
        downloadBtn.disabled= true
        clearBtn.disabled= true
        var pauseResume = document.getElementById('pauseResume')
        var progress = document.getElementById('progress')
        progress.style.width='0'
        progress.innerHTML='0%'
        var subword1 = document.getElementById('subword1').value
        var subword2 = document.getElementById('subword2').value
        var nbrOfNbrs= parseInt(document.getElementById('nbrOfNbrs').value)
        var limit = ''
        for(let i=0;i<nbrOfNbrs;i++) limit+='9'
        var i = 0
        function startInterval() {
            var generator = setInterval(() => {
                var progValue= parseInt((i/parseInt(limit))*100)
                progress.style.width=progValue+'%'
                progress.innerHTML=progValue+'%'
                var iLength = i.toString().length
                var limitLength =limit.length
                if(iLength<limitLength) wordlist.value+=subword1+zeros(limitLength-iLength)+i+subword2+"\n"
                else wordlist.value+=subword1+i+subword2+"\n"
                i++
                wordlist.scrollTop = wordlist.scrollHeight;
                if(i>parseInt(limit)){
                    pauseResume.remove()
                    btnChanger.innerHTML='<button id="generate" class="btn btn-primary">Generate</button>'
                    clearInterval(generator)
                    downloadBtn.disabled= false
                    clearBtn.disabled=false
                    document.querySelectorAll('.inputs').forEach(function(element){
                        element.disabled=false
                    })
                    generateEventListener()
                }
            })
            var loop = true 
            pauseResume.addEventListener('click',function(){
                if (loop) {
                    clearInterval(generator)
                    pauseResume.innerHTML="Resume"
                    downloadBtn.disabled= false
                    clearBtn.disabled=false
                    loop=false
                }else {
                    startInterval()
                    pauseResume.innerHTML="puase"
                    loop=true
                    downloadBtn.disabled= true
                    clearBtn.disabled=true
                }
            })
        }
        startInterval()
        function zeros (nbr) {
            var result=""
            for(let i = 0 ; i<nbr ; i++) result+="0"
            return result
        }
    })
}

// 'generate' ClickEvent
generateEventListener()

// Clearing Text Area
var listenOnce = true
clearBtn.addEventListener("click",function(){
    wordlist.value = ""
    try {pauseResume.remove()} catch (error) {}
    btnChanger.innerHTML='<button id="generate" class="btn btn-primary">Generate</button>'
    progress.style.width='0'
    document.querySelectorAll('.inputs').forEach(function(element){
        element.disabled=false
    })
    if(listenOnce) generateEventListener()
    else listenOnce=false
})

// Download the text area content as a text file
downloadBtn.addEventListener('click',function(){
    saveAsTextFile(wordlist.value,"rockyou.txt")
})

function saveAsTextFile(textToWrite, fileNameToSaveAs) {
    var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'}) 
    var downloadLink = document.createElement("a")
    downloadLink.download = fileNameToSaveAs
    downloadLink.innerHTML = "Download File"
    if (window.webkitURL != null) downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob)
    else{
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob)
        downloadLink.onclick = destroyClickedElement
        downloadLink.style.display = "none"
        document.body.appendChild(downloadLink)
    }
    downloadLink.click()
}