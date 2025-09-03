import { useState } from "react";

function MyForm() {
     const [user, setUser] = useState(
        {
            firstName: '',
            lastName: '',
            email: ''
        }
     )
    //입력 요소의 내용이 변경되면 값을 상태에 저장
    const handleChange = (event) => {
        setUser({...user, [event.target.name]:event.target.value});
    }

    const handleSubmit = (event) => {
        alert(`Hello ${user.firstName} ${user.lastName} ${user.email}`);
        event.preventDefault();
    }
    return (
        <form onSubmit={handleSubmit}>
            <p>
            <label>First name</label>
            <input type="text" name="firstName" onChange={handleChange} value={user.firstName}/>
            </p>
            <p>
            <label>Last name</label>
            <input type="text" name="lastName" onChange={handleChange} value={user.lastName}/>
            </p>
            <p>
            <label>Email</label>
            <input type="email" name="email" onChange={handleChange} value={user.email}/>
            </p>
            <input type="submit" value="눌러봐"/>
        </form>
    );
};

export default MyForm;