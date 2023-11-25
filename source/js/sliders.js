const step = 100;           //шаг сдвига слайда (физически в % блока)

const SLIDER = function() {             //Констуркор слайдера
    this.units = [];                    //массив объектов элементов слайдера
    this.init = function(name){                                         //функция инициализации (передавать id слайдера)

        //определяем состав объекта
        this.item = document.getElementById(name);                      //определение конкретного слайдера
        let slides = document.getElementsByClassName('exmp__block');    //получить массив слайдов
        for (elem in slides){                                           //цикл записи слайдов
            if (slides[elem].parentNode === this.item){
                this.units.push({                                       //в units каждую итерацию записать
                    item: slides[elem],                                 //html объект
                    position: {                                         //координаты в виде структуры
                        xPos: 0,                                        //вычисление начальных координат
                        yPos: 0,
                        zPos: 0,
                        startPos: undefined,                            //минимальные координаты изначально равны xPos
                        endPos: undefined
                    },
                    parent: slides[elem].parentNode,                    //получение слайдера
                });
            };
        };

        //размещаем элементы согласно позиций
        for (elem in this.units){                                                           //повторно проходим по сформированному списку
            this.units[elem].position.startPos = this.units[elem].position.xPos = elem*100; //устанавливаем стартовое положение и текущее положение
            this.units[elem].position.endPos = elem*100-(this.units.length-1)*100;          //вычисляем конечную позицию слайда
            this.units[elem].item.style.left = `${this.units[elem].position.xPos}%`;        //устанавливаем на странице слайд
        };

    };

    //определяем методы объекта
    this.shiftSlideLeft = () => {                                                       //метод сдвига слайдов ВЛЕВО  
        for (elem in this.units){                                                       //пройти по всем слайдам
            if (this.units[elem].position.xPos === this.units[elem].position.endPos){   //если блок максимально слева
                this.units[elem].position.xPos = this.units[elem].position.startPos;    //обнуляем позицию    
            }
            else this.units[elem].position.xPos -= step;                                //иначе уменьшаем позицию по x на шаг
            this.units[elem].item.style.left = `${this.units[elem].position.xPos}%`     //передаем позицию html объекту
        };
    };

    this.shiftSlideRight = () => {                                                      //метод сдвига слайдов ВПРАВО
        for (elem in this.units){                                                       //пройти по всем слайдам
            if (this.units[elem].position.xPos === this.units[elem].position.startPos){ //если блок максимально справа
                this.units[elem].position.xPos = this.units[elem].position.endPos;      //сдвигаем в конечную позицию
            }
            else this.units[elem].position.xPos += step;                                 //иначе увелициваем позицию по x на шаг 
            this.units[elem].item.style.left = `${this.units[elem].position.xPos}%`      //передаем позицию html объекту
        };
    };
    
    this.autoSwipe = function(time){                                                        //метод автолистания слайдов
        setInterval(this.shiftSlideLeft, time);                                         //каждые 5сек сдвигать слайды влево
    };
};

let firstSlider = new SLIDER()
firstSlider.init('firstSlider');

let secondSlider = new SLIDER();
secondSlider.init('secondSlider');

let thirdSlider = new SLIDER();
thirdSlider.init('thirdSlider');

firstSlider.autoSwipe(5500);
secondSlider.autoSwipe(6200);
thirdSlider.autoSwipe(5800);