// Proteção de Acesso: Executa ao carregar qualquer página
(function protegerRotas() {
    const usuarioLogado = localStorage.getItem('funcionarioLogado');
    const paginaAtual = window.location.pathname.split('/').pop();

    // Páginas públicas (não precisam de login)
    const paginasPublicas = ['login.html', 'cadastro.html'];

    // Se NÃO estiver logado e tentar acessar qualquer página do sistema (incluindo index.html)
    if (!usuarioLogado && !paginasPublicas.includes(paginaAtual)) {
        window.location.href = 'login.html';
    }
})();

// 1. Cadastro de Funcionário (cadastro.html)
const formCadastroFuncionario = document.getElementById('formCadastroFuncionario');
if (formCadastroFuncionario) {
    formCadastroFuncionario.addEventListener('submit', function(e) {
        e.preventDefault();

        const senha = document.getElementById('senhaFuncionario').value;
        const confirmarSenha = document.getElementById('confirmarSenha').value;

        if (senha !== confirmarSenha) {
            alert('As senhas não coincidem!');
            return;
        }

        const funcionario = {
            nome: document.getElementById('nomeFuncionario').value,
            email: document.getElementById('emailFuncionario').value,
            cpf: document.getElementById('cpfFuncionario').value,
            celular: document.getElementById('celularFuncionario').value,
            senha: senha
        };

        localStorage.setItem('funcionarioCadastrado', JSON.stringify(funcionario));
        alert('Conta de funcionário criada com sucesso! Faça login para continuar.');
        window.location.href = 'login.html';
    });
}

// 2. Login de Funcionário (login.html)
const formLogin = document.getElementById('formLogin');
if (formLogin) {
    formLogin.addEventListener('submit', function(e) {
        e.preventDefault();

        const emailDigitado = document.getElementById('loginEmail').value;
        const senhaDigitada = document.getElementById('loginSenha').value;

        const funcionarioCadastrado = JSON.parse(localStorage.getItem('funcionarioCadastrado'));

        if (funcionarioCadastrado && funcionarioCadastrado.email === emailDigitado && funcionarioCadastrado.senha === senhaDigitada) {
            localStorage.setItem('funcionarioLogado', 'true');
            alert('Login realizado com sucesso!');
            window.location.href = 'index.html'; // Entra no sistema após logar
        } else {
            alert('E-mail ou senha incorretos!');
        }
    });
}

// 3. Funçao de Logout (Sair)
function fazerLogout() {
    localStorage.removeItem('funcionarioLogado');
    alert('Sessão encerrada com sucesso!');
    window.location.href = 'login.html';
}