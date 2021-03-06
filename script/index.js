//============= Set || Nodes || ==================> 
var audio = document.querySelector('.audio');
var start_quest = document.querySelector('#start_quest');
var quset_cont = document.querySelector('.quset_cont');
var quest_index = document.querySelector('.quest_index');
var answer = document.querySelector('.answers');
var quest_index_num = document.querySelector('.quest_index_num');
var remove_2 = document.querySelector('.remove_2');
var google = document.querySelector('.google');
var answers = document.querySelectorAll('.answer');
var audio_cotroll_img = document.querySelectorAll('.audio_cotroll img');
var start = 0;
var answer_data;
//============= Set || Nodes || ==================>
//======= Set || classes || =======>
var DrawUi = /** @class */ (function () {
    function DrawUi(data, index) {
        this.data = data;
        this.index = index;
        this.state = true;
    }
    //======= Draw || All ||  Content || Ui =======>
    DrawUi.prototype.draw = function () {
        var _this = this;
        if (this.data != undefined && this.index != undefined) {
            fetch(this.data).then(function (response) { return response.json(); }).then(function (values) {
                _this.stop_Quiz(values);
                if (_this.state) {
                    _this.draw_Quest(values);
                    _this.draw_Quest_line(values);
                }
            });
        }
        else {
            console.warn('please Enter data src and index of start');
        }
    };
    //======= Draw || All ||  Content || Ui =======>
    //======= Draw || Questions || Answers =======>
    DrawUi.prototype.draw_Quest = function (values) {
        var _this = this;
        var recust = ['a', 'b', 'c', 'd'];
        quset_cont.innerText = values[this.index].quest;
        answers.forEach(function (ele, index) {
            ele.innerText = values[_this.index][recust[index]];
        });
        quest_index.innerText = "Question ".concat(this.index + 1);
    };
    //======= Draw || Questions || Answers =======>
    //======= Draw || Questions || Lines =======>
    DrawUi.prototype.draw_Quest_line = function (values) {
        var quest_index_num_elements = quest_index_num.children;
        if (quest_index_num_elements.length == 0) {
            values.forEach(function (ele, index) {
                quest_index_num.innerHTML += "<p>".concat(index + 1, "</p>");
            });
        }
        Array.from(quest_index_num_elements).forEach(function (ele) {
            ele.classList.remove('active_point_quest');
        });
        quest_index_num_elements[this.index].classList.add('active_point_quest');
    };
    //======= Draw || Questions || Lines =======>
    //======= Check || Index || Stop "Quiz" =======>
    DrawUi.prototype.stop_Quiz = function (values) {
        if (this.index > values.length - 1) {
            this.state = false;
        }
    };
    return DrawUi;
}());
var Checker = /** @class */ (function () {
    function Checker() {
        this.darwer = new DrawUi('./auth/data.json', start);
        this.quest_index_num = quest_index_num.children;
    }
    //======= Check || All ||  Content || Answers =======>
    Checker.prototype.main_checker = function (ele) {
        var _this = this;
        var http = new XMLHttpRequest();
        http.onload = function () {
            if (http.status == 200) {
                var data = JSON.parse(http.responseText);
                _this.answer_check(data);
                _this.line_check(data, ele);
                _this.Repeat(data);
            }
        };
        http.open('GET', this.darwer.data, true);
        http.send();
    };
    //======= Check || All ||  Content || Answers =======>
    //======= Set|| All ||  Content || Answers =======>
    Checker.prototype.set_answers = function (data, state, statement) {
        var _this = this;
        if (state) {
            answers.forEach(function (ele) {
                if (ele.getAttribute('answer') != data[_this.darwer.index].answer) {
                    ele.classList.add('falsey_answer');
                }
                else {
                    ele.classList.add('correct_answer');
                }
                if (statement) {
                    setTimeout(function () {
                        ele.classList.remove('falsey_answer');
                        ele.classList.remove('correct_answer');
                    }, 1200);
                }
            });
        }
    };
    //======= Set|| All ||  Content || Answers =======>
    //======= Set || All ||  Styles || Answers =======>
    Checker.prototype.answer_check = function (data) {
        var _this = this;
        if (this.darwer.index < data.length && this.darwer.index != data.length - 1) {
            this.set_answers(data, true, true);
        }
        else {
            this.set_answers(data, true, false);
        }
        setTimeout(function () {
            _this.darwer.draw();
        }, 1200);
    };
    //======= Set || All ||  Styles || Answers =======>
    //======= Set || All ||  Styles || Answers || Lines =======>
    Checker.prototype.line_check = function (data, ele) {
        if (this.darwer.index < data.length) {
            if (ele.getAttribute('answer') == data[this.darwer.index].answer) {
                this.quest_index_num[this.darwer.index].classList.add('correct_answer');
                this.darwer.index++;
            }
            else {
                this.quest_index_num[this.darwer.index].classList.add('falsey_answer');
                this.darwer.index++;
            }
        }
    };
    //======= Set || All ||  Styles || Answers || Lines =======>
    //======= Reapet_Quiz || =======>
    Checker.prototype.Repeat = function (data) {
        if (this.darwer.index == data.length) {
            start_quest.classList.remove('hidde_animate_btn');
            start_quest.innerText = 'Repeat';
            start_quest.addEventListener('click', function () {
                location.reload();
            });
        }
    };
    return Checker;
}());
var Delet = /** @class */ (function () {
    function Delet(ele, data, index) {
        this.ele = ele;
        this.data = data;
        this.index = index;
    }
    Delet.prototype.swper = function () {
        if (this.ele.innerText == '0.5') {
            this.get_data();
        }
        else {
            window.open('https://google.com/');
        }
    };
    Delet.prototype.get_data = function () {
        var _this = this;
        fetch(this.data).then(function (response) { return response.json(); }).then(function (data) {
            _this["delete"](data);
        });
    };
    Delet.prototype["delete"] = function (data) {
        var _this = this;
        if (quset_cont.innerText != '') {
            var falsey_data_1 = [];
            Array.from(answers).filter(function (ele, index) {
                if (ele.getAttribute('answer') != data[_this.index].answer) {
                    falsey_data_1.push(index);
                }
            });
            answers[falsey_data_1[0]].innerText = '';
            answers[falsey_data_1[1]].innerText = '';
        }
    };
    return Delet;
}());
//======= Set || classes || =======>
//======= Start || Quiz || App =======>
start_quest.addEventListener('click', start_app);
function start_app(e) {
    //======= Audio || Controls =======>
    audio.play();
    audio_cotroll_img[1].classList.remove('active');
    audio_cotroll_img[0].classList.add('active');
    //======= Audio || Controls =======>
    //======= Draw || Ui || Class =======>
    var play = new DrawUi('./auth/data.json', start);
    play.draw();
    //======= Draw || Ui || Class =======>
    //======= Checker || In || Chossen =======>
    var chek = new Checker();
    answers.forEach(function (ele) {
        ele.addEventListener('click', function (e) {
            chek.main_checker(e.target);
        });
    });
    //======= Checker || In || Chossen =======>
    //======= Delet || Button || And Event =======>
    e.target.classList.add("hidde_animate_btn");
    e.target.removeEventListener('click', start_app);
    //======= Delet || Button || And Event =======>
    //======= Remove || Two || Answers =======>
    remove_2.addEventListener("click", function (e) {
        var deleter = new Delet(e.target, chek.darwer.data, chek.darwer.index);
        deleter.swper();
    });
    //======= Remove || Two || Answers =======>
    //======= Searcher || Event =======>
    google.addEventListener("click", function (e) {
        var deleter = new Delet(e.target, chek.darwer.data, chek.darwer.index);
        deleter.swper();
    });
    //======= Searcher || Event =======>
    //===== Simple || Animate ========>
    quest_index_num.style.padding = '0';
}
//======= Start || Quiz || App =======>
//======= Audio || Controller || App =======>
audio_cotroll_img.forEach(function (ele) {
    ele.addEventListener('click', function () {
        if (audio.paused) {
            audio_cotroll_img[1].classList.remove('active');
            audio_cotroll_img[0].classList.add('active');
            audio.play();
        }
        else if (!audio.paused) {
            audio_cotroll_img[1].classList.add('active');
            audio_cotroll_img[0].classList.remove('active');
            audio.pause();
        }
    });
});
//======= Audio || Controller || App =======>
//========= Handel  || Hover  || Effect  || in  || Small  || Deveices ||  ============>
window.addEventListener('resize', function () {
    if (window.innerWidth < 961) {
        var hover = document.querySelectorAll('.hover');
        hover.forEach(function (ele) {
            ele.classList.add('hover_2');
            ele.classList.remove('hover');
        });
        console.warn('resized to small delet hover');
    }
    else {
        var hover_2 = document.querySelectorAll('.hover_2');
        hover_2.forEach(function (ele) {
            ele.classList.add('hover');
            ele.classList.remove('hover_2');
        });
        console.warn('resized to Big add hover');
    }
});
//========= Handel  || Hover  || Effect  || in  || Small  || Deveices ||  ============>
