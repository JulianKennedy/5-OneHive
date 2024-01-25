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
        if(yes.status == false){
            alert("Incorrect email or password");
            window.location.href = "/home";
        }
        else{
            window.location.href = "/dashboard";
        }
        return await response.json();
    } catch (error) {
        console.log(error);
        console.log(email);
        return error;
    }
}