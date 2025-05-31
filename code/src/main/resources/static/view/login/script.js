const form = document.getElementById('loginForm');
const inputEmail = document.getElementById('email');
const inputSenha = document.getElementById('senha');
const selectUsuario = document.getElementById('usuario');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const dadosLogin = {
        email: inputEmail.value.trim(),
        senha: inputSenha.value.trim(),
        role: selectUsuario.value
    };

    fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosLogin)
    })
        .then(async response => {
            if (response.ok) {
                const usuarioLogado = await response.json();
                alert('Login bem‑sucedido!🎉 Bem vindo(a)!');

                if (usuarioLogado.role === 'ALUNO') {
                    window.location.href = '../fluxo aluno/extrato aluno/extrato.html';
                } else if (usuarioLogado.role === 'EMPRESA') {
                    window.location.href = '../fluxo empresa/gerenciamento vantagens/vantagem.html';
                } else if (usuarioLogado.role === 'PROFESSOR') {
                    window.location.href = '../fluxo professor/extrato/extrato.html';
                }
            } else if (response.status === 401) {
                const texto = await response.text();
                alert(texto + '. Tente novamente, por favor.😊');
            } else {
                alert('Ocorreu um erro no sistema. Tente novamente mais tarde.😉');
            }
        })
        .catch(() => {
            alert('Não foi possível conectar-se ao servidor.');
        });
});
