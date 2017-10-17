define(function() {
    'use strict';
    function GotopButton(x,y){
        this.GTE = document.createElement('div');
        this.init(x,y)
    }
    GotopButton.prototype.init=function(x,y){
        this.GTE.textContent='GoTop'
        this.GTE.style.position = 'fixed';
        this.GTE.style.left = x+'px';
        this.GTE.style.top = y+'px';
        this.GTE.style.cursor = 'pointer';
        this.GTE.style.border = '1px solid red';
        this.GTE.setAttribute('id','gotop');
        this.GTE.onclick = this.goTop
    }
    GotopButton.prototype.goTop = function(){
        scrollTo(scrollX,0);
    }
    return GotopButton
});