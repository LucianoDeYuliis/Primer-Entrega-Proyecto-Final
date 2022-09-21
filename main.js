document.getElementById("Nombre").addEventListener("keyup", myFunction);

function myFunction() {
		let campo = document.getElementById("Nombre");
    if (campo.value == '') {
    	campo.style.borderColor = "red";
    }
    else {
      campo.style.borderColor = "green";
    }
}

document.querySelector("input[class=agregar]").addEventListener("click",function(e){
    e.preventDefault();
 
    let nombre=document.querySelector("input[name=nombre]");
    let nota=document.querySelector("input[name=nota]");
 
    
    if(!nombre.value)
    {
        nombre.classList.add("error");
        return;
    }
    nombre.classList.remove("error");
 
    
    if(isNaN(parseInt(nota.value)) || (parseInt(nota.value)<0 && parseInt(nota.value)>10))
    {
        nota.classList.add("error");
        return;
    }
    nota.classList.remove("error");
 
    
    let tr=document.createElement("tr");
 
    let tdNombre=document.createElement("td");
    let txt=document.createTextNode(nombre.value);
    tdNombre.appendChild(txt);
    tdNombre.className="nombre";
 
    let tdNota=document.createElement("td");
    txt=document.createTextNode(nota.value);
    tdNota.appendChild(txt);
    tdNota.className="right";
 
    let tdRemove=document.createElement("td");
    let buttonRemove=document.createElement("input")
    buttonRemove.type="button";
    buttonRemove.value="Eliminar";
    buttonRemove.onclick=function () {
        
        this.parentElement.parentElement.remove();
 
        
        if(document.getElementById("listado").querySelector("tbody").querySelectorAll("tr").length==0)
        {
            document.getElementById("listado").classList.add("hide");
            document.getElementById("calculos").classList.add("hide");
        }
        calculos();
    };
    tdRemove.appendChild(buttonRemove);
 
    tr.appendChild(tdNombre);
    tr.appendChild(tdNota);
    tr.appendChild(tdRemove);
 
    let tbody=document.getElementById("listado").querySelector("tbody").appendChild(tr);
 
    
    document.getElementById("listado").classList.remove("hide");
    document.getElementById("calculos").classList.remove("hide");
 
    
    nota.value="";
    nombre.value="";
    nombre.focus();
 
    
    calculos();
});
 

function calculos() {
    
    let alumnosAgregados=document.getElementById("listado").querySelector("tbody").querySelectorAll("tr");
 
    
    let aprobados=[];
    let suspendidos=[];
    let promocionados=[];
 
    let mejorNotaAlumnos=[];
    let mejorNota=0;
 
    let peorNotaAlumnos=[];
    let peorNota=10;
 
    let mediaNota=0;
 
    
    for (let i=0;i<alumnosAgregados.length;i++)
	{
        let tds=alumnosAgregados[i].getElementsByTagName('td');
 
        
        if(parseFloat(tds[1].innerHTML)>mejorNota) {
            mejorNotaAlumno=[tds[0].innerHTML];
            mejorNota=parseFloat(tds[1].innerHTML);
        }else if(parseFloat(tds[1].innerHTML)==mejorNota){
            mejorNotaAlumno.push(tds[0].innerHTML);
        }
 
        
        if(parseFloat(tds[1].innerHTML)<peorNota) {
            peorNotaAlumnos=[tds[0].innerHTML];
            peorNota=parseFloat(tds[1].innerHTML);
        }else if(parseFloat(tds[1].innerHTML)==peorNota){
            peorNotaAlumnos.push(tds[0].innerHTML);
        }
 
        
        if(parseFloat(tds[1].innerHTML)>=6) {
            aprobados.push(tds[0].innerHTML);
        }else{
            suspendidos.push(tds[0].innerHTML);
        }
 
        
        if(parseFloat(tds[1].innerHTML)>=8.50) {
            promocionados.push(tds[0].innerHTML);
        }
 
        mediaNota+=parseFloat(tds[1].innerHTML);
    }
 
    
    let result="<div>La mejor nota es de: <span>"+mejorNotaAlumno+" ("+mejorNota+")</span></div>";
    result+="<div>La peor nota es de: <span>"+peorNotaAlumnos+" ("+peorNota+")</span></div>";
    result+="<div>La media es de: <span>"+(mediaNota/alumnosAgregados.length).toFixed(2)+"</span></div>";
    result+="<div>Los aprobados son: <span>"+aprobados+"</span></div>";
    result+="<div>Los suspendidos son: <span>"+suspendidos+"</span></div>";
    result+="<div>Los promocionados son: <span>"+promocionados+"</span></div>";
    result+="<div>El promedio de aprobados es: <span>"+(aprobados.length*100/alumnosAgregados.length).toFixed(2)+"%</span></div>";
    result+="<div>El promedio de promocionados es: <span>"+(promocionados.length*100/alumnosAgregados.length).toFixed(2)+"%</span></div>";
 
    document.getElementById("calculos").innerHTML=result;
 
}
