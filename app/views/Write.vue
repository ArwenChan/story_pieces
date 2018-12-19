<template>
    <div class="editor-box">
        <input type="text" v-model="title" class="title" placeholder="标题的地盘"
            maxlength="50"/>
        <div class="container">
            <div id="editor">
            </div>
            <div class="send" @click="toSend"><Icon type="ios-send-outline" size="50"/>提交</div>
        </div>
    </div>
</template>

<script>
import { api } from 'Api/api'
import { addTopic } from 'Api/group'
// import Delta from 'quill-delta'
export default {
    data() {
        return {
            editor: null,
            imgs: [],
            title: '',
            loading: false,
        }
    },
    mounted() {
        let toolbarOptions = [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            // ['blockquote', 'code-block'],

            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image'],
            ['blockquote', { 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction

            // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            // [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            // [{ 'font': [] }],
            [{ 'align': [] }],

            // ['clean']                                         // remove formatting button
        ]
        /* eslint-disable no-undef */
        this.editor = new Quill('#editor', {
        /* eslint-enable no-undef */
            theme: 'snow',
            placeholder: '从这里出发吧..',
            modules: {
                toolbar: toolbarOptions,
            },
        })
        this.editor.getModule('toolbar').addHandler('image', this.imageHandler)
    },
    methods: {
        toSend() {
            if (this.loading) {
                setInterval(function () {
                    if (!this.loading) {
                        this.sendContent()
                        clearInterval()
                    }
                }, 500)
            }
            else {
                this.sendContent()
            }
        },
        sendContent() {
            if (!this.title) {
                this.$message.warning('标题不可为空')
                return
            }
            const editor = this.editor.container.firstChild
            if (!editor.textContent) {
                this.$message.warning('请先输入文字')
                return
            }
            const indexPic = this.imgs.length > 0 ? this.imgs[0] : ''
            const groupId = this.$route.params.id
            const brief = this.editor.getText(0, 120)
            this.replaceImgs(editor)
            // console.log(editor.innerHTML)
            // console.log(editor.brief)
            addTopic(groupId, this.title, editor.innerHTML, brief, indexPic).then(res => {
                this.$router.push(`/topic/${res.id}/`)
            })
        },
        imageHandler() {
            let fileInput = this.editor.container.querySelector('input.ql-image[type=file]')
            if (fileInput == null) {
                fileInput = document.createElement('input')
                fileInput.setAttribute('type', 'file')
                fileInput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp')
                fileInput.classList.add('ql-image')
                fileInput.style.visibility = 'hidden'
                fileInput.addEventListener('change', () => {
                    if (fileInput.files != null && fileInput.files[0] != null) {
                        this.insertBase64ToEditor(fileInput.files[0])
                        this.upload(fileInput.files[0], this.addImg)
                        fileInput.value = ''
                    }
                })
                this.editor.container.appendChild(fileInput)
            }
            fileInput.click()
        },
        insertBase64ToEditor(file) {
            let reader = new FileReader()
            reader.onload = (e) => {
                let range = this.editor.getSelection(true)
                /* eslint-disable no-undef */
                const Delta = Quill.import('delta')
                /* eslint-enable no-undef */
                this.editor.updateContents(new Delta()
                    .retain(range.index)
                    .delete(range.length)
                    .insert({ image: e.target.result })
                , 'user')
            }
            reader.readAsDataURL(file)
        },
        upload(image, callback) {
            this.loading = true
            let data = new FormData()
            const now = new Date()
            let name = 'content-' + String(now.getTime()) +
                String(Math.floor(Math.random() * 1000000 + 1))
            data.append('image', image)
            data.append('name', name)
            let postData = {
                data: data
            }
            api.post('upload_image', postData).then(res => {
                if (!this.firstImg) {
                    this.firstImg = res.file
                }
                callback(res.file)
                this.loading = false
            })
        },
        addImg(url) {
            // push image url to rich editor.
            this.imgs.push(url)
        },
        replaceImgs(html) {
            let allImgs = html.querySelectorAll('img')
            for (let img of allImgs) {
                img.setAttribute('src', this.imgs.shift())
            }
        }
    }
}
</script>

<style lang="scss">
.editor-box {
    display: flex;
    flex-direction: column;
    .title {
        margin: 40px 0 10px 0;
        align-self: center;
        width: 80%;
        border: none;
        border-bottom: 1px solid black;
        outline: none;
        font-size: 1.5em;
    }
    .container {
        width: 80%;
        padding: 10px 0;
        margin-bottom: 100px;
        align-self: center;
        position: relative;
        .send {
            position: absolute;
            right: 20px;
            top: 0;
            cursor: pointer;
            font-size: 1.5em;
        }
    }
}
#editor {
    min-height: calc(100% - 42px);
    border: none !important;
}
.ql-toolbar {
    border: none !important;
}
</style>
