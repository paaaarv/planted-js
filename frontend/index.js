let doc= document.getElementById("container")
const lightArray = [];
const schedule=
    document.getElementById("schedule").addEventListener("click", function(){
        fetch("http://localhost:3000/plants").then(function(response) {
            return response.json().then(function(json){
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
        data.map(x=>{

            if (x.type=="light"){
                debugger
                if (Light.length == 0){
                    debugger
                 light= new Light(x.attributes.frequency)
                 }
                else{
                    debugger
                    for(freq in Light){

                    }
                }
            }
            else{
                water= new Water(x.attributes.frequency)
            }
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
