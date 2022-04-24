import React, { Component } from 'react'
import './dashboard.css'
// import backImg from '../../assets/back.jfif'

export default class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            allBlog: [],
            title: '',
            description: '',
            fileName: '',
            creator: '',
            tags: '',
            updateFlag: '',
            updateForm: {
                title: '',
                description: '',
                creator: '',
                upvote: '',
                tags: '',
            }
        }
    }

    componentDidMount() {
        this.getAllPost();
    }

    getAllPost = async () => {
        try {
            const data = await fetch(`/get`);
            if (data.status === 200) {
                const resp = await data.json()
                this.setState({
                    allBlog: resp
                }, () => console.log(this.state.allBlog))
            }
        } catch (err) {
            console.log(err)
        }

    }
    deletePost = async (id) => {
        try {
            const data = await fetch(`/delete/${id}`, {
                method: 'delete',
                headers: { "Content-Type": "application/json" }
            })
            if (data.status === 200) {
                console.log("Deleted")
            }
        } catch (err) {
            console.log(err)
        }
        this.getAllPost();
    }
    addPost = async () => {
        try {
            let { title, description, creator, tags } = this.state;
            tags = tags.split(",");
            const data = await fetch(`/add`, {
                method: 'post',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, description, creator, tags })
            })
            if (data.status === 200) {
                console.log("Added")
            }
        } catch (err) {
            console.log(err)
        }
        this.getAllPost();
    }
    updatePost = async (id) => {
        try {
            let { title, description, creator, tags, upvote } = this.state.updateForm;
            tags = tags.split(",");
            const data = await fetch(`/update/${id}`, {
                method: 'PATCH',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, description, creator, tags, upvote })
            })
            if (data.status === 200) {
                console.log("Updated")
                this.setState({
                    updateFlag: ''
                })
            }
        } catch (err) {
            console.log(err)
        }
        this.getAllPost();
    }
    upVote = async (id) => {
        try {
            const data = await fetch(`/update/${id}/likedBlogPost`, {
                method: 'PATCH',
                headers: { "Content-Type": "application/json" }
            })
            if (data.status === 200) {
                console.log("Voted")
            }
        } catch (err) {
            console.log(err)
        }
        this.getAllPost();
    }
    handler = (e) => {
        const name = e.target.name;
        this.setState({
            [name]: e.target.value
        })
    }
    updatehandler = (e) => {
        const name = e.target.name;
        this.setState({
            ...this.state,
            updateForm: {
                ...this.state.updateForm,
                [name]: e.target.value
            }
        })
    }
    changeUpdate = (post) => {
        let { title, description, creator, upvote, tags } = post
        tags = tags.toString();
        this.setState({
            updateFlag: post._id,
            updateForm: {
                title, description, creator, upvote, tags
            }
        })
    }
    render() {
        return (
            <div>
                <div className="row">

                    <header className='col'>Blog</header>
                </div>
                <div className="row">
                    <section className='col-4 left-section'>
                        <h3 style={{ margin: "20px 0px" }}>🌟Create a Blog Post🌟</h3>
                        <form className='blog-form'>
                            {/* <label>Upload Blog Image</label>
                            <button>Choose File</button> */}
                            <input autoComplete='off' type="text" placeholder='🔥Blog Title' name='title' value={this.state.title} onChange={this.handler} />
                            <textarea type="text" rows="7" placeholder='📔Blog Description' name="description" value={this.state.description} onChange={this.handler} />
                            <input autoComplete='off' type="text" placeholder='✍️Author Name' name="creator" value={this.state.creator} onChange={this.handler} />
                            <label htmlFor="">Tags(5 max seperated by comma)</label>
                            <input autoComplete='off' type="text" placeholder='🏷️Tags' name="tags" value={this.state.tags} onChange={this.handler} />
                            <button onClick={() => this.addPost()}>Publish 📝</button>
                        </form>
                    </section>
                    <section className='col-8 right-section'>
                        {this.state.allBlog.map(posts => {
                            let date1 = new Date(posts.createdAt);
                            let date2 = new Date();
                            let duration = (date2.getTime() - date1.getTime()) / (1000 * 60 * 60)
                            return <div key={posts._id}>
                                <div className="row post">
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        {this.state.updateFlag !== posts._id
                                            ? <span className='author'>{posts.creator} <br /><p style={{ fontSize: "12px" }}>{duration.toFixed()} hours ago </p> </span>
                                            : <input autocomplete='off' type="text" placeholder='✍️Author Name' name='creator' value={this.state.updateForm.creator} onChange={this.updatehandler} />}

                                        {this.state.updateFlag !== posts._id
                                            ? <button onClick={() => this.changeUpdate(posts)}>✏️</button>
                                            : <button onClick={() => this.updatePost(posts._id)}>📝</button>}

                                    </div>
                                    <div className='postBody'>
                                        {this.state.updateFlag !== posts._id
                                            ? <h4>{posts.title}</h4>
                                            : <input autocomplete='off' type="text" placeholder='🔥Blog Title' name='title' value={this.state.updateForm.title} onChange={this.updatehandler} />}

                                        {this.state.updateFlag !== posts._id
                                            ? <p>{posts.description}</p>
                                            : <input autocomplete='off' type="text" placeholder='📔Blog Description' name='description' value={this.state.updateForm.description} onChange={this.updatehandler} />}

                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            <button className='vote' onClick={() => this.upVote(posts._id)}>Upvote</button>
                                            {this.state.updateFlag !== posts._id
                                                ? <span >👍{posts.upvote}</span>
                                                : <input autocomplete='off' type="number" placeholder='☝️upvote' name='upvote' value={this.state.updateForm.upvote} onChange={this.updatehandler} />}

                                        </div>
                                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            {this.state.updateFlag !== posts._id
                                                ? posts.tags.map((item, index) => {
                                                    return <div className='tags' key={index}>
                                                        #{item}
                                                    </div>
                                                })
                                                : <input autocomplete='off' type="text" placeholder='🏷️Tags' name='tags' value={this.state.updateForm.tags} onChange={this.updatehandler} />}

                                            <button onClick={() => this.deletePost(posts._id)}>🗑️</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })}


                    </section>

                </div>
                <div className="row">
                    <footer className='col'>Created by @aqib 2022</footer>

                </div>
            </div>
        )
    }
}
