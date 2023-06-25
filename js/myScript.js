let stud =[];
//function to understand how to fetch data from json file
function fetchStudentData(){
    fetch('student.json')
// parse response argument received to JSON format, which is also asynchronous
    .then((response) => response.json()) 
    //as response.json() is also asynchronous
    .then((json) => {
        //console.log(json);

        //JSON.parse() --> create a JavaScript array by parsing a JSON string
        //JSON.stringify() --> convert JavaScript object into a string
        
        //JSON.parse() expects a String value and student is an Array
        //You need to stringify your JSON object before using parse
        // stud = JSON.parse(JSON.stringify(json));

        /*
        stud = JSON.parse(JSON.stringify(json));
        This command will store an array called student (from our json file) in stud. Everytime we want to work on the data, we have to write stud.student[0]. 
        To avoid this, we store the student array itself in stud. Now we can directly use stud[0];
        //console.log(stud.student[0]);
        //console.log(stud.student[0].username)
        */

        // stud = JSON.parse(JSON.stringify(json));
        // console.log(stud);
        // console.log(stud.student[0]);
        // console.log(stud.student[0].username);

        //we are saving the student array from json file in stud
        stud = JSON.parse(JSON.stringify(json)).student;
        console.log(stud[0].username);
        console.log(stud.length);
        
    });
}
//fetchStudentData();



//fetch is async, so only after data is fetched, we call the login function
function login(){
    fetch('student.json')
    .then((response) => response.json())
    .then((json) => {
        stud = JSON.parse(JSON.stringify(json)).student;
        callLogin();
    });
}

function callLogin(){
     
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;
    let validUser = false;
    for(let i = 0 ; i < stud.length ; i++){
        
        if(stud[i].username == user && stud[i].password == pass) {
            validUser = true;
            //setting session storage for username
            sessionStorage.setItem('studId', stud[i].id);
            sessionStorage.setItem('username', stud[i].username);
            break;
        }
    }
    if(validUser) {
         //redirecting to welcome page
        window.location.href="welcome_page.html";
    } else {
        document.getElementById("loginError").style.display = "block";
    }
}

function hideLoginError(){
    document.getElementById("loginError").style.display = "none";
}


// display marks in exam results. 
//Note: Json file has marks for Maths and Algebra only
function displayMarks(){
    fetch('student.json')
    .then((response) => response.json())
    .then((json) => {
        stud = JSON.parse(JSON.stringify(json)).student;
        callDisplayMarks();
        
    });
}

function callDisplayMarks(){
    
    let subject = document.getElementById("subject").value;
    let marks = document.getElementById("marks");
    let grade = document.getElementById("grade");
    
    //make text fields blank if subjects marks are not in json
    marks.value="";
    grade.value="";

    //loop through stud array of objects
    for(let i = 0 ; i < stud.length ; i++){
        
        //check id array id matches student id
        if(stud[i].id == sessionStorage.getItem("studId"))
        {
            //loop through object whose id matches. 
            //This gives us the object's keys
            for (const key in stud[i]) {
                /*One problem in using the for...in method is that it loops through the properties in the prototype chain as well. Since the objects in JavaScript can inherit properties from their prototypes, the for...in statement will loop through those properties as well. To avoid this problem, you have to explicitly check if the property belongs to the object by using the hasOwnProperty() method:
                The hasOwnProperty() method returns true if the specified property is a direct property of the object — even if the value is null or undefined. The method returns false if the property is inherited, or has not been declared at all. 
                */
                if (stud[i].hasOwnProperty(key)) {
            
                    if(subject == key){
                        marks.value = stud[i][key]["marks"];
                        grade.value = stud[i][key]["grade"];
                    }
                }
            }
        } 
    }
}


//add extra activities to session storage
function addActivity(){
    //adding keyword "Activity: ", before every activity key
    let activityName = "Activity: " + document.getElementById("activityName").value;
    let activityDetails = document.getElementById("activityDetails").value;
    sessionStorage.setItem(activityName, activityDetails);
    alert("Activity submitted");
}


//List extra activities on welcome page
function listActivity() {
    
    //Displays sessionStorage values in console
    // for (let i = 0; i < sessionStorage.length; i++) {
    //     let key = sessionStorage.key(i);  
    //     console.log(key);
    //     console.log(sessionStorage.getItem(key));
    // }
    // console.log("**************");

    //at position 0 a default value is stored: 
    //IsThisFirstTime_Log_From_LiveServer: true
    //Remember, values are not stored in any particular order in sessionStorage. They are randomly stored and hence randomly displayed.
    

    //If there are only 3 values, 1 is the default value (IsThisFirstTime_Log_From_LiveServer), 1 is username and 1 is studId, and we don't want to display those.
    let listContainer = document.getElementById("activityList");
    if(sessionStorage.length < 4){
        //hide List of extra Activities section
        document.getElementById("list").style.display = "none";
    } else {
        //show List of extra Activities section
        document.getElementById("list").style.display = "block";

        for (let i = 0; i < sessionStorage.length; i++) {
            let key = sessionStorage.key(i);  

            //splitting string to check if first word is "Activity: "
            let temp = key.split(" ");
            if(temp[0] == "Activity:"){
                let activityName = document.createElement("dt");
                activityName.innerHTML = key;
                activityList.appendChild(activityName);
        
                let activityDetails = document.createElement("dd");
                activityDetails.innerHTML = sessionStorage.getItem(key);
                activityList.appendChild(activityDetails);
            }
        }
    }
  }
  //read profile data. Username, id, dob and email are being read from json
function profileData(){
    fetch('student.json')
    .then((response) => response.json())
    .then((json) => {
        stud = JSON.parse(JSON.stringify(json)).student;
        callProfileData();
        
    });
}
function callProfileData(){
    //loop through stud array of objects
    for(let i = 0 ; i < stud.length ; i++){
        
        //check id array id matches student id
        if(stud[i].id == sessionStorage.getItem("studId"))
        {
            //loop through object whose id matches. 
            //This gives us the object's keys
            for (const key in stud[i]) {
                if (stud[i].hasOwnProperty(key)) {
                    
                    if(key == "username"){
                        document.getElementById("name").innerHTML = stud[i][key];
                    } else if(key == "id") {
                        document.getElementById("id").innerHTML = stud[i][key];
                    } else if(key == "dob"){
                        document.getElementById("dob").innerHTML = stud[i][key];
                    } else if(key == "email"){
                        document.getElementById("email").innerHTML = stud[i][key];
                    }
                }
            }
        } 
    }
  }
