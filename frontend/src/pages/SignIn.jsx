const SignIn = () => {
    return(
        <div className="container">
      
      
      <h1>🎮 Кликер Игра</h1>
      <p className="subtitle">Демонстрация CSRF + CORS + Sessions</p>

      <div className="forms">

        <div className="form-card">
          <h2>Вход</h2>
          <form>
            <input type="text" placeholder="Имя пользователя" required />
            <input type="password" placeholder="Пароль" required />
            <button type="submit">Войти</button>
          </form>
        </div>
      </div>
    </div>
    )
}

export default SignIn