import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, message: '' }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error?.message || 'Terjadi error pada tampilan.' }
  }

  componentDidCatch(error) {
    console.error('Frontend error:', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="app-error">
          <h1>Halaman gagal dimuat</h1>
          <p>{this.state.message}</p>
          <p>Buka Inspect → Console untuk melihat detail error, lalu kirimkan teks error tersebut.</p>
        </main>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
