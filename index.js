const { select } = require('@inquirer/prompts')//busca informacao do inquirer na pasta prompts que quer a opcao select


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
                console.log("vamos cadastrar")
                break
            case "listar":
                console.log("")
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


