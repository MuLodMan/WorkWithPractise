define(function() {
    return function carouselPlugin(Parent) {
        let currentPage = 1;
        function PictureSwitch() {
          this.Content = document.createElement('div');
          this.isAnimate = false;
          this.init()
        }
        PictureSwitch.prototype.init = function () {
          var that = this
          var PictureSwitchElement = `
          <ul class="img-ct">
            <li><img src="http://i3.download.fd.pchome.net/g1/M00/12/06/oYYBAFZb_peIEHeOAAFfa9O_UtwAACydQGI_esAAV-D405.jpg" alt=""></li>
            <li><img src="http://i6.download.fd.pchome.net/g1/M00/12/06/ooYBAFZb_h6IAsSoAAH08kncdKcAACydQE6YmgAAfUK891.jpg" alt=""></li>
            <li><img src="http://i2.download.fd.pchome.net/g1/M00/12/06/oYYBAFZb_oeIT3Y0AAT57B1vv2kAACydQFcT5cABPoE662.jpg" alt=""></li>
            <li><img src="http://i2.download.fd.pchome.net/g1/M00/12/06/ooYBAFZb_jaISW9OAADPIn0p87IAACydQGDG0oAAM86955.jpg" alt=""></li>
            <li><img src="http://i3.download.fd.pchome.net/g1/M00/12/06/oYYBAFZb_peIEHeOAAFfa9O_UtwAACydQGI_esAAV-D405.jpg" alt=""></li>
          </ul>
          <a href="#" class="pre arrow">＜</a>
          <a href="#" class="next arrow">＞</a>
            <ul class="bullet">
              <li class="active"></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
        `;
          this.Content.innerHTML = PictureSwitchElement;
           this.Content.classList.add('carousel');
           this.Content.querySelectorAll('.img-ct img').forEach(function(ele){
            ele.style.width  =  $(Parent).width()+'px'
           })
          Parent.appendChild(this.Content)
          $(this.Content.querySelector('.img-ct')).css({ width: $('.img-ct>li').first().width() * $('.carousel>.img-ct>li').length, left: -$('.carousel>.img-ct>li').first().width() });
    
        }
        //.carousel .bullet
        function location (NextPage) { //(!0),1,2,3,4,(none!5)
          let that = this
          if (NextPage === this.Content.querySelectorAll('.img-ct>li').length) {
            $(this.Content.querySelector('.img-ct')).css({ left: 0 });
            NextPage = 1;
          }
          $(this.Content.querySelector('.img-ct')).animate({ left: -NextPage * $('.carousel>.img-ct>li').first().width() }, 800, function () {
            if (NextPage === 0) {
              $(that.Content.querySelector('.img-ct')).css({ left: -(that.Content.querySelectorAll('.img-ct>li').length - 1) * $('.carousel>.img-ct>li').first().width() });// before first
              NextPage = that.Content.querySelectorAll('.img-ct>li').length - 1;
            }
            $(that.Content.querySelector('.bullet')).children()[currentPage-1].classList.remove('active');
            currentPage = NextPage;
            $(that.Content.querySelector('.bullet')).children()[currentPage-1].classList.add('active');
          })
    
        }
        PictureSwitch.prototype.Next = function () {
          location.call(this,currentPage + 1)
        }
        PictureSwitch.prototype.Pre = function () {
          location.call(this,currentPage - 1)
        }
        PictureSwitch.prototype.bLocation = function(index){
          if(index+1===currentPage)
          return;
          location.call(this,index+1)
        }
        return new PictureSwitch()
      }
    });
