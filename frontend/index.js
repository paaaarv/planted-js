let doc= document.getElementById("container")
let heading;
let label;
let input;
let option;
let select;
let br;
let array=['name','fertilize','light','water','notes']
let intensity=["bright light", "indirect light", "low light"]
const lightArray = [];

const clearContainer = () =>{
    doc.innerHTML = ""
}

const createSelect = () =>{
    select=document.createElement('select')
}

const createOption= (select,text) =>{
    option=document.createElement("option");
    option.setAttribute("value", text)
    option.innerHTML=`${text}`
    select.appendChild(option)
}
const schedule=
    document.getElementById("schedule").addEventListener("click", function(){
        fetch("http://localhost:3000/plants").then(function(response) {
            return response.json().then(function(json){
                clearContainer();
                separateIncluded(json.included)
                const table = document.createElement("table");
                createTable(table);
                for(let i=0; i<json.data.length; i++){
                    let info =json.data[i]
                    info = {
                        name:info.attributes.name,
                        water_id: info.relationships.light.data.id,
                        light_id: info.relationships.water.data.id}
                        let plant= new Plant(info);

                plant.row(table);
                console.log(plant)
            }
            });
})
});

const addForm =
    document.getElementById("addplant").addEventListener("click", function(){
        createForm()
    })



const createForm = () =>{
    clearContainer();
    heading=document.createElement("h2")
    heading.innerHTML="create new plant"
    doc.appendChild(heading)
    const form = document.createElement("form")
    doc.appendChild(form)
    for(let i=0; i<array.length; i++){
        label = document.createElement("label");
        br= document.createElement("br")
        label.innerHTML=`${array[i]}`
        form.appendChild(label)
        if(array[i] == "water" || array[i] == "fertilize"){
            createSelect();
            for(let i=1; i<31; i++){
                createOption(select, i)}
            form.appendChild(select)
            select.insertAdjacentHTML('beforebegin', '<span class="frequencyLabel"> once every </span>')
            select.insertAdjacentHTML("afterend", "<span class='frequencyLabel'> days  </span><br>")
        }
        else if(array[i] == "light"){
            createSelect();
            for(let i=0; i<intensity.length; i++){
                createOption(select, intensity[i])
            }
            form.appendChild(select)
            form.appendChild(br)
        }
        else if(array[i] == "notes"){
            let textarea=document.createElement("textarea")
            form.appendChild(textarea)
        }
        else{
            input = document.createElement("input");
            input.setAttribute("id", array[i])
            form.appendChild(input)
            form.appendChild(br)
        }
}
    const submit=document.createElement('button')
    submit.setAttribute("type", "submit");
    submit.innerHTML = "add plant"
    form.appendChild(submit)
}

    const createTable=( table) => {
        let header = document.createElement("thead")
        table.appendChild(header)
        let td;
        let array = ["name", "light", "water"]
        table.setAttribute("class", "table")
        doc.appendChild(table)
        for(let i=0; i<array.length; i++){
            td= document.createElement('td')
            td.setAttribute('class', 'heading')
            td.innerHTML=`${array[i]}`
            header.appendChild(td)

        }
    }

    const separateIncluded = (data) =>{
            let light;
            let water;
            data.map(x=>{if(x.type=="light"){
                light= new Light(x.attributes.intensity)}
                    debugger
                         })
}

class Plant{

    constructor(info){
        this.properties={name: info.name,
                        light_id: info.light_id,
                        water_id: info.water_id
                        }
    }

    row(table){

        let row=document.createElement("tr")
        let cell;
        for(const key in this.properties){
            cell=document.createElement("td")
            cell.innerHTML=(this.properties[key])
            row.appendChild(cell)
            row
        }
        table.appendChild(row)
    }

}

class Light {
    constructor(freq){
        this.frequency=freq;
        lightArray.push(this);
    }

    instance = () =>{
        debugger
    }
}

class Water {

    constructor(freq){
        this.frequency=freq
    }


}
