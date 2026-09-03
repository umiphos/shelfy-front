async function handleSubmit(event) {
  event.preventDefault()

  setMessage('')
  setSuccess(false)

  const formData = new FormData(event.target)

  try {
    const response = await fetch(
      'http://127.0.0.1:8000/api/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.get('email'),
          password: formData.get('password'),
        }),
      },
    )

    const data = await response.json()

    if (!response.ok) {
      setMessage(
        data.detail || 'Error al iniciar sesión.',
      )
      return
    }

    localStorage.setItem(
      'user',
      JSON.stringify({
        id: data.id,
        email: data.email,
      }),
    )

    setSuccess(true)
    setMessage(`Bienvenido, ${data.email}`)
  } catch {
    setMessage('No se pudo conectar con el servidor.')
  }
}