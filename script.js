// Garante que o usuário padrão de teste 'teste / 123' esteja sempre ativo
(function garantirUsuarioTeste() {
    const usuarioPadrao = {
        nome: 'Usuário Teste',
        email: 'teste',
        cpf: '000.000.000-00',
        celular: '(00) 00000-0000',
        senha: '123'
    };
    
    // Sempre define ou atualiza o usuarioPadrao de teste
    localStorage.setItem('usuarioTestePadrao', JSON.stringify(usuarioPadrao));
})();

// Proteção de Acesso às rotas internas
(function protegerRotas() {
    const usuarioLogado = localStorage.getItem('funcionarioLogado');
    const paginaAtual = window.location.pathname.split('/').pop();

    const paginasPublicas = ['login.html', 'cadastro.html', ''];

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

        const emailDigitado = document.getElementById('loginEmail').value.trim();
        const senhaDigitada = document.getElementById('loginSenha').value.trim();

        // Busca tanto o usuário de teste padrão quanto eventuais cadastros manuais
        const usuarioPadrao = JSON.parse(localStorage.getItem('usuarioTestePadrao'));
        const funcionarioCadastrado = JSON.parse(localStorage.getItem('funcionarioCadastrado'));

        const ehUsuarioPadraoValido = usuarioPadrao && usuarioPadrao.email === emailDigitado && usuarioPadrao.senha === senhaDigitada;
        const ehUsuarioCadastradoValido = funcionarioCadastrado && funcionarioCadastrado.email === emailDigitado && funcionarioCadastrado.senha === senhaDigitada;

        if (ehUsuarioPadraoValido || ehUsuarioCadastradoValido) {
            localStorage.setItem('funcionarioLogado', 'true');
            alert('Login realizado com sucesso!');
            window.location.href = 'index.html';
        } else {
            alert('E-mail ou senha incorretos!');
        }
    });
}

// 3. Função de Logout (Sair)
function fazerLogout() {
    localStorage.removeItem('funcionarioLogado');
    alert('Sessão encerrada com sucesso!');
    window.location.href = 'login.html';
}