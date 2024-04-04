const apiCallUrl = "http://localhost:3000/";

export async function checkLogin(email, password) {
    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "Email": email, "Password": password })
        })
        const yes = await response.json();
        console.log(yes);
        if (yes.status) {
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
        // const token = localStorage.getItem('token'); // Retrieve the stored token
        //const token = 'thisIsAFakeTokenMwahHaHa';
        const response = await fetch('http://localhost:3000/dashboard/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // ,                'Authorization': `Bearer ${token}` // Attach the token
            },
            body: JSON.stringify({ "Type": type, "User": localStorage.getItem('email'), "Hive": hive, "token": localStorage.getItem('token') })
        });
        const hives = await response.json();
        console.log(hives);
        return hives;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function InsertHive(hive_name, streetAddress, city, province, postalCode, anonymous) {
    try {
        const token = localStorage.getItem('token'); // Retrieve the stored token
        const response = await fetch('http://localhost:3000/dashboard', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
                // ,            'Authorization': `Bearer ${token}` // Attach the token
            },
            body: JSON.stringify({ "Hive_Name": hive_name, "StreetAddress": streetAddress, "City": city, "Province": province, "PostalCode": postalCode, "Anonymous": anonymous, "Email": localStorage.getItem('email') })
        })
        const hives = await response.json();
        console.log(hives);
        return hives;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function UpdateHive(old_hive_name, hive_name, streetAddress, city, province, postalCode, anonymous) {
    try {
        const token = localStorage.getItem('token'); // Retrieve the stored token
        const response = await fetch('http://localhost:3000/dashboard', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
                // 'Authorization': `Bearer ${token}` // Attach the token
            },
            body: JSON.stringify({ "Old_Hive_Name": old_hive_name, "Hive_Name": hive_name, "StreetAddress": streetAddress, "City": city, "Province": province, "PostalCode": postalCode, "Anonymous": anonymous, "Email": localStorage.getItem('email') })
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
        const token = localStorage.getItem('token'); // Retrieve the stored token
        const response = await fetch('http://localhost:3000/dashboard', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
                // 'Authorization': `Bearer ${token}` // Attach the token
            },
            body: JSON.stringify({
                "Hive_Name": hive_name,
                "Email": localStorage.getItem('email')
            })
        });
        const hives = await response.json();
        console.log(hives);
        return hives;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function GetProducts() {
    try {
        const response = await fetch('http://localhost:3000/purchase', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "Type": "products"})
        })
        const products = await response.json();
        console.log(products);
        return products;
    } catch (error) {
        console.log(error);
        return error;
    }
}


export async function ExistingEmail(email) {
    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "Email": email })
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
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "Email": email, "Password": password, "FirstName": firstName, "LastName": lastName })
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
        // const token = localStorage.getItem('token'); // Retrieve the stored token
        const response = await fetch('http://localhost:3000/dashboard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Authorization': `Bearer ${token}` // Attach the token
            },
            body: JSON.stringify({ "Type": "temptrend", "User": localStorage.getItem('email'), "Hive": hiveName, "token": localStorage.getItem('token') })
        });
        console.log("here");
        const temperatures = await response.json();
        console.log(temperatures);
        return temperatures;
    } catch (error) {
        console.log(error);
        return error;
    }
}


export async function getHumidity(hiveName) {
    try {
        // const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/dashboard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ "Type": "humtrend", "User": localStorage.getItem('email'), "Hive": hiveName, "token": localStorage.getItem('token') })
        });
        const humidities = await response.json();
        console.log(humidities);
        return humidities;
    } catch (error) {
        console.log(error);
        return error;
    }
}


export async function getWeight(hiveName) {
    try {
        // const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/dashboard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ "Type": "weighttrend", "User": localStorage.getItem('email'), "Hive": hiveName, "token": localStorage.getItem('token') })
        });
        const weights = await response.json();
        console.log(weights);
        return weights;
    } catch (error) {
        console.log(error);
        return error;
    }
}


export async function getFrequency(hiveName) {
    try {
        // const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/dashboard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ "Type": "frequencytrend", "User": localStorage.getItem('email'), "Hive": hiveName, "token": localStorage.getItem('token') })
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

export async function GetLocations(type) {
    try {
        const response = await fetch('http://localhost:3000/map', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "Type": type })
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
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "Email": email, "Password": password, "Username": username, "Location": location })
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
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "Email": email })
        })
        const hives = await response.json();
        console.log(hives);
        return hives;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function getHives(type) {
    try {
        const response = await fetch('http://localhost:3000/map', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "Type": type })

        })
        const hives = await response.json();
        console.log(hives);
        return hives;
    }
    catch (error) {
        console.log(error);
        return error;
    }
}

export async function resetPassword(email) {
    try {
        // Assuming you have a backend API to handle sending email
        const response = await fetch('http://localhost:3000/forgotpassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "Email": email }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log(data.message);
        } else {
            console.log(data.error);
        }
        return data;
    } catch (error) {
        console.log('An error occurred while sending the reset email.');
        console.error('Error sending reset email:', error);
    }
}

export async function GetProfile() {
    try {
        const response = await fetch('http://localhost:3000/profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "Email": localStorage.getItem('email') })
        })
        const user = await response.json();
        console.log(user);
        return user;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function UpdateProfile(email, firstName, lastName, donationAmount, profilePic) {
    try {
        const response = await fetch('http://localhost:3000/profile', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "Email": email, "FirstName": firstName, "LastName": lastName, "Donation_Amount": donationAmount, "ProfilePic": profilePic })
        })
        const user = await response.json();
        console.log(user);
        return user;
    } catch (error) {
        console.log(error);
        return error;
    }
}