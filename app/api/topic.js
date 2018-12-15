import { api } from 'Api/api'

export function topicDetail(id, page = 1, size = 20) {
    let getData = {
        pathParams: {
            '{topic_id}': id
        },
        query: {
            page: page,
            size: size
        }
    }
    return api.get('topic_detail', getData)
}

export function answerTopic(topicId, answer, messageId) {
    let postData = {
        data: {
            'content': answer,
        },
        pathParams: {
            '{topic_id}': topicId
        }
    }
    if (messageId) {
        postData.data['answer_to_message'] = messageId
    }
    return api.post('answer_topic', postData)
}

export function likeMessage(id) {
    let postData = {
        pathParams: {
            '{message_id}': id
        }
    }
    return api.post('like_message', postData)
}

export function myTopicData(page, size, filter, type = 'none') {
    let data = {
        query: {
            page,
            size,
            filter,
            type
        }
    }
    return api.get('my_topic_list', data)
}

export function topicList(page, size, q) {
    let data = {
        query: {
            page,
            size,
        }
    }
    if (q) {
        data.query.q = q
    }
    return api.get('hot_topic_list', data)
}