document.getElementById('formPaciente').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const paciente = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        senha: document.getElementById('senha').value,
        telefone: document.getElementById('telefone').value,
        cpf: document.getElementById('cpf').value
    };

    console.log("Dados do Paciente salvos:", paciente);
    alert('Paciente cadastrado com sucesso!');
    this.reset();
});