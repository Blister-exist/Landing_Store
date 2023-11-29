//==========================================tabs======================================

const tabs = {                   //глобальный объект таба

    units: [                    //массив объектов для каждого таба
        {
            item: document.getElementById('t-1'),       //сама карточка
            state: 1,                                   //её состояние (0-отображена, 100-нет)
            btn: document.getElementById('btn-t-1')     //связанная с ней кнопка
        },
        {
            item: document.getElementById('t-2'),       //сама карточка
            state: -1,                                   //её состояние (1-отображена, 100-нет)
            btn: document.getElementById('btn-t-2')     //связанная с ней кнопка
        },
        {
            item: document.getElementById('t-3'),       //сама карточка
            state: -1,                                   //её состояние (1-отображена, 100-нет)
            btn: document.getElementById('btn-t-3')     //связанная с ней кнопка
        },
        {
            item: document.getElementById('t-4'),       //сама карточка
            state: -1,                                   //её состояние (1-отображена, 100-нет)
            btn: document.getElementById('btn-t-4'),     //связанная с ней кнопка
        },
    ],

    init: function(){
        for(index = 0; index < this.units.length; index++){
            this.units[index].btn.addEventListener('click', this.changeTab);
        }
    },
    
    changeTab: function(event) {                    //event - событие нажатие на кнопку
        for (elem in tabs.units){                   //проходим циклом по units
            obj = tabs.units[elem];                 //получаем объект таба
            if (obj.btn === event.target){      //если кнопка вызвавшая событие это кнопка нужного таба
                obj.state = 1;                      //состояние - отображен
                obj.item.style.zIndex = `${obj.state}`;
                obj.item.classList.add('tab-animation-unfade');
                obj.item.addEventListener("animationend", function(event){event.target.classList.remove('tab-animation-unfade');})
            }
            else{
                obj.state = -1;                     //иначе состояние скрыт
                obj.item.style.zIndex = `${obj.state}`;
            }
        }
    }
};

tabs.init();