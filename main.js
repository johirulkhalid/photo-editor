const fileInput = document.querySelector(".file-input"),
filterOptions = document.querySelectorAll(".filter button"),
filterName = document.querySelector(".filter-info .name"),
filterValue = document.querySelector(".filter-info .value"),
filterSlider = document.querySelector('.slider input'),
rotateOptions = document.querySelectorAll(".rotate button"),
previewImg = document.querySelector(".preview-img img"),
resetFilterBtn = document.querySelector(".reset-filter"),
saveImgBtn = document.querySelector(".save-img"),
chooseImgBtn = document.querySelector(".choose-img");
let brightness = 100, saturation = 100, inversion = 0, grayscale = 0;
let rotate = 0, flipHorizontal = 1, flipVartical = 1;

const applyFilters = ()=>{
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVartical}) `;
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
}
const loadImage = () =>{
    let file = fileInput.files[0]; //getting user selected file
    if(!file) return; // return if user hasn't selected file
    previewImg.src = URL.createObjectURL(file); //passing file urs as preview img
    previewImg.addEventListener("load", ()=>{
        resetFilterBtn.click();
        document.querySelector('.container').classList.remove('disable');
    });
}
// using forEach loop adding class
filterOptions.forEach(option => {
    option.addEventListener("click", () =>{ //adding click event to all option button
        document.querySelector(".filter .active").classList.remove('active');
        option.classList.add('active');
        filterName.innerText = option.innerText;

        if(option.id === 'brightness'){
            filterSlider.max = "200";
            filterSlider.value = brightness;
            filterValue.innerText = `${brightness}%`;
        }else if(option.id === 'saturation'){
            filterSlider.max = "200";
            filterSlider.value = saturation;
            filterValue.innerText = `${saturation}%`;
        }else if(option.id === 'inversion'){
            filterSlider.max = "100";
            filterSlider.value = inversion;
            filterValue.innerText = `${inversion}%`;
        }else{
            filterSlider.max = "100";
            filterSlider.value = grayscale;
            filterValue.innerText = `${grayscale}%`;
        }
    });
});
const UpdateFilter = () =>{
    filterValue.innerText = `${filterSlider.value}%`;
    const selectedFilter = document.querySelector('.filter .active'); //getting selected filter btn
    if(selectedFilter.id === 'brightness'){
        brightness = filterSlider.value;
    }else if(selectedFilter.id === 'saturation'){
        saturation = filterSlider.value;
    }else if(selectedFilter.id === 'inversion'){
        inversion = filterSlider.value;
    }else{
        grayscale = filterSlider.value;
    }
    applyFilters();
}
rotateOptions.forEach(option =>{
    option.addEventListener('click', ()=>{ //adding click event listener to all rotate/flip buttons
        if(option.id === "left"){
            rotate -= 90; //if clicked btn is left rotate, decrement rotate value by -90
        }else if(option.id === "right"){
            rotate += 90; //if clicked btn is left rotate, increment rotate value by +90
        }else if(option.id === "horizontal"){
            flipHorizontal = flipHorizontal === 1 ? -1 : 1; //if horizontal value is a set this value to -1 else set 1
        }else{
            flipVartical = flipVartical === 1 ? -1 : 1;
        }
        applyFilters();
    });
});
const resetFilter = ()=>{
    brightness = 100, saturation = 100, inversion = 0, grayscale = 0;
    rotate = 0, flipHorizontal = 1, flipVartical = 1;
    filterOptions[0].click(); //clicking brightness btn so the brightness selected by default
    applyFilters();
}
const savaImage = () =>{
    // console.log("sava img btn")
    const canvas = document.createElement("canvas"); //creating canvas element
    const ctx = canvas.getContext("2d"); //canvas getContext returna a drawing context on the canvas
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;

    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`; //applying user selected filters to canvas filter
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if(rotate !== 0){
        ctx.rotate(rotate * Math.PI / 180);
    }
    ctx.scale(flipHorizontal,flipVartical); //flip canvas horizontal / vertical
    ctx.drawImage(previewImg,-canvas.width / 2,-canvas.height / 2, canvas.width,canvas.height);
    const link = document.createElement("a"); //creating <a> element
    link.download = "image.jpg"; //passing <a> tag download value to "image.jpg"
    link.href = canvas.toDataURL(); //passing <a> tag href value to canvas data url
    link.click(); //clicking <a> tag so the image download
}

fileInput.addEventListener("change", loadImage);
filterSlider.addEventListener('input', UpdateFilter);
resetFilterBtn.addEventListener("click", resetFilter);
saveImgBtn.addEventListener("click", savaImage);
chooseImgBtn.addEventListener("click", ()=> fileInput.click());