import React, { Component, PropTypes } from "react"
import { reduxForm } from "redux-form"
import { createPost } from "../actions/index"
import { Link } from "react-router"

class PostsNew extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  onSubmit(props) {
    this.props.createPost(props)
      .then(() => {
        //blog post created successfully. navigate user to index
        // navigate by calling this.context.router.push with new path
        this.context.router.push("/")
       })
  }

  render() {
    const { handleSubmit, fields: {title, categories, content} } = this.props

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create a new post!</h3>

        <div className={`form-group ${title.touched && title.invalid ? "has-danger" : ""}`}>
          <label>Title</label>
          <input type="text" className="form-control" {...title} />
          <div className="text-help">
            {title.touched ? title.error : ""}
          </div>
        </div>

        <div className={`form-group ${categories.touched && categories.invalid ? "has-danger" : ""}`}>
          <label>Categories</label>
          <input type="text" className="form-control" {...categories} />
          <div className="text-help">
            {categories.touched ? categories.error : ""}
          </div>
        </div>

        <div className={`form-group ${content.touched && content.invalid ? "has-danger" : ""}`}>
          <label>Content</label>
          <textarea className="form-control" {...content} />
          <div className="text-help">
            {content.touched ? content.error : ""}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    )
  }
}

function validate(values) {
  const errors = {}

  if (!values.title) {
    errors.title = "Enter a username"
  }
  if (!values.categories) {
    errors.categories = "Enter a category"
  }
  if (!values.content) {
    errors.content = "Enter some content"
  }

  return errors
} //return error object from validate function
//if error object has a key that matches a fieldname from form and the key has truthy values
// then it will be considered invalid by redux-form

// connect: first arg is mapStateToProps, second is mapDispatchToProps
// reduxForm: first is form config, second is mapStateToProps, third is mapDispatchToProps

export default reduxForm({
  form: "PostsNewForm",
  fields: ["title", "categories", "content"],
  validate
}, null, { createPost })(PostsNew)

//name of form does not have to match component
