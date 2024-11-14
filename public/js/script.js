document.getElementById('cep').addEventListener('blur', async () => {
    const cep = document.getElementById('cep').value;
    
    // Verifica se o CEP foi preenchido corretamente
    if (cep.length === 8) {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            if (!data.erro) {
                // Preenchendo os campos automaticamente
                document.getElementById('logradouro').value = data.logradouro;
                document.getElementById('bairro').value = data.bairro;
                document.getElementById('cidade').value = data.localidade;
                document.getElementById('estado').value = data.uf;
            } else {
                
                alert('CEP não encontrado.');
                clearAddressFields();
            }
        } catch (error) {
            // Caso haja algum erro na requisição
            alert('Erro ao buscar o CEP. Tente novamente mais tarde.');
            console.error('Erro:', error);
            clearAddressFields();
        }
    } else {
        // Caso o CEP tenha um comprimento incorreto
        alert('Por favor, insira um CEP válido.');
        clearAddressFields();
    }
});

// Função para limpar os campos de endereço
function clearAddressFields() {
    document.getElementById('logradouro').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
}


document.getElementById('cep').addEventListener('input', () => {
    const cep = document.getElementById('cep').value;
    if (!cep) {
       
        clearAddressFields();
    }
});

