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

let plantArray=[];
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
            });
})
});

const checkRelationship = (array, id) => {
    for(let i=0;i<array.length;i++){
        if(array[i].id === id){
            return array[i]
        }
    }
}

const createFormData = (event) =>{
    object = {}
for(let i=0;i<event.length; i++){
    if(event[i].id== "water"){
        debugger
        object["water_id"]=event[i].value
    }
    else if(event[i].id=="light"){
        object["light_id"]=event[i].selectedIndex+1

    }else{
    object[event[i].id]=event[i].value
}
}
    return object

}

const addForm =
    document.getElementById("addplant").addEventListener("click", function(){
        let form = new Form;
        form.createForm()
    })




    ////const submit=document.createElement('button')
    //submit.setAttribute("type", "submit");
    //form.setAttribute("onSubmit",
//    "submitForm(event)")

//    submit.innerHTML = "add plant"
//    form.appendChild(submit)


const postForm = (event) =>{
       event.preventDefault();
       formData = createFormData(event.currentTarget)
        fetch("http://localhost:3000/plants",{
        method: 'POST',
        headers:  {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
  })
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
        this.array=['name','fertilize','light','water','notes'],
        this.intensity=["bright light", "indirect light", "low light"]
    }

    createForm(){
        clearContainer();
        heading=document.createElement("h2")
        heading.innerHTML="create new plant"
        doc.appendChild(heading)
        const form = document.createElement("form")
        form.setAttribute("id", "form")
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
            else if(this.array[i] == "notes"){
                let textarea=document.createElement("textarea")
                textarea.setAttribute("id", "notes")
                form.appendChild(textarea)
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
        form.setAttribute("onSubmit",
        "submitForm(event)")

        submit.innerHTML = "add plant"
        form.appendChild(submit)
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
            if (key !== "id"){
            cell=document.createElement("td")
            if(key == "water"){
                cell.innerHTML= `<span class='frequencyLabel'> once every </span> ${this.properties[key]} <span class='frequencyLabel'> days </span> `
            }
            else{
            cell.innerHTML=(this.properties[key])}
            row.appendChild(cell)
            row
        }
        table.appendChild(row)
    }
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
