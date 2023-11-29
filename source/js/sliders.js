const step = 100;           //шаг сдвига слайда (физически в % блока)

const SLIDER = function() {             //Констуркор слайдера
    this.units = [];
    this.arrows = {
        left: undefined,
        right: undefined
    };
    this.interval = undefined;

//---------------------------------------------------------
//  Фактический список атрибутов объекта SLIDER:
//
//  item - DOM объект слайдера
//  time - период автосвайпа
//  interval - идентификатор периода
//  units - список слайдов
//      item - DOM объект слайда
//      position - координаты слайда
//          xPos- текущая по x
//          yPos- текущая по y
//          zPos- текущая по z
//          startPos- крайнее правое положение
//          endPos- крайнее левое положение
//      parent - родительский блок слайдера
//      bullit - связанный буллит
//  item - DOM объект самого слайдера
//  arrow - объект стрелок
//      left - левая стрелка
//      right - правая стрелка  
//--------------------------------------------------------
    this.init = function(name, time){                                         //функция инициализации (передавать id слайдера)

        //определяем состав объекта
        this.item = document.getElementById(name);                      //определение конкретного слайдера
        this.time = time;
        let slides = document.getElementsByClassName('exmp__block');    //получить массив слайдов
        for (elem in slides){                                           
            if (slides[elem].parentNode === this.item){
                this.units.push({                                       //значения полей в шапке
                    item: slides[elem],                                 //
                    position: {                                         //координаты в виде структуры
                        xPos: 0,                                        //вычисление начальных координат
                        yPos: 0,
                        zPos: 0,
                        startPos: undefined,                            //крайняя правая координата
                        endPos: undefined                               //крайняя левая координата
                    },
                    parent: slides[elem].parentNode,                    //получение слайдера
                    bullit: undefined
                });
            };
        };

        //размещаем элементы согласно позиций
        for (elem in this.units){                                                           //повторно проходим по сформированному списку
            this.units[elem].position.startPos = this.units[elem].position.xPos = elem*100; //устанавливаем стартовое положение и текущее положение
            this.units[elem].position.endPos = elem*100-(this.units.length-1)*100;          //вычисляем конечную позицию слайда
            this.units[elem].item.style.left = `${this.units[elem].position.xPos}%`;        //устанавливаем на странице слайд
        };

        //получаем объекты стрелок
        let arrowsLeft = document.getElementsByClassName('galery__arrow--left');            //массивы стрелок документа
        let arrowsRight = document.getElementsByClassName('galery__arrow--right');
        for (elem in arrowsLeft){
            if (arrowsLeft[elem].parentNode === this.item){;                                //циклом фильтруем относящиеся к этому слайдеру
                this.arrows.left = arrowsLeft[elem];                                        //передаем в атрибут объекта
            };
        };
        for (elem in arrowsRight){                                                          //аналогично для правых стрелок
            if (arrowsRight[elem].parentNode === this.item){
                this.arrows.right = arrowsRight[elem];
            };
        };
        //!!!ВЫЯСНИТЬ ПОЧЕМУ В ТРЕТЬЕМ СЛАЙДЕРЕ КНОПКИ РАБОТАЮТ НАОБОРОТ И УБРАТЬ CSS костыль (style.css line 471)!!!!
        this.arrows.left.addEventListener('click', this.shiftSlideLeft);
        this.arrows.right.addEventListener('click', this.shiftSlideRight);
    };

    //определяем методы объекта
    this.shiftSlideLeft = () => {                                       //метод сдвига слайдов ВЛЕВО
        for (elem in this.units){                                                       
            if (this.units[elem].position.xPos === this.units[elem].position.endPos){   //если блок максимально слева
                this.units[elem].position.xPos = this.units[elem].position.startPos;    //обнуляем позицию    
            }
            else this.units[elem].position.xPos -= step;                                //иначе уменьшаем позицию по x на шаг
            this.units[elem].item.style.left = `${this.units[elem].position.xPos}%`     
        };
    };

    this.shiftSlideRight = () => {                                                      //метод сдвига слайдов ВПРАВО
        for (elem in this.units){                                                       
            if (this.units[elem].position.xPos === this.units[elem].position.startPos){ //если блок максимально справа
                this.units[elem].position.xPos = this.units[elem].position.endPos;      //сдвигаем в конечную позицию
            }
            else this.units[elem].position.xPos += step;                                //иначе увелициваем позицию по x на шаг 
            this.units[elem].item.style.left = `${this.units[elem].position.xPos}%`      
        };
    };
    
    this.autoSwipe = function(){                                                    //метод автолистания слайдов
        this.interval = setInterval(this.shiftSlideLeft, this.time);                //каждые time секунд сдвигать слайды влево
    };
};

let firstSlider = new SLIDER()          //создание слайдера
firstSlider.init('firstSlider', 8000);        //инициалицация слайдера

let secondSlider = new SLIDER();
secondSlider.init('secondSlider',8000);

let thirdSlider = new SLIDER();
thirdSlider.init('thirdSlider', 8000);

firstSlider.autoSwipe();            //запуск автоперелистывания
secondSlider.autoSwipe();
thirdSlider.autoSwipe();