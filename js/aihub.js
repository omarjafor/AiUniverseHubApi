const sortByDateButton = document.getElementById('sortByDate');
const loadAiHub = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const data = await res.json();
    const aihub = data.data.tools;
    console.log(aihub);
    sortByDateButton.addEventListener('click', function(){
        aihub.sort((a, b) => {
            return new Date(b.published_in) - new Date(a.published_in);
        })
        const data = [...aihub];
        console.log(data);
        displayAiHub(data);
    });
    displayAiHub(aihub);
}

const displayAiHub = aihub => {
    const aiHubContainer = document.getElementById('phone-container');
    // aihub = aihub.slice(0, 6)
    aiHubContainer.innerHTML = '';
    aihub.forEach(aiItem => {
        // console.log(aiItem);
        const aiCard = document.createElement('div');
        aiCard.classList = `card bg-gray-100 p-5 m-2 shadow-xl`;
        aiCard.innerHTML = `
        <figure><img src="${aiItem.image ? aiItem.image : './jasper.jpg'}" alt="Shoes" /></figure>
        <div class="card-body py-6 px-0">
            <h2 class="font-bold text-2xl">Features</h2>
            <ol class="list-decimal pb-4 list-inside border-b border-solid border-gray-400">
                <li>${aiItem.features[0]}</li>
                <li>${aiItem.features[1]}</li>
                <li>${aiItem.features[2]}</li>
            </ol>
            
            <div class="card-actions flex justify-between">
                <div>
                    <h2 class="font-bold text-xl mt-4">${aiItem.name}</h2>
                    <p class="flex mt-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M6.75 3V5.25M17.25 3V5.25M3 18.75V7.5C3 6.90326 3.23705 6.33097 3.65901 5.90901C4.08097 5.48705 4.65326 5.25 5.25 5.25H18.75C19.3467 5.25 19.919 5.48705 20.341 5.90901C20.7629 6.33097 21 6.90326 21 7.5V18.75M3 18.75C3 19.3467 3.23705 19.919 3.65901 20.341C4.08097 20.7629 4.65326 21 5.25 21H18.75C19.3467 21 19.919 20.7629 20.341 20.341C20.7629 19.919 21 19.3467 21 18.75M3 18.75V11.25C3 10.6533 3.23705 10.081 3.65901 9.65901C4.08097 9.23705 4.65326 9 5.25 9H18.75C19.3467 9 19.919 9.23705 20.341 9.65901C20.7629 10.081 21 10.6533 21 11.25V18.75M12 12.75H12.008V12.758H12V12.75ZM12 15H12.008V15.008H12V15ZM12 17.25H12.008V17.258H12V17.25ZM9.75 15H9.758V15.008H9.75V15ZM9.75 17.25H9.758V17.258H9.75V17.25ZM7.5 15H7.508V15.008H7.5V15ZM7.5 17.25H7.508V17.258H7.5V17.25ZM14.25 12.75H14.258V12.758H14.25V12.75ZM14.25 15H14.258V15.008H14.25V15ZM14.25 17.25H14.258V17.258H14.25V17.25ZM16.5 12.75H16.508V12.758H16.5V12.75ZM16.5 15H16.508V15.008H16.5V15Z" stroke="#585858" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg> &nbsp; ${aiItem.published_in}</p>
                </div>
                <button onclick="handleShowDetail('${aiItem.id}')" class="btn my-auto btn-circle btn-outline"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M4.5 12H19.5M19.5 12L12.75 5.25M19.5 12L12.75 18.75" stroke="#EB5757" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg></button>
            </div>
        </div>
        `;
        aiHubContainer.appendChild(aiCard);
    });
}

const handleShowDetail = async (id) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
    const data = await res.json();
    const aiDetails = data.data;
    // console.log(aiDetails);
    showAiDetails(aiDetails);
}

const showAiDetails = (aiDetails) => {
    console.log(aiDetails);
    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
        <div class="flex gap-5">
            <div class="bg-orange-50 border border-orange-300 rounded-md shadow-md p-6">
                <h3 class="font-bold text-xl my-6">${aiDetails.description}</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-2 mb-6">
                    <div class="bg-white rounded-md p-4">
                        <p class="text-green-600 font-bold">${aiDetails.pricing[0].price ? aiDetails.pricing[0].price : 'Free of Cost/'}</p>
                        <p class="text-green-600 font-bold">${aiDetails.pricing[0].plan ? aiDetails.pricing[0].plan : 'Basic'}</p>
                    </div>
                    <div class="bg-white rounded-md p-4">
                        <p class="text-orange-600 font-bold">${aiDetails.pricing[1].price ? aiDetails.pricing[1].price : 'Free of Cost/'}</p>
                        <p class="text-orange-600 font-bold">${aiDetails.pricing[1].plan ? aiDetails.pricing[1].plan : 'Pro'}</p>
                    </div>
                    <div class="bg-white rounded-md p-4">
                        <p class="text-red-600 font-bold">${aiDetails.pricing[2].price ? aiDetails.pricing[2].price : 'Free of Cost/'}</p>
                        <p class="text-red-600 font-bold">${aiDetails.pricing[2].plan ? aiDetails.pricing[2].plan : 'Enterprise'}</p>
                    </div>
                </div>
            </div>
            <div class="border border-orange-300 rounded-md shadow-md p-6">
                <img src="${aiDetails.image_link[0]}" alt="" class="mx-auto" />
                <div class="text-center">
                    <h3 class="font-bold text-xl my-2">${aiDetails.input_output_examples[0].input}</h3>
                    <h3 class="text-xl my-4">${aiDetails.input_output_examples[0].output}</h3>
                </div>
            </div>
        </div>
    `;

    show_details_modal.showModal();
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