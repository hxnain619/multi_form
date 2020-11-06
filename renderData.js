let Questions = []
let ANSWERS = []
let form = document.getElementById('msform');
let field = document.getElementsByTagName('fieldset');
let opt_elem = document.getElementsByClassName('options');
let alert = document.getElementById('message');
let close = document.getElementsByClassName('fa-close')[0];

window.addEventListener('load', () => {
    loadQuestion();
    RenderQuestion();
})

const loadQuestion = () => {
    form.innerHTML = ' ';
    Questions = []
    DATA.question.map(queries => {
        Questions.push(queries);
    })
}

const RenderQuestion = () => {
    Questions.forEach((Data, i) => {
        if (Data.type == 'option') {
            let opt = Data.options.map((option, index) => {

                return (`<div class="col col-sm-6 options" onclick=${Data.first ? "SelectedOption(event)" : "SelectedAnswer(event)"} data-index="${Data.id}" data-name="${option.title}" data-icon="${option.icon}" data-query="${Data.title}">
                    <span class="tick"><i class="fa fa-check-circle" ></i> </span>
                    <span class="alpha"> ${index == 0 ? "A" : index == 1 ? "B" : index == 2 ? "C" : index == 3 ? "D" : null } </span>
                     <img src=${option.icon} />
                     <h2 class="title_head"> ${option.title} </h2>
                 </div>`)
            }).join('')

            form.innerHTML += `<fieldset data-elem="${i}" >
            <h2 class="fs-title"> ${Data.title} </h2>
            <h3 class="fs-subtitle"> ${Data.desc} </h3>
            <div class="row">
                 ${opt}
            </div>
            ${Data.first ? '<input type="button" name="next" class="next action-button" value="nächste" />' : 
            '<input type="button" name="previous" class="previous action-button" value="vorherige"> <input type="button" name="next" class="next action-button" value="nächste" />'}
            </fieldset >`
        } else
        if (Data.type == "number") {

            form.innerHTML += `<fieldset data-elem="number">
            <h2 class="fs-title"> ${Data.title} </h2>
            <h3 class="fs-subtitle"> ${Data.desc} </h3>
            <div class="row">
                <input type="number" placeholder="Biespiel: 81373" id="state_num" min="10000" max="99999" data-query="${Data.title}" data-index="${Data.id}" onchange="AddFormAnswer(event)"/>
            </div>
            <input type="button" name="previous" class="previous action-button" value="vorherige">
            <input type="button" name="next" class="next action-button" value="nächste" />
            </fieldset >`

        } else 
        if (Data.type == 'form' && Data.last) {

            form.innerHTML += `<fieldset data-elem="true">
            <div class="row" >
            <h1 class="fs-title" > Vielen Dank! Wer soll die gratis Verkaufspreis-Schätzung erhalten? </h1>
            <div class="col col-sm-12 col-md-6 col-lg-6" >
                <div class="radio-parent" >
                    <span class="radio">
                    <input type="radio" name='gender' class="gender" checked="true" />  
                     Herr
                    </span>
            
                    <span class="radio">
                    <input type="radio" name='gender' class="gender"/>  
                    Frau  
                    </span>
                </div>
                <br />
                
                <label for="fName" >Vorname  </label>
                <input type='text' placeholder='Max' name="fName" id="fNAme"/>
                <br />
                
                <label for="lName"> Nachname </label>
                <input type='text' placeholder='Mustermann' name="lName" id="lName" />
                
                <br />
                <label for="email" >Ihre Email-Adresse </label> 
                <input type='email' placeholder='mustermann@mustermann.de' name="email" id="email" />
                <br />
                <label for="tel">Telefonnummer </label> 
                <input type='phone' placeholder='0176/12345678' name="tel" id="tel" />

            <span class="check"> 
                <input type='checkbox' name='i accept' id="check" /> 
                <p>
                   Dieser Service ist kostenfrei für Sie. Mit
                   Klick auf "Verkaufspreis-Schätzung
                   erhalten" stimmen Sie unserer
                   <a href="https://wertermittlung.baierl-immobilien.de/datenschutz-seite" target="_blank"> Datenschutzerklärung </a> zu und einer
                   Kontaktaufnahme per E-Mail oder Telefon
                   (Widerruf jederzeit möglich). 
                </p>
            </span>

            </div>
            <div class="col col-sm-12 col-md-6 col-lg-6 last-page">
                <img src='https://i.ibb.co/xfcf37w/Map.png' height='120px' width='120px' /> <br />
                <button type="button" id="submit" class="submit" >
                    Verkaufspreis-Schätzung erhalten <br /> kostenlos und unverbindlich 
                </button>
                </div>
            </div>
            </fieldset >`

        }
    })
    if (form.childElementCount > 1) {
        AssignFunc()
    }
}

const CheckAndMarkSelected = (inc) => {
    let elem = document.getElementsByClassName('options');
    let tick = document.getElementsByClassName('tick');
    let alpha = document.getElementsByClassName('alpha');

    
    for (let i = 0; i < elem.length; i++) {
        ANSWERS.forEach(answer => {

            if (answer.title === elem[i].getAttribute('data-name') && answer.index == elem[i].getAttribute('data-index') && !elem[i].classList.contains('selected')) {
                elem[i].classList.add('selected');
                tick[i].style.display = 'block';
                if (alpha.length > 0) {
                    alpha[i].style.background = "#00afff";
                    alpha[i].style.color = "white";
                }
            }
            if (elem[i].classList.contains('selected') && answer.title !== elem[i].getAttribute('data-name') && answer.index == elem[i].getAttribute('data-index')) {
                elem[i].classList.remove('selected');
                tick[i].style.display = 'none';
                if (alpha.length > 0) {
                    alpha[i].style.background = "white";
                    alpha[i].style.color = "#00afff";
                }
            }
        })
    }
}

const AddFormAnswer = (e) => {
    e.preventDefault();
    let query = e.currentTarget.getAttribute('data-query');
    let id = e.currentTarget.getAttribute('data-index');
    let parentID = e.currentTarget.parentElement.parentElement.getAttribute('data-index');
    let title = e.currentTarget.value;

    if (Number(title) > 10000 && Number(title) < 99999) {
        
        AddAnswers(query, '', title, id, parentID);
    } else {
        Alert("Der eingegebene Wert ist nicht korrekt", "#960101")
    }
}

const SelectedAnswer = (e) => {
    e.preventDefault();
    let {
        parentElement
    } = e.currentTarget.parentElement;

    let query = e.currentTarget.getAttribute("data-query");
    let icon = e.currentTarget.getAttribute("data-icon");
    let title = e.currentTarget.getAttribute("data-name");
    let id = e.currentTarget.getAttribute("data-index");
    let parentID = e.currentTarget.parentElement.parentElement.getAttribute("data-elem");
    
    AddAnswers(query, icon, title, id, parentID)
    CheckAndMarkSelected()
    parentElement.lastElementChild.click()
}

const AddAnswers = (query, img, name, id, parentID) => {
        
    let found = ANSWERS.findIndex((answer) => answer.index === id && answer.question === query);
    if (ANSWERS.length !== 0) {
        if (found > -1) {
            ANSWERS[found].title = name;
            ANSWERS[found].icon = img;
            ANSWERS[found].index = id;
            ANSWERS[found].question = query;
            ANSWERS[found].parentID = parentID
        } else {
            ANSWERS.push({
                question: query,
                title: name,
                index: id,
                icon: img,
                parentID
            });
        }
    } else {
        ANSWERS.push({
            question: query,
            title: name,
            index: id,
            icon: img,
            parentID
        });
    }
    console.log(ANSWERS);
    
}

const SelectedOption = (e => {
    ANSWERS = []
    e.preventDefault();
    let {
        parentElement
    } = e.currentTarget.parentElement;

    let query = e.currentTarget.getAttribute("data-query");
    let icon = e.currentTarget.getAttribute("data-icon");
    let title = e.currentTarget.getAttribute("data-name");
    let id = e.currentTarget.getAttribute("data-index");
    let parentID = e.currentTarget.parentElement.parentElement.getAttribute("data-elem");

    AddAnswers(query, icon, title, id, parentID)
    loadQuestion()
    Questions[0].options.map(option => {
        if (option.title === title) {
            option.query.sort((a, b) => b.id - a.id).forEach(data => {
                Questions.splice(1, 0, data);
            })
        }
    })
    RenderQuestion()
    CheckAndMarkSelected()
    parentElement.lastElementChild.click()
})

const ValidateAnswers = (index) => {
    let validate = true;
    
    if (ANSWERS.length !== index+1 && ANSWERS.length < index+1) {
        validate = false
    }
    return validate;
}

const HIDE_ALERT = () => {
    close.parentElement.style.display = 'none'
}
const Alert = (message, color) => {
    alert.parentElement.style.display = 'block';
    alert.parentElement.style.color = color;
    alert.innerText = message;
    window.setTimeout(() => HIDE_ALERT(), 2000);
}

const ValidateLocation = () => {
    validate = false
    ANSWERS.map(answer => {
        if (answer.question == 'Wo befindet sich Ihre Immobilie?') {
            validate = true
        }
    })
    return validate
}