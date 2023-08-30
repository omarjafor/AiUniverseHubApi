const sortByDateButton = document.getElementById('sortByDate');
const showAllContainer = document.getElementById('show-all-container');
const loadAiHub = async (isShowAll) => {
    const res = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const data = await res.json();
    const aihub = data.data.tools;
    // console.log(aihub);
    sortByDateButton.addEventListener('click', function(){
        aihub.sort((a, b) => {
            return new Date(b.published_in) - new Date(a.published_in);
        })
        const data = [...aihub];
        
        // console.log(data);
        displayAiHub(data, isShowAll);
    });
    displayAiHub(aihub, isShowAll);
}

const displayAiHub = (aihub, isShowAll) => {
    if (aihub.length > 6 && !isShowAll) {
        aihub = aihub.slice(0, 6);
        showAllContainer.classList.remove('hidden');
    } else {
        showAllContainer.classList.add('hidden');
    }
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
    try{
        const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
        const data = await res.json();
        const aiDetails = data.data;
        console.log(aiDetails);
        showAiDetails(aiDetails);
    }
    catch(err){
        console.log(err);
    }
}

const showAiDetails = (aiDetails) => {

    const allPricePlane = [];
    if (aiDetails.pricing) {
        aiDetails.pricing.forEach(element => {
            allPricePlane.push(element);
        });
    }

    const allFeatures = [];
    if (aiDetails.features) {
        for (const index in aiDetails.features) {
            allFeatures.push(aiDetails.features[index].feature_name);
        }
    }

    // console.log(aiDetails);
    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
        <div class="flex gap-5">
            <div class="bg-orange-50 border border-orange-300 rounded-md shadow-md p-6">
                <h3 class="font-bold text-xl my-6">${aiDetails.description}</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-2 mb-6">
                    <div class="bg-white rounded-md p-4">
                        <p class="text-green-600 font-bold">${allPricePlane.length > 0 && allPricePlane[0].price ? allPricePlane[0].price : 'Free of Cost/'}</p>
                        <p class="text-green-600 font-bold">${allPricePlane.length > 0 && allPricePlane[0].plan ? allPricePlane[0].plan : 'Basic'}</p>
                    </div>
                    <div class="bg-white rounded-md p-4">
                        <p class="text-orange-600 font-bold">${allPricePlane.length > 0 && allPricePlane[1].price ? allPricePlane[1].price : 'Free of Cost/'}</p>
                        <p class="text-orange-600 font-bold">${allPricePlane.length > 0 && allPricePlane[1].plan ? allPricePlane[1].plan : 'Pro'}</p>
                    </div>
                    <div class="bg-white rounded-md p-4">
                        <p class="text-red-600 font-bold">${allPricePlane.length > 0 && allPricePlane[2].price ? allPricePlane[2].price : 'Free of Cost/'}</p>
                        <p class="text-red-600 font-bold">${allPricePlane.length > 0 && allPricePlane[2].plan ? allPricePlane[2].plan : 'Enterprise'}</p>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <h4 class="text-2xl font-semibold mb-4">Features</h4>
                        <ul class="list-disc ml-8">
                            ${allFeatures.length > 0 ? allFeatures.map(item => `<li>${item}</li>`).join('') : 'No data Found'}
                        </ul>
                    </div>
                    <div>
                        <h4 class="text-2xl font-semibold mb-4">Integrations</h4>
                        <ul class="list-disc ml-8">
                            ${aiDetails.integrations && aiDetails.integrations.length > 0 ? aiDetails.integrations.map(item => `<li>${item}</li>`).join('') : 'No data Found'}
                        </ul>
                    </div>
                </div>
            </div>
            <div class="border border-orange-300 rounded-md shadow-md p-6">
                <img src="${aiDetails.image_link[0]}" alt="" class="mx-auto" />
                <div class="text-center">
                    <h3 class="font-bold text-xl my-2">${aiDetails.input_output_examples && aiDetails.input_output_examples.length > 0 ? aiDetails.input_output_examples[0].input : 'Can you give any example?'}</h3>
                    <h3 class="text-xl my-4">${aiDetails.input_output_examples && aiDetails.input_output_examples.length > 0 ? aiDetails.input_output_examples[0].output : 'No! Not Yet! Take a break!!!'}</h3>
                </div>
            </div>
        </div>
    `;

    show_details_modal.showModal();
}

const handleShowAll = () => {
    loadAiHub(true);
}

loadAiHub();