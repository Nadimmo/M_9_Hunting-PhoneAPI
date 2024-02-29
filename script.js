const loadDataPhone = async (search,isShow) =>{
    let res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`)
    let data = await res.json()
    // console.log(data)
    let phones = data.data
    displayPhoneData(phones,isShow)
}

const displayPhoneData =( phones, isShow )=>{
    // console.log(data)
    
    // 1. select div
    let currentDiv = document.getElementById('phon-container')
    // current div clear
    currentDiv.innerText = '';

    // show all button
    const showAll = document.getElementById('showAll')
    if(phones.length > 12 && !isShow){
        showAll.classList.remove('hidden')
    }else{
        showAll.classList.add('hidden')
    }
    // display  show
    if(!isShow){
        phones = phones.slice(0,12)
    }
    phones.forEach(phone =>{
        // console.log(phone)
        // 2. create div
        let createDiv = document.createElement('div')
        createDiv.classList = `card w-[300px] bg-gray-200 shadow-xl`
        createDiv.innerHTML =
        `
        <figure><img src="${phone.image}" alt="Phone" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>There are many variations of passages of available, but the majority have suffered</p>
            <div class="card-actions justify-end">
            <button onclick="showDetails('${phone.slug}'); my_modal_5.showModal()" class="btn  btn-info">Show Details</button>
            </div>
        </div>
        `
        currentDiv.appendChild(createDiv)
    })
    loadding(false)
}

const searchPhone = (isShow) =>{
    loadding(true)
    const inputText = document.getElementById('inputText');
    const valueInput = inputText.value;
    // console.log(valueInput)
    loadDataPhone(valueInput, isShow)
}

const loadding = (isloadding) =>{
    const load = document.getElementById('loading')
    if(isloadding){
        load.classList.remove('hidden')
    }else{
        load.classList.add('hidden')
    }
}

const showDetails = async (id) =>{
    // console.log('click btn', id)
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()
    // console.log(data)
    const phone = data.data
    showPhoneDetails(phone)
}

const showPhoneDetails = (phone) =>{
    console.log(phone)
    // console.log(phone.mainFeatures.storage)
    // console.log(phone.mainFeatures.displaySize)
    // console.log(phone.releaseDate)

    // create new modal
    const createModal = document.getElementById("createModal");
    createModal.innerHTML =`
    <img class="pl-[150px]" src="${phone.image}" alt="">
    <h2 class = pt-5 id="phoneName" class="font-bold text-2xl">Name: ${phone.name}</h2>
    <p id="p4" >Brand: ${phone.brand}</p>
    <p id="p1" >Storage:  ${phone.mainFeatures.memory}</p>
    <p id="p3" >Display: ${phone.mainFeatures.displaySize}</p>
    <p id="p6" >Slug: ${phone.slug}</p>
    <p id="p6" > <span>GPS: ${phone.others?.GPS || 'No GPS available'}</span></p>
   
    <p id="p6" >USB: ${phone.others.USB}</p>
    <p id="p6" >WLAN: ${phone.others.WLAN}</p>
    <p id="p5" >Release Date: ${phone.releaseDate}</p>
    `
    // <p id="p6" > <span>GPS: ${phone.others.GPS ? phone.others.GPS:"No GPS available in"}</span></p>
    // show modal
    my_modal_5.showModal()
}

const AllPhoneShow = () =>{
    searchPhone(true)
}
// loadDataPhone()