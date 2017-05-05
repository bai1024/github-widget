var firstReady = false
var secondReady = false
var name = ''


$('.follow').on('click',function(){
  window.open('https://github.com/fate-lovely');
});

$('.search-bar').on('click','button',function(){
  name = $(this).siblings('input').val();
  if(name){
    getData(name)
  }
})

function getData (name) {
  $.ajax({
    url:"https://api.github.com/users/" + name,
    success: function (data){
      $("#avatar").attr("src",data.avatar_url)
      $("#name").text(data.name)
      $("#bio").text(data.bio)
      $("#location").text(data.location)
      $("#follower").text(data.followers)
      $("#following").text(data.following)
      $("#repositories").text(data.public_repos)
      $("#user").attr(data.url)
      $('.follow span').html('<a href="'+ data.url+'">Foll</a>')

      firstReady = true
      if(secondReady) {
        $("main").css("display", "block")
      }
    }
  })

  $.ajax({
    url: "https://api.github.com/users/"+ name + "/repos",
    success: function(data) {
      var newdata = data.sort(function(a, b){
        return b.stargazers_count - a.stargazers_count
      })
      for(var i =0;i < 3;i++){
        // console.log(newdata{i}.html_url)
        var $str
         $str += `
          <div class="repo">
            <div id="repo-name1"><a href="${newdata[i].html_url}">${newdata[i].name}</a></div>
            <div id="language1">${newdata[i].language}</div>
            <div>
              ★
              <span id="star1">${newdata[i].stargazers_count}</span>
            </div>
          </div>
        `
      }
      $('.repos-message').html($str);
      secondReady = true
      if(firstReady) {
        $("main").css("display", "block") 
      }
    }
  })
}
getData("fate-lovely")
