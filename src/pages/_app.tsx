import '../styles/global.css'
// Dentro do App, é tudo fixo, aparecerá em todas as páginas!!!

function MyApp({ Component, pageProps }) {
  return (

    // O contexto faz com que todos os componentes se comuniquem entre si
        <Component {...pageProps} />
  )
}

export default MyApp
