import {useState} from "react";

function LoginForm({onLogin}){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    async function handleSubmit(e){
        e.preventDefault();
        
        try{
            await onLogin(email, password);
        }catch (err){
            setError(err.message);
        }
    }
    
    return (
    <form className="login-form" onSubmit={handleSubmit}>
        <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        />
        
        <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        />
        
        <button type="submit">Log in</button>
        
    {error && <p className="error">{error}</p>}
    
    </form>
  );
}

export default LoginForm;