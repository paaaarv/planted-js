let doc= document.getElementById("container")

const schedule=
    document.getElementById("schedule").addEventListener("click", function(){
        fetch("http://localhost:3000/plants").then(function(response) {
            return response.json().then(function(json){
                separateIncluded(json.included)
                const table = document.createElement("table");
                createTable(table);
                debugger

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
        table.setAttribute("class", "table")
        doc.appendChild(table)
    }
    const separateIncluded = (data) =>{

        for(array in data){
            if(data[array].type == "light"){
                debugger
            }
    }
}

class Plant{

    constructor(info){
        this.properties={name: info.name,
                        water_id: info.water_id,
                        light_id: info.light_id}
    }

    row(table){
        let row=document.createElement("tr")

        let cell;

        for(const key in this.properties){
            debugger
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
        this.frequency=freq
    }


}

class Water {

    constructor(freq){
        this.frequency=freq
    }


}
