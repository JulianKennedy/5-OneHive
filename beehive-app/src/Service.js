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

export async function RegisterUser(email, password, firstName, lastName) {
    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"Email": email, "Password": password, "FirstName": firstName, "LastName": lastName})
        })
        const hives = await response.json();
        console.log(hives);
        return hives;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function GetTemperatures(hiveName) {
    console.log("hi");
    try {
        const response = await fetch('http://localhost:3000/dashboard', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"Type": "temptrend", "User": localStorage.getItem('email'), "Hive": hiveName, "token": localStorage.getItem('token')})
        })
        console.log("here");
        const temperatures = await response.json();
        console.log(temperatures);
        return temperatures;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}

export async function getHumidity(hiveName) {
    try {
        const response = await fetch('http://localhost:3000/dashboard', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"Type": "humtrend", "User": localStorage.getItem('email'), "Hive": hiveName, "token": localStorage.getItem('token')})
        })
        const humidities = await response.json();
        console.log(humidities);
        return humidities;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}

export async function getWeight(hiveName) {
    try {
        const response = await fetch('http://localhost:3000/dashboard', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"Type": "weighttrend", "User": localStorage.getItem('email'), "Hive": hiveName, "token": localStorage.getItem('token')})
        })
        const weights = await response.json();
        console.log(weights);
        return weights;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}

export async function getFrequency(hiveName) {
    try {
        const response = await fetch('http://localhost:3000/dashboard', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"Type": "frequencytrend", "User": localStorage.getItem('email'), "Hive": hiveName, "token": localStorage.getItem('token')})
        })
        const frequencies = await response.json();
        console.log(frequencies);
        return frequencies;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}

export async function GetLocations() {
    try {
        const response = await fetch('http://localhost:3000/map', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"Email": localStorage.getItem('email')})
        })
        const locations = await response.json();
        console.log(locations);
        return locations;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}

export async function UpdateUser(email, password, username, location) {
    try {
        const response = await fetch('http://localhost:3000/profile', {
            method: 'PATCH',
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

export async function GetUserProfile(email) {
    try {
        const response = await fetch('http://localhost:3000/profile', {
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

export async function DeleteUser(email) {
    try {
        const response = await fetch('http://localhost:3000/profile', {
            method: 'DELETE',
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