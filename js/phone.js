const loadPhone = async (searchText = "13", isShowAll) => {
    const res = await fetch(
        `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    );
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
    const phoneContainer = document.getElementById("phone-container");
    phoneContainer.textContent = "";
    if (phones.length > 6 && !isShowAll) {
        const showAllContainer = document.getElementById("show-all-container");
        showAllContainer.classList.remove("hidden");
    } else {
        const showAllContainer = document.getElementById("show-all-container");
        showAllContainer.classList.add("hidden");
    }
    if (!isShowAll) {
        phones = phones.slice(0, 6);
    }
    phones.forEach((phone) => {
        const phoneCard = document.createElement("div");
        phoneCard.classList = "card bg-gray-100 p-4";
        phoneCard.innerHTML = `
            <figure><img src="${phone.image}" /></figure>
            <div class="card-body">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-center">
                    <button onclick="showDetails('${phone.slug}')" class="btn btn-primary normal-case">Show Details</button>
                </div>
            </div>
        `;
        phoneContainer.appendChild(phoneCard);
    });
    toggleSpinner(false);
};

// handle search
const handleSearch = (isShowAll) => {
    toggleSpinner(true);
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    searchText.toLowerCase();
    // console.log(searchText);
    loadPhone(searchText, isShowAll);
};

const toggleSpinner = (isLoading) => {
    const spinner = document.getElementById("loading-spinner");
    if (isLoading) {
        spinner.classList.remove("hidden");
    } else {
        spinner.classList.add("hidden");
    }
};

// handel show all
const showAll = () => {
    handleSearch(true);
};

const showDetails = async (id) => {
    // load data
    const res = await fetch(
        `https://openapi.programming-hero.com/api/phone/${id}`
    );
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone);
};

const showPhoneDetails = (phone) => {
    console.log(phone);

    const phoneName = document.getElementById("phone-name");
    phoneName.innerText = phone.name;

    const phoneDetailContainer = document.getElementById(
        "phone-detail-container"
    );
    phoneDetailContainer.innerHTML = `
        <img src="${phone.image}" alt="" />
        <p><span class="font-bold">Storage: </span>${phone?.mainFeatures?.storage}</p>
    `;

    show_details_modal.showModal();
};

loadPhone();
