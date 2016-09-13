var firstReady = false
var secondReady = false

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

      $("#repo-name1").text(newdata[0].name)
      $("#repo-name2").text(newdata[1].name)
      $("#repo-name3").text(newdata[2].name)
      $("#language1").text(newdata[0].language)
      $("#language2").text(newdata[1].language)
      $("#language3").text(newdata[2].language)
      $("#star1").text(newdata[0].stargazers_count)
      $("#star2").text(newdata[1].stargazers_count)
      $("#star3").text(newdata[2].stargazers_count)  
      secondReady = true
      if(firstReady) {
        $("main").css("display", "block") 
      }
    }
  })
}
getData("fate-lovely")
