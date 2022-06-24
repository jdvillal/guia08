let cargarDatos = ()=>{
    //alert("cargando datos");
    let url = 'https://dataserverdaw.herokuapp.com/escritores/xml';
    fetch(url)
    .then(response => response.text())
    .then(data =>{
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, "application/xml");

        let escritores = xml.getElementsByTagName('escritor');

        for(let escritor of escritores){
            let id = escritor.getElementsByTagName('id')[0].textContent;
            let nombre = escritor.getElementsByTagName('nombre')[0].textContent;
            
            let plantilla = `<option value="${id}">${nombre}</option>`;
            
            document.querySelector('div.input-group > select').innerHTML += plantilla;

        }
    })
    .catch(error => {
        // handle the error
        console.error;
    });
}

window.addEventListener('DOMContentLoaded', (event) => {
    cargarDatos();
    
});

let cargarFrases = ()=>{
    console.log("LOG");
    let url = 'https://dataserverdaw.herokuapp.com/escritores/frases';
    fetch(url)
    .then(response => response.json())
    .then(data=>{
        let val = document.getElementsByTagName('select')[0].value;

        let options = document.getElementsByTagName('option');
        let autorName = "";
        for(let i = 0; i < options.length; i++){
            if(options[i].getAttribute('value') == val){
                autorName = options[i].textContent;
            }
        }
        let size = data.frases.length;
        let frases = ""
        for(let i = 0; i < size; i++){
            if(data.frases[i].id_autor == val){
                frases =  frases + " " + data.frases[i].texto;
            }
        }

        let plantilla = 
        `<div class="col-lg-3">
            <div class="test-inner ">
                <div class="test-author-thumb d-flex">
                    <div class="test-author-info">
                        <h4>${autorName}</h4>                                            
                    </div>
                </div>
                <span>${frases}</span>
                <i class="fa fa-quote-right"></i>
            </div>
        </div>`;

        
        if(document.querySelector('section > div.container + div') == undefined){
            console.log("undefined");
            const new_div = document.createElement('div');
            new_div.innerHTML += plantilla;
            document.querySelector('#section-testimonial').appendChild(new_div);
        }else{
            console.log('defined');
            const prevdiv = document.querySelector('section > div.container + div');
            const new_div = document.createElement('div');
            new_div.innerHTML += plantilla;
            document.querySelector('#section-testimonial').replaceChild(new_div, prevdiv);
        }


    })
    .catch(error => {
        // handle the error
        console.log(error);
    });

}

document.getElementsByTagName('select')[0].addEventListener('change', (event)=>{
    cargarFrases();
});
