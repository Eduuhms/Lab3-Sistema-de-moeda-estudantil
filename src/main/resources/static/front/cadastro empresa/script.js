document.addEventListener('DOMContentLoaded', async () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const nome = document.getElementById('nome').value.trim();
        const cnpj = document.getElementById('cnpj').value.trim();
        const email = document.getElementById('email').value.trim();
        const senha = document.getElementById('senha').value.trim();

        if (!isValidName(nome)) return;
        if (!isValidCNPJ(cnpj)) return;
        if (!isValidEmail(email)) return;
        if (!isValidSenha(senha)) return;

        const empresa = {
            nome: nome,
            cnpj: cnpj,
            email: email,
            senha: senha
        };

        try {
            const resposta = await fetch('http://localhost:8080/empresas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(empresa)
            });

            if (!resposta.ok) {
                alert("Não foi possível cadastrar a empresa. Tente novamente, por favor.😉");
                return;
            }

            const novaEmpresa = await resposta.json();
            alert(`Empresa ${novaEmpresa.nome} cadastrada com sucesso!🤩`);
            form.reset();
            window.location.href = "../consulta empresas/consultaempresas.html";
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert("Erro na requisição de cadastro. Tente novamente, por favor.😉");
        }
    });
});

function isValidName(nome) {
    const regex = /^[a-zA-ZÀ-ÿ\s]+$/;
    if (!regex.test(nome) || nome.length < 3) {
        alert('O nome deve ter mínimo de 3 letras.😊');
        return false;
    }
    return true;
}

function isValidCNPJ(cnpj) {
    const regex = /^[0-9]{14}$/;
    if (!regex.test(cnpj)) {
        alert('O CNPJ deve conter exatamente 14 números.😊');
        return false;
    }
    return true;
}

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
        alert('O e-mail é inválido. Informe um formato como empresa@email.com.😊');
        return false;
    }
    return true;
}

function isValidSenha(senha) {
    if (senha.length < 4) {
        alert('A senha deve ter mínimo de 4 caracteres.😊');
        return false;
    }
    return true;
}