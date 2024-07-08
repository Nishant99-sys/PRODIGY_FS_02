let addbtn = document.querySelector("#add-btn");
let modal = document.querySelector(".modal");
let closebtn = document.querySelector(".close-icon");

addbtn.onclick = function () {
    modal.classList.add("active");
}

closebtn.addEventListener("click", () => {
    modal.classList.remove("active");
});







let userData = [];
let idEl = document.querySelector("#id");
let nameEl = document.querySelector("#name");
let l_nameEl = document.querySelector("#l-name");
let emailEl = document.querySelector("#email");
let officeEl = document.querySelector("#office-code");
let jobTitleEl = document.querySelector("#job-title");

let registerbtn = document.querySelector("#register-btn");

let registerForm = document.querySelector("#register-form");

let imgUrl;




registerForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    registrationData();
    getDataFromLocal();
    registerForm.reset();
    closebtn.click();
});


if(localStorage.getItem("userdata")!=null){
userData=JSON.parse(localStorage.getItem("userData"));
}


function registrationData() {
    userData.push({
        id: idEl.value,
        name: nameEl.value,
        l_name: l_nameEl.value,
        email: emailEl.value,
        officeCode: officeEl.value,
        jobTitle: jobTitleEl.value,
        profilePic: imgUrl == undefined ? "avatar.jpg" : imgUrl 
    });
    let userString = JSON.stringify(userData);

    localStorage.setItem("userData", userString);
    swal("Good job!", "You clicked the button!", "success");
}




let tableData=document.querySelector("#table-data");

const getDataFromLocal = () => {
    tableData.innerHTML = '';
    userData.forEach((data,index) => {
        tableData.innerHTML +=`
        <tr index='${index}'>
                <td>${index+1}</td>
                <td><img src="${data.profilePic}" width="40" height="40"</td>
                 <td>${data.id}</td>
                <td>${data.name}</td>
                <td>${data.l_name}</td>
                <td>${data.email}</td>
                <td>${data.officeCode}</td>
                <td>${data.jobTitle}</td>


                <td>
                    
                <button class="edit-btn"><i class="fa fa-eye"></i></button>
                    <button class="del-btn"><i class="fa fa-trash"></i></button>
                </td>
            </tr>
        `;
        
    });
    let alldelbtn=document.querySelectorAll(".del-btn");
    for(let i=0;i<alldelbtn.length;i++){
        // alldelbtn[i].addEventListener("click", () => {
        //     let tr = this.parentElement;
        //     console.log(tr);
        // });
        alldelbtn[i].onclick=function(){
            let tr = this.parentElement.parentElement;
            let id=tr.getAttribute("index");
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                    userData.splice(id,1);
                    localStorage.setItem("userData",JSON.stringify(userData));
                    getDataFromLocal();
                  swal("Poof! Your imaginary file has been deleted!", {
                    icon: "success",
                  });
                } else {
                  swal("Your imaginary file is safe!");
                }
              });
           
        }
    }
};



let profile_pic=document.querySelector("#profile-pic");
let uploadPic=document.querySelector("#upload-pic");

uploadPic.onchange = function(){
    if(uploadPic.files[0].size<1000000){
        let fReader = new FileReader();
        fReader.onload =function(e){
           imgUrl = e.target.result;
            profile_pic.src=imgUrl;
        }
        fReader.readAsDataURL(uploadPic.files[0]);
    }else{
        alert("File size is too long");
    }
}








