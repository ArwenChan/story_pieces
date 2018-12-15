import { api } from 'Api/api'
import { setUserStorage } from 'Api/user'

export function add_user_to_group(group_id) {
    let postData = {
        pathParams: {
            '{group_id}': group_id
        }
    }
    return api.post('add_to_group', postData).then(res => {
        setUserStorage(res)
        return res
    })
}

export function removeUserFromGroup(group_id) {
    let postData = {
        pathParams: {
            '{group_id}': group_id
        }
    }
    return api.post('remove_from_group', postData).then(res => {
        setUserStorage(res)
        return res
    })
}

export function createGroup(name, icon, brief, tags) {
    let postData = {
        data: {
            name: name,
            icon: icon,
            brief: brief,
            tags: tags,
        }
    }
    return api.post('create_group', postData)
}

export function editGroup(group_id, name, icon, brief, tags) {
    let putData = {
        pathParams: {
            '{group_id}': group_id,
        },
        data: {
            name: name,
            icon: icon,
            brief: brief,
            tags: tags,
        }
    }
    return api.put('group_edit', putData)
}

export function groupDetail(group_id) {
    let getData = {
        pathParams: {
            '{group_id}': group_id
        }
    }
    return api.get('group_detail', getData)
}

export function groupTopics(group_id, order, page = 1, size = 20) {
    let getData = {
        pathParams: {
            '{group_id}': group_id
        },
        query: {
            page: page,
            size: size,
            order: order
        }
    }
    return api.get('group_topics', getData)
}

export function groupUsers(group_id, page = 1, size = 20) {
    let getData = {
        pathParams: {
            '{group_id}': group_id
        },
        query: {
            page: page,
            size: size,
        }
    }
    return api.get('group_users', getData)
}

export function addTopic(groupId, title, content, brief, indexPic) {
    let postData = {
        pathParams: {
            '{group_id}': groupId
        },
        data: {
            'title': title,
            'content': content,
            'brief': brief,
            'index_pic': indexPic
        }
    }
    return api.post('add_topic', postData)
}

export function getGroupData(page, size) {
    let data = {
        query: {
            page,
            size
        }
    }
    return api.get('my_groups', data)
}