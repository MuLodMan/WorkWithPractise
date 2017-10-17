define([
    'Jquery','com/barrel','com/pictureSwitch','com/goBack'
], function(Jquery,barrel,pictureSwitch,goBack) {
    barrel(document.querySelector('section.news'))
    let c = pictureSwitch(document.querySelector('header.logo'))
    c.Content.addEventListener('click',function(e){
        if(e.target === $( this.querySelector('.next'))[0]){
          c.Next()
        }
        if(e.target === $( this.querySelector('.pre'))[0]){
          c.Pre()
        }
        let location = $(this.querySelectorAll('.bullet>li')).index(e.target);
        if(location>-1){
          c.bLocation(location)
        }
        e.stopPropagation()
      })
      let gotop = new goBack(innerWidth*0.9,innerHeight*0.8)
      window.addEventListener('scroll',function(){
          if(this.scrollY>=this.innerHeight){
          document.body.appendChild(gotop.GTE)
          }
          else
          document.body.removeChild(gotop.GTE)
      })

});