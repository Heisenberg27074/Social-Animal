{
    // Method to submit the form data for new post using AJAX
    let createPost = function () {
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function (e) {
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function (data) {
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost)); 

                    // call create Comment method
                    new PostComments(data.data.post._id);
                    
                    new Noty({
                        theme: 'relax',
                        text: "Post Published!",
                        type: "success",
                        layout:"topRight",
                        timeout: 1200
                    }).show();

                }, error: function (error) {
                    console.log(error.responseText);
                }
            });
        });
    }

    // Method to create a post in DOM

    let newPostDom = function (post) {
        // console.log(post.user);
        return $(`<li id="post-${post._id} ">
            <p>
            
                <small>
                    <a class=" delete-post-button" href="/posts/destroy/${ post._id }">X</a>
                </small>
            
                <small>
                    ${post.user.name}
                </small>
    
                <br>
                ${post.content}
            </p>
        <div class="post-comments">
            
                <form id="post-${ post._id } action="/comments/create" method="POST">
                    <input type="text" name="content" placeholder="Typehere to add comment ..." required>
                    <input type="hidden" name="post" value="${post._id}">
                    <input type="submit" value="Add Comment">
                </form>
            
    
                    <div class="post-comment-list">
                        <ul id="post-comments-${post._id}">
                            
                        </ul>
                    </div>
        </div>
    
    </li>`)
    }

   

    // method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                    new Noty({
                        theme: 'relax',
                        text: 'Post Deleted',
                        type: 'info',
                        layout: 'topRight',
                        timeout: 1200

                    }).show();
                },error: function(error){
                    console.log(error.responseText);
                }
            });

        });
    }
    
    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        $('#posts-list-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
        });
    }


    createPost();
    convertPostsToAjax();
}
