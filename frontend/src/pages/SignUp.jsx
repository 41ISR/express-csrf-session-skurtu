const SignUp = () => {
    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = {
            email: e.target.email.value,
            password: e.target.password.value
        }
        try {
            const res = await fetch("https://curly-space-system-g4jxpjvqvwqf9j6g-3000.app.github.dev/signup", {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(user),
                credentials: "include"
            })

            if (!res.ok) throw new Error(res.statusText)

            console.log(res)
        } catch (error){
            console.error(error)
        }
    }
    return(
                <div className="container">
      
      
      <h1>🎮 Кликер Игра</h1>
      <p className="subtitle">Демонстрация CSRF + CORS + Sessions</p>



      <div className="forms">
        <div className="form-card">
          <h2>Регистрация</h2>
          <form onSubmit={handleSubmit} type="submit">
            <input id="email" name="email" type="text" placeholder="Имя пользователя" required />
            <input id="password" name="password" type="password" placeholder="Пароль (мин. 6 символов)" required />
            <button>Зарегистрироваться</button>
          </form>
        </div>
      </div>
    </div>
    )
}

export default SignUp