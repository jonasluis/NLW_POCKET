const { select, input, checkbox } = require('@inquirer/prompts')//busca informacao do inquirer na pasta prompts que quer a opcao select
const fs = require("fs").promises

let mensagem = "Bem vindo(a) ao app de metas";
let metas

const carregarMetas = async () => {
    try{
        const dados = await fs.readFile("metas.file", "UTF-8")// ler o arquivo especificado
        metas = JSON.parse(dados) //transforma de json para js
    }
    catch(erro) {
        metas = []
    }
}

const salvarMetas = async () => {
    await fs.writeFile("metas.json", JSON.stringify(metas, null, 2)) //transforma de js para json
}

const cadastrarMeta = async () => {
    const meta = await input({ message: "Digite a meta:"})//pergunta pro usuario a meta

    if(meta.length == 0){//length = tamanho 
        mensagem = 'A meta não pode ser vazia.'
        return
    }
    // envia as informacoes para dentro da variavel metas
    metas.push(
        {value: meta, checked: false}
    )
    
    mensagem = "Meta cadastrada com sucesso!"
}

const listarMetas = async () => {

    if(metas.length ==0){
        mensagem = "Não existem metas!"
        return
    }

    const respostas = await checkbox({
        message: "Use as setas para mudar de meta, o espaco para marcar ou desmacar e o Enter para finalizar essa etapa",
        choices: [...metas],// ... joga tudo dentro de metas para o novo array
        instructions: false
    })
        
    metas.forEach((m) =>{
        m.checked = false // desmarca todas as respostas
    })

    if(respostas.length == 0) {
        mensagem = "Nenhuma meta selecionada"
        return
    }

    

            //forEach == para cada resposta 
    respostas.forEach((resposta) => { // vai marcar todas que ja estavam marcadas retirando apenas as que forem desmarcadas
        const meta = metas.find((m) => {//m == abreviacao meta e find == encontrar
            return m.value == resposta
        })

        meta.checked = true // marca a meta como true
    } )
    mensagem = 'Meta(s) marcada(s) como concluida(s)'
}

const metasRealizadas= async () => {
    if(metas.length ==0){
        mensagem = "Não existem metas!"
        return
    }

    const realizadas = metas.filter((meta) => {
        return meta.checked // pega as metas verdadeiras marcadas
    })
    if(realizadas.length == 0) {
        mensagem = 'Não existem metas realizadas! :('
        return
    }
    await select({
        message: "Metas Realizadas: " + realizadas.length, //mostra quantidade de metas realizadas
        choices: [...realizadas]
    })
}

const metasAbertas = async () => {
    if(metas.length ==0){
        mensagem = "Não existem metas!"
        return
    }

    const abertas = metas.filter((meta) => {
        return meta.checked != true //pega as metas falsa que n estao marcadas
    })

    if(abertas.length == 0){
        mensagem = "Não existem metas abertas! :)"
        return
    }

    await select({
        message: "Metas Abertas: " + abertas.length, //mostra a quantidade de metas abertas
        choices: [...abertas]
    })
}

const deletarMetas = async () => {
    if(metas.length ==0){
        mensagem = "Não existem metas!"
        return
    }

    const metasDesmarcadas = metas.map((meta) => { // map modifica o array original
        //meta.checked = false //desmarca todas as metas
        //return meta
        return {value: meta.value, checked: false} //desmarca todas as metas do array 
    })

    const itensADeletar = await checkbox({
        message: "Selecione a meta para deletar",
        choices: [...metasDesmarcadas],// ... joga tudo dentro de metas para o novo array
        instructions: false
    })

    if(itensADeletar.length == 0){
        mensagem = "Nenhuma meta para ser deletada!"
    }

    itensADeletar.forEach((item) => { //cria o looping
        metas = metas.filter((meta) => { // filtra as metas
            return meta.value != item // verifica se o item eh igual ao valor da meta
        })
    })

    mensagem = "Meta(s) deletada(s) com sucesso!"
}

const mostrarMensagem = () => {
    console.clear(); // limpa o terminal

    if(mensagem != "") {
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }
}

const start = async () => {// funcao assincrona
    await carregarMetas()
    while(true){
        mostrarMensagem()
        await salvarMetas()
        //await = aguardar. toda vez que tiver essa palavra dentro da funcao a funcao tem que utilizar o async
        const opcao = await select({ //aguardar a selecao da opcao
            message: "Menu >", // aparecer a menssagem
            choices: [//mostra as escolhas
                {
                    name: "Cadastrar meta",
                    value: "cadastrar" //define o valor da opcao
                },
                {
                    name: "Listar metas",
                    value: "listar"
                },
                {
                    name: "Metas realizadas",
                    value: "realizadas"
                },
                {
                    name: "Metas abertas",
                    value: "abertas"
                },
                {
                    name: "Deletar metas",
                    value: "deletar"
                },
                {
                    name: "Sair",
                    value: "sair" //define o valor da opcao
                }
            ]
        })

        switch(opcao){
            case "cadastrar":
                await cadastrarMeta() //sempre que usar uma funcao assincrona usar await para esperar toda funcao cadastraMeta acontecer
                break
            case "listar":
                await listarMetas()
                break
            case "realizadas":
                await metasRealizadas()
                break
            case "abertas":
                await metasAbertas()
                break
            case "deletar":
                await deletarMetas()
                break
            case "sair":
                console.log("Ate a proxima!")
                return // fecha o programa/funcão
        }
    }
}

start()


/*
// olá, mundo!
//console.log("olá, mundo!")


variáveis - let
let mensagens = "olá, mundo!"


// variáveis - const
const mensagem = "olá, eu"
{
    const mensagem = "olá, Jonas!" // chave apenas local
    console.log(mensagem)
}
console.log(mensagem);


// arrays
let metas = ['Jonas', 'alô']
let metas01 = [2, 'Jonas']
// concatenando valores
console.log(metas[1] + ", " + metas[0]) 

let metas02 = [
    metas,
    {
        value: 'Estudar 20 minutos todos os dias',
        checked: false
    }
]
console.log(metas02[1].value);

// objetos
let meta = {
    value: 'ler um livro por mês',
    address: 2,
    checked: true,
    isChecked: () => {
        console.log(info)
    }
}
console.log(meta.value);

// function // arrow function
const criarMeta = () => {}

// named function
function criarMetas() {}

*/


