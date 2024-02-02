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

export async function getHives(hive_name) {
    try {
        const response = await fetch('http://localhost:3000/dashboard', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"User": localStorage.getItem('email'), "Hive": hive_name})
        })
        const hives = await response.json();
        console.log(hives);
        return hives;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function getAllHivesOfUser() {
    try {
        const response = await fetch('http://localhost:3000/dashboard', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        const hives = await response.json();
        console.log(hives);
        //loop through hives and find the hives that match the email
        //create a json object to hold all hives that match the email
        //return the json object
        //only keep unique hives

        const JSONObject = [];
        const hiveNames = [];
        for (let i = 0; i < hives.length; i++) {
            const element = hives[i];
            if(element.Email == localStorage.getItem('email')) {
                //only add hives if the email is not yet in teh JSONObject array
                if(!hiveNames.includes(element.Hive_Name)) {
                    JSONObject.push(element);
                    hiveNames.push(element.Hive_Name);
                }
            }
        }
        console.log(JSONObject);
        return JSONObject;

    } catch (error) {
        console.log(error);
        return error;
    }
}