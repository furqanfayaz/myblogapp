import Editblog from "../components/Updateblogcomponent";

const UpdateBlog = (props) => {
    return (
        <Editblog blogId={props.url.query.id}/>
    )
}

export default UpdateBlog;
