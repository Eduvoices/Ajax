// document.addEventListener('DOMContentLoaded', function(){
//     document.getElementById('btn-buscar-cep').addEventListener('click', function() {
//         const xhttp = new XMLHttpRequest()
//         const cep = document.getElementById('cep').value
//         const endpoint = `https://viacep.com.br/ws/${cep}/json`

//         xhttp.open('get', endpoint)
//         xhttp.send()
//     })
// })

$(document).ready(function(){
    $('#cep').mask('00000-000')

    $('#btn-buscar-cep').click(function() {
        const cep = $('#cep').val()
        const endpoint = `https://viacep.com.br/ws/${cep}/json`
        const botao = $(this)

        $(this).find('i').addClass('d-none')
        $(this).find('span').removeClass('d-none')

        // $.ajax(endpoint).done(function(resposta){
        //     const rua = resposta.logradouro
        //     const bairro = resposta.bairro
        //     const cidade = resposta.localidade
        //     const estado = resposta.uf
        //     const endereco = `${rua}, ${bairro} - ${cidade} - ${estado}`

        //     $('#endereco').val(endereco)

        //     setTimeout(function(){
        //         $(botao).find('i').removeClass('d-none')
        //         $(botao).find('span').addClass('d-none')
        //     }, 4000)
        // })
        fetch(endpoint)
        .then(function(resposta){
            return resposta.json()
        })
        .then(function(json){
            const rua = json.logradouro
            const bairro = json.bairro
            const cidade = json.localidade
            const estado = json.uf
            const endereco = `${rua}, ${bairro} - ${cidade} - ${estado}`

            $('#endereco').val(endereco)

        })
        .catch(function(erro){
            alert('Ocorreu um erro na busca de endereço. Tente novamente mais tarde')
        })
        .finally(function(){
            setTimeout(function(){
                $(botao).find('i').removeClass('d-none')
                $(botao).find('span').addClass('d-none')
                }, 1000)
        })
    })

    $('#form-pedido').submit(function(evento){
        evento.preventDefault()
        
        if ($('#nome').val().length == 0) {
            throw new Error('Digite o nome')
        }
    })
})