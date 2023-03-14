

/// create the inner div ,count is 10


let dat = {};
function createDiv(data){
    for (let i = 0 ; i < 10 ; i++){
        let bashee = document.createElement("div");
        bashee.classList.add("innerDiv");
        bashee.setAttribute("id",`b${i}`);
        root.append(bashee);
        bashee.innerHTML = `
        <div id = 'mainDiv'>
           <img src = "${data[i].logo}"/>
           <div class = afterLogo>
              <div class = "profile">
                 <div class = "first">${data[i].company}</div>
                 <div id = 'c${i}'></div>
                 <div id = 'd${i}'></div>
              </div>
             <div class = "profile">
                 <div class = "middle">${data[i].position}</div>
              </div>
              <div class = "profile">
                 <div class = "day"> ${data[i].postedAt} &nbsp . &nbsp ${data[i].contract} &nbsp . &nbsp ${data[i].location}</div>
              </div>
           </div>
           <div class = "buttons">
               <button onclick = water(this.innerText) class = "but">${data[i].role}</button>
               <button onclick = water(this.innerText) class = "but">${data[i].level}</button>
               <div id = 'a${i}'> </div>
           </div>
        </div>`
        for (let j of data[i].languages){
            let main  = document.getElementById(`a${i}`);
            main.innerHTML+= `<button onclick = water(this.innerText) class = 'but' >${j}</button>`
        }
        if (data[i].new){
            let main  = document.getElementById(`c${i}`);
            main.innerHTML = "<div class = 'new'>NEW</div>"
        }
        if (data[i].featured){
            let main  = document.getElementById(`d${i}`);
            main.innerHTML = "<div class = 'featured'>FEATURED</div>"
        }
    }
   dat = data;
}

fetchData(); 

function fetchData(){

    fetch("data.json")
    .then(function(response){
        console.log(response);
        return response.json();
    })
    .then(function(data){
       createDiv(data);
    })
}

let queryArray =[];

function clearing(){
    mainQuery.innerHTML = "";
    queryArray = [];
    water("");
    queryDiv.style.display = 'none';
}

function water(query){
    queryDiv.style.display = 'flex';
    console.log(query)
    if (!queryArray.includes(query)){
    queryArray.push(query);
      if (query != ""){
        mainQuery.innerHTML += `<div class = 'queryButton'>&nbsp${query}&nbsp<button onclick ='remov(this)' class = 'cancel'>X</button></div>`
      }
    }
    console.log(queryArray)
    for (let i of dat){
        count = 0;
      for (let j = 0 ; j < queryArray.length ;j++){
        if(i.languages.includes(queryArray[j]) || i.role.includes(queryArray[j]) || i.level.includes(queryArray[j])){
            count++;
            console.log(count);
        }
      }
      if ( count == queryArray.length){
        let temp = document.getElementById(`b${i.id-1}`);  
        temp.style.display = "flex";
      }
      else{
        console.log("k");
        let temp = document.getElementById(`b${i.id-1}`);  
        temp.style.display = "none";
      }
    }
}

function remov(input){
    console.log(input.previousSibling.data.trim());
    queryArray.splice(queryArray.indexOf(input.previousSibling.data.trim()),1);
    console.log(queryArray);
    input.parentElement.remove();
    water("");
}