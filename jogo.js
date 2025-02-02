var timerId = null;

function iniciajogo(){
    var url = window.location.search;
    var nivel_jogo = url.replace('?', '');

    var tempo_segundos = 0;
        if(nivel_jogo == 1){
            tempo_segundos = 120
        }
        if(nivel_jogo == 2){
            tempo_segundos = 90
        }
        if(nivel_jogo == 3){
            tempo_segundos = 60
        }

    document.getElementById('cronometro').innerHTML = tempo_segundos;

    var qtde_baloes = 80

    cria_baloes(qtde_baloes)

    document.getElementById('baloes_inteiros').innerHTML = qtde_baloes
    document.getElementById('baloes_estourados').innerHTML = 0

    contagem_tempo(2);
}

function contagem_tempo(segundo){
    segundo = segundo - 1;
        if(segundo == -1){
            clearTimeout(timerId);
            game_over();
            return false;
        }
    
    document.getElementById('cronometro').innerHTML = segundo;
    timerId = setTimeout('contagem_tempo('+segundo+')', 1000);
}

function game_over(){
    remove_eventos_baloes();
    window.alert('You missed the deadline to complete the task.');

}

function remove_eventos_baloes(){
    var i = 1

    while(document.getElementById('b'+i)){
        document.getElementById('b'+i).onclick = '';
        i++
    }
}

function cria_baloes(qtde_baloes){
    for(var i = 1; i <= qtde_baloes; i++){
        var balao = document.createElement('img');
        balao.src = 'imagens/balao_azul_pequeno.png';
        balao.id = 'b'+i;
        balao.style.margin = '10px';
        balao.onclick = function(){estourar(this);};

        document.getElementById('cenario').appendChild(balao);
    }
}

function estourar(e){
    var id_balao = e.id;

    document.getElementById(id_balao).setAttribute('onclick', '')
    document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png';

    pontuacao(-1);
}

function pontuacao(acao){
    var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
    var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;

    baloes_inteiros = Number(parseInt(baloes_inteiros));
    baloes_estourados = Number(parseInt(baloes_estourados));
    
    baloes_inteiros = baloes_inteiros + acao;
    baloes_estourados = baloes_estourados - acao;

    document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
    document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

    situacao_jogo(baloes_inteiros);

}

function situacao_jogo(baloes_inteiros){
    if(baloes_inteiros == 0){
        alert('Voce concluiu a tarefa');
        parar_jogo()
    }
}

function parar_jogo(){
    clearTimeout(timerId);
}