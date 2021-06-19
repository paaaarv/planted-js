let doc= document.getElementById("container")
let heading;
let label;
let input;
let option;
let select;
let br;
let light;
let water;
let formData;
let submit;
let formObject;
let optionSelect;

const lightArray = [];
const waterArray=[];

const clearContainer = () =>{
    doc.innerHTML = ""
}

const createSelect = (id) =>{
    select=document.createElement('select')
    select.setAttribute("id",id)
}

const createOption= (select,id, text) =>{
    option=document.createElement("option");
    option.setAttribute("value", text);
    option.setAttribute("id",id);
    option.innerHTML=`${text}`
    select.appendChild(option)
}

const dropDown = () =>{
    let groupDiv = document.createElement('div')
    groupDiv.innerHTML="<span> group plants by: </span> <br>"
    let array = ["water", "light"]
    for(let i=0;i<2;i++){
        optionSelect=document.createElement("button")
        optionSelect.innerHTML=array[i]
        optionSelect.setAttribute("id",array[i])
        groupDiv.appendChild(optionSelect)
    }
    doc.appendChild(groupDiv)
}

const groupBy=()=>{
    debugger
}
const fetchTableData = () =>{
    fetch("http://localhost:3000/plants").then(function(response) {
        return response.json().then(function(json){
            clearContainer();
            separateIncluded(json.included)
            dropDown()
            const table = document.createElement("table");
            createTable(table,json);
            })
        })
    }

const schedule=
    document.getElementById("schedule").addEventListener("click",function(){

        fetchTableData()
    });


const addForm =
    document.getElementById("addplant").addEventListener("click", function(){
        formObject = new Form;
        formObject.createForm()
    })

let removePlant=(id)=>{
    fetch(`http://localhost:3000/plants/${id}`,{
    method: 'DELETE',
    headers:  {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: id
}).then(fetchTableData())
    }
const checkRelationship = (array, id) => {
    for(let i=0;i<array.length;i++){
        if(array[i].id === id){
            return array[i]
        }
    }
}


const postForm = (event) =>{
       event.preventDefault();
       let form=document.getElementById("form")
       formData = formObject.createFormData(event.currentTarget)
       form.reset()
        fetch("http://localhost:3000/plants",{
        method: 'POST',
        headers:  {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
  })
    }

const createTable=( table, json) => {
        let header = document.createElement("thead")
        table.appendChild(header)
        let td;
        let array = ["name", "light", "water",""]
        table.setAttribute("class", "table")
        doc.appendChild(table)
        for(let i=0; i<array.length; i++){
            td= document.createElement('td')
            td.setAttribute('class', 'heading')
            td.innerHTML=`${array[i]}`
            header.appendChild(td)
        }
        for(let i=0; i<json.data.length; i++){
            let info =json.data[i]
            light=checkRelationship(lightArray, info.relationships.light.data.id);
            water = checkRelationship(waterArray, info.relationships.water.data.id);
            info = {
                name:info.attributes.name,
                water: water.frequency,
                light: light.intensity,
                id: info.id}
                let plant= new Plant(info);
        plant.row(table);
    }
    }

const separateIncluded = (data) =>{
            let light;
            let water;
            data.map(x=>{if(x.type=="light"){
                light= new Light(x.id, x.attributes.intensity, x.relationships.plants.data)
                }else{
                    water=new Water(x.id, x.attributes.frequency, x.relationships.plants.data)
            }

                         })
}


class Form {
    constructor(){
        this.name= "",
        this.fertilize= "",
        this.water_id= "",
        this.light_id="",
        this.array=['name','fertilize','light','water'],
        this.intensity=["bright light", "indirect light", "low light"]
    }

    createForm(){
        clearContainer();
        heading=document.createElement("h2")
        heading.innerHTML="create new plant"
        doc.appendChild(heading)
        const form = document.createElement("form")
        form.setAttribute("id", "form")
        form.setAttribute("onSubmit",
        "postForm(event)")
        doc.appendChild(form)
        for(let i=0; i<this.array.length; i++){
            label = document.createElement("label");
            br= document.createElement("br")
            label.innerHTML=`${this.array[i]}`
            form.appendChild(label)
            if(this.array[i] == "water" || this.array[i] == "fertilize"){
                createSelect(this.array[i]);
                for(let i=1; i<31; i++){
                    createOption(select, i, i)}
                form.appendChild(select)
                select.insertAdjacentHTML('beforebegin', '<span class="frequencyLabel"> once every </span>')
                select.insertAdjacentHTML("afterend", "<span class='frequencyLabel'> days  </span><br>")
            }
            else if(this.array[i] == "light"){
                createSelect(this.array[i]);
                for(let i=0; i<this.intensity.length; i++){
                    createOption(select, i+1,this.intensity[i])
                }
                form.appendChild(select)
                form.appendChild(br)
            }
            else{
                input = document.createElement("input");
                input.setAttribute("id", this.array[i])
                form.appendChild(input)
                form.appendChild(br)
            }

    }
            this.submitForm();


}
    submitForm(){
        submit = document.createElement('button')
        submit.setAttribute("type", "submit");
        submit.innerHTML = "add plant"
        form.appendChild(submit)
    }
    createFormData(event){
    for(let i=0;i<event.length; i++){
        if(event[i].id== "water"){
            this.water_id=event[i].value
        }
        else if(event[i].id=="light"){
            this.light_id=event[i].selectedIndex+1

        }else{

            this[event[i].id]=event[i].value
    }
    }
        return this

    }

}


class Plant{

    constructor(info){
        this.properties={
                        name: info.name,
                        light: info.light,
                        water:  info.water,
                        id: info.id
                        }
    }

    row(table){

        let row=document.createElement("tr")
        let cell;
        for(const key in this.properties){
            cell=document.createElement("td")
            if(key == "water"){
                cell.innerHTML= `<span class='frequencyLabel'> once every </span> ${this.properties[key]} <span class='frequencyLabel'> days </span> `
            }else if(key == "id"){
                cell.innerHTML=`<button onClick="removePlant(${this.properties[key]})"> delete </button>`
            }
            else{
            cell.innerHTML=(this.properties[key])}
            row.appendChild(cell)
            row
        }
        table.appendChild(row)
    }
    }


class Light {
    constructor(id, intensity,plants){
        this.id =id;
        this.intensity=intensity;
        this.plants = plants;
        lightArray.push(this);
    }

    instance = () =>{
        debugger
    }
}

class Water {

    constructor(id,freq, plants){
        this.id = id;
        this.frequency=freq
        this.plants = plants;
        waterArray.push(this)
    }


}
