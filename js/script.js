exibir()
resumo_Financeiro()

document.getElementById("form_Despesas").addEventListener("submit", function(event) {
    event.preventDefault() 

    var data = document.getElementById("data").value 
    var nome = document.getElementById("nome").value 
    var valor = document.getElementById("valor").value
    var despesa = {
        data: data,
        nome: nome, 
        valor: valor
    }
    var lista_Despesas = JSON.parse(localStorage.getItem('listagem')) || []
    lista_Despesas.push(despesa)

    localStorage.setItem('listagem', JSON.stringify(lista_Despesas))

    document.getElementById("form_Despesas").reset()
    exibir()
    resumo_Financeiro()
})



function salvar(){
    var salario = parseFloat(document.getElementById("salario").value).toFixed(2)
    if(isNaN(salario)){
        alert("Valor invalido, por favor preencha corretamente.")
        return
    }
    resumo_Financeiro()
}



function deletar(){
    localStorage.removeItem('listagem')
    exibir()
    resumo_Financeiro()
}



function exibir() {
    var lista_Despesas = JSON.parse(localStorage.getItem('listagem')) || []
    var output = document.getElementById("output")
    output.innerHTML = ""
    for(let i=0; i<lista_Despesas.length; i++) {
        let li = document.createElement('li')
        li.textContent = 'Data: ' + lista_Despesas[i].data + ' Nome: ' + lista_Despesas[i].nome + ' Valor: R$' + lista_Despesas[i].valor
        output.appendChild(li)
    }
}

function resumo_Financeiro(){
    var resumo  = document.getElementById("resumo")
    resumo.innerHTML = ""

    var salario = parseFloat(document.getElementById('salario').value).toFixed(2)
    if(isNaN(salario)) {salario = 0}
    var salario_p = document.createElement('p')
    salario_p.textContent = 'Salario: R$' + salario
    resumo.appendChild(salario_p)

    var lista_Despesas = JSON.parse(localStorage.getItem('listagem')) || []
    var total_Despesas = 0
    for(let i = 0; i < lista_Despesas.length; i++){
        total_Despesas += parseFloat(lista_Despesas[i].valor)
    }
    var despesas_p = document.createElement('p')
    despesas_p.textContent = 'Total de despesas: R$' + total_Despesas.toFixed(2)
    resumo.appendChild(despesas_p)

    var saldo = salario - total_Despesas
    var saldo_p = document.createElement('p')
    saldo_p.textContent = 'Saldo restante: R$' + saldo.toFixed(2)
    resumo.appendChild(saldo_p)
    if(saldo<0){
        salario_p.style.color = "red"
    }
    
}