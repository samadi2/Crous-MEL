let rest = document.querySelector('.rest1');
let save =JSON.parse(localStorage.getItem('favoris')) || [];
function clear() {
    localStorage.clear();
}
function part() {

    for (let lieux of save) {
        rest.innerHTML+=
            `   
                <div class="place">
                <div class="disc"> 
                <h2>${lieux.Titre}</h2>  
                <p>${lieux.Adresse}</p>            
                <p class="para">${lieux.Desc}</p>
                </div>
                <div class="btn">
                    <button class="btns">X</button>    
                </div>
                </div>    `;
    }
}
part();
document.addEventListener('click', (e)=>{
                
    if (e.target.className === 'btns') {
        rest.style.display = 'none';
        clear();
    }
    
})
