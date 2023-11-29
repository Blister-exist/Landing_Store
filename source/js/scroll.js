let item = document.getElementsByClassName('hero__frame')[0];               //объект фрейма
let content = document.getElementsByClassName('hero__frame--content')[0];

let scrollFunc = function(){                                                //функция скролла                                       

//====================скроллить фрейм до 3500 пикселя=======================    
    if (window.pageYOffset <= 2448){
        item.scrollTo(0, window.pageYOffset);
    };

//====================управление прозрачностью и блюром=======================   сделать красиво!!!
    if ((window.pageYOffset > 1) && (window.pageYOffset < 300)){                //с 1 по 300 пиксель скролла
        item.style.opacity = `${1.3-((window.pageYOffset*0.3)/100)}`;           //плавное уменьшение прозрачности
        content.style.filter = `blur(${window.pageYOffset/200}px)`;             //увеличение размытия
    }
    else if ((window.pageYOffset >= 300) && (window.pageYOffset < 2148)){       //потом держим размытие и прозрачность
        item.style.opacity = '0.3';
        content.style.filter = `blur(2px)`;
    }
    else if ((window.pageYOffset >= 2148) && (window.pageYOffset < 2448)){      //плавно возрващаем на 1248 - 2448 пикселях
        item.style.opacity = `${(((window.pageYOffset-2148)*0.3)/100)+0.3}`;
        content.style.filter = `blur(${1-(window.pageYOffset/500)}px)`;
    }
    else if ((window.pageYOffset > 2448)){                                      //после все в дефолт
        item.style.opacity = '1';
        content.style.filter = 'blur(0px)';
    }

//============перемещение фрейма при скролле страницы до 2448 пикселя===============
    if ((window.pageYOffset>=145) && (window.pageYOffset <= 2600)){
        item.style.position = 'fixed';
        item.style.left = '11.35%';
        item.style.top = '17px';
    }
    else if ((window.pageYOffset >= 2600) && (window.pageYOffset <= 3500)){ //потом фрейм замирает во второй рамке
        item.style.position = 'relative';
        item.style.left = '9%';
        item.style.top = '2450px';
    }
    else {                                                                  //иначе фрейм в дефорт
        item.style.position = 'relative';
        item.style.left = '9%';
        item.style.top = '18px';
    };
};

window.addEventListener('scroll', scrollFunc)
