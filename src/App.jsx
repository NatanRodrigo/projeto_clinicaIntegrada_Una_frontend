import React, { useEffect } from 'react';
import Login from './functions/Authenticate/Login.jsx';
import './App.css';

// COMPONENTS
import Router from './router.jsx';
import Sidebar from './components/SideBar/SideBar.jsx';

function App() {
  const handleLogin = async () => {
    try {
      const response = await Login({
        email: 'atendente@user.com.br',
        senha: 'Teste1@',
      });
      console.log('Usuário autenticado com sucesso:', response);

      localStorage.setItem('token', response.token);
      localStorage.setItem('dataExpiracao', response.expiration);
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      // alert(
      //   'Ocorreu um erro ao processar sua solicitação. Verifique os logs para mais informações.',
      // );
    }
  };

  const handleAuthentication = async () => {
    const dataExpiracao = localStorage.getItem('dataExpiracao');

    if (dataExpiracao) {
      const expiracaoDate = new Date(dataExpiracao);
      const currentDate = new Date();

      if (expiracaoDate < currentDate) {
        console.log('Token expirado, realizando novo login...');
        await handleLogin();
      } else {
        console.log('Token ainda válido.');
      }
    } else {
      console.log('Nenhum token encontrado, realizando login inicial...');
      await handleLogin();
    }
  };

  useEffect(() => {
    handleLogin();

    const intervalId = setInterval(() => {
      handleAuthentication();
    }, 3600000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <section className="pages">
      <main className="container">
        <Sidebar />
        <Router />
      </main>
    </section>
  );
}

export default App;
