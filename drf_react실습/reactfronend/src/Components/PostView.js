import React, { Component } from 'react' //rcc 자동완성 bb

const dummy_prop = {
    title : '테스트용 타이틀',
    content : '테스트용 내용'
}

export default class PostView extends Component {
    render() {
        // const {title,content} = dummy_prop
        const {id,title,content} = this.props
        return (
            <div>
                <h3>{id}-{title}</h3>
                <p>{content}</p>
            </div>
        )
    }
}
