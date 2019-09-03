    function pontuacao(valor,id){
      /*alert("valor: "+ parseInt(valor));*/
      var pontos1 = parseInt(document.getElementById("pontos01").innerHTML);
      var pontos2 = parseInt(document.getElementById("pontos02").innerHTML);
      if(parseInt(valor) == 0){
        /*alert("reset");*/
        pontos1 = 0;
        pontos2 = 0;
      }else{
        if(id=="time1"){
          pontos1 = pontos1 + parseInt(valor);
        }else{
          pontos2 = pontos2 + parseInt(valor);
        }
      }
      document.getElementById("pontos01").innerHTML = pontos1;
      document.getElementById("pontos02").innerHTML = pontos2;
    }
    //função para calcular as faltas, recebe o valor do botão (+1 -1 ou 0 para reset) e o time (facção)
    function pontuacaoFaltas(valor,id){
      /*alert("valor: "+ parseInt(valor));*/
      var faltas1 = parseInt(document.getElementById("faltas01").innerHTML);
      var faltas2 = parseInt(document.getElementById("faltas02").innerHTML);
      if(parseInt(valor) == 0 && id=="time1"){
        /*alert("reset");*/
        faltas1 = 0;
      }else{
        if(parseInt(valor) == 0 && id=="time2"){
          faltas2 = 0;
        }else{
        if(id=="time1"){
          faltas1 = faltas1 + parseInt(valor);
        }else{
          faltas2 = faltas2 + parseInt(valor);
        }
      }
      }
      document.getElementById("faltas01").innerHTML = faltas1;
      document.getElementById("faltas02").innerHTML = faltas2;
    }
    
    function CountdownTimer(obnm){
         var endct =0;  // eh seteado para 1 qndo comeca o script
         var ctmnts =0;  // minutos
         var ctsecs =0;  // segundso
         var startchr =0;  // usado para controlar quando ler a data do formulario e finalizado o script
         var ctpause =-1;  // se -1 pausa o script
       
         //get html elms.
         var el_showmns = document.getElementById('showmns');
         var el_showscs = document.getElementById('showscs');
         var el_mns = document.getElementById('mns');
         var el_scs = document.getElementById('scs');
         var el_btnct = document.getElementById('btnct');
         var el_btnct_res = document.getElementById('btnct_res');
         var el_btnct_end = document.getElementById('btnct_end');
       
         //para comeca/pausar/continuar o temporizador
         function startPauseCT(){
           if(parseInt(el_mns.value) >0 || parseInt(el_scs.value)>0 || endct ==1){
             ctpause *=-1;
             if(ctpause ==1){ //comeca a contagem e troca o botao de comecar para pausar
               el_btnct.value ='PAUSAR';
               window[obnm].countdownTimer();
             }
             else el_btnct.value ='CONTINUAR';
           }
         }
       
         // aqui eh a funcao que roda quando o contador chega a 0
         function endCT(){
           // 
          alert("O TEMPO ACABOU!!!");
           return false;
         }
       
         this.countdownTimer = function(){
           // se $startchr for 0, e existir os camos do formulario, pega os dados de minutos e segundos, e seta $startchr para 1
           if(startchr == 0 && el_mns && el_scs) {
             // valida o uso de interger, inteiro
             ctmnts = parseInt(el_mns.value);
             ctsecs = parseInt(el_scs.value);
       
             // se o dato n for numero, seta a variavel pra 0
             if(isNaN(ctmnts)) ctmnts = 0;
             if(isNaN(ctsecs)) ctsecs = 0;
       
             // rescreve o dado no campo do formulario pra garantir que os campos de minutos e sengundos contem numeros inteiros
             el_mns.value = ctmnts;
             el_scs.value = ctsecs;
             startchr = 1;
           }
       
           if(ctmnts >0 || ctsecs >0) endct =1;  //chama endCt() ao final
       
           // se minutos e segundos = 0 ento, chama a funcao endCT()
           if(ctmnts==0 && ctsecs==0 && endct ==1){
             startchr =0;
             ctpause =-1;
             endct =0;
             el_btnct.value ='COMECAR';
             endCT();
           }
           else if(startchr ==1 && ctpause ==1){
             // diminui os segundos e diminui os minutos se os segundos chegarem a 0
             ctsecs--;
             if(ctsecs < 0){
               if(ctmnts > 0) {
                 ctsecs = 59;
                 ctmnts--;
               }
               else {
                 ctsecs = 0;
                 ctmnts = 0;
               }
             }
             setTimeout(obnm +'.countdownTimer()', 1000); //recursividade da funcao apos 1 segundo
           }
       
           // mostra o tempo restante na tela
           el_showmns.innerHTML = ctmnts;
           el_showscs.innerHTML = ctsecs;
         }
       
         //seta o listener no botao q comeca o temporizador
         if(el_btnct) el_btnct.addEventListener('click', startPauseCT);
       
         //recomeca o temporizador com o valor inicial
         if(el_btnct_res) el_btnct_res.addEventListener('click', function(){ startchr =0; if(ctpause ==-1) startPauseCT(); });
       
         //finaliza o temporizador e seta 0 no formulario
         if(el_btnct_end) el_btnct_end.addEventListener('click', function(){ el_mns.value =0; el_scs.value =0; startchr =0; startPauseCT(); });
       }
       
       //seta o objeto da classe CountdownTimer 
       var obCT = new CountdownTimer('obCT');
       // ]]>