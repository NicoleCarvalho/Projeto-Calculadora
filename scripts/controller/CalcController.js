class CalcController{
    
    constructor(){
        //o caractere _ indica por convenção que o atributo é privado
        this._operation = [];
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");       
        this.currentDate;
        this.initialize();        
        this.initButtonsEvents();        
    }

    initialize(){
        
        this.setDisplayDateTime();

        setInterval(()=>{
            this.setDisplayDateTime();

        }, 1000);
    }

    addEventListenerAll(element, events, fn){
        events.split(' ').forEach(event => {
            element.addEventListener(event, fn, false);
        })
    }

    clearAll(){
        this._operation = [];
    }

    clearEntry(){
        this._operation.pop();
    }

    getLastOperation(){ //resgata o último item inserido
        return this._operation[this._operation.length-1];
    }

    setLastOperation(value){//substitui o último índice do array
        this._operation[this._operation.length - 1] = value;
    }

    isOperator(value){ //verifica se é um operador, se retornar true é um operador
        return (['+', '-', '*', '/', '%'].indexOf(value) > -1);
       
    }

    addOperation(value){

        console.log("W", value, isNaN(this.getLastOperation()) )

        if(isNaN(this.getLastOperation())){
            //if string || true
            //caso o último item não seja um número, verifica se é um operador
            console.log("e uma string")

            if(this.isOperator(value)){
                //trocar o operador caso o último item tbm tenha sido um operador
                this.setLastOperation(value);

            } else if(isNaN(value)){
                console.log(value)
                
            } else {
                
                this._operation.push(value);
            }

        } else {
            //if number || false

            if(this.isOperator(value)){
                
                this._operation.push(value);
            } else {
                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(parseInt(newValue));
            }           
        }
        
        console.log(this._operation);
    }

    setError(){
        this.displayCalc = "Error";
    }

    execBtn(value){
        switch (value) {
            case 'ac':
                this.clearAll();                
                break;

            case 'ce':
                this.clearEntry();
                break;

            case 'soma':
                this.addOperation('+');
                break;

            case 'subtracao':
                this.addOperation('-');
                break;

            case 'divisao':
                this.addOperation('/'); 
                break;

            case 'multiplicacao':
                this.addOperation('*');
                break;

            case 'porcento':
                this.addOperation('%');
                break;

            case 'igual':
            
                break;

            case 'ponto':
                this.addOperation('.');
                break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;
            default:
                this.setError();
                break;
        }
    }

   
    initButtonsEvents(){
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");
        buttons.forEach((btn, index) => {
            this.addEventListenerAll(btn, "click drag", e => {
                let textBtn = btn.className.baseVal.replace("btn-","");
                
                this.execBtn(textBtn);
            });

            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {
                btn.style.cursor = "pointer";
            })
        });
    }

    setDisplayDateTime(){
        this.displayDate = this.currentDate.toLocaleDateString(this._locale,{
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }

    get displayDate(){
        return this._timeEl.innerHTML;
    }

    set displayDate(value){
        this._dateEl.innerHTML = value;
    }    

    get displayTime(){
        return this._dateEl.innerHTML;
    }

    set displayTime(value){
        this._timeEl.innerHTML = value;
    }

    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value){
        this._displayCalcEl.innerHTML = value;
    }

    get currentDate(){
        return new Date();
    }

    set currentDate(date){
        this.currentDate = date;
    }
}