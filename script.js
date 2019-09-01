var inputElement = document.querySelector("#inputCalculadora"); //a "telinha" de nossa calculadora
var resultado = null; //o valor que será atribuído para o 'inputElement'
var primeiroValor = false, divisaoPorZero = false;  //indica à funcao 'atribuiValor' se o valor é o primeiro a ser inserido //indica se houve alguma divisao por zero 
var operacao = null; //recebe a operacao selecionada
var valor1 = 0; //primeiro valor inserido


//Funcoes Auxiliares (usadas como ferramentas e para guiar o calculo)

function zeraValor() {
    valor1 = 0;
} //reseta 'valor1'

function resetaOperacao() {
    operacao = null;
} //reseta 'operacao'

function atribuiValor() {

    if ( !primeiroValor ) { //nao tem primeiro valor
        valor1 = parseFloat(inputElement.value);
        primeiroValor = true;
        limpar();
    } else { //tem primeiro valor
        validaOperacao(operacao);
    }
} //Atribui o 'valor1' e, se este ja possuir um valor, chama a funcao 'validaOperacao'

function validaBotao(valor){

    if ( !isNaN(parseFloat(valor)) || valor == ",") {
        //console.log("é número");
        incluirValor(valor);
    } else {
        //console.log("não é número");   
        executarFuncao(valor);
    }
}
// verifica se o botao é, ou não, um numero. em seguida chama a funcao auxiliar correspondente. //
// número => 'incluirValor()'. funcao => 'executarFuncao' //

function validaOperacao(op) {
    switch (op) {

        case "potencia":
            resultado = calculaPotencia(parseFloat(inputElement.value));
            resetaOperacao();
            atualizaResultado();
            break;

        case "multiplicacao":
            resultado = calculaMultiplicacao(parseFloat(inputElement.value));
            resetaOperacao();
            atualizaResultado();
            break;
        
        case "subtracao":
            resultado = calculaSubtracao(parseFloat(inputElement.value));
            resetaOperacao();
            atualizaResultado();
            break;

        case "adicao":
            resultado = calculaAdicao(parseFloat(inputElement.value));
            resetaOperacao();
            atualizaResultado();
            break;

        case "divisao":
            resultado = calculaDivisao(parseFloat(inputElement.value));
            resetaOperacao();
            atualizaResultado();
            break;
    
        default:
            alert("Operação Invalida!")
            break;
    }
} //recebe a operacao e chama a funcao de calculo correspondente

function executarFuncao(funcao){
    switch (funcao) {

        case "√":
            calculaRaiz(parseFloat(inputElement.value));
            break;                          //TERMINADO

        case "^":
            operacao = "potencia";
            atribuiValor();
            break;                          //TERMINADO

        case "C":
            limpar();
            break;                          //TERMINADO

        case "÷":
            operacao = "divisao";
            atribuiValor();
            break;                          //TERMINADO

        case "x":
            operacao = "multiplicacao";
            atribuiValor();
            break;                          //TERMINADO

        case "-":
            operacao = "subtracao";
            atribuiValor();
            break;                          //TERMINADO

        case "+":
            operacao = "adicao";
            atribuiValor();
            break;                          //TERMINADO

        case "±":
            inverteSinal();
            break;                          //TERMINADO

        case "=":
            validaOperacao(operacao);
            break;                          //TERMINADO
        
        default:
            alert("Função não encontrada!");
            break;                          //TERMINADO
    }
} //classifica a operacao e chama a atribuicao dos valores

// --------------------------------------------------------------------------------------------------------------------------------- //


//Funcoes de Controle (tem influencia direta no 'inputElement')

function inverteSinal() {
    inputElement.value *= -1;
} //multiplica o valor de 'inputElement' por -1

function limpar() {
    inputElement.value = "";
} //limpa o 'inputElement'

function atualizaResultado() {
    if (isNaN(resultado)) {
        if (divisaoPorZero) {
            divisaoPorZero = false;
            inputElement.value = "Impossível dividir por zero";
        } else {
            inputElement.value = "Erro";   
        }
    } else {
        inputElement.value = resultado;
    }
} //atribui o 'resultado' para o valor do 'inputElement'

function incluirValor(valor){

    if (inputElement.value == "Erro"){
        limpar();
    }

    let backup = inputElement.value

    if ( valor == "," && inputElement.value.indexOf(".") != -1 ) { //evita mais de uma virgula
        inputElement.value = backup;
    } else {

        if (valor == ",") {
            inputElement.value += ".";            
        } else {
            inputElement.value += valor;
        }

        if ( inputElement.value == "00" ) { //evita zeros à esquerda
            inputElement.value = backup
        } else if ( inputElement.value == "." ){ //insere zero à esquerda
            inputElement.value = "0" + ".";
        }
    }    
    //inputElement.focus();
} //inclue valor ao 'inputElement'

// --------------------------------------------------------------------------------------------------------------------------------- //


//Funcoes de Calculo (calculam e retornam o valor 'resultado')

function calculaPotencia(valor){
    resetaOperacao();
    primeiroValor = false;
    return Math.pow(valor1, valor);
}

function calculaDivisao(valor) {
    resetaOperacao();
    primeiroValor = false;
    
    if (valor == 0) {
        divisaoPorZero = true;
        return NaN;
    } else {
        return (valor1 / valor);
    }

}

function calculaMultiplicacao(valor) {
    resetaOperacao();
    primeiroValor = false;
    return (valor1 * valor);
}

function calculaSubtracao(valor) {
    resetaOperacao();
    primeiroValor = false;
    return (valor1 - valor);
}

function calculaAdicao(valor) {
    resetaOperacao();
    primeiroValor = false;
    return (valor1 + valor);
}

function calculaRaiz(valor) {
    resultado = Math.sqrt(valor);
    atualizaResultado();
}
