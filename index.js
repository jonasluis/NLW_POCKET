const { select, input, checkbox } = require('@inquirer/prompts')//busca informacao do inquirer na pasta prompts que quer a opcao select

let metas = [ ]

const cadastrarMeta = async () => {
    const meta = await input({ message: "Digite a meta:"})//pergunta pro usuario a meta

    if(meta.length == 0){//length = tamanho 
        console.log('A meta não pode ser vazia.')
        return
    }
    // envia as informacoes para dentro da variavel metas
    metas.push({value: meta, checked: false}) 
}

const listarMetas = async () => {
    const respostas = await checkbox({
        message: "Use as setas para mudar de meta, o espaco para marcar ou desmacar e o Enter para finalizar essa etapa",
        choices: [...metas],// ... joga tudo dentro de metas para o novo array
        instructions: false
    })
        

    if(respostas.length == 0) {
        console.log("Nenhuma meta selecionada")
        return
    }

    metas.forEach((m) =>{
        m.checked = false // desmarca todas as respostas
    })

            //forEach == para cada resposta 
    respostas.forEach((resposta) => { // vai marcar todas que ja estavam marcadas retirando apenas as que forem desmarcadas
        const meta = metas.find((m) => {//m == abreviacao meta e find == encontrar
            return m.value == resposta
        })

        meta.checked = true // marca a meta como true
    } )
    console.log('Meta(s) marcadas como concluida(s)')
}


const start = async () => {// funcao assincrona
    while(true){
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
                    name: "Sair",
                    value: "sair" //define o valor da opcao
                }
            ]
        })

        switch(opcao){
            case "cadastrar":
                await cadastrarMeta() //sempre que usar uma funcao assincrona usar await para esperar toda funcao cadastraMeta acontecer
                console.log(metas)
                break
            case "listar":
                await listarMetas()
                break
            case "sair":
                console.log("Ate a proxima!")
                return
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


