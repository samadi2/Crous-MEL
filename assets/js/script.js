let map = L.map('map').setView([50.57626, 3.087158], 12);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
let rest=document.querySelector('.rest');
const url='https://opendata.lillemetropole.fr/api/records/1.0/search/?dataset=ensemble-des-lieux-de-restauration-des-crous&q=&rows=20&facet=type&facet=zone'
fetch(url)
    .then((res) =>res.json())
    .then((res) => {
        const places = res.records;
        console.log(places);

        for(let lieu of places) {
            // console.log(lieu);
            // console.log(lieu.fields.geolocalisation);
            let marker = L.marker(lieu.fields.geolocalisation).addTo(map)
            marker.addEventListener("click", () => {
                rest.style.display='flex';
                rest.innerHTML= `
                <div class="photo">
                    <img src="assets/img/pays.jpg" alt="">
                </div>
                <div class="disc">                
                    <h2>${lieu.fields.title}</h2>
                    <p>${lieu.fields.contact}</p>
                    <p class="para" >${lieu.fields.infos}</p>
                </div>
                <div class="btn">
                    <button class="enrg">Enregister</button>
                    <button class="btns">X</button>    
                </div>
                `;
                let enrg = document.querySelector('.enrg');
                enrg.addEventListener('click',()=> { 
                    let favoris = {Titre:lieu.fields.title,Adresse:lieu.fields.contact,Desc:lieu.fields.infos}
                    let save =JSON.parse(localStorage.getItem('favoris')) || [];
                    save.push(favoris)
                    localStorage.setItem('favoris',JSON.stringify(save)) ;
                    
                });

                
            }).bindPopup(lieu.fields.title).openPopup();
            document.addEventListener('click', (e)=>{
                
                if (e.target.className === 'btns') {
                    rest.style.display = 'none';
                }
                
            })

           

        }
  

    })


/*
enrg.onclick = () => {
    localStorage.setItem("favoris", JSON.stringify({title:lieu.fields.title, adresse:lieu.fields.contact, desc:lieu.fields.infos }));
}*/

    /*.catch((error) => console.log('erruer').error

    // Transforme d'objet en chaine
    let monObjetJSON='{"prop1":"valeur1","prop2":"valeur2"}';
    let monObjet={
        prop1: 'valeur1',
        prop2:'valeur2',
    }
    let objetstring = JSON.stringify(monObjet);
    let objet = JSON.parse(monObjetJSON);
  
/*class Map{
    constructor(){
        this.desc=document.querySelector('desc');
        this.btns=document.querySelector('btns');

    }

/*/
