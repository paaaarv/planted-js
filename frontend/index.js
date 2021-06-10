let doc= document.getElementById("container")

const schedule=
    document.getElementById("schedule").addEventListener("click", function(){
        fetch("http://localhost:3000/plants").then(function(response) {
            return response.json().then(function(json){
                createTable();
                debugger

                for(let i=0; i<json.data.length; i++){
                    let info =json.data[i]
                    info = {
                        name:info.attributes.name,
                        water_id: info.relationships.light.data.id,
                        light_id: info.relationships.water.data.id}
                        let plant= new Plant(info);
                debugger
                plant.row();
                console.log(plant)
            }
            });
})
});

    const createTable=() => {
        const table = document.createElement("table");
        table.setAttribute("class", "table")
        doc.appendChild(table)
    }

class Plant{

    constructor(info){
        this.name= info.name;
        this.water_id= info.water_id;
        this.light_id= info.light_id;
    }

    row(){

        debugger
    }

}
