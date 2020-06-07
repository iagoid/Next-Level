POSIÇÃO DOS COMANDOS AFETA A ORDEM DE EXECUCÃO
codepen.io


<script>
	document.write("Olá!Hoje é dia " + Date());----------------------------

texto
</script>







VÁRIAVEL

var myvar
myvar = "Hello"

document.write(myvar)







CONSTANTES NÃO MUDAM DE VALOR
const myconst = "Hello"
document.write(myconst)




OBJETOS POSSUEM PROPRIEDADES E FUNCIONALIDADES
const pessoa = {
  altura: "1,80m",
  idade: 28,
  solteiro: true,
  correr(){
    return "run forrest"
  }
}
document.write(pessoa.correr())









VETORES
const colecaoDeBolinhas = ["blue", "red", "green", {name: "Iago"}]
document.write(colecaoDeBolinhas[3].name)












FUNÇÕES
function sayMyName(nome) {
  document.write(nome)
}

sayMyName("Iago")













CONDIÇÕES
const notaFinal = 7

if(notaFinal>5){
  document.write("Aprovado")
}

else{
  document.write("Reprovado")
}









REPETIÇÕES COM INTERCALAÇÃO HTML
for (i=0; i<10; i++) {
  document.write(`<p>${i}</p>`)
}
























	<DOCTYPE html>
<html lang="pt-br">

<head>
	<meta charset="UTF-8"/>
	<title> java</title>
	
	<script>
	var quebrada = false;
	function mudaLampada(tipo){
		if (tipo == 1){
			arquivo = "_imagens/lampada-acesa.jpg";
		}
		if (tipo == 2){
			arquivo = "_imagens/lampada-apagada.jpg";
		}
		if (tipo == 3){
			arquivo = "_imagens/lampada-quebrada.jpg";
		}
		if (!quebrada){
			document.getElementById("luz").src = arquivo;
			if(tipo ==3){
			quebrada = true;
			}
		}
	}
	</script>
</head>
<body>
<h1>Acenda a lampada</h1>
	<img src="_imagens/lampada-apagada.jpg" id="luz" onmouseover="mudaLampada

(1)" onmouseout="mudaLampada(2)" onclick="mudaLampada(3)"/>
</body>
</html>
                       