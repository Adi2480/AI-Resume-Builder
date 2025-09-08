import React, {useState} from "react";

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!email || ! password){
            setError("Please enter valid email and password");
            return;
        }
        setError("");

        fetch("http://localhost:5000/api/auth/login", {
            method : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({email, password}),
        })
        .then((res) => {
            if(!res){
                throw new Error("Invalid credentials");
            }
            return res.json();
        })
        .then ((data) => {
            localStorage.setItem("token", data.token);
            alert("Login successfull");
        })
        .catch((err) => {
            setError(err.message);
        })
    };

    return (
        <div style={styles.container}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                />
                {error && <p style={styles.error}>{error}</p>}
                <button type="submit" style={styles.submit}>
                    Login
                </button>
            </form>
        </div>
    );
}

const styles = {
  container: {
    width: "300px",
    margin: "100px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "14px",
  },
};

export default Login;