const blogModel = require("../models/blogModel");


// create blog
exports.createBlog = (req, res) => {
    const reqBody = req.body;
    const name = req.headers['name'];
    const email = req.headers['email'];
    const title = reqBody['title'];
    const author = reqBody['author'];
    const content = reqBody['content'];
    const createdDate = Date.now();

    const postToBody = {
        name: name,
        email: email,
        title: title,
        author: author,
        content: content,
        createdDate: createdDate

    }

    blogModel.create(postToBody, (err, data) => {
        if (err) {
            res.status(401).json({ status: 'failed to create blog', data: err })
        }
        else {
            res.status(200).json({ status: 'blog created', data: data })
        }
    })
}


// read blog
exports.selectBlog = (req, res)=>{
    const email = req.headers['email'];
    blogModel.find({email:email}, (err, data)=>{
        if(err){
            res.status(401).json({status:'Failed', data: err})
        }else{
            res.status(200).json({status:'Success', data: data})
        }
    })
};

// update blog
exports.updateBlog = (req, res) => {
    const reqBody = req.body;
    const _id = reqBody['_id'];
    const title = reqBody['title'];
    const author = reqBody['author'];
    const content = reqBody['content'];

    const updatedBlog = {
        title: title,
        author: author,
        content : content
    }

    blogModel.updateOne({ _id: _id }, { $set: updatedBlog }, { upsert: true }, (err, data) => {
        if(err){
            res.status(401).json({status:'Failed', data: err})
        }else{
            res.status(200).json({status:'Success', data: data})
        }
    })


}

// delete blog

exports.deleteBlog = (req, res) => {
    const id=  req.body['id'];

    blogModel.remove({_id: id}, (err, data)=>{
        if(err){
            res.status(401).json({status:'Failed', data: err})
        }else{
            res.status(200).json({status:'Success', data: data})
        }
    })
}