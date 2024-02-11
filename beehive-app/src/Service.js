const apiCallUrl= "http://localhost:3000/";

export async function checkLogin(email, password) {
    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"Email": email, "Password": password})
        })
        const yes = await response.json();
        console.log(yes);
        if(yes.status) {
            localStorage.setItem('email', email);
        }
        return yes;
    } catch (error) {
        console.log(error);
        console.log(email);
        return error;
    }
}

export async function getUserHivesOrGetHiveData(type, hive) {
    try {
        const response = await fetch('http://localhost:3000/dashboard/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            //get token from javawebtoken
            body: JSON.stringify({"Type": type, "User": localStorage.getItem('email'), "Hive": hive, "token": localStorage.getItem('token')})
        })
        const hives = await response.json();
        console.log(hives);
        return hives;
    } catch (error) {
        console.log(error);
        return error;
    }
}

// export async function getAllHivesOfUser() {
//     try {
//         const response = await fetch('http://localhost:3000/dashboard', {
//             method: 'GET',
//             headers: {'Content-Type': 'application/json'}
//         })
//         const hives = await response.json();
//         console.log(hives);
//         //loop through hives and find the hives that match the email
//         //create a json object to hold all hives that match the email
//         //return the json object
//         //only keep unique hives

//         const JSONObject = [];
//         const hiveNames = [];
//         for (let i = 0; i < hives.length; i++) {
//             const element = hives[i];
//             if(element.Email == localStorage.getItem('email')) {
//                 //only add hives if the email is not yet in teh JSONObject array
//                 if(!hiveNames.includes(element.Hive_Name)) {
//                     JSONObject.push(element);
//                     hiveNames.push(element.Hive_Name);
//                 }
//             }
//         }
//         console.log(JSONObject);
//         return JSONObject;

//     } catch (error) {
//         console.log(error);
//         return error;
//     }
// }

export async function InsertHive(hive_name, location, anonymous) {
    try {
        const response = await fetch('http://localhost:3000/dashboard', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"Hive_Name": hive_name, "Location": location, "Anonymous": anonymous, "Email": localStorage.getItem('email')})
        })
        const hives = await response.json();
        console.log(hives);
        return hives;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function UpdateHive(old_hive_name, hive_name, location, anonymous) {
    try {
        const response = await fetch('http://localhost:3000/dashboard', {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"Old_Hive_Name": old_hive_name,"Hive_Name": hive_name, "Location": location, "Anonymous": anonymous, "Email": localStorage.getItem('email')})
        })
        const hives = await response.json();
        console.log(hives);
        return hives;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function DeleteHive(hive_name) {
    try {
        const response = await fetch('http://localhost:3000/dashboard', {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"Hive_Name": hive_name, "Email": localStorage.getItem('email')})
        })
        const hives = await response.json();
        console.log(hives);
        return hives;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function ExistingEmail(email) {
    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"Email": email})
        })
        const hives = await response.json();
        console.log(hives);
        return hives;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function RegisterUser(email, password, username, location) {
    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"Email": email, "Password": password, "Username": username, "Location": location})
        })
        const hives = await response.json();
        console.log(hives);
        return hives;
    } catch (error) {
        console.log(error);
        return error;
    }
}
