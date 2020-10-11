// Developed by: Shivam Sharma
// Agenda: Hiring Task for TCS as FullStack Developer
// Project: Instagram Clone

const URL = "http://starlord.hackerearth.com/insta";

// State variables
let posts = [];
let order = 0; // increasing
let sortType = 0; // by likes

// Add post UI
function addPost(post) {
    $('.posts').append(`
        <div class="post">
            <div class="user">
                <div class="data">
                    <div class="img-blk">
                        <img src="./images/user.png" alt="">
                    </div>
                    <div class="name">
                        <p><b>user-name</b></p>
                    </div>
                </div>
                <div class="options"><p><i class="fas fa-ellipsis-h"></i></p></div>
            </div>
            <div class="img-blk">
                <img src="${post.Image}" alt="">
            </div>
            <div class="likes"><p>${post.likes} <b>Likes</b></p></div>
            <div class="time"><p><b>Time:</b> ${post.timestamp}</p></div>
        </div>
    `);
}

// GET Posts from the api
function getPosts() {
    $('.load').addClass('show');

    $.ajax({
        url: URL,
        type: 'GET',
        success: function(data){ 
            posts = data;
            $('.posts').empty();

            posts.forEach(post => addPost(post));
            $('.loader').removeClass('show');
        },
        error: function(err) {
            $('.loader').removeClass('show');
            console.log("Error occured! , API request failed.");
        }
    });
}

// Sorting posts
function sortPosts() {
    $('.load').addClass('show');

    if(sortType == 0) { // by likes
        if(order == 0) {
            $('.posts').empty();
            for(let i=0; i<posts.length; i++) {
                let temp;
                let index=i;
                for(let j=i; j<posts.length; j++) {
                    if(posts[j].likes < posts[index].likes) {
                        index = j;
                    }
                }
                temp = posts[i];
                posts[i] = posts[index];
                posts[index] = temp;
                addPost(posts[i]);
            }
        } else if(order == 1) {
            $('.posts').empty();
            for(let i=0; i<posts.length; i++) {
                let temp;
                let index=i;
                for(let j=i; j<posts.length; j++) {
                    if(posts[j].likes > posts[index].likes) {
                        index = j;
                    }
                }
                temp = posts[i];
                posts[i] = posts[index];
                posts[index] = temp;
                addPost(posts[i]);
            }
        }
    } else if(sortType == 1) { // by time
        if(order == 0) {
            $('.posts').empty();
            for(let i=0; i<posts.length; i++) {
                let temp;
                let index=i;
                for(let j=i; j<posts.length; j++) {
                    if(posts[j].timestamp < posts[index].timestamp) {
                        index = j;
                    }
                }
                temp = posts[i];
                posts[i] = posts[index];
                posts[index] = temp;
                addPost(posts[i]);
            }
        } else if(order == 1) {
            $('.posts').empty();
            for(let i=0; i<posts.length; i++) {
                let temp;
                let index=i;
                for(let j=i; j<posts.length; j++) {
                    if(posts[j].timestamp > posts[index].timestamp) {
                        index = j;
                    }
                }
                temp = posts[i];
                posts[i] = posts[index];
                posts[index] = temp;
                addPost(posts[i]);
            }
        }
    }
    $('.loader').removeClass('show');
}


$(document).ready(function(){
    getPosts();
});

$('.nav .sort .box .order .left').click(function(){
    $('.nav .sort .box .order .left').addClass('select');
    $('.nav .sort .box .order .right').removeClass('select');
    order = 0; // increasing
});

$('.nav .sort .box .order .right').click(function(){
    $('.nav .sort .box .order .right').addClass('select');
    $('.nav .sort .box .order .left').removeClass('select');
    order = 1; // decreasing
});

$('.nav .sort .box .option .left').click(function(){
    $('.nav .sort .box .option .left').addClass('select');
    $('.nav .sort .box .option .right').removeClass('select');
    sortType = 0; // sort by likes
});

$('.nav .sort .box .option .right').click(function(){
    $('.nav .sort .box .option .right').addClass('select');
    $('.nav .sort .box .option .left').removeClass('select');
    sortType = 1; // sort by time
});

$('.nav .sort .box .submit').click(function(){
    sortPosts();
});