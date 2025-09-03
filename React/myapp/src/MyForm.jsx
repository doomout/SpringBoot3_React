import { useState } from "react";

function MyForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
     
    const handleSubmit = (event) => {
        alert(`Hello \n ${firstName} \n ${lastName}\n ${email}`);
        event.preventDefault();
    }
    return (
        <form onSubmit={handleSubmit}>
            <label>First name </label>
            <input  
                onChange={e => setFirstName(e.target.value)} 
                value={firstName}/><br/>
            
            <label>Last name </label>
            <input  
                onChange={e => setLastName(e.target.value)} 
                value={lastName}/><br/>

            <label>Email </label>
            <input 
                onChange={e => setEmail(e.target.value)} 
                value={email}/><br/>
            <input type="submit" value="눌러봐"/>
        </form>
    );
};

export default MyForm;