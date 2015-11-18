(function(){
    window.APP_ENV = "DEV";
    var ribbon = '<div class="dev-ribbon" style="' +
                    'left: -25px;' +
                    'transform: rotate(-45deg);' +
                    'background: #c00;' +
                    'position: fixed;' +
                    'top: 10px;' +
                    'width: 90px;' +
                    'padding: 5px;' +
                    'color: #eee;' +
                    'box-shadow: 0px 6px 12px rgba(0,0,0,0.5);' +
                    'text-align: center;' +
                    'font-weight: bold;' +
                    'text-shadow: -2px 3px 2px black;">DEV</div>';
    var element = document.getElementsByTagName('body')[0];
    var html = element.innerHTML;
    element.innerHTML = html + ribbon;
})();


