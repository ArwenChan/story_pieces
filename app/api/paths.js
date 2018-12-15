export const host = '//localhost:8000'

export const paths = {
    'hot_topic_list': '/api/forum/topics/',
    'topic_detail': '/api/forum/topics/{topic_id}/',
    'hot_group_list': '/api/forum/groups/',
    'my_topic_list': '/api/forum/topics/my/',
    'answer_topic': '/api/forum/topics/my/{topic_id}/answer-topic/',
    'like_message': '/api/forum/topics/my/{message_id}/like/',
    'get_verify_code': '/verify/{phone}/',
    'register': '/register/',
    'login': '/login/',
    'user_info': '/api/user-info/details/',
    'user_logout': '/logout/',
    'add_to_group': '/api/forum/groups/my/{group_id}/add-user/',
    'remove_from_group': '/api/forum/groups/my/{group_id}/remove-user/',
    'reset_password': '/api/user-info/reset-password/',
    'modify_password': '/api/user-info/set-password/',
    'check_password': '/api/user-info/check-password/',
    'change_mobile': '/api/user-info/change-mobile/',
    'change_user_info': '/api/user-info/change/',
    'my_groups': '/api/forum/groups/my/',
    'create_group': '/api/forum/groups/my/',
    'group_detail': '/api/forum/groups/{group_id}/',
    'group_topics': '/api/forum/groups/{group_id}/group-topics/',
    'group_users': '/api/forum/groups/{group_id}/group-users/',
    'group_edit': '/api/forum/groups/my/{group_id}/',
    'add_topic': '/api/forum/groups/my/{group_id}/add-topic/',

    'upload_image': '/upload/',
}

export const getUri = (key) => {
    if (!paths[key]) {
        return false
    }
    let url = paths[key]
    if (url.indexOf('http') === 0) {
        return url
    }
    else {
        return host + url
    }
}