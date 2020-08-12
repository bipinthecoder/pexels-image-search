let currentPage = 1;
let nextPage = 2;
var mykey = config.API_KEY;
window.addEventListener("load", async ()=>{
    let container = document.getElementById("display");
    getImageItems("nature",1);


    let button = document.getElementById("submitBtn");
    button.addEventListener("click",searchQuery);

    let input = document.getElementById("input");
    input.value = "";
    input.addEventListener("keyup",displayQuick);

    let prevBtn = document.getElementById("prev");
    let nextBtn = document.getElementById("next");

    nextBtn.addEventListener("click",getNextPage);
    prevBtn.addEventListener("click",getPrevPage);
});
    function getNextPage() {
        console.log("clicked")
        let input = document.getElementById("input");
        let currentQueryParam = input.value;
        if(currentQueryParam === ""){
            getImageItems("nature",nextPage);
        }
        else{
            getImageItems(currentQueryParam,nextPage);
        }

    }
    function getPrevPage() {
        let input = document.getElementById("input");
        let newPage = currentPage - 1;
        if(newPage > 0){
            let currentQueryParam = input.value;
            if(currentQueryParam === ""){
                getImageItems("nature",newPage);
            }
            else{
                getImageItems(currentQueryParam,newPage);
            }
        }
    }

    function displayQuick() {
        let input = document.getElementById("input");
        console.log(input.value);
        setTimeout(() =>{
            getImageItems(input.value);
        },2000);
    }

    function searchQuery() {
        let input = document.getElementById("input");
        let query = input.value;
        getImageItems(query);
    }

    function displayItems(data){
        console.log(data);
        currentPage = data.page;
        nextPage = data.page + 1;
        let display = document.getElementById("display");
        display.innerHTML = "";
        let imageArray = data.photos;
        imageArray.forEach(item =>{
            let div = document.createElement("div");
            let image = document.createElement("img");
            image.style.width = "500px";
            image.style.height = "500px";
            image.setAttribute("src",item.src.large);

            let details = document.createElement("div");
            details.style.display = "flex";
            details.style.flexDirection = "column";

            let p_name = document.createElement("h2");
            p_name.textContent = "Photographer"+" "+item.photographer;
            p_name.style.marginLeft = "5%";
            p_name.style.marginTop="50%"

            details.append(p_name);
            div.style.display="flex";
            div.style.marginLeft = "10px";
            div.style.marginTop = "10px";
            div.style.marginBottom = "10px";
            div.style.border = "5px solid #54442B";
            div.append(image,details);

            // let hr = document.createElement("hr");
            display.append(div);


        })
    }

    async function getImageItems(string,current) {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", mykey);
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        await fetch("https://api.pexels.com/v1/search?query="+string+"&per_page=10"+"&page="+current, requestOptions)
            .then(response => response.json())
            .then(result => displayItems(result))
            .catch(error => console.log('error', error));
    }





