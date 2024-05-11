function validation(values)
{
    
    let error={}
    const name_pattern= /^[a-zA-Z ]+$/;
    const email_pattern= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if(values.name === "")
    {
        error.name="Name should not be empty"
    }
    else{
        error.name=""
    }

    if(values.email === "")
    {
        error.email="Enter email"
    }
    else if(!email_pattern.test(values.email))
    {
        error.email="Email id didnt match"
    }
    else{
        error.email=""
    }

    if(values.password === "")
    {
        error.password="Enter password"
    }
    else if(!password_pattern.test(values.password))
    {
        error.password="Password should contain atleast one capital and one digit and size 9"
    }
    else{
        error.password=""
    }
    return error;
}
    export default validation;