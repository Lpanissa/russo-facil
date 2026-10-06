// Conteúdo do Russo Fácil
const ALFABETO = [
  ["А а","a","como o 'a' de casa","мама","máma","mamãe"],
  ["Б б","bê","como o 'b' de bola","банан","banán","banana"],
  ["В в","vê","como o 'v' de vaca","вода","vadá","água"],
  ["Г г","guê","como o 'g' de gato","гора","gará","montanha"],
  ["Д д","dê","como o 'd' de dado","дом","dom","casa"],
  ["Е е","iê","como 'iê' em iêiê (som de 'ie' suave)","нет","niet","não"],
  ["Ё ё","iô","como 'io' de iogurte","ёлка","iólka","pinheiro"],
  ["Ж ж","jê","como o 'j' de janela","жена","jená","esposa"],
  ["З з","zê","como o 'z' de zebra","зима","zimá","inverno"],
  ["И и","i","como o 'i' de ilha","кино","kinó","cinema"],
  ["Й й","i curto","como o 'i' final de pai","музей","muzêi","museu"],
  ["К к","ká","como o 'c' de casa","кот","kot","gato (macho)"],
  ["Л л","él","como o 'l' de lua","лампа","lámpa","lâmpada"],
  ["М м","ém","como o 'm' de mala","мир","mir","paz / mundo"],
  ["Н н","én","como o 'n' de navio","нос","nos","nariz"],
  ["О о","o","como o 'o' de bola","окно","aknó","janela"],
  ["П п","pê","como o 'p' de pato","папа","pápa","papai"],
  ["Р р","ér","como o 'r' vibrado de caro","рыба","rýba","peixe"],
  ["С с","ês","como o 's' de sapo","сок","sok","suco"],
  ["Т т","tê","como o 't' de tatu","театр","teátr","teatro"],
  ["У у","u","como o 'u' de uva","утро","útra","manhã"],
  ["Ф ф","éf","como o 'f' de faca","фото","fóta","foto"],
  ["Х х","rá","como um 'r' forte aspirado (rr de carro, mais suave)","хлеб","khliép","pão"],
  ["Ц ц","tsê","como o 'ts' de tsunami","цирк","tsirk","circo"],
  ["Ч ч","tchê","como o 'tch' de tchau","час","tchas","hora"],
  ["Ш ш","chá","como o 'ch' de chave","шапка","chápka","gorro"],
  ["Щ щ","chtchá","como um 'ch' suave e longo (chtch)","борщ","borshtch","sopa borsch"],
  ["Ъ ъ","sinal duro","sem som; separa a pronúncia da letra seguinte","объект","abiékt","objeto"],
  ["Ы ы","ý","som entre 'i' e 'u', com a língua recuada","сыр","syr","queijo"],
  ["Ь ь","sinal mole","sem som; suaviza a consoante anterior","день","dien'","dia"],
  ["Э э","é","como o 'é' de pé","это","éta","isto"],
  ["Ю ю","iu","como 'iu' de iuane","юг","iuk","sul"],
  ["Я я","ia","como 'ia' de iate","яблоко","iábloka","maçã"]
];

// [russo, transliteração, português]
const VOCAB = [
 {id:"cumprimentos", nome:"Cumprimentos", icone:"👋", palavras:[
  ["Привет","privét","olá (informal)"],["Здравствуйте","zdrástvuitie","olá (formal)"],["Пока","paká","tchau"],
  ["До свидания","da svidánia","até logo"],["Доброе утро","dóbraie útra","bom dia"],["Добрый день","dóbryi dien'","boa tarde"],
  ["Добрый вечер","dóbryi viétcher","boa noite (ao chegar)"],["Спокойной ночи","spakóinoi nótchi","boa noite (para dormir)"],
  ["Спасибо","spassíba","obrigado(a)"],["Пожалуйста","pajálusta","por favor / de nada"],["Извините","izvinítie","desculpe"],["Как дела?","kak dielá?","como vai?"]]},
 {id:"numeros", nome:"Números", icone:"🔢", palavras:[
  ["один","adín","um"],["два","dva","dois"],["три","tri","três"],["четыре","tchetýrie","quatro"],["пять","piat'","cinco"],
  ["шесть","shest'","seis"],["семь","siem'","sete"],["восемь","vósiem'","oito"],["девять","diévit'","nove"],["десять","diésit'","dez"],
  ["одиннадцать","adínnatsat'","onze"],["двенадцать","dvinádtsat'","doze"]]},
 {id:"cores", nome:"Cores", icone:"🎨", palavras:[
  ["красный","krásnyi","vermelho"],["синий","síni","azul"],["зелёный","zilióny","verde"],["жёлтый","jóltyi","amarelo"],
  ["белый","biélyi","branco"],["чёрный","tchórnyi","preto"],["серый","siéryi","cinza"],["оранжевый","aránjevyi","laranja"],
  ["розовый","rózavyi","rosa"],["фиолетовый","fialiétavyi","roxo"],["коричневый","karítchnievyi","marrom"],["голубой","galubói","azul-claro"]]},
 {id:"familia", nome:"Família", icone:"👨‍👩‍👧", palavras:[
  ["мама","máma","mamãe"],["папа","pápa","papai"],["брат","brat","irmão"],["сестра","sistrá","irmã"],["сын","syn","filho"],
  ["дочь","dotch'","filha"],["бабушка","bábushka","avó"],["дедушка","diédushka","avô"],["муж","mush","marido"],["жена","jená","esposa"],
  ["друг","druk","amigo"],["семья","simiá","família"]]},
 {id:"comida", nome:"Comida e bebida", icone:"🍞", palavras:[
  ["хлеб","khliép","pão"],["вода","vadá","água"],["молоко","malakó","leite"],["мясо","miássa","carne"],["рыба","rýba","peixe"],
  ["сыр","syr","queijo"],["яблоко","iábloka","maçã"],["картошка","kartóshka","batata"],["суп","sup","sopa"],["чай","tchai","chá"],
  ["кофе","kófie","café"],["сок","sok","suco"]]},
 {id:"viagem", nome:"Viagem", icone:"✈️", palavras:[
  ["аэропорт","aeropórt","aeroporto"],["билет","bilét","passagem / bilhete"],["паспорт","pásport","passaporte"],["отель","atiél'","hotel"],
  ["вокзал","vagzál","estação de trem"],["такси","taksí","táxi"],["карта","kárta","mapa"],["чемодан","tchimadán","mala"],
  ["город","górat","cidade"],["улица","úlitsa","rua"],["поезд","póiezd","trem"],["автобус","aftóbus","ônibus"]]},
 {id:"tempo", nome:"Tempo", icone:"⏰", palavras:[
  ["сегодня","sivódnia","hoje"],["завтра","záftra","amanhã"],["вчера","vtchirá","ontem"],["сейчас","seitchás","agora"],
  ["утро","útra","manhã"],["день","dien'","dia"],["вечер","viétcher","noite (início)"],["ночь","notch'","noite / madrugada"],
  ["неделя","nidiélia","semana"],["месяц","miéssiats","mês"],["год","got","ano"],["время","vriémia","tempo / hora"]]},
 {id:"basico", nome:"Palavrinhas do dia a dia", icone:"💬", palavras:[
  ["да","da","sim"],["нет","niet","não"],["я","ia","eu"],["ты","ty","tu / você (informal)"],["мы","my","nós"],["вы","vy","vocês / o senhor"],
  ["он","on","ele"],["она","aná","ela"],["где","gdie","onde"],["что","shto","o quê"],["почему","patchimú","por quê"],["хорошо","kharashó","bem / bom"]]},
 {id:"corpo", nome:"Corpo humano", icone:"🧍", palavras:[
  ["голова","galavá","cabeça"],["рука","ruká","mão / braço"],["нога","nagá","perna / pé"],["глаз","glaz","olho"],["ухо","ukha","orelha"],
  ["нос","nos","nariz"],["рот","rot","boca"],["сердце","sértse","coração"],["спина","spiná","costas"],["живот","jivót","barriga"],
  ["зуб","zup","dente"],["волосы","vólasy","cabelos"]]},
 {id:"casa", nome:"Casa", icone:"🏠", palavras:[
  ["дом","dom","casa"],["комната","kómnata","quarto / cômodo"],["кухня","kúkhnia","cozinha"],["окно","aknó","janela"],["дверь","dviér'","porta"],
  ["стол","stol","mesa"],["стул","stul","cadeira"],["кровать","kravát'","cama"],["ванная","vánnaia","banheiro"],["ключ","kliutch","chave"],
  ["лампа","lámpa","lâmpada"],["телефон","tilifón","telefone"]]},
 {id:"animais", nome:"Animais", icone:"🐻", palavras:[
  ["собака","sabáka","cachorro"],["кошка","kóshka","gata"],["птица","ptítsa","pássaro"],["лошадь","lóshat'","cavalo"],["корова","karóva","vaca"],
  ["свинья","svin'iá","porco"],["медведь","miedviét'","urso"],["волк","volk","lobo"],["заяц","záiats","coelho"],["лиса","lisá","raposa"],
  ["мышь","mysh","rato"],["курица","kúritsa","galinha"]]},
 {id:"verbos", nome:"Verbos comuns", icone:"🏃", palavras:[
  ["быть","byt'","ser / estar"],["делать","diélat'","fazer"],["идти","itti","ir (a pé)"],["говорить","gavarít'","falar"],["хотеть","khatiét'","querer"],
  ["знать","znat'","saber / conhecer"],["любить","liubít'","amar / gostar"],["видеть","vídiet'","ver"],["есть","iest'","comer"],["пить","pit'","beber"],
  ["жить","jit'","viver / morar"],["работать","rabótat'","trabalhar"]]},
 {id:"cidade", nome:"Cidade", icone:"🏙️", palavras:[
  ["магазин","magazín","loja"],["школа","shkóla","escola"],["больница","balnítsa","hospital"],["банк","bank","banco"],["ресторан","ristarán","restaurante"],
  ["парк","park","parque"],["церковь","tsérkaf'","igreja"],["рынок","rýnak","mercado / feira"],["аптека","aptiéka","farmácia"],["музей","muzêi","museu"],
  ["площадь","plóshat'","praça"],["мост","most","ponte"]]},
 {id:"frases", nome:"Frases úteis", icone:"🗣️", palavras:[
  ["Я не понимаю","ia nie panimáiu","eu não entendo"],["Говорите медленно","gavarítie miédlenna","fale devagar"],["Сколько стоит?","skól'ka stóit?","quanto custa?"],
  ["Где туалет?","gdie tualiét?","onde fica o banheiro?"],["Помогите!","pamagítie!","socorro!"],["Меня зовут…","minia zavút…","meu nome é…"],
  ["Я из Бразилии","ia iz brazílii","sou do Brasil"],["Я люблю тебя","ia liubliú tibiá","eu te amo"],["Приятно познакомиться","priiátna paznakómitsa","prazer em conhecer"],
  ["Я учу русский","ia utchú rúskii","estou aprendendo russo"],["Как вас зовут?","kak vas zavút?","como o senhor se chama?"],["Удачи!","udátchi!","boa sorte!"]]}
];

// Gramática: texto + perguntas [pergunta, resposta certa, [erradas...]]
const GRAMATICA = [
 {id:"generos", nome:"Gêneros", icone:"⚥", texto:[
  "Todo substantivo russo tem gênero. Dá para descobrir pela terminação.",
  "Masculino: termina em consoante (стол, дом, друг).",
  "Feminino: termina em -а ou -я (мама, книга, неделя).",
  "Neutro: termina em -о ou -е (окно, море, кофе)."],
  q:[["Qual o gênero de «стол» (mesa)?","masculino",["feminino","neutro"]],
     ["Qual o gênero de «мама»?","feminino",["masculino","neutro"]],
     ["Qual o gênero de «окно» (janela)?","neutro",["masculino","feminino"]],
     ["Qual o gênero de «книга» (livro)?","feminino",["masculino","neutro"]],
     ["Qual o gênero de «дом» (casa)?","masculino",["feminino","neutro"]]]},
 {id:"plural", nome:"Plural", icone:"➕", texto:[
  "Para formar o plural: masculino geralmente ganha -ы (стол → столы) ou -и depois de г, к, х, ж, ш, ч, щ.",
  "Feminino em -а troca por -ы/-и (книга → книги). Neutro em -о troca por -а (окно → окна).",
  "Algumas palavras são irregulares (дом → дома), mas a regra vale para a maioria."],
  q:[["Plural de «стол»?","столы",["стола","столи"]],
     ["Plural de «книга»?","книги",["книгы","книга"]],
     ["Plural de «окно»?","окна",["окны","окни"]],
     ["Plural de «дом»?","дома",["домы","доми"]],
     ["Plural de «мама»?","мамы",["мами","мама"]]]},
 {id:"ser", nome:"O verbo «ser» some", icone:"🫥", texto:[
  "No presente, o russo NÃO usa o verbo ser/estar. Basta juntar as palavras.",
  "«Я студент» = Eu (sou) estudante. «Он дома» = Ele (está) em casa.",
  "Na escrita, às vezes aparece um travessão: «Москва — столица»."],
  q:[["Como dizer «Eu sou brasileiro»?","Я бразилец",["Я есть бразилец","Я быть бразилец"]],
     ["«Она врач» significa…","Ela é médica",["Ela tem médica","Ela foi médica"]],
     ["Como dizer «Ele está em casa»?","Он дома",["Он есть дома","Он быть дома"]],
     ["«Мы друзья» significa…","Nós somos amigos",["Nós temos amigos","Nós vamos amigos"]]]},
 {id:"pronomes", nome:"Pronomes", icone:"🙋", texto:[
  "Я = eu · ты = tu (informal) · он = ele · она = ela · оно = ele/ela (neutro) · мы = nós · вы = vocês / o senhor(a) (formal) · они = eles/elas.",
  "Use «ты» com amigos e família; «вы» com desconhecidos e em situações respeitosas."],
  q:[["Como se diz «eu»?","я",["ты","мы"]],
     ["«мы» significa…","nós",["vocês","eles"]],
     ["Para falar com um desconhecido, use…","вы",["ты","он"]],
     ["«они» significa…","eles / elas",["nós","ele"]],
     ["«она» significa…","ela",["ele","eles"]]]},
 {id:"negacao", nome:"Negação", icone:"🚫", texto:[
  "Para negar um verbo, coloque «не» antes dele: «Я знаю» → «Я не знаю».",
  "«Нет» é o «não» da resposta curta: «Ты студент? — Нет.»"],
  q:[["Como dizer «Eu não sei»?","Я не знаю",["Я нет знаю","Нет я знаю"]],
     ["Para responder «não» sozinho, use…","нет",["не","ни"]],
     ["«Он не работает» significa…","Ele não trabalha",["Ele trabalha","Ele não é"]],
     ["«Мы не понимаем» significa…","Nós não entendemos",["Nós entendemos","Nós não falamos"]]]},
 {id:"perguntas", nome:"Perguntas", icone:"❓", texto:[
  "Кто? = quem? · Что? = o quê? · Где? = onde? · Когда? = quando? · Почему? = por quê? · Как? = como? · Сколько? = quanto?",
  "Para perguntas de sim/não basta mudar a entonação (subir no fim): «Ты студент?»."],
  q:[["«Где» significa…","onde",["quando","quem"]],
     ["«Когда» significa…","quando",["onde","como"]],
     ["«Кто» significa…","quem",["o quê","por quê"]],
     ["Como perguntar «Quanto custa?»","Сколько стоит?",["Где стоит?","Кто стоит?"]],
     ["«Почему» significa…","por quê",["como","quanto"]]]},
 {id:"casos", nome:"Casos básicos", icone:"🧩", texto:[
  "O russo muda o final das palavras conforme a função na frase (casos).",
  "Nominativo = sujeito (мама). Acusativo = objeto direto; feminino -а vira -у (Я люблю маму).",
  "Preposicional = lugar, com в/на + final -е: «в доме» (na casa), «в Москве» (em Moscou)."],
  q:[["«Я в Москве» significa…","Eu estou em Moscou",["Eu vou a Moscou","Eu amo Moscou"]],
     ["Para dizer «na casa», use…","в доме",["в дом","в дому"]],
     ["Acusativo de «мама» (objeto)","маму",["мама","маме"]],
     ["«Я люблю маму» significa…","Eu amo a mamãe",["A mamãe me ama","Eu sou a mamãe"]]]},
 {id:"ter", nome:"Eu tenho", icone:"🎁", texto:[
  "Russo não tem verbo «ter» no uso comum. Diz-se «У меня есть …» (literalmente: «junto de mim há …»).",
  "У меня = eu tenho · У тебя = você tem · У него = ele tem · У неё = ela tem · У нас = nós temos.",
  "Para negar: «У меня нет …» (eu não tenho)."],
  q:[["Como dizer «Eu tenho um irmão»?","У меня есть брат",["Я иметь брат","Я есть брат"]],
     ["«У неё есть сестра» significa…","Ela tem uma irmã",["Ela é irmã","Ela não tem irmã"]],
     ["Como dizer «Eu não tenho tempo»?","У меня нет времени",["Я не есть время","У меня есть нет"]],
     ["«У нас» significa…","nós temos",["eles têm","ele tem"]]]}
];
