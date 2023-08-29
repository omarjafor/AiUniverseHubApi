const loadAiHub = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const data = await res.json();
    const aihub = data.data.tools;
    console.log(aihub);
}








loadAiHub();
/*
const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    const resultsContainer = document.getElementById("results");
    if (phones.length === 0) {
        resultsContainer.textContent = "Nothing Found! No Items Matched";
    }else{
        resultsContainer.textContent = '';
    }
    const phoneContainer = document.getElementById('phone-container');
    
    phoneContainer.textContent = '';

    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 10 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }else{
        showAllContainer.classList.add('hidden');
    }

    if(!isShowAll){
        phones = phones.slice(0, 9);
    }
    
    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 p-3 m-2 shadow-xl`;
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body text-center">
            <h2 class="text-center font-bold text-2xl">${phone.phone_name}</h2>
            <p>There are many variations of passages of available, but the majority have suffered</p>
            <h2 class="text-center font-bold text-xl">$999</h2>
            <div class="card-actions justify-center">
                <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard);
    });
    toggleLoadingSpinner(false);
}

const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText, isShowAll);
}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }else{
        loadingSpinner.classList.add('hidden');
    }
}

const handleShowAll = () => {
    handleSearch(true);
}

const handleShowDetail = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone);
}

const showPhoneDetails = (phone) => {
    console.log(phone);
    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
        <img src="${phone.image}" alt="" class="mx-auto" />
        <h3 class="font-bold text-3xl my-6">${phone.name}</h3>
        <p class="my-5">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
        <p class="my-4"><span class="font-semibold">Storage:</span> ${phone.mainFeatures.storage} </p>
        <p class="my-4"><span class="font-semibold">Display Size:</span> ${phone.mainFeatures.displaySize} </p>
        <p class="my-4"><span class="font-semibold">Chipset:</span> ${phone.mainFeatures.chipSet} </p>
        <p class="my-4"><span class="font-semibold">Memory:</span> ${phone.mainFeatures.memory} </p>
        <p class="my-4"><span class="font-semibold">Slug:</span> ${phone.slug} </p>
        <p class="my-4"><span class="font-semibold">Release Date:</span> ${phone.releaseDate} </p>
        <p class="my-4"><span class="font-semibold">Brand:</span> ${phone.brand} </p>
        <p class="my-4"><span class="font-semibold">GPS:</span> ${phone?.others?.GPS || 'No GPS Available'} </p>
    `;

    show_details_modal.showModal();
}
loadPhone('a');
*/