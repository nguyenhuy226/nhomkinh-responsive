console.log('Hello CFD');
// validate form footer 

// Đối tượng
function Validator(options) {

    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement
            }
            element = element.parentElement
        }
    }

    let selectorRules = {}
    // hàm xử lý 
    function validate(inputElement,rule) {
        const errorElement = getParent(inputElement, options.formGroundSelector).querySelector(options.errorSelector)
        let errorMessage;

        // lấy ra các rule của selector
        const rules = selectorRules[rule.selector];

        // lặp qua từng rule ( check )
        for(let i = 0; i < rules.length ; i++ ) {
            switch (inputElement.type) {
                case 'radio':
                    errorMessage = rules[i](formElement.querySelector(rule.selector + ':checked'))
                    break
                case 'checkbox':
                    if (!input.matches(':checked')) {
                        values[input.name] = ''
                        return values
                    }

                    if (!Array.isArray(values[input.name])) {
                        values[input.name] = []
                    }

                    values[input.name].push(input.value)

                    break
                case 'file':
                    values[input.name] = input.files
                default:
                    errorMessage = rules[i](inputElement.value)
            }
            // nếu có lỗi thì dừng lặp 
            if(errorMessage) break;
        }
        
        if(errorMessage) {
            errorElement.innerText = errorMessage
            getParent(inputElement, options.formGroundSelector).classList.add('invalid')
        } else {
            errorElement.innerText = ''
            getParent(inputElement, options.formGroundSelector).classList.remove('invalid')

        }
        return !!errorMessage
    }
    let formElement = document.querySelector(options.form);
    if(formElement) {
        //khi submit form
        formElement.onsubmit = function(e) {
            e.preventDefault()

            let isFormValid = true
            // lặp qua từng rule  và validate
            options.rules.forEach(function(rule) {
                const inputElement = formElement.querySelector(rule.selector);
                const isValid = validate(inputElement, rule);
                if(isValid) {
                    isFormValid = false;
                }
            })
            if(isFormValid) {
                // trường hợp với js
                if(typeof options.onSubmit === 'function') {
                    const enableInputs = formElement.querySelectorAll('[name]')
                    const formValues = Array.from(enableInputs).reduce(function(values,input) {
                        switch (input.type) {
                            case 'radio':
                            case 'checkbox':
                                if (input.matches(':checked')) {
                                    values[input.name] = formElement.querySelector(
                                        'input[name="' + input.name + '"]:checked'
                                    ).value
                                } else {
                                    values[input.name] = ''
                                }
                                break
                            default:
                                values[input.name] = input.value
                        }
                        return values;
                    }, {});
                    options.onSubmit(formValues)
                } else {
                    // trường hợp submit với hành vi mặc định
                    formElement.onsubmit()
                }
            }

        }
        // lặp qua mỗi rule và xử lý 
        options.rules.forEach( function(rule) {
            
            // lưu lại  các rule cho mỗi input
            if(Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test)
            } else {
                selectorRules[rule.selector] = [rule.test];
            }    
            
            var inputElements = formElement.querySelectorAll(rule.selector)
            Array.from(inputElements).forEach(function(inputElement) {
                // xử lý trường hợp blur ra khỏi input
                inputElement.onblur = function() {
                    validate(inputElement,rule)
                }
                // xử lý khi nhập vào input
                inputElement.oninput = function() {
                    const errorElement = getParent(inputElement, options.formGroundSelector).querySelector(options.errorSelector)
                    errorElement.innerText = ''
                    getParent(inputElement, options.formGroundSelector).classList.remove('invalid')    
                }
            })
       })
    }
}



// Định nghĩa các rules
Validator.isRequired = function(selector, message) {
    return {
        selector,
        test: function (value) {
            return value ? undefined : message || 'Vui lòng nhập trường này'
        }
    }
}

Validator.isEmail = function(selector, message) {
    return {
        selector,
        test: function (value) {
            const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            return regex.test(value) ? undefined : message || 'Vui lòng nhập đúng email'
        }
    }
}

Validator.isPhone = function (selector , min , message) {
    return {
        selector,
        test : function (value) {
           
            return value.length == min ? undefined :  message || 'Vui lòng nhập đúng SĐT'     
        }
    }
}



let $involve =$('.involve__items')
$involve.flickity({
    cellAlign:'left',
    contain: true,
    wrapAround: true,
    pageDots : false,
})
$('.involve__btn.prev').on('click' , function() {
    $involve.flickity('previous');
    
})
$('.involve__btn.next').on('click' , function() {
    $involve.flickity('next')
})  

let $product = $('.product__items')
$product.flickity({
    cellAlign:'right',
    contain: true,  
    wrapAround: true,
    pageDots : true,
})
$('.product__btn.prev').on('click' , function() {
    $product.flickity('previous');
    
})
$('.product__btn.next').on('click' , function() {
    $product.flickity('next')
})  



/// xử lý trang process

let processText = Array.from(document.querySelectorAll('.process__item-text'))
let processIcon = Array.from(document.querySelectorAll('.process__item-icon'))
let widthCurent = 0
processIcon.map((icon,index) => {
    icon.addEventListener('click' ,function() {
        process(index);
        for (let i = 0 ; i <= processIcon.length; i++) {
            console.log( processIcon[i])
            if(i <= index) {
                setTimeout(() => {
                    processText[i].classList.add('active')
                    processIcon[i].classList.add('active')
                },(100*index))
            } else {
                processText[i].classList.remove('active')
                processIcon[i].classList.remove('active')
            }
        }

        // console.log(processIcon[index])

    })
    
})
processText.map((item,index) => {
    item.addEventListener('click' , function() {
        process(index)
        for (let i = 0 ; i <= processIcon.length; i++) {
            console.log( processIcon[i])
            if(i <= index) {
                setTimeout(() => {
                    processText[i].classList.add('active')
                    processIcon[i].classList.add('active')
                },(100*index))
            } else {
                processText[i].classList.remove('active')
                processIcon[i].classList.remove('active')
            }
        }
    })
})

let process = function(index) {
    let elem = document.querySelector(".process__line-run"); 
        let width;
        if(index == 5) {
            width = (100/6) * (index + 1 );
        } else {
            width = ((100/6) * (index + 1 )) - (100 / 12);
        }
        var up = setInterval(frame, 10);
        var down = setInterval(down, 10);
        function frame() {
          if (widthCurent <= width) {
              widthCurent++ 
              elem.style.width = widthCurent + '%';
            } else {
                clearInterval(up);
            }
        }  
        function down() {
            if(widthCurent > width) {
                widthCurent--
                elem.style.width = widthCurent + '%'
            } else {
                clearInterval(down)
            }
        }
}


//xử lý to top
let backtotop = document.querySelector('.backtotop');
let getHeightWindow = window.innerHeight;
document.addEventListener('scroll', function() {
    let scrollY = window.pageYOffset;
    if(scrollY > getHeightWindow) {
        backtotop.classList.add('active')
    } else {
        backtotop.classList.remove('active')
    }
})
backtotop.addEventListener('click' , function() {
    window.scrollTo({
        top: 0 ,
        behavior: 'smooth'
    })
})