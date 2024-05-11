function validation(values)
{//checks email,password according to below automata
    let error={}
    const email_pattern= /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /.*/;


    if(values.email === "")
    {
        error.email="Enter a mail id" //if email is empty asks to enter 
    }
    else if(!email_pattern.test(values.email))
    {
        error.email="Email id didnt match"// input != to email_pattern 
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
        error.password="Renter password"
    }
    else{
        error.password=""
    }
    return error;
}
    export default validation;