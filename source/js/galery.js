//=========================slider=========================


const galery = {                                            //глобальный объект
    step: 100,                                              //шаг сдвига (100% т.е. ширина блока)

    leftArrow: document.getElementById('galery-left'),      //объект левой стрелки
    rightArrow: document.getElementById('galery-right'),    //объект правой стрелки

    units: [                                                //объект содержащий объекты слайдов
        {
        item: document.getElementById('b-1'),               //сам html объект
        startPos: 0,                                        //старновая позиция
        endPos: -300,                                       //конечная позиция
        curPos: 0,                                          //текукщая позиция (!!!здесь всегда равна стартовой!!!)
        bullit: document.getElementById('bul_g_1')
        },
        {
        item: document.getElementById('b-2'),               //остальные по аналогии
        startPos: 100,
        endPos: -200,                                       //при добавлении нового слайда
        curPos: 100,                                        //добавить новый объект по этоим шаблонам
        bullit: document.getElementById('bul_g_2')
        },                                                  //не забыть указать старт текущий и конечный 
        {
        item: document.getElementById('b-3'),
        startPos: 200,
        endPos: -100,
        curPos: 200,
        bullit: document.getElementById('bul_g_3')
        },
        {
        item: document.getElementById('b-4'),
        startPos: 300,
        endPos: 0,
        curPos: 300,
        bullit: document.getElementById('bul_g_4')
        },
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
    
                this.units[item].item.style.left = `${obj.curPos}%`;    //устанавливаем left в нужное значение для сдвига слайда

                if (obj.curPos === 0){
                    obj.bullit.style.opacity = '1';
                }
                else{
                    obj.bullit.style.opacity = '0.5';
                }
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

galery.leftArrow.addEventListener('click', () => galery.changeSideManual(galery.leftArrow));    //обработчики нажатия на стрелку
galery.rightArrow.addEventListener('click', () => galery.changeSideManual(galery.rightArrow));

galery.changeSlideAuto();                       //запускаем автосвайп


// const SLIDES = {
    
//     STEP: 100,

//     exmp: {
//         count: 2,
//         arrows: {},
//         interval: 7000,
//         units: {
//             e1: {
//                 item: document.getElementById('e-1'),
//                 curPos: 0,                                      //начальное положение
//                 left: undefined,
//                 right: this.e2,
//             },
//             e2: {
//                 item: document.getElementById('e-2'),
//                 curPos: 100,
//                 left: this.e1,
//                 right: undefined
//             },
//         }
//     },

//     exmp2: {
//         count: 2,
//         arrows: {},
//         interval: 6000,
//         units: {
//             e1: {
//                 item: document.getElementById('e1-1'),
//                 curPos: 0,
//                 left: undefined,
//                 right: this.e2,
//             },
//             e2: {
//                 item: document.getElementById('e2-2'),
//                 curPos: 0,
//                 left: this.e1,
//                 right: undefined
//             },
//         }
//     },

//     galery: {
//         count: 4,
//         arrows: {
//             leftArrow: document.getElementById('galery-left'),            //объект левой стрелки
//             rightArrow: document.getElementById('galery-right'),          //объект правой стрелки
//         }, 
//         interval: 2000,
//         units: {
//             b1: {
//                 item: document.getElementById('b-1'),
//                 curPos: 0,
//                 left: undefined,
//                 right: this.b2
//             },
//             b2: {
//                 item: document.getElementById('b-2'),
//                 curPos: 100,
//                 left: console.log(this.b1),
//                 right: this.b3,
//             },
//             b3: {
//                 item: document.getElementById('b-3'),
//                 curPos: 200,
//                 left: this.b2,
//                 right: this.b4,
//             },
//             b4: {
//                 item: document.getElementById('b-4'),
//                 curPos: 300,
//                 left: this.b3,
//                 right: undefined
//             }
//         }
//     },

//     getExtremePos: function (object){               //поиск конечной координаты(передать нужную галерею)\
//         return (object.count-1)*this.STEP           //вычисляем крайние координаты слайдера
//     },

//     getFirstUnit: function(object){                         //получение первого слайда в слайдере
//         for(key in object.units){                           //проходим циклом по юнитам
//             if (object.units[key].left === undefined){      //если слева ничего нет 
//                return object.units[key];                    //то он и есть первый
//             }
//         }
//     },

//     changePos: function(object, extremePos){                //рекурсивное вычиление новой позиции (передавать первый слайд)
//         if (object.curPos !== extremePos[0]){
//             object.curPos -= this.STEP;
//         }
//         if (object.right === undefined){                        //если справа кто-то есть
//             console.log('это крайний')
//         }
//         else{
//             return (this.changePos(object.right, extremePos))   //вызвать эту функцию для правого
//         }
//     },

//     swipe: function(object){
//         for (elem in object.units){
//             object.units[elem].item.style.left = `${object.units[elem].item.curPos}%`;
//         }
//     },

//     changeSlidesAuto: function (object){
//         console.log('changeSlidesAuto')
//         setInterval(() => {
//             extremePos = [-this.getExtremePos(object), this.getExtremePos(object)];
//             firstUnit = this.getFirstUnit(object);
//             this.changePos(firstUnit, extremePos);
//             this.swipe(object);
//         }, object.interval)
//     }
// }

// SLIDES.changeSlidesAuto(SLIDES.galery);