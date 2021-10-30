loginFormHandler = async (event) => {
    event.preventDefault()

    const username = document.getElementById('username').value.trim()
    const password = document.getElementById('password').value.trim()
    console.log(username, password)

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        })

        if (response.ok) {
            document.location.replace('/dashboard')
        } else {
            alert(response.statusText)
        }
    }
}


document.querySelector('.login-form').addEventListener('submit', loginFormHandler)