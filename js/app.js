const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);

}

const displayPhones = (phones, dataLimit) => {
    // console.log(phones);
    
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.textContent = '';


    // display 10 phones only 
    
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length > 10){
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');

    }
    else{
        showAll.classList.add('d-none');
    }

    // display no phones found 

    const noPhone = document.getElementById('no-phone-message');
    

    
    // console.log(noPhone);
    // console.log(phones.length);
    if(phones.length === 0){
       noPhone.classList.remove('d-none');
       toggleSpinner(false);
    }
    else{
        noPhone.classList.add('d-none');

    }


    // display all phones 
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-5">
                        <img src="${phone.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">${phone.phone_name}</h5>
                          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                          <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
                        </div>
                      </div>
        `;
        phonesContainer.appendChild(phoneDiv);
        // stop loader 
        toggleSpinner(false);
    })
}

document.getElementById('btn-search').addEventListener('click', function(){

    processSearch(10);
})

// search input field enter key handler

document.getElementById('search-field').addEventListener('keydown', function(e){
    // console.log(e.key);
    if(e.key === 'Enter'){
        processSearch(10);

    }
})



const toggleSpinner = isLoading =>{
    const loaderSection = document.getElementById('loader');
    if(isLoading === true){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }
}

// spinner function 

const processSearch = (dataLimit) =>{
    // start loader 
    toggleSpinner(true)
    const inputField = document.getElementById('search-field');
    const inputText = inputField.value;
    loadPhones(inputText, dataLimit);
    
}

// show all button 

document.getElementById('btn-show-all').addEventListener('click', function(){
    processSearch();
    // inputField.value = '';

})
// load phone details 


const loadPhoneDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.data);
    displayPhoneDetails(data.data)
}

// display phone details 

const displayPhoneDetails = phone =>{
    // console.log(phone);
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
    <p>Release Date: ${phone.releaseDate}</p>
    <p>Features:</p>
    <p>Storage: ${phone.mainFeatures.storage}</p>
    <p>Display size: ${phone.mainFeatures.displaySize}</p>
    <p>Chipset: ${phone.mainFeatures.chipSet}</p>
    <p>Memory: ${phone.mainFeatures.memory}</p>
    <p>Sensors: ${phone.mainFeatures.sensors}</p>
    `
}

// chipSet
//displaySize
// memory
// sensors [array]

loadPhones('a');