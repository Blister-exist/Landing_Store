const exmp1 = {                                            //глобальный объект
    step: 100,                                              //шаг сдвига (100% т.е. ширина блока)

    leftArrow: document.getElementById('exmp1-left'),      //объект левой стрелки
    rightArrow: document.getElementById('exmp1-right'),    //объект правой стрелки

    units: [                                                //объект содержащий объекты слайдов
        {
        item: document.getElementById('e1-1'),
        startPos: 0,
        endPos: -100,
        curPos: 0,
        bullit: document.getElementById('bul_ex1_1')
        },
        {
        item: document.getElementById('e1-2'),
        startPos: 100,
        endPos: 0,
        curPos: 100,
        bullit: document.getElementById('bul_ex1_2')
        }
    ],


    changeSlideAuto: function(){                        //метод объекта автоматически листающий слайды
        setInterval(() => {                             //функция повторяющая перелистывание через (см. строка 52)    
            for (item in this.units){                   //Проходим циклом по слайдам (считает индексы)
                let obj = this.units[item];             //получаем объект по индексу
                if (obj.curPos <= obj.endPos){          //если текущая позиция меньше или равна конечной
                    obj.curPos = obj.startPos;          //устанавливаем стартовую
                }
                else{                                   //инача
                    obj.curPos -= this.step;            //уменьшаем позицию на шаг (свайп вправо)
                }

                if (obj.curPos === 0){
                    obj.bullit.style.opacity = '1';
                }
                else{
                    obj.bullit.style.opacity = '0.5';
                }
    
                this.units[item].item.style.left = `${obj.curPos}%`;    //устанавливаем left в нужное значение для сдвига слайда
            }
        }, 8000);                                       //интервал повторения в мс
    },

    changeSideManual: function(eventer){            //метод перелистывания стрелками (аргумент - объект вызвавший метод стр79,80)
        if (eventer === this.rightArrow){           //если объект - правая стрелка
            for (item in this.units){               //проходим циклом по слайдам (считает индексы)
                let obj = this.units[item];         //получаем объект слайда по индексу
                if (obj.curPos <= obj.endPos){      //если текущая позиция меньше или равна конечной 
                    break;                          //ничего не делаем
                }
                else{
                    obj.curPos -= this.step;        //вычитаем из текущей позиции шаг         
                }
            this.units[item].item.style.left = `${obj.curPos}%`;    //пишем в left текушаю позицию
            }
        }
        else if (eventer === this.leftArrow){       //по аналогии с правой только сдель левая стрелка
            for (item in this.units){
                let obj = this.units[item];
                if (obj.curPos >= obj.startPos){    //поэтому текущаю позицию сравниваем со стартовой чтоб не листнуть лишнего    
                    break;
                }
                else{
                    obj.curPos += this.step;        //прибавсяем шаг (свайп влево)
                }
            this.units[item].item.style.left = `${obj.curPos}%`;    
            }
        }
    }
}

exmp1.leftArrow.addEventListener('click', () => exmp1.changeSideManual(exmp1.leftArrow));    //обработчики нажатия на стрелку
exmp1.rightArrow.addEventListener('click', () => exmp1.changeSideManual(exmp1.rightArrow));

exmp1.changeSlideAuto();