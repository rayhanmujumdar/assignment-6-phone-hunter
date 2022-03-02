document.getElementById("close").style.display = "none"
document.getElementById("see-more").style.display = "none"
// data error handling;
const notFound = () => {
    document.getElementById("see-more-btn").style.display = "none"
    const h3 = document.createElement("h3");
    h3.classList.add("text-center","text-danger",'my-5')
    h3.innerText = "Data Not Found"
    productContainer.appendChild(h3)
    document.getElementById('spinner').style.display = "none"
}

//API data load
document.getElementById('spinner').style.display = "none"
const loadData = async () => {
    const inputField = document.getElementById("input-field");
    const inputFieldValue = inputField.value.toLowerCase();
    // console.log(inputFieldValue)
    inputField.value = ''
    document.getElementById("see-more-btn").style.display = "block"
    document.getElementById("close").style.display = "none"
    try{
        
        productContainer.innerHTML = "";
        document.getElementById("product-details").innerHTML = ""
        const url = `https://openapi.programming-hero.com/api/phones?search=${inputFieldValue}`
        const res = await fetch(url)
        document.getElementById('spinner').style.display = "block"
        const data = await res.json()
        if(data.data.length == 0){
            notFound()
        }
        else{
            // output data function
            displayPhone(data.data)
        }
        
    }
    catch(error){
        notFound()
    }
}
// search click event
const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click",loadData);
// product container id
const productContainer = document.getElementById("product-container");
// minimum and maximum product search;
const displayPhone = (phones) => {
    document.getElementById("see-more").style.display = "block"
    const minimumPhone = phones.slice(0,20)
        AllProduct(minimumPhone)

    // see more product and maximum product;
    document.getElementById("see-more-btn").addEventListener("click",() => {
        const maxmunPhone = phones.slice(20)
        AllProduct(maxmunPhone);
        document.getElementById("see-more-btn").style.display = "none"
    })
}

// all product search function;
const AllProduct = (products) => {
    products.forEach(phone => {
        const div = document.createElement("div")
        div.classList.add("col-sm-12","col-lg-4")
        div.innerHTML = `
        <div class="d-flex justify-content-center my-4">
            <div class="card p-3 rounded-3 bg-dark" style="width: 22rem;">
                <img src="${phone.image}" class=" w-100" alt="">
                <div class="card-body">
                <h5 class="card-title text-success">${phone.brand}</h5>
                <p class="card-text text-white">${phone.phone_name}</p>
                <a href="#" onclick="productData('${phone.slug}')" class="btn btn-primary">Go Details</a>
            </div>
        </div>
        `
        productContainer.appendChild(div)
        document.getElementById('spinner').style.display = "none"
    })
}

// product details
const productData = async (productId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${productId}`);
    const data = await res.json();
    productDetails(data.data)
}

const productDetails = (details) => {
    document.getElementById("close").style.display = "block"
    document.getElementById("product-details").style.display = "block"
    const sensors = details.mainFeatures.sensors.map(sensor => sensor)
    const importentSensors = sensors.slice(0,3)
    const allsensors = importentSensors.join(",")
    const releaseDate = details?.releaseDate === undefined ? "No date Found": details.releaseDate;
    const productDetails = document.getElementById("product-details")
    productDetails.innerHTML = `
    <div class="card p-3 rounded-3 bg-light w-100 m-auto my-5 text-center" style="width: 15rem;">
        <img src="${details.image}" class="m-auto" alt="...">
        <div class="card-body">
        <h5 class="card-title text-success">${details?.brand}</h5>
        <p class="card-text">${details?.name}</p>
        <h4>${releaseDate}</h4>
        <table class="m-auto">
            <h5 class="text-lg-center text-start bg-success text-white p-3">Main features</h5>
            <tbody>
                <tr>
                    <th>Display size</th>
                    <td>${details?.mainFeatures?.displaySize}</td>
                </tr>
                <tr>
                    <th>Sensors</th>
                    <td>${allsensors}</td>
                </tr>
                <tr>
                    <th>Storage</th>
                    <td>${details?.mainFeatures?.storage}</td>
                </tr>
            </tbody>
        </table>
        
        <table class="m-auto">
            <h5 class="text-lg-center text-start bg-success text-white p-3 mt-5">Others</h5>
            <tbody>
                <tr>
                    <th>Bluetooth</th>
                    <td>${details?.others?.Bluetooth === undefined ? "NO DATA" : details.others.Bluetooth}</td>
                </tr>
                <tr>
                    <th>GPS</th>
                    <td>${details?.others?.GPS === undefined ? "NO DATA": details.others.GPS}</td>
                </tr>
                <tr>
                    <th>NFC</th>
                    <td>${details?.others?.NFC === undefined ? "NO DATA": details.others.NFC}</td>
                </tr>
                <tr>
                    <th>Radio</th>
                    <td>${details?.others?.Radio === undefined ? "NO DATA" : details.others.Radio}</td>
                </tr>
                <tr>
                    <th>USB</th>
                    <td>${details?.others?.USB === undefined ? "NO DATA" : details.others.USB}</td>
                </tr>
                <tr>
                    <th>WLAN</th>
                    <td>${details?.others?.WLAN === undefined ? "NO DATA" : details.others.WLAN}</td>
                </tr>
            </tbody>
        </table>
    </div>
    `   
}

// details close button;
document.getElementById("close").addEventListener("click",() => {
    document.getElementById("product-details").style.display = 'none'
    document.getElementById("close").style.display = "none"
})