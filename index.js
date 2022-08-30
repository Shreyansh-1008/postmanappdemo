// console.log("Post Man")
// insitialize custome param
let parameter_count = 1;
let parameterbox = document.getElementById('parameterbox');
let jsonrequestbox = document.getElementById('jsonrequestbox');
parameterbox.style.display = "none";

// Target json or custome parameter radios
let jsonradio = document.getElementById('jsonradios');
let paramsradio = document.getElementById('paramsradios');
jsonradio.addEventListener('click', () => {
    parameterbox.style.display = "none";
    jsonrequestbox.style.display = 'block';
})
paramsradio.addEventListener('click', () => {
    jsonrequestbox.style.display = "none";
    parameterbox.style.display = 'block';
})


// create adiv element by string
function getelementbystring(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}


// target add parameter button
let addparams = document.getElementById('addparams');
addparams.addEventListener('click', () => {
    let params = document.getElementById('params');
    let string = `
    <div class="row my-3">
    <label for="parameter" class="col-sm-2 col-form-label">Parameter${parameter_count + 1}</label>
    <div class="col-md-4">
        <input type="text" class="form-control" id="parameterkey${parameter_count + 1}" placeholder="Parameter Key${parameter_count + 1}"
            aria-label="Parameter Key">
    </div>
    <div class="col-md-4">
        <input type="text" class="form-control" id="parametervalue${parameter_count + 1}" placeholder="Parameter Value${parameter_count + 1}"
            aria-label="Parameter Value">
    </div>
    <button class="deleteparam btn btn-primary col-sm-1">-</button>
</div>`
    let paramelement = getelementbystring(string);
    params.appendChild(paramelement);
    let deleteparam = document.getElementsByClassName('deleteparam');

    for (item of deleteparam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();

        })
    }
    parameter_count++;
})

// if the users click on Submmit Button
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    let url = document.getElementById('urlField').value;
    let requesttype = document.querySelector('input[name="RequestType"]:checked').value;
    let contenttype = document.querySelector('input[name="ContentType"]:checked').value;
    // console.log(url)
    // console.log(requesttype)
    // console.log(contenttype)
    let data;
    if (contenttype == 'params') {
        data = {};
        for (let i = 0; i < parameter_count; i++) {
            if (document.getElementById(`parameterkey${i + 1}`) != undefined) {
                let paramkey = document.getElementById(`parameterkey${i + 1}`).value;
                let paramvalue = document.getElementById(`parametervalue${i + 1}`).value;
                data[paramkey] = paramvalue;
            }
        }

        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('jsonrequesttext').value;
    }
    // console.log(data)
    if(requesttype=='GET'){
        fetch(url,{
            method:'GET'
        }).then(response => response.text()).then((text)=>{
            document.getElementById('jsonresponsetext').innerHTML=text;
        })

    }
    else{
        fetch(url,{
            method:'POST',
            body:data,
            headers:{ "Content-type" :"application/json; charset=UTF-8"}
        }).then(response => response.text()).then((text)=>{
            document.getElementById('jsonresponsetext').innerHTML=text;
        })
    }
})