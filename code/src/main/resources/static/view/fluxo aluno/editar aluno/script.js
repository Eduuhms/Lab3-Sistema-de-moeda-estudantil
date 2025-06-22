const btn = document.getElementById("btnAtualizar");
const idAluno = localStorage.getItem("idAluno");
const select = document.getElementById('instituicao');
let saldoAnteriorDoAluno = 0;

import {isValidName, isValidCPF, isValidEmail, isValidRG, isValidSenha, isValidCurso, isValidRuaBairro, isValidCEP, isValidNumero} from './validações/validacoes.js'

window.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch(`http://localhost:8080/alunos/${idAluno}`);

        if (!response.ok) {
            alert("Sinto muito. Houve um erro ao carregar os dados do(a) aluno(a). Tente novamente.😉");
            return;
        }
        const aluno = await response.json();
        saldoAnteriorDoAluno = aluno.saldoMoedas || 0;

        const respInst = await fetch('http://localhost:8080/instituicoes');
        if (!respInst.ok) throw new Error('Falha ao carregar instituições');
        const instituicoes = await respInst.json();

        instituicoes.forEach(inst => {
            const option = document.createElement('option');
            option.value = inst.id;
            option.textContent = inst.nome;
            if (inst.id === aluno.instituicao.id) {
                option.selected = true;
            }
            select.appendChild(option);
        });

        document.getElementById('nome').value = aluno.nome || "";
        document.getElementById('cpf').value = aluno.cpf || "";
        document.getElementById('email').value = aluno.email || "";
        document.getElementById('rg').value = aluno.rg || "";
        document.getElementById('senha').value = aluno.senha || "";
        document.getElementById('curso').value = aluno.curso || "";
        document.getElementById('rua').value = aluno.rua || "";
        document.getElementById('bairro').value = aluno.bairro || "";
        document.getElementById('cep').value = aluno.cep || "";
        document.getElementById('numero').value = aluno.numero || "";
    } catch (error) {
        alert("Sinto muito. Houve um erro ao carregar os dados do(a) aluno(a). Tente novamente.😉");
    }
});

const form = document.querySelector('form');
form.addEventListener('submit', async (ev) => {
    ev.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const cpf = document.getElementById('cpf').value.trim();
    const email = document.getElementById('email').value.trim();
    const rg = document.getElementById('rg').value.trim();
    const senha = document.getElementById('senha').value.trim();
    const curso = document.getElementById('curso').value.trim();
    const rua = document.getElementById('rua').value.trim();
    const bairro = document.getElementById('bairro').value.trim();
    const cep = document.getElementById('cep').value.trim();
    const numero = parseInt(document.getElementById('numero').value, 10);

    if (!isValidName(nome)) return;
    if (!isValidCPF(cpf)) return;
    if (!isValidEmail(email)) return;
    if (!isValidRG(rg)) return;
    if (!isValidSenha(senha)) return;
    if (!isValidCurso(curso)) return;
    if (!isValidRuaBairro(rua, 'Rua')) return;
    if (!isValidRuaBairro(bairro, 'Bairro')) return;
    if (!isValidCEP(cep)) return;
    if (!isValidNumero(numero)) return;

    const aluno = {
        nome: nome,
        cpf: cpf,
        email: email,
        rg: rg,
        senha: senha,
        curso: curso,
        rua: rua,
        bairro: bairro,
        cep: cep,
        numero: numero,
        saldoMoedas: saldoAnteriorDoAluno,
        instituicao: {
            id: Number(select.value)
        }
    };

    try {
        const resposta = await fetch(`http://localhost:8080/alunos/${idAluno}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(aluno)
        });

        if (!resposta.ok) {
            alert("Não foi possível atualizar o(a) aluno(a). Tente novamente, por favor.😉");
            return;
        }

        const alunoAtualizado = await resposta.json();
        alert(`Aluno(a) ${alunoAtualizado.nome} atualizado(a) com sucesso!🤩`);
        form.reset();
        window.location.href = "../perfil aluno/perfil.html";
    } catch (error) {
        alert("Erro na requisição de atualização. Tente novamente, por favor.😉");
    }
});
